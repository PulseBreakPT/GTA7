import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { IMG } from '@/lib/content'

const ROCKSTAR_SCREENSHOTS_URL = 'https://www.rockstargames.com/VI/media/screenshots'

const groups = [
  { title: 'Jason & Lucia', count: 13, range: 'Jason and Lucia 01–13', image: IMG.keyArt, href: '/database/characters/lucia-caminos', note: 'Duo stills and relationship-led story imagery.' },
  { title: 'Jason Duval', count: 10, range: 'Jason Duval 01–10', image: IMG.jasonDuval, href: '/database/characters/jason-duval', note: 'Dedicated official shots centred on Jason.' },
  { title: 'Lucia Caminos', count: 10, range: 'Lucia Caminos 01–10', image: IMG.luciaCaminos, href: '/database/characters/lucia-caminos', note: 'Dedicated official shots centred on Lucia.' },
  { title: 'Supporting cast', count: 24, range: 'Cal, Boobie, Dre’Quan, Real Dimez, Raul and Brian 01–04', image: IMG.keyArtMotel, href: '/database/characters', note: 'Four-image sets for six named supporting profiles.' },
  { title: 'Vice City', count: 12, range: 'Vice City 01–12', image: IMG.viceCity, href: '/map/vice-city', note: 'Urban, beach, nightlife and metropolitan material.' },
  { title: 'Leonida Keys', count: 6, range: 'Leonida Keys 01–06', image: IMG.leonidaKeys, href: '/map/leonida-keys', note: 'Island roads, water, bars and Keys atmosphere.' },
  { title: 'Port Gellhorn', count: 6, range: 'Port Gellhorn 01–06', image: IMG.portGellhorn, href: '/map/port-gellhorn', note: 'Forgotten coast, motels and faded tourism.' },
  { title: 'Ambrosia', count: 6, range: 'Ambrosia 01–06', image: IMG.ambrosia, href: '/map/ambrosia', note: 'Industry, rural roads, bikers and sugar country.' },
  { title: 'Grassrivers', count: 6, range: 'Grassrivers 01–06', image: IMG.grassrivers, href: '/map/grassrivers', note: 'Wetlands, airboats, wildlife and swamp infrastructure.' },
  { title: 'Mount Kalaga', count: 6, range: 'Mount Kalaga National Park 01–06', image: IMG.mountKalaga, href: '/map/mount-kalaga', note: 'Northern wilderness, trails, water and elevation.' },
]

