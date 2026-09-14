'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Users, ChevronRight, FileText, BadgeCheck, HelpCircle, MapPin, BookMarked, ShieldCheck, Network, Building2 } from 'lucide-react'
import { GhostBadge, SourceChip, StatusBadge, TypeChip } from '@/components/site/ui'
import { ReportedNotes, Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References, Hatnote, CitePage, PageInformation, Navbox, WhatThisLinks, PageTools } from '@/components/site/wiki'
import { factions } from '@/lib/content'
import { reportedFor, REPORTED_SOURCE } from '@/lib/reported'
import { factionIdentity, identityAttributes } from '@/lib/entity-identity'
import { factionBible } from '@/lib/faction-bible'

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
  const identity = factionIdentity(f)
  const bible = factionBible(f)

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'evidence', label: 'Evidence & identity', icon: ShieldCheck },
    { id: 'ecosystem', label: 'Territory & ecosystem', icon: MapPin },
    { id: 'networks', label: 'Related networks', icon: Network },
    ...(f.confirmed?.length > 0 ? [{ id: 'confirmed', label: 'Confirmed', icon: BadgeCheck }] : []),
    ...(f.unknown?.length > 0 ? [{ id: 'unknown', label: 'Not Published', icon: HelpCircle }] : []),
    { id: 'related', label: 'Other Factions', icon: Users },
    { id: 'references', label: 'References', icon: BookMarked },
  ]

  return (
    <div {...identityAttributes(identity)} className="entity-identity ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Factions', href: '/gangs-factions' }, { label: f.name }]} />

      <header className="wiki-article-header mt-5">
        <div className="wiki-article-meta flex flex-wrap items-center gap-2">
          <StatusBadge status={f.status} />
          <TypeChip>{f.kind}</TypeChip>
          <span className="faction-evidence-chip font-mono text-[9px] uppercase tracking-[0.1em]">{bible.evidenceLevel}</span>
        </div>
        <h1 data-ghost="FACTIONS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[46px] sm:text-[60px] mt-2">{f.name}</h1>
        <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]"><WikiText exclude={`/gangs-factions/${f.slug}`}>{f.desc}</WikiText></p>
        <StubNotice kind="factions" slug={f.slug} />
          <Hatnote kind="factions" slug={f.slug} />
      </header>

      <PageTools kind="factions" slug={f.slug} />

      <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
        <div id="article-content" className="wiki-entry-primary wiki-article-body min-w-0 order-3 lg:order-1">
          <WikiSection id="overview" title="Overview">
            <p className="text-dim text-[14px] leading-[1.8]"><WikiText exclude={`/gangs-factions/${f.slug}`}>{f.desc}</WikiText></p>
          </WikiSection>

          <WikiSection id="evidence" title="Evidence & identity">
            <div className="faction-bible-fact-grid">
              <article className="faction-bible-tier-card">
                <ShieldCheck size={18} aria-hidden="true" />
                <span>Archive evidence tier</span>
                <strong>{bible.evidenceLevel}</strong>
                <p>{bible.nameState}</p>
              </article>
              <dl>
                <div><dt>Type</dt><dd>{bible.category}</dd></div>
                <div><dt>Founded</dt><dd>{bible.founded}</dd></div>
                <div><dt>Identity</dt><dd>{bible.identity}</dd></div>
                <div><dt>Known members</dt><dd>{bible.members}</dd></div>
              </dl>
            </div>
            <div className="faction-evidence-strip" aria-label="Faction appearance evidence strip">
              <div className="faction-evidence-strip-heading"><span>Appearance evidence strip</span><small>Name, image and context are separate signals</small></div>
              <div className="faction-evidence-strip-items">
                {bible.appearances.map(([label, detail, level]) => <div key={`${label}-${detail}`}><b>{label}</b><p>{detail}</p><span data-level={level}>{level}</span></div>)}
              </div>
            </div>
            <p className="faction-bible-disclaimer">A group can be visible in official media without Rockstar publishing a formal gang name, hierarchy or territory. Development material is never upgraded to confirmed by repetition.</p>
          </WikiSection>

          <WikiSection id="ecosystem" title="Territory & criminal ecosystem">
            <div className="faction-bible-data-grid">
              {[
                ['Primary area', bible.area],
                ['Headquarters / base', bible.headquarters],
                ['Criminal activity', bible.activities],
                ['Leadership', bible.leadership],
                ['Vehicles', bible.vehicles],
                ['Weapons', bible.weapons],
                ['Relationships', bible.relationships],
              ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </div>
            <div className="faction-bible-system-note"><Building2 size={17} aria-hidden="true" /><p><strong>Classification rule:</strong> Lusorae records gangs, criminal networks, businesses, media organisations and social clubs as different entity types even when their worlds overlap.</p></div>
          </WikiSection>

          <WikiSection id="networks" title="Related networks & organisations">
            <p className="text-dim text-[13px] leading-relaxed mb-3">These records are deliberately contextual. They are not silently promoted to “gang” status because they share characters, locations or criminal activity.</p>
            <div className="faction-network-grid">
              {bible.networks.map(([name, type, copy, level]) => <article key={name}><div><h3>{name}</h3><span>{type}</span></div><p>{copy}</p><b data-level={level}>{level}</b></article>)}
            </div>
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
          <ReportedNotes items={reportedFor('faction', f.slug)} source={REPORTED_SOURCE} />
          <References items={[{ name: f.sourceName, url: f.sourceUrl }]} />
          <CategoryFooter kind="factions" slug={f.slug} />
            <CitePage kind="factions" slug={f.slug} />
            <PageInformation kind="factions" slug={f.slug} />
            <Navbox kind="factions" slug={f.slug} />
        </div>

        <div className="wiki-entry-tertiary order-1 lg:order-2">
          <TableOfContents sections={sections} />
        </div>

        <div className="wiki-entry-secondary order-2 lg:order-3">
          <InfoboxShell title={f.name} subtitle="Faction profile">
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
              <InfoRow label="Evidence">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{f.evidenceStatus}</span>
              </InfoRow>
            </div>

            <div className="border-t border-black/10 pt-4">
              <SourceChip name={f.sourceName} url={f.sourceUrl} />
            </div>
            <WhatLinksHere kind="factions" slug={f.slug} />
              <WhatThisLinks kind="factions" slug={f.slug} />
          </InfoboxShell>
        </div>
      </div>
    </div>
  )
}
