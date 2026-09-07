'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import {
  Bell, BookOpen, Bookmark, Car, CheckCircle2, ChevronDown, Crosshair, FileText,
  FolderPlus, Images, Library, LogIn, LogOut, MapPin, PenLine, Radio, Repeat2,
  Search, Settings2, ShieldCheck, Shuffle, StickyNote, UserPlus, Users, UserRound, Scale, Globe2,
} from 'lucide-react'
import { cx } from './ui'
import { useAuth } from './auth-provider'
import { OPEN_SEARCH_EVENT } from './home-client'

const SearchModal = dynamic(() => import('./search'), { ssr: false })

const TOP = [
  ['Wiki', '/wiki', Library],
  ['Places', '/map', MapPin],
  ['Articles', '/news', BookOpen],
]

const DATABASE_LINKS = [
  ['Characters', '/database/characters', Users],
  ['Vehicles', '/database/vehicles', Car],
  ['Weapons', '/database/weapons', Crosshair],
  ['Radio', '/database/radio', Radio],
  ['Mechanics', '/database/mechanics', Repeat2],
  ['World', '/database/world', Globe2],
]

const GROUPS = [
  {
    label: 'Explore',
    links: [
      ['Wiki index', '/wiki', Library],
      ['Places atlas', '/map', MapPin],
      ['Articles', '/news', BookOpen],
      ['Media archive', '/media', Images],
    ],
  },
  {
    label: 'Database',
    links: [
      ['Characters', '/database/characters', Users],
      ['Vehicles', '/database/vehicles', Car],
      ['Weapons', '/database/weapons', Crosshair],
      ['Radio', '/database/radio', Radio],
      ['Mechanics', '/database/mechanics', Repeat2],
      ['World', '/database/world', Globe2],
    ],
  },
  {
    label: 'Archive',
    links: [
      ['Sources', '/sources', ShieldCheck],
      ['Random entry', '/wiki/random', Shuffle],
      ['Statistics', '/wiki/statistics', FileText],
      ['Special pages', '/wiki/special', Library],
      ['Help', '/wiki/help', BookOpen],
      ['Legal centre', '/legal', Scale],
    ],
  },
]

const activeFor = (pathname, href) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

