'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X } from 'lucide-react'
import SearchModal from './search'
import { SITE_COUNTERS } from '@/lib/content'
import { cx } from './ui'

const NAV = [
  { label: 'HOME', href: '/', match: (p) => p === '/' },
  { label: 'DATABASE', href: '/database/weapons', match: (p) => p.startsWith('/database') },
  { label: 'MAP', href: '/map', match: (p) => p.startsWith('/map') || p.startsWith('/easter-eggs') },
  { label: 'ARTICLES', href: '/news', match: (p) => p.startsWith('/news') },
  { label: 'FACTIONS', href: '/gangs-factions', match: (p) => p.startsWith('/gangs-factions') },
  { label: 'GUIDES', href: '/guides', match: (p) => p.startsWith('/guides') },
  { label: 'CATEGORIES', href: '/categories', match: (p) => p.startsWith('/categories') },
  { label: 'EDITIONS', href: '/editions', match: (p) => p.startsWith('/editions') },
]

function countersFor(p) {
  if (p.startsWith('/news') || p.startsWith('/categories')) return SITE_COUNTERS.news
  if (p.startsWith('/map') || p.startsWith('/easter-eggs')) return SITE_COUNTERS.map
  if (p.startsWith('/database/characters')) return SITE_COUNTERS.characters
  return SITE_COUNTERS.home
}

export default function Header() {
  const pathname = usePathname() || '/'
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const counters = countersFor(pathname)

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase()
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setSearchOpen(true) }
      else if (e.key === '/' && !typing) { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header className="archive-header sticky top-0 z-[70] bg-ink/88 backdrop-blur-md border-b hairline">
      <div className="px-3 sm:px-6 lg:px-8 h-[56px] flex items-center gap-2 sm:gap-4 lg:gap-6">
        <Link href="/" className="group shrink-0 flex flex-col justify-center">
          <span className="chromatic-title font-cond font-bold text-[18px] sm:text-[22px] tracking-wide text-paper whitespace-nowrap leading-none">LEONIDA ARCHIVE</span>
          <span className="hidden sm:block font-mono text-[8px] tracking-[0.28em] text-dim mt-1 group-hover:text-mint transition-colors">OFFICIAL EVIDENCE INDEX</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 ml-1 p-1 border border-line/70 bg-surface2/40 rounded-sm" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.match(pathname)
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'relative font-cond font-semibold uppercase tracking-[0.1em] text-[11px] px-2.5 py-2 transition-all duration-200 rounded-sm active:scale-95',
                  active ? 'bg-paper text-ink shadow-[0_0_18px_-8px_rgba(255,255,255,0.8)] after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-gradient-to-r after:from-mint after:via-pink after:to-violet' : 'text-dim hover:text-paper hover:bg-white/5 hover:-translate-y-px'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1 min-w-0" />

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="glass-panel tech-mask-sm hidden md:flex items-center gap-2 w-[200px] xl:w-[260px] h-9 px-3 text-left hover:border-white/30 transition-colors"
          aria-label="Search the archive"
        >
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <span className="flex-1 text-[13px] text-dim truncate">Search the archive…</span>
          <kbd className="px-1.5 py-0.5 border border-line rounded-sm font-mono text-[10px] text-dim">/</kbd>
        </button>

        <button type="button" onClick={() => setSearchOpen(true)} className="md:hidden w-11 h-11 flex items-center justify-center text-dim hover:text-paper" aria-label="Search the archive">
          <Search size={19} />
        </button>

        <button type="button" onClick={() => setMenuOpen((v) => !v)} className="lg:hidden w-11 h-11 flex items-center justify-center text-paper" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t hairline bg-raised" aria-label="Mobile">
          {NAV.map((item) => {
            const active = item.match(pathname)
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cx('flex items-center min-h-[42px] px-5 font-cond font-semibold uppercase tracking-[0.1em] text-[13px] border-b hairline transition-all duration-200 active:scale-[0.98]', active ? 'bg-paper text-ink border-l-2 border-l-pink' : 'text-dim hover:text-paper hover:bg-white/5 hover:pl-7')}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="flex px-6 py-3 gap-6">
            {counters.map(([n, label]) => (
              <div key={label} className="flex flex-col leading-none">
                <span className="font-cond font-bold text-[20px] text-paper tabular-nums">{n}</span>
                <span className="font-cond text-[9px] text-dim uppercase tracking-[0.2em] mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </nav>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
