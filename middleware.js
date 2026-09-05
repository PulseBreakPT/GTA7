import { NextResponse } from 'next/server'

export function middleware(request) {
  const hasSession = request.cookies.has('__Host-lusorae_session') || request.cookies.has('lusorae_session')
  if (!hasSession) {
    const login = new URL('/login', request.url)
    login.searchParams.set('next', `${request.nextUrl.pathname}${request.nextUrl.search}`)
    return NextResponse.redirect(login)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/account/:path*'] }
