'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Clapperboard,
  Grid2X2,
  Landmark,
  PawPrint,
  Search,
  Shield,
  Trophy,
  Tv,
  Waves,
  X,
} from 'lucide-react'
import CollapsibleFilters from '@/components/site/collapsible-filters'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge } from '@/components/site/ui'
import { worldBranches, worldEntries } from '@/lib/world-content'

const ICONS = {
  wildlife: PawPrint,
  organizations: Shield,
  establishments: Building2,
  safehouses: Landmark,
  geography: Waves,
  activities: Trophy,
  missions: Clapperboard,
  businesses: Building2,
  television: Tv,
}

const META = {
  wildlife: {
    image: '/media/scenes/swamp-gator.webp',
    description: 'Animals documented in trailers and official material, from the wetlands to the streets of Vice City.',
  },
  organizations: {
    image: '/media/vehicles/stanier-crew.webp',
    description: 'Police forces, gangs, teams and other organizations operating across Leonida.',
  },
  establishments: {
    image: '/media/scenes/keys-street.webp',
    description: 'Hotels, bars, shops, restaurants and buildings identified throughout the game world.',
  },
  safehouses: {
    image: '/media/key-art/jason-lucia-motel.webp',
    description: 'Story-related locations where Lucia, Jason and their allies find shelter.',
  },
  geography: {
    image: '/media/scenes/swamp-airboat.webp',
    description: 'Islands, beaches, wetlands, rivers and other natural features across Leonida.',
  },
  activities: {
    image: '/media/vehicles/wiki/kayak.webp',
    description: 'Sports, recreation and side activities separated by evidence level and published gameplay detail.',
  },
  missions: {
    image: '/media/key-art/jason-lucia-robbery.webp',
    description: 'Story sequences indexed with descriptive working labels until Rockstar publishes official mission names.',
  },
  businesses: {
    image: '/media/vehicles/rideout-customs.webp',
    description: 'Fictional brands, services, products and companies documented in official material.',
  },
  television: {
    image: '/media/characters/real-dimez.webp',
    description: 'Channels and programming seen on screens, advertisements and broadcasts in the game world.',
  },
}

const subjectBranches = worldBranches.filter((branch) => branch.id !== 'all')
const VALID_BRANCHES = new Set(['overview', ...worldBranches.map((branch) => branch.id)])
const PAGE_SIZE = 24

