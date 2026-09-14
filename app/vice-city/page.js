'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, Car, ChevronLeft, ChevronRight, Clock3, Dices, Headphones,
  MapPin, MoonStar, Palmtree, Search, Sparkles, Sun, Sunrise, Users, X,
} from 'lucide-react'
import { characters, extendedLookBrief, locations, radioStations, regions, vehicles } from '@/lib/content'
import { Breadcrumb } from '@/components/site/wiki'
import { StatusBadge, cx } from '@/components/site/ui'
import { ReleaseCountdown } from '@/components/site/home-client'

const CITY_ZONE = 'America/New_York'
const CITY_PLACES = locations.filter((item) => item.region === 'vice-city')
const OFFICIAL_STATIONS = radioStations.filter((item) => item.status === 'confirmed')
const CREW = characters.filter((item) => item.status === 'confirmed' && item.image)
const OFFICIAL_RIDES = vehicles.filter((item) => item.status === 'confirmed' && item.image && /rockstargames\.com/i.test(item.sourceUrl || ''))

function Feature({ number, icon: Icon, title, description, className, children }) {
  return (
    <section className={cx('vice-feature', className)} aria-labelledby={`vice-feature-${number}`}>
      <header>
        <span className="vice-feature-number">{String(number).padStart(2, '0')}</span>
        <span className="vice-feature-icon" aria-hidden="true"><Icon size={18} /></span>
        <div>
          <h2 id={`vice-feature-${number}`}>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      <div className="vice-feature-body">{children}</div>
    </section>
  )
}

