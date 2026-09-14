'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Activity, AlertTriangle, BadgeCheck, CheckCircle2, ChevronLeft, ChevronRight, Clock3,
  ExternalLink, FileWarning, Gauge, Laptop, ListChecks, Link2Off, LogOut, RefreshCw,
  ScrollText, Search, ShieldCheck, Smartphone, Users, X,
} from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'
import { cx } from '@/components/site/ui'

// ---------------------------------------------------------------------------
// ARCHIVE OPERATIONS
//
// The operator's desk. It shares the account desk's furniture on purpose — the
// same header, the same grouped column, the same cards — because they are the
// same product seen from two sides, and an operator who has used one already
// knows where things are here.
//
// Nothing on this page is decorative. Every number is counted server-side from
// the database or the content graph, every list is the real collection, and no
// panel invents a figure to look complete: where the archive has nothing to
// report, it says so.
// ---------------------------------------------------------------------------

const SECTIONS = {
  overview: { index: 1, kicker: 'Desk', title: 'The archive right now', copy: 'People, sessions, the editorial queue and the security log, counted at the moment you asked.' },
  queue: { index: 2, kicker: 'Editorial', title: 'Suggestion queue', copy: 'Everything readers have submitted, oldest first. A sourced change has to point at Rockstar — that is checked here, not taken on trust.' },
  people: { index: 3, kicker: 'People', title: 'Accounts', copy: 'Who holds which role, which accounts are suspended, and who is signed in where. Addresses stay encrypted and are never shown.' },
  sessions: { index: 4, kicker: 'Devices', title: 'Active sessions', copy: 'Every session the archive currently honours, across all accounts.' },
  security: { index: 5, kicker: 'Audit', title: 'Security activity', copy: 'A privacy-reduced trail kept for 180 days. Raw addresses are never stored, and never leave the server even hashed.' },
}

const MENU = [
  { label: 'Desk', items: [['overview', 'Overview', Gauge]] },
  { label: 'Editorial', items: [['queue', 'Suggestion queue', ListChecks]] },
  { label: 'Operations', items: [['people', 'Accounts', Users], ['sessions', 'Sessions', Laptop]] },
  { label: 'Security', items: [['security', 'Activity log', Activity]] },
]

const ROLES = ['reader', 'editor', 'moderator', 'admin']

const dateTime = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'
const day = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(value)) : '—'

// "3 days ago" is the only form in which the age of a pending suggestion is
// actually useful to somebody deciding what to look at next.
function since(value) {
  if (!value) return '—'
  const ms = Date.now() - new Date(value).getTime()
  const days = Math.floor(ms / 86_400_000)
  if (days >= 1) return `${days}d ago`
  const hours = Math.floor(ms / 3_600_000)
  if (hours >= 1) return `${hours}h ago`
  const minutes = Math.max(1, Math.floor(ms / 60_000))
  return `${minutes}m ago`
}

const eventLabel = (action) => ({
  'account.created': 'Account created', 'session.login': 'Signed in', 'session.logout': 'Signed out',
  'session.logout_all': 'All sessions closed', 'session.revoked': 'Session revoked',
  'profile.updated': 'Profile updated', 'password.changed': 'Password changed',
  'password.reset': 'Password recovered', 'password.recovery_requested': 'Recovery requested',
  'email.verified': 'Email verified', 'email.verification_requested': 'Verification requested',
  'account.deleted': 'Account deleted',
  'admin.role_changed': 'Role changed', 'admin.status_changed': 'Account status changed',
  'admin.sessions_revoked': 'Sessions revoked by operator',
  'wiki.suggestion_submitted': 'Suggestion submitted', 'wiki.suggestion_accepted': 'Suggestion accepted',
  'wiki.suggestion_rejected': 'Suggestion rejected',
}[action] || action.replaceAll('.', ' '))

