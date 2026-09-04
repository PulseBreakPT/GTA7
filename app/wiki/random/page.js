'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Shuffle } from 'lucide-react'
import { ENTRIES, KIND_META } from '@/lib/wiki-graph'

// O Special:Random. Escolhe no cliente e não no servidor, porque uma
// escolha feita no servidor seria guardada em cache e devolveria a mesma
// entrada a toda a gente — deixando de ser aleatória.
// `?kind=` restringe o sorteio a um ramo: é o «random in this category»
// que uma wiki tem no rodapé de cada artigo, e não um segundo botão.
function RandomEntry() {
  const router = useRouter()
  const params = useSearchParams()
  const kind = params.get('kind')
  const pool = kind && KIND_META[kind] ? ENTRIES.filter((e) => e.kind === kind) : ENTRIES
  const [target, setTarget] = useState(null)

  useEffect(() => {
    const list = pool.length > 0 ? pool : ENTRIES
    const pick = list[Math.floor(Math.random() * list.length)]
    setTarget(pick)
    if (pick) router.replace(pick.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-24 text-center flex-1">
      <Shuffle size={28} className="text-mint mx-auto" aria-hidden="true" />
      <p className="mt-4 font-cond font-bold uppercase tracking-[0.16em] text-[20px] text-paper">
        Opening a random entry
      </p>
      <p className="mt-2 text-[13px] text-dim">
        One of {pool.length} {kind && KIND_META[kind] ? KIND_META[kind].plural.toLowerCase() : 'records'} in the archive.
      </p>
      {target && (
        <Link href={target.href} className="mt-6 inline-flex items-center gap-2 border border-line h-11 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-paper hover:border-mint hover:text-mint transition-colors">
          {target.name} →
        </Link>
      )}
    </div>
  )
}

// `useSearchParams` obriga o que o rodeia a esperar pelo cliente; fica
// isolado para o resto da página continuar a ser servido de imediato.
export default function RandomEntryPage() {
  return (
    <Suspense fallback={null}>
      <RandomEntry />
    </Suspense>
  )
}
