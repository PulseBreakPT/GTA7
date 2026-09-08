'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FolderTree, Search } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { CATEGORIES } from '@/lib/wiki-graph'

// O equivalente ao Special:Categories: a lista alfabética de todas as
// categorias com o número de membros de cada uma.
export default function CategoriesIndexPage() {
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CATEGORIES.filter((c) => !q || c.label.toLowerCase().includes(q))
  }, [query])

  const grouped = useMemo(() => {
    const groups = new Map()
    shown.forEach((c) => {
      const first = c.label.trim().charAt(0).toUpperCase()
      const letter = /[A-Z]/.test(first) ? first : '#'
      if (!groups.has(letter)) groups.set(letter, [])
      groups.get(letter).push(c)
    })
    return [...groups.entries()].sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
  }, [shown])
  const rootCategories = useMemo(() => CATEGORIES.filter((category) => category.parents.length === 0), [])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Categories' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Special page"
          title="All categories"
          description="Every category the archive files entries under, with how many entries each one holds. Categories are derived from the entries themselves, not maintained by hand."
          count={CATEGORIES.length}
          countLabel="categories"
        >
          <label className="mt-4 glass-panel tech-mask-sm flex items-center gap-2 h-10 px-3 w-full sm:w-[280px]">
            <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search categories…"
              aria-label="Search categories"
              className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0"
            />
          </label>
        </CategoryHeader>
      </div>

      {!query && rootCategories.length > 0 && (
        <section className="mt-6" aria-labelledby="root-categories-heading">
          <div className="flex items-center gap-4">
            <h2 id="root-categories-heading" className="font-cond font-bold uppercase tracking-[0.14em] text-[15px] text-mint leading-none shrink-0">Root categories</h2>
            <span className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
            <span className="font-mono text-[11px] text-dim tabular-nums">{rootCategories.length}</span>
          </div>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rootCategories.map((category) => (
              <li key={category.slug}>
                <Link href={`/wiki/category/${category.slug}`} className="panel rounded-sm p-4 flex items-center gap-3 group hover:border-mint/50 transition-colors">
                  <FolderTree size={16} className="text-mint shrink-0" aria-hidden="true" />
                  <span className="flex-1 min-w-0">
                    <span className="block font-cond font-bold uppercase text-[14px] text-paper group-hover:text-mint transition-colors">{category.label}</span>
                    <span className="mt-1 block font-mono text-[9px] text-dim">{category.children.length} subcategories · {category.members.length} pages</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {shown.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-cond font-bold uppercase text-[22px] text-paper">No categories match</p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {grouped.map(([letter, list]) => (
            <section key={letter}>
              <div className="flex items-center gap-4">
                <h2 className="font-cond font-bold text-[24px] text-mint leading-none shrink-0">{letter}</h2>
                <span className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
                <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{list.length}</span>
              </div>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-px">
                {list.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/wiki/category/${c.slug}`} className="flex items-center gap-3 py-2 border-b border-black/[0.06] hover:border-black/25 group transition-colors">
                      <span className="flex-1 min-w-0 font-cond font-semibold uppercase text-[13px] text-paper truncate group-hover:text-mint transition-colors">{c.label}</span>
                      <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{c.members.length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
