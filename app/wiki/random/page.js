'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shuffle } from 'lucide-react'
import { ENTRIES } from '@/lib/wiki-graph'

// O Special:Random. Escolhe no cliente e não no servidor, porque uma
// escolha feita no servidor seria guardada em cache e devolveria a mesma
// entrada a toda a gente — deixando de ser aleatória.
export default function RandomEntryPage() {
  const router = useRouter()
  const [target, setTarget] = useState(null)

  useEffect(() => {
    const pick = ENTRIES[Math.floor(Math.random() * ENTRIES.length)]
    setTarget(pick)
    if (pick) router.replace(pick.href)
  }, [router])

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-24 text-center flex-1">
      <Shuffle size={28} className="text-mint mx-auto" aria-hidden="true" />
      <p className="mt-4 font-cond font-bold uppercase tracking-[0.16em] text-[20px] text-paper">
        Opening a random entry
      </p>
      <p className="mt-2 text-[13px] text-dim">
        One of {ENTRIES.length} records in the archive.
      </p>
      {target && (
        <Link href={target.href} className="mt-6 inline-flex items-center gap-2 border border-line h-11 px-5 font-cond font-semibold uppercase tracking-[0.14em] text-[12px] text-paper hover:border-mint hover:text-mint transition-colors">
          {target.name} →
        </Link>
      )}
    </div>
  )
}
