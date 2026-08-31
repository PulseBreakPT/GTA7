'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, Heart, Zap, Eye, ExternalLink, ChevronRight } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, cx } from '@/components/site/ui'
import { characters, relationships, mechanics, characterBySlug } from '@/lib/content'

const REL_BARS = [
  { key: 'trust', label: 'TRUST', color: '#F1A3C3' },
  { key: 'tension', label: 'TENSION', color: '#65DCCB' },
  { key: 'risk', label: 'RISK', color: '#9B83F4' },
]

function Portrait({ c, className, sizes = '120px' }) {
  if (c.image) {
    return (
      <span className={cx('relative block overflow-hidden bg-surface2', className)}>
        <Image src={c.image} alt={`Portrait of ${c.name}`} fill sizes={sizes} className="object-cover object-top" />
      </span>
    )
  }
  const initials = c.name.split(' ').map((p) => p[0]).join('').slice(0, 2)
  return <span className={cx('flex items-center justify-center bg-surface2 text-dim font-cond font-bold', className)} role="img" aria-label={`${c.name}: portrait pending`}>{initials}</span>
}

function App() {
  const { slug } = useParams()
  const c = characters.find((x) => x.slug === slug)

  if (!c) {
    return (
      <div className="px-8 py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/characters" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO CHARACTERS</Link>
      </div>
    )
  }

  const rels = relationships.filter((r) => r.a === c.slug || r.b === c.slug)
  const mechs = mechanics.slice(0, 4)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="characters" />
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto">
        <Link href="/database/characters" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
          <ArrowLeft size={15} /> CHARACTERS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.3fr] gap-6 mt-2">
          <Portrait c={c} className="rounded-sm border border-line min-h-[380px] text-[48px]" sizes="(max-width:1024px) 100vw, 40vw" />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{c.role}</span>
              <StatusBadge status={c.status} />
            </div>
            <h1 className="font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] mt-2">{c.name}</h1>
            <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[520px]">{c.bio}</p>
            <p className="text-dim text-[14px] leading-[1.8] mt-3 max-w-[560px]">{c.long}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={c.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40">
                SOURCE: {c.sourceName.toUpperCase()} <ExternalLink size={11} />
              </a>
              <span className="font-mono text-[10px] text-dim uppercase">UPDATED {c.updatedAt}</span>
            </div>

            <h2 className="font-cond font-semibold uppercase tracking-[0.18em] text-[12px] text-pink mt-7">RELATIONSHIPS</h2>
            <div className="mt-2 flex flex-col gap-2">
              {rels.length === 0 && <p className="text-dim text-[13px]">No documented relationships yet.</p>}
              {rels.map((r) => {
                const other = characterBySlug(r.a === c.slug ? r.b : r.a)
                if (!other) return null
                return (
                  <Link key={other.slug} href={`/database/characters/${other.slug}`} className="panel rounded-sm p-3 flex items-center gap-3 hover:border-white/30 transition-colors">
                    <Portrait c={other} className="w-[46px] h-[46px] rounded-sm border border-line shrink-0 text-[14px]" sizes="46px" />
                    <span className="min-w-0 w-[110px] shrink-0">
                      <span className="block font-cond font-bold uppercase text-[14px] text-paper truncate">{other.name}</span>
                      <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{other.role}{r.primary ? ' · PRIMARY' : ''}</span>
                    </span>
                    <span className="flex-1 flex flex-col gap-1">
                      {REL_BARS.map((b) => (
                        <span key={b.key} className="flex items-center gap-1.5">
                          <span className="font-cond uppercase text-[7px] tracking-[0.14em] text-dim w-10">{b.label}</span>
                          <span className="relative flex-1 h-[4px] bg-white/10"><span className="absolute inset-y-0 left-0" style={{ width: `${r[b.key]}%`, backgroundColor: b.color }} /></span>
                        </span>
                      ))}
                    </span>
                    <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <section className="mt-10" aria-label="Associated mechanics">
          <h2 className="font-cond font-semibold uppercase tracking-[0.22em] text-[13px] text-pink">ASSOCIATED MECHANICS</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {mechs.map((m) => (
              <Link key={m.slug} href={`/database/mechanics?m=${m.slug}`} className="panel rounded-sm p-4 hover:border-white/30 transition-colors">
                <span className="flex items-center justify-between">
                  <span className="font-cond font-bold uppercase text-[16px] text-paper leading-tight">{m.name}</span>
                  <span className="shrink-0 min-w-[24px] h-[20px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[10px] text-dim">{m.glyph}</span>
                </span>
                <span className="block text-[12px] text-dim leading-relaxed mt-2 clamp-2">{m.desc}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App;
