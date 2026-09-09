import { articles, guides } from './content'
import { ENTRIES, KIND_META, resolveEntry, slugify } from './wiki-graph'
import { LEGAL_DOCUMENTS } from './legal'

export const SEARCH_TYPES = [
  ...Object.entries(KIND_META).map(([id, meta]) => ({ id, label: meta.plural })),
  { id: 'articles', label: 'Articles' },
  { id: 'guides', label: 'Guides' },
  { id: 'legal', label: 'Legal' },
]

export const SEARCH_INDEX = [
  ...ENTRIES.map((entry) => ({
    ...entry,
    title: entry.name,
    type: entry.kind,
    typeLabel: KIND_META[entry.kind].label,
    excerpt: entry.searchText,
    searchable: [entry.name, entry.slug, entry.searchText, entry.categories.join(' '), entry.sourceName].filter(Boolean).join(' '),
  })),
  ...articles.map((article) => ({
    type: 'articles', typeLabel: 'Article', title: article.title, name: article.title,
    href: `/news/${article.slug}`, slug: article.slug, status: article.status || article.category,
    excerpt: article.excerpt || '', searchable: [article.title, article.slug, article.excerpt, article.body].filter(Boolean).join(' '),
  })),
  ...guides.map((guide) => ({
    type: 'guides', typeLabel: 'Guide', title: guide.title, name: guide.title,
    href: `/guides/${guide.slug}`, slug: guide.slug, status: guide.status,
    excerpt: guide.summary || '', searchable: [guide.title, guide.slug, guide.summary, guide.body].filter(Boolean).join(' '),
  })),
  ...LEGAL_DOCUMENTS.map((document) => {
    const policyText = document.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      ...(section.items || []).flatMap((item) => [item.name, item.purpose, item.duration, item.category]),
      section.note || '',
    ]).join(' ')
    return {
      type: 'legal', typeLabel: 'Legal policy', title: document.title, name: document.title,
      href: `/legal/${document.slug}`, slug: document.slug, status: 'verified',
      excerpt: document.description, searchable: [document.title, document.shortTitle, document.description, policyText].join(' '),
    }
  }),
]

const normalise = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export function searchArchive(query, type = 'all') {
  const raw = query.trim()
  if (!raw) return []
  const needle = normalise(raw)
  const canonical = slugify(raw)
  const terms = needle.split(/\s+/).filter(Boolean)

  return SEARCH_INDEX
    .filter((entry) => type === 'all' || entry.type === type)
    .map((entry) => {
      const title = normalise(entry.name)
      const haystack = normalise(entry.searchable)
      if (!terms.every((term) => haystack.includes(term))) return null

      let score = terms.reduce((sum, term) => sum + (title.includes(term) ? 12 : 1), 0)
      if (title === needle || slugify(entry.slug) === canonical) score += 200
      else if (title.startsWith(needle)) score += 80
      else if (title.includes(needle)) score += 35
      return { ...entry, score }
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
}

export function exactSearchMatch(query) {
  const wikiEntry = resolveEntry(query)
  if (wikiEntry) return SEARCH_INDEX.find((entry) => entry.href === wikiEntry.href) || null
  const key = slugify(query)
  return SEARCH_INDEX.find((entry) => slugify(entry.name) === key || slugify(entry.slug) === key) || null
}
