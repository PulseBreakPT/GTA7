'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
import { IMG } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { cx } from '@/components/site/ui'
import CollapsibleFilters from '@/components/site/collapsible-filters'

// A galeria não tem lista própria: lê o catálogo de imagens do arquivo e
// agrupa-o pela pasta em que cada ficheiro está. Assim nunca fica
// desalinhada do que existe — uma imagem nova aparece aqui sozinha, e uma
// que saia deixa de aparecer sem ninguém ter de a apagar em dois sítios.
const GROUPS = [
  { id: 'all', label: 'ALL' },
  { id: 'key-art', label: 'KEY ART' },
  { id: 'places', label: 'PLACES' },
  { id: 'scenes', label: 'SCENES' },
  { id: 'characters', label: 'CHARACTERS' },
  { id: 'vehicles', label: 'VEHICLES' },
  { id: 'gear', label: 'GEAR' },
  { id: 'editions', label: 'EDITIONS' },
]

// `creators` fica de fora: são retratos de pessoas reais associados aos
// dossiês de criadores, não material do jogo.
const EXCLUDED = new Set(['creators'])

// Snapshot of Rockstar's own downloadable media catalogue, checked on
// 2026-09-09. These totals describe the publisher's library, not the smaller
// local selection rendered below.
const ROCKSTAR_MEDIA_SNAPSHOT = [
  ['Videos', 3],
  ['Short clips', 9],
  ['Screenshots', 99],
  ['Artwork & wallpapers', 22],
  ['Ultimate Edition images', 51],
  ['Vintage Vice City images', 12],
]

const titleFrom = (src) =>
  src.split('/').pop().replace(/\.[a-z0-9]+$/i, '').replace(/-/g, ' ').replace(/^\w/, (ch) => ch.toUpperCase())

const ITEMS = Object.values(IMG)
  .filter((src, i, all) => all.indexOf(src) === i)
  .map((src) => ({ src, group: src.split('/')[2], title: titleFrom(src) }))
  .filter((item) => item.group && !EXCLUDED.has(item.group))

export default function MediaPage() {
  const [group, setGroup] = useState('all')
  const [query, setQuery] = useState('')
  const [zoom, setZoom] = useState(null)

  const counts = useMemo(() => {
    const map = { all: ITEMS.length }
    ITEMS.forEach((item) => { map[item.group] = (map[item.group] || 0) + 1 })
    return map
  }, [])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ITEMS.filter((item) => (group === 'all' || item.group === group) && (!q || item.title.toLowerCase().includes(q)))
  }, [group, query])

  const groups = GROUPS.filter((g) => counts[g.id])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Media' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Visual record"
          title="Media"
          description="Official artwork, Rockstar’s Visit Leonida postcards, gameplay captures and edition stills, as held by this archive. Captions come from the archive’s own file catalogue, not from Rockstar wording."
          count={ITEMS.length}
          countLabel="images"
          image="/media/key-art/jason-lucia-beach.webp"
          imageAlt="Official GTA VI artwork of Jason and Lucia on Vice Beach"
        >
          <CollapsibleFilters title="Media filters" count={shown.length} activeCount={Number(Boolean(query.trim())) + Number(group !== 'all')} summary={`${shown.length} of ${ITEMS.length} images`}>
            <label className="wiki-filter-search">
              <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search media…"
                aria-label="Search media"
                className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0"
              />
            </label>
            <div className="wiki-filter-group">
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGroup(g.id)}
                  aria-pressed={group === g.id}
                  className={cx(
                    'filter-chip inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[11px] transition-colors',
                    group === g.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/40'
                  )}
                >
                  {g.label}
                  <span className="font-mono text-[10px] tabular-nums opacity-70">{counts[g.id]}</span>
                </button>
              ))}
            </div>
          </CollapsibleFilters>
        </CategoryHeader>
      </div>

      <section className="wiki-official-media-record" aria-labelledby="official-media-heading">
        <header>
          <span><small>Publisher catalogue · checked 2026-09-09</small><h2 id="official-media-heading">Official Rockstar media record</h2></span>
          <a href="https://www.rockstargames.com/VI/media" target="_blank" rel="noreferrer">Open Rockstar media</a>
        </header>
        <dl>
          {ROCKSTAR_MEDIA_SNAPSHOT.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <p>Rockstar states that the August 2026 Extended Look was captured entirely from in-game footage on PlayStation 5. Counts above are a dated snapshot and are kept separate from the locally curated gallery.</p>
      </section>

      {shown.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-cond font-bold uppercase text-[22px] text-paper">No images match</p>
          <p className="text-dim text-xs mt-1">Try another group or clear the search.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {shown.map((item) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setZoom(item)}
              className="panel rounded-sm overflow-hidden text-left group hover:border-black/30 transition-colors"
            >
              <span className="relative block aspect-[16/10] bg-surface2">
                <Image src={item.src} alt={item.title} fill sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover group-hover:scale-[1.04] transition-transform duration-500" />
              </span>
              <span className="block p-2.5">
                <span className="block font-cond font-semibold uppercase tracking-[0.06em] text-[12px] text-paper truncate">{item.title}</span>
                <span className="block font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-0.5">{item.group.replace(/-/g, ' ')}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-[3px] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={zoom.title}>
          <button type="button" onClick={() => setZoom(null)} className="absolute inset-0" aria-label="Close image" />
          <div className="relative z-[1] max-w-[1100px] w-full">
            <div className="relative w-full aspect-[16/9] bg-ink border border-line">
              <Image src={zoom.src} alt={zoom.title} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-cond font-bold uppercase tracking-[0.06em] text-[16px] text-paper truncate">{zoom.title}</p>
                <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-dim mt-0.5">{zoom.group.replace(/-/g, ' ')}</p>
              </div>
              <button type="button" onClick={() => setZoom(null)} className="shrink-0 w-10 h-10 flex items-center justify-center border border-line text-paper hover:border-black/50 transition-colors" aria-label="Close image">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
