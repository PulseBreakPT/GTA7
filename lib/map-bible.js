// The map archive keeps existence, naming and placement as separate claims.
// Rockstar has published six region profiles, but not a complete playable map.
// This module gives every region/place a consistent evidence vocabulary without
// turning a community reconstruction into official geography.

export const MAP_EVIDENCE = {
  OFFICIAL_REGION: 'OFFICIAL REGION',
  OFFICIAL_LOCATION: 'OFFICIAL LOCATION',
  OFFICIAL_SIGNAGE: 'OFFICIAL SIGNAGE',
  COMMUNITY_PLACEMENT: 'COMMUNITY PLACEMENT',
  DEVELOPMENT_MATERIAL: 'DEVELOPMENT MATERIAL',
  SPECULATION: 'SPECULATION',
}

export const MAP_LAYERS = [
  { id: 'official', label: 'Official only', description: 'Rockstar-named regions, places and published appearances.' },
  { id: 'observed', label: 'Observed', description: 'Names or visual evidence in released material, with placement kept separate.' },
  { id: 'community', label: 'Community mapped', description: 'Reconstructed geography and likely placement, never presented as official.' },
  { id: 'development', label: 'Development', description: 'Pre-release or leak-derived records kept in an isolated layer.' },
]

export const LEONIDA_COUNTIES = [
  { name: 'Vice-Dale County', evidence: MAP_EVIDENCE.OFFICIAL_SIGNAGE, note: 'Released material / observed signage' },
  { name: 'Leonard County', evidence: MAP_EVIDENCE.OFFICIAL_SIGNAGE, note: 'Released material / observed signage' },
  { name: 'Ambrosia County', evidence: MAP_EVIDENCE.OFFICIAL_SIGNAGE, note: 'Released material / observed signage' },
  { name: 'Kelly County', evidence: MAP_EVIDENCE.OFFICIAL_SIGNAGE, note: 'Released material / observed signage' },
  { name: 'Mariana County', evidence: MAP_EVIDENCE.OFFICIAL_SIGNAGE, note: 'Released material / observed signage' },
  { name: 'Lummox County', evidence: MAP_EVIDENCE.DEVELOPMENT_MATERIAL, note: 'Development/leak material only' },
]

const REGION_CONTEXT = {
  'vice-city': {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'EVERYTHING IN EXCESS',
    analogue: 'Miami · editorial comparison, not a one-to-one map claim',
    mapStatus: 'Major urban centre · complete city map not published',
    countyReference: 'Vice-Dale County · observed name, exact boundary not published',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'Ocean Beach, Little Cuba, Tisha-Wocka Flea Market and VC Port are directly profiled by Rockstar.',
    ecology: 'Metropolitan coast, beaches, ports, nightlife and dense urban infrastructure.',
  },
  'leonida-keys': {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'GATEWAY TO PARADISE',
    analogue: 'Florida Keys · editorial comparison, not a one-to-one map claim',
    mapStatus: 'Tropical archipelago · complete island map not published',
    countyReference: 'Mariana County association · region-wide boundary not published',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'The official profile establishes the Keys as a tropical archipelago connected to boats, bars and smuggling.',
    ecology: 'Islands, open water, marinas, bars and coastal settlements.',
  },
  'grassrivers': {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'WELCOME TO THE WETLANDS',
    analogue: 'Florida Everglades · editorial comparison, not a one-to-one map claim',
    mapStatus: 'Wetland region · complete internal settlement list not published',
    countyReference: 'Mariana County association · region-wide boundary not published',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'Rockstar identifies Grassrivers as a wetland environment with mangroves, shallow water and wildlife.',
    ecology: 'Wetlands, mangroves, shallow water, airboats and wildlife.',
  },
  'port-gellhorn': {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'LIVE HARD',
    analogue: 'Declining Gulf-coast tourist settlements · editorial comparison',
    mapStatus: 'Coastal settlement · complete road and county map not published',
    countyReference: 'Kelly County association · exact boundary not published',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'Rockstar presents Port Gellhorn as a faded tourist coast with motels, closed attractions and roadside commerce.',
    ecology: 'Coastal roads, motels, strip malls, marinas and truck-stop culture.',
  },
  ambrosia: {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'KEEPING LEONIDA SWEET',
    analogue: 'Industrial and agricultural Florida interior · editorial comparison',
    mapStatus: 'Industrial/agricultural region · county boundary not published',
    countyReference: 'Ambrosia County · observed name, exact boundary not published',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'Allied Crystal and the local biker economy are the two published power structures in Ambrosia.',
    ecology: 'Agriculture, refinery infrastructure, rail, rural roads and small-town industry.',
  },
  'mount-kalaga': {
    evidenceLevel: MAP_EVIDENCE.OFFICIAL_REGION,
    theme: 'WILD, WILD COUNTRY',
    analogue: 'Northern wilderness with Florida-inspired wildlife · editorial comparison',
    mapStatus: 'National park/wilderness · northern border and trail network not published',
    countyReference: 'Northern county association not published; Lummox remains development-only',
    boundaryStatus: 'Official boundary not published',
    knownAs: 'Rockstar associates Mount Kalaga with hunting, fishing, off-road trails and isolated backcountry.',
    ecology: 'Forest, cliffs, rivers, backroads and elevated terrain.',
  },
}

