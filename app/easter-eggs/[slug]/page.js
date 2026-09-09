'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { CircleCheck, Circle, MapPin, Triangle, FileText, ListChecks, BookMarked, Compass } from 'lucide-react'
import { easterEggs } from '@/lib/content'
import { SourceChip, StatusBadge, cx } from '@/components/site/ui'
import { InfoRow, SpecGrid, WikiSection } from '@/components/site/wiki'
import { AdjacentRecords, EntryMedia, RecordNotFound, WikiEntryLayout } from '@/components/site/wiki-entry'

const SECTIONS = [
  { id: 'overview', label: 'Where to look', icon: FileText },
  { id: 'clues', label: 'Clue chain', icon: ListChecks },
  { id: 'references', label: 'References', icon: BookMarked },
]

function App() {
  const { slug } = useParams()
  const egg = easterEggs.find((x) => x.slug === slug)

  if (!egg) return <RecordNotFound backHref="/easter-eggs" backLabel="BACK TO SECRETS" />

  const found = egg.clues.filter((c) => c.found).length
  const pct = Math.round((found / egg.clues.length) * 100)
  const others = easterEggs.filter((e) => e.slug !== egg.slug).slice(0, 3)


  // A barra de progresso da cadeia de pistas, repetida no corpo e na caixa
  // de dados. É o único dado que este verbete tem e que nenhum outro tem.
  const ClueMeter = ({ compact }) => (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className={cx('font-cond font-bold uppercase tracking-[0.14em] text-paper', compact ? 'text-[12px]' : 'text-[15px]')}>{found} / {egg.clues.length} CLUES</span>
        <span className="font-mono text-[11px] text-dim tabular-nums">{pct}%</span>
      </div>
      <div className="flex gap-1.5 mt-2" role="img" aria-label={`${found} of ${egg.clues.length} clues found`}>
        {egg.clues.map((c, i) => <span key={i} className={cx('h-[7px] flex-1 rounded-sm', c.found ? 'bg-pink' : 'bg-black/10')} />)}
      </div>
    </div>
  )

  return (
    <WikiEntryLayout
      trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Secrets', href: '/easter-eggs' }, { label: egg.name }]}
      kind="secrets"
      slug={egg.slug}
      record={egg}
      ghost="CLASSIFIED"
      title={egg.name}
      eyebrow={
        <>
          <StatusBadge status={egg.status} />
          <span className="font-cond font-semibold uppercase tracking-[0.16em] text-[11px] text-dim">{egg.region}</span>
        </>
      }
      lede={egg.summary}
      leadName={egg.name}
      shortDescription="Secret in Grand Theft Auto VI"
      media={<EntryMedia src={egg.image} alt={`${egg.name} reference imagery`} priority />}
      sections={SECTIONS}
      references={[{ name: egg.sourceName, url: egg.sourceUrl, retrieved: egg.updatedAt }]}
      infobox={
        <>
          {/* A barra de pistas e o botão do mapa estavam aqui e outra vez no
              corpo. Ficam no corpo, que é onde se lê a cadeia; a caixa de
              dados guarda o número, que é o dado. */}
          <div className="space-y-3">
            <InfoRow label="Region" value={egg.region} />
            <InfoRow label="Status"><StatusBadge status={egg.status} /></InfoRow>
            <InfoRow label="Clues" value={`${found} / ${egg.clues.length}`} />
            <InfoRow label="Progress" value={`${pct}%`} />
          </div>
          <div className="border-t border-black/10 pt-4">
            <SourceChip name={egg.sourceName} url={egg.sourceUrl} prefix={null} />
            <p className="font-mono text-[9px] text-dim mt-2">Updated {egg.updatedAt}</p>
          </div>
        </>
      }
      after={
        <AdjacentRecords rail="ADJACENT RECORDS · SECRET INDEX" title="MORE SECRETS">
          {others.map((e) => (
            <Link key={e.slug} href={`/easter-eggs/${e.slug}`} className="panel rounded-sm overflow-hidden group hover:border-black/30 transition-colors">
              <div className="relative aspect-[16/8]">
                {e.image ? (
                  <Image src={e.image} alt={e.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface2/70 px-4 text-center">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-dim">NO VERIFIED SUBJECT IMAGE</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <StatusBadge status={e.status} />
                <h3 className="font-cond font-bold uppercase text-[18px] text-paper mt-2">{e.name}</h3>
                <p className="font-mono text-[10px] text-dim uppercase mt-1">{e.clues.filter((c) => c.found).length} / {e.clues.length} CLUES · {e.region}</p>
              </div>
            </Link>
          ))}
        </AdjacentRecords>
      }
    >
      {/* O resumo saiu: era a abertura repetida. Ficam as acções, que é o
          que esta secção tem de próprio. */}
      <WikiSection id="overview" title="Where to look">
        <div className="flex flex-wrap gap-3">
          <Link href={`/map?loc=${egg.location}`} className="inline-flex items-center gap-3 border border-paper/90 h-11 px-5 font-cond font-semibold uppercase tracking-[0.16em] text-[13px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
            <MapPin size={15} aria-hidden="true" /> VIEW ON MAP
            <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={9} strokeWidth={2.4} /></span>
          </Link>
        </div>
      </WikiSection>

      <WikiSection id="clues" title="Clue chain">
        <ClueMeter />
        <ul className="mt-4 flex flex-col gap-2">
          {egg.clues.map((c, i) => (
            <li key={i} className="panel rounded-sm px-3 py-3 flex items-start gap-3">
              {c.found
                ? <CircleCheck size={17} className="text-mint shrink-0 mt-0.5" aria-label="Clue found" />
                : <Circle size={17} className="text-dim/50 shrink-0 mt-0.5" aria-label="Clue not found" />}
              <span className={cx('text-[13px] leading-relaxed', c.found ? 'text-paper' : 'text-dim')}>{c.text}</span>
            </li>
          ))}
        </ul>
      </WikiSection>

    </WikiEntryLayout>
  )
}

export default App;
