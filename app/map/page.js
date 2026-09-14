'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, CheckCircle2, Layers3, Search, ShieldCheck, X } from 'lucide-react'
import { confirmedLocationImage, locationFrameOrigin, locations, regions } from '@/lib/content'
import { STATUS_META, StatusBadge, cx } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader, ReportedNotes } from '@/components/site/wiki'
import { reportedFor, REPORTED_SOURCE } from '@/lib/reported'
import CollapsibleFilters from '@/components/site/collapsible-filters'
import { LEONIDA_COUNTIES, MAP_LAYERS, mapBibleForLocation, mapLayerForEvidence, matchesMapLayer } from '@/lib/map-bible'
import { useUrlState } from '@/components/site/use-url-state'

// Região, estado de evidência, camada e pesquisa vivem na URL: escolher uma
// região e uma camada passa a ser um endereço que se manda a alguém, e que
// sobrevive a abrir um lugar e voltar atrás.
const VISTA_OMISSA = { region: 'all', status: 'all', layer: 'all', q: '' }

const STATUS_ORDER = ['confirmed', 'verified', 'analysis', 'category', 'rumour']
const LOCATION_STATUSES = STATUS_ORDER
  .map((id) => ({ id, label: (STATUS_META[id] || {}).label || id.toUpperCase(), count: locations.filter((item) => item.status === id).length }))
  .filter((item) => item.count > 0)

// Only a frame of this exact place is shown. A regional postcard used to stand
// in for missing frames and ended up repeated across dozens of cards; places
// without a verified frame are now listed, not illustrated.
function PublishedVisual({ location, className, priority = false }) {
  const src = confirmedLocationImage(location)
  if (!src) return null
  const origin = locationFrameOrigin(location)

  return (
    <span className={cx('relative block overflow-hidden bg-surface2', className)}>
      <Image
        src={src}
        alt={`${location.name} in published GTA VI media`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 360px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
      />
      <span className="absolute inset-x-0 bottom-0 px-2.5 pb-2 pt-8 bg-gradient-to-t from-black/90 via-black/45 to-transparent font-mono text-[8px] uppercase tracking-[0.12em] text-white">
        {origin ? `${origin} · place identified by GTA Wiki` : 'Exact place · published GTA VI media'}
      </span>
    </span>
  )
}

function RegionCard({ region, active }) {
  const count = locations.filter((item) => item.region === region.id).length
  return (
    <article
      className={cx(
        'places-region-card group relative min-h-[210px] overflow-hidden rounded-sm border text-left transition-colors',
        active ? 'border-pink' : 'border-line hover:border-violet/50'
      )}
    >
      <Link href={`/map/${region.id}`} className="absolute inset-0" aria-label={`Open ${region.label} region article`}>
        <Image src={region.image} alt={`${region.label} official Rockstar postcard`} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.045]" />
        <span className="absolute inset-0 bg-gradient-to-t from-[#080c1d]/95 via-[#080c1d]/20 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-4 text-white">
          <span className="block font-cond font-bold uppercase tracking-[0.06em] text-[20px]">{region.label}</span>
          <span className="mt-1 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">
            <span><ShieldCheck size={10} className="inline mr-1 text-mint" />Official region</span><span>{count} places</span>
          </span>
        </span>
      </Link>
    </article>
  )
}

