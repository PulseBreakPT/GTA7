import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, BookOpen, Car, Clock3, Compass, Crosshair, FolderTree,
  Globe2, Library, MapPin, Radio, Repeat2, Search, Shield, Shuffle,
  Sparkles, Users, Wrench,
} from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { StatusBadge } from '@/components/site/ui'
import { characters } from '@/lib/content'
import {
  CATEGORIES, CURATED_STARTS, ENTRIES, KIND_META, MOST_LINKED, PORTALS, RECENT, STATS,
  UNCATEGORISED, UNSOURCED, WANTED,
} from '@/lib/wiki-graph'

const TOPICS = [
  ['Characters', 'People, protagonists and documented relationships.', '/database/characters', 'characters', Users],
  ['Vehicles', 'Cars, bikes, boats, aircraft and service vehicles.', '/database/vehicles', 'vehicles', Car],
  ['Weapons', 'Published and observed weapons, grouped by class.', '/database/weapons', 'weapons', Crosshair],
  ['Places', 'Cities, regions, landmarks and named interiors.', '/map', 'locations', MapPin],
  ['World', 'Wildlife, organizations, buildings and businesses.', '/database/world', 'world', Globe2],
  ['Mechanics', 'Systems Rockstar has described or shown in action.', '/database/mechanics', 'mechanics', Repeat2],
  ['Factions', 'Crews, gangs, law enforcement and social groups.', '/gangs-factions', 'factions', Shield],
  ['Radio', 'Stations and tracks identified in published material.', '/database/radio', 'radio', Radio],
]

const countFor = (kind) => STATS.byKind.find((item) => item.kind === kind)?.count || 0
const featured = characters.find((character) => character.slug === 'lucia-caminos') || characters[0]
const recent = RECENT.slice(0, 8)
const popular = MOST_LINKED.slice(0, 6)
const rootCategories = CATEGORIES.filter((category) => category.parents.length === 0).slice(0, 12)

function WikiBox({ id, title, icon: Icon, action, tone = 'pink', children }) {
  return (
    <section className={`wiki-main-box wiki-main-box-${tone}`} aria-labelledby={id}>
      <header>
        <h2 id={id}><Icon size={16} aria-hidden="true" />{title}</h2>
        {action}
      </header>
      <div className="wiki-main-box-body">{children}</div>
    </section>
  )
}

