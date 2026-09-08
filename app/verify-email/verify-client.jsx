'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, MailCheck, XCircle } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'

function Verify() {
  const params = useSearchParams()
  const { request, refresh } = useAuth()
  const started = useRef(false)
  const [state, setState] = useState({ status: 'working', message: 'Checking the one-time verification link…' })

  useEffect(() => {
    const verificationToken = params.get('token') || ''
    if (started.current) return
    started.current = true
    if (!verificationToken) return setState({ status: 'error', message: 'This verification link is incomplete.' })
    request('verify-email', { body: { token: verificationToken } })
      .then(async (data) => { await refresh(); setState({ status: 'success', message: data.message }) })
      .catch((error) => setState({ status: 'error', message: error.message }))
  }, [params, request, refresh])

  const Icon = state.status === 'success' ? CheckCircle2 : state.status === 'error' ? XCircle : MailCheck
  return (
    <div className="ambient-bloom px-4 py-16 w-full max-w-[620px] mx-auto flex-1 flex items-center">
      <section className="wiki-infobox panel rounded-sm p-6 sm:p-8 w-full text-center">
        <Icon size={34} className={state.status === 'error' ? 'text-pink mx-auto' : 'text-mint mx-auto'} />
        <p className="mt-5 font-cond uppercase tracking-[0.16em] text-[10px] text-mint">Email verification</p>
        <h1 className="mt-1 font-cond font-bold uppercase text-[34px] text-paper">{state.status === 'success' ? 'Identity verified' : state.status === 'error' ? 'Link unavailable' : 'Verifying identity'}</h1>
        <p role="status" className="mt-4 text-[13px] leading-relaxed text-dim">{state.message}</p>
        <Link href={state.status === 'success' ? '/account' : '/login'} className="mt-6 inline-flex h-11 items-center px-5 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px]">{state.status === 'success' ? 'Open account' : 'Return to sign in'}</Link>
      </section>
    </div>
  )
}

export default function VerifyClient() { return <Suspense fallback={null}><Verify /></Suspense> }
