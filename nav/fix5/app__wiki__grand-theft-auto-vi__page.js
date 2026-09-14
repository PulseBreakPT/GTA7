import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight, CalendarDays, Clapperboard, Code2, Coins,
  Gamepad2, Globe2, History, Landmark, MapPin, Play, Users,
} from 'lucide-react'
import { Breadcrumb } from '@/components/site/wiki'
import GTA6Timeline from '@/components/site/gta6-timeline'

export const metadata = {
  title: 'Grand Theft Auto VI — game dossier',
  description: 'A source-labelled overview of Grand Theft Auto VI: premise, setting, development timeline, creators, investment status and the complete Grand Theft Auto release catalogue.',
  alternates: { canonical: '/wiki/grand-theft-auto-vi' },
  openGraph: {
    type: 'article',
    title: 'Grand Theft Auto VI — game dossier | GTA LORE',
    description: 'The GTA LORE reference page for Grand Theft Auto VI and the history of the series.',
    url: '/wiki/grand-theft-auto-vi',
    images: ['/media/key-art/cover.webp'],
  },
}

const TIMELINE = [
  ['1987', 'DMA Design begins', 'David Jones founds DMA Design in Dundee. The studio later becomes the development lineage known as Rockstar North.'],
  ['1995', 'Race’n’Chase prototype', 'Mike Dailly’s top-down city technology and DMA’s design meetings establish the prototype that evolves into the first Grand Theft Auto.'],
  ['1997', 'The series begins', 'DMA Design releases the first Grand Theft Auto for PC. The original top-down crime sandbox establishes the name, radio-led tone and open-ended city play that the series keeps evolving.'],
  ['1998', 'Rockstar Games is founded', 'Rockstar Games is established as a publisher within the Take-Two group. Its creative identity later becomes inseparable from Grand Theft Auto.'],
  ['1999', 'London packs and GTA 2', 'London 1969, London 1961 and Grand Theft Auto 2 extend the original 2D line before the series changes continuity.'],
  ['2001', 'Grand Theft Auto III', 'Liberty City becomes fully 3D, with cinematic storytelling, radio stations and a new open-world structure that defines the next era.'],
  ['2002–2006', 'Vice City, San Andreas and handheld stories', 'Vice City, San Andreas, Advance, Liberty City Stories and Vice City Stories expand the 3D Universe across several decades and platforms.'],
  ['2008–2009', 'The HD Universe starts', 'Grand Theft Auto IV, The Lost and Damned, The Ballad of Gay Tony and Chinatown Wars introduce the HD continuity.'],
  ['2013', 'Los Santos and GTA Online', 'Grand Theft Auto V launches with three protagonists; GTA Online grows into a persistent, update-driven online world.'],
  ['2018', 'Rockstar consolidates production', 'After Red Dead Redemption 2, Rockstar’s studios increasingly concentrate on the next Grand Theft Auto project. The exact internal start date is not publicly documented.'],
  ['04 Feb 2022', 'Active development confirmed', 'Rockstar publicly confirms that active development on the next Grand Theft Auto entry is well underway. This is the first official development milestone for the project.'],
  ['18 Sep 2022', 'Development footage stolen', 'An unauthorised intrusion exposes early development footage. Rockstar confirms the intrusion and says the breach will not interrupt the project; leaked material is not treated as canon here.'],
  ['05 Dec 2023', 'Trailer 1', 'Rockstar introduces Vice City, the state of Leonida, Lucia and the game’s central criminal partnership.'],
  ['02 May 2025', 'First delay', 'Rockstar moves the planned release from Fall 2025 to 26 May 2026, asking for more time to reach its quality bar.'],
  ['06 May 2025', 'Trailer 2', 'The second trailer expands the cast and shows more of Jason, Lucia and life across Leonida.'],
  ['06 Nov 2025', 'Second delay', 'The scheduled launch moves from 26 May 2026 to 19 November 2026.'],
  ['06 Aug 2026', 'Extended Look announced', 'Rockstar announces a longer look at the game; the in-game footage becomes available on 27 August 2026.'],
  ['19 Nov 2026', 'Scheduled launch', 'Grand Theft Auto VI is currently scheduled for PlayStation 5 and Xbox Series X|S.'],
]