export default function WikiChrome() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [accountData, setAccountData] = useState({ watchlist: 0, collections: 0, notes: 0, unread: 0 })
  const [accountDataStatus, setAccountDataStatus] = useState('idle')
  const [logoutBusy, setLogoutBusy] = useState(false)
  const accountRef = useRef(null)
  const accountTriggerRef = useRef(null)
  const { user, loading, request } = useAuth()

  useEffect(() => { setAccountOpen(false) }, [pathname])

  useEffect(() => {
    const onKey = (event) => {
      const target = event.target
      const typing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if ((event.key === '/' && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault(); setAccountOpen(false); setSearchOpen(true)
      }
      if (event.key === 'Escape' && accountOpen) {
        setAccountOpen(false)
        window.requestAnimationFrame(() => accountTriggerRef.current?.focus())
      }
    }
    const onPointer = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountOpen(false)
    }
    const onOpenSearch = () => { setAccountOpen(false); setSearchOpen(true) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpenSearch)
    }
  }, [accountOpen])

  useEffect(() => {
    if (!accountOpen || !user) return
    if (!navigator.onLine) { setAccountDataStatus('offline'); return }
    setAccountDataStatus('loading')
    fetch('/api/auth/wiki-dashboard', { credentials: 'same-origin', cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('dashboard')
        return response.json()
      })
      .then((data) => {
        setAccountData({
          watchlist: data.watchlist?.length || 0,
          collections: data.collections?.length || 0,
          notes: data.notes?.length || 0,
          unread: data.notifications?.filter((item) => item.unread).length || 0,
        })
        setAccountDataStatus('success')
      })
      .catch(() => setAccountDataStatus(navigator.onLine ? 'error' : 'offline'))
  }, [accountOpen, user])

  const logout = async () => {
    setLogoutBusy(true)
    try {
      await request('logout')
      setAccountOpen(false); router.push('/'); router.refresh()
    } catch {
      setAccountDataStatus(navigator.onLine ? 'error' : 'offline')
    } finally {
      setLogoutBusy(false)
    }
  }

  const openAccountFromKeyboard = (event) => {
    if (!['ArrowDown', 'Enter', ' '].includes(event.key)) return
    event.preventDefault()
    setSearchOpen(false); setAccountOpen(true)
    window.setTimeout(() => accountRef.current?.querySelector('[role="menuitem"]')?.focus(), 0)
  }

  const navigateAccountMenu = (event) => {
    const items = [...event.currentTarget.querySelectorAll('[role="menuitem"]:not([disabled])')]
    if (!items.length) return
    const current = items.indexOf(document.activeElement)
    let next = current
    if (event.key === 'ArrowDown') next = current < items.length - 1 ? current + 1 : 0
    else if (event.key === 'ArrowUp') next = current > 0 ? current - 1 : items.length - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    else if (event.key === 'Escape') {
      event.preventDefault(); setAccountOpen(false); accountTriggerRef.current?.focus(); return
    } else return
    event.preventDefault(); items[next].focus()
  }

  return (
    <>
      <header className="wiki-global-header" aria-label="GTA Lore encyclopedia header">
        <Link href="/" className="wiki-global-brand" aria-label="GTA Lore main page">
          <span>GL</span>
          <span><strong>GTA LORE</strong><small>The GTA VI encyclopedia</small></span>
        </Link>

        <button type="button" className="wiki-global-search" onClick={() => { setAccountOpen(false); setSearchOpen(true) }} aria-label="Search GTA Lore" aria-keyshortcuts="/ Control+K">
          <Search size={16} aria-hidden="true" />
          <span>Search the encyclopedia</span>
          <kbd>/</kbd>
        </button>

        <nav className="wiki-global-topnav" aria-label="Encyclopedia tools">
          {TOP.map(([label, href, Icon]) => (
            <Link key={href} href={href} className={cx(activeFor(pathname, href) && 'is-active')} aria-current={activeFor(pathname, href) ? 'page' : undefined}>
              <Icon size={13} aria-hidden="true" /><span>{label}</span>
            </Link>
          ))}
          <div className={cx('wiki-global-menu', pathname.startsWith('/database') && 'is-active')}>
            <Link href="/database" aria-current={pathname.startsWith('/database') ? 'page' : undefined}>
              <FileText size={13} aria-hidden="true" /><span>Database</span><ChevronDown size={11} aria-hidden="true" />
            </Link>
            <div className="wiki-global-menu-panel" aria-label="Database sections">
              <p>Database</p>
              {DATABASE_LINKS.map(([label, href, Icon]) => (
                <Link key={href} href={href} className={cx(activeFor(pathname, href) && 'is-active')} aria-current={activeFor(pathname, href) ? 'page' : undefined}>
                  <Icon size={14} aria-hidden="true" /><span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div ref={accountRef} className={cx('wiki-account-menu', accountOpen && 'is-open', activeFor(pathname, user ? '/account' : '/login') && 'is-active')}>
            <button ref={accountTriggerRef} type="button" className="wiki-account-trigger" onClick={() => { setSearchOpen(false); setAccountOpen((value) => !value) }} onKeyDown={openAccountFromKeyboard} aria-label={user ? `Open account menu for ${user.username}` : 'Open account menu'} aria-expanded={accountOpen} aria-haspopup="menu">
              <span className="wiki-account-avatar">{user ? user.displayName.charAt(0).toUpperCase() : <UserRound size={14} aria-hidden="true" />}</span>
              <span className="wiki-account-trigger-copy">{user ? user.username : loading ? 'Account' : 'Sign in'}</span>
              <ChevronDown size={10} aria-hidden="true" />
              {user && accountData.unread > 0 && <i className="wiki-account-unread" aria-label={`${accountData.unread} unread notifications`} />}
            </button>

            {accountOpen && <div className="wiki-account-panel" role="menu" aria-label="Account menu" onKeyDown={navigateAccountMenu}>
              {user ? <>
                <div className="wiki-account-card">
                  <span className="wiki-account-card-avatar">{user.displayName.charAt(0).toUpperCase()}</span>
                  <span className="min-w-0"><strong>{user.displayName}</strong><small>@{user.username} · {user.role}</small></span>
                  {user.emailVerified && <CheckCircle2 size={15} aria-label="Verified email" />}
                </div>
                {accountDataStatus === 'loading' || accountDataStatus === 'idle' ? (
                  <div className="wiki-account-stats is-loading" role="status" aria-label="Loading account statistics"><span /><span /><span /></div>
                ) : accountDataStatus === 'success' ? (
                  <div className="wiki-account-stats" aria-label="Account wiki statistics">
                    <span><b>{accountData.watchlist}</b><small>Watched</small></span><span><b>{accountData.collections}</b><small>Collections</small></span><span><b>{accountData.notes}</b><small>Notes</small></span>
                  </div>
                ) : (
                  <p className="wiki-account-state" role="status">{accountDataStatus === 'offline' ? 'Offline · personal totals unavailable' : 'Personal totals could not be loaded'}</p>
                )}
                <div className="wiki-account-links">
                  <Link role="menuitem" href="/account"><UserRound size={14} /><span>Account dashboard</span></Link>
                  <Link role="menuitem" href="/account?section=watchlist"><Bookmark size={14} /><span>Watchlist</span></Link>
                  <Link role="menuitem" href="/account?section=collections"><FolderPlus size={14} /><span>Collections</span></Link>
                  <Link role="menuitem" href="/account?section=notes"><StickyNote size={14} /><span>Private notes</span></Link>
                  <Link role="menuitem" href="/account?section=contributions"><PenLine size={14} /><span>Contributions</span></Link>
                  <Link role="menuitem" href="/account?section=notifications"><Bell size={14} /><span>Notifications</span>{accountData.unread > 0 && <b>{accountData.unread}</b>}</Link>
                  <Link role="menuitem" href="/account?section=preferences"><Settings2 size={14} /><span>Preferences</span></Link>
                </div>
                <button type="button" role="menuitem" onClick={logout} disabled={logoutBusy} aria-busy={logoutBusy} className="wiki-account-logout"><LogOut size={14} /><span>{logoutBusy ? 'Signing out…' : 'Sign out securely'}</span></button>
              </> : <>
                <div className="wiki-account-guest">
                  <span className="wiki-account-card-avatar"><UserRound size={21} /></span>
                  <strong>Your GTA LORE identity</strong>
                  <p>Follow pages, build collections, write private notes and contribute to the archive.</p>
                </div>
                <div className="wiki-account-guest-actions">
                  <Link role="menuitem" href="/login"><LogIn size={14} />Sign in</Link>
                  <Link role="menuitem" href="/login?mode=register"><UserPlus size={14} />Create account</Link>
                </div>
              </>}
            </div>}
          </div>
        </nav>
      </header>

      <aside className="wiki-global-rail" aria-label="Encyclopedia navigation">
        <div className="wiki-global-rail-intro">
          <span>Knowledge base</span>
          <strong>Leonida</strong>
          <p>Independent, source-labelled and built to be followed.</p>
        </div>
        <nav>
          {GROUPS.map((group) => (
            <section key={group.label}>
              <p>{group.label}</p>
              <ul>
                {group.links.map(([label, href, Icon]) => {
                  const active = activeFor(pathname, href)
                  return (
                    <li key={href}>
                      <Link href={href} className={cx(active && 'is-active')} aria-current={active ? 'page' : undefined}>
                        <Icon size={14} aria-hidden="true" /><span>{label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </nav>
        <div className="wiki-global-rail-status"><i /><span>Archive online</span><b>EN</b></div>
      </aside>

      {searchOpen && <SearchModal open onClose={() => setSearchOpen(false)} />}
    </>
  )
}
