'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, Heart, Zap, Eye, CircleDot, Triangle, Maximize2, X, ArrowLeft, ArrowRight, DoorClosed, Armchair, Cog, Settings2, GitCompareArrows, Check } from 'lucide-react'
import { SourceChip, StatBar, StatusBadge, cx } from '@/components/site/ui'
import VehicleVisual, { classIcon } from '@/components/site/vehicle-visual'
import { vehicles, vehicleClasses, featureBriefs, officialCatalog } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import CollapsibleFilters from '@/components/site/collapsible-filters'

const SPEC_ICONS = [DoorClosed, Armchair, Settings2, Cog]
const SPEC_LABELS = ['DOORS', 'SEATS', 'DRIVE', 'ENGINE']

function App() {
  const router = useRouter()
  const [cls, setCls] = useState('all')
  const [query, setQuery] = useState('')
  const [maker, setMaker] = useState('all')
  const [sort, setSort] = useState('unit')
  const [selectedSlug, setSelectedSlug] = useState('vapid-ganado')
  const [favs, setFavs] = useState([])
  const [compareMode, setCompareMode] = useState(false)
  const [comparePair, setComparePair] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [gallerySlide, setGallerySlide] = useState(0)

  useEffect(() => {
    try {
      setFavs(JSON.parse(localStorage.getItem('la:favs') || '[]'))
      setComparePair(JSON.parse(localStorage.getItem('la:compare') || '[]'))
    } catch { /* noop */ }
  }, [])
  useEffect(() => { setGallerySlide(0) }, [selectedSlug])

  const saveFavs = (next) => { setFavs(next); localStorage.setItem('la:favs', JSON.stringify(next)) }
  const saveCompare = (next) => { setComparePair(next); localStorage.setItem('la:compare', JSON.stringify(next)) }

  // Os fabricantes saem da própria lista, para não haver uma segunda
  // lista a manter à mão. Os que a Rockstar ainda não nomeou ficam de
  // fora do filtro: seriam uma opção que devolvia quase toda a garagem.
  const makers = useMemo(() => {
    const seen = new Set(vehicles.map((v) => v.manufacturer).filter((m) => m && m !== 'NOT OFFICIALLY SPECIFIED'))
    return [...seen].sort((a, b) => a.localeCompare(b))
  }, [])

  const lastUpdated = useMemo(() => vehicles.map((v) => v.updatedAt).filter(Boolean).sort().pop(), [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = vehicles.filter((v) =>
      (cls === 'all' || v.cls === cls) &&
      (maker === 'all' || v.manufacturer === maker) &&
      (!q || v.name.toLowerCase().includes(q))
    )
    const byName = (a, b) => a.name.localeCompare(b.name)
    if (sort === 'name') return [...out].sort(byName)
    if (sort === 'name-desc') return [...out].sort((a, b) => byName(b, a))
    if (sort === 'updated') return [...out].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '') || byName(a, b))
    return out
  }, [cls, query, maker, sort])

  const selected = list.find((v) => v.slug === selectedSlug) || list[0] || vehicles[0]
  const selectedGallery = selected.gallery?.length ? selected.gallery : [selected.image]
  const displaySelected = { ...selected, image: selectedGallery[gallerySlide] || selected.image }
  const isFav = favs.includes(selected.slug)
  const activeFilterCount = Number(Boolean(query.trim())) + Number(cls !== 'all') + Number(maker !== 'all') + Number(sort !== 'unit') + Number(compareMode)

  const toggleFav = (slug) => saveFavs(favs.includes(slug) ? favs.filter((s) => s !== slug) : [...favs, slug])
  const toggleCompare = (slug) => {
    if (comparePair.includes(slug)) saveCompare(comparePair.filter((s) => s !== slug))
    else if (comparePair.length < 2) {
      const next = [...comparePair, slug]
      saveCompare(next)
      if (next.length === 2) setCompareOpen(true)
    }
  }

  const stats = [
    { icon: Heart, label: 'SPEED', value: selected.stats[0], color: '#C2185B' },
    { icon: Zap, label: 'ACCELERATION', value: selected.stats[1], color: '#0E7C6B' },
    { icon: Eye, label: 'BRAKING', value: selected.stats[2], color: '#5B3FD6' },
    { icon: CircleDot, label: 'HANDLING', value: selected.stats[3], color: '#334155' },
  ]

  const cmp = comparePair.map((s) => vehicles.find((v) => v.slug === s)).filter(Boolean)

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Vehicles' }]} />
          <div className="mt-4"><CategoryHeader kind="vehicles" eyebrow="Leonida vehicle catalogue" title="Vehicles" image="/media/vehicles/stanier-crew.webp" imageAlt="Official GTA VI artwork showing a customised car and its crew" description="A visual catalogue of road, air and water vehicles, organised by class, manufacturer and evidence strength without turning visual identification into unsupported specifications." count={vehicles.length} countLabel="vehicles" updatedAt={lastUpdated} /></div>

          <CollapsibleFilters title="Vehicle filters" count={list.length} activeCount={activeFilterCount} summary={`${list.length} of ${vehicles.length} entries${lastUpdated ? ` · updated ${lastUpdated}` : ''}`}>
            <div className="wiki-filter-row">
              <label className="wiki-filter-search flex-1 min-w-[200px]">
                <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vehicle…" aria-label="Search vehicle" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
              </label>
              <button type="button" onClick={() => { setCompareMode((v) => !v); if (compareMode) setCompareOpen(false) }} aria-pressed={compareMode}
                className={cx('filter-chip inline-flex items-center gap-2 h-11 px-4 font-cond font-semibold uppercase tracking-[0.12em] text-[12px] transition-colors duration-200 shrink-0')}>
                <GitCompareArrows size={14} />
                {compareMode ? `PICK (${comparePair.length}/2)` : 'COMPARE'}
              </button>
              {comparePair.length === 2 && (
                <button type="button" onClick={() => setCompareOpen(true)} className="filter-chip inline-flex items-center gap-2 h-11 px-4 font-cond font-semibold uppercase tracking-[0.12em] text-[12px] transition-colors shrink-0">
                  OPEN COMPARISON
                </button>
              )}
            </div>

            <div className="wiki-filter-grid">
              <label className="wiki-select-wrap">
                <span>Manufacturer</span>
                <select value={maker} onChange={(e) => setMaker(e.target.value)} aria-label="Filter by manufacturer">
                  <option value="all">All</option>
                  {makers.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </label>
              <label className="wiki-select-wrap">
                <span>Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort vehicles">
                  <option value="unit">Unit number</option>
                  <option value="name">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                  <option value="updated">Recently updated</option>
                </select>
              </label>
              <p className="self-end font-mono text-[11px] text-dim tabular-nums">{list.length} of {vehicles.length} entries</p>
            </div>

            <div className="wiki-filter-group" role="tablist" aria-label="Vehicle classes">
              {vehicleClasses.map((c) => {
                const Icon = classIcon(c.id)
                const active = c.id === cls
                return (
                  <button key={c.id} type="button" role="tab" aria-selected={active} onClick={() => { setCls(c.id); setQuery('') }}
                    className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                      active ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/30')}>
                    <Icon size={14} aria-hidden="true" />
                    <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{c.label}</span>
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{c.count}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleFilters>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 pb-2" role="listbox" aria-label="Vehicle grid">
            {list.map((v) => {
              const active = v.slug === selected.slug
              const fav = favs.includes(v.slug)
              const inCmp = comparePair.includes(v.slug)
              return (
                <div key={v.slug} className={cx('relative panel rounded-sm transition-all duration-200', active ? 'card-active' : 'hover:border-black/30')}>
                  <button type="button" role="option" aria-selected={active} onClick={() => router.push(`/database/vehicles/${v.slug}`)} onMouseEnter={() => setSelectedSlug(v.slug)} aria-label={`Open ${v.name}`} className="w-full text-left">
                    <span className="flex items-center justify-between px-3 pt-2.5">
                      <span className="font-mono text-[12px] text-paper tabular-nums">{v.num}</span>
                    </span>
                    <VehicleVisual v={v} className="h-[104px] mx-2.5 mt-1.5 rounded-[2px]" sizes="210px" />
                    <span className="block font-cond font-semibold uppercase tracking-[0.06em] text-[12px] text-dim px-3 py-2 truncate">{v.name}</span>
                  </button>
                  <button type="button" onClick={() => toggleFav(v.slug)} aria-label={fav ? `Remove ${v.name} from favourites` : `Add ${v.name} to favourites`} aria-pressed={fav}
                    className="absolute top-1.5 right-1.5 w-9 h-9 flex items-center justify-center text-dim hover:text-pink transition-colors">
                    <Heart size={16} fill={fav ? '#C2185B' : 'transparent'} className={fav ? 'text-pink' : ''} />
                  </button>
                  {compareMode && (
                    <button type="button" onClick={() => toggleCompare(v.slug)} aria-pressed={inCmp}
                      className={cx('absolute bottom-2 right-2 px-2 h-8 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[10px] flex items-center gap-1 transition-colors', inCmp ? 'bg-pink text-ink border-pink' : 'panel2 text-dim hover:text-paper')}>
                      {inCmp ? <Check size={11} /> : <GitCompareArrows size={11} />}{inCmp ? 'ADDED' : 'COMPARE'}
                    </button>
                  )}
                </div>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-6 w-full text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No vehicles match “{query}”</p>
                <p className="text-dim text-xs mt-1">Try another class or clear the search.</p>
              </div>
            )}
          </div>
        </div>

        {/* ASIDE: selected vehicle */}
        <aside className="tech-mask glass-panel p-5 self-start">
          <div className="corner-brackets tech-mask card-active relative overflow-hidden aspect-[16/10] bg-raised">
            <Link href={`/database/vehicles/${selected.slug}`} className="absolute inset-0" aria-label={`Open ${selected.name} full profile`}>
              <VehicleVisual v={displaySelected} className="absolute inset-0" sizes="380px" />
            </Link>
            {selectedGallery.length > 1 && <><button type="button" onClick={() => setGallerySlide((gallerySlide - 1 + selectedGallery.length) % selectedGallery.length)} aria-label="Previous vehicle image" className="absolute left-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowLeft size={14} /></button><button type="button" onClick={() => setGallerySlide((gallerySlide + 1) % selectedGallery.length)} aria-label="Next vehicle image" className="absolute right-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowRight size={14} /></button></>}
            <button type="button" onClick={() => setZoomed(true)} aria-label="Expand vehicle image" className="absolute bottom-2 left-2 w-9 h-9 panel2 rounded-sm flex items-center justify-center text-paper hover:border-black/40">
              <Maximize2 size={14} />
            </button>
          </div>

          <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.95] text-[26px] mt-4">{selected.name}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{(vehicleClasses.find((c) => c.id === selected.cls) || {}).label || selected.cls}</span>
            <StatusBadge status={selected.status} />
          </div>
          <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-mint mt-1.5">{selected.evidenceStatus}</span>
          {selected.association && <p className="mt-3 border-l-2 border-mint/70 pl-3 font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper">{selected.association}</p>}

          {/* Sem números publicados não se desenham barras — dizê-lo é a
              informação honesta, e é mais útil do que um gráfico inventado. */}
          {selected.unpublished ? (
            <div className="mt-4 border border-line rounded-sm p-4">
              <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Stats not published</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-dim">
                This vehicle is documented in official material, but no performance figures have been released for it.
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {stats.map((s) => <StatBar key={s.label} {...s} />)}
            </div>
          )}

          <div className="mt-4 grid grid-cols-4 border-y hairline divide-x divide-[rgba(11,15,22,0.14)]">
            {selected.specs.map((spec, i) => {
              const Icon = SPEC_ICONS[i]
              const [big, ...rest] = spec.split(' ')
              return (
                <div key={i} className="py-3 flex flex-col items-center gap-1">
                  <Icon size={16} className="text-dim" aria-hidden="true" />
                  <span className="font-cond font-bold text-[15px] text-paper leading-none">{big}</span>
                  <span className="font-cond text-[8px] text-dim uppercase tracking-[0.14em] text-center">{rest.join(' ') || SPEC_LABELS[i]}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SourceChip name={selected.sourceName} url={selected.sourceUrl} />
          </div>

          <Link href={`/database/vehicles/${selected.slug}`} className="mt-4 w-full inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[15px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            OPEN PROFILE
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
          </Link>
          <button type="button" onClick={() => toggleFav(selected.slug)} className="mt-2 w-full inline-flex items-center justify-center gap-2 border border-line h-11 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper hover:border-black/40 transition-colors">
            <Heart size={14} fill={isFav ? '#C2185B' : 'transparent'} className={isFav ? 'text-pink' : ''} />
            {isFav ? 'REMOVE FROM FAVOURITES' : 'ADD TO FAVOURITES'}
          </button>
        </aside>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="tech-mask-sm glass-panel border border-mint/30 bg-mint/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially named edition vehicles</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.vehicles.join(' · ')}</p>
        </div>
        <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Catalogue boundary</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.note}</p>
        </div>
      </div>

      {/* IMAGE ZOOM */}
      {zoomed && (
        <div className="fixed inset-0 z-[85] bg-black/85 flex items-center justify-center p-6" role="dialog" aria-modal="true" aria-label={`${selected.name} full image`} onClick={() => setZoomed(false)}>
          <div className="relative w-full max-w-[1100px] aspect-[16/9]">
            <VehicleVisual v={selected} className="absolute inset-0 rounded-sm border border-line" sizes="1100px" />
          </div>
          <button type="button" onClick={() => setZoomed(false)} aria-label="Close image" className="absolute top-5 right-5 w-11 h-11 panel2 rounded-sm flex items-center justify-center text-paper"><X size={18} /></button>
        </div>
      )}

      {/* COMPARISON PANEL */}
      {compareOpen && cmp.length === 2 && (
        <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Vehicle comparison">
          <div className="absolute inset-0 bg-black/75" onClick={() => setCompareOpen(false)} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-[860px] max-h-[86vh] overflow-y-auto panel rounded-sm p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[26px] text-paper">COMPARISON</h2>
              <button type="button" onClick={() => setCompareOpen(false)} aria-label="Close comparison" className="w-11 h-11 flex items-center justify-center text-dim hover:text-paper"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {cmp.map((v) => (
                <div key={v.slug} className="min-w-0">
                  <VehicleVisual v={v} className="h-[120px] sm:h-[150px] rounded-sm border border-line" sizes="420px" />
                  <h3 className="font-cond font-bold uppercase text-[20px] text-paper mt-2 truncate">{v.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-[2px] rounded-sm font-cond font-semibold uppercase text-[10px] bg-pink text-ink">{(vehicleClasses.find((c) => c.id === v.cls) || {}).label || v.cls}</span>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {['SPEED','ACCELERATION','BRAKING','HANDLING'].map((label, i) => (
                <div key={label}>
                  <div className="flex items-center justify-between">
                    <span className={cx('font-mono text-[12px] tabular-nums', cmp[0].stats[i] >= cmp[1].stats[i] ? 'text-mint' : 'text-dim')}>{cmp[0].stats[i]}</span>
                    <span className="font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-paper">{label}</span>
                    <span className={cx('font-mono text-[12px] tabular-nums', cmp[1].stats[i] >= cmp[0].stats[i] ? 'text-mint' : 'text-dim')}>{cmp[1].stats[i]}</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="relative flex-1 h-[7px] rounded-full bg-black/10 overflow-hidden" style={{ transform: 'scaleX(-1)' }}>
                      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${cmp[0].stats[i]}%`, backgroundColor: '#C2185B' }} />
                    </span>
                    <span className="relative flex-1 h-[7px] rounded-full bg-black/10 overflow-hidden">
                      <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${cmp[1].stats[i]}%`, backgroundColor: '#0E7C6B' }} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5 border-t hairline pt-4">
              {cmp.map((v) => (
                <div key={v.slug} className="grid grid-cols-2 gap-2">
                  {v.specs.map((s, i) => (
                    <div key={i} className="panel2 rounded-sm px-2 py-1.5 min-w-0">
                      <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim">{SPEC_LABELS[i]}</span>
                      <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper truncate">{s}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 flex justify-between">
              <button type="button" onClick={() => { saveCompare([]); setCompareOpen(false) }} className="font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">CLEAR SELECTION</button>
              <div className="flex gap-4">
                {cmp.map((v) => (
                  <Link key={v.slug} href={`/database/vehicles/${v.slug}`} className="font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-pink hover:underline min-h-[44px] flex items-center">{v.name} →</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
