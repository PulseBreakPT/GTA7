import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/server/mongo'
import {
  AuthError, attachSessionCookie, audit, authBaseUrl, authFromRequest,
  DEFAULT_WIKI_PREFERENCES,
  botChallenge, burnPasswordAttempt, clearAuthCookies, consumeOneTimeToken, createSession, emailLookup, encryptedEmail, ensureAuthIndexes,
  ensureCsrf, findOneTimeToken, hashPassword, issueOneTimeToken, passwordHashNeedsUpgrade, passwordProblems, publicUser, rateLimit,
  requireBotChallenge, revealUserEmail,
  requireAuth, requireRole, revokeSession, revokeUserSessions, sendAuthEmail, sessionView,
  validateIdentity, validateMutationRequest, validateUsername, verifyPassword, wikiPreferences,
} from '@/lib/server/auth'
import {
  assertAllowedFields, cleanText, contributionDetails, privateNoteBody,
  protectContributionDetails, protectPrivateNote, protectReviewNote, reviewNoteBody,
} from '@/lib/server/security'
import { AMBIGUOUS, DEAD_ENDS, ORPHANS, SOURCES, STATS, STUBS, UNCATEGORISED, UNSOURCED, WANTED, entryFor } from '@/lib/wiki-graph'
import { isRockstarUrl } from '@/lib/official-links'
import { LEGAL_VERSION } from '@/lib/legal'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAY = 86_400_000
const MAX_JSON_BYTES = 32_768

// Reading the operator surface is moderation work; changing somebody else's
// account is not. The two sets are kept apart on purpose.
const STAFF_ROLES = Object.freeze(['moderator', 'admin'])
const ADMIN_ROLES = Object.freeze(['admin'])
const ASSIGNABLE_ROLES = Object.freeze(['reader', 'editor', 'moderator', 'admin'])
const ACCOUNT_STATUSES = Object.freeze(['active', 'suspended'])

// An operator never needs a reader's address, and the archive stores it
// encrypted precisely so it cannot be read casually. This projection is the
// whole of what an account exposes to administration.
const ADMIN_USER_PROJECTION = Object.freeze({
  _id: 0, id: 1, username: 1, displayName: 1, role: 1, status: 1,
  emailVerifiedAt: 1, createdAt: 1, lastLoginAt: 1, failedLoginCount: 1, lockedUntil: 1,
})

const tally = (rows) => Object.fromEntries(rows.map((row) => [row._id || 'unknown', row.n]))

// The archive's own condition, derived from the content graph rather than from
// the database: what is a stub, what carries no source, what nothing links to.
// The graph is built at module load and never changes at runtime, so this is
// computed once.
let archiveHealthCache = null
function archiveHealth() {
  if (!archiveHealthCache) {
    archiveHealthCache = {
      records: STATS.total,
      withSource: STATS.withSource,
      categories: STATS.categories,
      linked: STATS.linked,
      byKind: STATS.byKind,
      byStatus: STATS.byStatus,
      stubs: STUBS.length,
      unsourced: UNSOURCED.length,
      orphans: ORPHANS.length,
      deadEnds: DEAD_ENDS.length,
      uncategorised: UNCATEGORISED.length,
      ambiguous: AMBIGUOUS.length,
      wanted: WANTED.length,
      sources: SOURCES.length,
      worklist: {
        stubs: STUBS.slice(0, 8).map((entry) => ({ name: entry.name, href: entry.href, kind: entry.kind })),
        unsourced: UNSOURCED.slice(0, 8).map((entry) => ({ name: entry.name, href: entry.href, kind: entry.kind })),
        orphans: ORPHANS.slice(0, 8).map((entry) => ({ name: entry.name, href: entry.href, kind: entry.kind })),
        wanted: WANTED.slice(0, 8).map((item) => ({ name: item.name, citedBy: item.from.length })),
      },
    }
  }
  return archiveHealthCache
}

const POST_FIELDS = Object.freeze({
  register: ['email', 'username', 'displayName', 'password', 'confirmPassword', 'remember', 'termsAccepted', 'website', '_challenge'],
  login: ['identifier', 'password', 'remember', 'website', '_challenge'],
  logout: [], 'logout-all': [],
  'forgot-password': ['email', 'website', '_challenge'],
  'reset-password': ['token', 'password'],
  'verify-email': ['token'],
  'resend-verification': [],
  watch: ['kind', 'slug', 'watching'],
  'page-view': ['kind', 'slug'],
  'history-clear': [],
  'watch-pin': ['kind', 'slug', 'pinned'],
  'collection-create': ['name', 'description', 'color'],
  'collection-delete': ['collectionId'],
  'collection-item': ['kind', 'slug', 'collectionId', 'saved'],
  note: ['kind', 'slug', 'body'],
  suggestion: ['kind', 'slug', 'type', 'summary', 'details', 'sourceUrl'],
  'notifications-read': [],
  'suggestion-review': ['id', 'status', 'reviewNote'],
  'change-password': ['currentPassword', 'password'],
  'delete-account': ['confirmation', 'currentPassword'],
  'admin/user-role': ['userId', 'role'],
  'admin/user-status': ['userId', 'status'],
  'admin/user-revoke': ['userId'],
})

const PATCH_FIELDS = Object.freeze({
  preferences: ['publicProfile', 'recordHistory', 'compactMode', 'reducedMotion'],
  profile: ['displayName', 'username', 'bio'],
})

function validateFields(route, data, method) {
  const allowed = method === 'PATCH' ? PATCH_FIELDS[route] : POST_FIELDS[route]
  if (!allowed) return
  try { assertAllowedFields(data, allowed) }
  catch { throw new AuthError('Request contains unsupported fields.', 400, 'UNSUPPORTED_FIELDS') }
}

function textInput(value, options) {
  try { return cleanText(value, options) }
  catch (error) { throw new AuthError(error.message, 400, 'INVALID_INPUT') }
}

function booleanInput(value, label) {
  if (typeof value !== 'boolean') throw new AuthError(`${label} must be true or false.`, 400, 'INVALID_INPUT')
  return value
}

function response(data, status = 200) {
  const result = NextResponse.json(data, { status })
  result.headers.set('Cache-Control', 'no-store, max-age=0')
  result.headers.set('Pragma', 'no-cache')
  result.headers.set('Vary', 'Cookie')
  result.headers.set('X-Request-ID', randomUUID())
  result.headers.set('X-Content-Type-Options', 'nosniff')
  return result
}

function pathOf(params) {
  return Promise.resolve(params).then((value) => value.auth || [])
}

function clientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

async function bodyOf(request) {
  try {
    const source = await request.text()
    if (Buffer.byteLength(source, 'utf8') > MAX_JSON_BYTES) throw new AuthError('Request is too large.', 413, 'REQUEST_TOO_LARGE')
    const value = JSON.parse(source)
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid')
    return value
  } catch (error) {
    if (error instanceof AuthError) throw error
    throw new AuthError('Invalid JSON body.', 400, 'INVALID_BODY')
  }
}

