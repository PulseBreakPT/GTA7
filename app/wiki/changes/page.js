'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { StatusBadge, cx } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { RECENT, KIND_META } from '@/lib/wiki-graph'

// O Special:RecentChanges possível num arquivo sem edição pública: a lista
// de tudo por data de última verificação. Não é histórico de edições — é a
// data em que cada entrada foi confrontada com a sua fonte, que é o que o
// conteúdo realmente guarda.
export default function RecentChangesPage() {
  const [kind, setKind] = useState('all')

  const kinds = useMemo(() => {
    const seen = new Map()
    RECENT.forEach((e) => seen.set(e.kind, (seen.get(e.kind) || 0) + 1))
    return [...seen.entries()].map(([id, count]) => ({ id, label: KIND_META[id].plural, count }))
  }, [])

  const shown = useMemo(() => RECENT.filter((e) => kind === 'all' || e.kind === kind), [kind])

  // Agrupado por dia, como qualquer lista de alterações.
  const byDay = useMemo(() => {
    const days = new Map()
    shown.forEach((e) => {
      if (!days.has(e.updatedAt)) days.set(e.updatedAt, [])
      days.get(e.updatedAt).push(e)
    })
    return [...days.entries()].sort(([a], [b]) => b.localeCompare(a))
  }, [shown])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Recent changes' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Special page"
          title="Recent changes"
          description="Every entry by the date it was last checked against its source. This archive has no public editing, so there is no edit history to show — what it can show is when each record was last verified."
          count={RECENT.length}
          countLabel="dated entries"
          updatedAt={RECENT[0]?.updatedAt}
        >
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setKind('all')}
              aria-pressed={kind === 'all'}
              className={cx(
                'inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[11px] transition-colors',
                kind === 'all' ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-white/40'
              )}
            >
              All
              <span className="font-mono text-[10px] tabular-nums opacity-70">{RECENT.length}</span>
            </button>
            {kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                aria-pressed={kind === k.id}
                className={cx(
                  'inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[11px] transition-colors',
                  kind === k.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-white/40'
                )}
              >
                {k.label}
                <span className="font-mono text-[10px] tabular-nums opacity-70">{k.count}</span>
              </button>
            ))}
          </div>
        </CategoryHeader>
      </div>

      <div className="mt-6 space-y-6">
        {byDay.slice(0, 20).map(([day, items]) => (
          <section key={day}>
            <div className="flex items-center gap-4">
              <h2 className="font-mono text-[13px] text-mint tabular-nums shrink-0">{day}</h2>
              <span className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" aria-hidden="true" />
              <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{items.length}</span>
            </div>
            <ul className="mt-2 border border-line divide-y divide-white/[0.08]">
              {items.slice(0, 40).map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 hover:bg-surface2/50 transition-colors">
                    <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint shrink-0 w-[72px]">{KIND_META[e.kind].label}</span>
                    <span className="font-cond font-semibold uppercase text-[13px] text-paper flex-1 min-w-0 truncate">{e.name}</span>
                    {e.stub && <span className="font-cond uppercase tracking-[0.14em] text-[8px] text-warn shrink-0">Stub</span>}
                    <StatusBadge status={e.status} className="shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
            {items.length > 40 && <p className="mt-1.5 font-mono text-[10px] text-dim">+{items.length - 40} more on this date</p>}
          </section>
        ))}
      </div>
    </div>
  )
}
