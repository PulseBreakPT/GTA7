'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight, BookOpen, Car, Clock3, Cog, Command, CornerDownLeft, Crosshair,
  Egg, Map as MapIcon, MapPin, Newspaper, Radio, Scale, Search, Shield, Sparkles, Users, X, Globe2,
} from 'lucide-react'
import { SEARCH_INDEX, SEARCH_TYPES, searchArchive } from '@/lib/search-index'
import { GhostBadge, cx } from './ui'

const TYPE_ICONS = {
  articles: Newspaper, characters: Users, vehicles: Car, weapons: Crosshair,
  mechanics: Cog, locations: MapPin, regions: MapIcon, secrets: Egg, guides: BookOpen,
  radio: Radio, factions: Shield, legal: Scale, world: Globe2,
}

const QUICK_LINKS = [
  ['Characters', '/database/characters', Users, 'People across Leonida'],
  ['Vehicles', '/database/vehicles', Car, 'Cars, boats and aircraft'],
  ['Places', '/map', MapPin, 'Regions and named locations'],
  ['World', '/database/world', Globe2, 'Wildlife, organizations and businesses'],
  ['Articles', '/news', Newspaper, 'Reports and analysis'],
]

const POPULAR = ['Lucia Caminos', 'Jason Duval', 'Vice City', 'Leonida Keys', 'Vehicles', 'Weapons']

