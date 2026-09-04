'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChevronUp, Quote, Star, TriangleAlert } from 'lucide-react'
import MediaCarousel from '@/components/site/media-carousel'
import { articles, articleVisuals, categoriesForArticle, relatedArticlesFor, sources } from '@/lib/content'
import { GhostBadge, SourceChip, StatusBadge, fmtDate } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'

const SECTION_RULES = [
  ['SOURCE & SESSION', /session|demonstration|preview|creator|visit|hands-off/i],
  ['WORLD & EXPLORATION', /world|map|Leonida|Vice City|interior|hotel|zoo|underwater|explor|population|NPC|beach/i],
  ['VEHICLES & TRAVEL', /vehicle|car|fuel|charging|driv|garage|tracker|trunk|scooter|train|transport/i],
  ['MONEY, CRIME & ROBBERIES', /money|bank|cash|robber|crime|stolen|fence|store|gang|loot|econom/i],
  ['POLICE & ESCAPE', /police|wanted|CCTV|camera|witness|escape|pursuit|evidence|recogn/i],
  ['JASON & LUCIA', /Jason|Lucia|relationship|protagonist|partner|switch|together/i],
  ['COMBAT & INVENTORY', /combat|weapon|gun|shoot|Focus|aim|hit|body|inventory|armour/i],
  ['ACTIVITIES & PROGRESSION', /gym|fitness|train|fishing|hunting|activity|attribute|profile|mission|story/i],
  ['INTERFACE & TECHNICAL NOTES', /HUD|phone|menu|FPS|PS5|first-person|interface|performance|technical/i],
]

const SECTION_THEMES = [
  { text: 'text-mint', border: 'border-mint/45', bg: 'bg-mint/8', dot: 'bg-mint' },
  { text: 'text-pink', border: 'border-pink/45', bg: 'bg-pink/8', dot: 'bg-pink' },
  { text: 'text-violet', border: 'border-violet/45', bg: 'bg-violet/8', dot: 'bg-violet' },
  { text: 'text-warn', border: 'border-warn/45', bg: 'bg-warn/8', dot: 'bg-warn' },
]

const sectionFor = (text, index) => {
  if (index === 0) return 'SOURCE & SESSION'
  const explicit = text.match(/^([A-Z][A-Z &]+) — /)
  if (explicit) return explicit[1]
  return SECTION_RULES.find(([, rule]) => rule.test(text))?.[0] || 'ADDITIONAL RECORD'
}

function InlineText({ text }) {
  const terms = /(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)/g
  const isTerm = /^(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)$/
  return text.split(terms).map((part, index) => isTerm.test(part)
    ? <strong key={index} className="font-semibold text-paper">{part}</strong>
    : part)
}

