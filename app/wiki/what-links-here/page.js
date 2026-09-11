import Link from 'next/link'
import { ArrowRight, Link2 } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge } from '@/components/site/ui'
import { KIND_META, backlinksFor, entryFor, outgoingFor } from '@/lib/wiki-graph'

// Esta ferramenta resolve-se inteiramente no servidor. Era um componente de
// cliente dentro de um `Suspense` com fallback vazio: o endereço trazia o
// `kind` e o `slug`, o servidor respondia com a casca da wiki e os resultados
// só apareciam depois da hidratação. Uma página de backlinks que não existe
// no HTML servido não serve para rastreadores, leitores de ecrã, nem para
// quem abre a ligação com o JavaScript por carregar.

const subjectFrom = (params) => {
  const kind = typeof params.kind === 'string' ? params.kind : ''
  const slug = typeof params.slug === 'string' ? params.slug : ''
  return { kind, slug, entry: entryFor(kind, slug) }
}

export async function generateMetadata({ searchParams }) {
  const { entry } = subjectFrom((await searchParams) || {})
  return {
    title: entry ? `What links here: ${entry.name}` : 'What links here',
    description: entry
      ? `Every archive record that links to ${entry.name}, and every record it links to.`
      : 'Inspect incoming and outgoing links for a GTA Lore archive entry.',
    robots: { index: false, follow: true },
  }
}

function EntryRow({ entry, relation, direction }) {
  return (
    <li>
      <Link href={entry.href} className="group flex min-h-[110px] h-full flex-col border border-line bg-white/55 p-4 hover:border-pink/55 hover:bg-white transition-colors">
        <span className="flex items-center gap-2">
          <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint flex-1">{KIND_META[entry.kind].label}</span>
          <StatusBadge status={entry.status} className="shrink-0" />
          <ArrowRight size={12} className={direction === 'out' ? 'text-pink' : 'rotate-180 text-mint'} aria-hidden="true" />
        </span>
        <span className="mt-3 font-cond font-semibold uppercase text-[14px] leading-tight text-paper line-clamp-2 group-hover:text-pink transition-colors">{entry.name}</span>
        {relation && <span className="mt-auto pt-2 font-cond uppercase tracking-[0.1em] text-[9px] text-dim line-clamp-1">{relation}</span>}
      </Link>
    </li>
  )
}

export default async function WhatLinksHerePage({ searchParams }) {
  const { kind, slug, entry: subject } = subjectFrom((await searchParams) || {})

  if (!subject) {
    return (
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[900px] w-full mx-auto flex-1">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'What links here' }]} />
        <div className="data-rail mt-2">PAGE TOOL · BACKLINK INDEX</div>
        <h1 className="mt-4 font-cond font-bold uppercase text-[42px] text-paper">Choose a page first</h1>
        <p className="mt-3 text-[14px] text-dim">Open any archive entry and use its “What links here” page tool, or browse <Link href="/wiki/all" className="text-pink hover:text-paper">all pages</Link>.</p>
      </div>
    )
  }

  const incoming = backlinksFor(kind, slug)
  const outgoing = outgoingFor(subject)

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1100px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: subject.name, href: subject.href }, { label: 'What links here' }]} />
      <div className="data-rail mt-2">PAGE TOOL · LINK GRAPH</div>
      <div className="mt-4">
        <CategoryHeader eyebrow="What links here" title={subject.name} description="The internal link neighbourhood computed from fields and relationships in the archive. No links are inferred from coincidental words." count={incoming.length} countLabel="incoming links" />
      </div>

      <div className="mt-6 space-y-8">
        <section aria-labelledby="incoming-heading">
          <div className="flex items-center gap-3">
            <Link2 size={15} className="text-mint" aria-hidden="true" />
            <h2 id="incoming-heading" className="font-cond font-bold uppercase tracking-[0.12em] text-[14px] text-paper">Pages linking here</h2>
            <span className="ml-auto font-mono text-[10px] text-dim">{incoming.length}</span>
          </div>
          {incoming.length ? <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{incoming.map((entry) => <EntryRow key={entry.href} entry={entry} relation={entry.relation} direction="in" />)}</ul> : <p className="mt-3 panel rounded-sm p-5 text-[13px] text-dim">No pages currently link here. This entry is listed on the lonely-pages maintenance report.</p>}
        </section>

        <section aria-labelledby="outgoing-heading">
          <div className="flex items-center gap-3">
            <ArrowRight size={15} className="text-pink" aria-hidden="true" />
            <h2 id="outgoing-heading" className="font-cond font-bold uppercase tracking-[0.12em] text-[14px] text-paper">Pages linked from here</h2>
            <span className="ml-auto font-mono text-[10px] text-dim">{outgoing.length}</span>
          </div>
          {outgoing.length ? <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{outgoing.map((entry) => <EntryRow key={entry.href} entry={entry} direction="out" />)}</ul> : <p className="mt-3 panel rounded-sm p-5 text-[13px] text-dim">This entry links to no other page. It appears on the dead-end-pages maintenance report.</p>}
        </section>
      </div>

      <p className="mt-7 border-t hairline pt-4 text-[12px] text-dim">Return to <Link href={subject.href} className="text-pink hover:text-paper transition-colors">{subject.name}</Link> · inspect <Link href="/wiki/special/most-linked" className="text-mint hover:text-paper transition-colors">the most-linked pages</Link>.</p>
    </div>
  )
}
