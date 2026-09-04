'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Gauge, Radio } from 'lucide-react'
import { PadGlyph, cx } from './ui'

// O rodapé segue a mesma lógica do menu: cada grupo tem a sua cor, e o
// destaque de passagem é um véu nessa cor em vez do cinzento comum. Os
// grupos são os mesmos três da folha do menu — quem aprende a divisão
// num sítio reconhece-a no outro.
const TINT = {
  violet: { text: 'text-violet', dot: 'bg-violet', hover: 'hover:bg-violet/[0.07] hover:text-violet' },
  pink: { text: 'text-pink', dot: 'bg-pink', hover: 'hover:bg-pink/[0.07] hover:text-pink' },
  mint: { text: 'text-mint', dot: 'bg-mint', hover: 'hover:bg-mint/[0.07] hover:text-mint' },
}

const INDEX = [
  {
    label: 'Wiki', tint: 'violet',
    links: [
      ['All entries', '/wiki'],
      ['Characters', '/database/characters'],
      ['Vehicles', '/database/vehicles'],
      ['Weapons', '/database/weapons'],
      ['Leonida map', '/map'],
    ],
  },
  {
    label: 'Read', tint: 'pink',
    links: [
      ['News', '/news'],
      ['Guides', '/guides'],
      ['Media', '/media'],
      ['Categories', '/categories'],
      ['Editions', '/editions'],
    ],
  },
  {
    label: 'About the archive', tint: 'mint',
    links: [
      ['Sources', '/sources'],
      ['Statistics', '/wiki/statistics'],
      ['Recent changes', '/wiki/changes'],
      ['Special pages', '/wiki/special'],
      ['All pages', '/wiki/all'],
      ['Glossary', '/wiki/glossary'],
      ['How to read it', '/wiki/help'],
      ['Source policy', '/guides/feature-roundup-source-guide'],
    ],
  },
]

function currentSection(pathname) {
  if (pathname === '/') return 'ARCHIVE INDEX'
  if (pathname.startsWith('/news')) return 'ARTICLE RECORDS'
  if (pathname.startsWith('/categories')) return 'CATEGORY INDEX'
  if (pathname.startsWith('/map')) return 'LEONIDA FIELD GUIDE'
  if (pathname.startsWith('/database')) return 'DATABASE RECORDS'
  if (pathname.startsWith('/guides')) return 'REFERENCE GUIDES'
  if (pathname.startsWith('/easter-eggs')) return 'SECRET INDEX'
  if (pathname.startsWith('/wiki')) return 'ARCHIVE INDEX'
  if (pathname.startsWith('/sources')) return 'PROVENANCE'
  if (pathname.startsWith('/media')) return 'VISUAL RECORD'
  return 'ARCHIVE'
}

export default function Footer() {
  const pathname = usePathname() || '/'
  const section = currentSection(pathname)

  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink" aria-label="Leonida Archive footer">
      {/* O mesmo filete das três cores que assina a barra de navegação. */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-70" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-mint via-transparent to-violet opacity-60" aria-hidden="true" />

      {/* A grelha estava escrita a branco: no tema claro era branco sobre
          branco, ou seja, nada. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(11,15,22,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,15,22,.03) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'linear-gradient(90deg, black, transparent 75%)',
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.95fr)] gap-8 lg:gap-14">
          <section className="max-w-[430px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mint">Independent fan reference</p>
            <h2 className="ghost-type chromatic-title mt-2 font-cond font-bold uppercase tracking-tight leading-[.82] text-[40px] sm:text-[52px] text-paper" data-ghost="LUSORAE">LEONIDA<br />ARCHIVE</h2>
            <p className="mt-3 text-[13px] leading-[1.55] text-dim">A navigable GTA VI fan archive built around source labels, official material and clearly marked community reporting.</p>
            <div className="data-rail mt-4">LUSORAE · INDEX 01 · {section}</div>
          </section>

          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-7" aria-label="Footer navigation">
            {INDEX.map((group) => {
              const tint = TINT[group.tint]
              return (
                <section key={group.label}>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] mb-2.5">
                    <span className={cx('w-1.5 h-1.5 rounded-full shrink-0', tint.dot)} aria-hidden="true" />
                    <span className={tint.text}>{group.label}</span>
                  </p>
                  <ul className="space-y-0.5">
                    {group.links.map(([label, href]) => {
                      const active = pathname === href
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={cx(
                              // O alvo é a linha inteira, não só as letras:
                              // um link de rodapé com 14px de altura é uma
                              // caça ao pixel, sobretudo com o polegar.
                              'group flex items-center justify-between gap-2 -mx-2 px-2 h-9 rounded-lg',
                              'font-cond font-semibold uppercase tracking-[0.1em] text-[14px] transition-colors duration-200',
                              active ? cx(tint.text, 'bg-black/[0.04]') : cx('text-dim', tint.hover)
                            )}
                          >
                            <span className="truncate">{label}</span>
                            <ArrowUpRight
                              size={13}
                              className="shrink-0 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                              aria-hidden="true"
                            />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-dim" aria-hidden="true">
            <PadGlyph shape="cross" size={15} />
            <PadGlyph shape="circle" size={15} />
            <PadGlyph shape="triangle" size={15} />
            <PadGlyph shape="square" size={15} />
          </div>
          <p className="max-w-[660px] text-[11px] leading-relaxed text-dim sm:text-center">
            Independent fan project. Not affiliated with Rockstar Games, Take-Two Interactive, or their subsidiaries.
            Game details can change; individual records identify their source status.
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-dim">
            <Radio size={13} className="text-mint" aria-hidden="true" />
            <span>ARCHIVE ONLINE</span>
            <Gauge size={14} className="text-pink" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  )
}
