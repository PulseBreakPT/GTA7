'use client'

import { useEffect, useState } from 'react'

export const OPEN_SEARCH_EVENT = 'gta-lore:open-search'

export function openGlobalSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT))
}

export function SearchTrigger({ children, ...props }) {
  return <button type="button" onClick={openGlobalSearch} {...props}>{children}</button>
}

export function ReleaseCountdown({ releaseDate }) {
  const [days, setDays] = useState(null)

  useEffect(() => {
    const timestamp = Date.parse(releaseDate)
    if (!Number.isNaN(timestamp)) setDays(Math.ceil((timestamp - Date.now()) / 86400000))
  }, [releaseDate])

  if (days == null || days <= 0) return null
  return <span className="font-cond uppercase tracking-[0.16em] text-[11px] text-mint">{days} days to release · {releaseDate}</span>
}
