import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { getDb } from '@/lib/server/mongo'
import {
  AuthError, attachSessionCookie, audit, authBaseUrl, authFromRequest,
  DEFAULT_WIKI_PREFERENCES,
  burnPasswordAttempt, clearAuthCookies, consumeOneTimeToken, createSession, ensureAuthIndexes,
  ensureCsrf, findOneTimeToken, hashPassword, issueOneTimeToken, passwordProblems, publicUser, rateLimit,
  requireAuth, requireRole, revokeSession, revokeUserSessions, sendAuthEmail, sessionView,
  validateIdentity, validateMutationRequest, validateUsername, verifyPassword, wikiPreferences,
} from '@/lib/server/auth'
import { entryFor } from '@/lib/wiki-graph'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DAY = 86_400_000

function response(data, status = 200) {
  const result = NextResponse.json(data, { status })
  result.headers.set('Cache-Control', 'no-store, max-age=0')
  result.headers.set('Pragma', 'no-cache')
  result.headers.set('Vary', 'Cookie')
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
    const value = await request.json()
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('invalid')
    return value
  } catch {
    throw new AuthError('Invalid JSON body.', 400, 'INVALID_BODY')
  }
}

function authFailure(error) {
  if (error instanceof AuthError) return response({ ok: false, error: error.message, code: error.code }, error.status)
  if (error?.code === 11000) return response({ ok: false, error: 'That email or username is unavailable.', code: 'IDENTITY_UNAVAILABLE' }, 409)
  console.error('Authentication service error', error)
  return response({ ok: false, error: 'Authentication service unavailable.', code: 'AUTH_UNAVAILABLE' }, 500)
}

function requestedEntry(data) {
  const kind = String(data?.kind || '').slice(0, 32)
  const slug = String(data?.slug || '').slice(0, 160)
  const entry = entryFor(kind, slug)
  if (!entry) throw new AuthError('Archive entry not found.', 404, 'ENTRY_NOT_FOUND')
  return { entry, key: `${kind}:${slug}` }
}

const cleanWikiRecord = ({ _id, userId, ...record }) => record

function safeSourceUrl(value) {
  const sourceUrl = String(value || '').trim()
  if (!sourceUrl) return ''
  if (sourceUrl.length > 800) throw new AuthError('Source URL is too long.', 400, 'INVALID_SOURCE')
  try {
    const parsed = new URL(sourceUrl)
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('protocol')
    return parsed.toString()
  } catch {
    throw new AuthError('Enter a valid http or https source URL.', 400, 'INVALID_SOURCE')
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
    to: user.email,
    subject: 'Verify your LUSORAE account',
    heading: 'Verify your archive identity',
    message: 'Confirm this email address to mark your LUSORAE account as verified. This link expires in 24 hours.',
    actionLabel: 'Verify email', actionUrl: url,
    idempotencyKey: `verify-${user.id}-${Date.now()}`,
  })
}

