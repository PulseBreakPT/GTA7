'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { isRockstarUrl } from '@/lib/official-links'
import { useRouter } from 'next/navigation'
import { Activity, Bell, Bookmark, BookOpen, CheckCircle2, Clock3, Download, Eraser, Eye, FolderPlus, Globe2, History, KeyRound, Laptop, ListChecks, LogOut, MailCheck, PenLine, Pin, PinOff, Save, Settings2, ShieldCheck, Smartphone, Sparkles, StickyNote, Trash2, Trophy, UserRound } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'
import { cx } from '@/components/site/ui'

// ---------------------------------------------------------------------------
// THE ARCHIVE DESK
//
// The account page now speaks the front page's language: a dark plate carrying
// the identity, a white slab of destinations riding its lower edge, numbered
// section heads on a rule, and white record cards. Only the presentation
// changed — every action, request and guard below is the one that was here.
// ---------------------------------------------------------------------------

const eventLabel = (action) => ({
  'account.created': 'Account created', 'session.login': 'Signed in', 'session.logout': 'Signed out',
  'session.logout_all': 'All sessions closed', 'session.revoked': 'Session revoked',
  'profile.updated': 'Profile updated', 'password.changed': 'Password changed',
  'password.reset': 'Password recovered', 'password.recovery_requested': 'Recovery requested',
  'email.verified': 'Email verified', 'email.verification_requested': 'Verification requested',
  'wiki.watch_added': 'Page added to watchlist', 'wiki.watch_removed': 'Page removed from watchlist',
  'wiki.suggestion_submitted': 'Wiki suggestion submitted', 'wiki.suggestion_accepted': 'Suggestion accepted',
  'wiki.suggestion_rejected': 'Suggestion rejected', 'wiki.preferences_updated': 'Wiki preferences updated',
  'wiki.history_cleared': 'Reading history cleared', 'wiki.collection_created': 'Collection created',
  'wiki.collection_deleted': 'Collection deleted', 'wiki.note_saved': 'Private note saved',
}[action] || action.replaceAll('.', ' '))

const formatDate = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'
const formatDay = (value) => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(value)) : '—'

// Each destination carries its own index and standfirst, so every section of
// the desk opens the way a section of the front page opens.
const SECTIONS = {
  overview: { index: 1, tone: 'pink', kicker: 'Identity', title: 'Who you are here', copy: 'Your public identity in the archive, the record the server keeps of it, and what you have earned reading it.' },
  watchlist: { index: 2, tone: 'pink', kicker: 'Following', title: 'Watchlist and trail', copy: 'The pages you chose to follow, and the private trail of what you have read.' },
  collections: { index: 3, tone: 'violet', kicker: 'Dossiers', title: 'Personal collections', copy: 'Group entries into research dossiers that belong only to you. A page can sit in several at once.' },
  notes: { index: 4, tone: 'cyan', kicker: 'Marginalia', title: 'Private notes', copy: 'Your own research layer on top of the archive. Notes are never public and never reach an editor.' },
  contributions: { index: 5, tone: 'violet', kicker: 'Editorial', title: 'Contributions', copy: 'Suggestions enter a moderated queue. Nothing you submit overwrites a sourced article directly.' },
  notifications: { index: 6, tone: 'sun', kicker: 'Signal', title: 'Notices', copy: 'Changes to pages you watch, and decisions on what you submitted.' },
  preferences: { index: 7, tone: 'cyan', kicker: 'Controls', title: 'Preferences', copy: 'Settings that change how the archive behaves for this account, applied the moment you save them.' },
  security: { index: 8, tone: 'pink', kicker: 'Credentials', title: 'Password and deletion', copy: 'The two irreversible controls on this account, kept apart from everything else.' },
  sessions: { index: 9, tone: 'violet', kicker: 'Devices', title: 'Active sessions', copy: 'Only opaque session records are stored. Revoke anything you do not recognise.' },
  activity: { index: 10, tone: 'sun', kicker: 'Audit', title: 'Security activity', copy: 'A privacy-reduced trail kept for 180 days. Raw IP addresses are never stored.' },
}

