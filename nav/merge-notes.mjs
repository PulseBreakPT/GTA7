import { readFileSync, writeFileSync } from 'node:fs'

// Junta notas a lib/reported.js: acrescenta ao fim da chave se já existir
// (numa linha ou em várias), ou cria a chave no fim do mapa REPORTED.
// Uso: node merge-notes.mjs <reported.js> <notes.json>
const [file, notesFile] = process.argv.slice(2)
let src = readFileSync(file, 'utf8')
const notes = JSON.parse(readFileSync(notesFile, 'utf8'))
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, '’')}'`
const fresh = []
let merged = 0
for (const [key, items] of Object.entries(notes)) {
  const head = `  '${key}': [`
  const at = src.indexOf(head)
  if (at < 0) { fresh.push(`  '${key}': [\n${items.map((i) => `    ${q(i)},`).join('\n')}\n  ],`); continue }
  merged++
  const lineEnd = src.indexOf('\n', at)
  const line = src.slice(at, lineEnd)
  if (line.endsWith('],')) {
    const inner = line.slice(head.length, -2)
    src = src.slice(0, at) + `${head}\n    ${inner},\n${items.map((i) => `    ${q(i)},`).join('\n')}\n  ],` + src.slice(lineEnd)
  } else {
    const close = src.indexOf('\n  ],', at)
    src = src.slice(0, close) + '\n' + items.map((i) => `    ${q(i)},`).join('\n') + src.slice(close)
  }
}
if (fresh.length) {
  // Fim do objecto REPORTED: a primeira linha «}» depois de «const REPORTED = {».
  const start = src.indexOf('const REPORTED = {')
  const end = src.indexOf('\n}\n', start)
  src = src.slice(0, end) + '\n' + fresh.join('\n') + src.slice(end)
}
writeFileSync(file, src)
console.log(`merged ${merged} · new ${fresh.length}`)
