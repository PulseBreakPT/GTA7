import 'server-only'

import { createHash, randomBytes, randomUUID, scrypt as scryptCallback, timingSafeEqual } from 'crypto'
import { promisify } from 'util'
import { cookies } from 'next/headers'
import { getDb } from './mongo'

const scrypt = promisify(scryptCallback)
const production = process.env.NODE_ENV === 'production'

export const SESSION_COOKIE = production ? '__Host-gtalorewiki_session' : 'gtalorewiki_session'
export const CSRF_COOKIE = production ? '__Host-gtalorewiki_csrf' : 'gtalorewiki_csrf'

const DAY = 86_400_000
const SCRYPT_OPTIONS = { N: 65_536, r: 8, p: 1, maxmem: 96 * 1024 * 1024 }
const COMMON_PASSWORDS = new Set([
  'password', 'password1', 'password123', '123456789012345', 'qwertyuiopasdfg',
  'letmeinletmeinletmein', 'grandtheftauto6', 'grandtheftautovi', 'vicecityvicecity',
  'gtalorewikigtalorewiki', 'iloveyouiloveyou', 'adminadminadmin', 'correcthorsebatterystaple',
])
// O nome antigo fica reservado de propósito: o sítio continua em
// lusorae.pt, e um utilizador chamado «lusorae» passaria por oficial.
const RESERVED_USERNAMES = new Set(['admin', 'administrator', 'root', 'system', 'support', 'security', 'moderator', 'gtalorewiki', 'gta-lore-wiki', 'gtalore', 'lusorae', 'rockstar'])

export const DEFAULT_WIKI_PREFERENCES = Object.freeze({
  publicProfile: true,
  recordHistory: true,
  compactMode: false,
})

export function wikiPreferences(user) {
  return { ...DEFAULT_WIKI_PREFERENCES, ...(user?.wikiPreferences || {}) }
}

export class AuthError extends Error {
  constructor(message, status = 400, code = 'AUTH_ERROR') {
    super(message)
    this.status = status
    this.code = code
  }
}

const sha256 = (value) => createHash('sha256').update(String(value)).digest('hex')
const token = (bytes = 32) => randomBytes(bytes).toString('base64url')
const normaliseEmail = (value) => String(value || '').trim().toLowerCase()
const normaliseUsername = (value) => String(value || '').trim().toLowerCase()

export function safeEqual(a, b) {
  const left = Buffer.from(String(a || ''))
  const right = Buffer.from(String(b || ''))
  return left.length === right.length && timingSafeEqual(left, right)
}

export function publicUser(user) {
  if (!user) return null
  return {
    id: user.id,
    email: user.email,
    emailVerified: Boolean(user.emailVerifiedAt),
    username: user.username,
    displayName: user.displayName,
    bio: user.bio || '',
    role: user.role || 'reader',
    wikiPreferences: wikiPreferences(user),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

function deviceLabel(userAgent = '') {
  const browser = /Edg\//.test(userAgent) ? 'Edge' : /Firefox\//.test(userAgent) ? 'Firefox' : /Chrome\//.test(userAgent) ? 'Chrome' : /Safari\//.test(userAgent) ? 'Safari' : 'Browser'
  const device = /iPhone|Android.*Mobile/i.test(userAgent) ? 'Mobile' : /iPad|Tablet/i.test(userAgent) ? 'Tablet' : 'Desktop'
  return `${browser} · ${device}`
}

function requestContext(request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = String(request.headers.get('user-agent') || '').slice(0, 512)
  return { ipHash: sha256(ip), userAgent, device: deviceLabel(userAgent) }
}

let indexesPromise
export async function ensureAuthIndexes() {
  if (!indexesPromise) {
    indexesPromise = (async () => {
      const db = await getDb()
      await Promise.all([
        db.collection('auth_users').createIndex({ emailNormalized: 1 }, { unique: true, name: 'unique_email' }),
        db.collection('auth_users').createIndex({ usernameNormalized: 1 }, { unique: true, name: 'unique_username' }),
        db.collection('auth_sessions').createIndex({ tokenHash: 1 }, { unique: true, name: 'unique_session_token' }),
        db.collection('auth_sessions').createIndex({ userId: 1, expiresAt: -1 }, { name: 'user_sessions' }),
        db.collection('auth_sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: 'expire_sessions' }),
        db.collection('auth_tokens').createIndex({ tokenHash: 1 }, { unique: true, name: 'unique_auth_token' }),
        db.collection('auth_tokens').createIndex({ userId: 1, type: 1 }, { name: 'user_auth_tokens' }),
        db.collection('auth_tokens').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: 'expire_auth_tokens' }),
        db.collection('auth_limits').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: 'expire_rate_limits' }),
        db.collection('auth_audit').createIndex({ userId: 1, createdAt: -1 }, { name: 'user_audit' }),
        db.collection('auth_audit').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: 'expire_audit' }),
        db.collection('wiki_watchlist').createIndex({ userId: 1, key: 1 }, { unique: true, name: 'user_watched_page' }),
        db.collection('wiki_watchlist').createIndex({ userId: 1, createdAt: -1 }, { name: 'watchlist_recent' }),
        db.collection('wiki_history').createIndex({ userId: 1, key: 1 }, { unique: true, name: 'user_read_page' }),
        db.collection('wiki_history').createIndex({ userId: 1, lastViewedAt: -1 }, { name: 'reading_history_recent' }),
        db.collection('wiki_suggestions').createIndex({ userId: 1, createdAt: -1 }, { name: 'user_suggestions' }),
        db.collection('wiki_suggestions').createIndex({ status: 1, createdAt: 1 }, { name: 'suggestion_queue' }),
        db.collection('wiki_collections').createIndex({ userId: 1, id: 1 }, { unique: true, name: 'user_collection' }),
        db.collection('wiki_collections').createIndex({ userId: 1, nameNormalized: 1 }, { unique: true, name: 'unique_user_collection_name' }),
        db.collection('wiki_collection_items').createIndex({ userId: 1, collectionId: 1, key: 1 }, { unique: true, name: 'unique_collection_page' }),
        db.collection('wiki_collection_items').createIndex({ userId: 1, collectionId: 1, createdAt: -1 }, { name: 'collection_pages' }),
        db.collection('wiki_notes').createIndex({ userId: 1, key: 1 }, { unique: true, name: 'user_page_note' }),
        db.collection('wiki_notes').createIndex({ userId: 1, updatedAt: -1 }, { name: 'recent_user_notes' }),
      ])
      return db
    })().catch((error) => {
      indexesPromise = null
      throw error
    })
  }
  return indexesPromise
}

