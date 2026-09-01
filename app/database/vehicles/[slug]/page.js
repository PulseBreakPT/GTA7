'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Heart, Zap, Eye, CircleDot, ExternalLink } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, cx } from '@/components/site/ui'
import { vehicles, vehicleClasses } from '@/lib/content'
import Image from 'next/image'
import { Car } from 'lucide-react'

function App() {
  const { slug } = useParams()
  const v = vehicles.find((x) => x.slug === slug)
  const [favs, setFavs] = useState([])

  useEffect(() => {
    try { setFavs(JSON.parse(localStorage.getItem('la:favs') || '[]')) } catch { /* noop */ }
  }, [])

  if (!v) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/vehicles" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO GARAGE</Link>
      </div>
    )
  }

  const isFav = favs.includes(v.slug)
  const toggleFav = () => {
    const next = isFav ? favs.filter((s) => s !== v.slug) : [...favs, v.slug]
    setFavs(next)
    localStorage.setItem('la:favs', JSON.stringify(next))
  }

  const stats = [
    { icon: Heart, label: 'SPEED', value: v.stats[0], color: '#F1A3C3' },
    { icon: Zap, label: 'ACCELERATION', value: v.stats[1], color: '#65DCCB' },
    { icon: Eye, label: 'BRAKING', value: v.stats[2], color: '#9B83F4' },
    { icon: CircleDot, label: 'HANDLING', value: v.stats[3], color: '#F5F4F0' },
  ]
  const related = vehicles.filter((x) => x.cls === v.cls && x.slug !== v.slug).slice(0, 4)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="vehicles" />
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto">
        <Link href="/database/vehicles" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
          <ArrowLeft size={15} /> GARAGE
        </Link>

        <div className="data-rail mt-2">GARAGE INDEX · REFERENCE RECORD · UNIT {v.num}</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mt-5">
          <div className="corner-brackets tech-mask glass-panel relative panel overflow-hidden aspect-[16/10]">
            {v.image ? (
              <Image src={v.image} alt={v.name} fill priority sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
            ) : (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim">
                <Car size={40} aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em]">AWAITING VISUAL</span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{(vehicleClasses.find((c) => c.id === v.cls) || {}).label || v.cls}</span>
              <StatusBadge status={v.status} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{v.evidenceStatus}</span>
            </div>
            <h1 data-ghost="GARAGE" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.92] text-[46px] sm:text-[56px] mt-2">{v.name}</h1>
            {v.association && (
              <div className="mt-4 border-l-2 border-mint/70 pl-3">
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Association / content</p>
                <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{v.association}</p>
              </div>
            )}
            <div className="mt-3 border-l-2 border-violet/70 pl-3">
              <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Manufacturer / brand</p>
              <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{v.manufacturer}</p>
            </div>
            {v.character && <div className="mt-3 border-l-2 border-pink/70 pl-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Character</p><p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{v.character}</p></div>}

            {v.unpublished ? (
              <div className="mt-5 border border-line rounded-sm p-4">
                <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Performance not published</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-dim">Rockstar has named this vehicle but has not released speed, acceleration, braking or handling figures.</p>
              </div>
            ) : <div className="mt-5 flex flex-col gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: s.color }} aria-hidden="true"><s.icon size={14} /></span>
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px] sm:text-[13px] text-paper w-[82px] sm:w-[110px] shrink-0">{s.label}</span>
                  <span className="relative flex-1 h-[7px] bg-white/10" role="img" aria-label={`${s.label}: ${s.value} of 100`}>
                    <span className="absolute inset-y-0 left-0" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                  </span>
                  <span className="font-mono text-[12px] text-dim tabular-nums w-8 text-right">{s.value}</span>
                </div>
              ))}
            </div>}

            <div className="mt-5 flex flex-wrap gap-2">
              {v.specs.map((s, i) => <span key={i} className="panel2 rounded-sm px-2.5 py-1.5 font-cond uppercase text-[12px] tracking-[0.1em] text-paper">{s}</span>)}
            </div>

            <button type="button" onClick={toggleFav} aria-pressed={isFav} className={cx('mt-5 inline-flex items-center gap-2 border h-12 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[14px] transition-colors', isFav ? 'border-pink text-pink' : 'border-line text-paper hover:border-white/50')}>
              <Heart size={15} fill={isFav ? '#F1A3C3' : 'transparent'} />
              {isFav ? 'IN YOUR COLLECTION' : 'ADD TO FAVOURITES'}
            </button>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a href={v.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
                SOURCE: {v.sourceName.toUpperCase()} <ExternalLink size={11} />
              </a>
              <span className="font-mono text-[10px] text-dim uppercase">UPDATED {v.updatedAt}</span>
            </div>
            {(v.confirmedDetails?.length > 0 || v.notPublished?.length > 0) && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {v.confirmedDetails?.length > 0 && <section className="border border-mint/25 bg-mint/[0.03] p-3 rounded-sm"><h2 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-mint">Officially confirmed</h2><ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{v.confirmedDetails.map((detail) => <li key={detail}>• {detail}</li>)}</ul></section>}
                {v.notPublished?.length > 0 && <section className="border border-line bg-surface2/40 p-3 rounded-sm"><h2 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Not officially specified</h2><ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{v.notPublished.map((detail) => <li key={detail}>• {detail}</li>)}</ul></section>}
              </div>
            )}
          </div>
        </div>

        {/* Havia aqui um «WHERE TO FIND» com minimapa. O traçado era literal e
            igual para todos os veículos, e o texto dava sítios de spawn e
            distâncias de um jogo que ainda não saiu. Era invenção apresentada
            como levantamento de campo, e sai. */}
        <div className="data-rail mt-12">FIELD REFERENCE · RELATED UNITS</div>
        <div className="grid grid-cols-1 gap-6 mt-5">
          {related.length > 0 && (
            <div>
              <h2 className="font-cond font-semibold uppercase tracking-[0.16em] text-[13px] text-paper">SAME CLASS</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/database/vehicles/${r.slug}`} className="panel rounded-sm p-3 hover:border-white/30 transition-colors">
                    <span className="font-mono text-[11px] text-dim tabular-nums">{r.num}</span>
                    <span className="block font-cond font-bold uppercase text-[16px] text-paper mt-1 truncate">{r.name}</span>
                    <StatusBadge status={r.status} className="mt-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