function authFailure(error) {
  if (error instanceof AuthError) return response({ ok: false, error: error.message, code: error.code }, error.status)
  if (error?.code === 11000) return response({ ok: false, error: 'That email or username is unavailable.', code: 'IDENTITY_UNAVAILABLE' }, 409)
  const incident = randomUUID()
  console.error(JSON.stringify({ level: 'error', event: 'auth.service_failure', incident, type: error?.name || 'Error' }))
  return response({ ok: false, error: 'Authentication service unavailable.', code: 'AUTH_UNAVAILABLE', incident }, 500)
}

function requestedEntry(data) {
  const kind = String(data?.kind || '').slice(0, 32)
  const slug = String(data?.slug || '').slice(0, 160)
  const entry = entryFor(kind, slug)
  if (!entry) throw new AuthError('Archive entry not found.', 404, 'ENTRY_NOT_FOUND')
  return { entry, key: `${kind}:${slug}` }
}

const cleanWikiRecord = ({ _id, userId, ...record }) => record
const cleanPrivateNote = (record) => {
  const clean = cleanWikiRecord(record)
  const body = privateNoteBody(clean)
  delete clean.bodyEncrypted
  return { ...clean, body }
}
const cleanSuggestion = (record) => {
  const clean = cleanWikiRecord(record)
  const details = contributionDetails(clean)
  const reviewNote = reviewNoteBody(clean)
  delete clean.detailsEncrypted
  delete clean.reviewNoteEncrypted
  delete clean.reviewerId
  return { ...clean, details, reviewNote }
}

function safeSourceUrl(value) {
  const sourceUrl = String(value || '').trim()
  if (!sourceUrl) return ''
  if (sourceUrl.length > 800) throw new AuthError('Source URL is too long.', 400, 'INVALID_SOURCE')
  try {
    const parsed = new URL(sourceUrl)
    const isRockstar = parsed.protocol === 'https:' && !parsed.username && !parsed.password && !parsed.port && (parsed.hostname === 'rockstargames.com' || parsed.hostname.endsWith('.rockstargames.com'))
    if (!isRockstar) throw new Error('source')
    return parsed.toString()
  } catch {
    throw new AuthError('Use an official Rockstar Games source URL.', 400, 'INVALID_SOURCE')
  }
}

function achievementsFor(user, metrics) {
  const definitions = [
    ['verified', 'Verified archivist', 'Verified account identity', Boolean(user.emailVerifiedAt)],
    ['explorer', 'Leonida explorer', 'Read 10 different entries', metrics.read >= 10],
    ['deep-reader', 'Deep reader', 'Open wiki entries 50 times', metrics.totalViews >= 50],
    ['curator', 'Archive curator', 'Watch 10 pages', metrics.watched >= 10],
    ['collector', 'Collection architect', 'Build 3 collections', metrics.collections >= 3],
    ['researcher', 'Field researcher', 'Write 5 private page notes', metrics.notes >= 5],
    ['contributor', 'Wiki contributor', 'Submit an editorial suggestion', metrics.suggestions >= 1],
    ['trusted-source', 'Trusted source', 'Have 5 suggestions accepted', metrics.accepted >= 5],
  ]
  return definitions.map(([id, label, description, unlocked]) => ({ id, label, description, unlocked }))
}

async function sendVerification(request, user) {
  const rawToken = await issueOneTimeToken(user.id, 'verify-email', DAY)
  const url = `${authBaseUrl(request)}/verify-email?token=${encodeURIComponent(rawToken)}`
  return sendAuthEmail({
    to: revealUserEmail(user),
    subject: 'Verify your GTA LORE account',
    heading: 'Verify your archive identity',
    message: 'Confirm this email address to mark your GTA LORE account as verified. This link expires in 24 hours.',
    actionLabel: 'Verify email', actionUrl: url,
    idempotencyKey: `verify-${user.id}-${Date.now()}`,
  })
}

