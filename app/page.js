import Image from 'next/image'
import Link from 'next/link'
import { LaunchBar, ReleaseCountdown, SearchTrigger } from '@/components/site/home-client'
import LoreIcon from '@/components/site/lore-icons'
import { GhostBadge, StatusBadge } from '@/components/site/ui'
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
  // O cartão promete regiões, por isso conta-as: eram 81 locais anunciados
  // com uma descrição que incluía as 6 regiões, e o número não fechava.
  { key: 'places', title: 'Places', href: '/map', icon: 'place', count: locations.length + regions.length, image: IMG.viceCity, copy: 'Cities, regions, landmarks and named interiors.' },
  { key: 'world', title: 'World', href: '/database/world', icon: 'world', count: worldEntries.length, image: IMG.swampGator, copy: 'Wildlife, businesses, organisations and culture.' },
  { key: 'mechanics', title: 'Mechanics', href: '/database/mechanics', icon: 'mechanic', count: mechanics.length, image: IMG.ambrosiaDrive, copy: 'Systems Rockstar has described or shown in action.' },
  { key: 'factions', title: 'Factions', href: '/gangs-factions', icon: 'faction', count: factions.length, image: IMG.docksCrew, copy: 'Gangs, crews and named criminal groups.' },
  { key: 'radio', title: 'Radio', href: '/database/radio', icon: 'radio', count: radioStations.length, image: IMG.ambrosiaNight, copy: 'Stations and tracks identified in published media.' },
]

