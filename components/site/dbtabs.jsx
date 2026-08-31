'use client'

import Link from 'next/link'
import { cx } from './ui'

const TABS = [
  { id: 'weapons', label: 'WEAPONS', href: '/database/weapons' },
  { id: 'vehicles', label: 'VEHICLES', href: '/database/vehicles' },
  { id: 'characters', label: 'CHARACTERS', href: '/database/characters' },
  { id: 'mechanics', label: 'MECHANICS', href: '/database/mechanics' },
]

export default function DbTabs({ active, counters }) {
  return (
    <div className="border-b hairline bg-ink">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto">
        <nav className="flex items-center" aria-label="Database sections">
          {TABS.map((t) => {
            const isActive = t.id === active
            return (
              <Link
                key={t.id}
                href={t.href}
                aria-current={isActive ? 'page' : undefined}
                className={cx(
                  'relative font-cond font-semibold uppercase tracking-[0.14em] text-[14px] px-4 sm:px-5 h-12 flex items-center whitespace-nowrap transition-colors duration-150',
                  isActive ? 'text-paper' : 'text-dim hover:text-paper'
                )}
              >
                {t.label}
                {isActive && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-pink" aria-hidden="true" />}
              </Link>
            )
          })}
        </nav>
        {counters && (
          <div className="hidden md:flex items-stretch shrink-0">
            {counters.map(([n, label], i) => (
              <div key={label} className={cx('px-4 flex flex-col justify-center leading-none', i > 0 && 'border-l hairline')}>
                <span className="font-cond font-bold text-[20px] text-paper tabular-nums text-center">{n}</span>
                <span className="font-cond text-[9px] text-dim uppercase tracking-[0.18em] mt-0.5 text-center">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function WeaponGlyph({ type, size = 18, className }) {
  const paths = {
    handgun: 'M2,10 h16 l2,2 v3 h-8 l-1.6,6 h-5 l1.8,-6 h-5.2 z M18,10 v-2 h-4 v2',
    shotgun: 'M1,11 h21 v2.4 h-9 l-2.4,5 h-4 l2.4,-5 h-8 z M22,11 l1.5,-3',
    smg: 'M3,9 h15 v3.6 h-4.4 v6 h-4 v-6 h-6.6 z M18,9 v-2.4 h-4 v2.4 M3,10.6 h-2.4',
    rifle: 'M0.5,11 h23 v2.2 h-7.6 l-1.4,5.4 h-3.4 l1.4,-5.4 h-9 z M23.5,11 l0,-2.6 h-3.6',
    explosives: 'M12,8 a6.4,6.4 0 1,0 0.01,0 z M12,8 l2.2,-3.6 h3 M17,3 a1.6,1.6 0 1,0 0.01,0',
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d={paths[type] || paths.handgun} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}