export default function WikiMainPage() {
  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 pb-24 sm:px-6 md:pb-12 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Encyclopedia main page"
          title="Welcome to GTA LORE"
          description="An independent, source-labelled encyclopedia of Grand Theft Auto VI. Browse by subject, follow the evidence behind a claim, or inspect what the archive still needs."
          count={STATS.total}
          countLabel="articles"
          updatedAt={recent[0]?.updatedAt}
          image="/media/key-art/jason-lucia-motel.webp"
          imageAlt="Official GTA VI artwork of Jason and Lucia in a motel room"
        />
      </div>

      <form action="/wiki/search" className="wiki-main-search mt-5" role="search">
        <Search size={19} aria-hidden="true" />
        <label className="sr-only" htmlFor="wiki-main-query">Search the encyclopedia</label>
        <input id="wiki-main-query" name="q" placeholder="Search articles, page text, categories and sources…" autoComplete="off" />
        <button type="submit">Search</button>
      </form>

      <nav className="wiki-main-shortcuts" aria-label="Encyclopedia shortcuts">
        <Link href="/wiki/portals"><Compass size={13} />Topic portals</Link>
        <Link href="/wiki/discover"><Sparkles size={13} />Discover 100</Link>
        <Link href="/wiki/all"><Library size={13} />All pages</Link>
        <Link href="/wiki/categories"><FolderTree size={13} />Categories</Link>
        <Link href="/wiki/changes"><Clock3 size={13} />Recent changes</Link>
        <Link href="/wiki/random"><Shuffle size={13} />Random article</Link>
        <Link href="/wiki/special"><Wrench size={13} />Special pages</Link>
        <Link href="/wiki/help"><BookOpen size={13} />Help</Link>
      </nav>

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)]">
        <div className="space-y-5">
          <WikiBox
            id="featured-article"
            title="Featured article"
            icon={Sparkles}
            action={<Link href={`/database/characters/${featured.slug}`}>Read article <ArrowRight size={12} /></Link>}
          >
            <article className="wiki-featured-article">
              <Link href={`/database/characters/${featured.slug}`} className="wiki-featured-image">
                <Image src={featured.image} alt={featured.name} fill priority sizes="(max-width: 768px) 100vw, 340px" className="object-cover" />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2"><StatusBadge status={featured.status} /><span className="wiki-entry-namespace">Character</span></div>
                <h3><Link href={`/database/characters/${featured.slug}`}>{featured.name}</Link></h3>
                <p>{featured.long}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  <Link href={`/database/characters/${featured.slug}`}>Continue reading</Link>
                  <Link href="/database/characters">More characters</Link>
                </div>
              </div>
            </article>
          </WikiBox>

          <WikiBox
            id="browse-by-topic"
            title="Browse by topic"
            icon={Compass}
            tone="violet"
            action={<Link href="/wiki/categories">All categories <ArrowRight size={12} /></Link>}
          >
            <div className="wiki-topic-directory">
              {TOPICS.map(([label, description, href, kind, Icon]) => (
                <Link key={kind} href={href}>
                  <Icon size={18} aria-hidden="true" />
                  <span><strong>{label}</strong><small>{description}</small></span>
                  <b>{countFor(kind)}</b>
                </Link>
              ))}
            </div>
          </WikiBox>

          <WikiBox
            id="recent-changes"
            title="Recently updated"
            icon={Clock3}
            tone="mint"
            action={<Link href="/wiki/changes">View all changes <ArrowRight size={12} /></Link>}
          >
            <ol className="wiki-recent-list">
              {recent.map((entry) => (
                <li key={entry.href}>
                  <time dateTime={entry.updatedAt}>{entry.updatedAt}</time>
                  <Link href={entry.href}>{entry.name}</Link>
                  <span>{KIND_META[entry.kind].label}</span>
                  <StatusBadge status={entry.status} />
                </li>
              ))}
            </ol>
          </WikiBox>
        </div>

        <aside className="space-y-5" aria-label="Wiki information">
          <WikiBox id="archive-at-a-glance" title="At a glance" icon={Library} tone="violet">
            <dl className="wiki-main-stat-grid">
              <div><dt>Articles</dt><dd>{STATS.total}</dd></div>
              <div><dt>Categories</dt><dd>{STATS.categories}</dd></div>
              <div><dt>Linked sources</dt><dd>{STATS.withSource}</dd></div>
              <div><dt>Connected pages</dt><dd>{STATS.linked}</dd></div>
            </dl>
            <p className="wiki-main-note">Counts come directly from the archive graph and update whenever its records change.</p>
          </WikiBox>

          <WikiBox id="did-you-know" title="Did you know?" icon={Sparkles} tone="mint">
            <ul className="wiki-fact-list">
              <li>The encyclopedia currently spans <strong>{Object.keys(KIND_META).length} namespaces</strong>.</li>
              <li>Every article exposes its categories, backlinks, source label and last verification date.</li>
              <li>The World directory alone contains <strong>{countFor('world')} records</strong> covering Leonida beyond characters and vehicles.</li>
            </ul>
          </WikiBox>

          <WikiBox id="popular-pages" title="Highly connected pages" icon={Globe2}>
            {popular.length ? (
              <ol className="wiki-ranked-list">
                {popular.map((entry, index) => (
                  <li key={entry.href}><span>{index + 1}</span><Link href={entry.href}>{entry.name}</Link><small>{entry.incoming} links</small></li>
                ))}
              </ol>
            ) : <p className="wiki-main-note">Connections will appear as the archive graph grows.</p>}
          </WikiBox>

          <WikiBox id="category-tree" title="Root categories" icon={FolderTree} tone="violet">
            <div className="wiki-category-cloud">
              {rootCategories.map((category) => <Link key={category.slug} href={`/wiki/category/${category.slug}`}>{category.label}<small>{category.members.length}</small></Link>)}
            </div>
          </WikiBox>

          <WikiBox id="topic-portals" title="Topic portals" icon={Compass}>
            <div className="wiki-category-cloud">
              {PORTALS.map((portal) => <Link key={portal.kind} href={`/wiki/portal/${portal.kind}`}>{portal.plural}<small>{portal.entries.length}</small></Link>)}
            </div>
            <p className="wiki-main-note"><Link href="/wiki/discover" className="text-pink">Explore all {CURATED_STARTS.length} curated starting points →</Link></p>
          </WikiBox>

          <WikiBox id="maintenance" title="Wiki maintenance" icon={Wrench} tone="mint">
            <ul className="wiki-maintenance-list">
              <li><Link href="/wiki/special/wanted">Wanted pages</Link><b>{WANTED.length}</b></li>
              <li><Link href="/wiki/special/unsourced">Pages without source links</Link><b>{UNSOURCED.length}</b></li>
              <li><Link href="/wiki/special/uncategorised">Uncategorised pages</Link><b>{UNCATEGORISED.length}</b></li>
              <li><Link href="/wiki/special">All maintenance reports</Link><ArrowRight size={13} /></li>
            </ul>
          </WikiBox>
        </aside>
      </div>

      <footer className="wiki-main-footer">
        <p><strong>GTA LORE</strong> is an independent fan encyclopedia. Evidence labels distinguish official statements, visible material, analysis and rumours.</p>
        <nav aria-label="Wiki footer links"><Link href="/sources">Sources</Link><Link href="/wiki/help">Editing policy</Link><Link href="/legal">Legal</Link><Link href="/wiki/statistics">Statistics</Link></nav>
      </footer>
    </div>
  )
}
