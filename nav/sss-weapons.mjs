import { readFileSync, writeFileSync } from 'node:fs'

const txt = readFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/sss-txt/06_GTA6_Weapons_Equipment_SSS.txt', 'utf8')
const content = readFileSync('/home/ubuntu/gta7/lib/content.js', 'utf8')
const reported = readFileSync('/home/ubuntu/gta7/lib/reported.js', 'utf8')
const records = [...content.matchAll(/^\s*W\(["']([a-z0-9-]+)["'], ["']([^"']+)["'](.*)$/gm)].map((m) => ({ slug: m[1], name: m[2], line: m[3] }))
const notesOf = (slug) => (reported.match(new RegExp(`^  'weapon:${slug}': \\[([\\s\\S]*?)\\],$`, 'm')) || [])[1] || ''
const norm = (s) => s.toLowerCase().replace(/[’'.]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
const byName = new Map(records.map((r) => [norm(r.name), r]))
const STOP = new Set(['style', 'variant', 'family', 'with', 'and', 'the'])
const toks = (x) => x.toLowerCase().replace(/[–—-]/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length >= 3 && !STOP.has(w))

const out = []
for (const block of txt.split(/\n(?=## )/)) {
  const h = block.match(/^## (.+)/)
  if (!h || !/Based On:/.test(block)) continue
  const f = Object.fromEntries([...block.matchAll(/(?:^|\|)\s*([A-Z][A-Za-z /]*?): ([^|\n]+)/gm)].map((m) => [m[1].trim(), m[2].trim()]))
  const extra = (block.split('\n')[2] || '').split(/\. /).slice(-2).join('. ')
  const name = h[1].trim()
  const MAP = { 'Heavy Pistol': null, 'Pistol': 'pistol', '556 Assault Rifle': '556', 'AKM Assault Rifle': 'assault-rifle', 'AR-15 Carbine': 'duke-special-ops-carbine', 'Carbine Rifle': null, 'Micro Draco Compact Rifle': null, 'Combat MG': 'heavy-machine-gun', 'Compact SMG': 'compact-submachine-gun', 'MAC-11': 'mac-11-inspired-submachine-gun', 'Micro SMG': 'micro-submachine-gun', 'MP5': 'heckler-koch-mp5-40-inspired-submachine-gun', 'SPP / MP9': 'br-gger-thomet-mp9-inspired-submachine-gun', 'Double Barrel Shotgun': 'stoeger-longfowler-inspired-shotgun', 'Moreland 850': '850', 'Bolt Action Rifle': 'remington-700-bdl-inspired-rifle', 'Hunter': 'hunter-sniper', 'Ruger 10/22': 'ruger-10-22-inspired-rifle', 'Springfield M1A': 'springfield-armory-m1a-inspired-rifle', 'RPG': 'rocket-launcher', 'Grenade': 'grenades', 'Smoke Grenade': 'smoke-grenades', 'Golf Club': 'golf-driver', 'Pipe Wrench': null, 'Unarmed': 'fist' }
  const r = name in MAP ? records.find((x) => x.slug === MAP[name]) : (byName.get(norm(name)) || records.find((x) => norm(x.name).includes(norm(name)) || norm(name).includes(norm(x.name))))
  const hay = r ? notesOf(r.slug) + r.line : ''
  const H = new Set(toks(hay))
  const bt = [...new Set(toks(f['Based On'] || ''))]
  const missing = []
  if (!r) missing.push('NO RECORD')
  else {
    if (bt.length && bt.filter((w) => H.has(w)).length / bt.length < 0.5) missing.push(`base ${f['Based On']}`)
    if (f['Capacity / Ammo'] && !hay.includes(f['Capacity / Ammo'].split(' ')[0])) missing.push(`capacity ${f['Capacity / Ammo']}`)
  }
  out.push({ name, slug: r?.slug || null, fields: f, extra, missing })
}
writeFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/sss-weapons.json', JSON.stringify(out, null, 1))
for (const o of out) if (o.missing.length) console.log(`${o.name} → ${o.slug || '-'}: ${o.missing.join(' · ')} || ${o.extra}`)
console.log(out.length, 'weapons')
