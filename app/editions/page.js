'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, X, Minus, ExternalLink, TriangleAlert, Download, Package, Calendar, ShoppingCart, Gamepad2, Users, Layers } from 'lucide-react'
import { editions, IMG } from '@/lib/content'
import { cx } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'

// As secções da página, por esta ordem: primeiro a pergunta que traz cá o
// leitor (qual é a diferença), depois o que a Ultimate acrescenta, depois o
// que se aplica às duas, e só no fim o calendário, a caixa física e o que
// não foi anunciado. O índice usa esta mesma lista, para não haver duas
// ordens a manter à mão.
const SECTIONS = [
  { id: 'compare', label: 'Compare' },
  { id: 'contents', label: 'The 16 items' },
  { id: 'bonuses', label: 'Bonuses' },
  { id: 'timeline', label: 'Dates' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'physical', label: 'Physical' },
  { id: 'not-announced', label: 'Not announced' },
]

// Famílias para agrupar os 16 itens. A Rockstar dá a cada um o seu `kind`
// («Vehicle», «Vehicle and garage», «Boat»…); estas famílias só arrumam
// esses rótulos em prateleiras, e a última apanha o que não couber em
// nenhuma — um item novo nunca pode desaparecer da página por falta de
// correspondência.
const FAMILIES = [
  { id: 'vehicles', label: 'Vehicles & builds', test: (k) => /vehicle|boat|garage/i.test(k) },
  { id: 'weapons', label: 'Weapons', test: (k) => /weapon/i.test(k) },
  { id: 'places', label: 'Destinations & property', test: (k) => /destination|property/i.test(k) },
  { id: 'apparel', label: 'Apparel', test: (k) => /apparel/i.test(k) },
  { id: 'activities', label: 'Activities', test: (k) => /activity/i.test(k) },
  { id: 'other', label: 'Other', test: () => true },
]
const familyOf = (kind) => FAMILIES.find((f) => f.test(kind || '')).id

// Cabeçalho de secção: o mesmo filete e a mesma escala em todas, para que a
// página se leia como uma sequência e não como oito páginas coladas.
function SectionHead({ id, rail, title, children }) {
  return (
    <header className="scroll-mt-20" id={id}>
      <div className="data-rail mt-12">{rail}</div>
      <h2 className="mt-3 font-cond font-bold uppercase tracking-[0.06em] text-[26px] sm:text-[30px] leading-[1.05] text-paper">{title}</h2>
      {children && <p className="mt-3 max-w-[72ch] text-[14px] leading-[1.7] text-dim">{children}</p>}
    </header>
  )
}

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

// A célula da tabela de comparação. O sim e o não têm de se distinguir sem
// depender da cor — um visto e um traço têm formas diferentes —, e a palavra
// vai por extenso para quem lê com leitor de ecrã.
function Cell({ value }) {
  return (
    <td className="px-3 py-3 text-center align-middle">
      <span className={cx('inline-flex items-center justify-center w-6 h-6 rounded-full border',
        value ? 'border-mint/45 bg-mint/10 text-mint' : 'border-line bg-surface2/60 text-dim')}>
        {value ? <Check size={14} strokeWidth={2.8} /> : <Minus size={14} strokeWidth={2.8} />}
      </span>
      <span className="sr-only">{value ? 'included' : 'not included'}</span>
    </td>
  )
}

