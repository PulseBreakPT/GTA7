'use client'

import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import SearchModal from './search'
import { cx } from './ui'

// A barra superior saiu. O que ela tinha de indispensável era uma coisa
// só — a pesquisa — e essa passa a viver num botão flutuante no canto,
// com o mesmo material e a mesma lógica da barra de navegação de baixo:
// fundo branco opaco, sombra em três camadas, encolhe ao descer a página
// e responde ao toque. Deixa de haver uma faixa a ocupar 56px de altura
// em todas as páginas para mostrar um campo que quase nunca se usa.
export default function SearchFab() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
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
        // A mesma margem de 6px da barra de baixo, pela mesma razão:
        // sem ela, o botão oscilava com o tremor do dedo.
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
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase()
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true) }
      else if (e.key === '/' && !typing) { e.preventDefault(); setOpen(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div
        className="fixed top-0 right-0 z-[80] p-3 pointer-events-none"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search the archive"
          aria-keyshortcuts="/"
          className={cx(
            'group pointer-events-auto relative flex items-center justify-center rounded-full bg-ink',
            // As mesmas três camadas de sombra da barra de baixo: linha
            // de contacto, sombra curta que levanta e sombra longa que
            // faz flutuar.
            'shadow-[0_0_0_1px_rgba(11,15,22,0.07),0_2px_6px_-1px_rgba(11,15,22,0.10),0_16px_44px_-14px_rgba(11,15,22,0.34)]',
            'transition-all duration-300 ease-out overflow-hidden',
            'hover:bg-mint/[0.06] active:scale-[0.94] motion-reduce:active:scale-100',
            compact ? 'w-11 h-11' : 'w-[52px] h-[52px]'
          )}
        >
          {/* O filete das cores do arquivo, como nas outras peças fixas. */}
          <span
            className="pointer-events-none absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent opacity-70"
            aria-hidden="true"
          />
          <Search
            size={compact ? 18 : 19}
            strokeWidth={2}
            className="text-paper group-hover:text-mint transition-colors duration-200"
            aria-hidden="true"
          />
        </button>
      </div>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
