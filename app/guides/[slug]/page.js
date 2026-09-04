'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { guides } from '@/lib/content'
import { SourceChip, StatusBadge, fmtDate } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'

function App() {
  const { slug } = useParams()
  const g = guides.find((x) => x.slug === slug)

  if (!g) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/guides" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO GUIDES</Link>
      </div>
    )
  }

  const others = guides.filter((x) => x.slug !== g.slug).slice(0, 3)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1080px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: g.title }]} />

      <div className="relative aspect-[21/8] overflow-hidden corner-brackets tech-mask panel border border-line mt-3">
        <Image src={g.image} alt={g.title} fill priority sizes="(max-width:1080px) 100vw, 1080px" className="object-cover" />
        <span className="absolute top-4 left-4"><StatusBadge status={g.status} /></span>
      </div>

      <h1 data-ghost="GUIDES" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] mt-6">{g.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-y hairline py-3">
        <span className="font-cond uppercase tracking-[0.14em] text-[13px] text-dim">{fmtDate(g.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{g.readTime} MIN&nbsp;&nbsp;·&nbsp;&nbsp;{g.steps.length} STEPS</span>
        <SourceChip name={g.sourceName} url={g.sourceUrl} prefix={null} className="text-[12px]" />
      </div>
      <p className="text-paper/85 text-[15px] leading-relaxed mt-5 max-w-[720px]">{g.summary}</p>

      <ol className="mt-6 flex flex-col gap-3 max-w-[760px]">
        {g.steps.map((s, i) => (
          <li key={i} className="panel tech-mask-sm p-4 flex gap-4">
            <span className="font-cond font-bold text-[22px] text-pink tabular-nums w-9 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-[14px] leading-relaxed text-paper/90 pt-1">{s}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12" aria-label="More guides">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper border-b hairline pb-2">MORE GUIDES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/guides/${o.slug}`} className="panel tech-mask-sm p-4 hover:border-black/30 transition-colors">
              <StatusBadge status={o.status} />
              <h3 className="font-cond font-bold uppercase text-[18px] text-paper leading-tight mt-2">{o.title}</h3>
              <p className="font-cond uppercase tracking-[0.12em] text-[11px] text-dim mt-2">{o.readTime} MIN · {o.steps.length} STEPS</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App;
