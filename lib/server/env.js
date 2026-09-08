import 'server-only'

let checked = false

function validOrigin(value, { https = false } = {}) {
  try {
    const url = new URL(value)
    return url.origin === value.replace(/\/$/, '') && (!https || url.protocol === 'https:')
  } catch {
    return false
  }
}

export function assertServerEnvironment() {
  if (checked) return
  const production = process.env.NODE_ENV === 'production'
  const required = ['APP_ENV', 'MONGO_URL', 'DB_NAME', 'DATA_ENCRYPTION_KEY']
  const missing = required.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Server configuration is incomplete: ${missing.join(', ')}`)

  const key = String(process.env.DATA_ENCRYPTION_KEY || '')
  const keyBytes = /^[a-f0-9]{64}$/i.test(key) ? Buffer.from(key, 'hex') : Buffer.from(key, 'base64url')
  if (keyBytes.length !== 32) throw new Error('DATA_ENCRYPTION_KEY must contain 32 random bytes')

  if (production) {
    if (process.env.APP_ENV !== 'production') throw new Error('Production must use the production environment file')
    if (!validOrigin(process.env.AUTH_BASE_URL || '', { https: true })) throw new Error('AUTH_BASE_URL must be one HTTPS origin in production')
    const trusted = String(process.env.AUTH_TRUSTED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean)
    if (!trusted.length || trusted.some((origin) => !validOrigin(origin, { https: true }))) throw new Error('AUTH_TRUSTED_ORIGINS must contain HTTPS origins in production')
    let mongo
    try { mongo = new URL(process.env.MONGO_URL) }
    catch { throw new Error('MONGO_URL is invalid') }
    if (!['mongodb:', 'mongodb+srv:'].includes(mongo.protocol) || !mongo.username || !mongo.password) {
      throw new Error('Production MongoDB must require application credentials')
    }
    const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(mongo.hostname)
    const tlsDisabled = ['false', '0'].includes(String(mongo.searchParams.get('tls') || mongo.searchParams.get('ssl') || '').toLowerCase())
    const invalidTls = ['tlsInsecure', 'tlsAllowInvalidCertificates', 'tlsAllowInvalidHostnames']
      .some((name) => String(mongo.searchParams.get(name) || '').toLowerCase() === 'true')
    if (invalidTls || (!loopback && (mongo.protocol !== 'mongodb+srv:' && !['true', '1'].includes(String(mongo.searchParams.get('tls') || mongo.searchParams.get('ssl') || '').toLowerCase()) || tlsDisabled))) {
      throw new Error('Remote production MongoDB must use verified TLS')
    }
  }
  if (!production && process.env.APP_ENV === 'production') throw new Error('Development cannot use the production environment file')
  checked = true
}
