'use client'

import Link from 'next/link'
import { FileWarning, Link2, FolderTree, BookMarked } from 'lucide-react'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { STATS, STUBS, WANTED, SOURCES, KIND_META } from '@/lib/wiki-graph'

// O Special:Statistics do arquivo, mais as duas listas de trabalho que
// dele decorrem: o que está por escrever e o que é citado sem existir.
export default function StatisticsPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Statistics' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Special page"
          title="Statistics"
          description="What the archive actually holds, counted from the entries themselves. Every number on this page is derived, so none of them can drift away from the content."
          count={STATS.total}
          countLabel="entries"
        />
      </div>

      <section className="mt-6">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">Entries by branch</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px border border-line bg-line">
          {STATS.byKind.filter((k) => k.count > 0).map((k) => (
            <Link key={k.kind} href={KIND_META[k.kind].base} className="bg-ink p-4 hover:bg-surface2/60 transition-colors">
              <p className="font-cond font-bold text-[28px] leading-none text-paper tabular-nums">{k.count}</p>
              <p className="mt-2 font-cond uppercase tracking-[0.16em] text-[10px] text-dim">{k.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">Entries by source label</h2>
        <div className="flex flex-wrap gap-3">
          {STATS.byStatus.map((s) => (
            <div key={s.status} className="panel rounded-sm px-4 py-3 flex items-center gap-3">
              <StatusBadge status={s.status} />
              <span className="font-cond font-bold text-[20px] text-paper tabular-nums leading-none">{s.count}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">The archive at a glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-line bg-line">
          {[
            [FolderTree, STATS.categories, 'Categories', '/wiki/categories'],
            [Link2, STATS.linked, 'Entries linked from another', null],
            [BookMarked, STATS.withSource, 'Entries with a source link', '/sources'],
            [FileWarning, STATS.stubs, 'Stubs', null],
          ].map(([Icon, value, label, href]) => {
            const inner = (
              <>
                <Icon size={16} className="text-mint" aria-hidden="true" />
                <p className="mt-2 font-cond font-bold text-[28px] leading-none text-paper tabular-nums">{value}</p>
                <p className="mt-2 font-cond uppercase tracking-[0.14em] text-[10px] text-dim">{label}</p>
              </>
            )
            return href ? (
              <Link key={label} href={href} className="bg-ink p-4 hover:bg-surface2/60 transition-colors">{inner}</Link>
            ) : (
              <div key={label} className="bg-ink p-4">{inner}</div>
            )
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">Shortest entries</h2>
        <p className="text-[13px] leading-relaxed text-dim max-w-[68ch] mb-4">
          Entries that hold only what the source states and nothing more. They are marked as stubs rather than
          padded out — an archive that invents body text to look complete is no longer a record.
        </p>
        <ul className="border border-line divide-y divide-black/[0.08]">
          {STUBS.slice(0, 12).map((e) => (
            <li key={e.href}>
              <Link href={e.href} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 hover:bg-surface2/50 transition-colors">
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint shrink-0 w-[72px]">{KIND_META[e.kind].label}</span>
                <span className="font-cond font-semibold uppercase text-[13px] text-paper flex-1 min-w-0 truncate">{e.name}</span>
                <span className="font-mono text-[10px] text-dim tabular-nums shrink-0">{e.bodyLength} chars</span>
              </Link>
            </li>
          ))}
        </ul>
        {STUBS.length > 12 && <p className="mt-2 font-mono text-[11px] text-dim">+{STUBS.length - 12} more stubs</p>}
      </section>

      {WANTED.length > 0 && (
        <section className="mt-8">
          <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">Named but not yet an entry</h2>
          <p className="text-[13px] leading-relaxed text-dim max-w-[68ch] mb-4">
            Names that entries cite in a field but that have no page of their own. On a wiki these are the red links —
            the honest list of what is still missing.
          </p>
          <ul className="border border-line divide-y divide-black/[0.08]">
            {WANTED.slice(0, 12).map((w) => (
              <li key={w.name} className="px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-cond font-semibold uppercase text-[13px] text-warn flex-1 min-w-0 truncate">{w.name}</span>
                <span className="font-mono text-[10px] text-dim shrink-0">cited by {w.from.length}</span>
                <span className="basis-full flex flex-wrap gap-x-3 gap-y-1">
                  {w.from.slice(0, 4).map((f) => (
                    <Link key={f.href} href={f.href} className="font-cond uppercase tracking-[0.1em] text-[10px] text-dim hover:text-paper transition-colors">{f.name}</Link>
                  ))}
                </span>
              </li>
            ))}
          </ul>
          {WANTED.length > 12 && <p className="mt-2 font-mono text-[11px] text-dim">+{WANTED.length - 12} more</p>}
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper border-b border-black/10 pb-3 mb-4">Sources carrying the most entries</h2>
        <ul className="border border-line divide-y divide-black/[0.08]">
          {SOURCES.slice(0, 8).map((s) => (
            <li key={s.name} className="px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-cond font-semibold uppercase text-[13px] text-paper flex-1 min-w-0 truncate">{s.name}</span>
              <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{s.entries.length}</span>
            </li>
          ))}
        </ul>
        <Link href="/sources" className="mt-3 inline-flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-pink hover:text-paper transition-colors">
          All sources →
        </Link>
      </section>
    </div>
  )
}
