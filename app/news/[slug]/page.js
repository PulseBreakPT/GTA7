'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, ExternalLink, Star, TriangleAlert } from 'lucide-react'
import { articles, sources } from '@/lib/content'
import { StatusBadge, GhostBadge, fmtDate } from '@/components/site/ui'

function App() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)

  if (!a) {
    return (
      <div className="px-8 py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/news" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO NEWS</Link>
      </div>
    )
  }

  const src = sources.find((s) => a.sourceName.toLowerCase().includes(s.name.split(' ')[0].toLowerCase()))
  const rating = src ? src.rating : 4
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <article className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1080px] mx-auto w-full">
      <Link href="/news" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
        <ArrowLeft size={15} /> ALL NEWS
      </Link>

      <div className="relative aspect-[21/9] overflow-hidden rounded-sm border border-line mt-3">
        <Image src={a.image} alt={a.title} fill priority sizes="(max-width:1080px) 100vw, 1080px" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 flex items-center gap-2">
          <StatusBadge status={a.category === 'official' ? 'official' : a.category === 'community' ? 'community' : 'analysis'} />
          <GhostBadge status={a.status} />
        </span>
      </div>

      <h1 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.94] text-[42px] sm:text-[60px] mt-6 max-w-[820px]">{a.title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-y hairline py-3">
        <span className="font-cond uppercase tracking-[0.14em] text-[13px] text-dim">{fmtDate(a.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{a.readTime} MIN READ</span>
        <span className="font-mono text-[11px] text-dim tabular-nums">{a.views.toLocaleString('en-US')} READS</span>
        <a href={a.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.12em] text-[12px] text-paper border border-line rounded-sm px-2.5 py-1.5 hover:border-white/40">
          {a.sourceName} <ExternalLink size={11} />
        </a>
        <span className="flex items-center gap-0.5" role="img" aria-label={`Source credibility: ${rating} of 5`}>
          {[1,2,3,4,5].map((n) => <Star key={n} size={13} className={n <= rating ? 'text-pink' : 'text-white/20'} fill={n <= rating ? '#F1A3C3' : 'transparent'} />)}
        </span>
      </div>

      {a.status === 'rumour' && (
        <div className="mt-5 border border-warn/50 bg-warn/10 rounded-sm px-4 py-3 flex items-center gap-3">
          <TriangleAlert size={16} className="text-warn shrink-0" />
          <p className="text-[13px] text-paper">Community rumour. Not confirmed by any official source.</p>
        </div>
      )}

      <div className="mt-6 max-w-[760px] flex flex-col gap-5">
        {a.body.map((p, i) => <p key={i} className="text-[15px] leading-[1.8] text-paper/85">{p}</p>)}
      </div>

      <section className="mt-12" aria-label="Related articles">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[22px] text-paper border-b hairline pb-2">MORE FROM THE ARCHIVE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {related.map((r) => (
            <Link key={r.slug} href={`/news/${r.slug}`} className="panel rounded-sm overflow-hidden group hover:border-white/30 transition-colors">
              <div className="relative aspect-[16/8]">
                <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              </div>
              <div className="p-4">
                <GhostBadge status={r.status} />
                <h3 className="font-cond font-bold uppercase text-paper text-[18px] leading-[1.05] mt-2 clamp-2">{r.title}</h3>
                <p className="font-cond uppercase tracking-[0.12em] text-[11px] text-dim mt-2">{fmtDate(r.publishedAt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}

export default App;
