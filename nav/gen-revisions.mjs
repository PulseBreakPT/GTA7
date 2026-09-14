import { readFileSync, writeFileSync } from 'node:fs'

const WT = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki'
const DAY10 = '2026-09-10'
const DAY11 = '2026-09-11'

// Estado no fim de dia 10 (depois da classe Muscle) e estado actual.
const before = await import(`${WT}/reported2.js`)
const now = await import(`${WT}/nav/reported-gp2.js`)
const oldContent = readFileSync(`${WT}/content8.js`, 'utf8')
const curContent = readFileSync('/home/ubuntu/gta7/lib/content.js', 'utf8')

const revised = {}
const bump = (key, date) => { if (!revised[key] || revised[key] < date) revised[key] = date }

// 1. Notas comunitárias: chave nova ou itens alterados depois de dia 10 → 11.
for (const key of now.REPORTED_KEYS) {
  const [kind, slug] = key.split(':')
  const a = JSON.stringify(before.reportedFor(kind, slug))
  const b = JSON.stringify(now.reportedFor(kind, slug))
  bump(key, !before.REPORTED_KEYS.includes(key) || a !== b ? DAY11 : DAY10)
}

// O reported2.js foi editado no próprio ficheiro no dia 11 para juntar a
// nota Off-Road ao Manchez e ao Sanchez, por isso a comparação não os apanha.
bump('vehicle:manchez', DAY11)
bump('vehicle:sanchez', DAY11)

// Registos criados no dia 10 sem notas próprias: as sete espécies novas e a
// pump-action shotgun (os construtores dão-lhes uma data fixa mais antiga).
const created = {}
const make = (key, date) => { created[key] = date; bump(key, date) }
for (const slug of ['cows', 'crayfish', 'frogs', 'pigeons', 'possums', 'rats', 'skunks']) make(`world:${slug}`, DAY10)
make('weapon:pump-action-shotgun', DAY10)
make('world:shore-court-garage', DAY10)

// 2. Registos de veículo criados a partir dos resumos.
const community = (src) => new Set([...src.matchAll(/V\(['"]([a-z0-9-]+)['"][^\n]*\['Community summary', null\]/g)].map((m) => m[1]))
const old = community(oldContent)
for (const slug of community(curContent)) make(`vehicle:${slug}`, old.has(slug) ? DAY10 : DAY11)

// 3. Mudança de classe do DF8-90 (dia 11) já vem pela nota; locais com
// frame novo em /map (dia 10).
const frames = curContent.match(/const LOCATION_FRAMES = \{([\s\S]*?)\n\}/)
if (frames) for (const m of frames[1].matchAll(/^\s*['"]?([a-z0-9-]+)['"]?:/gm)) bump(`location:${m[1]}`, DAY10)

const sorted = Object.fromEntries(Object.entries(revised).sort(([a], [b]) => a.localeCompare(b)))
const counts = Object.values(sorted).reduce((acc, d) => ({ ...acc, [d]: (acc[d] || 0) + 1 }), {})
writeFileSync(`${WT}/nav/revisions.js`, `// Datas de revisão por ficha, geradas a partir do trabalho com os resumos
// comunitários de 10 e 11 de Setembro de 2026. Cada ficha fica com a data do
// dia em que foi mexida pela última vez; applyRevisions só avança datas,
// nunca as recua.
export const REVISED = ${JSON.stringify(sorted, null, 2).replace(/"/g, "'")}

// Fichas criadas de raiz nesses dias: a data de publicação é a da criação.
export const CREATED = ${JSON.stringify(Object.fromEntries(Object.entries(created).sort(([a], [b]) => a.localeCompare(b))), null, 2).replace(/"/g, "'")}

export const revisedOn = (kind, slug) => REVISED[\`\${kind}:\${slug}\`] || null

export function applyRevisions(kind, records) {
  for (const record of records) {
    const date = revisedOn(kind, record.slug)
    if (date && (!record.updatedAt || record.updatedAt < date)) record.updatedAt = date
    const born = CREATED[\`\${kind}:\${record.slug}\`]
    if (born) record.publishedAt = born
  }
  return records
}
`)
console.log(Object.keys(sorted).length, 'records', Object.keys(created).length, 'created', JSON.stringify(counts), 'location frames:', frames ? 'yes' : 'no')
