'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Search, Plus, Minus, RotateCcw, Route, Triangle, X, SlidersHorizontal, Compass, Check, BadgeCheck, Eye } from 'lucide-react'
import { regions, mapFilters, locations, easterEggs, featureBriefs } from '@/lib/content'
import { GhostBadge, StatusBadge, cx } from '@/components/site/ui'
import MapTerrain, { MAP_VBW, MAP_VBH } from '@/components/site/map-terrain'

const VBW = MAP_VBW, VBH = MAP_VBH
const CATEGORY_COLOR = Object.fromEntries(mapFilters.map((f) => [f.id, f.color]))
const PROGRESS = [
  { icon: Check, label: 'DISCOVERED', value: 64, color: '#F1A3C3' },
  { icon: BadgeCheck, label: 'VERIFIED', value: 48, color: '#65DCCB' },
  { icon: Eye, label: 'UNEXPLORED', value: 29, color: '#9B83F4' },
]

function MapSurface({ view, setView, dragging, setDragging, markers, selected, onSelect, showRoute }) {
  const svgRef = useRef(null)
  const drag = useRef(null)

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false }
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const sx = VBW / rect.width
    const dx = (e.clientX - drag.current.x) * sx
    const dy = (e.clientY - drag.current.y) * sx
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true
    setView((v) => ({ ...v, x: drag.current.vx + dx, y: drag.current.vy + dy }))
  }
  const onPointerUp = () => { drag.current = null; setDragging(false) }
  const onWheel = (e) => {
    e.preventDefault()
    setView((v) => {
      const k2 = Math.min(4, Math.max(0.55, v.k * (e.deltaY < 0 ? 1.15 : 0.87)))
      const px = (VBW / 2 - v.x) / v.k
      const py = (VBH / 2 - v.y) / v.k
      return { x: VBW / 2 - px * k2, y: VBH / 2 - py * k2, k: k2 }
    })
  }

  const sel = markers.find((m) => m.slug === selected)
  const r = (n) => n / view.k

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VBW} ${VBH}`}
      className="w-full h-full touch-none cursor-grab active:cursor-grabbing select-none"
      role="application"
      aria-label="Interactive map of Leonida. Drag to pan, scroll to zoom."
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <rect width={VBW} height={VBH} fill="#081018" />
      <g style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})`, transformOrigin: '0 0', transition: dragging ? 'none' : 'transform 300ms ease' }}>
        <MapTerrain />
        {/* route to selection */}
        {showRoute && sel && (
          <g>
            <path d={`M700,320 L700,${sel.y > 320 ? sel.y - 6 : sel.y + 6} L${sel.x},${sel.y}`} fill="none" stroke="#F1A3C3" strokeWidth={r(4)} strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
            <circle cx="700" cy="320" r={r(5)} fill="#F1A3C3" />
          </g>
        )}
        {/* markers */}
        {markers.map((m) => {
          const active = m.slug === selected
          const color = CATEGORY_COLOR[m.category]
          return (
            <g
              key={m.slug}
              transform={`translate(${m.x},${m.y})`}
              role="button"
              tabIndex={0}
              aria-label={`${m.name}, ${m.category}${active ? ', selected' : ''}`}
              className="cursor-pointer focus:outline-none"
              onClick={(e) => { e.stopPropagation(); onSelect(m.slug) }}
              onPointerDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(m.slug) } }}
            >
              {active && <circle r={r(17)} fill="none" stroke="#FFFFFF" strokeWidth={r(2)} />}
              {active && <circle r={r(24)} fill="none" stroke="#F1A3C3" strokeWidth={r(1.5)} opacity="0.55" />}
              <circle r={r(8)} fill="#07090E" stroke={color} strokeWidth={r(2.5)} />
              <circle r={r(3)} fill={color} />
              {(active || view.k >= 1.6) && (
                <text y={r(-24)} textAnchor="middle" fontFamily="var(--font-cond)" fontWeight="600" fontSize={r(14)} fill="#F5F4F0" letterSpacing="1.5" style={{ paintOrder: 'stroke', stroke: '#07090E', strokeWidth: r(3) }}>
                  {m.name}
                </text>
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function MapPage() {
  const params = useSearchParams()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState(null)
  const [cats, setCats] = useState(() => new Set(mapFilters.map((f) => f.id)))
  const [selected, setSelected] = useState('ocean-beach')
  const [view, setView] = useState({ x: 0, y: 0, k: 1 })
  const [dragging, setDragging] = useState(false)
  const [showRoute, setShowRoute] = useState(true)
  const [sheet, setSheet] = useState(null) // 'filters' | 'detail' | null (mobile)

  useEffect(() => {
    const loc = params.get('loc')
    if (loc && locations.some((l) => l.slug === loc)) {
      const m = locations.find((l) => l.slug === loc)
      setSelected(loc)
      setView({ x: VBW / 2 - m.x * 1.8, y: VBH / 2 - m.y * 1.8, k: 1.8 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return locations.filter((l) =>
      cats.has(l.category) &&
      (!region || l.region === region) &&
      (!q || l.name.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q) || l.category.includes(q))
    )
  }, [query, region, cats])
  const visibleRegions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return regions
    return regions.filter((item) => `${item.label} ${item.blurb || ''}`.toLowerCase().includes(q))
  }, [query])

  const sel = locations.find((l) => l.slug === selected)
  const selVisible = sel && markers.some((m) => m.slug === sel.slug)
  const egg = sel && easterEggs.find((e) => e.slug === sel.slug)

  const pickRegion = (id) => {
    const next = region === id ? null : id
    setRegion(next)
    if (next) {
      const rg = regions.find((r2) => r2.id === id)
      setView({ x: VBW / 2 - rg.cx * rg.k, y: VBH / 2 - rg.cy * rg.k, k: rg.k })
    } else {
      setView({ x: 0, y: 0, k: 1 })
    }
  }

  const toggleCat = (id) => setCats((prev) => {
    const n = new Set(prev)
    if (n.has(id)) n.delete(id); else n.add(id)
    return n
  })

  const selectMarker = (slug) => { setSelected(slug); setSheet('detail') }
  const zoom = (dir) => setView((v) => {
    const k2 = Math.min(4, Math.max(0.55, v.k * (dir > 0 ? 1.25 : 0.8)))
    const px = (VBW / 2 - v.x) / v.k, py = (VBH / 2 - v.y) / v.k
    return { x: VBW / 2 - px * k2, y: VBH / 2 - py * k2, k: k2 }
  })
  const reset = () => { setRegion(null); setView({ x: 0, y: 0, k: 1 }) }

  const FiltersPanel = (
    <>
      <div>
        <h2 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim">REGIONS</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {regions.map((r2) => (
            <button key={r2.id} type="button" onClick={() => pickRegion(r2.id)} aria-pressed={region === r2.id}
              className={cx('border rounded-sm overflow-hidden text-left transition-all duration-150',
                region === r2.id ? 'card-active bg-surface2 border-transparent' : 'border-line hover:border-white/30 group')}>
              <span className="flex items-center justify-between px-3 h-11 font-cond font-semibold uppercase tracking-[0.12em] text-[14px]">
                <span className={region === r2.id ? 'text-paper' : 'text-dim group-hover:text-paper'}>{r2.label}</span>
                <Compass size={13} className="opacity-60" aria-hidden="true" />
              </span>
              {/* A região seleccionada mostra o postal oficial e o que dela se
                  sabe; `sourced` distingue descrição oficial de leitura da
                  própria imagem, para não passarem por confirmação igual. */}
              {region === r2.id && r2.blurb && (
                <span className="block border-t border-line/60">
                  {r2.image && (
                    <span className="block relative aspect-[16/7] overflow-hidden">
                      <Image src={r2.image} alt={`Official artwork for ${r2.label}`} fill sizes="320px" className="object-cover" />
                    </span>
                  )}
                  <span className="block px-3 py-2.5">
                    <span className="block font-sans text-[12px] leading-snug text-dim normal-case tracking-normal">{r2.blurb}</span>
                    <span className="block mt-1.5 font-cond uppercase tracking-[0.14em] text-[10px] text-dim/70">
                      {r2.sourced ? 'Official description' : 'Read from official imagery'}
                    </span>
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim">FILTERS</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {mapFilters.map((f) => {
            const on = cats.has(f.id)
            const count = locations.filter((l) => l.category === f.id).length
            return (
              <button key={f.id} type="button" onClick={() => toggleCat(f.id)} aria-pressed={on}
                className={cx('flex items-center gap-3 px-3 h-11 border rounded-sm transition-all duration-150', on ? 'border-line bg-surface2/70' : 'border-line/50 opacity-50 hover:opacity-80')}>
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: f.color }} aria-hidden="true" />
                <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[14px] text-paper flex-1 text-left">{f.label}</span>
                <span className="font-mono text-[11px] text-dim tabular-nums">{String(count).padStart(2, '0')}</span>
                {on && <Check size={13} className="text-mint" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2.5">
        {PROGRESS.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: p.color }} aria-hidden="true"><p.icon size={13} /></span>
            <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[12px] text-paper w-24 shrink-0">{p.label}</span>
            <span className="relative flex-1 h-[5px] bg-white/10" role="img" aria-label={`${p.label}: ${p.value}%`}>
              <span className="absolute inset-y-0 left-0" style={{ width: `${p.value}%`, backgroundColor: p.color }} />
            </span>
            <span className="font-mono text-[10px] text-dim tabular-nums">{p.value}%</span>
          </div>
        ))}
      </div>
    </>
  )

  const DetailPanel = sel ? (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.95] text-[30px]">{sel.name}</h2>
        <StatusBadge status={sel.status} />
      </div>
      <p className="font-cond uppercase tracking-[0.14em] text-[11px] mt-1" style={{ color: CATEGORY_COLOR[sel.category] }}>
        {mapFilters.find((f) => f.id === sel.category).label} · {regions.find((r2) => r2.id === sel.region).label}
      </p>
      <p className="text-dim text-[13px] leading-relaxed mt-3">{sel.desc}</p>
      {sel.clues && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-paper">{sel.clues[0]} / {sel.clues[1]} CLUES</span>
            <span className="font-mono text-[10px] text-dim">{Math.round((sel.clues[0] / sel.clues[1]) * 100)}%</span>
          </div>
          <div className="flex gap-1.5 mt-2" role="img" aria-label={`${sel.clues[0]} of ${sel.clues[1]} clues found`}>
            {[...Array(sel.clues[1])].map((_, i) => (
              <span key={i} className={cx('h-[6px] flex-1 rounded-sm', i < sel.clues[0] ? 'bg-pink' : 'bg-white/10')} />
            ))}
          </div>
        </div>
      )}
      {!selVisible && <p className="mt-3 text-[11px] text-warn">Marker hidden by current filters.</p>}
      <div className="mt-auto pt-5 flex flex-col gap-2">
        {egg ? (
          <Link href={`/easter-eggs/${egg.slug}`} className="inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            VIEW EASTER EGG
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
          </Link>
        ) : sel.vehicle ? (
          <Link href={`/database/vehicles/${sel.vehicle}`} className="inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            VIEW VEHICLE
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
          </Link>
        ) : (
          <Link href="/guides/vice-city-districts-primer" className="inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            OPEN DISTRICT GUIDE
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
          </Link>
        )}
        <p className="font-mono text-[10px] text-dim uppercase tracking-wide">SOURCE: {sel.sourceName} · UPDATED {sel.updatedAt}</p>
      </div>
    </div>
  ) : null

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
      <div className="ghost-type flex flex-wrap items-end justify-between gap-4" data-ghost="FIELD GUIDE">
        <div><div className="data-rail max-w-[360px] !text-mint">ARCHIVE ATLAS · REGION INTELLIGENCE</div><h1 className="chromatic-title mt-4 font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[64px] sm:text-[78px]">MAP</h1></div>
        <label className="tech-mask-sm glass-panel flex items-center gap-2 w-full sm:w-[340px] h-11 px-3 focus-within:border-white/40">
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a Leonida region…" aria-label="Search Leonida regions" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-dim hover:text-paper"><X size={14} /></button>}
        </label>
      </div>
      <p className="mt-3 max-w-[900px] font-mono text-[10px] uppercase tracking-[0.12em] text-dim">Official location index only · Rockstar has not published a complete labelled map, boundaries, coordinates or scale.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 min-h-0 max-w-[1240px]">
        {/* sidebar */}
        <aside className="hidden">{FiltersPanel}</aside>

        {/* region information */}
        <section className="tech-mask glass-panel p-4 sm:p-6" aria-labelledby="region-intel-heading">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <p className="font-cond text-[11px] uppercase tracking-[0.18em] text-pink">Leonida field guide</p>
              <h2 id="region-intel-heading" className="font-cond font-bold uppercase tracking-tight text-[28px] sm:text-[34px] text-paper">Region intel</h2>
              <p className="mt-1 text-[13px] leading-relaxed text-dim">A source-labelled index for every named Leonida region in this archive.</p>
            </div>
            <span className="panel2 rounded-sm px-2.5 py-1.5 font-mono text-[11px] text-dim">{visibleRegions.length} OF {regions.length} REGIONS</span>
          </div>
          <div className="focus-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleRegions.map((r2, index) => {
              const regionMarkers = locations.filter((l) => l.region === r2.id)
              const active = region === r2.id
                return (
                <Link key={r2.id} href={`/map/${r2.id}`}
                  className={cx('focus-card spotlight-card tech-mask-sm group text-left border overflow-hidden transition-all', index % 2 ? 'sm:mt-8' : '', active ? 'border-pink bg-surface2' : 'border-line hover:border-white/40')}>
                  {r2.image && <span className="corner-brackets film-frame block relative aspect-[16/7] overflow-hidden bg-surface2"><Image src={r2.image} alt={`Imagem de ${r2.label}`} fill sizes="(max-width: 640px) 100vw, 420px" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" /><span className="absolute right-3 top-3 z-[4] font-mono text-[9px] tracking-[0.15em] text-paper/80">ZONE {String(index + 1).padStart(2, '0')}</span></span>}
                  <span className="block p-4">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-cond font-bold uppercase tracking-[0.12em] text-[17px] text-paper">{r2.label}</span>
                      <span className="font-mono text-[10px] text-dim">{regionMarkers.length} ENTRIES</span>
                    </span>
                    <span className="mt-2 block text-[13px] leading-relaxed text-dim">{r2.blurb}</span>
                    <span className="mt-3 block font-cond uppercase tracking-[0.14em] text-[10px] text-dim/70">{r2.sourced ? 'Official description' : 'Read from official imagery'}</span>
                  </span>
                </Link>
              )
            })}
          </div>
          {visibleRegions.length === 0 && <p className="mt-5 border border-line rounded-sm p-5 text-[13px] text-dim">No named region matches this search. Try Vice City, Keys, Ambrosia, Grassrivers, Mount Kalaga or Port Gellhorn.</p>}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="tech-mask-sm glass-panel border border-mint/30 bg-mint/5 p-4">
              <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-mint">Feature roundup · named context</p>
              <ul className="mt-2 space-y-2 text-[12px] leading-relaxed text-dim">
                {featureBriefs.map.confirmed.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
              <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-pink">Map boundary</p>
              <p className="mt-2 text-[12px] leading-relaxed text-dim">Community reconstructions, inferred county borders, routes and exact marker positions are not shown as Rockstar facts.</p>
            </div>
          </div>
        </section>

        <aside className="hidden">{DetailPanel}</aside>
      </div>

      <div className="hidden">{DetailPanel}</div>

      {/* mobile bottom sheets */}
      {sheet && (
        <div className="lg:hidden fixed inset-0 z-[75]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSheet(null)} />
          <div className="absolute bottom-0 inset-x-0 bg-raised border-t hairline rounded-t-2xl max-h-[72vh] overflow-y-auto p-5 transition-transform duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="font-cond font-bold uppercase tracking-[0.14em] text-[15px] text-paper">{sheet === 'filters' ? 'REGIONS & FILTERS' : 'SELECTED MARKER'}</span>
              <button type="button" onClick={() => setSheet(null)} aria-label="Close panel" className="w-11 h-11 flex items-center justify-center text-dim hover:text-paper"><X size={18} /></button>
            </div>
            {sheet === 'filters' ? FiltersPanel : DetailPanel}
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<div className="px-8 py-16 font-cond uppercase tracking-[0.2em] text-dim">LOADING MAP…</div>}>
      <MapPage />
    </Suspense>
  )
}

export default App;
