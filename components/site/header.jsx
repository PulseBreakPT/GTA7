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
  { label: 'NEWS', href: '/news', match: (p) => p.startsWith('/news') },
  { label: 'MAP', href: '/map', match: (p) => p.startsWith('/map') || p.startsWith('/easter-eggs') },
  { label: 'DATABASE', href: '/database/weapons', match: (p) => p.startsWith('/database') },
  { label: 'GUIDES', href: '/guides', match: (p) => p.startsWith('/guides') },
]

function countersFor(p) {
  if (p.startsWith('/news')) return SITE_COUNTERS.news
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
    <header className="sticky top-0 z-[70] bg-ink/95 backdrop-blur-sm border-b hairline">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4 lg:gap-6">
        <Link href="/" className="font-cond font-bold text-[24px] sm:text-[26px] tracking-wide text-paper whitespace-nowrap leading-none">
          LEONIDA ARCHIVE
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.match(pathname)
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'font-cond font-semibold uppercase tracking-[0.12em] text-[15px] px-4 py-2 transition-colors duration-150',
                  active ? 'bg-paper text-ink' : 'text-dim hover:text-paper'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2 w-[240px] xl:w-[300px] h-10 px-3 bg-surface2/70 border border-line rounded-sm text-left hover:border-white/30 transition-colors"
          aria-label="Search the archive"
        >
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <span className="flex-1 text-[13px] text-dim truncate">Search the archive…</span>
          <kbd className="px-1.5 py-0.5 border border-line rounded-sm font-mono text-[10px] text-dim">/</kbd>
        </button>

        <button type="button" onClick={() => setSearchOpen(true)} className="md:hidden w-11 h-11 flex items-center justify-center text-dim hover:text-paper" aria-label="Search the archive">
          <Search size={19} />
        </button>

        <div className="hidden xl:flex items-stretch">
          {counters.map(([n, label], i) => (
            <div key={label} className={cx('px-4 flex flex-col justify-center leading-none', i > 0 && 'border-l hairline')}>
              <span className="font-cond font-bold text-[24px] text-paper tabular-nums text-center">{n}</span>
              <span className="font-cond text-[9px] text-dim uppercase tracking-[0.2em] mt-0.5 text-center">{label}</span>
            </div>
          ))}
        </div>

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
                className={cx('flex items-center min-h-[48px] px-6 font-cond font-semibold uppercase tracking-[0.12em] text-[16px] border-b hairline', active ? 'bg-paper text-ink' : 'text-dim')}
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
