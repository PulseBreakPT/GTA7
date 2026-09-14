'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Heart, ChevronRight, FileText, Users, BookMarked, ScrollText } from 'lucide-react'
import { SourceChip, StatusBadge, cx, TypeChip } from '@/components/site/ui'
import { ReportedNotes, Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell, CategoryFooter, WhatLinksHere, StubNotice, WikiText, References, Hatnote, CitePage, PageInformation, Navbox, WhatThisLinks, ShortDescription, PageTools, Cite } from '@/components/site/wiki'
import { characters, relationships, characterBySlug } from '@/lib/content'
import { reportedFor, REPORTED_SOURCE } from '@/lib/reported'
import { characterIdentity, identityAttributes } from '@/lib/entity-identity'

const REL_BARS = [
  { key: 'trust', label: 'TRUST', color: '#C2185B' },
  { key: 'tension', label: 'TENSION', color: '#1B7773' },
  { key: 'risk', label: 'RISK', color: '#386BAA' },
]

// O índice é construído a partir das secções que a página serve mesmo.
//
// Estava fixo em quatro entradas enquanto a ficha servia seis secções com
// âncora própria: as notas da comunidade e as referências existiam na página,
// tinham endereço, e não apareciam no Contents. Um índice que não descreve o
// documento é pior do que não haver índice — promete que já se viu tudo.
//
// Não há «Appearances» nem «Gameplay» porque o registo de uma personagem não
// tem esses campos. Desenhá-las daria linhas de «Not published» seguidas, que
// é ruído a fingir-se de conteúdo. Quando os dados existirem, entram aqui.