const onSiteScreenshots = [
  ['Vice City', 'Official regional image', IMG.viceCity, '/map/vice-city'],
  ['Leonida Keys', 'Official regional image', IMG.leonidaKeys, '/map/leonida-keys'],
  ['Grassrivers', 'Official regional image', IMG.grassrivers, '/map/grassrivers'],
  ['Port Gellhorn', 'Official regional image', IMG.portGellhorn, '/map/port-gellhorn'],
  ['Ambrosia', 'Official regional image', IMG.ambrosia, '/map/ambrosia'],
  ['Mount Kalaga', 'Official regional image', IMG.mountKalaga, '/map/mount-kalaga'],
  ['Ambrosia bikers', 'Official screenshot held locally', IMG.ambrosiaBikers, '/map/ambrosia'],
  ['Ambrosia night', 'Official screenshot held locally', IMG.ambrosiaNight, '/map/ambrosia'],
  ['Ambrosia couple', 'Official screenshot held locally', IMG.ambrosiaCouple, '/map/ambrosia'],
  ['Ambrosia sunset', 'Official screenshot held locally', IMG.ambrosiaSunset, '/map/ambrosia'],
  ['Ambrosia drive', 'Official screenshot held locally', IMG.ambrosiaDrive, '/map/ambrosia'],
  ['Ambrosia party', 'Official screenshot held locally', IMG.ambrosiaParty, '/map/ambrosia'],
  ['Swamp stilts', 'Official screenshot held locally', IMG.swampStilts, '/map/grassrivers'],
  ['Swamp airboat', 'Official screenshot held locally', IMG.swampAirboat, '/map/grassrivers'],
  ['Swamp chase', 'Official screenshot held locally', IMG.swampChase, '/map/grassrivers'],
  ['Swamp skyline', 'Official screenshot held locally', IMG.swampSkyline, '/map/grassrivers'],
  ['Swamp gator', 'Official screenshot held locally', IMG.swampGator, '/map/grassrivers'],
  ['Keys street', 'Official screenshot held locally', IMG.keysStreet, '/map/leonida-keys'],
  ['Keys bar', 'Official screenshot held locally', IMG.keysBar, '/map/leonida-keys'],
  ['Tattoo neon', 'Official screenshot held locally', IMG.tattooNeon, '/map/vice-city'],
  ['Tattoo back', 'Official screenshot held locally', IMG.tattooBack, '/map/vice-city'],
  ['Ultimate palms', 'Official screenshot held locally', IMG.ultimatePalms, '/editions'],
  ['Lucia Caminos', 'Official character image', IMG.luciaCaminos, '/database/characters/lucia-caminos'],
  ['Jason Duval', 'Official character image', IMG.jasonDuval, '/database/characters/jason-duval'],
  ['Cal Hampton', 'Official character image', IMG.calHampton, '/database/characters/cal-hampton'],
  ['Boobie Ike', 'Official character image', IMG.boobieIke, '/database/characters/boobie-ike'],
  ['Dre’Quan Priest', 'Official character image', IMG.drequanPriest, '/database/characters/dre-quan-priest'],
  ['Raul Bautista', 'Official character image', IMG.raulBautista, '/database/characters/raul-bautista'],
  ['Brian Heder', 'Official character image', IMG.brianHeder, '/database/characters/brian-heder'],
  ['Real Dimez', 'Official character image', IMG.realDimez, '/database/characters/real-dimez'],
  ['’95 Grotti Cheetah', 'Official edition screenshot', IMG.grottiCheetah, '/database/vehicles/grotti-cheetah-95'],
  ['Grotti Cheetah rear', 'Official edition screenshot', IMG.grottiCheetahRear, '/database/vehicles/grotti-cheetah-95'],
  ['Vapid Ganado', 'Official edition screenshot', IMG.vapidGanado, '/database/vehicles/vapid-ganado'],
  ['Shitzu Squalo', 'Official edition screenshot', IMG.shitzuSqualo, '/database/vehicles/shitzu-squalo'],
  ['Shitzu Squalo bay', 'Official edition screenshot', IMG.shitzuSqualoBay, '/database/vehicles/shitzu-squalo'],
  ['’55 Vapid Stanier', 'Official Vintage Vice City screenshot', IMG.vapidStanier55, '/database/vehicles/vapid-stanier-55'],
  ['’67 Dominator Buggy', 'Official edition screenshot', IMG.dominatorBuggy, '/database/vehicles/vapid-dominator-buggy-67'],
  ['Rideout Customs', 'Official edition screenshot', IMG.rideoutCustoms, '/map/location/rideout-customs'],
  ['Morgan Revolvers', 'Official edition screenshot', IMG.morganRevolvers, '/database/weapons/morgan-revolvers'],
  ['Weapon variants', 'Official edition screenshot', IMG.weaponVariants, '/editions'],
]

const packages = [
  { title: 'Main screenshots', count: 99, url: ROCKSTAR_SCREENSHOTS_URL, note: 'Primary Rockstar screenshot library currently listed on the official media page.' },
  { title: 'Ultimate Edition Benefits', count: 51, url: ROCKSTAR_SCREENSHOTS_URL, note: 'Edition-related screenshots including vehicles, weapons, businesses and bonus content.' },
  { title: 'Vintage Vice City Pack', count: 12, url: ROCKSTAR_SCREENSHOTS_URL, note: 'Vintage pack screenshots, including the ’55 Vapid Stanier and outfit/weapon-pattern material.' },
]

const total = groups.reduce((sum, group) => sum + group.count, 0)

export const metadata = {
  title: 'GTA VI Screenshots | GTA LORE',
  description: 'Official GTA VI screenshot index: characters, Vice City, Leonida regions and Rockstar media packages.',
}

