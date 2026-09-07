'use client'

import Link from 'next/link'
import Image from 'next/image'
import { guides } from '@/lib/content'
import { StatusBadge, fmtDate } from '@/components/site/ui'
import { ChevronRight } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

const pad = (n) => String(n).padStart(2, '0')

function App() {
  const counters = [
    [pad(guides.length), 'PUBLISHED'],
    [pad(guides.filter((g) => g.status === 'confirmed' || g.status === 'verified').length), 'VERIFIED+'],
    [pad(guides.reduce((sum, g) => sum + (g.readTime || 0), 0)), 'MIN TOTAL'],
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex-1 w-full max-w-[1280px] mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Guides' }]} />
      <div className="mt-4">
        <CategoryHeader eyebrow="Practical reference" title="Guides" image="/media/key-art/jason-lucia-robbery.webp" imageAlt="Official GTA VI artwork of Jason and Lucia leaving a robbery" description="Structured walkthroughs for understanding systems, evidence and the world without burying the task beneath archive detail." count={guides.length} countLabel="guides">
        <div className="mt-4 flex flex-wrap items-stretch gap-y-3">
          {counters.map(([n, label], i) => (
            <div key={label} className={`px-5 flex flex-col justify-center leading-none ${i > 0 ? 'border-l hairline' : ''}`}>
              <span className="font-cond font-bold text-[26px] text-paper tabular-nums text-center">{n}</span>
              <span className="font-cond text-[9px] text-dim uppercase tracking-[0.2em] mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>
        </CategoryHeader>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="panel rounded-sm overflow-hidden group hover:border-black/30 transition-colors flex flex-col">
            <div className="relative aspect-[16/7] overflow-hidden">
              {g.image ? (
                <Image src={g.image} alt={g.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface2/70 px-6 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim">NO VERIFIED SUBJECT IMAGE</span>
                </div>
              )}
              <span className="absolute top-3 left-3"><StatusBadge status={g.status} /></span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[1] text-[28px]">{g.title}</h2>
              <p className="text-dim text-[13px] leading-relaxed mt-2">{g.summary}</p>
              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim">{fmtDate(g.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{g.readTime} MIN&nbsp;&nbsp;·&nbsp;&nbsp;{g.steps.length} STEPS</span>
                <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-dim group-hover:text-paper group-hover:border-black/50 transition-colors" aria-hidden="true"><ChevronRight size={14} /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default App;
