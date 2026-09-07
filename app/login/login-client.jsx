'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react'
import { useAuth } from '@/components/site/auth-provider'
import { cx } from '@/components/site/ui'

const EMPTY = { identifier: '', email: '', username: '', displayName: '', password: '', confirmPassword: '', remember: false, termsAccepted: false }

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
    <div className="auth-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 w-full max-w-[1120px] mx-auto flex-1 grid lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] gap-6 lg:gap-12 items-start">
      <section className="auth-card wiki-infobox panel rounded-sm p-5 sm:p-7 lg:p-8" aria-labelledby="auth-title">
        <header className="auth-card-heading">
          <span className="auth-lockmark"><LockKeyhole size={18} aria-hidden="true" /></span>
          <div>
            <p className="font-cond font-bold uppercase tracking-[0.18em] text-[11px] text-violet">Secure archive access</p>
            <h1 id="auth-title" className="mt-1.5 font-cond font-bold uppercase tracking-tight leading-[.94] text-[36px] sm:text-[44px] text-paper">
              {mode === 'recover' ? 'Reset your access' : mode === 'register' ? 'Create your identity' : 'Welcome back'}
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-dim">
              {mode === 'recover' ? 'Enter the verified email connected to your account.' : mode === 'register' ? 'Create one secure account for every GTA Lore wiki tool.' : 'Sign in to continue directly to your personal archive.'}
            </p>
          </div>
        </header>

        <div className="auth-mode-tabs mt-6 grid grid-cols-2 gap-1.5 p-1.5" role="tablist" aria-label="Authentication mode">
          {[['login', 'Sign in'], ['register', 'Create account']].map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => switchMode(id)} className={cx('auth-mode-tab min-h-[44px] px-3 font-cond font-bold uppercase tracking-[0.12em] text-[12px] transition-all', mode === id ? 'is-active' : '')}>{label}</button>
          ))}
        </div>

        <form onSubmit={submit} className="auth-form mt-6 space-y-4">
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
                  <div className="auth-legal-consent">
                    <input id="terms-accepted" type="checkbox" checked={form.termsAccepted} onChange={update('termsAccepted')} required />
                    <label htmlFor="terms-accepted">I agree to the <Link href="/legal/terms" target="_blank" rel="noreferrer">Terms of Use</Link> and acknowledge the <Link href="/legal/privacy" target="_blank" rel="noreferrer">Privacy Notice</Link>.</label>
                  </div>
                </>
              )}
            </>
          )}

          {mode === 'login' && (
            <div className="flex flex-wrap items-center justify-between gap-3 py-1">
              <label className="inline-flex min-h-[40px] items-center gap-2.5 font-cond uppercase tracking-[0.08em] text-[11px] text-dim"><input type="checkbox" checked={form.remember} onChange={update('remember')} className="size-4 accent-pink" /> Remember for 30 days</label>
              <button type="button" onClick={() => switchMode('recover')} className="font-cond font-bold uppercase tracking-[0.08em] text-[11px] text-pink hover:text-paper">Forgot password?</button>
            </div>
          )}

          {mode === 'recover' && !capabilities.emailDelivery && (
            <p className="border-l-2 border-warn bg-warn/[0.05] px-3 py-2 text-[11px] leading-relaxed text-dim">Recovery email delivery is awaiting server configuration. Existing sessions and passwords remain unaffected.</p>
          )}

          {error && <p id="auth-feedback" role="alert" className="border-l-2 border-pink bg-pink/[0.05] px-3 py-2 text-[12px] leading-relaxed text-paper">{error}</p>}
          {success && <p id="auth-feedback" role="status" className="border-l-2 border-mint bg-mint/[0.05] px-3 py-2 text-[12px] leading-relaxed text-paper">{success}</p>}

          <button disabled={busy || loading} aria-busy={busy || loading} aria-describedby={error ? 'auth-feedback' : success ? 'auth-feedback' : undefined} type="submit" className="auth-submit w-full min-h-[54px] inline-flex items-center justify-center gap-3 text-ink font-cond font-bold uppercase tracking-[0.14em] text-[13px] disabled:opacity-50 transition-all">
            {busy ? 'Securing request…' : mode === 'recover' ? 'Send recovery link' : mode === 'register' ? 'Create secure account' : 'Sign in'}
            {!busy && <ArrowRight size={15} aria-hidden="true" />}
          </button>
        </form>

        {mode === 'recover' && <button type="button" onClick={() => switchMode('login')} className="mt-4 font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim hover:text-paper">← Return to sign in</button>}

        <footer className="auth-card-footer mt-6 pt-5">
          <p className="text-[11px] leading-relaxed text-dim">GTA LORE stores only the secure session and audit records required to operate your account. Passwords are never stored in readable form.</p>
          <Link href="/" className="mt-3 inline-flex items-center gap-2 font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-violet hover:text-pink">Continue without an account <ArrowRight size={12} /></Link>
        </footer>
      </section>

      <aside className="auth-intro auth-secondary lg:sticky lg:top-24" aria-labelledby="account-benefits-title">
        <p className="font-cond font-bold uppercase tracking-[0.2em] text-[11px] text-pink">GTA Lore membership</p>
        <h2 id="account-benefits-title" className="chromatic-title mt-2 font-cond font-bold uppercase tracking-tight leading-[.9] text-[38px] sm:text-[50px] text-paper">Your wiki, remembered.</h2>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-dim">Save records, follow changes and manage every active session from one private identity.</p>

        <ul className="auth-benefits mt-6 space-y-3">
          {[
            [ShieldCheck, 'Server sessions', 'See and revoke access separately on every device.'],
            [LockKeyhole, 'Protected credentials', 'Passwords use memory-hard hashing and remain unreadable.'],
            [KeyRound, 'Recovery control', 'Recovery links are single-use and expire automatically.'],
          ].map(([Icon, title, copy]) => (
            <li key={title} className="panel rounded-sm p-4 flex gap-4">
              <span className="auth-benefit-icon"><Icon size={18} aria-hidden="true" /></span>
              <span className="min-w-0">
                <strong className="block font-cond uppercase tracking-[0.07em] text-[14px] text-paper">{title}</strong>
                <span className="mt-1 block text-[12px] leading-relaxed text-dim">{copy}</span>
              </span>
              <Check size={15} className="ml-auto shrink-0 text-pink" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

function AuthField({ icon: Icon, label, hint, action, ...props }) {
  return (
    <label className="auth-field block">
      <span className="flex items-center justify-between gap-3 font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim"><span>{label}</span>{hint && <small className="font-mono normal-case tracking-normal text-[9px]">{hint}</small>}</span>
      <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70 transition-all">
        <Icon size={16} className="text-violet shrink-0" aria-hidden="true" />
        <input {...props} className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper placeholder:text-dim" />
        {action}
      </span>
    </label>
  )
}

export default function LoginClient() {
  return <Suspense fallback={null}><LoginScreen /></Suspense>
}
