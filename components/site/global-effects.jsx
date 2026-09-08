'use client'

import { useEffect, useRef } from 'react'

export default function GlobalEffects() {
  const progressRef = useRef(null)

  useEffect(() => {
    const suppressBrowserTimingCloneError = (event) => {
      if (event.error instanceof DOMException && event.error.name === 'DataCloneError' && event.message?.includes('PerformanceServerTiming')) {
        event.stopImmediatePropagation()
        event.preventDefault()
      }
    }
    const preventGesture = (event) => event.preventDefault()
    const preventWheelZoom = (event) => {
      if (event.ctrlKey || event.metaKey) event.preventDefault()
    }
    const preventKeyboardZoom = (event) => {
      if (!(event.ctrlKey || event.metaKey)) return
      if (['+', '=', '-', '_', '0'].includes(event.key)) event.preventDefault()
    }

    document.addEventListener('gesturestart', preventGesture, { passive: false })
    document.addEventListener('gesturechange', preventGesture, { passive: false })
    window.addEventListener('wheel', preventWheelZoom, { passive: false })
    window.addEventListener('keydown', preventKeyboardZoom)
    window.addEventListener('error', suppressBrowserTimingCloneError, true)

    return () => {
      document.removeEventListener('gesturestart', preventGesture)
      document.removeEventListener('gesturechange', preventGesture)
      window.removeEventListener('wheel', preventWheelZoom)
      window.removeEventListener('keydown', preventKeyboardZoom)
      window.removeEventListener('error', suppressBrowserTimingCloneError, true)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const writeScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
        frame = 0
      })
    }

    root.classList.add('fx-enabled')
    if (reduced.matches) root.classList.add('fx-reduced')
    window.addEventListener('scroll', writeScroll, { passive: true })
    writeScroll()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', writeScroll)
      root.classList.remove('fx-enabled', 'fx-reduced')
    }
  }, [])

  return (
    <div className="global-effects" aria-hidden="true">
      <span ref={progressRef} className="fx-scroll-progress" />
    </div>
  )
}
