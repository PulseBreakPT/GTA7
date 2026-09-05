'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SEEN_KEY = 'gta-lore-wiki-intro-omega-v1'

export default function BootSequence() {
  const pathname = usePathname()
  const [phase, setPhase] = useState('hidden')

  useEffect(() => {
    if (pathname !== '/' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem(SEEN_KEY)) return

    sessionStorage.setItem(SEEN_KEY, '1')
    setPhase('active')
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const leave = window.setTimeout(() => setPhase('leaving'), 1750)
    const hide = window.setTimeout(() => setPhase('hidden'), 2350)

    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(hide)
      document.body.style.overflow = previous
    }
  }, [pathname])

  useEffect(() => {
    if (phase === 'hidden') document.body.style.overflow = ''
  }, [phase])

  const close = () => setPhase('leaving')
  if (phase === 'hidden') return null

  return (
    <div className={`gta-lore-wiki-boot ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-label="Opening GTA Lore Wiki">
      <div className="boot-aurora" aria-hidden="true" />
      <div className="boot-sun" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-copy">
        <div className="boot-monogram">GLW</div>
        <p>Welcome to</p>
        {/* Não é `h1`: a página por baixo já tem o seu, e dois títulos
            de primeiro nível na mesma página confundem quem navega por
            estrutura. Isto é uma cortina de abertura, não o título. */}
        <p className="boot-title">GTA LORE WIKI</p>
        <span>The GTA VI knowledge universe</span>
        <div className="boot-loader"><i /></div>
        <small>VICE CITY · LEONIDA · ARCHIVE ONLINE</small>
      </div>
      <button type="button" onClick={close}>Skip intro</button>
    </div>
  )
}
