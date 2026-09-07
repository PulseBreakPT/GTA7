import Link from 'next/link'
import {
  ArrowRight, Car, Crosshair, Globe2, MapPin, Radio, Repeat2,
  Shield, Sparkles, Users,
} from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { CURATED_STARTS, PORTALS } from '@/lib/wiki-graph'

export const metadata = {
  title: 'Topic portals',
  description: 'Topic gateways into every GTA LORE encyclopedia namespace, with categories, starting points and live archive health.',
  alternates: { canonical: '/wiki/portals' },
}

const ICONS = {
  characters: Users,
  vehicles: Car,
  weapons: Crosshair,
  locations: MapPin,
  regions: Globe2,
  factions: Shield,
  radio: Radio,
  mechanics: Repeat2,
  secrets: Sparkles,
  world: Globe2,
}

export default function PortalsPage() {
  return (
    <div className="ambient-bloom mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Portals' }]} />
      <div className="mt-4">
        <CategoryHeader
          eyebrow="Subject gateways"
          title="Topic portals"
          description="Enter the encyclopedia through a subject rather than an alphabet. Each portal assembles its own articles, categories, sources, recent verification work and maintenance signals."
          count={PORTALS.length}
          countLabel="portals"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PORTALS.map((portal) => {
          const Icon = ICONS[portal.kind] || Globe2
          const coverage = portal.entries.length ? Math.round((portal.sourced / portal.entries.length) * 100) : 0
          return (
            <article key={portal.kind} className="wiki-portal-card">
              <header>
                <span><Icon size={18} aria-hidden="true" /></span>
                <div><p>Portal</p><h2>{portal.plural}</h2></div>
                <b>{portal.entries.length}</b>
              </header>
              <p>{portal.categories.slice(0, 4).map((category) => category.label).join(' · ') || 'General encyclopedia records'}</p>
              <dl>
                <div><dt>Source coverage</dt><dd>{coverage}%</dd></div>
                <div><dt>Connected</dt><dd>{portal.connected}</dd></div>
                <div><dt>Stubs</dt><dd>{portal.stubs}</dd></div>
              </dl>
              <Link href={`/wiki/portal/${portal.kind}`}>Enter portal <ArrowRight size={13} aria-hidden="true" /></Link>
            </article>
          )
        })}
      </div>

      <aside className="wiki-discovery-callout mt-6">
        <div><span>Curated navigation</span><strong>100 ways into the archive</strong><p>A balanced selection drawn from every namespace, prioritising sourced, complete and well-connected pages.</p></div>
        <b>{CURATED_STARTS.length}</b>
        <Link href="/wiki/discover">Open discovery index <ArrowRight size={13} /></Link>
      </aside>
    </div>
  )
}
