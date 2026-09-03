'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Map, Newspaper, Users, BookOpen, FolderTree, Layers, Crosshair, Car, Repeat2, Radio as RadioIcon, Menu, X, Library, MapPin, ChevronDown, Images } from 'lucide-react'
import { SITE_COUNTERS } from '@/lib/content'
import { cx } from './ui'

// A navegação segue a divisão que as wikis grandes usam: tudo o que é
// verbete vive debaixo de WIKI, e ao lado ficam as coisas que não são
// verbetes — o mapa, os guias, as notícias e a galeria. Sem isto, uma
// notícia e uma ficha de veículo apareciam ao mesmo nível, e o arquivo
// deixava de dizer o que é registo e o que é actualidade.
const WIKI_SUB = [
  { label: 'CHARACTERS', href: '/database/characters', icon: Users },
  { label: 'VEHICLES', href: '/database/vehicles', icon: Car },
  { label: 'WEAPONS', href: '/database/weapons', icon: Crosshair },
  { label: 'LOCATIONS', href: '/map', icon: MapPin, match: (p) => p.startsWith('/map/') || p.startsWith('/easter-eggs') },
  { label: 'FACTIONS', href: '/gangs-factions', icon: Users },
  { label: 'RADIO', href: '/database/radio', icon: RadioIcon },
  { label: 'MECHANICS', href: '/database/mechanics', icon: Repeat2 },
  { label: 'EDITIONS', href: '/editions', icon: Layers },
  { label: 'CATEGORIES', href: '/categories', icon: FolderTree },
]

const WIKI_ROUTES = ['/database', '/gangs-factions', '/editions', '/categories', '/easter-eggs']
const inWiki = (p) => WIKI_ROUTES.some((r) => p.startsWith(r)) || p.startsWith('/map/')

const NAV = [
  { label: 'HOME', href: '/', icon: House, match: (p) => p === '/' },
  { label: 'WIKI', href: '/database/characters', icon: Library, match: inWiki, group: WIKI_SUB },
  { label: 'INTERACTIVE MAP', href: '/map', icon: Map, match: (p) => p === '/map' },
  { label: 'GUIDES', href: '/guides', icon: BookOpen, match: (p) => p.startsWith('/guides') },
  { label: 'NEWS', href: '/news', icon: Newspaper, match: (p) => p.startsWith('/news') },
  { label: 'MEDIA', href: '/media', icon: Images, match: (p) => p.startsWith('/media') },
]

function countersFor(p) {
  if (p.startsWith('/news') || p.startsWith('/categories')) return SITE_COUNTERS.news
  if (p.startsWith('/map') || p.startsWith('/easter-eggs')) return SITE_COUNTERS.map
  if (p.startsWith('/database/characters')) return SITE_COUNTERS.characters
  return SITE_COUNTERS.home
}

