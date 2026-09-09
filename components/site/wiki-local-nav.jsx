'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Clock3, Compass, FolderTree, List, Shuffle, Wrench } from 'lucide-react'
import { cx } from './ui'

const LINKS = [
  ['Main page', '/wiki', BookOpen],
  ['Portals', '/wiki/portals', Compass],
  ['Discover 100', '/wiki/discover', Compass],
  ['All pages', '/wiki/all', List],
  ['Categories', '/wiki/categories', FolderTree],
  ['Recent changes', '/wiki/changes', Clock3],
  ['Random page', '/wiki/random', Shuffle],
  ['Special pages', '/wiki/special', Wrench],
]

export default function WikiLocalNav() {
  const pathname = usePathname() || '/wiki'

  return (
    <nav className="wiki-local-nav" aria-label="Wiki navigation">
      <div>
        <span className="wiki-local-namespace">Wiki</span>
        <div className="wiki-local-links">
          {LINKS.map(([label, href, Icon]) => {
            const active = href === '/wiki' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link key={href} href={href} className={cx(active && 'is-active')} aria-current={active ? 'page' : undefined}>
                <Icon size={12} aria-hidden="true" /><span>{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
