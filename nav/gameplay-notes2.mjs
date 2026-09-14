import { readFileSync, writeFileSync } from 'node:fs'

// Só o que o guia exaustivo (11 Set 2026) acrescenta ao primeiro guia de
// gameplay; o resto já está nas mesmas fichas.
const NOTES = {
  'six-star-wanted': [
    'The six stars reportedly supersede 2022 alpha material, which showed a five-star display.',
    'Police are described as issuing warnings and responding with a delay rather than always escalating at once.',
    'Development footage — unconfirmed for release — showed an NPC recognising a previously stolen police car, a weapon apparently flagged after it was used to kill an officer, and Port Gellhorn markings on police cars hinting at regional departments.',
  ],
  'criminal-profile': [
    'Reportedly opened from a character sub-menu, it tracks how professionally crimes are carried out and how much needless violence is used, and can shape NPC hostility, police severity and story reactions.',
  ],
  'vehicle-theft': [
    'Pay & Spray reportedly returns to repaint cars (breaking a chase), repair them, value them and register stolen ones.',
    'Known theft kit reportedly includes a slim jim, lock pick, immobilizer bypass and tracker jammer; development material also listed a USB drive, auto dialer and cut-off tool.',
    'Development footage showed “Clone Key” and “Smash Window” prompts, with key cloning looking quieter, and a tracker light flashing once a stolen car stopped.',
    'Destroyed personal vehicles can reportedly be returned through the Scooter Bros app for a fee; cars left too long go to a police impound, recoverable by paying or stealing them back.',
    'Cars can reportedly also be bought at dealerships and showrooms, with online buying expected.',
    'Trunk, hood and doors can reportedly be worked individually from a vehicle menu; one storage screen showed a 0/4 capacity.',
  ],
  'fuel-and-charging': [
    'Refuelling is reportedly started by holding RT (Xbox) or R2 (PlayStation).',
    'Fuel gauges are described for cars and motorcycles; how boats and aircraft are handled is undocumented.',
    'Running dry is described as able to strand the player, even in the middle of a chase.',
    'Development footage showed an engine-condition meter worsening, with smoke, after heavy damage; a repair at a fuel station; and several stations close together.',
  ],
  'focus-ability': [
    'Hit feedback reportedly uses a white crosshair for ordinary hits, yellow for incapacitation and red for a kill.',
    'Development footage showed a third purple meter with an eye icon beside health and stamina; the 2022 alpha showed Jason’s loot-spotting view turning the scene grey around valuables.',
  ],
  'robberies': [
    'Bystanders may panic, flee, report the crime or fight back — official gameplay shows Lucia fighting an NPC mid-robbery — and walking about with a drawn weapon can draw warnings.',
    'Zip ties, hostages, human shields and carrying or looting bodies are reported; a 2022 development diner robbery showed Greet, Threaten and Rob prompts.',
    'Early data listed “Easy Score” world events tied to a bingo hall, a cash-and-carry, a cafe, a body shop and a store at closing time.',
    'Whether passive-income businesses exist is unknown; older references to purchasable businesses remain unconfirmed.',
  ],
}

const file = process.argv[2]
let src = readFileSync(file, 'utf8')
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, '’')}'`
for (const [slug, items] of Object.entries(NOTES)) {
  const key = `  'mechanic:${slug}': [`
  const at = src.indexOf(key)
  if (at < 0) throw new Error(`missing ${slug}`)
  const lineEnd = src.indexOf('\n', at)
  const line = src.slice(at, lineEnd)
  if (line.endsWith('],')) {
    const inner = line.slice(key.length, -2)
    src = src.slice(0, at) + `${key}\n    ${inner},\n${items.map((i) => `    ${q(i)},`).join('\n')}\n  ],` + src.slice(lineEnd)
  } else {
    const close = src.indexOf('\n  ],', at)
    src = src.slice(0, close) + '\n' + items.map((i) => `    ${q(i)},`).join('\n') + src.slice(close)
  }
}
writeFileSync(file, src)
console.log(`merged ${Object.keys(NOTES).length}`)
