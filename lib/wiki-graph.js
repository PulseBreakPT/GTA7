// O grafo do arquivo: pega nas listas de conteúdo e deriva delas o que
// faz uma wiki funcionar como wiki — o índice de todos os verbetes, as
// categorias a que cada um pertence, o que liga para cada um, e as
// páginas especiais que se constroem a partir disso.
//
// Nada aqui é escrito à mão. Se uma entrada sai da lista, sai daqui; se
// entra, aparece. Um índice mantido em paralelo desactualiza-se e passa
// a mentir sobre o tamanho do arquivo.

import {
  characters, vehicles, weapons, locations, regions, mechanics,
  radioStations, factions, easterEggs, relationships,
  vehicleClasses, weaponTypes, characterFilters, mapFilters,
} from './content'

export const KIND_META = {
  characters: { label: 'Character', plural: 'Characters', base: '/database/characters' },
  vehicles: { label: 'Vehicle', plural: 'Vehicles', base: '/database/vehicles' },
  weapons: { label: 'Weapon', plural: 'Weapons', base: '/database/weapons' },
  locations: { label: 'Location', plural: 'Locations', base: '/map/location' },
  regions: { label: 'Region', plural: 'Regions', base: '/map' },
  factions: { label: 'Faction', plural: 'Factions', base: '/gangs-factions' },
  radio: { label: 'Radio station', plural: 'Radio', base: '/database/radio' },
  mechanics: { label: 'Mechanic', plural: 'Mechanics', base: '/database/mechanics' },
  secrets: { label: 'Secret', plural: 'Secrets', base: '/easter-eggs' },
}

export const slugify = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const labelOf = (list, id, fallback) => (list.find((x) => x.id === id) || {}).label || fallback
const NOT_NAMED = 'NOT OFFICIALLY SPECIFIED'

// Um verbete é curto quando não tem corpo nenhum para além da linha de
// apresentação. Nas wikis chama-se-lhe esboço, e marca-se — é mais
// honesto do que deixar a página parecer completa.
const isStub = (text) => !text || String(text).trim().length < 220

function entry(kind, slug, name, { status, categories = [], body = '', updatedAt, sourceName, sourceUrl, links = [] }) {
  const base = KIND_META[kind].base
  return {
    kind, slug, name,
    href: `${base}/${slug}`,
    status: status || 'analysis',
    categories: [KIND_META[kind].plural, ...categories].filter(Boolean),
    stub: isStub(body),
    bodyLength: (body || '').length,
    updatedAt: updatedAt || null,
    sourceName: sourceName || null,
    sourceUrl: sourceUrl || null,
    // Ligações declaradas por campo, não adivinhadas por texto: cada uma
    // corresponde a um dado que a entrada realmente traz.
    links,
  }
}

const editionCategory = (v) => {
  const hay = `${v.association || ''} ${v.content || ''}`.toLowerCase()
  if (hay.includes('ultimate')) return 'Ultimate Edition'
  if (hay.includes('vintage')) return 'Vintage Vice City Pack'
  return null
}

