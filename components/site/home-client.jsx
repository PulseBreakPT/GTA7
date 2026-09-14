'use client'

import { useEffect, useState } from 'react'
import { Hourglass } from 'lucide-react'

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
const DEVELOPMENT_CONFIRMED = Date.parse('2022-02-04T00:00:00Z')

export function LaunchBar({ releaseDate }) {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(Date.now())
    tick()
    const timer = window.setInterval(tick, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const target = Date.parse(releaseDate)
  if (Number.isNaN(target)) return null

  // The card is rendered on the server with the figures blank; only the
  // numbers arrive after mount, so the hero doesn't jump when the clock starts.
  const live = now != null
  const remaining = live ? Math.max(0, target - now) : 0
  const elapsed = live ? ((now - DEVELOPMENT_CONFIRMED) / (target - DEVELOPMENT_CONFIRMED)) * 100 : 0
  // Never round up to 100% while there is still time on the clock.
  const percent = !live ? 0 : remaining ? Math.min(99.9, Math.max(0, elapsed)) : 100
  const days = Math.floor(remaining / 86400000)
  const pad = (n) => String(n).padStart(2, '0')
  const units = [
    ['d', live ? days : '--', days === 1 ? 'day' : 'days'],
    ['h', live ? pad(Math.floor(remaining / 3600000) % 24) : '--', 'hours'],
    ['m', live ? pad(Math.floor(remaining / 60000) % 60) : '--', 'min'],
    ['s', live ? pad(Math.floor(remaining / 1000) % 60) : '--', 'sec'],
  ]

  return (
    <div className="hq-launch" role="group" aria-label="Launch countdown">
      <div className="hq-launch-head">
        <Hourglass size={20} strokeWidth={1.8} aria-hidden="true" />
        <span><strong>Launch countdown</strong><small>Scheduled for <span className="hq-launch-date">{releaseDate}</span></small></span>
      </div>
      <div className="hq-launch-clock" role="timer" aria-label={live ? `${days} days until the scheduled release` : 'Time until the scheduled release'}>
        {units.map(([key, value, label]) => (
          <span key={key}><b>{value}</b><small>{label}</small></span>
        ))}
      </div>
      <div className="hq-launch-progress" title="Share of the time between Rockstar confirming development (February 2022) and the scheduled launch that has already passed.">
        <div className="hq-launch-meta">
          <span>Since Rockstar confirmed development, Feb 2022</span>
          <strong>{live ? `${percent.toFixed(1)}%` : '—'}</strong>
        </div>
        <div
          className="hq-launch-track"
          role="progressbar"
          aria-label="Time passed from the development announcement to the scheduled launch"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={live ? Number(percent.toFixed(1)) : undefined}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  )
}