const LOCATION_CONTEXT = {
  // Officially named or shown in Rockstar material.
  'venture-apartments': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Rockridge association · exact coordinates not published', links: 'Raymond · San4San-associated operation · Jason · Lucia · police raid' },
  effluvia: { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · exact address not published', links: 'Brian Heder · Lori Heder · Jason · Lucia' },
  'megamundo-building': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Downtown Vice City association · exact coordinates not published', links: 'Megamundo · Petra Navarro · Andrés de León' },
  'vice-city-international-airport': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_SIGNAGE, placement: 'Vice City · final footprint not published', links: 'Airport infrastructure · aircraft · public transit' },
  'delights': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Port Gellhorn · official appearance', links: 'Port Gellhorn · nightlife' },
  'starlet-motel': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Port Gellhorn · official signage and appearance', links: 'Jason · Lucia · safehouse context' },
  'lake-leonida': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Named in edition material · shoreline and final placement not published', links: 'One-Eyed Willie’s Mod Shop · Ambrosia context' },
  'paradise-garage': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Watson Bay · official functionality, exact coordinates not published', links: 'Vehicle storage · weapon locker · fenced goods' },
  'watson-bay': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Mariana County association · exact borders not published', links: 'Paradise Garage · Leonida Keys/Grassrivers placement requires source grading' },
  'vercetti-estate': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City reference · exact coordinates not published', links: 'Morgan Revolvers · Tommy Vercetti return not confirmed' },
  'washington-beach': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · Squalo docking reference', links: 'Shitzu Squalo · Gambit Bay' },
  'gambit-bay': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Leonida Keys context · exact boundaries not published', links: 'Shitzu Squalo · fishing context' },
  'shore-drive': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · geography not fully published', links: "'95 Grotti Cheetah" },
  'one-eyed-willies': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Lake Leonida context · exact location not published', links: 'Off-road customisation · Lake Leonida' },
  'rideout-customs': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · exact address not published', links: 'Vehicle customisation' },
  'ptt-youngins-compound': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Southside Vice City · compound location', links: 'PTT Youngin$ · contraband' },
  'jack-of-hearts': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Crosstown, Vice City · exact coordinates not published', links: 'Boobie Ike · Only Raw Records · Real Dimez' },
  'only-raw-records': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · exact address not published', links: 'Dre’Quan Priest · Boobie Ike · Real Dimez' },
  // Released signage/frames, but the community placement is not official.
  'ocean-beach': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · official district profile, no complete street map', links: 'Art Deco hotels · beachfront' },
  'little-cuba': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · official district profile, no complete street map', links: 'Panaderías · Cuban/Latin culture' },
  'tisha-wocka-flea-market': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · official district profile, no complete street map', links: 'Counterfeit/bootleg market' },
  'vc-port': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Vice City · official district profile, no complete street map', links: 'Cruise ships · port infrastructure' },
  'allied-crystal-refinery': { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Ambrosia · exact industrial footprint not published', links: 'Ambrosia · employment · biker economy' },
  // These records intentionally remain in the community/development layers.
  'gellhorn-international-raceway': { evidenceLevel: MAP_EVIDENCE.DEVELOPMENT_MATERIAL, placement: 'Port Gellhorn association from development material', links: 'Raceway · final-game status unknown' },
  yorktown: { evidenceLevel: MAP_EVIDENCE.DEVELOPMENT_MATERIAL, placement: 'Development signage; final placement unknown', links: 'Mount Kalaga/northern names' },
  'lummox-county': { evidenceLevel: MAP_EVIDENCE.DEVELOPMENT_MATERIAL, placement: 'Development/leak material only', links: 'County name, final-game status unknown' },
}

function fallbackForLocation(location) {
  if (!location) return { evidenceLevel: MAP_EVIDENCE.SPECULATION, placement: 'No placement record', links: 'No linked entities published' }
  if (location.status === 'rumour') return { evidenceLevel: MAP_EVIDENCE.DEVELOPMENT_MATERIAL, placement: 'Development/community record; coordinates not official', links: 'No published relationship layer' }
  if (location.status === 'analysis') return { evidenceLevel: MAP_EVIDENCE.COMMUNITY_PLACEMENT, placement: 'Community catalogue; exact coordinates not published', links: 'No published relationship layer' }
  if (location.sourceName?.includes('Rockstar')) return { evidenceLevel: MAP_EVIDENCE.OFFICIAL_LOCATION, placement: 'Published appearance/name; exact coordinates not published', links: 'No additional relationship layer attached' }
  return { evidenceLevel: MAP_EVIDENCE.COMMUNITY_PLACEMENT, placement: 'Observed or catalogued record; exact coordinates not official', links: 'No published relationship layer' }
}

export function mapBibleForRegion(region) {
  return REGION_CONTEXT[region?.id] || {
    evidenceLevel: MAP_EVIDENCE.SPECULATION,
    theme: 'ARCHIVE RECORD',
    analogue: 'Not published',
    mapStatus: 'Region record not yet classified',
    countyReference: 'Not published',
    boundaryStatus: 'Not published',
    knownAs: 'No official region profile attached.',
    ecology: 'Not published',
  }
}

export function mapBibleForLocation(location) {
  return { ...(fallbackForLocation(location)), ...(LOCATION_CONTEXT[location?.slug] || {}) }
}

export function mapLayerForEvidence(evidenceLevel) {
  if ([MAP_EVIDENCE.OFFICIAL_REGION, MAP_EVIDENCE.OFFICIAL_LOCATION].includes(evidenceLevel)) return 'official'
  if (evidenceLevel === MAP_EVIDENCE.OFFICIAL_SIGNAGE) return 'observed'
  if (evidenceLevel === MAP_EVIDENCE.COMMUNITY_PLACEMENT) return 'community'
  if (evidenceLevel === MAP_EVIDENCE.DEVELOPMENT_MATERIAL) return 'development'
  return 'community'
}

export function matchesMapLayer(location, layer) {
  if (layer === 'all') return true
  return mapLayerForEvidence(mapBibleForLocation(location).evidenceLevel) === layer
}