export async function GET(request, { params }) {
  try {
    const route = (await pathOf(params)).join('/')
    await ensureAuthIndexes()
    await rateLimit('auth-read-ip', `${clientIp(request)}:${route}`, route === 'session' ? 600 : 240, 15 * 60_000)

    if (route === 'session') {
      const auth = await authFromRequest(request)
      const carrier = response({ ok: true })
      const csrfToken = ensureCsrf(request, carrier)
      const result = response({
        ok: true,
        user: publicUser(auth?.user),
        session: auth ? sessionView(auth.session, auth.session.id) : null,
        csrfToken,
        botChallenge: botChallenge(csrfToken),
        capabilities: { emailDelivery: Boolean(process.env.RESEND_API_KEY && process.env.AUTH_EMAIL_FROM) },
      })
      carrier.cookies.getAll().forEach((cookie) => result.cookies.set(cookie))
      return result
    }

    if (route === 'sessions') {
      const auth = await requireAuth(request)
      const db = await getDb()
      const sessions = await db.collection('auth_sessions').find(
        { userId: auth.user.id, expiresAt: { $gt: new Date() } },
        { projection: { tokenHash: 0, userAgent: 0, ipHash: 0, _id: 0 } },
      ).sort({ lastSeenAt: -1 }).limit(25).toArray()
      return response({ ok: true, sessions: sessions.map((session) => sessionView(session, auth.session.id)) })
    }

    if (route === 'audit') {
      const auth = await requireAuth(request)
      const db = await getDb()
      const events = await db.collection('auth_audit').find(
        { userId: auth.user.id },
        { projection: { _id: 0, ipHash: 0, expiresAt: 0, userId: 0 } },
      ).sort({ createdAt: -1 }).limit(50).toArray()
      return response({ ok: true, events })
    }

    if (route === 'wiki-state') {
      const auth = await requireAuth(request)
      const { key } = requestedEntry(Object.fromEntries(new URL(request.url).searchParams))
      const db = await getDb()
      const watched = await db.collection('wiki_watchlist').findOne({ userId: auth.user.id, key }, { projection: { _id: 1 } })
      return response({ ok: true, watching: Boolean(watched) })
    }

    if (route === 'wiki-dashboard') {
      const auth = await requireAuth(request)
      const db = await getDb()
      const preferences = wikiPreferences(auth.user)
      const canReview = ['editor', 'moderator', 'admin'].includes(auth.user.role)
      const [watchlist, history, suggestions, reviewQueue, collections, collectionItems, notes] = await Promise.all([
        db.collection('wiki_watchlist').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ pinned: -1, createdAt: -1 }).limit(250).toArray(),
        preferences.recordHistory
          ? db.collection('wiki_history').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ lastViewedAt: -1 }).limit(80).toArray()
          : [],
        db.collection('wiki_suggestions').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ createdAt: -1 }).limit(100).toArray(),
        canReview
          ? db.collection('wiki_suggestions').find({ status: 'pending' }, { projection: { _id: 0 } }).sort({ createdAt: 1 }).limit(100).toArray()
          : [],
        db.collection('wiki_collections').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ createdAt: 1 }).limit(50).toArray(),
        db.collection('wiki_collection_items').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ createdAt: -1 }).limit(1_000).toArray(),
        db.collection('wiki_notes').find({ userId: auth.user.id }, { projection: { _id: 0, userId: 0 } }).sort({ updatedAt: -1 }).limit(250).toArray(),
      ])
      const readAt = auth.user.notificationsReadAt ? new Date(auth.user.notificationsReadAt) : new Date(0)
      const notifications = []
      watchlist.forEach((item) => {
        const current = entryFor(item.kind, item.slug)
        if (!current?.updatedAt) return
        const changedAt = new Date(`${current.updatedAt}T00:00:00Z`)
        if (Number.isNaN(changedAt.getTime()) || changedAt <= new Date(item.createdAt)) return
        notifications.push({ id: `watch-${item.key}-${current.updatedAt}`, type: 'watch.updated', title: `${current.name} was updated`, href: current.href, createdAt: changedAt, unread: changedAt > readAt })
      })
      suggestions.forEach((item) => {
        const changedAt = new Date(item.updatedAt || item.createdAt)
        notifications.push({ id: `suggestion-${item.id}-${changedAt.toISOString()}`, type: `suggestion.${item.status}`, title: `Suggestion ${item.status}: ${item.title}`, href: '/account?section=contributions', createdAt: changedAt, unread: changedAt > readAt })
      })
      notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      const metrics = {
        watched: watchlist.length,
        read: history.length,
        totalViews: history.reduce((total, item) => total + Number(item.viewCount || 0), 0),
        suggestions: suggestions.length,
        accepted: suggestions.filter((item) => item.status === 'accepted').length,
        collections: collections.length,
        notes: notes.length,
      }
      return response({
        ok: true,
        watchlist: watchlist.map(cleanWikiRecord),
        history: history.map(cleanWikiRecord),
        suggestions: suggestions.map(cleanSuggestion),
        reviewQueue: reviewQueue.map(cleanSuggestion),
        notifications: notifications.slice(0, 80),
        collections: collections.map(cleanWikiRecord),
        collectionItems: collectionItems.map(cleanWikiRecord),
        notes: notes.map(cleanPrivateNote),
        metrics,
        achievements: achievementsFor(auth.user, metrics),
        preferences,
      })
    }

    if (route === 'export') {
      const auth = await requireAuth(request)
      const db = await getDb()
      const collectionNames = ['wiki_watchlist', 'wiki_history', 'wiki_suggestions', 'wiki_collections', 'wiki_collection_items', 'wiki_notes']
      const records = await Promise.all(collectionNames.map((name) => db.collection(name).find(
        { userId: auth.user.id },
        { projection: { _id: 0, userId: 0, reviewerId: 0 } },
      ).limit(2_000).toArray()))
      const exported = Object.fromEntries(collectionNames.map((name, index) => {
        const rows = name === 'wiki_notes' ? records[index].map(cleanPrivateNote)
          : name === 'wiki_suggestions' ? records[index].map(cleanSuggestion)
            : records[index]
        return [name.replace('wiki_', ''), rows]
      }))
      const result = response({
        exportedAt: new Date(),
        profile: publicUser(auth.user),
        data: exported,
      })
      result.headers.set('Content-Disposition', `attachment; filename="gta-lore-${auth.user.username}-export.json"`)
      return result
    }

    // ---------------------------------------------------------------------
    // ADMIN — the operator's read surface.
    //
    // Everything here is gated on the server by role, never by a hidden route:
    // a reader who guesses the URL gets 403, not a blank page. Reads are open
    // to moderators as well as admins, because the queue and the security log
    // are moderation work; only the three mutations below are admin-only.
    // ---------------------------------------------------------------------

    if (route === 'admin/overview') {
      await requireRole(request, STAFF_ROLES)
      const db = await getDb()
      const now = new Date()
      const since24h = new Date(now.getTime() - DAY)
      const since7d = new Date(now.getTime() - 7 * DAY)
      const [byRole, byStatus, unverified, joined7d, activeSessions, byQueue, oldestPending, events24h, failures24h, failures7d, topFailures] = await Promise.all([
        db.collection('auth_users').aggregate([{ $group: { _id: '$role', n: { $sum: 1 } } }]).toArray(),
        db.collection('auth_users').aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray(),
        db.collection('auth_users').countDocuments({ emailVerifiedAt: null }),
        db.collection('auth_users').countDocuments({ createdAt: { $gte: since7d } }),
        db.collection('auth_sessions').countDocuments({ expiresAt: { $gt: now } }),
        db.collection('wiki_suggestions').aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray(),
        db.collection('wiki_suggestions').find({ status: 'pending' }, { projection: { _id: 0, createdAt: 1 } }).sort({ createdAt: 1 }).limit(1).toArray(),
        db.collection('auth_audit').countDocuments({ createdAt: { $gte: since24h } }),
        db.collection('auth_audit').countDocuments({ createdAt: { $gte: since24h }, outcome: 'failure' }),
        db.collection('auth_audit').countDocuments({ createdAt: { $gte: since7d }, outcome: 'failure' }),
        db.collection('auth_audit').aggregate([
          { $match: { createdAt: { $gte: since7d }, outcome: 'failure' } },
          { $group: { _id: '$action', n: { $sum: 1 } } },
          { $sort: { n: -1 } }, { $limit: 5 },
        ]).toArray(),
      ])
      return response({
        ok: true,
        generatedAt: now,
        people: {
          total: byRole.reduce((sum, row) => sum + row.n, 0),
          byRole: tally(byRole), byStatus: tally(byStatus),
          unverified, joined7d,
        },
        sessions: { active: activeSessions },
        queue: { ...tally(byQueue), oldestPendingAt: oldestPending[0]?.createdAt || null },
        security: {
          events24h, failures24h, failures7d,
          topFailures: topFailures.map((row) => ({ action: row._id, count: row.n })),
        },
        archive: archiveHealth(),
      })
    }

    if (route === 'admin/users') {
      await requireRole(request, STAFF_ROLES)
      const db = await getDb()
      const url = new URL(request.url)
      const term = String(url.searchParams.get('q') || '').trim().slice(0, 64)
      const role = ASSIGNABLE_ROLES.includes(url.searchParams.get('role')) ? url.searchParams.get('role') : ''
      const status = ACCOUNT_STATUSES.includes(url.searchParams.get('status')) ? url.searchParams.get('status') : ''
      const page = Math.min(400, Math.max(1, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1))
      const perPage = 25

      const filter = {}
      if (role) filter.role = role
      if (status) filter.status = status
      if (term) {
        // Names only. The address is encrypted at rest precisely so it cannot
        // be read casually, and searching it would mean decrypting the whole
        // collection on every keystroke.
        const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        filter.$or = [
          { username: { $regex: safe, $options: 'i' } },
          { displayName: { $regex: safe, $options: 'i' } },
        ]
      }

      const [rows, total] = await Promise.all([
        db.collection('auth_users')
          .find(filter, { projection: ADMIN_USER_PROJECTION })
          .sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage).toArray(),
        db.collection('auth_users').countDocuments(filter),
      ])

      const ids = rows.map((row) => row.id)
      const liveSessions = ids.length
        ? await db.collection('auth_sessions').aggregate([
          { $match: { userId: { $in: ids }, expiresAt: { $gt: new Date() } } },
          { $group: { _id: '$userId', n: { $sum: 1 }, lastSeenAt: { $max: '$lastSeenAt' } } },
        ]).toArray()
        : []
      const contributions = ids.length
        ? await db.collection('wiki_suggestions').aggregate([
          { $match: { userId: { $in: ids } } },
          { $group: { _id: { userId: '$userId', status: '$status' }, n: { $sum: 1 } } },
        ]).toArray()
        : []
      const sessionsById = new Map(liveSessions.map((row) => [row._id, row]))
      const contributionsById = new Map()
      for (const row of contributions) {
        const current = contributionsById.get(row._id.userId) || {}
        current[row._id.status] = row.n
        contributionsById.set(row._id.userId, current)
      }

      return response({
        ok: true,
        page, perPage, total,
        users: rows.map((user) => ({
          ...user,
          activeSessions: sessionsById.get(user.id)?.n || 0,
          lastSeenAt: sessionsById.get(user.id)?.lastSeenAt || null,
          contributions: contributionsById.get(user.id) || {},
        })),
      })
    }

    if (route === 'admin/audit') {
      await requireRole(request, STAFF_ROLES)
      const db = await getDb()
      const url = new URL(request.url)
      const outcome = ['success', 'failure'].includes(url.searchParams.get('outcome')) ? url.searchParams.get('outcome') : ''
      const action = String(url.searchParams.get('action') || '').trim().slice(0, 64)
      const page = Math.min(200, Math.max(1, Number.parseInt(url.searchParams.get('page') || '1', 10) || 1))
      const perPage = 40

      const filter = {}
      if (outcome) filter.outcome = outcome
      if (action) filter.action = action.replace(/[^a-z0-9._-]/gi, '')

      const [events, total, actions] = await Promise.all([
        db.collection('auth_audit')
          // The IP hash never leaves the server: it exists to correlate, not to
          // be read, and an operator has no use for it in a list.
          .find(filter, { projection: { _id: 0, ipHash: 0, expiresAt: 0 } })
          .sort({ createdAt: -1 }).skip((page - 1) * perPage).limit(perPage).toArray(),
        db.collection('auth_audit').countDocuments(filter),
        db.collection('auth_audit').aggregate([
          { $group: { _id: '$action', n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 40 },
        ]).toArray(),
      ])

      const actorIds = [...new Set(events.map((event) => event.userId).filter(Boolean))]
      const actors = actorIds.length
        ? await db.collection('auth_users').find({ id: { $in: actorIds } }, { projection: { _id: 0, id: 1, username: 1, role: 1 } }).toArray()
        : []
      const actorById = new Map(actors.map((actor) => [actor.id, actor]))

      return response({
        ok: true,
        page, perPage, total,
        actions: actions.map((row) => ({ action: row._id, count: row.n })),
        events: events.map(({ userId, ...event }) => ({
          ...event,
          actor: actorById.get(userId) || (userId ? { id: userId, username: null, role: null } : null),
        })),
      })
    }

    if (route === 'admin/sessions') {
      await requireRole(request, STAFF_ROLES)
      const db = await getDb()
      const rows = await db.collection('auth_sessions')
        .find({ expiresAt: { $gt: new Date() } }, { projection: { _id: 0, id: 1, userId: 1, device: 1, createdAt: 1, lastSeenAt: 1, expiresAt: 1 } })
        .sort({ lastSeenAt: -1 }).limit(120).toArray()
      const ids = [...new Set(rows.map((row) => row.userId))]
      const owners = ids.length
        ? await db.collection('auth_users').find({ id: { $in: ids } }, { projection: { _id: 0, id: 1, username: 1, role: 1, status: 1 } }).toArray()
        : []
      const ownerById = new Map(owners.map((owner) => [owner.id, owner]))
      return response({
        ok: true,
        sessions: rows.map(({ userId, ...session }) => ({ ...session, owner: ownerById.get(userId) || null })),
      })
    }

    if (route === 'admin/queue') {
      await requireRole(request, STAFF_ROLES)
      const db = await getDb()
      const url = new URL(request.url)
      const status = ['pending', 'accepted', 'rejected'].includes(url.searchParams.get('status')) ? url.searchParams.get('status') : 'pending'
      const rows = await db.collection('wiki_suggestions')
        .find({ status }).sort({ createdAt: status === 'pending' ? 1 : -1 }).limit(60).toArray()
      const authorIds = [...new Set(rows.map((row) => row.userId).filter(Boolean))]
      const authors = authorIds.length
        ? await db.collection('auth_users').find({ id: { $in: authorIds } }, { projection: { _id: 0, id: 1, username: 1, role: 1 } }).toArray()
        : []
      const authorById = new Map(authors.map((author) => [author.id, author]))
      return response({
        ok: true,
        status,
        suggestions: rows.map((row) => {
          const clean = cleanSuggestion(row)
          const entry = entryFor(row.kind, row.slug)
          return {
            ...clean,
            author: authorById.get(row.userId) || null,
            target: entry ? { title: entry.name, href: entry.href, kind: entry.kind, status: entry.status } : null,
            // The archive's own rule, checked here rather than trusted: a
            // sourced change has to point at Rockstar.
            sourceIsOfficial: isRockstarUrl(clean.sourceUrl),
          }
        }),
      })
    }

    return response({ ok: false, error: 'Authentication route not found.', code: 'NOT_FOUND' }, 404)
  } catch (error) {
    return authFailure(error)
  }
}

