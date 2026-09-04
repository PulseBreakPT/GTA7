'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, FolderTree, Link2, FileWarning } from 'lucide-react'
import { categoriesFor, backlinksFor, entryFor, entryByName, LINK_PATTERN } from '@/lib/wiki-graph'
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
      <h2 className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper mb-4">{title}</h2>
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

// A ficha técnica de uma wiki é uma grelha de pares rótulo/valor, e não uma
// fila de valores soltos: «—» sozinho não diz de que campo é. Cada célula
// leva o rótulo por cima, e o campo sem fonte publicada aparece na mesma,
// dito por extenso — num arquivo preso à fonte, a ausência é informação.
export function SpecGrid({ items }) {
  const rows = items.filter(Boolean)
  if (rows.length === 0) return null
  return (
    <dl className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {rows.map(({ label, value, children }) => (
        <div key={label} className="panel2 rounded-sm px-3 py-2.5 min-w-0">
          <dt className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">{label}</dt>
          <dd className="mt-1 font-cond font-semibold uppercase tracking-[0.08em] text-[13px] text-paper leading-snug break-words">
            {children || value || <span className="font-normal tracking-[0.1em] text-[11px] text-dim">NOT PUBLISHED</span>}
          </dd>
        </div>
      ))}
    </dl>
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
    <div className="border-t border-black/10 pt-4">
      <a href={sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors">
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
    <span className="relative block overflow-hidden rounded-sm border border-line bg-[#DCE6EF]">
      <svg viewBox={`0 0 ${MAP_VBW} ${MAP_VBH}`} className="w-full h-auto" role="img" aria-label={`${name} marked on the map of Leonida`}>
        <rect width={MAP_VBW} height={MAP_VBH} fill="#DCE6EF" />
        <MapTerrain />
        <g transform={`translate(${x},${y})`}>
          <circle r="42" fill="none" stroke="#C2185B" strokeWidth="3" opacity="0.5" />
          <circle r="22" fill="none" stroke="#FFFFFF" strokeWidth="3" />
          <circle r="11" fill="#FFFFFF" stroke="#C2185B" strokeWidth="5" />
          <circle r="4" fill="#C2185B" />
        </g>
      </svg>
    </span>
  )
}

// ---------------------------------------------------------------------
// As peças que fazem um verbete comportar-se como verbete de wiki:
// as categorias a que pertence, o que lhe aponta, de onde veio, e o aviso
// de que ainda está por escrever.

// Rodapé de categorias. Nas wikis é a última linha de qualquer artigo, e
// é por ali que se anda de um assunto para o vizinho sem passar pela
// pesquisa.
export function CategoryFooter({ kind, slug }) {
  const entry = entryFor(kind, slug)
  const cats = categoriesFor(entry)
  if (cats.length === 0) return null

  return (
    <footer className="mt-10 border-t border-black/10 pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.14em] text-[10px] text-dim shrink-0">
          <FolderTree size={12} aria-hidden="true" /> Categories
        </span>
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/wiki/category/${c.slug}`}
            className="inline-flex items-center border border-line rounded-sm px-2 py-1 font-cond uppercase tracking-[0.08em] text-[11px] text-paper hover:border-mint hover:text-mint transition-colors"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}

// O que liga para aqui. Só entram ligações que o arquivo declara num
// campo — nunca nomes apanhados por semelhança no texto, que dariam
// ligações falsas com ar de facto.
export function WhatLinksHere({ kind, slug }) {
  const links = backlinksFor(kind, slug)
  if (links.length === 0) return null

  return (
    <div className="border-t border-black/10 pt-4">
      <p className="inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.14em] text-[9px] text-dim">
        <Link2 size={11} aria-hidden="true" /> What links here
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {links.slice(0, 8).map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-mint/70 mt-[7px] shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block font-cond font-semibold uppercase text-[12px] text-paper group-hover:text-mint transition-colors leading-tight">{l.name}</span>
                <span className="block font-cond uppercase tracking-[0.14em] text-[8px] text-dim mt-0.5">{l.relation}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {links.length > 8 && (
        <p className="mt-2 font-mono text-[10px] text-dim">+{links.length - 8} more</p>
      )}
    </div>
  )
}

// Secção de referências, numerada. É o que separa um arquivo de um blogue:
// cada afirmação tem de poder ser seguida até à origem.
export function References({ items }) {
  const list = (items || []).filter((r) => r && r.name)
  if (list.length === 0) return null

  return (
    <section data-section id="references" className="mb-12 scroll-mt-24">
      <h2 className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper mb-4">References</h2>
      <ol className="space-y-2.5">
        {list.map((r, i) => (
          <li key={`${r.name}-${i}`} className="flex gap-3 text-[13px] leading-relaxed">
            <span className="font-mono text-[11px] text-mint tabular-nums shrink-0 pt-[2px]">[{i + 1}]</span>
            <span className="min-w-0 text-dim">
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer" className="text-paper hover:text-mint transition-colors break-words">{r.name}</a>
              ) : (
                <span className="text-paper">{r.name}</span>
              )}
              {r.note && <span className="block text-[12px] text-dim mt-0.5">{r.note}</span>}
              {r.retrieved && <span className="block font-mono text-[10px] text-dim mt-0.5">Retrieved {r.retrieved}</span>}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

// Aviso de esboço: diz de frente que a entrada está incompleta, em vez de
// a deixar passar por acabada.
export function StubNotice({ kind, slug }) {
  const entry = entryFor(kind, slug)
  if (!entry || !entry.stub) return null

  return (
    <div className="mt-4 flex items-start gap-2.5 border-l-2 border-warn/70 bg-warn/[0.04] px-3 py-2.5">
      <FileWarning size={14} className="text-warn shrink-0 mt-[2px]" aria-hidden="true" />
      <p className="text-[12px] leading-relaxed text-dim">
        <span className="font-cond font-semibold uppercase tracking-[0.1em] text-[11px] text-warn">Stub. </span>
        This entry holds only what the source states. It grows when the source does — not before.
      </p>
    </div>
  )
}

// Ligações internas automáticas: percorre o texto com o padrão dos nomes
// reais dos verbetes e transforma cada acerto em ligação. É a marca de
// água de uma wiki — o texto de um artigo leva a outro artigo — e aqui só
// liga nomes que existem mesmo no arquivo, nunca por semelhança.
export function WikiText({ children, exclude }) {
  const text = typeof children === 'string' ? children : ''
  if (!text || !LINK_PATTERN) return children || null

  const out = []
  let last = 0
  let key = 0
  const re = new RegExp(LINK_PATTERN.source, 'gi')
  let match = re.exec(text)

  while (match) {
    const hit = entryByName(match[0])
    if (hit && hit.href !== exclude) {
      if (match.index > last) out.push(text.slice(last, match.index))
      out.push(
        <Link
          key={`wl-${key++}`}
          href={hit.href}
          className="text-paper underline decoration-mint/40 underline-offset-2 hover:text-mint hover:decoration-mint transition-colors"
        >
          {match[0]}
        </Link>
      )
      last = match.index + match[0].length
    }
    match = re.exec(text)
  }

  if (last === 0) return text
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
