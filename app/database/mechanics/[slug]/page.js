'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Repeat2, HeartHandshake, Glasses, Backpack, Siren, Radar, Package, House, ExternalLink, ChevronRight, FileText, Layers, Users } from 'lucide-react'
import DbTabs from '@/components/site/dbtabs'
import { StatusBadge, GhostBadge } from '@/components/site/ui'
import { Breadcrumb, TableOfContents, WikiSection, InfoRow, InfoboxShell } from '@/components/site/wiki'
import { mechanics, characters } from '@/lib/content'

const MECH_ICONS = { switch: Repeat2, relation: HeartHandshake, disguise: Glasses, inventory: Backpack, wanted: Siren, events: Radar, cargo: Package, safehouse: House }

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'detail', label: 'What is documented', icon: Layers },
  { id: 'related', label: 'Related Mechanics', icon: Repeat2 },
  { id: 'characters', label: 'Linked Characters', icon: Users },
]

export default function MechanicPage() {
  const { slug } = useParams()
  const m = mechanics.find((x) => x.slug === slug)

  if (!m) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">RECORD NOT FOUND</p>
        <Link href="/database/mechanics" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← BACK TO MECHANICS</Link>
      </div>
    )
  }

  const Icon = MECH_ICONS[m.icon] || Repeat2
  const related = mechanics.filter((x) => x.slug !== m.slug).slice(0, 4)
  const linkedChars = characters.slice(0, 2)

  return (
    <div className="flex-1 flex flex-col">
      <DbTabs active="mechanics" />
      <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Mechanics', href: '/database/mechanics' }, { label: m.name }]} />

        <div className="data-rail mt-2">MECHANIC FILE · SOURCE-BOUND RECORD · ID {m.slug.toUpperCase()}</div>

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={m.status} />
            <span className="min-w-[26px] h-[22px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[11px] text-dim">{m.glyph}</span>
          </div>
          <h1 data-ghost="MECHANICS" className="ghost-type chromatic-title font-cond font-bold uppercase text-paper tracking-tight leading-[0.9] text-[46px] sm:text-[60px] mt-2">{m.name}</h1>
          <p className="text-paper/85 text-[16px] leading-relaxed mt-4 max-w-[68ch]">{m.desc}</p>
        </header>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_200px_300px] gap-8">
          <div className="min-w-0 order-2 lg:order-1">
            <WikiSection id="overview" title="Overview">
              <p className="text-dim text-[14px] leading-[1.8]">{m.desc}</p>
            </WikiSection>

            <WikiSection id="detail" title="What is documented">
              <p className="text-dim text-[14px] leading-[1.8]">{m.long}</p>
            </WikiSection>

            <WikiSection id="related" title="Related Mechanics">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => {
                  const RIcon = MECH_ICONS[r.icon] || Repeat2
                  return (
                    <Link key={r.slug} href={`/database/mechanics/${r.slug}`} className="panel rounded-sm p-4 hover:border-white/30 transition-colors">
                      <span className="flex items-start justify-between gap-3">
                        <span className="flex items-center gap-2.5 min-w-0">
                          <RIcon size={20} className="text-dim shrink-0" strokeWidth={1.8} aria-hidden="true" />
                          <span className="font-cond font-bold uppercase text-[16px] text-paper leading-tight truncate">{r.name}</span>
                        </span>
                        <span className="shrink-0 min-w-[24px] h-[20px] px-1 rounded-sm border border-line flex items-center justify-center font-cond font-bold text-[10px] text-dim">{r.glyph}</span>
                      </span>
                      <span className="block text-[12px] text-dim leading-relaxed mt-2 clamp-2">{r.desc}</span>
                      <span className="block mt-2"><GhostBadge status={r.status} /></span>
                    </Link>
                  )
                })}
              </div>
            </WikiSection>

            <WikiSection id="characters" title="Linked Characters" className="mb-0">
              <div className="flex flex-col gap-2">
                {linkedChars.map((c) => (
                  <Link key={c.slug} href={`/database/characters/${c.slug}`} className="flex items-center gap-3 border border-line rounded-sm px-3 h-12 group hover:border-white/40 transition-colors">
                    <span className="flex-1 font-cond font-semibold uppercase tracking-[0.08em] text-[14px] text-paper truncate">{c.name}</span>
                    <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim shrink-0">{c.role}</span>
                    <ChevronRight size={14} className="text-dim group-hover:text-paper shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </WikiSection>
          </div>

          <div className="hidden lg:block order-3 lg:order-2">
            <TableOfContents sections={SECTIONS} />
          </div>

          <div className="order-1 lg:order-3">
            <InfoboxShell>
              <div className="flex items-center gap-3">
                <span className="w-14 h-14 rounded-sm panel2 flex items-center justify-center text-pink shrink-0" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="font-cond font-bold uppercase text-[18px] text-paper leading-none truncate">{m.name}</p>
                  <p className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim mt-1.5">Button prompt {m.glyph}</p>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4">
                <InfoRow label="Status">
                  <StatusBadge status={m.status} />
                </InfoRow>
                <InfoRow label="Button prompt" value={m.glyph} />
                <InfoRow label="Published" value={m.publishedAt} />
                <InfoRow label="In the index">
                  <Link href={`/database/mechanics?m=${m.slug}`} className="text-mint hover:text-paper transition-colors">Open in the mechanics list</Link>
                </InfoRow>
              </div>

              <div className="border-t border-white/10 pt-4">
                <a href={m.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 py-1.5 font-cond uppercase tracking-[0.12em] text-[11px] text-paper hover:border-white/40 transition-colors">
                  SOURCE: {m.sourceName.toUpperCase()} <ExternalLink size={11} />
                </a>
                <p className="font-mono text-[9px] text-dim mt-2">Updated {m.updatedAt}</p>
              </div>
            </InfoboxShell>
          </div>
        </div>
      </div>
    </div>
  )
}
