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
import { worldEntries } from './world-content'
import { publicSource } from './official-links'

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
  world: { label: 'World record', plural: 'World', base: '/database/world' },
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
  const source = publicSource(sourceName, sourceUrl)
  return {
    kind, slug, name,
    href: `${base}/${slug}`,
    status: status || 'analysis',
    categories: [KIND_META[kind].plural, ...categories].filter(Boolean),
    stub: isStub(body),
    bodyLength: (body || '').length,
    updatedAt: updatedAt || null,
    sourceName: source.name,
    sourceUrl: source.url,
    // Conserva o texto indexável. A interface de pesquisa precisa de
    // procurar no corpo do verbete, não apenas no título e no resumo.
    searchText: body || '',
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

  ...worldEntries.map((item) => entry('world', item.slug, item.name, {
    status: item.status,
    categories: [item.branch, item.type, item.region].filter(Boolean),
    body: [item.summary, ...(item.details || [])].filter(Boolean).join(' '),
    updatedAt: item.updatedAt, sourceName: item.sourceName, sourceUrl: item.sourceUrl,
    links: [item.region].filter(Boolean),
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

// Resolve também a forma canónica do endereço. Isto dá ao «Go» o papel de
// redirect de uma wiki para diferenças de espaços, pontuação e capitalização,
// sem manter uma segunda lista de aliases que ficaria desactualizada.
const BY_CANONICAL_NAME = new Map()
ENTRIES.forEach((e) => {
  BY_CANONICAL_NAME.set(slugify(e.name), e)
  BY_CANONICAL_NAME.set(slugify(e.slug), e)
})
export const resolveEntry = (name) => {
  if (!name) return null
  return entryByName(name) || BY_CANONICAL_NAME.get(slugify(name)) || null
}

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
  const categories = [...map.values()].sort((a, b) => a.label.localeCompare(b.label))

  // O primeiro rótulo de cada entrada é o seu ramo (Characters, Vehicles,
  // etc.). Os restantes passam a ser subcategorias desse ramo. Quando uma
  // categoria cruza ramos, recebe todos os pais reais — uma taxonomia
  // derivada do conteúdo em vez de uma árvore paralela escrita à mão.
  categories.forEach((category) => {
    const parents = new Map()
    category.members.forEach((member) => {
      const label = member.categories[0]
      const slug = slugify(label)
      if (slug && slug !== category.slug) parents.set(slug, { slug, label })
    })
    category.parents = [...parents.values()].sort((a, b) => a.label.localeCompare(b.label))
  })
  categories.forEach((category) => {
    category.children = categories
      .filter((child) => child.parents.some((parent) => parent.slug === category.slug))
      .map((child) => ({ slug: child.slug, label: child.label, count: child.members.length }))
      .sort((a, b) => a.label.localeCompare(b.label))
  })

  return categories
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
    if (!e.sourceName || !e.sourceUrl) return
    if (!map.has(e.sourceName)) map.set(e.sourceName, { name: e.sourceName, url: e.sourceUrl, entries: [] })
    map.get(e.sourceName).entries.push(e)
  })
  return [...map.values()].sort((a, b) => b.entries.length - a.entries.length)
})()

export const RECENT = ENTRIES
  .filter((e) => e.updatedAt)
  .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

// ---------------------------------------------------------------------
// As listas de manutenção de uma wiki. Numa wiki a sério não são um
// extra: são a forma de a wiki se auditar a si própria em público — o que
// está órfão, o que não leva a lado nenhum, o que não tem fonte. Todas
// saem das entradas, nenhuma é escrita à mão.

export const outgoingFor = (e) =>
  (e.links || []).map((name) => entryByName(name)).filter((x) => x && x.href !== e.href)

const linkCount = (e) => backlinksFor(e.kind, e.slug).length

// Órfãs: ninguém no arquivo aponta para elas. Chegar lá só pela pesquisa
// ou pelo índice é o sintoma de uma entrada por integrar.
export const ORPHANS = ENTRIES.filter((e) => linkCount(e) === 0)

// Becos: não apontam para nenhuma outra entrada. Lêem-se e acabam ali.
export const DEAD_ENDS = ENTRIES.filter((e) => outgoingFor(e).length === 0)

// As mais apontadas: o centro de gravidade do arquivo.
export const MOST_LINKED = ENTRIES
  .map((e) => ({ ...e, incoming: linkCount(e) }))
  .filter((e) => e.incoming > 0)
  .sort((a, b) => b.incoming - a.incoming || a.name.localeCompare(b.name))

// Por extensão do corpo, nos dois sentidos.
export const LONGEST = [...ENTRIES].sort((a, b) => b.bodyLength - a.bodyLength)

// Sem categoria própria: só têm a do ramo a que pertencem, o que quer
// dizer que ninguém as arrumou em mais nada.
export const UNCATEGORISED = ENTRIES.filter((e) => e.categories.length <= 1)

// Sem ligação de fonte. Num arquivo que se diz preso à fonte, esta é a
// lista que mais importa manter curta.
export const UNSOURCED = ENTRIES.filter((e) => !e.sourceUrl)

// Nomes usados por mais do que uma entrada. É a matéria das páginas de
// desambiguação: o mesmo nome a apontar para coisas diferentes.
export const AMBIGUOUS = (() => {
  const map = new Map()
  ENTRIES.forEach((e) => {
    const key = e.name.toLowerCase().trim()
    if (!map.has(key)) map.set(key, { name: e.name, entries: [] })
    map.get(key).entries.push(e)
  })
  return [...map.values()]
    .filter((x) => x.entries.length > 1)
    .sort((a, b) => b.entries.length - a.entries.length || a.name.localeCompare(b.name))
})()

