import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ChevronRight } from 'lucide-react'
import { easterEggs, locations } from '@/lib/content'
import { StatusBadge, SourceChip } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

// Esta página faltava. As fichas de cada segredo existiam, o índice do wiki
// e a página de estatísticas ligavam para `/easter-eggs` — a base do ramo
// declarada no `wiki-graph` — e essa ligação dava 404: era a única ligação
// interna partida do arquivo, em seiscentas e oitenta e uma.
export const metadata = {
  title: 'Secrets',
  description: 'Community finds catalogued apart from the confirmed record, each with the evidence it rests on.',
}

export default function EasterEggsIndex() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Secrets' }]} />

      <div className="data-rail mt-2">SECRET INDEX · KEPT APART FROM THE CONFIRMED RECORD</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Community finds"
          title="Secrets"
          description="Oddities the community has reported and the archive has catalogued separately, so a theory never sits next to a fact as if it were one. Each one carries its label, the clues it rests on, and where it is said to be."
          count={easterEggs.length}
          countLabel="secrets"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {easterEggs.map((egg) => {
          const found = egg.clues.filter((c) => c.found).length
          const place = locations.find((l) => l.slug === egg.location)
          return (
            <article key={egg.slug} className="panel rounded-sm overflow-hidden flex flex-col">
              {egg.image ? (
                <Link href={`/easter-eggs/${egg.slug}`} className="relative block aspect-[16/8] overflow-hidden">
                  <Image src={egg.image} alt={egg.name} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover" />
                </Link>
              ) : (
                <div className="aspect-[16/8] bg-surface2/60 flex items-center justify-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-dim">NO OFFICIAL IMAGE</span>
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <StatusBadge status={egg.status} />
                  <span className="font-cond font-semibold uppercase tracking-[0.16em] text-[10px] text-dim">{egg.region}</span>
                </div>

                <h2 className="mt-2 font-cond font-bold uppercase tracking-tight text-[26px] leading-[1.05] text-paper">
                  <Link href={`/easter-eggs/${egg.slug}`} className="hover:text-pink transition-colors">{egg.name}</Link>
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-dim">{egg.summary}</p>

                {/* As pistas são a substância de cada segredo: quantas se
                    dão por encontradas e quantas faltam. É o mesmo dado da
                    ficha, dito aqui em ponto pequeno. */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-paper">{found} / {egg.clues.length} clues</span>
                    <span className="font-mono text-[10px] text-dim tabular-nums">{Math.round((found / egg.clues.length) * 100)}%</span>
                  </div>
                  <div className="flex gap-1.5 mt-1.5" role="img" aria-label={`${found} of ${egg.clues.length} clues found`}>
                    {egg.clues.map((c, i) => (
                      <span key={i} className={'h-[6px] flex-1 rounded-sm ' + (c.found ? 'bg-pink' : 'bg-black/10')} />
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4 flex flex-wrap items-center gap-3">
                  <SourceChip name={egg.sourceName} url={egg.sourceUrl} />
                  {place && (
                    <Link href={`/map/location/${place.slug}`} className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-dim hover:text-paper transition-colors">
                      <MapPin size={12} aria-hidden="true" /> {place.name}
                    </Link>
                  )}
                  <Link href={`/easter-eggs/${egg.slug}`} className="ml-auto inline-flex items-center gap-1 font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-pink hover:text-paper transition-colors">
                    Open record <ChevronRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-6 border-l-2 border-pink pl-3 text-[12px] leading-relaxed text-dim max-w-[68ch]">
        Nothing on this page is a Rockstar statement. These are community reports and archive readings of
        official material, kept here so they are never mistaken for the confirmed record.
      </p>
    </div>
  )
}
