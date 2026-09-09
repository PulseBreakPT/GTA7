'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Radio as RadioIcon, ChevronRight, FileText, Music, ListMusic, BookMarked } from 'lucide-react'
import { GhostBadge, SourceChip, StatusBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoGrid, EntityHero, UserActions, InfoboxShell, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References, Hatnote, CitePage, PageInformation, Navbox, WhatThisLinks, PageTools } from '@/components/site/wiki'
import { radioStations } from '@/lib/content'

export default function RadioStationPage() {
  const { slug } = useParams()
  const s = radioStations.find((x) => x.slug === slug)

  if (!s) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/radio" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO THE DIAL</Link>
      </div>
    )
  }

  const related = radioStations.filter((x) => x.slug !== s.slug && x.genre === s.genre).slice(0, 4)
  const fallbackRelated = related.length > 0 ? related : radioStations.filter((x) => x.slug !== s.slug).slice(0, 4)

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    ...(s.tracks?.length > 0 ? [{ id: 'tracklist', label: 'Reported Tracks', icon: Music }] : []),
    { id: 'related', label: 'Other Stations', icon: ListMusic },
    { id: 'references', label: 'References', icon: BookMarked },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Radio', href: '/database/radio' }, { label: s.name }]} />

        <header className="wiki-article-header mt-5">
          <div className="wiki-article-meta flex flex-wrap items-center gap-2">
            <StatusBadge status={s.status} />
            <GhostBadge status="confirmed" label={s.genre} />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{s.evidenceStatus}</span>
          </div>
          <h1 data-ghost="RADIO" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[46px] sm:text-[60px] mt-2">{s.name}</h1>
          <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]"><WikiText exclude={`/database/radio/${s.slug}`}>{s.desc}</WikiText></p>
          <StubNotice kind="radio" slug={s.slug} />
          <Hatnote kind="radio" slug={s.slug} />
        </header>

        <div className="wiki-entry-lede">
          <EntityHero>
            <div className="relative aspect-[16/9] overflow-hidden bg-surface2/60">
              {s.image ? <Image src={s.image} alt={s.imageAlt || ''} fill sizes="(max-width: 640px) 100vw, 560px" priority className="object-cover" /> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim"><RadioIcon size={26} strokeWidth={1.4} aria-hidden="true" /><span className="font-mono text-[8px] uppercase tracking-[0.14em]">No official image</span></div>}
            </div>
          </EntityHero>
          <UserActions kind="radio" slug={s.slug} />
        </div>

        <PageTools kind="radio" slug={s.slug} />

        <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          <div id="article-content" className="wiki-entry-primary wiki-article-body min-w-0 order-3 lg:order-1">
            <WikiSection id="overview" title="Overview">
              <p className="text-dim text-[14px] leading-[1.8]"><WikiText exclude={`/database/radio/${s.slug}`}>{s.desc}</WikiText></p>
              <div className="mt-4 border-l-2 border-mint/70 pl-3">
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">How it is documented</p>
                <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{s.association}</p>
              </div>
            </WikiSection>

            {s.tracks?.length > 0 && (
              <WikiSection id="tracklist" title="Reported Tracks">
                <ol className="border border-line divide-y divide-black/[0.08]">
                  {s.tracks.map(([title, artist], i) => (
                    <li key={`${title}-${artist}`} className="flex items-center gap-4 px-4 py-3">
                      <span className="font-mono text-[11px] text-dim tabular-nums shrink-0 w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-cond font-semibold uppercase text-[14px] text-paper truncate">{title}</span>
                        <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5 truncate">{artist}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-3 text-[12px] leading-relaxed text-dim max-w-[68ch]">
                  These are evidence-bound reports, not a confirmed station playlist. A station with no entries here has had no music credibly associated with it.
                </p>
              </WikiSection>
            )}

            <WikiSection id="related" title="Other Stations" className="mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fallbackRelated.map((r) => (
                  <Link key={r.slug} href={`/database/radio/${r.slug}`} className="panel rounded-sm p-4 flex items-center gap-3 hover:border-black/30 transition-colors">
                    <RadioIcon size={20} className="text-dim shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-cond font-bold uppercase text-[16px] text-paper truncate">{r.name}</span>
                      <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{r.genre}</span>
                    </span>
                    <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </WikiSection>
            <References items={[{ name: s.sourceName, url: s.sourceUrl, retrieved: s.updatedAt }]} />
            <CategoryFooter kind="radio" slug={s.slug} />
            <CitePage kind="radio" slug={s.slug} />
            <PageInformation kind="radio" slug={s.slug} />
            <Navbox kind="radio" slug={s.slug} />
          </div>

          <div className="wiki-entry-tertiary order-1 lg:order-2">
            <TableOfContents sections={sections} />
          </div>

          <div className="wiki-entry-secondary order-2 lg:order-3">
            <InfoboxShell title={s.name} subtitle="Radio profile">
              <InfoGrid className="border-t border-black/10 pt-4">
                <InfoRow label="Genre" value={s.genre} />
                <InfoRow label="Status">
                  <StatusBadge status={s.status} />
                </InfoRow>
                <InfoRow label="Evidence">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{s.evidenceStatus}</span>
                </InfoRow>
                <InfoRow label="Documented tracks" value={String(s.tracks?.length || 0)} />
              </InfoGrid>

              <div className="border-t border-black/10 pt-4">
                <SourceChip name={s.sourceName} url={s.sourceUrl} />
                <p className="font-mono text-[9px] text-dim mt-2">Updated {s.updatedAt}</p>
              </div>
              <WhatLinksHere kind="radio" slug={s.slug} />
              <WhatThisLinks kind="radio" slug={s.slug} />
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}