const ARCHIVE_TIMELINE = [
  ['1995', 'Race’n’Chase begins as a different kind of game', 'The surviving design document describes a multiplayer-focused car racing, crashing and police-chase concept. Robberies, vehicle theft and leaving a car gradually became more interesting than the original race-first premise.', 'DESIGN', 'DOCUMENTED'],
  ['1995', 'The first GTA already thought spatially', 'Race’n’Chase tooling represented cities as a 3D array of blocks with textured faces and different heights. The document even discussed worlds up to 256 × 256 × 6 blocks — an early technical ancestor of GTA’s later spatial worlds.', 'TECHNOLOGY', 'DOCUMENTED'],
  ['2001', 'GTA III changes after 9/11', 'Rockstar’s own retrospective rejected the myth of a wholesale rewrite. It described a small set of changes, including one removed terrorist mission, police and dialogue details, and the redesigned North American box art that became a visual signature.', 'CONTEXT', 'OFFICIAL'],
  ['2002', 'PlayStation exclusivity shapes the 3D era', 'Take-Two and Sony agreed to a two-year console exclusivity arrangement covering GTA III and GTA titles released before October 2004; PC versions were excluded from the restriction. It helped cement GTA’s PS2 identity.', 'BUSINESS', 'DOCUMENTED'],
  ['2002', 'Vice City grows beyond an expansion', 'What began as a possible GTA III mission pack with extra weapons, vehicles and missions became a full period setting. Contemporary development accounts describe a compact team and a very short production window by modern AAA standards.', 'DEVELOPMENT', 'REPORTED'],
  ['2004', 'San Andreas becomes one continuous state', 'Rockstar considered separate Los Santos, San Fierro and Las Venturas maps linked by transport. The final decision connected them with countryside and desert, making travel itself part of the sense of scale.', 'DESIGN', 'REPORTED'],
  ['2004', 'Real-world field research becomes a production tool', 'The San Andreas team photographed and filmed California and Nevada locations to ground its fictional cities and neighbourhoods. First-hand research became a recurring Rockstar method for building believable worlds.', 'PRODUCTION', 'REPORTED'],
  ['2005', 'Hot Coffee becomes a regulatory turning point', 'The San Andreas controversy led the ESRB to move the rating from M to AO, retailers to remove the game, and Take-Two to report roughly $24.5M in return-related costs. A revised build restored the M rating.', 'CONTROVERSY', 'DOCUMENTED'],
  ['2008', 'Euphoria makes bodies react instead of replay', 'GTA IV integrated NaturalMotion Euphoria into RAGE so balance, muscle control and environmental reactions could be synthesised dynamically. The result was a shift from only replaying canned animations to simulating response.', 'TECHNOLOGY', 'DOCUMENTED'],
  ['2008', 'Facial animation becomes a production discipline', 'Rockstar worked with Image Metrics on GTA IV facial animation. Public technical reporting described rigs with around 100 joints and roughly 300 minutes of facial animation.', 'TECHNOLOGY', 'REPORTED'],
  ['2008', 'Microsoft buys an advantage around GTA IV', 'Take-Two confirmed $50M in deferred payments associated with two episodic pieces of GTA IV content. The Lost and Damned and The Ballad of Gay Tony first positioned Xbox 360 as the home of those expansions.', 'BUSINESS', 'DOCUMENTED'],
  ['2009–2013', 'Episodes help shape the three-protagonist idea', 'Rockstar’s enjoyment of intersecting GTA IV protagonist stories fed into the question of what would happen if multiple protagonists shared one game. That path led to Michael, Franklin and Trevor in GTA V.', 'STORY', 'REPORTED'],
  ['2013', 'GTA V is built by a global Rockstar team', 'Rockstar North led a core team of roughly 360 people while more than 1,000 contributors across Rockstar studios worked on the wider production. GTA’s scale had become an organisational challenge as much as a design challenge.', 'PRODUCTION', 'REPORTED'],
  ['2013', 'GTA Online survives its launch crisis', 'The first weeks brought overloaded servers, failed matchmaking, cloud errors and lost progress. Rockstar’s official response included a GTA$500,000 stimulus for eligible players — a rough beginning for the platform it would become.', 'ONLINE', 'OFFICIAL'],
  ['2013–2022', 'A mode becomes a platform', 'Heists, businesses, clubs, bunkers, nightclubs, casinos, Cayo Perico, vehicle culture and criminal careers turned GTA Online from a multiplayer component into a long-running live service.', 'ONLINE', 'DOCUMENTED'],
  ['2014', 'First-person mode is a redevelopment, not a toggle', 'The PS4 and Xbox One versions added first-person controls, a new cover system, new aiming behaviour and thousands of animations. They also raised traffic, wildlife, music and online-session targets.', 'TECHNOLOGY', 'OFFICIAL'],
  ['2015', 'Early GTA VI work is reported to begin', 'Recent public comments attributed to Rockstar North co-lead Rob Nelson place GTA VI development in 2015. Rockstar has not published a definitive internal start milestone, so this remains a reported date rather than the official public record.', 'DEVELOPMENT', 'REPORTED'],
  ['2022', 'GTA+ adds a subscription layer', 'Rockstar introduced GTA+ for current-generation GTA Online, adding recurring benefits such as monthly GTA$, properties, bonuses and discounts. The franchise’s commercial model now included boxed releases, DLC, microtransactions and subscriptions.', 'BUSINESS', 'OFFICIAL'],
  ['2022', 'A network intrusion becomes a separate security record', 'Take-Two’s SEC disclosure confirmed unauthorised access to confidential Rockstar information, including early GTA development footage. The archive records the event as a security incident, not as a canon source.', 'LEAK', 'OFFICIAL'],
  ['2023', 'Trailer 1 is published early after a leak', 'Rockstar had scheduled the first GTA VI trailer for 5 December. After a low-quality version appeared online, Rockstar released the official trailer immediately rather than letting the leak define the reveal.', 'MARKETING', 'OFFICIAL'],
  ['2024', 'Security changes GTA VI working arrangements', 'Bloomberg reported that Rockstar asked staff to return to the office five days per week as GTA VI moved through critical development. The report cited security and productivity concerns; it is not an official production start date.', 'PRODUCTION', 'REPORTED'],
  ['2015–2026', 'Long production changes the writing problem', 'Recent comments attributed to Rockstar North co-lead Rob Nelson describe a challenge unique to long development cycles: satire chosen early can become dated before release. The archive marks this as reported commentary, not a GTA VI feature confirmation.', 'DEVELOPMENT', 'REPORTED'],
]

