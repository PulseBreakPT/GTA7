// O motor de identidade dos verbetes.
//
// Até aqui cada ficha do arquivo era a mesma moldura com outra fotografia: a
// página do Jason e a da Lucia liam-se igual, e quem entrava só sabia onde
// estava depois de ler o título. Isto resolve-se sem partir a moldura — o que
// muda é a pele, e a pele é escolhida aqui.
//
// O que a pele pode mudar está fechado a uma lista curta de fichas em
// `app/entity-identity.css`: cores secundárias, fundo, textura, tratamento das
// imagens, peso do título e ritmo das transições. O que não muda nunca: a
// barra do topo, a grelha, os espaçamentos, os componentes e a navegação. Uma
// pele que quisesse mexer nisso não teria por onde — não há token para tal.
//
// A resolução é por especificidade decrescente, e a primeira que responde
// ganha: uma personagem com identidade própria antes da facção a que pertence,
// a facção antes da região onde vive, a região antes da classe do objecto. Um
// registo sem nada disto não recebe pele nenhuma e fica com o arquivo tal como
// ele é, que é o comportamento certo para a maioria dos verbetes.

// As duas identidades pessoais. São os protagonistas, e são o caso que dá
// sentido ao sistema: a mesma moldura tem de conseguir soar a dois sítios
// opostos.
const PEOPLE = {
  'jason-duval': 'jason',
  'lucia-caminos': 'lucia',
}

// As regiões trazem a sua própria luz. O `id` é o das regiões do mapa, e
// serve tanto para a ficha da região como para tudo o que nela se documenta.
const REGIONS = {
  'vice-city': 'vice-city',
  'leonida-keys': 'leonida-keys',
  'port-gellhorn': 'port-gellhorn',
  'grassrivers': 'grassrivers',
  'mount-kalaga': 'mount-kalaga',
  'ambrosia': 'ambrosia',
}

// As facções falam antes da região onde estão: um clube de motards em Ambrosia
// é primeiro um clube de motards.
const FACTIONS = {
  'final-chapter-mc': 'outlaw-mc',
  'san4san': 'street-gang',
  'ptt-youngins': 'street-gang',
}

// As classes de veículo. A ficha de um desportivo não tem de soar à de um
// utilitário de obra.
const VEHICLE_CLASSES = {
  sports: 'vehicle-exotic',
  muscle: 'vehicle-muscle',
  classics: 'vehicle-muscle',
  offroad: 'vehicle-utility',
  suvs: 'vehicle-utility',
  vans: 'vehicle-utility',
  trucks: 'vehicle-utility',
  trains: 'vehicle-utility',
  industrial: 'vehicle-utility',
  service: 'vehicle-utility',
  boats: 'leonida-keys',
  aircraft: 'vehicle-air',
  motorcycles: 'outlaw-mc',
  emergency: 'police',
}

// Um texto livre — a região de um registo, a associação de um veículo — não é
// um identificador, mas costuma conter um. Procura-se o nome da região lá
// dentro, do mais específico para o mais geral, para «SOUTHSIDE VICE CITY» não
// falhar só por não ser exactamente «VICE CITY».
const REGION_PHRASES = [
  ['leonida keys', 'leonida-keys'],
  ['port gellhorn', 'port-gellhorn'],
  ['mount kalaga', 'mount-kalaga'],
  ['grassrivers', 'grassrivers'],
  ['ambrosia', 'ambrosia'],
  ['vice city', 'vice-city'],
  ['vice beach', 'vice-city'],
]

// O aparato do estado tem uma linguagem só sua, e atravessa regiões: uma
// esquadra em Vice City lê-se como esquadra antes de se ler como Vice City.
const INSTITUTIONAL = ['police', 'sheriff', 'patrol', 'corrections', 'penitentiary', 'law enforcement']

const norm = (value) => (typeof value === 'string' ? value.toLowerCase() : '')

function fromText(text) {
  const t = norm(text)
  if (!t) return null
  if (INSTITUTIONAL.some((word) => t.includes(word))) return 'police'
  const hit = REGION_PHRASES.find(([phrase]) => t.includes(phrase))
  return hit ? hit[1] : null
}

// A identidade de um registo, ou `null` se não tiver nenhuma. O `record` é o
// próprio verbete, e é opcional: sem ele resolve-se apenas pelo slug, que é o
// que as páginas servidas do servidor conseguem passar sem custo.
export function identityFor(kind, slug, record) {
  if (PEOPLE[slug]) return PEOPLE[slug]
  if (kind === 'gangs' || kind === 'factions') {
    if (FACTIONS[slug]) return FACTIONS[slug]
  }
  if (kind === 'regions' && REGIONS[slug]) return REGIONS[slug]

  if (record) {
    // Um veículo de emergência é aparato do estado antes de ser uma classe.
    const assoc = fromText(record.association)
    if (assoc === 'police') return 'police'
    if (kind === 'vehicles' && VEHICLE_CLASSES[record.cls]) return VEHICLE_CLASSES[record.cls]
    const fromRegion = fromText(record.region) || fromText(record.branch) || assoc
    if (fromRegion) return fromRegion
    const byType = fromText(record.type) || fromText(record.kind) || fromText(record.role)
    if (byType) return byType
  }

  // O slug de uma localização costuma trazer a região no próprio nome.
  return fromText(String(slug || '').replace(/-/g, ' '))
}
