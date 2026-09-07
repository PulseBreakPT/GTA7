'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Quote, TriangleAlert, FileText, BookMarked, Images, Compass } from 'lucide-react'
import MediaCarousel from '@/components/site/media-carousel'
import { articles, articleVisuals, categoriesForArticle, relatedArticlesFor, sources } from '@/lib/content'
import { GhostBadge, SourceChip, StatusBadge, fmtDate } from '@/components/site/ui'
import { InfoRow, SpecGrid, WikiSection } from '@/components/site/wiki'
import { AdjacentRecords, EntryMedia, RecordNotFound, WikiEntryLayout } from '@/components/site/wiki-entry'

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

const sectionFor = (text, index) => {
  if (index === 0) return 'SOURCE & SESSION'
  const explicit = text.match(/^([A-Z][A-Z &]+) — /)
  if (explicit) return explicit[1]
  return SECTION_RULES.find(([, rule]) => rule.test(text))?.[0] || 'ADDITIONAL RECORD'
}

// Os grupos de prova de um artigo, pela ordem em que aparecem no corpo.
// Alimentam o índice da moldura — que antes era um segundo índice, só
// desta página, com um aspecto que nenhuma outra ficha tinha.
const sectionsOf = (body) => body.reduce((list, paragraph, index) => {
  const section = sectionFor(paragraph, index)
  return list.some((s) => s.label === section) ? list : [...list, { id: `section-${list.length + 1}`, label: section, icon: FileText }]
}, [])

function InlineText({ text }) {
  const terms = /(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)/g
  const isTerm = /^(Rockstar(?: North)?|Flow Games|Davy Jones|TGG|El Rubius|MikeShowSha|Jason|Lucia|Criminal Profile|Focus|Vice City|Leonida|PlayStation 5|PS5|GTA VI|GTA 6)$/
  return text.split(terms).map((part, index) => isTerm.test(part)
    ? <strong key={index} className="font-semibold text-paper">{part}</strong>
    : part)
}

// O corpo do artigo, agrupado por grupo de prova. Os títulos de grupo são os
// mesmos `WikiSection` das outras fichas: a mesma régua, a mesma âncora de
// parágrafo, o mesmo espaçamento. As quatro cores rotativas saíram — num
// verbete, um título de secção não muda de cor conforme a ordem.
function ArticleBody({ body }) {
  return sectionsOf(body).map((section) => {
    const paragraphs = body.filter((paragraph, index) => sectionFor(paragraph, index) === section.label)
    return (
      <WikiSection key={section.id} id={section.id} title={section.label}>
        {paragraphs.map((paragraph, index) => {
          const clean = paragraph.replace(/^([A-Z][A-Z &]+) — /, '')
          const lead = section.id === 'section-1' && index === 0
          return (
            <div key={index} className={index > 0 ? 'mt-4' : undefined}>
              {lead && <Quote size={18} className="text-pink mb-2" aria-hidden="true" />}
              <p className={lead ? 'text-[16px] leading-[1.8] text-paper font-medium' : 'text-[14px] leading-[1.85] text-dim'}>
                <InlineText text={clean} />
              </p>
            </div>
          )
        })}
      </WikiSection>
    )
  })
}

