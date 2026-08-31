'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Plus, Minus, RotateCcw, Route, Triangle, X, SlidersHorizontal, Compass, Check, BadgeCheck, Eye } from 'lucide-react'
import { regions, mapFilters, locations, easterEggs } from '@/lib/content'
import { GhostBadge, StatusBadge, cx } from '@/components/site/ui'

const VBW = 1000, VBH = 620
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
        {/* water texture */}
        <g stroke="#0D1622" strokeWidth="1.5">
          {[...Array(12)].map((_, i) => <line key={i} x1={520 + i * 6} y1={40 + i * 46} x2={560 + i * 6} y2={40 + i * 46} />)}
        </g>
        {/* mainland */}
        <path d="M40,20 L560,20 L595,80 L615,150 L608,290 L565,375 L480,465 L350,515 L150,555 L55,515 L40,20 Z" fill="#131B27" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        {/* port gellhorn basin cut */}
        <path d="M120,58 L292,58 L292,92 L206,92 L206,126 L120,126 Z" fill="#081018" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        {/* docks */}
        <g fill="#1E2938">
          <rect x="140" y="94" width="46" height="10" />
          <rect x="150" y="110" width="58" height="8" />
          <rect x="216" y="96" width="12" height="34" />
          <rect x="238" y="96" width="12" height="44" />
        </g>
        {/* grassrivers wetland texture */}
        <g stroke="#1C2836" strokeWidth="2.5" fill="none">
          {[[130,360],[190,405],[150,455],[230,470],[280,430],[210,350],[300,505],[120,505]].map(([x, y], i) => (
            <path key={i} d={`M${x},${y} q10,-8 20,0 q10,8 20,0`} />
          ))}
        </g>
        {/* vice city barrier island */}
        <path d="M655,115 C695,92 762,102 772,155 L788,295 C795,360 765,425 722,436 C688,443 660,412 656,358 L648,170 C647,148 648,122 655,115 Z" fill="#16202E" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
        {/* beach edge */}
        <path d="M772,155 L788,295 C793,352 770,415 726,431" fill="none" stroke="#33405A" strokeWidth="5" />
        {/* keys */}
        <g fill="#16202E" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
          <ellipse cx="655" cy="505" rx="30" ry="14" />
          <ellipse cx="712" cy="532" rx="26" ry="12" />
          <ellipse cx="768" cy="556" rx="24" ry="11" />
          <ellipse cx="822" cy="572" rx="20" ry="10" />
          <ellipse cx="874" cy="586" rx="18" ry="9" />
        </g>
        {/* roads */}
        <g stroke="#222D3D" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M200,120 L420,130 L590,150 L660,190" />
          <path d="M180,380 L340,360 L520,330 L640,320" />
          <path d="M700,140 L700,420" />
          <path d="M672,200 L760,208 M668,260 L775,268 M664,320 L780,330 M668,380 L764,388" strokeWidth="2.5" />
          <path d="M712,436 L695,470 L655,505 L712,532 L768,556 L822,572 L874,586" strokeDasharray="7 5" strokeWidth="3" />
        </g>
        {/* region labels */}
        <g fontFamily="var(--font-cond)" fontWeight="600" fill="#969BA5" letterSpacing="3">
          <text x="150" y="180" fontSize="17">PORT GELLHORN</text>
          <text x="165" y="330" fontSize="17">GRASSRIVERS</text>
          <text x="686" y="96" fontSize="17">VICE CITY</text>
          <text x="760" y="525" fontSize="15">LEONIDA KEYS</text>
        </g>
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
  const [selected, setSelected] = useState('panther-mural')
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
              className={cx('flex items-center justify-between px-3 h-11 border rounded-sm font-cond font-semibold uppercase tracking-[0.12em] text-[14px] transition-all duration-150',
                region === r2.id ? 'card-active bg-surface2 text-paper border-transparent' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
              {r2.label}
              <Compass size={13} className="opacity-60" aria-hidden="true" />
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-cond font-bold uppercase text-paper leading-[0.9] tracking-tight text-[48px] sm:text-[64px]">LEONIDA MAP</h1>
        <label className="flex items-center gap-2 w-full sm:w-[340px] h-11 px-3 bg-surface2/70 border border-line rounded-sm focus-within:border-white/40">
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search location, activity or clue…" aria-label="Search locations" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-dim hover:text-paper"><X size={14} /></button>}
        </label>
      </div>

      <div className="mt-5 flex-1 grid grid-cols-1 lg:grid-cols-[264px_1fr] xl:grid-cols-[264px_1fr_330px] gap-4 min-h-0">
        {/* sidebar */}
        <aside className="hidden lg:block panel rounded-md p-4 self-start">{FiltersPanel}</aside>

        {/* map */}
        <div className="relative panel rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[560px]">
          <MapSurface view={view} setView={setView} dragging={dragging} setDragging={setDragging} markers={markers} selected={selected} onSelect={selectMarker} showRoute={showRoute} />
          {/* controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <button type="button" onClick={() => zoom(1)} aria-label="Zoom in" className="w-11 h-11 panel2 rounded-sm flex items-center justify-center text-paper hover:border-white/40"><Plus size={16} /></button>
            <button type="button" onClick={() => zoom(-1)} aria-label="Zoom out" className="w-11 h-11 panel2 rounded-sm flex items-center justify-center text-paper hover:border-white/40"><Minus size={16} /></button>
            <button type="button" onClick={reset} aria-label="Reset view" className="w-11 h-11 panel2 rounded-sm flex items-center justify-center text-paper hover:border-white/40"><RotateCcw size={15} /></button>
            <button type="button" onClick={() => setShowRoute((v) => !v)} aria-pressed={showRoute} aria-label="Toggle route visibility" className={cx('w-11 h-11 panel2 rounded-sm flex items-center justify-center hover:border-white/40', showRoute ? 'text-pink' : 'text-dim')}><Route size={16} /></button>
          </div>
          {/* legend */}
          <div className="absolute bottom-3 left-3 panel2 rounded-sm px-3 py-2.5 flex flex-col gap-1.5" aria-label="Legend">
            {mapFilters.map((f) => (
              <span key={f.id} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} aria-hidden="true" />
                <span className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">{f.label}</span>
              </span>
            ))}
          </div>
          {/* marker count */}
          <span className="absolute top-3 left-3 panel2 rounded-sm px-2.5 py-1.5 font-mono text-[11px] text-dim tabular-nums">{markers.length} MARKERS</span>
          {/* mobile filter trigger */}
          <button type="button" onClick={() => setSheet('filters')} className="lg:hidden absolute bottom-3 right-3 panel2 rounded-sm h-11 px-4 flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-paper">
            <SlidersHorizontal size={15} /> FILTERS
          </button>
        </div>

        {/* inspector (desktop) */}
        <aside className="hidden xl:flex panel rounded-md p-5 flex-col">{DetailPanel}</aside>
      </div>

      {/* inspector below map on lg only */}
      <div className="hidden lg:block xl:hidden panel rounded-md p-5 mt-4">{DetailPanel}</div>

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
