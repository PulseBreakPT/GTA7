import Image from 'next/image'
import Link from 'next/link'
import { LaunchBar, ReleaseCountdown, SearchTrigger } from '@/components/site/home-client'
import LoreIcon from '@/components/site/lore-icons'
import { GhostBadge, StatusBadge } from '@/components/site/ui'
import { isRockstarUrl } from '@/lib/official-links'
import {
  IMG, articles, characters, easterEggs, extendedLookBrief, factions, guides,
  locations, mechanics, radioStations, regions, vehicles, weapons,
} from '@/lib/content'
import { worldEntries } from '@/lib/world-content'

const TOTAL_ENTRIES = characters.length + vehicles.length + weapons.length + locations.length
  + mechanics.length + radioStations.length + factions.length + easterEggs.length
  + worldEntries.length + articles.length + guides.length

const BRANCHES = [
  { key: 'characters', title: 'Characters', href: '/database/characters', icon: 'character', count: characters.length, image: IMG.luciaCaminos, copy: 'People, protagonists and documented relationships.' },
  { key: 'vehicles', title: 'Vehicles', href: '/database/vehicles', icon: 'vehicle', count: vehicles.length, image: IMG.grottiCheetah, copy: 'Road, air and water vehicles by class and maker.' },
  { key: 'weapons', title: 'Weapons', href: '/database/weapons', icon: 'weapon', count: weapons.length, image: IMG.morganRevolvers, copy: 'Published and observed equipment, evidence first.' },
  { key: 'places', title: 'Places', href: '/map', icon: 'place', count: locations.length, image: IMG.viceCity, copy: 'Cities, regions, landmarks and named interiors.' },
  { key: 'world', title: 'World', href: '/database/world', icon: 'world', count: worldEntries.length, image: IMG.swampGator, copy: 'Wildlife, businesses, organisations and culture.' },
  { key: 'mechanics', title: 'Mechanics', href: '/database/mechanics', icon: 'mechanic', count: mechanics.length, image: IMG.ambrosiaDrive, copy: 'Systems Rockstar has described or shown in action.' },
  { key: 'factions', title: 'Factions', href: '/gangs-factions', icon: 'faction', count: factions.length, image: IMG.docksCrew, copy: 'Crews, law enforcement and social groups.' },
  { key: 'radio', title: 'Radio', href: '/database/radio', icon: 'radio', count: radioStations.length, image: IMG.ambrosiaNight, copy: 'Stations and tracks identified in published media.' },
]

const EVIDENCE = [
  ['confirmed', 'Named by Rockstar', 100],
  ['verified', 'Visible in official media', 82],
  ['analysis', 'Archive interpretation', 58],
  ['rumour', 'Community reporting', 28],
]

function SectionHead({ index, kicker, title, copy, href, action = 'View all' }) {
  return (
    <header className="hq-section-head">
      <span className="hq-section-index">{String(index).padStart(2, '0')}</span>
      <div>
        <p>{kicker}</p>
        <h2>{title}</h2>
        {copy && <span>{copy}</span>}
      </div>
      {href && <Link href={href}>{action}<LoreIcon name="arrow" size={15} /></Link>}
    </header>
  )
}

function BranchCard({ item }) {
  return (
    <Link href={item.href} className={`hq-branch-card hq-branch-${item.key}`}>
      <span className="hq-branch-media">
        <Image src={item.image} alt="" fill sizes="(max-width: 720px) 86vw, (max-width: 1200px) 44vw, 28vw" />
      </span>
      <span className="hq-branch-copy">
        <span className="hq-branch-icon"><LoreIcon name={item.icon} size={21} /></span>
        <span>
          <strong>{item.title}</strong>
          <small>{item.copy}</small>
        </span>
        <b>{item.count}</b>
        <LoreIcon name="chevron" size={16} className="hq-branch-arrow" />
      </span>
    </Link>
  )
}