function App() {
  const { slug } = useParams()
  const a = articles.find((x) => x.slug === slug)

  if (!a) return <RecordNotFound backHref="/news" backLabel="BACK TO ARTICLES" />

  // A fonte, quando o arquivo a tem classificada. O que estava aqui era um
  // `rating` que caía em quatro estrelas por omissão: uma nota de
  // credibilidade atribuída a fontes que ninguém tinha avaliado, na página
  // que existe precisamente para dizer de onde vêm as coisas. Fica o que a
  // lista de fontes diz de facto sobre esta — a sua natureza — e nada
  // quando não a conhece.
  const src = sources.find((s) => a.sourceName.toLowerCase().includes(s.name.split(' ')[0].toLowerCase()))
  const related = relatedArticlesFor(a.slug)
  const categories = categoriesForArticle(a.slug)
  const visuals = articleVisuals(a).map((image, index) => ({
    src: image,
    label: `Reference ${String(index + 1).padStart(2, '0')}`,
    alt: `${a.title} visual reference ${index + 1}`,
  }))

  const bodySections = sectionsOf(a.body)
  const SECTIONS = [
    ...(visuals.length > 0 ? [{ id: 'visuals', label: 'Visual reference', icon: Images }] : []),
    ...bodySections,
    { id: 'references', label: 'References', icon: BookMarked },
  ]

  const label = a.category === 'official' ? 'official' : a.category === 'community' ? 'community' : 'analysis'


  return (
    <WikiEntryLayout
      trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'News', href: '/news' }, { label: a.title }]}
      kind="news"
      slug={a.slug}
      ghost="ARTICLES"
      title={a.title}
      eyebrow={
        <>
          <StatusBadge status={label} />
          <GhostBadge status={a.status} />
        </>
      }
      lede={a.excerpt}
      shortDescription={a.category === "official" ? "Official announcement" : "Archive analysis"}
      media={<EntryMedia src={a.image} alt={a.title} priority />}
      sections={SECTIONS}
      references={[{ name: a.sourceName, url: a.sourceUrl, retrieved: a.updatedAt }]}
      infobox={
        <>
          <div className="space-y-3">
            <InfoRow label="Type" value={a.category === 'official' ? 'Official announcement' : 'Analysis'} />
            <InfoRow label="Verification"><GhostBadge status={a.status} /></InfoRow>
            <InfoRow label="Published"><span className="font-mono text-[11px] tracking-normal text-paper">{a.publishedAt}</span></InfoRow>
            <InfoRow label="Reading time" value={`${a.readTime} min`} />
          </div>
          {categories.length > 0 && (
            <div className="border-t border-black/10 pt-4">
              <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim mb-2">Categories</p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/categories/${category.slug}`} className="border border-mint/35 bg-mint/5 px-2 py-1 font-cond font-bold uppercase tracking-[0.12em] text-[9px] text-mint hover:border-mint transition-colors">{category.title}</Link>
                ))}
              </div>
            </div>
          )}
          <div className="border-t border-black/10 pt-4">
            <SourceChip name={a.sourceName} url={a.sourceUrl} prefix={null} />
            <p className="font-mono text-[9px] text-dim mt-2">Updated {a.updatedAt}</p>
          </div>
        </>
      }
      after={
        <AdjacentRecords rail="ADJACENT RECORDS · ARCHIVE INDEX" title="MORE FROM THE ARCHIVE">
          {related.map((r) => (
            <Link key={r.slug} href={`/news/${r.slug}`} className="panel rounded-sm overflow-hidden group hover:border-black/30 transition-colors">
              <div className="relative aspect-[16/9]">
                <Image src={r.image} alt={r.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              </div>
              <div className="p-3">
                <GhostBadge status={r.status} />
                <h3 className="font-cond font-bold uppercase text-paper text-[14px] leading-[1.1] mt-1.5 clamp-2">{r.title}</h3>
                <p className="font-cond uppercase tracking-[0.12em] text-[10px] text-dim mt-1.5">{fmtDate(r.publishedAt)}</p>
              </div>
            </Link>
          ))}
          {related.length === 0 && <p className="col-span-full text-[13px] text-dim">No related records have been assigned to this category yet.</p>}
        </AdjacentRecords>
      }
    >
      {/* O «At a glance» era o resumo da abertura outra vez. Fica só o aviso
          de rumor, que não é resumo nenhum e tem de ser visto antes do
          corpo. */}
      {a.status === 'rumour' && (
        <div className="mb-8 border border-warn/50 bg-warn/10 rounded-sm px-4 py-3 flex items-center gap-3">
          <TriangleAlert size={16} className="text-warn shrink-0" aria-hidden="true" />
          <p className="text-[13px] text-paper">Community rumour. Not confirmed by any official source.</p>
        </div>
      )}

      {visuals.length > 0 && (
        <WikiSection id="visuals" title="Visual reference">
          <MediaCarousel compact label="Visual reference · promotional media" items={visuals} />
        </WikiSection>
      )}

      <ArticleBody body={a.body} />

    </WikiEntryLayout>
  )
}

export default App;
