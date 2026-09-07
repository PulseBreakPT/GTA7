'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight, FileText, Images, Compass, BookMarked, Link2, ExternalLink} from 'lucide-react'
import { locations, regions, mapFilters, confirmedLocationImage } from '@/lib/content'
import { SourceChip, StatusBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, LocationLocator, LocationThumb, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References, Hatnote, CitePage, PageInformation, Navbox, WhatThisLinks, ShortDescription, PageTools, SeeAlso, ExternalLinks, LeadParagraph } from '@/components/site/wiki'
import { RecordNotFound } from '@/components/site/wiki-entry'

export default function LocationPage() {
  const { slug } = useParams()
  const loc = locations.find((item) => item.slug === slug)

  if (!loc) {
    return <RecordNotFound backHref="/map" backLabel="BACK TO THE MAP" />
  }

  const region = regions.find((r) => r.id === loc.region)
  const confirmedImage = confirmedLocationImage(loc)
  const categoryLabel = (mapFilters.find((f) => f.id === loc.category) || {}).label || loc.category
  const related = locations.filter((item) => item.region === loc.region && item.slug !== loc.slug)

  // As secções seguem a ficha de sítio das wikis: descrição, imagem, e o
  // que fica à volta. «Nearby» só entra no índice se houver vizinhos.
  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'visual', label: 'Visual Record', icon: Images },
    ...(related.length > 0 && region ? [{ id: 'nearby', label: 'Nearby', icon: Compass }] : []),
  { id: 'see-also', label: 'See also', icon: Link2 },
  { id: 'references', label: 'References', icon: BookMarked },
  { id: 'external-links', label: 'External links', icon: ExternalLink },
  ]

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/map' }, ...(region ? [{ label: region.label, href: `/map/${region.id}` }] : []), { label: loc.name }]} />

      <header className="wiki-article-header mt-6">
        <h1 data-ghost="PLACES" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase leading-[0.9] tracking-tight text-[38px] sm:text-[52px] xl:text-[64px] text-paper">{loc.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={loc.status} />
          <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{categoryLabel}</span>
          {region && <span className="font-cond uppercase tracking-[0.1em] text-[12px] text-dim">{region.label}</span>}
        </div>
        {/* A descrição do sítio estava só lá em baixo, na secção Overview:
            a ficha abria sem dizer do que trata. */}
        <LeadParagraph name={loc.name} exclude={`/map/location/${loc.slug}`}>{loc.desc}</LeadParagraph>
        <ShortDescription>
            Named place in {region ? region.label : 'Leonida'}{categoryLabel ? ` · ${categoryLabel}` : ''}
          </ShortDescription>
          <StubNotice kind="locations" slug={loc.slug} />
          <Hatnote kind="locations" slug={loc.slug} />
      </header>

      <PageTools kind="locations" slug={loc.slug} />

      <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px_300px] gap-8">
        {/* Corpo do artigo */}
        <div className="wiki-article-body min-w-0 order-3 lg:order-1">
          <WikiSection id="overview" title="Overview">
            <p className="text-[15px] leading-[1.85] text-paper/90 max-w-[68ch]"><WikiText exclude={`/map/location/${loc.slug}`}>{loc.desc}</WikiText></p>
          </WikiSection>

          <WikiSection id="visual" title="Visual Record">
            <div className="corner-brackets tech-mask relative overflow-hidden aspect-[16/9] bg-raised">
              <LocationThumb image={confirmedImage} fallbackImage={region?.image} name={loc.name} className="w-full h-full" priority />
            </div>
          </WikiSection>

          {related.length > 0 && region && (
            <WikiSection id="nearby" title={`Also in ${region.label}`} className="mb-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/map/location/${item.slug}`}
                    className="panel rounded-sm p-2 flex flex-col hover:border-black/30 transition-colors">
                    <LocationThumb image={confirmedLocationImage(item)} fallbackImage={region.image} name={item.name} className="h-[84px] w-full rounded-[2px]" />
                    <span className="flex items-center justify-between gap-1 mt-2">
                      <span className="font-cond font-semibold uppercase tracking-[0.06em] text-[12px] text-paper truncate">{item.name}</span>
                      <ChevronRight size={12} className="text-dim shrink-0" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </WikiSection>
          )}
          <SeeAlso kind="locations" slug={loc.slug} />
          <References items={[{ name: loc.sourceName, url: loc.sourceUrl, retrieved: loc.updatedAt }]} />
          <ExternalLinks kind="locations" slug={loc.slug} />
          <Navbox kind="locations" slug={loc.slug} />
          <CitePage kind="locations" slug={loc.slug} />
          <PageInformation kind="locations" slug={loc.slug} />
          <CategoryFooter kind="locations" slug={loc.slug} />
</div>

        {/* Índice */}
        <div className="order-1 lg:order-2">
          <TableOfContents sections={sections} />
        </div>

        {/* Caixa de dados */}
        <div className="order-2 lg:order-3">
          <InfoboxShell>
            <LocationLocator image={confirmedImage} fallbackImage={region?.image} name={loc.name} />

            <div className="space-y-3 border-t border-black/10 pt-4">
              <InfoRow label="Region">
                {region ? (
                  <Link href={`/map/${region.id}`} className="text-pink hover:text-paper transition-colors">{region.label}</Link>
                ) : loc.region}
              </InfoRow>
              <InfoRow label="Category" value={categoryLabel} />
              <InfoRow label="Status">
                <StatusBadge status={loc.status} />
              </InfoRow>
              <InfoRow label="Visual directory">
                <Link href={`/map?loc=${loc.slug}`} className="text-mint hover:text-paper transition-colors">Open in places directory</Link>
              </InfoRow>
            </div>

            <div className="border-t border-black/10 pt-4">
              <SourceChip name={loc.sourceName} url={loc.sourceUrl} prefix={null} />
              <p className="font-mono text-[9px] text-dim mt-2">Updated {loc.updatedAt}</p>
            </div>
            <WhatLinksHere kind="locations" slug={loc.slug} />
              <WhatThisLinks kind="locations" slug={loc.slug} />
          </InfoboxShell>
        </div>
      </div>
    </div>
  )
}
