'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Newspaper, Users, Car, Crosshair, Cog, MapPin, Egg, BookOpen, CornerDownLeft } from 'lucide-react'
import { articles, characters, vehicles, weapons, mechanics, locations, easterEggs, guides } from '@/lib/content'
import { GhostBadge, cx } from './ui'

const TYPE_ICONS = { ARTICLE: Newspaper, CHARACTER: Users, VEHICLE: Car, WEAPON: Crosshair, MECHANIC: Cog, LOCATION: MapPin, 'EASTER EGG': Egg, GUIDE: BookOpen }

function buildIndex() {
  const idx = []
  articles.forEach((a) => idx.push({ type: 'ARTICLE', title: a.title, status: a.status, href: `/news/${a.slug}`, sub: a.excerpt }))
  characters.forEach((c) => idx.push({ type: 'CHARACTER', title: c.name, status: c.status, href: `/database/characters/${c.slug}`, sub: c.bio }))
  vehicles.forEach((v) => idx.push({ type: 'VEHICLE', title: v.name, status: v.status, href: `/database/vehicles/${v.slug}`, sub: v.cls.toUpperCase() }))
  weapons.forEach((w) => idx.push({ type: 'WEAPON', title: w.name, status: w.status, href: `/database/weapons/${w.slug}`, sub: w.desc }))
  mechanics.forEach((m) => idx.push({ type: 'MECHANIC', title: m.name, status: m.status, href: `/database/mechanics?m=${m.slug}`, sub: m.desc }))
  locations.forEach((l) => idx.push({ type: 'LOCATION', title: l.name, status: l.status, href: `/map?loc=${l.slug}`, sub: l.desc }))
  easterEggs.forEach((e) => idx.push({ type: 'EASTER EGG', title: e.name, status: e.status, href: `/easter-eggs/${e.slug}`, sub: e.summary }))
  guides.forEach((g) => idx.push({ type: 'GUIDE', title: g.title, status: g.status, href: `/guides/${g.slug}`, sub: g.summary }))
  return idx
}

export default function SearchModal({ open, onClose }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return []
    return index.filter((e) => e.title.toLowerCase().includes(s) || (e.sub || '').toLowerCase().includes(s)).slice(0, 12)
  }, [q, index])

  useEffect(() => {
    if (open) {
      setQ(''); setCursor(0)
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30)
    }
  }, [open])

  useEffect(() => { setCursor(0) }, [q])

  if (!open) return null

  const go = (href) => { onClose(); router.push(href) }

  const onKey = (e) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter' && results[cursor]) go(results[cursor].href)
  }

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Search the archive">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute left-1/2 top-16 sm:top-24 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-[640px] panel rounded-md overflow-hidden transition-all duration-200" onKeyDown={onKey}>
        <div className="flex items-center gap-3 px-4 h-14 border-b hairline">
          <Search size={18} className="text-dim shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the archive…"
            aria-label="Search the archive"
            className="flex-1 bg-transparent outline-none text-[15px] text-paper placeholder:text-dim min-w-0"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className="w-8 h-8 flex items-center justify-center text-dim hover:text-paper">
            <X size={16} />
          </button>
        </div>
        <div className="max-h-[52vh] overflow-y-auto">
          {q.trim() === '' && (
            <div className="px-4 py-8 text-center">
              <p className="font-cond uppercase tracking-[0.16em] text-dim text-sm">Type to search the archive</p>
              <p className="text-xs text-dim/70 mt-2">News · Characters · Vehicles · Weapons · Mechanics · Locations · Easter Eggs · Guides</p>
            </div>
          )}
          {q.trim() !== '' && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="font-cond uppercase tracking-[0.16em] text-paper text-sm">No records found</p>
              <p className="text-xs text-dim mt-2">Nothing in the archive matches “{q}”. Try a shorter term.</p>
            </div>
          )}
          {results.map((r, i) => {
            const Icon = TYPE_ICONS[r.type] || Newspaper
            return (
              <button
                key={r.href + i}
                type="button"
                onClick={() => go(r.href)}
                onMouseEnter={() => setCursor(i)}
                className={cx('w-full flex items-center gap-3 px-4 py-3 text-left border-b hairline last:border-b-0 transition-colors', i === cursor ? 'bg-surface2' : 'hover:bg-surface2/60')}
              >
                <span className="w-8 h-8 rounded-sm border border-line flex items-center justify-center text-dim shrink-0" aria-hidden="true"><Icon size={14} /></span>
                <span className="flex-1 min-w-0">
                  <span className="block font-cond font-semibold uppercase tracking-wide text-[15px] text-paper truncate">{r.title}</span>
                  <span className="block font-mono text-[10px] text-dim uppercase tracking-[0.14em] mt-0.5">{r.type}</span>
                </span>
                <GhostBadge status={r.status} />
                {i === cursor && <CornerDownLeft size={14} className="text-dim shrink-0" aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
