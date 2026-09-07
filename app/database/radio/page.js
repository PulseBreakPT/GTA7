'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Radio, ChevronRight } from 'lucide-react'
import { GhostBadge, SourceChip, StatusBadge, cx } from '@/components/site/ui'
import { radioStations } from '@/lib/content'
import { Breadcrumb } from '@/components/site/wiki'

const FILTERS = ['all', 'confirmed', 'rumour']

function App() {
  const [filter, setFilter] = useState('all')
  const [selectedSlug, setSelectedSlug] = useState('v-rock')

  const list = useMemo(() => radioStations.filter((r) => filter === 'all' || r.status === filter), [filter])
  const selected = radioStations.find((r) => r.slug === selectedSlug) || list[0] || radioStations[0]

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Radio' }]} />
          <div className="ghost-type" data-ghost="RADIO"><h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[64px] sm:text-[78px]">RADIO STATIONS</h1></div>

          <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Station status filters">
            {FILTERS.map((f) => {
              const active = filter === f
              const count = f === 'all' ? radioStations.length : radioStations.filter((r) => r.status === f).length
              return (
                <button key={f} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f)}
                  className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                    active ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/30')}>
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{f.toUpperCase()}</span>
                  <span className="font-mono text-[10px] tabular-nums opacity-70">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
            {list.map((r) => {
              const active = r.slug === selected.slug
              return (
                <button key={r.slug} type="button" onClick={() => setSelectedSlug(r.slug)} aria-pressed={active}
                  className={cx('spotlight-card tech-mask-sm glass-panel p-4 text-left flex flex-col min-h-[140px] transition-all duration-200', active ? 'card-active' : 'hover:border-black/30')}>
                  <span className="flex items-start justify-between gap-3">
                    <Radio size={24} className={active ? 'text-pink' : 'text-dim'} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="block font-cond font-bold uppercase text-[16px] text-paper leading-[1.1] mt-2">{r.name}</span>
                  <span className="block text-[11px] text-dim uppercase tracking-[0.1em] mt-1">{r.genre}</span>
                  <span className="mt-auto pt-3"><GhostBadge status={r.status} /></span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-8 text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No stations with this status</p>
              </div>
            )}
          </div>
        </div>

        <aside className="tech-mask glass-panel p-5 self-start">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-sm panel2 flex items-center justify-center text-pink" aria-hidden="true"><Radio size={24} strokeWidth={1.8} /></span>
            <div>
              <h2 className="font-cond font-bold uppercase text-[24px] text-paper leading-none">{selected.name}</h2>
              <div className="flex items-center gap-2 mt-1.5"><StatusBadge status={selected.status} /><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{selected.evidenceStatus}</span></div>
            </div>
          </div>
          <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-4">{selected.genre}</p>
          {selected.association && (
            <div className="mt-3 border-l-2 border-mint/70 pl-3">
              <span className="block font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Source context</span>
              <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{selected.association}</span>
            </div>
          )}
          <p className="text-dim text-[13px] leading-[1.8] mt-3">{selected.desc}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SourceChip name={selected.sourceName} url={selected.sourceUrl} />
            <span className="font-mono text-[10px] text-dim uppercase">UPDATED {selected.updatedAt}</span>
          </div>

          <Link href={`/database/radio/${selected.slug}`} className="mt-4 inline-flex items-center gap-2 border border-line rounded-sm px-3 h-10 font-cond font-semibold uppercase tracking-[0.12em] text-[11px] text-paper hover:border-mint hover:text-mint transition-colors">
            Read full entry <ChevronRight size={13} />
          </Link>

          {selected.tracks.length > 0 && (
            <>
              <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim mt-6">TRACKS NAMED IN THE SOURCE</h3>
              <div className="mt-2 flex flex-col gap-2">
                {selected.tracks.map(([title, artist], i) => (
                  <div key={i} className="border border-line rounded-sm px-3 py-2">
                    <span className="block font-cond font-semibold uppercase tracking-[0.08em] text-[13px] text-paper truncate">{title === '—' ? artist : title}</span>
                    {title !== '—' && <span className="block text-[11px] text-dim mt-0.5">{artist}</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Mostly a leak, not a Rockstar reveal</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">Almost everything above comes from a single piece of leaked gameplay footage from August 2026 showing the in-game radio wheel — not from Rockstar. Only V-Rock and Vice City FM have any form of direct official confirmation; the rest are marked RUMOUR regardless of how definite the names sound.</p>
        </div>
      </div>
    </div>
  )
}

export default App;