async function derivePassword(password, salt) {
  return scrypt(String(password).normalize('NFKC'), salt, 64, SCRYPT_OPTIONS)
}

export function passwordProblems(password, { email = '', username = '' } = {}) {
  const value = typeof password === 'string' ? password : ''
  const length = Array.from(value).length
  const lower = value.trim().toLowerCase()
  const problems = []
  if (length < 15) problems.push('Use at least 15 characters.')
  if (length > 128) problems.push('Use no more than 128 characters.')
  if (COMMON_PASSWORDS.has(lower)) problems.push('Choose a less common password.')
  const personal = [normaliseUsername(username), normaliseEmail(email).split('@')[0]].filter((part) => part.length >= 4)
  if (personal.some((part) => lower.includes(part))) problems.push('Do not include your email or username.')
  return problems
}

export async function hashPassword(password) {
  const salt = randomBytes(16)
  const derived = await derivePassword(password, salt)
  return `scrypt$${SCRYPT_OPTIONS.N}$${SCRYPT_OPTIONS.r}$${SCRYPT_OPTIONS.p}$${salt.toString('base64url')}$${Buffer.from(derived).toString('base64url')}`
}

export async function verifyPassword(password, encoded) {
  try {
    const [algorithm, n, r, p, saltValue, hashValue] = String(encoded).split('$')
    if (algorithm !== 'scrypt' || Number(n) !== SCRYPT_OPTIONS.N || Number(r) !== SCRYPT_OPTIONS.r || Number(p) !== SCRYPT_OPTIONS.p) return false
    const expected = Buffer.from(hashValue, 'base64url')
    const actual = Buffer.from(await derivePassword(password, Buffer.from(saltValue, 'base64url')))
    return expected.length === actual.length && timingSafeEqual(expected, actual)
  } catch {
    return false
  }
}

const DUMMY_SALT = Buffer.from('lxJX0U6dpbe5J2Z2p6IyVw', 'base64url')
export async function burnPasswordAttempt(password) {
  await derivePassword(password, DUMMY_SALT)
  return false
}

export function validateIdentity({ email, username, displayName }) {
  const cleanEmail = normaliseEmail(email)
  const { username: cleanUsername, usernameNormalized } = validateUsername(username)
  const cleanDisplayName = String(displayName || '').trim()
  if (cleanEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) throw new AuthError('Enter a valid email address.', 400, 'INVALID_EMAIL')
  if (cleanDisplayName.length < 2 || cleanDisplayName.length > 50) throw new AuthError('Display name must be 2–50 characters.', 400, 'INVALID_DISPLAY_NAME')
  return { email: cleanEmail, emailNormalized: cleanEmail, username: cleanUsername, usernameNormalized, displayName: cleanDisplayName }
}