export async function POST(request, { params }) {
  try {
    validateMutationRequest(request)
    const route = (await pathOf(params)).join('/')
    const data = await bodyOf(request)
    validateFields(route, data, 'POST')
    const ip = clientIp(request)
    const db = await ensureAuthIndexes()
    if (['register', 'login', 'forgot-password'].includes(route)) requireBotChallenge(data, request.headers.get('x-csrf-token'))

    if (route === 'register') {
      await rateLimit('register-ip', ip, 5, 60 * 60_000)
      if (data.termsAccepted !== true) throw new AuthError('Accept the Terms of Use and acknowledge the Privacy Notice to create an account.', 400, 'TERMS_REQUIRED')
      const identity = validateIdentity(data)
      if (data.confirmPassword !== undefined && data.confirmPassword !== data.password) throw new AuthError('Passwords do not match.', 400, 'PASSWORD_MISMATCH')
      const problems = passwordProblems(data.password, identity)
      if (problems.length) throw new AuthError(problems[0], 400, 'WEAK_PASSWORD')
      const protectedEmail = encryptedEmail(identity.email)

      const existing = await db.collection('auth_users').findOne({
        $or: [{ emailNormalized: { $in: [protectedEmail.emailNormalized, identity.emailNormalized] } }, { usernameNormalized: identity.usernameNormalized }],
      }, { projection: { emailNormalized: 1, usernameNormalized: 1 } })
      if (existing) {
        await burnPasswordAttempt(data.password)
        if (existing.usernameNormalized === identity.usernameNormalized) throw new AuthError('That username is unavailable.', 409, 'USERNAME_UNAVAILABLE')
        throw new AuthError('An account already uses that email. Sign in or recover access.', 409, 'EMAIL_UNAVAILABLE')
      }

      const now = new Date()
      const identityWithoutEmail = { ...identity }
      delete identityWithoutEmail.email
      const user = {
        id: randomUUID(), ...identityWithoutEmail, ...protectedEmail,
        passwordHash: await hashPassword(data.password),
        bio: '', role: 'reader', status: 'active', emailVerifiedAt: null,
        wikiPreferences: { ...DEFAULT_WIKI_PREFERENCES }, notificationsReadAt: new Date(0),
        termsAcceptedAt: now, termsVersion: LEGAL_VERSION, privacyNoticeVersion: LEGAL_VERSION,
        failedLoginCount: 0, lockedUntil: null,
        createdAt: now, updatedAt: now, lastLoginAt: now,
      }
      await db.collection('auth_users').insertOne(user)
      const verificationSent = await sendVerification(request, user).catch(() => false)
      const { rawToken, session } = await createSession(user.id, request, data.remember == null ? false : booleanInput(data.remember, 'Remember'))
      await audit(request, { userId: user.id, action: 'account.created', metadata: { verificationSent } })
      const result = response({ ok: true, user: publicUser(user), session: sessionView(session, session.id), verificationSent }, 201)
      attachSessionCookie(result, rawToken, session.expiresAt)
      return result
    }

    if (route === 'login') {
      const identifier = textInput(data.identifier, { min: 1, max: 254, label: 'Email or username' }).toLowerCase()
      const suppliedPassword = typeof data.password === 'string' ? data.password : ''
      const passwordAcceptable = Array.from(suppliedPassword).length > 0 && Array.from(suppliedPassword).length <= 128 && identifier.length <= 254
      const password = passwordAcceptable ? suppliedPassword : suppliedPassword.slice(0, 128)
      await Promise.all([
        rateLimit('login-ip', ip, 60, 15 * 60_000),
        rateLimit('login-account', `${ip}:${identifier}`, 10, 15 * 60_000),
      ])
      const lookup = emailLookup(identifier)
      const user = await db.collection('auth_users').findOne({ $or: [
        { emailNormalized: { $in: [lookup.protectedValue, lookup.normalized] } },
        { usernameNormalized: identifier },
      ] })
      const checkedPassword = user ? await verifyPassword(password, user.passwordHash) : await burnPasswordAttempt(password)
      const validPassword = passwordAcceptable && checkedPassword
      const locked = user?.lockedUntil && new Date(user.lockedUntil) > new Date()
      if (!user || !validPassword || locked || user.status !== 'active') {
        if (user && !validPassword) {
          const failures = (user.failedLoginCount || 0) + 1
          const lockMinutes = failures >= 5 ? Math.min(60, 2 ** Math.min(6, failures - 5) * 5) : 0
          await db.collection('auth_users').updateOne({ id: user.id }, { $set: { failedLoginCount: failures, lockedUntil: lockMinutes ? new Date(Date.now() + lockMinutes * 60_000) : null } })
        }
        await audit(request, { userId: user?.id, action: 'session.login', outcome: 'failure' })
        throw new AuthError('Invalid email, username or password.', 401, 'INVALID_CREDENTIALS')
      }

      const now = new Date()
      const securityUpgrade = {}
      if (user.email && !user.emailEncrypted) Object.assign(securityUpgrade, encryptedEmail(user.email))
      if (passwordHashNeedsUpgrade(user.passwordHash)) securityUpgrade.passwordHash = await hashPassword(password)
      const update = { failedLoginCount: 0, lockedUntil: null, lastLoginAt: now, updatedAt: now, ...securityUpgrade }
      await db.collection('auth_users').updateOne({ id: user.id }, { $set: update, ...(user.email ? { $unset: { email: '' } } : {}) })
      Object.assign(user, update)
      if (user.email) delete user.email
      user.lastLoginAt = now
      const { rawToken, session } = await createSession(user.id, request, data.remember == null ? false : booleanInput(data.remember, 'Remember'))
      await audit(request, { userId: user.id, action: 'session.login' })
      const result = response({ ok: true, user: publicUser(user), session: sessionView(session, session.id) })
      attachSessionCookie(result, rawToken, session.expiresAt)
      return result
    }

    if (route === 'logout') {
      const auth = await authFromRequest(request)
      if (auth) {
        await revokeSession(auth.rawToken)
        await audit(request, { userId: auth.user.id, action: 'session.logout' })
      }
      const result = response({ ok: true })
      clearAuthCookies(result)
      return result
    }

    if (route === 'logout-all') {
      const auth = await requireAuth(request)
      await revokeUserSessions(auth.user.id)
      await audit(request, { userId: auth.user.id, action: 'session.logout_all' })
      const result = response({ ok: true })
      clearAuthCookies(result)
      return result
    }

    if (route === 'forgot-password') {
      const email = textInput(data.email, { min: 3, max: 254, label: 'Email' }).toLowerCase()
      const lookup = emailLookup(email)
      await Promise.all([
        rateLimit('recovery-ip', ip, 8, 60 * 60_000),
        rateLimit('recovery-account', email, 3, 60 * 60_000),
      ])
      const user = await db.collection('auth_users').findOne({ emailNormalized: { $in: [lookup.protectedValue, lookup.normalized] }, status: 'active' })
      if (user) {
        const rawToken = await issueOneTimeToken(user.id, 'reset-password', 60 * 60_000)
        const url = `${authBaseUrl(request)}/reset-password?token=${encodeURIComponent(rawToken)}`
        const sent = await sendAuthEmail({
          to: revealUserEmail(user), subject: 'Reset your GTA LORE password', heading: 'Reset your password',
          message: 'Use this one-time link to choose a new password. It expires in one hour and invalidates after use.',
          actionLabel: 'Reset password', actionUrl: url,
          idempotencyKey: `reset-${user.id}-${Date.now()}`,
        }).catch(() => false)
        await audit(request, { userId: user.id, action: 'password.recovery_requested', metadata: { sent } })
      } else {
        await burnPasswordAttempt('recovery-timing-padding')
      }
      return response({ ok: true, message: 'If that address belongs to an account, a recovery email will arrive shortly.' })
    }

    if (route === 'reset-password') {
      await rateLimit('reset-ip', ip, 10, 60 * 60_000)
      const resetToken = String(data.token || '')
      const record = await findOneTimeToken(resetToken, 'reset-password')
      if (!record) throw new AuthError('This recovery link is invalid or expired.', 400, 'INVALID_TOKEN')
      const user = await db.collection('auth_users').findOne({ id: record.userId, status: 'active' })
      if (!user) throw new AuthError('This recovery link is invalid or expired.', 400, 'INVALID_TOKEN')
      const problems = passwordProblems(data.password, { email: revealUserEmail(user), username: user.username })
      if (problems.length) throw new AuthError(problems[0], 400, 'WEAK_PASSWORD')
      const passwordHash = await hashPassword(data.password)
      const consumed = await consumeOneTimeToken(resetToken, 'reset-password')
      if (!consumed) throw new AuthError('This recovery link has already been used.', 400, 'INVALID_TOKEN')
      const now = new Date()
      await db.collection('auth_users').updateOne({ id: user.id }, { $set: { passwordHash, failedLoginCount: 0, lockedUntil: null, passwordChangedAt: now, updatedAt: now } })
      await revokeUserSessions(user.id)
      await audit(request, { userId: user.id, action: 'password.reset' })
      const result = response({ ok: true, message: 'Password changed. Sign in again on every device.' })
      clearAuthCookies(result)
      return result
    }

    if (route === 'verify-email') {
      await rateLimit('verify-ip', ip, 20, 60 * 60_000)
      const record = await consumeOneTimeToken(String(data.token || ''), 'verify-email')
      if (!record) throw new AuthError('This verification link is invalid or expired.', 400, 'INVALID_TOKEN')
      const now = new Date()
      await db.collection('auth_users').updateOne({ id: record.userId, status: 'active' }, { $set: { emailVerifiedAt: now, updatedAt: now } })
      await audit(request, { userId: record.userId, action: 'email.verified' })
      return response({ ok: true, message: 'Email verified.' })
    }

    if (route === 'resend-verification') {
      const auth = await requireAuth(request)
      await rateLimit('verify-resend', `${ip}:${auth.user.id}`, 3, 60 * 60_000)
      if (!auth.user.emailVerifiedAt) {
        const sent = await sendVerification(request, auth.user).catch(() => false)
        await audit(request, { userId: auth.user.id, action: 'email.verification_requested', metadata: { sent } })
      }
      return response({ ok: true, message: 'If verification is pending, a new email will arrive shortly.' })
    }

    if (route === 'watch') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-watch', `${ip}:${auth.user.id}`, 400, DAY)
      const { entry, key } = requestedEntry(data)
      const watching = booleanInput(data.watching, 'Watching')
      if (watching) {
        await db.collection('wiki_watchlist').updateOne(
          { userId: auth.user.id, key },
          { $setOnInsert: { id: randomUUID(), userId: auth.user.id, key, kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, pinned: false, createdAt: new Date() } },
          { upsert: true },
        )
      } else {
        await db.collection('wiki_watchlist').deleteOne({ userId: auth.user.id, key })
      }
      await audit(request, { userId: auth.user.id, action: watching ? 'wiki.watch_added' : 'wiki.watch_removed', metadata: { key } })
      return response({ ok: true, watching, message: watching ? 'Page added to your watchlist.' : 'Page removed from your watchlist.' })
    }

    if (route === 'page-view') {
      const auth = await requireAuth(request)
      const preferences = wikiPreferences(auth.user)
      if (!preferences.recordHistory) return response({ ok: true, recorded: false })
      await rateLimit('wiki-history', `${ip}:${auth.user.id}`, 2_000, DAY)
      const { entry, key } = requestedEntry(data)
      const now = new Date()
      await db.collection('wiki_history').updateOne(
        { userId: auth.user.id, key },
        {
          $set: { kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, lastViewedAt: now },
          $setOnInsert: { id: randomUUID(), userId: auth.user.id, key, firstViewedAt: now },
          $inc: { viewCount: 1 },
        },
        { upsert: true },
      )
      return response({ ok: true, recorded: true })
    }

    if (route === 'history-clear') {
      const auth = await requireAuth(request)
      await db.collection('wiki_history').deleteMany({ userId: auth.user.id })
      await audit(request, { userId: auth.user.id, action: 'wiki.history_cleared' })
      return response({ ok: true, message: 'Reading history cleared.' })
    }

    if (route === 'watch-pin') {
      const auth = await requireAuth(request)
      const { key } = requestedEntry(data)
      const pinned = booleanInput(data.pinned, 'Pinned')
      const result = await db.collection('wiki_watchlist').updateOne({ userId: auth.user.id, key }, { $set: { pinned } })
      if (!result.matchedCount) throw new AuthError('Watch this page before pinning it.', 409, 'NOT_WATCHED')
      return response({ ok: true, pinned, message: pinned ? 'Page pinned.' : 'Page unpinned.' })
    }

    if (route === 'collection-create') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-collection', `${ip}:${auth.user.id}`, 50, DAY)
      const name = textInput(data.name, { min: 2, max: 40, label: 'Collection name' })
      const description = textInput(data.description, { min: 0, max: 160, label: 'Collection description' })
      const color = ['mint', 'violet', 'pink', 'sunset', 'ocean'].includes(data.color) ? data.color : 'violet'
      const now = new Date()
      const collection = { id: randomUUID(), userId: auth.user.id, name, nameNormalized: name.toLowerCase(), description, color, createdAt: now, updatedAt: now }
      await db.collection('wiki_collections').insertOne(collection)
      await audit(request, { userId: auth.user.id, action: 'wiki.collection_created', metadata: { collectionId: collection.id } })
      return response({ ok: true, collection: cleanWikiRecord(collection), message: 'Collection created.' }, 201)
    }

    if (route === 'collection-delete') {
      const auth = await requireAuth(request)
      const collectionId = textInput(data.collectionId, { min: 36, max: 36, label: 'Collection identifier' })
      if (!/^[0-9a-f-]{36}$/i.test(collectionId)) throw new AuthError('Collection not found.', 404, 'COLLECTION_NOT_FOUND')
      const owned = await db.collection('wiki_collections').findOne({ id: collectionId, userId: auth.user.id }, { projection: { _id: 1 } })
      if (!owned) throw new AuthError('Collection not found.', 404, 'COLLECTION_NOT_FOUND')
      await Promise.all([
        db.collection('wiki_collections').deleteOne({ id: collectionId, userId: auth.user.id }),
        db.collection('wiki_collection_items').deleteMany({ collectionId, userId: auth.user.id }),
      ])
      await audit(request, { userId: auth.user.id, action: 'wiki.collection_deleted', metadata: { collectionId } })
      return response({ ok: true, message: 'Collection deleted.' })
    }

    if (route === 'collection-item') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-collection-item', `${ip}:${auth.user.id}`, 800, DAY)
      const { entry, key } = requestedEntry(data)
      const collectionId = textInput(data.collectionId, { min: 36, max: 36, label: 'Collection identifier' })
      if (!/^[0-9a-f-]{36}$/i.test(collectionId)) throw new AuthError('Collection not found.', 404, 'COLLECTION_NOT_FOUND')
      const owned = await db.collection('wiki_collections').findOne({ id: collectionId, userId: auth.user.id }, { projection: { _id: 1 } })
      if (!owned) throw new AuthError('Collection not found.', 404, 'COLLECTION_NOT_FOUND')
      const saved = booleanInput(data.saved, 'Saved')
      if (saved) {
        await db.collection('wiki_collection_items').updateOne(
          { userId: auth.user.id, collectionId, key },
          { $setOnInsert: { id: randomUUID(), userId: auth.user.id, collectionId, key, kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, createdAt: new Date() } },
          { upsert: true },
        )
      } else {
        await db.collection('wiki_collection_items').deleteOne({ userId: auth.user.id, collectionId, key })
      }
      return response({ ok: true, saved, message: saved ? 'Page added to collection.' : 'Page removed from collection.' })
    }

    if (route === 'note') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-note', `${ip}:${auth.user.id}`, 500, DAY)
      const { entry, key } = requestedEntry(data)
      const body = textInput(data.body, { min: 0, max: 3_000, multiline: true, label: 'Private note' })
      if (!body) {
        await db.collection('wiki_notes').deleteOne({ userId: auth.user.id, key })
        return response({ ok: true, deleted: true, message: 'Private note deleted.' })
      }
      const now = new Date()
      await db.collection('wiki_notes').updateOne(
        { userId: auth.user.id, key },
        { $set: { bodyEncrypted: protectPrivateNote(body), kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, updatedAt: now }, $unset: { body: '' }, $setOnInsert: { id: randomUUID(), userId: auth.user.id, key, createdAt: now } },
        { upsert: true },
      )
      await audit(request, { userId: auth.user.id, action: 'wiki.note_saved', metadata: { key } })
      return response({ ok: true, note: { key, body, kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, updatedAt: now }, message: 'Private note saved.' })
    }

    if (route === 'suggestion') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-suggestion', `${ip}:${auth.user.id}`, 12, DAY)
      const { entry, key } = requestedEntry(data)
      const type = ['correction', 'source', 'expansion', 'typo'].includes(data.type) ? data.type : 'correction'
      const summary = textInput(data.summary, { min: 8, max: 160, label: 'Summary' })
      const details = textInput(data.details, { min: 20, max: 4_000, multiline: true, label: 'Details' })
      const sourceUrl = safeSourceUrl(data.sourceUrl)
      if (type !== 'typo' && !sourceUrl) throw new AuthError('Evidence-based suggestions require an official Rockstar Games URL.', 400, 'SOURCE_REQUIRED')
      const now = new Date()
      const suggestion = {
        id: randomUUID(), userId: auth.user.id, key, kind: entry.kind, slug: entry.slug,
        title: entry.name, href: entry.href, type, summary, detailsEncrypted: protectContributionDetails(details), sourceUrl,
        status: 'pending', createdAt: now, updatedAt: now,
      }
      await db.collection('wiki_suggestions').insertOne(suggestion)
      await audit(request, { userId: auth.user.id, action: 'wiki.suggestion_submitted', metadata: { key, suggestionId: suggestion.id } })
      return response({ ok: true, suggestion: cleanSuggestion(suggestion), message: 'Suggestion submitted to the editorial queue.' }, 201)
    }

    if (route === 'notifications-read') {
      const auth = await requireAuth(request)
      const notificationsReadAt = new Date()
      await db.collection('auth_users').updateOne({ id: auth.user.id }, { $set: { notificationsReadAt, updatedAt: notificationsReadAt } })
      return response({ ok: true, notificationsReadAt, message: 'Notifications marked as read.' })
    }

    if (route === 'suggestion-review') {
      const reviewer = await requireRole(request, ['editor', 'moderator', 'admin'])
      await rateLimit('wiki-review', `${ip}:${reviewer.user.id}`, 300, DAY)
      const id = textInput(data.id, { min: 36, max: 36, label: 'Suggestion identifier' })
      const status = ['accepted', 'rejected'].includes(data.status) ? data.status : ''
      const reviewNote = textInput(data.reviewNote, { min: 0, max: 500, multiline: true, label: 'Review note' })
      if (!id || !status) throw new AuthError('Choose a valid review decision.', 400, 'INVALID_REVIEW')
      const updatedAt = new Date()
      const result = await db.collection('wiki_suggestions').updateOne(
        { id, status: 'pending' },
        { $set: { status, reviewNoteEncrypted: protectReviewNote(reviewNote), reviewerId: reviewer.user.id, updatedAt }, $unset: { reviewNote: '' } },
      )
      if (!result.matchedCount) throw new AuthError('Suggestion is no longer pending.', 409, 'REVIEW_CONFLICT')
      await audit(request, { userId: reviewer.user.id, action: `wiki.suggestion_${status}`, metadata: { suggestionId: id } })
      return response({ ok: true, message: `Suggestion ${status}.` })
    }

    if (route === 'change-password') {
      const auth = await requireAuth(request)
      await rateLimit('password-change', `${ip}:${auth.user.id}`, 8, 60 * 60_000)
      const currentPassword = typeof data.currentPassword === 'string' && data.currentPassword.length <= 128 ? data.currentPassword : ''
      if (!await verifyPassword(currentPassword, auth.user.passwordHash)) throw new AuthError('Current password is incorrect.', 403, 'REAUTH_FAILED')
      const problems = passwordProblems(data.password, { email: revealUserEmail(auth.user), username: auth.user.username })
      if (problems.length) throw new AuthError(problems[0], 400, 'WEAK_PASSWORD')
      if (await verifyPassword(data.password, auth.user.passwordHash)) throw new AuthError('Choose a password you have not just used.', 400, 'PASSWORD_REUSED')
      const now = new Date()
      await db.collection('auth_users').updateOne({ id: auth.user.id }, { $set: { passwordHash: await hashPassword(data.password), passwordChangedAt: now, updatedAt: now } })
      await revokeUserSessions(auth.user.id, auth.session.id)
      await audit(request, { userId: auth.user.id, action: 'password.changed' })
      return response({ ok: true, message: 'Password changed. Other sessions were closed.' })
    }

    if (route === 'delete-account') {
      const auth = await requireAuth(request)
      await rateLimit('account-delete', `${ip}:${auth.user.id}`, 5, 60 * 60_000)
      if (data.confirmation !== 'DELETE') throw new AuthError('Type DELETE to confirm permanent account removal.', 400, 'CONFIRMATION_REQUIRED')
      const currentPassword = typeof data.currentPassword === 'string' && data.currentPassword.length <= 128 ? data.currentPassword : ''
      if (!await verifyPassword(currentPassword, auth.user.passwordHash)) throw new AuthError('Current password is incorrect.', 403, 'REAUTH_FAILED')
      await Promise.all([
        db.collection('auth_sessions').deleteMany({ userId: auth.user.id }),
        db.collection('auth_tokens').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_watchlist').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_history').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_suggestions').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_collections').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_collection_items').deleteMany({ userId: auth.user.id }),
        db.collection('wiki_notes').deleteMany({ userId: auth.user.id }),
        db.collection('auth_users').deleteOne({ id: auth.user.id }),
      ])
      await audit(request, { userId: auth.user.id, action: 'account.deleted' })
      const result = response({ ok: true, message: 'Account permanently deleted.' })
      clearAuthCookies(result)
      return result
    }

    // ---------------------------------------------------------------------
    // ADMIN — the three things an operator can change about somebody else.
    //
    // Admin-only, rate-limited, audited, and fenced by the guards that stop an
    // operator locking the archive out of its own administration: nobody can
    // change their own role or status, and the last admin cannot be demoted or
    // suspended. Suspension is real — `authFromRequest` only resolves sessions
    // for active users, so it takes effect on the suspended account's very next
    // request rather than whenever their session happens to expire.
    // ---------------------------------------------------------------------

    if (route === 'admin/user-role') {
      const admin = await requireRole(request, ADMIN_ROLES)
      await rateLimit('admin-mutate', `${ip}:${admin.user.id}`, 120, DAY)
      const userId = textInput(data.userId, { min: 36, max: 36, label: 'Account identifier' })
      const role = ASSIGNABLE_ROLES.includes(data.role) ? data.role : ''
      if (!role) throw new AuthError('Choose a role the archive recognises.', 400, 'INVALID_ROLE')
      if (userId === admin.user.id) throw new AuthError('Change your own role from another administrator’s account.', 400, 'SELF_ROLE_CHANGE')

      const target = await db.collection('auth_users').findOne({ id: userId }, { projection: ADMIN_USER_PROJECTION })
      if (!target) throw new AuthError('That account no longer exists.', 404, 'USER_NOT_FOUND')
      if (target.role === role) throw new AuthError(`That account is already ${role}.`, 409, 'ROLE_UNCHANGED')
      if (target.role === 'admin' && role !== 'admin') {
        const admins = await db.collection('auth_users').countDocuments({ role: 'admin', status: 'active' })
        if (admins <= 1) throw new AuthError('The archive would be left without an administrator.', 409, 'LAST_ADMIN')
      }

      const updatedAt = new Date()
      await db.collection('auth_users').updateOne({ id: userId, role: target.role }, { $set: { role, updatedAt } })
      await audit(request, { userId: admin.user.id, action: 'admin.role_changed', metadata: { targetId: userId, from: target.role, to: role } })
      return response({ ok: true, message: `${target.username} is now ${role}.` })
    }

    if (route === 'admin/user-status') {
      const admin = await requireRole(request, ADMIN_ROLES)
      await rateLimit('admin-mutate', `${ip}:${admin.user.id}`, 120, DAY)
      const userId = textInput(data.userId, { min: 36, max: 36, label: 'Account identifier' })
      const status = ACCOUNT_STATUSES.includes(data.status) ? data.status : ''
      if (!status) throw new AuthError('Choose a status the archive recognises.', 400, 'INVALID_STATUS')
      if (userId === admin.user.id) throw new AuthError('You cannot suspend your own account.', 400, 'SELF_SUSPEND')

      const target = await db.collection('auth_users').findOne({ id: userId }, { projection: ADMIN_USER_PROJECTION })
      if (!target) throw new AuthError('That account no longer exists.', 404, 'USER_NOT_FOUND')
      if (target.status === status) throw new AuthError(`That account is already ${status}.`, 409, 'STATUS_UNCHANGED')
      if (target.role === 'admin' && status !== 'active') {
        const admins = await db.collection('auth_users').countDocuments({ role: 'admin', status: 'active' })
        if (admins <= 1) throw new AuthError('The archive would be left without an administrator.', 409, 'LAST_ADMIN')
      }

      const updatedAt = new Date()
      await db.collection('auth_users').updateOne({ id: userId, status: target.status }, { $set: { status, updatedAt } })
      // A suspended account keeps no way back in, so its sessions go with it.
      if (status !== 'active') await revokeUserSessions(userId)
      await audit(request, { userId: admin.user.id, action: 'admin.status_changed', metadata: { targetId: userId, from: target.status, to: status } })
      return response({ ok: true, message: status === 'active' ? `${target.username} reinstated.` : `${target.username} suspended and signed out everywhere.` })
    }

    if (route === 'admin/user-revoke') {
      const admin = await requireRole(request, ADMIN_ROLES)
      await rateLimit('admin-mutate', `${ip}:${admin.user.id}`, 120, DAY)
      const userId = textInput(data.userId, { min: 36, max: 36, label: 'Account identifier' })
      if (userId === admin.user.id) throw new AuthError('Close your own sessions from your account desk.', 400, 'SELF_REVOKE')
      const target = await db.collection('auth_users').findOne({ id: userId }, { projection: ADMIN_USER_PROJECTION })
      if (!target) throw new AuthError('That account no longer exists.', 404, 'USER_NOT_FOUND')
      const closed = await revokeUserSessions(userId)
      await audit(request, { userId: admin.user.id, action: 'admin.sessions_revoked', metadata: { targetId: userId } })
      return response({ ok: true, message: `Signed ${target.username} out of every device.`, closed: closed?.deletedCount ?? null })
    }

    return response({ ok: false, error: 'Authentication route not found.', code: 'NOT_FOUND' }, 404)
  } catch (error) {
    return authFailure(error)
  }
}

