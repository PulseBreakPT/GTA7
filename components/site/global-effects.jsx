'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const REVEAL_SELECTOR = [
  '#main > * > section',
  '#main > * > article',
  '#main .wiki-category-header',
  '#main .wiki-entry-grid > *',
  '#main .focus-grid > *',
].join(',')

export default function GlobalEffects() {
  const pathname = usePathname() || '/'

  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0

    const writePointer = (event) => {
      if (!precisePointer.matches || reduced.matches) return
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        root.style.setProperty('--fx-x', `${event.clientX}px`)
        root.style.setProperty('--fx-y', `${event.clientY}px`)
      })
    }

    const writeScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0
        root.style.setProperty('--fx-scroll', String(progress))
      })
    }

    root.classList.add('fx-enabled')
    if (reduced.matches) root.classList.add('fx-reduced')
    window.addEventListener('pointermove', writePointer, { passive: true })
    window.addEventListener('scroll', writeScroll, { passive: true })
    writeScroll()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', writePointer)
      window.removeEventListener('scroll', writeScroll)
      root.classList.remove('fx-enabled', 'fx-reduced')
      root.style.removeProperty('--fx-x')
      root.style.removeProperty('--fx-y')
      root.style.removeProperty('--fx-scroll')
    }
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = [...new Set(document.querySelectorAll(REVEAL_SELECTOR))]
      .filter((node) => !node.closest('.global-effects') && !node.hasAttribute('data-no-cascade'))

    nodes.forEach((node, index) => {
      node.classList.add('fx-cascade')
      node.style.setProperty('--fx-order', String(index % 8))
      if (reduced) node.classList.add('is-visible')
    })

    if (reduced || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return () => nodes.forEach((node) => {
        node.classList.remove('fx-cascade', 'is-visible')
        node.style.removeProperty('--fx-order')
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        entry.target.addEventListener('animationend', () => {
          entry.target.classList.remove('fx-cascade', 'is-visible')
          entry.target.style.removeProperty('--fx-order')
        }, { once: true })
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -3% 0px', threshold: 0 })

    nodes.forEach((node) => observer.observe(node))
    // Nunca deixe conteúdo inacessível se um browser atrasar ou interromper o
    // IntersectionObserver. A animação é decoração; a página é prioritária.
    const revealFallback = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add('is-visible'))
    }, 1200)

    return () => {
      window.clearTimeout(revealFallback)
      observer.disconnect()
      nodes.forEach((node) => {
        node.classList.remove('fx-cascade', 'is-visible')
        node.style.removeProperty('--fx-order')
      })
    }
  }, [pathname])

  return (
    <div className="global-effects" aria-hidden="true">
      <span className="fx-aurora-field" />
      <span className="fx-scan-beam" />
      <span className="fx-edge fx-edge-left" />
      <span className="fx-edge fx-edge-right" />
      <span className="fx-scroll-progress" />
      <span key={pathname} className="fx-route-pulse" />
    </div>
  )
}
