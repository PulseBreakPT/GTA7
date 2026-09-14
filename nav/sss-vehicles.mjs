import { readFileSync, writeFileSync } from 'node:fs'

const T = '/home/ubuntu/.claude/jobs/aa302669/tmp/sss-txt'
const files = ['02_GTA6_Vehicles_Vol1_Boats_to_Emergency_SSS', '03_GTA6_Vehicles_Vol2_Helicopters_to_OffRoad_SSS', '04_GTA6_Vehicles_Vol3_Planes_to_Sports_SSS', '05_GTA6_Vehicles_Vol4_SportsClassic_to_Vans_SSS']
const content = readFileSync('/home/ubuntu/gta7/lib/content.js', 'utf8')
const reported = readFileSync('/home/ubuntu/gta7/lib/reported.js', 'utf8')

// Registos V(): slug, nome, classe e o texto inteiro da linha.
const records = [...content.matchAll(/^\s*V\(["']([a-z0-9-]+)["'], ["']([^"']+)["'], ["']([a-z-]+)["'](.*)$/gm)].map((m) => ({ slug: m[1], name: m[2], cls: m[3], line: m[4] }))
const notesOf = (slug) => {
  const m = reported.match(new RegExp(`^  'vehicle:${slug}': \\[([\\s\\S]*?)\\],$`, 'm'))
  return m ? m[1] : ''
}
const MAKERS = ['Obey', 'Albany', 'Bravado', 'Dinka', 'Grotti', 'Pfister', 'Invetero', 'Übermacht', 'Annis', 'Karin', 'Ocelot', 'Enus', 'Maibatsu', 'Coil', 'Emperor', 'Pegassi', 'Declasse', 'Progen', 'Truffade', 'Vapid', 'Gallivanter', 'Benefactor', 'Buckingham', 'Dundreary', 'Canis', 'Lampadati', 'HVY', 'Brute', 'Zirconium', 'Nagasaki', 'Shitzu', 'Speedophile', 'Western', 'Western Company', 'Mammoth', 'JoBuilt', 'Imponte', 'Schyster', 'Vulcar', 'Weeny', 'Chariot', 'Cheval', 'MTL', 'Jobuilt', 'Principe', 'LCC', 'Buckingham', 'Dewbauchee', 'Ubermacht', 'Willard', 'Bürgerfahrzeug', 'BF', 'Grotti', 'Kellison']
const norm = (s) => s.toLowerCase().replace(/’|'/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
const byName = new Map(records.map((r) => [norm(r.name), r]))

const entries = []
for (const f of files) {
  const txt = readFileSync(`${T}/${f}.txt`, 'utf8')
  for (const block of txt.split(/\n(?=## )/)) {
    const h = block.match(/^## (.+)/)
    if (!h) continue
    const fields = Object.fromEntries([...block.matchAll(/(?:^|\|)\s*([A-Z][A-Za-z /-]*?): ([^|\n]+)/gm)].map((m) => [m[1].trim(), m[2].trim()]))
    if (!fields.Class) continue
    entries.push({ name: h[1].trim(), ...fields })
  }
}

const STOP = new Set(['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','generation','gen','influences','influence','with','style','inspired','modern','custom','additional','and','the','family','series','era','early','late','proposed','other','various'])
const strip = (n) => { const mk = MAKERS.find((m) => n.startsWith(m + ' ')); return mk ? n.slice(mk.length + 1) : n }
for (const e of entries) {
  const cands = [norm(e.name), norm(strip(e.name)), norm(strip(e.name).replace(/\s*\(.*\)$/, '')), norm(strip(e.name).replace(/ '(\d\d)$/, ' 19$1'))]
  let r = cands.map((c) => byName.get(c)).find(Boolean)
  if (!r) {
    // Pela nota: uma nota que já cita o nome completo.
    const hit = records.find((x) => notesOf(x.slug).includes(e.name) || x.line.includes(`Reported as the ${e.name}`))
    if (hit) r = hit
  }
  e.slug = r?.slug || null
  if (!r) continue
  const hay = notesOf(r.slug) + r.line
  const num = (v) => (v || '').replace(/[^\d]/g, '')
  e.missing = []
  if (e.Weight && !hay.replace(/[^\d]/g, ' ').split(/\s+/).includes(num(e.Weight)) && !hay.includes(e.Weight)) e.missing.push(`weight ${e.Weight}`)
  if (e.Seats && !new RegExp(`\\b(${e.Seats}|${['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][+e.Seats] || e.Seats})[ -]seat`, 'i').test(hay) && !hay.includes(`${e.Seats} seats`)) e.missing.push(`seats ${e.Seats}`)
  if (e.Gears && !new RegExp(`\\b(${e.Gears}|${['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'][+e.Gears]})[ -](gear|speed)`, 'i').test(hay)) e.missing.push(`gears ${e.Gears}`)
  const toks = (x) => x.toLowerCase().replace(/[–—-]/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w))
  const H = new Set(toks(hay))
  const bt = [...new Set(toks(e['Based On'] || ''))]
  if (bt.length && bt.filter((w) => H.has(w)).length / bt.length < 0.5) e.missing.push(`base ${e['Based On']}`)
}
writeFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/sss-vehicles.json', JSON.stringify(entries, null, 1))
const un = entries.filter((e) => !e.slug)
for (const e of un) if (e.Weight || e.Seats || e.Gears) console.log('UNMATCHED WITH DATA', e.name, e.Class, e.Seats || '', e.Weight || '', e.Drive || '', e.Gears || '', '|', e['Based On'])
const gaps = entries.filter((e) => e.slug && e.missing.length)
console.log(entries.length, 'entries ·', un.length, 'unmatched ·', gaps.length, 'with gaps')
console.log('UNMATCHED:', un.map((e) => `${e.name} [${e.Class}]`).join('; '))
for (const e of gaps) console.log(`${e.slug}: ${e.missing.join(' · ')}`)