export async function PATCH(request, { params }) {
  try {
    validateMutationRequest(request)
    const route = (await pathOf(params)).join('/')
    const data = await bodyOf(request)
    validateFields(route, data, 'PATCH')
    const auth = await requireAuth(request)
    const db = await getDb()
    await rateLimit('auth-patch', `${clientIp(request)}:${auth.user.id}`, 180, 15 * 60_000)
    if (route === 'preferences') {
      const previous = wikiPreferences(auth.user)
      const preferences = {
        publicProfile: booleanInput(data.publicProfile, 'Public profile'),
        recordHistory: booleanInput(data.recordHistory, 'Reading history'),
        compactMode: booleanInput(data.compactMode, 'Compact mode'),
        reducedMotion: booleanInput(data.reducedMotion, 'Reduced motion'),
      }
      const updatedAt = new Date()
      await db.collection('auth_users').updateOne({ id: auth.user.id }, { $set: { wikiPreferences: preferences, updatedAt } })
      if (previous.recordHistory && !preferences.recordHistory) await db.collection('wiki_history').deleteMany({ userId: auth.user.id })
      await audit(request, { userId: auth.user.id, action: 'wiki.preferences_updated' })
      return response({ ok: true, user: publicUser({ ...auth.user, wikiPreferences: preferences, updatedAt }), preferences, message: 'Wiki preferences saved.' })
    }
    if (route !== 'profile') return response({ ok: false, error: 'Authentication route not found.', code: 'NOT_FOUND' }, 404)
    const displayName = textInput(data.displayName, { min: 2, max: 50, label: 'Display name' })
    const { username, usernameNormalized } = validateUsername(data.username)
    const bio = textInput(data.bio, { min: 0, max: 240, multiline: true, label: 'Bio' })
    const collision = await db.collection('auth_users').findOne({ usernameNormalized, id: { $ne: auth.user.id } }, { projection: { id: 1 } })
    if (collision) throw new AuthError('That username is unavailable.', 409, 'USERNAME_UNAVAILABLE')
    const updatedAt = new Date()
    await db.collection('auth_users').updateOne({ id: auth.user.id }, { $set: { displayName, username, usernameNormalized, bio, updatedAt } })
    const user = { ...auth.user, displayName, username, usernameNormalized, bio, updatedAt }
    await audit(request, { userId: user.id, action: 'profile.updated' })
    return response({ ok: true, user: publicUser(user) })
  } catch (error) {
    return authFailure(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    validateMutationRequest(request)
    const parts = await pathOf(params)
    if (parts[0] !== 'sessions' || !parts[1]) return response({ ok: false, error: 'Authentication route not found.', code: 'NOT_FOUND' }, 404)
    const auth = await requireAuth(request)
    const db = await getDb()
    await rateLimit('auth-delete', `${clientIp(request)}:${auth.user.id}`, 120, 15 * 60_000)
    const sessionId = String(parts[1])
    if (!/^[0-9a-f-]{36}$/i.test(sessionId)) throw new AuthError('Session not found.', 404, 'SESSION_NOT_FOUND')
    const target = await db.collection('auth_sessions').findOne({ id: sessionId, userId: auth.user.id })
    if (target) await db.collection('auth_sessions').deleteOne({ id: sessionId, userId: auth.user.id })
    await audit(request, { userId: auth.user.id, action: 'session.revoked', metadata: { current: sessionId === auth.session.id } })
    const result = response({ ok: true, currentRevoked: sessionId === auth.session.id })
    if (sessionId === auth.session.id) clearAuthCookies(result)
    return result
  } catch (error) {
    return authFailure(error)
  }
}
