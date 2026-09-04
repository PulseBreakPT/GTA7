'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Users, ChevronRight, FileText, BadgeCheck, HelpCircle, MapPin, BookMarked } from 'lucide-react'
import { GhostBadge, SourceChip, StatusBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References } from '@/components/site/wiki'
import { factions } from '@/lib/content'

export default function FactionPage() {
  const { slug } = useParams()
  const f = factions.find((x) => x.slug === slug)

  if (!f) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/gangs-factions" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO FACTIONS</Link>
      </div>
    )
  }

  const related = factions.filter((x) => x.slug !== f.slug).slice(0, 4)

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    ...(f.confirmed?.length > 0 ? [{ id: 'confirmed', label: 'Confirmed', icon: BadgeCheck }] : []),
    ...(f.unknown?.length > 0 ? [{ id: 'unknown', label: 'Not Published', icon: HelpCircle }] : []),
    { id: 'related', label: 'Other Factions', icon: Users },
    { id: 'references', label: 'References', icon: BookMarked },
  ]

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Factions', href: '/gangs-factions' }, { label: f.name }]} />

      <div className="data-rail mt-2">FACTION FILE · SOURCE-BOUND RECORD · {f.region}</div>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={f.status} />
          <GhostBadge status="confirmed" label={f.kind} />
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{f.evidenceStatus}</span>
        </div>
        <h1 data-ghost="FACTIONS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[46px] sm:text-[60px] mt-2">{f.name}</h1>
        <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]"><WikiText exclude={`/gangs-factions/${f.slug}`}>{f.desc}</WikiText></p>
        <StubNotice kind="factions" slug={f.slug} />
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
        <div className="min-w-0 order-2 lg:order-1">
          <WikiSection id="overview" title="Overview">
            <p className="text-dim text-[14px] leading-[1.8]"><WikiText exclude={`/gangs-factions/${f.slug}`}>{f.desc}</WikiText></p>
          </WikiSection>

          {f.confirmed?.length > 0 && (
            <WikiSection id="confirmed" title="Confirmed">
              <div className="border border-mint/25 bg-mint/[0.03] p-4 rounded-sm">
                <ul className="space-y-2 text-[13px] leading-relaxed text-dim">
                  {f.confirmed.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </WikiSection>
          )}

          {f.unknown?.length > 0 && (
            <WikiSection id="unknown" title="Not Published">
              <div className="border border-line bg-surface2/40 p-4 rounded-sm">
                <ul className="space-y-2 text-[13px] leading-relaxed text-dim">
                  {f.unknown.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </WikiSection>
          )}

          <WikiSection id="related" title="Other Factions" className="mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/gangs-factions/${r.slug}`} className="panel rounded-sm p-4 flex items-center gap-3 hover:border-black/30 transition-colors">
                  <Users size={20} className="text-dim shrink-0" strokeWidth={1.8} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-cond font-bold uppercase text-[16px] text-paper truncate">{r.name}</span>
                    <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5 truncate">{r.kind} · {r.region}</span>
                  </span>
                  <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </WikiSection>
          <References items={[{ name: f.sourceName, url: f.sourceUrl }]} />
          <CategoryFooter kind="factions" slug={f.slug} />
        </div>

        <div className="hidden lg:block order-3 lg:order-2">
          <TableOfContents sections={sections} />
        </div>

        <div className="order-1 lg:order-3">
          <InfoboxShell>
            {f.image ? (
              <span className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-line bg-surface2">
                <Image src={f.image} alt={f.name} fill sizes="(max-width:1024px) 100vw, 300px" className="object-cover" />
              </span>
            ) : (
              <span className="flex flex-col items-center justify-center gap-2 aspect-[16/10] rounded-sm border border-line bg-surface2/60 text-dim" role="img" aria-label={`${f.name}: visual pending`}>
                <Users size={28} aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">AWAITING VISUAL</span>
              </span>
            )}

            <div className="space-y-3 border-t border-black/10 pt-4">
              <InfoRow label="Type" value={f.kind} />
              <InfoRow label="Region">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={12} className="text-mint" aria-hidden="true" />
                  {f.region}
                </span>
              </InfoRow>
              <InfoRow label="Status">
                <StatusBadge status={f.status} />
              </InfoRow>
              <InfoRow label="Evidence">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{f.evidenceStatus}</span>
              </InfoRow>
            </div>

            <div className="border-t border-black/10 pt-4">
              <SourceChip name={f.sourceName} url={f.sourceUrl} />
            </div>
            <WhatLinksHere kind="factions" slug={f.slug} />
          </InfoboxShell>
        </div>
      </div>
    </div>
  )
}
