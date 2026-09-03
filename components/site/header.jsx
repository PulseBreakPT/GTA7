'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import SearchModal from './search'
import { cx } from './ui'

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  // Transparente no topo, para deixar ver o que está atrás (a hero da
  // home, por exemplo) — mas sempre com blur, para o texto nunca ficar
  // ilegível em cima de imagem. Ganha fundo sólido assim que a página
  // desce, porque a partir daí já não há nada por trás a valer a pena ver.
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || '').toLowerCase()
      const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setSearchOpen(true) }
      else if (e.key === '/' && !typing) { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cx(
        'archive-header sticky top-0 z-[70] relative backdrop-blur-xl transition-colors duration-300 ease-out before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-mint/70 before:to-transparent',
        scrolled
          ? 'bg-ink/92 border-b hairline shadow-[0_8px_30px_-22px_rgba(11,15,22,0.45)]'
          : 'bg-ink/35 border-b border-transparent shadow-none'
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8 h-[56px] flex items-center gap-3 sm:gap-4 lg:gap-6">
        {/* O nome do arquivo vivia na coluna lateral. Com a navegação a
            passar para a barra de baixo, a identidade tem de estar aqui:
            é o único sítio fixo que resta no topo, e uma página sem nome
            visível não se sabe de quem é. Serve também de caminho para
            casa, que é o que um logótipo faz em qualquer sítio. */}
        <Link href="/" className="shrink-0 min-w-0 flex items-center" aria-label="LEONIDA ARCHIVE — home">
          <span className="chromatic-title font-cond font-bold text-[15px] sm:text-[16px] tracking-wide text-paper whitespace-nowrap leading-none">LEONIDA ARCHIVE</span>
        </Link>

        <span className="hidden xl:block font-mono text-[9px] tracking-[0.28em] text-dim shrink-0">OFFICIAL EVIDENCE INDEX</span>

        <div className="flex-1 min-w-0" />

        {/* Cápsula larga, como numa wiki: a pesquisa é a acção principal
            do cabeçalho e ocupa o espaço que isso merece. */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-2.5 w-[280px] xl:w-[360px] h-10 pl-4 pr-2 text-left rounded-full border border-line bg-ink/60 backdrop-blur-sm hover:border-black/35 transition-colors"
          aria-label="Search the archive"
        >
          <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
          <span className="flex-1 text-[13px] text-dim truncate">Search the archive…</span>
          <kbd className="w-6 h-6 flex items-center justify-center border border-line rounded-full font-mono text-[10px] text-dim shrink-0">/</kbd>
        </button>

        <button type="button" onClick={() => setSearchOpen(true)} className="md:hidden w-11 h-11 flex items-center justify-center text-paper hover:text-mint transition-colors" aria-label="Search the archive">
          <Search size={19} />
        </button>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
