'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Activity, Bell, Bookmark, BookOpen, CheckCircle2, Clock3, Download, Eraser, Eye, FolderPlus, Globe2, History, KeyRound, Laptop, ListChecks, LogOut, MailCheck, PenLine, Pin, PinOff, Save, Settings2, ShieldCheck, Smartphone, Sparkles, StickyNote, Trash2, Trophy, UserRound } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'
import { cx } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

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
    const saved = localStorage.getItem(`lusorae:suggestion:${initialTarget.kind}:${initialTarget.slug}`)
    if (!saved) return
    try { setSuggestion((current) => ({ ...current, ...JSON.parse(saved) })) } catch { /* ignore a malformed local draft */ }
  }, [initialTarget])

  useEffect(() => {
    if (!initialTarget) return
    const key = `lusorae:suggestion:${initialTarget.kind}:${initialTarget.slug}`
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
      localStorage.removeItem(`lusorae:suggestion:${initialTarget.kind}:${initialTarget.slug}`)
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

  const tabs = useMemo(() => [
    ['overview', 'Identity', UserRound], ['watchlist', 'Watchlist', Bookmark],
    ['collections', 'Collections', FolderPlus], ['notes', 'Notes', StickyNote],
    ['contributions', 'Contributions', PenLine], ['notifications', 'Notices', Bell],
    ['preferences', 'Preferences', Settings2], ['security', 'Password', KeyRound],
    ['sessions', 'Sessions', Laptop], ['activity', 'Security log', Activity],
  ], [])

  const visibleNotifications = wiki.notifications.filter((item) => (
    notificationFilter === 'all'
      || (notificationFilter === 'unread' && item.unread)
      || (notificationFilter === 'watch' && item.type === 'watch.updated')
      || (notificationFilter === 'contributions' && item.type.startsWith('suggestion.'))
  ))

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1240px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />
      <div className="mt-4">
        <CategoryHeader eyebrow={`Account · ${user.role}`} title={user.displayName} description={`@${user.username} · Member since ${formatDate(user.createdAt)}`} count={sessions.length} countLabel="active sessions">
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={cx('inline-flex items-center gap-1.5 border rounded-sm px-2.5 h-8 font-cond font-semibold uppercase tracking-[0.1em] text-[10px]', user.emailVerified ? 'border-mint/40 text-mint' : 'border-warn/40 text-warn')}>
              {user.emailVerified ? <CheckCircle2 size={12} /> : <MailCheck size={12} />} {user.emailVerified ? 'Verified email' : 'Email pending'}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 h-8 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-dim"><ShieldCheck size={12} /> Role: {user.role}</span>
          </div>
        </CategoryHeader>
      </div>

      <div className="mt-5 flex gap-1 overflow-x-auto border-b hairline" role="tablist" aria-label="Account sections">
        {tabs.map(([id, label, Icon]) => <button key={id} type="button" role="tab" aria-selected={section === id} onClick={() => { setSection(id); setMessage(''); setError('') }} className={cx('shrink-0 min-h-[42px] inline-flex items-center gap-2 px-3 border-b-2 font-cond font-bold uppercase tracking-[0.12em] text-[11px]', section === id ? 'border-pink text-pink' : 'border-transparent text-dim hover:text-paper')}><Icon size={13} />{label}</button>)}
        <button type="button" onClick={logout} className="ml-auto shrink-0 min-h-[42px] inline-flex items-center gap-2 px-3 font-cond font-bold uppercase tracking-[0.12em] text-[11px] text-dim hover:text-pink"><LogOut size={13} />Sign out</button>
      </div>

      {(message || error) && <p role={error ? 'alert' : 'status'} className={cx('mt-4 border-l-2 px-3 py-2 text-[12px] text-paper', error ? 'border-pink bg-pink/[0.05]' : 'border-mint bg-mint/[0.05]')}>{error || message}</p>}

      {section === 'overview' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
          <form onSubmit={saveProfile} className="panel rounded-sm p-5 sm:p-6 space-y-4">
            <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Public identity</h2>
            <AccountField label="Display name" value={profile.displayName} onChange={(event) => setProfile({ ...profile, displayName: event.target.value })} minLength={2} maxLength={50} required />
            <AccountField label="Username" value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value })} minLength={3} maxLength={30} pattern="[A-Za-z0-9_-]+" required hint="Letters, numbers, _ and -" />
            <label className="block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">Bio <small className="font-mono normal-case tracking-normal">{profile.bio.length}/240</small></span><textarea value={profile.bio} onChange={(event) => setProfile({ ...profile, bio: event.target.value })} maxLength={240} rows={4} className="mt-1.5 w-full border border-line rounded-sm p-3 bg-white/70 outline-none text-[13px] text-paper resize-y" /></label>
            <button disabled={busy === 'profile'} className="h-11 px-5 inline-flex items-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><Save size={13} />{busy === 'profile' ? 'Saving…' : 'Save profile'}</button>
          </form>
          <aside className="panel rounded-sm p-5">
            <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[15px] text-paper">Account record</h2>
            <dl className="mt-4 divide-y divide-black/[0.07]">
              {[['Email', user.email], ['Email status', user.emailVerified ? 'Verified' : 'Pending'], ['Role', user.role], ['Account ID', user.id]].map(([label, value]) => <div key={label} className="py-2.5"><dt className="font-cond uppercase tracking-[0.12em] text-[9px] text-dim">{label}</dt><dd className="mt-1 font-mono text-[10px] text-paper break-all">{value}</dd></div>)}
            </dl>
            {!user.emailVerified && capabilities.emailDelivery && <button disabled={busy === 'verify'} onClick={() => act('verify', () => request('resend-verification'))} className="mt-4 w-full h-10 border border-mint/40 font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-mint hover:border-mint disabled:opacity-50">Send verification email</button>}
            {!user.emailVerified && !capabilities.emailDelivery && <p className="mt-4 border-l-2 border-warn pl-3 text-[10px] leading-relaxed text-dim">Email verification is ready but delivery awaits server configuration.</p>}
            {preferences.publicProfile && <Link href={`/users/${encodeURIComponent(user.username)}`} className="mt-4 w-full h-10 border border-violet/35 inline-flex items-center justify-center gap-2 font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-violet hover:border-violet"><Globe2 size={13} />View public user page</Link>}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[[wiki.metrics.watched || 0, 'Watched'], [wiki.metrics.read || 0, 'Read'], [wiki.metrics.totalViews || 0, 'Views'], [wiki.metrics.collections || 0, 'Collections'], [wiki.metrics.notes || 0, 'Notes'], [wiki.metrics.accepted || 0, 'Accepted']].map(([value, label]) => <div key={label} className="bg-surface2/60 border border-line p-2 text-center"><strong className="block font-cond text-[20px] text-paper">{value}</strong><span className="font-mono uppercase text-[7px] tracking-[0.1em] text-dim">{label}</span></div>)}
            </div>
          </aside>
          <section className="lg:col-span-2 panel rounded-sm p-5 sm:p-6">
            <div className="flex items-center gap-2"><Trophy size={16} className="text-pink" /><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[17px] text-paper">Archive achievements</h2><span className="ml-auto font-mono text-[9px] text-dim">{wiki.achievements.filter((item) => item.unlocked).length}/{wiki.achievements.length}</span></div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">{wiki.achievements.map((item) => <div key={item.id} className={cx('border rounded-sm p-3', item.unlocked ? 'border-violet/35 bg-gradient-to-br from-violet/[0.07] to-pink/[0.05]' : 'border-line opacity-55')}><Sparkles size={14} className={item.unlocked ? 'text-pink' : 'text-dim'} /><strong className="mt-2 block font-cond font-bold uppercase text-[12px] text-paper">{item.label}</strong><span className="mt-1 block text-[9px] leading-relaxed text-dim">{item.description}</span></div>)}</div>
          </section>
        </div>
      )}

      {section === 'watchlist' && (
        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          <section className="panel rounded-sm p-5 sm:p-6">
            <div className="flex items-center gap-3"><Bookmark size={16} className="text-pink" /><div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Watchlist</h2><p className="text-[11px] text-dim">Pages you chose to follow.</p></div><span className="ml-auto font-mono text-[10px] text-dim">{wiki.watchlist.length}</span></div>
            {wiki.watchlist.length ? <ul className="mt-4 divide-y divide-black/[0.08] border-t hairline">{wiki.watchlist.map((item) => <li key={item.key} className={cx('py-3 flex items-center gap-3', item.pinned && 'bg-violet/[0.035]')}><button type="button" disabled={busy === `pin-${item.key}`} onClick={() => togglePin(item)} aria-label={item.pinned ? `Unpin ${item.title}` : `Pin ${item.title}`} className={cx('w-8 h-8 grid place-items-center border shrink-0', item.pinned ? 'border-violet/40 text-violet' : 'border-line text-dim hover:text-violet')}>{item.pinned ? <PinOff size={12} /> : <Pin size={12} />}</button><Link href={item.href} className="flex-1 min-w-0 font-cond font-semibold uppercase tracking-[0.05em] text-[13px] text-paper hover:text-pink truncate">{item.title}</Link><span className="hidden sm:block font-mono text-[8px] uppercase text-dim">{item.pinned ? 'Pinned' : `Since ${formatDate(item.createdAt)}`}</span><button type="button" disabled={busy === `watch-${item.key}`} onClick={() => removeWatch(item)} aria-label={`Stop watching ${item.title}`} className="w-8 h-8 grid place-items-center border border-line text-dim hover:text-pink"><Trash2 size={12} /></button></li>)}</ul> : <EmptyState icon={Bookmark} title="Nothing watched yet" text="Open an encyclopedia entry and choose Watch in its page tools." />}
          </section>
          <section className="panel rounded-sm p-5 sm:p-6">
            <div className="flex items-center gap-3"><History size={16} className="text-violet" /><div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Reading history</h2><p className="text-[11px] text-dim">Private to your account and controlled in Preferences.</p></div>{wiki.history.length > 0 && <button type="button" disabled={busy === 'history-clear'} onClick={clearHistory} className="ml-auto h-8 px-2.5 inline-flex items-center gap-1.5 border border-line font-cond font-bold uppercase text-[9px] text-dim hover:text-pink"><Eraser size={11} />Clear</button>}</div>
            {wiki.history.length ? <ol className="mt-4 divide-y divide-black/[0.08] border-t hairline">{wiki.history.map((item) => <li key={item.key} className="py-3 flex items-center gap-3"><Eye size={13} className="text-dim shrink-0" /><Link href={item.href} className="flex-1 min-w-0 font-cond font-semibold uppercase tracking-[0.05em] text-[13px] text-paper hover:text-violet truncate">{item.title}</Link><span className="font-mono text-[8px] text-dim">{item.viewCount}× · {formatDate(item.lastViewedAt)}</span></li>)}</ol> : <EmptyState icon={History} title={preferences.recordHistory ? 'No reading history yet' : 'History is disabled'} text={preferences.recordHistory ? 'Visited wiki entries will appear here.' : 'Enable it in Preferences if you want a private reading trail.'} />}
          </section>
        </div>
      )}

      {section === 'collections' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
          <section>
            <div className="flex items-end justify-between gap-3"><div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Personal collections</h2><p className="mt-1 text-[12px] text-dim">Organise entries into research dossiers that belong only to you.</p></div><span className="font-mono text-[10px] text-dim">{wiki.collections.length}/50</span></div>
            {initialTarget && <div className="mt-4 panel rounded-sm p-4 border-violet/25"><span className="font-cond uppercase tracking-[0.12em] text-[9px] text-dim">Adding page</span><Link href={initialTarget.href} className="mt-1 block font-cond font-bold uppercase text-[15px] text-paper hover:text-violet">{initialTarget.title}</Link><p className="mt-2 text-[10px] text-dim">Choose a collection below. A page can belong to several collections.</p></div>}
            {wiki.collections.length ? <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">{wiki.collections.map((collection) => {
              const items = wiki.collectionItems.filter((item) => item.collectionId === collection.id)
              const targetKey = initialTarget && `${initialTarget.kind}:${initialTarget.slug}`
              const containsTarget = Boolean(targetKey && items.some((item) => item.key === targetKey))
              return <article key={collection.id} className="panel rounded-sm overflow-hidden"><div className={cx('h-1', collectionTone(collection.color))} /><div className="p-4"><div className="flex items-start gap-3"><FolderPlus size={15} className="mt-0.5 text-violet" /><div className="flex-1 min-w-0"><h3 className="font-cond font-bold uppercase text-[15px] text-paper truncate">{collection.name}</h3><p className="mt-1 text-[10px] leading-relaxed text-dim">{collection.description || 'Private wiki collection'}</p></div><button type="button" disabled={busy === `collection-${collection.id}`} onClick={() => deleteCollection(collection.id)} aria-label={`Delete ${collection.name}`} className="w-8 h-8 grid place-items-center border border-line text-dim hover:text-pink"><Trash2 size={12} /></button></div>{initialTarget && <button type="button" disabled={busy === `collection-item-${collection.id}`} onClick={() => toggleCollectionItem(collection)} className={cx('mt-3 w-full h-9 border font-cond font-bold uppercase tracking-[0.1em] text-[9px]', containsTarget ? 'border-pink/40 text-pink' : 'border-violet/40 text-violet')}>{containsTarget ? 'Remove current page' : 'Add current page'}</button>}<ul className="mt-3 divide-y divide-black/[0.06]">{items.slice(0, 6).map((item) => <li key={item.key}><Link href={item.href} className="py-2 flex items-center gap-2 font-cond font-semibold uppercase text-[11px] text-dim hover:text-paper"><Bookmark size={10} />{item.title}</Link></li>)}</ul><span className="mt-2 block font-mono text-[8px] uppercase text-dim">{items.length} {items.length === 1 ? 'page' : 'pages'}</span></div></article>
            })}</div> : <EmptyState icon={FolderPlus} title="No collections yet" text="Create a dossier for characters, vehicles, theories, sources or anything you are researching." />}
          </section>
          <form onSubmit={createCollection} className="panel rounded-sm p-5 lg:sticky lg:top-24">
            <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[16px] text-paper">New collection</h2>
            <div className="mt-4 space-y-4"><AccountField label="Name" value={collectionForm.name} onChange={(event) => setCollectionForm({ ...collectionForm, name: event.target.value })} minLength={2} maxLength={40} required /><AccountField label="Description" value={collectionForm.description} onChange={(event) => setCollectionForm({ ...collectionForm, description: event.target.value })} maxLength={160} hint={`${collectionForm.description.length}/160`} /><label className="block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">Colour</span><select value={collectionForm.color} onChange={(event) => setCollectionForm({ ...collectionForm, color: event.target.value })} className="mt-1.5 w-full h-11 border border-line rounded-sm px-3 bg-white/70 text-[13px] text-paper"><option value="violet">Vice violet</option><option value="pink">Neon pink</option><option value="mint">Ocean mint</option><option value="sunset">Sunset</option><option value="ocean">Deep ocean</option></select></label></div>
            <button disabled={busy === 'collection-create'} className="mt-5 h-11 w-full inline-flex items-center justify-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><FolderPlus size={13} />{busy === 'collection-create' ? 'Creating…' : 'Create collection'}</button>
          </form>
        </div>
      )}

      {section === 'notes' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
          <section className="panel rounded-sm p-5 sm:p-6">
            <div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Private article note</h2><p className="mt-1 text-[12px] text-dim">Your personal research layer. Notes are never public or sent to editors.</p></div>
            {initialTarget ? <form onSubmit={saveNote} className="mt-5"><div className="border-l-2 border-mint bg-mint/[0.04] px-3 py-2"><span className="font-cond uppercase tracking-[0.12em] text-[9px] text-dim">Page</span><Link href={initialTarget.href} className="block mt-1 font-cond font-bold uppercase text-[14px] text-paper hover:text-mint">{initialTarget.title}</Link></div><label className="mt-4 block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">Note <small className="font-mono normal-case tracking-normal">{noteBody.length}/3000</small></span><textarea value={noteBody} onChange={(event) => setNoteBody(event.target.value)} maxLength={3000} rows={12} placeholder="Connections, questions, source leads…" className="mt-1.5 w-full border border-line rounded-sm p-3 bg-white/70 outline-none text-[13px] leading-relaxed text-paper resize-y" /></label><button disabled={busy === 'note'} className="mt-4 h-11 px-5 inline-flex items-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><Save size={13} />{busy === 'note' ? 'Saving…' : noteBody.trim() ? 'Save private note' : 'Delete note'}</button></form> : <EmptyState icon={StickyNote} title="Choose an article first" text="Open an entry and select Private note in its page tools." action={<Link href="/wiki" className="font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-pink">Browse the wiki</Link>} />}
          </section>
          <aside className="panel rounded-sm p-5">
            <div className="flex items-center gap-2"><StickyNote size={15} className="text-mint" /><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[16px] text-paper">Recent notes</h2><span className="ml-auto font-mono text-[9px] text-dim">{wiki.notes.length}</span></div>
            {wiki.notes.length ? <ol className="mt-4 divide-y divide-black/[0.08]">{wiki.notes.map((item) => <li key={item.key} className="py-3"><div className="flex items-start gap-2"><Link href={`/account?section=notes&kind=${encodeURIComponent(item.kind)}&slug=${encodeURIComponent(item.slug)}`} className="flex-1 font-cond font-bold uppercase text-[12px] text-paper hover:text-mint">{item.title}</Link><button type="button" disabled={busy === `note-${item.key}`} onClick={() => deleteNote(item)} aria-label={`Delete note for ${item.title}`} className="w-7 h-7 grid place-items-center border border-line text-dim hover:text-pink"><Trash2 size={11} /></button></div><p className="mt-1 text-[10px] leading-relaxed text-dim line-clamp-3">{item.body}</p><span className="mt-1 block font-mono text-[8px] text-dim">Updated {formatDate(item.updatedAt)}</span></li>)}</ol> : <p className="mt-4 text-[12px] text-dim">No private notes yet.</p>}
          </aside>
        </div>
      )}

      {section === 'contributions' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
          <section className="panel rounded-sm p-5 sm:p-6">
            <div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Suggest an improvement</h2><p className="mt-1 text-[12px] leading-relaxed text-dim">Changes enter a moderated editorial queue. They never overwrite a sourced article directly.</p></div>
            {initialTarget ? <form onSubmit={submitSuggestion} className="mt-5 space-y-4">
              <div className="border-l-2 border-mint bg-mint/[0.04] px-3 py-2"><span className="font-cond uppercase tracking-[0.12em] text-[9px] text-dim">Target page</span><Link href={initialTarget.href} className="block mt-1 font-cond font-bold uppercase text-[14px] text-paper hover:text-mint">{initialTarget.title}</Link></div>
              <label className="block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">Suggestion type</span><select value={suggestion.type} onChange={(event) => setSuggestion({ ...suggestion, type: event.target.value })} className="mt-1.5 w-full h-11 border border-line rounded-sm px-3 bg-white/70 text-[13px] text-paper"><option value="correction">Factual correction</option><option value="source">Better source</option><option value="expansion">Sourced expansion</option><option value="typo">Typo or formatting</option></select></label>
              <AccountField label="Summary" value={suggestion.summary} onChange={(event) => setSuggestion({ ...suggestion, summary: event.target.value })} minLength={8} maxLength={160} required hint={`${suggestion.summary.length}/160`} />
              <label className="block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">Proposed change <small className="font-mono normal-case tracking-normal">{suggestion.details.length}/4000</small></span><textarea value={suggestion.details} onChange={(event) => setSuggestion({ ...suggestion, details: event.target.value })} minLength={20} maxLength={4000} rows={7} required className="mt-1.5 w-full border border-line rounded-sm p-3 bg-white/70 outline-none text-[13px] text-paper resize-y" /></label>
              <AccountField label="Source URL" type="url" value={suggestion.sourceUrl} onChange={(event) => setSuggestion({ ...suggestion, sourceUrl: event.target.value })} required={suggestion.type !== 'typo'} maxLength={800} hint={suggestion.type === 'typo' ? 'Optional for typos' : 'Required evidence'} />
              <button disabled={busy === 'suggestion'} className="h-11 px-5 inline-flex items-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><PenLine size={13} />{busy === 'suggestion' ? 'Submitting…' : 'Submit for review'}</button>
            </form> : <EmptyState icon={PenLine} title="Choose an article first" text="Open any character, vehicle, weapon, location or other entry and select Suggest edit in its page tools." action={<Link href="/wiki" className="font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-pink">Browse the wiki</Link>} />}
          </section>
          <aside className="panel rounded-sm p-5">
            <div className="flex items-center gap-2"><ListChecks size={15} className="text-mint" /><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[16px] text-paper">Your submissions</h2><span className="ml-auto font-mono text-[10px] text-dim">{wiki.suggestions.length}</span></div>
            {wiki.suggestions.length ? <ol className="mt-4 divide-y divide-black/[0.08]">{wiki.suggestions.map((item) => <li key={item.id} className="py-3"><div className="flex items-start gap-2"><Link href={item.href} className="flex-1 font-cond font-semibold uppercase text-[12px] text-paper hover:text-mint">{item.title}</Link><StatusPill value={item.status} /></div><p className="mt-1 text-[11px] leading-relaxed text-dim">{item.summary}</p><span className="mt-1 block font-mono text-[8px] uppercase text-dim">{item.type} · {formatDate(item.createdAt)}</span></li>)}</ol> : <p className="mt-4 text-[12px] text-dim">No suggestions submitted.</p>}
            {wiki.reviewQueue.length > 0 && <div className="mt-6 border-t hairline pt-5"><div className="flex items-center gap-2"><ShieldCheck size={14} className="text-violet" /><h3 className="font-cond font-bold uppercase tracking-[0.08em] text-[14px] text-paper">Editorial queue</h3><span className="ml-auto font-mono text-[9px] text-dim">{wiki.reviewQueue.length}</span></div><ol className="mt-3 divide-y divide-black/[0.08]">{wiki.reviewQueue.map((item) => <li key={item.id} className="py-3"><Link href={item.href} className="font-cond font-bold uppercase text-[12px] text-paper hover:text-mint">{item.title}</Link><p className="mt-1 text-[11px] text-dim">{item.summary}</p>{item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 block font-mono text-[8px] text-violet break-all">Source ↗</a>}<div className="mt-2 flex gap-2"><button type="button" disabled={busy === `review-${item.id}`} onClick={() => reviewSuggestion(item.id, 'accepted')} className="h-8 px-3 border border-mint/40 font-cond font-bold uppercase text-[9px] text-mint">Accept</button><button type="button" disabled={busy === `review-${item.id}`} onClick={() => reviewSuggestion(item.id, 'rejected')} className="h-8 px-3 border border-pink/40 font-cond font-bold uppercase text-[9px] text-pink">Reject</button></div></li>)}</ol></div>}
          </aside>
        </div>
      )}

      {section === 'notifications' && (
        <section className="mt-6 max-w-[860px]">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Notifications</h2><p className="mt-1 text-[12px] text-dim">Updates to watched pages and your editorial submissions.</p></div>{wiki.notifications.some((item) => item.unread) && <button type="button" disabled={busy === 'notifications-read'} onClick={markNotificationsRead} className="h-10 px-4 border border-mint/40 font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-mint">Mark all read</button>}</div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Notification filters">{[['all', 'All'], ['unread', 'Unread'], ['watch', 'Watchlist'], ['contributions', 'Contributions']].map(([id, label]) => <button key={id} type="button" onClick={() => setNotificationFilter(id)} aria-pressed={notificationFilter === id} className={cx('h-8 px-3 border rounded-full font-cond font-bold uppercase tracking-[0.1em] text-[9px]', notificationFilter === id ? 'border-violet text-violet bg-violet/[0.05]' : 'border-line text-dim')}>{label}</button>)}</div>
          {visibleNotifications.length ? <ol className="mt-4 border border-line divide-y divide-black/[0.08]">{visibleNotifications.map((item) => <li key={item.id} className={cx('px-4 py-3 flex items-center gap-3', item.unread && 'bg-violet/[0.045]')}><span className={cx('w-2 h-2 rounded-full shrink-0', item.unread ? 'bg-pink' : 'bg-black/15')} /><Bell size={13} className="text-violet shrink-0" /><Link href={item.href} className="flex-1 font-cond font-semibold uppercase tracking-[0.05em] text-[12px] text-paper hover:text-pink">{item.title}</Link><span className="font-mono text-[8px] text-dim">{formatDate(item.createdAt)}</span></li>)}</ol> : <EmptyState icon={Bell} title={wiki.notifications.length ? 'No notices in this filter' : 'You are all caught up'} text={wiki.notifications.length ? 'Choose another notification filter.' : 'Watch pages or submit improvements to receive useful notices here.'} />}
        </section>
      )}

      {section === 'preferences' && (
        <form onSubmit={savePreferences} className="mt-6 max-w-[760px] panel rounded-sm p-5 sm:p-6">
          <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Wiki preferences</h2>
          <p className="mt-1 text-[12px] text-dim">Controls that change account behaviour immediately.</p>
          <div className="mt-5 divide-y divide-black/[0.08] border-y hairline">
            <PreferenceToggle icon={Globe2} title="Public user page" text="Let readers see your display name, bio and accepted contribution count." checked={preferences.publicProfile} onChange={(value) => setPreferences({ ...preferences, publicProfile: value })} />
            <PreferenceToggle icon={History} title="Private reading history" text="Remember recently opened encyclopedia entries. Turning this off deletes the stored history." checked={preferences.recordHistory} onChange={(value) => setPreferences({ ...preferences, recordHistory: value })} />
            <PreferenceToggle icon={BookOpen} title="Compact reading density" text="Reduce spacing in wiki article sections and support panels on this account." checked={preferences.compactMode} onChange={(value) => setPreferences({ ...preferences, compactMode: value })} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3"><button disabled={busy === 'preferences'} className="h-11 px-5 inline-flex items-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><Save size={13} />{busy === 'preferences' ? 'Saving…' : 'Save preferences'}</button><a href="/api/auth/export" download className="h-11 px-5 inline-flex items-center gap-2 border border-violet/40 text-violet font-cond font-bold uppercase tracking-[0.14em] text-[11px] hover:border-violet"><Download size={13} />Export my wiki data</a></div>
        </form>
      )}

      {section === 'security' && (
        <div className="mt-6 space-y-6 max-w-[680px]">
          <form onSubmit={changePassword} className="panel rounded-sm p-5 sm:p-6 space-y-4">
            <div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Change password</h2><p className="mt-2 text-[12px] leading-relaxed text-dim">Requires the current password. A successful change closes every other device session.</p></div>
            <AccountField label="Current password" type="password" autoComplete="current-password" value={password.currentPassword} onChange={(event) => setPassword({ ...password, currentPassword: event.target.value })} required />
            <AccountField label="New password" type="password" autoComplete="new-password" minLength={15} maxLength={128} value={password.password} onChange={(event) => setPassword({ ...password, password: event.target.value })} required hint="15–128 characters" />
            <AccountField label="Confirm new password" type="password" autoComplete="new-password" minLength={15} maxLength={128} value={password.confirm} onChange={(event) => setPassword({ ...password, confirm: event.target.value })} required />
            <button disabled={busy === 'password'} className="h-11 px-5 inline-flex items-center gap-2 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50"><KeyRound size={13} />{busy === 'password' ? 'Securing…' : 'Change password'}</button>
          </form>

          <form onSubmit={deleteAccount} className="panel rounded-sm p-5 sm:p-6 space-y-4 border-pink/30">
            <div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-pink">Delete account</h2><p className="mt-2 text-[12px] leading-relaxed text-dim">Permanently removes the identity, tokens and every active session. This cannot be undone.</p></div>
            <AccountField label="Current password" type="password" autoComplete="current-password" maxLength={128} value={deletion.currentPassword} onChange={(event) => setDeletion({ ...deletion, currentPassword: event.target.value })} required />
            <AccountField label="Type DELETE" value={deletion.confirmation} onChange={(event) => setDeletion({ ...deletion, confirmation: event.target.value })} pattern="DELETE" required />
            <button disabled={busy === 'delete-account' || deletion.confirmation !== 'DELETE'} className="h-11 px-5 inline-flex items-center gap-2 border border-pink text-pink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-40"><Trash2 size={13} />{busy === 'delete-account' ? 'Deleting…' : 'Delete permanently'}</button>
          </form>
        </div>
      )}

      {section === 'sessions' && (
        <section className="mt-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Active sessions</h2><p className="mt-1 text-[12px] text-dim">Only opaque session records are stored. Revoke any device you do not recognise.</p></div><button disabled={busy === 'logout-all'} onClick={closeAll} className="h-10 px-4 border border-pink/40 inline-flex items-center gap-2 font-cond font-bold uppercase tracking-[0.12em] text-[10px] text-pink hover:border-pink disabled:opacity-50"><LogOut size={13} />Close all sessions</button></div>
          <ul className="mt-4 border border-line divide-y divide-black/[0.08]">
            {sessions.map((session) => <li key={session.id} className="px-4 py-3 flex flex-wrap items-center gap-3"><span className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-mint">{session.device.includes('Mobile') ? <Smartphone size={15} /> : <Laptop size={15} />}</span><span className="flex-1 min-w-[190px]"><strong className="block font-cond uppercase tracking-[0.08em] text-[13px] text-paper">{session.device} {session.current && <span className="text-mint">· This device</span>}</strong><span className="mt-1 block font-mono text-[9px] text-dim">Last active {formatDate(session.lastSeenAt)} · expires {formatDate(session.expiresAt)}</span></span><button disabled={busy === `session-${session.id}`} onClick={() => revoke(session.id)} aria-label={`Revoke ${session.device}`} className="w-9 h-9 flex items-center justify-center border border-line text-dim hover:text-pink hover:border-pink"><Trash2 size={14} /></button></li>)}
          </ul>
        </section>
      )}

      {section === 'activity' && (
        <section className="mt-6">
          <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[18px] text-paper">Security activity</h2>
          <p className="mt-1 text-[12px] text-dim">A privacy-reduced audit trail retained for 180 days. Raw IP addresses are never stored.</p>
          {events.length ? <ol className="mt-4 border border-line divide-y divide-black/[0.08]">{events.map((event) => <li key={event.id} className="px-4 py-3 flex items-center gap-3"><Clock3 size={13} className={event.outcome === 'failure' ? 'text-pink' : 'text-mint'} /><span className="flex-1 font-cond font-semibold uppercase tracking-[0.08em] text-[12px] text-paper">{eventLabel(event.action)}</span><span className="font-mono text-[9px] text-dim">{event.device} · {formatDate(event.createdAt)}</span></li>)}</ol> : <p className="mt-4 panel rounded-sm p-5 text-[13px] text-dim">No security events recorded yet.</p>}
        </section>
      )}
    </div>
  )
}

function AccountField({ label, hint, ...props }) {
  return <label className="block"><span className="flex items-center justify-between gap-3 font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim"><span>{label}</span>{hint && <small className="font-mono normal-case tracking-normal text-[8px]">{hint}</small>}</span><input {...props} className="mt-1.5 w-full h-11 border border-line rounded-sm px-3 bg-white/70 outline-none text-[13px] text-paper" /></label>
}

function EmptyState({ icon: Icon, title, text, action }) {
  return <div className="mt-5 border border-dashed border-line rounded-sm p-6 text-center"><Icon size={18} className="mx-auto text-dim" /><p className="mt-2 font-cond font-bold uppercase tracking-[0.08em] text-[14px] text-paper">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-dim">{text}</p>{action && <div className="mt-3">{action}</div>}</div>
}

function StatusPill({ value }) {
  return <span className={cx('shrink-0 border rounded-full px-2 py-1 font-mono uppercase tracking-[0.1em] text-[7px]', value === 'accepted' ? 'border-mint/40 text-mint' : value === 'rejected' ? 'border-pink/40 text-pink' : 'border-violet/40 text-violet')}>{value}</span>
}

function collectionTone(color) {
  return ({
    mint: 'bg-gradient-to-r from-mint to-cyan-300',
    violet: 'bg-gradient-to-r from-violet to-purple-400',
    pink: 'bg-gradient-to-r from-pink to-rose-400',
    sunset: 'bg-gradient-to-r from-amber-300 via-orange-400 to-pink',
    ocean: 'bg-gradient-to-r from-cyan-400 to-blue-600',
  })[color] || 'bg-violet'
}

function PreferenceToggle({ icon: Icon, title, text, checked, onChange }) {
  return <label className="py-4 flex items-center gap-4 cursor-pointer"><span className="w-9 h-9 grid place-items-center rounded-full border border-line text-violet shrink-0"><Icon size={14} /></span><span className="flex-1"><strong className="block font-cond font-bold uppercase tracking-[0.06em] text-[13px] text-paper">{title}</strong><span className="mt-1 block text-[11px] leading-relaxed text-dim">{text}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only peer" /><span aria-hidden="true" className="relative w-11 h-6 rounded-full border border-line bg-black/[0.06] peer-checked:bg-violet peer-checked:border-violet transition-colors after:absolute after:w-4 after:h-4 after:top-[3px] after:left-[3px] after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:after:translate-x-5" /></label>
}
