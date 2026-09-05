'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const SEEN_KEY = 'lusorae-intro-omega-v1'

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
    <div className={`lusorae-boot ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-label="Opening Lusorae">
      <div className="boot-aurora" aria-hidden="true" />
      <div className="boot-sun" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-copy">
        <div className="boot-monogram">L</div>
        <p>Welcome to</p>
        <h1>LUSORAE</h1>
        <span>The GTA VI knowledge universe</span>
        <div className="boot-loader"><i /></div>
        <small>VICE CITY · LEONIDA · ARCHIVE ONLINE</small>
      </div>
      <button type="button" onClick={close}>Skip intro</button>
    </div>
  )
}
