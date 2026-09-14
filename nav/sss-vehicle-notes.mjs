import { readFileSync, writeFileSync } from 'node:fs'

// Converte as diferenças encontradas por sss-vehicles.mjs em notas.
const entries = JSON.parse(readFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/sss-vehicles.json', 'utf8'))
const SKIP_BASE = new Set(['freight-train', 'vcmm-train', 'sanchez'])
const WORD = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const DRIVE = { RWD: 'rear-wheel drive', FWD: 'front-wheel drive', AWD: 'all-wheel drive' }
const notes = {}
for (const e of entries) {
  if (!e.slug || !e.missing?.length) continue
  const m = new Set(e.missing.map((x) => x.split(' ')[0]))
  const parts = []
  if (m.has('seats')) parts.push(`${WORD[+e.Seats] || e.Seats} seat${e.Seats === '1' ? '' : 's'}`)
  if (m.has('weight')) parts.push(`about ${e.Weight}`)
  if ((m.has('weight') || m.has('gears')) && e.Drive && DRIVE[e.Drive]) parts.push(DRIVE[e.Drive])
  if (m.has('gears')) parts.push(`${WORD[+e.Gears] || e.Gears} gears`)
  const base = m.has('base') && !SKIP_BASE.has(e.slug) ? e['Based On'].replace(/^(First|Second|Third|Fourth|Fifth|Sixth)-generation/, (g) => g.toLowerCase()) : null
  if (!parts.length && !base) continue
  const text = [
    base ? `Also reported as based on the ${base}` : 'Also reported',
    parts.length ? `${base ? ', with ' : ' with '}${parts.join(', ')}` : '',
  ].join('') + '.'
  notes[`vehicle:${e.slug}`] = [text.replace('Also reported with', 'Also reported:').replace(/: (\w)/, (_, c) => `: ${c}`)]
}
writeFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/sss-vehicle-notes.json', JSON.stringify(notes, null, 1))
console.log(Object.keys(notes).length, 'notes')
for (const [k, v] of Object.entries(notes).slice(0, 8)) console.log(k, '→', v[0])
