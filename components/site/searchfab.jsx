'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
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
  const pathname = usePathname() || '/'
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

  // Nas páginas da base de dados a lupa vive dentro do menu flutuante;
  // aqui fica só o atalho de teclado, que é global. Os efeitos acima
  // correm na mesma — é só o botão que não se desenha duas vezes.
  const hosted = pathname.startsWith('/database')

  return (
    <>
      {!hosted && (
      <div
        className="mobile-search-fab fixed top-0 right-0 z-[80] p-3 pointer-events-none"
        style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search the archive"
          aria-keyshortcuts="/"
          className={cx(
            'lusorae-search-fab group pointer-events-auto relative flex items-center justify-center rounded-[32%] bg-ink',
            // A mesma gramática de luz da barra de baixo: aresta no topo,
            // contorno, contacto, elevação e a sombra tingida — aqui em
            // turquesa, que é a cor da pesquisa em todo o sítio.
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(11,15,22,0.07),0_2px_6px_-1px_rgba(11,15,22,0.10),0_16px_44px_-14px_rgba(11,15,22,0.30),0_10px_30px_-14px_rgba(14,124,107,0.45)]',
            'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(14,124,107,0.35),0_2px_6px_-1px_rgba(11,15,22,0.10),0_16px_44px_-14px_rgba(11,15,22,0.30),0_12px_34px_-12px_rgba(14,124,107,0.6)]',
            'transition-all duration-300 ease-out overflow-hidden',
            'hover:bg-mint/[0.06] active:scale-[0.94] motion-reduce:active:scale-100',
            compact ? 'w-11 h-11' : 'w-[52px] h-[52px]'
          )}
        >
          {/* O filete das cores do arquivo, como nas outras peças fixas. */}
          {/* As mesmas linhas de velocidade da barra de baixo, aqui em
              três traços curtos por baixo do ícone. */}
          <span className="pointer-events-none absolute inset-x-0 bottom-[7px] flex flex-col items-center gap-[2px]" aria-hidden="true">
            <span className="block h-px w-4 rounded-full bg-mint/70" />
            <span className="block h-px w-2.5 rounded-full bg-mint/45" />
          </span>
          <Search
            size={compact ? 18 : 19}
            strokeWidth={2}
            className="text-paper group-hover:text-mint transition-colors duration-200 -mt-1"
            aria-hidden="true"
          />
        </button>
      </div>
      )}

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
