'use client'

import { useMemo } from 'react'
import { useSessionState } from '@/components/site/use-session-state'
import Link from 'next/link'
import { Radio, ChevronRight, Music2, Search, ShieldCheck, ExternalLink, VolumeX } from 'lucide-react'
import { GhostBadge, SourceChip, StatusBadge, cx } from '@/components/site/ui'
import { radioStations } from '@/lib/content'
import { gtaViMusic, musicEvidence } from '@/lib/music'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import CollapsibleFilters from '@/components/site/collapsible-filters'

const FILTERS = ['all', 'confirmed', 'rumour']
const MUSIC_FILTERS = ['all', 'rockstar-credit', 'published-media', 'community-rumour']

function App() {
  // Guardados na sessão: ao voltar de uma estação com Back, os filtros e a
  // pesquisa continuam como estavam.
  const [filter, setFilter] = useSessionState('radio:filter', 'all')
  const [selectedSlug, setSelectedSlug] = useSessionState('radio:selected', 'v-rock')
  const [musicFilter, setMusicFilter] = useSessionState('radio:music-filter', 'all')
  const [musicQuery, setMusicQuery] = useSessionState('radio:music-query', '')

  const list = useMemo(() => radioStations.filter((r) => filter === 'all' || r.status === filter), [filter])
  const selected = radioStations.find((r) => r.slug === selectedSlug) || list[0] || radioStations[0]
  const musicList = useMemo(() => {
    const query = musicQuery.trim().toLowerCase()
    return gtaViMusic.filter((item) => {
      const matchesFilter = musicFilter === 'all' || item.evidence === musicFilter
      const matchesQuery = !query || `${item.title} ${item.artist} ${item.appearance}`.toLowerCase().includes(query)
      return matchesFilter && matchesQuery
    })
  }, [musicFilter, musicQuery])

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 flex-1">
        <div className="min-w-0 flex flex-col">
          <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Radio' }]} />
          <div className="mt-4"><CategoryHeader kind="radio" eyebrow="Broadcast archive" title="Radio stations" description="Station names, music appearances and community reports organised by the exact strength of their published evidence." count={radioStations.length} countLabel="stations" updatedAt="2026-09-07" /></div>

          <CollapsibleFilters title="Station filters" count={list.length} activeCount={filter === 'all' ? 0 : 1} summary={`${list.length} of ${radioStations.length} stations`}>
            <div className="wiki-filter-group" role="tablist" aria-label="Station status filters">
              {FILTERS.map((f) => {
                const active = filter === f
                const count = f === 'all' ? radioStations.length : radioStations.filter((r) => r.status === f).length
                return (
                  <button key={f} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f)}
                    className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-all duration-150',
                      active ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/30')}>
                    <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{f.toUpperCase()}</span>
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{count}</span>
                  </button>
                )
              })}
            </div>
          </CollapsibleFilters>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-5">
            {list.map((r) => {
              const active = r.slug === selected.slug
              return (
                <Link key={r.slug} href={`/database/radio/${r.slug}`} onMouseEnter={() => setSelectedSlug(r.slug)} aria-current={active ? 'true' : undefined}
                  className={cx('group spotlight-card tech-mask-sm glass-panel overflow-hidden text-left flex flex-col min-h-[150px] transition-all duration-200', active ? 'card-active' : 'hover:border-black/30')}>
                  <span className="flex items-start justify-between gap-3 px-4 pt-4">
                    <Radio size={24} className={active ? 'text-pink' : 'text-dim'} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="block font-cond font-bold uppercase text-[16px] text-paper leading-[1.1] mt-2 px-4">{r.name}</span>
                  <span className="block text-[11px] text-dim uppercase tracking-[0.1em] mt-1 px-4">{r.genre}</span>
                  <span className="mt-auto p-4 pt-3"><GhostBadge status={r.status} /></span>
                </Link>
              )
            })}
            {list.length === 0 && (
              <div className="panel rounded-sm p-8 text-center col-span-full">
                <p className="font-cond uppercase tracking-[0.14em] text-paper">No stations with this status</p>
              </div>
            )}
          </div>
        </div>

        <aside className="tech-mask glass-panel p-5 self-start">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-sm panel2 flex items-center justify-center text-pink" aria-hidden="true"><Radio size={24} strokeWidth={1.8} /></span>
            <div>
              <h2 className="font-cond font-bold uppercase text-[24px] text-paper leading-none">{selected.name}</h2>
              <div className="flex items-center gap-2 mt-1.5"><StatusBadge status={selected.status} /><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-mint">{selected.evidenceStatus}</span></div>
            </div>
          </div>
          <p className="font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-4">{selected.genre}</p>
          {selected.association && (
            <div className="mt-3 border-l-2 border-mint/70 pl-3">
              <span className="block font-cond uppercase tracking-[0.14em] text-[10px] text-dim">Source context</span>
              <span className="block font-cond font-semibold uppercase tracking-[0.1em] text-[12px] text-paper mt-1">{selected.association}</span>
            </div>
          )}
          <p className="text-dim text-[13px] leading-[1.8] mt-3">{selected.desc}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <SourceChip name={selected.sourceName} url={selected.sourceUrl} />
            <span className="font-mono text-[10px] text-dim uppercase">UPDATED {selected.updatedAt}</span>
          </div>

          <Link href={`/database/radio/${selected.slug}`} className="mt-4 inline-flex items-center gap-2 border border-line rounded-sm px-3 h-10 font-cond font-semibold uppercase tracking-[0.12em] text-[11px] text-paper hover:border-mint hover:text-mint transition-colors">
            Read full entry <ChevronRight size={13} />
          </Link>

          {selected.tracks.length > 0 && (
            <>
              <h3 className="font-cond font-semibold uppercase tracking-[0.16em] text-[12px] text-dim mt-6">TRACKS NAMED IN THE SOURCE</h3>
              <div className="mt-2 flex flex-col gap-2">
                {selected.tracks.map(([title, artist], i) => (
                  <div key={i} className="border border-line rounded-sm px-3 py-2">
                    <span className="block font-cond font-semibold uppercase tracking-[0.08em] text-[13px] text-paper truncate">{title === '—' ? artist : title}</span>
                    {title !== '—' && <span className="block text-[11px] text-dim mt-0.5">{artist}</span>}
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="tech-mask-sm glass-panel border border-pink/30 bg-pink/5 p-4">
          <p className="font-cond uppercase tracking-[0.14em] text-[10px] text-pink">Mostly a leak, not a Rockstar reveal</p>
          <p className="mt-2 text-[12px] leading-relaxed text-dim">Almost everything above comes from a single piece of leaked gameplay footage from August 2026 showing the in-game radio wheel — not from Rockstar. Only V-Rock and Vice City FM have any form of direct official confirmation; the rest are marked RUMOUR regardless of how definite the names sound.</p>
        </div>
      </div>

      <section className="px-4 sm:px-6 lg:px-8 pb-10" aria-labelledby="music-archive-title">
        <div className="border-t border-line pt-8">
          <div className="grid grid-cols-1 gap-5 items-end">
            <div>
              <div className="flex items-center gap-2 text-pink"><Music2 size={18} aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-[0.16em]">Music evidence index</span></div>
              <h2 id="music-archive-title" className="font-cond font-bold uppercase text-paper text-[40px] sm:text-[54px] leading-[0.9] mt-2">Songs heard &amp; reported</h2>
              <p className="text-dim text-[13px] sm:text-[14px] leading-relaxed mt-3 max-w-[76ch]">A song used in Rockstar-published footage is not automatically confirmed for the final soundtrack or an in-game station. The labels below preserve that distinction.</p>
            </div>
          </div>

          <CollapsibleFilters title="Music filters" count={musicList.length} activeCount={Number(Boolean(musicQuery.trim())) + Number(musicFilter !== 'all')} summary={`${musicList.length} of ${gtaViMusic.length} tracks`}>
            <label className="wiki-filter-search">
              <Search size={17} className="text-dim shrink-0" aria-hidden="true" />
              <span className="sr-only">Search songs or artists</span>
              <input value={musicQuery} onChange={(event) => setMusicQuery(event.target.value)} placeholder="Search song or artist" className="w-full bg-transparent border-0 outline-none text-[14px] text-paper placeholder:text-dim/70" />
            </label>

            <div className="wiki-filter-group" role="tablist" aria-label="Music evidence filters">
              {MUSIC_FILTERS.map((value) => {
                const active = musicFilter === value
                const count = value === 'all' ? gtaViMusic.length : gtaViMusic.filter((item) => item.evidence === value).length
                const label = value === 'all' ? 'All evidence' : musicEvidence[value].shortLabel
                return <button key={value} type="button" role="tab" aria-selected={active} onClick={() => setMusicFilter(value)} className={cx('control-button h-10 px-3.5 inline-flex items-center gap-2', active && 'control-button-active')}><span>{label}</span><span className="font-mono text-[9px] opacity-65 tabular-nums">{count}</span></button>
              })}
            </div>
          </CollapsibleFilters>

          {musicList.length > 0 && (
            <ol className="radio-song-list">
              {musicList.map((item, index) => {
                const evidence = musicEvidence[item.evidence]
                return (
                  <li key={item.slug}>
                    <span className="radio-song-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="radio-song-main"><strong>{item.title}</strong><small>{item.artist}</small></span>
                    <span className="radio-song-where">{item.appearance}</span>
                    <span className={cx('radio-song-evidence border rounded-full', evidence.className)}>{evidence.label}</span>
                    {item.sourceUrl
                      ? <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="radio-song-source">Rockstar source <ExternalLink size={11} aria-hidden="true" /></a>
                      : <span className="radio-song-source is-none"><VolumeX size={11} aria-hidden="true" /> No leak link</span>}
                  </li>
                )
              })}
            </ol>
          )}
          {musicList.length === 0 && <div className="panel rounded-sm p-8 text-center mt-5"><p className="font-cond uppercase tracking-[0.12em] text-paper">No songs match this search</p></div>}

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="panel rounded-sm p-4 flex items-start gap-3"><ShieldCheck size={20} className="text-mint shrink-0 mt-0.5" aria-hidden="true" /><div><h3 className="font-cond font-bold uppercase tracking-[0.1em] text-[12px] text-paper">Evidence rule</h3><p className="text-[12px] leading-relaxed text-dim mt-1">Rockstar credit means the verified Rockstar upload names the recording. Published media means the recording is heard in official footage but its identification is editorial. Community rumours remain unverified.</p></div></div>
            <div className="panel rounded-sm p-4 flex items-start gap-3"><VolumeX size={20} className="text-pink shrink-0 mt-0.5" aria-hidden="true" /><div><h3 className="font-cond font-bold uppercase tracking-[0.1em] text-[12px] text-paper">Playback unavailable</h3><p className="text-[12px] leading-relaxed text-dim mt-1">GTA LORE does not host, stream or preview these recordings. Promotional use by Rockstar does not grant this independent archive music-distribution rights.</p></div></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App;
