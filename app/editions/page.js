'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Check, X, ExternalLink, TriangleAlert, Download, Package, Calendar } from 'lucide-react'
import { editions, IMG } from '@/lib/content'
import { cx } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'

// Uma linha da lista de conteúdo de cada edição. O `X` não é decoração: numa
// página de edições, o que não vem na caixa engana tanto como o que vem, e
// por isso tem o mesmo peso visual que o `Check`.
function IncludeRow({ label, included }) {
  return (
    <li className="flex items-start gap-2.5 py-2 border-b border-black/[0.07] last:border-0">
      <span
        className={cx('mt-[2px] w-4 h-4 shrink-0 flex items-center justify-center rounded-[2px]',
          included ? 'text-mint' : 'text-dim')}
        aria-hidden="true"
      >
        {included ? <Check size={14} strokeWidth={2.6} /> : <X size={13} strokeWidth={2.6} />}
      </span>
      <span className={cx('text-[13px] leading-[1.45]', included ? 'text-paper' : 'text-dim')}>
        {label}
      </span>
      <span className="sr-only">{included ? 'included' : 'not included'}</span>
    </li>
  )
}

function App() {
  const [standard, ultimate] = editions.tiers

  return (
    <div className="flex-1 flex flex-col">
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1180px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Editions' }]} />

        <div className="data-rail">EDITIONS · OFFICIAL RECORD · UPDATED {editions.updatedAt}</div>
        <div className="ghost-type mt-3" data-ghost="EDITIONS">
          <h1 className="chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.82] text-[48px] sm:text-[68px] lg:text-[78px] max-w-[900px]">
            WHAT’S IN<br />EACH EDITION
          </h1>
        </div>
        <p className="mt-4 max-w-[62ch] text-[15px] sm:text-[16px] leading-[1.7] text-dim">
          Two editions, and one upgrade that bridges them. Everything below is taken from
          Rockstar’s own editions page, its support documentation and the PlayStation and Xbox
          product listings — no retailer copy, no leaks. Where Rockstar has said nothing, this
          page says so rather than filling the gap.
        </p>

        {/* Os três factos que enquadram tudo o resto. */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-px border hairline bg-[rgba(11,15,22,0.12)]">
          {[
            [Calendar, 'RELEASE', editions.releaseDate],
            [Download, 'PRE-LOAD', editions.preloadDate],
            [Package, 'PLATFORMS', 'PS5 · PS5 Pro · Xbox Series X|S'],
          ].map(([Icon, label, value]) => (
            <div key={label} className="bg-ink px-4 py-4">
              <p className="flex items-center gap-2 font-cond uppercase tracking-[0.18em] text-[10px] text-mint">
                <Icon size={13} aria-hidden="true" />{label}
              </p>
              <p className="mt-2 font-cond font-semibold text-[17px] leading-tight text-paper">{value}</p>
            </div>
          ))}
        </div>

        {/* ---- AS DUAS EDIÇÕES ---- */}
        <div className="data-rail mt-12">SIDE BY SIDE · WHAT EACH ONE BUYS</div>
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[standard, ultimate].map((tier) => {
            const isUltimate = tier.id === 'ultimate'
            return (
              <section
                key={tier.id}
                className={cx('tech-mask-sm glass-panel border p-5 sm:p-6 flex flex-col',
                  isUltimate ? 'border-pink/45 bg-pink/[0.04]' : 'border-line')}
                aria-labelledby={`tier-${tier.id}`}
              >
                {/* A imagem vai a toda a largura do cartão, sangrada até à
                    borda: é a arte da edição, não um ícone ao lado do texto.
                    Sem imagem oficial o cartão di-lo, como no catálogo dos
                    16 itens — o arquivo não preenche o buraco com outra coisa. */}
                {tier.image && IMG[tier.image] ? (
                  <div className="relative -mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5 aspect-[16/9] overflow-hidden border-b border-line">
                    <Image
                      src={IMG[tier.image]}
                      alt={`${tier.name} artwork`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                      priority={isUltimate}
                    />
                    <span className="absolute left-0 bottom-0 px-2 py-1 bg-ink/85 font-mono text-[9px] uppercase tracking-[0.18em] text-mint">
                      {tier.imageNote}
                    </span>
                  </div>
                ) : (
                  <div className="-mx-5 -mt-5 sm:-mx-6 sm:-mt-6 mb-5 aspect-[16/9] bg-surface2/60 border-b border-line flex items-center justify-center">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-dim">NO OFFICIAL IMAGE</span>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h2 id={`tier-${tier.id}`} className={cx('font-cond font-bold uppercase tracking-[0.08em] text-[22px] sm:text-[26px]', isUltimate ? 'text-pink' : 'text-paper')}>
                    {tier.name}
                  </h2>
                  <span className="font-cond font-bold text-[30px] text-paper tabular-nums">{tier.price}</span>
                </div>
                <p className="mt-1 font-cond uppercase tracking-[0.14em] text-[10px] text-dim">{tier.formats}</p>
                <p className="mt-4 text-[14px] leading-[1.65] text-paper/85">{tier.summary}</p>
                <ul className="mt-5">
                  {tier.includes.map(([label, included]) => (
                    <IncludeRow key={label} label={label} included={included} />
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        {/* A ponte entre as duas: quem compra a Standard não fica de fora. */}
        <section className="mt-5 border border-mint/35 bg-mint/[0.05] px-4 py-4 sm:px-5" aria-label="Ultimate Edition Upgrade">
          <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-mint">{editions.upgrade.name}</p>
          <p className="mt-2 text-[14px] leading-[1.65] text-paper/90 max-w-[80ch]">{editions.upgrade.note}</p>
        </section>

        {/* ---- BÓNUS DE COMPRA ---- */}
        <div className="data-rail mt-12">PRE-ORDER BONUSES · BOTH EDITIONS</div>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-[1.65] text-dim">
          Neither of these is exclusive to Ultimate. Both go to qualifying purchases of either
          edition, and Rockstar’s wording is wider than the word «pre-order» suggests: the
          deadline is {editions.bonusDeadline}, so release day still counts.
        </p>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <section className="panel rounded-sm p-5" aria-labelledby="vintage-pack">
            <h3 id="vintage-pack" className="font-cond font-bold uppercase tracking-[0.1em] text-[17px] text-paper">{editions.vintagePack.name}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-dim">{editions.vintagePack.who}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {editions.vintagePack.items.map(([label]) => (
                <li key={label} className="flex items-start gap-2.5 text-[13px] text-paper">
                  <Check size={14} strokeWidth={2.6} className="text-mint mt-[3px] shrink-0" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[[IMG.edVapidStanier55, '’55 Vapid Stanier Sedan'], [IMG.edVintageWeaponPattern, 'Exclusive weapon pattern']].map(([src, alt]) => (
                <div key={alt} className="relative aspect-[16/9] overflow-hidden border border-line">
                  <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 45vw, 260px" className="object-cover" />
                </div>
              ))}
            </div>
          </section>

          <section className="panel rounded-sm p-5" aria-labelledby="gta-plus">
            <h3 id="gta-plus" className="font-cond font-bold uppercase tracking-[0.1em] text-[17px] text-paper">{editions.gtaPlus.name}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-dim">{editions.gtaPlus.who}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {editions.gtaPlus.notes.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-[13px] leading-[1.55] text-paper/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet mt-[7px] shrink-0" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* ---- OS 16 ITENS DA ULTIMATE ---- */}
        <div className="data-rail mt-12">ULTIMATE EDITION UPGRADE · {String(editions.ultimateItems.length).padStart(2, '0')} ITEMS</div>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-[1.65] text-dim">
          Rockstar says these are uncovered behind each chapter rather than handed over at once.
          There is no published chapter-by-chapter unlock table — anything claiming one is
          guesswork. Images are Rockstar’s own.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {editions.ultimateItems.map(([name, kind, desc, imageKey]) => (
            <article key={name} className="panel rounded-sm overflow-hidden flex flex-col">
              {imageKey && IMG[imageKey] ? (
                <div className="relative aspect-[16/9]">
                  <Image src={IMG[imageKey]} alt={name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-surface2/60 flex items-center justify-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-dim">NO OFFICIAL IMAGE</span>
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <span className="font-cond uppercase tracking-[0.16em] text-[9px] text-mint">{kind}</span>
                <h3 className="font-cond font-bold uppercase text-paper text-[15px] leading-[1.15] mt-1.5">{name}</h3>
                <p className="mt-2 text-[12.5px] leading-[1.6] text-dim">{desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ---- FÍSICO ---- */}
        <div className="data-rail mt-12">THE PHYSICAL RELEASE · READ THIS ONE TWICE</div>
        <div className="mt-4 border border-warn/45 bg-warn/[0.07] px-4 py-4 sm:px-5">
          <p className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-warn">
            <TriangleAlert size={14} aria-hidden="true" /> «PHYSICAL» DOES NOT MEAN «DISC»
          </p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {editions.physical.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-paper/90">
                <span className="w-1.5 h-1.5 rounded-full bg-warn mt-[8px] shrink-0" aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- O QUE NÃO FOI ANUNCIADO ---- */}
        <div className="data-rail mt-12">NOT ANNOUNCED · COMMON ASSUMPTIONS THAT DO NOT HOLD</div>
        <p className="mt-3 max-w-[70ch] text-[14px] leading-[1.65] text-dim">
          Premium editions usually come with some of these. This one does not, as far as anyone
          can show. If Rockstar announces any of it later, this list gets shorter.
        </p>
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {editions.notAnnounced.map((line) => (
            <li key={line} className="flex items-start gap-2.5 py-2.5 border-b border-black/[0.07] text-[13px] leading-[1.55] text-dim">
              <X size={13} strokeWidth={2.6} className="text-dim mt-[3px] shrink-0" aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>

        {/* ---- FONTE ---- */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t hairline pt-5">
          <a href={editions.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40">
            SOURCE: {editions.sourceName.toUpperCase()} <ExternalLink size={11} />
          </a>
          <a href={editions.supportUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40">
            ROCKSTAR SUPPORT <ExternalLink size={11} />
          </a>
          <span className="font-mono text-[10px] text-dim uppercase">CHECKED {editions.updatedAt}</span>
          <Link href="/database/vehicles" className="ml-auto font-cond font-bold uppercase tracking-[0.14em] text-[13px] text-pink hover:text-paper">
            See these in the garage →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App;
