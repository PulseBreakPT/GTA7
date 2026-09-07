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

const REGION_BY_ID = new Map(regions.map((region) => [region.id, region]))
const regionLabel = (id) => (REGION_BY_ID.get(id) || {}).label || id
const statusLabel = (id) => (STATUS_META[id] || {}).label || id.toUpperCase()
const exactCount = (items) => items.filter((item) => confirmedLocationImage(item)).length

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
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 320px"
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
        'group relative min-h-[190px] overflow-hidden rounded-sm border text-left transition-colors',
        active ? 'border-pink' : 'border-line hover:border-violet/50'
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

// O cartão do lugar: a imagem publicada em cima, a identificação por baixo e
// a linha de evidência encostada ao fundo, para que numa grelha os cartões
// acabem todos na mesma linha, tenham a descrição que tiverem.
function PlaceCard({ location, region }) {
  const exact = Boolean(confirmedLocationImage(location))
  return (
    <Link href={`/map/location/${location.slug}`} className="group panel flex h-full flex-col overflow-hidden rounded-sm hover:border-violet/45">
      <PublishedVisual location={location} region={region} className="aspect-[16/9]" />
      <span className="flex flex-1 flex-col p-4">
        <span className="flex items-start justify-between gap-3">
          <span className="font-cond font-bold uppercase leading-tight tracking-[0.04em] text-[17px] text-paper">{location.name}</span>
          <ArrowRight size={14} className="mt-1 shrink-0 text-dim transition-transform group-hover:translate-x-1" />
        </span>
        <span className="clamp-2 mt-2 text-[12px] leading-relaxed text-dim">{location.desc}</span>
        <span className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge status={location.status} /><span className="font-mono text-[8px] uppercase tracking-[0.12em] text-dim">{region?.label}</span></span>
        <span className="mt-auto pt-3 flex items-center gap-1.5 font-cond uppercase tracking-[0.1em] text-[9px] text-dim">
          {exact ? <CheckCircle2 size={11} className="text-mint" /> : <ImageIcon size={11} className="text-violet" />}
          {exact ? 'Exact visual verified' : 'Regional visual context'}
        </span>
      </span>
    </Link>
  )
}

// Cada faceta do índice traz a sua contagem e, atrás dela, a proporção que
// representa no total — a distribuição lê-se de relance sem gráfico nenhum.
function FacetButton({ label, count, total, active, onSelect, tone = 'violet' }) {
  const share = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cx(
        'relative w-full overflow-hidden rounded-sm border px-3 py-2 text-left transition-colors',
        active ? (tone === 'pink' ? 'border-pink bg-pink/5' : 'border-violet bg-violet/5') : 'border-line hover:border-black/30'
      )}
    >
      <span aria-hidden="true" className={cx('absolute inset-y-0 left-0', tone === 'pink' ? 'bg-pink/[0.07]' : 'bg-violet/[0.07]')} style={{ width: `${share}%` }} />
      <span className="relative flex items-center justify-between gap-3">
        <span className={cx('font-cond uppercase tracking-[0.08em] text-[11px]', active ? (tone === 'pink' ? 'text-pink' : 'text-violet') : 'text-paper')}>{label}</span>
        <span className="font-mono text-[10px] tabular-nums text-dim">{count}</span>
      </span>
    </button>
  )
}

