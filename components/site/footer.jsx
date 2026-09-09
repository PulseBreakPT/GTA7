'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LoreIcon from '@/components/site/lore-icons'
import siteVersion from '@/site-version.json'

const DIRECTORY = [
  {
    label: 'Encyclopedia',
    note: 'Browse the records',
    tint: 'violet',
    icon: 'archive',
    links: [
      ['Wiki home', '/wiki'],
      ['Characters', '/database/characters'],
      ['Vehicles', '/database/vehicles'],
      ['Weapons', '/database/weapons'],
      ['Mechanics', '/database/mechanics'],
      ['Radio', '/database/radio'],
      ['Factions', '/gangs-factions'],
      ['World index', '/database/world'],
    ],
  },
  {
    label: 'Explore',
    note: 'See Leonida',
    tint: 'pink',
    icon: 'compass',
    links: [
      ['Places atlas', '/map'],
      ['Vice City', '/vice-city'],
      ['News desk', '/news'],
      ['Guides', '/guides'],
      ['Media gallery', '/media'],
      ['Editions', '/editions'],
    ],
  },
  {
    label: 'Archive desk',
    note: 'Verify and navigate',
    tint: 'mint',
    icon: 'evidence',
    links: [
      ['Categories', '/categories'],
      ['Sources', '/sources'],
      ['Statistics', '/wiki/statistics'],
      ['Recent changes', '/wiki/changes'],
      ['Special pages', '/wiki/special'],
      ['A–Z index', '/wiki/all'],
      ['Glossary', '/wiki/glossary'],
      ['Reading guide', '/wiki/help'],
    ],
  },
]

const ALL_DIRECTORY_LINKS = DIRECTORY.flatMap((group) => group.links)

function currentSection(pathname) {
  if (pathname === '/') return 'Main archive'
  if (pathname.startsWith('/news')) return 'News desk'
  if (pathname.startsWith('/categories')) return 'Category index'
  if (pathname.startsWith('/map')) return 'Leonida field guide'
  if (pathname.startsWith('/database/characters')) return 'Character records'
  if (pathname.startsWith('/database/vehicles')) return 'Vehicle records'
  if (pathname.startsWith('/database/weapons')) return 'Weapon records'
  if (pathname.startsWith('/database/mechanics')) return 'Mechanic records'
  if (pathname.startsWith('/database/radio')) return 'Radio archive'
  if (pathname.startsWith('/database/world')) return 'World index'
  if (pathname.startsWith('/database')) return 'Database records'
  if (pathname.startsWith('/gangs-factions')) return 'Faction records'
  if (pathname.startsWith('/guides')) return 'Reference guides'
  if (pathname.startsWith('/easter-eggs')) return 'Secret index'
  if (pathname.startsWith('/wiki')) return 'Encyclopedia'
  if (pathname.startsWith('/sources')) return 'Provenance desk'
  if (pathname.startsWith('/media')) return 'Visual archive'
  if (pathname.startsWith('/legal')) return 'Legal desk'
  if (pathname.startsWith('/account')) return 'Reader account'
  return 'Public archive'
}

function closestDirectoryPath(pathname) {
  return ALL_DIRECTORY_LINKS
    .map(([, href]) => href)
    .filter((href) => pathname === href || pathname.startsWith(`${href}/`))
    .sort((a, b) => b.length - a.length)[0]
}

export default function Footer() {
  const pathname = usePathname() || '/'
  const section = currentSection(pathname)
  const activeHref = closestDirectoryPath(pathname)

  return (
    <footer className="gta-lore-footer compact-footer footer-v3" aria-label="GTA Lore footer">
      <div className="footer-v3-shell">
        <div className="footer-v3-primary">
          <section className="footer-v3-brand" aria-labelledby="footer-brand-name">
            <Link href="/" className="footer-v3-lockup" aria-label="GTA Lore home">
              <span className="footer-v3-mark" aria-hidden="true">GL</span>
              <span>
                <small>Independent GTA VI archive</small>
                <strong id="footer-brand-name">GTA LORE</strong>
              </span>
            </Link>
            <p>Official material, documented sightings and community reporting — separated by evidence, never blended together.</p>
            <div className="footer-v3-context" aria-label={`Current section: ${section}`}>
              <span><i aria-hidden="true" /> Archive online</span>
              <span>{section}</span>
            </div>
          </section>

          <nav className="footer-v3-directory" aria-label="Archive directory">
            {DIRECTORY.map((group) => (
              <section key={group.label} className="footer-v3-group" data-tint={group.tint}>
                <header>
                  <span className="footer-v3-group-icon"><LoreIcon name={group.icon} size={18} /></span>
                  <span>
                    <strong>{group.label}</strong>
                    <small>{group.note}</small>
                  </span>
                  <b>{String(group.links.length).padStart(2, '0')}</b>
                </header>
                <ul>
                  {group.links.map(([label, href]) => {
                    const active = activeHref === href
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className={active ? 'is-active' : undefined}
                          aria-current={active ? (pathname === href ? 'page' : 'location') : undefined}
                        >
                          <span>{label}</span>
                          <LoreIcon name="arrow" size={13} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <aside className="footer-v3-assurance" aria-label="Archive standards">
          <div className="footer-v3-assurance-copy">
            <span><LoreIcon name="verified" size={19} /></span>
            <p><strong>Evidence-first by design.</strong> Every claim should show whether it is confirmed, verified, analysis or rumour.</p>
          </div>
          <nav aria-label="Archive utilities">
            <Link href="/sources">Source policy <LoreIcon name="arrow" size={13} /></Link>
            <Link href="/wiki/changes">Recent changes <LoreIcon name="changes" size={14} /></Link>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Back to top <LoreIcon name="arrow" size={13} className="footer-v3-arrow-up" />
            </button>
          </nav>
        </aside>

        <div className="footer-v3-bottom">
          <div className="footer-v3-legal">
            <p>Independent fan project. Not affiliated with Rockstar Games, Take-Two Interactive, or their subsidiaries.</p>
            <nav aria-label="Legal policies">
              <Link href="/legal">Legal</Link>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/cookies">Cookies</Link>
              <Link href="/legal/copyright">Copyright</Link>
              <Link href="/legal/community">Community</Link>
            </nav>
          </div>
          <div className="footer-v3-release" aria-label={`Site version ${siteVersion.version}`}>
            <span>Public build</span>
            <strong>v{siteVersion.version}</strong>
          </div>
        </div>
      </div>
    </footer>
  )
}
