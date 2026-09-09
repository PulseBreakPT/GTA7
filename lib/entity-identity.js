// Entity Identity Engine
// Returns a small, finite set of presentation tokens. Content remains in the
// route and the CSS owns every visual decision, so identity never changes the
// information architecture or introduces user-controlled styles.

const characterThemes = {
  'jason-duval': ['jason', 'weighted'],
  'lucia-caminos': ['lucia', 'precise'],
  'cal-hampton': ['cal', 'measured'],
  'boobie-ike': ['boobie', 'confident'],
  'dre-quan-priest': ['music', 'rhythmic'],
  'real-dimez': ['music', 'rhythmic'],
  'bae-luxe': ['music', 'rhythmic'],
  roxy: ['music', 'rhythmic'],
  dwnply: ['music', 'rhythmic'],
  'raul-bautista': ['heist', 'precise'],
  'brian-heder': ['keys', 'relaxed'],
  'lori-heder': ['keys', 'relaxed'],
  wyman: ['keys', 'relaxed'],
}

const regionThemes = {
  'vice-city': ['vice-city', 'fluid'],
  'leonida-keys': ['keys', 'relaxed'],
  'port-gellhorn': ['gellhorn', 'weighted'],
  grassrivers: ['grassrivers', 'organic'],
  ambrosia: ['ambrosia', 'measured'],
  'mount-kalaga': ['kalaga', 'weighted'],
}

const factionThemes = {
  'ptt-youngins': ['ptt', 'rhythmic'],
  'final-chapter-mc': ['final-chapter', 'weighted'],
  san4san: ['san4san', 'precise'],
}

const vehicleClassThemes = {
  sports: ['vehicle-exotic', 'fast'],
  muscle: ['vehicle-muscle', 'weighted'],
  classics: ['vehicle-classic', 'measured'],
  motorcycles: ['vehicle-moto', 'fast'],
  boats: ['vehicle-marine', 'fluid'],
  aircraft: ['vehicle-air', 'fluid'],
  offroad: ['vehicle-offroad', 'weighted'],
  sedans: ['vehicle-road', 'measured'],
  suvs: ['vehicle-offroad', 'weighted'],
  vans: ['vehicle-utility', 'measured'],
  trucks: ['vehicle-industrial', 'weighted'],
  trains: ['vehicle-industrial', 'weighted'],
  industrial: ['vehicle-industrial', 'weighted'],
  service: ['vehicle-service', 'precise'],
  emergency: ['authority', 'precise'],
  cycles: ['vehicle-cycle', 'fast'],
}

const manufacturerFamilies = new Map([
  ['VAPID', 'vapid'], ['DECLASSE', 'declasse'], ['BRAVADO', 'bravado'],
  ['GROTTI', 'grotti'], ['PROGEN', 'progen'], ['PEGASSI', 'pegassi'],
  ['BENEFAC', 'benefactor'], ['ENUS', 'enus'], ['PFISTER', 'pfister'],
  ['DINKA', 'dinka'], ['MAIBATSU', 'maibatsu'], ['PRINCIPE', 'principe'],
  ['BUCKINGHAM', 'buckingham'], ['SHITZU', 'shitzu'], ['HVY', 'hvy'],
])

const makeIdentity = (kind, theme, motion, label, family = 'independent') => ({
  kind,
  theme,
  motion,
  label,
  family,
})

export function characterIdentity(character) {
  const direct = characterThemes[character?.slug]
  if (direct) return makeIdentity('character', direct[0], direct[1], character.name)

  const role = `${character?.role || ''} ${character?.group || ''}`.toLowerCase()
  if (/(police|officer|correction|government|law)/.test(role)) return makeIdentity('character', 'authority', 'precise', character?.name)
  if (/(music|performer|media|dj)/.test(role)) return makeIdentity('character', 'music', 'rhythmic', character?.name)
  return makeIdentity('character', 'archive', 'measured', character?.name)
}

export function regionIdentity(regionId, label) {
  const direct = regionThemes[regionId] || ['archive', 'measured']
  return makeIdentity('region', direct[0], direct[1], label || regionId)
}

export function factionIdentity(faction) {
  const direct = factionThemes[faction?.slug] || ['faction', 'weighted']
  return makeIdentity('faction', direct[0], direct[1], faction?.name)
}

export function vehicleIdentity(vehicle) {
  const direct = vehicleClassThemes[vehicle?.cls] || ['vehicle-road', 'measured']
  const manufacturer = String(vehicle?.manufacturer || '').toUpperCase()
  const family = [...manufacturerFamilies].find(([needle]) => manufacturer.includes(needle))?.[1] || 'independent'
  return makeIdentity('vehicle', direct[0], direct[1], vehicle?.name, family)
}

export function identityAttributes(identity) {
  return {
    'data-entity-kind': identity.kind,
    'data-entity-theme': identity.theme,
    'data-entity-motion': identity.motion,
    'data-entity-family': identity.family,
    'data-entity-label': identity.label,
  }
}
