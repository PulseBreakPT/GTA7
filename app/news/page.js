'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, BadgeCheck, Eye, ChevronRight, Triangle, Info, Star } from 'lucide-react'
import { articles, liveUpdates, sources, mostRead } from '@/lib/content'
import { StatusBadge, GhostBadge, cx, fmtDate } from '@/components/site/ui'

const FILTERS = [
  { id: 'all', label: 'ALL' },
  { id: 'official', label: 'OFFICIAL' },
  { id: 'analysis', label: 'ANALYSIS' },
  { id: 'community', label: 'COMMUNITY' },
]

const SUMMARY = [
  { icon: Heart, label: 'OFFICIAL', count: 238, value: 78, color: '#F1A3C3' },
  { icon: BadgeCheck, label: 'VERIFIED', count: 165, value: 58, color: '#65DCCB' },
  { icon: Eye, label: 'RUMOUR', count: 73, value: 30, color: '#9B83F4' },
]

function ArticleCard({ a }) {
  return (
    <Link href={`/news/${a.slug}`} className="panel rounded-sm p-4 flex gap-4 group hover:border-white/30 transition-colors">
      <div className="relative w-[38%] min-w-[120px] shrink-0 overflow-hidden rounded-sm border border-line">
        <Image src={a.image} alt={a.title} fill sizes="(max-width:1024px) 40vw, 18vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
        <span className="absolute inset-0 bg-ink/25" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col py-1">
        <div><StatusBadge status={a.category === 'official' ? 'official' : a.category === 'community' ? 'community' : 'analysis'} /></div>
        <h3 className="font-cond font-bold uppercase text-paper text-[22px] leading-[1.02] tracking-tight mt-2.5">{a.title}</h3>
        <p className="text-dim text-[12px] leading-relaxed mt-2 clamp-2">{a.excerpt}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim">{fmtDate(a.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{a.readTime} MIN</span>
          <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-dim group-hover:text-paper group-hover:border-white/50 transition-colors" aria-hidden="true">
            <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}

function App() {
  const [filter, setFilter] = useState('all')
  const [selectedUpdate, setSelectedUpdate] = useState(0)
  const [allUpdates, setAllUpdates] = useState(false)
  const [sourceIdx, setSourceIdx] = useState(0)
  const [ratings, setRatings] = useState(() => sources.map((s) => s.rating))
  const [fullRanking, setFullRanking] = useState(false)

  const lead = articles.find((a) => a.slug === 'extended-look-everything-revealed')
  const support = [articles.find((a) => a.slug === 'the-new-inventory-system'), articles.find((a) => a.slug === 'six-star-wanted-level-returns')]
  const filtered = useMemo(() => articles.filter((a) => filter === 'all' || a.category === filter), [filter])
  const updates = allUpdates ? liveUpdates : liveUpdates.slice(0, 4)
  const ranking = fullRanking
    ? [...articles].sort((a, b) => b.views - a.views).slice(0, 6).map((a, i) => ({ rank: String(i + 1).padStart(2, '0'), slug: a.slug, title: a.title.charAt(0) + a.title.slice(1).toLowerCase(), date: fmtDate(a.publishedAt) }))
    : mostRead

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 grid grid-cols-1 xl:grid-cols-[1fr_408px] gap-6">
      {/* LEFT */}
      <div className="min-w-0">
        <h1 className="font-cond font-bold uppercase text-paper leading-[0.9] tracking-tight text-[56px] sm:text-[72px]">NEWS</h1>

        <div className="mt-4 inline-flex border border-line rounded-sm overflow-hidden" role="tablist" aria-label="News filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cx(
                'font-cond font-semibold uppercase tracking-[0.12em] text-[14px] px-5 h-11 border-r hairline last:border-r-0 transition-colors duration-150',
                filter === f.id ? 'bg-paper text-ink' : 'text-dim hover:text-paper'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filter === 'all' ? (
          <>
            {/* LEAD */}
            <Link href={`/news/${lead.slug}`} className="card-active panel rounded-sm mt-5 block group">
              <div className="relative aspect-[2.9/1] overflow-hidden scanlines">
                <Image src={lead.image} alt="Beach boardwalk with ferris wheel at dusk, neon-lit" fill priority sizes="(max-width:1280px) 100vw, 60vw" className="object-cover object-[center_62%] group-hover:scale-[1.02] transition-transform duration-300" />
                <span className="absolute inset-0 bg-gradient-to-t from-raised via-ink/20 to-transparent" />
                <span className="absolute top-4 left-4"><StatusBadge status="featured" label="FEATURED" /></span>
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.95] text-[36px] sm:text-[46px] max-w-[560px]">
                  EXTENDED LOOK:<br />EVERYTHING REVEALED
                </h2>
                <p className="text-dim text-[14px] leading-relaxed mt-3 max-w-[520px]">{lead.excerpt}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-cond uppercase tracking-[0.16em] text-[13px] text-dim">AUG 27, 2026&nbsp;&nbsp;·&nbsp;&nbsp;12 MIN</span>
                  <span className="inline-flex items-center gap-3 border border-paper/90 px-5 h-12 font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper group-hover:bg-paper group-hover:text-ink transition-colors duration-200">
                    READ ANALYSIS
                    <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center" aria-hidden="true"><Triangle size={10} strokeWidth={2.4} /></span>
                  </span>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {support.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {filtered.map((a) => <ArticleCard key={a.slug} a={a} />)}
            {filtered.length === 0 && (
              <div className="panel rounded-sm p-8 text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.16em] text-paper">No records in this category yet</p>
                <p className="text-dim text-sm mt-2">The archive updates after every official drop.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <aside className="min-w-0 flex flex-col gap-4">
        {/* Status summary */}
        <div className="panel rounded-sm p-4 grid grid-cols-3 gap-4">
          {SUMMARY.map((s) => (
            <div key={s.label} className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center shrink-0" style={{ color: s.color }} aria-hidden="true"><s.icon size={14} strokeWidth={2.4} /></span>
                <span className="min-w-0">
                  <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper truncate">{s.label}</span>
                  <span className="block font-mono text-[12px] text-dim tabular-nums">{s.count}</span>
                </span>
              </div>
              <span className="relative block h-[5px] bg-white/10 mt-2.5" role="img" aria-label={`${s.label}: ${s.count}`}>
                <span className="absolute inset-y-0 left-0" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
              </span>
            </div>
          ))}
        </div>

        {/* Open signal */}
        <div className="panel rounded-sm p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-pink animate-pulse" aria-hidden="true" />
              <span className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper">OPEN SIGNAL</span>
            </span>
            <span className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">LIVE UPDATES</span>
          </div>
          <ul className="mt-3 flex flex-col gap-2" aria-label="Live updates">
            {updates.map((u2, i) => (
              <li key={u2.time}>
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(i)}
                  aria-pressed={selectedUpdate === i}
                  className={cx('w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all duration-150 border', selectedUpdate === i ? 'card-active bg-surface2 border-transparent' : 'border-transparent hover:bg-surface2/60')}
                >
                  <span className="font-mono text-[12px] text-dim tabular-nums shrink-0">{u2.time}</span>
                  <span className="flex-1 min-w-0 text-[13px] text-paper truncate">{u2.text}</span>
                  <GhostBadge status={u2.status} />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setAllUpdates((v) => !v)} className="mt-3 inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-dim hover:text-paper min-h-[44px]">
            {allUpdates ? 'SHOW FEWER UPDATES' : 'VIEW ALL UPDATES'}
            <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center" aria-hidden="true"><ChevronRight size={12} className={cx('transition-transform', allUpdates && 'rotate-90')} /></span>
          </button>
        </div>

        {/* Source confidence */}
        <div className="panel rounded-sm p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <span className="font-cond font-bold uppercase tracking-[0.1em] text-[18px] text-paper">SOURCE CONFIDENCE</span>
              <Info size={13} className="text-dim" aria-hidden="true" />
            </span>
            <span className="flex items-center gap-1" role="img" aria-label={`Credibility: ${ratings[sourceIdx]} of 5 stars`}>
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" aria-label={`Rate ${n} of 5`} onClick={() => setRatings((r) => r.map((v, i) => (i === sourceIdx ? n : v)))} className="p-0.5">
                  <Star size={17} className={n <= ratings[sourceIdx] ? 'text-pink' : 'text-white/20'} fill={n <= ratings[sourceIdx] ? '#F1A3C3' : 'transparent'} />
                </button>
              ))}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2.5 flex-wrap">
            {sources.map((s, i) => (
              <button
                key={s.abbr}
                type="button"
                onClick={() => setSourceIdx(i)}
                aria-pressed={sourceIdx === i}
                aria-label={`Select source ${s.name}`}
                className={cx('w-11 h-11 rounded-full border flex items-center justify-center font-cond font-bold text-[11px] tracking-wide transition-all duration-150', sourceIdx === i ? 'border-pink text-paper ring-1 ring-pink/50' : 'border-line text-dim hover:text-paper hover:border-white/40')}
              >
                {s.abbr}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[12px] text-dim"><span className="text-paper font-medium">{sources[sourceIdx].name}</span> · {sources[sourceIdx].kind}</p>
          <p className="mt-2 inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-dim">
            RATE SOURCE
            <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center" aria-hidden="true"><ChevronRight size={12} /></span>
          </p>
        </div>

        {/* Most read */}
        <div className="panel rounded-sm p-4">
          <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[18px] text-paper">MOST READ</h2>
          <ol className="mt-3 flex flex-col">
            {ranking.map((m) => (
              <li key={m.rank} className="border-b hairline last:border-b-0">
                <Link href={`/news/${m.slug}`} className="flex items-center gap-3 py-2.5 group min-h-[44px]">
                  <span className="font-cond font-bold text-[15px] text-paper w-7 h-7 border border-line rounded-sm flex items-center justify-center shrink-0 tabular-nums">{m.rank}</span>
                  <span className="flex-1 min-w-0 text-[13px] text-paper/90 truncate group-hover:text-paper">{m.title}</span>
                  <span className="font-mono text-[10px] text-dim uppercase shrink-0">{m.date}</span>
                </Link>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => setFullRanking((v) => !v)} className="mt-2 inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-dim hover:text-paper min-h-[44px]">
            {fullRanking ? 'SHOW TOP THREE' : 'VIEW FULL RANKING'}
            <span className="w-6 h-6 rounded-full border border-line flex items-center justify-center" aria-hidden="true"><ChevronRight size={12} className={cx('transition-transform', fullRanking && 'rotate-90')} /></span>
          </button>
        </div>
      </aside>
    </div>
  )
}

export default App;
