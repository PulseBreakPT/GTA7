import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronRight, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ReportedNotes, Breadcrumb, CategoryFooter, CitePage, Hatnote, InfoRow, InfoboxShell, Navbox, PageInformation, PageTools, References, StubNotice, TableOfContents, WhatLinksHere, WhatThisLinks, WikiSection, WikiText } from '@/components/site/wiki'
import { SourceChip, StatusBadge } from '@/components/site/ui'
import { relatedWorldEntries, worldBranches, worldEntries, worldEntryBySlug } from '@/lib/world-content'
import { reportedFor, REPORTED_SOURCE } from '@/lib/reported'

export default async function WorldEntryPage({ params }) {
  const { slug } = await params
  const item = worldEntryBySlug(slug)
  if (!item) notFound()
  const branchMeta = worldBranches.find((branch) => branch.id === item.branch)
  const siblings = worldEntries.filter((entry) => entry.branch === item.branch).sort((a, b) => a.name.localeCompare(b.name))
  const position = siblings.findIndex((entry) => entry.slug === item.slug)
  const previous = position > 0 ? siblings[position - 1] : null
  const next = position < siblings.length - 1 ? siblings[position + 1] : null
  const related = relatedWorldEntries(item)
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'record', label: 'Archive record' },
    { id: 'related', label: 'Related records' },
    { id: 'references', label: 'References' },
  ]

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'World', href: '/database/world' }, { label: item.name }]} />

      <header className="wiki-article-header mt-5">
        <div className="wiki-article-meta flex flex-wrap items-center gap-2"><StatusBadge status={item.status} /><span className="font-cond uppercase tracking-[0.14em] text-[10px] text-mint">{item.type} · {item.branch}</span></div>
        <h1 data-ghost="WORLD" className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase text-paper tracking-tight leading-[0.88] text-[44px] sm:text-[62px]">{item.name}</h1>
        <p className="mt-4 max-w-[70ch] text-paper/85 text-[16px] sm:text-[17px] leading-relaxed"><WikiText exclude={`/database/world/${item.slug}`}>{item.summary}</WikiText></p>
        <StubNotice kind="world" slug={item.slug} />
        <Hatnote kind="world" slug={item.slug} />
      </header>

      <PageTools kind="world" slug={item.slug} />

      <nav className="mt-4 flex flex-wrap items-center gap-2 border-y border-line bg-white/65 px-3 py-2.5" aria-label="World record navigation">
        <Link href={`/database/world?section=${item.branch}`} className="inline-flex min-h-9 items-center gap-1.5 font-cond text-[11px] font-bold uppercase tracking-[0.1em] text-pink hover:text-paper">
          <ArrowLeft size={13} /> {branchMeta?.label || 'World index'}
        </Link>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-dim">{position + 1} / {siblings.length}</span>
        <div className="ml-auto flex items-center gap-1">
          {previous ? <Link href={`/database/world/${previous.slug}`} title={previous.name} className="inline-flex min-h-9 items-center gap-1 border border-line px-2.5 font-cond text-[10px] font-bold uppercase tracking-[0.08em] text-dim hover:border-pink hover:text-pink"><ArrowLeft size={12} /> Previous</Link> : <span className="inline-flex min-h-9 items-center border border-line/50 px-2.5 font-cond text-[10px] font-bold uppercase tracking-[0.08em] text-dim/40">Previous</span>}
          {next ? <Link href={`/database/world/${next.slug}`} title={next.name} className="inline-flex min-h-9 items-center gap-1 border border-line px-2.5 font-cond text-[10px] font-bold uppercase tracking-[0.08em] text-dim hover:border-pink hover:text-pink">Next <ArrowRight size={12} /></Link> : <span className="inline-flex min-h-9 items-center border border-line/50 px-2.5 font-cond text-[10px] font-bold uppercase tracking-[0.08em] text-dim/40">Next</span>}
        </div>
      </nav>

      <div className="wiki-entry-grid mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
        <main id="article-content" className="wiki-entry-primary wiki-article-body min-w-0 order-3 lg:order-1">
          <WikiSection id="record" title="Archive record">
            <ul className="space-y-3 text-[14px] leading-[1.75] text-dim">{item.details.map((detail) => <li key={detail} className="border-l-2 border-mint/50 pl-4"><WikiText exclude={`/database/world/${item.slug}`}>{detail}</WikiText></li>)}</ul>          </WikiSection>
          <WikiSection id="related" title="Related records" className="mb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{related.map((entry) => <Link key={entry.slug} href={`/database/world/${entry.slug}`} className="panel rounded-sm p-4 flex items-center gap-3 hover:border-black/35 transition-colors"><span className="min-w-0 flex-1"><strong className="block font-cond uppercase text-[16px] text-paper truncate">{entry.name}</strong>{(entry.type !== item.type || entry.region !== item.region) && <small className="block mt-1 font-cond uppercase tracking-[0.12em] text-[9px] text-dim">{[entry.type !== item.type && entry.type, entry.region !== item.region && entry.region].filter(Boolean).join(' · ')}</small>}</span><ChevronRight size={14} className="text-dim" /></Link>)}</div>
          </WikiSection>
          <ReportedNotes items={reportedFor('world', item.slug)} source={REPORTED_SOURCE} />
          <References items={item.sourceUrl ? [{ name: item.sourceName, url: item.sourceUrl, retrieved: item.updatedAt }] : []} />
          <CategoryFooter kind="world" slug={item.slug} />
          <CitePage kind="world" slug={item.slug} />
          <PageInformation kind="world" slug={item.slug} />
          <Navbox kind="world" slug={item.slug} />
          <nav className="adjacent-records mt-5 grid gap-2 border-t border-line pt-3" aria-label="Adjacent records">
            {previous ? (
              <Link href={`/database/world/${previous.slug}`} className="group min-w-0 border border-line bg-white px-3 py-2 hover:border-pink">
                <span className="flex items-center gap-1 font-cond text-[9px] font-bold uppercase tracking-[0.14em] text-dim"><ArrowLeft size={11} /> Previous in {branchMeta?.label}</span>
                <strong className="mt-1 block truncate font-cond text-[14px] font-bold uppercase text-paper group-hover:text-pink">{previous.name}</strong>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/database/world/${next.slug}`} className="group col-start-2 min-w-0 border border-line bg-white px-3 py-2 text-right hover:border-pink">
                <span className="flex items-center justify-end gap-1 font-cond text-[9px] font-bold uppercase tracking-[0.14em] text-dim">Next in {branchMeta?.label} <ArrowRight size={11} /></span>
                <strong className="mt-1 block truncate font-cond text-[14px] font-bold uppercase text-paper group-hover:text-pink">{next.name}</strong>
              </Link>
            )}
          </nav>
        </main>

        <aside className="wiki-entry-tertiary order-1 lg:order-2"><TableOfContents sections={sections} /></aside>
        <aside className="wiki-entry-secondary order-2 lg:order-3">
          <InfoboxShell title={item.name} subtitle="World record">
            <div className="space-y-3">
              <InfoRow label="Type" value={item.type} />
              <InfoRow label="Section" value={item.branch} />
              <InfoRow label="Region"><span className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-mint" />{item.region}</span></InfoRow>
              <InfoRow label="Status"><StatusBadge status={item.status} /></InfoRow>
              <InfoRow label="Updated" value={item.updatedAt} />
            </div>
            <div className="border-t border-black/10 pt-4"><SourceChip name={item.sourceName} url={item.sourceUrl} /></div>
            <WhatLinksHere kind="world" slug={item.slug} /><WhatThisLinks kind="world" slug={item.slug} />
          </InfoboxShell>
        </aside>
      </div>
    </div>
  )
}