const CATALOGUE = [
  {
    label: 'The original 2D line',
    note: 'Early top-down releases and the London expansion set.',
    games: ['Grand Theft Auto (1997)', 'Grand Theft Auto: London 1969 (1999)', 'Grand Theft Auto: London 1961 (1999)', 'Grand Theft Auto 2 (1999)'],
  },
  {
    label: 'The 3D-era catalogue',
    note: 'The connected Liberty City, Vice City and San Andreas era, plus handheld stories.',
    games: ['Grand Theft Auto III (2001)', 'Grand Theft Auto: Vice City (2002)', 'Grand Theft Auto: San Andreas (2004)', 'Grand Theft Auto Advance (2004)', 'Grand Theft Auto: Liberty City Stories (2005)', 'Grand Theft Auto: Vice City Stories (2006)'],
  },
  {
    label: 'The HD-era catalogue',
    note: 'The modern continuity that leads to Leonida and GTA VI.',
    games: ['Grand Theft Auto IV (2008)', 'Grand Theft Auto IV: The Lost and Damned (2009)', 'Grand Theft Auto: The Ballad of Gay Tony (2009)', 'Grand Theft Auto: Chinatown Wars (2009)', 'Grand Theft Auto V (2013)', 'Grand Theft Auto Online (2013)', 'Grand Theft Auto VI (scheduled 2026)'],
  },
  {
    label: 'Modern re-releases',
    note: 'Official collections and platform editions — not new story universes.',
    games: ['Grand Theft Auto: Episodes from Liberty City (2009 compilation)', 'Grand Theft Auto: The Trilogy (2003)', 'Grand Theft Auto: The Trilogy — The Definitive Edition (2021)', 'Grand Theft Auto: The Trilogy — The Definitive Edition on mobile and Netflix (2023)'],
  },
]

const FACTS = [
  ['Developer', 'Rockstar Games'],
  ['Publisher', 'Rockstar Games · Take-Two Interactive'],
  ['Setting', 'Leonida · Vice City and beyond'],
  ['Protagonists', 'Jason Duval · Lucia Caminos'],
  ['Platforms', 'PlayStation 5 · Xbox Series X|S'],
  ['Release', '19 November 2026 · scheduled'],
  ['Public development record', '4 years, 7 months since 04 Feb 2022'],
  ['Budget', 'Not disclosed by Rockstar or Take-Two'],
]

const STATS = [
  ['Franchise reach', '470M+', 'Grand Theft Auto units sold-in across the series, reported by Take-Two in May 2026.'],
  ['GTAV sold-in', '230M', 'Grand Theft Auto V units sold-in to date in Take-Two’s 2026 investor material.'],
  ['GTAV generations', '3', 'The fifth mainline game released across three console generations.'],
  ['Trailer 1 debut', '93M / 24h', 'YouTube views for Trailer 1 in its first day, according to Take-Two.'],
  ['Trailer 2 debut', '475M / 24h', 'Cross-platform views reported for Trailer 2 in its first day.'],
  ['Known named cast', '26', 'GTA Intel’s current tracker of officially revealed GTA VI characters.'],
  ['Main regions', '6', 'Vice City plus five named regions shown across Rockstar’s postcards and material.'],
  ['Publicly confirmed dev', '4y 7m', 'From Rockstar’s 4 February 2022 confirmation to 9 September 2026.'],
]

const RELEASE_CHRONOLOGY = [
  ['Grand Theft Auto', '2D Universe', '1997', 'Liberty City · San Andreas · Vice City', 'PC · PlayStation · Game Boy Color'],
  ['Grand Theft Auto: London 1969', '2D Universe', '1999', 'London', 'PC · PlayStation'],
  ['Grand Theft Auto: London 1961', '2D Universe', '1999', 'London · Manchester multiplayer', 'PC'],
  ['Grand Theft Auto 2', '2D Universe', '1999', 'Anywhere City', 'PC · PlayStation · Dreamcast · Game Boy Color'],
  ['Grand Theft Auto III', '3D Universe', '2001', 'Liberty City', 'PS2 · PC · Xbox · mobile'],
  ['Grand Theft Auto: Vice City', '3D Universe', '2002', 'Vice City · 1986', 'PS2 · PC · Xbox · mobile'],
  ['Grand Theft Auto: San Andreas', '3D Universe', '2004', 'State of San Andreas · 1992', 'PS2 · Xbox · PC · mobile'],
  ['Grand Theft Auto Advance', '3D Universe', '2004', 'Liberty City · 2000', 'Game Boy Advance'],
  ['Grand Theft Auto: Liberty City Stories', '3D Universe', '2005', 'Liberty City · 1998', 'PSP · PS2 · mobile'],
  ['Grand Theft Auto: Vice City Stories', '3D Universe', '2006', 'Vice City · 1984', 'PSP · PS2'],
  ['Grand Theft Auto IV', 'HD Universe', '2008', 'Liberty City · 2008', 'PS3 · Xbox 360 · PC'],
  ['The Lost and Damned', 'HD Universe', '2009', 'Liberty City · 2008', 'PS3 · Xbox 360 · PC'],
  ['The Ballad of Gay Tony', 'HD Universe', '2009', 'Liberty City · 2008', 'PS3 · Xbox 360 · PC'],
  ['Grand Theft Auto: Chinatown Wars', 'HD Universe', '2009', 'Liberty City · 2009', 'Nintendo DS · PSP · mobile'],
  ['Grand Theft Auto V', 'HD Universe', '2013', 'Los Santos · Blaine County · 2013', 'PS3 · Xbox 360 · PS4 · Xbox One · PC · PS5 · Xbox Series'],
  ['Grand Theft Auto Online', 'HD Universe', '2013–present', 'Southern San Andreas', 'PS3 · Xbox 360 · PS4 · Xbox One · PC · PS5 · Xbox Series'],
]

