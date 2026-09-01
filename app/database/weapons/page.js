'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Heart, Zap, Eye, Plus, Triangle, ExternalLink, Crosshair, Pill, BatteryFull, ArrowLeft, ArrowRight } from 'lucide-react'
import DbTabs, { WeaponGlyph } from '@/components/site/dbtabs'
import { StatusBadge, GlyphHint, cx } from '@/components/site/ui'
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
  const [type, setType] = useState('handgun')
  const [query, setQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState('morgan-revolvers')
  const [gallerySlide, setGallerySlide] = useState(0)
  const availableTypes = useMemo(() => weaponTypes.filter((t) => weapons.some((w) => w.type === t.id)), [])

  const ofType = useMemo(() => weapons.filter((w) => w.type === type), [type])
  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? ofType.filter((w) => w.name.toLowerCase().includes(q)) : ofType
  }, [ofType, query])

  const selected = list.find((w) => w.slug === selectedSlug) || list[0] || ofType[0]
  const selectedGallery = selected?.gallery?.length ? selected.gallery : [selected?.image]
  const displaySelected = selected ? { ...selected, image: selectedGallery[gallerySlide] || selected.image } : selected
  const selIndex = Math.max(0, list.findIndex((w) => w.slug === (selected && selected.slug)))
  const typeMeta = weaponTypes.find((t) => t.id === type)

  const pickType = (id) => {
    setType(id)
    setQuery('')
    const first = weapons.find((w) => w.type === id)
    if (first) setSelectedSlug(first.slug)
  }
  const cycle = () => {
    if (!list.length) return
    setSelectedSlug(list[(selIndex + 1) % list.length].slug)
  }

  const barStats = selected ? [
    { icon: Heart, label: 'DAMAGE', value: selected.stats[0], color: '#F1A3C3' },
    { icon: Zap, label: 'FIRE RATE', value: selected.stats[1], color: '#65DCCB' },
    { icon: Eye, label: 'ACCURACY', value: selected.stats[2], color: '#9B83F4' },
  ] : []

  // circular slots: 8 positions starting at top, clockwise
  const slots = [...Array(8)].map((_, i) => list[i] || null)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="weapons" />
      <section className="mx-4 sm:mx-6 lg:mx-8 mt-6 max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-3 order-10">
        <div className="tech-mask-sm glass-panel border border-mint/30 bg-mint/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially named edition items</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.weapons.join(' · ')}</p>
        </div>
        <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Catalogue boundary</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">{officialCatalog.note}</p>
        </div>
      </section>
      <p className="mx-4 sm:mx-6 lg:mx-8 max-w-[1280px] mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">PUBLIC VIEW: OFFICIAL — NAMED · OFFICIAL — DEPICTED · OFFICIAL — CATEGORY CONFIRMED</p>
      <div className="px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_372px] gap-6 flex-1">
        {/* LEFT */}
        <aside className="min-w-0 order-2 lg:order-none">
          <div className="ghost-type" data-ghost="ARSENAL"><h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[64px] sm:text-[78px]">ARSENAL</h1></div>
          <div className="flex items-stretch mt-3">
            {weaponCounters.map(([n, label], i) => (
              <div key={label} className={cx('pr-5 flex flex-col leading-none', i > 0 && 'pl-5 border-l hairline')}>
                <span className="font-cond font-bold text-[30px] text-paper tabular-nums">{n}</span>
                <span className="font-cond text-[10px] text-dim uppercase tracking-[0.18em] mt-1">{label}</span>
              </div>
            ))}
          </div>

          <label className="tech-mask-sm glass-panel mt-5 flex items-center gap-2 h-11 px-3 focus-within:border-white/40">
            <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search weapon…" aria-label="Search weapon" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
          </label>

          <div className="mt-4 flex flex-col gap-1.5" role="tablist" aria-label="Weapon types">
            {availableTypes.map((t) => {
              const active = t.id === type
              const count = weapons.filter((w) => w.type === t.id).length
              return (
                <button key={t.id} type="button" role="tab" aria-selected={active} onClick={() => pickType(t.id)}
                  className={cx('flex items-center gap-2 px-2.5 h-9 border rounded-sm transition-all duration-150',
                    active ? 'border-pink text-pink bg-pink/5 shadow-[0_0_14px_-6px_rgba(241,163,195,0.6)]' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
                  <WeaponGlyph type={t.id} size={19} className={active ? 'text-pink' : 'text-dim'} />
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] flex-1 text-left">{t.label}</span>
                  <span className="font-mono text-[10px] tabular-nums">{pad(count)}</span>
                </button>
              )
            })}
          </div>

          {/* Rockstar não publicou estatísticas de arma nenhuma. Onde não as
              há, dizemo-lo em vez de desenhar barras que seriam inventadas. */}
          {selected.unpublished ? (
            <div className="mt-6 border border-line rounded-sm p-4">
              <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Stats not published</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-dim">
                This weapon is documented in official imagery, but Rockstar has released no performance figures for it. No numbers are shown here rather than invented ones.
              </p>
            </div>
          ) : (
          <div className="mt-6 flex flex-col gap-3" aria-label="Selected weapon core stats">
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
        </aside>

        {/* CENTER: circular inventory */}
        <div className="min-w-0 flex flex-col order-1 lg:order-none">
          <div className="relative mx-auto w-full max-w-[560px] aspect-square">
            <span className="absolute inset-[11%] rounded-full border border-line/70" aria-hidden="true" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-cond font-bold uppercase tracking-[0.1em] text-[30px] text-paper">{typeMeta.label}</span>
              <span className="font-mono text-[15px] text-pink tabular-nums mt-1">{list.length ? selIndex + 1 : 0} / {list.length || 0}</span>
            </div>
            {slots.map((w, i) => {
              const angle = (-90 + i * 45) * (Math.PI / 180)
              const cxp = 50 + 39 * Math.cos(angle)
              const cyp = 50 + 39 * Math.sin(angle)
              const nxp = 50 + 51 * Math.cos(angle)
              const nyp = 50 + 51 * Math.sin(angle)
              const active = w && selected && w.slug === selected.slug
              return (
                <div key={i}>
                  <span
                    className={cx('absolute z-10 w-6 h-6 rounded-full flex items-center justify-center font-cond font-bold text-[12px] transition-colors duration-150',
                      active ? 'bg-pink text-ink' : 'bg-ink border border-line text-dim')}
                    style={{ left: `${nxp}%`, top: `${nyp}%`, transform: 'translate(-50%,-50%)' }}
                    aria-hidden="true"
                  >{i + 1}</span>
                  {w ? (
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(w.slug)}
                      aria-pressed={active}
                      aria-label={`Select ${w.name}, slot ${i + 1}`}
                      className={cx('absolute w-[19%] min-w-[76px] aspect-square panel2 rounded-sm p-1.5 flex flex-col transition-all duration-200', active && 'card-active scale-[1.04]')}
                      style={{ left: `${cxp}%`, top: `${cyp}%`, transform: 'translate(-50%,-50%)' }}
                    >
                      <WeaponVisual w={w} className="flex-1 w-full rounded-[2px]" sizes="110px" />
                      <span className="font-mono text-[11px] text-paper/90 tabular-nums text-center pt-1">{w.unpublished ? "— / —" : `${pad(w.ammo)} / ${w.mag}`}</span>
                    </button>
                  ) : (
                    <div
                      className="absolute w-[19%] min-w-[76px] aspect-square panel2 rounded-sm flex items-center justify-center text-dim/50"
                      style={{ left: `${cxp}%`, top: `${cyp}%`, transform: 'translate(-50%,-50%)' }}
                      role="img"
                      aria-label={`Slot ${i + 1}: empty`}
                    >
                      <Plus size={20} aria-hidden="true" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* carousel */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-2" role="listbox" aria-label="Weapon grid">
            {list.map((w) => {
              const active = selected && w.slug === selected.slug
              return (
                <button key={w.slug} type="button" role="option" aria-selected={active} onClick={() => setSelectedSlug(w.slug)}
                  className={cx('w-full panel rounded-sm p-2 flex flex-col transition-all duration-200', active ? 'card-active' : 'hover:border-white/30')}>
                  <WeaponVisual w={w} className="h-[84px] w-full rounded-[2px]" sizes="164px" />
                  <span className="font-cond font-semibold uppercase tracking-[0.08em] text-[13px] text-paper mt-2 truncate text-center">{w.name}</span>
                  <span className="font-mono text-[11px] text-dim tabular-nums text-center">{w.unpublished ? "— / —" : `${pad(w.ammo)} / ${w.mag}`}</span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-6 w-full text-center">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No weapons match “{query}”</p>
                <p className="text-dim text-xs mt-1">Clear the search to see the full {typeMeta.label.toLowerCase()} rack.</p>
              </div>
            )}
          </div>

        </div>

        {/* RIGHT inspector */}
        {selected && (
          <aside className="panel rounded-md p-5 self-start w-full order-3 lg:order-none">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.95] text-[28px]">{selected.name}</h2>
                <p className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-pink mt-1">{selected.type === 'handgun' ? 'SIDEARM' : typeMeta.label}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <StatusBadge status={selected.status} />
                <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{selected.evidenceStatus}</span>
                <a href={selected.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2 py-1 font-cond uppercase tracking-[0.1em] text-[10px] text-dim hover:text-paper hover:border-white/40">
                  {selected.sourceName.toUpperCase()} <ExternalLink size={10} />
                </a>
              </div>
            </div>

                <div className="relative mt-4"><WeaponVisual w={displaySelected} className="h-[200px] w-full rounded-sm border border-line scanlines" sizes="370px" />{selectedGallery.length > 1 && <><button type="button" onClick={() => setGallerySlide((gallerySlide - 1 + selectedGallery.length) % selectedGallery.length)} aria-label="Previous weapon image" className="absolute left-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowLeft size={14} /></button><button type="button" onClick={() => setGallerySlide((gallerySlide + 1) % selectedGallery.length)} aria-label="Next weapon image" className="absolute right-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowRight size={14} /></button></>}</div>

            <div className="mt-4 grid grid-cols-3 border-y hairline divide-x divide-[rgba(255,255,255,0.16)]">
              {[['RANGE', selected.unpublished ? '—' : selected.stats[3]], ['CAPACITY', selected.unpublished ? '—' : selected.stats[4]], ['WEIGHT', selected.unpublished ? '—' : `${selected.stats[5]} KG`]].map(([label, val]) => (
                <div key={label} className="py-3 text-center">
                  <span className="block font-cond text-[10px] text-dim uppercase tracking-[0.18em]">{label}</span>
                  <span className="block font-cond font-bold text-[24px] text-paper tabular-nums mt-0.5">{val}</span>
                </div>
              ))}
            </div>

            <p className="text-[13px] text-dim mt-3">{selected.desc}</p>
            {selected.association && (
              <div className="mt-3 border-l-2 border-mint/70 pl-3">
                <span className="block font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Associated character / content</span>
                <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{selected.association}</span>
              </div>
            )}

            <Link href={`/database/weapons/${selected.slug}`} className="mt-4 w-full inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[15px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
              OPEN PROFILE
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
            </Link>

            <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim mt-5">AMMO & ITEMS</h3>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="panel2 rounded-sm h-[88px] flex flex-col items-center justify-center gap-1.5">
                <Pill size={24} className="text-danger" aria-hidden="true" />
                <span className="flex items-center gap-1.5 font-mono text-[13px] text-paper tabular-nums">2 <Heart size={11} className="text-pink" fill="#F1A3C3" aria-hidden="true" /></span>
              </div>
              <div className="panel2 rounded-sm h-[88px] flex flex-col items-center justify-center gap-1.5">
                <BatteryFull size={24} className="text-warn" aria-hidden="true" />
                <span className="flex items-center gap-1.5 font-mono text-[13px] text-paper tabular-nums">2 <Zap size={11} className="text-warn" fill="#E6D658" aria-hidden="true" /></span>
              </div>
            </div>

            {/* Sai o «APPEARS IN» pela mesma razão que sai na página de cada
                arma: os bairros eram invenção, e o default repetia-os por
                todo o arsenal. */}
          </aside>
        )}
      </div>
    </div>
  )
}

export default App;
