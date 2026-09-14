// The weapon catalogue deliberately distinguishes a Rockstar-published name
// from a visual/community label. Stats and mechanics stay unknown until a
// reliable source publishes them.

const OFFICIAL_NAME_SLUGS = new Set(['morgan-revolvers', 'girardi-es9', 'klose-k17'])

const REAL_WORLD_INSPIRATIONS = {
  'morgan-revolvers': 'Smith & Wesson Model 29/629 family · community comparison',
  'girardi-es9': 'Beretta 92FS-style pistol · community comparison',
  'klose-k17': 'Glock 17 / SIG Sauer P320-style polymer pistol · community comparison',
  'duke-special-ops-carbine': 'M4 / AR-pattern carbine · community comparison',
  '556': 'Colt M4A1 family · community comparison',
  'mustang-357': 'Colt Python-style revolver · community comparison',
  'nipper-38': 'Compact Taurus/Bersa-style pistol · community comparison',
  pistol: 'Taurus PT92-style pistol · community comparison',
  'moreland-850': 'Remington 870-style pump shotgun · community comparison',
  '850': 'Remington 870-style pump shotgun · community comparison',
  'double-barrel-shotgun': 'Traditional side-by-side sporting shotgun · community comparison',
  'grenade-launcher': 'Milkor MGL-style launcher · community comparison',
  'rocket-launcher': 'RPG-7-style launcher · community comparison',
  'micro-submachine-gun': 'Mini Uzi-style submachine gun · community comparison',
  'compact-submachine-gun': 'Scorpion-style submachine gun · community comparison',
}

const CONTEXT = {
  'morgan-revolvers': {
    owner: 'Jason Duval + Lucia Caminos',
    variant: 'His-and-hers personalised revolvers with palm-tree grips, engraving and a scope',
    appearances: [['ULTIMATE EDITION', 'Rockstar names the revolver family and shows personalised variants', 'OFFICIAL NAME'], ['VERCETTI ESTATE', 'Rockstar describes the source context for the revolvers', 'OFFICIAL NAME']],
    customisation: 'Personalised engraved variants are officially included; broader attachment compatibility is not published.',
  },
  'girardi-es9': {
    owner: 'Jason Duval',
    variant: 'Personalised engraved Ultimate Edition sidearm',
    appearances: [['ULTIMATE EDITION', 'Rockstar explicitly calls it Jason’s Girardi ES9', 'OFFICIAL NAME'], ['TRAILER 2 · 1:50', 'Jason is shown firing the sidearm', 'OFFICIAL APPEARANCE']],
    customisation: 'Detailed engraved personalised version; normal modification depth is not published.',
  },
  'klose-k17': {
    owner: 'Lucia Caminos',
    variant: 'Personalised engraved Ultimate Edition sidearm',
    appearances: [['ULTIMATE EDITION', 'Rockstar explicitly calls it Lucia’s Klose K17', 'OFFICIAL NAME'], ['OFFICIAL MEDIA', 'Personalized Weapon Variants are shown by Rockstar', 'OFFICIAL APPEARANCE']],
    customisation: 'Detailed engraved personalised version; normal modification depth is not published.',
  },
  'duke-special-ops-carbine': {
    owner: 'Raul Bautista / law-enforcement scene',
    appearances: [['PROMOTIONAL VIDEO', 'Carbine is visible in Rockstar-published material', 'OFFICIAL APPEARANCE']],
  },
  '556': {
    owner: 'Jason Duval / Raul Bautista imagery',
    appearances: [['OFFICIAL SCREENSHOT', 'Duke Army Company marking is visible', 'OFFICIAL APPEARANCE'], ['EXTENDED LOOK', 'Duke 556 identification is reported from UI/frame analysis', 'IDENTIFIED']],
  },
  '850': {
    appearances: [['EXTENDED LOOK', 'Pump shotgun is retrieved during a firefight', 'OFFICIAL APPEARANCE']],
  },
  'mustang-357': {
    appearances: [['OFFICIAL SCREENSHOT', 'Mustang marking and Duke Arms logo are visible', 'OFFICIAL APPEARANCE']],
  },
}

function officialMaterial(weapon) {
  return /rockstar|official|trailer|extended look|screenshot|ultimate/i.test(`${weapon?.sourceName || ''} ${weapon?.association || ''}`)
}

export function weaponBible(weapon) {
  const context = CONTEXT[weapon?.slug] || {}
  const evidenceLevel = weapon?.status === 'rumour'
    ? 'DEVELOPMENT MATERIAL'
    : OFFICIAL_NAME_SLUGS.has(weapon?.slug)
      ? 'OFFICIALLY NAMED'
      : weapon?.status === 'verified' || officialMaterial(weapon)
        ? 'OFFICIAL APPEARANCE'
        : 'IDENTIFIED'

  const evidenceMeaning = {
    'OFFICIALLY NAMED': 'Rockstar or publisher material gives the weapon its GTA VI name.',
    'OFFICIAL APPEARANCE': 'Visible in Rockstar footage or imagery; the exact GTA name may still be inferred.',
    IDENTIFIED: 'Community identification based on shape, markings or continuity with earlier GTA models.',
    'DEVELOPMENT MATERIAL': 'Supported mainly by leaked or pre-release development material.',
  }[evidenceLevel]

  return {
    evidenceLevel,
    evidenceMeaning,
    nameState: evidenceLevel === 'OFFICIALLY NAMED' ? 'GTA name published' : 'Database label / name not independently published',
    realWorldInspiration: REAL_WORLD_INSPIRATIONS[weapon?.slug] || 'Not catalogued as a verified real-world analogue.',
    owner: context.owner || weapon?.character || 'No owner published for this weapon.',
    variant: context.variant || weapon?.content || 'No personalised or variant name published.',
    customisation: context.customisation || 'No weapon-specific modification package published.',
    concealability: 'Not published for this weapon.',
    carrySlot: 'Not published for this weapon.',
    npcReaction: 'Not published for this weapon.',
    ammunition: 'Calibre, ammunition and capacity are not published for this weapon.',
    storage: 'Vehicle/Ammu-Nation storage rules are not published for this weapon.',
    sellers: 'Seller, price and unlock conditions are not published for this weapon.',
    illegalAvailability: 'Illegal/contraband status is not published for this weapon.',
    appearances: context.appearances || [[weapon?.sourceName || 'ARCHIVE RECORD', 'Source attached to this entry; no frame-by-frame strip published yet.', evidenceLevel]],
    systemNote: 'GTA VI preview material describes limited carry slots, visible long guns, vehicle/Ammu-Nation storage, physical pickups and a Weapons / Items inventory split. Individual rules remain unknown unless sourced directly.',
  }
}

