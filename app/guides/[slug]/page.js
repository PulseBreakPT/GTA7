'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { guides } from '@/lib/content'
import { StatusBadge, fmtDate } from '@/components/site/ui'

function App() {
  const { slug } = useParams()
  const g = guides.find((x) => x.slug === slug)

  if (!g) {
    return (
      <div className="px-8 py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/guides" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO GUIDES</Link>
      </div>
    )
  }

  const others = guides.filter((x) => x.slug !== g.slug).slice(0, 3)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1080px] w-full mx-auto flex-1">
      <Link href="/guides" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
        <ArrowLeft size={15} /> ALL GUIDES
      </Link>

      <div className="relative aspect-[21/8] overflow-hidden rounded-sm border border-line mt-3">
        <Image src={g.image} alt={g.title} fill priority sizes="(max-width:1080px) 100vw, 1080px" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute top-4 left-4"><StatusBadge status={g.status} /></span>
      </div>

      <h1 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.92] text-[42px] sm:text-[58px] mt-6">{g.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 border-y hairline py-3">
        <span className="font-cond uppercase tracking-[0.14em] text-[13px] text-dim">{fmtDate(g.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{g.readTime} MIN&nbsp;&nbsp;·&nbsp;&nbsp;{g.steps.length} STEPS</span>
        <a href={g.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.12em] text-[12px] text-paper border border-line rounded-sm px-2.5 py-1.5 hover:border-white/40">
          {g.sourceName} <ExternalLink size={11} />
        </a>
      </div>
      <p className="text-paper/85 text-[15px] leading-relaxed mt-5 max-w-[720px]">{g.summary}</p>

      <ol className="mt-6 flex flex-col gap-3 max-w-[760px]">
        {g.steps.map((s, i) => (
          <li key={i} className="panel rounded-sm p-4 flex gap-4">
            <span className="font-cond font-bold text-[22px] text-pink tabular-nums w-9 shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-[14px] leading-relaxed text-paper/90 pt-1">{s}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12" aria-label="More guides">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper border-b hairline pb-2">MORE GUIDES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {others.map((o) => (
            <Link key={o.slug} href={`/guides/${o.slug}`} className="panel rounded-sm p-4 hover:border-white/30 transition-colors">
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
