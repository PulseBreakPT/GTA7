'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronDown, ChevronUp, Gamepad2, MapPin, ShieldCheck, Users } from 'lucide-react'
import { extendedLookBrief, gtaWikiPageLedger, settingReferences } from '@/lib/content'

export default function ExtendedLookDesk() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sync = () => setOpen(window.innerWidth >= 1024)
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return (
    <section className="border-b hairline bg-surface2/50" aria-label="Extended Look briefing">
      <div className="px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1.5">
        <span className="font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-pink">Extended Look desk</span>
        <span className="font-cond font-bold uppercase tracking-[0.1em] text-[12px] text-paper">{extendedLookBrief.releaseDate}</span>
        <span className="hidden sm:inline text-dim/60">·</span>
        <span className="font-cond uppercase tracking-[0.1em] text-[11px] text-dim">{extendedLookBrief.platforms.join(' · ')}</span>
        <span className="hidden md:inline text-dim/60">·</span>
        <span className="hidden md:inline font-cond uppercase tracking-[0.1em] text-[11px] text-dim">{extendedLookBrief.setting} · {extendedLookBrief.timeline}</span>
        <span className="hidden sm:inline font-cond font-bold uppercase tracking-[0.1em] text-[10px] text-mint">Source labels active</span>
        <div className="flex-1 min-w-[8px]" />
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="inline-flex items-center gap-1.5 min-h-8 font-cond font-bold uppercase tracking-[0.12em] text-[11px] text-paper hover:text-pink">
          {open ? 'Hide briefing' : 'Open briefing'}
          {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>
      {open && (
        <div className="px-4 sm:px-6 lg:px-8 pb-6 grid grid-cols-1 xl:grid-cols-[1.15fr_0.9fr_0.95fr] gap-4">
          <div className="border border-pink/35 bg-pink/5 rounded-sm p-5">
            <p className="font-cond font-bold uppercase tracking-[0.18em] text-[11px] text-pink">Grand Theft Auto VI · briefing</p>
            <h2 className="mt-2 font-cond font-bold uppercase tracking-tight leading-[0.9] text-[30px] sm:text-[36px] text-paper">Leonida,<br />in context.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/90">{extendedLookBrief.synopsis}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 border border-line bg-ink/40 px-2.5 py-1.5 font-cond font-bold uppercase tracking-[0.11em] text-[11px] text-paper"><CalendarDays size={13} className="text-pink" /> {extendedLookBrief.releaseDate}</span>
              <span className="inline-flex items-center gap-1.5 border border-line bg-ink/40 px-2.5 py-1.5 font-cond font-bold uppercase tracking-[0.11em] text-[11px] text-paper"><Gamepad2 size={13} className="text-mint" /> {extendedLookBrief.platforms.join(' · ')}</span>
            </div>
            <p className="mt-4 font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-dim"><strong className="text-paper">{extendedLookBrief.developer}</strong> · {extendedLookBrief.publisher} · <strong className="text-paper">{extendedLookBrief.engine}</strong></p>
          </div>
          <div className="border border-line rounded-sm p-4">
            <p className="font-cond font-bold uppercase tracking-[0.16em] text-[11px] text-pink">World & cast</p>
            <p className="mt-2 flex items-center gap-2 font-cond font-bold uppercase tracking-[0.08em] text-[20px] text-paper"><MapPin size={17} className="text-mint" /> {extendedLookBrief.setting}</p>
            <p className="mt-3 flex items-center gap-2 font-cond font-bold uppercase tracking-[0.08em] text-[17px] text-paper"><Users size={17} className="text-pink" /> {extendedLookBrief.protagonists.join(' · ')}</p>
            <p className="mt-4 font-cond font-bold uppercase tracking-[0.14em] text-[10px] text-dim">Named counties</p>
            <p className="mt-1 text-[13px] leading-relaxed text-dim">{settingReferences.map((item) => item.name).join(' · ')}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-dim">Named counties are community-reference context, not official map coordinates.</p>
          </div>
          <div className="border border-line rounded-sm p-4">
            <p className="font-cond font-bold uppercase tracking-[0.16em] text-[11px] text-pink">Release, editions & sources</p>
            <p className="mt-2 text-[13px] leading-relaxed text-dim"><strong className="text-paper">{extendedLookBrief.editions.join(' and ')}</strong> are listed in the supplied material. The named pre-order item is <strong className="text-paper">{extendedLookBrief.preorder}</strong>.</p>
            <p className="mt-2 text-[12px] leading-relaxed text-mint">{extendedLookBrief.editionContext.preorder}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-dim">{extendedLookBrief.editionContext.format}</p>
            <p className="mt-3 text-[12px] leading-relaxed text-dim"><strong className="text-paper">Languages listed:</strong> {extendedLookBrief.languages.join(' · ')}</p>
            <p className="mt-3 border-l-2 border-pink pl-3 text-[12px] leading-relaxed text-dim">{extendedLookBrief.scopeNote}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-dim">Extracted sections: {gtaWikiPageLedger.sections.join(' · ')}.</p>
            <Link href="/guides/feature-roundup-source-guide" className="mt-4 inline-flex items-center gap-1.5 font-cond font-bold uppercase tracking-[0.12em] text-[11px] text-paper hover:text-pink"><ShieldCheck size={13} /> Read source guide</Link>
          </div>
          <div className="xl:col-span-3 border-t border-line pt-4">
            <p className="font-cond font-bold uppercase tracking-[0.16em] text-[11px] text-pink">Release & media timeline</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
              {extendedLookBrief.releaseHistory.map(([date, detail]) => (
                <div key={date} className="border-l-2 border-mint/70 pl-3">
                  <p className="font-cond font-bold uppercase tracking-[0.1em] text-[13px] text-paper">{date}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-dim">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
