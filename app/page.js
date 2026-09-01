'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, Zap, Eye, Triangle, ChevronRight, Play } from 'lucide-react'
import MiniMap from '@/components/site/minimap'
import { StatusBadge } from '@/components/site/ui'
import { IMG } from '@/lib/content'

const statusBars = [
  { icon: Heart, label: 'WORLD', value: 62, color: '#F1A3C3' },
  { icon: Zap, label: 'SECRETS', value: 48, color: '#65DCCB' },
  { icon: Eye, label: 'PROGRESS', value: 71, color: '#9B83F4' },
]

function HeroBar({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-ink/70 border border-line flex items-center justify-center" style={{ color }} aria-hidden="true">
        <Icon size={15} strokeWidth={2.4} />
      </span>
      <span className="font-cond font-semibold uppercase tracking-[0.16em] text-[14px] text-paper w-24">{label}</span>
      <span className="relative w-40 sm:w-56 h-[9px] bg-white/10" role="img" aria-label={`${label}: ${value} of 100`}>
        <span className="absolute inset-y-0 left-0" style={{ width: `${value}%`, backgroundColor: color }} />
        <span className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${value - 4}%` }} />
        <span className="absolute inset-y-0 w-[2px] bg-ink" style={{ left: `${value - 8}%` }} />
      </span>
    </div>
  )
}

function App() {
  return (
    <div className="flex-1 flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[560px] lg:min-h-[calc(100vh-8rem-220px)] xl:min-h-[620px] overflow-hidden scanlines vignette">
        <div className="absolute inset-0">
          <Image src={IMG.keyArt} alt="Official Grand Theft Auto VI artwork: Jason and Lucia leaning against a car at sunset in Vice City" fill priority sizes="100vw" className="object-cover object-center brightness-[1.12] saturate-[1.15]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/35" />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 lg:pt-10 flex flex-col h-full">
          <div className="flex flex-col gap-4" aria-label="Archive status">
            {statusBars.map((b) => <HeroBar key={b.label} {...b} />)}
          </div>

          <div className="mt-10 lg:mt-16 max-w-[640px]">
            <h1 className="font-cond font-bold uppercase text-paper leading-[0.86] tracking-tight text-[64px] sm:text-[92px] xl:text-[116px] drop-shadow-[0_2px_18px_rgba(7,9,14,0.8)]">
              LEONIDA,<br />DOCUMENTED.
            </h1>
            <p className="mt-5 text-dim text-[17px] sm:text-[19px] leading-relaxed max-w-[420px]">
              News, characters, vehicles, weapons and secrets in one archive.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-10">
              <Link href="/map" className="btn-hero group inline-flex items-center gap-4 border border-paper/90 bg-ink/50 px-6 h-[54px] font-cond font-semibold uppercase tracking-[0.16em] text-[16px] text-paper hover:bg-paper hover:text-ink transition-colors duration-200">
                EXPLORE THE MAP
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center" aria-hidden="true">
                  <Triangle size={12} strokeWidth={2.4} />
                </span>
              </Link>
              <Link href="/database/weapons" className="group inline-flex items-center gap-3 font-cond font-semibold uppercase tracking-[0.16em] text-[16px] text-paper/90 hover:text-paper min-h-[44px]">
                OPEN DATABASE
                <span className="w-8 h-8 rounded-full border border-line flex items-center justify-center group-hover:border-white/50 transition-colors" aria-hidden="true">
                  <ChevronRight size={15} />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative lg:absolute lg:right-8 lg:bottom-8 mt-10 lg:mt-0 self-start">
            <MiniMap className="w-[320px] sm:w-[380px] h-[180px] sm:h-[200px]" label="VICE CITY · 1.86 MI" />
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL STRIP ===== */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8 pt-2 lg:pt-0" aria-label="Latest from the archive">
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr_1fr] gap-4">
          {/* Featured */}
          <Link href="/news/trailer-2-full-analysis" className="card-active panel rounded-sm p-5 flex flex-col sm:flex-row gap-5 group">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="featured" label="FEATURED" /></div>
              <h2 className="font-cond font-bold uppercase text-paper text-[26px] leading-[1.02] tracking-tight mt-3">
                TRAILER 2: FULL ANALYSIS
              </h2>
              <p className="text-dim text-[13px] leading-relaxed mt-2 clamp-2">
                We detail every scene, location and hidden clue from the new trailer.
              </p>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-auto pt-4">
                BY ARCHIVIST&nbsp;&nbsp;·&nbsp;&nbsp;MAY 24, 2024
              </p>
            </div>
            <div className="relative w-full sm:w-[46%] shrink-0 aspect-[16/9] sm:aspect-auto sm:min-h-[150px] overflow-hidden rounded-sm border border-line">
              <Image src={IMG.ambrosiaParty} alt="Revellers covered in mud at an off-road party in the Ambrosia backcountry" fill sizes="(max-width: 1024px) 100vw, 30vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              <span className="absolute inset-0 bg-ink/20" />
              <span className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-ink/70 border border-white/60 flex items-center justify-center text-paper" aria-hidden="true">
                <Play size={16} fill="currentColor" />
              </span>
            </div>
          </Link>

          {/* News card */}
          <Link href="/news/new-vice-city-images-surface-online" className="panel rounded-sm p-5 flex gap-4 group hover:border-white/30 transition-colors">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="news" label="NEWS" /></div>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-3">3 HOURS AGO</p>
              <h3 className="font-cond font-bold uppercase text-paper text-[19px] leading-[1.05] tracking-tight mt-1.5">
                NEW VICE CITY IMAGES SURFACE ONLINE
              </h3>
              <p className="text-dim text-[12px] leading-relaxed mt-2 clamp-3">
                Alleged captures show unseen districts and more traffic.
              </p>
            </div>
            <div className="relative w-[104px] h-[104px] shrink-0 self-center overflow-hidden rounded-sm border border-line">
              <Image src={IMG.swampSkyline} alt="The Vice City skyline seen across the Grassrivers wetlands" fill sizes="104px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
            </div>
          </Link>

          {/* Update card */}
          <Link href="/database/vehicles" className="panel rounded-sm p-5 flex gap-4 group hover:border-white/30 transition-colors">
            <div className="flex-1 min-w-0 flex flex-col">
              <div><StatusBadge status="update" label="UPDATE" /></div>
              <p className="font-cond uppercase tracking-[0.14em] text-[11px] text-dim mt-3">1 DAY AGO</p>
              <h3 className="font-cond font-bold uppercase text-paper text-[19px] leading-[1.05] tracking-tight mt-1.5">
                VEHICLE DATABASE UPDATED
              </h3>
              <p className="text-dim text-[12px] leading-relaxed mt-2 clamp-3">
                12 new vehicles added with detailed information.
              </p>
            </div>
            <div className="relative w-[104px] h-[104px] shrink-0 self-center overflow-hidden rounded-sm border border-line">
              <Image src={IMG.stanierNight} alt="A Vapid Stanier in Vintage Vice City livery, lit by neon at night" fill sizes="104px" className="object-cover group-hover:scale-[1.05] transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default App;
