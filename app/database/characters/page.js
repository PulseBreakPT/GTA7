'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Heart, Zap, Eye, ChevronRight, Triangle, Repeat2, HeartHandshake, Glasses, Backpack, ArrowLeft, ArrowRight } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, GlyphHint, cx } from '@/components/site/ui'
import { characters, characterFilters, relationships, mechanics, characterBySlug, extendedLookBrief, IMG } from '@/lib/content'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack }
const REL_BARS = [
  { key: 'trust', label: 'TRUST', icon: Heart, color: '#F1A3C3' },
  { key: 'tension', label: 'TENSION', icon: Zap, color: '#65DCCB' },
  { key: 'risk', label: 'RISK', icon: Eye, color: '#9B83F4' },
]

export function Portrait({ c, className, sizes = '120px', priority = false }) {
  const pos = className && className.includes('absolute') ? '' : 'relative'
  if (c.image) {
    return (
      <span className={cx(pos, 'block overflow-hidden bg-surface2', className)}>
        <Image src={c.image} alt={`Portrait of ${c.name}`} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </span>
    )
  }
  const initials = c.name.split(' ').map((p) => p[0]).join('').slice(0, 2)
  return (
    <span className={cx('flex items-center justify-center bg-surface2 text-dim font-cond font-bold', className)} role="img" aria-label={`${c.name}: portrait pending`}>
      {initials}
    </span>
  )
}

