'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { regions, locations } from '@/lib/content'
import { GhostBadge } from '@/components/site/ui'

export default function RegionPage() {
  const { slug } = useParams()
  const region = regions.find((item) => item.id === slug)
  const [slide, setSlide] = useState(0)

  if (!region) {
    return <div className="px-6 py-20 text-paper">Region not found.</div>
  }

  const gallery = region.gallery?.length ? region.gallery : [region.image]
  const entries = locations.filter((item) => item.region === region.id)
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1440px] w-full mx-auto">
      <Link href="/map" className="inline-flex items-center gap-2 min-h-11 font-cond uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper">
        <ArrowLeft size={15} /> Back to Leonida map
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-pink">Region dossier</p>
        <h1 data-ghost="LEONIDA" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase leading-[0.9] tracking-tight text-[52px] sm:text-[76px] text-paper">{region.label}</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-dim">{region.blurb}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <GhostBadge status={region.sourced ? 'confirmed' : 'analysis'} label={region.sourced ? 'Officially named' : 'Image-based archive note'} />
          <span className="font-mono text-[11px] text-dim">{entries.length} DOCUMENTED ENTRIES</span>
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="panel2 rounded-sm p-3">
            <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">County reference</p>
            <p className="mt-1 font-cond font-semibold text-[16px] text-paper">{region.county}</p>
          </div>
          <div className="panel2 rounded-sm p-3">
            <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Named places</p>
            <p className="mt-1 font-cond font-semibold text-[16px] text-paper">{region.knownPlaces.join(' · ')}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="panel2 rounded-sm p-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Official type</p><p className="mt-1 font-cond font-semibold text-[14px] text-paper">{region.officialType}</p></div>
          <div className="panel2 rounded-sm p-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Environment</p><p className="mt-1 font-cond font-semibold text-[14px] text-paper">{region.environment}</p></div>
          <div className="panel2 rounded-sm p-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Official theme</p><p className="mt-1 font-cond font-semibold text-[14px] text-paper">{region.theme}</p></div>
        </div>
        <div className="mt-3 border border-mint/25 bg-mint/[0.03] rounded-sm p-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Confirmed associations</p><p className="mt-1 text-[12px] text-dim">{region.activities.join(' · ')}</p></div>
      </header>

      <div className="data-rail mt-8">REGION DOSSIER · NAMED PLACES · ARCHIVE VISUALS</div>
      <section className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5">
        <div className="corner-brackets tech-mask glass-panel panel overflow-hidden">
          <div className="relative aspect-[16/9] bg-surface2">
            <Image src={gallery[slide]} alt={`${region.label} — image ${slide + 1}`} fill priority sizes="(max-width: 1024px) 100vw, 900px" className="object-cover" />
            <button type="button" onClick={() => setSlide((slide - 1 + gallery.length) % gallery.length)} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-11 h-11 flex items-center justify-center text-paper hover:border-white/50"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => setSlide((slide + 1) % gallery.length)} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 panel2 rounded-full w-11 h-11 flex items-center justify-center text-paper hover:border-white/50"><ArrowRight size={17} /></button>
            <span className="absolute bottom-3 right-3 panel2 rounded-sm px-2.5 py-1.5 font-mono text-[11px] text-dim">{slide + 1} / {gallery.length}</span>
          </div>
          <div className="p-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {gallery.map((image, index) => (
              <button key={image} type="button" onClick={() => setSlide(index)} aria-label={`Open image ${index + 1}`} className={`relative aspect-video overflow-hidden border ${index === slide ? 'border-pink' : 'border-line opacity-65 hover:opacity-100'}`}>
                <Image src={image} alt="" fill sizes="140px" className="object-cover" />
              </button>
            ))}
          </div>
          <p className="px-3 pb-3 flex items-center gap-2 font-cond uppercase tracking-[0.12em] text-[10px] text-dim"><ImageIcon size={13} /> Official media associated with this region; image placement is not a published game map.</p>
        </div>

        <aside className="tech-mask glass-panel panel p-5 self-start">
          <h2 className="font-cond font-bold uppercase tracking-[0.14em] text-[18px] text-paper">What is documented</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-dim">Only information present in the archive is shown here. Unannounced geography and exact positions are not treated as official.</p>
          <div className="mt-5 grid grid-cols-1 gap-2">
            {entries.map((entry) => (
              <Link key={entry.slug} href={`/map/location/${entry.slug}`}
                className="panel rounded-sm px-3 h-11 flex items-center justify-between gap-2 hover:border-white/30 transition-colors">
                <span className="font-cond font-semibold uppercase tracking-[0.06em] text-[13px] text-paper truncate">{entry.name}</span>
                <ChevronRight size={13} className="text-dim shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <div className="mt-5 border-t border-line pt-4">
            <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Source note</p>
            <p className="mt-1 text-[12px] leading-relaxed text-dim">Only Rockstar-named places are listed. The visual arrangement is an archive index, not an official map or boundary layout.</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