function NewsCard({ article, lead = false }) {
  return (
    <Link href={`/news/${article.slug}`} className={lead ? 'hq-news-lead' : 'hq-news-card'}>
      <span className="hq-news-media">
        <Image src={article.image} alt={article.title} fill sizes={lead ? '(max-width: 900px) 100vw, 58vw' : '(max-width: 900px) 100vw, 28vw'} />
      </span>
      <span className="hq-news-copy">
        <span><StatusBadge status={article.status} /><time>{article.publishedAt}</time></span>
        <strong>{article.title}</strong>
        <small>{article.excerpt}</small>
        <i>Read briefing <LoreIcon name="arrow" size={14} /></i>
      </span>
    </Link>
  )
}

export default function HomePage() {
  const official = articles.find((article) => article.category === 'official' && isRockstarUrl(article.sourceUrl)) || articles[0]
  const latest = articles.filter((article) => article.slug !== official.slug).slice(0, 2)
  const cast = characters.filter((character) => character.image).slice(0, 4)
  const recentlyUpdated = [
    ...characters.map((item) => ({ title: item.name, href: `/database/characters/${item.slug}`, kind: 'Character', date: item.updatedAt, status: item.status })),
    ...vehicles.map((item) => ({ title: item.name, href: `/database/vehicles/${item.slug}`, kind: 'Vehicle', date: item.updatedAt, status: item.status })),
    ...locations.map((item) => ({ title: item.name, href: `/map/location/${item.slug}`, kind: 'Place', date: item.updatedAt, status: item.status })),
  ].filter((item) => item.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)

  return (
    <div className="hq-home">
      <LaunchBar releaseDate={extendedLookBrief.releaseDate} />
      <section className="hq-hero" aria-labelledby="home-title">
        <div className="hq-hero-art">
          <Image src={IMG.keyArt} alt="Official Grand Theft Auto VI artwork featuring Lucia Caminos and Jason Duval in Vice City" fill priority sizes="100vw" />
        </div>
        <div className="hq-hero-shade" aria-hidden="true" />
        <div className="hq-hero-content">
          <div className="hq-hero-signal"><i />Archive live <span>·</span> Independent fan reference</div>
          <h1 id="home-title"><span>Leonida.</span><strong>Every lead.<br />Every frame.</strong></h1>
          <p>{extendedLookBrief.synopsis}</p>
          <div className="hq-hero-actions">
            <SearchTrigger className="hq-command-trigger" aria-label={`Search ${TOTAL_ENTRIES} records`}>
              <LoreIcon name="search" size={19} />
              <span><small>Search the archive</small><strong>People, places, vehicles, evidence…</strong></span>
              <kbd>⌘ K</kbd>
            </SearchTrigger>
            <Link href="/wiki" className="hq-hero-primary">Enter archive <LoreIcon name="arrow" size={17} /></Link>
          </div>
          <div className="hq-hero-meta">
            <span><small>Records</small><strong>{TOTAL_ENTRIES}</strong></span>
            <span><small>Release</small><strong>{extendedLookBrief.releaseDate}</strong></span>
            <span><small>Coverage</small><strong>State of Leonida</strong></span>
          </div>
        </div>
        <div className="hq-hero-stamp" aria-hidden="true"><span>VI</span><small>Field archive<br />Edition 01</small></div>
      </section>

      <nav className="hq-mission-bar" aria-label="Quick actions">
        <SearchTrigger><LoreIcon name="search" /><span><strong>Find a record</strong><small>Instant visual search</small></span></SearchTrigger>
        <Link href="/wiki/discover"><LoreIcon name="compass" /><span><strong>Discover</strong><small>Curated archive trails</small></span></Link>
        <Link href="/map"><LoreIcon name="place" /><span><strong>Visual atlas</strong><small>Six official regions</small></span></Link>
        <Link href="/wiki/changes"><LoreIcon name="changes" /><span><strong>Recent changes</strong><small>Follow every update</small></span></Link>
      </nav>

      <section className="hq-section hq-explore" id="explore">
        <SectionHead index={1} kicker="Choose a route" title="The archive, re-cut" copy="Eight distinct collections. One evidence language." href="/wiki" action="Open full index" />
        <div className="hq-branch-grid">
          {BRANCHES.map((item) => <BranchCard key={item.key} item={item} />)}
        </div>
      </section>

      <section className="hq-section hq-editorial">
        <SectionHead index={2} kicker="Newswire / briefings" title="The latest signal" copy="Announcements separated from analysis and community reporting." href="/news" action="All articles" />
        <div className="hq-news-layout">
          <NewsCard article={official} lead />
          <div className="hq-news-stack">{latest.map((article) => <NewsCard key={article.slug} article={article} />)}</div>
        </div>
      </section>

      <section className="hq-atlas">
        <div className="hq-atlas-intro">
          <SectionHead index={3} kicker="Leonida field atlas" title="Six worlds. One state." copy="Move from neon coastline to wetlands, industrial towns and backcountry without losing the evidence trail." href="/map" action="Launch atlas" />
          <div className="hq-atlas-proof">
            <LoreIcon name="evidence" size={22} />
            <span><strong>Official visual material</strong><small>Regional imagery and names trace back to Rockstar-published media.</small></span>
          </div>
        </div>
        <div className="hq-region-rail">
          {regions.map((region, index) => (
            <Link key={region.id} href={`/map/${region.id}`} className={`hq-region-card hq-region-${region.id}`}>
              <Image src={region.image} alt={`${region.label} official Rockstar postcard`} fill sizes="(max-width: 720px) 82vw, 30vw" />
              <span className="hq-region-wash" />
              <span className="hq-region-copy"><small>{String(index + 1).padStart(2, '0')} · {region.officialType}</small><strong>{region.label}</strong><i>{region.theme}</i></span>
              <LoreIcon name="arrow" size={17} />
            </Link>
          ))}
        </div>
      </section>

      <section className="hq-section hq-pulse">
        <SectionHead index={4} kicker="Live archive" title="People, proof and movement" copy="A compact view of who matters, how claims are labelled and what changed." href="/wiki/statistics" action="State of the archive" />
        <div className="hq-pulse-grid">
          <section className="hq-cast-panel">
            <header><LoreIcon name="relation" /><span><small>Principal files</small><strong>Cast network</strong></span><Link href="/database/characters">All characters</Link></header>
            <div>{cast.map((character) => (
              <Link key={character.slug} href={`/database/characters/${character.slug}`}>
                <span><Image src={character.image} alt={character.name} fill sizes="150px" /></span>
                <strong>{character.name}</strong><small>{character.role}</small>
              </Link>
            ))}</div>
          </section>

          <section className="hq-evidence-panel">
            <header><LoreIcon name="evidence" /><span><small>Source intelligence</small><strong>Evidence strength</strong></span></header>
            <p>A claim’s strength is visible before it is read.</p>
            <div>{EVIDENCE.map(([status, label, value]) => (
              <div key={status} className={`hq-confidence hq-confidence-${status}`}>
                <span><GhostBadge status={status} /><small>{label}</small></span>
                <i><b style={{ width: `${value}%` }} /></i>
              </div>
            ))}</div>
            <Link href="/sources">Read the source policy <LoreIcon name="arrow" size={14} /></Link>
          </section>

          <section className="hq-activity-panel">
            <header><LoreIcon name="changes" /><span><small>Change feed</small><strong>Recently updated</strong></span><Link href="/wiki/changes">Full log</Link></header>
            <ol>{recentlyUpdated.map((entry) => (
              <li key={entry.href}><Link href={entry.href}>
                <i /><span><strong>{entry.title}</strong><small>{entry.kind} · {entry.date}</small></span><LoreIcon name="chevron" size={13} />
              </Link></li>
            ))}</ol>
          </section>
        </div>
      </section>

      <section className="hq-final-call">
        <Image src={IMG.keyArtPier} alt="Official GTA VI artwork of Lucia and Jason by the water" fill sizes="100vw" />
        <span className="hq-final-wash" />
        <div><p>Built for the next clue</p><h2>Don’t just read Leonida.<br />Investigate it.</h2><ReleaseCountdown releaseDate={extendedLookBrief.releaseDate} /><nav><Link href="/wiki/discover">Start a trail <LoreIcon name="arrow" /></Link><Link href="/media">Open visual archive <LoreIcon name="image" /></Link></nav></div>
      </section>
    </div>
  )
}
