// Notícias relacionadas, por pontuação. Antes eram as três primeiras da
// lista que partilhassem qualquer categoria — sem ordem de relevância, e as
// notícias sem categoria (as mais recentes) não sugeriam nada. Agora pesam:
// categorias partilhadas, nomes do arquivo citados nas duas, temas em comum,
// palavras do título, o mesmo tipo de notícia e a proximidade da data. Uma
// série (os quatro relatos de criadores, por exemplo) não enche o bloco
// sozinha, e se faltar sugestão completa-se com as mais recentes.
const RELATED_TOPICS = {
  release: /release date|delay|november 19|launch|pre-?load|physical cop/i,
  editions: /edition|pre-?order|vintage vice city|ultimate|price|gta\+/i,
  previews: /creator|preview|rockstar north|demonstration|davy jones|tgg|rubius|mikeshowsha/i,
  marketing: /marketing|campaign|miami|sign|billboard|advert|beach chairs|kaseya/i,
  trailers: /trailer|extended look|footage|screenshot|media|gallery|artwork/i,
  online: /\bonline\b|multiplayer|32-player|players/i,
  police: /police|wanted level|six-star|\bstars\b|cctv|witness|manhunt/i,
  vehicles: /vehicle|\bcars?\b|fuel|garage|theft|tracker/i,
  map: /map|leonida|vice city|county|region|neighbourhood|district/i,
  story: /jason|lucia|story|premise|protagonist|character/i,
  hardware: /playstation|dualsense|controller|ps5|xbox|30 fps|frames/i,
}
const TITLE_STOP = new Set(['the', 'and', 'for', 'with', 'what', 'gta', 'vi', 'from', 'into', 'its', 'a', 'of', 'to', 'in', 'on', 'is', 'are', 'how', 'why', 'record', 'archive'])
const SERIES = [/rockstar-north-preview-record$/, /^creator-preview/, /ledger$/]

let relatedIndex = null
function buildRelatedIndex() {
  const names = new Set()
  const add = (value) => { const n = String(value || '').toLowerCase().replace(/[’']/g, '').trim(); if (n.length >= 5) names.add(n) }
  characters.forEach((c) => add(c.name))
  regions.forEach((r) => add(r.label))
  locations.forEach((l) => add(l.name))
  factions.forEach((f) => add(f.name))
  mechanics.forEach((m) => add(m.name))
  radioStations.forEach((s) => add(s.name))
  const vocabulary = [...names]
  const index = new Map(articles.map((article) => {
    const text = `${article.title} ${article.excerpt || ''} ${(article.body || []).join(' ')}`
    const lower = text.toLowerCase().replace(/[’']/g, '')
    return [article.slug, {
      article,
      categories: new Set(categoriesForArticle(article.slug).map((category) => category.slug)),
      entities: new Set(vocabulary.filter((name) => lower.includes(name))),
      topics: new Set(Object.entries(RELATED_TOPICS).filter(([, rule]) => rule.test(text)).map(([topic]) => topic)),
      title: new Set(article.title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !TITLE_STOP.has(w))),
      series: SERIES.findIndex((rule) => rule.test(article.slug)),
      time: Date.parse(article.publishedAt || '') || 0,
    }]
  }))
  // Raridade de cada nome e tema: «Vice City» aparece em quase todas as
  // notícias e não pode, sozinho, ligar duas notícias sem mais nada em comum.
  const df = new Map()
  for (const row of index.values()) for (const term of [...row.entities, ...[...row.topics].map((t) => `#${t}`)]) df.set(term, (df.get(term) || 0) + 1)
  const n = index.size
  relatedWeight = (term) => Math.log(1 + n / (df.get(term) || n))
  return index
}
let relatedWeight = () => 1

const overlap = (a, b) => [...a].filter((x) => b.has(x)).length
// Semelhança de cosseno entre conjuntos: um texto longo cita mais nomes e
// temas, e sem normalizar apareceria sugerido em quase todas as notícias.
const cosine = (a, b, prefix = '') => {
  if (!a.size || !b.size) return 0
  const w = (term) => relatedWeight(prefix + term) ** 2
  const sum = (set) => [...set].reduce((total, term) => total + w(term), 0)
  const shared = [...a].filter((term) => b.has(term)).reduce((total, term) => total + w(term), 0)
  return shared / Math.sqrt(sum(a) * sum(b))
}

export const relatedArticlesFor = (slug, limit = 3) => {
  relatedIndex ||= buildRelatedIndex()
  const self = relatedIndex.get(slug)
  if (!self) return []
  const scored = [...relatedIndex.values()]
    .filter((other) => other.article.slug !== slug)
    .map((other) => {
      const days = Math.abs(self.time - other.time) / 86400000
      // O conteúdo partilhado decide; a data e o tipo só desempatam.
      const content = overlap(self.categories, other.categories) * 3
        + cosine(self.entities, other.entities) * 8
        + cosine(self.topics, other.topics, '#') * 5
        + overlap(self.title, other.title) * 2
      const score = content
        + (self.article.category === other.article.category ? 0.5 : 0)
        + (days <= 7 ? 1 : days <= 30 ? 0.3 : 0)
      return { article: other.article, series: other.series, score, content }
    })
    .sort((a, b) => b.score - a.score || (b.article.publishedAt || '').localeCompare(a.article.publishedAt || ''))
  const picked = []
  const seriesUsed = new Map()
  for (const row of scored.filter((r) => r.content >= 2.5)) {
    if (picked.length >= limit) break
    // No máximo duas da mesma série, e nenhuma da série da própria notícia
    // se houver alternativa — a série já tem o seu índice.
    const used = seriesUsed.get(row.series) || 0
    if (row.series >= 0 && (used >= 2 || (row.series === self.series && used >= 1))) continue
    picked.push(row.article)
    if (row.series >= 0) seriesUsed.set(row.series, used + 1)
  }
  // Se faltar, entram as que partilham mais conteúdo, mesmo abaixo do
  // limiar; as mais recentes só quando não há ligação nenhuma.
  for (const row of scored) {
    if (picked.length >= limit) break
    if (row.content > 0 && !picked.includes(row.article)) picked.push(row.article)
  }
  if (picked.length < limit) {
    const recent = [...articles].filter((a) => a.slug !== slug && !picked.includes(a)).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    picked.push(...recent.slice(0, limit - picked.length))
  }
  return picked
}
