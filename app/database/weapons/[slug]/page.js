'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, Heart, Zap, Eye, Target, Crosshair, FileText, Gauge, ListChecks, BookMarked } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, GhostBadge, StatBar, cx } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, SpecGrid, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References } from '@/components/site/wiki'
import WeaponVisual from '@/components/site/weapon-visual'
import { weapons, weaponTypes } from '@/lib/content'

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'performance', label: 'Performance', icon: Gauge },
  { id: 'specifications', label: 'Specifications', icon: ListChecks },
  { id: 'related', label: 'Related Weapons', icon: Crosshair },
  { id: 'references', label: 'References', icon: BookMarked },
]

function Attribution({ label, value, accent }) {
  if (!value) return null
  return (
    <div className={cx('border-l-2 pl-3', accent)}>
      <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">{label}</p>
      <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{value}</p>
    </div>
  )
}

function App() {
  const { slug } = useParams()
  const w = weapons.find((x) => x.slug === slug)
  const [slide, setSlide] = useState(0)

  if (!w) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/weapons" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO ARSENAL</Link>
      </div>
    )
  }

  // Um tipo sem entrada em `weaponTypes` devolvia `undefined` e rebentava a
  // página inteira. O fallback é obrigatório, não cortesia.
  const typeLabel = weaponTypes.find((t) => t.id === w.type)?.label || w.type.toUpperCase()
  const bars = [
    { icon: Heart, label: 'DAMAGE', value: w.stats[0], color: '#C2185B' },
    { icon: Zap, label: 'FIRE RATE', value: w.stats[1], color: '#0E7C6B' },
    { icon: Eye, label: 'ACCURACY', value: w.stats[2], color: '#5B3FD6' },
    { icon: Target, label: 'RANGE', value: w.stats[3], color: '#334155' },
  ]
  const related = weapons.filter((x) => x.type === w.type && x.slug !== w.slug).slice(0, 4)
  const gallery = w.gallery?.length ? w.gallery : [w.image]

  // A ficha técnica segue a dos veículos: pares rótulo/valor, começando pelos
  // campos de identificação da caixa de dados. O zero do registo não é uma
  // medida — nenhuma arma tem capacidade, reserva ou peso publicados —, por
  // isso não se imprime como número: o campo fica e diz que não há fonte.
  const num = (n, suffix = '') => (n ? `${n}${suffix}` : null)
  const specRows = [
    { label: 'Weapon type', value: typeLabel },
    { label: 'Manufacturer', value: w.manufacturer },
    { label: 'Association', value: w.association },
    w.character ? { label: 'Character', value: w.character } : null,
    { label: 'Status', children: <StatusBadge status={w.status} /> },
    { label: 'Evidence', children: <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{w.evidenceStatus}</span> },
    { label: 'Capacity', value: num(w.stats[4]) },
    { label: 'Reserve', value: num(w.mag) },
    { label: 'Weight', value: num(w.stats[5], ' KG') },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="weapons" />
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Weapons', href: '/database/weapons' }, { label: w.name }]} />

        <div className="data-rail mt-2">ARSENAL FILE · DOCUMENTED REFERENCE · ID {w.slug.toUpperCase()}</div>

        {/* Cabeçalho fora da grelha: o nome vem antes da caixa de dados em
            qualquer largura, como nas fichas das wikis. */}
        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={w.status} />
            <GhostBadge status="confirmed" label={typeLabel} />
            <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{w.evidenceStatus}</span>
          </div>
          <h1 data-ghost="WEAPONS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] mt-2">{w.name}</h1>
          <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]"><WikiText exclude={`/database/weapons/${w.slug}`}>{w.desc}</WikiText></p>
          <StubNotice kind="weapons" slug={w.slug} />
        </header>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          {/* Corpo do artigo */}
          <div className="min-w-0 order-2 lg:order-1">
            <WikiSection id="overview" title="Overview">
              <div className="flex flex-col gap-3">
                <Attribution label="Associated character / content" value={w.association} accent="border-mint/70" />
                <Attribution label="Manufacturer / brand" value={w.manufacturer} accent="border-violet/70" />
                <Attribution label="Character" value={w.character} accent="border-pink/70" />
                <Attribution label="Content" value={w.content} accent="border-mint/70" />
              </div>

              {(w.confirmedDetails?.length > 0 || w.notPublished?.length > 0) && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {w.confirmedDetails?.length > 0 && (
                    <div className="border border-mint/25 bg-mint/[0.03] p-3 rounded-sm">
                      <h3 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-mint">Officially confirmed</h3>
                      <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{w.confirmedDetails.map((detail) => <li key={detail}>• {detail}</li>)}</ul>
                    </div>
                  )}
                  {w.notPublished?.length > 0 && (
                    <div className="border border-line bg-surface2/40 p-3 rounded-sm">
                      <h3 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Not officially specified</h3>
                      <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{w.notPublished.map((detail) => <li key={detail}>• {detail}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}

              {/* O «APPEARS IN» dava bairros onde cada arma aparecia, e o default
                  punha Little Haiti e Vice Point em tudo o que não trouxesse
                  lista. Ninguém sabe onde aparece uma arma num jogo por sair. */}
            </WikiSection>

            <WikiSection id="performance" title="Performance">
              {w.unpublished ? (
                <div className="border border-line rounded-sm p-4">
                  <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Performance not published</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-dim">Rockstar has confirmed this item but has not released damage, fire-rate, accuracy or range figures.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {bars.map((b) => <StatBar key={b.label} {...b} right={b.value} />)}
                </div>
              )}
            </WikiSection>

            <WikiSection id="specifications" title="Specifications">
              <SpecGrid items={specRows} />
            </WikiSection>

            <WikiSection id="related" title="Related Weapons" className="mb-0">
              {related.length === 0 ? (
                <p className="text-dim text-[13px]">No other weapons recorded in this class.</p>
              ) : (
                <>
                  <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[13px] text-paper">SAME RACK</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/database/weapons/${r.slug}`} className="panel rounded-sm overflow-hidden hover:border-black/30 transition-colors">
                        {/* O mesmo visual do arsenal, fallback incluído: sem
                            captura oficial fica a mira, que é o que a lista
                            já diz destas armas. */}
                        <WeaponVisual w={r} className="h-[96px] w-full" sizes="(max-width: 640px) 45vw, 260px" />
                        <span className="block p-3">
                          <GhostBadge status={r.status} />
                          <span className="block font-cond font-bold uppercase text-[16px] text-paper mt-2 truncate">{r.name}</span>
                          <span className="block font-mono text-[11px] text-dim tabular-nums mt-1">{r.unpublished ? '— / —' : `${String(r.ammo).padStart(2, '0')} / ${r.mag}`}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </WikiSection>
            <References items={[{ name: w.sourceName, url: w.sourceUrl, retrieved: w.updatedAt }]} />
            <CategoryFooter kind="weapons" slug={w.slug} />
          </div>

          {/* Índice */}
          <div className="hidden lg:block order-3 lg:order-2">
            <TableOfContents sections={SECTIONS} />
          </div>

          {/* Caixa de dados */}
          <div className="order-1 lg:order-3">
            <InfoboxShell>
              <div>
                <div className="corner-brackets tech-mask relative panel overflow-hidden aspect-[16/10]">
                  {gallery[slide] ? (
                    <>
                      <Image src={gallery[slide]} alt={`${w.name} image ${slide + 1}`} fill priority sizes="(max-width:1024px) 100vw, 300px" className="object-cover" />
                    </>
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim">
                      <Crosshair size={32} aria-hidden="true" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-center px-2">CLASSIFIED — VISUAL PENDING</span>
                    </span>
                  )}
                  {gallery.length > 1 && (
                    <>
                      <button type="button" onClick={() => setSlide((slide - 1 + gallery.length) % gallery.length)} aria-label="Previous weapon image" className="absolute left-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowLeft size={14} /></button>
                      <button type="button" onClick={() => setSlide((slide + 1) % gallery.length)} aria-label="Next weapon image" className="absolute right-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowRight size={14} /></button>
                    </>
                  )}
                </div>
                {gallery.length > 1 && (
                  <div className="mt-2 flex gap-2 overflow-x-auto">
                    {gallery.map((src, i) => (
                      <button key={src} type="button" onClick={() => setSlide(i)} aria-label={`Show image ${i + 1}`} className={cx('relative w-16 h-10 shrink-0 overflow-hidden border', i === slide ? 'border-pink' : 'border-line')}>
                        <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t border-black/10 pt-4">
                <InfoRow label="Weapon type" value={typeLabel} />
                <InfoRow label="Manufacturer" value={w.manufacturer} />
                <InfoRow label="Association" value={w.association} />
                <InfoRow label="Character" value={w.character} />
                <InfoRow label="Status">
                  <StatusBadge status={w.status} />
                </InfoRow>
                <InfoRow label="Evidence">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{w.evidenceStatus}</span>
                </InfoRow>
              </div>

              <div className="border-t border-black/10 pt-4">
                {w.sourceUrl ? (
                  <a href={w.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors">
                    SOURCE: {w.sourceName.toUpperCase()} <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="font-cond uppercase tracking-[0.12em] text-[11px] text-dim">SOURCE: {w.sourceName.toUpperCase()}</span>
                )}
                <p className="font-mono text-[9px] text-dim mt-2">Updated {w.updatedAt}</p>
              </div>
              <WhatLinksHere kind="weapons" slug={w.slug} />
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
