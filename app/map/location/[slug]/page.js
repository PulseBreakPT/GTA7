'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ExternalLink, ChevronRight, MapPin, FileText, Images, Compass, BookMarked } from 'lucide-react'
import { locations, regions, mapFilters } from '@/lib/content'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, LocationLocator, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References } from '@/components/site/wiki'

export default function LocationPage() {
  const { slug } = useParams()
  const loc = locations.find((item) => item.slug === slug)

  if (!loc) {
    return <div className="px-6 py-20 text-paper">Location not found.</div>
  }

  const region = regions.find((r) => r.id === loc.region)
  const categoryLabel = (mapFilters.find((f) => f.id === loc.category) || {}).label || loc.category
  const related = locations.filter((item) => item.region === loc.region && item.slug !== loc.slug)

  // As secções seguem a ficha de sítio das wikis: descrição, imagem, e o
  // que fica à volta. «Nearby» só entra no índice se houver vizinhos.
  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'visual', label: 'Visual Record', icon: Images },
    ...(related.length > 0 && region ? [{ id: 'nearby', label: 'Nearby', icon: Compass }] : []),
    { id: 'references', label: 'References', icon: BookMarked },
  ]

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/map' }, ...(region ? [{ label: region.label, href: `/map/${region.id}` }] : []), { label: loc.name }]} />

      <header className="mt-6">
        <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-pink">Named location</p>
        <h1 data-ghost="MAP" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase leading-[0.9] tracking-tight text-[52px] sm:text-[64px] text-paper">{loc.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={loc.status} />
          <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{categoryLabel}</span>
          {region && <span className="font-cond uppercase tracking-[0.1em] text-[12px] text-dim">{region.label}</span>}
        </div>
        <StubNotice kind="locations" slug={loc.slug} />
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
        {/* Corpo do artigo */}
        <div className="min-w-0 order-2 lg:order-1">
          <WikiSection id="overview" title="Overview">
            <p className="text-[15px] leading-[1.85] text-paper/90 max-w-[68ch]"><WikiText exclude={`/map/location/${loc.slug}`}>{loc.desc}</WikiText></p>
          </WikiSection>

          <WikiSection id="visual" title="Visual Record">
            <div className="corner-brackets tech-mask relative overflow-hidden aspect-[16/9] bg-raised scanlines vignette">
              {loc.image ? (
                <Image src={loc.image} alt={loc.name} fill priority sizes="(max-width:1024px) 100vw, 700px" className="object-cover" />
              ) : (
                <span className="flex flex-col items-center justify-center gap-2 w-full h-full bg-surface2/60 text-dim" role="img" aria-label={`${loc.name}: visual pending`}>
                  <MapPin size={30} aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em]">AWAITING VISUAL</span>
                </span>
              )}
            </div>
          </WikiSection>

          {related.length > 0 && region && (
            <WikiSection id="nearby" title={`Also in ${region.label}`} className="mb-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((item) => (
                  <Link key={item.slug} href={`/map/location/${item.slug}`}
                    className="panel rounded-sm p-2 flex flex-col hover:border-black/30 transition-colors">
                    {item.image ? (
                      <span className="relative block h-[84px] w-full rounded-[2px] overflow-hidden">
                        <Image src={item.image} alt={item.name} fill sizes="200px" className="object-cover" />
                      </span>
                    ) : (
                      <span className="flex items-center justify-center h-[84px] w-full rounded-[2px] bg-surface2/60 text-dim">
                        <MapPin size={20} aria-hidden="true" />
                      </span>
                    )}
                    <span className="flex items-center justify-between gap-1 mt-2">
                      <span className="font-cond font-semibold uppercase tracking-[0.06em] text-[12px] text-paper truncate">{item.name}</span>
                      <ChevronRight size={12} className="text-dim shrink-0" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </WikiSection>
          )}
          <References items={[{ name: loc.sourceName, url: loc.sourceUrl, retrieved: loc.updatedAt }]} />
          <CategoryFooter kind="locations" slug={loc.slug} />
        </div>

        {/* Índice */}
        <div className="hidden lg:block order-3 lg:order-2">
          <TableOfContents sections={sections} />
        </div>

        {/* Caixa de dados */}
        <div className="order-1 lg:order-3">
          <InfoboxShell>
            <LocationLocator x={loc.x} y={loc.y} name={loc.name} />

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
              <InfoRow label="On the map">
                <Link href={`/map?loc=${loc.slug}`} className="text-mint hover:text-paper transition-colors">Open in interactive map</Link>
              </InfoRow>
            </div>

            <div className="border-t border-black/10 pt-4">
              <a href={loc.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors">
                {loc.sourceName.toUpperCase()} <ExternalLink size={11} />
              </a>
              <p className="font-mono text-[9px] text-dim mt-2">Updated {loc.updatedAt}</p>
            </div>
            <WhatLinksHere kind="locations" slug={loc.slug} />
          </InfoboxShell>
        </div>
      </div>
    </div>
  )
}
