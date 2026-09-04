'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CornerDownLeft, Search } from 'lucide-react'
import { ENTRIES, KIND_META, entryByName } from '@/lib/wiki-graph'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb } from '@/components/site/wiki'

// O «Go» de uma wiki: escreve-se um nome e vai-se direito ao verbete se
// ele existir, em vez de se cair numa lista de resultados. Só quando não
// há correspondência exacta é que a página mostra candidatos — e quando
// não há nada, diz o que fazer a seguir.
function Go() {
  const router = useRouter()
  const params = useSearchParams()
  const q = (params.get('q') || '').trim()
  const [resolved, setResolved] = useState(false)

  const exact = useMemo(() => (q ? entryByName(q) : null), [q])

  const near = useMemo(() => {
    if (!q || exact) return []
    const needle = q.toLowerCase()
    return ENTRIES
      .filter((e) => e.name.toLowerCase().includes(needle))
      .sort((a, b) => a.name.length - b.name.length)
      .slice(0, 12)
  }, [q, exact])

  useEffect(() => {
    if (exact) {
      setResolved(true)
      router.replace(exact.href)
    }
  }, [exact, router])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[900px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Go to entry' }]} />

      <div className="data-rail mt-2">GO · NAME TO ENTRY</div>
      <h1 className="mt-3 font-cond font-bold uppercase tracking-tight text-[40px] sm:text-[52px] leading-[0.95] text-paper">
        {q ? `“${q}”` : 'Go to an entry'}
      </h1>

      {!q && (
        <p className="mt-4 text-[14px] leading-relaxed text-dim max-w-[68ch]">
          Add a name to the address — <span className="font-mono text-[13px] text-paper">/wiki/go?q=vice city</span> — and
          this page opens that entry directly when the archive holds it. Press <kbd className="inline-flex items-center justify-center min-w-[22px] h-6 px-1.5 border border-line rounded-[3px] font-mono text-[11px] text-paper">/</kbd> for
          the full search instead.
        </p>
      )}

      {q && exact && (
        <p className="mt-4 text-[14px] text-dim">
          {resolved ? 'Opening' : 'Found'} <Link href={exact.href} className="text-pink hover:text-paper transition-colors">{exact.name}</Link>.
        </p>
      )}

      {q && !exact && near.length > 0 && (
        <>
          <p className="mt-4 text-[14px] leading-relaxed text-dim max-w-[68ch]">
            No entry carries that name exactly. These hold it inside theirs:
          </p>
          <ul className="mt-4 border border-line divide-y divide-black/[0.08]">
            {near.map((e) => (
              <li key={e.href}>
                <Link href={e.href} className="flex items-center gap-3 px-4 py-3 hover:bg-surface2/50 transition-colors group">
                  <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-mint w-[72px] shrink-0">{KIND_META[e.kind].label}</span>
                  <span className="flex-1 min-w-0 truncate font-cond font-semibold uppercase text-[14px] text-paper group-hover:text-pink transition-colors">{e.name}</span>
                  <StatusBadge status={e.status} className="shrink-0" />
                  <CornerDownLeft size={13} className="text-dim shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {q && !exact && near.length === 0 && (
        <div className="mt-5 panel rounded-sm p-5">
          <p className="flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-paper">
            <Search size={14} className="text-mint" aria-hidden="true" /> No entry by that name
          </p>
          <p className="mt-2.5 text-[13px] leading-relaxed text-dim max-w-[68ch]">
            The archive has {ENTRIES.length} entries and none of them is called that. If the name appears in official
            material, it belongs on{' '}
            <Link href="/wiki/special/wanted" className="text-pink hover:text-paper transition-colors">the wanted list</Link>{' '}
            — the record of what is cited but not yet written.
          </p>
        </div>
      )}
    </div>
  )
}

export default function GoPage() {
  return (
    <Suspense fallback={null}>
      <Go />
    </Suspense>
  )
}
