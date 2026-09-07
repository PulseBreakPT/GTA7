'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Compass, Search } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge, cx } from '@/components/site/ui'
import { CURATED_STARTS, KIND_META } from '@/lib/wiki-graph'

export default function DiscoverPage() {
  const [kind, setKind] = useState('all')
  const [query, setQuery] = useState('')
  const entries = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return CURATED_STARTS.filter((entry) => (kind === 'all' || entry.kind === kind) && (!needle || `${entry.name} ${entry.categories.join(' ')}`.toLowerCase().includes(needle)))
  }, [kind, query])

  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Discover' }]} />
      <div className="mt-4"><CategoryHeader eyebrow="Curated index" title="100 ways into the archive" description="A balanced starting shelf across every encyclopedia namespace, weighted toward sourced, complete and connected pages." count={CURATED_STARTS.length} countLabel="starting points" /></div>

      <div className="mt-5 flex flex-col gap-3 border border-line bg-white/60 p-3 lg:flex-row lg:items-center">
        <label className="flex min-h-10 flex-1 items-center gap-2 border border-line bg-white px-3"><Search size={14} className="text-dim" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[13px] text-paper outline-none" placeholder="Filter the 100 starting points…" /></label>
        <div className="flex gap-1.5 overflow-x-auto" role="group" aria-label="Filter starting points by namespace">
          {[['all', 'All'], ...Object.entries(KIND_META).map(([id, meta]) => [id, meta.plural])].map(([id, label]) => <button key={id} type="button" onClick={() => setKind(id)} aria-pressed={kind === id} className={cx('h-9 shrink-0 border px-3 font-cond text-[10px] font-bold uppercase tracking-[0.1em]', kind === id ? 'border-pink bg-pink/5 text-pink' : 'border-line text-dim hover:text-paper')}>{label}</button>)}
        </div>
      </div>

      {entries.length ? <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map((entry) => {
          const number = CURATED_STARTS.indexOf(entry) + 1
          return <li key={entry.href}><Link href={entry.href} className="wiki-discovery-entry"><span>{String(number).padStart(3, '0')}</span><small>{KIND_META[entry.kind].label}</small><strong>{entry.name}</strong><p>{entry.categories.slice(1, 3).join(' · ') || 'General index'}</p><StatusBadge status={entry.status} /></Link></li>
        })}
      </ol> : <div className="mt-6 border border-dashed border-line p-10 text-center"><Compass className="mx-auto text-dim" /><p className="mt-3 text-[13px] text-dim">No starting point matches this filter.</p></div>}
    </div>
  )
}
