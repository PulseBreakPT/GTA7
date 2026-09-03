'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House, Library, Map, Newspaper, MoreHorizontal, X, Users, Car, Crosshair,
  MapPin, Radio as RadioIcon, Repeat2, Layers, FolderTree, Sparkles, BookOpen,
  Images, BookMarked, BarChart3, Clock, Shuffle,
} from 'lucide-react'
import { SITE_COUNTERS } from '@/lib/content'
import { cx } from './ui'

// A barra flutuante inferior, no padrão do iOS: um punhado de destinos
// sempre à mão e um «More» para o resto. A regra é a mesma que a Apple
// segue e que existe por uma razão prática — acima de cinco alvos, o
// polegar deixa de acertar e a barra passa a ser uma lista de ícones
// pequenos. Este arquivo tem quinze destinos: cinco ficam na barra, os
// outros dez vivem na folha, organizados.

const WIKI_ROUTES = ['/wiki', '/sources', '/database', '/gangs-factions', '/editions', '/categories', '/easter-eggs']
const inWiki = (p) => WIKI_ROUTES.some((r) => p.startsWith(r)) || p.startsWith('/map/')

const TABS = [
  { label: 'Home', href: '/', icon: House, match: (p) => p === '/' },
  { label: 'Wiki', href: '/wiki', icon: Library, match: inWiki },
  { label: 'Map', href: '/map', icon: Map, match: (p) => p === '/map' },
  { label: 'News', href: '/news', icon: Newspaper, match: (p) => p.startsWith('/news') },
]

