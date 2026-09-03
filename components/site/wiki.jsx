'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import MapTerrain, { MAP_VBW, MAP_VBH } from './map-terrain'
import { cx } from './ui'

// Migalhas de pão: dizem em que ramo do arquivo se está e deixam subir um
// nível. O último elemento é a página actual e não é ligação.
export function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-cond uppercase tracking-[0.12em] text-[11px] text-dim">
        {trail.map((step, i) => {
          const last = i === trail.length - 1
          return (
            <li key={`${step.label}-${i}`} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <ChevronRight size={11} className="shrink-0 opacity-60" aria-hidden="true" />}
              {last || !step.href ? (
                <span className={cx('truncate', last && 'text-paper')} aria-current={last ? 'page' : undefined}>{step.label}</span>
              ) : (
                <Link href={step.href} className="truncate hover:text-paper transition-colors">{step.label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Cabeçalho de página de categoria: nome, o que a lista contém, quantas
// entradas tem e de quando é a mais recente. A contagem e a data vêm
// sempre calculadas dos dados — escritas à mão desactualizam-se e passam
// a mentir sobre o tamanho do arquivo.
export function CategoryHeader({ eyebrow, title, description, count, countLabel = 'entries', updatedAt, children }) {
  return (
    <header className="border-b hairline pb-4">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          {eyebrow && <p className="font-cond uppercase tracking-[0.18em] text-[11px] text-mint">{eyebrow}</p>}
          <h1 className="mt-1 font-cond font-bold uppercase tracking-tight text-[34px] sm:text-[44px] leading-[0.95] text-paper">{title}</h1>
          {description && <p className="mt-2 text-[13px] leading-relaxed text-dim max-w-[68ch]">{description}</p>}
        </div>
        <dl className="flex items-center gap-5 shrink-0">
          <div>
            <dt className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">{countLabel}</dt>
            <dd className="font-cond font-bold text-[22px] text-paper tabular-nums leading-none mt-1">{count}</dd>
          </div>
          {updatedAt && (
            <div>
              <dt className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Updated</dt>
              <dd className="font-mono text-[12px] text-paper tabular-nums leading-none mt-1.5">{updatedAt}</dd>
            </div>
          )}
        </dl>
      </div>
      {children}
    </header>
  )
}

// Os pedaços que qualquer wiki grande tem em comum em todas as fichas: um
// índice lateral, secções com título sublinhado e uma caixa de dados fixa
// à direita. Vivem aqui para que personagem, veículo e local usem
// exactamente a mesma estrutura em vez de três aproximações parecidas.

// Índice lateral: lê as secções da própria página ([data-section]) e
// destaca a que está à vista. As etiquetas vêm por props porque cada tipo
// de ficha tem secções diferentes.
export function TableOfContents({ sections }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.id)
      })
    }, { rootMargin: '0px 0px -60% 0px' })

    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-24 h-fit" aria-label="Contents">
      <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim mb-3">Contents</p>
      <ul className="space-y-2">
        {sections.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cx(
                'inline-flex items-center gap-2 font-cond uppercase tracking-[0.08em] text-[12px] transition-colors',
                activeId === id ? 'text-pink' : 'text-dim hover:text-paper'
              )}
            >
              {Icon && <Icon size={12} aria-hidden="true" />}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function WikiSection({ id, title, className, children }) {
  return (
    <section data-section id={id} className={cx('mb-12 scroll-mt-24', className)}>
      <h2 className="font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper border-b border-white/10 pb-3 mb-4">{title}</h2>
      {children}
    </section>
  )
}

// Uma linha de atributo da caixa de dados. Sem valor não se desenha nada:
// a alternativa era um rótulo seguido de vazio, que num arquivo que se diz
// preso à fonte lê-se como dado em falta e não como dado inexistente.
export function InfoRow({ label, value, children }) {
  if (!children && (value == null || value === '')) return null
  return (
    <div>
      <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">{label}</span>
      <div className="font-cond font-semibold text-[13px] text-paper mt-1">{children || value}</div>
    </div>
  )
}

export function InfoboxShell({ children, className }) {
  return (
    <aside className={cx('panel rounded-sm p-5 bg-ink/30 lg:sticky lg:top-24 h-fit', className)}>
      <div className="space-y-4">{children}</div>
    </aside>
  )
}

export function InfoboxSource({ sourceName, sourceUrl, updatedAt }) {
  return (
    <div className="border-t border-white/10 pt-4">
      <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40 transition-colors">
        {sourceName ? sourceName.toUpperCase() : 'SOURCE'}
      </a>
      {updatedAt && <p className="font-mono text-[9px] text-dim mt-2">Updated {updatedAt}</p>}
    </div>
  )
}

// Mapa de localização da ficha de um local: o mesmo terreno do mapa
// interactivo, sem interacção nenhuma, com um alvo no ponto. É a peça que
// nas wikis grandes aparece sempre no topo da caixa de dados de um sítio.
export function LocationLocator({ x, y, name }) {
  return (
    <span className="relative block overflow-hidden rounded-sm border border-line bg-[#081018]">
      <svg viewBox={`0 0 ${MAP_VBW} ${MAP_VBH}`} className="w-full h-auto" role="img" aria-label={`${name} marked on the map of Leonida`}>
        <rect width={MAP_VBW} height={MAP_VBH} fill="#081018" />
        <MapTerrain />
        <g transform={`translate(${x},${y})`}>
          <circle r="42" fill="none" stroke="#F1A3C3" strokeWidth="3" opacity="0.5" />
          <circle r="22" fill="none" stroke="#F5F4F0" strokeWidth="3" />
          <circle r="11" fill="#07090E" stroke="#F1A3C3" strokeWidth="5" />
          <circle r="4" fill="#F1A3C3" />
        </g>
      </svg>
    </span>
  )
}
