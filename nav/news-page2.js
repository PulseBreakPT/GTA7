'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChevronUp, TriangleAlert } from 'lucide-react'
import MediaCarousel from '@/components/site/media-carousel'
import { articles, articleVisuals, categoriesForArticle, relatedArticlesFor, sources } from '@/lib/content'
import { GhostBadge, SourceChip, StatusBadge, fmtDate } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'
import { ARTICLE_OUTLINES } from '@/lib/article-outlines'

// Os títulos de cada notícia vêm de lib/article-outlines, escritos para o
// texto dela. Antes eram adivinhados por palavras-chave, e quase todas as
// notícias abriam com «Source & session» e acabavam em «Additional record».
const EXPLICIT = /^([A-Z][A-Z &,]+) — /
const sectionsFor = (slug, body) => {
  const outline = ARTICLE_OUTLINES[slug]
  const clean = (paragraph) => paragraph.replace(EXPLICIT, '')
  if (!outline?.length) return [{ title: null, paragraphs: body.map(clean) }]
  return outline.map(([from, title], index) => ({
    title,
    paragraphs: body.slice(from, outline[index + 1]?.[0] ?? body.length).map(clean),
  }))
}

function InlineText({ text }) {
  const terms = /(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)/g
  const isTerm = /^(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)$/
  return text.split(terms).map((part, index) => isTerm.test(part)
    ? <strong key={index} className="font-semibold text-paper">{part}</strong>
    : part)
}

