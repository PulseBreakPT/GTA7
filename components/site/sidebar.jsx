'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { House, Database, Map, Newspaper, Users, BookOpen, FolderTree, Layers, Crosshair, Car, Repeat2, Radio as RadioIcon, Menu, X } from 'lucide-react'
import { SITE_COUNTERS } from '@/lib/content'
import { cx } from './ui'

const NAV = [
  { label: 'HOME', href: '/', icon: House, match: (p) => p === '/' },
  { label: 'DATABASE', href: '/database/weapons', icon: Database, match: (p) => p.startsWith('/database') },
  { label: 'MAP', href: '/map', icon: Map, match: (p) => p.startsWith('/map') || p.startsWith('/easter-eggs') },
  { label: 'ARTICLES', href: '/news', icon: Newspaper, match: (p) => p.startsWith('/news') },
  { label: 'FACTIONS', href: '/gangs-factions', icon: Users, match: (p) => p.startsWith('/gangs-factions') },
  { label: 'GUIDES', href: '/guides', icon: BookOpen, match: (p) => p.startsWith('/guides') },
  { label: 'CATEGORIES', href: '/categories', icon: FolderTree, match: (p) => p.startsWith('/categories') },
  { label: 'EDITIONS', href: '/editions', icon: Layers, match: (p) => p.startsWith('/editions') },
]

// As cinco sub-secções da base de dados: só aparecem sob DATABASE quando a
// rota já lá está, em vez de sempre visíveis — assim a lateral não fica
// sobrecarregada quando o utilizador está noutra parte do site.
const DB_SUB = [
  { label: 'WEAPONS', href: '/database/weapons', icon: Crosshair },
  { label: 'VEHICLES', href: '/database/vehicles', icon: Car },
  { label: 'CHARACTERS', href: '/database/characters', icon: Users },
  { label: 'MECHANICS', href: '/database/mechanics', icon: Repeat2 },
  { label: 'RADIO', href: '/database/radio', icon: RadioIcon },
]

function countersFor(p) {
  if (p.startsWith('/news') || p.startsWith('/categories')) return SITE_COUNTERS.news
  if (p.startsWith('/map') || p.startsWith('/easter-eggs')) return SITE_COUNTERS.map
  if (p.startsWith('/database/characters')) return SITE_COUNTERS.characters
  return SITE_COUNTERS.home
}

function NavLinks({ pathname, onNavigate }) {
  const inDatabase = pathname.startsWith('/database')
  return (
    <nav className="flex flex-col gap-1" aria-label="Primary">
      {NAV.map((item) => {
        const active = item.match(pathname)
        const Icon = item.icon
        return (
          <div key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'group relative flex items-center gap-3 h-11 px-3 rounded-sm font-cond font-semibold uppercase tracking-[0.1em] text-[13px] transition-all duration-200',
                active ? 'bg-paper text-ink' : 'text-dim hover:text-paper hover:bg-white/5'
              )}
            >
              <Icon size={16} className={active ? 'text-ink' : 'text-dim group-hover:text-mint transition-colors'} aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-gradient-to-b from-mint via-pink to-violet" aria-hidden="true" />}
            </Link>
            {item.label === 'DATABASE' && inDatabase && (
              <div className="mt-1 mb-1.5 ml-4 flex flex-col gap-0.5 border-l hairline pl-3">
                {DB_SUB.map((sub) => {
                  const subActive = pathname.startsWith(sub.href)
                  const SubIcon = sub.icon
                  return (
                    <Link
                      key={sub.href}
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
          // Em ecrãs estreitos a lateral é uma gaveta por cima da página:
          // fica transparente com blur, e quem lhe dá corpo é o escurecido
          // que já está por trás. Acima de lg é uma coluna fixa ao lado do
          // conteúdo — aí não há nada por trás para deixar ver, e o fundo
          // sólido é o que mantém a leitura estável.
          'bg-ink/25 backdrop-blur-xl border-r border-white/10 flex flex-col shrink-0 w-[248px]',
          'lg:bg-raised lg:backdrop-blur-none lg:border-white/[0.16]',
          'fixed inset-y-0 left-0 z-[90] transition-transform duration-300 ease-out',
          'lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
        aria-label="Site navigation"
      >
        <div className="h-[56px] flex items-center justify-between px-4 border-b hairline shrink-0">
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

        <div className="shrink-0 border-t hairline px-4 py-3.5 grid grid-cols-3 gap-2">
          {counters.map(([n, label]) => (
            <div key={label} className="flex flex-col leading-none">
              <span className="font-cond font-bold text-[16px] text-paper tabular-nums">{n}</span>
              <span className="font-cond text-[8px] text-dim uppercase tracking-[0.16em] mt-0.5 truncate">{label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Fundo por trás da gaveta em ecrãs estreitos. */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-[85] bg-black/70 backdrop-blur-[2px]"
          aria-label="Close navigation"
        />
      )}
    </>
  )
}