function App() {
  const router = useRouter()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState('lucia-caminos')
  const [mechSlug, setMechSlug] = useState('character-switching')
  const [sortAZ, setSortAZ] = useState(false)
  const [gallerySlide, setGallerySlide] = useState(0)

  // Start each character on their primary image when switching profiles.
  const selectCharacter = (slug) => {
    setSelectedSlug(slug)
    setGallerySlide(0)
  }

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let arr = characters.filter((c) => (filter === 'all' || c.group === filter) && (!q || c.name.toLowerCase().includes(q)))
    if (sortAZ) arr = [...arr].sort((a, b) => a.name.localeCompare(b.name))
    return arr
  }, [filter, query, sortAZ])

  const selected = characterBySlug(selectedSlug) || list[0] || characters[0]
  const selectedGallery = ({
    'lucia-caminos': [selected.image, IMG.keyArtBeach, IMG.keyArtMotel], 'jason-duval': [selected.image, IMG.keyArt, IMG.keyArtPier],
    'cal-hampton': [selected.image, IMG.calHamptonPortrait, IMG.calHamptonPhone], 'boobie-ike': [selected.image, IMG.boobieIkePortrait, IMG.boobieIkePhone],
    'drequan-priest': [selected.image, IMG.drequanPriestPortrait, IMG.drequanPriestPhone], 'raul-bautista': [selected.image, IMG.raulBautistaPortrait, IMG.raulBautistaPhone],
    'brian-heder': [selected.image, IMG.brianHederPortrait, IMG.brianHederPhone], 'real-dimez': [selected.image, IMG.realDimezPortrait, IMG.realDimezPhone],
  }[selected.slug] || [selected.image]).filter(Boolean)
  const displaySelected = { ...selected, image: selectedGallery[gallerySlide] || selected.image }
  const rels = relationships.filter((r) => r.a === selected.slug || r.b === selected.slug)
  const primary = rels.find((r) => r.primary) || rels[0]
  const partner = primary ? characterBySlug(primary.a === selected.slug ? primary.b : primary.a) : null
  const others = rels.filter((r) => r !== primary)
  const mechList = mechanics.slice(0, 4)
  const selMech = mechanics.find((m) => m.slug === mechSlug) || mechList[0]

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="characters" />

      <section className="mx-4 sm:mx-6 lg:mx-8 mt-6 max-w-[1280px] border border-line bg-surface2/40 p-4 sm:p-5">
        <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-pink">Story context · community reference</p>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <p className="max-w-3xl text-[14px] leading-relaxed text-paper/85">{extendedLookBrief.synopsis}</p>
          <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-dim shrink-0">{extendedLookBrief.protagonists.join(' · ')}</span>
        </div>
      </section>

      <div className="px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_minmax(0,1.35fr)_minmax(300px,0.95fr)] gap-5 items-start">
        {/* LEFT: list */}
        <aside className="min-w-0 order-2 lg:order-none">
          <label className="flex items-center gap-2 h-11 px-3 bg-surface2/70 border border-line rounded-sm focus-within:border-white/40">
            <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search character…" aria-label="Search character" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Character filters">
            {characterFilters.map((f) => {
              const active = filter === f.id
              return (
                <button key={f.id} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f.id)}
                  className={cx('font-cond font-semibold uppercase tracking-[0.1em] text-[12px] px-3 h-9 border rounded-sm transition-colors duration-150',
                    active ? 'bg-pink text-ink border-pink' : 'border-line text-dim hover:text-paper hover:border-white/30')}>
                  {f.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex flex-col gap-2" role="listbox" aria-label="Characters">
            {list.map((c) => {
              const active = c.slug === selected.slug
              return (
                <button key={c.slug} type="button" role="option" aria-selected={active} onClick={() => selectCharacter(c.slug)}
                  className={cx('panel rounded-sm p-2.5 flex items-center gap-3 text-left transition-all duration-200', active ? 'card-active' : 'hover:border-white/30')}>
                  <Portrait c={c} className="w-[62px] h-[62px] rounded-sm border border-line shrink-0 text-[18px]" sizes="62px" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-cond font-bold uppercase tracking-[0.06em] text-[19px] text-paper leading-none truncate">{c.name}</span>
                    <span className={cx('block font-cond font-semibold uppercase tracking-[0.16em] text-[10px] mt-1.5', c.role === 'PROTAGONIST' ? 'text-pink' : 'text-dim')}>{c.role}</span>
                  </span>
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-dim shrink-0" aria-hidden="true"><ChevronRight size={14} /></span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-6 text-center">
                <p className="font-cond uppercase tracking-[0.14em] text-paper text-sm">No characters found</p>
                <p className="text-dim text-xs mt-1">Adjust the filter or clear the search.</p>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER: profile */}
        <section className="panel rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-[44%_56%] min-h-[440px] xl:min-h-[560px] relative scanlines order-1 lg:order-none" aria-label="Selected character">
          <span className="relative block min-h-[300px] sm:min-h-full">
            <Portrait c={displaySelected} className="absolute inset-0" sizes="(max-width:1024px) 100vw, 30vw" priority />
            {selectedGallery.length > 1 && <><button type="button" onClick={() => setGallerySlide((gallerySlide - 1 + selectedGallery.length) % selectedGallery.length)} aria-label="Previous character image" className="absolute left-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-10 h-10 flex items-center justify-center text-paper"><ArrowLeft size={15} /></button><button type="button" onClick={() => setGallerySlide((gallerySlide + 1) % selectedGallery.length)} aria-label="Next character image" className="absolute right-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-10 h-10 flex items-center justify-center text-paper"><ArrowRight size={15} /></button></>}
            {selectedGallery.length > 1 && <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5" aria-label="Character image thumbnails">{selectedGallery.map((src, i) => <button key={src} type="button" onClick={() => setGallerySlide(i)} aria-label={`Show character image ${i + 1}`} className={cx('w-2 h-2 rounded-full border border-white/70', i === gallerySlide ? 'bg-pink' : 'bg-ink/60')} />)}</div>}
            <span className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
            <span className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-raised to-transparent pointer-events-none" aria-hidden="true" />
          </span>
          <div className="p-5 sm:p-7 flex flex-col relative">
            <span className="absolute inset-0 bg-gradient-to-br from-transparent to-pink/[0.03] pointer-events-none" aria-hidden="true" />
            <h1 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[46px] sm:text-[58px]">
              {selected.name.split(' ').map((w, i) => <span key={i} className="block">{w}</span>)}
            </h1>
            <div className="flex items-center gap-2 mt-4">
              <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{selected.role}</span>
              <StatusBadge status={selected.status} />
            </div>
            <p className="text-dim text-[15px] leading-relaxed mt-4 max-w-[300px]">{selected.bio}</p>
            <div className="mt-auto pt-6">
              <Link href={`/database/characters/${selected.slug}`} className="inline-flex items-center gap-3 border border-paper/90 h-12 px-6 font-cond font-semibold uppercase tracking-[0.16em] text-[15px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
                OPEN PROFILE
                <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
              </Link>
            </div>
          </div>
        </section>

        {/* RIGHT: relationships */}
        <aside className="min-w-0">
          <div className="panel rounded-sm p-4">
            <h2 className="font-cond font-semibold uppercase tracking-[0.18em] text-[12px] text-pink">PRIMARY RELATIONSHIP</h2>
            {primary && partner ? (
              <>
                <div className="mt-3 flex items-center gap-4">
                  <span className="relative flex items-center" aria-hidden="true">
                    <Portrait c={selected} className="w-[76px] h-[76px] rounded-sm border border-white/70 text-[20px]" sizes="76px" />
                    <span className="relative z-10 -mx-2 w-7 h-7 rounded-full bg-ink border border-pink flex items-center justify-center">
                      <Heart size={12} className="text-pink" fill="#F1A3C3" />
                    </span>
                    <Portrait c={partner} className="w-[76px] h-[76px] rounded-sm border border-line text-[20px]" sizes="76px" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-cond font-bold uppercase tracking-[0.04em] text-[21px] text-paper leading-none truncate">{partner.name}</span>
                    <span className={cx('block font-cond font-semibold uppercase tracking-[0.16em] text-[10px] mt-1.5', partner.role === 'PROTAGONIST' ? 'text-pink' : 'text-dim')}>{partner.role}</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  {REL_BARS.map((b) => (
                    <div key={b.key} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: b.color }} aria-hidden="true"><b.icon size={12} /></span>
                      <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[11px] text-paper w-16 shrink-0">{b.label}</span>
                      <span className="relative flex-1 h-[6px] bg-white/10" role="img" aria-label={`${b.label}: ${primary[b.key]} of 100`}>
                        <span className="absolute inset-y-0 left-0 transition-all duration-300" style={{ width: `${primary[b.key]}%`, backgroundColor: b.color }} />
                        <span className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${primary[b.key] - 3}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-dim text-[13px] mt-3">No documented relationships yet.</p>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {others.map((r) => {
              const other = characterBySlug(r.a === selected.slug ? r.b : r.a)
              if (!other) return null
              return (
                <button key={other.slug} type="button" onClick={() => setSelectedSlug(other.slug)}
                  className="panel rounded-sm p-3 flex items-center gap-3 text-left hover:border-white/30 transition-colors"
                  aria-label={`Select ${other.name}`}>
                  <Portrait c={other} className="w-[46px] h-[46px] rounded-sm border border-line shrink-0 text-[14px]" sizes="46px" />
                  <span className="min-w-0 w-[88px] shrink-0">
                    <span className="block font-cond font-bold uppercase text-[14px] text-paper leading-tight truncate">{other.name}</span>
                    <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{other.role}</span>
                  </span>
                  <span className="flex-1 flex flex-col gap-1">
                    {REL_BARS.map((b) => (
                      <span key={b.key} className="flex items-center gap-1.5">
                        <span className="font-cond uppercase text-[7px] tracking-[0.14em] text-dim w-10">{b.label}</span>
                        <span className="relative flex-1 h-[4px] bg-white/10">
                          <span className="absolute inset-y-0 left-0" style={{ width: `${r[b.key]}%`, backgroundColor: b.color }} />
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="w-7 h-7 rounded-full border border-line flex items-center justify-center text-dim shrink-0" aria-hidden="true"><ChevronRight size={13} /></span>
                </button>
              )
            })}
          </div>
        </aside>
      </div>

      {/* ASSOCIATED MECHANICS */}
      <section className="px-4 sm:px-6 lg:px-8 pb-6" aria-label="Associated mechanics">
        <h2 className="font-cond font-semibold uppercase tracking-[0.22em] text-[13px] text-pink">ASSOCIATED MECHANICS</h2>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {mechList.map((m) => {
            const Icon = MECH_ICONS[m.icon] || Repeat2
            const active = m.slug === selMech.slug
            return (
              <button key={m.slug} type="button" onClick={() => setMechSlug(m.slug)} aria-pressed={active}
                className={cx('panel rounded-sm p-4 text-left flex flex-col transition-all duration-200 min-h-[132px]', active ? 'card-active' : 'hover:border-white/30')}>
                <span className="flex items-start justify-between gap-3">
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon size={26} className={active ? 'text-pink' : 'text-dim'} strokeWidth={1.8} aria-hidden="true" />
                    <span className="font-cond font-bold uppercase tracking-[0.04em] text-[18px] text-paper leading-[1.02]">{m.name}</span>
                  </span>
                  <span className="shrink-0 min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[11px] text-dim" aria-hidden="true">{m.glyph}</span>
                </span>
                <span className="block text-[12px] text-dim leading-relaxed mt-3">{m.desc}</span>
                <span className="relative block h-[3px] bg-white/10 mt-auto">{active && <span className="absolute inset-y-0 left-0 w-2/3 bg-pink" />}</span>
              </button>
            )
          })}
        </div>
        <div className="mt-4 flex justify-center">
          <Link href="/database/mechanics" className="inline-flex items-center gap-3 border border-line h-11 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-paper hover:border-white/50 transition-colors">
            VIEW ALL MECHANICS
            <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center" aria-hidden="true"><ChevronRight size={12} /></span>
          </Link>
        </div>
      </section>

      {/* BOTTOM HINTS */}
      <div className="px-4 sm:px-6 lg:px-8 py-3 border-t hairline flex flex-wrap items-center gap-x-6 gap-y-2">
        <GlyphHint shape="cross" label="SELECT" onClick={() => { const i = list.findIndex((c) => c.slug === selected.slug); if (list.length) setSelectedSlug(list[(i + 1) % list.length].slug) }} />
        <GlyphHint shape="circle" label="BACK" onClick={() => router.back()} />
        <GlyphHint shape="triangle" label="FILTERS" onClick={() => setFilter(characterFilters[(characterFilters.findIndex((f) => f.id === filter) + 1) % characterFilters.length].id)} />
        <GlyphHint shape="square" label={sortAZ ? 'SORT: A–Z' : 'SORT: DEFAULT'} onClick={() => setSortAZ((v) => !v)} />
      </div>
    </div>
  )
}

export default App;