export async function GET(request, { params }) {
  try {
    const route = (await pathOf(params)).join('/')
    await ensureAuthIndexes()

    if (route === 'session') {
      const auth = await authFromRequest(request)
      const carrier = response({ ok: true })
      const csrfToken = ensureCsrf(request, carrier)
      const result = response({
        ok: true,
        user: publicUser(auth?.user),
        session: auth ? sessionView(auth.session, auth.session.id) : null,
        csrfToken,
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
        suggestions: suggestions.map(cleanWikiRecord),
        reviewQueue: reviewQueue.map(cleanWikiRecord),
        notifications: notifications.slice(0, 80),
        collections: collections.map(cleanWikiRecord),
        collectionItems: collectionItems.map(cleanWikiRecord),
        notes: notes.map(cleanWikiRecord),
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
      const result = response({
        exportedAt: new Date(),
        profile: publicUser(auth.user),
        data: Object.fromEntries(collectionNames.map((name, index) => [name.replace('wiki_', ''), records[index]])),
      })
      result.headers.set('Content-Disposition', `attachment; filename="lusorae-${auth.user.username}-export.json"`)
      return result
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
    const ip = clientIp(request)
    const db = await ensureAuthIndexes()

    if (route === 'register') {
      await rateLimit('register-ip', ip, 5, 60 * 60_000)
      const identity = validateIdentity(data)
      const problems = passwordProblems(data.password, identity)
      if (problems.length) throw new AuthError(problems[0], 400, 'WEAK_PASSWORD')

      const existing = await db.collection('auth_users').findOne({
        $or: [{ emailNormalized: identity.emailNormalized }, { usernameNormalized: identity.usernameNormalized }],
      }, { projection: { emailNormalized: 1, usernameNormalized: 1 } })
      if (existing) {
        await burnPasswordAttempt(data.password)
        if (existing.usernameNormalized === identity.usernameNormalized) throw new AuthError('That username is unavailable.', 409, 'USERNAME_UNAVAILABLE')
        throw new AuthError('An account already uses that email. Sign in or recover access.', 409, 'EMAIL_UNAVAILABLE')
      }

      const now = new Date()
      const user = {
        id: randomUUID(), ...identity,
        passwordHash: await hashPassword(data.password),
        bio: '', role: 'reader', status: 'active', emailVerifiedAt: null,
        wikiPreferences: { ...DEFAULT_WIKI_PREFERENCES }, notificationsReadAt: new Date(0),
        failedLoginCount: 0, lockedUntil: null,
        createdAt: now, updatedAt: now, lastLoginAt: now,
      }
      await db.collection('auth_users').insertOne(user)
      const verificationSent = await sendVerification(request, user).catch(() => false)
      const { rawToken, session } = await createSession(user.id, request, Boolean(data.remember))
      await audit(request, { userId: user.id, action: 'account.created', metadata: { verificationSent } })
      const result = response({ ok: true, user: publicUser(user), session: sessionView(session, session.id), verificationSent }, 201)
      attachSessionCookie(result, rawToken, session.expiresAt)
      return result
    }

    if (route === 'login') {
      const identifier = String(data.identifier || '').trim().toLowerCase()
      const suppliedPassword = typeof data.password === 'string' ? data.password : ''
      const passwordAcceptable = Array.from(suppliedPassword).length > 0 && Array.from(suppliedPassword).length <= 128 && identifier.length <= 254
      const password = passwordAcceptable ? suppliedPassword : suppliedPassword.slice(0, 128)
      await Promise.all([
        rateLimit('login-ip', ip, 60, 15 * 60_000),
        rateLimit('login-account', `${ip}:${identifier}`, 10, 15 * 60_000),
      ])
      const user = await db.collection('auth_users').findOne({
        $or: [{ emailNormalized: identifier }, { usernameNormalized: identifier }],
      })
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
      await db.collection('auth_users').updateOne({ id: user.id }, { $set: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: now, updatedAt: now } })
      user.lastLoginAt = now
      const { rawToken, session } = await createSession(user.id, request, Boolean(data.remember))
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
      const email = String(data.email || '').trim().toLowerCase()
      await Promise.all([
        rateLimit('recovery-ip', ip, 8, 60 * 60_000),
        rateLimit('recovery-account', email, 3, 60 * 60_000),
      ])
      const user = await db.collection('auth_users').findOne({ emailNormalized: email, status: 'active' })
      if (user) {
        const rawToken = await issueOneTimeToken(user.id, 'reset-password', 60 * 60_000)
        const url = `${authBaseUrl(request)}/reset-password?token=${encodeURIComponent(rawToken)}`
        const sent = await sendAuthEmail({
          to: user.email, subject: 'Reset your LUSORAE password', heading: 'Reset your password',
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
      const problems = passwordProblems(data.password, user)
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
      const watching = Boolean(data.watching)
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
      const pinned = Boolean(data.pinned)
      const result = await db.collection('wiki_watchlist').updateOne({ userId: auth.user.id, key }, { $set: { pinned } })
      if (!result.matchedCount) throw new AuthError('Watch this page before pinning it.', 409, 'NOT_WATCHED')
      return response({ ok: true, pinned, message: pinned ? 'Page pinned.' : 'Page unpinned.' })
    }

    if (route === 'collection-create') {
      const auth = await requireAuth(request)
      await rateLimit('wiki-collection', `${ip}:${auth.user.id}`, 50, DAY)
      const name = String(data.name || '').trim()
      const description = String(data.description || '').trim()
      const color = ['mint', 'violet', 'pink', 'sunset', 'ocean'].includes(data.color) ? data.color : 'violet'
      if (name.length < 2 || name.length > 40) throw new AuthError('Collection name must be 2–40 characters.', 400, 'INVALID_COLLECTION')
      if (description.length > 160) throw new AuthError('Collection description must be 160 characters or fewer.', 400, 'INVALID_COLLECTION')
      const now = new Date()
      const collection = { id: randomUUID(), userId: auth.user.id, name, nameNormalized: name.toLowerCase(), description, color, createdAt: now, updatedAt: now }
      await db.collection('wiki_collections').insertOne(collection)
      await audit(request, { userId: auth.user.id, action: 'wiki.collection_created', metadata: { collectionId: collection.id } })
      return response({ ok: true, collection: cleanWikiRecord(collection), message: 'Collection created.' }, 201)
    }

    if (route === 'collection-delete') {
      const auth = await requireAuth(request)
      const collectionId = String(data.collectionId || '').slice(0, 80)
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
      const collectionId = String(data.collectionId || '').slice(0, 80)
      const owned = await db.collection('wiki_collections').findOne({ id: collectionId, userId: auth.user.id }, { projection: { _id: 1 } })
      if (!owned) throw new AuthError('Collection not found.', 404, 'COLLECTION_NOT_FOUND')
      const saved = Boolean(data.saved)
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
      const body = String(data.body || '').trim()
      if (body.length > 3_000) throw new AuthError('Private notes must be 3,000 characters or fewer.', 400, 'INVALID_NOTE')
      if (!body) {
        await db.collection('wiki_notes').deleteOne({ userId: auth.user.id, key })
        return response({ ok: true, deleted: true, message: 'Private note deleted.' })
      }
      const now = new Date()
      await db.collection('wiki_notes').updateOne(
        { userId: auth.user.id, key },
        { $set: { body, kind: entry.kind, slug: entry.slug, title: entry.name, href: entry.href, updatedAt: now }, $setOnInsert: { id: randomUUID(), userId: auth.user.id, key, createdAt: now } },
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
      const summary = String(data.summary || '').trim()
      const details = String(data.details || '').trim()
      if (summary.length < 8 || summary.length > 160) throw new AuthError('Summary must be 8–160 characters.', 400, 'INVALID_SUMMARY')
      if (details.length < 20 || details.length > 4_000) throw new AuthError('Details must be 20–4,000 characters.', 400, 'INVALID_DETAILS')
      const sourceUrl = safeSourceUrl(data.sourceUrl)
      if (type !== 'typo' && !sourceUrl) throw new AuthError('Evidence-based suggestions require a source URL.', 400, 'SOURCE_REQUIRED')
      const now = new Date()
      const suggestion = {
        id: randomUUID(), userId: auth.user.id, key, kind: entry.kind, slug: entry.slug,
        title: entry.name, href: entry.href, type, summary, details, sourceUrl,
        status: 'pending', createdAt: now, updatedAt: now,
      }
      await db.collection('wiki_suggestions').insertOne(suggestion)
      await audit(request, { userId: auth.user.id, action: 'wiki.suggestion_submitted', metadata: { key, suggestionId: suggestion.id } })
      return response({ ok: true, suggestion: cleanWikiRecord(suggestion), message: 'Suggestion submitted to the editorial queue.' }, 201)
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
      const id = String(data.id || '').slice(0, 80)
      const status = ['accepted', 'rejected'].includes(data.status) ? data.status : ''
      const reviewNote = String(data.reviewNote || '').trim().slice(0, 500)
      if (!id || !status) throw new AuthError('Choose a valid review decision.', 400, 'INVALID_REVIEW')
      const updatedAt = new Date()
      const result = await db.collection('wiki_suggestions').updateOne(
        { id, status: 'pending' },
        { $set: { status, reviewNote, reviewerId: reviewer.user.id, updatedAt } },
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
      const problems = passwordProblems(data.password, auth.user)
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
    const auth = await requireAuth(request)
    const db = await getDb()
    if (route === 'preferences') {
      const previous = wikiPreferences(auth.user)
      const preferences = {
        publicProfile: Boolean(data.publicProfile),
        recordHistory: Boolean(data.recordHistory),
        compactMode: Boolean(data.compactMode),
      }
      const updatedAt = new Date()
      await db.collection('auth_users').updateOne({ id: auth.user.id }, { $set: { wikiPreferences: preferences, updatedAt } })
      if (previous.recordHistory && !preferences.recordHistory) await db.collection('wiki_history').deleteMany({ userId: auth.user.id })
      await audit(request, { userId: auth.user.id, action: 'wiki.preferences_updated' })
      return response({ ok: true, user: publicUser({ ...auth.user, wikiPreferences: preferences, updatedAt }), preferences, message: 'Wiki preferences saved.' })
    }
    if (route !== 'profile') return response({ ok: false, error: 'Authentication route not found.', code: 'NOT_FOUND' }, 404)
    const displayName = String(data.displayName || '').trim()
    const { username, usernameNormalized } = validateUsername(data.username)
    const bio = String(data.bio || '').trim()
    if (displayName.length < 2 || displayName.length > 50) throw new AuthError('Display name must be 2–50 characters.', 400, 'INVALID_DISPLAY_NAME')
    if (bio.length > 240) throw new AuthError('Bio must be 240 characters or fewer.', 400, 'INVALID_BIO')
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
    const sessionId = parts[1]
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
