import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { sectionById } from '@/lib/navigation'
import { characters, vehicles, weapons, radioStations, mechanics, factions, easterEggs } from '@/lib/content'
import { worldEntries } from '@/lib/world-content'

export const metadata = {
  title: 'Database',
  description: 'Every record branch of the GTA LORE database — characters, vehicles, weapons, radio, mechanics, world, factions and easter eggs — with what each one holds.',
  alternates: { canonical: '/database' },
}

// Quantas fichas cada ramo tem, contadas dos próprios dados. Esta página era
// um redireccionamento para /database/world: o «Database overview» do menu
// levava ao World, e a partir do World não fazia nada.
const COUNTS = {
  '/database/characters': characters.length,
  '/database/vehicles': vehicles.length,
  '/database/weapons': weapons.length,
  '/database/radio': radioStations.length,
  '/database/mechanics': mechanics.length,
  '/database/world': worldEntries.length,
  '/gangs-factions': factions.length,
  '/easter-eggs': easterEggs.length,
}

export default function DatabaseOverview() {
  const branches = sectionById('database').links.filter((link) => link.href !== '/database')
  const total = branches.reduce((sum, link) => sum + (COUNTS[link.href] || 0), 0)
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Database' }]} />
      <div className="mt-4">
        <CategoryHeader
          eyebrow="Records"
          title="Database"
          description="Every record branch in the archive, with what it holds. Each entry keeps its own source and evidence label."
          count={total}
          countLabel="records"
        />
      </div>
      <div className="site-directory-grid">
        {branches.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href} className="site-directory-card site-directory-account">
              <Icon size={20} aria-hidden="true" />
              <span className="min-w-0 flex-1"><strong>{link.label}</strong><small>{link.desc}</small></span>
              <b className="database-branch-count">{COUNTS[link.href] ?? '—'}</b>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
