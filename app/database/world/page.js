'use client'

import { useEffect, useMemo, useState } from 'react'
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
import { useUrlState } from '@/components/site/use-url-state'

// A vista por omissão numa tabela só. Só a secção vivia na URL; região, estado
// de evidência, ordenação e pesquisa ficavam em memória e perdiam-se ao abrir
// um registo e voltar atrás.
const VISTA_OMISSA = { section: 'overview', region: 'all', status: 'all', sort: 'az', q: '' }

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
    description: 'Animals documented in trailers and official material, from the wetlands to the streets of Vice City.',
  },
  organizations: {
    description: 'Police forces, gangs, teams and other organizations operating across Leonida.',
  },
  establishments: {
    description: 'Hotels, bars, shops, restaurants and buildings identified throughout the game world.',
  },
  safehouses: {
    description: 'Story-related locations where Lucia, Jason and their allies find shelter.',
  },
  geography: {
    description: 'Islands, beaches, wetlands, rivers and other natural features across Leonida.',
  },
  activities: {
    description: 'Sports, recreation and side activities separated by evidence level and published gameplay detail.',
  },
  missions: {
    description: 'Story sequences indexed with descriptive working labels until Rockstar publishes official mission names.',
  },
  businesses: {
    description: 'Fictional brands, services, products and companies documented in official material.',
  },
  television: {
    description: 'Channels and programming seen on screens, advertisements and broadcasts in the game world.',
  },
}

const subjectBranches = worldBranches.filter((branch) => branch.id !== 'all')
const VALID_BRANCHES = new Set(['overview', ...worldBranches.map((branch) => branch.id)])
const PAGE_SIZE = 24

export default function WorldIndexPage() {
  const [vista, definirVista] = useUrlState(VISTA_OMISSA)
  const { region, status, sort } = vista

  // A secção vem da URL e pode vir escrita à mão: valida-se contra a lista
  // real de ramos, senão `?section=qualquer-coisa` devolvia uma lista vazia
  // sem dizer porquê. Era a guarda que já existia, e mantém-se.
  const branch = VALID_BRANCHES.has(vista.section) ? vista.section : 'overview'

  const setRegion = (valor) => definirVista({ region: valor })
  const setStatus = (valor) => definirVista({ status: valor })
  const setSort = (valor) => definirVista({ sort: valor })

  const [limit, setLimit] = useState(PAGE_SIZE)

  // Filtra a cada tecla, escreve na URL só quando o leitor pára de escrever.
  const [query, setQuery] = useState('')
  useEffect(() => { setQuery(vista.q) }, [vista.q])
  useEffect(() => {
    if (query === vista.q) return undefined
    const id = setTimeout(() => definirVista({ q: query }), 250)
    return () => clearTimeout(id)
  }, [query, vista.q, definirVista])

  // Mudar de secção limpa região e estado de propósito: as regiões dependem do
  // ramo, e uma região de outra secção devolveria uma lista vazia. A pesquisa
  // fica — procurar «vice» continua a ser a mesma pergunta em qualquer secção.
  const chooseBranch = (id) => {
    definirVista({ section: id, region: 'all', status: 'all' })
    setLimit(PAGE_SIZE)
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
  const activeFilterCount = Object.keys(VISTA_OMISSA)
    .filter((chave) => (chave === 'q' ? query.trim() !== '' : vista[chave] !== VISTA_OMISSA[chave]))
    .length

  // Limpa o que está aplicado e deixa o leitor onde está: a secção não é um
  // filtro, é o sítio onde ele foi parar.
  const clearFilters = () => {
    definirVista({ region: 'all', status: 'all', sort: 'az', q: '' })
    setQuery('')
    setLimit(PAGE_SIZE)
  }

  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 pb-24 sm:px-6 md:pb-12 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'World' }]} />
      <CategoryHeader
        kind="world"
        eyebrow="World directory"
        title="Leonida World Index"
        description="Explore the world by subject, region or evidence status. Each record combines visual evidence and context in an encyclopedia format."
        count={worldEntries.length}
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
            <label className="wiki-select-wrap"><span>Evidence</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Any status</option><option value="confirmed">Confirmed</option><option value="verified">Verified</option><option value="category">Category confirmed</option><option value="analysis">Analysis</option><option value="rumour">Rumour</option></select></label>
            <label className="wiki-select-wrap"><span>Order</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="az">Name A–Z</option><option value="za">Name Z–A</option><option value="type">Type</option></select></label>
            <div className="flex flex-wrap items-end justify-end gap-2">
              {filtering || sort !== 'az' ? <button type="button" onClick={clearFilters} className="wiki-button-secondary min-h-10 px-3 text-xs">Clear filters</button> : null}
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

          <ul className="world-list">
            {subjectBranches.map((item) => {
              const Icon = ICONS[item.id] || Landmark
              return (
                <li key={item.id}>
                  <button type="button" onClick={() => chooseBranch(item.id)} className="world-row">
                    <Icon aria-hidden="true" />
                    <span className="world-row-main"><strong>{item.label}</strong><small>{META[item.id].description}</small></span>
                    <span className="world-row-count">{item.count}</span>
                    <ChevronRight className="world-row-arrow" aria-hidden="true" />
                  </button>
                </li>
              )
            })}
          </ul>
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
              <ul className="world-list">
                {shown.slice(0, limit).map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/database/world/${entry.slug}`} className="world-row world-row-record">
                      <span className="world-row-main"><strong>{entry.name.toLowerCase()}</strong><small>{entry.type} · {entry.region}</small></span>
                      <StatusBadge status={entry.status} />
                      <ChevronRight className="world-row-arrow" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
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
    </div>
  )
}