function App() {
  const [standard, ultimate] = editions.tiers
  const [family, setFamily] = useState('all')
  // O «já passou» de cada data depende do dia em que se lê. Fica para depois
  // da montagem: calculado no servidor, dava marcas diferentes das do
  // browser e o React reclamava da hidratação.
  const [today, setToday] = useState(null)
  useEffect(() => { setToday(Date.now()) }, [])

  // A cronologia sai dos quatro campos de data do registo, ordenada pela
  // data real e não pela ordem em que estão escritos.
  const timeline = useMemo(() => [
    { label: 'Pre-orders opened', date: editions.preOrdersOpened, icon: ShoppingCart, note: 'Both editions, on both storefronts.' },
    { label: 'Pre-load opens', date: editions.preloadDate, icon: Download, note: 'Local midnight, seven days out. A download window, not early play.' },
    { label: 'Release', date: editions.releaseDate, icon: Calendar, note: 'Both editions launch together.' },
    { label: 'Bonus deadline', date: editions.bonusDeadline, icon: Package, note: 'Last day a purchase still qualifies for the pre-order bonuses.' },
  ].map((item) => ({ ...item, at: Date.parse(item.date) })).sort((a, b) => a.at - b.at), [])

  const familyCounts = useMemo(() => {
    const counts = {}
    for (const item of editions.ultimateItems) {
      const id = familyOf(item[1])
      counts[id] = (counts[id] || 0) + 1
    }
    return counts
  }, [])

  const groups = useMemo(() => {
    const wanted = editions.ultimateItems.filter((item) => family === 'all' || familyOf(item[1]) === family)
    return FAMILIES
      .map((f) => ({ ...f, items: wanted.filter((item) => familyOf(item[1]) === f.id) }))
      .filter((f) => f.items.length > 0)
  }, [family])

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

        {/* Os quatro factos que enquadram tudo o resto. */}
        <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-px border hairline bg-[rgba(11,15,22,0.12)]">
          {[
            [Calendar, 'RELEASE', editions.releaseDate],
            [Layers, 'EDITIONS', `${standard.price} · ${ultimate.price}`],
            [Gamepad2, 'PLATFORMS', `${editions.platforms.length} · PS5 & XBOX SERIES`],
            [Users, 'PLAYERS', 'SINGLE PLAYER'],
          ].map(([Icon, label, value]) => (
            <div key={label} className="bg-ink px-4 py-4">
              <p className="flex items-center gap-2 font-cond uppercase tracking-[0.18em] text-[10px] text-mint">
                <Icon size={13} aria-hidden="true" />{label}
              </p>
              <p className="mt-2 font-cond font-semibold text-[16px] leading-tight text-paper">{value}</p>
            </div>
          ))}
        </div>

        {/* Índice âncora: a página tem sete secções e, sem isto, quem procura
            uma delas rola à procura do título certo. */}
        <nav aria-label="Sections of this page" className="sticky top-0 z-[40] -mx-4 sm:-mx-6 lg:-mx-8 mt-8 px-4 sm:px-6 lg:px-8 py-2.5 bg-ink/95 backdrop-blur-xl border-y hairline">
          <ul className="flex gap-2 overflow-x-auto">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex items-center whitespace-nowrap border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-dim hover:text-paper hover:border-black/40 transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ---- AS DUAS EDIÇÕES ---- */}
        <SectionHead id="compare" rail="SIDE BY SIDE · WHAT EACH ONE BUYS" title="The two editions">
          The base game is the same in both. What separates them is the Upgrade — and the format
          it comes in.
        </SectionHead>

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
                  <h3 id={`tier-${tier.id}`} className={cx('font-cond font-bold uppercase tracking-[0.08em] text-[22px] sm:text-[26px]', isUltimate ? 'text-pink' : 'text-paper')}>
                    {tier.name}
                  </h3>
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

        {/* A tabela é a resposta directa à pergunta que traz o leitor à
            página; os cartões acima são o contexto de cada edição. */}
        <div className="mt-5 panel rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">What each edition includes</caption>
              <thead>
                <tr className="border-b hairline bg-surface2/50">
                  <th scope="col" className="px-4 py-3 font-cond uppercase tracking-[0.16em] text-[10px] text-dim">What you get</th>
                  <th scope="col" className="px-3 py-3 w-[104px] text-center font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-paper">Standard</th>
                  <th scope="col" className="px-3 py-3 w-[104px] text-center font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-pink">Ultimate</th>
                </tr>
              </thead>
              <tbody>
                {editions.matrix.map((row) => (
                  <tr key={row.label} className="border-b hairline last:border-0">
                    <th scope="row" className="px-4 py-3 font-normal">
                      <span className="block text-[13.5px] leading-[1.45] text-paper">{row.label}</span>
                      {row.note && <span className="block mt-0.5 text-[11.5px] leading-[1.45] text-dim">{row.note}</span>}
                    </th>
                    <Cell value={row.standard} />
                    <Cell value={row.ultimate} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* A ponte entre as duas: quem compra a Standard não fica de fora. */}
        <section className="mt-5 border border-mint/35 bg-mint/[0.05] px-4 py-4 sm:px-5" aria-label="Ultimate Edition Upgrade">
          <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-mint">{editions.upgrade.name}</p>
          <p className="mt-2 text-[14px] leading-[1.65] text-paper/90 max-w-[80ch]">{editions.upgrade.note}</p>
        </section>

        {/* ---- OS 16 ITENS DA ULTIMATE ---- */}
        <SectionHead id="contents" rail={`ULTIMATE EDITION UPGRADE · ${String(editions.ultimateItems.length).padStart(2, '0')} ITEMS`} title="What the Upgrade contains">
          Rockstar says these are uncovered behind each chapter rather than handed over at once.
          There is no published chapter-by-chapter unlock table — anything claiming one is
          guesswork. Images are Rockstar’s own.
        </SectionHead>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter items by kind">
          {[{ id: 'all', label: 'All', count: editions.ultimateItems.length },
            ...FAMILIES.filter((f) => familyCounts[f.id]).map((f) => ({ id: f.id, label: f.label, count: familyCounts[f.id] })),
          ].map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => setFamily(chip.id)}
              aria-pressed={family === chip.id}
              className={cx('inline-flex items-center gap-1.5 border rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] transition-colors',
                family === chip.id ? 'border-paper bg-paper text-ink' : 'border-line text-dim hover:text-paper hover:border-black/40')}
            >
              {chip.label}
              <span className={cx('font-mono text-[10px] tabular-nums', family === chip.id ? 'text-ink/70' : 'text-dim')}>{chip.count}</span>
            </button>
          ))}
        </div>

        {groups.map((group) => (
          <section key={group.id} className="mt-6" aria-labelledby={`group-${group.id}`}>
            <h3 id={`group-${group.id}`} className="flex items-center gap-3 font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-paper">
              {group.label}
              <span className="font-mono text-[10px] text-dim tabular-nums">{String(group.items.length).padStart(2, '0')}</span>
              <span className="flex-1 h-px bg-[rgba(11,15,22,0.12)]" aria-hidden="true" />
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map(([name, kind, desc, imageKey]) => (
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
                    <h4 className="font-cond font-bold uppercase text-paper text-[15px] leading-[1.15] mt-1.5">{name}</h4>
                    <p className="mt-2 text-[12.5px] leading-[1.6] text-dim">{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* ---- BÓNUS DE COMPRA ---- */}
        <SectionHead id="bonuses" rail="PRE-ORDER BONUSES · BOTH EDITIONS" title="What both editions get">
          Neither of these is exclusive to Ultimate. Both go to qualifying purchases of either
          edition, and Rockstar’s wording is wider than the word «pre-order» suggests: the
          deadline is {editions.bonusDeadline}, so release day still counts.
        </SectionHead>

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

        {/* ---- CALENDÁRIO ---- */}
        <SectionHead id="timeline" rail="DATES · IN ORDER" title="The four dates that matter">
          {editions.preload}
        </SectionHead>

        <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px border hairline bg-[rgba(11,15,22,0.12)]">
          {timeline.map((item, index) => {
            const passed = today != null && item.at < today
            return (
              <li key={item.label} className="bg-ink px-4 py-4 flex flex-col">
                <span className="flex items-center justify-between gap-2">
                  <span className={cx('flex items-center gap-2 font-cond uppercase tracking-[0.16em] text-[10px]', passed ? 'text-dim' : 'text-mint')}>
                    <item.icon size={13} aria-hidden="true" />{item.label}
                  </span>
                  <span className="font-mono text-[9px] text-dim tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="mt-2 font-cond font-bold text-[17px] leading-tight text-paper">{item.date}</span>
                <span className="mt-1.5 text-[12px] leading-[1.55] text-dim">{item.note}</span>
                {passed && <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-dim">PASSED</span>}
              </li>
            )
          })}
        </ol>

        {/* ---- PLATAFORMAS ---- */}
        <SectionHead id="platforms" rail="PLATFORMS · WHERE IT RUNS" title="Where it runs, and where it does not">
          {editions.players}
        </SectionHead>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="panel rounded-sm p-5">
            <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-mint">SUPPORTED</p>
            <ul className="mt-3 flex flex-col gap-2">
              {editions.platforms.map((name) => (
                <li key={name} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-paper">
                  <Check size={14} strokeWidth={2.6} className="text-mint mt-[3px] shrink-0" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel rounded-sm p-5">
            <p className="font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-dim">NOT SUPPORTED</p>
            <ul className="mt-3 flex flex-col gap-2">
              {editions.unsupported.map((name) => (
                <li key={name} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-dim">
                  <X size={13} strokeWidth={2.6} className="mt-[3px] shrink-0" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] leading-[1.6] text-dim">
              No PC version, PC release date or PC pre-orders have been announced.
            </p>
          </div>
        </div>

        {/* ---- FÍSICO ---- */}
        <SectionHead id="physical" rail="THE PHYSICAL RELEASE · READ THIS ONE TWICE" title="«Physical» does not mean «disc»" />
        <div className="mt-4 border border-warn/45 bg-warn/[0.07] px-4 py-4 sm:px-5">
          <p className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.15em] text-[11px] text-warn">
            <TriangleAlert size={14} aria-hidden="true" /> WHAT IS ACTUALLY IN THE BOX
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
        <SectionHead id="not-announced" rail="NOT ANNOUNCED · COMMON ASSUMPTIONS THAT DO NOT HOLD" title="What neither edition includes">
          Premium editions usually come with some of these. This one does not, as far as anyone
          can show. If Rockstar announces any of it later, this list gets shorter.
        </SectionHead>
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
