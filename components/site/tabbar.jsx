'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House, Library, Newspaper, MoreHorizontal, X, Users, Car, Crosshair,
  MapPin, Radio as RadioIcon, Repeat2, Layers, FolderTree, Sparkles, BookOpen,
  Images, BookMarked, BarChart3, Clock, Shuffle,
  Search, CircleHelp, UserRound,
} from 'lucide-react'
import { SITE_COUNTERS } from '@/lib/content'
import { cx } from './ui'

// A barra flutuante inferior. Quatro destinos mais um «More»: acima de
// cinco alvos o polegar deixa de acertar, e este arquivo tem quinze
// destinos — os outros dez vivem na folha, agrupados por natureza.

const WIKI_ROUTES = ['/wiki', '/sources', '/database', '/gangs-factions', '/editions', '/categories', '/easter-eggs']
const inWiki = (p) => WIKI_ROUTES.some((r) => p.startsWith(r)) || p.startsWith('/map/')

// Cada destino leva a sua cor, como cada medidor do HUD do jogo leva a
// dele: reconhece-se o sítio pela cor antes de se ler a palavra.
const TABS = [
  { key: 'home', label: 'Home', href: '/', icon: House, match: (p) => p === '/', tint: 'pink' },
  { key: 'wiki', label: 'Wiki', href: '/wiki', icon: Library, match: inWiki, tint: 'violet' },
  { key: 'map', label: 'Places', href: '/map', icon: MapPin, match: (p) => p === '/map', tint: 'mint' },
  { key: 'news', label: 'News', href: '/news', icon: Newspaper, match: (p) => p.startsWith('/news'), tint: 'warn' },
]

// Escritas por extenso: o Tailwind lê as classes no código-fonte, e
// montadas por concatenação nunca chegariam a entrar no CSS.
const TINT = {
  pink: { pill: 'bg-pink', text: 'text-pink', ring: 'bg-pink/12', dot: 'bg-pink', wash: 'bg-pink/[0.10]', hoverRing: 'hover:bg-pink/[0.07]', ringLine: 'ring-pink/20', glow: 'shadow-[0_2px_10px_-2px_rgba(194,24,91,0.55)]', cast: '0 10px 30px -14px rgba(194,24,91,0.45)' },
  violet: { pill: 'bg-violet', text: 'text-violet', ring: 'bg-violet/12', dot: 'bg-violet', wash: 'bg-violet/[0.10]', hoverRing: 'hover:bg-violet/[0.07]', ringLine: 'ring-violet/20', glow: 'shadow-[0_2px_10px_-2px_rgba(91,63,214,0.55)]', cast: '0 10px 30px -14px rgba(91,63,214,0.45)' },
  mint: { pill: 'bg-mint', text: 'text-mint', ring: 'bg-mint/12', dot: 'bg-mint', wash: 'bg-mint/[0.10]', hoverRing: 'hover:bg-mint/[0.07]', ringLine: 'ring-mint/20', glow: 'shadow-[0_2px_10px_-2px_rgba(14,124,107,0.55)]', cast: '0 10px 30px -14px rgba(14,124,107,0.45)' },
  warn: { pill: 'bg-warn', text: 'text-warn', ring: 'bg-warn/12', dot: 'bg-warn', wash: 'bg-warn/[0.10]', hoverRing: 'hover:bg-warn/[0.07]', ringLine: 'ring-warn/20', glow: 'shadow-[0_2px_10px_-2px_rgba(138,106,0,0.55)]', cast: '0 10px 30px -14px rgba(138,106,0,0.45)' },
  paper: { pill: 'bg-paper', text: 'text-paper', ring: 'bg-black/[0.06]', dot: 'bg-paper', wash: 'bg-black/[0.06]', hoverRing: 'hover:bg-black/[0.04]', ringLine: 'ring-black/10', glow: 'shadow-[0_2px_10px_-2px_rgba(11,15,22,0.45)]', cast: '0 10px 30px -14px rgba(11,15,22,0.35)' },
}

