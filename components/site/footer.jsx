'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Gauge, Radio } from 'lucide-react'
import { PadGlyph } from './ui'

const INDEX = [
  { label: 'Explore', links: [['Articles', '/news'], ['Categories', '/categories'], ['Leonida Map', '/map'], ['Guides', '/guides']] },
  { label: 'Database', links: [['Characters', '/database/characters'], ['Vehicles', '/database/vehicles'], ['Weapons', '/database/weapons'], ['Mechanics', '/database/mechanics']] },
  { label: 'Archive', links: [['Creator records', '/categories/creator-preview-records'], ['Secrets index', '/map?filter=secrets'], ['Source policy', '/guides/feature-roundup-source-guide']] },
]

function currentSection(pathname) {
  if (pathname === '/') return 'ARCHIVE INDEX'
  if (pathname.startsWith('/news')) return 'ARTICLE RECORDS'
  if (pathname.startsWith('/categories')) return 'CATEGORY INDEX'
  if (pathname.startsWith('/map')) return 'LEONIDA FIELD GUIDE'
  if (pathname.startsWith('/database')) return 'DATABASE RECORDS'
  if (pathname.startsWith('/guides')) return 'REFERENCE GUIDES'
  if (pathname.startsWith('/easter-eggs')) return 'SECRET INDEX'
  return 'ARCHIVE'
}

export default function Footer() {
  const pathname = usePathname() || '/'
  const section = currentSection(pathname)
  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink" aria-label="Leonida Archive footer">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)', backgroundSize: '46px 46px', maskImage: 'linear-gradient(90deg, black, transparent 75%)' }} />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] gap-7 lg:gap-12">
          <section className="max-w-[430px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Independent fan reference</p>
            <h2 className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase tracking-tight leading-[.82] text-[40px] sm:text-[52px] text-paper" data-ghost="LUSORAE">LEONIDA<br />ARCHIVE</h2>
            <p className="mt-3 text-[13px] leading-[1.55] text-dim">A navigable GTA VI fan archive built around source labels, official material and clearly marked community reporting.</p>
            <div className="data-rail mt-4">LUSORAE · INDEX 01 · {section}</div>
          </section>
          <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-6" aria-label="Footer navigation">
            {INDEX.map((group) => (
              <section key={group.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-pink">{group.label}</p>
                <ul className="mt-2.5 space-y-1.5">
                  {group.links.map(([label, href]) => (
                    <li key={href}><Link href={href} className="group inline-flex items-center gap-1.5 font-cond font-semibold uppercase tracking-[0.1em] text-[14px] text-dim transition-colors hover:text-paper"><span>{label}</span><ArrowUpRight size={12} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" /></Link></li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>
        <div className="mt-7 pt-3 border-t hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-dim" aria-hidden="true"><PadGlyph shape="cross" size={15} /><PadGlyph shape="circle" size={15} /><PadGlyph shape="triangle" size={15} /><PadGlyph shape="square" size={15} /></div>
          <p className="max-w-[660px] text-[11px] leading-relaxed text-dim sm:text-center">Independent fan project. Not affiliated with Rockstar Games, Take-Two Interactive, or their subsidiaries. Game details can change; individual records identify their source status.</p>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-dim"><Radio size={13} className="text-mint" aria-hidden="true" /><span>ARCHIVE ONLINE</span><Gauge size={14} className="text-pink" aria-hidden="true" /></div>
        </div>
      </div>
    </footer>
  )
}