function PlacesDirectory({ requested = null }) {
  const [query, setQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [grouping, setGrouping] = useState('region')
  const [sort, setSort] = useState('evidence')

  const selected = locations.find((item) => item.slug === requested)
  const selectedRegion = selected ? REGION_BY_ID.get(selected.region) : null

  useEffect(() => {
    if (selected) setRegionFilter(selected.region)
  }, [selected])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = locations.filter((item) => {
      const region = REGION_BY_ID.get(item.region)
      return (regionFilter === 'all' || item.region === regionFilter)
        && (statusFilter === 'all' || item.status === statusFilter)
        && (!needle || `${item.name} ${item.desc} ${region?.label || ''}`.toLowerCase().includes(needle))
    })

    // Ordenar por evidência põe à frente os lugares que o arquivo consegue
    // ilustrar com uma imagem do próprio sítio; A–Z ignora isso e trata a
    // lista como uma lista.
    return filtered.sort((a, b) => {
      if (sort === 'evidence') {
        const byExact = Number(Boolean(confirmedLocationImage(b))) - Number(Boolean(confirmedLocationImage(a)))
        if (byExact) return byExact
        const byStatus = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
        if (byStatus) return byStatus
      }
      return a.name.localeCompare(b.name, 'en')
    })
  }, [query, regionFilter, statusFilter, sort])

  // Sessenta e um lugares numa grelha só são uma parede. Agrupados pela
  // região — ou pelo estado da fonte — cada bloco tem o tamanho de uma
  // leitura, e o cabeçalho diz de que se está a falar.
  const groups = useMemo(() => {
    if (grouping === 'none') return [{ id: 'all', label: 'All named places', items: results }]

    const order = grouping === 'region' ? regions.map((region) => region.id) : STATUS_ORDER
    const label = grouping === 'region' ? regionLabel : statusLabel
    const key = grouping === 'region' ? 'region' : 'status'

    return order
      .map((id) => ({ id, label: label(id), items: results.filter((item) => item[key] === id) }))
      .filter((group) => group.items.length > 0)
  }, [results, grouping])

  const filtersActive = query !== '' || regionFilter !== 'all' || statusFilter !== 'all'
  const resetFilters = () => { setQuery(''); setRegionFilter('all'); setStatusFilter('all') }
  const shownExact = exactCount(results)

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-[1440px] w-full mx-auto">
      {selected && selectedRegion && (
        <section className="wiki-article-header mt-5 grid grid-cols-1 md:grid-cols-[minmax(260px,.85fr)_1.15fr] gap-5" aria-labelledby="selected-place">
          <PublishedVisual location={selected} region={selectedRegion} className="min-h-[220px] rounded-sm" priority />
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
        </div>

        {/* Índice e controlos lado a lado: a coluna larga leva a grelha, a
            estreita fica agarrada ao ecrã com a pesquisa e as facetas. */}
        <div className="wiki-index-layout mt-5 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="min-w-0">
            {groups.map((group) => (
              <section key={group.id} className="mt-7 first:mt-0" aria-labelledby={`group-${group.id}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b hairline pb-2">
                  <h3 id={`group-${group.id}`} className="font-cond font-bold uppercase tracking-[0.06em] text-[19px] text-paper">{group.label}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim tabular-nums">
                    {group.items.length} {group.items.length === 1 ? 'place' : 'places'} · {exactCount(group.items)} exact
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.items.map((location) => <PlaceCard key={location.slug} location={location} region={REGION_BY_ID.get(location.region)} />)}
                </div>
              </section>
            ))}

            {results.length === 0 && (
              <div className="panel rounded-sm p-8 text-center">
                <p className="font-cond font-bold uppercase text-[18px] text-paper">No matching place</p>
                <button type="button" onClick={resetFilters} className="mt-3 font-cond uppercase tracking-[0.12em] text-[11px] text-pink">Reset filters</button>
              </div>
            )}
          </div>

          <aside className="tech-mask glass-panel p-5 self-start xl:sticky xl:top-24" aria-label="Index controls">
            <label className="flex items-center gap-2 h-11 px-3 bg-white/80 border border-line rounded-sm focus-within:border-violet/50">
              <Search size={15} className="text-violet shrink-0" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search place or region…" aria-label="Search places" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-dim hover:text-paper"><X size={14} /></button>}
            </label>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <label className="flex flex-col gap-1">
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Group by</span>
                <select value={grouping} onChange={(event) => setGrouping(event.target.value)} aria-label="Group places"
                  className="h-9 px-2 bg-surface2/70 border border-line rounded-sm font-cond uppercase tracking-[0.08em] text-[11px] text-paper outline-none focus:border-violet/50">
                  <option value="region">Region</option>
                  <option value="status">Source status</option>
                  <option value="none">Single list</option>
                </select>
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Sort</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort places"
                  className="h-9 px-2 bg-surface2/70 border border-line rounded-sm font-cond uppercase tracking-[0.08em] text-[11px] text-paper outline-none focus:border-violet/50">
                  <option value="evidence">Evidence first</option>
                  <option value="name">Name A–Z</option>
                </select>
              </label>
            </div>

            <div className="mt-5">
              <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Region</p>
              <div className="mt-2 flex flex-col gap-1.5">
                <FacetButton label="All regions" count={locations.length} total={locations.length} active={regionFilter === 'all'} onSelect={() => setRegionFilter('all')} />
                {regions.map((region) => {
                  const count = locations.filter((item) => item.region === region.id).length
                  return <FacetButton key={region.id} label={region.label} count={count} total={locations.length} active={regionFilter === region.id} onSelect={() => setRegionFilter(regionFilter === region.id ? 'all' : region.id)} />
                })}
              </div>
            </div>

            <div className="mt-5">
              <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Source status</p>
              <div className="mt-2 flex flex-col gap-1.5">
                <FacetButton label="All statuses" count={locations.length} total={locations.length} active={statusFilter === 'all'} onSelect={() => setStatusFilter('all')} tone="pink" />
                {LOCATION_STATUSES.map((status) => (
                  <FacetButton key={status.id} label={status.label} count={status.count} total={locations.length} active={statusFilter === status.id} onSelect={() => setStatusFilter(statusFilter === status.id ? 'all' : status.id)} tone="pink" />
                ))}
              </div>
            </div>

            <div className="mt-5 border-t hairline pt-4">
              <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Visual evidence in view</p>
              <dl className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-sm border border-mint/30 bg-mint/5 px-3 py-2">
                  <dt className="font-cond uppercase tracking-[0.1em] text-[9px] text-mint">Exact</dt>
                  <dd className="mt-0.5 font-mono text-[16px] tabular-nums text-paper">{shownExact}</dd>
                </div>
                <div className="rounded-sm border border-violet/30 bg-violet/5 px-3 py-2">
                  <dt className="font-cond uppercase tracking-[0.1em] text-[9px] text-violet">Region context</dt>
                  <dd className="mt-0.5 font-mono text-[16px] tabular-nums text-paper">{results.length - shownExact}</dd>
                </div>
              </dl>
            </div>

            {filtersActive && (
              <button type="button" onClick={resetFilters} className="mt-4 w-full inline-flex items-center justify-center gap-2 border border-line h-10 font-cond uppercase tracking-[0.14em] text-[11px] text-dim hover:text-paper hover:border-black/40 transition-colors">
                <X size={13} /> Reset filters
              </button>
            )}
          </aside>
        </div>
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
