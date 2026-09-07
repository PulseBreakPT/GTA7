'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FileText, ListChecks, BookMarked, Compass } from 'lucide-react'
import { guides } from '@/lib/content'
import { SourceChip, StatusBadge, fmtDate } from '@/components/site/ui'
import { InfoRow, SpecGrid, WikiSection } from '@/components/site/wiki'
import { AdjacentRecords, EntryMedia, RecordNotFound, WikiEntryLayout } from '@/components/site/wiki-entry'

const SECTIONS = [
  { id: 'walkthrough', label: 'Walkthrough', icon: ListChecks },
  { id: 'references', label: 'References', icon: BookMarked },
]

function App() {
  const { slug } = useParams()
  const g = guides.find((x) => x.slug === slug)

  if (!g) return <RecordNotFound backHref="/guides" backLabel="BACK TO GUIDES" />

  const others = guides.filter((x) => x.slug !== g.slug).slice(0, 3)


  return (
    <WikiEntryLayout
      trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Guides', href: '/guides' }, { label: g.title }]}
      kind="guides"
      slug={g.slug}
      ghost="GUIDES"
      title={g.title}
      eyebrow={<StatusBadge status={g.status} />}
      lede={g.summary}
      shortDescription="Guide for Grand Theft Auto VI"
      media={<EntryMedia src={g.image} alt={g.title} priority />}
      sections={SECTIONS}
      references={[{ name: g.sourceName, url: g.sourceUrl, retrieved: g.updatedAt }]}
      infobox={
        <>
          <div className="space-y-3">
            <InfoRow label="Type" value="Guide" />
            <InfoRow label="Steps" value={String(g.steps.length)} />
            <InfoRow label="Reading time" value={`${g.readTime} min`} />
            <InfoRow label="Status"><StatusBadge status={g.status} /></InfoRow>
          </div>
          <div className="border-t border-black/10 pt-4">
            <SourceChip name={g.sourceName} url={g.sourceUrl} prefix={null} />
            <p className="font-mono text-[9px] text-dim mt-2">Updated {g.updatedAt}</p>
          </div>
        </>
      }
      after={
        <AdjacentRecords rail="ADJACENT RECORDS · GUIDE INDEX" title="MORE GUIDES">
          {others.map((o) => (
            <Link key={o.slug} href={`/guides/${o.slug}`} className="panel rounded-sm tech-mask-sm p-4 hover:border-black/30 transition-colors">
              <StatusBadge status={o.status} />
              <h3 className="font-cond font-bold uppercase text-[18px] text-paper leading-tight mt-2">{o.title}</h3>
              <p className="font-cond uppercase tracking-[0.12em] text-[11px] text-dim mt-2">{o.readTime} MIN · {o.steps.length} STEPS</p>
            </Link>
          ))}
        </AdjacentRecords>
      }
    >
      <WikiSection id="walkthrough" title="Walkthrough">
        <ol className="flex flex-col gap-3">
          {g.steps.map((s, i) => (
            <li key={i} className="panel rounded-sm tech-mask-sm p-4 flex gap-4">
              <span className="font-cond font-bold text-[22px] text-pink tabular-nums w-9 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-[14px] leading-relaxed text-paper/90 pt-1">{s}</p>
            </li>
          ))}
        </ol>
      </WikiSection>

    </WikiEntryLayout>
  )
}

export default App;
