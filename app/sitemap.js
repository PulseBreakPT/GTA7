import { ENTRIES, PORTALS, SPECIAL_LISTS } from '@/lib/wiki-graph'
import { articles, guides, encyclopediaCategories } from '@/lib/content'
import { CATEGORIES } from '@/lib/wiki-graph'

const SITE = 'https://lusorae.pt'

// O mapa do sítio é gerado das mesmas listas que desenham as páginas.
// Escrito à mão ficaria a apontar para entradas que já saíram e a
// esquecer as que entraram — que é a maneira mais silenciosa de um
// arquivo deixar de ser encontrável.
const PAGINAS_FIXAS = [
  ['', 1.0],
  ['/wiki', 0.9],
  ['/wiki/special', 0.5],
  ['/wiki/portals', 0.7],
  ['/wiki/discover', 0.65],
  ['/wiki/all', 0.6],
  ['/wiki/help', 0.4],
  ['/wiki/glossary', 0.4],
  ['/wiki/categories', 0.6],
  ['/wiki/statistics', 0.5],
  ['/wiki/changes', 0.6],
  ['/legal', 0.4],
  ['/legal/terms', 0.3],
  ['/legal/privacy', 0.3],
  ['/legal/cookies', 0.3],
  ['/legal/copyright', 0.3],
  ['/legal/community', 0.3],
  ['/legal/disclaimer', 0.3],
  ['/sources', 0.6],
  ['/media', 0.6],
  ['/map', 0.8],
  ['/news', 0.8],
  ['/guides', 0.7],
  ['/editions', 0.6],
  ['/gangs-factions', 0.6],
  ['/categories', 0.5],
  ['/database/vehicles', 0.8],
  ['/database/weapons', 0.8],
  ['/database/characters', 0.8],
  ['/database/radio', 0.7],
  ['/database/mechanics', 0.7],
  ['/database/world', 0.8],
]

export default function sitemap() {
  const hoje = new Date()

  const fixas = PAGINAS_FIXAS.map(([path, priority]) => ({
    url: `${SITE}${path}`,
    lastModified: hoje,
    changeFrequency: 'weekly',
    priority,
  }))

  // Cada verbete leva a data em que foi verificado, não a de hoje: é a
  // informação verdadeira e é a que um rastreador deve usar.
  const verbetes = ENTRIES.map((e) => ({
    url: `${SITE}${e.href}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : hoje,
    changeFrequency: 'monthly',
    priority: e.stub ? 0.4 : 0.7,
  }))

  const categorias = CATEGORIES.map((c) => ({
    url: `${SITE}/wiki/category/${c.slug}`,
    lastModified: hoje,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const manutencao = SPECIAL_LISTS.map((list) => ({
    url: `${SITE}/wiki/special/${list.id}`,
    lastModified: hoje,
    changeFrequency: 'weekly',
    priority: 0.35,
  }))

  const portais = PORTALS.map((portal) => ({
    url: `${SITE}/wiki/portal/${portal.kind}`,
    lastModified: hoje,
    changeFrequency: 'weekly',
    priority: 0.65,
  }))

  const editoriais = [
    ...articles.map((a) => ({ url: `${SITE}/news/${a.slug}`, lastModified: new Date(a.updatedAt || a.publishedAt), changeFrequency: 'monthly', priority: 0.7 })),
    ...guides.map((g) => ({ url: `${SITE}/guides/${g.slug}`, lastModified: new Date(g.updatedAt || g.publishedAt), changeFrequency: 'monthly', priority: 0.6 })),
    ...encyclopediaCategories.map((c) => ({ url: `${SITE}/categories/${c.slug}`, lastModified: hoje, changeFrequency: 'monthly', priority: 0.5 })),
  ]

  // Uma entrada pode chegar por dois caminhos (um artigo está em ENTRIES
  // e em articles); o endereço tem de aparecer uma vez só.
  const vistos = new Set()
  return [...fixas, ...verbetes, ...categorias, ...manutencao, ...portais, ...editoriais].filter((item) => {
    if (vistos.has(item.url)) return false
    vistos.add(item.url)
    return true
  })
}
