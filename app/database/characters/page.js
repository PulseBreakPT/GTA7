'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search, Heart, Zap, Eye, ChevronRight, Triangle, Repeat2, HeartHandshake, Glasses, Backpack } from 'lucide-react'
import { SourceChip, StatusBadge, cx } from '@/components/site/ui'
import { characters, characterFilters, relationships, mechanics, characterBySlug, extendedLookBrief } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import CollapsibleFilters from '@/components/site/collapsible-filters'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack }
const REL_BARS = [
  { key: 'trust', label: 'TRUST', icon: Heart, color: '#C2185B' },
  { key: 'tension', label: 'TENSION', icon: Zap, color: '#0E7C6B' },
  { key: 'risk', label: 'RISK', icon: Eye, color: '#5B3FD6' },
]

export function Portrait({ c, className, sizes = '120px', priority = false }) {
  const pos = className && className.includes('absolute') ? '' : 'relative'
  const visual = c.image || c.contextImage
  const contextual = !c.image && Boolean(c.contextImage)
  if (visual) {
    return (
      <span className={cx(pos, 'character-visual block overflow-hidden bg-surface2', contextual && 'is-contextual', className)} title={contextual ? c.imageCaption : undefined}>
        <Image src={visual} alt={contextual ? (c.imageCaption || `Official GTA VI context for ${c.name}`) : `Portrait of ${c.name}`} fill priority={priority} sizes={sizes} className={`object-cover ${contextual ? 'object-center' : 'object-top'}`} />
        {contextual && <span className="character-context-label">Context</span>}
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
  const [sort, setSort] = useState('default')
  const [selectedSlug, setSelectedSlug] = useState('lucia-caminos')
  const [mechSlug, setMechSlug] = useState('character-switching')

  const lastUpdated = useMemo(() => characters.map((c) => c.updatedAt).filter(Boolean).sort().pop(), [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = characters.filter((c) => (filter === 'all' || c.group === filter) && (!q || c.name.toLowerCase().includes(q)))
    const byName = (a, b) => a.name.localeCompare(b.name)
    if (sort === 'name') return [...out].sort(byName)
    if (sort === 'name-desc') return [...out].sort((a, b) => byName(b, a))
    if (sort === 'updated') return [...out].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '') || byName(a, b))
    return out
  }, [filter, query, sort])

  const selected = characterBySlug(selectedSlug) || list[0] || characters[0]
  const rels = relationships.filter((r) => r.a === selected.slug || r.b === selected.slug)
  const primary = rels.find((r) => r.primary) || rels[0]
  const partner = primary ? characterBySlug(primary.a === selected.slug ? primary.b : primary.a) : null
  const others = rels.filter((r) => r !== primary)
  const mechList = mechanics.slice(0, 4)
  const selMech = mechanics.find((m) => m.slug === mechSlug) || mechList[0]
  const activeFilterCount = Number(Boolean(query.trim())) + Number(filter !== 'all') + Number(sort !== 'default')

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Characters' }]} />
          <div className="mt-4"><CategoryHeader eyebrow="People of Leonida" title="Characters" image="/media/key-art/cover.webp" imageAlt="Official Grand Theft Auto VI cover artwork featuring the principal cast" imagePosition="center 42%" description="Named protagonists, allies and figures documented from Rockstar-published material, with reported identities kept visibly separate from confirmed records." count={characters.length} countLabel="characters" updatedAt={lastUpdated} /></div>

          <CollapsibleFilters title="Character filters" count={list.length} activeCount={activeFilterCount} summary={`${list.length} of ${characters.length} entries${lastUpdated ? ` · updated ${lastUpdated}` : ''}`}>
            <label className="wiki-filter-search">
              <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search character…" aria-label="Search character" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
            </label>

            <div className="wiki-filter-grid">
              <label className="wiki-select-wrap">
                <span>Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort characters">
                  <option value="default">Archive order</option>
                  <option value="name">Name A–Z</option>
                  <option value="name-desc">Name Z–A</option>
                  <option value="updated">Recently updated</option>
                </select>
              </label>
              <p className="self-end font-mono text-[11px] text-dim tabular-nums">{list.length} of {characters.length} entries</p>
            </div>

            <div className="wiki-filter-group" role="tablist" aria-label="Character filters">
              {characterFilters.map((f) => {
                const active = filter === f.id
                const count = f.id === 'all' ? characters.length : characters.filter((c) => c.group === f.id).length
                return (
                  <button key={f.id} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f.id)}
                    className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                      active ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/30')}>
                    <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{f.label}</span>
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleFilters>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 pb-2" role="listbox" aria-label="Character grid">
            {list.map((c) => {
              const active = c.slug === selected.slug
              return (
                <button key={c.slug} type="button" role="option" aria-selected={active} onClick={() => router.push(`/database/characters/${c.slug}`)} onMouseEnter={() => setSelectedSlug(c.slug)}
                  className={cx('panel rounded-sm p-2 text-left transition-all duration-200', active ? 'card-active' : 'hover:border-black/30')}>
                  <Portrait c={c} className="w-full h-[104px] rounded-sm border border-line text-[16px]" sizes="210px" />
                  <span className="block font-cond font-bold uppercase tracking-[0.04em] text-[14px] text-paper leading-none truncate mt-2">{c.name}</span>
                  <span className={cx('block font-cond font-semibold uppercase tracking-[0.1em] text-[9px] mt-1', c.slug === 'lucia-caminos' ? 'text-pink' : c.slug === 'jason-duval' ? 'text-mint' : 'text-dim')}>{c.role}</span>
                </button>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-6 text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper text-sm">No characters found</p>
                <p className="text-dim text-xs mt-1">Adjust the filter or clear the search.</p>
              </div>
            )}
          </div>

          {/* ASSOCIATED MECHANICS */}
          <section className="mt-6" aria-label="Associated mechanics">
            <h2 className="font-cond font-semibold uppercase tracking-[0.22em] text-[13px] text-pink">ASSOCIATED MECHANICS</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {mechList.map((m) => {
                const Icon = MECH_ICONS[m.icon] || Repeat2
                const active = m.slug === selMech.slug
                return (
                  <button key={m.slug} type="button" onClick={() => setMechSlug(m.slug)} aria-pressed={active}
                    className={cx('panel rounded-sm p-4 text-left flex flex-col transition-all duration-200 min-h-[132px]', active ? 'card-active' : 'hover:border-black/30')}>
                    <span className="flex items-start justify-between gap-3">
                      <span className="flex items-center gap-3 min-w-0">
                        <Icon size={26} className={active ? 'text-pink' : 'text-dim'} strokeWidth={1.8} aria-hidden="true" />
                        <span className="font-cond font-bold uppercase tracking-[0.04em] text-[18px] text-paper leading-[1.02]">{m.name}</span>
                      </span>
                      <span className="shrink-0 min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[11px] text-dim" aria-hidden="true">{m.glyph}</span>
                    </span>
                    <span className="block text-[12px] text-dim leading-relaxed mt-3">{m.desc}</span>
                    <span className="relative block h-[3px] bg-black/10 mt-auto">{active && <span className="absolute inset-y-0 left-0 w-2/3 bg-pink" />}</span>
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/database/mechanics" className="inline-flex items-center gap-3 border border-line h-11 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-paper hover:border-black/50 transition-colors">
                VIEW ALL MECHANICS
                <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center" aria-hidden="true"><ChevronRight size={12} /></span>
              </Link>
            </div>
          </section>
        </div>

        {/* ASIDE: selected character */}
        <aside className="tech-mask glass-panel p-5 self-start">
          <Link href={`/database/characters/${selected.slug}`} className="block" aria-label={`Open ${selected.name} full profile`}>
            <Portrait c={selected} className="w-full aspect-[4/5] rounded-sm border border-line text-[26px]" sizes="380px" priority />
          </Link>

          <h2 className={cx('font-cond font-bold uppercase tracking-tight leading-[0.95] text-[26px] mt-4', selected.slug === 'lucia-caminos' ? 'text-pink' : selected.slug === 'jason-duval' ? 'text-mint' : 'text-paper')}>{selected.name}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{selected.role}</span>
            <StatusBadge status={selected.status} />
          </div>
          <p className="text-dim text-[13px] leading-relaxed mt-3">{selected.bio}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SourceChip name={selected.sourceName} url={selected.sourceUrl} />
          </div>

          <Link href={`/database/characters/${selected.slug}`} className="mt-4 w-full inline-flex items-center justify-center gap-3 border border-paper/90 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[15px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            OPEN PROFILE
            <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
          </Link>

          <h3 className="font-cond font-semibold uppercase tracking-[0.18em] text-[12px] text-pink mt-5">PRIMARY RELATIONSHIP</h3>
          {primary && partner ? (
            <>
              <div className="mt-3 flex items-center gap-3">
                <span className="relative flex items-center" aria-hidden="true">
                  <Portrait c={selected} className="w-[56px] h-[56px] rounded-sm border border-black/70 text-[16px]" sizes="56px" />
                  <span className="relative z-10 -mx-1.5 w-6 h-6 rounded-full bg-ink border border-pink flex items-center justify-center">
                    <Heart size={10} className="text-pink" fill="#C2185B" />
                  </span>
                  <Portrait c={partner} className="w-[56px] h-[56px] rounded-sm border border-line text-[16px]" sizes="56px" />
                </span>
                <span className="min-w-0">
                  <span className="block font-cond font-bold uppercase tracking-[0.04em] text-[16px] text-paper leading-none truncate">{partner.name}</span>
                  <span className={cx('block font-cond font-semibold uppercase tracking-[0.14em] text-[9px] mt-1', partner.role === 'PROTAGONIST' ? 'text-pink' : 'text-dim')}>{partner.role}</span>
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {REL_BARS.map((b) => (
                  <div key={b.key} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: b.color }} aria-hidden="true"><b.icon size={11} /></span>
                    <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-paper w-14 shrink-0">{b.label}</span>
                    <span className="relative flex-1 h-[6px] bg-black/10" role="img" aria-label={`${b.label}: ${primary[b.key]} of 100`}>
                      <span className="absolute inset-y-0 left-0 transition-all duration-300" style={{ width: `${primary[b.key]}%`, backgroundColor: b.color }} />
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-dim text-[13px] mt-2">No documented relationships yet.</p>
          )}

          {others.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {others.map((r) => {
                const other = characterBySlug(r.a === selected.slug ? r.b : r.a)
                if (!other) return null
                return (
                  <button key={other.slug} type="button" onClick={() => router.push(`/database/characters/${other.slug}`)}
                    className="panel rounded-sm p-2.5 flex items-center gap-2.5 text-left hover:border-black/30 transition-colors"
                    aria-label={`Open ${other.name}`}>
                    <Portrait c={other} className="w-[38px] h-[38px] rounded-sm border border-line shrink-0 text-[12px]" sizes="38px" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-cond font-bold uppercase text-[12px] text-paper leading-tight truncate">{other.name}</span>
                      <span className="block font-cond uppercase tracking-[0.12em] text-[8px] text-dim mt-0.5">{other.role}</span>
                    </span>
                    <ChevronRight size={13} className="text-dim shrink-0" aria-hidden="true" />
                  </button>
                )
              })}
            </div>
          )}
        </aside>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="border border-line bg-surface2/40 p-4 sm:p-5">
          <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-pink">Story context · community reference</p>
          <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <p className="max-w-3xl text-[14px] leading-relaxed text-paper/85">{extendedLookBrief.synopsis}</p>
            <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-dim shrink-0">{extendedLookBrief.protagonists.join(' · ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
