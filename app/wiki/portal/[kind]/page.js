import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock3, FolderTree, Library, Search, ShieldCheck, Wrench } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge } from '@/components/site/ui'
import { PORTALS, portalByKind, KIND_META } from '@/lib/wiki-graph'

export function generateStaticParams() {
  return PORTALS.map((portal) => ({ kind: portal.kind }))
}

export function generateMetadata({ params }) {
  const portal = portalByKind(params.kind)
  if (!portal) return { title: 'Topic portal' }
  return {
    title: `${portal.plural} portal`,
    description: `Wiki portal for ${portal.plural.toLowerCase()}: starting points, categories, recent checks and archive coverage.`,
    alternates: { canonical: `/wiki/portal/${portal.kind}` },
  }
}

export default function TopicPortalPage({ params }) {
  const portal = portalByKind(params.kind)
  if (!portal) notFound()
  const coverage = portal.entries.length ? Math.round((portal.sourced / portal.entries.length) * 100) : 0
  const hero = portal.starters.find((entry) => entry.image)?.image

  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Portals', href: '/wiki/portals' }, { label: portal.plural }]} />
      <div className="mt-4">
        <CategoryHeader
          eyebrow={`${portal.label} namespace`}
          title={`${portal.plural} portal`}
          description={`A living gateway to every ${portal.label.toLowerCase()} record: where to begin, how the subject is organised and where the archive needs work.`}
          count={portal.entries.length}
          countLabel="articles"
          updatedAt={portal.recent[0]?.updatedAt}
          image={hero}
          imageAlt={hero ? `Published GTA VI media associated with the ${portal.plural} portal` : undefined}
        />
      </div>

      <nav className="wiki-portal-actions" aria-label={`${portal.plural} portal tools`}>
        <a href="#start"><Library size={13} />Start here</a>
        <a href="#categories"><FolderTree size={13} />Categories</a>
        <a href="#recent"><Clock3 size={13} />Recent checks</a>
        <Link href={`/wiki/random?kind=${portal.kind}`}><ArrowRight size={13} />Random page</Link>
      </nav>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]">
        <div className="space-y-6">
          <section id="start" className="wiki-main-box wiki-main-box-violet scroll-mt-24">
            <header><h2><Library size={16} />Start here</h2><span>{Math.min(12, portal.starters.length)} selected pages</span></header>
            <div className="wiki-main-box-body">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {portal.starters.slice(0, 12).map((entry, index) => (
                  <Link key={entry.href} href={entry.href} className="wiki-entry-tile">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{entry.name}</strong>
                    <StatusBadge status={entry.status} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="categories" className="wiki-main-box wiki-main-box-mint scroll-mt-24">
            <header><h2><FolderTree size={16} />Browse categories</h2><Link href="/wiki/categories">All categories <ArrowRight size={12} /></Link></header>
            <div className="wiki-main-box-body">
              <div className="wiki-portal-categories">
                {portal.categories.slice(0, 18).map((category) => (
                  <Link key={category.slug} href={`/wiki/category/${category.slug}`}><span>{category.label}</span><b>{category.portalCount}</b></Link>
                ))}
              </div>
            </div>
          </section>

          <section id="recent" className="wiki-main-box scroll-mt-24">
            <header><h2><Clock3 size={16} />Recently checked</h2><Link href={`/wiki/changes`}>All changes <ArrowRight size={12} /></Link></header>
            <div className="wiki-main-box-body">
              {portal.recent.length ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {portal.recent.slice(0, 9).map((entry) => (
                  <Link key={entry.href} href={entry.href} className="wiki-entry-tile">
                    <time dateTime={entry.updatedAt}>{entry.updatedAt}</time><strong>{entry.name}</strong><StatusBadge status={entry.status} />
                  </Link>
                ))}
              </div> : <p className="text-[13px] text-dim">No verification date is recorded in this namespace yet.</p>}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="wiki-portal-health">
            <h2><ShieldCheck size={15} />Namespace health</h2>
            <dl>
              <div><dt>Articles</dt><dd>{portal.entries.length}</dd></div>
              <div><dt>Source coverage</dt><dd>{coverage}%</dd></div>
              <div><dt>Connected pages</dt><dd>{portal.connected}</dd></div>
              <div><dt>Stub articles</dt><dd>{portal.stubs}</dd></div>
              <div><dt>Categories</dt><dd>{portal.categories.length}</dd></div>
            </dl>
          </section>

          <section className="wiki-portal-health">
            <h2><Search size={15} />Search this portal</h2>
            <form action="/wiki/search" className="wiki-portal-search"><input name="q" placeholder={`Search ${portal.plural.toLowerCase()}…`} /><input type="hidden" name="type" value={portal.kind} /><button type="submit" aria-label={`Search ${portal.plural}`}><Search size={14} /></button></form>
          </section>

          <section className="wiki-portal-health">
            <h2><Wrench size={15} />Maintenance</h2>
            <nav>
              <Link href="/wiki/special/short">Stub and short pages <b>{portal.stubs}</b></Link>
              <Link href="/wiki/special/orphans">Lonely pages <ArrowRight size={11} /></Link>
              <Link href="/wiki/special/unsourced">Missing source links <b>{portal.entries.length - portal.sourced}</b></Link>
              <Link href="/wiki/special">All reports <ArrowRight size={11} /></Link>
            </nav>
          </section>

          <section className="wiki-portal-health">
            <h2><Library size={15} />Other portals</h2>
            <nav>{PORTALS.filter((item) => item.kind !== portal.kind).map((item) => <Link key={item.kind} href={`/wiki/portal/${item.kind}`}>{item.plural}<b>{item.entries.length}</b></Link>)}</nav>
          </section>
        </aside>
      </div>
    </div>
  )
}
