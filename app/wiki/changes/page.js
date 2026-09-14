import { Suspense } from 'react'
import Link from 'next/link'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { ENTRIES, RECENT, KIND_META } from '@/lib/wiki-graph'
import RecentChangesClient from './changes-client'

// O registo de alterações é conteúdo, não um enfeite da interface: tem de
// existir no HTML servido. A rota era um componente de cliente inteiro dentro
// de um `Suspense` com fallback vazio, e o que o servidor entregava acabava
// no menu da wiki — sem título de secção, sem lista e sem estado vazio.
//
// Agora o servidor desenha o registo completo por data. Os filtros por ramo e
// o `?related=` continuam a ser do cliente, que assume assim que hidratar.
function ChangesShell() {
  const dias = (() => {
    const mapa = new Map()
    RECENT.forEach((e) => {
      if (!mapa.has(e.updatedAt)) mapa.set(e.updatedAt, [])
      mapa.get(e.updatedAt).push(e)
    })
    return [...mapa.entries()].sort(([a], [b]) => b.localeCompare(a))
  })()

  // Uma entrada sem data não desaparece do histórico: fica listada à parte.
  // As seis regiões nunca foram datadas, e por isso o registo mostrava 936
  // de 942 entradas sem dizer que as outras seis existiam. Datadas mais
  // não datadas têm de dar o total do arquivo.
  const semData = ENTRIES.filter((entry) => !entry.updatedAt)

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Recent changes' }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Special page"
          title="Recent changes"
          description="Every entry by the date it was last checked against its source. This archive has no public editing, so there is no edit history to show — what it can show is when each record was last verified."
          count={RECENT.length}
          countLabel="dated entries"
          updatedAt={RECENT[0]?.updatedAt}
        />
      </div>

      {dias.length === 0 ? (
        <p className="mt-6 panel rounded-sm p-6 text-[14px] text-dim">No recent changes. No entry in the archive carries a verification date yet.</p>
      ) : (
        <div className="mt-6 space-y-8">
          {dias.slice(0, 12).map(([dia, items]) => (
            <section key={dia} aria-label={`Checked on ${dia}`}>
              <div className="flex items-center gap-3">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper">{dia}</h2>
                <span className="ml-auto font-mono text-[10px] text-dim">{items.length}</span>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.slice(0, 40).map((e) => (
                  <li key={e.href}>
                    <Link href={e.href} className="group flex min-h-[108px] h-full flex-col border border-line bg-white/55 p-4 hover:border-pink/55 hover:bg-white transition-colors">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint">{KIND_META[e.kind].label}</span>
                        <StatusBadge status={e.status} className="shrink-0" />
                      </span>
                      <span className="mt-3 font-cond font-semibold uppercase text-[15px] leading-tight text-paper line-clamp-2 group-hover:text-pink transition-colors">{e.name}</span>
                      {e.stub && <span className="mt-auto pt-3 font-cond uppercase tracking-[0.14em] text-[8px] text-warn">Stub entry</span>}
                    </Link>
                  </li>
                ))}
              </ul>
              {items.length > 40 && <p className="mt-1.5 font-mono text-[10px] text-dim">+{items.length - 40} more on this date</p>}
            </section>
          ))}
        </div>
      )}

      {semData.length > 0 && (
        <section className="mt-10" aria-labelledby="undated-heading">
          <div className="flex items-center gap-3">
            <h2 id="undated-heading" className="font-cond font-bold uppercase tracking-[0.12em] text-[14px] text-paper">Undated</h2>
            <span className="ml-auto font-mono text-[10px] text-dim">{semData.length}</span>
          </div>
          <p className="mt-2 max-w-[72ch] text-[13px] leading-relaxed text-dim">
            These entries have never been stamped with a date on which they were checked against their source. They are
            listed here rather than left out of the record: {RECENT.length} dated and {semData.length} undated account for
            all {ENTRIES.length} entries in the archive.
          </p>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {semData.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="group flex min-h-[108px] h-full flex-col border border-line bg-white/55 p-4 hover:border-pink/55 hover:bg-white transition-colors">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint">{KIND_META[e.kind].label}</span>
                    <StatusBadge status={e.status} className="shrink-0" />
                  </span>
                  <span className="mt-3 font-cond font-semibold uppercase text-[15px] leading-tight text-paper line-clamp-2 group-hover:text-pink transition-colors">{e.name}</span>
                  <span className="mt-auto pt-3 font-cond uppercase tracking-[0.14em] text-[8px] text-dim">No verification date recorded</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function RecentChangesPage() {
  return <Suspense fallback={<ChangesShell />}><RecentChangesClient /></Suspense>
}