// As outras entradas que partilham o nome desta — o que uma nota de
// desambiguação diz no topo de um verbete.
export const otherUses = (entry) => {
  if (!entry) return []
  const hit = AMBIGUOUS.find((x) => x.name.toLowerCase().trim() === entry.name.toLowerCase().trim())
  return hit ? hit.entries.filter((e) => e.href !== entry.href) : []
}

// Confundíveis: nomes diferentes em que um contém o outro, em ramos
// diferentes — «VICE CITY» a região e «DOWNTOWN VICE CITY» o bairro, o
// «CHEETAH» e o «’95 GROTTI CHEETAH». Não são o mesmo nome, e por isso não
// entram na desambiguação; mas são exactamente o que uma wiki resolve com
// um «não confundir com» no topo. Exige-se cinco letras ao nome mais curto
// para não apanhar palavras comuns, e ramos diferentes para não encher a
// garagem de notas entre carros parecidos.
export const confusableWith = (entry, limit = 3) => {
  if (!entry || !entry.name || entry.name.length < 5) return []
  const mine = entry.name.toLowerCase().trim()
  return ENTRIES
    .filter((e) => {
      if (e.href === entry.href || e.kind === entry.kind) return false
      const other = e.name.toLowerCase().trim()
      if (other === mine) return false
      const short = other.length < mine.length ? other : mine
      if (short.length < 5) return false
      return mine.includes(other) || other.includes(mine)
    })
    .sort((a, b) => a.name.length - b.name.length)
    .slice(0, limit)
}

// Vizinhança: as entradas do mesmo ramo que partilham categoria com esta.
// É o que numa wiki se põe na navbox do rodapé.
export const siblingsFor = (entry, limit = 12) => {
  if (!entry) return []
  const own = new Set(entry.categories.slice(1))
  return ENTRIES
    .filter((e) => e.kind === entry.kind && e.href !== entry.href && (own.size === 0 || e.categories.slice(1).some((c) => own.has(c))))
    .slice(0, limit)
}

// O registo das páginas especiais. Uma entrada aqui é uma rota
// `/wiki/special/<id>`; a página é a mesma para todas.
export const SPECIAL_LISTS = [
  {
    id: 'most-linked', title: 'Most linked pages', metric: 'incoming links',
    blurb: 'The entries the rest of the archive points at most. A high count means the record is well connected, not that it is important.',
    rows: () => MOST_LINKED.map((e) => ({ entry: e, value: `${e.incoming} in` })),
  },
  {
    id: 'orphans', title: 'Lonely pages', metric: 'no incoming links',
    blurb: 'Entries no other entry links to. They exist and are reachable from the index and the search, but nothing in the archive leads to them.',
    rows: () => ORPHANS.map((e) => ({ entry: e, value: '0 in' })),
  },
  {
    id: 'dead-ends', title: 'Dead-end pages', metric: 'no outgoing links',
    blurb: 'Entries that link to nothing else. They are read and the trail stops there.',
    rows: () => DEAD_ENDS.map((e) => ({ entry: e, value: '0 out' })),
  },
  {
    id: 'short', title: 'Short pages', metric: 'body length',
    blurb: 'Sorted by how little the record holds. These are marked as stubs rather than padded out — an archive that invents body text to look complete is no longer a record.',
    rows: () => STUBS.map((e) => ({ entry: e, value: `${e.bodyLength} chars` })),
  },
  {
    id: 'long', title: 'Long pages', metric: 'body length',
    blurb: 'The other end of the same measure: the entries the sources allowed to grow.',
    rows: () => LONGEST.slice(0, 60).map((e) => ({ entry: e, value: `${e.bodyLength} chars` })),
  },
  {
    id: 'unsourced', title: 'Pages without a source link', metric: 'source',
    blurb: 'Entries whose source has no public page to link to. The source is still named on the entry; what is missing is somewhere to send you.',
    rows: () => UNSOURCED.map((e) => ({ entry: e, value: e.sourceName || 'no source named' })),
  },
  {
    id: 'uncategorised', title: 'Uncategorised pages', metric: 'categories',
    blurb: 'Entries filed only under their own branch. Nothing else has been said about where they belong.',
    rows: () => UNCATEGORISED.map((e) => ({ entry: e, value: e.categories[0] || '—' })),
  },
  {
    id: 'disambiguation', title: 'Ambiguous names', metric: 'entries sharing the name',
    blurb: 'Names that belong to more than one record. Each of those entries carries a note at the top pointing at the others.',
    rows: () => AMBIGUOUS.flatMap((x) => x.entries.map((e) => ({ entry: e, value: `${x.entries.length} share this name` }))),
  },
  {
    id: 'wanted', title: 'Wanted pages', metric: 'times cited',
    blurb: 'Names that entries cite in a field but that have no page of their own. On a wiki these are the red links — the honest list of what is still missing.',
    rows: () => WANTED.map((w) => ({ name: w.name, value: `cited by ${w.from.length}`, from: w.from })),
  },
  {
    id: 'recent', title: 'Recently touched pages', metric: 'last updated',
    blurb: 'Every entry by the date it was last checked against its source.',
    rows: () => RECENT.slice(0, 80).map((e) => ({ entry: e, value: e.updatedAt })),
  },
  {
    id: 'by-source', title: 'Pages by source', metric: 'entries per source',
    blurb: 'How much of the archive each source carries. A source with many entries is a single point of failure, and saying so is the point of the list.',
    rows: () => SOURCES.map((s2) => ({ name: s2.name, value: `${s2.entries.length} entries`, from: s2.entries.slice(0, 6), url: s2.url })),
  },
]

export const specialListById = (id) => SPECIAL_LISTS.find((l) => l.id === id) || null

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
