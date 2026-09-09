'use client'

import { useEffect, useId, useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cx } from '@/components/site/ui'

export default function CollapsibleFilters({
  title = 'Filters',
  summary,
  count,
  activeCount = 0,
  defaultOpen = true,
  mobileClosed = true,
  children,
  actions,
  className,
}) {
  const panelId = useId()
  const storageKey = `gta-lore:filters:${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const [open, setOpen] = useState(mobileClosed ? false : defaultOpen)

  useEffect(() => {
    if (!mobileClosed || typeof window === 'undefined') return
    const media = window.matchMedia('(max-width: 767px)')
    const sync = () => {
      let remembered = null
      try { remembered = sessionStorage.getItem(storageKey) } catch { /* private browsing can disable storage */ }
      setOpen(remembered == null ? (media.matches ? false : defaultOpen) : remembered === 'open')
    }
    sync()
    media.addEventListener?.('change', sync)
    return () => media.removeEventListener?.('change', sync)
  }, [defaultOpen, mobileClosed, storageKey])

  const toggle = () => setOpen((value) => {
    const next = !value
    try { sessionStorage.setItem(storageKey, next ? 'open' : 'closed') } catch { /* state still works in memory */ }
    return next
  })

  const fallbackSummary = [
    typeof count === 'number' ? `${count} shown` : null,
    activeCount ? `${activeCount} active` : 'No active filters',
  ].filter(Boolean).join(' · ')

  return (
    <section className={cx('wiki-filter-panel', open && 'is-open', className)} data-open={open ? 'true' : 'false'}>
      <button type="button" className="wiki-filter-panel-toggle" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
        <span className="wiki-filter-panel-icon"><SlidersHorizontal size={16} aria-hidden="true" /></span>
        <span className="wiki-filter-panel-copy">
          <strong>{title}</strong>
          <small>{summary || fallbackSummary}</small>
        </span>
        {activeCount > 0 && <span className="wiki-filter-panel-count">{activeCount}</span>}
        <ChevronDown size={16} className="wiki-filter-panel-chevron" aria-hidden="true" />
      </button>

      <div id={panelId} className="wiki-filter-panel-body" hidden={!open}>
        <div className="wiki-filter-panel-content">{children}</div>
        {actions && <div className="wiki-filter-panel-actions">{actions}</div>}
      </div>
    </section>
  )
}
