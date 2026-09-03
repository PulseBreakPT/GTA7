'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, ExternalLink, Users, Car, Crosshair, MapPin, Radio as RadioIcon, Repeat2, Images, BookOpen, Newspaper } from 'lucide-react'
import { StatusBadge, GhostBadge, cx } from '@/components/site/ui'
import {
  IMG, extendedLookBrief, articles, guides, characters, vehicles, weapons,
  mechanics, regions, locations, radioStations, factions, easterEggs,
} from '@/lib/content'

// A home segue a ordem das wikis grandes: primeiro o que o jogo é, depois
// a porta para os verbetes, depois o que mudou, e só no fim as coisas de
// contexto — como é que o arquivo classifica o que publica, o que se
// pergunta mais, e quem o faz. Nenhum bloco inventa números: todos saem
// das listas do próprio arquivo.

const BRANCHES = [
  { label: 'Characters', href: '/database/characters', icon: Users, count: characters.length, image: IMG.luciaCaminos, blurb: 'Named cast, roles and documented relationships.' },
  { label: 'Vehicles', href: '/database/vehicles', icon: Car, count: vehicles.length, image: IMG.grottiCheetah, blurb: 'Every vehicle Rockstar has named, by class and manufacturer.' },
  { label: 'Weapons', href: '/database/weapons', icon: Crosshair, count: weapons.length, image: IMG.morganRevolvers, blurb: 'Armament shown or named in official material.' },
  { label: 'Locations', href: '/map', icon: MapPin, count: locations.length, image: IMG.viceCity, blurb: 'Named places across Leonida, plotted on the map.' },
  { label: 'Radio', href: '/database/radio', icon: RadioIcon, count: radioStations.length, image: IMG.ambrosiaDrive, blurb: 'Stations confirmed for the dial.' },
  { label: 'Mechanics', href: '/database/mechanics', icon: Repeat2, count: mechanics.length, image: IMG.ambrosiaNight, blurb: 'Systems Rockstar has described or shown.' },
]

// Os quatro rótulos que o arquivo usa para dizer de onde vem cada facto.
// Estão aqui na home de propósito: quem chega tem de perceber, antes de
// ler qualquer ficha, que confirmado e rumor não são a mesma coisa.
const SOURCE_TIERS = [
  ['confirmed', 'Rockstar named or described it in official material.'],
  ['verified', 'Visible in official footage or screenshots, identified frame by frame.'],
  ['analysis', 'The archive’s own reading of official material, marked as such.'],
  ['rumour', 'Circulating without official backing. Never stated as fact.'],
]

const FAQ = [
  ['When does GTA VI launch?', `${extendedLookBrief.releaseDate}. Physical copies are dated a week earlier than the digital launch, and the box holds a download code rather than a disc.`],
  ['Which platforms?', extendedLookBrief.platforms.join(', ') + '. No PC date has been announced.'],
  ['Where is it set?', `${extendedLookBrief.setting}. ${extendedLookBrief.timeline}`],
  ['Who do you play as?', `${extendedLookBrief.protagonists.join(' and ')} — the archive keeps a file on each, with the relationships Rockstar has shown.`],
  ['Is this an official Rockstar site?', 'No. This is an independent fan archive. Every entry carries the source it came from, and anything unconfirmed is labelled as such.'],
]

const fmt = (iso) => iso