export default function AdminClient({ operator }) {
  const { request } = useAuth()
  const isAdmin = operator.role === 'admin'

  const [section, setSection] = useState('overview')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState({})
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // People filters
  const [term, setTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  // Queue and audit filters
  const [queueStatus, setQueueStatus] = useState('pending')
  const [auditOutcome, setAuditOutcome] = useState('')
  const [auditAction, setAuditAction] = useState('')
  const [auditPage, setAuditPage] = useState(1)

  const load = useCallback(async (key, url) => {
    setLoading((current) => ({ ...current, [key]: true }))
    try {
      const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store' })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.error || 'Could not read that.')
      setData((current) => ({ ...current, [key]: payload }))
      setError('')
    } catch (readError) {
      setError(readError.message)
    } finally {
      setLoading((current) => ({ ...current, [key]: false }))
    }
  }, [])

  const peopleUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (term.trim()) params.set('q', term.trim())
    if (roleFilter) params.set('role', roleFilter)
    if (statusFilter) params.set('status', statusFilter)
    if (page > 1) params.set('page', String(page))
    return `/api/auth/admin/users${params.toString() ? `?${params}` : ''}`
  }, [term, roleFilter, statusFilter, page])

  const auditUrl = useMemo(() => {
    const params = new URLSearchParams()
    if (auditOutcome) params.set('outcome', auditOutcome)
    if (auditAction) params.set('action', auditAction)
    if (auditPage > 1) params.set('page', String(auditPage))
    return `/api/auth/admin/audit${params.toString() ? `?${params}` : ''}`
  }, [auditOutcome, auditAction, auditPage])

  useEffect(() => { load('overview', '/api/auth/admin/overview') }, [load])
  useEffect(() => { if (section === 'queue') load('queue', `/api/auth/admin/queue?status=${queueStatus}`) }, [section, queueStatus, load])
  useEffect(() => { if (section === 'sessions') load('sessions', '/api/auth/admin/sessions') }, [section, load])

  // The account search runs as the operator types, so it waits for a pause
  // rather than firing a query per keystroke.
  useEffect(() => {
    if (section !== 'people') return undefined
    const timer = window.setTimeout(() => load('people', peopleUrl), term ? 300 : 0)
    return () => window.clearTimeout(timer)
  }, [section, peopleUrl, term, load])

  useEffect(() => { if (section === 'security') load('audit', auditUrl) }, [section, auditUrl, load])
  useEffect(() => { setPage(1) }, [term, roleFilter, statusFilter])
  useEffect(() => { setAuditPage(1) }, [auditOutcome, auditAction])

  const act = async (name, path, body, after) => {
    setBusy(name); setMessage(''); setError('')
    try {
      const result = await request(path, { body })
      if (result?.message) setMessage(result.message)
      await after?.()
    } catch (actionError) {
      setError(actionError.message || 'That did not go through.')
    } finally {
      setBusy('')
    }
  }

  const refreshPeople = () => Promise.all([load('people', peopleUrl), load('overview', '/api/auth/admin/overview')])
  const refreshQueue = () => Promise.all([load('queue', `/api/auth/admin/queue?status=${queueStatus}`), load('overview', '/api/auth/admin/overview')])

  const overview = data.overview
  const meta = SECTIONS[section]

  return (
    <div className="acc-desk adm-desk">
      <section className="acc-plate" aria-labelledby="adm-title">
        <div className="acc-plate-body">
          <div className="acc-lockup">
            <span className="acc-monogram" aria-hidden="true"><ShieldCheck size={26} /></span>
            <div>
              <p className="acc-plate-kicker"><i aria-hidden="true" />Archive operations<span>·</span>{operator.role}</p>
              <h1 id="adm-title">Operations desk</h1>
              <p className="acc-plate-sub">
                Signed in as @{operator.username}
                <span>·</span>
                {overview?.generatedAt ? `Counted ${dateTime(overview.generatedAt)}` : 'Counting…'}
              </p>
            </div>
          </div>

          <div className="acc-plate-chips">
            <span className="acc-chip"><ShieldCheck size={12} />{isAdmin ? 'Full administration' : 'Moderation only'}</span>
            <Link href="/account" className="acc-chip is-link"><Users size={12} />Your account desk</Link>
            <button type="button" className="acc-chip is-link" onClick={() => load('overview', '/api/auth/admin/overview')}>
              <RefreshCw size={12} />Recount
            </button>
          </div>

          <dl className="acc-plate-meta">
            {[
              ['Accounts', overview?.people?.total],
              ['Sessions', overview?.sessions?.active],
              ['In queue', overview?.queue?.pending || 0],
              ['Failures 24h', overview?.security?.failures24h],
              ['Records', overview?.archive?.records],
            ].map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value ?? '—'}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <div className="acc-layout">
        <nav className="acc-nav" aria-label="Operations sections">
          {MENU.map((group) => (
            <section key={group.label}>
              <p className="acc-nav-label">{group.label}</p>
              <ul>
                {group.items.map(([id, label, Icon]) => (
                  <li key={id}>
                    <button
                      type="button"
                      aria-current={section === id ? 'page' : undefined}
                      onClick={() => { setSection(id); setMessage(''); setError('') }}
                      className={cx('acc-nav-item', section === id && 'is-active')}
                    >
                      <Icon size={15} aria-hidden="true" />
                      <span>{label}</span>
                      {id === 'queue' && overview?.queue?.pending > 0 && <b>{overview.queue.pending}</b>}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <footer>
            <Link href="/" className="acc-nav-out"><LogOut size={15} aria-hidden="true" />Leave operations</Link>
          </footer>
        </nav>

        <div className="acc-body">
          <header className="acc-head" data-tone={section === 'security' ? 'sun' : section === 'queue' ? 'violet' : 'pink'}>
            <span className="acc-head-index">{String(meta.index).padStart(2, '0')}</span>
            <div>
              <p>{meta.kicker}</p>
              <h2>{meta.title}</h2>
              <span>{meta.copy}</span>
            </div>
          </header>

          {(message || error) && (
            <p role={error ? 'alert' : 'status'} className={cx('acc-flash', error ? 'is-error' : 'is-ok')}>{error || message}</p>
          )}

          {section === 'overview' && <Overview overview={overview} loading={loading.overview} />}

          {section === 'queue' && (
            <Queue
              payload={data.queue}
              loading={loading.queue}
              status={queueStatus}
              onStatus={setQueueStatus}
              busy={busy}
              onReview={(id, decision) => act(`review-${id}`, 'suggestion-review', { id, status: decision, reviewNote: '' }, refreshQueue)}
            />
          )}

          {section === 'people' && (
            <People
              payload={data.people}
              loading={loading.people}
              operator={operator}
              isAdmin={isAdmin}
              busy={busy}
              term={term} onTerm={setTerm}
              roleFilter={roleFilter} onRole={setRoleFilter}
              statusFilter={statusFilter} onStatus={setStatusFilter}
              page={page} onPage={setPage}
              onRoleChange={(userId, role) => act(`role-${userId}`, 'admin/user-role', { userId, role }, refreshPeople)}
              onStatusChange={(userId, status) => act(`status-${userId}`, 'admin/user-status', { userId, status }, refreshPeople)}
              onRevoke={(userId) => act(`revoke-${userId}`, 'admin/user-revoke', { userId }, refreshPeople)}
            />
          )}

          {section === 'sessions' && <Sessions payload={data.sessions} loading={loading.sessions} />}

          {section === 'security' && (
            <Audit
              payload={data.audit}
              loading={loading.audit}
              outcome={auditOutcome} onOutcome={setAuditOutcome}
              action={auditAction} onAction={setAuditAction}
              page={auditPage} onPage={setAuditPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Loading({ label }) {
  return <p className="acc-quiet" role="status">{label}</p>
}

function Empty({ icon: Icon, title, text }) {
  return (
    <div className="acc-empty">
      <Icon size={20} aria-hidden="true" />
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  )
}

// A signal is a number the operator should act on, so it says what it is, what
// it counts, and — when it is not zero for a good reason — why it matters.
function Signal({ label, value, note, tone = 'neutral' }) {
  return (
    <div className="adm-signal" data-tone={value ? tone : 'neutral'}>
      <dt>{label}</dt>
      <dd>{value ?? '—'}</dd>
      {note && <small>{note}</small>}
    </div>
  )
}

function Overview({ overview, loading }) {
  if (loading && !overview) return <Loading label="Counting the archive…" />
  if (!overview) return <Empty icon={AlertTriangle} title="Nothing to report" text="The overview could not be read. Try Recount." />

  const { people, sessions, queue, security, archive } = overview
  const oldest = queue.oldestPendingAt

  return (
    <div className="acc-plain">
      <section className="acc-card">
        <div className="acc-card-head">
          <Gauge size={16} />
          <div><h3>Signals</h3><p>What is asking for attention, counted just now.</p></div>
        </div>
        <dl className="adm-signals">
          <Signal label="Pending suggestions" value={queue.pending || 0} tone="warn" note={oldest ? `Oldest waiting ${since(oldest)}` : 'Nothing waiting'} />
          <Signal label="Failed sign-ins · 24h" value={security.failures24h} tone="alert" note={`${security.failures7d} in the last 7 days`} />
          <Signal label="Suspended accounts" value={people.byStatus?.suspended || 0} tone="alert" note="Signed out everywhere while suspended" />
          <Signal label="Unverified addresses" value={people.unverified} tone="warn" note="Cannot recover a password" />
          <Signal label="Active sessions" value={sessions.active} note="Across every account" />
          <Signal label="Joined · 7 days" value={people.joined7d} note={`${people.total} accounts in total`} />
        </dl>
      </section>

      <div className="acc-duo">
        <section className="acc-card">
          <div className="acc-card-head">
            <Users size={16} />
            <div><h3>Who holds what</h3><p>Accounts by role and by status.</p></div>
          </div>
          <dl className="acc-facts">
            {ROLES.map((role) => (
              <div key={role}><dt>{role}</dt><dd>{people.byRole?.[role] || 0}</dd></div>
            ))}
            <div><dt>suspended</dt><dd>{people.byStatus?.suspended || 0}</dd></div>
          </dl>
        </section>

        <section className="acc-card">
          <div className="acc-card-head">
            <Activity size={16} />
            <div><h3>What is failing</h3><p>The five most common failures in the last week.</p></div>
            <b>{security.events24h} events · 24h</b>
          </div>
          {security.topFailures?.length ? (
            <ul className="acc-list">
              {security.topFailures.map((row) => (
                <li key={row.action} className="acc-row">
                  <span className="acc-row-glyph is-bad"><AlertTriangle size={13} /></span>
                  <span className="acc-row-title as-static">{eventLabel(row.action)}</span>
                  <span className="acc-row-meta">{row.count}</span>
                </li>
              ))}
            </ul>
          ) : <p className="acc-quiet">No failures recorded this week.</p>}
        </section>
      </div>

      <section className="acc-card">
        <div className="acc-card-head">
          <FileWarning size={16} />
          <div><h3>Archive condition</h3><p>Derived from the content graph, not the database: what the encyclopedia itself still owes.</p></div>
          <b>{archive.records} records</b>
        </div>
        <dl className="adm-signals">
          <Signal label="Source-linked" value={archive.withSource} note={`of ${archive.records} records`} />
          <Signal label="Stubs" value={archive.stubs} tone="warn" note="Little or no body text" />
          <Signal label="Unsourced" value={archive.unsourced} tone="alert" note="No source URL at all" />
          <Signal label="Orphans" value={archive.orphans} tone="warn" note="Nothing links to them" />
          <Signal label="Dead ends" value={archive.deadEnds} tone="warn" note="They link to nothing" />
          <Signal label="Named, not written" value={archive.wanted} tone="warn" note="Cited by a record, no page yet" />
        </dl>

        <div className="adm-worklists">
          {[
            ['Shortest stubs', archive.worklist.stubs, ListChecks],
            ['No source', archive.worklist.unsourced, Link2Off],
            ['Orphaned', archive.worklist.orphans, Link2Off],
          ].map(([title, rows, Icon]) => (
            <div key={title} className="adm-worklist">
              <p className="acc-nav-label"><Icon size={11} aria-hidden="true" /> {title}</p>
              {rows.length ? (
                <ul>
                  {rows.map((row) => (
                    <li key={row.href}><Link href={row.href}>{row.name}</Link><small>{row.kind}</small></li>
                  ))}
                </ul>
              ) : <p className="acc-quiet">Nothing outstanding.</p>}
            </div>
          ))}
          <div className="adm-worklist">
            <p className="acc-nav-label"><FileWarning size={11} aria-hidden="true" /> Named, not written</p>
            {archive.worklist.wanted.length ? (
              <ul>
                {archive.worklist.wanted.map((row) => (
                  <li key={row.name}><span>{row.name}</span><small>cited {row.citedBy}×</small></li>
                ))}
              </ul>
            ) : <p className="acc-quiet">Nothing outstanding.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Queue({ payload, loading, status, onStatus, busy, onReview }) {
  return (
    <section className="acc-narrow">
      <div className="acc-toolbar" role="group" aria-label="Queue filter">
        {[['pending', 'Waiting'], ['accepted', 'Accepted'], ['rejected', 'Rejected']].map(([id, label]) => (
          <button key={id} type="button" onClick={() => onStatus(id)} aria-pressed={status === id} className={cx('acc-filter', status === id && 'is-on')}>{label}</button>
        ))}
        <span className="acc-toolbar-count">{payload?.suggestions?.length ?? 0} shown</span>
      </div>

      {loading && !payload ? <Loading label="Reading the queue…" /> : null}

      {payload && !payload.suggestions.length && (
        <Empty icon={CheckCircle2} title={status === 'pending' ? 'The queue is empty' : 'Nothing here'} text={status === 'pending' ? 'Every submission has been reviewed.' : 'No suggestion carries that decision yet.'} />
      )}

      {payload?.suggestions?.map((item) => (
        <article key={item.id} className="acc-card adm-suggestion">
          <div className="acc-card-head">
            <ListChecks size={16} />
            <div>
              <h3>{item.target ? item.target.title : item.slug}</h3>
              <p>{item.type} · submitted {since(item.createdAt)} by {item.author ? `@${item.author.username}` : 'a deleted account'}</p>
            </div>
            {item.target && <Link href={item.target.href} className="acc-btn is-small">Open record</Link>}
          </div>

          <div className="acc-form">
            <p className="adm-summary">{item.summary}</p>
            {item.details && <p className="adm-details">{item.details}</p>}

            <div className="adm-source">
              {item.sourceUrl ? (
                <>
                  <span className={cx('acc-pill', item.sourceIsOfficial ? 'is-good' : 'is-warn')} data-state={item.sourceIsOfficial ? 'accepted' : 'rejected'}>
                    {item.sourceIsOfficial ? 'Rockstar source' : 'Not a Rockstar URL'}
                  </span>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="acc-source">{item.sourceUrl} <ExternalLink size={11} /></a>
                </>
              ) : (
                <span className="acc-pill" data-state="rejected">No source given</span>
              )}
            </div>

            {status === 'pending' && (
              <div className="acc-actions">
                <button type="button" disabled={busy === `review-${item.id}`} onClick={() => onReview(item.id, 'accepted')} className="acc-btn is-cyan">
                  <CheckCircle2 size={13} />Accept
                </button>
                <button type="button" disabled={busy === `review-${item.id}`} onClick={() => onReview(item.id, 'rejected')} className="acc-btn is-pink">
                  <X size={13} />Reject
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function People({
  payload, loading, operator, isAdmin, busy,
  term, onTerm, roleFilter, onRole, statusFilter, onStatus, page, onPage,
  onRoleChange, onStatusChange, onRevoke,
}) {
  const pages = payload ? Math.max(1, Math.ceil(payload.total / payload.perPage)) : 1

  return (
    <section className="acc-plain">
      <div className="acc-card">
        <div className="acc-card-head">
          <Search size={16} />
          <div><h3>Find an account</h3><p>Search by username or display name. Addresses are encrypted at rest and are not searchable.</p></div>
          <b>{payload?.total ?? 0} total</b>
        </div>
        <div className="acc-form adm-filters">
          <label className="acc-label">
            <span><span>Name</span></span>
            <input value={term} onChange={(event) => onTerm(event.target.value)} placeholder="username or display name" autoComplete="off" />
          </label>
          <label className="acc-label">
            <span><span>Role</span></span>
            <select value={roleFilter} onChange={(event) => onRole(event.target.value)}>
              <option value="">Any role</option>
              {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
            </select>
          </label>
          <label className="acc-label">
            <span><span>Status</span></span>
            <select value={statusFilter} onChange={(event) => onStatus(event.target.value)}>
              <option value="">Any status</option>
              <option value="active">active</option>
              <option value="suspended">suspended</option>
            </select>
          </label>
        </div>
      </div>

      {loading && !payload ? <Loading label="Reading accounts…" /> : null}

      {payload && !payload.users.length && (
        <Empty icon={Users} title="No account matches" text="Nothing in the archive answers that search." />
      )}

      {payload?.users?.map((user) => {
        const self = user.id === operator.id
        const locked = user.lockedUntil && new Date(user.lockedUntil) > new Date()
        return (
          <article key={user.id} className={cx('acc-card adm-account', user.status !== 'active' && 'is-suspended')}>
            <div className="acc-card-head">
              <span className="adm-avatar" aria-hidden="true">{user.displayName.charAt(0).toUpperCase()}</span>
              <div>
                <h3>{user.displayName}{self && <em> · you</em>}</h3>
                <p>@{user.username} · joined {day(user.createdAt)} · last sign-in {day(user.lastLoginAt)}</p>
              </div>
              <div className="adm-account-state">
                <span className="acc-pill" data-state={user.status === 'active' ? 'accepted' : 'rejected'}>{user.status}</span>
                {user.emailVerifiedAt
                  ? <span className="adm-tick" title="Address verified"><BadgeCheck size={14} /></span>
                  : <span className="adm-tick is-warn" title="Address not verified"><AlertTriangle size={14} /></span>}
              </div>
            </div>

            <dl className="adm-account-facts">
              <div><dt>Role</dt><dd>{user.role}</dd></div>
              <div><dt>Sessions</dt><dd>{user.activeSessions}</dd></div>
              <div><dt>Last seen</dt><dd>{user.lastSeenAt ? since(user.lastSeenAt) : '—'}</dd></div>
              <div><dt>Submitted</dt><dd>{Object.values(user.contributions || {}).reduce((sum, n) => sum + n, 0)}</dd></div>
              <div><dt>Accepted</dt><dd>{user.contributions?.accepted || 0}</dd></div>
              <div><dt>Failed sign-ins</dt><dd>{user.failedLoginCount || 0}{locked ? ' · locked' : ''}</dd></div>
            </dl>

            {isAdmin ? (
              <div className="acc-actions adm-account-actions">
                <label className="acc-label adm-role-picker">
                  <span><span>Role</span></span>
                  <select
                    value={user.role}
                    disabled={self || busy === `role-${user.id}`}
                    onChange={(event) => onRoleChange(user.id, event.target.value)}
                  >
                    {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={self || busy === `status-${user.id}`}
                  onClick={() => onStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                  className={cx('acc-btn', user.status === 'active' ? 'is-pink' : 'is-cyan')}
                >
                  {user.status === 'active' ? 'Suspend' : 'Reinstate'}
                </button>
                <button
                  type="button"
                  disabled={self || !user.activeSessions || busy === `revoke-${user.id}`}
                  onClick={() => onRevoke(user.id)}
                  className="acc-btn"
                >
                  <LogOut size={13} />Sign out everywhere
                </button>
                {self && <p className="acc-quiet adm-self-note">Your own role, status and sessions are changed from your account desk, or by another administrator.</p>}
              </div>
            ) : (
              <p className="acc-quiet">Changing an account needs an administrator. You are signed in as a moderator.</p>
            )}
          </article>
        )
      })}

      {payload && pages > 1 && (
        <div className="acc-toolbar adm-pager">
          <button type="button" className="acc-btn is-small" disabled={page <= 1} onClick={() => onPage(page - 1)}><ChevronLeft size={13} />Previous</button>
          <span className="acc-toolbar-count">Page {page} of {pages}</span>
          <button type="button" className="acc-btn is-small" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next<ChevronRight size={13} /></button>
        </div>
      )}
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Sessions({ payload, loading }) {
  if (loading && !payload) return <Loading label="Reading sessions…" />
  if (!payload?.sessions?.length) return <Empty icon={Laptop} title="No live sessions" text="Nobody is signed in right now." />

  return (
    <section className="acc-narrow">
      <div className="acc-toolbar">
        <span className="acc-toolbar-count">{payload.sessions.length} {payload.sessions.length === 1 ? 'session' : 'sessions'}</span>
      </div>
      <ul className="acc-card acc-flush">
        {payload.sessions.map((item) => (
          <li key={item.id} className="acc-row">
            <span className="acc-row-glyph is-round">{/Mobile|iPhone|Android/i.test(item.device || '') ? <Smartphone size={15} /> : <Laptop size={15} />}</span>
            <span className="acc-row-body">
              <strong>{item.owner ? `@${item.owner.username}` : 'deleted account'}{item.owner?.role && item.owner.role !== 'reader' && <em> · {item.owner.role}</em>}</strong>
              <small>{item.device || 'Unknown device'} · last seen {dateTime(item.lastSeenAt)} · expires {day(item.expiresAt)}</small>
            </span>
            <span className="acc-row-meta">{since(item.lastSeenAt)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function Audit({ payload, loading, outcome, onOutcome, action, onAction, page, onPage }) {
  const pages = payload ? Math.max(1, Math.ceil(payload.total / payload.perPage)) : 1

  return (
    <section className="acc-narrow">
      <div className="acc-toolbar" role="group" aria-label="Log filters">
        {[['', 'Everything'], ['failure', 'Failures'], ['success', 'Successes']].map(([id, label]) => (
          <button key={id || 'all'} type="button" onClick={() => onOutcome(id)} aria-pressed={outcome === id} className={cx('acc-filter', outcome === id && 'is-on')}>{label}</button>
        ))}
        <select className="adm-action-picker" value={action} onChange={(event) => onAction(event.target.value)} aria-label="Filter by action">
          <option value="">Any action</option>
          {payload?.actions?.map((row) => <option key={row.action} value={row.action}>{eventLabel(row.action)} ({row.count})</option>)}
        </select>
        <span className="acc-toolbar-count">{payload?.total ?? 0} events</span>
      </div>

      {loading && !payload ? <Loading label="Reading the log…" /> : null}

      {payload && !payload.events.length && <Empty icon={ScrollText} title="Nothing recorded" text="No event matches that filter in the retained window." />}

      {payload?.events?.length > 0 && (
        <ul className="acc-card acc-flush">
          {payload.events.map((event) => (
            <li key={event.id} className={cx('acc-row', event.outcome === 'failure' && 'is-unread')}>
              <span className={cx('acc-row-glyph', event.outcome === 'failure' ? 'is-bad' : 'is-good')}>
                {event.outcome === 'failure' ? <AlertTriangle size={13} /> : <Clock3 size={13} />}
              </span>
              <span className="acc-row-body">
                <strong>{eventLabel(event.action)}</strong>
                <small>
                  {event.actor ? (event.actor.username ? `@${event.actor.username}` : 'account since deleted') : 'anonymous'}
                  {' · '}{event.device || 'unknown device'}
                  {event.metadata && Object.keys(event.metadata).length > 0 && ` · ${Object.entries(event.metadata).map(([key, value]) => `${key}: ${String(value).slice(0, 40)}`).join(' · ')}`}
                </small>
              </span>
              <span className="acc-row-meta">{dateTime(event.createdAt)}</span>
            </li>
          ))}
        </ul>
      )}

      {payload && pages > 1 && (
        <div className="acc-toolbar adm-pager">
          <button type="button" className="acc-btn is-small" disabled={page <= 1} onClick={() => onPage(page - 1)}><ChevronLeft size={13} />Previous</button>
          <span className="acc-toolbar-count">Page {page} of {pages}</span>
          <button type="button" className="acc-btn is-small" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next<ChevronRight size={13} /></button>
        </div>
      )}
    </section>
  )
}
