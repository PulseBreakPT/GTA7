// Vehicle evidence is intentionally stricter than the old catalogue status.
// A vehicle can be visible in Rockstar material without Rockstar having
// published its fictional name. Keep those two facts separate in every card.

const OFFICIAL_NAME_SLUGS = new Set([
  'grotti-cheetah-95',
  'vapid-stanier-55',
  'vapid-dominator-buggy-67',
  'shitzu-squalo',
  'dinka-enduro',
  'crest-kayak',
  'vapid-ganado',
])

const REAL_WORLD_INSPIRATIONS = {
  'grotti-cheetah-95': 'Ferrari Testarossa / 512 BB family · community comparison',
  'vapid-stanier-55': '1950s American full-size sedans · community comparison',
  'vapid-dominator-buggy-67': '1967 American muscle-car builds · community comparison',
  'vapid-ganado': '1970s American lowrider/pickup cues · community comparison',
  '8f-drafter': 'Audi RS5 · community comparison',
  banshee: 'Dodge Viper · community comparison',
  'coquette-d10': 'Chevrolet Corvette C8 · community comparison',
  cypher: 'BMW M2 · community comparison',
  'elegy-retro-custom': 'Nissan Skyline GT-R · community comparison',
  futo: 'Toyota AE86 · community comparison',
  growler: 'Porsche 718 Cayman · community comparison',
  'itali-gto': 'Ferrari 812 Superfast · community comparison',
  neon: 'Porsche Taycan / modern EV cues · community comparison',
  'progen-emerus': 'McLaren Senna · community identification',
  'rexhall-rose-air': 'Rexhall Rose Air motorhome · community identification',
  'audi-q7-inspired-suv': 'Audi Q7 · working visual identity, not a GTA name',
  'dodge-dakota-inspired-pickup': 'Dodge Dakota convertible · working visual identity, not a GTA name',
  'swamp-buggy': 'Florida swamp-buggy culture · regional comparison',
}

const OFFICIAL_CONTEXT = {
  // O Overview dizia onde o carro foi visto e o campo estruturado respondia
  // «Region not published for this vehicle» — a mesma ficha a contradizer-se.
  // A região observada existe nos detalhes documentados; passa a constar.
  'asterope-gz': {
    appearance: 'Official Grassrivers screenshot · Rideout Customs interior in Ultimate Edition media',
    region: 'Grassrivers · observed at Watson Bay',
  },
  'grotti-cheetah-95': {
    appearance: 'Ultimate Edition media library · dedicated Rockstar screenshots',
    variant: 'Mid-’90s Cheetah with the Ultimate Edition retro-futurist livery',
    region: 'Vice City / Shore Drive',
  },
  'vapid-stanier-55': {
    appearance: 'Vintage Vice City Pack · dedicated Rockstar media',
    variant: '1955 sedan supplied with a garage',
    region: 'Vice City / Shore Drive',
  },
  'vapid-dominator-buggy-67': {
    appearance: 'Ultimate Edition · Paradise Garage / Mud Club material',
    variant: 'Lifted off-road buggy build of the 1967 Dominator',
    region: 'Mount Kalaga / Watson Bay',
    business: 'Paradise Garage',
  },
  'shitzu-squalo': {
    appearance: 'Ultimate Edition · dedicated Rockstar watercraft media',
    variant: 'Pink-and-blue open-ocean setup with an equipment crate',
    region: 'Washington Beach / Gambit Bay',
  },
  'dinka-enduro': {
    appearance: 'Ultimate Edition · Jason’s Safehouse Vehicles',
    variant: 'Army-fatigue-tinged Enduro appearance',
    region: 'Leonida · safehouse context',
  },
  'crest-kayak': {
    appearance: 'Ultimate Edition · Jason’s Safehouse Vehicles',
    variant: 'Named kayak; brand/model relationship not further specified',
    region: 'Mount Kalaga / Leonida waterways',
  },
  'vapid-ganado': {
    appearance: 'Ultimate Edition · Ganado Retro Build',
    variant: 'Retro Build customisation package for Jason’s Ganado',
    region: 'Leonida · Jason’s vehicle context',
    business: 'Rideout Customs / One-Eyed Willie’s Mod Shop · vehicle customisation context',
  },
}

function hasRockstarSource(vehicle) {
  return /rockstar|official|extended look/i.test(`${vehicle?.sourceName || ''} ${vehicle?.association || ''}`)
}

export function vehicleBible(vehicle) {
  const context = OFFICIAL_CONTEXT[vehicle?.slug] || {}
  const evidenceLevel = vehicle?.status === 'rumour'
    ? 'DEVELOPMENT / LEAK'
    : OFFICIAL_NAME_SLUGS.has(vehicle?.slug)
      ? 'OFFICIAL NAME'
      : vehicle?.status === 'verified' || vehicle?.status === 'category' || hasRockstarSource(vehicle)
        ? 'OFFICIAL APPEARANCE'
        : 'IDENTIFIED'

  const evidenceMeaning = {
    'OFFICIAL NAME': 'Rockstar explicitly publishes this fictional vehicle name.',
    'OFFICIAL APPEARANCE': 'Clearly visible in Rockstar material; the exact GTA name may still be inferred.',
    IDENTIFIED: 'Community/database identification from an observed design, badge or returning model.',
    'DEVELOPMENT / LEAK': 'Supported only by development material or leaks; excluded from the confirmed record.',
  }[evidenceLevel]

  const isOfficialName = evidenceLevel === 'OFFICIAL NAME'
  const safehouse = ['dinka-enduro', 'crest-kayak'].includes(vehicle?.slug)
  const hasCustomContext = Boolean(context.business || vehicle?.content)

  return {
    evidenceLevel,
    evidenceMeaning,
    nameState: isOfficialName ? 'GTA name published' : 'GTA name not independently published',
    realWorldInspiration: REAL_WORLD_INSPIRATIONS[vehicle?.slug] || 'Not catalogued as a verified real-world analogue.',
    appearance: context.appearance || (hasRockstarSource(vehicle) ? vehicle?.sourceName : 'No Rockstar appearance source attached.'),
    region: context.region || 'Region not published for this vehicle.',
    variant: context.variant || (vehicle?.association || 'No named variant published.'),
    theftMethod: 'No vehicle-specific theft method published for this model.',
    security: 'Not published for this model.',
    tracker: 'Not published for this model.',
    fenceValue: 'Not published for this model.',
    ownership: safehouse ? 'Safehouse vehicle context is named; retention rules are not published.' : 'Personal-vehicle rules are not published for this model.',
    storage: safehouse ? 'Safehouse context is named; capacity is not published.' : 'Storage capacity is not published for this model.',
    fuel: 'Fuel type and tank values are not published for this model.',
    customisation: hasCustomContext ? (context.business || vehicle?.content) : 'No vehicle-specific customisation package is published.',
    business: context.business || 'No associated vehicle business is published for this model.',
    sourceNotes: vehicle?.confirmedDetails?.length || 0,
    systemNote: 'Preview material describes Slim Jim/key-cloner theft choices, tracker/value scanning and vehicle storage as GTA VI systems; individual values remain unknown unless Rockstar publishes them.',
  }
}

