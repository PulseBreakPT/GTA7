import { readFileSync, writeFileSync } from 'node:fs'
const txt = readFileSync(new URL('./remaining.txt', import.meta.url), 'utf8')
const content = readFileSync(new URL('./content11.js', import.meta.url), 'utf8')
const reported = readFileSync(new URL('./reported5.js', import.meta.url), 'utf8')
const records = new Map([...content.matchAll(/V\(["']([a-z0-9-]+)["'], ["']([^"']+)["'], ["']([a-z-]+)["']/g)].map((m) => [m[1], { name: m[2], cls: m[3] }]))
const noted = new Set([...reported.matchAll(/^ {2}'vehicle:([a-z0-9-]+)'/gm)].map((m) => m[1]))
const MAKERS = ['Obey', 'Albany', 'Bravado', 'Dinka', 'Grotti', 'Pfister', 'Invetero', 'Übermacht', 'Annis', 'Karin', 'Ocelot', 'Enus', 'Maibatsu', 'Coil', 'Emperor', 'Pegassi', 'Declasse', 'Progen', 'Truffade', 'Vapid', 'Gallivanter', 'Benefactor', 'Buckingham', 'Dundreary', 'Canis', 'Lampadati', 'HVY', 'Brute', 'Zirconium']
const slug = (s) => s.toLowerCase().replace(/'95/, '1995').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const entries = []
let cls = ''
for (const block of txt.split(/\n(?=#{1,2} )/)) {
  const h = block.match(/^(#{1,2}) (.+)/)
  if (!h) continue
  if (h[1] === '#') { cls = h[2].replace(/^GTA 6 | Vehicles$/g, ''); continue }
  const name = h[2].trim()
  const based = block.match(/Based On: (.+)/)?.[1].trim()
  const source = block.match(/Confirmation Source: (.+)/)?.[1].trim()
  const maker = MAKERS.find((m) => name.startsWith(m + ' '))
  const model = maker ? name.slice(maker.length + 1) : name
  const cands = [slug(model), slug(name), slug(model).replace(/-classic$/, '-classic')]
  const hit = cands.find((c) => records.has(c))
  entries.push({ cls, name, maker, model, based, source, slug: hit || null, noted: hit ? noted.has(hit) : false })
}
writeFileSync(new URL('./entries.json', import.meta.url), JSON.stringify(entries, null, 1))
for (const e of entries) console.log(`${e.slug ? 'OK ' : '-- '}${e.cls.padEnd(14)} ${e.name.padEnd(36)} ${e.slug ? e.slug + ' [' + records.get(e.slug).cls + ']' + (e.noted ? ' *noted' : '') : ''}`)
console.log(entries.length, 'entries,', entries.filter((e) => !e.slug).length, 'unmatched')