export const ENTRIES = [
  ...characters.map((c) => entry('characters', c.slug, c.name, {
    status: c.status,
    categories: [labelOf(characterFilters, c.group, c.group), c.role].filter(Boolean),
    body: c.long || c.bio,
    updatedAt: c.updatedAt, sourceName: c.sourceName, sourceUrl: c.sourceUrl,
  })),

  ...vehicles.map((v) => entry('vehicles', v.slug, v.name, {
    status: v.status,
    categories: [
      labelOf(vehicleClasses, v.cls, v.cls),
      v.manufacturer && v.manufacturer !== NOT_NAMED ? v.manufacturer : null,
      editionCategory(v),
    ].filter(Boolean),
    body: [v.association, v.content, ...(v.confirmedDetails || [])].filter(Boolean).join(' '),
    updatedAt: v.updatedAt, sourceName: v.sourceName, sourceUrl: v.sourceUrl,
    links: [v.character, v.association].filter(Boolean),
  })),

  ...weapons.map((w) => entry('weapons', w.slug, w.name, {
    status: w.status,
    categories: [
      labelOf(weaponTypes, w.type, w.type),
      w.manufacturer && w.manufacturer !== NOT_NAMED ? w.manufacturer : null,
    ].filter(Boolean),
    body: [w.desc, ...(w.confirmedDetails || [])].filter(Boolean).join(' '),
    updatedAt: w.updatedAt, sourceName: w.sourceName, sourceUrl: w.sourceUrl,
    links: [w.character, w.association].filter(Boolean),
  })),

  ...locations.map((l) => entry('locations', l.slug, l.name, {
    status: l.status,
    categories: [
      (regions.find((r) => r.id === l.region) || {}).label,
      labelOf(mapFilters, l.category, l.category),
    ].filter(Boolean),
    body: l.desc,
    updatedAt: l.updatedAt, sourceName: l.sourceName, sourceUrl: l.sourceUrl,
    links: [(regions.find((r) => r.id === l.region) || {}).label].filter(Boolean),
  })),

  ...regions.map((r) => entry('regions', r.id, r.label, {
    status: r.sourced ? 'confirmed' : 'analysis',
    categories: [r.officialType].filter(Boolean),
    body: r.blurb,
    updatedAt: null, sourceName: 'Rockstar Games · GTA VI Official Site', sourceUrl: 'https://www.rockstargames.com/VI',
  })),

  ...factions.map((f) => entry('factions', f.slug, f.name, {
    status: f.status,
    categories: [f.kind, f.region].filter(Boolean),
    body: f.desc,
    sourceName: f.sourceName, sourceUrl: f.sourceUrl,
    links: [f.region].filter(Boolean),
  })),

  ...radioStations.map((s) => entry('radio', s.slug, s.name, {
    status: s.status,
    categories: [s.genre && s.genre !== 'Not specified' ? s.genre : null].filter(Boolean),
    body: s.desc,
    updatedAt: s.updatedAt, sourceName: s.sourceName, sourceUrl: s.sourceUrl,
  })),

  ...mechanics.map((m) => entry('mechanics', m.slug, m.name, {
    status: m.status,
    body: m.long || m.desc,
    updatedAt: m.updatedAt, sourceName: m.sourceName, sourceUrl: m.sourceUrl,
  })),

  ...easterEggs.map((e) => entry('secrets', e.slug, e.name, {
    status: e.status,
    categories: [e.region].filter(Boolean),
    body: e.desc || e.summary,
    sourceName: e.sourceName, sourceUrl: e.sourceUrl,
  })),
]

const BY_KEY = new Map(ENTRIES.map((e) => [`${e.kind}:${e.slug}`, e]))
export const entryFor = (kind, slug) => BY_KEY.get(`${kind}:${slug}`) || null

// Índice por nome normalizado, para resolver as ligações declaradas por
// campo (um veículo diz «JASON DUVAL» e não o slug da personagem).
const BY_NAME = new Map()
ENTRIES.forEach((e) => {
  const key = e.name.toLowerCase().trim()
  if (!BY_NAME.has(key)) BY_NAME.set(key, e)
})
export const entryByName = (name) => (name ? BY_NAME.get(String(name).toLowerCase().trim()) || null : null)

// ---------------------------------------------------------------------
// Categorias

export const CATEGORIES = (() => {
  const map = new Map()
  ENTRIES.forEach((e) => {
    e.categories.forEach((label) => {
      const slug = slugify(label)
      if (!slug) return
      if (!map.has(slug)) map.set(slug, { slug, label, members: [] })
      map.get(slug).members.push(e)
    })
  })
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label))
})()

export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug) || null
export const categoriesFor = (entry) =>
  (entry ? entry.categories : []).map((label) => ({ label, slug: slugify(label) })).filter((c) => c.slug)

// ---------------------------------------------------------------------
// O que liga para aqui

