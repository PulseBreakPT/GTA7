'use client'

import { useEffect, useState } from 'react'

export const OPEN_SEARCH_EVENT = 'gta-lore:open-search'

export function openGlobalSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT))
}

export function SearchTrigger({ children, ...props }) {
  return <button type="button" onClick={openGlobalSearch} {...props}>{children}</button>
}

// `variant="compact"` keeps the original one-line caption (used on the
// homepage, over key art). `variant="full"` renders a four-unit digital
// clock for pages with room to spend on it (the Vice City hub, next to the
// live local-time clock it's editorially paired with). Both read the same
// prop, so a page can switch scale without switching data source.
export function ReleaseCountdown({ releaseDate, variant = 'compact', className }) {
  const [remaining, setRemaining] = useState(null)

  useEffect(() => {
    const target = Date.parse(releaseDate)
    if (Number.isNaN(target)) return undefined
    const tick = () => setRemaining(Math.max(0, target - Date.now()))
    tick()
    // A full clock needs a second hand; a "days to release" caption doesn't
    // change often enough to justify waking the tab every second for it.
    const timer = window.setInterval(tick, variant === 'full' ? 1000 : 60000)
    return () => window.clearInterval(timer)
  }, [releaseDate, variant])

  if (!remaining) return null
  const days = Math.floor(remaining / 86400000)

  if (variant !== 'full') {
    return <span className={className || 'font-cond uppercase tracking-[0.16em] text-[11px] text-mint'}>{days} day{days === 1 ? '' : 's'} to release · {releaseDate}</span>
  }

  const pad = (n) => String(n).padStart(2, '0')
  const units = [
    ['Days', days],
    ['Hrs', pad(Math.floor(remaining / 3600000) % 24)],
    ['Min', pad(Math.floor(remaining / 60000) % 60)],
    ['Sec', pad(Math.floor(remaining / 1000) % 60)],
  ]
  return (
    <div
      className={className}
      role="timer"
      aria-label={`${days} days until release, scheduled ${releaseDate}`}
    >
      {units.map(([label, value]) => (
        <span className="vice-countdown-unit" key={label}>
          <b>{value}</b>
          <small>{label}</small>
        </span>
      ))}
    </div>
  )
}