const SHEET_GROUPS = [
  {
    title: 'Wiki', tint: 'violet',
    items: [
      { label: 'All entries', href: '/wiki', icon: Library },
      { label: 'Characters', href: '/database/characters', icon: Users },
      { label: 'Vehicles', href: '/database/vehicles', icon: Car },
      { label: 'Weapons', href: '/database/weapons', icon: Crosshair },
      { label: 'Locations', href: '/map', icon: MapPin },
      { label: 'Factions', href: '/gangs-factions', icon: Users },
      { label: 'Radio', href: '/database/radio', icon: RadioIcon },
      { label: 'Mechanics', href: '/database/mechanics', icon: Repeat2 },
      { label: 'Editions', href: '/editions', icon: Layers },
    ],
  },
  {
    title: 'Read', tint: 'pink',
    items: [
      { label: 'News', href: '/news', icon: Newspaper },
      { label: 'Guides', href: '/guides', icon: BookOpen },
      { label: 'Media', href: '/media', icon: Images },
      { label: 'Categories', href: '/categories', icon: FolderTree },
    ],
  },
  {
    title: 'About the archive', tint: 'mint',
    items: [
      { label: 'Account', href: '/account', icon: UserRound },
      { label: 'Sources', href: '/sources', icon: BookMarked },
      { label: 'Statistics', href: '/wiki/statistics', icon: BarChart3 },
      { label: 'Recent changes', href: '/wiki/changes', icon: Clock },
      { label: 'All categories', href: '/wiki/categories', icon: FolderTree },
      { label: 'Special pages', href: '/wiki/special', icon: Sparkles },
      { label: 'Full search', href: '/wiki/search', icon: Search },
      { label: 'Help', href: '/wiki/help', icon: CircleHelp },
      { label: 'Random entry', href: '/wiki/random', icon: Shuffle },
    ],
  },
]

function countersFor(p) {
  if (p.startsWith('/news') || p.startsWith('/categories')) return SITE_COUNTERS.news
  if (p.startsWith('/map') || p.startsWith('/easter-eggs')) return SITE_COUNTERS.map
  if (p.startsWith('/database/characters')) return SITE_COUNTERS.characters
  return SITE_COUNTERS.home
}