export default function AccountClient({ initialUser, initialSession, initialSection = 'overview', initialTarget = null }) {
  const router = useRouter()
  const { user: contextUser, capabilities, request, setUser } = useAuth()
  const user = contextUser || initialUser
  const [section, setSection] = useState(initialSection)
  const [profile, setProfile] = useState({ displayName: user.displayName, username: user.username, bio: user.bio || '' })
  const [password, setPassword] = useState({ currentPassword: '', password: '', confirm: '' })
  const [deletion, setDeletion] = useState({ currentPassword: '', confirmation: '' })
  const [sessions, setSessions] = useState(initialSession ? [initialSession] : [])
  const [events, setEvents] = useState([])
  const [wiki, setWiki] = useState({ watchlist: [], history: [], suggestions: [], notifications: [], reviewQueue: [], collections: [], collectionItems: [], notes: [], metrics: {}, achievements: [] })
  const [preferences, setPreferences] = useState(user.wikiPreferences || { publicProfile: true, recordHistory: true, compactMode: false })
  const [suggestion, setSuggestion] = useState({ type: 'correction', summary: '', details: '', sourceUrl: '' })
  const [collectionForm, setCollectionForm] = useState({ name: '', description: '', color: 'violet' })
  const [noteBody, setNoteBody] = useState('')
  const [notificationFilter, setNotificationFilter] = useState('all')
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const loadSecurity = async () => {
    const [sessionsResponse, auditResponse] = await Promise.all([
      fetch('/api/auth/sessions', { credentials: 'same-origin', cache: 'no-store' }),
      fetch('/api/auth/audit', { credentials: 'same-origin', cache: 'no-store' }),
    ])
    if (sessionsResponse.status === 401 || auditResponse.status === 401) return router.replace('/login?next=/account')
    const [sessionsData, auditData] = await Promise.all([sessionsResponse.json(), auditResponse.json()])
    setSessions(sessionsData.sessions || [])
    setEvents(auditData.events || [])
  }

  const loadWiki = async () => {
    const response = await fetch('/api/auth/wiki-dashboard', { credentials: 'same-origin', cache: 'no-store' })
    if (response.status === 401) return router.replace('/login?next=/account')
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Could not load wiki tools.')
    setWiki({
      watchlist: data.watchlist || [], history: data.history || [], suggestions: data.suggestions || [], notifications: data.notifications || [],
      reviewQueue: data.reviewQueue || [], collections: data.collections || [], collectionItems: data.collectionItems || [], notes: data.notes || [],
      metrics: data.metrics || {}, achievements: data.achievements || [],
    })
    if (data.preferences) setPreferences(data.preferences)
  }

  useEffect(() => { loadSecurity().catch(() => {}); loadWiki().catch(() => {}) }, [])

  useEffect(() => {
    if (!initialTarget) return
    const saved = localStorage.getItem(`gta-lore:suggestion:${initialTarget.kind}:${initialTarget.slug}`)
    if (!saved) return
    try { setSuggestion((current) => ({ ...current, ...JSON.parse(saved) })) } catch { /* ignore a malformed local draft */ }
  }, [initialTarget])

  useEffect(() => {
    if (!initialTarget) return
    const key = `gta-lore:suggestion:${initialTarget.kind}:${initialTarget.slug}`
    if (suggestion.summary || suggestion.details || suggestion.sourceUrl) localStorage.setItem(key, JSON.stringify(suggestion))
    else localStorage.removeItem(key)
  }, [initialTarget, suggestion])

  useEffect(() => {
    if (!initialTarget) return setNoteBody('')
    const key = `${initialTarget.kind}:${initialTarget.slug}`
    setNoteBody(wiki.notes.find((item) => item.key === key)?.body || '')
  }, [initialTarget, wiki.notes])

  const act = async (name, operation) => {
    setBusy(name); setMessage(''); setError('')
    try { const result = await operation(); if (result?.message) setMessage(result.message); return result }
    catch (actionError) { setError(actionError.message || 'Request failed.'); return null }
    finally { setBusy('') }
  }

  const saveProfile = async (event) => {
    event.preventDefault()
    const data = await act('profile', () => request('profile', { method: 'PATCH', body: profile }))
    if (data?.user) { setUser(data.user); setMessage('Profile updated.') }
  }

  const changePassword = async (event) => {
    event.preventDefault()
    if (password.password !== password.confirm) return setError('New passwords do not match.')
    const data = await act('password', () => request('change-password', { body: { currentPassword: password.currentPassword, password: password.password } }))
    if (data) { setPassword({ currentPassword: '', password: '', confirm: '' }); await loadSecurity() }
  }

  const revoke = async (id) => {
    const data = await act(`session-${id}`, () => request(`sessions/${encodeURIComponent(id)}`, { method: 'DELETE' }))
    if (data?.currentRevoked) router.replace('/login')
    else if (data) await loadSecurity()
  }

  const closeAll = async () => {
    const data = await act('logout-all', () => request('logout-all'))
    if (data) router.replace('/login')
  }

  const logout = async () => {
    const data = await act('logout', () => request('logout'))
    if (data) router.replace('/')
  }

  const deleteAccount = async (event) => {
    event.preventDefault()
    const data = await act('delete-account', () => request('delete-account', { body: deletion }))
    if (data) router.replace('/')
  }

  const removeWatch = async (item) => {
    const data = await act(`watch-${item.key}`, () => request('watch', { body: { kind: item.kind, slug: item.slug, watching: false } }))
    if (data) await loadWiki()
  }

  const submitSuggestion = async (event) => {
    event.preventDefault()
    if (!initialTarget) return
    const data = await act('suggestion', () => request('suggestion', { body: { ...suggestion, kind: initialTarget.kind, slug: initialTarget.slug } }))
    if (data) {
      localStorage.removeItem(`gta-lore:suggestion:${initialTarget.kind}:${initialTarget.slug}`)
      setSuggestion({ type: 'correction', summary: '', details: '', sourceUrl: '' })
      await loadWiki()
    }
  }

  const savePreferences = async (event) => {
    event.preventDefault()
    const data = await act('preferences', () => request('preferences', { method: 'PATCH', body: preferences }))
    if (data?.user) { setUser(data.user); setPreferences(data.preferences); await loadWiki() }
  }

  const markNotificationsRead = async () => {
    const data = await act('notifications-read', () => request('notifications-read'))
    if (data) await loadWiki()
  }

  const reviewSuggestion = async (id, status) => {
    const data = await act(`review-${id}`, () => request('suggestion-review', { body: { id, status } }))
    if (data) await loadWiki()
  }

  const togglePin = async (item) => {
    const data = await act(`pin-${item.key}`, () => request('watch-pin', { body: { kind: item.kind, slug: item.slug, pinned: !item.pinned } }))
    if (data) await loadWiki()
  }

  const clearHistory = async () => {
    if (!window.confirm('Clear your complete private reading history?')) return
    const data = await act('history-clear', () => request('history-clear'))
    if (data) await loadWiki()
  }

  const createCollection = async (event) => {
    event.preventDefault()
    const data = await act('collection-create', () => request('collection-create', { body: collectionForm }))
    if (data) { setCollectionForm({ name: '', description: '', color: 'violet' }); await loadWiki() }
  }

  const deleteCollection = async (collectionId) => {
    if (!window.confirm('Delete this collection and remove all pages from it?')) return
    const data = await act(`collection-${collectionId}`, () => request('collection-delete', { body: { collectionId } }))
    if (data) await loadWiki()
  }

  const toggleCollectionItem = async (collection) => {
    if (!initialTarget) return
    const key = `${initialTarget.kind}:${initialTarget.slug}`
    const saved = wiki.collectionItems.some((item) => item.collectionId === collection.id && item.key === key)
    const data = await act(`collection-item-${collection.id}`, () => request('collection-item', { body: { collectionId: collection.id, kind: initialTarget.kind, slug: initialTarget.slug, saved: !saved } }))
    if (data) await loadWiki()
  }

  const saveNote = async (event) => {
    event.preventDefault()
    if (!initialTarget) return
    const data = await act('note', () => request('note', { body: { kind: initialTarget.kind, slug: initialTarget.slug, body: noteBody } }))
    if (data) await loadWiki()
  }

  const deleteNote = async (item) => {
    if (!window.confirm(`Delete your private note for ${item.title}?`)) return
    const data = await act(`note-${item.key}`, () => request('note', { body: { kind: item.kind, slug: item.slug, body: '' } }))
    if (data) await loadWiki()
  }

  const groups = useMemo(() => [
    {
      label: 'Your archive',
      items: [
        ['overview', 'Identity', UserRound],
        ['watchlist', 'Watchlist', Bookmark],
        ['collections', 'Collections', FolderPlus],
        ['notes', 'Notes', StickyNote],
      ],
    },
    {
      label: 'Editorial',
      items: [
        ['contributions', 'Contributions', PenLine],
        ['notifications', 'Notices', Bell],
      ],
    },
    {
      label: 'Account',
      items: [
        ['preferences', 'Preferences', Settings2],
        ['security', 'Password', KeyRound],
        ['sessions', 'Sessions', Laptop],
        ['activity', 'Security log', Activity],
      ],
    },
  ], [])

  const unreadCount = wiki.notifications.filter((item) => item.unread).length

  const visibleNotifications = wiki.notifications.filter((item) => (
    notificationFilter === 'all'
      || (notificationFilter === 'unread' && item.unread)
      || (notificationFilter === 'watch' && item.type === 'watch.updated')
      || (notificationFilter === 'contributions' && item.type.startsWith('suggestion.'))
  ))

  const meta = SECTIONS[section] || SECTIONS.overview

  return (
    <div className="acc-desk">
      {/* ---- Identity header ------------------------------------------------
          The front page's editorial construction on paper: a coloured kicker,
          the name at display size, a rule, and a rail of real counts. */}
      <section className="acc-plate" aria-labelledby="acc-name">
        <div className="acc-plate-body">
          <div className="acc-lockup">
            <span className="acc-monogram" aria-hidden="true">{user.displayName.charAt(0).toUpperCase()}</span>
            <div>
              <p className="acc-plate-kicker"><i aria-hidden="true" />Archive desk<span>·</span>{user.role}</p>
              <h1 id="acc-name">{user.displayName}</h1>
              <p className="acc-plate-sub">@{user.username}<span>·</span>Member since {formatDay(user.createdAt)}</p>
            </div>
          </div>

          <div className="acc-plate-chips">
            <span className={cx('acc-chip', user.emailVerified ? 'is-good' : 'is-pending')}>
              {user.emailVerified ? <CheckCircle2 size={12} /> : <MailCheck size={12} />}
              {user.emailVerified ? 'Verified email' : 'Email pending'}
            </span>
            <span className="acc-chip"><ShieldCheck size={12} />Role · {user.role}</span>
            <span className="acc-chip"><Laptop size={12} />{sessions.length} active {sessions.length === 1 ? 'session' : 'sessions'}</span>
            {preferences.publicProfile && (
              <Link href={`/users/${encodeURIComponent(user.username)}`} className="acc-chip is-link"><Globe2 size={12} />View public page</Link>
            )}
          </div>

          <dl className="acc-plate-meta">
            {[
              ['Watched', wiki.metrics.watched || 0],
              ['Read', wiki.metrics.read || 0],
              ['Collections', wiki.metrics.collections || 0],
              ['Notes', wiki.metrics.notes || 0],
              ['Accepted', wiki.metrics.accepted || 0],
            ].map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Destinations --------------------------------------------------
          The white slab that rides the plate's lower edge, exactly as the
          front page's action bar rides the hero. */}
      <div className="acc-layout">
        {/* Not a tablist: these are ten separate views of the desk, with no tab
            panels and no arrow-key contract. A navigation list with aria-current
            is what a screen reader is actually being told here. */}
        <nav className="acc-nav" aria-label="Account desk sections">
          {groups.map((group) => (
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
                      {id === 'notifications' && unreadCount > 0 && <b>{unreadCount}</b>}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <footer>
            <button type="button" onClick={logout} className="acc-nav-out"><LogOut size={15} aria-hidden="true" />Sign out</button>
          </footer>
        </nav>

        <div className="acc-body">
        <SectionHead {...meta} />

        {(message || error) && (
          <p role={error ? 'alert' : 'status'} className={cx('acc-flash', error ? 'is-error' : 'is-ok')}>{error || message}</p>
        )}

        {section === 'overview' && (
          <div className="acc-split">
            <form onSubmit={saveProfile} className="acc-card">
              <div className="acc-card-head">
                <UserRound size={16} />
                <div><h3>Public identity</h3><p>What other readers see when your profile is public.</p></div>
              </div>
              <div className="acc-form">
                <AccountField label="Display name" value={profile.displayName} onChange={(event) => setProfile({ ...profile, displayName: event.target.value })} minLength={2} maxLength={50} required />
                <AccountField label="Username" value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value })} minLength={3} maxLength={30} pattern="[A-Za-z0-9_-]+" required hint="Letters, numbers, _ and -" />
                <label className="acc-label">
                  <span><span>Bio</span><small>{profile.bio.length}/240</small></span>
                  <textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} maxLength={240} rows={4} />
                </label>
                <button disabled={busy === 'profile'} className="acc-btn is-primary"><Save size={13} />{busy === 'profile' ? 'Saving…' : 'Save profile'}</button>
              </div>
            </form>

            <aside className="acc-card">
              <div className="acc-card-head">
                <ShieldCheck size={16} />
                <div><h3>Account record</h3><p>What the server stores about this identity.</p></div>
              </div>
              <dl className="acc-facts">
                {[['Email', user.email], ['Email status', user.emailVerified ? 'Verified' : 'Pending'], ['Role', user.role], ['Account ID', user.id]].map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                ))}
              </dl>
              {!user.emailVerified && capabilities.emailDelivery && (
                <button disabled={busy === 'verify'} onClick={() => act('verify', () => request('resend-verification'))} className="acc-btn is-cyan is-block">Send verification email</button>
              )}
              {!user.emailVerified && !capabilities.emailDelivery && (
                <p className="acc-note is-sun">Email verification is ready but delivery awaits server configuration.</p>
              )}
            </aside>

            <section className="acc-card acc-span">
              <div className="acc-card-head">
                <Trophy size={16} />
                <div><h3>Archive achievements</h3><p>Earned by reading, following and contributing.</p></div>
                <b>{wiki.achievements.filter((item) => item.unlocked).length}/{wiki.achievements.length}</b>
              </div>
              <div className="acc-trophies">
                {wiki.achievements.map((item) => (
                  <div key={item.id} className={cx('acc-trophy', item.unlocked && 'is-on')}>
                    <Sparkles size={14} />
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {section === 'watchlist' && (
          <div className="acc-duo">
            <section className="acc-card">
              <div className="acc-card-head">
                <Bookmark size={16} />
                <div><h3>Watchlist</h3><p>Pages you chose to follow.</p></div>
                <b>{wiki.watchlist.length}</b>
              </div>
              {wiki.watchlist.length ? (
                <ul className="acc-list">
                  {wiki.watchlist.map((item) => (
                    <li key={item.key} className={cx('acc-row', item.pinned && 'is-pinned')}>
                      <button type="button" disabled={busy === `pin-${item.key}`} onClick={() => togglePin(item)} aria-label={item.pinned ? `Unpin ${item.title}` : `Pin ${item.title}`} className={cx('acc-icon-btn', item.pinned && 'is-on')}>
                        {item.pinned ? <PinOff size={13} /> : <Pin size={13} />}
                      </button>
                      <Link href={item.href} className="acc-row-title">{item.title}</Link>
                      <span className="acc-row-meta">{item.pinned ? 'Pinned' : `Since ${formatDay(item.createdAt)}`}</span>
                      <button type="button" disabled={busy === `watch-${item.key}`} onClick={() => removeWatch(item)} aria-label={`Stop watching ${item.title}`} className="acc-icon-btn is-danger"><Trash2 size={13} /></button>
                    </li>
                  ))}
                </ul>
              ) : <EmptyState icon={Bookmark} title="Nothing watched yet" text="Open an encyclopedia entry and choose Watch in its page tools." />}
            </section>

            <section className="acc-card">
              <div className="acc-card-head">
                <History size={16} />
                <div><h3>Reading history</h3><p>Private to your account, controlled in Preferences.</p></div>
                {wiki.history.length > 0 && (
                  <button type="button" disabled={busy === 'history-clear'} onClick={clearHistory} className="acc-btn is-small"><Eraser size={11} />Clear</button>
                )}
              </div>
              {wiki.history.length ? (
                <ol className="acc-list">
                  {wiki.history.map((item) => (
                    <li key={item.key} className="acc-row">
                      <span className="acc-row-glyph"><Eye size={13} /></span>
                      <Link href={item.href} className="acc-row-title">{item.title}</Link>
                      <span className="acc-row-meta">{item.viewCount}× · {formatDay(item.lastViewedAt)}</span>
                    </li>
                  ))}
                </ol>
              ) : <EmptyState icon={History} title={preferences.recordHistory ? 'No reading history yet' : 'History is disabled'} text={preferences.recordHistory ? 'Visited wiki entries will appear here.' : 'Enable it in Preferences if you want a private reading trail.'} />}
            </section>
          </div>
        )}

        {section === 'collections' && (
          <section className="acc-plain">
            {initialTarget && (
              <div className="acc-target">
                <span>Adding page</span>
                <Link href={initialTarget.href}>{initialTarget.title}</Link>
                <p>Choose a collection below. A page can belong to several collections.</p>
              </div>
            )}

            {/* The form is the last cell of the same grid, not a sidebar: a
                350px column beside the dossiers left them one-across, and a
                form placed first pushed the dossiers below the fold. */}
            <div className="acc-collections">
              {wiki.collections.map((collection) => {
                const items = wiki.collectionItems.filter((item) => item.collectionId === collection.id)
                const targetKey = initialTarget && `${initialTarget.kind}:${initialTarget.slug}`
                const containsTarget = Boolean(targetKey && items.some((item) => item.key === targetKey))
                return (
                  <article key={collection.id} className="acc-card acc-collection" data-tone={collection.color}>
                    <span className="acc-collection-band" aria-hidden="true" />
                    <div className="acc-card-head">
                      <FolderPlus size={16} />
                      <div><h3>{collection.name}</h3><p>{collection.description || 'Private wiki collection'}</p></div>
                      <button type="button" disabled={busy === `collection-${collection.id}`} onClick={() => deleteCollection(collection.id)} aria-label={`Delete ${collection.name}`} className="acc-icon-btn is-danger"><Trash2 size={13} /></button>
                    </div>
                    {initialTarget && (
                      <button type="button" disabled={busy === `collection-item-${collection.id}`} onClick={() => toggleCollectionItem(collection)} className={cx('acc-btn is-block', containsTarget ? 'is-pink' : 'is-violet')}>
                        {containsTarget ? 'Remove current page' : 'Add current page'}
                      </button>
                    )}
                    {items.length ? (
                      <ul className="acc-minilist">
                        {items.slice(0, 6).map((item) => (
                          <li key={item.key}><Link href={item.href}><Bookmark size={10} />{item.title}</Link></li>
                        ))}
                      </ul>
                    ) : <p className="acc-quiet">Nothing filed here yet.</p>}
                    <span className="acc-count">{items.length} {items.length === 1 ? 'page' : 'pages'}</span>
                  </article>
                )
              })}

              <form onSubmit={createCollection} className="acc-card acc-collection is-new">
                <div className="acc-card-head">
                  <FolderPlus size={16} />
                  <div><h3>New collection</h3><p>{wiki.collections.length}/50 used.</p></div>
                </div>
                <div className="acc-form">
                  <AccountField label="Name" value={collectionForm.name} onChange={(event) => setCollectionForm({ ...collectionForm, name: event.target.value })} minLength={2} maxLength={40} required />
                  <AccountField label="Description" value={collectionForm.description} onChange={(event) => setCollectionForm({ ...collectionForm, description: event.target.value })} maxLength={160} hint={`${collectionForm.description.length}/160`} />
                  <label className="acc-label">
                    <span><span>Colour</span></span>
                    <select value={collectionForm.color} onChange={(event) => setCollectionForm({ ...collectionForm, color: event.target.value })}>
                      <option value="violet">Vice violet</option>
                      <option value="pink">Neon pink</option>
                      <option value="mint">Ocean mint</option>
                      <option value="sunset">Sunset</option>
                      <option value="ocean">Deep ocean</option>
                    </select>
                  </label>
                  <button disabled={busy === 'collection-create'} className="acc-btn is-primary is-block"><FolderPlus size={13} />{busy === 'collection-create' ? 'Creating…' : 'Create collection'}</button>
                </div>
              </form>
            </div>
          </section>
        )}

        {section === 'notes' && (
          <div className="acc-split">
            <section className="acc-card">
              <div className="acc-card-head">
                <StickyNote size={16} />
                <div><h3>Private article note</h3><p>Never public, never sent to editors.</p></div>
              </div>
              {initialTarget ? (
                <form onSubmit={saveNote} className="acc-form">
                  <div className="acc-target is-cyan">
                    <span>Page</span>
                    <Link href={initialTarget.href}>{initialTarget.title}</Link>
                  </div>
                  <label className="acc-label">
                    <span><span>Note</span><small>{noteBody.length}/3000</small></span>
                    <textarea value={noteBody} onChange={(event) => setNoteBody(event.target.value)} maxLength={3000} rows={12} placeholder="Connections, questions, source leads…" />
                  </label>
                  <button disabled={busy === 'note'} className="acc-btn is-primary"><Save size={13} />{busy === 'note' ? 'Saving…' : noteBody.trim() ? 'Save private note' : 'Delete note'}</button>
                </form>
              ) : <EmptyState icon={StickyNote} title="Choose an article first" text="Open an entry and select Private note in its page tools." action={<Link href="/wiki" className="acc-btn is-ghost">Browse the wiki</Link>} />}
            </section>

            <aside className="acc-card">
              <div className="acc-card-head">
                <StickyNote size={16} />
                <div><h3>Recent notes</h3><p>Every page you have annotated.</p></div>
                <b>{wiki.notes.length}</b>
              </div>
              {wiki.notes.length ? (
                <ol className="acc-list">
                  {wiki.notes.map((item) => (
                    <li key={item.key} className="acc-stack">
                      <div>
                        <Link href={`/account?section=notes&kind=${encodeURIComponent(item.kind)}&slug=${encodeURIComponent(item.slug)}`} className="acc-row-title">{item.title}</Link>
                        <button type="button" disabled={busy === `note-${item.key}`} onClick={() => deleteNote(item)} aria-label={`Delete note for ${item.title}`} className="acc-icon-btn is-danger"><Trash2 size={12} /></button>
                      </div>
                      <p>{item.body}</p>
                      <span className="acc-row-meta">Updated {formatDay(item.updatedAt)}</span>
                    </li>
                  ))}
                </ol>
              ) : <p className="acc-quiet">No private notes yet.</p>}
            </aside>
          </div>
        )}

        {section === 'contributions' && (
          <div className="acc-split">
            <section className="acc-card">
              <div className="acc-card-head">
                <PenLine size={16} />
                <div><h3>Suggest an improvement</h3><p>Moderated queue. Sourced articles are never overwritten directly.</p></div>
              </div>
              {initialTarget ? (
                <form onSubmit={submitSuggestion} className="acc-form">
                  <div className="acc-target is-cyan">
                    <span>Target page</span>
                    <Link href={initialTarget.href}>{initialTarget.title}</Link>
                  </div>
                  <label className="acc-label">
                    <span><span>Suggestion type</span></span>
                    <select value={suggestion.type} onChange={(event) => setSuggestion({ ...suggestion, type: event.target.value })}>
                      <option value="correction">Factual correction</option>
                      <option value="source">Better source</option>
                      <option value="expansion">Sourced expansion</option>
                      <option value="typo">Typo or formatting</option>
                    </select>
                  </label>
                  <AccountField label="Summary" value={suggestion.summary} onChange={(event) => setSuggestion({ ...suggestion, summary: event.target.value })} minLength={8} maxLength={160} required hint={`${suggestion.summary.length}/160`} />
                  <label className="acc-label">
                    <span><span>Proposed change</span><small>{suggestion.details.length}/4000</small></span>
                    <textarea value={suggestion.details} onChange={(event) => setSuggestion({ ...suggestion, details: event.target.value })} minLength={20} maxLength={4000} rows={7} required />
                  </label>
                  <AccountField label="Rockstar source URL" type="url" value={suggestion.sourceUrl} onChange={(event) => setSuggestion({ ...suggestion, sourceUrl: event.target.value })} required={suggestion.type !== 'typo'} maxLength={800} hint={suggestion.type === 'typo' ? 'Optional for typos' : 'Official rockstargames.com evidence required'} />
                  <button disabled={busy === 'suggestion'} className="acc-btn is-primary"><PenLine size={13} />{busy === 'suggestion' ? 'Submitting…' : 'Submit for review'}</button>
                </form>
              ) : <EmptyState icon={PenLine} title="Choose an article first" text="Open any character, vehicle, weapon, location or other entry and select Suggest edit in its page tools." action={<Link href="/wiki" className="acc-btn is-ghost">Browse the wiki</Link>} />}
            </section>

            <aside className="acc-plain">
              <div className="acc-card">
                <div className="acc-card-head">
                  <ListChecks size={16} />
                  <div><h3>Your submissions</h3><p>Everything you have sent for review.</p></div>
                  <b>{wiki.suggestions.length}</b>
                </div>
                {wiki.suggestions.length ? (
                  <ol className="acc-list">
                    {wiki.suggestions.map((item) => (
                      <li key={item.id} className="acc-stack">
                        <div>
                          <Link href={item.href} className="acc-row-title">{item.title}</Link>
                          <StatusPill value={item.status} />
                        </div>
                        <p>{item.summary}</p>
                        <span className="acc-row-meta">{item.type} · {formatDay(item.createdAt)}</span>
                      </li>
                    ))}
                  </ol>
                ) : <p className="acc-quiet">No suggestions submitted.</p>}
              </div>

              {wiki.reviewQueue.length > 0 && (
                <div className="acc-card">
                  <div className="acc-card-head">
                    <ShieldCheck size={16} />
                    <div><h3>Editorial queue</h3><p>Waiting on your decision.</p></div>
                    <b>{wiki.reviewQueue.length}</b>
                  </div>
                  <ol className="acc-list">
                    {wiki.reviewQueue.map((item) => (
                      <li key={item.id} className="acc-stack">
                        <div><Link href={item.href} className="acc-row-title">{item.title}</Link></div>
                        <p>{item.summary}</p>
                        {isRockstarUrl(item.sourceUrl) && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="acc-source">Rockstar source ↗</a>}
                        <div className="acc-actions">
                          <button type="button" disabled={busy === `review-${item.id}`} onClick={() => reviewSuggestion(item.id, 'accepted')} className="acc-btn is-small is-cyan">Accept</button>
                          <button type="button" disabled={busy === `review-${item.id}`} onClick={() => reviewSuggestion(item.id, 'rejected')} className="acc-btn is-small is-pink">Reject</button>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </aside>
          </div>
        )}

        {section === 'notifications' && (
          <section className="acc-narrow">
            <div className="acc-toolbar" role="group" aria-label="Notification filters">
              {[['all', 'All'], ['unread', 'Unread'], ['watch', 'Watchlist'], ['contributions', 'Contributions']].map(([id, label]) => (
                <button key={id} type="button" onClick={() => setNotificationFilter(id)} aria-pressed={notificationFilter === id} className={cx('acc-filter', notificationFilter === id && 'is-on')}>{label}</button>
              ))}
              <span className="acc-toolbar-count">{visibleNotifications.length} of {wiki.notifications.length}</span>
              {unreadCount > 0 && (
                <button type="button" disabled={busy === 'notifications-read'} onClick={markNotificationsRead} className="acc-btn is-small is-cyan">Mark all read</button>
              )}
            </div>
            {visibleNotifications.length ? (
              <ol className="acc-card acc-flush">
                {visibleNotifications.map((item) => (
                  <li key={item.id} className={cx('acc-row', item.unread && 'is-unread')}>
                    <span className={cx('acc-dot', item.unread && 'is-on')} aria-hidden="true" />
                    <span className="acc-row-glyph"><Bell size={13} /></span>
                    <Link href={item.href} className="acc-row-title">{item.title}</Link>
                    <span className="acc-row-meta">{formatDate(item.createdAt)}</span>
                  </li>
                ))}
              </ol>
            ) : <EmptyState icon={Bell} title={wiki.notifications.length ? 'No notices in this filter' : 'You are all caught up'} text={wiki.notifications.length ? 'Choose another notification filter.' : 'Watch pages or submit improvements to receive useful notices here.'} />}
          </section>
        )}

        {section === 'preferences' && (
          <form onSubmit={savePreferences} className="acc-card acc-narrow">
            <div className="acc-card-head">
              <Settings2 size={16} />
              <div><h3>Wiki preferences</h3><p>Applied to this account the moment you save.</p></div>
            </div>
            <div className="acc-toggles">
              <PreferenceToggle icon={Globe2} title="Public user page" text="Let readers see your display name, bio and accepted contribution count." checked={preferences.publicProfile} onChange={(value) => setPreferences({ ...preferences, publicProfile: value })} />
              <PreferenceToggle icon={History} title="Private reading history" text="Remember recently opened encyclopedia entries. Turning this off deletes the stored history." checked={preferences.recordHistory} onChange={(value) => setPreferences({ ...preferences, recordHistory: value })} />
              <PreferenceToggle icon={BookOpen} title="Compact reading density" text="Reduce spacing in wiki article sections and support panels on this account." checked={preferences.compactMode} onChange={(value) => setPreferences({ ...preferences, compactMode: value })} />
            </div>
            <div className="acc-actions">
              <button disabled={busy === 'preferences'} className="acc-btn is-primary"><Save size={13} />{busy === 'preferences' ? 'Saving…' : 'Save preferences'}</button>
              <a href="/api/auth/export" download className="acc-btn is-violet"><Download size={13} />Export my wiki data</a>
            </div>
          </form>
        )}

        {section === 'security' && (
          <div className="acc-narrow acc-stackcards">
            <form onSubmit={changePassword} className="acc-card">
              <div className="acc-card-head">
                <KeyRound size={16} />
                <div><h3>Change password</h3><p>A successful change closes every other device session.</p></div>
              </div>
              <div className="acc-form">
                <AccountField label="Current password" type="password" autoComplete="current-password" value={password.currentPassword} onChange={(event) => setPassword({ ...password, currentPassword: event.target.value })} required />
                <AccountField label="New password" type="password" autoComplete="new-password" minLength={15} maxLength={128} value={password.password} onChange={(event) => setPassword({ ...password, password: event.target.value })} required hint="15–128 characters" />
                <AccountField label="Confirm new password" type="password" autoComplete="new-password" minLength={15} maxLength={128} value={password.confirm} onChange={(event) => setPassword({ ...password, confirm: event.target.value })} required />
                <button disabled={busy === 'password'} className="acc-btn is-primary"><KeyRound size={13} />{busy === 'password' ? 'Securing…' : 'Change password'}</button>
              </div>
            </form>

            <form onSubmit={deleteAccount} className="acc-card is-danger">
              <div className="acc-card-head">
                <Trash2 size={16} />
                <div><h3>Delete account</h3><p>Permanently removes the identity, tokens and every active session. This cannot be undone.</p></div>
              </div>
              <div className="acc-form">
                <AccountField label="Current password" type="password" autoComplete="current-password" maxLength={128} value={deletion.currentPassword} onChange={(event) => setDeletion({ ...deletion, currentPassword: event.target.value })} required />
                <AccountField label="Type DELETE" value={deletion.confirmation} onChange={(event) => setDeletion({ ...deletion, confirmation: event.target.value })} pattern="DELETE" required />
                <button disabled={busy === 'delete-account' || deletion.confirmation !== 'DELETE'} className="acc-btn is-pink"><Trash2 size={13} />{busy === 'delete-account' ? 'Deleting…' : 'Delete permanently'}</button>
              </div>
            </form>
          </div>
        )}

        {section === 'sessions' && (
          <section className="acc-narrow">
            <div className="acc-toolbar">
              <span className="acc-toolbar-count">{sessions.length} {sessions.length === 1 ? 'device' : 'devices'}</span>
              <button disabled={busy === 'logout-all'} onClick={closeAll} className="acc-btn is-small is-pink"><LogOut size={12} />Close all sessions</button>
            </div>
            <ul className="acc-card acc-flush">
              {sessions.map((session) => (
                <li key={session.id} className="acc-row">
                  <span className="acc-row-glyph is-round">{session.device.includes('Mobile') ? <Smartphone size={15} /> : <Laptop size={15} />}</span>
                  <span className="acc-row-body">
                    <strong>{session.device}{session.current && <em> · This device</em>}</strong>
                    <small>Last active {formatDate(session.lastSeenAt)} · expires {formatDate(session.expiresAt)}</small>
                  </span>
                  <button disabled={busy === `session-${session.id}`} onClick={() => revoke(session.id)} aria-label={`Revoke ${session.device}`} className="acc-icon-btn is-danger"><Trash2 size={14} /></button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {section === 'activity' && (
          <section className="acc-narrow">
            {events.length ? (
              <ol className="acc-card acc-flush">
                {events.map((event) => (
                  <li key={event.id} className="acc-row">
                    <span className={cx('acc-row-glyph', event.outcome === 'failure' ? 'is-bad' : 'is-good')}><Clock3 size={13} /></span>
                    <span className="acc-row-title as-static">{eventLabel(event.action)}</span>
                    <span className="acc-row-meta">{event.device} · {formatDate(event.createdAt)}</span>
                  </li>
                ))}
              </ol>
            ) : <EmptyState icon={Activity} title="No security events yet" text="Signing in, changing a password or revoking a device will be recorded here." />}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// The front page's section head, reused verbatim in structure: an index, a
// coloured kicker, a display-size title and a standfirst, sitting on a rule.
function SectionHead({ index, kicker, title, copy, tone }) {
  return (
    <header className="acc-head" data-tone={tone}>
      <span className="acc-head-index">{String(index).padStart(2, '0')}</span>
      <div>
        <p>{kicker}</p>
        <h2>{title}</h2>
        {copy && <span>{copy}</span>}
      </div>
    </header>
  )
}

function AccountField({ label, hint, ...props }) {
  return (
    <label className="acc-label">
      <span><span>{label}</span>{hint && <small>{hint}</small>}</span>
      <input {...props} />
    </label>
  )
}

function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="acc-empty">
      <Icon size={20} aria-hidden="true" />
      <strong>{title}</strong>
      <p>{text}</p>
      {action}
    </div>
  )
}

function StatusPill({ value }) {
  return <span className="acc-pill" data-state={value}>{value}</span>
}

function PreferenceToggle({ icon: Icon, title, text, checked, onChange }) {
  return (
    <label className="acc-toggle">
      <span className="acc-toggle-glyph"><Icon size={14} /></span>
      <span className="acc-toggle-copy">
        <strong>{title}</strong>
        <span>{text}</span>
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only peer" />
      <span aria-hidden="true" className="acc-switch" />
    </label>
  )
}
