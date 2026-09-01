import Link from 'next/link'
import Image from 'next/image'
import { Shield, MapPin, ExternalLink } from 'lucide-react'
import { factions } from '@/lib/content'
import { GhostBadge } from '@/components/site/ui'

export default function GangsFactionsPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-8 max-w-[1180px] w-full mx-auto">
      <p className="data-rail text-mint">LEONIDA ARCHIVE · ORGANIZED GROUPS INDEX</p>
      <h1 data-ghost="FACTIONS" className="ghost-type chromatic-title mt-3 font-cond font-bold uppercase leading-[0.86] tracking-tight text-[54px] sm:text-[76px] text-paper">GANGS &amp; FACTIONS</h1>
      <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-dim">Official Rockstar information only. Named groups are kept separate from groups Rockstar describes but has not formally named; trailer identifications, leaks and rumours are excluded.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {factions.map((faction) => (
          <article key={faction.slug} className="panel rounded-sm p-5 border border-line">
            {faction.image && <div className="relative mb-5 aspect-[16/8] overflow-hidden rounded-sm border border-line"><Image src={faction.image} alt={`${faction.name} official media`} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" /></div>}
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-cond uppercase tracking-[0.16em] text-[10px] text-pink">{faction.kind}</p><h2 className="mt-2 font-cond font-bold uppercase tracking-tight text-[30px] text-paper">{faction.name}</h2></div>
              <Shield className="text-mint shrink-0" size={24} />
            </div>
            <GhostBadge status={faction.status} label={faction.evidenceStatus} className="mt-4" />
            <p className="mt-4 text-[13px] leading-relaxed text-dim">{faction.desc}</p>
            <p className="mt-4 flex items-center gap-2 font-cond uppercase tracking-[0.13em] text-[11px] text-paper"><MapPin size={13} className="text-mint" /> {faction.region}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <section><h3 className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially confirmed</h3><ul className="mt-2 space-y-1 text-[12px] text-dim">{faction.confirmed.map((item) => <li key={item}>• {item}</li>)}</ul></section>
              <section><h3 className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Not published</h3><ul className="mt-2 space-y-1 text-[12px] text-dim">{faction.unknown.map((item) => <li key={item}>• {item}</li>)}</ul></section>
            </div>
            <a href={faction.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 font-cond uppercase tracking-[0.12em] text-[11px] text-dim hover:text-paper">{faction.sourceName} <ExternalLink size={12} /></a>
          </article>
        ))}
      </div>
      <div className="mt-6 border border-pink/30 bg-pink/5 p-4 text-[13px] leading-relaxed text-dim">A group visible in official media is not treated as officially named unless Rockstar supplies the name. This index will grow only as primary-source material does.</div>
      <Link href="/database/characters" className="mt-6 inline-flex font-cond uppercase tracking-[0.14em] text-[13px] text-pink hover:text-paper">← Character database</Link>
    </div>
  )
}