function Stepper({ onPrevious, onNext, label }) {
  return (
    <div className="vice-stepper" aria-label={label}>
      <button type="button" onClick={onPrevious} aria-label={`Previous ${label}`}><ChevronLeft size={16} /></button>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`}><ChevronRight size={16} /></button>
    </div>
  )
}

function phaseFor(hour) {
  if (hour >= 5 && hour < 8) return { label: 'Sunrise', note: 'Early light over the Atlantic.', Icon: Sunrise }
  if (hour >= 8 && hour < 17) return { label: 'Daylight', note: 'The city is operating at full volume.', Icon: Sun }
  if (hour >= 17 && hour < 20) return { label: 'Golden hour', note: 'Warm light, long shadows and coastal colour.', Icon: Sparkles }
  return { label: 'After dark', note: 'Neon takes over the city frontage.', Icon: MoonStar }
}

export default function ViceCityHub() {
  const [clock, setClock] = useState({ time: '--:--:--', date: 'Vice City local time', hour: 12 })
  const [afterDark, setAfterDark] = useState(false)
  const [placeIndex, setPlaceIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [randomPlace, setRandomPlace] = useState(CITY_PLACES[0] || locations[0])
  const [regionIndex, setRegionIndex] = useState(0)
  const [stationIndex, setStationIndex] = useState(0)
  const [crewIndex, setCrewIndex] = useState(0)
  const [rideIndex, setRideIndex] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const time = new Intl.DateTimeFormat('en-GB', { timeZone: CITY_ZONE, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now)
      const date = new Intl.DateTimeFormat('en-GB', { timeZone: CITY_ZONE, weekday: 'long', day: 'numeric', month: 'long' }).format(now)
      const rawHour = Number(new Intl.DateTimeFormat('en-US', { timeZone: CITY_ZONE, hour: 'numeric', hour12: false }).format(now))
      setClock({ time, date, hour: rawHour % 24 })
    }
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const phase = phaseFor(clock.hour)
  const ActivePhaseIcon = phase.Icon
  const selectedPlace = CITY_PLACES[placeIndex] || CITY_PLACES[0]
  const selectedRegion = regions[regionIndex] || regions[0]
  const selectedStation = OFFICIAL_STATIONS[stationIndex] || OFFICIAL_STATIONS[0]
  const selectedCrew = CREW[crewIndex] || CREW[0]
  const selectedRide = OFFICIAL_RIDES[rideIndex] || OFFICIAL_RIDES[0]
  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return CITY_PLACES.slice(0, 5)
    return locations.filter((item) => `${item.name} ${item.desc}`.toLowerCase().includes(needle)).slice(0, 5)
  }, [query])
  const cycle = (setter, length, direction) => setter((value) => (value + direction + length) % length)
  const pickRandom = () => {
    if (!locations.length) return
    setRandomPlace((current) => {
      if (locations.length === 1) return locations[0]
      let next = locations[Math.floor(Math.random() * locations.length)]
      while (next.slug === current?.slug) next = locations[Math.floor(Math.random() * locations.length)]
      return next
    })
  }

  return (
    <div className={cx('vice-city-hub ambient-bloom', afterDark && 'is-after-dark')}>
      <div className="vice-city-shell">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Vice City Hub' }]} />

        <header className="vice-city-hero">
          <Image src="/media/places/vice-city.webp" alt="Vice City in official GTA VI artwork" fill priority sizes="100vw" className="object-cover" />
          <span className="vice-city-hero-wash" aria-hidden="true" />
          <div>
            <span className="vice-city-eyebrow"><Palmtree size={15} /> Interactive city desk</span>
            <h1>VICE CITY<br />IN YOUR HANDS</h1>
            <p>Ten useful ways to move through the archive — built from its source-labelled records and published imagery.</p>
            <nav aria-label="Vice City Hub shortcuts">
              <a href="#city-now">City now</a>
              <a href="#city-places">Places</a>
              <a href="#city-culture">Culture</a>
            </nav>
          </div>
          <span className="vice-city-feature-count"><b>10</b><small>live features</small></span>
        </header>

        <div id="city-now" className="vice-feature-grid scroll-mt-24">
          <Feature number={1} icon={Clock3} title="Vice City time" description="A live clock using the city’s Eastern time zone." className="vice-feature-compact">
            <time className="vice-live-time" aria-live="off">{clock.time}</time>
            <span className="vice-live-date">{clock.date}</span>
            <ReleaseCountdown releaseDate={extendedLookBrief.releaseDate} variant="full" className="vice-countdown" />
          </Feature>

          <Feature number={2} icon={ActivePhaseIcon} title="City phase" description="The desk changes its cue with the local hour." className="vice-feature-compact">
            <div className="vice-phase"><ActivePhaseIcon size={28} /><div><strong>{phase.label}</strong><span>{phase.note}</span></div></div>
          </Feature>

          <Feature number={3} icon={MoonStar} title="After Dark" description="Switch this hub from sun-washed paper to neon night." className="vice-feature-compact">
            <button type="button" className="vice-mode-toggle" onClick={() => setAfterDark((value) => !value)} aria-pressed={afterDark}>
              <span><Sun size={15} /> Day</span><i aria-hidden="true" /><span><MoonStar size={15} /> Night</span>
            </button>
          </Feature>
        </div>

        <div id="city-places" className="vice-feature-grid scroll-mt-24">
          <Feature number={4} icon={MapPin} title="District selector" description="Move through every named place filed under Vice City." className="vice-feature-wide">
            <div className="vice-selector-head">
              <span><b>{String(placeIndex + 1).padStart(2, '0')}</b> / {String(CITY_PLACES.length).padStart(2, '0')}</span>
              <Stepper label="district" onPrevious={() => cycle(setPlaceIndex, CITY_PLACES.length, -1)} onNext={() => cycle(setPlaceIndex, CITY_PLACES.length, 1)} />
            </div>
            {selectedPlace && <div className="vice-record-summary">
              <StatusBadge status={selectedPlace.status} />
              <h3>{selectedPlace.name}</h3><p>{selectedPlace.desc}</p>
              <Link href={`/map/location/${selectedPlace.slug}`}>Open district record <ArrowRight size={14} /></Link>
            </div>}
          </Feature>

          <Feature number={5} icon={Search} title="Street finder" description="Search all named places without leaving the desk." className="vice-feature-wide">
            <label className="vice-search-box">
              <Search size={16} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a street, venue or district…" aria-label="Search named places" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear place search"><X size={14} /></button>}
            </label>
            <ul className="vice-search-results">
              {searchResults.map((item) => <li key={item.slug}><Link href={`/map/location/${item.slug}`}><span>{item.name}</span><small>{regions.find((region) => region.id === item.region)?.label}</small><ArrowRight size={13} /></Link></li>)}
              {!searchResults.length && <li className="is-empty">No named place matches that search.</li>}
            </ul>
          </Feature>

          <Feature number={6} icon={Dices} title="Take me somewhere" description="Draw a destination from the complete Leonida index." className="vice-feature-wide">
            {randomPlace && <div className="vice-random-place" aria-live="polite">
              <span>{regions.find((region) => region.id === randomPlace.region)?.label || 'LEONIDA'}</span>
              <strong>{randomPlace.name}</strong>
              <p>{randomPlace.desc}</p>
              <div><button type="button" onClick={pickRandom}><Dices size={15} /> Draw again</button><Link href={`/map/location/${randomPlace.slug}`}>Open record</Link></div>
            </div>}
          </Feature>

          <Feature number={7} icon={Palmtree} title="Postcard deck" description="Browse the six official regional visual identities." className="vice-feature-visual">
            <figure className="vice-postcard">
              <Image src={selectedRegion.image} alt={`${selectedRegion.label} official Rockstar postcard`} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
              <figcaption><span>{String(regionIndex + 1).padStart(2, '0')} / {String(regions.length).padStart(2, '0')}</span><strong>{selectedRegion.label}</strong><small>{selectedRegion.theme}</small></figcaption>
            </figure>
            <div className="vice-selector-foot"><Link href={`/map/${selectedRegion.id}`}>Explore region <ArrowRight size={14} /></Link><Stepper label="postcard" onPrevious={() => cycle(setRegionIndex, regions.length, -1)} onNext={() => cycle(setRegionIndex, regions.length, 1)} /></div>
          </Feature>
        </div>

        <div id="city-culture" className="vice-feature-grid scroll-mt-24">
          <Feature number={8} icon={Headphones} title="Radio dial" description="Tune through station names confirmed in published material." className="vice-feature-third">
            {selectedStation && <div className="vice-dial-record"><Headphones size={30} /><StatusBadge status={selectedStation.status} /><h3>{selectedStation.name}</h3><p>{selectedStation.genre}</p><Link href={`/database/radio/${selectedStation.slug}`}>Station file <ArrowRight size={13} /></Link></div>}
            <Stepper label="station" onPrevious={() => cycle(setStationIndex, OFFICIAL_STATIONS.length, -1)} onNext={() => cycle(setStationIndex, OFFICIAL_STATIONS.length, 1)} />
          </Feature>

          <Feature number={9} icon={Users} title="Crew spotlight" description="Cycle through the confirmed character directory." className="vice-feature-third">
            {selectedCrew && <div className="vice-person-record"><span className="vice-record-image"><Image src={selectedCrew.image} alt={selectedCrew.name} fill sizes="180px" className="object-cover" /></span><div><StatusBadge status={selectedCrew.status} /><h3>{selectedCrew.name}</h3><p>{selectedCrew.role}</p><Link href={`/database/characters/${selectedCrew.slug}`}>Character file <ArrowRight size={13} /></Link></div></div>}
            <Stepper label="character" onPrevious={() => cycle(setCrewIndex, CREW.length, -1)} onNext={() => cycle(setCrewIndex, CREW.length, 1)} />
          </Feature>

          <Feature number={10} icon={Car} title="Garage spotlight" description="Browse vehicles tied directly to Rockstar-published records." className="vice-feature-third">
            {selectedRide && <div className="vice-ride-record"><span className="vice-record-image"><Image src={selectedRide.image} alt={selectedRide.name} fill sizes="220px" className="object-cover" /></span><div><StatusBadge status={selectedRide.status} /><h3>{selectedRide.name}</h3><p>{selectedRide.manufacturer}</p><Link href={`/database/vehicles/${selectedRide.slug}`}>Vehicle file <ArrowRight size={13} /></Link></div></div>}
            <Stepper label="vehicle" onPrevious={() => cycle(setRideIndex, OFFICIAL_RIDES.length, -1)} onNext={() => cycle(setRideIndex, OFFICIAL_RIDES.length, 1)} />
          </Feature>
        </div>
      </div>
    </div>
  )
}
