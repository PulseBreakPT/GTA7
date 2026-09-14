import { Suspense } from 'react'
import LoginClient from './login-client'

// O modo vem do endereço, e o título tem de o acompanhar: `?mode=register`
// entregava «Sign in | GTA LORE» a quem estava a criar conta.
export async function generateMetadata({ searchParams }) {
  const params = (await searchParams) || {}
  const mode = typeof params.mode === 'string' ? params.mode : 'login'
  const titulo = mode === 'register' ? 'Create account' : mode === 'recover' ? 'Recover access' : 'Sign in'
  const descricao = mode === 'register'
    ? 'Create one secure GTA LORE account for every wiki tool.'
    : mode === 'recover'
      ? 'Recover access to your GTA LORE archive identity.'
      : 'Secure access to your GTA LORE archive identity.'

  return { title: titulo, description: descricao, robots: { index: false, follow: false } }
}

// O formulário tem de existir no HTML servido. O cliente usa
// `useSearchParams` e estava dentro de um `Suspense` com fallback vazio: sem
// JavaScript, ou antes de hidratar, a página de autenticação era a casca do
// sítio — sem rótulos, sem campos e sem botão. A fronteira passa para aqui e
// o fallback é uma versão estática dos mesmos campos, que o cliente
// substitui assim que assume.
function AuthShell({ mode }) {
  const registar = mode === 'register'
  return (
    <div className="auth-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 w-full max-w-[1120px] mx-auto flex-1 grid lg:grid-cols-[minmax(420px,520px)_minmax(0,1fr)] gap-6 lg:gap-12 items-start">
      <section className="auth-card wiki-infobox panel rounded-sm p-5 sm:p-7 lg:p-8" aria-labelledby="auth-title">
        <header className="auth-card-heading">
          <div>
            <p className="font-cond font-bold uppercase tracking-[0.18em] text-[11px] text-violet">Secure archive access</p>
            <h1 id="auth-title" className="mt-1.5 font-cond font-bold uppercase tracking-tight leading-[.94] text-[36px] sm:text-[44px] text-paper">
              {registar ? 'Create your identity' : 'Welcome back'}
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-dim">
              {registar ? 'Create one secure account for every GTA Lore wiki tool.' : 'Sign in to continue directly to your personal archive.'}
            </p>
          </div>
        </header>

        <div className="auth-mode-tabs mt-6 grid grid-cols-2 gap-1.5 p-1.5">
          <a href="/login" className={`auth-mode-tab min-h-[44px] px-3 inline-flex items-center justify-center font-cond font-bold uppercase tracking-[0.12em] text-[12px] ${registar ? '' : 'is-active'}`}>Sign in</a>
          <a href="/login?mode=register" className={`auth-mode-tab min-h-[44px] px-3 inline-flex items-center justify-center font-cond font-bold uppercase tracking-[0.12em] text-[12px] ${registar ? 'is-active' : ''}`}>Create account</a>
        </div>

        <form className="auth-form mt-6 space-y-4" method="post" action="/login">
          {registar && (
            <>
              <label className="auth-field block"><span className="font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim">Display name</span>
                <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70"><input name="displayName" autoComplete="name" maxLength={50} required className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper" /></span></label>
              <label className="auth-field block"><span className="font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim">Username</span>
                <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70"><input name="username" autoComplete="username" minLength={3} maxLength={30} required className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper" /></span></label>
            </>
          )}

          <label className="auth-field block"><span className="font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim">{registar ? 'Email' : 'Email or username'}</span>
            <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70"><input name={registar ? 'email' : 'identifier'} type={registar ? 'email' : 'text'} autoComplete={registar ? 'email' : 'username'} required className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper" /></span></label>

          <label className="auth-field block"><span className="font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim">Password</span>
            <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70"><input name="password" type="password" autoComplete={registar ? 'new-password' : 'current-password'} minLength={registar ? 15 : undefined} maxLength={128} required className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper" /></span></label>

          {registar && (
            <label className="auth-field block"><span className="font-cond font-bold uppercase tracking-[0.1em] text-[11px] text-dim">Confirm password</span>
              <span className="auth-input-shell mt-2 min-h-[52px] flex items-center gap-3 border border-line rounded-sm px-3.5 bg-white/70"><input name="confirmPassword" type="password" autoComplete="new-password" minLength={15} maxLength={128} required className="flex-1 min-w-0 bg-transparent outline-none text-[16px] text-paper" /></span></label>
          )}

          <button type="submit" className="auth-submit w-full min-h-[54px] inline-flex items-center justify-center gap-3 text-ink font-cond font-bold uppercase tracking-[0.14em] text-[13px]">
            {registar ? 'Create secure account' : 'Sign in'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default async function LoginPage({ searchParams }) {
  const params = (await searchParams) || {}
  const mode = params.mode === 'register' ? 'register' : 'login'
  return <Suspense fallback={<AuthShell mode={mode} />}><LoginClient /></Suspense>
}