export default function SearchModal({ open, onClose, initialQuery = '' }) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [type, setType] = useState('all')
  const [cursor, setCursor] = useState(0)
  const [recent, setRecent] = useState([])
  const [popularity, setPopularity] = useState({})
  const [online, setOnline] = useState(true)
  const inputRef = useRef(null)
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)
  const allResults = useMemo(() => searchArchive(q, type).sort((a, b) => {
    const scoreA = a.score + Math.min((popularity[a.href] || 0) * 4, 40)
    const scoreB = b.score + Math.min((popularity[b.href] || 0) * 4, 40)
    return scoreB - scoreA
  }), [q, type, popularity])
  const results = allResults.slice(0, 10)
  const counts = useMemo(() => {
    if (!q.trim()) return new Map()
    return new Map(SEARCH_TYPES.map((item) => [item.id, searchArchive(q, item.id).length]))
  }, [q])

  useEffect(() => {
    if (!open) return
    previousFocusRef.current = document.activeElement
    setQ(initialQuery); setType('all'); setCursor(0)
    // Recent queries intentionally live only in React memory. Persisting this
    // convenience in localStorage would require a separate, prior storage
    // choice under EU terminal-equipment rules; the archive does not need it.
    // O ranking de pesquisa passa a viver só em memória, nesta sessão.
    //
    // Era gravado em `gta-lore:search-popularity`: um contador por destino que
    // ficava no dispositivo indefinidamente, não era divulgado em lado nenhum
    // — nem na própria política que se dizia inventário completo — e não tinha
    // caminho de consentimento. Não é necessário a nada que o leitor peça, por
    // isso a correcção honesta é deixar de o guardar, não descrevê-lo melhor.
    setPopularity({})
    setOnline(navigator.onLine)
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40)
    const previousOverflow = document.body.style.overflow
    const onConnection = () => setOnline(navigator.onLine)
    const trapFocus = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab' || !modalRef.current) return
      const focusable = [...modalRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', trapFocus)
    window.addEventListener('online', onConnection)
    window.addEventListener('offline', onConnection)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', trapFocus)
      window.removeEventListener('online', onConnection)
      window.removeEventListener('offline', onConnection)
      previousFocusRef.current?.focus?.()
    }
  }, [open, initialQuery])

  useEffect(() => { setCursor(0) }, [q, type])

  if (!open) return null

  const remember = (query) => {
    const value = String(query || '').trim()
    if (!value) return
    const next = [value, ...recent.filter((item) => item.toLowerCase() !== value.toLowerCase())].slice(0, 6)
    setRecent(next)
  }

  const go = (href) => {
    remember(q)
    const nextPopularity = { ...popularity, [href]: (popularity[href] || 0) + 1 }
    setPopularity(nextPopularity)
    // Sem escrita no dispositivo: o ranking serve esta sessão e morre com ela.
    onClose(); router.push(href)
  }
  const useQuery = (value) => { setQ(value); setType('all'); inputRef.current?.focus() }
  const clearRecent = () => {
    setRecent([])
    // Clear the key left by releases before 2026-09-13. It is never read or
    // written by the current search experience.
    try { localStorage.removeItem('gta-lore:recent-searches') } catch { /* storage can be unavailable */ }
    inputRef.current?.focus()
  }

  const onKey = (event) => {
    if (event.key === 'ArrowDown' && results.length) { event.preventDefault(); setCursor((value) => Math.min(value + 1, results.length - 1)) }
    else if (event.key === 'ArrowUp' && results.length) { event.preventDefault(); setCursor((value) => Math.max(value - 1, 0)) }
    else if (event.key === 'Enter' && results[cursor]) go(results[cursor].href)
  }

  return (
    <div className="gta-lore-search-layer fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title">
      <div className="absolute inset-0" onClick={onClose} />
      <div ref={modalRef} className="gta-lore-search-modal absolute left-1/2 top-12 sm:top-20 -translate-x-1/2 w-[calc(100vw-1.5rem)] max-w-[920px] overflow-hidden" onKeyDown={onKey}>
        <div className="search-command-head">
          <span id="search-dialog-title"><Sparkles size={12} />GTA LORE FINDER</span>
          <small>{SEARCH_INDEX.length} indexed records · instant local search</small>
          <button type="button" onClick={onClose} aria-label="Close search"><X size={16} /></button>
        </div>

        <div className="search-command-input">
          <span className="search-command-icon"><Search size={20} aria-hidden="true" /></span>
          <input ref={inputRef} value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search people, places, vehicles, articles…" aria-label="Search the archive" autoComplete="off" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear search"><X size={14} /></button>}
          <kbd>ESC</kbd>
        </div>

        <nav className="search-type-tabs" aria-label="Search scope">
          <button type="button" onClick={() => setType('all')} aria-pressed={type === 'all'} className={cx(type === 'all' && 'is-active')}><Search size={11} />All <b>{q.trim() ? searchArchive(q).length : SEARCH_INDEX.length}</b></button>
          {SEARCH_TYPES.map((item) => {
            const Icon = TYPE_ICONS[item.id] || BookOpen
            return <button key={item.id} type="button" onClick={() => setType(item.id)} aria-pressed={type === item.id} className={cx(type === item.id && 'is-active', q.trim() && !counts.get(item.id) && 'is-empty')}><Icon size={11} />{item.label}<b>{q.trim() ? counts.get(item.id) || 0 : SEARCH_INDEX.filter((entry) => entry.type === item.id).length}</b></button>
          })}
        </nav>

        <div className="search-command-grid">
          <div className="search-results-pane">
            {!q.trim() && <div className="search-discovery">
              <div className="search-section-title"><span>Explore the archive</span><small>Quick destinations</small></div>
              <div className="search-quick-grid">{QUICK_LINKS.map(([label, href, Icon, description]) => <button key={href} type="button" onClick={() => go(href)}><span><Icon size={16} /></span><strong>{label}</strong><small>{description}</small><ArrowRight size={12} /></button>)}</div>
              <div className="search-section-title search-popular-title"><span>Popular searches</span><small>Start with a subject</small></div>
              <div className="search-popular">{POPULAR.map((item) => <button key={item} type="button" onClick={() => useQuery(item)}>{item}</button>)}</div>
              {recent.length > 0 && (
                <section className="search-mobile-recents" aria-label="Recent searches">
                  <div className="search-section-title"><span>Recent searches</span><button type="button" className="search-clear-recent" onClick={clearRecent} aria-label="Clear recent searches">Clear</button></div>
                  <div className="search-popular">{recent.map((item) => <button key={item} type="button" onClick={() => useQuery(item)}>{item}</button>)}</div>
                </section>
              )}
            </div>}

            {q.trim() && results.length === 0 && <div className="search-empty-state"><Search size={24} /><strong>No records found</strong><p>Nothing matches “{q}” in {type === 'all' ? 'the archive' : SEARCH_TYPES.find((item) => item.id === type)?.label}. Try fewer words or jump to a known subject.</p>{type !== 'all' && <button type="button" onClick={() => setType('all')}>Search every category</button>}<div className="search-empty-suggestions" aria-label="Suggested searches">{POPULAR.slice(0, 3).map((item) => <button key={item} type="button" onClick={() => useQuery(item)}>{item}</button>)}</div></div>}

            {q.trim() && results.length > 0 && <div className="search-result-list" role="listbox" aria-label="Search results">{results.map((result, index) => {
              const Icon = TYPE_ICONS[result.type] || Newspaper
              const excerpt = String(result.excerpt || '').replace(/\s+/g, ' ').trim().slice(0, 145)
              return <button key={`${result.href}-${index}`} type="button" role="option" aria-selected={index === cursor} onClick={() => go(result.href)} onMouseEnter={() => setCursor(index)} className={cx(index === cursor && 'is-selected')}>
                <span className="search-result-icon"><Icon size={15} /></span>
                <span className="search-result-copy"><strong>{result.title}</strong><small>{result.typeLabel}{excerpt ? ` · ${excerpt}${excerpt.length === 145 ? '…' : ''}` : ''}</small></span>
                <GhostBadge status={result.status} />
                {index === cursor ? <CornerDownLeft size={14} className="search-result-enter" /> : <ArrowRight size={13} className="search-result-arrow" />}
              </button>
            })}</div>}

            {q.trim() && <button type="button" onClick={() => go(`/wiki/search?q=${encodeURIComponent(q.trim())}${type !== 'all' ? `&type=${encodeURIComponent(type)}` : ''}`)} className="search-all-results"><Search size={13} />Open full search page<span>{allResults.length} results</span><ArrowRight size={13} /></button>}
          </div>

          <aside className="search-command-aside">
            <section>
              <div className="search-aside-title">
                <Clock3 size={12} />
                <span>Recent searches</span>
                {recent.length > 0 && <button type="button" className="search-clear-recent" onClick={clearRecent} aria-label="Clear recent searches">Clear</button>}
              </div>
              {recent.length ? <ul>{recent.map((item) => <li key={item}><button type="button" onClick={() => useQuery(item)}><Clock3 size={10} />{item}</button></li>)}</ul> : <p>Your latest searches stay on this device.</p>}
            </section>
            <section><div className="search-aside-title"><Command size={12} /><span>Keyboard</span></div><dl><div><dt>Move</dt><dd><kbd>↑</kbd><kbd>↓</kbd></dd></div><div><dt>Open</dt><dd><kbd>↵</kbd></dd></div><div><dt>Close</dt><dd><kbd>ESC</kbd></dd></div></dl></section>
            <section className="search-index-health" role="status"><span className={cx('search-live-dot', !online && 'is-offline')} /><div><strong>{online ? 'Index online' : 'Offline search ready'}</strong><small>{SEARCH_TYPES.length} local searchable branches</small></div></section>
          </aside>
        </div>
      </div>
    </div>
  )
}
