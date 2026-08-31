'use client'

import { usePathname } from 'next/navigation'
import { Gauge } from 'lucide-react'
import { PadGlyph } from './ui'

export default function Footer() {
  const pathname = usePathname() || '/'
  const section = pathname === '/' ? 'SSS-TIER DATABASE'
    : pathname.startsWith('/news') ? 'NEWS'
    : pathname.startsWith('/map') ? 'LEONIDA MAP'
    : pathname.startsWith('/database/weapons') ? 'ARSENAL'
    : pathname.startsWith('/database/vehicles') ? 'GARAGE'
    : pathname.startsWith('/database/characters') ? 'CHARACTERS'
    : pathname.startsWith('/database/mechanics') ? 'MECHANICS'
    : pathname.startsWith('/guides') ? 'GUIDES'
    : pathname.startsWith('/easter-eggs') ? 'SECRETS'
    : 'ARCHIVE'
  return (
    <footer className="border-t hairline bg-ink">
      <div className="px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-3 text-dim" aria-hidden="true">
          <PadGlyph shape="cross" size={16} />
          <PadGlyph shape="circle" size={16} />
          <PadGlyph shape="triangle" size={16} />
          <PadGlyph shape="square" size={16} />
        </div>
        <p className="text-[11px] sm:text-xs text-dim text-center flex-1">
          Independent fan project. Not affiliated with Rockstar Games, Take-Two Interactive or their subsidiaries.
        </p>
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-cond uppercase tracking-[0.14em] text-[12px] text-dim">LEONIDA ARCHIVE · {section}</span>
          <Gauge size={16} className="text-pink" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