function FormattedArticleBody({ body }) {
  let previousSection = ''
  const sections = body.reduce((list, paragraph, index) => {
    const section = sectionFor(paragraph, index)
    return list.includes(section) ? list : [...list, section]
  }, [])

  return (
    <>
      {sections.length >= 3 && <nav aria-label="On this page" className="mb-8 border border-line bg-panel/50 p-4 sm:p-5">
        <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-mint mb-3">IN THIS RECORD</p>
        <div className="flex flex-wrap gap-2">{sections.map((section, index) => {
          const theme = SECTION_THEMES[index % SECTION_THEMES.length]
          return <a key={section} href={`#section-${index + 1}`} className={`inline-flex items-center gap-1.5 border ${theme.border} ${theme.bg} px-2 py-1 font-cond uppercase tracking-[0.1em] text-[10px] ${theme.text} hover:bg-black/10`}><span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />{String(index + 1).padStart(2, '0')} · {section}</a>
        })}</div>
      </nav>}
      <div className="max-w-[780px] flex flex-col gap-7 sm:gap-9 border-l border-black/10 pl-4 sm:pl-6">
        {body.map((paragraph, index) => {
          const section = sectionFor(paragraph, index)
          const sectionIndex = sections.indexOf(section)
          const theme = SECTION_THEMES[sectionIndex % SECTION_THEMES.length]
          const isNewSection = section !== previousSection
          previousSection = section
          const cleanParagraph = paragraph.replace(/^([A-Z][A-Z &]+) — /, '')
          return <div key={index} className={isNewSection ? 'pt-4 first:pt-0' : ''}>
            {isNewSection && <div className="mb-3"><p className={`font-mono text-[9px] tracking-[0.18em] ${theme.text} mb-1.5`}>EVIDENCE GROUP</p><h2 id={`section-${sectionIndex + 1}`} className={`scroll-mt-24 flex items-center gap-2 font-cond font-bold uppercase tracking-[0.12em] text-[18px] sm:text-[20px] ${theme.text} border-b ${theme.border} pb-2`}><span className={`w-2 h-2 rounded-full ${theme.dot}`} />{section}</h2></div>}
            <div className="relative">
              {index === 0 && <Quote size={20} className="text-pink mb-2" aria-hidden="true" />}
              <p className={index === 0 ? 'text-[18px] sm:text-[20px] leading-[1.72] text-paper font-medium max-w-[66ch]' : 'text-[17px] sm:text-[18px] leading-[1.9] text-paper/90 max-w-[68ch]'}><InlineText text={cleanParagraph} /></p>
            </div>
          </div>
        })}
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

  const src = sources.find((s) => a.sourceName.toLowerCase().includes(s.name.split(' ')[0].toLowerCase()))
  const rating = src ? src.rating : 4
  const related = relatedArticlesFor(a.slug)
  const categories = categoriesForArticle(a.slug)
  const visuals = articleVisuals(a).map((src, index) => ({
    src,
    label: `Reference ${String(index + 1).padStart(2, '0')}`,
    alt: `${a.title} visual reference ${index + 1}`,
  }))

  return (
    <article className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1080px] mx-auto w-full ambient-bloom">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: a.title }]} />

      <div className="corner-brackets tech-mask relative aspect-[21/9] overflow-hidden border border-line mt-3 panel">
        <Image src={a.image} alt={a.title} fill priority sizes="(max-width:1080px) 100vw, 1080px" className="object-cover" />
        <span className="absolute top-4 left-4 flex items-center gap-2">
          <StatusBadge status={a.category === 'official' ? 'official' : a.category === 'community' ? 'community' : 'analysis'} />
          <GhostBadge status={a.status} />
        </span>
      </div>
      {a.imageCredit && <p className="mt-2 text-right font-cond uppercase tracking-[0.12em] text-[10px] text-dim">Portrait: <a href={a.imageCreditUrl} target="_blank" rel="noreferrer" className="text-paper/75 hover:text-pink underline underline-offset-2">{a.imageCredit}</a></p>}

      <div className="ghost-type mt-6" data-ghost="LUSORAE">
        <h1 data-ghost="ARTICLES" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[52px] sm:text-[64px] max-w-[920px]">{a.title}</h1>
      </div>

      <div className="data-rail mt-5">FILE {a.slug.slice(0, 8).toUpperCase()} · ARCHIVE RECORD · CONTENT INDEX</div>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 border-y hairline py-3">
        <span className="font-cond uppercase tracking-[0.14em] text-[13px] text-dim">{fmtDate(a.publishedAt)}&nbsp;&nbsp;·&nbsp;&nbsp;{a.readTime} MIN READ</span>
        <span className="font-mono text-[11px] text-dim tabular-nums">{a.views.toLocaleString('en-US')} READS</span>
        <SourceChip name={a.sourceName} url={a.sourceUrl} prefix={null} className="text-[12px]" />
        <span className="flex items-center gap-0.5" role="img" aria-label={`Source credibility: ${rating} of 5`}>
          {[1,2,3,4,5].map((n) => <Star key={n} size={13} className={n <= rating ? 'text-pink' : 'text-black/20'} fill={n <= rating ? '#C2185B' : 'transparent'} />)}
        </span>
      </div>

      {categories.length > 0 && <nav className="mt-4 flex flex-wrap gap-2" aria-label="Article categories">{categories.map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="border border-mint/35 bg-mint/5 px-2.5 py-1.5 font-cond font-bold uppercase tracking-[0.13em] text-[10px] text-mint hover:border-mint">CATEGORY: {category.title}</Link>)}</nav>}

      {a.status === 'rumour' && (
        <div className="mt-5 border border-warn/50 bg-warn/10 rounded-sm px-4 py-3 flex items-center gap-3">
          <TriangleAlert size={16} className="text-warn shrink-0" />
          <p className="text-[13px] text-paper">Community rumour. Not confirmed by any official source.</p>
        </div>
      )}

      <aside className="tech-mask-sm panel mt-6 max-w-[780px] border border-pink/35 bg-gradient-to-r from-pink/10 via-violet/8 to-transparent px-4 py-4 sm:px-5" aria-label="Article summary">
        <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-pink">AT A GLANCE</p>
        <p className="mt-2 text-[16px] sm:text-[17px] leading-[1.65] text-paper font-medium">{a.excerpt}</p>
      </aside>

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

      <div className="mt-7">
        <FormattedArticleBody body={a.body} />
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
