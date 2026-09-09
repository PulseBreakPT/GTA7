'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookMarked, ExternalLink, Link2 } from 'lucide-react'
import { cx } from './ui'
import {
  Breadcrumb,
  CategoryFooter,
  CitePage,
  ExternalLinks,
  externalLinksFor,
  Hatnote,
  InfoboxShell,
  LeadParagraph,
  Navbox,
  PageInformation,
  PageTools,
  References,
  SeeAlso,
  seeAlsoFor,
  ShortDescription,
  StubNotice,
  TableOfContents,
  WhatLinksHere,
  WhatThisLinks,
} from './wiki'

// A moldura de um verbete. Antes cada ficha repetia à mão o mesmo esqueleto
// — invólucro, migalhas, cabeçalho, ferramentas, a grelha de três colunas e o
// rodapé de manutenção — e cada uma repetia-o com uma diferença. Quem chegava
// a uma arma vindo de um veículo encontrava outra página: outra largura,
// outro tamanho de título, o índice num sítio diferente ou nenhum. Agora a
// moldura é uma só, e a ficha traz apenas o que lhe é próprio — o corpo, a
// caixa de dados e as secções do índice.
//
// A ordem no DOM é corpo → índice → caixa de dados, que é a ordem que o CSS
// da `.wiki-entry-grid` já esperava para reordenar as colunas em cada
// largura: três colunas acima de 1600px, duas entre 880 e 1600 com o índice
// recolhido em barra por cima, e uma só coluna no telemóvel, com a caixa de
// dados antes do corpo.
export function WikiEntryLayout({
  trail,
  kind,
  slug,
  eyebrow,
  ghost,
  title,
  lede,
  leadName,
  shortDescription,
  media,
  meta,
  sections,
  infobox,
  infoboxTitle,
  infoboxSubtitle,
  infoboxLinks = true,
  references,
  seeAlso = true,
  externalLinks,
  footer = true,
  after,
  children,
}) {
  // O índice cobre o artigo inteiro, secções de fecho incluídas. Cada
  // página declarava «References» à mão no seu próprio índice e nenhuma
  // declarava as outras — agora as três finais entram sozinhas, e só
  // quando a secção existe mesmo, para o índice não apontar para o vazio.
  const showSeeAlso = footer && kind && seeAlso && seeAlsoFor(kind, slug).length > 0
  const showExternal = footer && kind && externalLinksFor(kind, slug, externalLinks, references).length > 0
  const tocSections = [
    ...(sections || []).filter((section) => section && section.id !== 'references'),
    showSeeAlso ? { id: 'see-also', label: 'See also', icon: Link2 } : null,
    references && references.length > 0 ? { id: 'references', label: 'References', icon: BookMarked } : null,
    showExternal ? { id: 'external-links', label: 'External links', icon: ExternalLink } : null,
  ].filter(Boolean)

  return (
    <div className="flex-1 flex flex-col">
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={trail} />

        <header className="wiki-article-header mt-5">
          {eyebrow && <div className="flex flex-wrap items-center gap-2 mb-3">{eyebrow}</div>}
          <h1
            data-ghost={ghost}
            className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[38px] sm:text-[52px] xl:text-[64px]"
          >
            {title}
          </h1>
          {media}
          {/* Uma só marcação para a abertura, com nome a negrito ou sem ele:
              guias e notícias tinham aqui uma div própria, e o mesmo
              parágrafo saía com outra classe e outro espaçamento. */}
          {lede && <LeadParagraph name={leadName}>{lede}</LeadParagraph>}
          {shortDescription && <ShortDescription>{shortDescription}</ShortDescription>}
          {meta && (
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y hairline py-3">{meta}</div>
          )}
          {kind && <StubNotice kind={kind} slug={slug} />}
          {kind && <Hatnote kind={kind} slug={slug} />}
        </header>

        {kind && <PageTools kind={kind} slug={slug} />}

        <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_200px_300px] gap-8">
          {/* A ordem do fim de um artigo de wiki não é arbitrária, e era a
              que aqui estava trocada: ver também, depois referências,
              depois ligações externas, depois as caixas de navegação, e as
              categorias em último — a etiqueta que arruma o verbete no
              arquivo fecha a página. A citação e os metadados da página são
              aparato deste arquivo e ficam entre a navegação e as
              categorias. */}
          <div id="article-content" className="wiki-article-body min-w-0 order-3 lg:order-1">
            {children}
            {footer && kind && seeAlso && <SeeAlso kind={kind} slug={slug} />}
            {references && references.length > 0 && <References items={references} />}
            {footer && kind && <ExternalLinks kind={kind} slug={slug} extra={externalLinks} references={references} />}
            {footer && kind && (
              <>
                <Navbox kind={kind} slug={slug} />
                <CitePage kind={kind} slug={slug} title={typeof title === 'string' ? title : undefined} />
                <PageInformation kind={kind} slug={slug} />
                <CategoryFooter kind={kind} slug={slug} />
              </>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <TableOfContents sections={tocSections} />
          </div>

          <div className="order-2 lg:order-3">
            {/* A caixa de dados passa a dizer de quem é e o que é, como nas
                wikis grandes: o nome do registo por título e a natureza da
                ficha por antetítulo. Sem eles ficava «Article facts / At a
                glance» em todas as páginas do arquivo. */}
            <InfoboxShell
              title={infoboxTitle || (typeof title === 'string' ? title : undefined)}
              subtitle={infoboxSubtitle}
            >
              {infobox}
              {infoboxLinks && kind && (
                <>
                  <WhatLinksHere kind={kind} slug={slug} />
                  <WhatThisLinks kind={kind} slug={slug} />
                </>
              )}
            </InfoboxShell>
          </div>
        </div>

        {after}
      </div>
    </div>
  )
}

// O que se mostra quando o endereço não corresponde a registo nenhum. Também
// isto era escrito de novo em cada ficha, com um texto e um destino
// diferentes de cada vez.
export function RecordNotFound({ backHref, backLabel }) {
  return (
    <div className="flex-1 px-4 sm:px-6 py-20 sm:py-24 text-center">
      <p className="font-cond font-bold uppercase text-[32px] sm:text-[40px] text-paper">RECORD NOT FOUND</p>
      <p className="text-dim text-[13px] leading-relaxed mt-3 max-w-[46ch] mx-auto">This address matches no entry in the archive. It may have been renamed, or it may never have existed.</p>
      <Link href={backHref} className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-5 inline-block hover:text-paper transition-colors">← {backLabel}</Link>
    </div>
  )
}

// A imagem de topo de um verbete, quando a ficha tem uma. Mesma proporção,
// mesma moldura e a mesma legenda quando não há imagem — era o sítio onde as
// páginas mais divergiam, entre 21/9, 21/8 e caixas de altura fixa.
export function EntryMedia({ src, alt, priority = false, ratio = 'aspect-[21/9]', overlay }) {
  return (
    <figure className={cx('corner-brackets tech-mask relative overflow-hidden border border-line panel mt-5', ratio)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes="(max-width:1400px) 100vw, 1400px" className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-surface2/70 px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-dim">NO VERIFIED IMAGE OF THIS SUBJECT</span>
        </div>
      )}
      {overlay}
    </figure>
  )
}

// A tira de registos vizinhos que fecha uma ficha: «mais segredos», «mais
// guias», «artigos relacionados». Tinham três marcações diferentes para a
// mesma coisa.
export function AdjacentRecords({ rail, title, children }) {
  return (
    <section className="mt-12" aria-label={title}>
      {rail && <div className="data-rail">{rail}</div>}
      <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[20px] text-paper border-b hairline pb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">{children}</div>
    </section>
  )
}
