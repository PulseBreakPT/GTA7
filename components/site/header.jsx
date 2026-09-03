'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import SearchModal from './search'
import { cx } from './ui'

// O cabeçalho fecha o mesmo sistema da barra de navegação e do rodapé:
// cada ramo do arquivo tem a sua cor, e o cabeçalho diz em que ramo se
// está usando essa cor. As três peças fixas do sítio — topo, fundo e
// rodapé — passam a falar a mesma língua, e a cor passa a ser informação
// em vez de enfeite.
const SECTIONS = [
  { test: (p) => p === '/', label: 'Archive index', tint: 'pink' },
  { test: (p) => p === '/map', label: 'Leonida map', tint: 'mint' },
  { test: (p) => p.startsWith('/news'), label: 'Article records', tint: 'warn' },
  { test: (p) => p.startsWith('/guides'), label: 'Reference guides', tint: 'warn' },
  { test: (p) => p.startsWith('/media'), label: 'Visual record', tint: 'pink' },
  { test: (p) => p.startsWith('/sources'), label: 'Provenance', tint: 'mint' },
  { test: (p) => p.startsWith('/map'), label: 'Leonida field guide', tint: 'mint' },
  {
    test: (p) => p.startsWith('/database') || p.startsWith('/wiki') || p.startsWith('/gangs-factions')
      || p.startsWith('/editions') || p.startsWith('/categories') || p.startsWith('/easter-eggs'),
    label: 'Archive record', tint: 'violet',
  },
]

const TINT = {
  pink: { text: 'text-pink', dot: 'bg-pink' },
  mint: { text: 'text-mint', dot: 'bg-mint' },
  violet: { text: 'text-violet', dot: 'bg-violet' },
  warn: { text: 'text-warn', dot: 'bg-warn' },
}

const sectionOf = (p) => SECTIONS.find((s) => s.test(p)) || { label: 'Archive', tint: 'violet' }

export default function Header() {
  const pathname = usePathname() || '/'
  const [searchOpen, setSearchOpen] = useState(false)
  // Transparente no topo, para deixar ver o que está atrás (a hero da
  // home, por exemplo) — mas sempre com blur, para o texto nunca ficar
  // ilegível em cima de imagem. Ganha fundo sólido assim que a página
  // desce, porque a partir daí já não há nada por trás a valer a pena ver.
  const [scrolled, setScrolled] = useState(false)

  const section = sectionOf(pathname)
  const tint = TINT[section.tint]

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
        'archive-header sticky top-0 z-[70] relative backdrop-blur-xl transition-colors duration-300 ease-out',
        scrolled
          ? 'bg-ink/92 border-b hairline shadow-[0_8px_30px_-22px_rgba(11,15,22,0.45)]'
          : 'bg-ink/35 border-b border-transparent shadow-none'
      )}
    >
      {/* Os mesmos dois filetes que assinam a barra de navegação e o
          rodapé, para as três peças fixas se lerem como uma família. */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-70" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-1/3 top-0 h-px bg-gradient-to-r from-mint via-transparent to-violet opacity-60" aria-hidden="true" />

      <div className="px-4 sm:px-6 lg:px-8 h-[56px] flex items-center gap-3 sm:gap-4">
        {/* O nome do arquivo vivia na coluna lateral. Com a navegação em
            baixo, esta é a única âncora fixa no topo — e o caminho de
            volta a casa, que é o que um logótipo faz em qualquer sítio. */}
        <Link
          href="/"
          aria-label="LEONIDA ARCHIVE — home"
          className="group shrink-0 min-w-0 flex items-center -ml-2 px-2 h-10 rounded-xl transition-colors hover:bg-black/[0.05] active:scale-[0.97] motion-reduce:active:scale-100"
        >
          <span className="chromatic-title font-cond font-bold text-[15px] sm:text-[16px] tracking-wide text-paper whitespace-nowrap leading-none">LEONIDA ARCHIVE</span>
        </Link>

        {/* Onde se está, na cor do ramo — o mesmo código de cores da
            barra de baixo. Substitui uma linha fixa que dizia o mesmo em
            todas as páginas e portanto não dizia nada. */}
        <span className="hidden md:flex items-center gap-2 shrink-0 min-w-0 pl-3 border-l border-line">
          <span className={cx('w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300', tint.dot)} aria-hidden="true" />
          <span className={cx('font-mono text-[10px] uppercase tracking-[0.2em] truncate transition-colors duration-300', tint.text)}>
            {section.label}
          </span>
        </span>

        <div className="flex-1 min-w-0" />

        {/* Cápsula larga: a pesquisa é a acção principal do cabeçalho e
            ocupa o espaço que isso merece. */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="group hidden md:flex items-center gap-2.5 w-[280px] xl:w-[360px] h-10 pl-4 pr-2 text-left rounded-full border border-line bg-ink/60 hover:border-mint/50 hover:bg-mint/[0.05] transition-colors duration-200"
          aria-label="Search the archive"
        >
          <Search size={15} className="text-dim group-hover:text-mint shrink-0 transition-colors duration-200" aria-hidden="true" />
          <span className="flex-1 text-[13px] text-dim truncate">Search the archive…</span>
          <kbd className="w-6 h-6 flex items-center justify-center border border-line rounded-full font-mono text-[10px] text-dim shrink-0 group-hover:border-mint/40 group-hover:text-mint transition-colors duration-200">/</kbd>
        </button>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="md:hidden w-11 h-11 flex items-center justify-center rounded-full text-paper hover:bg-mint/[0.07] hover:text-mint active:scale-[0.94] motion-reduce:active:scale-100 transition-colors"
          aria-label="Search the archive"
        >
          <Search size={19} />
        </button>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