function Portrait({ c, className, sizes = '120px' }) {
  const visual = c.image || c.contextImage
  const contextual = !c.image && Boolean(c.contextImage)
  if (visual) {
    return (
      <span className={cx('character-visual relative block overflow-hidden bg-surface2', contextual && 'is-contextual', className)} title={contextual ? c.imageCaption : undefined}>
        <Image src={visual} alt={contextual ? (c.imageCaption || `Official GTA VI context for ${c.name}`) : `Portrait of ${c.name}`} fill sizes={sizes} className={`object-cover ${contextual ? 'object-center' : 'object-top'}`} />
        {contextual && <span className="character-context-label">Context</span>}
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
  const identity = characterIdentity(c)
  const primaryRel = rels.find((r) => r.primary)
  const primaryOther = primaryRel ? characterBySlug(primaryRel.a === c.slug ? primaryRel.b : primaryRel.a) : null

  const notas = reportedFor('character', c.slug)

  // A referência só existe se o registo tiver fonte. Sem ela não há `[1]` no
  // texto nem entrada na lista — o silêncio é a leitura honesta.
  const temFonte = Boolean(c.sourceName)

  const seccoes = [
    { id: 'background', label: 'Story & background', icon: ScrollText },
    { id: 'relationships', label: 'Relationships', icon: Users },
    ...(notas.length ? [{ id: 'reported', label: 'Reported in community summaries', icon: FileText }] : []),
    { id: 'evidence', label: 'Evidence & sources', icon: BookMarked },
    ...(temFonte ? [{ id: 'references', label: 'References', icon: BookMarked }] : []),
  ]

  return (
    <div className="flex-1 flex flex-col">
      <div {...identityAttributes(identity)} className="entity-identity ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Characters', href: '/database/characters' }, { label: c.name }]} />

        {/* Identidade: quem é, em três segundos. O papel, o estado de prova e
            o grupo dizem-se aqui uma vez, e não voltam a dizer-se no corpo. */}
        <header className="wiki-article-header mt-5">
          <div className="wiki-article-meta flex flex-wrap items-center gap-2 mb-3">
            <TypeChip>{c.role}</TypeChip>
            <StatusBadge status={c.status} />
          </div>
          <h1 data-ghost="CHARACTERS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px]">{c.name}</h1>
          <ShortDescription>
            {c.role} in Grand Theft Auto VI{c.group ? ` · ${c.group}` : ''}
          </ShortDescription>
          <StubNotice kind="characters" slug={c.slug} />
          <Hatnote kind="characters" slug={c.slug} />

          {/* O lead: a abertura do artigo, antes do índice, como em qualquer
              enciclopédia. Estava a viver numa secção «Overview» a seguir ao
              Contents, o que obrigava o leitor a passar por um índice antes de
              saber de quem se tratava. O `[1]` a seguir liga à referência que o
              registo declara — e só aparece quando essa referência existe. */}
          <p className="wiki-lead mt-4 max-w-[72ch] text-[16px] leading-[1.8] text-paper/90">
            <WikiText exclude={`/database/characters/${c.slug}`}>{c.bio}</WikiText>
            {temFonte && <Cite n={1} label={c.sourceName} />}
          </p>
        </header>

        <PageTools kind="characters" slug={c.slug} />

        <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          {/* Corpo do artigo */}
          <div id="article-content" className="wiki-entry-primary wiki-article-body min-w-0 order-3 lg:order-1">
            <WikiSection id="background" title="Story & background">
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
                      <Portrait c={other} className="w-[46px] h-[46px] rounded-sm border border-line shrink-0" sizes="46px" />
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

            {/* Provas e fontes, num sítio só. Isto estava repartido pelo
                bloco «Details», pelas referências e pela caixa de dados: o
                mesmo estado, a mesma fonte e a mesma data ditos três vezes,
                com três nomes. A contagem de ligações e o resto do que é
                técnico ficam onde pertencem, na informação da página. */}
            <WikiSection id="evidence" title="Evidence & sources" className="mb-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge status={c.status} />
                <SourceChip name={c.sourceName} url={c.sourceUrl} prefix={null} />
              </div>
              <ReportedNotes items={notas} source={REPORTED_SOURCE} />
              <References items={[{ name: c.sourceName, url: c.sourceUrl, retrieved: c.updatedAt }]} />
            </WikiSection>

            <CategoryFooter kind="characters" slug={c.slug} />
            <CitePage kind="characters" slug={c.slug} />
            <PageInformation kind="characters" slug={c.slug} />
            <Navbox kind="characters" slug={c.slug} />
          </div>

          {/* Índice */}
          <div className="wiki-entry-tertiary order-1 lg:order-2">
            <TableOfContents sections={seccoes} />
          </div>

          {/* Character profile: o único sítio onde os campos estruturados
              aparecem em tabela. «Primary location», «First appearance» e
              «Actor» não constam porque o arquivo não guarda nenhum deles —
              e um campo inventado é pior do que um campo em falta. */}
          <div className="wiki-entry-secondary order-2 lg:order-3">
            <InfoboxShell title={c.name} subtitle="Character profile">
              <Portrait c={c} className="w-full aspect-[3/4] rounded-sm border border-line" sizes="(max-width:1024px) 100vw, 300px" />

              <div className="space-y-3 border-t border-black/10 pt-4">
                <InfoRow label="Role" value={c.role} />
                <InfoRow label="Affiliation">
                  <span className="capitalize">{c.group || 'Unspecified'}</span>
                </InfoRow>
                {primaryOther && (
                  <InfoRow label="Primary bond">
                    <Link href={`/database/characters/${primaryOther.slug}`} className="text-pink hover:text-paper transition-colors">{primaryOther.name}</Link>
                  </InfoRow>
                )}
                <InfoRow label="Documented relationships" value={String(rels.length)} />
                <InfoRow label="First recorded">
                  <span className="font-mono text-[11px] tracking-normal text-paper">{c.publishedAt}</span>
                </InfoRow>
              </div>

              <WhatLinksHere kind="characters" slug={c.slug} />
              <WhatThisLinks kind="characters" slug={c.slug} />
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
