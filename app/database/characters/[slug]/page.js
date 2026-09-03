'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Heart, ExternalLink, ChevronRight, FileText, Users, Zap, BookMarked } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, cx } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References } from '@/components/site/wiki'
import { characters, relationships, mechanics, characterBySlug } from '@/lib/content'

const REL_BARS = [
  { key: 'trust', label: 'TRUST', color: '#C2185B' },
  { key: 'tension', label: 'TENSION', color: '#0E7C6B' },
  { key: 'risk', label: 'RISK', color: '#5B3FD6' },
]

const SECTIONS = [
  { id: 'background', label: 'Background', icon: FileText },
  { id: 'relationships', label: 'Relationships', icon: Users },
  { id: 'mechanics', label: 'Associated Mechanics', icon: Zap },
  { id: 'references', label: 'References', icon: BookMarked },
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

// A relação principal ganha o cartão em destaque — duas fotos lado a lado
// com um coração entre elas, como o HUD de relação do jogo. As restantes
// ligações continuam na lista compacta com as barras de confiança/tensão.
function RelationshipDuo({ c, other }) {
  return (
    <Link href={`/database/characters/${other.slug}`} className="group panel rounded-sm p-3 flex items-center gap-3 hover:border-pink/50 transition-colors">
      <span className="shrink-0 min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[10px] text-dim group-hover:border-black/40">R1</span>
      <span className="flex items-center shrink-0">
        <Portrait c={c} className="w-[54px] h-[54px] border border-black/70" sizes="54px" />
        <span className="relative z-[1] -mx-2.5 w-8 h-8 rounded-full bg-ink border border-pink/50 flex items-center justify-center" aria-hidden="true">
          <Heart size={14} fill="#C2185B" stroke="#C2185B" strokeWidth={1} />
        </span>
        <Portrait c={other} className="w-[54px] h-[54px] border border-line" sizes="54px" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-cond font-bold uppercase text-[15px] text-paper truncate">{other.name}</span>
        <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{other.role} · PRIMARY BOND</span>
      </span>
      <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
    </Link>
  )
}

function App() {
  const { slug } = useParams()
  const c = characters.find((x) => x.slug === slug)

  if (!c) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/characters" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO CHARACTERS</Link>
      </div>
    )
  }

  const rels = relationships.filter((r) => r.a === c.slug || r.b === c.slug)
  const mechs = mechanics.slice(0, 4)
  const primaryRel = rels.find((r) => r.primary)
  const primaryOther = primaryRel ? characterBySlug(primaryRel.a === c.slug ? primaryRel.b : primaryRel.a) : null

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="characters" />
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Characters', href: '/database/characters' }, { label: c.name }]} />

        <div className="data-rail mt-2">CHARACTER FILE · SOURCE-BOUND RECORD · ID {c.slug.toUpperCase()}</div>

        {/* Cabeçalho fora da grelha: o nome vem antes da caixa de dados em
            qualquer largura, como nas fichas das wikis. */}
        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{c.role}</span>
            <StatusBadge status={c.status} />
          </div>
          <h1 data-ghost="CHARACTERS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px]">{c.name}</h1>
          <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]"><WikiText exclude={`/database/characters/${c.slug}`}>{c.bio}</WikiText></p>
          <StubNotice kind="characters" slug={c.slug} />
        </header>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          {/* Corpo do artigo */}
          <div className="min-w-0 order-2 lg:order-1">
            <WikiSection id="background" title="Background">
              <p className="text-dim text-[14px] leading-[1.8]"><WikiText exclude={`/database/characters/${c.slug}`}>{c.long}</WikiText></p>
            </WikiSection>

            <WikiSection id="relationships" title="Relationships">
              <div className="space-y-3">
                {rels.length === 0 && <p className="text-dim text-[13px]">No documented relationships.</p>}
                {rels.filter((r) => r.primary).map((r) => {
                  const other = characterBySlug(r.a === c.slug ? r.b : r.a)
                  if (!other) return null
                  return <RelationshipDuo key={other.slug} c={c} other={other} />
                })}
                {rels.filter((r) => !r.primary).map((r) => {
                  const other = characterBySlug(r.a === c.slug ? r.b : r.a)
                  if (!other) return null
                  return (
                    <Link key={other.slug} href={`/database/characters/${other.slug}`} className="panel rounded-sm p-3 flex flex-wrap sm:flex-nowrap items-center gap-3 hover:border-black/30 transition-colors">
                      <Portrait c={other} className="w-[46px] h-[46px] rounded-sm border border-line shrink-0 text-[14px]" sizes="46px" />
                      <span className="min-w-0 flex-1 sm:flex-none sm:w-[110px]">
                        <span className="block font-cond font-bold uppercase text-[14px] text-paper truncate">{other.name}</span>
                        <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{other.role}</span>
                      </span>
                      <span className="basis-full sm:basis-auto flex-1 flex flex-col gap-1">
                        {REL_BARS.map((b) => (
                          <span key={b.key} className="flex items-center gap-1.5">
                            <span className="font-cond uppercase text-[7px] tracking-[0.14em] text-dim w-10">{b.label}</span>
                            <span className="relative flex-1 h-[4px] rounded-full bg-black/10 overflow-hidden"><span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${r[b.key]}%`, backgroundColor: b.color }} /></span>
                          </span>
                        ))}
                      </span>
                      <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            </WikiSection>

            <WikiSection id="mechanics" title="Associated Mechanics" className="mb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mechs.map((m) => (
                  <Link key={m.slug} href={`/database/mechanics?m=${m.slug}`} className="panel rounded-sm p-4 hover:border-black/30 transition-colors">
                    <span className="flex items-center justify-between">
                      <span className="font-cond font-bold uppercase text-[16px] text-paper leading-tight">{m.name}</span>
                      <span className="shrink-0 min-w-[24px] h-[20px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[10px] text-dim">{m.glyph}</span>
                    </span>
                    <span className="block text-[12px] text-dim leading-relaxed mt-2 clamp-2">{m.desc}</span>
                  </Link>
                ))}
              </div>
            </WikiSection>
            <References items={[{ name: c.sourceName, url: c.sourceUrl, retrieved: c.updatedAt }]} />
            <CategoryFooter kind="characters" slug={c.slug} />
          </div>

          {/* Índice */}
          <div className="hidden lg:block order-3 lg:order-2">
            <TableOfContents sections={SECTIONS} />
          </div>

          {/* Caixa de dados */}
          <div className="order-1 lg:order-3">
            <InfoboxShell>
              <Portrait c={c} className="w-full aspect-[3/4] rounded-sm border border-line" sizes="(max-width:1024px) 100vw, 300px" />

              <div className="space-y-3 border-t border-black/10 pt-4">
                <InfoRow label="Role" value={c.role} />
                <InfoRow label="Group">
                  <span className="capitalize">{c.group || 'Unspecified'}</span>
                </InfoRow>
                <InfoRow label="Status">
                  <StatusBadge status={c.status} />
                </InfoRow>
                {primaryOther && (
                  <InfoRow label="Primary bond">
                    <Link href={`/database/characters/${primaryOther.slug}`} className="text-pink hover:text-paper transition-colors">{primaryOther.name}</Link>
                  </InfoRow>
                )}
              </div>

              <div className="border-t border-black/10 pt-4">
                <a href={c.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors">
                  {c.sourceName ? c.sourceName.toUpperCase() : 'SOURCE'} <ExternalLink size={10} />
                </a>
                <p className="font-mono text-[9px] text-dim mt-2">Updated {c.updatedAt}</p>
              </div>
              <WhatLinksHere kind="characters" slug={c.slug} />
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