const PRODUCTION_SCALE = [
  ['Grand Theft Auto', 'Not disclosed', 'No audited public budget has been published for the original game.'],
  ['Grand Theft Auto: Vice City', '≈ $5M reported', 'Historical press reporting; not a Rockstar-published audited figure.'],
  ['Grand Theft Auto: San Andreas', '≈ $10M reported', 'Contemporary reporting described it as roughly twice Vice City’s production scale.'],
  ['Grand Theft Auto IV', '≈ $100M estimated', 'A producer estimate for development; it should not be read as a complete marketing budget.'],
  ['Grand Theft Auto V', '$137M development estimate', 'External reporting also placed development plus marketing around $265–276M; Rockstar did not confirm the total.'],
  ['Grand Theft Auto VI', 'Not disclosed', 'External $1–2B claims combine assumptions about long-term development and marketing and remain unconfirmed.'],
]

const TECH_ERAS = [
  ['2D Universe', 'GTA · London 1969 · London 1961 · GTA 2', 'Top-down cities, vehicle theft, police pursuit and mission networks.'],
  ['3D Universe', 'GTA III → Vice City → San Andreas → Advance → LCS → VCS', 'Full 3D cities, RenderWare-era technology, cinematic radio and expanded character systems.'],
  ['HD Universe', 'GTA IV → Episodes → Chinatown Wars → GTA V → GTA Online → GTA VI', 'RAGE, Euphoria, advanced physics, denser simulation and increasingly systemic worlds.'],
]

const BUSINESS_MILESTONES = [
  ['1998', 'Take-Two acquires BMG Interactive assets', 'The transaction transferred publishing and sequel rights associated with Grand Theft Auto; Take-Two’s filing records 1.85 million convertible preferred shares as consideration.'],
  ['1998', 'Rockstar Games is established', 'Sam Houser, Dan Houser, Terry Donovan, Jamie King and Gary Foreman form the publishing label that becomes GTA’s modern home.'],
  ['1999', 'Take-Two acquires DMA Design', 'The Scottish developer behind GTA is acquired for approximately $11M in cash including assumed debt, later becoming the studio lineage known as Rockstar North.'],
  ['2002', 'DMA Design becomes Rockstar North', 'The name aligns the Dundee development studio with the Rockstar label after GTA III establishes the 3D era.'],
  ['2013–2026', 'GTA Online reshapes the release model', 'Rockstar continues funding a living online platform while the next numbered GTA moves through pre-production, production and marketing.'],
]

const REGIONS = [
  ['Vice City', 'The neon-soaked metropolitan core, with Ocean Beach and Little Cuba among the named districts shown in official material.', '/media/places/vice-city.webp'],
  ['Leonida Keys', 'A tropical archipelago of marinas, beaches, boats and the working world around Brian Heder.', '/media/places/leonida-keys.webp'],
  ['Port Gellhorn', 'A weathered coastal port with motels, local businesses and a rougher, more industrial edge.', '/media/places/port-gellhorn.webp'],
  ['Grassrivers', 'Everglades-style wetlands with mangroves, airboats, alligators and long stretches of open water.', '/media/places/grassrivers.webp'],
  ['Ambrosia', 'A blue-collar inland region associated with a sugar refinery, biker groups and working neighbourhoods.', '/media/places/ambrosia.webp'],
  ['Mount Kalaga National Park', 'Northern mountain country shown in official postcards and screenshots, with outdoor exploration and trails.', '/media/places/mount-kalaga.webp'],
]

