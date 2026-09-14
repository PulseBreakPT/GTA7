import { readFileSync } from 'node:fs'
const reported = readFileSync(new URL('./reported7.js', import.meta.url), 'utf8')
const content = readFileSync(new URL('./content12.js', import.meta.url), 'utf8')
const keys = [...reported.matchAll(/^ {2}'vehicle:([a-z0-9-]+)'/gm)].map((m) => m[1])
const missing = keys.filter((slug) => !new RegExp(`V\\(['"]${slug}['"]`).test(content))
console.log(`${keys.length} vehicle keys · missing: ${missing.join(', ') || 'none'}`)