function FormattedArticleBody({ slug, body }) {
  const sections = sectionsFor(slug, body)
  const titled = sections.filter((section) => section.title)

  return (
    <>
      {titled.length >= 3 && <nav aria-label="On this page" className="article-inline-toc">
        <p>In this record <span>{titled.length} sections</span></p>
        <ol>{titled.map((section, index) => (
          <li key={section.title}><a href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>
        ))}</ol>
      </nav>}
      <div id="article-content" className="article-news-sections">
        {sections.map((section, sectionIndex) => (
          <section key={section.title || sectionIndex} id={section.title ? `section-${sectionIndex + 1}` : undefined} className="article-news-section">
            {section.title && <h2><span>{String(sectionIndex + 1).padStart(2, '0')}</span>{section.title}</h2>}
            {section.paragraphs.map((text, index) => (
              <p key={`${sectionIndex}-${index}`}><InlineText text={text} /></p>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}

function App() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)

  if (!a) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/news" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO ARTICLES</Link>
      </div>
    )
  }

  // A fonte, quando o arquivo a tem classificada. O que estava aqui era um
  // `rating` que caía em quatro estrelas por omissão: uma nota de
  // credibilidade atribuída a fontes que ninguém tinha avaliado, na página
  // que existe precisamente para dizer de onde vêm as coisas. Fica o que a
  // lista de fontes diz de facto sobre esta — a sua natureza — e nada
  // quando não a conhece.
  const src = sources.find((s) => a.sourceName.toLowerCase().includes(s.name.split(' ')[0].toLowerCase()))
  const related = relatedArticlesFor(a.slug)
  const categories = categoriesForArticle(a.slug)
  const visuals = articleVisuals(a).map((src, index) => ({
    src,
    label: `Reference ${String(index + 1).padStart(2, '0')}`,
    alt: `${a.title} visual reference ${index + 1}`,
  }))

  return (
    <article className="wiki-news-article px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1080px] mx-auto w-full ambient-bloom">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: a.title }]} />

      <header className="wiki-article-header mt-5">
        <h1 data-ghost="ARTICLES" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] max-w-[920px]">{a.title}</h1>
      </header>

      <div className="corner-brackets tech-mask relative aspect-[21/9] overflow-hidden border border-line mt-5 panel">
        <Image src={a.image} alt={a.title} fill priority sizes="(max-width:1080px) 100vw, 1080px" className="object-cover" />
        <span className="absolute top-4 left-4 flex items-center gap-2">
          <StatusBadge status={a.category === 'official' ? 'official' : a.category === 'community' ? 'community' : 'analysis'} />
          <GhostBadge status={a.status} />
        </span>
      </div>
      {a.imageNote && <p className="wiki-article-image-note">{a.imageNote}</p>}

      <aside className="tech-mask-sm panel mt-5 max-w-[780px] border border-pink/35 bg-gradient-to-r from-pink/10 via-violet/8 to-transparent px-4 py-4 sm:px-5" aria-label="Article summary">
        <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-pink">AT A GLANCE</p>
        <p className="wiki-article-lede mt-2 font-medium">{a.excerpt}</p>
      </aside>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 border-y hairline py-3">
        <span className="font-cond uppercase tracking-[0.14em] text-[13px] text-dim">{fmtDate(a.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{a.readTime} MIN READ</span>

        <SourceChip name={a.sourceName} url={a.sourceUrl} prefix={null} className="text-[12px]" />
        <span className="flex items-center gap-0.5">
          {src && <span className="font-cond uppercase tracking-[0.14em] text-[11px] text-mint">{src.kind}</span>}
        </span>
      </div>

      {categories.length > 0 && <nav className="mt-4 flex flex-wrap gap-2" aria-label="Article categories">{categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="border border-mint/35 bg-mint/5 px-2.5 py-1.5 font-cond font-bold uppercase tracking-[0.13em] text-[10px] text-mint hover:border-mint">CATEGORY: {category.title}</Link>)}</nav>}

      {a.status === 'rumour' && (
        <div className="mt-5 border border-warn/50 bg-warn/10 rounded-sm px-4 py-3 flex items-center gap-3">
          <TriangleAlert size={16} className="text-warn shrink-0" />
          <p className="text-[13px] text-paper">Community rumour. Not confirmed by any official source.</p>
        </div>
      )}

      {/* A referência visual estava no fim, a seguir ao artigo todo e ao «back
          to top»: chegava-lhe só quem já não precisava dela. Sobe para junto
          do resumo e antes do corpo — vê-se do que trata, depois lê-se.
          Em modo compacto e sem segundo título de secção: o hero já está
          logo acima, e dois cabeçalhos grandes seguidos eram ruído. */}
      {visuals.length > 0 && (
        <section className="mt-6 max-w-[900px]" aria-label="Visual reference gallery">
          <MediaCarousel compact label="Visual reference · promotional media" items={visuals} />
        </section>
      )}

      <div className="wiki-news-paper mt-7">
        <FormattedArticleBody slug={a.slug} body={a.body} />
      </div>

      <div className="mt-8 max-w-[780px] flex justify-end border-t border-line pt-3">
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.13em] text-[10px] text-pink hover:text-paper"><ChevronUp size={14} /> BACK TO TOP</a>
      </div>

      <section className="mt-12 max-w-[900px]" aria-label="Related articles">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[21px] text-paper border-b hairline pb-2">MORE FROM THE ARCHIVE</h2>
        {/* Cartões de remate, não manchetes: a grelha começa logo no telemóvel
            em vez de empilhar um cartão de largura inteira por artigo, e a
            imagem é 16/9 para o cartão não crescer em altura. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {related.map((r) => (
            <Link key={r.slug} href={`/news/${r.slug}`} className="panel rounded-sm overflow-hidden group hover:border-black/30 transition-colors">
              <div className="relative aspect-[16/9]">
                <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              </div>
              <div className="p-3">
                <GhostBadge status={r.status} />
                <h3 className="font-cond font-bold uppercase text-paper text-[13px] sm:text-[14px] leading-[1.1] mt-1.5 clamp-2">{r.title}</h3>
                <p className="font-cond uppercase tracking-[0.12em] text-[10px] text-dim mt-1.5">{fmtDate(r.publishedAt)}</p>
              </div>
            </Link>
          ))}
          {related.length === 0 && <p className="col-span-full text-[13px] text-dim">No related records have been assigned to this category yet.</p>}
        </div>
      </section>
    </article>
  )
}

export default App;