const CAST = [
  ['Jason Duval', 'Playable protagonist', 'An ex-military drug runner trying to build a better life in Leonida.'],
  ['Lucia Caminos', 'Playable protagonist', 'A fighter recently released from prison and determined to change her odds.'],
  ['Cal Hampton', 'Jason’s friend', 'A paranoid Coast Guard-radio listener and associate of Brian Heder.'],
  ['Brian Heder', 'Keys operator', 'A veteran drug runner operating from a boat yard in the Keys.'],
  ['Boobie Ike', 'Vice City operator', 'A local legend with real-estate, club and music interests.'],
  ["Dre'Quan Priest", 'Music entrepreneur', 'An aspiring music mogul working with Boobie Ike at Only Raw Records.'],
  ['Real Dimez', 'Rap duo', 'Bae-Luxe and Roxy, whose comeback is tied to Only Raw Records.'],
  ['Raul Bautista', 'Bank robber', 'A charismatic, reckless robber hunting for the next score.'],
  ['Lori Heder', 'Supporting character', 'Brian’s wife and a visible part of the boat-yard operation.'],
  ['Méndez', 'Law enforcement', 'A VCPD officer shown pursuing Jason, Lucia and their associates.'],
  ['Wyman', 'Mechanic / collector', 'A local fixer associated with Wyman’s World Auto Salvage and classic cars.'],
  ['Valentina & Petra Navarro', 'Business figures', 'A link between the protagonists and the Megamundo opening event.'],
]

const SYSTEMS = [
  ['Dual-protagonist switching', 'Jason and Lucia can be switched during free roam and story sequences; the system is single-player character switching, not announced online co-op.'],
  ['Equipment wheel', 'The redesigned wheel groups weapons with practical gear such as binoculars, body armour, a flashlight, food, drinks and trauma kits in the material analysed by GTA Intel.'],
  ['Smarter vehicle theft', 'The Extended Look shows a loud forced entry and a quieter slim-jim approach, making the way a car is stolen part of the moment-to-moment choice.'],
  ['Drive-by combat', 'Published footage shows combat from cars and other vehicles, with the wider system still being documented as more weapons are revealed.'],
  ['Stealth and cover', 'Crouching, cover and quieter approaches give missions more than one way to enter a confrontation.'],
  ['Vehicle interiors', 'First-person driving, working gauges and mirrors are among the details reported from the Extended Look.'],
  ['Wanted-level evasion', 'The six-star level returns in the showcase; changing vehicles, destroying evidence and changing clothes are shown as ways to break pursuit.'],
  ['Life-sim layer', 'Exercise, food, sleep, haircuts, outfits and body changes are presented as systems that affect how Jason and Lucia look and play.'],
  ['Reactive population', 'NPCs react to visible weapons before a shot is fired, with denser crowds and more varied bodies, clothing and behaviour.'],
  ['Phone and social feeds', 'The protagonists’ phones expose in-world social posts and the rise of Real Dimez as part of the living world.'],
]

const ACTIVITIES = [
  'Basketball', 'Boxing / fighting', 'Fishing', 'Gym / working out', 'Hunting', 'Kayaking',
  'Mini golf', 'Off-road races', 'Parachuting', 'Pool', 'Scuba diving', 'Sea races',
  'Shooting range', 'Street races', 'Wrestling', 'Classic-car commissions',
]

const EVIDENCE = [
  ['Officially confirmed', 'Title, protagonists, Leonida setting, platforms, scheduled launch, trailers and Rockstar’s Extended Look.'],
  ['Shown or described', 'Named regions, supporting cast, activities, wildlife, vehicle handling and systems visible in promotional footage.'],
  ['Tracked by databases', 'GTA Base, GTA Intel and GTA Wiki maintain living lists that change as new screenshots and trailers appear.'],
  ['Not treated as fact', 'Leaked builds, exact map size, final vehicle totals, final weapon totals, PC timing and any unannounced online mode.'],
]

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="gta6-section scroll-mt-24" data-content-priority="primary">
      <div className="gta6-section-heading">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function SourceLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer" className="gta6-source-link">{children}<ArrowUpRight size={12} aria-hidden="true" /></a>
}

