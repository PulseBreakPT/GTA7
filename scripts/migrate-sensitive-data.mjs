import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto'
import { MongoClient } from 'mongodb'

const keyValue = String(process.env.DATA_ENCRYPTION_KEY || '').trim()
const key = /^[a-f0-9]{64}$/i.test(keyValue) ? Buffer.from(keyValue, 'hex') : Buffer.from(keyValue, 'base64url')
if (key.length !== 32) throw new Error('DATA_ENCRYPTION_KEY must contain 32 random bytes')
if (!process.env.MONGO_URL || !process.env.DB_NAME) throw new Error('Database configuration is incomplete')

function encrypt(value, purpose) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  cipher.setAAD(Buffer.from(`v1:${purpose}`))
  const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()])
  return ['v1', iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), encrypted.toString('base64url')].join('.')
}

function decrypt(value, purpose) {
  const [version, iv, tag, payload] = String(value).split('.')
  if (version !== 'v1') throw new Error('Unsupported encrypted field version')
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64url'))
  decipher.setAAD(Buffer.from(`v1:${purpose}`))
  decipher.setAuthTag(Buffer.from(tag, 'base64url'))
  return Buffer.concat([decipher.update(Buffer.from(payload, 'base64url')), decipher.final()]).toString('utf8')
}

function lookup(value, purpose) {
  const normalized = String(value).normalize('NFKC').trim().toLowerCase()
  return createHmac('sha256', key).update(`lookup:${purpose}\0${normalized}`).digest('base64url')
}

const client = new MongoClient(process.env.MONGO_URL, { serverSelectionTimeoutMS: 8_000 })
const changed = { users: 0, sessions: 0, notes: 0, contributions: 0 }

try {
  await client.connect()
  const db = client.db(process.env.DB_NAME)

  for await (const user of db.collection('auth_users').find({}, { projection: { _id: 1, email: 1, emailEncrypted: 1, emailNormalized: 1 } })) {
    const email = user.email || (user.emailEncrypted ? decrypt(user.emailEncrypted, 'auth-user-email') : '')
    if (!email) continue
    const emailNormalized = lookup(email, 'auth-user-email')
    if (user.email || user.emailNormalized !== emailNormalized) {
      await db.collection('auth_users').updateOne({ _id: user._id }, {
        $set: { emailEncrypted: user.emailEncrypted || encrypt(email.toLowerCase(), 'auth-user-email'), emailNormalized },
        $unset: { email: '' },
      })
      changed.users += 1
    }
  }

  for await (const note of db.collection('wiki_notes').find({ body: { $type: 'string' } }, { projection: { _id: 1, body: 1 } })) {
    await db.collection('wiki_notes').updateOne({ _id: note._id }, { $set: { bodyEncrypted: encrypt(note.body, 'wiki-private-note') }, $unset: { body: '' } })
    changed.notes += 1
  }

  const sessionCleanup = await db.collection('auth_sessions').updateMany({ $or: [{ userAgent: { $exists: true } }, { ipHash: { $exists: true } }] }, { $unset: { userAgent: '', ipHash: '' } })
  changed.sessions = sessionCleanup.modifiedCount

  for await (const item of db.collection('wiki_suggestions').find({ $or: [{ details: { $type: 'string' } }, { reviewNote: { $type: 'string' } }] })) {
    const set = {}
    const unset = {}
    if (typeof item.details === 'string') { set.detailsEncrypted = encrypt(item.details, 'wiki-contribution-details'); unset.details = '' }
    if (typeof item.reviewNote === 'string') { set.reviewNoteEncrypted = encrypt(item.reviewNote, 'wiki-review-note'); unset.reviewNote = '' }
    await db.collection('wiki_suggestions').updateOne({ _id: item._id }, { $set: set, $unset: unset })
    changed.contributions += 1
  }

  console.log(`Sensitive-data migration complete: ${changed.users} users, ${changed.sessions} sessions, ${changed.notes} notes, ${changed.contributions} contributions updated.`)
} catch {
  console.error('Sensitive-data migration failed without exposing database details.')
  process.exitCode = 1
} finally {
  await client.close().catch(() => {})
}