function PlacesDirectory({ requested = null }) {
  const [vista, definirVista] = useUrlState(VISTA_OMISSA)
  const { region: regionFilter, status: statusFilter, layer: layerFilter } = vista
  const setRegionFilter = (valor) => definirVista({ region: valor })
  const setStatusFilter = (valor) => definirVista({ status: valor })
  const setLayerFilter = (valor) => definirVista({ layer: valor })

  // Filtra a cada tecla, escreve na URL só quando o leitor pára de escrever.
  const [query, setQuery] = useState('')
  useEffect(() => { setQuery(vista.q) }, [vista.q])
  useEffect(() => {
    if (query === vista.q) return undefined
    const id = setTimeout(() => definirVista({ q: query }), 250)
    return () => clearTimeout(id)
  }, [query, vista.q, definirVista])

  const selected = locations.find((item) => item.slug === requested)
  const selectedRegion = selected ? regions.find((item) => item.id === selected.region) : null

  // Um lugar pedido por `?loc=` traz a sua região — mas só na primeira vez que
  // esse lugar aparece, e só se o endereço não trouxer já uma região escolhida.
  // Antes reaplicava-se sempre: quem limpasse a região via-a voltar sozinha, e
  // uma região partilhada na URL era substituída pela do lugar.
  const regiaoAplicadaPara = useRef(null)
  useEffect(() => {
    if (!selected || regiaoAplicadaPara.current === selected.slug) return
    regiaoAplicadaPara.current = selected.slug
    // Lido do endereço e não do estado: o estado só recebe a URL depois de
    // montar, e confiar na ordem dos efeitos apagaria a região partilhada.
    if (new URLSearchParams(window.location.search).has('region')) return
    definirVista({ region: selected.region })
  }, [selected, definirVista])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return locations.filter((item) => {
      const region = regions.find((candidate) => candidate.id === item.region)
      return (regionFilter === 'all' || item.region === regionFilter)
        && (statusFilter === 'all' || item.status === statusFilter)
        && matchesMapLayer(item, layerFilter)
        && (!needle || `${item.name} ${item.desc} ${region?.label || ''}`.toLowerCase().includes(needle))
    })
  }, [query, regionFilter, statusFilter, layerFilter])
  const framed = results.filter((item) => confirmedLocationImage(item))
  const unframed = results.filter((item) => !confirmedLocationImage(item))
  const activeFilterCount = Object.keys(VISTA_OMISSA)
    .filter((chave) => (chave === 'q' ? query.trim() !== '' : vista[chave] !== VISTA_OMISSA[chave]))
    .length

  return (
    <div className="places-directory px-4 sm:px-6 lg:px-8 pb-8 max-w-[1440px] w-full mx-auto">
      {selected && selectedRegion && (
        <section className="places-selected wiki-article-header mt-5 grid grid-cols-1 md:grid-cols-[minmax(260px,.85fr)_1.15fr] gap-5" aria-labelledby="selected-place">
          <PublishedVisual location={selected} region={selectedRegion} className="min-h-[220px] w-full self-stretch rounded-sm" priority />
          <div className="self-center py-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mint">Requested place</p>
            <h2 id="selected-place" className="mt-2 font-cond font-bold uppercase leading-none text-[34px] sm:text-[42px] text-paper">{selected.name}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge status={selected.status} /><span className="map-evidence-chip" data-layer={mapLayerForEvidence(mapBibleForLocation(selected).evidenceLevel)}>{mapBibleForLocation(selected).evidenceLevel}</span><span className="font-cond uppercase tracking-[0.1em] text-[11px] text-dim">{selectedRegion.label}</span></div>
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
        <div className="places-region-grid visual-card-grid mt-4">
          {regions.map((region) => <RegionCard key={region.id} region={region} active={regionFilter === region.id} />)}
        </div>
      </section>

      <section className="map-county-ledger mt-8" aria-labelledby="counties-heading">
        <div className="map-county-ledger-heading">
          <div><p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet">Administrative evidence</p><h2 id="counties-heading" className="mt-1 font-cond font-bold uppercase text-[26px] text-paper">Leonida county ledger</h2></div>
          <span>5 released names · 1 development name</span>
        </div>
        <div className="map-county-grid">
          {LEONIDA_COUNTIES.map((county) => <div key={county.name} data-layer={mapLayerForEvidence(county.evidence)}><strong>{county.name}</strong><span>{county.evidence}</span><small>{county.note}</small></div>)}
        </div>
      </section>

      <div className="mt-10"><ReportedNotes items={reportedFor('map', 'leonida')} source={REPORTED_SOURCE} /></div>

      <section id="places-index" className="mt-10 scroll-mt-24" aria-labelledby="places-heading">
        <div className="wiki-category-header">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet">Coordinate-free visual index</p>
              <h2 id="places-heading" className="mt-2 font-cond font-bold uppercase tracking-tight text-[31px] sm:text-[40px] text-paper">Named places</h2>
              <p className="mt-2 max-w-[68ch] text-[13px] leading-relaxed text-dim">Each picture is a published GTA VI frame of that exact place — from a trailer, the Extended Look or an official screenshot. Places without a verified frame are listed below instead of being illustrated with regional artwork.</p>
            </div>
            <span className="font-mono text-[11px] text-dim tabular-nums">{results.length} / {locations.length}</span>
          </div>

          <CollapsibleFilters title="Place filters" count={results.length} activeCount={activeFilterCount} summary={`${results.length} of ${locations.length} places${regionFilter !== 'all' ? ' · region filtered' : ''}`}>
            <label className="wiki-filter-search places-search">
              <Search size={15} className="text-violet shrink-0" aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search place or region…" aria-label="Search places" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="text-dim hover:text-paper"><X size={14} /></button>}
            </label>

            <div className="wiki-filter-group places-status-filters" aria-label="Source status filters">
              <button type="button" onClick={() => setStatusFilter('all')} aria-pressed={statusFilter === 'all'} className={cx('filter-chip h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', statusFilter === 'all' ? 'border-violet text-violet bg-violet/5' : 'border-line text-dim')}>All</button>
              {LOCATION_STATUSES.map((status) => (
                <button key={status.id} type="button" onClick={() => setStatusFilter(status.id)} aria-pressed={statusFilter === status.id} className={cx('filter-chip h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', statusFilter === status.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim')}>
                  {status.label} · {status.count}
                </button>
              ))}
            </div>

            <div className="map-layer-filter" aria-label="Evidence map layers">
              <div className="map-layer-filter-heading"><Layers3 size={14} /><span>World layers</span><small>Keep reconstructed geography visibly separate</small></div>
              <div className="wiki-filter-group">
                <button type="button" onClick={() => setLayerFilter('all')} aria-pressed={layerFilter === 'all'} className={cx('filter-chip h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', layerFilter === 'all' ? 'border-violet text-violet bg-violet/5' : 'border-line text-dim')}>All layers</button>
                {MAP_LAYERS.map((layer) => <button key={layer.id} type="button" onClick={() => setLayerFilter(layer.id)} aria-pressed={layerFilter === layer.id} title={layer.description} className={cx('filter-chip h-8 px-3 rounded-full border font-cond uppercase tracking-[0.1em] text-[10px]', layerFilter === layer.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim')}>{layer.label}</button>)}
              </div>
            </div>
          </CollapsibleFilters>
        </div>

        <div className="places-card-grid visual-card-grid mt-5" aria-live="polite">
          {framed.map((location) => {
            const region = regions.find((item) => item.id === location.region)
            const evidence = mapBibleForLocation(location)
            return (
              <Link key={location.slug} href={`/map/location/${location.slug}`} className="places-card group panel overflow-hidden rounded-sm hover:border-violet/45">
                <PublishedVisual location={location} className="aspect-[16/9]" />
                <span className="block p-4">
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-cond font-bold uppercase leading-tight tracking-[0.04em] text-[17px] text-paper">{location.name}</span>
                    <ArrowRight size={14} className="mt-1 shrink-0 text-dim transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-2"><StatusBadge status={location.status} /><span className="map-evidence-chip" data-layer={mapLayerForEvidence(evidence.evidenceLevel)}>{evidence.evidenceLevel}</span><span className="font-mono text-[8px] uppercase tracking-[0.12em] text-dim">{region?.label || location.region}</span></span>
                  <span className="mt-3 flex items-center gap-1.5 font-cond uppercase tracking-[0.1em] text-[9px] text-dim">
                    <CheckCircle2 size={11} className="text-mint" /> Exact visual verified
                  </span>
                </span>
              </Link>
            )
          })}
        </div>

        {unframed.length > 0 && (
          <div className="places-unframed">
            <h3>Not yet shown in published media</h3>
            <p>No trailer, Extended Look frame or official screenshot of these places has been verified. They are listed rather than illustrated with regional artwork.</p>
            <ul className="world-list">
              {unframed.map((location) => {
                const region = regions.find((item) => item.id === location.region)
                return (
                  <li key={location.slug}>
                    <Link href={`/map/location/${location.slug}`} className="world-row world-row-record">
                      {/* O nome mostra-se como está escrito no arquivo, e nunca
                        o slug. Isto era `location.name.toLowerCase()`, que
                        servia «little cuba» e «vercetti estate» ao leitor, e
                        caía em `location.region` — o slug cru — sempre que a
                        região não fosse encontrada, imprimindo coisas como
                        «leonard-county» como se fossem texto. */}
                    <span className="world-row-main"><strong>{location.name}</strong><small>{String(region?.label || location.region).replace(/-/g, ' ').toLowerCase().replace(/\b\p{L}/gu, (c) => c.toUpperCase())}</small></span>
                      <StatusBadge status={location.status} />
                      <ArrowRight className="world-row-arrow" aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {results.length === 0 && <div className="mt-5 panel rounded-sm p-8 text-center"><p className="font-cond font-bold uppercase text-[18px] text-paper">No matching place</p><button type="button" onClick={() => { setQuery(''); definirVista({ region: 'all', status: 'all', layer: 'all', q: '' }) }} className="mt-3 font-cond uppercase tracking-[0.12em] text-[11px] text-pink">Reset filters</button></div>}
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
  const officialLocations = locations.filter((item) => mapLayerForEvidence(mapBibleForLocation(item).evidenceLevel) === 'official').length
  return (
    <header className="px-4 sm:px-6 lg:px-8 pt-6 max-w-[1440px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Places' }]} />
      <div className="mt-4"><CategoryHeader kind="locations" title="Leonida Places Directory" image="/media/places/leonida-keys.webp" imageAlt="Official Rockstar Visit Leonida artwork of the Leonida Keys" description="An evidence-driven directory of Leonida. Rockstar has profiled six regions, but has not published a complete standalone map, official boundaries or square-mile figure. Exact coordinates remain separate from existence." count={locations.length} countLabel="places"><div className="mt-4 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-dim"><span className="rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5">6 official regions</span><span className="rounded-full border border-mint/30 bg-mint/5 px-3 py-1.5">{officialLocations} official place records</span><span className="rounded-full border border-violet/30 bg-violet/5 px-3 py-1.5">{exactVisuals} exact visuals verified</span><span className="rounded-full border border-violet/30 bg-violet/5 px-3 py-1.5">Official map size: not disclosed</span></div></CategoryHeader></div>
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
