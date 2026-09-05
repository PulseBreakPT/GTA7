'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'
import { cx } from '@/components/site/ui'

const EMPTY = { identifier: '', email: '', username: '', displayName: '', password: '', confirmPassword: '', remember: false }

function safeNext(value) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/account'
}

function LoginScreen() {
  const router = useRouter()
  const params = useSearchParams()
  const { user, loading, capabilities, request } = useAuth()
  const [mode, setMode] = useState(params.get('mode') === 'register' ? 'register' : 'login')
  const [form, setForm] = useState(EMPTY)
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => { if (!loading && user) router.replace(safeNext(params.get('next'))) }, [loading, user, router, params])

  const strength = useMemo(() => {
    const password = form.password
    return [password.length >= 15, password.length >= 22, /\s/.test(password) || password.length >= 28, !/(.)\1{3,}/.test(password)].filter(Boolean).length
  }, [form.password])

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))
  const switchMode = (next) => { setMode(next); setError(''); setSuccess('') }

  const submit = async (event) => {
    event.preventDefault()
    setBusy(true); setError(''); setSuccess('')
    try {
      if (mode === 'recover') {
        const data = await request('forgot-password', { body: { email: form.email } })
        setSuccess(data.message)
      } else if (mode === 'register') {
        if (form.password !== form.confirmPassword) throw new Error('Passwords do not match.')
        await request('register', { body: form })
        router.replace(safeNext(params.get('next')))
      } else {
        await request('login', { body: { identifier: form.identifier, password: form.password, remember: form.remember } })
        router.replace(safeNext(params.get('next')))
      }
    } catch (submitError) {
      setError(submitError.message || 'Authentication failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full max-w-[1180px] mx-auto flex-1 grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] gap-8 lg:gap-14 items-center">
      <section className="auth-intro max-w-[650px]">
        <div className="data-rail">IDENTITY NETWORK · SECURE ARCHIVE ACCESS</div>
        <p className="mt-6 font-cond uppercase tracking-[0.2em] text-[11px] text-mint">LUSORAE membership</p>
        <h1 className="chromatic-title mt-2 font-cond font-bold uppercase tracking-tight leading-[0.86] text-[54px] sm:text-[76px] text-paper">Your archive identity.</h1>
        <p className="mt-5 max-w-[58ch] text-[15px] sm:text-[17px] leading-relaxed text-dim">One account for saved records, future contribution tools and security controls. Credentials stay server-side; sessions remain individually visible and revocable.</p>
        <ul className="mt-7 grid sm:grid-cols-3 gap-3">
          {[
            [ShieldCheck, 'Server sessions', 'Revocable per device'],
            [LockKeyhole, 'Protected credentials', 'Memory-hard hashing'],
            [KeyRound, 'Recovery control', 'One-use expiring links'],
          ].map(([Icon, title, copy]) => (
            <li key={title} className="panel rounded-sm p-4">
              <Icon size={17} className="text-mint" aria-hidden="true" />
              <strong className="mt-3 block font-cond uppercase tracking-[0.08em] text-[13px] text-paper">{title}</strong>
              <span className="mt-1 block text-[11px] text-dim">{copy}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wiki-infobox panel rounded-sm p-5 sm:p-6" aria-labelledby="auth-title">
        <div className="flex items-center gap-2 border-b hairline pb-4" role="tablist" aria-label="Authentication mode">
          {[['login', 'Sign in'], ['register', 'Create account']].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => switchMode(id)} className={cx('h-9 px-3 font-cond font-bold uppercase tracking-[0.12em] text-[11px] border-b-2 transition-colors', mode === id ? 'border-pink text-pink' : 'border-transparent text-dim hover:text-paper')}>{label}</button>
          ))}
        </div>

        <div className="mt-5">
          <p className="font-cond uppercase tracking-[0.16em] text-[10px] text-mint">{mode === 'recover' ? 'Account recovery' : mode === 'register' ? 'New identity' : 'Welcome back'}</p>
          <h2 id="auth-title" className="mt-1 font-cond font-bold uppercase tracking-tight text-[30px] text-paper">{mode === 'recover' ? 'Reset access' : mode === 'register' ? 'Join the archive' : 'Enter Lusorae'}</h2>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          {mode === 'register' && (
            <>
              <AuthField icon={UserRound} label="Display name" autoComplete="name" value={form.displayName} onChange={update('displayName')} maxLength={50} required />
              <AuthField icon={UserRound} label="Username" autoComplete="username" value={form.username} onChange={update('username')} minLength={3} maxLength={30} pattern="[A-Za-z0-9_-]+" required hint="Letters, numbers, _ and -" />
            </>
          )}

          {mode === 'login' ? (
            <AuthField icon={UserRound} label="Email or username" autoComplete="username" value={form.identifier} onChange={update('identifier')} required />
          ) : (
            <AuthField icon={Mail} label="Email" type="email" autoComplete="email" value={form.email} onChange={update('email')} maxLength={254} required />
          )}

          {mode !== 'recover' && (
            <>
              <AuthField icon={LockKeyhole} label="Password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} value={form.password} onChange={update('password')} minLength={mode === 'register' ? 15 : undefined} maxLength={128} required action={<button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-dim hover:text-paper">{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />
              {mode === 'register' && (
                <>
                  <div className="grid grid-cols-4 gap-1" aria-label={`Password strength ${strength} of 4`}>{[0, 1, 2, 3].map((step) => <span key={step} className={cx('h-1 rounded-full', step < strength ? strength >= 4 ? 'bg-mint' : 'bg-pink' : 'bg-black/10')} />)}</div>
                  <p className="font-mono text-[9px] leading-relaxed text-dim">15–128 characters · passphrases welcome · no forced symbols</p>
                  <AuthField icon={LockKeyhole} label="Confirm password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={update('confirmPassword')} minLength={15} maxLength={128} required />
                </>
              )}
            </>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2 font-cond uppercase tracking-[0.1em] text-[10px] text-dim"><input type="checkbox" checked={form.remember} onChange={update('remember')} className="accent-pink" /> Remember for 30 days</label>
              <button type="button" onClick={() => switchMode('recover')} className="font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-pink hover:text-paper">Forgot password?</button>
            </div>
          )}

          {mode === 'recover' && !capabilities.emailDelivery && (
            <p className="border-l-2 border-warn bg-warn/[0.05] px-3 py-2 text-[11px] leading-relaxed text-dim">Recovery email delivery is awaiting server configuration. Existing sessions and passwords remain unaffected.</p>
          )}

          {error && <p role="alert" className="border-l-2 border-pink bg-pink/[0.05] px-3 py-2 text-[12px] leading-relaxed text-paper">{error}</p>}
          {success && <p role="status" className="border-l-2 border-mint bg-mint/[0.05] px-3 py-2 text-[12px] leading-relaxed text-paper">{success}</p>}

          <button disabled={busy || loading} type="submit" className="w-full h-12 inline-flex items-center justify-center gap-3 bg-paper text-ink font-cond font-bold uppercase tracking-[0.16em] text-[13px] disabled:opacity-50 transition-opacity">
            {busy ? 'Securing request…' : mode === 'recover' ? 'Send recovery link' : mode === 'register' ? 'Create secure account' : 'Sign in'}
            {!busy && <ArrowRight size={15} aria-hidden="true" />}
          </button>
        </form>

        {mode === 'recover' && <button type="button" onClick={() => switchMode('login')} className="mt-4 font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim hover:text-paper">← Return to sign in</button>}
        <p className="mt-5 border-t hairline pt-4 text-[10px] leading-relaxed text-dim">By continuing, you accept secure session and audit records strictly necessary to operate your account. LUSORAE never stores your password in readable form.</p>
        <Link href="/" className="mt-3 inline-block font-cond uppercase tracking-[0.12em] text-[10px] text-mint hover:text-paper">Continue without an account</Link>
      </section>
    </div>
  )
}

function AuthField({ icon: Icon, label, hint, action, ...props }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3 font-cond font-semibold uppercase tracking-[0.12em] text-[10px] text-dim"><span>{label}</span>{hint && <small className="font-mono normal-case tracking-normal text-[8px]">{hint}</small>}</span>
      <span className="mt-1.5 h-11 flex items-center gap-2.5 border border-line rounded-sm px-3 bg-white/70 focus-within:border-violet transition-colors">
        <Icon size={14} className="text-mint shrink-0" aria-hidden="true" />
        <input {...props} className="flex-1 min-w-0 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim" />
        {action}
      </span>
    </label>
  )
}

export default function LoginClient() {
  return <Suspense fallback={null}><LoginScreen /></Suspense>
}
