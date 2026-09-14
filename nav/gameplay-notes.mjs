import { readFileSync, writeFileSync } from 'node:fs'

// Notas do guia «GTA 6 Gameplay Systems» (11 Set 2026), resumidas por
// palavras nossas e juntadas às fichas de mechanics que já existem.
const NOTES = {
  'six-star-wanted': [
    'Police are said to build a suspect profile alongside the stars — physical description, outfit, vehicle, CCTV footage, companion and crime location — shown as red icons beneath the stars.',
    'A hollow star reportedly means a crime was reported without useful identification of whoever committed it.',
    'A crime is reportedly only passed on when a civilian, an officer or an alarm registers it; an unseen offence may leave police with little to work with.',
    'Crime scenes can reportedly stay “hot” on the map after a chase, with patrols lingering there.',
    'Reported ways to shake a search: break line of sight, change clothes or hairstyle, swap vehicles, split Jason and Lucia up, and leave the hot area.',
    'In one demonstration, threatening hostile NPCs without firing reportedly kept the police response limited.',
    'Still unknown: what triggers each star, which units respond at each level, how long suspect details stay valid, whether plates are tracked on their own, and what surrendering costs.',
  ],
  'disguises': [
    'Outfit and physical description are reportedly tracked separately: new clothes void the outfit, a new hairstyle the physical description, and swapping one small accessory may not be enough.',
    'Spare outfits can reportedly be kept in a personal vehicle’s trunk, for changing away from a safehouse or store.',
    'Masks are said to weaken witness descriptions without making the wearer anonymous — clothes, vehicle, CCTV and a companion can still give them away.',
  ],
  'focus-ability': [
    'Reported as a finite purple meter that slows time; red body areas mark lethal shots, yellow areas non-lethal or incapacitating ones.',
    'Said to pick out a vehicle’s engine, fuel tank and tyres, reveal nearby police through walls, and point to valuable loot, points of interest and escape routes during robberies.',
    'Compared with Red Dead Redemption 2’s Dead Eye but broader in scope. How it recharges, whether consumables refill it and whether Jason’s and Lucia’s versions differ are unknown.',
  ],
  'vehicle-theft': [
    'Parked cars are reported to have security tiers (how many is unknown); occupied cars can still be carjacked, and passengers sometimes resist in a quick-time struggle.',
    'A WAINK scanner reportedly shows a target’s security, value, tracker and registration cost before the theft.',
    'Simple cars can reportedly be opened with a slim jim or a broken window; some modern cars need a purchased digital key-cloning tool, with better tools unlocked through the story and fences.',
    'Some cars reportedly carry trackers that can expose them to police, for example when driven below a certain speed.',
    'To keep a stolen car it reportedly needs its tracker removed and a registration fee paid; unregistered cars can despawn unless stored in a garage, and extra garages can be bought.',
    'Stolen cars may start with a partly empty tank or battery, and damage is said to lower resale value.',
  ],
  'vehicle-fencing': [
    'Fences reportedly buy stolen cars (damage lowers the price) and later unlock tracker removal; their locations and prices are unknown.',
    'Jewellery, drugs and other stolen goods reportedly need a fence before they turn into spendable cash.',
  ],
  'fuel-and-charging': [
    'Road vehicles reportedly burn fuel as they are driven; the gauge stays hidden until it runs low.',
    'Gas stations reportedly refuel and repair vehicles through a short interaction — about ten seconds in a preview — at modest cost; electric vehicles use charging stations.',
    'Unknown: consumption rates, what happens at empty, fuel cans or roadside help, charging times, and whether GTA Online will use fuel.',
  ],
  'cash-and-banking': [
    'Money is reportedly split three ways — bank funds, cash carried and the estimated value of bagged loot — each shown separately.',
    'Carried cash and unfenced loot are said to stay at risk until secured; the penalties for arrest or death are unknown.',
    'At certain points the story is said to need enough money before it moves on.',
  ],
  'robberies': [
    'Most small businesses, such as convenience and phone-repair shops, can reportedly be held up, often without a map marker — around $1,000 in preview information.',
    'Bigger targets — jewellery stores, banks, compounds and vans — reportedly show an estimated value, and NPC tips or overheard conversations can reveal scores.',
    'Safes may need combinations found nearby or learned from NPCs; cameras, back doors and bystanders who flee, report or intervene shape each job.',
    'Loot is reportedly carried in duffle bags; several can be carried, with extra bags stored in a vehicle’s trunk.',
  ],
  'looting': ['Shipping containers can reportedly hold cash, weapons, supplies and even bikes.'],
  'combat-options': ['NPCs can reportedly be intimidated, disarmed or scattered with suppressing fire, and incapacitated enemies do not have to be finished off.'],
}

const file = process.argv[2]
let src = readFileSync(file, 'utf8')
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, '’')}'`
const fresh = []
for (const [slug, items] of Object.entries(NOTES)) {
  const key = `  'mechanic:${slug}': [`
  const at = src.indexOf(key)
  if (at < 0) { fresh.push(`  'mechanic:${slug}': [\n${items.map((i) => `    ${q(i)},`).join('\n')}\n  ],`); continue }
  const lineEnd = src.indexOf('\n', at)
  const line = src.slice(at, lineEnd)
  if (line.endsWith('],')) {
    // entrada numa linha: passa a multilinha com os itens novos no fim
    const inner = line.slice(key.length, -2)
    const block = `${key}\n    ${inner},\n${items.map((i) => `    ${q(i)},`).join('\n')}\n  ],`
    src = src.slice(0, at) + block + src.slice(lineEnd)
  } else {
    const close = src.indexOf('\n  ],', at)
    src = src.slice(0, close) + '\n' + items.map((i) => `    ${q(i)},`).join('\n') + src.slice(close)
  }
}
if (fresh.length) {
  const anchor = src.indexOf("  'mechanic:robberies': [")
  src = src.slice(0, anchor) + fresh.join('\n') + '\n' + src.slice(anchor)
}
writeFileSync(file, src)
console.log(`merged ${Object.keys(NOTES).length - fresh.length} · new ${fresh.length}`)
