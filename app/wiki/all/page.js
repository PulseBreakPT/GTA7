'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ENTRIES, KIND_META } from '@/lib/wiki-graph'
import { StatusBadge, cx } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

// O Special:AllPages de uma wiki: o índice completo por prefixo. O /wiki
// mostra tudo de uma vez, agrupado por letra; esta página serve o caso
// oposto — sei por onde começa, mostra-me só essa gaveta.
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']

const firstLetter = (name) => {
  const ch = String(name).trim().toUpperCase().replace(/^[^A-Z0-9]+/, '').charAt(0)
  return /[A-Z]/.test(ch) ? ch : '#'
}

export default function AllPagesIndex() {
  const [letter, setLetter] = useState('A')
  const [kind, setKind] = useState('all')

  const counts = useMemo(() => {
    const map = {}
    ENTRIES.forEach((e) => {
      const l = firstLetter(e.name)
      map[l] = (map[l] || 0) + 1
    })
    return map
  }, [])

  const rows = useMemo(() => ENTRIES
    .filter((e) => firstLetter(e.name) === letter && (kind === 'all' || e.kind === kind))
    .sort((a, b) => a.name.localeCompare(b.name)), [letter, kind])

  const kinds = useMemo(() => Object.keys(KIND_META)
    .map((k) => ({ id: k, label: KIND_META[k].plural, count: ENTRIES.filter((e) => e.kind === k).length }))
    .filter((k) => k.count > 0), [])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[
        { label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' },
        { label: 'Special pages', href: '/wiki/special' }, { label: 'All pages' },
      ]} />

      <div className="data-rail mt-2">SPECIAL PAGE · PREFIX INDEX</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Index"
          title="All pages"
          description="Every entry the archive holds, one drawer at a time. Pick a letter, and narrow by branch if the drawer is deep."
          count={ENTRIES.length}
          countLabel="entries"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="First letter">
        {LETTERS.map((l) => {
          const n = counts[l] || 0
          const active = l === letter
          return (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={n === 0}
              onClick={() => setLetter(l)}
              className={cx('w-9 h-9 border rounded-sm font-cond font-bold text-[13px] transition-colors',
                n === 0 ? 'border-line/40 text-dim/40 cursor-not-allowed'
                  : active ? 'border-paper bg-paper text-ink'
                    : 'border-line text-dim hover:text-paper hover:border-black/40')}
            >
              {l}
            </button>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by branch">
        {[{ id: 'all', label: 'All branches', count: ENTRIES.length }, ...kinds].map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKind(k.id)}
            aria-pressed={kind === k.id}
            className={cx('inline-flex items-center gap-1.5 border rounded-sm px-2.5 h-9 font-cond uppercase tracking-[0.12em] text-[11px] transition-colors',
              kind === k.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/40')}
          >
            {k.label}
            <span className="font-mono text-[10px] tabular-nums opacity-70">{k.count}</span>
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
        {rows.length} {rows.length === 1 ? 'entry' : 'entries'} starting with {letter}
      </p>

      {rows.length === 0 ? (
        <p className="mt-3 panel rounded-sm p-6 text-[14px] text-dim">Nothing in this drawer for that branch.</p>
      ) : (
        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {rows.map((e) => (
            <li key={e.href} className="border-b border-black/[0.07]">
              <Link href={e.href} className="flex items-center gap-2.5 py-2 group">
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint w-[64px] shrink-0">{KIND_META[e.kind].label}</span>
                <span className="flex-1 min-w-0 truncate font-cond font-semibold uppercase text-[13px] text-paper group-hover:text-pink transition-colors">{e.name}</span>
                <StatusBadge status={e.status} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
