import Link from 'next/link'
import Image from 'next/image'
import { Shield, MapPin } from 'lucide-react'
import { factions } from '@/lib/content'
import { GhostBadge, SourceChip } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

export default function GangsFactionsPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-8 max-w-[1180px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Factions' }]} />
      <div className="mt-4"><CategoryHeader eyebrow="Organised groups index" title="Gangs & Factions" image="/media/factions/vice-city-group.jpeg" imageAlt="Official GTA VI image of a group in Vice City" description="Official Rockstar information only. Named groups are kept separate from groups Rockstar describes but has not formally named; trailer identifications, leaks and rumours are excluded." count={factions.length} countLabel="factions" /></div>

      <div className="visual-card-grid two-up-visual-grid mt-6">
        {factions.map((faction) => (
          <article key={faction.slug} className="panel rounded-sm p-5 border border-line">
            {faction.image && (
              <Link href={`/gangs-factions/${faction.slug}`} className="relative mb-5 block aspect-[16/8] overflow-hidden rounded-sm border border-line" aria-label={`Open ${faction.name} full entry`}>
                <Image src={faction.image} alt={`${faction.name} official media`} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" />
              </Link>
            )}
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-cond uppercase tracking-[0.16em] text-[10px] text-pink">{faction.kind}</p><h2 className="mt-2 font-cond font-bold uppercase tracking-tight text-[30px] text-paper"><Link href={`/gangs-factions/${faction.slug}`} className="hover:text-mint transition-colors">{faction.name}</Link></h2></div>
              <Shield className="text-mint shrink-0" size={24} />
            </div>
            <GhostBadge status={faction.status} label={faction.evidenceStatus} className="mt-4" />
            <p className="mt-4 text-[13px] leading-relaxed text-dim">{faction.desc}</p>
            <p className="mt-4 flex items-center gap-2 font-cond uppercase tracking-[0.13em] text-[11px] text-paper"><MapPin size={13} className="text-mint" /> {faction.region}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <section><h3 className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">Officially confirmed</h3><ul className="mt-2 space-y-1 text-[12px] text-dim">{faction.confirmed.map((item) => <li key={item}>• {item}</li>)}</ul></section>
              <section><h3 className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Not published</h3><ul className="mt-2 space-y-1 text-[12px] text-dim">{faction.unknown.map((item) => <li key={item}>• {item}</li>)}</ul></section>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link href={`/gangs-factions/${faction.slug}`} className="inline-flex items-center gap-1.5 border border-line rounded-sm px-3 h-9 font-cond font-semibold uppercase tracking-[0.12em] text-[11px] text-paper hover:border-mint hover:text-mint transition-colors">Read full entry →</Link>
              <SourceChip name={faction.sourceName} url={faction.sourceUrl} prefix={null} className="border-0 px-0 py-0" />
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 border border-pink/30 bg-pink/5 p-4 text-[13px] leading-relaxed text-dim">A group visible in official media is not treated as officially named unless Rockstar supplies the name. This index will grow only as primary-source material does.</div>
      <Link href="/database/characters" className="mt-6 inline-flex font-cond uppercase tracking-[0.14em] text-[13px] text-pink hover:text-paper">← Character database</Link>
    </div>
  )
}