// A folha agrupa por natureza, não por ordem de importância: primeiro os
// ramos de verbetes, depois o que não é verbete, e por fim as vistas que
// descrevem o próprio arquivo.
const SHEET_GROUPS = [
  {
    title: 'Wiki',
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
    title: 'Read',
    items: [
      { label: 'News', href: '/news', icon: Newspaper },
      { label: 'Guides', href: '/guides', icon: BookOpen },
      { label: 'Media', href: '/media', icon: Images },
      { label: 'Categories', href: '/categories', icon: FolderTree },
    ],
  },
  {
    title: 'About the archive',
    items: [
      { label: 'Sources', href: '/sources', icon: BookMarked },
      { label: 'Statistics', href: '/wiki/statistics', icon: BarChart3 },
      { label: 'Recent changes', href: '/wiki/changes', icon: Clock },
      { label: 'All categories', href: '/wiki/categories', icon: FolderTree },
      { label: 'Special pages', href: '/wiki/special', icon: Sparkles },
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
  // A barra encolhe quando se desce a página e volta ao tamanho normal
  // quando se sobe — é o comportamento do iOS, e existe para devolver
  // ecrã a quem está a ler em vez de a navegar.
  const [compact, setCompact] = useState(false)
  const lastY = useRef(0)

  useEffect(() => { setSheetOpen(false) }, [pathname])

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
    // Com a folha aberta, a página por trás não deve deslizar.
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [sheetOpen])

  const isActive = useCallback((item) => item.match(pathname), [pathname])
  const sheetActive = !sheetOpen && !TABS.some(isActive)
  const counters = countersFor(pathname)

  return (
    <>
      {/* A barra. `pointer-events-none` no invólucro e `auto` na cápsula
          deixam clicar no conteúdo de um lado e do outro dela. */}
      <div
        className="fixed inset-x-0 bottom-0 z-[80] flex justify-center px-3 pointer-events-none"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <nav
          aria-label="Primary"
          className={cx(
            'pointer-events-auto flex items-center gap-1 rounded-full',
            'border border-black/[0.07] bg-white/72 shadow-[0_10px_40px_-12px_rgba(11,15,22,0.28),0_2px_8px_-2px_rgba(11,15,22,0.10)]',
            // O material: desfoque forte mais saturação. Sem a saturação
            // o que passa por baixo do vidro sai cinzento e a barra
            // parece um plástico opaco em vez de vidro.
            'backdrop-blur-2xl backdrop-saturate-[1.8]',
            'transition-[padding] duration-300 ease-out',
            compact ? 'px-1.5 py-1.5' : 'px-2 py-2'
          )}
        >
          {TABS.map((item) => {
            const Icon = item.icon
            const active = isActive(item)
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'group relative flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-out',
                  'min-w-[58px] sm:min-w-[68px]',
                  compact ? 'h-11 px-3' : 'h-[52px] px-3',
                  active ? 'bg-paper text-ink' : 'text-dim hover:text-paper hover:bg-black/[0.05]'
                )}
              >
                <Icon size={compact ? 20 : 19} strokeWidth={active ? 2.3 : 2} aria-hidden="true" />
                <span
                  className={cx(
                    'font-cond font-semibold uppercase tracking-[0.1em] leading-none overflow-hidden transition-all duration-300 ease-out',
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
            onClick={() => setSheetOpen((v) => !v)}
            aria-expanded={sheetOpen}
            aria-haspopup="dialog"
            className={cx(
              'group relative flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-out',
              'min-w-[58px] sm:min-w-[68px]',
              compact ? 'h-11 px-3' : 'h-[52px] px-3',
              sheetOpen || sheetActive ? 'bg-paper text-ink' : 'text-dim hover:text-paper hover:bg-black/[0.05]'
            )}
          >
            {sheetOpen ? <X size={compact ? 20 : 19} strokeWidth={2.3} aria-hidden="true" /> : <MoreHorizontal size={compact ? 20 : 19} strokeWidth={2} aria-hidden="true" />}
            <span
              className={cx(
                'font-cond font-semibold uppercase tracking-[0.1em] leading-none overflow-hidden transition-all duration-300 ease-out',
                compact ? 'max-h-0 opacity-0 mt-0 text-[0px]' : 'max-h-4 opacity-100 mt-1 text-[10px]'
              )}
            >
              {sheetOpen ? 'Close' : 'More'}
            </span>
          </button>
        </nav>
      </div>

      {/* A folha. Sobe de baixo, encostada à barra, com o mesmo material. */}
      {sheetOpen && (
        <>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label="Close menu"
            className="fixed inset-0 z-[78] bg-white/60 backdrop-blur-[3px] animate-in fade-in duration-200"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="All sections"
            className={cx(
              'fixed inset-x-0 bottom-0 z-[79] mx-auto w-full max-w-[720px] px-3',
              'animate-in slide-in-from-bottom-4 fade-in duration-300 ease-out'
            )}
            style={{ paddingBottom: 'calc(max(0.75rem, env(safe-area-inset-bottom)) + 76px)' }}
          >
            <div className="rounded-[28px] border border-black/[0.07] bg-white/85 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_20px_60px_-16px_rgba(11,15,22,0.3)] overflow-hidden">
              <div className="max-h-[min(64vh,540px)] overflow-y-auto overscroll-contain p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="chromatic-title font-cond font-bold text-[15px] tracking-wide text-paper">LEONIDA ARCHIVE</span>
                  <span className="font-mono text-[10px] text-dim tabular-nums">
                    {counters.map(([n]) => n).join(' · ')}
                  </span>
                </div>

                {SHEET_GROUPS.map((group) => (
                  <div key={group.title} className="mb-4 last:mb-0">
                    <p className="font-cond uppercase tracking-[0.16em] text-[9px] text-dim mb-2">{group.title}</p>
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
                              'flex items-center gap-2.5 h-11 px-3 rounded-2xl font-cond font-semibold uppercase tracking-[0.08em] text-[12px] transition-colors',
                              active ? 'bg-paper text-ink' : 'text-paper hover:bg-black/[0.05]'
                            )}
                          >
                            <Icon size={15} className={active ? 'text-ink' : 'text-mint'} aria-hidden="true" />
                            <span className="truncate">{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
