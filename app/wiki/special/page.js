'use client'

import Link from 'next/link'
import { List, FolderTree, BarChart3, Clock, Shuffle, BookMarked, Search, Images, ChevronRight } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { STATS, CATEGORIES, RECENT, SOURCES } from '@/lib/wiki-graph'

// O índice das páginas especiais, como qualquer wiki tem. Junta num sítio
// as vistas que não são verbetes mas que dizem o estado do arquivo.
const PAGES = [
  { href: '/wiki', icon: List, title: 'All entries', count: STATS.total, desc: 'Every entry in the archive, alphabetically, with a letter bar and filters by branch.' },
  { href: '/wiki/categories', icon: FolderTree, title: 'All categories', count: CATEGORIES.length, desc: 'Every category entries are filed under, with how many each one holds.' },
  { href: '/wiki/changes', icon: Clock, title: 'Recent changes', count: RECENT.length, desc: 'Entries by the date each was last checked against its source.' },
  { href: '/wiki/statistics', icon: BarChart3, title: 'Statistics', count: null, desc: 'What the archive holds, counted from the entries: branches, source labels, stubs, and names cited but not yet written.' },
  { href: '/sources', icon: BookMarked, title: 'Sources', count: SOURCES.length, desc: 'Every source cited, and exactly which entries rest on it.' },
  { href: '/wiki/random', icon: Shuffle, title: 'Random entry', count: null, desc: 'Opens one record at random.' },
  { href: '/media', icon: Images, title: 'Media', count: null, desc: 'Artwork, postcards, captures and edition stills held by the archive.' },
]

export default function SpecialPagesIndex() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Special pages' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Index"
          title="Special pages"
          description="The views that are not entries: indexes, counts and provenance. They are built from the content itself, so they say what the archive is rather than what it claims to be."
          count={PAGES.length}
          countLabel="pages"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES.map((p) => {
          const Icon = p.icon
          return (
            <Link key={p.href} href={p.href} className="panel rounded-sm p-5 group hover:border-mint/60 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <Icon size={20} className="text-mint shrink-0" aria-hidden="true" />
                {p.count != null && <span className="font-cond font-bold text-[20px] text-paper tabular-nums leading-none">{p.count}</span>}
              </div>
              <h2 className="mt-3 font-cond font-bold uppercase tracking-tight text-[19px] text-paper group-hover:text-mint transition-colors">{p.title}</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-dim">{p.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 font-cond uppercase tracking-[0.14em] text-[10px] text-dim group-hover:text-paper transition-colors">
                Open <ChevronRight size={11} aria-hidden="true" />
              </span>
            </Link>
          )
        })}
      </div>

      <section className="mt-10 panel rounded-sm p-5">
        <h2 className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.1em] text-[15px] text-paper">
          <Search size={15} className="text-mint" aria-hidden="true" /> What this archive does not have
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-dim max-w-[80ch]">
          A wiki is normally edited by whoever reads it, with revision histories, talk pages and watchlists to keep that
          honest. This archive is not editable in the browser, so none of those exist here — claiming otherwise would be
          a false front. What replaces them is narrower and checkable: every entry names its source, carries the date it
          was last verified, and is labelled by how strong that evidence is. Corrections go to the source, and the entry
          follows.
        </p>
      </section>
    </div>
  )
}
