import Link from 'next/link'
import LoreIcon from '@/components/site/lore-icons'

export default function NotFound() {
  return (
    <section className="archive-state archive-state-not-found" aria-labelledby="not-found-title">
      <div className="archive-state-code" aria-hidden="true">404</div>
      <div className="archive-state-mark"><LoreIcon name="search" size={28} /></div>
      <p>Archive route unavailable</p>
      <h1 id="not-found-title">This lead goes nowhere.</h1>
      <span>The record may have moved, changed name or never existed in the published archive.</span>
      <nav aria-label="Recovery links">
        <Link href="/">Return home <LoreIcon name="home" size={15} /></Link>
        <Link href="/wiki/search">Search the archive <LoreIcon name="search" size={15} /></Link>
        <Link href="/wiki/random">Open a random record <LoreIcon name="compass" size={15} /></Link>
      </nav>
    </section>
  )
}