function NavLinks({ pathname, onNavigate }) {
  // O grupo abre sozinho quando já se está lá dentro, e pode abrir-se à
  // mão a partir de qualquer sítio: quem chega à home tem de conseguir
  // ver o que a wiki tem sem ter de adivinhar uma rota.
  const [openGroup, setOpenGroup] = useState(() => inWiki(pathname))
  useEffect(() => { if (inWiki(pathname)) setOpenGroup(true) }, [pathname])

  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV.map((item) => {
        const active = item.match(pathname)
        const Icon = item.icon
        const expanded = item.group ? openGroup : undefined

        return (
          <div key={item.label}>
            <div className="relative flex items-center">
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cx(
                  'group relative flex-1 flex items-center gap-3 h-11 px-3 rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[13px] transition-all duration-200',
                  active ? 'bg-paper text-ink' : 'text-dim hover:text-paper hover:bg-white/5'
                )}
              >
                <Icon size={16} className={active ? 'text-ink' : 'text-dim group-hover:text-mint transition-colors'} aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-mint via-pink to-violet" aria-hidden="true" />}
              </Link>
              {item.group && (
                <button
                  type="button"
                  onClick={() => setOpenGroup((v) => !v)}
                  aria-expanded={expanded}
                  aria-label={expanded ? 'Collapse wiki sections' : 'Expand wiki sections'}
                  className={cx('absolute right-1 w-9 h-9 flex items-center justify-center rounded-sm transition-colors', active ? 'text-ink hover:bg-black/10' : 'text-dim hover:text-paper')}
                >
                  <ChevronDown size={15} className={cx('transition-transform duration-200', expanded && 'rotate-180')} />
                </button>
              )}
            </div>

            {item.group && expanded && (
              <div className="mt-1 mb-1.5 ml-4 flex flex-col gap-0.5 border-l hairline pl-3">
                {item.group.map((sub) => {
                  const subActive = sub.match ? sub.match(pathname) : pathname.startsWith(sub.href)
                  const SubIcon = sub.icon
                  return (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={onNavigate}
                      aria-current={subActive ? 'page' : undefined}
                      className={cx(
                        'flex items-center gap-2.5 h-9 px-2.5 rounded-sm font-cond font-semibold uppercase tracking-[0.08em] text-[12px] transition-colors duration-150',
                        subActive ? 'text-pink bg-pink/5' : 'text-dim hover:text-paper hover:bg-white/5'
                      )}
                    >
                      <SubIcon size={13} aria-hidden="true" />
                      {sub.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export default function Sidebar() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const counters = countersFor(pathname)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      {/* Botão de abrir, só visível abaixo de lg — acima disso a lateral
          está sempre visível e este botão não faz falta. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-2.5 left-2.5 z-[75] w-11 h-11 flex items-center justify-center text-paper"
        aria-label="Open navigation"
        aria-expanded={open}
      >
        <Menu size={22} />
      </button>

      {/* Painel: coluna fixa em ecrãs largos, gaveta deslizante por cima de
          tudo em ecrãs estreitos. */}
      <aside
        className={cx(
          // Em ecrãs estreitos não há painel nenhum: só os links por cima da
          // página escurecida. Sem fundo, sem blur e sem borda — qualquer um
          // dos três desenharia o rectângulo da gaveta. Quem garante a
          // leitura é o escurecido por trás. Acima de lg isto não é uma
          // gaveta mas uma coluna fixa ao lado do conteúdo, e aí o fundo
          // sólido é o que mantém a leitura estável.
          'bg-transparent border-r border-transparent flex flex-col shrink-0 w-[248px]',
          'lg:bg-raised lg:border-white/[0.16]',
          'fixed inset-y-0 left-0 z-[90] transition-transform duration-300 ease-out',
          'lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Site navigation"
      >
        <div className="h-[56px] flex items-center justify-between px-4 border-b border-transparent lg:border-white/[0.16] shrink-0">
          <Link href="/" className="group flex flex-col justify-center min-w-0" onClick={() => setOpen(false)}>
            <span className="chromatic-title font-cond font-bold text-[16px] tracking-wide text-paper whitespace-nowrap leading-none truncate">LEONIDA ARCHIVE</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="lg:hidden w-9 h-9 flex items-center justify-center text-dim hover:text-paper shrink-0" aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
        </div>

        <div className="shrink-0 border-t border-transparent lg:border-white/[0.16] px-4 py-3.5 grid grid-cols-3 gap-2">
          {counters.map(([n, label]) => (
            <div key={label} className="flex flex-col leading-none">
              <span className="font-cond font-bold text-[16px] text-paper tabular-nums">{n}</span>
              <span className="font-cond text-[8px] text-dim uppercase tracking-[0.16em] mt-0.5 truncate">{label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Fundo por trás da gaveta em ecrãs estreitos. Com a gaveta sem painel
          próprio, este escurecido é o único que segura a leitura dos links:
          a 70% o texto claro sobre conteúdo branco ficava em ~4:1, abaixo do
          mínimo acessível; a 80% fica em ~6:1. O blur é do ecrã todo, por
          isso não denuncia a caixa da gaveta. */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-[85] bg-black/80 backdrop-blur-[4px]"
          aria-label="Close navigation"
        />
      )}
    </>
  )
}
