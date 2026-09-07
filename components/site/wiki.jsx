'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { publicSource } from '@/lib/official-links'
import { ChevronRight, FolderTree, Link2, FileWarning, Quote, Info, Shuffle, Check, Hash, Printer, Copy, Clock3, BookOpen, Bookmark, BookmarkCheck, FolderPlus, PenLine, StickyNote, UserRound } from 'lucide-react'
import { categoriesFor, backlinksFor, entryFor, entryByName, otherUses, confusableWith, siblingsFor, outgoingFor, KIND_META, ENTRIES, LINK_PATTERN } from '@/lib/wiki-graph'
import { cx } from './ui'
import { useAuth } from './auth-provider'

// Migalhas de pão: dizem em que ramo do arquivo se está e deixam subir um
// nível. O último elemento é a página actual e não é ligação.
export function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="wiki-breadcrumb min-w-0">
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
export function CategoryHeader({ eyebrow, title, description, count, countLabel = 'entries', updatedAt, image, imageAlt, imagePosition = 'center', imagePriority = false, children }) {
  return (
    <header className="wiki-category-header border-b hairline pb-5">
      <div className="wiki-category-heading-row flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="wiki-category-title mt-1 font-cond font-bold uppercase tracking-tight text-paper">{title}</h1>
        </div>
        {(count != null || updatedAt) && <dl className="wiki-category-facts flex items-center gap-5 shrink-0">
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
        </dl>}
      </div>
      {image && (
        <div className="wiki-category-hero-media relative mt-5 overflow-hidden border border-line bg-surface2">
          <Image src={image} alt={imageAlt || ''} fill priority={imagePriority} sizes="(max-width: 1400px) 100vw, 1320px" className="object-cover" style={{ objectPosition: imagePosition }} />
        </div>
      )}
      {description && <p className="wiki-category-description mt-4 text-dim">{description}</p>}
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
    <nav className="wiki-toc-panel sticky top-24 h-fit" aria-label="Contents">
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

// Cada secção passa a ter âncora própria, como qualquer wiki: o «#» ao
// lado do título é uma ligação para aquele ponto exacto da página, para
// se poder apontar alguém para a secção e não para a entrada inteira.
export function WikiSection({ id, title, className, children }) {
  return (
    <section data-section id={id} className={cx('wiki-content-section mb-12 scroll-mt-24', className)}>
      <h2 className="deco-rule group font-cond font-bold uppercase tracking-[0.16em] text-[18px] text-paper mb-4 flex items-baseline gap-2">
        {title}
        {id && (
          <a
            href={`#${id}`}
            aria-label={`Link to the ${title} section`}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-dim hover:text-pink"
          >
            <Hash size={13} aria-hidden="true" />
          </a>
        )}
      </h2>
      {children}
    </section>
  )
}

// A nota de desambiguação do topo de um verbete. Só aparece quando há
// mesmo outro registo com o mesmo nome — o que, num arquivo em que um
// lugar e um veículo podem chamar-se o mesmo, acontece.
export function Hatnote({ kind, slug }) {
  const entry = entryFor(kind, slug)
  const same = otherUses(entry)
  const near = same.length > 0 ? [] : confusableWith(entry)
  const list = same.length > 0 ? same : near
  if (list.length === 0) return null

  const links = list.map((o, i) => (
    <span key={o.href}>
      {i > 0 && (i === list.length - 1 ? ' and ' : ', ')}
      <Link href={o.href} className="not-italic text-pink hover:text-paper transition-colors">
        {o.name} ({KIND_META[o.kind].label.toLowerCase()})
      </Link>
    </span>
  ))

  return (
    <p className="mt-3 border-l-2 border-warn pl-3 text-[12.5px] leading-relaxed text-dim italic">
      {same.length > 0 ? 'For other records with this name, see ' : 'Not to be confused with '}
      {links}.
    </p>
  )
}

// A descrição curta por baixo do título: uma linha que diz o que a coisa
// é antes de o leitor decidir se quer ler o resto.
export function ShortDescription({ children, className }) {
  if (!children) return null
  return (
    <p className={cx('mt-2 font-cond uppercase tracking-[0.1em] text-[12px] text-dim', className)}>{children}</p>
  )
}

// Ações relacionadas com a página, separadas da navegação global. MediaWiki
// chama-lhes page tabs/toolbox: não mudam de assunto, operam sobre o verbete
// actual. Aqui só aparecem ações reais — leitura, relações, verificação,
// metadados, citação, impressão e ligação canónica.
export function PageTools({ kind, slug }) {
  const entry = entryFor(kind, slug)
  const { user, request } = useAuth()
  const [copied, setCopied] = useState(false)
  const [watching, setWatching] = useState(false)
  const [watchBusy, setWatchBusy] = useState(false)
  const recordedView = useRef('')

  useEffect(() => {
    if (!entry || !user) {
      setWatching(false)
      return
    }
    const key = `${user.id}:${kind}:${slug}`
    fetch(`/api/auth/wiki-state?kind=${encodeURIComponent(kind)}&slug=${encodeURIComponent(slug)}`, { credentials: 'same-origin', cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data) setWatching(Boolean(data.watching)) })
      .catch(() => {})
    if (recordedView.current !== key) {
      recordedView.current = key
      request('page-view', { body: { kind, slug } }).catch(() => {})
    }
  }, [entry, user, kind, slug, request])

  if (!entry) return null

  const toggleWatch = async () => {
    if (!user || watchBusy) return
    setWatchBusy(true)
    try {
      const result = await request('watch', { body: { kind, slug, watching: !watching } })
      setWatching(Boolean(result.watching))
    } catch { /* mantém o estado anterior se a rede falhar */ }
    finally { setWatchBusy(false) }
  }

  const copyPermanentLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${entry.href}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* o endereço canónico continua disponível na barra do browser */ }
  }

  const related = encodeURIComponent(`${kind}:${slug}`)
  const links = [
    ['Read', '#overview', BookOpen],
    ['What links here', `/wiki/what-links-here?kind=${kind}&slug=${slug}`, Link2],
    ['Related changes', `/wiki/changes?related=${related}`, Clock3],
    ['Page information', '#page-information', Info],
    ['Cite', '#page-citation', Quote],
  ]

  return (
    <div className="wiki-tools-stack mt-3">
      <nav className="wiki-page-tools flex flex-wrap items-center gap-x-1 gap-y-1 border-y hairline py-1" aria-label="Article tools">
        {links.map(([label, href, Icon]) => (
          <Link key={label} href={href} className="inline-flex min-h-[34px] items-center gap-1.5 px-2.5 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-dim hover:text-pink hover:bg-surface2/50 transition-colors">
            <Icon size={12} aria-hidden="true" /> {label}
          </Link>
        ))}
        <button type="button" onClick={() => window.print()} className="inline-flex min-h-[34px] items-center gap-1.5 px-2.5 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-dim hover:text-pink hover:bg-surface2/50 transition-colors">
          <Printer size={12} aria-hidden="true" /> Print
        </button>
        <button type="button" onClick={copyPermanentLink} className="inline-flex min-h-[34px] items-center gap-1.5 px-2.5 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-dim hover:text-pink hover:bg-surface2/50 transition-colors">
          {copied ? <Check size={12} className="text-mint" aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
          {copied ? 'Link copied' : 'Permanent link'}
        </button>
      </nav>

      <nav className="wiki-user-actions" aria-label="Your personal wiki actions">
        <div className="wiki-user-actions-label">
          <span><UserRound size={13} aria-hidden="true" /> Your wiki</span>
          <small>{user ? `Personal tools for @${user.username}` : 'Save and contribute with an account'}</small>
        </div>
        <div className="wiki-user-actions-buttons">
          {user ? (
            <>
              <button type="button" onClick={toggleWatch} disabled={watchBusy} aria-pressed={watching} className={cx('wiki-user-action', watching && 'is-active')}>
                {watching ? <BookmarkCheck size={14} aria-hidden="true" /> : <Bookmark size={14} aria-hidden="true" />}
                <span>{watching ? 'Watching' : 'Watch page'}</span>
              </button>
              <Link href={`/account?section=collections&kind=${encodeURIComponent(kind)}&slug=${encodeURIComponent(slug)}`} className="wiki-user-action">
                <FolderPlus size={14} aria-hidden="true" /><span>Add to collection</span>
              </Link>
              <Link href={`/account?section=notes&kind=${encodeURIComponent(kind)}&slug=${encodeURIComponent(slug)}`} className="wiki-user-action">
                <StickyNote size={14} aria-hidden="true" /><span>Private note</span>
              </Link>
              <Link href={`/account?section=contributions&kind=${encodeURIComponent(kind)}&slug=${encodeURIComponent(slug)}`} className="wiki-user-action">
                <PenLine size={14} aria-hidden="true" /><span>Suggest edit</span>
              </Link>
            </>
          ) : (
            <Link href={`/login?next=${encodeURIComponent(entry.href)}`} className="wiki-user-action wiki-user-signin">
              <UserRound size={14} aria-hidden="true" /><span>Sign in for personal tools</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

// A caixa de citação. Numa wiki é o «Cite this page», e serve para o que
// se faz com um arquivo: citá-lo noutro sítio, com a data em que foi lido.
export function CitePage({ kind, slug, title }) {
  const entry = entryFor(kind, slug)
  const [copied, setCopied] = useState(false)
  const [today, setToday] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10))
    setUrl(window.location.origin + window.location.pathname)
  }, [])

  if (!entry) return null

  const citation = `GTA LORE. “${title || entry.name}.” GTA Lore${entry.sourceName ? `, citing ${entry.sourceName}` : ''}${entry.updatedAt ? `, last checked ${entry.updatedAt}` : ''}. ${url}${today ? ` (retrieved ${today})` : ''}.`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* sem área de transferência, o texto continua seleccionável */ }
  }

  return (
    <section id="page-citation" className="wiki-support-panel mt-10 panel rounded-sm p-4 scroll-mt-24" aria-labelledby={`cite-${kind}-${slug}`}>
      <h2 id={`cite-${kind}-${slug}`} className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper">
        <Quote size={13} className="text-mint" aria-hidden="true" /> Cite this page
      </h2>
      <p className="mt-2.5 font-mono text-[11px] leading-[1.7] text-dim break-words select-all">{citation}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors"
        >
          {copied ? <><Check size={12} className="text-mint" aria-hidden="true" /> Copied</> : 'Copy citation'}
        </button>
        <span className="font-mono text-[10px] text-dim">
          Cite the source itself where you can; cite the archive when the arrangement is what you are quoting.
        </span>
      </div>
    </section>
  )
}

