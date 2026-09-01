'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink, Heart, Zap, Eye, Target, Layers, Weight } from 'lucide-react'
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
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/weapons" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO ARSENAL</Link>
      </div>
    )
  }

  // Um tipo sem entrada em `weaponTypes` devolvia `undefined` e rebentava a
  // página inteira. O fallback é obrigatório, não cortesia.
  const typeLabel = weaponTypes.find((t) => t.id === w.type)?.label || w.type.toUpperCase()
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
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto">
        <Link href="/database/weapons" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
          <ArrowLeft size={15} /> ARSENAL
        </Link>

        <div className="data-rail mt-2">ARSENAL FILE · DOCUMENTED REFERENCE · ID {w.slug.toUpperCase()}</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 mt-5">
          <div className="corner-brackets tech-mask glass-panel relative panel overflow-hidden min-h-[320px]">
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
              <GhostBadge status="confirmed" label={typeLabel} />
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{w.evidenceStatus}</span>
            </div>
            <h1 data-ghost="ARSENAL" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.92] text-[48px] sm:text-[58px] mt-2">{w.name}</h1>
            <p className="text-dim text-[14px] leading-relaxed mt-3">{w.desc}</p>
            {w.association && (
              <div className="mt-4 border-l-2 border-mint/70 pl-3">
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Associated character / content</p>
                <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{w.association}</p>
              </div>
            )}
            <div className="mt-3 border-l-2 border-violet/70 pl-3">
              <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Manufacturer / brand</p>
              <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{w.manufacturer}</p>
            </div>
            {w.character && <div className="mt-3 border-l-2 border-pink/70 pl-3"><p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Character</p><p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{w.character}</p></div>}

            {w.unpublished ? (
              <div className="mt-5 border border-line rounded-sm p-4">
                <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Performance not published</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-dim">Rockstar has confirmed this item but has not released damage, fire-rate, accuracy or range figures.</p>
              </div>
            ) : <div className="mt-5 flex flex-col gap-3">
              {bars.map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: b.color }} aria-hidden="true"><b.icon size={14} /></span>
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px] sm:text-[13px] text-paper w-[72px] sm:w-[84px] shrink-0">{b.label}</span>
                  <span className="relative flex-1 h-[7px] bg-white/10" role="img" aria-label={`${b.label}: ${b.value} of 100`}>
                    <span className="absolute inset-y-0 left-0" style={{ width: `${b.value}%`, backgroundColor: b.color }} />
                  </span>
                  <span className="font-mono text-[12px] text-dim tabular-nums w-8 text-right">{b.value}</span>
                </div>
              ))}
            </div>}

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

            {(w.confirmedDetails?.length > 0 || w.notPublished?.length > 0) && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {w.confirmedDetails?.length > 0 && (
                  <section className="border border-mint/25 bg-mint/[0.03] p-3 rounded-sm">
                    <h2 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-mint">Officially confirmed</h2>
                    <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">
                      {w.confirmedDetails.map((detail) => <li key={detail}>• {detail}</li>)}
                    </ul>
                  </section>
                )}
                {w.notPublished?.length > 0 && (
                  <section className="border border-line bg-surface2/40 p-3 rounded-sm">
                    <h2 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Not officially specified</h2>
                    <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">
                      {w.notPublished.map((detail) => <li key={detail}>• {detail}</li>)}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {/* O «APPEARS IN» dava bairros onde cada arma aparecia, e o default
                punha Little Haiti e Vice Point em tudo o que não trouxesse
                lista. Ninguém sabe onde aparece uma arma num jogo por sair. */}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-12" aria-label="Related weapons">
            <div className="data-rail">RELATED FILES · SAME CLASS</div>
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
