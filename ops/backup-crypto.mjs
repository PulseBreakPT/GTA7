import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { createReadStream, createWriteStream, promises as fs } from 'fs'
import { pipeline } from 'stream/promises'

const [mode, input, output] = process.argv.slice(2)
const raw = String(process.env.BACKUP_ENCRYPTION_KEY || '').trim()
const key = /^[a-f0-9]{64}$/i.test(raw) ? Buffer.from(raw, 'hex') : Buffer.from(raw, 'base64url')
if (key.length !== 32 || !['encrypt', 'verify'].includes(mode) || !input) throw new Error('Invalid backup cryptography configuration')

if (mode === 'encrypt') {
  if (!output) throw new Error('Output path required')
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const handle = await fs.open(output, 'wx', 0o600)
  await handle.write(Buffer.concat([Buffer.from('GTALORE1'), iv]))
  await handle.close()
  await pipeline(createReadStream(input), cipher, createWriteStream(output, { flags: 'a', mode: 0o600 }))
  await fs.appendFile(output, cipher.getAuthTag())
} else {
  const handle = await fs.open(input, 'r')
  const stat = await handle.stat()
  if (stat.size < 36) throw new Error('Encrypted backup is incomplete')
  const header = Buffer.alloc(20)
  const tag = Buffer.alloc(16)
  await handle.read(header, 0, 20, 0)
  await handle.read(tag, 0, 16, stat.size - 16)
  await handle.close()
  if (header.subarray(0, 8).toString() !== 'GTALORE1') throw new Error('Encrypted backup header is invalid')
  const decipher = createDecipheriv('aes-256-gcm', key, header.subarray(8))
  decipher.setAuthTag(tag)
  await pipeline(createReadStream(input, { start: 20, end: stat.size - 17 }), decipher, createWriteStream('/dev/null'))
}

