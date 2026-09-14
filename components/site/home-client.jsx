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

// Day one of the public countdown isn't the day this archive picked — it's
// the day Rockstar confirmed the next game was in development, the first
// entry in lib/content.js's own sourced releaseHistory. Percentage-to-launch
// is measured from there, not from an arbitrary round date, so the number
// means something a reader could check.
const DEVELOPMENT_CONFIRMED = Date.parse('2022-02-01T00:00:00Z')

export function LaunchBar({ releaseDate }) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const target = Date.parse(releaseDate)
  if (now == null || Number.isNaN(target)) return null
  const remaining = Math.max(0, target - now)
  if (!remaining) return null

  const elapsed = now - DEVELOPMENT_CONFIRMED
  const total = target - DEVELOPMENT_CONFIRMED
  const percent = Math.min(99.9, Math.max(0, (elapsed / total) * 100))

  const pad = (n) => String(n).padStart(2, '0')
  const days = Math.floor(remaining / 86400000)
  const units = [
    ['Days', days],
    ['Hrs', pad(Math.floor(remaining / 3600000) % 24)],
    ['Min', pad(Math.floor(remaining / 60000) % 60)],
    ['Sec', pad(Math.floor(remaining / 1000) % 60)],
  ]

  return (
    <div className="hq-launch-bar" role="group" aria-label={`${days} days until release, scheduled ${releaseDate}`}>
      <div className="hq-launch-clock">
        <span className="hq-launch-label">Countdown to {releaseDate}</span>
        <div className="hq-launch-digits">
          {units.map(([label, value]) => (
            <span key={label}><b>{value}</b><small>{label}</small></span>
          ))}
        </div>
      </div>
      <div className="hq-launch-progress">
        <span className="hq-launch-label">Development to launch<em>{percent.toFixed(1)}%</em></span>
        <i><b style={{ width: `${percent}%` }} /></i>
        <small>Since Rockstar confirmed development · February 2022</small>
      </div>
    </div>
  )
}
