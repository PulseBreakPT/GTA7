
// Fichas do World relacionadas, por pontuação: menção directa entre as duas
// fichas, o mesmo tipo, o mesmo ramo e a mesma região — «Leonida» é o valor
// por omissão e quase não conta. Antes eram as seis primeiras do mesmo ramo
// ou da mesma região, pela ordem do ficheiro.
export function relatedWorldEntries(item, limit = 6) {
  const lower = (value) => String(value || '').toLowerCase()
  const textOf = (entry) => lower(`${entry.summary} ${(entry.details || []).join(' ')}`)
  const mine = textOf(item)
  const myName = lower(item.name)
  return worldEntries
    .filter((entry) => entry.slug !== item.slug)
    .map((entry) => {
      const name = lower(entry.name)
      let score = 0
      if ((name.length >= 4 && mine.includes(name)) || (myName.length >= 4 && textOf(entry).includes(myName))) score += 5
      if (entry.type && entry.type === item.type) score += 3
      if (entry.branch === item.branch) score += 2
      const shared = score > 0
      if (entry.region === item.region) score += item.region === 'Leonida' ? 0.5 : 2
      return { entry, score, shared }
    })
    .filter((row) => row.shared)
    .sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name))
    .slice(0, limit)
    .map((row) => row.entry)
}
