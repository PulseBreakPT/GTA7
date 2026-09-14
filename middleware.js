import { NextResponse } from 'next/server'

const SITE = 'https://lusorae.pt'

export function middleware(request) {
  const hasSession = request.cookies.has('__Host-gtalore_session') || request.cookies.has('gtalore_session')
  if (hasSession) return NextResponse.next()

  // A origem vai daqui, não do pedido. Atrás do proxy o `request.url` carrega
  // a origem interna — `new URL('/login', request.url)` mandava toda a gente
  // para https://localhost:3001. Reconstruí-la a partir de X-Forwarded-Host
  // resolveria o sintoma e abria um buraco: quem enviasse esse cabeçalho
  // escolhia para onde o site atirava as visitas. Um Location relativo também
  // não serve — o runtime do middleware exige um URL absoluto. Fica a origem
  // declarada, a mesma de lib/jsonld.js e app/layout.js, que ninguém de fora
  // consegue mexer; em desenvolvimento o pedido chega directo e vale por si.
  const base = process.env.NODE_ENV === 'production' ? SITE : request.url
  const login = new URL('/login', base)
  login.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
  return NextResponse.redirect(login)
}

// The operations desk is gated twice: here, so an anonymous request never
// reaches the renderer, and again on the server inside the page, where the role
// is actually checked. The middleware only knows whether a session cookie
// exists — it cannot know what it is worth.
export const config = { matcher: ['/account/:path*', '/admin/:path*'] }
