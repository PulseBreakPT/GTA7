'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Heart, Zap, Eye, CircleDot, FileText, Gauge, ListChecks, Car, BookMarked, ShieldCheck, Wrench, MapPinned } from 'lucide-react'
import { SourceChip, StatBar, StatusBadge, cx, TypeChip } from '@/components/site/ui'
import { ReportedNotes, Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, SpecGrid, CategoryFooter, WhatLinksHere, StubNotice, References, WikiText, Hatnote, CitePage, PageInformation, Navbox, WhatThisLinks, ShortDescription, PageTools } from '@/components/site/wiki'
import VehicleVisual from '@/components/site/vehicle-visual'
import { vehicles, vehicleClasses } from '@/lib/content'
import { reportedFor, REPORTED_SOURCE } from '@/lib/reported'
import { identityAttributes, vehicleIdentity } from '@/lib/entity-identity'
import { vehicleBible } from '@/lib/vehicle-bible'
import Image from 'next/image'

// Campos seguidos com o mesmo valor mostram-se uma só vez, com os rótulos
// juntos — «Not published for this model» três vezes seguidas é ruído.
const mergeSameValues = (rows) => rows.reduce((list, [label, value]) => {
  const same = list.find((row) => row[1] === value)
  if (same) same[0] = `${same[0]} · ${label}`
  else list.push([label, value])
  return list
}, [])

// Ver a ficha de arma: a ausência chega do «bible» escrita em prosa, e era
// desenhada como se fosse dado. Declara-se numa linha em vez de ocupar a
// secção inteira — a informação mantém-se, o ruído sai.
const ausente = (value) => !value || /not (?:published|recorded|officially specified)|^—$|^unknown$/i.test(String(value).trim())


// A ordem é a das fichas de veículo das wikis grandes: identificação e
// imagem primeiro, depois o que a fonte diz, depois desempenho, depois
// ficha técnica, e por fim o que se lhe parece. O índice à esquerda e a
// caixa de dados à direita são os mesmos das outras fichas do arquivo.
const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'evidence', label: 'Evidence & identity', icon: ShieldCheck },
  { id: 'ownership', label: 'Theft & ownership', icon: MapPinned },
  { id: 'customisation', label: 'Variants & culture', icon: Wrench },
  { id: 'performance', label: 'Performance', icon: Gauge },
  { id: 'specifications', label: 'Specifications', icon: ListChecks },
  { id: 'related', label: 'Related Vehicles', icon: Car },
  { id: 'references', label: 'References', icon: BookMarked },
]

function Attribution({ label, value, accent, exclude }) {
  if (!value) return null
  return (
    <div className={cx('border-l-2 pl-3', accent)}>
      <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim">{label}</p>
      <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1"><WikiText exclude={exclude}>{value}</WikiText></p>
    </div>
  )
}