// Os cinco rótulos, e não quatro. «category» existe no glossário, nas
// estatísticas, no mapa e nos filtros; uma legenda que o omita ensina ao
// leitor um vocabulário que o resto do sítio não usa.
const EVIDENCE = [
  ['confirmed', 'Named by Rockstar'],
  ['verified', 'Visible in official media'],
  ['category', 'Class official, member not'],
  ['analysis', 'Archive interpretation'],
  ['rumour', 'Community reporting'],
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
        <Image src={item.image} alt="" fill sizes="(max-width: 600px) 48vw, (max-width: 1000px) 32vw, 24vw" />
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
  // Da mais recente para a mais antiga. Isto seguia a ordem do array, que é
  // a ordem por que as entradas foram escritas no ficheiro: uma notícia nova
  // inserida a meio nunca chegava à entrada do sítio, por mais recente que
  // fosse. A data é que manda, e é ela que o leitor espera ver.
  const porData = [...articles].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
  // Quem abre é a mais recente, e não a mais recente de uma categoria. A
  // escolha anterior — o primeiro artigo «oficial» com fonte da Rockstar —
  // fazia sentido como vitrina editorial, mas escondia da entrada do sítio
  // qualquer notícia mais nova que não fosse um anúncio. A distinção entre
  // anúncio e análise continua a ver-se: está no crachá de cada cartão.
  const official = porData[0]
  const latest = porData.slice(1, 3)
  const cast = characters.filter((character) => character.image).slice(0, 4)
  const recentlyUpdated = [
    ...characters.map((item) => ({ title: item.name, href: `/database/characters/${item.slug}`, kind: 'Character', date: item.updatedAt, status: item.status })),
    ...vehicles.map((item) => ({ title: item.name, href: `/database/vehicles/${item.slug}`, kind: 'Vehicle', date: item.updatedAt, status: item.status })),
    ...locations.map((item) => ({ title: item.name, href: `/map/location/${item.slug}`, kind: 'Place', date: item.updatedAt, status: item.status })),
  ].filter((item) => item.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)
  const claimDesk = porData
    .filter((article) => ['analysis', 'rumour', 'verified'].includes(article.status) || article.category !== 'official')
    .slice(0, 5)
    .map((article) => ({ title: article.title, href: `/news/${article.slug}`, status: article.status, date: article.publishedAt }))

  return (
    <div className="hq-home">
      <LaunchBar releaseDate={extendedLookBrief.releaseDate} />
      <section className="hq-hero" aria-labelledby="home-title">
        <div className="hq-hero-art">
          <Image src={IMG.keyArt} alt="Official Grand Theft Auto VI artwork featuring Lucia Caminos and Jason Duval in Vice City" fill priority sizes="100vw" />
        </div>
        <div className="hq-hero-shade" aria-hidden="true" />
        <div className="hq-hero-content">
          <div className="hq-hero-signal"><i />Grand Theft Auto VI <span> / </span> The independent archive</div>
          <h1 id="home-title"><span>Welcome to</span><strong>Leonida.</strong></h1>
          <p>The people. The places. The details you missed. Explore the world of GTA VI, with the evidence behind every entry.</p>
          <div className="hq-hero-actions">
            <SearchTrigger className="hq-command-trigger" aria-label={`Search ${TOTAL_ENTRIES} records`}>
              <LoreIcon name="search" size={19} />
              <span><strong>Search the archive</strong><small>{TOTAL_ENTRIES.toLocaleString('en-GB')} records to explore</small></span>
              <kbd>⌘ K</kbd>
            </SearchTrigger>
            <Link href="/wiki" className="hq-hero-primary">Explore the wiki <LoreIcon name="arrow" size={17} /></Link>
          </div>
          <div className="hq-hero-meta">
            <span><small>Records</small><strong>{TOTAL_ENTRIES}</strong></span>
            <span><small>Release</small><strong>{extendedLookBrief.releaseDate}</strong></span>
            <span><small>Coverage</small><strong>State of Leonida</strong></span>
          </div>
        </div>
        <div className="hq-hero-caption"><span>Jason Duval & Lucia Caminos</span><small>Official Rockstar Games artwork</small></div>
      </section>

      <nav className="hq-mission-bar" aria-label="Quick actions">
        <SearchTrigger><LoreIcon name="search" /><span><strong>Find a record</strong><small>Instant visual search</small></span></SearchTrigger>
        <Link href="/wiki/discover"><LoreIcon name="compass" /><span><strong>Discover</strong><small>Curated archive trails</small></span></Link>
        <Link href="/map"><LoreIcon name="place" /><span><strong>Visual atlas</strong><small>Six official regions</small></span></Link>
        <Link href="/wiki/changes"><LoreIcon name="changes" /><span><strong>Recent changes</strong><small>Follow every update</small></span></Link>
      </nav>

      <section className="hq-section hq-explore" id="explore">
        <SectionHead index={1} kicker="Explore" title="A world worth knowing." copy="Choose a collection. Follow your curiosity." href="/wiki" action="Browse all entries" />
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
        <SectionHead index={4} kicker="Inside the archive" title="Keep the story in focus." copy="Meet the cast, check the sources and catch up on recent changes." href="/wiki/statistics" action="Archive statistics" />
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
            <header><LoreIcon name="evidence" /><span><small>Know the difference</small><strong>Evidence, explained</strong></span></header>
            <p>Published facts and interpretation stay clearly separated.</p>
            <div>{EVIDENCE.map(([status, label]) => (
              <div key={status} className={`hq-confidence hq-confidence-${status}`}>
                <span><GhostBadge status={status} /><small>{label}</small></span>
              </div>
            ))}</div>
            <Link href="/sources">Read the source policy <LoreIcon name="arrow" size={14} /></Link>
          </section>

          <section className="hq-claim-panel">
            <header><LoreIcon name="analysis" /><span><small>Claims desk</small><strong>Tracked uncertainty</strong></span><Link href="/categories/source-notes-and-claims">Open ledger</Link></header>
            <p>The newest reports, leaks and analyses are deliberately kept visible instead of being flattened into “confirmed”.</p>
            <ol>{claimDesk.map((entry) => (
              <li key={entry.href}>
                <Link href={entry.href}>
                  <StatusBadge status={entry.status} />
                  <span><strong>{entry.title}</strong><small>{entry.date}</small></span>
                  <LoreIcon name="chevron" size={13} />
                </Link>
              </li>
            ))}</ol>
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
