'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import SearchModal from './search'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

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

  return (
    <header className="archive-header sticky top-0 z-[70] bg-ink/92 backdrop-blur-xl border-b hairline shadow-[0_8px_30px_-20px_rgba(101,220,203,0.7)] relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-mint/70 before:to-transparent">
      <div className="pl-14 pr-3 sm:pr-6 lg:pl-8 lg:pr-8 h-[56px] flex items-center gap-2 sm:gap-4 lg:gap-6">
        <span className="hidden lg:block font-mono text-[9px] tracking-[0.28em] text-dim shrink-0">OFFICIAL EVIDENCE INDEX</span>

        <div className="flex-1 min-w-0" />

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="glass-panel tech-mask-sm hidden md:flex items-center gap-2 w-[200px] xl:w-[280px] h-9 px-3 text-left hover:border-white/30 transition-colors"
          aria-label="Search the archive"
        >
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <span className="flex-1 text-[13px] text-dim truncate">Search the archive…</span>
          <kbd className="px-1.5 py-0.5 border border-line rounded-sm font-mono text-[10px] text-dim">/</kbd>
        </button>

        <button type="button" onClick={() => setSearchOpen(true)} className="md:hidden w-11 h-11 flex items-center justify-center text-dim hover:text-paper" aria-label="Search the archive">
          <Search size={19} />
        </button>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
