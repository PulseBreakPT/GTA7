import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function json(data, status = 200) {
  const response = NextResponse.json(data, { status })
  response.headers.set('Cache-Control', 'no-store, max-age=0')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  return response
}

function routeOf(params) {
  return Promise.resolve(params).then((value) => `/${(value.path || []).join('/')}`)
}

// Deliberately minimal liveness endpoint. It exposes no database records,
// versions, hostnames, environment values or dependency state.
export async function GET(_request, { params }) {
  const route = await routeOf(params)
  if (route === '/' || route === '/root' || route === '/status') {
    return json({ ok: true, service: 'gta-lore' })
  }
  return json({ ok: false, error: 'Not found.', code: 'NOT_FOUND' }, 404)
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: 'GET, OPTIONS',
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function methodNotAllowed() {
  return json({ ok: false, error: 'Method not allowed.', code: 'METHOD_NOT_ALLOWED' }, 405)
}

export const POST = methodNotAllowed
export const PUT = methodNotAllowed
export const PATCH = methodNotAllowed
export const DELETE = methodNotAllowed