export default function GrandTheftAutoVIPage() {
  return (
    <div className="gta6-dossier ambient-bloom mx-auto w-full max-w-[1400px] px-4 pb-24 pt-5 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Grand Theft Auto VI' }]} />

      <header className="gta6-hero mt-4">
        <div className="gta6-hero-copy">
          <div className="gta6-kicker"><Gamepad2 size={14} aria-hidden="true" /> Game dossier · HD universe</div>
          <h1>Grand Theft Auto VI</h1>
          <p className="gta6-lede">The next mainline Grand Theft Auto is set in Leonida, a fictional state built around Vice City. Rockstar’s official premise follows Jason Duval and Lucia Caminos as a score gone wrong pulls them into a conspiracy that stretches across the state.</p>
          <div className="gta6-hero-actions">
            <a href="https://www.rockstargames.com/VI" target="_blank" rel="noreferrer" className="gta6-primary-action"><Play size={14} fill="currentColor" aria-hidden="true" /> Official GTA VI site</a>
            <Link href="#timeline" className="gta6-secondary-action"><History size={14} aria-hidden="true" /> Read the timeline</Link>
          </div>
          <div className="gta6-status-line"><span className="gta6-live-dot" /> Scheduled for 19 November 2026 · last checked 09 September 2026</div>
        </div>
        <div className="gta6-hero-media">
          <Image src="/media/key-art/cover.webp" alt="Official Grand Theft Auto VI cover artwork" fill priority sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" />
          <span className="gta6-media-caption">Official Rockstar artwork</span>
        </div>
      </header>

      <nav className="gta6-contents" aria-label="GTA VI dossier contents">
        <span>On this page</span>
        <a href="#overview">Overview</a><a href="#facts">Facts</a><a href="#statistics">Stats</a><a href="#world">World</a><a href="#cast">Cast</a><a href="#systems">Systems</a><a href="#timeline">Timeline</a><a href="#archive-signals">Signals</a><a href="#creators">Creators</a><a href="#business">Business</a><a href="#investment">Investment</a><a href="#technology">Technology</a><a href="#catalogue">GTA catalogue</a><a href="#sources">Sources</a>
      </nav>

      <div className="gta6-layout">
        <div>
          <Section id="overview" eyebrow="01 · What it is" title="A new Leonida, built for two">
            <div className="gta6-prose">
              <p><strong>Grand Theft Auto VI</strong> is Rockstar Games’ next mainline open-world action game. The confirmed setting is the state of Leonida, including Vice City and surrounding regions such as the Keys and rural areas shown in Rockstar’s published material. The story is centred on <Link href="/database/characters/jason-duval">Jason Duval</Link> and <Link href="/database/characters/lucia-caminos">Lucia Caminos</Link>, whose relationship is part of the game’s core premise.</p>
              <p>Rockstar describes the game as the biggest and most immersive evolution of the series yet. That is a publisher description, not a promise that every rumoured feature is confirmed: this page separates released facts from archive interpretation and keeps unannounced details out.</p>
            </div>
            <div className="gta6-pillars">
              <article><MapPin size={18} /><strong>Leonida</strong><span>Vice City, coastline, Keys and the wider state.</span></article>
              <article><Users size={18} /><strong>Jason & Lucia</strong><span>A criminal partnership under pressure.</span></article>
              <article><Clapperboard size={18} /><strong>Single-player story</strong><span>The announced edition centres on their story.</span></article>
            </div>
          </Section>

          <Section id="facts" eyebrow="02 · At a glance" title="The confirmed record">
            <dl className="gta6-facts-grid">
              {FACTS.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </Section>

          <Section id="statistics" eyebrow="03 · Scale of the series" title="GTA VI in numbers">
            <div className="gta6-stat-grid">{STATS.map(([label, value, note]) => <article key={label}><strong>{value}</strong><h3>{label}</h3><p>{note}</p></article>)}</div>
            <p className="gta6-section-intro gta6-stat-footnote">Sales figures are Take-Two “sold-in” figures, not unique players. Trailer totals are launch-window platform views. They are snapshots of the source dates, not a live counter.</p>
          </Section>

          <Section id="world" eyebrow="04 · Leonida" title="The world beyond Vice City">
            <p className="gta6-section-intro">Rockstar’s official postcards and promotional material identify six major Leonida areas. The exact playable boundaries and final map layout have not been published. Claims that attach a precise square-mile figure or a definitive “twice as large” measurement remain unofficial.</p>
            <div className="gta6-region-grid">{REGIONS.map(([name, copy, image]) => <article key={name}><div className="gta6-region-image"><Image src={image} alt={`${name} official GTA VI artwork`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" className="object-cover" /></div><div className="gta6-region-body"><h3>{name}</h3><p>{copy}</p></div></article>)}</div>
            <div className="gta6-world-note"><Globe2 size={18} /><p><strong>Map status:</strong> the official map has not been released. Community reconstructions and leaked development maps are kept out of the confirmed record unless Rockstar publishes or corroborates them.</p></div>
          </Section>

          <Section id="cast" eyebrow="05 · People and relationships" title="The published GTA VI cast">
            <p className="gta6-section-intro">This is the named cast surfaced through Rockstar’s trailers, Newswire biographies and official promotional material, cross-checked against the living character indexes at GTA Base, GTA Intel and GTA Wiki. It is not a leak list.</p>
            <div className="gta6-cast-grid">{CAST.map(([name, role, copy]) => <article key={name}><div><h3>{name}</h3><span>{role}</span></div><p>{copy}</p></article>)}</div>
          </Section>

          <Section id="systems" eyebrow="06 · How it plays" title="Gameplay systems currently documented">
            <div className="gta6-system-grid">{SYSTEMS.map(([title, copy], index) => <article key={title}><b>{String(index + 1).padStart(2, '0')}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
            <div className="gta6-activity-panel"><div><span>Activities and side content</span><p>Lists maintained by the GTA VI databases include the following activities shown or mentioned in official material. “Seen” does not always mean a full mission chain has been announced.</p></div><ul>{ACTIVITIES.map((activity) => <li key={activity}>{activity}</li>)}</ul></div>
          </Section>

          <Section id="timeline" eyebrow="07 · Public record" title="Development and release timeline">
            <ol className="gta6-timeline">
              {TIMELINE.map(([date, title, copy]) => <li key={date}><time>{date}</time><div><h3>{title}</h3><p>{copy}</p></div></li>)}
            </ol>
            <aside className="gta6-callout"><CalendarDays size={18} /><p><strong>How long has GTA VI been in development?</strong> The only firm public start point is Rockstar’s 4 February 2022 confirmation that active development was well underway. On 9 September 2026, that is 4 years and 7 months. Earlier internal work is widely reported but Rockstar has not published a definitive start date, so this page does not present a longer number as fact.</p></aside>
          </Section>

          <Section id="archive-signals" eyebrow="07A · Archive signals" title="The turning points behind the games">
            <p className="gta6-section-intro">This second timeline is deliberately not another release list. It maps the design decisions, production methods, business deals, controversies, online milestones and security events that changed what Grand Theft Auto could be. Filter the signal you want to follow.</p>
            <GTA6Timeline events={ARCHIVE_TIMELINE} />
          </Section>

          <Section id="creators" eyebrow="08 · People and studios" title="Who created Grand Theft Auto?"><div className="gta6-creator-grid">
            <article><Landmark size={18} /><h3>The first GTA</h3><p>The original <em>Grand Theft Auto</em> was made by DMA Design, the Dundee studio that later became Rockstar North. The project is credited to the early DMA team, with David Jones as the studio founder and Mike Dailly as the programmer behind the prototype that became the game.</p><span className="gta6-note">Historical record · 1997</span></article>
            <article><Users size={18} /><h3>Rockstar founders</h3><p>Rockstar Games was founded in 1998 by Sam Houser, Dan Houser, Terry Donovan, Jamie King and Gary Foreman. There is no official “first founder” ranking; Sam Houser is commonly described as co-founder and founding president, and Rockstar’s own 25th-anniversary message is signed by him.</p><span className="gta6-note">Corporate record · 1998</span></article>
            <article><Code2 size={18} /><h3>The studio behind VI</h3><p>GTA VI is being made under the Rockstar Games label, within Take-Two Interactive. Rockstar’s public materials identify the label and the game, while detailed staff credits will only be complete when the final release ships.</p><span className="gta6-note">Credits pending release</span></article>
          </div></Section>

          <Section id="business" eyebrow="09 · Ownership and structure" title="The business history behind GTA">
            <div className="gta6-business-grid">{BUSINESS_MILESTONES.map(([date, title, copy]) => <article key={`${date}-${title}`}><time>{date}</time><h3>{title}</h3><p>{copy}</p></article>)}</div>
            <p className="gta6-section-intro gta6-stat-footnote">The BMG transaction is documented in Take-Two’s corporate filing. The DMA acquisition value is a historical transaction figure, not a GTA development budget.</p>
          </Section>

          <Section id="investment" eyebrow="10 · Money, carefully labelled" title="Investment across the franchise">
            <div className="gta6-investment-grid">
              <article className="gta6-investment-main"><Coins size={20} /><strong>No official budget has been published.</strong><p>Rockstar and Take-Two have not disclosed a verified Grand Theft Auto VI development or marketing budget. Viral figures such as “$1 billion” or “$2 billion” are estimates, extrapolations or rumours — not an audited GTA VI line item — and are therefore not presented here as fact.</p></article>
              <div className="gta6-investment-side"><div><span>Publisher parent</span><b>Take-Two Interactive</b></div><div><span>Public financial signal</span><b>Record FY2027 outlook tied to the launch window</b></div><div><span>Archive status</span><b>Budget · not disclosed</b></div></div>
            </div>
            <div className="gta6-production-table-wrap"><table className="gta6-production-table"><caption>Reported and estimated production scale</caption><thead><tr><th>Game</th><th>Figure</th><th>How to read it</th></tr></thead><tbody>{PRODUCTION_SCALE.map(([game, figure, note]) => <tr key={game}><th scope="row">{game}</th><td>{figure}</td><td>{note}</td></tr>)}</tbody></table></div>
          </Section>

          <Section id="technology" eyebrow="11 · Technology and design" title="How GTA changed from era to era">
            <div className="gta6-tech-grid">{TECH_ERAS.map(([era, games, copy]) => <article key={era}><span>{era}</span><h3>{games}</h3><p>{copy}</p></article>)}</div>
            <div className="gta6-tech-strip"><strong>1997</strong><span>open crime sandbox</span><b>→</b><strong>2001</strong><span>fully 3D city</span><b>→</b><strong>2004</strong><span>explorable state</span><b>→</b><strong>2008</strong><span>HD simulation</span><b>→</b><strong>2013</strong><span>persistent online world</span><b>→</b><strong>2026</strong><span>Leonida-scale current generation</span></div>
          </Section>

          <Section id="catalogue" eyebrow="12 · The complete release line" title="Every GTA game, by archive universe">
            <p className="gta6-section-intro">The labels below are a useful archive taxonomy used by fans and historians. Rockstar’s official pages market the games by title and era; they do not publish a single canonical “universe table”. Re-releases are separated from original story releases.</p>
            <div className="gta6-catalogue-grid">{CATALOGUE.map((group) => <article key={group.label}><header><span>{group.label}</span><small>{group.note}</small></header><ul>{group.games.map((game) => <li key={game}><span>{game}</span><b>→</b></li>)}</ul></article>)}</div>
            <div className="gta6-release-table-wrap">
              <table className="gta6-release-table"><caption>Original releases before GTA VI</caption><thead><tr><th>Title</th><th>Universe</th><th>Release</th><th>Setting</th><th>Original platforms</th></tr></thead><tbody>{RELEASE_CHRONOLOGY.map(([title, universe, release, setting, platforms]) => <tr key={title}><th scope="row">{title}</th><td>{universe}</td><td>{release}</td><td>{setting}</td><td>{platforms}</td></tr>)}</tbody></table>
            </div>
          </Section>

          <Section id="evidence" eyebrow="13 · Read the labels" title="What is confirmed, observed or unknown">
            <div className="gta6-evidence-grid">{EVIDENCE.map(([label, copy]) => <article key={label}><h3>{label}</h3><p>{copy}</p></article>)}</div>
          </Section>

          <Section id="sources" eyebrow="14 · Trace the evidence" title="Official and research sources"><div className="gta6-source-grid">
            <SourceLink href="https://www.rockstargames.com/VI">Rockstar · Grand Theft Auto VI official site</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/ak73k92o47ko75/grand-theft-auto-community-update">Rockstar · active development confirmation</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now">Rockstar · Trailer 1</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now">Rockstar · Trailer 2</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026">Rockstar · May 2026 release update</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/4kok877a13aa32/a-message-from-rockstar-games">Rockstar · 25 years / foundation message</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/25o241181oaa23/grand-theft-auto-iii-your-questions-answered-part-two-911-the-gh.html">Rockstar · GTA III and the 9/11 retrospective</SourceLink>
            <SourceLink href="https://www.rockstargames.com/newswire/article/25o24118157k18/the-gta-online-stimulus-package-direct-deposit.html">Rockstar · GTA Online stimulus package</SourceLink>
            <SourceLink href="https://ia601000.us.archive.org/28/items/vghf_design_doc_archive/Grand-Theft-Auto-Design-Document_text.pdf">Archived · 1995 Race’n’Chase design document</SourceLink>
            <SourceLink href="https://ir.take2games.com/static-files/0e369b39-2afc-4a88-b917-7799cd6ac566?pubDate=20260524">Take-Two · franchise sales and trailer statistics</SourceLink>
            <SourceLink href="https://ir.take2games.com/static-files/c405536d-6b69-44f5-973a-7f141e97ce2e">Take-Two · BMG Interactive acquisition filing</SourceLink>
            <SourceLink href="https://ir.take2games.com/static-files/5baba02b-007b-41f7-bcaf-1ee583ce9e4c">Take-Two · GTA IV launch statistics</SourceLink>
            <SourceLink href="https://www.rockstargames.com/VI/an-extended-look">Rockstar · Extended Look</SourceLink>
            <SourceLink href="https://ir.take2games.com/node/32311/pdf">Take-Two · launch and pre-order announcement</SourceLink>
            <SourceLink href="https://www.rockstargames.com/GTATrilogy">Rockstar · official GTA trilogy catalogue</SourceLink>
            <SourceLink href="https://www.gtabase.com/grand-theft-auto-6/">GTABase · GTA VI features guide</SourceLink>
            <SourceLink href="https://www.gtabase.com/gta-6/map/">GTABase · GTA VI map and locations</SourceLink>
            <SourceLink href="https://www.gtabase.com/gta-6/side-missions/">GTABase · activities and side content</SourceLink>
            <SourceLink href="https://gtaintel.com/news/gta-6-extended-look-gameplay-details-recap">GTA Intel · Extended Look gameplay recap</SourceLink>
            <SourceLink href="https://gtaintel.com/news/gta-6-everything-officially-confirmed-may-2026">GTA Intel · confirmed facts tracker</SourceLink>
            <SourceLink href="https://gta.fandom.com/wiki/Grand_Theft_Auto_VI">GTA Wiki · GTA VI reference index</SourceLink>
            <SourceLink href="https://gta.fandom.com/wiki/Grand_Theft_Auto">GTA Wiki · universe chronology and catalogue</SourceLink>
          </div></Section>
        </div>

        <aside className="gta6-side-rail" aria-label="GTA VI dossier navigation">
          <div className="gta6-side-card"><span className="gta6-side-label">Archive status</span><strong>CONFIRMED DOSSIER</strong><p>Facts are separated from analysis and unverified claims.</p><Link href="/wiki/help">Read the evidence policy →</Link></div>
          <div className="gta6-side-card"><span className="gta6-side-label">Related records</span><Link href="/database/characters/jason-duval">Jason Duval <ArrowUpRight size={12} /></Link><Link href="/database/characters/lucia-caminos">Lucia Caminos <ArrowUpRight size={12} /></Link><Link href="/map">Leonida places atlas <ArrowUpRight size={12} /></Link><Link href="/news">GTA VI news desk <ArrowUpRight size={12} /></Link></div>
          <div className="gta6-side-card"><span className="gta6-side-label">Latest official checkpoint</span><strong>Extended Look</strong><p>Rockstar describes it as entirely captured from in-game footage on PlayStation 5.</p><SourceLink href="https://www.rockstargames.com/VI/an-extended-look">Open official page</SourceLink></div>
        </aside>
      </div>
    </div>
  )
}
