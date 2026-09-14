'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MediaCarousel({ items, label = 'Visual reference gallery', compact = false }) {
  const rail = useRef(null)
  const [active, setActive] = useState(0)
  const move = (direction) => rail.current?.scrollBy({ left: rail.current.clientWidth * direction * 0.84, behavior: 'smooth' })
  return <div className="relative ambient-bloom mint-bloom">
    <div className="flex items-center justify-between gap-3 mb-3">
      <p className="font-cond uppercase tracking-[0.15em] text-[10px] text-dim">{label}</p>
      <div className="flex gap-1.5"><button type="button" onClick={() => move(-1)} aria-label="Previous images" className="w-10 h-10 border border-line rounded-sm text-paper hover:border-pink"><ChevronLeft size={17} className="mx-auto" /></button><button type="button" onClick={() => move(1)} aria-label="Next images" className="w-10 h-10 border border-line rounded-sm text-paper hover:border-pink"><ChevronRight size={17} className="mx-auto" /></button></div>
    </div>
    <div ref={rail} onScroll={(event) => setActive(Math.round(event.currentTarget.scrollLeft / Math.max(1, event.currentTarget.clientWidth * 0.84)))} className="film-rail flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth" role="region" tabIndex={0} aria-label={label}>
      {items.map((item, index) => <figure key={`${item.src}-${index}`} className={`carousel-frame spotlight-card group snap-start shrink-0 overflow-hidden border border-line panel ${compact ? 'w-[78%] sm:w-[44%] lg:w-[31%]' : 'w-[88%] sm:w-[56%] lg:w-[42%]'}`}>
        <div className={`${compact ? 'relative aspect-[16/8]' : 'relative aspect-[16/10]'} film-frame corner-brackets`}><Image src={item.src} alt={item.alt || item.label} fill sizes="(max-width:640px) 88vw, 42vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><span className="absolute right-3 top-3 z-[4] font-mono text-[9px] tracking-[0.14em] text-paper/75">FRAME {String(index + 1).padStart(2, '0')}</span></div>
        <figcaption className="px-3 py-2.5 bg-raised/85 font-cond uppercase tracking-[0.12em] text-[10px] text-paper">{item.label || `Reference ${String(index + 1).padStart(2, '0')}`}</figcaption>
      </figure>)}
    </div>
    <div className="mt-2 flex gap-1.5" aria-hidden="true">{items.map((_, index) => <span key={index} className={`h-1 flex-1 ${index === active ? 'bg-pink' : 'bg-black/15'}`} />)}</div>
  </div>
}
