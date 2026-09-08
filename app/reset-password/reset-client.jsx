'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, KeyRound, LockKeyhole } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'

function Reset() {
  const params = useSearchParams()
  const { request } = useAuth()
  const resetToken = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const submit = async (event) => {
    event.preventDefault(); setError(''); setSuccess('')
    if (!resetToken) return setError('This recovery link is incomplete.')
    if (password !== confirm) return setError('Passwords do not match.')
    setBusy(true)
    try {
      const data = await request('reset-password', { body: { token: resetToken, password } })
      setSuccess(data.message); setPassword(''); setConfirm('')
    } catch (submitError) { setError(submitError.message) }
    finally { setBusy(false) }
  }

  return (
    <div className="ambient-bloom px-4 py-12 sm:py-16 w-full max-w-[660px] mx-auto flex-1 flex items-center">
      <section className="wiki-infobox panel rounded-sm p-6 sm:p-8 w-full">
        <KeyRound size={27} className="text-mint" />
        <p className="mt-5 font-cond uppercase tracking-[0.16em] text-[10px] text-mint">One-time recovery</p>
        <h1 className="mt-1 font-cond font-bold uppercase text-[36px] text-paper">Choose a new password</h1>
        <p className="mt-3 text-[13px] leading-relaxed text-dim">The link expires after one hour and becomes invalid immediately after use. Resetting closes every existing session.</p>
        {!success ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <ResetField label="New password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={15} maxLength={128} autoComplete="new-password" />
            <ResetField label="Confirm password" value={confirm} onChange={(event) => setConfirm(event.target.value)} minLength={15} maxLength={128} autoComplete="new-password" />
            <p className="font-mono text-[9px] text-dim">15–128 characters · long passphrases recommended</p>
            {error && <p role="alert" className="border-l-2 border-pink bg-pink/[0.05] px-3 py-2 text-[12px] text-paper">{error}</p>}
            <button disabled={busy} className="w-full h-12 inline-flex items-center justify-center gap-3 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px] disabled:opacity-50">{busy ? 'Replacing securely…' : 'Replace password'}{!busy && <ArrowRight size={14} />}</button>
          </form>
        ) : (
          <div className="mt-6"><p role="status" className="border-l-2 border-mint bg-mint/[0.05] px-3 py-2 text-[12px] text-paper">{success}</p><Link href="/login" className="mt-5 inline-flex h-11 items-center px-5 bg-paper text-ink font-cond font-bold uppercase tracking-[0.14em] text-[11px]">Sign in</Link></div>
        )}
      </section>
    </div>
  )
}

function ResetField({ label, ...props }) { return <label className="block"><span className="font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim">{label}</span><span className="mt-1.5 h-11 flex items-center gap-2.5 border border-line rounded-sm px-3 bg-white/70"><LockKeyhole size={14} className="text-mint" /><input {...props} required type="password" className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-paper" /></span></label> }

export default function ResetClient() { return <Suspense fallback={null}><Reset /></Suspense> }
