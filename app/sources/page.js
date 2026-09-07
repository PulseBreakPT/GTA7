'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { SOURCES, STATS, KIND_META } from '@/lib/wiki-graph'

// A página que um arquivo que se diz preso à fonte tem de ter: quais são
// as fontes, e exactamente o que cada uma sustenta. Sem ela, «com fonte»
// é uma afirmação sobre si próprio que ninguém pode verificar.
export default function SourcesPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Sources' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Provenance"
          title="Sources"
          description="Official Rockstar sources cited by this archive, with every linked entry grouped beneath its origin."
          count={SOURCES.length}
          countLabel="sources"
        />
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-dim max-w-[80ch]">
        {STATS.withSource} of {STATS.total} entries carry a direct Rockstar source link. Editorial records remain clearly
        labelled but never link readers to third-party sites.
      </p>

      <div className="mt-6 space-y-6">
        {SOURCES.map((source) => (
          <section key={source.name} className="panel rounded-sm p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-cond font-bold uppercase tracking-tight text-[22px] text-paper leading-tight">{source.name}</h2>
                {source.url && (
                  <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-mint hover:text-paper transition-colors break-all">
                    {source.url} <ExternalLink size={11} className="shrink-0" />
                  </a>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="font-cond font-bold text-[26px] text-paper tabular-nums leading-none">{source.entries.length}</p>
                <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-1">entries</p>
              </div>
            </div>

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-px border-t border-black/10 pt-3">
              {source.entries.slice(0, 24).map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="flex items-center gap-2.5 py-1.5 group">
                    <span className="font-cond uppercase tracking-[0.14em] text-[8px] text-dim shrink-0 w-[52px]">{KIND_META[e.kind].label}</span>
                    <span className="flex-1 min-w-0 font-cond font-semibold uppercase text-[12px] text-paper truncate group-hover:text-mint transition-colors">{e.name}</span>
                    <StatusBadge status={e.status} className="shrink-0 scale-[0.8] origin-right" />
                  </Link>
                </li>
              ))}
            </ul>
            {source.entries.length > 24 && (
              <p className="mt-2 font-mono text-[11px] text-dim">+{source.entries.length - 24} more entries on this source</p>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}
