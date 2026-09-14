import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { NAV_SECTIONS, ACCOUNT_LINKS } from '@/lib/navigation'
import { regions, encyclopediaCategories } from '@/lib/content'
import { KIND_META, SPECIAL_LISTS } from '@/lib/wiki-graph'
import { LEGAL_DOCUMENTS } from '@/lib/legal'

export const metadata = {
  title: 'Site directory',
  description: 'Every section and page of GTA Lore on one screen, grouped by what it is for.',
  alternates: { canonical: '/directory' },
}

const titleCase = (text) => text.toLowerCase().replace(/(^|[\s-/(])([a-z])/g, (_, gap, letter) => gap + letter.toUpperCase())

// As páginas um nível abaixo dos índices: poucas o bastante para caberem
// aqui por inteiro, e sem isto só se chegava a elas por dentro de outra página.
const DEEPER = [
  {
    id: 'regions',
    title: 'Regions of Leonida',
    parent: { label: 'Places atlas', href: '/map' },
    links: regions.map((region) => ({ label: titleCase(region.label), href: `/map/${region.id}` })),
  },
  {
    id: 'portals',
    title: 'Topic portals',
    parent: { label: 'Topic portals', href: '/wiki/portals' },
    links: Object.entries(KIND_META).map(([kind, meta]) => ({ label: meta.plural, href: `/wiki/portal/${kind}` })),
  },
  {
    id: 'article-categories',
    title: 'Article categories',
    parent: { label: 'Article categories', href: '/categories' },
    links: encyclopediaCategories.map((category) => ({ label: titleCase(category.title), href: `/categories/${category.slug}` })),
  },
  {
    id: 'maintenance',
    title: 'Maintenance lists',
    parent: { label: 'Special pages', href: '/wiki/special' },
    links: SPECIAL_LISTS.map((list) => ({ label: list.title, href: `/wiki/special/${list.id}` })),
  },
  {
    id: 'legal',
    title: 'Legal documents',
    parent: { label: 'Legal centre', href: '/legal' },
    links: LEGAL_DOCUMENTS.map((document) => ({ label: document.title, href: `/legal/${document.slug}` })),
  },
]

const TOTAL = NAV_SECTIONS.reduce((sum, section) => sum + section.links.length, 0)
  + DEEPER.reduce((sum, group) => sum + group.links.length, 0) + ACCOUNT_LINKS.length

export default function SiteDirectory() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Site directory' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Navigate"
          title="Site directory"
          description="Every section of the archive on one screen, grouped by what it is for. Individual records sit inside their branch; everything else is linked from here."
          count={TOTAL}
          countLabel="pages listed"
        />
      </div>

      <nav className="site-directory-jump" aria-label="Directory sections">
        {NAV_SECTIONS.map((section) => <a key={section.id} href={`#${section.id}`}>{section.label}</a>)}
        <a href="#deeper">Deeper pages</a>
        <a href="#account">Account</a>
      </nav>

      <div className="site-directory-grid">
        {NAV_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="site-directory-card" aria-labelledby={`${section.id}-title`}>
            <header>
              <h2 id={`${section.id}-title`}>{section.label}</h2>
              <p>{section.note}</p>
            </header>
            <ul>
              {section.links.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <Icon size={16} aria-hidden="true" />
                      <span><strong>{link.label}</strong><small>{link.desc}</small></span>
                      <ChevronRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <section id="deeper" className="site-directory-deeper" aria-labelledby="deeper-title">
        <h2 id="deeper-title">Deeper pages</h2>
        <p>One level below the indexes. Individual characters, vehicles, weapons, places and articles are reached through their branch pages.</p>
        <div className="site-directory-grid">
          {DEEPER.map((group) => (
            <section key={group.id} className="site-directory-card" aria-labelledby={`${group.id}-title`}>
              <header>
                <h3 id={`${group.id}-title`}>{group.title}</h3>
                <p><Link href={group.parent.href}>{group.parent.label}</Link> · {group.links.length} pages</p>
              </header>
              <ul className="site-directory-chips">
                {group.links.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section id="account" className="site-directory-deeper" aria-labelledby="account-title">
        <h2 id="account-title">Your account</h2>
        <div className="site-directory-grid">
          {ACCOUNT_LINKS.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href} className="site-directory-card site-directory-account">
                <Icon size={18} aria-hidden="true" />
                <span><strong>{link.label}</strong><small>{link.desc}</small></span>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
