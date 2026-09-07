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
        <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((row, i) => {
            const e = row.entry
            return (
              <li key={(e ? e.href : row.name) + i} className="flex min-h-[126px] flex-col border border-line bg-white/55 p-4 hover:border-mint/55 hover:bg-white transition-colors">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] text-dim tabular-nums">{String(i + 1).padStart(3, '0')}</span>
                  <span className="font-mono text-[10px] text-dim tabular-nums">{row.value}</span>
                </span>
                {e ? (
                  <>
                    <Link href={e.href} className="mt-2 font-cond font-semibold uppercase text-[15px] leading-tight text-paper hover:text-pink transition-colors line-clamp-2">{e.name}</Link>
                    <span className="mt-3 flex items-center justify-between gap-3">
                      <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint">{KIND_META[e.kind].label}</span>
                      <StatusBadge status={e.status} className="shrink-0" />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mt-2 font-cond font-semibold uppercase text-[15px] leading-tight text-warn line-clamp-2">{row.name}</span>
                    <span className="mt-3 font-cond uppercase tracking-[0.14em] text-[9px] text-warn">No page</span>
                  </>
                )}
                {row.from && row.from.length > 0 && (
                  <span className="mt-auto pt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-black/[0.06]">
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