export function validateUsername(username) {
  const cleanUsername = String(username || '').trim()
  if (!/^[A-Za-z0-9_-]{3,30}$/.test(cleanUsername)) throw new AuthError('Username must be 3–30 letters, numbers, underscores or hyphens.', 400, 'INVALID_USERNAME')
  if (RESERVED_USERNAMES.has(cleanUsername.toLowerCase())) throw new AuthError('That username is reserved.', 409, 'USERNAME_UNAVAILABLE')
  return { username: cleanUsername, usernameNormalized: normaliseUsername(cleanUsername) }
}

export async function rateLimit(scope, identity, limit, windowMs) {
  const db = await ensureAuthIndexes()
  const now = Date.now()
  const bucket = Math.floor(now / windowMs)
  const id = sha256(`${scope}:${identity}:${bucket}`)
  const expiresAt = new Date((bucket + 2) * windowMs)
  const result = await db.collection('auth_limits').findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 }, $setOnInsert: { scope, createdAt: new Date(now), expiresAt } },
    { upsert: true, returnDocument: 'after' },
  )
  const row = result?.value || result
  const count = row?.count || 1
  if (count > limit) {
    const retryAfter = Math.max(1, Math.ceil(((bucket + 1) * windowMs - now) / 1000))
    throw new AuthError('Too many attempts. Try again later.', 429, 'RATE_LIMITED')
  }
  return { remaining: Math.max(0, limit - count) }
}

export async function audit(request, { userId = null, action, outcome = 'success', metadata = {} }) {
  try {
    const db = await ensureAuthIndexes()
    const context = requestContext(request)
    await db.collection('auth_audit').insertOne({
      id: randomUUID(), userId, action, outcome,
      ipHash: context.ipHash, device: context.device,
      metadata, createdAt: new Date(), expiresAt: new Date(Date.now() + 180 * DAY),
    })
  } catch { /* authentication must not fail because audit storage is unavailable */ }
}

export async function createSession(userId, request, remember = false) {
  const db = await ensureAuthIndexes()
  const rawToken = token(32)
  const context = requestContext(request)
  const now = new Date()
  const expiresAt = new Date(Date.now() + (remember ? 30 : 7) * DAY)
  const session = {
    id: randomUUID(), userId, tokenHash: sha256(rawToken),
    createdAt: now, lastSeenAt: now, expiresAt,
    ipHash: context.ipHash, userAgent: context.userAgent, device: context.device,
  }
  await db.collection('auth_sessions').insertOne(session)
  return { rawToken, session }
}

function sessionCookieOptions(expiresAt) {
  return { httpOnly: true, secure: production, sameSite: 'strict', path: '/', expires: expiresAt, priority: 'high' }
}

export function attachSessionCookie(response, rawToken, expiresAt) {
  response.cookies.set(SESSION_COOKIE, rawToken, sessionCookieOptions(expiresAt))
}

export function clearAuthCookies(response) {
  for (const name of ['__Host-gtalorewiki_session', 'gtalorewiki_session', '__Host-gtalorewiki_csrf', 'gtalorewiki_csrf']) {
    response.cookies.set(name, '', { httpOnly: true, secure: name.startsWith('__Host-'), sameSite: 'strict', path: '/', maxAge: 0 })
  }
}

async function loadSession(rawToken, { touch = true } = {}) {
  if (!rawToken || rawToken.length < 32 || rawToken.length > 128) return null
  const db = await ensureAuthIndexes()
  const session = await db.collection('auth_sessions').findOne({ tokenHash: sha256(rawToken), expiresAt: { $gt: new Date() } })
  if (!session) return null
  const user = await db.collection('auth_users').findOne({ id: session.userId, status: 'active' })
  if (!user) return null
  if (touch && Date.now() - new Date(session.lastSeenAt).getTime() > 5 * 60_000) {
    const now = new Date()
    await db.collection('auth_sessions').updateOne({ id: session.id }, { $set: { lastSeenAt: now } })
    session.lastSeenAt = now
  }
  return { session, user, rawToken }
}

export async function authFromRequest(request, options) {
  return loadSession(request.cookies.get(SESSION_COOKIE)?.value, options)
}

export async function currentAuth(options) {
  const store = await cookies()
  return loadSession(store.get(SESSION_COOKIE)?.value, options)
}

export async function requireAuth(request) {
  const auth = await authFromRequest(request)
  if (!auth) throw new AuthError('Authentication required.', 401, 'UNAUTHENTICATED')
  return auth
}

export async function requireRole(request, roles) {
  const auth = await requireAuth(request)
  if (!roles.includes(auth.user.role)) throw new AuthError('You do not have permission for this action.', 403, 'FORBIDDEN')
  return auth
}

export async function revokeSession(rawToken) {
  if (!rawToken) return
  const db = await ensureAuthIndexes()
  await db.collection('auth_sessions').deleteOne({ tokenHash: sha256(rawToken) })
}

