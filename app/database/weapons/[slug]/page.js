'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink, MapPin, Heart, Zap, Eye, Target, Layers, Weight } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, GhostBadge } from '@/components/site/ui'
import { weapons, weaponTypes } from '@/lib/content'
import Image from 'next/image'
import { Crosshair } from 'lucide-react'

function App() {
  const { slug } = useParams()
  const w = weapons.find((x) => x.slug === slug)

  if (!w) {
    return (
      <div className="px-8 py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/weapons" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO ARSENAL</Link>
      </div>
    )
  }

  const typeLabel = weaponTypes.find((t) => t.id === w.type).label
  const bars = [
    { icon: Heart, label: 'DAMAGE', value: w.stats[0], color: '#F1A3C3' },
    { icon: Zap, label: 'FIRE RATE', value: w.stats[1], color: '#65DCCB' },
    { icon: Eye, label: 'ACCURACY', value: w.stats[2], color: '#9B83F4' },
    { icon: Target, label: 'RANGE', value: w.stats[3], color: '#F5F4F0' },
  ]
  const related = weapons.filter((x) => x.type === w.type && x.slug !== w.slug).slice(0, 4)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="weapons" />
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto">
        <Link href="/database/weapons" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
          <ArrowLeft size={15} /> ARSENAL
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 mt-2">
          <div className="relative panel rounded-sm overflow-hidden min-h-[320px]">
            {w.image ? (
              <>
                <Image src={w.image} alt={w.name} fill sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
                <span className="absolute inset-0 bg-ink/30" />
              </>
            ) : (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim">
                <Crosshair size={40} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]">CLASSIFIED — VISUAL PENDING</span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <StatusBadge status={w.status} />
              <GhostBadge status="analysis" label={typeLabel} />
            </div>
            <h1 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.92] text-[48px] sm:text-[58px] mt-2">{w.name}</h1>
            <p className="text-dim text-[14px] leading-relaxed mt-3">{w.desc}</p>

            <div className="mt-5 flex flex-col gap-3">
              {bars.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: b.color }} aria-hidden="true"><b.icon size={14} /></span>
                  <span className="font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-paper w-[84px] shrink-0">{b.label}</span>
                  <span className="relative flex-1 h-[7px] bg-white/10" role="img" aria-label={`${b.label}: ${b.value} of 100`}>
                    <span className="absolute inset-y-0 left-0" style={{ width: `${b.value}%`, backgroundColor: b.color }} />
                  </span>
                  <span className="font-mono text-[12px] text-dim tabular-nums w-8 text-right">{b.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 border-y hairline divide-x divide-[rgba(255,255,255,0.16)]">
              {[['CAPACITY', w.stats[4], Layers], ['RESERVE', w.mag, Layers], ['WEIGHT', `${w.stats[5]} KG`, Weight]].map(([label, val]) => (
                <div key={label} className="py-3 text-center">
                  <span className="block font-cond text-[10px] text-dim uppercase tracking-[0.18em]">{label}</span>
                  <span className="block font-cond font-bold text-[26px] text-paper tabular-nums mt-0.5">{val}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href={w.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
                SOURCE: {w.sourceName.toUpperCase()} <ExternalLink size={11} />
              </a>
              <span className="font-mono text-[10px] text-dim uppercase">UPDATED {w.updatedAt}</span>
            </div>

            <h2 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim mt-5">APPEARS IN</h2>
            <div className="mt-2 flex flex-col gap-2">
              {w.locations.map((loc) => (
                <Link key={loc} href="/map" className="flex items-center gap-3 border border-line rounded-sm px-3 h-11 hover:border-white/40 transition-colors">
                  <MapPin size={14} className="text-pink" aria-hidden="true" />
                  <span className="text-[13px] text-paper">{loc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-10" aria-label="Related weapons">
            <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper border-b hairline pb-2">SAME RACK</h2>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/database/weapons/${r.slug}`} className="shrink-0 w-[180px] panel rounded-sm p-3 hover:border-white/30 transition-colors">
                  <GhostBadge status={r.status} />
                  <span className="block font-cond font-bold uppercase text-[16px] text-paper mt-2 truncate">{r.name}</span>
                  <span className="block font-mono text-[11px] text-dim tabular-nums mt-1">{String(r.ammo).padStart(2,'0')} / {r.mag}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default App;