export default function TabBar() {
  const pathname = usePathname() || '/'
  const [sheetOpen, setSheetOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [reduced, setReduced] = useState(false)
  const lastY = useRef(0)

  const navRef = useRef(null)
  const itemRefs = useRef({})
  // A pílula do estado activo é uma só e desliza entre destinos, em vez
  // de aparecer e desaparecer em cada um. É o que dá continuidade ao
  // movimento: o olho segue a mesma forma, e percebe que mudou de sítio
  // em vez de ver duas coisas piscar.
  const [pill, setPill] = useState(null)
  // A passagem do rato segue a mesma lógica do estado activo: em vez de
  // cada destino acender o seu proprio fundo, ha um so veu que desliza
  // para o destino sob o cursor. O movimento fica continuo — o mesmo
  // objecto a mudar de sitio — em vez de dois rectangulos a piscar.
  const [hoverKey, setHoverKey] = useState(null)
  const [hoverPill, setHoverPill] = useState(null)

  const isActive = useCallback((item) => item.match(pathname), [pathname])
  const activeTab = TABS.find(isActive)
  const sheetActive = !activeTab
  const activeKey = sheetOpen ? 'more' : activeTab ? activeTab.key : 'more'
  const activeTint = TINT[(sheetOpen || !activeTab) ? 'paper' : activeTab.tint]

  useEffect(() => { setSheetOpen(false) }, [pathname])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // Medir onde a pílula tem de estar. `useLayoutEffect` para que a
  // primeira pintura já a apanhe no sítio, sem um salto visível.
  useLayoutEffect(() => {
    const medir = () => {
      const el = itemRefs.current[activeKey]
      const nav = navRef.current
      if (!el || !nav) return setPill(null)
      const a = el.getBoundingClientRect()
      const b = nav.getBoundingClientRect()
      setPill({ left: a.left - b.left, width: a.width, height: a.height, top: a.top - b.top })
    }
    medir()
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(medir)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [activeKey, compact])

  useLayoutEffect(() => {
    const el = hoverKey ? itemRefs.current[hoverKey] : null
    const nav = navRef.current
    if (!el || !nav) return setHoverPill(null)
    const a = el.getBoundingClientRect()
    const b = nav.getBoundingClientRect()
    setHoverPill({ left: a.left - b.left, width: a.width, height: a.height, top: a.top - b.top })
  }, [hoverKey, compact])

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        // A margem de 6px evita que a barra oscile com o tremor do dedo
        // ou com o ressalto do fim da página.
        if (Math.abs(delta) > 6) {
          setCompact(delta > 0 && y > 80)
          lastY.current = y
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setSheetOpen(false) }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [sheetOpen])

  const counters = countersFor(pathname)
  // Curva com um travão suave no fim, do género da que o iOS usa: parte
  // depressa e assenta devagar, em vez de chegar a bater.
  const easing = reduced ? 'none' : 'transform 420ms cubic-bezier(0.32, 0.72, 0, 1), width 420ms cubic-bezier(0.32, 0.72, 0, 1), background-color 320ms ease'

  const itemClasses = cx(
    'group relative z-[1] flex flex-col items-center justify-center rounded-[18px] select-none',
    'min-w-[60px] sm:min-w-[70px] transition-[height,padding] duration-300 ease-out',
    'active:scale-[0.94] motion-reduce:active:scale-100',
  )

  return (
    <>
      <div
        className="mobile-tabbar-shell fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pointer-events-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <nav
          ref={navRef}
          aria-label="Primary"
          onPointerLeave={() => setHoverKey(null)}
          className={cx(
            'gta-lore-wiki-tabbar pointer-events-auto relative flex items-center gap-1 rounded-[26px] bg-ink',
            'transition-[padding,box-shadow] duration-500 ease-out',
            compact ? 'px-7 py-1.5' : 'px-7 py-2'
          )}
          style={{
            // Cinco camadas, de dentro para fora: a aresta de luz no topo
            // (o sol na platibanda de um hotel branco), o contorno fino
            // que a recorta do papel, a sombra de contacto, a de elevação
            // e, por baixo de tudo, a sombra tingida da cor do ramo — o
            // néon a pintar o passeio. Uma sombra só dá sempre um cartão
            // colado ao fundo.
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.9)',
              '0 0 0 1px rgba(11,15,22,0.07)',
              '0 2px 6px -1px rgba(11,15,22,0.10)',
              '0 16px 44px -14px rgba(11,15,22,0.30)',
              activeTint.cast,
            ].join(', '),
          }}
        >
          {/* Linhas de velocidade, a assinatura do Streamline Moderne:
              três traços horizontais de cada lado, o do meio mais longo,
              como nas fachadas e nos letreiros de Ocean Drive. */}
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-[3px]" aria-hidden="true">
            <span className="block h-px w-2.5 rounded-full bg-pink/45" />
            <span className="block h-px w-4 rounded-full bg-pink/70" />
            <span className="block h-px w-2.5 rounded-full bg-pink/45" />
          </span>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-end gap-[3px]" aria-hidden="true">
            <span className="block h-px w-2.5 rounded-full bg-mint/45" />
            <span className="block h-px w-4 rounded-full bg-mint/70" />
            <span className="block h-px w-2.5 rounded-full bg-mint/45" />
          </span>
          {/* O filete das três cores, agora encostado à curva. */}
          <span
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent opacity-60"
            aria-hidden="true"
          />

          {/* O veu de passagem. Fica por baixo da pilula activa: sobre o
              destino ja activo nao se ve nada, que e o correcto. */}
          {hoverPill && hoverKey !== activeKey && (
            <span
              aria-hidden="true"
              className={cx('absolute z-0 rounded-[18px] ring-1 ring-inset', (TINT[(TABS.find((t) => t.key === hoverKey) || {}).tint] || TINT.paper).wash, (TINT[(TABS.find((t) => t.key === hoverKey) || {}).tint] || TINT.paper).ringLine)}
              style={{
                transform: `translateX(${hoverPill.left}px)`,
                width: hoverPill.width,
                height: hoverPill.height,
                top: hoverPill.top,
                left: 0,
                transition: easing,
              }}
            />
          )}

          {/* A pílula que desliza. Fica por baixo dos destinos. */}
          {pill && (
            <span
              aria-hidden="true"
              className={cx('absolute z-0 rounded-[18px]', activeTint.pill, activeTint.glow)}
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
                height: pill.height,
                top: pill.top,
                left: 0,
                transition: easing,
              }}
            />
          )}

          {TABS.map((item) => {
            const Icon = item.icon
            const active = !sheetOpen && isActive(item)
            const tint = TINT[item.tint]
            return (
              <Link
                key={item.key}
                ref={(el) => { itemRefs.current[item.key] = el }}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoverKey(item.key) }}
                onFocus={() => setHoverKey(item.key)}
                onBlur={() => setHoverKey(null)}
                className={cx(itemClasses, compact ? 'h-11 px-3' : 'h-[54px] px-3')}
              >
                <Icon
                  size={compact ? 20 : 19}
                  strokeWidth={active ? 2.5 : 2}
                  className={cx('transition-all duration-300', active ? 'text-ink' : cx(tint.text, hoverKey === item.key ? 'opacity-100 scale-110' : 'opacity-85'))}
                  aria-hidden="true"
                />
                <span
                  className={cx(
                    'font-cond font-semibold uppercase tracking-[0.1em] leading-none overflow-hidden transition-all duration-300 ease-out',
                    active ? 'text-ink' : hoverKey === item.key ? tint.text : 'text-dim',
                    compact ? 'max-h-0 opacity-0 mt-0 text-[0px]' : 'max-h-4 opacity-100 mt-1 text-[10px]'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}

          <button
            type="button"
            ref={(el) => { itemRefs.current.more = el }}
            onClick={() => setSheetOpen((v) => !v)}
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHoverKey('more') }}
            onFocus={() => setHoverKey('more')}
            onBlur={() => setHoverKey(null)}
            aria-expanded={sheetOpen}
            aria-haspopup="dialog"
            className={cx(itemClasses, compact ? 'h-11 px-3' : 'h-[54px] px-3')}
          >
            <span className="relative flex items-center justify-center">
              {sheetOpen
                ? <X size={compact ? 20 : 19} strokeWidth={2.5} className="text-ink" aria-hidden="true" />
                : <MoreHorizontal size={compact ? 20 : 19} strokeWidth={2} className={cx('transition-colors duration-300', sheetActive ? 'text-ink' : 'text-paper')} aria-hidden="true" />}
            </span>
            <span
              className={cx(
                'font-cond font-semibold uppercase tracking-[0.1em] leading-none overflow-hidden transition-all duration-300 ease-out',
                sheetOpen || sheetActive ? 'text-ink' : 'text-dim',
                compact ? 'max-h-0 opacity-0 mt-0 text-[0px]' : 'max-h-4 opacity-100 mt-1 text-[10px]'
              )}
            >
              {sheetOpen ? 'Close' : 'More'}
            </span>
          </button>
        </nav>
      </div>

      {sheetOpen && (
        <>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label="Close menu"
            className="fixed inset-0 z-[78] bg-white/70 backdrop-blur-[2px] animate-in fade-in duration-200"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="All sections"
            className="fixed inset-x-0 bottom-0 z-[79] mx-auto w-full max-w-[720px] px-3 animate-in slide-in-from-bottom-6 fade-in duration-300 ease-out motion-reduce:animate-none"
            style={{ paddingBottom: 'calc(max(0.75rem, env(safe-area-inset-bottom)) + 78px)' }}
          >
            <div className="gta-lore-wiki-menu-sheet rounded-[28px] bg-ink overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(11,15,22,0.07),0_24px_70px_-18px_rgba(11,15,22,0.30)]">
              {/* Pega, como nas folhas do iOS: diz que isto veio de baixo
                  e que se fecha para baixo. */}
              <div className="flex justify-center pt-2.5 pb-1">
                <span className="h-1 w-9 rounded-full bg-black/15" aria-hidden="true" />
              </div>

              <div className="max-h-[min(64vh,560px)] overflow-y-auto overscroll-contain px-4 pb-4">
                <div className="flex items-center justify-between gap-4 py-3 mb-1 border-b border-black/[0.07]">
                  <span className="chromatic-title font-cond font-bold text-[15px] tracking-wide text-paper">GTA LORE WIKI</span>
                  <span className="flex items-center gap-3 shrink-0">
                    {counters.map(([n, label]) => (
                      <span key={label} className="flex flex-col items-end leading-none">
                        <span className="font-cond font-bold text-[13px] text-mint tabular-nums">{n}</span>
                        <span className="font-cond uppercase tracking-[0.14em] text-[7px] text-dim mt-0.5">{label}</span>
                      </span>
                    ))}
                  </span>
                </div>

                {SHEET_GROUPS.map((group) => {
                  const tint = TINT[group.tint]
                  return (
                    <div key={group.title} className="mt-4 first:mt-3">
                      <p className="flex items-center gap-2 font-cond uppercase tracking-[0.16em] text-[9px] text-dim mb-2">
                        <span className={cx('w-1.5 h-1.5 rounded-full', tint.dot)} aria-hidden="true" />
                        {group.title}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {group.items.map((item) => {
                          const Icon = item.icon
                          const active = pathname === item.href
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setSheetOpen(false)}
                              aria-current={active ? 'page' : undefined}
                              className={cx(
                                'flex items-center gap-2.5 h-12 pl-2 pr-3 rounded-[18px] transition-colors active:scale-[0.97] motion-reduce:active:scale-100',
                                active ? cx(tint.pill, 'text-ink') : cx('text-paper', tint.hoverRing)
                              )}
                            >
                              <span
                                className={cx(
                                  'w-8 h-8 rounded-[12px] flex items-center justify-center shrink-0 transition-colors',
                                  active ? 'bg-black/15' : tint.ring
                                )}
                                aria-hidden="true"
                              >
                                <Icon size={15} className={active ? 'text-ink' : tint.text} />
                              </span>
                              <span className="font-cond font-semibold uppercase tracking-[0.08em] text-[12px] truncate">{item.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
