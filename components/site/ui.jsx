'use client'

import { Check, HelpCircle, Activity, BadgeCheck, X, Circle, Triangle, Square } from 'lucide-react'

export const cx = (...a) => a.filter(Boolean).join(' ')

export const STATUS_META = {
  confirmed: { label: 'CONFIRMED', color: '#65DCCB', Icon: Check },
  verified: { label: 'VERIFIED', color: '#65DCCB', Icon: BadgeCheck },
  category: { label: 'CATEGORY CONFIRMED', color: '#E6D658', Icon: BadgeCheck },
  analysis: { label: 'ANALYSIS', color: '#65DCCB', Icon: Activity },
  rumour: { label: 'RUMOUR', color: '#9B83F4', Icon: HelpCircle },
  official: { label: 'OFFICIAL', color: '#F1A3C3', Icon: Check },
  community: { label: 'COMMUNITY', color: '#9B83F4', Icon: HelpCircle },
  featured: { label: 'FEATURED', color: '#F1A3C3', Icon: Check },
  update: { label: 'UPDATE', color: '#9B83F4', Icon: Activity },
  news: { label: 'NEWS', color: '#65DCCB', Icon: Activity },
}

export function StatusBadge({ status, label, className }) {
  const m = STATUS_META[status] || STATUS_META.analysis
  const text = label || m.label
  return (
    <span
      className={cx('inline-flex items-center gap-1 px-1.5 py-[3px] font-cond font-semibold uppercase tracking-[0.1em] text-[11px] leading-none rounded-sm', className)}
      style={{ color: '#07090E', backgroundColor: m.color }}
    >
      <m.Icon size={10} strokeWidth={3} aria-hidden="true" />
      {text}
    </span>
  )
}

export function GhostBadge({ status, label, className }) {
  const m = STATUS_META[status] || STATUS_META.analysis
  const text = label || m.label
  return (
    <span
      className={cx('inline-flex items-center gap-1 px-1.5 py-[3px] font-cond font-semibold uppercase tracking-[0.1em] text-[11px] leading-none rounded-sm border', className)}
      style={{ color: m.color, borderColor: `${m.color}66`, backgroundColor: `${m.color}14` }}
    >
      <m.Icon size={10} strokeWidth={3} aria-hidden="true" />
      {text}
    </span>
  )
}

// HUD-style meter: a filled icon sitting in a dark disc, overlapping a
// rounded pill track — the same shape as the health/stamina/eagle-eye bars
// in the game's own HUD. One shared implementation so the vehicle stat
// rows, comparison panel and relationship meters can't drift apart.
export function StatBar({ icon: Icon, label, value, color, right, size = 'md', barClass }) {
  const sm = size === 'sm'
  return (
    <div className="flex items-center gap-3 min-w-0">
      {Icon && (
        <span
          className={cx('relative z-[1] shrink-0 rounded-full bg-ink flex items-center justify-center', sm ? 'w-6 h-6 -mr-1' : 'w-8 h-8 -mr-1.5')}
          style={{ color, boxShadow: `0 0 0 1px ${color}4D` }}
          aria-hidden="true"
        >
          <Icon size={sm ? 11 : 14} fill={color} stroke={color} strokeWidth={1} />
        </span>
      )}
      {label && (
        <span className={cx('font-cond font-semibold uppercase tracking-[0.1em] text-paper shrink-0', sm ? 'text-[11px] w-16' : 'text-[13px] w-[104px]')}>
          {label}
        </span>
      )}
      <span className={cx('relative flex-1 min-w-0 rounded-full bg-white/10 overflow-hidden', sm ? 'h-[6px]' : 'h-[9px]', barClass)} role="img" aria-label={`${label || 'value'}: ${value} of 100`}>
        <span className="absolute inset-y-0 left-0 rounded-full transition-all duration-300" style={{ width: `${value}%`, backgroundColor: color }} />
        {value > 6 && value < 100 && <span className="absolute inset-y-0 w-px bg-ink/80" style={{ left: `calc(${value}% - 2px)` }} />}
      </span>
      {right != null && <span className="font-mono text-[11px] text-dim shrink-0 tabular-nums">{right}</span>}
    </div>
  )
}

const GLYPH_ICONS = { cross: X, circle: Circle, triangle: Triangle, square: Square }

export function PadGlyph({ shape, className, size = 18 }) {
  const Icon = GLYPH_ICONS[shape] || Circle
  return (
    <span
      className={cx('inline-flex items-center justify-center rounded-full bg-ink/85 border border-white/50 text-paper shadow-[0_1px_6px_rgba(0,0,0,0.55)]', className)}
      style={{ width: size + 8, height: size + 8 }}
      aria-hidden="true"
    >
      <Icon size={size - 6} strokeWidth={2.6} />
    </span>
  )
}

export function GlyphHint({ shape, label, onClick, as = 'button' }) {
  const content = (
    <>
      <PadGlyph shape={shape} size={18} />
      <span className="font-cond font-medium uppercase tracking-[0.14em] text-[13px] text-dim group-hover:text-paper transition-colors">{label}</span>
    </>
  )
  if (as === 'span') return <span className="group inline-flex items-center gap-2">{content}</span>
  return (
    <button type="button" onClick={onClick} className="group inline-flex items-center gap-2 min-h-[44px] px-1" aria-label={label}>
      {content}
    </button>
  )
}

export function BigCounter({ n, label, align = 'center' }) {
  return (
    <div className={cx('flex flex-col leading-none', align === 'left' ? 'items-start' : 'items-center')}>
      <span className="font-cond font-bold text-[26px] text-paper tabular-nums tracking-wide">{n}</span>
      <span className="font-cond text-[10px] text-dim uppercase tracking-[0.18em] mt-1">{label}</span>
    </div>
  )
}

export function SectionTitle({ children, className }) {
  return <h1 className={cx('font-cond font-bold uppercase text-paper leading-[0.9] tracking-tight', className)}>{children}</h1>
}

export function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  const M = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  return `${M[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}