const BACKLINKS = (() => {
  const map = new Map()
  const push = (target, source, relation) => {
    if (!target || target.href === source.href) return
    const key = `${target.kind}:${target.slug}`
    if (!map.has(key)) map.set(key, [])
    if (!map.get(key).some((x) => x.href === source.href)) {
      map.get(key).push({ ...source, relation })
    }
  }

  // Ligações declaradas em campos das próprias entradas.
  ENTRIES.forEach((e) => {
    e.links.forEach((name) => {
      const target = entryByName(name)
      if (target) push(target, e, KIND_META[e.kind].label)
    })
  })

  // Relações entre personagens: a única ligação do arquivo que já é, ela
  // própria, um dado — quem está ligado a quem, e se é a ligação central.
  relationships.forEach((r) => {
    const a = entryFor('characters', r.a)
    const b = entryFor('characters', r.b)
    if (!a || !b) return
    push(a, b, r.primary ? 'Primary bond' : 'Relationship')
    push(b, a, r.primary ? 'Primary bond' : 'Relationship')
  })

  // Um local pertence a uma região, e a região lista-o de volta.
  locations.forEach((l) => {
    const loc = entryFor('locations', l.slug)
    const reg = entryFor('regions', l.region)
    if (loc && reg) push(reg, loc, 'Location in region')
  })

  return map
})()

export const backlinksFor = (kind, slug) => BACKLINKS.get(`${kind}:${slug}`) || []

// ---------------------------------------------------------------------
// Páginas especiais

export const STATS = {
  total: ENTRIES.length,
  byKind: Object.keys(KIND_META).map((kind) => ({
    kind,
    label: KIND_META[kind].plural,
    count: ENTRIES.filter((e) => e.kind === kind).length,
  })),
  byStatus: [...new Set(ENTRIES.map((e) => e.status))].map((status) => ({
    status,
    count: ENTRIES.filter((e) => e.status === status).length,
  })).sort((a, b) => b.count - a.count),
  categories: CATEGORIES.length,
  stubs: ENTRIES.filter((e) => e.stub).length,
  withSource: ENTRIES.filter((e) => e.sourceUrl).length,
  linked: BACKLINKS.size,
}

// Esboços: as entradas que existem mas ainda quase não têm corpo. É o
// equivalente ao Special:ShortPages, e serve de lista de trabalho.
export const STUBS = ENTRIES.filter((e) => e.stub).sort((a, b) => a.bodyLength - b.bodyLength)

// Referidas mas inexistentes: nomes que uma entrada cita num campo e a
// que não corresponde nenhum verbete. Nas wikis são as ligações
// vermelhas — o que falta escrever.
export const WANTED = (() => {
  const map = new Map()
  ENTRIES.forEach((e) => {
    e.links.forEach((name) => {
      if (entryByName(name)) return
      const key = String(name).trim()
      if (!key) return
      if (!map.has(key)) map.set(key, { name: key, from: [] })
      if (!map.get(key).from.some((x) => x.href === e.href)) map.get(key).from.push(e)
    })
  })
  return [...map.values()].sort((a, b) => b.from.length - a.from.length)
})()

// Fontes: quantos verbetes cada uma sustenta. Num arquivo que se diz
// preso à fonte, esta é a página que se pode auditar.
export const SOURCES = (() => {
  const map = new Map()
  ENTRIES.forEach((e) => {
    if (!e.sourceName) return
    if (!map.has(e.sourceName)) map.set(e.sourceName, { name: e.sourceName, url: e.sourceUrl, entries: [] })
    map.get(e.sourceName).entries.push(e)
  })
  return [...map.values()].sort((a, b) => b.entries.length - a.entries.length)
})()

export const RECENT = ENTRIES
  .filter((e) => e.updatedAt)
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

// ---------------------------------------------------------------------
// Ligações internas

// Uma expressão só, com os nomes reais dos verbetes ordenados do mais
// longo para o mais curto — assim «VICE CITY» ganha a «VICE» e o texto
// não fica a ligar ao sítio errado. Nomes com menos de cinco letras
// ficam de fora: apanhavam palavras comuns e enchiam o texto de
// ligações falsas.
const LINKABLE = ENTRIES
  .filter((e) => e.name && e.name.length >= 5)
  .sort((a, b) => b.name.length - a.name.length)

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const LINK_PATTERN = LINKABLE.length
  ? new RegExp('\\b(' + LINKABLE.map((e) => escapeRe(e.name)).join('|') + ')\\b', 'gi')
  : null
