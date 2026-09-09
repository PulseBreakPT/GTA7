'use client'

import Link from 'next/link'
import LoreIcon from '@/components/site/lore-icons'

export default function ErrorState({ reset }) {
  return (
    <section className="archive-state archive-state-error" aria-labelledby="error-title">
      <div className="archive-state-code" aria-hidden="true">ERR</div>
      <div className="archive-state-mark"><LoreIcon name="evidence" size={28} /></div>
      <p>Archive interruption</p>
      <h1 id="error-title">The signal was lost.</h1>
      <span>No personal information is shown here. Retry the request or return to a stable archive route.</span>
      <nav aria-label="Error recovery actions">
        <button type="button" onClick={reset}>Try again <LoreIcon name="changes" size={15} /></button>
        <Link href="/">Return home <LoreIcon name="home" size={15} /></Link>
      </nav>
    </section>
  )
}
