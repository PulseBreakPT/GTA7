'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Link2 } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge } from '@/components/site/ui'
import { KIND_META, backlinksFor, entryFor, outgoingFor } from '@/lib/wiki-graph'

function LinkedRecord({ entry, relation, outward = false }) {
  return (
    <li><Link href={entry.href} className="group flex min-h-[110px] flex-col border border-line bg-white/55 p-4 transition-colors hover:border-pink/55 hover:bg-white">
      <span className="flex items-center gap-2"><span className="flex-1 font-cond text-[10px] font-semibold uppercase tracking-wide text-mint">{KIND_META[entry.kind].label}</span><StatusBadge status={entry.status} /><ArrowRight size={14} className={outward ? 'text-pink' : 'rotate-180 text-mint'} /></span>
      <span className="mt-3 font-cond text-[16px] font-bold uppercase text-paper group-hover:text-pink">{entry.name}</span>
      {relation && <small className="mt-auto pt-2 text-dim">{relation}</small>}
    </Link></li>
  )
}
function Backlinks() {
  const params = useSearchParams()
  const kind = params.get('kind') || ''
  const slug = params.get('slug') || ''
  const subject = entryFor(kind, slug)
  const incoming = subject ? backlinksFor(kind, slug) : []
  const outgoing = subject ? outgoingFor(subject) : []
  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1100px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, ...(subject ? [{ label: subject.name, href: subject.href }] : []), { label: 'What links here' }]} />
      {!subject ? <div className="mt-8"><h1 className="font-cond text-[42px] font-bold uppercase text-paper">Choose a page first</h1><p className="mt-4 text-dim">Open an archive record and choose “What links here”, or <Link href="/wiki/all" className="text-pink">browse all entries</Link>.</p></div> : <>
        <div className="mt-5"><CategoryHeader eyebrow="Page relationships" title={subject.name} description="Discover links into and out of this record, computed from the archive graph." count={incoming.length} countLabel="incoming links" /></div>
        <div className="mt-8 space-y-10">
          <section><h2 className="flex items-center gap-2 font-cond text-[16px] font-bold uppercase text-paper"><Link2 size={17} className="text-mint" /> Pages linking here · {incoming.length}</h2>
            {incoming.length ? <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{incoming.map((entry) => <LinkedRecord key={entry.href} entry={entry} relation={entry.relation} />)}</ul> : <p className="mt-3 rounded-sm border border-line p-4 text-dim">No pages currently link to this entry.</p>}
          </section>
          <section><h2 className="flex items-center gap-2 font-cond text-[16px] font-bold uppercase text-paper"><ArrowRight size={17} className="text-pink" /> Linked from this page · {outgoing.length}</h2>
            {outgoing.length ? <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">{outgoing.map((entry) => <LinkedRecord key={entry.href} entry={entry} outward />)}</ul> : <p className="mt-3 rounded-sm border border-line p-4 text-dim">No outgoing links are recorded for this entry.</p>}
          </section>
        </div>
      </>}
    </div>
  )
}
export default function WhatLinksHerePage() {
  return <Suspense fallback={<div role="status" className="px-5 py-20 text-dim">Loading page relationships…</div>}><Backlinks /></Suspense>
}
