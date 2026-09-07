'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ChevronRight, Image as ImageIcon, FileText, Images, MapPin, AlertTriangle } from 'lucide-react'
import { regions, locations, confirmedLocationImage } from '@/lib/content'
import { GhostBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, LocationLocator, LocationThumb, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References, PageTools, CitePage, PageInformation, Navbox, ShortDescription, Hatnote, WhatThisLinks } from '@/components/site/wiki'
import { RecordNotFound } from '@/components/site/wiki-entry'

export default function RegionPage() {
  const { slug } = useParams()
  const region = regions.find((item) => item.id === slug)
  const [slide, setSlide] = useState(0)

  if (!region) {
    return <RecordNotFound backHref="/map" backLabel="BACK TO THE MAP" />
  }

  const gallery = region.gallery?.length ? region.gallery : [region.image]
  const entries = locations.filter((item) => item.region === region.id)

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'gallery', label: 'Gallery', icon: Images },
    ...(entries.length > 0 ? [{ id: 'places', label: 'Named Places', icon: MapPin }] : []),
    ...(region.notPublished?.length > 0 ? [{ id: 'not-published', label: 'Not Published', icon: AlertTriangle }] : []),
  ]

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Locations', href: '/map' }, { label: region.label }]} />

      {/* Cabeçalho fora da grelha: o nome vem antes da caixa de dados em
          qualquer largura, como nas fichas das wikis. */}
      <header className="wiki-article-header mt-5">
        <h1 data-ghost="LEONIDA" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase leading-[0.9] tracking-tight text-[38px] sm:text-[52px] xl:text-[64px] text-paper">{region.label}</h1>
        <p className="mt-5 text-[16px] leading-relaxed text-paper/85 max-w-[68ch]"><WikiText exclude={`/map/${region.id}`}>{region.blurb}</WikiText></p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <GhostBadge status={region.sourced ? 'confirmed' : 'analysis'} label={region.sourced ? 'Officially named' : 'Image-based archive note'} />
          <span className="font-mono text-[11px] text-dim">{entries.length} DOCUMENTED ENTRIES</span>
        </div>
        <ShortDescription>Region of Leonida in Grand Theft Auto VI · {entries.length} documented entries</ShortDescription>
        <StubNotice kind="regions" slug={region.id} />
        <Hatnote kind="regions" slug={region.id} />
      </header>

      <PageTools kind="regions" slug={region.id} />

      <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px_300px] gap-8">
        {/* Corpo do artigo */}
        <div className="wiki-article-body min-w-0 order-3 lg:order-1">
          <WikiSection id="overview" title="Overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="panel2 rounded-sm p-3">
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">County reference</p>
                <p className="mt-1 font-cond font-semibold text-[16px] text-paper">{region.county}</p>
              </div>
              <div className="panel2 rounded-sm p-3">
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Named places</p>
                <p className="mt-1 font-cond font-semibold text-[16px] text-paper">{region.knownPlaces.join(' · ')}</p>
              </div>
            </div>
            <div className="mt-3 border border-mint/25 bg-mint/[0.03] rounded-sm p-3">
              <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Confirmed associations</p>
              <p className="mt-1 text-[12px] text-dim">{region.activities.join(' · ')}</p>
            </div>
          </WikiSection>

          <WikiSection id="gallery" title="Gallery">
            <div className="corner-brackets tech-mask panel overflow-hidden">
              <div className="relative aspect-[16/9] bg-surface2">
                <Image src={gallery[slide]} alt={`${region.label} — image ${slide + 1}`} fill priority sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
                {gallery.length > 1 && (
                  <>
                    <button type="button" onClick={() => setSlide((slide - 1 + gallery.length) % gallery.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-11 h-11 flex items-center justify-center text-paper hover:border-black/50"><ArrowLeft size={17} /></button>
                    <button type="button" onClick={() => setSlide((slide + 1) % gallery.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-11 h-11 flex items-center justify-center text-paper hover:border-black/50"><ArrowRight size={17} /></button>
                  </>
                )}
                <span className="absolute bottom-3 right-3 panel2 rounded-sm px-2.5 py-1.5 font-mono text-[11px] text-dim">{slide + 1} / {gallery.length}</span>
              </div>
              {gallery.length > 1 && (
                <div className="p-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {gallery.map((image, index) => (
                    <button key={image} type="button" onClick={() => setSlide(index)} aria-label={`Open image ${index + 1}`} className={`relative aspect-video overflow-hidden border ${index === slide ? 'border-pink' : 'border-line opacity-65 hover:opacity-100'}`}>
                      <Image src={image} alt="" fill sizes="140px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <p className="px-3 pb-3 pt-2 flex items-center gap-2 font-cond uppercase tracking-[0.12em] text-[10px] text-dim"><ImageIcon size={13} /> Official media associated with this region; image placement is not a published game map.</p>
            </div>
          </WikiSection>

          {entries.length > 0 && (
            <WikiSection id="places" title="Named Places">
              <p className="text-[13px] leading-relaxed text-dim mb-4 max-w-[68ch]">
                Only information present in the archive is shown here. Unannounced geography and exact positions are not treated as official.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {entries.map((entry) => (
                  <Link key={entry.slug} href={`/map/location/${entry.slug}`}
                    className="panel rounded-sm p-2 flex flex-col hover:border-black/30 transition-colors">
                    <LocationThumb image={confirmedLocationImage(entry)} fallbackImage={region.image} name={entry.name} className="h-[84px] w-full rounded-[2px]" />
                    <span className="flex items-center justify-between gap-1 mt-2">
                      <span className="font-cond font-semibold uppercase tracking-[0.06em] text-[12px] text-paper truncate">{entry.name}</span>
                      <ChevronRight size={12} className="text-dim shrink-0" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </WikiSection>
          )}

          {region.notPublished?.length > 0 && (
            <WikiSection id="not-published" title="Not Published" className="mb-0">
              <div className="border border-line bg-surface2/40 p-4 rounded-sm">
                <ul className="space-y-1.5 text-[13px] leading-relaxed text-dim">
                  {region.notPublished.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </WikiSection>
          )}
          <References items={[{ name: 'Rockstar Games · GTA VI Official Site', url: 'https://www.rockstargames.com/VI' }]} />
          <CategoryFooter kind="regions" slug={region.id} />
          <CitePage kind="regions" slug={region.id} />
          <PageInformation kind="regions" slug={region.id} />
          <Navbox kind="regions" slug={region.id} />
        </div>

        {/* Índice */}
        <div className="order-1 lg:order-2">
          <TableOfContents sections={sections} />
        </div>

        {/* Caixa de dados */}
        <div className="order-2 lg:order-3">
          <InfoboxShell>
            <LocationLocator image={region.image} name={region.label} sourceLabel="OFFICIAL ROCKSTAR REGION ARTWORK" />

            <div className="space-y-3 border-t border-black/10 pt-4">
              <InfoRow label="Official type" value={region.officialType} />
              <InfoRow label="Environment" value={region.environment} />
              <InfoRow label="Official theme" value={region.theme} />
              <InfoRow label="County" value={region.county} />
              <InfoRow label="Documented entries" value={String(entries.length)} />
              <InfoRow label="Visual directory">
                <Link href="/map" className="text-mint hover:text-paper transition-colors">Open places directory</Link>
              </InfoRow>
            </div>

            <div className="border-t border-black/10 pt-4">
              <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Source note</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-dim">Only Rockstar-named places are listed. Every visual is published GTA VI media; contextual region images are labelled and never presented as an exact location.</p>
            </div>
            <WhatLinksHere kind="regions" slug={region.id} />
            <WhatThisLinks kind="regions" slug={region.id} />
          </InfoboxShell>
        </div>
      </div>
    </div>
  )
}
