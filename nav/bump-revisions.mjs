import { readFileSync, writeFileSync } from 'node:fs'

// Acrescenta datas a lib/revisions.js sem mexer no resto do ficheiro.
// Uso: node bump-revisions.mjs <revisions.js> <date> <keys.json> [created.json]
const [file, date, keysFile, createdFile] = process.argv.slice(2)
const mod = await import(file)
const revised = { ...mod.REVISED }
const created = { ...mod.CREATED }
for (const key of JSON.parse(readFileSync(keysFile, 'utf8'))) if (!revised[key] || revised[key] < date) revised[key] = date
if (createdFile) for (const key of JSON.parse(readFileSync(createdFile, 'utf8'))) { created[key] = date; revised[key] = date }
const dump = (o) => JSON.stringify(Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b))), null, 2).replace(/"/g, "'")
let src = readFileSync(file, 'utf8')
src = src.replace(/export const REVISED = \{[\s\S]*?\n\}/, `export const REVISED = ${dump(revised)}`)
src = src.replace(/export const CREATED = \{[\s\S]*?\n\}/, `export const CREATED = ${dump(created)}`)
writeFileSync(file, src)
console.log(Object.keys(revised).length, 'revised ·', Object.keys(created).length, 'created')
