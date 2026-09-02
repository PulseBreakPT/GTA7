'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Heart, ExternalLink, ChevronRight, FileText, Users, Zap, Sparkles } from 'lucide-react'
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

// A relação principal ganha o cartão em destaque — duas fotos lado a lado
// com um coração entre elas, como o HUD de relação do jogo. As restantes
// ligações continuam na lista compacta com as barras de confiança/tensão.
function RelationshipDuo({ c, other, rel }) {
  return (
    <Link href={`/database/characters/${other.slug}`} className="group panel rounded-sm p-3 flex items-center gap-3 hover:border-pink/50 transition-colors">
      <span className="shrink-0 min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[10px] text-dim group-hover:border-white/40">R1</span>
      <span className="flex items-center shrink-0">
        <Portrait c={c} className="w-[54px] h-[54px] border border-white/70" sizes="54px" />
        <span className="relative z-[1] -mx-2.5 w-8 h-8 rounded-full bg-ink border border-pink/50 flex items-center justify-center" aria-hidden="true">
          <Heart size={14} fill="#F1A3C3" stroke="#F1A3C3" strokeWidth={1} />
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

// Componente de infobox estruturado (padrão wiki)
function Infobox({ c, rels }) {
  const primaryRel = rels.find((r) => r.primary)
  const primaryOther = primaryRel ? characterBySlug(primaryRel.a === c.slug ? primaryRel.b : primaryRel.a) : null

  return (
    <aside className="panel rounded-sm p-5 bg-ink/30 sticky top-24 h-fit">
      <div className="space-y-4">
        {/* Imagem */}
        <Portrait c={c} className="w-full aspect-[3/4] rounded-sm border border-line" sizes="300px" />

        {/* Atributos-chave */}
        <div className="space-y-3 border-t border-white/10 pt-4">
          <div>
            <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Role</span>
            <p className="font-cond font-bold text-[15px] text-paper mt-1">{c.role}</p>
          </div>
          <div>
            <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Group</span>
            <p className="font-cond font-semibold text-[13px] text-paper/85 mt-1 capitalize">{c.group || 'Unspecified'}</p>
          </div>
          <div>
            <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Status</span>
            <div className="mt-1">
              <StatusBadge status={c.status} />
            </div>
          </div>
          {primaryOther && (
            <div>
              <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Primary Bond</span>
              <Link href={`/database/characters/${primaryOther.slug}`} className="block mt-1 font-cond font-semibold text-[13px] text-pink hover:text-paper transition-colors">
                {primaryOther.name}
              </Link>
            </div>
          )}
        </div>

        {/* Source */}
        <div className="border-t border-white/10 pt-4">
          <a href={c.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40 transition-colors">
            SOURCE <ExternalLink size={10} />
          </a>
          <p className="font-mono text-[9px] text-dim mt-2">Updated {c.updatedAt}</p>
        </div>
      </div>
    </aside>
  )
}

// Table of Contents flutuante
function TableOfContents() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.id)
      })
    }, { rootMargin: '0px 0px -60% 0px' })

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const sections = [
    { id: 'background', label: 'Background', icon: FileText },
    { id: 'relationships', label: 'Relationships', icon: Users },
    { id: 'mechanics', label: 'Associated Mechanics', icon: Zap },
  ]

  return (
    <nav className="hidden lg:block sticky top-24 h-fit">
      <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim mb-3">Contents</p>
      <ul className="space-y-2">
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cx(
                'inline-flex items-center gap-2 font-cond uppercase tracking-[0.08em] text-[12px] transition-colors',
                activeId === id ? 'text-pink' : 'text-dim hover:text-paper'
              )}
            >
              <Icon size={12} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
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

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="characters" />
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/database/characters" className="inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-dim hover:text-paper min-h-[44px]">
          <ArrowLeft size={15} /> CHARACTERS
        </Link>

        <div className="data-rail mt-2">CHARACTER FILE · SOURCE-BOUND RECORD · ID {c.slug.toUpperCase()}</div>

        <div className="mt-6 max-w-[1400px] grid grid-cols-1 lg:grid-cols-[1fr_280px_280px] gap-8">
          {/* Main content */}
          <div className="min-w-0">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-[3px] rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[11px] bg-pink text-ink">{c.role}</span>
                <StatusBadge status={c.status} />
              </div>
              <h1 data-ghost="CHARACTERS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px]">{c.name}</h1>
              <p className="text-paper/85 text-[16px] leading-relaxed mt-4">{c.bio}</p>
            </div>

            {/* Seção: Background */}
            <section data-section id="background" className="mb-12 scroll-mt-24">
              <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper border-b border-white/10 pb-3 mb-4">Background</h2>
              <p className="text-dim text-[14px] leading-[1.8]">{c.long}</p>
            </section>

            {/* Seção: Relationships */}
            <section data-section id="relationships" className="mb-12 scroll-mt-24">
              <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper border-b border-white/10 pb-3 mb-4">Relationships</h2>
              <div className="space-y-3">
                {rels.length === 0 && <p className="text-dim text-[13px]">No documented relationships.</p>}
                {rels.filter((r) => r.primary).map((r) => {
                  const other = characterBySlug(r.a === c.slug ? r.b : r.a)
                  if (!other) return null
                  return <RelationshipDuo key={other.slug} c={c} other={other} rel={r} />
                })}
                {rels.filter((r) => !r.primary).map((r) => {
                  const other = characterBySlug(r.a === c.slug ? r.b : r.a)
                  if (!other) return null
                  return (
                    <Link key={other.slug} href={`/database/characters/${other.slug}`} className="panel rounded-sm p-3 flex flex-wrap sm:flex-nowrap items-center gap-3 hover:border-white/30 transition-colors">
                      <Portrait c={other} className="w-[46px] h-[46px] rounded-sm border border-line shrink-0 text-[14px]" sizes="46px" />
                      <span className="min-w-0 flex-1 sm:flex-none sm:w-[110px]">
                        <span className="block font-cond font-bold uppercase text-[14px] text-paper truncate">{other.name}</span>
                        <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{other.role}</span>
                      </span>
                      <span className="basis-full sm:basis-auto flex-1 flex flex-col gap-1">
                        {REL_BARS.map((b) => (
                          <span key={b.key} className="flex items-center gap-1.5">
                            <span className="font-cond uppercase text-[7px] tracking-[0.14em] text-dim w-10">{b.label}</span>
                            <span className="relative flex-1 h-[4px] rounded-full bg-white/10 overflow-hidden"><span className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${r[b.key]}%`, backgroundColor: b.color }} /></span>
                          </span>
                        ))}
                      </span>
                      <ChevronRight size={14} className="text-dim shrink-0" aria-hidden="true" />
                    </Link>
                  )
                })}
              </div>
            </section>

            {/* Seção: Associated Mechanics */}
            <section data-section id="mechanics" className="scroll-mt-24">
              <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper border-b border-white/10 pb-3 mb-4">Associated Mechanics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          {/* Sidebar: Table of Contents (hidden em mobile) */}
          <div className="hidden lg:block">
            <TableOfContents />
          </div>

          {/* Sidebar: Infobox */}
          <div className="hidden lg:block">
            <Infobox c={c} rels={rels} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