export default function ScreenshotsPage() {
  return (
    <div className="screenshots-page ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Screenshots' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Official media"
          title="Screenshots"
          description="A structured index of Rockstar’s official GTA VI screenshots. The catalogue separates the 99 main screenshots from edition-benefit image packs, and keeps every item marked as official media rather than leak or community material."
          count={total}
          countLabel="official screenshots"
          image={IMG.keyArtPier}
          imageAlt="Official GTA VI artwork of Jason and Lucia in Leonida"
          updatedAt="2026-09-13"
        />
      </div>

      <section className="screenshots-policy-note" aria-label="Rockstar usage policy">
        <div>
          <p>Usage policy</p>
          <h2>Non-commercial fan archive use</h2>
          <span>Rockstar’s support policy says Take-Two generally does not object to fans using Rockstar materials for non-commercial uses, while reserving the right to remove material case by case. GTA LORE keeps this page official-only, credited and non-commercial.</span>
        </div>
        <a href="https://support.rockstargames.com/articles/7bNaeoMFTV0iUDGhStTXvz/policy-on-posting-copyrighted-rockstar-games-material" target="_blank" rel="noreferrer">Read policy <ExternalLink size={14} /></a>
      </section>

      <section className="screenshots-onsite" aria-labelledby="onsite-screenshots-title">
        <header>
          <p>On-site gallery</p>
          <h2 id="onsite-screenshots-title">Screenshots available directly on GTA LORE</h2>
          <span>{onSiteScreenshots.length} locally served official screenshots and official media stills. More can be mirrored later from Rockstar’s downloadable packs if needed.</span>
        </header>
        <div className="screenshots-live-grid">
          {onSiteScreenshots.map(([title, caption, image, href]) => (
            <Link key={`${title}-${image}`} href={href} className="screenshots-live-card">
              <span className="screenshots-live-media">
                <Image src={image} alt={`${title} — GTA VI official media`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
              </span>
              <span className="screenshots-live-copy"><strong>{title}</strong><small>{caption}</small></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="screenshots-proof" aria-labelledby="screenshots-proof-title">
        <div>
          <p>Source trail</p>
          <h2 id="screenshots-proof-title">Official Rockstar media library</h2>
          <span>The current Rockstar media page lists 99 main screenshots. It also lists separate downloadable image packs for Ultimate Edition Benefits and the Vintage Vice City Pack.</span>
        </div>
        <a href={ROCKSTAR_SCREENSHOTS_URL} target="_blank" rel="noreferrer">Open Rockstar screenshots <ExternalLink size={14} /></a>
      </section>

      <section className="screenshots-package-grid" aria-label="Official screenshot packages">
        {packages.map((pack) => (
          <a key={pack.title} href={pack.url} target="_blank" rel="noreferrer" className="screenshots-package-card">
            <span><small>Rockstar package</small><strong>{pack.title}</strong></span>
            <b>{pack.count}</b>
            <p>{pack.note}</p>
          </a>
        ))}
      </section>

      <section className="screenshots-groups" aria-labelledby="screenshot-groups-title">
        <header>
          <p>Indexed locally</p>
          <h2 id="screenshot-groups-title">Main screenshot groups</h2>
          <span>These groups account for all 99 screenshots in the main official screenshot collection.</span>
        </header>
        <div className="screenshots-grid">
          {groups.map((group) => (
            <article key={group.title} className="screenshots-card">
              <Link href={group.href} className="screenshots-card-media" aria-label={`Open ${group.title} related archive page`}>
                <Image src={group.image} alt={`${group.title} preview from GTA VI official media`} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
              </Link>
              <div className="screenshots-card-copy">
                <div><h3>{group.title}</h3><b>{group.count}</b></div>
                <p>{group.note}</p>
                <small>{group.range}</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="screenshots-rules" aria-label="Screenshot policy">
        <h2>How GTA LORE treats screenshots</h2>
        <ul>
          <li><strong>Official only by default.</strong><span>This page does not mix trailer screencaps, leaks, fan art or AI images into the Rockstar screenshot count.</span></li>
          <li><strong>Counts are dated.</strong><span>Rockstar can add or remove media; the page records the current official structure rather than pretending it is permanent.</span></li>
          <li><strong>Images are evidence objects.</strong><span>When a screenshot proves an entity exists, the entity page should cite what the screenshot actually shows, not what the community infers from it.</span></li>
        </ul>
      </section>
    </div>
  )
}