export async function revokeUserSessions(userId, exceptSessionId = null) {
  const db = await ensureAuthIndexes()
  const filter = exceptSessionId ? { userId, id: { $ne: exceptSessionId } } : { userId }
  return db.collection('auth_sessions').deleteMany(filter)
}

export async function issueOneTimeToken(userId, type, lifetimeMs) {
  const db = await ensureAuthIndexes()
  const rawToken = token(32)
  await db.collection('auth_tokens').deleteMany({ userId, type })
  await db.collection('auth_tokens').insertOne({
    id: randomUUID(), userId, type, tokenHash: sha256(rawToken),
    createdAt: new Date(), expiresAt: new Date(Date.now() + lifetimeMs),
  })
  return rawToken
}

export async function consumeOneTimeToken(rawToken, type) {
  if (!rawToken || rawToken.length < 32 || rawToken.length > 128) return null
  const db = await ensureAuthIndexes()
  const result = await db.collection('auth_tokens').findOneAndDelete({ tokenHash: sha256(rawToken), type, expiresAt: { $gt: new Date() } })
  return result?.value || result || null
}

export async function findOneTimeToken(rawToken, type) {
  if (!rawToken || rawToken.length < 32 || rawToken.length > 128) return null
  const db = await ensureAuthIndexes()
  return db.collection('auth_tokens').findOne({ tokenHash: sha256(rawToken), type, expiresAt: { $gt: new Date() } })
}

export function ensureCsrf(request, response) {
  let value = request.cookies.get(CSRF_COOKIE)?.value
  if (!value || value.length < 24 || value.length > 128) {
    value = token(24)
    response.cookies.set(CSRF_COOKIE, value, { httpOnly: true, secure: production, sameSite: 'strict', path: '/', maxAge: 86_400, priority: 'high' })
  }
  return value
}

function expectedOrigins(request) {
  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const forwardedProto = request.headers.get('x-forwarded-proto') || new URL(request.url).protocol.replace(':', '')
  const values = new Set([new URL(request.url).origin, 'https://lusorae.pt'])
  if (forwardedHost) values.add(`${forwardedProto}://${forwardedHost}`)
  String(process.env.AUTH_TRUSTED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean).forEach((value) => values.add(value))
  return values
}

export function validateMutationRequest(request) {
  const length = Number(request.headers.get('content-length') || 0)
  if (length > 32_768) throw new AuthError('Request is too large.', 413, 'REQUEST_TOO_LARGE')
  if (!String(request.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) throw new AuthError('JSON request required.', 415, 'JSON_REQUIRED')
  const site = request.headers.get('sec-fetch-site')
  if (site && !['same-origin', 'same-site', 'none'].includes(site)) throw new AuthError('Cross-site request blocked.', 403, 'ORIGIN_REJECTED')
  const origin = request.headers.get('origin')
  if (origin && !expectedOrigins(request).has(origin)) throw new AuthError('Request origin rejected.', 403, 'ORIGIN_REJECTED')
  if (production && !origin) throw new AuthError('Request origin required.', 403, 'ORIGIN_REQUIRED')
  const cookieToken = request.cookies.get(CSRF_COOKIE)?.value
  const headerToken = request.headers.get('x-csrf-token')
  if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) throw new AuthError('Security token expired. Refresh and try again.', 403, 'CSRF_REJECTED')
}

export function authBaseUrl(request) {
  if (process.env.AUTH_BASE_URL) return process.env.AUTH_BASE_URL.replace(/\/$/, '')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') || (production ? 'https' : 'http')
  return host ? `${proto}://${host}` : 'https://lusorae.pt'
}

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char])

export async function sendAuthEmail({ to, subject, heading, message, actionLabel, actionUrl, idempotencyKey }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.AUTH_EMAIL_FROM
  if (!apiKey || !from) return false
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'GTA-Lore-Wiki-Auth/1.0',
      'Idempotency-Key': idempotencyKey || randomUUID(),
    },
    body: JSON.stringify({
      from, to: [to], subject,
      text: `${heading}\n\n${message}\n\n${actionLabel}: ${actionUrl}\n\nIf you did not request this, ignore this email.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#17214b"><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(message)}</p><p><a href="${escapeHtml(actionUrl)}" style="display:inline-block;padding:12px 18px;background:#7657ff;color:white;text-decoration:none;border-radius:8px">${escapeHtml(actionLabel)}</a></p><p style="font-size:12px;color:#687087">If you did not request this, ignore this email.</p></div>`,
    }),
  })
  return response.ok
}

export function sessionView(session, currentSessionId) {
  return {
    id: session.id,
    device: session.device || deviceLabel(session.userAgent),
    createdAt: session.createdAt,
    lastSeenAt: session.lastSeenAt,
    expiresAt: session.expiresAt,
    current: session.id === currentSessionId,
  }
}
