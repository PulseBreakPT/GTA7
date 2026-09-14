'use client'

import { Check, HelpCircle, Activity, BadgeCheck, X, Circle, Triangle, Square, ExternalLink } from 'lucide-react'
import { publicSource } from '@/lib/official-links'

export const cx = (...a) => a.filter(Boolean).join(' ')

// Os acentos do tema claro, num sítio só. Os pastéis do tema escuro
// davam menos de 2:1 sobre branco; estes são as versões escuras das
// mesmas cores e passam todos os 4.5:1. `ACCENT.neutral` substitui o
// quase-branco que servia de quarta barra e que, em fundo claro,
// desaparecia por completo.
export const ACCENT = {
  pink: '#C2185B',
  mint: '#0E7C6B',
  violet: '#5B3FD6',
  warn: '#8A6A00',
  neutral: '#334155',
  ink: '#0B0F16',
  onAccent: '#FFFFFF',
}

// Rótulos em sentence case, como no resto do arquivo. Os dados trazem muitos
// em maiúsculas («SPORTS CLASSIC», «SUVS»); passam a «Sports classic» e
// «SUVs», sem estragar siglas. Texto que já tem minúsculas fica como está.
const LABEL_ACRONYMS = { SUVS: 'SUVs', SUV: 'SUV', GTA: 'GTA', VI: 'VI', ATV: 'ATV', UTV: 'UTV', SMG: 'SMG', LMG: 'LMG', RPG: 'RPG', MC: 'MC', PTT: 'PTT', DJ: 'DJ', TV: 'TV', FM: 'FM', VC: 'VC', HQ: 'HQ', PS5: 'PS5', NPC: 'NPC', EMS: 'EMS', VCPD: 'VCPD', UK: 'UK', US: 'US', II: 'II', III: 'III', IV: 'IV', '4X4': '4x4', '6X6': '6x6', GT: 'GT', GTX: 'GTX', SS: 'SS', RS: 'RS', LX: 'LX' }
export const displayLabel = (value) => {
  const text = String(value ?? '')
  if (!text || /[a-z]/.test(text)) return text
  const words = text.toLowerCase().split(/(\s+)/).map((word) => LABEL_ACRONYMS[word.toUpperCase()] || word)
  const joined = words.join('')
  return joined.charAt(0).toUpperCase() + joined.slice(1)
}

// Etiqueta de classificação (classe, tipo, género, papel): neutra, não é
// evidência. O estado da evidência fica só com StatusBadge e GhostBadge.
export function TypeChip({ children, className }) {
  return <span className={cx('type-chip', className)}>{typeof children === 'string' ? displayLabel(children) : children}</span>
}

export const STATUS_META = {
  confirmed: { label: 'Confirmed', color: ACCENT.mint, Icon: Check },
  verified: { label: 'Verified', color: '#276CBE', Icon: BadgeCheck },
  category: { label: 'Category confirmed', color: ACCENT.warn, Icon: BadgeCheck },
  analysis: { label: 'Analysis', color: '#946200', Icon: Activity },
  rumour: { label: 'Rumour', color: ACCENT.violet, Icon: HelpCircle },
  official: { label: 'Official', color: ACCENT.pink, Icon: Check },
  community: { label: 'Community', color: ACCENT.violet, Icon: HelpCircle },
  featured: { label: 'Featured', color: ACCENT.pink, Icon: Check },
  update: { label: 'Update', color: ACCENT.violet, Icon: Activity },
  news: { label: 'News', color: ACCENT.mint, Icon: Activity },
}

export function StatusBadge({ status, label, className }) {
  const m = STATUS_META[status] || STATUS_META.analysis
  const text = displayLabel(label || m.label)
  return (
    <span
      className={cx('status-badge inline-flex items-center gap-1 px-1.5 py-[3px] font-cond font-semibold uppercase tracking-[0.1em] text-[11px] leading-none rounded-sm', className)}
      data-status={status || 'analysis'}
      style={{ color: ACCENT.onAccent, backgroundColor: m.color }}
    >
      <m.Icon size={10} strokeWidth={3} aria-hidden="true" />
      {text}
    </span>
  )
}

export function GhostBadge({ status, label, className }) {
  const m = STATUS_META[status] || STATUS_META.analysis
  const text = displayLabel(label || m.label)
  return (
    <span
      className={cx('ghost-badge inline-flex items-center gap-1 px-1.5 py-[3px] font-cond font-semibold uppercase tracking-[0.1em] text-[11px] leading-none rounded-sm border', className)}
      data-status={status || 'analysis'}
      style={{ color: m.color, borderColor: `${m.color}55`, backgroundColor: `${m.color}0F` }}
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
      <span className={cx('relative flex-1 min-w-0 rounded-full bg-black/10 overflow-hidden', sm ? 'h-[6px]' : 'h-[9px]', barClass)} role="img" aria-label={`${label || 'value'}: ${value} of 100`}>
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
      className={cx('inline-flex items-center justify-center rounded-full bg-ink/90 border border-black/45 text-paper shadow-[0_1px_4px_rgba(11,15,22,0.22)]', className)}
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

// A ligação à fonte de um registo, num sítio só. Sem URL não se desenha
// ligação nenhuma: um `<a>` sem `href` é um botão morto, e uma ligação a
// um domínio de exemplo é pior — dá ares de proveniência a quem não a tem.
// Fica o nome da fonte, dito por extenso e a cinzento, que é exactamente o
// que o arquivo pode garantir sobre esse registo.
export function SourceChip({ name, url, prefix = 'SOURCE', className }) {
  const source = publicSource(name, url)
  const label = source.name
    ? (prefix ? `${prefix}: ${String(source.name).toUpperCase()}` : String(source.name).toUpperCase())
    : (prefix || 'SOURCE')
  const base = 'inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px]'
  if (!source.url) {
    return (
      <span className={cx(base, 'text-dim', className)}>
        {label}
        <span className="font-mono text-[9px] tracking-[0.1em] text-dim/80">· NO LINK</span>
      </span>
    )
  }
  return (
    <a href={source.url} target="_blank" rel="noreferrer" className={cx(base, 'text-paper hover:border-black/40 transition-colors', className)}>
      {label} <ExternalLink size={11} aria-hidden="true" />
    </a>
  )
}
