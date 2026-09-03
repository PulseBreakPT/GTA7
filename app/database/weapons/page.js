'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Heart, Zap, Eye, Triangle, ExternalLink, Crosshair, ArrowLeft, ArrowRight } from 'lucide-react'
import DbTabs, { WeaponGlyph } from '@/components/site/dbtabs'
import { StatusBadge, cx } from '@/components/site/ui'
import { weapons, weaponTypes, weaponCounters, featureBriefs, officialCatalog } from '@/lib/content'

const pad = (n) => String(n).padStart(2, '0')

function WeaponVisual({ w, className, sizes = '160px' }) {
  if (w.image) {
    return (
      <span className={cx('relative block overflow-hidden', className)}>
        <Image src={w.image} alt={w.name} fill sizes={sizes} className="object-cover" />
        <span className="absolute inset-0 bg-ink/35" aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className={cx('flex flex-col items-center justify-center gap-1.5 bg-surface2/60 text-dim', className)} role="img" aria-label={`${w.name}: visual pending`}>
      <Crosshair size={22} aria-hidden="true" />
      <span className="font-mono text-[8px] uppercase tracking-[0.2em]">CLASSIFIED</span>
    </span>
  )
}

function App() {
  const router = useRouter()
  const [type, setType] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [selectedSlug, setSelectedSlug] = useState('morgan-revolvers')
  const [gallerySlide, setGallerySlide] = useState(0)
  const availableTypes = useMemo(() => weaponTypes.filter((t) => weapons.some((w) => w.type === t.id)), [])

  const lastUpdated = useMemo(() => weapons.map((w) => w.updatedAt).filter(Boolean).sort().pop(), [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const arr = weapons.filter((w) => type === 'all' || w.type === type)
    const out = q ? arr.filter((w) => w.name.toLowerCase().includes(q)) : arr
    const byName = (a, b) => a.name.localeCompare(b.name)
    if (sort === 'name') return [...out].sort(byName)
    if (sort === 'name-desc') return [...out].sort((a, b) => byName(b, a))
    if (sort === 'updated') return [...out].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '') || byName(a, b))
    return out
  }, [type, query])

  const selected = list.find((w) => w.slug === selectedSlug) || list[0] || weapons[0]
  const selectedGallery = selected?.gallery?.length ? selected.gallery : [selected?.image]
  const displaySelected = selected ? { ...selected, image: selectedGallery[gallerySlide] || selected.image } : selected

  const barStats = selected ? [
    { icon: Heart, label: 'DAMAGE', value: selected.stats[0], color: '#F1A3C3' },
    { icon: Zap, label: 'FIRE RATE', value: selected.stats[1], color: '#65DCCB' },
    { icon: Eye, label: 'ACCURACY', value: selected.stats[2], color: '#9B83F4' },
  ] : []

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="weapons" counters={weaponCounters} />
      <div className="px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <div className="ghost-type" data-ghost="WEAPONS"><h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[64px] sm:text-[78px]">WEAPONS</h1></div>

          <label className="mt-4 flex items-center gap-2 h-11 px-3 bg-surface2/70 border border-line rounded-sm focus-within:border-white/40">
            <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search weapon…" aria-label="Search weapon" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
          </label>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2">
              <span className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort weapons"
                className="h-9 px-2 bg-surface2/70 border border-line rounded-sm font-cond uppercase tracking-[0.08em] text-[11px] text-paper outline-none focus:border-white/40">
                <option value="default">Catalogue order</option>
                <option value="name">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="updated">Recently updated</option>
              </select>
            </label>
            <p className="font-mono text-[11px] text-dim tabular-nums ml-auto">
              {list.length} of {weapons.length} entries{lastUpdated ? ` · updated ${lastUpdated}` : ''}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Weapon types">
            <button type="button" role="tab" aria-selected={type === 'all'} onClick={() => { setType('all'); setQuery('') }}
              className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                type === 'all' ? 'border-pink text-pink bg-pink/5 shadow-[0_0_14px_-6px_rgba(241,163,195,0.6)]' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
              <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">ALL</span>
              <span className="font-mono text-[10px] tabular-nums opacity-70">{pad(weapons.length)}</span>
            </button>
            {availableTypes.map((t) => {
              const active = t.id === type
              const count = weapons.filter((w) => w.type === t.id).length
              return (
                <button key={t.id} type="button" role="tab" aria-selected={active} onClick={() => { setType(t.id); setQuery('') }}
                  className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                    active ? 'border-pink text-pink bg-pink/5 shadow-[0_0_14px_-6px_rgba(241,163,195,0.6)]' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
                  <WeaponGlyph type={t.id} size={15} className={active ? 'text-pink' : 'text-dim'} />
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{t.label}</span>
                  <span className="font-mono text-[10px] tabular-nums opacity-70">{pad(count)}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 pb-2" role="listbox" aria-label="Weapon grid">
            {list.map((w) => {
              const active = selected && w.slug === selected.slug
              return (
                <button key={w.slug} type="button" role="option" aria-selected={active} onClick={() => router.push(`/database/weapons/${w.slug}`)} onMouseEnter={() => setSelectedSlug(w.slug)}
                  className={cx('w-full panel rounded-sm p-2 flex flex-col transition-all duration-200', active ? 'card-active' : 'hover:border-white/30')}>
                  <WeaponVisual w={w} className="h-[84px] w-full rounded-[2px]" sizes="164px" />
                  <span className="font-cond font-semibold uppercase tracking-[0.08em] text-[13px] text-paper mt-2 truncate text-center">{w.name}</span>
                  <span className="font-mono text-[11px] text-dim tabular-nums text-center">{w.unpublished ? "— / —" : `${pad(w.ammo)} / ${w.mag}`}</span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-6 w-full text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No weapons match “{query}”</p>
                <p className="text-dim text-xs mt-1">Try another type or clear the search.</p>
              </div>
            )}
          </div>
        </div>

        {/* ASIDE: selected weapon */}
        {selected && (
          <aside className="tech-mask glass-panel p-5 self-start">
            <div className="relative"><WeaponVisual w={displaySelected} className="h-[200px] w-full rounded-sm border border-line scanlines" sizes="380px" />{selectedGallery.length > 1 && <><button type="button" onClick={() => setGallerySlide((gallerySlide - 1 + selectedGallery.length) % selectedGallery.length)} aria-label="Previous weapon image" className="absolute left-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowLeft size={14} /></button><button type="button" onClick={() => setGallerySlide((gallerySlide + 1) % selectedGallery.length)} aria-label="Next weapon image" className="absolute right-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowRight size={14} /></button></>}</div>

            <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.95] text-[26px] mt-4">{selected.name}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{(weaponTypes.find((t) => t.id === selected.type) || {}).label || selected.type}</span>
              <StatusBadge status={selected.status} />
            </div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.1em] text-mint mt-1.5">{selected.evidenceStatus}</span>

            {selected.unpublished ? (
              <div className="mt-4 border border-line rounded-sm p-4">
                <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Stats not published</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-dim">Documented in official material, but Rockstar has released no performance figures for it.</p>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-3">
                {barStats.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: b.color }} aria-hidden="true"><b.icon size={14} /></span>
                    <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-paper w-[74px] shrink-0">{b.label}</span>
                    <span className="relative flex-1 h-[7px] bg-white/10" role="img" aria-label={`${b.label}: ${b.value} of 100`}>
                      <span className="absolute inset-y-0 left-0 transition-all duration-300" style={{ width: `${b.value}%`, backgroundColor: b.color }} />
                      <span className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${b.value - 4}%` }} />
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 grid grid-cols-3 border-y hairline divide-x divide-[rgba(255,255,255,0.16)]">
              {[['RANGE', selected.unpublished ? '—' : selected.stats[3]], ['CAPACITY', selected.unpublished ? '—' : selected.stats[4]], ['WEIGHT', selected.unpublished ? '—' : `${selected.stats[5]} KG`]].map(([label, val]) => (
                <div key={label} className="py-3 text-center">
                  <span className="block font-cond text-[9px] text-dim uppercase tracking-[0.14em]">{label}</span>
                  <span className="block font-cond font-bold text-[18px] text-paper tabular-nums mt-0.5">{val}</span>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-dim mt-3">{selected.desc}</p>
            {selected.association && (
              <div className="mt-3 border-l-2 border-mint/70 pl-3">
                <span className="block font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Source context</span>
                <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{selected.association}</span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
                SOURCE: {selected.sourceName.toUpperCase()} <ExternalLink size={11} />
              </a>
            </div>

            <Link href={`/database/weapons/${selected.slug}`} className="mt-4 w-full inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[15px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
              OPEN PROFILE
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
            </Link>
          </aside>
        )}
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="tech-mask-sm glass-panel border border-mint/30 bg-mint/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially named edition items</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.weapons.join(' · ')}</p>
        </div>
        <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Catalogue boundary</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.note}</p>
        </div>
      </div>
    </div>
  )
}

export default App;
