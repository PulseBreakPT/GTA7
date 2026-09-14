'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import {
  Bell, Bookmark, CheckCircle2, ChevronDown, FolderPlus, LogIn, LogOut, PenLine,
  Search, Settings2, ShieldCheck, StickyNote, UserPlus, UserRound,
} from 'lucide-react'
import { NAV_SECTIONS, isActiveHref, closestHref } from '@/lib/navigation'
import { cx } from './ui'
import { useAuth } from './auth-provider'
import { OPEN_SEARCH_EVENT } from './home-client'
import LoreIcon from './lore-icons'

const SearchModal = dynamic(() => import('./search'), { ssr: false })

const TOP = [
  ['Atlas', '/map', 'place'],
  ['Articles', '/news', 'news'],
  ['Database', '/database', 'archive'],
]

// Quem vê a porta da secretaria. A lista repete-se no servidor e em cada
// endpoint: isto decide o que se mostra, nunca o que se pode fazer.
const STAFF = new Set(['moderator', 'admin'])

// As seis secções vêm do mapa de navegação partilhado (lib/navigation):
// o que se acrescenta lá aparece aqui, no rodapé e na barra do telemóvel.
const GROUPS = NAV_SECTIONS

const activeFor = isActiveHref
// O «Explore» acende em qualquer rota que não tenha já botão próprio.
const exploreActive = (pathname) => !TOP.some(([, href]) => activeFor(pathname, href))
  && NAV_SECTIONS.some((section) => section.links.some((link) => link.href !== '/' && activeFor(pathname, link.href)))

export default function WikiChrome() {
  const pathname = usePathname() || '/'
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const exploreRef = useRef(null)
  const exploreTriggerRef = useRef(null)
  const [accountData, setAccountData] = useState({ watchlist: 0, collections: 0, notes: 0, unread: 0 })
  const [accountDataStatus, setAccountDataStatus] = useState('idle')
  const [logoutBusy, setLogoutBusy] = useState(false)
  const accountRef = useRef(null)
  const accountTriggerRef = useRef(null)
  const { user, loading, request } = useAuth()

  useEffect(() => { setAccountOpen(false); setExploreOpen(false) }, [pathname])

  useEffect(() => {
    if (!exploreOpen) return
    const dismiss = (event) => {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setExploreOpen(false); exploreTriggerRef.current?.focus()
      } else if (event.type === 'pointerdown' && !exploreRef.current?.contains(event.target)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', dismiss)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', dismiss)
    }
  }, [exploreOpen])

  useEffect(() => { if (searchOpen || accountOpen) setExploreOpen(false) }, [searchOpen, accountOpen])

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
        {/* The brand is the artwork, never type set beside it. Two lockups, both
            SVG: the full one, and a compact one with the strapline removed —
            below the tablet breakpoint that line renders about three pixels tall
            and reads as grey noise. The name stays in the DOM for assistive
            technology and search, but it is never drawn. */}
        <Link href="/" className="wiki-global-brand" aria-label="GTA Lore main page">
          <img className="brand-lockup" src="/brand/gta-lore-wordmark.svg" alt="" width="191" height="52" decoding="async" />
          <img className="brand-lockup brand-lockup--compact" src="/brand/gta-lore-lockup-compact.svg" alt="" width="139" height="38" decoding="async" />
          <span><strong>GTA LORE</strong><small>The GTA VI encyclopedia</small></span>
        </Link>

        <button type="button" className="wiki-global-search" onClick={() => { setAccountOpen(false); setSearchOpen(true) }} aria-label="Search GTA Lore" aria-keyshortcuts="/ Control+K">
          <Search size={16} aria-hidden="true" />
          <span>Search the encyclopedia</span>
          <kbd>/</kbd>
        </button>

        <nav className="wiki-global-topnav" aria-label="Encyclopedia tools">
          <div ref={exploreRef} className={cx('wiki-global-menu wiki-explore-menu', exploreOpen && 'is-open', exploreActive(pathname) && 'is-active')} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExploreOpen(false) }}>
            <button ref={exploreTriggerRef} type="button" className="wiki-explore-trigger" aria-expanded={exploreOpen} aria-controls="archive-explore-panel" onClick={() => { setAccountOpen(false); setExploreOpen((value) => !value) }}>
              <LoreIcon name="compass" size={14} /><span>Explore</span><ChevronDown size={11} aria-hidden="true" />
            </button>
            <div id="archive-explore-panel" className="wiki-global-menu-panel wiki-explore-panel" aria-label="Explore GTA Lore" hidden={!exploreOpen}>
              <header><span>Navigate the archive</span><strong>Choose your route</strong><kbd>⌘ K</kbd></header>
              <div>
                {GROUPS.map((group) => (
                  <section key={group.id}>
                    <p>{group.label}</p>
                    {group.links.map(({ label, href, icon: Icon }) => (
                      <Link key={href} href={href} className={cx(closestHref(pathname) === href && 'is-active')} aria-current={pathname === href ? 'page' : undefined}>
                        <Icon size={14} aria-hidden="true" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </section>
                ))}
              </div>
              <footer><Link href="/directory" className="wiki-explore-directory">Site directory · every page <LoreIcon name="arrow" size={13} /></Link><button type="button" onClick={() => setSearchOpen(true)}>Search everything <LoreIcon name="search" size={13} /></button></footer>
            </div>
          </div>
          {TOP.map(([label, href, icon]) => (
            <Link key={href} href={href} className={cx(activeFor(pathname, href) && 'is-active')} aria-current={activeFor(pathname, href) ? 'page' : undefined}>
              <LoreIcon name={icon} size={13} /><span>{label}</span>
            </Link>
          ))}
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
                {STAFF.has(user.role) && <Link role="menuitem" href="/admin" className="wiki-account-staff"><ShieldCheck size={14} /><span>Archive operations</span><small>{user.role}</small></Link>}
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
            <section key={group.id}>
              <p>{group.label}</p>
              <ul>
                {group.links.map(({ label, href, icon: Icon }) => {
                  const active = closestHref(pathname) === href
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
