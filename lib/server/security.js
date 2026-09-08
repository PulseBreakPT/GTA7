import 'server-only'

import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from 'crypto'

const VERSION = 'v1'
const MAX_CHALLENGE_AGE = 30 * 60_000
const MIN_CHALLENGE_AGE = 500

function decodeKey(value) {
  const source = String(value || '').trim()
  if (/^[a-f0-9]{64}$/i.test(source)) return Buffer.from(source, 'hex')
  try {
    const key = Buffer.from(source, 'base64url')
    return key.length === 32 ? key : null
  } catch {
    return null
  }
}

let keyCache
function dataKey() {
  if (keyCache) return keyCache
  keyCache = decodeKey(process.env.DATA_ENCRYPTION_KEY)
  if (!keyCache) {
    throw new Error('Server data encryption is not configured')
  }
  return keyCache
}

function signature(value, purpose) {
  return createHmac('sha256', dataKey()).update(`${purpose}\0${value}`).digest('base64url')
}

export function blindIndex(value, purpose) {
  return signature(String(value || '').normalize('NFKC').trim().toLowerCase(), `lookup:${purpose}`)
}

export function encryptSensitive(value, purpose) {
  if (value == null || value === '') return ''
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', dataKey(), iv)
  cipher.setAAD(Buffer.from(`${VERSION}:${purpose}`))
  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()])
  return [VERSION, iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), encrypted.toString('base64url')].join('.')
}

export function decryptSensitive(value, purpose) {
  if (!value) return ''
  const [version, ivValue, tagValue, payloadValue] = String(value).split('.')
  if (version !== VERSION || !ivValue || !tagValue || !payloadValue) throw new Error('Encrypted field is invalid')
  const decipher = createDecipheriv('aes-256-gcm', dataKey(), Buffer.from(ivValue, 'base64url'))
  decipher.setAAD(Buffer.from(`${VERSION}:${purpose}`))
  decipher.setAuthTag(Buffer.from(tagValue, 'base64url'))
  return Buffer.concat([decipher.update(Buffer.from(payloadValue, 'base64url')), decipher.final()]).toString('utf8')
}

export function protectEmail(email) {
  const normalized = String(email || '').normalize('NFKC').trim().toLowerCase()
  return {
    emailEncrypted: encryptSensitive(normalized, 'auth-user-email'),
    emailNormalized: blindIndex(normalized, 'auth-user-email'),
  }
}

export function userEmail(user) {
  if (user?.emailEncrypted) return decryptSensitive(user.emailEncrypted, 'auth-user-email')
  return String(user?.email || '')
}

export function protectPrivateNote(body) {
  return encryptSensitive(body, 'wiki-private-note')
}

export function privateNoteBody(note) {
  if (note?.bodyEncrypted) return decryptSensitive(note.bodyEncrypted, 'wiki-private-note')
  return String(note?.body || '')
}

export function protectContributionDetails(value) {
  return encryptSensitive(value, 'wiki-contribution-details')
}

export function contributionDetails(record) {
  if (record?.detailsEncrypted) return decryptSensitive(record.detailsEncrypted, 'wiki-contribution-details')
  return String(record?.details || '')
}

export function protectReviewNote(value) {
  return encryptSensitive(value, 'wiki-review-note')
}

export function reviewNoteBody(record) {
  if (record?.reviewNoteEncrypted) return decryptSensitive(record.reviewNoteEncrypted, 'wiki-review-note')
  return String(record?.reviewNote || '')
}

export function cleanText(value, { min = 0, max = 1_000, multiline = false, label = 'Value' } = {}) {
  if (value == null && min === 0) value = ''
  if (typeof value !== 'string') throw new Error(`${label} must be text.`)
  let result = value.normalize('NFKC')
  result = result.replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
  result = result.trim()
  const length = Array.from(result).length
  if (length < min || length > max) throw new Error(`${label} must be ${min}–${max} characters.`)
  return result
}

export function assertAllowedFields(data, allowed) {
  const permit = new Set(allowed)
  const unknown = Object.keys(data || {}).filter((key) => !permit.has(key))
  if (unknown.length) throw new Error('Request contains unsupported fields.')
}

export function createBotChallenge(csrfToken) {
  const issuedAt = Date.now().toString(36)
  const nonce = randomBytes(12).toString('base64url')
  const payload = `${issuedAt}.${nonce}.${signature(csrfToken, 'bot-csrf')}`
  return `${payload}.${signature(payload, 'bot-challenge')}`
}

export function verifyBotChallenge(challenge, csrfToken) {
  const parts = String(challenge || '').split('.')
  if (parts.length !== 4) return false
  const [issuedAt, nonce, csrfSignature, suppliedSignature] = parts
  const payload = `${issuedAt}.${nonce}.${csrfSignature}`
  const expectedSignature = signature(payload, 'bot-challenge')
  const left = Buffer.from(suppliedSignature)
  const right = Buffer.from(expectedSignature)
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false
  const expectedCsrf = signature(csrfToken, 'bot-csrf')
  const csrfLeft = Buffer.from(csrfSignature)
  const csrfRight = Buffer.from(expectedCsrf)
  if (csrfLeft.length !== csrfRight.length || !timingSafeEqual(csrfLeft, csrfRight)) return false
  const age = Date.now() - Number.parseInt(issuedAt, 36)
  return Number.isFinite(age) && age >= MIN_CHALLENGE_AGE && age <= MAX_CHALLENGE_AGE
}
