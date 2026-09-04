import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SPECIAL_LISTS, specialListById, KIND_META } from '@/lib/wiki-graph'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

// Uma página por lista de manutenção, com a mesma implementação para
// todas — como o Special: de uma wiki. Acrescentar uma lista é acrescentar
// uma entrada em `SPECIAL_LISTS`, não escrever outra página.
export function generateStaticParams() {
  return SPECIAL_LISTS.map((l) => ({ list: l.id }))
}

export function generateMetadata({ params }) {
  const list = specialListById(params.list)
  if (!list) return { title: 'Special page' }
  return { title: list.title, description: list.blurb }
}

export default function SpecialListPage({ params }) {
  const list = specialListById(params.list)
  if (!list) notFound()

  const rows = list.rows()

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[
        { label: 'Home', href: '/' },
        { label: 'Wiki', href: '/wiki' },
        { label: 'Special pages', href: '/wiki/special' },
        { label: list.title },
      ]} />

      <div className="data-rail mt-2">SPECIAL PAGE · {list.metric.toUpperCase()}</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Maintenance list"
          title={list.title}
          description={list.blurb}
          count={rows.length}
          countLabel="rows"
        />
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 panel rounded-sm p-6 text-[14px] text-dim">
          Nothing on this list. For a maintenance list, that is the good outcome.
        </p>
      ) : (
        <ol className="mt-6 border border-line divide-y divide-black/[0.08]">
          {rows.map((row, i) => {
            const e = row.entry
            return (
              <li key={(e ? e.href : row.name) + i} className="px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-[10px] text-dim tabular-nums w-8 shrink-0">{String(i + 1).padStart(3, '0')}</span>
                {e ? (
                  <>
                    <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint shrink-0 w-[74px]">{KIND_META[e.kind].label}</span>
                    <Link href={e.href} className="font-cond font-semibold uppercase text-[14px] text-paper hover:text-pink transition-colors flex-1 min-w-0 truncate">{e.name}</Link>
                    <StatusBadge status={e.status} className="shrink-0" />
                  </>
                ) : (
                  <>
                    <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-warn shrink-0 w-[74px]">No page</span>
                    <span className="font-cond font-semibold uppercase text-[14px] text-warn flex-1 min-w-0 truncate">{row.name}</span>
                  </>
                )}
                <span className="font-mono text-[10px] text-dim tabular-nums shrink-0">{row.value}</span>
                {row.from && row.from.length > 0 && (
                  <span className="basis-full flex flex-wrap gap-x-3 gap-y-1 pl-12">
                    {row.from.slice(0, 6).map((f) => (
                      <Link key={f.href} href={f.href} className="font-cond uppercase tracking-[0.1em] text-[10px] text-dim hover:text-paper transition-colors">{f.name}</Link>
                    ))}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      )}

      <div className="mt-8 border-t hairline pt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link href="/wiki/special" className="inline-flex items-center gap-1.5 font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-pink hover:text-paper transition-colors">
          <ArrowLeft size={13} aria-hidden="true" /> All special pages
        </Link>
        {SPECIAL_LISTS.filter((l) => l.id !== list.id).slice(0, 5).map((l) => (
          <Link key={l.id} href={`/wiki/special/${l.id}`} className="font-cond uppercase tracking-[0.12em] text-[11px] text-dim hover:text-paper transition-colors">
            {l.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
