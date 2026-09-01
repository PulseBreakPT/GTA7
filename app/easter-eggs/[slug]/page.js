'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, CircleCheck, Circle, MapPin, ExternalLink, Triangle } from 'lucide-react'
import { easterEggs } from '@/lib/content'
import { StatusBadge, cx } from '@/components/site/ui'

function App() {
  const { slug } = useParams()
  const egg = easterEggs.find((x) => x.slug === slug)

  if (!egg) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/map" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO THE MAP</Link>
      </div>
    )
  }

  const found = egg.clues.filter((c) => c.found).length
  const others = easterEggs.filter((e) => e.slug !== egg.slug).slice(0, 3)

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Link href="/map" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
        <ArrowLeft size={15} /> LEONIDA MAP
      </Link>

      <div className="data-rail mt-2">SECRET INDEX · EVIDENCE RECORD · {egg.region}</div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-6 mt-5">
        <div>
          <div className="flex items-center gap-2">
            <StatusBadge status={egg.status} />
            <span className="font-cond font-semibold uppercase tracking-[0.16em] text-[11px] text-dim">{egg.region}</span>
          </div>
          <h1 data-ghost="CLASSIFIED" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] mt-2">{egg.name}</h1>
          <p className="text-paper/85 text-[15px] leading-relaxed mt-3 max-w-[440px]">{egg.summary}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between max-w-[440px]">
              <span className="font-cond font-bold uppercase tracking-[0.14em] text-[15px] text-paper">{found} / {egg.clues.length} CLUES</span>
              <span className="font-mono text-[11px] text-dim tabular-nums">{Math.round((found / egg.clues.length) * 100)}% COMPLETE</span>
            </div>
            <div className="flex gap-1.5 mt-2 max-w-[440px]" role="img" aria-label={`${found} of ${egg.clues.length} clues found`}>
              {egg.clues.map((c, i) => <span key={i} className={cx('h-[7px] flex-1 rounded-sm', c.found ? 'bg-pink' : 'bg-white/10')} />)}
            </div>
            <ul className="mt-4 flex flex-col gap-2 max-w-[480px]">
              {egg.clues.map((c, i) => (
                <li key={i} className="panel rounded-sm px-3 py-3 flex items-start gap-3">
                  {c.found
                    ? <CircleCheck size={17} className="text-mint shrink-0 mt-0.5" aria-label="Clue found" />
                    : <Circle size={17} className="text-dim/50 shrink-0 mt-0.5" aria-label="Clue not found" />}
                  <span className={cx('text-[13px] leading-relaxed', c.found ? 'text-paper' : 'text-dim')}>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/map?loc=${egg.location}`} className="inline-flex items-center gap-3 border border-paper/90 h-12 px-6 font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
              <MapPin size={15} /> VIEW ON MAP
              <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
            </Link>
            <a href={egg.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-line h-12 px-4 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper hover:border-white/40 transition-colors">
              SOURCE: {egg.sourceName.toUpperCase()} <ExternalLink size={12} />
            </a>
          </div>
          <p className="font-mono text-[10px] text-dim uppercase mt-3">UPDATED {egg.updatedAt}</p>
        </div>

        <div className="corner-brackets tech-mask glass-panel relative panel overflow-hidden min-h-[320px] lg:min-h-[480px]">
          <Image src={egg.image} alt={`${egg.name} reference imagery`} fill priority sizes="(max-width:1024px) 100vw, 55vw" className="object-cover" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" aria-hidden="true" />
        </div>
      </div>

      <section className="mt-12" aria-label="More secrets">
        <div className="data-rail">ADJACENT RECORDS · SECRET INDEX</div>
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper border-b hairline pb-2">MORE SECRETS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {others.map((e) => (
            <Link key={e.slug} href={`/easter-eggs/${e.slug}`} className="panel rounded-sm overflow-hidden group hover:border-white/30 transition-colors">
              <div className="relative aspect-[16/8]">
                <Image src={e.image} alt={e.name} fill sizes="33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              </div>
              <div className="p-4">
                <StatusBadge status={e.status} />
                <h3 className="font-cond font-bold uppercase text-[18px] text-paper mt-2">{e.name}</h3>
                <p className="font-mono text-[10px] text-dim uppercase mt-1">{e.clues.filter((c) => c.found).length} / {e.clues.length} CLUES · {e.region}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App;
