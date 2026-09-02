'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Repeat2, HeartHandshake, Glasses, Backpack, Siren, Radar, Package, House, ExternalLink, ChevronRight } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, GhostBadge, cx } from '@/components/site/ui'
import { mechanics, characters, featureBriefs, officialCatalog } from '@/lib/content'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack, wanted: Siren, events: Radar, cargo: Package, safehouse: House }
const FILTERS = ['all', 'confirmed', 'verified', 'analysis', 'rumour']

function MechanicsPage() {
  const params = useSearchParams()
  const [filter, setFilter] = useState('all')
  const [selectedSlug, setSelectedSlug] = useState('character-switching')

  useEffect(() => {
    const m = params.get('m')
    if (m && mechanics.some((x) => x.slug === m)) setSelectedSlug(m)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const list = useMemo(() => mechanics.filter((m) => filter === 'all' || m.status === filter), [filter])
  const selected = mechanics.find((m) => m.slug === selectedSlug) || list[0] || mechanics[0]
  const confirmedCount = mechanics.filter((m) => m.status === 'confirmed' || m.status === 'verified').length

  const counters = [
    [String(mechanics.length).padStart(2, '0'), 'MECHANICS'],
    [String(confirmedCount).padStart(2, '0'), 'VERIFIED+'],
    ['04', 'SYSTEMS'],
  ]

  const SelIcon = MECH_ICONS[selected.icon] || Repeat2
  const relatedChars = characters.slice(0, 2)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="mechanics" counters={counters} />
      <div className="px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <div className="ghost-type" data-ghost="MECHANICS"><h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[64px] sm:text-[78px]">MECHANICS</h1></div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-3 order-10">
            <div className="tech-mask-sm glass-panel border border-mint/30 bg-mint/5 p-4">
              <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially documented delivery details</p>
              <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.mechanics.join(' ')}</p>
            </div>
            <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
              <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Catalogue boundary</p>
              <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.note}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Mechanic status filters">
            {FILTERS.map((f) => {
              const active = filter === f
              return (
                <button key={f} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f)}
                  className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                    active ? 'border-pink text-pink bg-pink/5 shadow-[0_0_14px_-6px_rgba(241,163,195,0.6)]' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{f.toUpperCase()}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
            {list.map((m) => {
              const Icon = MECH_ICONS[m.icon] || Repeat2
              const active = m.slug === selected.slug
              return (
                <button key={m.slug} type="button" onClick={() => setSelectedSlug(m.slug)} aria-pressed={active}
                  className={cx('spotlight-card tech-mask-sm glass-panel p-4 text-left flex flex-col min-h-[140px] transition-all duration-200', active ? 'card-active' : 'hover:border-white/30')}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-3">
                      <Icon size={26} className={active ? 'text-pink' : 'text-dim'} strokeWidth={1.8} aria-hidden="true" />
                      <span className="font-cond font-bold uppercase text-[19px] text-paper leading-[1.02]">{m.name}</span>
                    </span>
                    <span className="shrink-0 min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[11px] text-dim" aria-hidden="true">{m.glyph}</span>
                  </span>
                  <span className="block text-[12px] text-dim leading-relaxed mt-3">{m.desc}</span>
                  <span className="mt-auto pt-3"><GhostBadge status={m.status} /></span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-8 text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No mechanics with this status</p>
              </div>
            )}
          </div>
        </div>

        <aside className="tech-mask glass-panel p-5 self-start">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-sm panel2 flex items-center justify-center text-pink" aria-hidden="true"><SelIcon size={24} strokeWidth={1.8} /></span>
            <div>
              <h2 className="font-cond font-bold uppercase text-[24px] text-paper leading-none">{selected.name}</h2>
              <StatusBadge status={selected.status} className="mt-1.5" />
            </div>
          </div>
          <p className="text-paper/90 text-[14px] leading-relaxed mt-4">{selected.desc}</p>
          <p className="text-dim text-[13px] leading-[1.8] mt-3">{selected.long}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
              SOURCE: {selected.sourceName.toUpperCase()} <ExternalLink size={11} />
            </a>
            <span className="font-mono text-[10px] text-dim uppercase">UPDATED {selected.updatedAt}</span>
          </div>
          <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim mt-6">LINKED CHARACTERS</h3>
          <div className="mt-2 flex flex-col gap-2">
            {relatedChars.map((c) => (
              <Link key={c.slug} href={`/database/characters/${c.slug}`} className="flex items-center gap-3 border border-line rounded-sm px-3 h-11 group hover:border-white/40 transition-colors">
                <span className="flex-1 font-cond font-semibold uppercase tracking-[0.08em] text-[14px] text-paper truncate">{c.name}</span>
                <ChevronRight size={14} className="text-dim group-hover:text-paper" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<div className="px-8 py-16 font-cond uppercase tracking-[0.2em] text-dim">LOADING MECHANICS…</div>}>
      <MechanicsPage />
    </Suspense>
  )
}

export default App;
