'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Repeat2, HeartHandshake, Glasses, Backpack, Siren, Radar, Package, House, ArrowUpRight } from 'lucide-react'
import { GhostBadge, cx } from '@/components/site/ui'
import { mechanics, officialCatalog } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import CollapsibleFilters from '@/components/site/collapsible-filters'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack, wanted: Siren, events: Radar, cargo: Package, safehouse: House, dynamic: Radar }
// Os cinco rótulos de prova, e não quatro: «category» existe no glossário,
// nas estatísticas e no mapa, e uma lista que o omita esconde as entradas
// que o usam em vez de as filtrar.
const FILTERS = ['all', 'confirmed', 'verified', 'category', 'analysis', 'rumour']

export default function MechanicsPage() {
  const [filter, setFilter] = useState('all')
  const list = useMemo(() => mechanics.filter((m) => filter === 'all' || m.status === filter), [filter])

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout mechanics-index px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Mechanics' }]} />

        <div className="mt-4"><CategoryHeader kind="mechanics" eyebrow="Gameplay systems" title="Mechanics" description="Gameplay systems documented from official footage, separated from analysis and community reports." count={mechanics.length} countLabel="mechanics" /></div>

        <CollapsibleFilters title="Mechanic filters" count={list.length} activeCount={filter === 'all' ? 0 : 1} summary={`${list.length} of ${mechanics.length} mechanics`}>
          <div className="wiki-filter-group" role="tablist" aria-label="Mechanic status filters">
            {FILTERS.map((f) => {
              const active = filter === f
              const count = f === 'all' ? mechanics.length : mechanics.filter((m) => m.status === f).length
              return (
                <button key={f} type="button" role="tab" aria-selected={active} onClick={() => setFilter(f)}
                  className={cx('flex items-center gap-1.5 px-3 h-9 border rounded-sm transition-colors duration-150',
                    active ? 'border-pink text-pink bg-pink/5' : 'border-line text-dim hover:text-paper hover:border-black/30')}>
                  <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px]">{f}</span>
                  <span className="font-mono text-[10px] tabular-nums opacity-70">{count}</span>
                </button>
              )
            })}
          </div>
        </CollapsibleFilters>

        {list.length > 0 ? (
          <ul className="mechanics-list">
            {list.map((m) => {
              const Icon = MECH_ICONS[m.icon] || Repeat2
              return (
                <li key={m.slug}>
                  <Link href={`/database/mechanics/${m.slug}`} className="mechanics-row">
                    <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className="mechanics-row-main"><strong>{m.name.toLowerCase()}</strong><small>{m.desc}</small></span>
                    <GhostBadge status={m.status} />
                    <ArrowUpRight size={15} className="mechanics-row-arrow" aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="panel rounded-sm p-8 text-center mt-5">
            <p className="font-cond uppercase tracking-[0.14em] text-paper">No mechanics with this status</p>
          </div>
        )}

        {/* O bloco «Official delivery details» saiu daqui: era o texto das
            edições — itens da Ultimate Edition, upgrade da Standard e a data
            de pré-carregamento —, que pertence às Editions. A nota de
            fronteira também era a das edições; passa a ser a das mecânicas,
            porque uma fronteira tem de descrever o catálogo que limita. */}
        <div className="mechanics-source-notes mt-6">
          <div>
            <strong>Catalogue boundary</strong>
            <p>{officialCatalog.mechanicsNote}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