function App() {
  const { slug } = useParams()
  const v = vehicles.find((x) => x.slug === slug)
  const [favs, setFavs] = useState([])
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    try { setFavs(JSON.parse(localStorage.getItem('la:favs') || '[]')) } catch { /* noop */ }
  }, [])

  if (!v) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/vehicles" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO GARAGE</Link>
      </div>
    )
  }

  const isFav = favs.includes(v.slug)
  const toggleFav = () => {
    const next = isFav ? favs.filter((s) => s !== v.slug) : [...favs, v.slug]
    setFavs(next)
    localStorage.setItem('la:favs', JSON.stringify(next))
  }

  const stats = [
    { icon: Heart, label: 'SPEED', value: v.stats[0], color: 'var(--archive-accent)' },
    { icon: Zap, label: 'ACCELERATION', value: v.stats[1], color: '#816632' },
    { icon: Eye, label: 'BRAKING', value: v.stats[2], color: '#C83032' },
    { icon: CircleDot, label: 'HANDLING', value: v.stats[3], color: '#2B2230' },
  ]
  const related = vehicles.filter((x) => x.cls === v.cls && x.slug !== v.slug).slice(0, 4)
  const gallery = v.gallery?.length ? v.gallery : [v.image]
  const identity = vehicleIdentity(v)
  const bible = vehicleBible(v)
  const classLabel = (vehicleClasses.find((c) => c.id === v.cls) || {}).label || v.cls

  // A ficha técnica repete os campos de identificação da caixa de dados —
  // é o que se lê primeiro numa wiki e o que se copia para fora dela — e
  // acrescenta os quatro campos mecânicos. O travessão da fonte não é um
  // valor: passa a nulo, e a grelha di-lo por palavras.
  const spec = (i) => (v.specs?.[i] && v.specs[i] !== '—' ? v.specs[i] : null)
  const specRows = [
    { label: 'Doors', value: spec(0) },
    { label: 'Seats', value: spec(1) },
    { label: 'Drivetrain', value: spec(2) },
    { label: 'Engine', value: spec(3) },
  ]

  return (
    <div className="flex-1 flex flex-col">
      <div {...identityAttributes(identity)} className="entity-identity ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Vehicles', href: '/database/vehicles' }, { label: v.name }]} />

        {/* Cabeçalho fora da grelha: nas fichas de wiki o nome vem sempre
            antes da caixa de dados, mesmo em ecrã estreito. */}
        <header className="wiki-article-header mt-5">
          <div className="wiki-article-meta flex flex-wrap items-center gap-2">
            <TypeChip>{classLabel}</TypeChip>
            <StatusBadge status={v.status} />
          </div>
          <h1 data-ghost="VEHICLES" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] mt-2">{v.name}</h1>
          <ShortDescription>
            {/* O «Unit NNN» saiu: era o número de ordem do catálogo interno
                apresentado como se fosse uma designação do veículo. Nada no
                jogo lhe chama isso, e o leitor não tem como o usar. */}
            {classLabel} in Grand Theft Auto VI{v.manufacturer && v.manufacturer !== 'NOT OFFICIALLY SPECIFIED' ? `, by ${v.manufacturer}` : ''}
          </ShortDescription>
          <StubNotice kind="vehicles" slug={v.slug} />
          <Hatnote kind="vehicles" slug={v.slug} />
        </header>

        <PageTools kind="vehicles" slug={v.slug} />

        <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          {/* Corpo do artigo */}
          <div id="article-content" className="wiki-entry-primary wiki-article-body min-w-0 order-3 lg:order-1">
            <WikiSection id="overview" title="Overview">
              <div className="flex flex-col gap-3">
                <Attribution label="Content" value={v.content} accent="border-mint/70" exclude={`/database/vehicles/${v.slug}`} />
              </div>

              {(v.confirmedDetails?.length > 0 || v.notPublished?.length > 0) && (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {v.confirmedDetails?.length > 0 && (
                    <div className="border border-mint/25 bg-mint/[0.03] p-3 rounded-sm">
                      {/* «Officially confirmed» dizia-se por cima de fichas
                          cujo nome é inferido. O que a lista traz é o que a
                          fonte estabelece — e o rótulo de prova, ao lado do
                          título, é que diz quão longe isso vai. */}
                      <h3 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-mint">What the source establishes</h3>
                      <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{v.confirmedDetails.map((detail) => <li key={detail}>• {detail}</li>)}</ul>
                    </div>
                  )}
                  {v.notPublished?.length > 0 && (
                    <div className="border border-line bg-surface2/40 p-3 rounded-sm">
                      <h3 className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Not officially specified</h3>
                      <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-dim">{v.notPublished.map((detail) => <li key={detail}>• {detail}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}
            </WikiSection>

            <WikiSection id="evidence" title="Evidence & identity">
              <div className="vehicle-bible-fact-grid">
                <article className="vehicle-bible-tier-card">
                  <ShieldCheck size={18} aria-hidden="true" />
                  <span>Archive evidence tier</span>
                  <strong>{bible.evidenceLevel}</strong>
                  <p>{bible.evidenceMeaning}</p>
                </article>
                <dl>
                  <div><dt>GTA name</dt><dd>{bible.nameState}</dd></div>
                  <div><dt>Source notes</dt><dd>{bible.sourceNotes ? `${bible.sourceNotes} documented note${bible.sourceNotes === 1 ? '' : 's'}` : 'No detailed note attached'}</dd></div>
                  <div><dt>Region seen</dt><dd>{bible.region}</dd></div>
                </dl>
              </div>
              <p className="vehicle-bible-disclaimer">A vehicle visible in official footage is not automatically an officially named GTA vehicle. Community comparisons stay in the inspiration field and never overwrite the fictional identity.</p>
            </WikiSection>

            <WikiSection id="ownership" title="Theft, ownership & storage">
              {(() => {
                const linhas = mergeSameValues([
                  ['Theft method', bible.theftMethod],
                  ['Security tier', bible.security],
                  ['Tracker', bible.tracker],
                  ['Fence value', bible.fenceValue],
                  ['Ownership', bible.ownership],
                  ['Storage', bible.storage],
                  ['Fuel / charging', bible.fuel],
                ])
                const conhecidas = linhas.filter(([, value]) => !ausente(value))
                const ausentes = linhas.filter(([, value]) => ausente(value))
                return (
                  <>
                    {conhecidas.length > 0 && (
                      <dl className="vehicle-bible-data-grid">
                        {conhecidas.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                      </dl>
                    )}
                    {ausentes.length > 0 && (
                      <p className={`text-[12px] leading-relaxed text-dim ${conhecidas.length > 0 ? 'mt-3' : ''}`}>
                        <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Not published by Rockstar:</span>{' '}
                        {ausentes.map(([label]) => label).join(' · ')}
                      </p>
                    )}
                  </>
                )
              })()}
              <div className="vehicle-bible-system-note"><MapPinned size={17} aria-hidden="true" /><p><strong>System context:</strong> {bible.systemNote}</p></div>
            </WikiSection>

            <WikiSection id="customisation" title="Variants, inspiration & regional role">
              <dl className="vehicle-bible-data-grid vehicle-bible-data-grid-wide">
                <div><dt>Known variant</dt><dd>{bible.variant}</dd></div>
                <div><dt>Real-world inspiration</dt><dd>{bible.realWorldInspiration}</dd></div>
                <div><dt>Customisation</dt><dd>{bible.customisation}</dd></div>
                <div><dt>Related business</dt><dd>{bible.business}</dd></div>
              </dl>
            </WikiSection>

            <WikiSection id="performance" title="Performance">
              {v.unpublished ? (
                <div className="border border-line rounded-sm p-4">
                  <p className="font-cond font-semibold uppercase tracking-[0.14em] text-[11px] text-pink">Performance not published</p>
                  {/* Não se pode dizer «Rockstar has named this vehicle» numa
                      ficha que, umas linhas acima, diz que o nome não foi
                      publicado. O texto passa a seguir a mesma bandeira. */}
                  <p className="mt-1.5 text-[12px] leading-relaxed text-dim">
                    {bible?.nameState === 'GTA name published'
                      ? 'Rockstar has named this vehicle but has not released speed, acceleration, braking or handling figures.'
                      : 'Rockstar has shown this vehicle but has not published its GTA name or any speed, acceleration, braking or handling figures.'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {stats.map((s) => <StatBar key={s.label} {...s} right={s.value} />)}
                </div>
              )}
            </WikiSection>

            <WikiSection id="specifications" title="Specifications">
              <SpecGrid items={specRows} />
            </WikiSection>

            <WikiSection id="related" title="Related Vehicles" className="mb-0">
              {related.length === 0 ? (
                <p className="text-dim text-[13px]">No other vehicles recorded in this class.</p>
              ) : (
                <>
                  <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[13px] text-paper">SAME CLASS</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/database/vehicles/${r.slug}`} className="panel rounded-sm overflow-hidden hover:border-black/30 transition-colors">
                        {/* O mesmo visual da garagem, fallback incluído: sem
                            captura oficial fica o ícone da classe e o aviso,
                            que é o que a lista já diz destes veículos. */}
                        <VehicleVisual v={r} className="h-[104px] w-full" sizes="(max-width: 640px) 45vw, 260px" />
                        <span className="block p-3">
                          <span className="block font-cond font-bold uppercase text-[16px] text-paper mt-1 truncate">{r.name}</span>
                          <StatusBadge status={r.status} className="mt-2" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </WikiSection>
            <ReportedNotes items={reportedFor('vehicle', v.slug)} source={REPORTED_SOURCE} />
            <References items={[{ name: v.sourceName, url: v.sourceUrl, retrieved: v.updatedAt }]} />
            <CategoryFooter kind="vehicles" slug={v.slug} />
            <CitePage kind="vehicles" slug={v.slug} />
            <PageInformation kind="vehicles" slug={v.slug} />
            <Navbox kind="vehicles" slug={v.slug} />
          </div>

          {/* Índice */}
          <div className="wiki-entry-tertiary order-1 lg:order-2">
            <TableOfContents sections={SECTIONS} />
          </div>

          {/* Caixa de dados */}
          <div className="wiki-entry-secondary order-2 lg:order-3">
            <InfoboxShell title={v.name} subtitle="Vehicle profile">
              <div>
                <div className="corner-brackets tech-mask relative panel overflow-hidden aspect-[16/10]">
                  {gallery[slide] ? (
                    <Image src={gallery[slide]} alt={`${v.name} image ${slide + 1}`} fill priority sizes="(max-width:1024px) 100vw, 300px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dim">
                      <Car size={32} aria-hidden="true" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em]">AWAITING VISUAL</span>
                    </span>
                  )}
                  {gallery.length > 1 && (
                    <>
                      <button type="button" onClick={() => setSlide((slide - 1 + gallery.length) % gallery.length)} aria-label="Previous vehicle image" className="absolute left-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowLeft size={14} /></button>
                      <button type="button" onClick={() => setSlide((slide + 1) % gallery.length)} aria-label="Next vehicle image" className="absolute right-2 top-1/2 -translate-y-1/2 panel2 rounded-full w-9 h-9 flex items-center justify-center text-paper"><ArrowRight size={14} /></button>
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
                <InfoRow label="Vehicle class" value={classLabel} />
                <InfoRow label="Manufacturer" value={v.manufacturer} />
                <InfoRow label="Association" value={v.association} />
                <InfoRow label="Character" value={v.character} />
              </div>

              <div className="border-t border-black/10 pt-4">
                <button type="button" onClick={toggleFav} aria-pressed={isFav} className={cx('w-full inline-flex items-center justify-center gap-2 border h-11 px-4 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] transition-colors', isFav ? 'border-pink text-pink' : 'border-line text-paper hover:border-black/50')}>
                  <Heart size={14} fill={isFav ? '#C2185B' : 'transparent'} />
                  {isFav ? 'IN YOUR COLLECTION' : 'ADD TO FAVOURITES'}
                </button>
              </div>

              <div className="border-t border-black/10 pt-4">
                {/* Ver as armas: um campo, um sítio. A data de revisão vive
                    no registo de conhecimento. */}
              </div>
              <WhatLinksHere kind="vehicles" slug={v.slug} />
              <WhatThisLinks kind="vehicles" slug={v.slug} />
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
