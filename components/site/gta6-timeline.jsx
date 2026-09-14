'use client'

import { useMemo, useState } from 'react'

const CATEGORY_LABELS = {
  ALL: 'All signals',
  DESIGN: 'Design',
  TECHNOLOGY: 'Technology',
  BUSINESS: 'Business',
  PRODUCTION: 'Production',
  ONLINE: 'Online',
  CONTROVERSY: 'Controversy',
  LEAK: 'Leak / security',
  MARKETING: 'Marketing',
  STORY: 'Story craft',
  CONTEXT: 'Historical context',
  DEVELOPMENT: 'Development',
}

export default function GTA6Timeline({ events }) {
  const [active, setActive] = useState('ALL')
  const categories = useMemo(() => ['ALL', ...Array.from(new Set(events.map((event) => event[3])))], [events])
  const visible = active === 'ALL' ? events : events.filter((event) => event[3] === active)

  return (
    <div className="gta6-archive-timeline">
      <div className="gta6-timeline-filters" role="tablist" aria-label="Filter archive timeline">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active === category}
            className={active === category ? 'is-active' : ''}
            onClick={() => setActive(category)}
          >
            {CATEGORY_LABELS[category] ?? category}
          </button>
        ))}
      </div>

      <div className="gta6-archive-timeline-grid">
        {visible.map(([date, title, copy, category, confidence]) => (
          <article className="gta6-archive-event" key={`${date}-${title}`}>
            <div className="gta6-archive-event-meta">
              <time>{date}</time>
              <span className={`gta6-event-tag gta6-event-${confidence.toLowerCase()}`}>{confidence}</span>
            </div>
            <div className="gta6-archive-event-category">{CATEGORY_LABELS[category] ?? category}</div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <p className="gta6-timeline-result" role="status">
        Showing {visible.length} of {events.length} archive records · category filters change the view only; the evidence labels remain unchanged.
      </p>
    </div>
  )
}
