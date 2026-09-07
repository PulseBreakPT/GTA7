'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, Users, Car, Crosshair, MapPin, Radio as RadioIcon, Repeat2, Shield, Compass, Globe2 } from 'lucide-react'
import { StatusBadge, cx } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { characters, vehicles, weapons, locations, regions, mechanics, radioStations, factions, easterEggs } from '@/lib/content'
import { worldEntries } from '@/lib/world-content'

// O índice de tudo: a página que qualquer wiki tem e que lista, num sítio
// só, cada verbete que existe. Constrói-se das listas do arquivo, por isso
// não pode ficar a apontar para uma entrada que já não está lá nem falhar
// uma que entrou.
const KINDS = [
  { id: 'characters', label: 'Characters', icon: Users, href: '/database/characters', items: characters.map((c) => ({ name: c.name, slug: c.slug, status: c.status, href: `/database/characters/${c.slug}` })) },
  { id: 'vehicles', label: 'Vehicles', icon: Car, href: '/database/vehicles', items: vehicles.map((v) => ({ name: v.name, slug: v.slug, status: v.status, href: `/database/vehicles/${v.slug}` })) },
  { id: 'weapons', label: 'Weapons', icon: Crosshair, href: '/database/weapons', items: weapons.map((w) => ({ name: w.name, slug: w.slug, status: w.status, href: `/database/weapons/${w.slug}` })) },
  { id: 'locations', label: 'Locations', icon: MapPin, href: '/map', items: locations.map((l) => ({ name: l.name, slug: l.slug, status: l.status, href: `/map/location/${l.slug}` })) },
  { id: 'regions', label: 'Regions', icon: Compass, href: '/map', items: regions.map((r) => ({ name: r.label, slug: r.id, status: r.sourced ? 'confirmed' : 'analysis', href: `/map/${r.id}` })) },
  { id: 'factions', label: 'Factions', icon: Shield, href: '/gangs-factions', items: factions.map((f) => ({ name: f.name, slug: f.slug, status: f.status, href: `/gangs-factions/${f.slug}` })) },
  { id: 'radio', label: 'Radio', icon: RadioIcon, href: '/database/radio', items: radioStations.map((s) => ({ name: s.name, slug: s.slug, status: s.status, href: `/database/radio/${s.slug}` })) },
  { id: 'mechanics', label: 'Mechanics', icon: Repeat2, href: '/database/mechanics', items: mechanics.map((m) => ({ name: m.name, slug: m.slug, status: m.status, href: `/database/mechanics/${m.slug}` })) },
  { id: 'secrets', label: 'Secrets', icon: Compass, href: '/map', items: easterEggs.map((e) => ({ name: e.name, slug: e.slug, status: e.status, href: `/easter-eggs/${e.slug}` })) },
  { id: 'world', label: 'World', icon: Globe2, href: '/database/world', items: worldEntries.map((e) => ({ name: e.name, slug: e.slug, status: e.status, href: `/database/world/${e.slug}` })) },
]

const ALL = KINDS.flatMap((k) => k.items.map((item) => ({ ...item, kind: k.id, kindLabel: k.label, icon: k.icon })))

// Agrupa por inicial, como o índice alfabético de uma enciclopédia. O que
// não começa por letra cai todo em «#».
function groupByLetter(items) {
  const groups = new Map()
  items.forEach((item) => {
    const first = (item.name || '').trim().charAt(0).toUpperCase()
    const letter = /[A-Z]/.test(first) ? first : '#'
    if (!groups.has(letter)) groups.set(letter, [])
    groups.get(letter).push(item)
  })
  return [...groups.entries()]
    .sort(([a], [b]) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)))
    .map(([letter, list]) => [letter, list.sort((x, y) => x.name.localeCompare(y.name))])
}

export default function WikiIndexPage() {
  const [kind, setKind] = useState('all')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL.filter((item) => (kind === 'all' || item.kind === kind) && (!q || item.name.toLowerCase().includes(q)))
  }, [kind, query])

  const grouped = useMemo(() => groupByLetter(shown), [shown])
  const letters = grouped.map(([letter]) => letter)

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Index of everything"
          title="The Wiki"
          description="Every entry this archive holds, in one alphabetical index. Each one carries the label saying where it came from — nothing here is stated as fact without a source."
          count={ALL.length}
          countLabel="entries"
        >
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="glass-panel tech-mask-sm flex items-center gap-2 h-10 px-3 w-full sm:w-[260px]">
              <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search every entry…"
                aria-label="Search every entry"
                className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setKind('all')}
                aria-pressed={kind === 'all'}
                className={cx(
                  'inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[11px] transition-colors',
                  kind === 'all' ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/40'
                )}
              >
                All
                <span className="font-mono text-[10px] tabular-nums opacity-70">{ALL.length}</span>
              </button>
              {KINDS.filter((k) => k.items.length > 0).map((k) => {
                const Icon = k.icon
                return (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => setKind(k.id)}
                    aria-pressed={kind === k.id}
                    className={cx(
                      'inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border font-cond font-semibold uppercase tracking-[0.1em] text-[11px] transition-colors',
                      kind === k.id ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/40'
                    )}
                  >
                    <Icon size={12} aria-hidden="true" />
                    {k.label}
                    <span className="font-mono text-[10px] tabular-nums opacity-70">{k.items.length}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </CategoryHeader>
      </div>

      {/* Barra de letras: o atalho que uma enciclopédia dá para saltar
          directamente à inicial procurada. */}
      {letters.length > 1 && (
        <nav className="mt-5 flex flex-wrap gap-1" aria-label="Jump to letter">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter === '#' ? 'other' : letter}`}
              className="w-8 h-8 flex items-center justify-center border border-line rounded-sm font-cond font-bold text-[12px] text-dim hover:text-pink hover:border-pink/60 transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {shown.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-cond font-bold uppercase text-[22px] text-paper">No entries match</p>
          <p className="text-dim text-xs mt-1">Try another type or clear the search.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {grouped.map(([letter, list]) => (
            <section key={letter} id={`letter-${letter === '#' ? 'other' : letter}`} className="scroll-mt-20">
              <div className="flex items-center gap-4">
                <h2 className="font-cond font-bold text-[26px] text-mint leading-none shrink-0">{letter}</h2>
                <span className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
                <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{list.length}</span>
              </div>
              <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-px">
                {list.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={`${item.kind}-${item.slug}`}>
                      <Link href={item.href} className="flex items-center gap-2.5 py-2 border-b border-black/[0.06] hover:border-black/25 group transition-colors">
                        <Icon size={13} className="text-dim group-hover:text-mint shrink-0 transition-colors" aria-hidden="true" />
                        <span className="flex-1 min-w-0 font-cond font-semibold uppercase text-[13px] text-paper truncate group-hover:text-mint transition-colors">{item.name}</span>
                        <span className="font-cond uppercase tracking-[0.14em] text-[8px] text-dim shrink-0 hidden sm:block">{item.kindLabel}</span>
                        <StatusBadge status={item.status} className="shrink-0 scale-[0.85] origin-right" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