// Título de secção com a régua a atravessar até à ligação, como nos
// painéis técnicos: a linha diz onde a secção começa sem precisar de uma
// caixa à volta.
function Section({ eyebrow, title, href, linkLabel, children, className }) {
  return (
    <section className={cx('px-4 sm:px-6 lg:px-8 py-9 lg:py-12 max-w-[1280px] mx-auto w-full', className)}>
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          {eyebrow && <p className="font-cond uppercase tracking-[0.18em] text-[11px] text-mint">{eyebrow}</p>}
          <h2 className="mt-1 font-cond font-bold uppercase tracking-tight text-[26px] sm:text-[32px] leading-[0.95] text-paper">{title}</h2>
        </div>
        <span className="flex-1 h-px bg-gradient-to-r from-black/25 to-transparent" aria-hidden="true" />
        {href && (
          <Link href={href} className="shrink-0 font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-dim hover:text-paper transition-colors">
            {linkLabel} →
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}

function App() {
  const official = articles.find((a) => a.category === 'official') || articles[0]
  const latestNews = articles.filter((a) => a.slug !== official.slug).slice(0, 3)
  const featuredCast = characters.filter((c) => c.image).slice(0, 6)
  const sourcedRegions = regions.filter((r) => r.image).slice(0, 6)
  const latestGuides = guides.slice(0, 3)

  // «Recentemente actualizado» junta as colecções todas e ordena pela data
  // que cada entrada traz. É a lista que diz onde o arquivo mexeu, sem
  // ninguém ter de a escrever à mão.
  const recentlyUpdated = [
    ...characters.map((c) => ({ name: c.name, href: `/database/characters/${c.slug}`, kind: 'Character', updatedAt: c.updatedAt, status: c.status })),
    ...vehicles.map((v) => ({ name: v.name, href: `/database/vehicles/${v.slug}`, kind: 'Vehicle', updatedAt: v.updatedAt, status: v.status })),
    ...locations.map((l) => ({ name: l.name, href: `/map/location/${l.slug}`, kind: 'Location', updatedAt: l.updatedAt, status: l.status })),
    ...articles.map((a) => ({ name: a.title, href: `/news/${a.slug}`, kind: 'Article', updatedAt: a.updatedAt, status: a.status })),
  ].filter((x) => x.updatedAt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 8)

  const galleryPreview = [IMG.keyArtPier, IMG.viceCity, IMG.ambrosiaSunset, IMG.keysStreet, IMG.grottiCheetah, IMG.swampAirboat]

  return (
    <div className="flex-1 flex flex-col">
      {/* ===== 1. HERO ===== */}
      {/* -mt-14 sobe a hero para debaixo da navbar (56px, a mesma altura do
          header) — é essa sobreposição que dá corpo ao fundo transparente:
          sem imagem por trás, a navbar transparente não mostrava nada. O
          mt-14 no conteúdo interior cancela o deslocamento, para o texto
          cair exactamente onde caía antes. */}
      <section className="corner-brackets relative -mt-14 min-h-[560px] lg:min-h-[680px] overflow-hidden scanlines vignette">
        <div className="absolute inset-0">
          <Image src={IMG.keyArt} alt="Official Grand Theft Auto VI artwork: Jason and Lucia leaning against a car at sunset in Vice City" fill priority sizes="100vw" className="object-cover object-center brightness-[1.12] saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />
        </div>

        <div className="relative z-10 mt-14 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 flex flex-col h-full">
          <div className="ghost-type mt-10 lg:mt-20 max-w-[720px]" data-ghost="LEONIDA">
            <h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[72px] sm:text-[108px] xl:text-[142px] drop-shadow-[0_2px_18px_rgba(7,9,14,0.8)]">
              LEONIDA,<br />DOCUMENTED.
            </h1>
            <p className="mt-5 text-dim text-[17px] sm:text-[19px] leading-relaxed max-w-[420px]">
              {extendedLookBrief.synopsis}
            </p>
            {/* Os dois caminhos de entrada, lado a lado e com o mesmo peso
                de caixa: um leva aos verbetes, o outro ao mapa. */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#explore-the-wiki" className="magnetic-button tech-mask-sm group inline-flex items-center gap-3 border border-mint/70 bg-ink/55 px-6 h-[52px] font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-mint hover:bg-mint hover:text-ink transition-colors duration-200">
                EXPLORE THE WIKI
                <ChevronRight size={15} strokeWidth={2.4} aria-hidden="true" />
              </Link>
              <Link href="/map" className="tech-mask-sm group inline-flex items-center gap-3 border border-line bg-ink/55 px-6 h-[52px] font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper hover:border-black/50 transition-colors duration-200">
                OPEN INTERACTIVE MAP
                <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. EXPLORE THE WIKI ===== */}
      <section id="explore-the-wiki" className="px-4 sm:px-6 lg:px-8 py-9 lg:py-12 max-w-[1280px] mx-auto w-full scroll-mt-20" aria-labelledby="explore-heading">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4">
          <div>
            <p className="font-cond uppercase tracking-[0.18em] text-[11px] text-mint">Start here</p>
            <h2 id="explore-heading" className="mt-1 font-cond font-bold uppercase tracking-tight text-[36px] sm:text-[46px] text-paper">Explore the wiki</h2>
          </div>
          <Link href="/wiki" className="font-cond font-bold uppercase tracking-[0.14em] text-[13px] text-pink hover:text-paper">All entries →</Link>
        </div>
        {/* Cada ramo mostra a contagem por cima da imagem e, por baixo, a
            faixa que diz que tudo o que lá está traz fonte. É a promessa do
            arquivo repetida à entrada de cada porta. */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCHES.map((branch) => {
            const Icon = branch.icon
            return (
              <Link key={branch.label} href={branch.href} title={branch.blurb} className="panel rounded-sm overflow-hidden group hover:border-mint/60 transition-colors">
                <span className="relative block aspect-[16/9]">
                  <Image src={branch.image} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
                  <span className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                    <span className="flex items-center gap-2 min-w-0">
                      <Icon size={17} className="text-mint shrink-0" aria-hidden="true" />
                      <span className="font-cond font-bold uppercase tracking-tight text-[22px] text-paper leading-none truncate">{branch.label}</span>
                    </span>
                    <span className="font-cond font-bold text-[22px] text-paper/90 tabular-nums leading-none shrink-0">{branch.count}</span>
                  </span>
                </span>
                <span className="flex items-center gap-2 px-4 py-2.5 border-t border-black/[0.08]">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint shrink-0" aria-hidden="true" />
                  <span className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">Source-labelled</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ===== 3. LATEST OFFICIAL UPDATE ===== */}
      {/* Uma faixa só, deitada: capa à esquerda, o que mudou ao centro e a
          porta de entrada à direita. É o bloco que responde à pergunta
          «o que há de novo» sem obrigar a percorrer a lista de notícias. */}
      <Section eyebrow="Latest official update" title="What changed" href="/news" linkLabel="All news">
        <div className="mt-5 panel rounded-sm relative overflow-hidden">
          <a
            href={official.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute top-3 right-3 z-[2] w-9 h-9 flex items-center justify-center border border-line rounded-sm text-dim hover:text-paper hover:border-black/40 transition-colors bg-ink/70"
            aria-label={`Open the source: ${official.sourceName}`}
          >
            <ExternalLink size={14} />
          </a>
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_auto] gap-5 lg:gap-6 items-center p-4">
            <Link href={`/news/${official.slug}`} className="group block shrink-0">
              <span className="relative block aspect-[16/9] overflow-hidden rounded-sm border border-line">
                <Image src={official.image} alt={official.title} fill sizes="(max-width:1024px) 100vw, 300px" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              </span>
            </Link>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-cond uppercase tracking-[0.16em] text-[10px] text-mint">{official.sourceName}</span>
                <span className="font-mono text-[11px] text-dim tabular-nums">{fmt(official.publishedAt)}</span>
                <StatusBadge status={official.status} />
              </div>
              <h3 className="mt-2 font-cond font-bold uppercase tracking-tight text-[26px] sm:text-[32px] leading-[1.02] text-paper">{official.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-dim max-w-[70ch]">{official.excerpt}</p>
            </div>

            <Link
              href={`/news/${official.slug}`}
              className="shrink-0 inline-flex items-center justify-center gap-2 border border-line h-11 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-paper hover:border-mint hover:text-mint transition-colors lg:mr-2"
            >
              Read article <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ===== 4. FEATURED CAST ===== */}
      <Section eyebrow="The cast" title="Characters" href="/database/characters" linkLabel="All characters">
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredCast.map((c) => (
            <Link key={c.slug} href={`/database/characters/${c.slug}`} className="panel rounded-sm overflow-hidden group hover:border-pink/60 transition-colors">
              <span className="relative block aspect-[3/4] bg-surface2">
                <Image src={c.image} alt={`Portrait of ${c.name}`} fill sizes="(max-width:640px) 50vw, 16vw" className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500" />
              </span>
              <span className="block p-2.5">
                <span className="block font-cond font-bold uppercase text-[14px] text-paper truncate">{c.name}</span>
                <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5 truncate">{c.role}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== 5. MAP AND REGIONS ===== */}
      <Section eyebrow="The state of Leonida" title="Map and regions" href="/map" linkLabel="Open the map">
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sourcedRegions.map((r) => (
            <Link key={r.id} href={`/map/${r.id}`} className="panel rounded-sm overflow-hidden group hover:border-mint/60 transition-colors">
              <span className="relative block aspect-[16/8]">
                <Image src={r.image} alt={`Official artwork for ${r.label}`} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <span className="absolute bottom-3 left-4 font-cond font-bold uppercase tracking-tight text-[22px] text-paper leading-none">{r.label}</span>
              </span>
              <span className="block p-4">
                <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-mint">{r.officialType}</span>
                <span className="block text-[13px] leading-relaxed text-dim mt-1.5 clamp-2">{r.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== 6. THE DATABASE IN NUMBERS ===== */}
      <Section eyebrow="Everything indexed" title="The database" href="/database/vehicles" linkLabel="Open the database">
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px border border-line bg-line">
          {[
            ['Vehicles', vehicles.length, '/database/vehicles'],
            ['Weapons', weapons.length, '/database/weapons'],
            ['Characters', characters.length, '/database/characters'],
            ['Locations', locations.length, '/map'],
            ['Mechanics', mechanics.length, '/database/mechanics'],
            ['Radio', radioStations.length, '/database/radio'],
            ['Factions', factions.length, '/gangs-factions'],
          ].map(([label, count, href]) => (
            <Link key={label} href={href} className="bg-ink p-4 sm:p-5 hover:bg-surface2/60 transition-colors">
              <p className="font-cond font-bold text-[30px] leading-none text-paper tabular-nums">{count}</p>
              <p className="mt-2 font-cond uppercase tracking-[0.16em] text-[10px] text-dim">{label}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ===== 7. NEWS AND GUIDES ===== */}
      <Section eyebrow="From the archive" title="News and guides" href="/news" linkLabel="All news">
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim">
              <Newspaper size={13} aria-hidden="true" /> Latest news
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {latestNews.map((a) => (
                <Link key={a.slug} href={`/news/${a.slug}`} className="panel rounded-sm p-3 flex gap-3 group hover:border-black/30 transition-colors">
                  <span className="relative w-[92px] h-[62px] shrink-0 overflow-hidden rounded-sm border border-line">
                    <Image src={a.image} alt="" fill sizes="92px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <StatusBadge status={a.status} />
                      <span className="font-mono text-[10px] text-dim tabular-nums">{fmt(a.publishedAt)}</span>
                    </span>
                    <span className="block font-cond font-bold uppercase text-[15px] leading-[1.1] text-paper mt-1.5 clamp-2">{a.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim">
              <BookOpen size={13} aria-hidden="true" /> Guides
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {latestGuides.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} className="panel rounded-sm p-3 flex gap-3 group hover:border-black/30 transition-colors">
                  <span className="relative w-[92px] h-[62px] shrink-0 overflow-hidden rounded-sm border border-line">
                    <Image src={g.image} alt="" fill sizes="92px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <GhostBadge status={g.status} />
                      <span className="font-mono text-[10px] text-dim tabular-nums">{g.readTime} min</span>
                    </span>
                    <span className="block font-cond font-bold uppercase text-[15px] leading-[1.1] text-paper mt-1.5 clamp-2">{g.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ===== 8. MEDIA ===== */}
      <Section eyebrow="Visual record" title="Artwork and captures" href="/media" linkLabel="Open the gallery">
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {galleryPreview.map((src) => (
            <Link key={src} href="/media" className="relative block aspect-[16/10] overflow-hidden rounded-sm border border-line group">
              <Image src={src} alt="" fill sizes="(max-width:640px) 50vw, 16vw" className="object-cover group-hover:scale-[1.06] transition-transform duration-500" />
              <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors" />
            </Link>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 font-cond uppercase tracking-[0.14em] text-[10px] text-dim">
          <Images size={12} aria-hidden="true" /> Official artwork, Visit Leonida postcards, gameplay captures and edition stills
        </p>
      </Section>

      {/* ===== 9. RECENTLY UPDATED ===== */}
      <Section eyebrow="What moved" title="Recently updated" href="/news" linkLabel="Archive log">
        <ol className="mt-5 border border-line divide-y divide-black/[0.08]">
          {recentlyUpdated.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 hover:bg-surface2/50 transition-colors">
                <span className="font-mono text-[11px] text-dim tabular-nums shrink-0 w-[86px]">{fmt(entry.updatedAt)}</span>
                <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint shrink-0 w-[70px]">{entry.kind}</span>
                <span className="font-cond font-semibold uppercase text-[14px] text-paper flex-1 min-w-0 truncate">{entry.name}</span>
                <StatusBadge status={entry.status} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* ===== 10. HOW SOURCES ARE LABELLED ===== */}
      <Section eyebrow="Read this first" title="How this archive labels things">
        <p className="mt-5 text-[15px] leading-relaxed text-paper/85 max-w-[68ch]">
          Every entry carries a label saying where it came from. Nothing here is presented as fact
          because it is widely repeated — if Rockstar has not said it, the entry says so.
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOURCE_TIERS.map(([status, explanation]) => (
            <div key={status} className="panel rounded-sm p-4">
              <StatusBadge status={status} />
              <p className="mt-2.5 text-[13px] leading-relaxed text-dim">{explanation}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 border-l-2 border-pink pl-3 text-[12px] leading-relaxed text-dim max-w-[68ch]">{extendedLookBrief.scopeNote}</p>
      </Section>

      {/* ===== 11. FAQ ===== */}
      <Section eyebrow="Common questions" title="FAQ">
        <dl className="mt-5 border border-line divide-y divide-black/[0.08]">
          {FAQ.map(([question, answer]) => (
            <div key={question} className="px-4 py-4">
              <dt className="font-cond font-bold uppercase tracking-[0.06em] text-[16px] text-paper">{question}</dt>
              <dd className="mt-1.5 text-[13px] leading-relaxed text-dim max-w-[75ch]">{answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ===== 12. COMMUNITY AND LEGAL ===== */}
      <Section eyebrow="About" title="An independent archive">
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="panel rounded-sm p-5">
            <h3 className="font-cond font-bold uppercase tracking-[0.1em] text-[14px] text-paper">Not affiliated with Rockstar</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-dim">
              {extendedLookBrief.developer} and {extendedLookBrief.publisher} own Grand Theft Auto VI and everything in it.
              This is a fan reference, and links back to the official material it cites.
            </p>
          </div>
          <div className="panel rounded-sm p-5">
            <h3 className="font-cond font-bold uppercase tracking-[0.1em] text-[14px] text-paper">Corrections welcome</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-dim">
              Every entry shows its source and the date it was last checked. If a source says otherwise,
              the entry is wrong and gets fixed.
            </p>
          </div>
          <div className="panel rounded-sm p-5">
            <h3 className="font-cond font-bold uppercase tracking-[0.1em] text-[14px] text-paper">Secrets and oddities</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-dim">
              {easterEggs.length} community finds are catalogued separately from the confirmed record,
              so a theory never sits next to a fact as if it were one.
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default App;
