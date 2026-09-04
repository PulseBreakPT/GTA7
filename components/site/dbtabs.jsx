'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import SearchModal from './search'
import { cx } from './ui'

const TABS = [
  { id: 'weapons', label: 'WEAPONS', href: '/database/weapons' },
  { id: 'vehicles', label: 'VEHICLES', href: '/database/vehicles' },
  { id: 'characters', label: 'CHARACTERS', href: '/database/characters' },
  { id: 'mechanics', label: 'MECHANICS', href: '/database/mechanics' },
  { id: 'radio', label: 'RADIO', href: '/database/radio' },
]

// O menu da base de dados era uma faixa colada ao topo: ocupava 44px em
// todas as páginas e ficava lá, quer se estivesse a usá-lo quer não.
// Passa a ter o material e o comportamento da barra de baixo — pílula
// branca, sombra em cinco camadas, linhas de velocidade — flutuante ao
// lado da lupa, no topo à direita, e sai de vista ao descer a página.
// A lupa vem para dentro dele: nas páginas da base é este o menu, e um
// botão de pesquisa solto ao lado seria a mesma peça duas vezes.
export default function DbTabs({ active, counters }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY.current
        // A mesma margem de 6px da barra de baixo, pela mesma razão: sem
        // ela, o menu piscava com o tremor do dedo.
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 80)
          lastY.current = y
        }
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div
        className="fixed top-0 right-0 z-[80] p-3 pointer-events-none flex justify-end max-w-full"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <nav
          aria-label="Database sections"
          className={cx(
            'pointer-events-auto relative flex items-center rounded-[26px] bg-ink px-3 py-1.5',
            'max-w-[calc(100vw-1.5rem)]',
            'transition-[transform,opacity] duration-300 ease-out',
            hidden ? '-translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'
          )}
          style={{
            // As mesmas cinco camadas da barra de baixo: aresta de luz,
            // contorno, contacto, elevação e a sombra tingida.
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.9)',
              '0 0 0 1px rgba(11,15,22,0.07)',
              '0 2px 6px -1px rgba(11,15,22,0.10)',
              '0 16px 44px -14px rgba(11,15,22,0.30)',
              '0 10px 30px -14px rgba(194,24,91,0.40)',
            ].join(', '),
          }}
        >
          {/* O filete das três cores do arquivo, encostado à curva. */}
          <span
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent opacity-60"
            aria-hidden="true"
          />

          {/* Num telemóvel, cinco separadores mais a lupa não cabem na
              largura do ecrã. Desliza só esta fila: a lupa fica presa à
              direita, sempre à vista. Uma pílula inteira a deslizar punha
              fora de alcance justamente o botão que mais se usa. */}
          <span className="flex items-center gap-1 min-w-0 overflow-x-auto">
          {TABS.map((t) => {
            const isActive = t.id === active
            return (
              <Link
                key={t.id}
                href={t.href}
                aria-current={isActive ? 'page' : undefined}
                className={cx(
                  'relative z-[1] rounded-[18px] font-cond font-semibold uppercase tracking-[0.12em] text-[12px] px-3 h-9 flex items-center whitespace-nowrap',
                  'transition-colors duration-200 active:scale-[0.94] motion-reduce:active:scale-100',
                  isActive ? 'text-paper bg-black/[0.05]' : 'text-dim hover:text-paper hover:bg-black/[0.03]'
                )}
              >
                {t.label}
                {isActive && <span className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-mint via-pink to-violet" aria-hidden="true" />}
              </Link>
            )
          })}

          </span>

          {counters && (
            <span className="hidden xl:flex items-stretch shrink-0 border-l hairline ml-1 pl-1">
              {counters.map(([n, label]) => (
                <span key={label} className="px-2.5 flex flex-col justify-center leading-none">
                  <span className="font-cond font-bold text-[15px] text-paper tabular-nums text-center">{n}</span>
                  <span className="font-cond text-[8px] text-dim uppercase tracking-[0.16em] mt-0.5 text-center">{label}</span>
                </span>
              ))}
            </span>
          )}

          <span className="w-px self-stretch my-1.5 bg-[rgba(11,15,22,0.12)] mx-1 shrink-0" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Search the archive"
            aria-keyshortcuts="/"
            className="group relative z-[1] shrink-0 w-9 h-9 rounded-[18px] flex items-center justify-center text-dim hover:text-mint hover:bg-mint/[0.06] transition-colors active:scale-[0.94] motion-reduce:active:scale-100"
          >
            <Search size={17} strokeWidth={2} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export function WeaponGlyph({ type, size = 18, className }) {
  const paths = {
    handgun: 'M2,10 h16 l2,2 v3 h-8 l-1.6,6 h-5 l1.8,-6 h-5.2 z M18,10 v-2 h-4 v2',
    shotgun: 'M1,11 h21 v2.4 h-9 l-2.4,5 h-4 l2.4,-5 h-8 z M22,11 l1.5,-3',
    smg: 'M3,9 h15 v3.6 h-4.4 v6 h-4 v-6 h-6.6 z M18,9 v-2.4 h-4 v2.4 M3,10.6 h-2.4',
    rifle: 'M0.5,11 h23 v2.2 h-7.6 l-1.4,5.4 h-3.4 l1.4,-5.4 h-9 z M23.5,11 l0,-2.6 h-3.6',
    heavy: 'M2,9 h18 v5 h-5 v5 h-5 v-5 h-8 z M20,10 h3 v3 h-3',
    explosives: 'M12,8 a6.4,6.4 0 1,0 0.01,0 z M12,8 l2.2,-3.6 h3 M17,3 a1.6,1.6 0 1,0 0.01,0',
    custom: 'M3,4 h18 v16 h-18 z M6,8 h12 M6,12 h12 M6,16 h12',
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d={paths[type] || paths.handgun} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}
