'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Repeat2, HeartHandshake, Glasses, Backpack, Siren, Radar, Package, House, ArrowUpRight } from 'lucide-react'
import { GhostBadge, cx } from '@/components/site/ui'
import { mechanics, officialCatalog } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack, wanted: Siren, events: Radar, cargo: Package, safehouse: House, dynamic: Radar }
const FILTERS = ['all', 'confirmed', 'verified', 'analysis', 'rumour']

export default function MechanicsPage() {
  const [filter, setFilter] = useState('all')
  const list = useMemo(() => mechanics.filter((m) => filter === 'all' || m.status === filter), [filter])

  return (
    <div className="flex-1 flex flex-col">
      <div className="wiki-index-layout mechanics-index px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Mechanics' }]} />

        <div className="mt-4"><CategoryHeader eyebrow="Gameplay systems" title="Mechanics" image="/media/scenes/ambrosia-drive.webp" imageAlt="Official GTA VI screenshot viewed from inside a vehicle" description="Gameplay systems documented from official footage, separated from analysis and community reports." count={mechanics.length} countLabel="mechanics" /></div>

        <div className="mt-5 flex flex-wrap gap-1.5" role="tablist" aria-label="Mechanic status filters">
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

        <div className="mechanics-card-grid mt-5">
          {list.map((m) => {
            const Icon = MECH_ICONS[m.icon] || Repeat2
            return (
              <Link key={m.slug} href={`/database/mechanics/${m.slug}`} className="mechanic-card group" aria-label={`Open ${m.name}`}>
                <figure className="mechanic-card-media">
                  <Image src={m.image} alt={m.imageAlt} fill sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw" className="object-cover" style={{ objectPosition: m.imagePosition || 'center' }} referrerPolicy="no-referrer" />
                  <span className="mechanic-frame-label">{m.imageSeries || 'EXTENDED LOOK'}</span>
                  <span className="mechanic-prompt" aria-hidden="true">{m.glyph}</span>
                </figure>
                <div className="mechanic-card-copy">
                  <div className="mechanic-card-title-row">
                    <Icon size={18} className="text-pink shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <h2>{m.name}</h2>
                    <ArrowUpRight size={15} className="mechanic-card-arrow" aria-hidden="true" />
                  </div>
                  <p>{m.desc}</p>
                  <div className="mechanic-card-meta">
                    <GhostBadge status={m.status} />
                    <span>{m.frameTime || 'OFFICIAL FOOTAGE'}</span>
                  </div>
                </div>
              </Link>
            )
          })}
          {list.length === 0 && (
            <div className="panel rounded-sm p-8 text-center col-span-full">
              <p className="font-cond uppercase tracking-[0.14em] text-paper">No mechanics with this status</p>
            </div>
          )}
        </div>

        <div className="mechanics-source-notes mt-6">
          <div>
            <strong>Official delivery details</strong>
            <p>{officialCatalog.mechanics.join(' ')}</p>
          </div>
          <div>
            <strong>Catalogue boundary</strong>
            <p>{officialCatalog.note}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
