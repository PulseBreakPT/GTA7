'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SEEN_KEY = 'gta-lore-intro-cinema-v3'

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
    const leave = window.setTimeout(() => setPhase('leaving'), 2800)
    const hide = window.setTimeout(() => setPhase('hidden'), 3400)

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
    <div className={`gta-lore-boot ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-label="Opening GTA Lore">
      <div className="boot-visual" aria-hidden="true" />
      <div className="boot-shutters" aria-hidden="true"><i /><i /></div>
      <div className="boot-letterbox" aria-hidden="true"><i /><i /></div>
      <div className="boot-frame" aria-hidden="true" />

      <div className="boot-interface">
        <header className="boot-meta">
          <span><b>GL</b> / DIGITAL ARCHIVE</span>
          <span>LEONIDA · 2026</span>
        </header>

        <div className="boot-copy">
          <p className="boot-kicker"><i /> Independent intelligence file <b>001</b></p>
          {/* Não é `h1`: a página por baixo já tem o seu. Esta composição
              é uma cortina de cinema, não a estrutura editorial da página. */}
          <p className="boot-title" aria-label="GTA Lore">
            <span><b>GTA</b></span>
            <span><b>LORE</b></span>
          </p>
          <div className="boot-deck">
            <span>The Grand Theft Auto VI encyclopedia</span>
            <small>Every fact traced to its source.</small>
          </div>
        </div>

        <footer className="boot-status">
          <div className="boot-timeline"><i /><span /></div>
          <span>VICE CITY / LEONIDA</span>
          <span>ARCHIVE ONLINE</span>
          <b>NOV 19 / 2026</b>
        </footer>
      </div>

      <div className="boot-index" aria-hidden="true"><span>01</span><i /><small>GTA VI</small></div>
      <button type="button" onClick={close}>Skip <span>intro</span></button>
    </div>
  )
}
