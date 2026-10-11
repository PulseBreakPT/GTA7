'use client'
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Shuffle, ArrowRight, Library } from 'lucide-react'
import { ENTRIES, KIND_META } from '@/lib/wiki-graph'

function RandomChooser() {
  const router = useRouter()
  const params = useSearchParams()
  const kind = params.get('kind') || ''
  const [chosen, setChosen] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const pool = kind && KIND_META[kind] ? ENTRIES.filter((entry) => entry.kind === kind) : ENTRIES
    const entries = pool.length ? pool : ENTRIES
    if (!entries.length) return
    const target = entries[Math.floor(Math.random() * entries.length)]
    setChosen(target)
    router.replace(target.href)
  }, [kind, router, attempt])

  return (
    <div className="ambient-bloom mx-auto flex min-h-[60vh] w-full max-w-[780px] flex-col justify-center px-5 py-12 sm:px-8">
      <div className="data-rail">GTA LORE · DISCOVERY</div>
      <Shuffle size={34} className="mt-6 text-pink" aria-hidden="true" />
      <h1 className="mt-4 font-cond text-[42px] font-bold uppercase leading-none text-paper sm:text-[58px]">Surprise me.</h1>
      <p role="status" className="mt-4 max-w-[55ch] text-[14px] leading-relaxed text-dim">
        {chosen ? 'Opening a random ' + KIND_META[chosen.kind].label.toLowerCase() + ' from the archive…' : 'Finding a random page from the archive…'}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        {chosen && <Link href={chosen.href} className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-pink px-4 font-cond font-semibold text-white">Open {chosen.name} <ArrowRight size={16} /></Link>}
        <button type="button" onClick={() => setAttempt((value) => value + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line px-4 font-cond font-semibold text-paper hover:border-pink"><Shuffle size={16} /> Another entry</button>
        <Link href="/wiki" className="inline-flex min-h-11 items-center gap-2 rounded-sm border border-line px-4 font-cond font-semibold text-paper"><Library size={16} /> Wiki home</Link>
      </div>
    </div>
  )
}
export default function RandomPage() {
  return <Suspense fallback={<div role="status" className="mx-auto max-w-[780px] px-5 py-20 text-dim">Choosing a page…</div>}><RandomChooser /></Suspense>
}
