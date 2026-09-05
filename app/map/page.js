'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle2, Image as ImageIcon, Search, X } from 'lucide-react'
import { confirmedLocationImage, locations, regions } from '@/lib/content'
import { STATUS_META, StatusBadge, cx } from '@/components/site/ui'

const STATUS_ORDER = ['confirmed', 'verified', 'analysis', 'category', 'rumour']
const LOCATION_STATUSES = STATUS_ORDER
  .map((id) => ({ id, label: (STATUS_META[id] || {}).label || id.toUpperCase(), count: locations.filter((item) => item.status === id).length }))
  .filter((item) => item.count > 0)

function PublishedVisual({ location, region, className, priority = false }) {
  const exactImage = confirmedLocationImage(location)
  const src = exactImage || region?.image
  if (!src) return null

  return (
    <span className={cx('relative block overflow-hidden bg-surface2', className)}>
      <Image
        src={src}
        alt={exactImage
          ? `${location.name} in published GTA VI media`
          : `${region?.label || 'Leonida'} official artwork — regional context for ${location.name}, not the exact place`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 360px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
      />
      <span className="absolute inset-x-0 bottom-0 px-2.5 pb-2 pt-8 bg-gradient-to-t from-black/90 via-black/45 to-transparent font-mono text-[8px] uppercase tracking-[0.12em] text-white">
        {exactImage ? 'EXACT PLACE · PUBLISHED GTA VI MEDIA' : 'OFFICIAL REGION CONTEXT · NOT THIS EXACT PLACE'}
      </span>
    </span>
  )
}

function RegionCard({ region, active, onSelect }) {
  const count = locations.filter((item) => item.region === region.id).length
  return (
    <button
      type="button"
      onClick={() => onSelect(active ? 'all' : region.id)}
      aria-pressed={active}
      className={cx(
        'group relative min-h-[210px] overflow-hidden rounded-[18px] border text-left transition-all',
        active ? 'border-pink shadow-[0_18px_45px_-30px_rgba(194,24,91,.7)]' : 'border-line hover:border-violet/50'
      )}
    >
      <Image src={region.image} alt={`${region.label} official Rockstar postcard`} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
      <span className="absolute inset-0 bg-gradient-to-t from-[#080c1d]/95 via-[#080c1d]/20 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 p-4 text-white">
        <span className="block font-cond font-bold uppercase tracking-[0.06em] text-[20px]">{region.label}</span>
        <span className="mt-1 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
          <span>Official Rockstar artwork</span><span>{count} places</span>
        </span>
      </span>
    </button>
  )
}

function PlacesDirectory({ requested = null }) {
  const [query, setQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const selected = locations.find((item) => item.slug === requested)
  const selectedRegion = selected ? regions.find((item) => item.id === selected.region) : null

  useEffect(() => {
    if (selected) setRegionFilter(selected.region)
  }, [selected])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return locations.filter((item) => {
      const region = regions.find((candidate) => candidate.id === item.region)
      return (regionFilter === 'all' || item.region === regionFilter)
        && (statusFilter === 'all' || item.status === statusFilter)
        && (!needle || `${item.name} ${item.desc} ${region?.label || ''}`.toLowerCase().includes(needle))
    })
  }, [query, regionFilter, statusFilter])

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-[1440px] w-full mx-auto">
      {selected && selectedRegion && (
        <section className="wiki-article-header mt-5 grid grid-cols-1 md:grid-cols-[minmax(260px,.85fr)_1.15fr] gap-5" aria-labelledby="selected-place">
          <PublishedVisual location={selected} region={selectedRegion} className="min-h-[220px] rounded-[14px]" priority />
          <div className="self-center py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mint">Requested place</p>
            <h2 id="selected-place" className="mt-2 font-cond font-bold uppercase leading-none text-[34px] sm:text-[42px] text-paper">{selected.name}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge status={selected.status} /><span className="font-cond uppercase tracking-[0.1em] text-[11px] text-dim">{selectedRegion.label}</span></div>
            <p className="mt-4 max-w-[58ch] text-[14px] leading-[1.7] text-dim">{selected.desc}</p>
            <Link href={`/map/location/${selected.slug}`} className="mt-5 inline-flex items-center gap-2 font-cond font-bold uppercase tracking-[0.12em] text-[12px] text-pink hover:text-paper">Open complete record <ArrowRight size={14} /></Link>
          </div>
        </section>
      )}

      <section className="mt-8" aria-labelledby="regions-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mint">Official Rockstar postcards</p>
            <h2 id="regions-heading" className="mt-1 font-cond font-bold uppercase tracking-tight text-[28px] sm:text-[34px] text-paper">Six confirmed regions</h2>
          </div>
          {regionFilter !== 'all' && <button type="button" onClick={() => setRegionFilter('all')} className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-pink"><X size={13} /> Clear region</button>}
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {regions.map((region) => <RegionCard key={region.id} region={region} active={regionFilter === region.id} onSelect={setRegionFilter} />)}
        </div>
      </section>

      <section id="places-index" className="mt-10 scroll-mt-24" aria-labelledby="places-heading">
        <div className="wiki-category-header">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet">Coordinate-free visual index</p>
              <h2 id="places-heading" className="mt-2 font-cond font-bold uppercase tracking-tight text-[31px] sm:text-[40px] text-paper">Named places</h2>
              <p className="mt-2 max-w-[68ch] text-[13px] leading-relaxed text-dim">Only published GTA VI imagery is displayed. When no exact frame is verified, the card uses official regional artwork and says so directly.</p>
            </div>
            <span className="font-mono text-[11px] text-dim tabular-nums">{results.length} / {locations.length}</span>
          </div>

          <label className="mt-5 flex items-center gap-2 h-11 px-3 bg-white/80 border border-line rounded-[10px] focus-within:border-violet/50">
            <Search size={15} className="text-violet shrink-0" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search place or region…" aria-label="Search places" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-dim hover:text-paper"><X size={14} /></button>}
          </label>

          <div className="mt-3 flex flex-wrap gap-2" aria-label="Source status filters">
            <button type="button" onClick={() => setStatusFilter('all')} aria-pressed={statusFilter === 'all'} className={cx('h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', statusFilter === 'all' ? 'border-violet text-violet bg-violet/5' : 'border-line text-dim')}>All</button>
            {LOCATION_STATUSES.map((status) => (
              <button key={status.id} type="button" onClick={() => setStatusFilter(status.id)} aria-pressed={statusFilter === status.id} className={cx('h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', statusFilter === status.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim')}>
                {status.label} · {status.count}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((location) => {
            const region = regions.find((item) => item.id === location.region)
            const exact = Boolean(confirmedLocationImage(location))
            return (
              <Link key={location.slug} href={`/map/location/${location.slug}`} className="group panel overflow-hidden rounded-[16px] hover:border-violet/45">
                <PublishedVisual location={location} region={region} className="aspect-[16/9]" />
                <span className="block p-4">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-cond font-bold uppercase leading-tight tracking-[0.04em] text-[17px] text-paper">{location.name}</span>
                    <ArrowRight size={14} className="mt-1 shrink-0 text-dim transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-2"><StatusBadge status={location.status} /><span className="font-mono text-[8px] uppercase tracking-[0.12em] text-dim">{region?.label}</span></span>
                  <span className="mt-3 flex items-center gap-1.5 font-cond uppercase tracking-[0.1em] text-[9px] text-dim">
                    {exact ? <CheckCircle2 size={11} className="text-mint" /> : <ImageIcon size={11} className="text-violet" />}
                    {exact ? 'Exact visual verified' : 'Regional visual context'}
                  </span>
                </span>
              </Link>
            )
          })}
        </div>

        {results.length === 0 && <div className="mt-5 panel rounded-[16px] p-8 text-center"><p className="font-cond font-bold uppercase text-[18px] text-paper">No matching place</p><button type="button" onClick={() => { setQuery(''); setRegionFilter('all'); setStatusFilter('all') }} className="mt-3 font-cond uppercase tracking-[0.12em] text-[11px] text-pink">Reset filters</button></div>}
      </section>
    </div>
  )
}

function QueryAwarePlacesDirectory() {
  const params = useSearchParams()
  return <PlacesDirectory requested={params.get('loc')} />
}

function MapHeader() {
  const exactVisuals = locations.filter((item) => confirmedLocationImage(item)).length
  return (
    <header className="px-4 sm:px-6 lg:px-8 pt-6 max-w-[1440px] w-full mx-auto">
      <div className="data-rail">VISUAL ATLAS · {locations.length} NAMED PLACES · {regions.length} OFFICIAL REGIONS</div>
      <div className="ghost-type mt-3" data-ghost="LEONIDA">
        <h1 className="chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.85] text-[44px] sm:text-[60px]">LEONIDA PLACES DIRECTORY</h1>
      </div>
      <p className="mt-3 max-w-[72ch] text-[14px] leading-[1.7] text-dim">A coordinate-free atlas built from official Rockstar artwork and identifiable frames from published GTA VI media. No drawn coastline, reconstructed geography or community map is displayed.</p>
      <div className="mt-4 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-dim">
        <span className="rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5">{exactVisuals} exact visuals verified</span>
        <span className="rounded-full border border-violet/30 bg-violet/5 px-3 py-1.5">Fallbacks use labelled official region art</span>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="flex-1 flex flex-col">
      <MapHeader />
      <Suspense fallback={<PlacesDirectory />}>
        <QueryAwarePlacesDirectory />
      </Suspense>
    </div>
  )
}
