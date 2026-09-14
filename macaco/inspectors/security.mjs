// Security Probe — defensive and controlled. Read-only GET requests, paced,
// against a short fixed list. It looks for what should not be there; it
// never tries to break in, brute-force, or send anything destructive.
import { PRIVATE_PATHS } from '../guards/auth.mjs'

const REQUIRED_HEADERS = [
  ['content-security-policy', 'MEDIUM', 'No Content-Security-Policy header'],
  ['strict-transport-security', 'MEDIUM', 'No Strict-Transport-Security (HSTS) header'],
  ['x-content-type-options', 'LOW', 'No X-Content-Type-Options header'],
  ['referrer-policy', 'LOW', 'No Referrer-Policy header'],
  ['permissions-policy', 'LOW', 'No Permissions-Policy header'],
]
const SENSITIVE = ['/.env', '/.env.production', '/.git/config', '/.git/HEAD', '/package.json', '/.next/BUILD_ID', '/server.js', '/site-version.json.bak', '/backup.zip', '/.DS_Store', '/api/debug', '/api/users']
const LEAK = [/at [\w.<>]+ \(\/[^)]+:\d+:\d+\)/, /node_modules\//, /Error: [A-Z]\w+/, /ECONNREFUSED|MongoServerError|SyntaxError: Unexpected token|ReferenceError/, /\/home\/\w+\//]
const MARKER = 'macaco"\'<q>7'

export async function probeSecurity(request, { origin, paths = [] }) {
  const findings = []
  const get = async (path, opts = {}) => {
    try {
      const res = await request.get(new URL(path, origin).toString(), { maxRedirects: 0, timeout: 15000, failOnStatusCode: false, ...opts })
      return { status: res.status(), headers: res.headers(), body: (await res.text().catch(() => '')).slice(0, 60000), location: res.headers().location || '' }
    } catch (error) {
      return { status: 0, headers: {}, body: '', error: error.message }
    }
  }
  const pause = () => new Promise((r) => setTimeout(r, 300))

  // 1. Security headers on the main document.
  const home = await get('/')
  for (const [name, severity, message] of REQUIRED_HEADERS) {
    if (!home.headers[name]) findings.push({ check: `security:header-${name}`, severity, message, selector: '/', detail: '' })
  }
  if (/frame-ancestors/.test(home.headers['content-security-policy'] || '') === false && !home.headers['x-frame-options']) {
    findings.push({ check: 'security:clickjacking', severity: 'MEDIUM', message: 'Pages can be framed by other sites (no frame-ancestors / X-Frame-Options)', selector: '/', detail: '' })
  }
  if (home.headers['x-powered-by']) findings.push({ check: 'security:x-powered-by', severity: 'LOW', message: `Server announces its stack: X-Powered-By ${home.headers['x-powered-by']}`, selector: '/', detail: '' })
  for (const cookie of [].concat(home.headers['set-cookie'] || [])) {
    const name = cookie.split('=')[0]
    if (!/;\s*secure/i.test(cookie)) findings.push({ check: 'security:cookie-secure', severity: 'MEDIUM', message: `Cookie ${name} is set without Secure`, selector: name, detail: '' })
    if (!/;\s*httponly/i.test(cookie) && /session|token|auth|sid/i.test(name)) findings.push({ check: 'security:cookie-httponly', severity: 'HIGH', message: `Session-like cookie ${name} is readable by scripts (no HttpOnly)`, selector: name, detail: '' })
  }

  // 2. Private pages and endpoints must not answer anonymously.
  for (const path of PRIVATE_PATHS) {
    await pause()
    const r = await get(path)
    const redirectsToLogin = r.status >= 300 && r.status < 400 && /login|sign/i.test(r.location)
    const refused = [401, 403, 404, 405].includes(r.status)
    const looksPrivate = /watchlist|collections|notifications|email|role|admin|dashboard/i.test(r.body) && !/sign in|log in|login/i.test(r.body.slice(0, 20000))
    if (r.status === 200 && !redirectsToLogin && !refused && (path.startsWith('/api/') ? r.body.trim().startsWith('{') && !/unauth|not signed|error/i.test(r.body) : looksPrivate)) {
      findings.push({ check: 'security:private-open', severity: 'CRITICAL', message: `${path} answers anonymously with what looks like private content`, selector: path, detail: r.body.slice(0, 300) })
    }
    if (r.status >= 500) findings.push({ check: 'security:private-5xx', severity: 'HIGH', message: `${path} crashes (${r.status}) for an anonymous visitor`, selector: path, detail: r.body.slice(0, 300) })
  }

  // 3. Files that must never be served.
  for (const path of SENSITIVE) {
    await pause()
    const r = await get(path)
    if (r.status === 200 && r.body && !/<html/i.test(r.body.slice(0, 500))) {
      findings.push({ check: 'security:sensitive-file', severity: path.startsWith('/.env') || path.startsWith('/.git') ? 'CRITICAL' : 'HIGH', message: `${path} is publicly served`, selector: path, detail: r.body.slice(0, 200) })
    }
  }

  // 4. Unexpected parameters: reflected without escaping? internal errors?
  const targets = ['/', '/wiki/search', ...paths.slice(0, 6)]
  for (const path of targets) {
    await pause()
    const url = `${path}${path.includes('?') ? '&' : '?'}q=${encodeURIComponent(MARKER)}&page=-1&__macaco=${encodeURIComponent(MARKER)}`
    const r = await get(url)
    if (r.body.includes(MARKER)) findings.push({ check: 'security:reflected-input', severity: 'HIGH', message: `${path} reflects a query parameter into the HTML without escaping`, selector: path, detail: `marker ${MARKER} found unescaped` })
    if (r.status >= 500) findings.push({ check: 'security:param-5xx', severity: 'HIGH', message: `${path} crashes (${r.status}) with unexpected parameters`, selector: path, detail: r.body.slice(0, 300) })
    if (LEAK.some((rule) => rule.test(r.body))) findings.push({ check: 'security:error-leak', severity: 'HIGH', message: `${path} exposes internal error details to the visitor`, selector: path, detail: (r.body.match(LEAK.find((rule) => rule.test(r.body))) || [''])[0].slice(0, 200) })
  }

  // 5. Unknown API verbs and methods should be refused cleanly.
  await pause()
  const odd = await get('/api/auth/login', { method: 'GET' })
  if (odd.status >= 500) findings.push({ check: 'security:api-5xx', severity: 'MEDIUM', message: `GET /api/auth/login crashes (${odd.status}) instead of refusing`, selector: '/api/auth/login', detail: odd.body.slice(0, 200) })

  return findings
}

// Checks any 5xx body seen during the crawl for leaked internals.
export function leaksInternals(body) {
  return LEAK.some((rule) => rule.test(body || ''))
}
