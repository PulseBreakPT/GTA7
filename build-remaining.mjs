import { readFileSync, writeFileSync } from 'node:fs'
const here = (f) => new URL(`./${f}`, import.meta.url)
const entries = JSON.parse(readFileSync(here('entries.json'), 'utf8'))
let reported = readFileSync(here('reported5.js'), 'utf8')
let content = readFileSync(here('content11.js'), 'utf8')

// Probable (unconfirmed) links for entries without an exact record.
const MAYBE = {
  'Dodge Grand Caravan Taxi': 'bravado-minivan-taxi',
  'Metromule': 'vcmm-train',
  'Vapid Stanier Taxi': 'vapid-taxi',
  'Dodge Durango (3rd Gen)': 'bravado-suv',
  'Ford Explorer (2nd Gen)': 'vapid-suv-first-generation',
  'Toyota RAV4 (5th Gen)': 'karin-suv',
  'Chrysler Town & Country (5th Gen)': 'bravado-minivan',
  'Ford Econoline (4th Gen)': 'vapid-cargo-van',
  'Ford F-Series Flatbed': 'vapid-flatbed-truck',
  'Ford Transit (4th Gen)': 'vapid-passenger-van',
  'Ford Transit Cargo (4th Gen)': 'vapid-cargo-van-second-generation',
  'Jeep Scrambler (CJ-8)': 'canis-pickup-truck',
  'Mercedes-Benz Sprinter (2nd Gen)': 'benefactor-van',
  'RAM 3500': 'bison-dually-pickup',
}
// Same vehicle, record named differently.
const SAME = {
  'Amloco (GE Genesis)': 'ge-genesis-inspired-locomotive',
  'Bus': 'new-flyer-xcelsior-inspired-bus',
  'Hitachi Metrorail': 'hitachi-rail-inspired-train',
  'Brute Rental Shuttle Bus': 'burrito-shuttle-bus',
  'Kellison J4': 'kellison-j4-coupe-experimental-inspired-car',
  'Audi Q7 (2nd Gen)': 'audi-q7-inspired-suv',
  'Gallivanter Baller II': 'baller-second-generation',
  "Bravado Bison 900 '95": 'bison-900',
  'Chevrolet Silverado 6500 HD': 'chevrolet-silverado-6500hd-inspired-truck',
  'Dodge Dakota Convertible': 'dodge-dakota-inspired-pickup',
  'Ford F-Series (3rd Gen)': 'ford-f-series-inspired-pickup',
  'Zirconium Journey': 'journey-ii',
}
// No record at all: create [slug, NAME, class, MAKER].
const CREATE = {
  'Obey Omnis e-GT': ['omnis-e-gt', 'OMNIS E-GT', 'sports', 'OBEY'],
  'Declasse Tornado': ['tornado', 'TORNADO', 'classics', 'DECLASSE'],
  'Grotti Furia': ['furia', 'FURIA', 'sports', 'GROTTI'],
  'Lamborghini Aventador': ['lamborghini-aventador-inspired-car', 'LAMBORGHINI AVENTADOR-INSPIRED CAR', 'sports', 'NOT OFFICIALLY SPECIFIED'],
  'Pegassi Tempesta': ['tempesta', 'TEMPESTA', 'sports', 'PEGASSI'],
  'Truffade Thrax': ['thrax', 'THRAX', 'sports', 'TRUFFADE'],
  'Pegassi Zorrusso': ['zorrusso', 'ZORRUSSO', 'sports', 'PEGASSI'],
  'Canis Seminole Frontier': ['seminole-frontier', 'SEMINOLE FRONTIER', 'suvs', 'CANIS'],
  'Karin Vivanite': ['vivanite', 'VIVANITE', 'suvs', 'KARIN'],
  'Ford F-Series Tow Truck': ['ford-f-series-inspired-tow-truck', 'FORD F-SERIES-INSPIRED TOW TRUCK', 'trucks', 'NOT OFFICIALLY SPECIFIED'],
  'International S-Series Semi Truck': ['international-s-series-inspired-semi-truck', 'INTERNATIONAL S-SERIES-INSPIRED SEMI TRUCK', 'trucks', 'NOT OFFICIALLY SPECIFIED'],
  'Bravado Rumpo': ['rumpo', 'RUMPO', 'vans', 'BRAVADO'],
}
const CLASS_OF = { Service: 'service', Sports: 'sports', 'Sports Classic': 'classics', SUVs: 'suvs', Vans: 'vans' }
const SRC = {
  'Trailer 1': 'seen in Trailer 1', 'Trailer 2': 'seen in Trailer 2', 'Extended Look': 'seen in An Extended Look',
  'Official Screenshots': 'seen in official screenshots', 'September 2022 Development Footage': 'known from September 2022 development footage',
  'August 2026 Development Material': 'known from August 2026 development material',
}
const TAG = {
  'Trailer 1': 'TRAILER 1', 'Trailer 2': 'TRAILER 2', 'Extended Look': 'AN EXTENDED LOOK', 'Official Screenshots': 'OFFICIAL SCREENSHOT',
  'September 2022 Development Footage': 'SEPTEMBER 2022 FOOTAGE', 'August 2026 Development Material': 'AUGUST 2026 MATERIAL',
}
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, '’')
const known = (b) => b && b !== 'Not yet specified'
const classNote = (e, cls) => {
  if (e.cls === 'Super') return ' The summary files it in a Super class, which the archive does not use.'
  if (e.cls === 'Utility') return ' The summary files it under Utility.'
  return CLASS_OF[e.cls] && CLASS_OF[e.cls] !== cls ? ` The summary files it under ${e.cls}.` : ''
}
const records = new Map([...content.matchAll(/V\(["']([a-z0-9-]+)["'], ["'][^"']+["'], ["']([a-z-]+)["']/g)].map((m) => [m[1], m[2]]))

const notes = []
const merges = []
const created = []
for (const e of entries) {
  const src = SRC[e.source] || `seen in ${e.source}`
  let slug = e.slug || SAME[e.name]
  let text
  if (slug) {
    text = `${known(e.based) ? `Reported as based on the ${e.based}; ${src}.` : `Reported in the ${e.cls} class; ${src}.`}${classNote(e, records.get(slug))}`
  } else if (MAYBE[e.name]) {
    slug = MAYBE[e.name]
    text = `May correspond to the ${e.name} the summary bases on the ${e.based} (${src.replace(/^(seen in|known from) /, '')}). Not confirmed.`
  } else if (CREATE[e.name]) {
    const [s, NAME, cls, MAKER] = CREATE[e.name]
    const body = `Reported as the ${e.name}, based on the ${e.based}; ${src}.${classNote(e, cls)}`
    created.push(`  V('${s}', '${NAME}', '${cls}', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, '${TAG[e.source]} · COMMUNITY IDENTIFICATION', [], ['${esc(body)}', 'Rockstar confirmation of the name and statistics.'], '${MAKER}'),`)
    continue
  } else throw new Error(`unresolved: ${e.name}`)
  if (!records.has(slug)) throw new Error(`no record: ${slug}`)
  const line = new RegExp(`^  'vehicle:${slug}': \\[(.*)\\],$`, 'm')
  if (line.test(reported) || merges.some((m) => m[0] === slug) || notes.some((n) => n.startsWith(`  'vehicle:${slug}'`))) merges.push([slug, text])
  else notes.push(`  'vehicle:${slug}': ['${esc(text)}'],`)
}
for (const [slug, text] of merges) {
  const i = notes.findIndex((n) => n.startsWith(`  'vehicle:${slug}'`))
  if (i >= 0) { notes[i] = notes[i].replace(/\],$/, `, '${esc(text)}'],`); continue }
  const line = new RegExp(`^(  'vehicle:${slug}': \\[.*)\\],$`, 'm')
  if (!line.test(reported)) throw new Error(`multi-line entry: ${slug}`)
  reported = reported.replace(line, `$1, '${esc(text)}'],`)
}
const anchor = "  'vehicle:tailgater-s'"
const at = reported.indexOf('\n', reported.indexOf(anchor)) + 1
reported = reported.slice(0, at) + '  // Service, Sports, Sports Classic, Super, SUVs, Utility, Vans (community summary, September 2026)\n' + notes.join('\n') + '\n' + reported.slice(at)
const cAnchor = content.indexOf("  V('volkswagen-jetta-inspired-sedan'")
const cAt = content.indexOf('\n', cAnchor) + 1
content = content.slice(0, cAt) + '  // No records existed; from a community summary of the remaining classes (September 2026).\n' + created.join('\n') + '\n' + content.slice(cAt)
writeFileSync(here('reported6.js'), reported)
writeFileSync(here('content12.js'), content)
console.log(`notes ${notes.length} · merged ${merges.length} · created ${created.length}`)