function setAddressSection(section) {
  const url = new URL(window.location.href)
  if (section === 'overview') url.searchParams.delete('section')
  else url.searchParams.set('section', section)
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

export default function WorldIndexPage() {
  const [branch, setBranch] = useState('overview')
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('az')
  const [limit, setLimit] = useState(PAGE_SIZE)

  useEffect(() => {
    const syncFromAddress = () => {
      const requested = new URLSearchParams(window.location.search).get('section') || 'overview'
      setBranch(VALID_BRANCHES.has(requested) ? requested : 'overview')
    }
    syncFromAddress()
    window.addEventListener('popstate', syncFromAddress)
    return () => window.removeEventListener('popstate', syncFromAddress)
  }, [])

  const chooseBranch = (id) => {
    setBranch(id)
    if (id === 'overview') setQuery('')
    setRegion('all')
    setStatus('all')
    setLimit(PAGE_SIZE)
    setAddressSection(id)
  }

  const regions = useMemo(() => {
    const source = branch === 'all' || branch === 'overview'
      ? worldEntries
      : worldEntries.filter((entry) => entry.branch === branch)
    return [...new Set(source.map((entry) => entry.region).filter(Boolean))].sort((a, b) => a.localeCompare(b))
  }, [branch])

  const shown = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('en')
    const results = worldEntries.filter((entry) => {
      if (branch !== 'all' && branch !== 'overview' && entry.branch !== branch) return false
      if (region !== 'all' && entry.region !== region) return false
      if (status !== 'all' && entry.status !== status) return false
      if (!normalized) return true
      return [entry.name, entry.type, entry.region, entry.summary, ...(entry.aliases || [])]
        .filter(Boolean)
        .some((value) => value.toLocaleLowerCase('en').includes(normalized))
    })

    return results.sort((a, b) => {
      if (sort === 'za') return b.name.localeCompare(a.name)
      if (sort === 'type') return a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
  }, [branch, query, region, sort, status])

  useEffect(() => setLimit(PAGE_SIZE), [branch, query, region, sort, status])

  const filtering = Boolean(query || region !== 'all' || status !== 'all')
  const showOverview = branch === 'overview' && !filtering
  const activeMeta = worldBranches.find((item) => item.id === branch)
  const activeFilterCount = Number(Boolean(query.trim())) + Number(branch !== 'overview') + Number(region !== 'all') + Number(status !== 'all') + Number(sort !== 'az')

  const clearFilters = () => {
    setQuery('')
    setRegion('all')
    setStatus('all')
    setSort('az')
    setLimit(PAGE_SIZE)
  }

  return (
    <main className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 pb-24 sm:px-6 md:pb-12 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'World' }]} />
      <CategoryHeader
        kind="world"
        eyebrow="World directory"
        title="Leonida World Index"
        description="Explore the world by subject, region or evidence status. Each record combines visual evidence and context in an encyclopedia format."
        count={worldEntries.length}
        image="/media/places/vice-city.webp"
        imageAlt="Official Rockstar Visit Leonida artwork of Vice City"
      />

      <CollapsibleFilters
        title="World filters"
        count={shown.length}
        activeCount={activeFilterCount}
        summary={`${shown.length} of ${worldEntries.length} records · ${branch === 'overview' ? 'Overview' : activeMeta?.label || 'All records'}`}
      >
        <label className="wiki-filter-search">
          <Search className="size-5 shrink-0 text-pink" aria-hidden="true" />
          <span className="sr-only">Search the world index</span>
          <input
            value={query}
            onChange={(event) => {
              const value = event.target.value
              setQuery(value)
              if (value && branch === 'overview') chooseBranch('all')
            }}
            className="min-w-0 flex-1 bg-transparent text-base text-paper outline-none placeholder:text-dim"
            placeholder="Search animals, places, businesses, organizations…"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="rounded-full p-2 text-dim hover:bg-black/5 hover:text-paper" aria-label="Clear search">
              <X className="size-4" />
            </button>
          )}
        </label>

        <div className="wiki-filter-group" role="group" aria-label="World sections">
          <button type="button" onClick={() => chooseBranch('overview')} className={`wiki-filter-pill ${branch === 'overview' ? 'is-active' : ''}`}>Overview</button>
          <button type="button" onClick={() => chooseBranch('all')} className={`wiki-filter-pill ${branch === 'all' ? 'is-active' : ''}`}>
            All records <span className="opacity-60">{worldEntries.length}</span>
          </button>
          {subjectBranches.map((item) => (
            <button key={item.id} type="button" onClick={() => chooseBranch(item.id)} className={`wiki-filter-pill ${branch === item.id ? 'is-active' : ''}`}>
              {item.label} <span className="opacity-60">{item.count}</span>
            </button>
          ))}
        </div>

        {branch !== 'overview' && (
          <div className="wiki-filter-grid">
            <label className="wiki-select-wrap"><span>Region</span><select value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">All regions</option>{regions.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="wiki-select-wrap"><span>Evidence</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Any status</option><option value="confirmed">Confirmed</option><option value="verified">Verified</option><option value="analysis">Analysis</option><option value="rumour">Rumour</option></select></label>
            <label className="wiki-select-wrap"><span>Order</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="az">Name A–Z</option><option value="za">Name Z–A</option><option value="type">Type</option></select></label>
            <div className="flex flex-wrap items-end justify-end gap-2">
              {filtering || sort !== 'az' ? <button type="button" onClick={clearFilters} className="wiki-button-secondary min-h-10 px-3 text-xs">Clear filters</button> : null}
              <span className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-line bg-white px-3 text-[10px] font-black uppercase tracking-wider text-dim"><Grid2X2 className="size-4 text-violet" /> Visual grid</span>
            </div>
          </div>
        )}
      </CollapsibleFilters>

      {showOverview ? (
        <section className="mt-8" aria-labelledby="browse-world-heading">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
            <div>
              <p className="wiki-kicker">Browse by subject</p>
              <h2 id="browse-world-heading" className="wiki-section-title mt-1">Choose a section</h2>
            </div>
            <button type="button" onClick={() => chooseBranch('all')} className="wiki-text-link">
              Alphabetical index <ArrowRight className="size-4" />
            </button>
          </div>

          <div className="visual-card-grid world-subject-grid">
            {subjectBranches.map((item) => {
              const Icon = ICONS[item.id] || Landmark
              const meta = META[item.id]
              const samples = worldEntries.filter((entry) => entry.branch === item.id).slice(0, 3)
              const firstSample = samples[0]
              return (
                <article key={item.id} className="world-subject-card group overflow-hidden rounded-sm border border-line bg-white text-left transition-colors hover:border-pink/35">
                  <Link href={firstSample ? `/database/world/${firstSample.slug}` : '/database/world?section=all'} className="world-subject-media relative block aspect-[16/7] overflow-hidden bg-black/5" aria-label={`Open ${firstSample ? firstSample.name : item.label} article`}>
                    <Image src={meta.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
                    <span className="world-subject-count absolute right-3 top-3 inline-flex min-w-9 items-center justify-center rounded-full border border-white/25 bg-black/65 px-2 py-1.5 font-mono text-[11px] font-bold text-white backdrop-blur-sm">{item.count}</span>
                    <div className="absolute inset-x-4 bottom-3 text-white">
                      <h3 className="world-subject-title flex min-w-0 items-center gap-2 font-cond text-[22px] font-black uppercase leading-[.9] tracking-tight"><Icon className="size-5 shrink-0" />{item.label}</h3>
                    </div>
                  </Link>
                  <div className="world-subject-body flex flex-1 flex-col p-4">
                    <p className="text-sm leading-6 text-dim">{meta.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Example records">
                      {samples.map((sample) => (
                        <Link key={sample.slug} href={`/database/world/${sample.slug}`} className="max-w-full truncate rounded-md border border-black/[0.05] bg-black/[0.035] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.03em] text-dim hover:border-pink/35 hover:text-pink">
                          {sample.name}
                        </Link>
                      ))}
                    </div>
                    <button type="button" onClick={() => chooseBranch(item.id)} className="mt-auto flex items-center gap-1 pt-4 text-xs font-black uppercase tracking-wider text-pink">
                      Open section <ChevronRight className="size-4 transition group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : (
        <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 rounded-sm border border-line bg-white p-2" aria-label="World directory sections">
              <p className="px-3 pb-2 pt-3 text-[10px] font-black uppercase tracking-[0.18em] text-dim">World directory</p>
              <button type="button" onClick={() => chooseBranch('overview')} className="wiki-side-link w-full text-left">
                <Landmark className="size-4" /> Overview
              </button>
              <button type="button" onClick={() => chooseBranch('all')} className={`wiki-side-link w-full text-left ${branch === 'all' ? 'is-active' : ''}`}>
                <Grid2X2 className="size-4" /> All records <span className="ml-auto text-xs opacity-55">{worldEntries.length}</span>
              </button>
              <div className="my-2 border-t border-line" />
              {subjectBranches.map((item) => {
                const Icon = ICONS[item.id] || Landmark
                return (
                  <button key={item.id} type="button" onClick={() => chooseBranch(item.id)} className={`wiki-side-link w-full text-left ${branch === item.id ? 'is-active' : ''}`}>
                    <Icon className="size-4" /> {item.label} <span className="ml-auto text-xs opacity-55">{item.count}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          <section className="min-w-0" aria-live="polite">
            <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
              <div>
                <p className="wiki-kicker">{branch === 'all' ? 'Complete directory' : 'World section'}</p>
                <h2 className="wiki-section-title mt-1">{activeMeta?.label || 'All records'}</h2>
                <p className="mt-1 text-sm text-dim">{shown.length} {shown.length === 1 ? 'record' : 'records'}</p>
              </div>
              {branch !== 'overview' && <button type="button" onClick={() => chooseBranch('overview')} className="wiki-text-link">Section overview <ArrowRight className="size-4" /></button>}
            </header>

            {shown.length ? (
              <div className="visual-card-grid world-record-grid mt-5">
                {shown.slice(0, limit).map((entry) => (
                  <Link key={entry.slug} href={`/database/world/${entry.slug}`} className="group overflow-hidden rounded-sm border border-line bg-white transition-colors hover:border-pink/30">
                    <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
                      <Image src={entry.image} alt="" fill sizes="(max-width: 640px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-pink">{entry.type}</span>
                        <StatusBadge status={entry.status} />
                      </div>
                      <h3 className="mt-1 truncate text-base font-black uppercase tracking-tight text-paper group-hover:text-pink">{entry.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-5 text-dim">{entry.summary}</p>
                      <p className="mt-2 text-[11px] font-semibold text-dim/75">{entry.region}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-sm border border-dashed border-line bg-white px-5 py-16 text-center">
                <Search className="mx-auto size-7 text-dim/45" />
                <h3 className="mt-3 font-black uppercase text-paper">No matching records</h3>
                <p className="mt-1 text-sm text-dim">Try a broader term or remove one of the filters.</p>
                <button type="button" onClick={clearFilters} className="mt-4 text-sm font-bold text-pink hover:underline">Clear filters</button>
              </div>
            )}

            {shown.length > limit && (
              <div className="mt-7 text-center">
                <button type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)} className="wiki-button-secondary">
                  Load {Math.min(PAGE_SIZE, shown.length - limit)} more <span className="opacity-55">· {shown.length - limit} remaining</span>
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  )
}
