'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink, ChevronRight, MapPin } from 'lucide-react'
import { locations, regions, mapFilters } from '@/lib/content'
import { StatusBadge } from '@/components/site/ui'

export default function LocationPage() {
  const { slug } = useParams()
  const loc = locations.find((item) => item.slug === slug)

  if (!loc) {
    return <div className="px-6 py-20 text-paper">Location not found.</div>
  }

  const region = regions.find((r) => r.id === loc.region)
  const categoryLabel = (mapFilters.find((f) => f.id === loc.category) || {}).label || loc.category
  const related = locations.filter((item) => item.region === loc.region && item.slug !== loc.slug)

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[900px] w-full mx-auto">
      <Link href={`/map/${loc.region}`} className="inline-flex items-center gap-2 min-h-11 font-cond uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper">
        <ArrowLeft size={15} /> Back to {region ? region.label : 'region'}
      </Link>

      <header className="mt-6">
        <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-pink">Named location</p>
        <h1 data-ghost="MAP" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase leading-[0.9] tracking-tight text-[52px] sm:text-[64px] text-paper">{loc.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={loc.status} />
          <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{categoryLabel}</span>
          {region && <span className="font-cond uppercase tracking-[0.1em] text-[12px] text-dim">{region.label}</span>}
        </div>
      </header>

      <div className="corner-brackets tech-mask relative mt-6 overflow-hidden aspect-[16/9] bg-raised scanlines vignette">
        {loc.image ? (
          <Image src={loc.image} alt={loc.name} fill priority sizes="900px" className="object-cover" />
        ) : (
          <span className="flex flex-col items-center justify-center gap-2 w-full h-full bg-surface2/60 text-dim" role="img" aria-label={`${loc.name}: visual pending`}>
            <MapPin size={30} aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]">AWAITING VISUAL</span>
          </span>
        )}
      </div>

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[13px] text-mint border-b border-line pb-2">OVERVIEW</h2>
        <p className="mt-4 text-[15px] leading-[1.85] text-paper/90 max-w-[68ch]">{loc.desc}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[13px] text-dim border-b border-line pb-2">SOURCE</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href={loc.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
            {loc.sourceName.toUpperCase()} <ExternalLink size={11} />
          </a>
          <span className="font-mono text-[10px] text-dim uppercase">UPDATED {loc.updatedAt}</span>
        </div>
      </section>

      {related.length > 0 && region && (
        <section className="mt-10">
          <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[13px] text-dim border-b border-line pb-2">ALSO IN {region.label}</h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/map/location/${item.slug}`}
                className="panel rounded-sm p-2 flex flex-col hover:border-white/30 transition-colors">
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
        </section>
      )}
    </div>
  )
}