// A informação da página, como o Special:PageInformation de uma wiki: o
// que o arquivo sabe sobre o próprio registo, e não sobre o assunto dele.
export function PageInformation({ kind, slug }) {
  const entry = entryFor(kind, slug)
  if (!entry) return null

  const incoming = backlinksFor(kind, slug).length
  const outgoing = outgoingFor(entry).length
  const rows = [
    ['Branch', KIND_META[kind].label],
    ['Page name', entry.name],
    ['Identifier', slug],
    ['Source label', entry.status],
    ['Categories', String(entry.categories.length)],
    ['Links in', String(incoming)],
    ['Links out', String(outgoing)],
    ['Body length', `${entry.bodyLength} characters`],
    ['Marked as stub', entry.stub ? 'yes' : 'no'],
    ['Last checked', entry.updatedAt || 'not recorded'],
    ['Source', entry.sourceName || 'none named'],
  ]

  return (
    <details id="page-information" className="wiki-support-panel mt-4 panel rounded-sm scroll-mt-24">
      <summary className="cursor-pointer list-none px-4 py-3 flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper">
        <Info size={13} className="text-mint" aria-hidden="true" /> Page information
        <ChevronRight size={12} className="ml-auto text-dim" aria-hidden="true" />
      </summary>
      <dl className="border-t hairline divide-y divide-black/[0.06]">
        {rows.map(([k, v]) => (
          <div key={k} className="px-4 py-2 flex items-baseline gap-4">
            <dt className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim w-[110px] shrink-0">{k}</dt>
            <dd className="font-mono text-[11px] text-paper break-words min-w-0">{v}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

// A navbox do rodapé: os vizinhos do mesmo ramo que partilham categoria.
// Numa wiki é a caixa que fecha o artigo e leva ao artigo seguinte.
export function Navbox({ kind, slug, title }) {
  const entry = entryFor(kind, slug)
  const siblings = siblingsFor(entry)
  if (!entry || siblings.length === 0) return null

  return (
    <nav className="wiki-navbox mt-8 border hairline rounded-sm overflow-hidden" aria-label={`More ${KIND_META[kind].plural.toLowerCase()}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-2.5 bg-surface2/50 border-b hairline">
        <span className="font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper">
          {title || `More ${KIND_META[kind].plural.toLowerCase()}`}
        </span>
        <span className="font-mono text-[10px] text-dim">{entry.categories.slice(1).join(' · ') || KIND_META[kind].plural}</span>
        <Link href={`/wiki/random?kind=${kind}`} className="ml-auto inline-flex items-center gap-1.5 font-cond uppercase tracking-[0.12em] text-[10px] text-dim hover:text-pink transition-colors">
          <Shuffle size={11} aria-hidden="true" /> Random {KIND_META[kind].label.toLowerCase()}
        </Link>
      </div>
      <div className="px-4 py-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {siblings.map((sib) => (
          <Link key={sib.href} href={sib.href} className="font-cond uppercase tracking-[0.06em] text-[12px] text-dim hover:text-pink transition-colors">
            {sib.name}
          </Link>
        ))}
      </div>
    </nav>
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
    <dl className="wiki-spec-grid grid grid-cols-2 sm:grid-cols-3 gap-2">
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
    <aside className={cx('wiki-infobox panel rounded-sm p-5 bg-ink/30 lg:sticky lg:top-24 h-fit', className)}>
      <div className="space-y-4">{children}</div>
    </aside>
  )
}

export function InfoboxSource({ sourceName, sourceUrl, updatedAt }) {
  const source = publicSource(sourceName, sourceUrl)
  return (
    <div className="border-t border-black/10 pt-4">
      {source.url ? (
        <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-black/40 transition-colors">
          {source.name.toUpperCase()}
        </a>
      ) : (
        <span className="inline-flex items-center border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-dim">
          {source.name.toUpperCase()} · NO EXTERNAL LINK
        </span>
      )}
      {updatedAt && <p className="font-mono text-[9px] text-dim mt-2">Updated {updatedAt}</p>}
    </div>
  )
}

// A visual record is always raster media captured from Rockstar material.
// When the exact place has no dedicated frame, the region artwork is used as
// context and labelled explicitly so it cannot be mistaken for proof of the
// exact building or street.
export function LocationThumb({ image, fallbackImage, name, label, className, priority = false }) {
  const src = image || fallbackImage
  if (!src) return null
  const contextual = !image
  return (
    <span className={cx('relative block overflow-hidden bg-surface2', className)}>
      <Image
        src={src}
        alt={contextual ? `${name} — official imagery of the surrounding region, not this exact place` : `${name} in published GTA VI media`}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/85 to-black/10 font-mono text-[8px] uppercase tracking-[0.13em] text-white">
        {label || (contextual ? 'OFFICIAL REGION CONTEXT · NOT THIS EXACT PLACE' : 'PUBLISHED GTA VI IMAGE')}
      </span>
    </span>
  )
}

export function LocationLocator({ image, fallbackImage, name, sourceLabel }) {
  return (
    <LocationThumb
      image={image}
      fallbackImage={fallbackImage}
      name={name}
      label={sourceLabel}
      className="aspect-[16/10] w-full rounded-sm border border-line"
      priority
    />
  )
}

// ---------------------------------------------------------------------
// As peças que fazem um verbete comportar-se como verbete de wiki:
// as categorias a que pertence, o que lhe aponta, de onde veio, e o aviso
// de que ainda está por escrever.

// O reverso do «o que liga para aqui»: o que esta entrada aponta. Nas
// wikis vive no fim do artigo e é o que permite andar para a frente em vez
// de só para trás.
export function WhatThisLinks({ kind, slug }) {
  const entry = entryFor(kind, slug)
  const out = entry ? outgoingFor(entry) : []
  if (out.length === 0) return null

  return (
    <section className="mt-6 panel rounded-sm p-4" aria-labelledby={`out-${kind}-${slug}`}>
      <h2 id={`out-${kind}-${slug}`} className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper">
        <Link2 size={13} className="text-mint" aria-hidden="true" /> What this page links to
        <span className="font-mono text-[10px] text-dim tabular-nums">{out.length}</span>
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {out.map((o) => (
          <li key={o.href}>
            <Link href={o.href} className="font-cond uppercase tracking-[0.06em] text-[12px] text-dim hover:text-pink transition-colors">
              {o.name}
              <span className="ml-1.5 font-mono text-[9px] text-dim/70">{KIND_META[o.kind].label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

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
  const list = (items || [])
    .filter((r) => r && r.name)
    .map((r) => ({ ...r, ...publicSource(r.name, r.url) }))
  if (list.length === 0) return null

  return (
    <section data-section id="references" className="wiki-references mb-12 scroll-mt-24">
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
