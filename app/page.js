'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Triangle, ChevronRight, Play } from 'lucide-react'
import { StatusBadge } from '@/components/site/ui'
import { encyclopediaCategories, IMG, extendedLookBrief } from '@/lib/content'

function App() {
  return (
    <div className="flex-1 flex flex-col">
      {/* ===== HERO ===== */}
      {/* -mt-14 sobe a hero para debaixo da navbar (56px, a mesma altura do
          header) — é essa sobreposição que dá corpo ao fundo transparente:
          sem imagem por trás, a navbar transparente não mostrava nada. O
          mt-14 no conteúdo interior cancela o deslocamento, para o texto
          cair exactamente onde caía antes. */}
      <section className="relative -mt-14 min-h-[560px] lg:min-h-[680px] overflow-hidden scanlines vignette">
        <div className="absolute inset-0">
          <Image src={IMG.keyArt} alt="Official Grand Theft Auto VI artwork: Jason and Lucia leaning against a car at sunset in Vice City" fill priority sizes="100vw" className="object-cover object-center brightness-[1.12] saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />
        </div>

        <div className="relative z-10 mt-14 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 flex flex-col h-full">
          <div className="data-rail max-w-[520px] !text-mint">INDEPENDENT FAN REFERENCE · SOURCE-LABELLED</div>

          <div className="ghost-type mt-10 lg:mt-20 max-w-[720px]" data-ghost="LEONIDA">
            <h1 className="chromatic-title font-cond font-bold uppercase text-paper leading-[0.82] tracking-tight text-[72px] sm:text-[108px] xl:text-[142px] drop-shadow-[0_2px_18px_rgba(7,9,14,0.8)]">
              LEONIDA,<br />DOCUMENTED.
            </h1>
            <p className="mt-5 text-dim text-[17px] sm:text-[19px] leading-relaxed max-w-[420px]">
              {extendedLookBrief.synopsis}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-cond uppercase tracking-[0.14em] text-[12px] text-paper/75">
              <span>{extendedLookBrief.releaseDate}</span>
              <span>{extendedLookBrief.platforms.join(' · ')}</span>
              <span>{extendedLookBrief.engine}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10">
              <Link href="/map" className="magnetic-button tech-mask-sm btn-hero group inline-flex items-center gap-4 border border-paper/90 bg-ink/50 px-6 h-[54px] font-cond font-semibold uppercase tracking-[0.16em] text-[16px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
                EXPLORE THE MAP
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center" aria-hidden="true">
                  <Triangle size={12} strokeWidth={2.4} />
                </span>
              </Link>
              <Link href="/database/weapons" className="group inline-flex items-center gap-3 font-cond font-semibold uppercase tracking-[0.16em] text-[16px] text-paper/90 hover:text-paper min-h-[44px]">
                OPEN DATABASE
                <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-white/50 transition-colors" aria-hidden="true">
                  <ChevronRight size={15} />
                </span>
              </Link>
            </div>
          </div>

          {/* Havia aqui um minimapa «SECTOR VC-01 · VICE CITY · 1.86 MI». A
              distância era inventada e o traçado estava escrito à mão no
              componente: decoração a fingir-se de leitura de mapa, na
              primeira coisa que se vê do arquivo. Sai pela mesma razão que
              saiu o «where to find» dos veículos. */}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-9 lg:py-12 max-w-[1280px] mx-auto w-full" aria-labelledby="start-here">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4">
          <div><p className="font-cond uppercase tracking-[0.18em] text-[11px] text-mint">Start here</p><h2 id="start-here" className="mt-1 font-cond font-bold uppercase tracking-tight text-[36px] sm:text-[46px] text-paper">Browse by subject</h2></div>
          <Link href="/categories" className="font-cond font-bold uppercase tracking-[0.14em] text-[13px] text-pink hover:text-paper">All categories →</Link>
        </div>
        <div className="focus-grid mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {encyclopediaCategories.slice(0, 3).map((category) => <Link key={category.slug} href={`/categories/${category.slug}`} className="panel rounded-sm overflow-hidden group hover:border-pink/60"><div className="relative aspect-[16/8]"><Image src={category.cover} alt={category.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" /><span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" /></div><div className="p-4"><h3 className="font-cond font-bold uppercase tracking-tight text-[23px] text-paper">{category.title}</h3><p className="mt-2 text-[13px] leading-relaxed text-dim">{category.description}</p></div></Link>)}
          {encyclopediaCategories.slice(0, 3).map((category, index) => <Link key={category.slug} href={`/categories/${category.slug}`} className="focus-card spotlight-card tech-mask-sm glass-panel overflow-hidden group hover:border-pink/60"><div className="relative aspect-[16/8] film-frame corner-brackets"><Image src={category.cover} alt={category.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-[1.06] transition-transform duration-700" /><span className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" /><span className="absolute right-3 top-3 z-[4] font-mono text-[9px] tracking-[0.14em] text-paper/75">0{index + 1}</span></div><div className="p-4"><h3 className="font-cond font-bold uppercase tracking-tight text-[23px] text-paper">{category.title}</h3><p className="mt-2 text-[13px] leading-relaxed text-dim">{category.description}</p></div></Link>)}
        </div>
      </section>

      {/* ===== EXTENDED LOOK BRIEF ===== */}
      <section className="hidden" aria-labelledby="extended-look-brief">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.4fr] gap-8 items-start">
          <div>
            <p className="font-cond text-[11px] uppercase tracking-[0.2em] text-pink">{extendedLookBrief.sourceName}</p>
            <h2 id="extended-look-brief" className="mt-2 font-cond font-bold uppercase text-paper leading-[0.9] tracking-tight text-[42px] sm:text-[56px]">Extended Look<br />briefing</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-dim max-w-lg">{extendedLookBrief.synopsis}</p>
            <Link href="/news/extended-look-everything-revealed" className="mt-6 inline-flex items-center gap-2 font-cond font-semibold uppercase tracking-[0.14em] text-[13px] text-paper hover:text-pink">
              Read the source breakdown <ChevronRight size={15} />
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-line bg-line">
              {[
                ['Release', extendedLookBrief.releaseDate],
                ['Platforms', extendedLookBrief.platforms.join(' · ')],
                ['Engine', extendedLookBrief.engine],
                ['Setting', extendedLookBrief.setting],
                ['Timeline', extendedLookBrief.timeline],
                ['Leads', extendedLookBrief.protagonists.join(' · ')],
              ].map(([label, value]) => (
                <div key={label} className="bg-ink p-4 sm:p-5">
                  <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">{label}</p>
                  <p className="mt-2 font-cond font-semibold text-[16px] leading-tight text-paper">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="panel rounded-sm p-4">
                <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">Release context</p>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/85">{extendedLookBrief.developer} · {extendedLookBrief.publisher}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-dim">Editions listed in the supplied summary: {extendedLookBrief.editions.join(' and ')}. Pre-order reference: {extendedLookBrief.preorder}.</p>
                <p className="mt-2 text-[12px] leading-relaxed text-mint">{extendedLookBrief.editionContext.preorder}</p>
              </div>
              <div className="panel rounded-sm p-4">
                <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">Languages listed</p>
                <p className="mt-2 text-[13px] leading-relaxed text-dim">{extendedLookBrief.languages.join(' · ')}</p>
              </div>
            </div>
            <p className="mt-4 border-l-2 border-pink pl-3 text-[12px] leading-relaxed text-dim">{extendedLookBrief.scopeNote}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-dim/80">Retail note: {extendedLookBrief.editionContext.format}</p>
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-dim">Release and media timeline</p>
              <ol className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                {extendedLookBrief.releaseHistory.map(([date, detail]) => (
                  <li key={date} className="border-l border-pink/60 pl-3">
                    <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[13px] text-paper">{date}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-dim">{detail}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-[12px] leading-relaxed text-dim">{extendedLookBrief.mediaNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL STRIP ===== */}
      <section className="hidden" aria-label="Latest from the archive">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr_1fr] gap-4">
          {/* Featured */}
          <Link href="/news/extended-look-everything-revealed" className="card-active panel rounded-sm p-5 flex flex-col sm:flex-row gap-5 group">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="featured" label="FEATURED" /></div>
              <h2 className="font-cond font-bold uppercase text-paper text-[26px] leading-[1.02] tracking-tight mt-3">
                EXTENDED LOOK: WHAT THE SUMMARY ADDS
              </h2>
              <p className="text-dim text-[13px] leading-relaxed mt-2 clamp-2">
                Leonida, its named counties, the protagonists and the source boundaries for the archive.
              </p>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-auto pt-4">
                COMMUNITY REFERENCE&nbsp;&nbsp;·&nbsp;&nbsp;AUG 27, 2026
              </p>
            </div>
            <div className="relative w-full sm:w-[46%] shrink-0 aspect-[16/9] sm:aspect-auto sm:min-h-[150px] overflow-hidden rounded-sm border border-line">
              <Image src={IMG.ambrosiaParty} alt="Revellers covered in mud at an off-road party in the Ambrosia backcountry" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              <span className="absolute inset-0 bg-ink/20" />
              <span className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-ink/70 border border-white/60 flex items-center justify-center text-paper" aria-hidden="true">
                <Play size={16} fill="currentColor" />
              </span>
            </div>
          </Link>

          {/* News card */}
          <Link href="/news/new-vice-city-images-surface-online" className="panel rounded-sm p-5 flex gap-4 group hover:border-white/30 transition-colors">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="news" label="NEWS" /></div>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-3">3 HOURS AGO</p>
              <h3 className="font-cond font-bold uppercase text-paper text-[19px] leading-[1.05] tracking-tight mt-1.5">
                NEW VICE CITY IMAGES SURFACE ONLINE
              </h3>
              <p className="text-dim text-[12px] leading-relaxed mt-2 clamp-3">
                Alleged captures show unseen districts and more traffic.
              </p>
            </div>
            <div className="relative w-[104px] h-[104px] shrink-0 self-center overflow-hidden rounded-sm border border-line">
              <Image src={IMG.swampSkyline} alt="The Vice City skyline seen across the Grassrivers wetlands" fill sizes="104px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
            </div>
          </Link>

          {/* Update card */}
          <Link href="/database/vehicles" className="panel rounded-sm p-5 flex gap-4 group hover:border-white/30 transition-colors">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="update" label="UPDATE" /></div>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-3">1 DAY AGO</p>
              <h3 className="font-cond font-bold uppercase text-paper text-[19px] leading-[1.05] tracking-tight mt-1.5">
                VEHICLE DATABASE UPDATED
              </h3>
              <p className="text-dim text-[12px] leading-relaxed mt-2 clamp-3">
                12 new vehicles added with detailed information.
              </p>
            </div>
            <div className="relative w-[104px] h-[104px] shrink-0 self-center overflow-hidden rounded-sm border border-line">
              <Image src={IMG.stanierNight} alt="A Vapid Stanier in Vintage Vice City livery, lit by neon at night" fill sizes="104px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default App;
