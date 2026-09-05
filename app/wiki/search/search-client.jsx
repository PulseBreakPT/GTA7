'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FileText, Search } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge, cx } from '@/components/site/ui'
import { SEARCH_INDEX, SEARCH_TYPES, exactSearchMatch, searchArchive } from '@/lib/search-index'

const cleanExcerpt = (value, max = 220) => {
  const text = String(value || '').replace(/\s+/g, ' ').trim()
  return text.length > max ? `${text.slice(0, max).trim()}…` : text
}

export default function SearchClient() {
  const router = useRouter()
  const params = useSearchParams()
  const query = (params.get('q') || '').trim()
  const selectedType = params.get('type') || 'all'
  const type = SEARCH_TYPES.some((item) => item.id === selectedType) ? selectedType : 'all'
  const [draft, setDraft] = useState(query)

  useEffect(() => setDraft(query), [query])

  const results = useMemo(() => searchArchive(query, type), [query, type])
  const exact = useMemo(() => exactSearchMatch(query), [query])
  const counts = useMemo(() => {
    const found = searchArchive(query)
    return new Map(SEARCH_TYPES.map((item) => [item.id, found.filter((entry) => entry.type === item.id).length]))
  }, [query])

  const navigate = (nextQuery, nextType = type) => {
    const next = new URLSearchParams()
    if (nextQuery.trim()) next.set('q', nextQuery.trim())
    if (nextType !== 'all') next.set('type', nextType)
    router.push(`/wiki/search${next.size ? `?${next.toString()}` : ''}`)
  }

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Special pages', href: '/wiki/special' }, { label: 'Search' }]} />
      <div className="data-rail mt-2">SPECIAL PAGE · FULL-TEXT INDEX</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Search"
          title={query ? `Results for “${query}”` : 'Search the archive'}
          description="Searches canonical titles, article text, categories, source labels and address names across every archive branch."
          count={query ? results.length : SEARCH_INDEX.length}
          countLabel={query ? 'matches' : 'indexed pages'}
        >
          <form className="mt-4 flex flex-col sm:flex-row gap-2" onSubmit={(event) => { event.preventDefault(); navigate(draft) }} role="search">
            <label className="glass-panel tech-mask-sm flex items-center gap-2 h-11 px-3 flex-1">
              <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search titles and page text…" aria-label="Search titles and page text" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
            </label>
            <button type="submit" className="h-11 px-5 border border-line rounded-sm font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper hover:border-mint transition-colors">Search</button>
          </form>
        </CategoryHeader>
      </div>

      {query && (
        <div className="mt-4 flex flex-wrap gap-1.5" role="group" aria-label="Search namespace">
          {[{ id: 'all', label: 'All', count: searchArchive(query).length }, ...SEARCH_TYPES.map((item) => ({ ...item, count: counts.get(item.id) || 0 }))].map((item) => (
            <button key={item.id} type="button" onClick={() => navigate(query, item.id)} disabled={item.count === 0 && item.id !== 'all'} aria-pressed={type === item.id}
              className={cx('inline-flex items-center gap-1.5 h-9 px-3 border rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[10px] transition-colors',
                item.count === 0 && item.id !== 'all' ? 'border-line/40 text-dim/40 cursor-not-allowed' : type === item.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/40')}>
              {item.label}<span className="font-mono text-[9px] tabular-nums opacity-70">{item.count}</span>
            </button>
          ))}
        </div>
      )}

      {query && exact && type === 'all' && (
        <p className="mt-5 panel rounded-sm px-4 py-3 text-[13px] text-dim">
          Exact title: <Link href={exact.href} className="font-cond font-semibold uppercase text-paper hover:text-pink transition-colors">{exact.name}</Link>
        </p>
      )}

      {!query ? (
        <p className="mt-6 panel rounded-sm p-6 text-[14px] leading-relaxed text-dim">Enter a title, place, person, vehicle, quoted phrase or source label. The quick search remains available from every page with <kbd className="font-mono text-paper">/</kbd>.</p>
      ) : results.length === 0 ? (
        <p className="mt-6 panel rounded-sm p-6 text-[14px] text-dim">No indexed page contains all those terms in this branch. Try fewer words or search all branches.</p>
      ) : (
        <ol className="mt-5 border border-line divide-y divide-black/[0.08]">
          {results.slice(0, 100).map((entry, index) => (
            <li key={entry.href}>
              <Link href={entry.href} className="group grid grid-cols-[32px_1fr] sm:grid-cols-[42px_96px_1fr_auto] gap-x-3 gap-y-1 px-4 py-3 hover:bg-surface2/50 transition-colors">
                <span className="font-mono text-[10px] text-dim tabular-nums pt-0.5">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint sm:pt-0.5">{entry.typeLabel}</span>
                <span className="min-w-0">
                  <span className="block font-cond font-semibold uppercase text-[15px] text-paper group-hover:text-pink transition-colors">{entry.name}</span>
                  {entry.excerpt && <span className="mt-1 block text-[12px] leading-relaxed text-dim">{cleanExcerpt(entry.excerpt)}</span>}
                </span>
                <span className="hidden sm:block"><StatusBadge status={entry.status} /></span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      {results.length > 100 && <p className="mt-3 font-mono text-[10px] text-dim">Showing the first 100 of {results.length} matches.</p>}
    </div>
  )
}
