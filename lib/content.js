// LEONIDA ARCHIVE — local structured data.
// Content is separated from components so a real API/CMS can replace it later.
// Allowed statuses: 'confirmed' | 'verified' | 'analysis' | 'rumour'

// Material oficial de GTA VI, servido localmente a partir de public/media.
// Gerado por scripts/gerar-media.js a partir dos originais em media6 — os
// nomes descrevem o que a imagem mostra, para não se voltar a atribuir uma
// fotografia a um sítio só porque a chave se chamava assim.
export const IMG = {
  // Arte oficial
  keyArt: '/media/key-art/jason-lucia-car.webp',
  keyArtPier: '/media/key-art/jason-lucia-pier.webp',
  keyArtBeach: '/media/key-art/jason-lucia-beach.webp',
  keyArtRobbery: '/media/key-art/jason-lucia-robbery.webp',
  keyArtMotel: '/media/key-art/jason-lucia-motel.webp',
  coverArt: '/media/key-art/cover.webp',

  // Lugares — postais oficiais «Visit Leonida»
  viceCity: '/media/places/vice-city.webp',
  ambrosia: '/media/places/ambrosia.webp',
  grassrivers: '/media/places/grassrivers.webp',
  leonidaKeys: '/media/places/leonida-keys.webp',
  mountKalaga: '/media/places/mount-kalaga.webp',
  portGellhorn: '/media/places/port-gellhorn.webp',

  // Lugares — capturas de jogo
  ambrosiaBikers: '/media/scenes/ambrosia-bikers.webp',
  ambrosiaNight: '/media/scenes/ambrosia-night.webp',
  ambrosiaCouple: '/media/scenes/ambrosia-couple.webp',
  ambrosiaSunset: '/media/scenes/ambrosia-sunset.webp',
  ambrosiaDrive: '/media/scenes/ambrosia-drive.webp',
  ambrosiaParty: '/media/scenes/ambrosia-party.webp',
  swampStilts: '/media/scenes/swamp-stilts.webp',
  swampAirboat: '/media/scenes/swamp-airboat.webp',
  swampChase: '/media/scenes/swamp-chase.webp',
  swampSkyline: '/media/scenes/swamp-skyline.webp',
  swampGator: '/media/scenes/swamp-gator.webp',
  keysStreet: '/media/scenes/keys-street.webp',
  keysBar: '/media/scenes/keys-bar.webp',
  tattooNeon: '/media/scenes/tattoo-neon.webp',
  tattooBack: '/media/scenes/tattoo-back.webp',
  ultimatePalms: '/media/scenes/ultimate-palms.webp',

  // Personagens
  luciaCaminos: '/media/characters/lucia-caminos.webp',
  jasonDuval: '/media/characters/jason-duval.webp',
  calHampton: '/media/characters/cal-hampton.webp',
  boobieIke: '/media/characters/boobie-ike.webp',
  drequanPriest: '/media/characters/drequan-priest.webp',
  raulBautista: '/media/characters/raul-bautista.webp',
  brianHeder: '/media/characters/brian-heder.webp',
  realDimez: '/media/characters/real-dimez.webp',

  // Veículos
  stanierNight: '/media/vehicles/stanier-night.webp',
  stanierCrew: '/media/vehicles/stanier-crew.webp',
  stanierSide: '/media/vehicles/stanier-side.webp',
  stanierTail: '/media/vehicles/stanier-tail.webp',
  deviantFlag: '/media/vehicles/deviant-flag.webp',
  greenCoupe: '/media/vehicles/green-coupe.webp',

  // Veículos das edições — capturas oficiais da Rockstar, tiradas da galeria
  // de rockstargames.com/VI. São as únicas imagens do arquivo em que se sabe
  // qual é o veículo: a Rockstar nomeia-o na própria legenda da imagem.
  grottiCheetah: '/media/vehicles/grotti-cheetah.webp',
  grottiCheetahRear: '/media/vehicles/grotti-cheetah-rear.webp',
  vapidGanado: '/media/vehicles/vapid-ganado.webp',
  shitzuSqualo: '/media/vehicles/shitzu-squalo.webp',
  shitzuSqualoBay: '/media/vehicles/shitzu-squalo-bay.webp',
  vapidStanier55: '/media/vehicles/vapid-stanier-55.webp',
  vapidStanier55Detail: '/media/vehicles/vapid-stanier-55-detail.webp',
  dominatorBuggy: '/media/vehicles/dominator-buggy.webp',
  dominatorBuggyInterior: '/media/vehicles/dominator-buggy-interior.webp',
  wymanSirius: '/media/vehicles/wyman-sirius.webp',
  wymanCollection: '/media/vehicles/wyman-collection.webp',
  safehouseVehicles: '/media/vehicles/safehouse-vehicles.webp',
  rideoutCustoms: '/media/vehicles/rideout-customs.webp',

  // Armamento e equipamento
  weaponPattern: '/media/gear/weapon-pattern.webp',
  pistolPalms: '/media/gear/pistol-palms.webp',
  oceanView: '/media/gear/ocean-view.webp',

  // Armas das edições — também da galeria oficial, e igualmente as únicas
  // em que a Rockstar diz o que se está a ver.
  morganRevolvers: '/media/gear/morgan-revolvers.webp',
  weaponVariants: '/media/gear/weapon-variants.webp',
  weaponPatternVintage: '/media/gear/weapon-pattern-vintage.webp',

  // Edições — as capturas com que a Rockstar ilustra os itens da Ultimate e
  // do Vintage Vice City Pack. Guardadas à parte porque a página de edições
  // as usa como catálogo, e não como retrato de uma entrada da base.
  edGrottiCheetah: '/media/editions/grotti-cheetah.webp',
  edMorganRevolvers: '/media/editions/morgan-revolvers.webp',
  edWeaponVariants: '/media/editions/weapon-variants.webp',
  edSafehouseVehicles: '/media/editions/safehouse-vehicles.webp',
  edGanadoRetroBuild: '/media/editions/ganado-retro-build.webp',
  edShitzuSqualo: '/media/editions/shitzu-squalo.webp',
  edDominatorBuggy: '/media/editions/dominator-buggy.webp',
  edRideoutCustoms: '/media/editions/rideout-customs.webp',
  edOneEyedWillies: '/media/editions/one-eyed-willies.webp',
  edElectricFangTattoo: '/media/editions/electric-fang-tattoo.webp',
  edStock305: '/media/editions/stock-305.webp',
  edGoodtimeGear: '/media/editions/goodtime-gear.webp',
  edClassicCarCollection: '/media/editions/classic-car-collection.webp',
  edVapidStanier55: '/media/editions/vapid-stanier-55.webp',
  edVintageWeaponPattern: '/media/editions/vintage-weapon-pattern.webp',

  // Criadores — retratos públicos associados aos respetivos canais/perfis.
  // Mantidos locais para que os dossiês não dependam de hotlinks de redes sociais.
  davyJones: '/media/creators/davy-jones.jpg',
  tgg: '/media/creators/tgg.jpg',
  elRubius: '/media/creators/el-rubius.jpeg',
  mikeShowSha: '/media/creators/mikeshowsha.jpg',
  docksCrew: '/media/gear/docks-crew.webp',
}

// Editorial summary supplied by the user about the "Extended Look".
// It is an archive/community source: its facts need source context and must
// never be represented as a Rockstar statement on their own.
export const extendedLookBrief = {
  label: 'Extended Look summary',
  sourceName: 'User-supplied summary · GTA Wiki',
  sourceType: 'community',
  releaseDate: 'November 19, 2026',
  platforms: ['PlayStation 5', 'Xbox Series X|S'],
  engine: 'RAGE',
  timeline: 'c. 2026 · HD Universe',
  developer: 'Rockstar Studios',
  publisher: 'Rockstar Games',
  setting: 'State of Leonida',
  languages: ['English', 'French', 'Italian', 'German', 'Spanish', 'Japanese', 'Russian', 'Polish', 'Brazilian Portuguese', 'Traditional Chinese', 'Simplified Chinese', 'Latin American Spanish', 'Korean'],
  protagonists: ['Lucia Caminos', 'Jason Duval'],
  editions: ['Standard Edition', 'Ultimate Edition'],
  preorder: 'Vintage Vice City Pack',
  editionContext: {
    standard: 'The supplied GTA Wiki reference lists the Standard Edition at US$80 / £70 / €80.',
    ultimate: 'It lists the Ultimate Edition at US$100 / £90 / €100 and describes additional digital content, including clothing, stores and side missions.',
    preorder: 'The same reference says orders placed before November 20, 2026 include one month of GTA+ and the Vintage Vice City Pack.',
    format: 'It describes the Standard Edition as a code-in-box product, while both editions are sold digitally. Treat availability and pricing as community-supplied retail context.',
  },
  releaseHistory: [
    ['February 2022', 'Rockstar confirms that the next Grand Theft Auto is in active development.'],
    ['December 2023', 'Trailer 1 confirms the Grand Theft Auto VI title.'],
    ['May 2025', 'The release target moves to May 26, 2026; Trailer 2 follows days later.'],
    ['November 2025', 'The scheduled date changes to November 19, 2026.'],
    ['June 2026', 'The supplied GTA Wiki reference dates the cover-art reveal to June 18 and the edition update to June 24.'],
    ['August 2026', 'The supplied summary lists an Extended Look presentation on August 27.'],
  ],
  mediaNote: 'The supplied summary describes the Extended Look as a 26-minute presentation combining gameplay, cutscenes and cinematic footage.',
  synopsis: 'After an easy score goes wrong, Lucia and Jason are pulled into a conspiracy that reaches across Leonida. Getting out means crossing the state and relying on each other.',
  scopeNote: 'The supplied summary blends official references with community descriptions and interpretations. Unverified material is not presented as confirmation.',
}

// Structured from the GTA Wiki page supplied by the user and extracted on
// September 1, 2026. This is a navigation layer for the archive, not a mirror
// of the Wiki: every sentence rendered by the site is editorially rewritten.
export const gtaWikiPageLedger = {
  sourceName: 'GTA Wiki · community reference',
  sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
  extractedAt: 'September 1, 2026',
  sections: ['Plot', 'Setting', 'Editions', 'Development', 'Trailer chronology', 'Leaks & misinformation', 'Music claims', 'Gallery & trailers', 'Reception', 'Trivia'],
  gallery: {
    characters: ['Jason Duval', 'Lucia Caminos', 'Cal Hampton', 'Boobie Ike', 'Dre’Quan Priest', 'Real Dimez', 'Raul Bautista', 'Brian Heder'],
    locations: ['Vice City', 'Leonida Keys', 'Port Gellhorn', 'Ambrosia', 'Grassrivers', 'Mount Kalaga'],
    trailers: ['Grand Theft Auto VI Trailer 1', 'Grand Theft Auto VI Trailer 2'],
  },
  reception: 'The page records Most Anticipated Game wins at The Game Awards in 2024 and 2025.',
  caution: 'The page itself asks editors not to add speculative material. Leak footage, music rumours and inferred lore remain context only in this archive.',
}

export const settingReferences = [
  { name: 'Vice-Dale County', detail: 'Home to Vice City and the named areas La Perle, Stockyard, Tequesta and Vice Beach.', source: 'GTA Wiki reference' },
  { name: 'Kelly County', detail: 'Associated with Port Gellhorn.', source: 'GTA Wiki reference' },
  { name: 'Mariana County', detail: 'Associated with Grassrivers and Leonida Keys.', source: 'GTA Wiki reference' },
  { name: 'Ambrosia County', detail: 'Associated with Ambrosia and Leonida’s sugar industry.', source: 'GTA Wiki reference' },
  { name: 'Leonard County', detail: 'Named as the county of Waning Sands; it is not positioned in this archive.', source: 'GTA Wiki reference' },
  { name: 'Lummox County', detail: 'Named in the supplied GTA Wiki reference; no region or map placement is added here.', source: 'GTA Wiki reference' },
]

// Claims from the GTA Base feature roundup supplied by the user.  These are
// deliberately separated from direct Rockstar material: its roundup combines
// trailers, screenshots, announcements and leaks.
export const featureBriefs = {
  map: {
    source: 'GTA Base feature roundup · secondary source',
    confirmed: ['Leonida, Vice City, Grassrivers, Leonida Keys, Port Gellhorn, Ambrosia and Mount Kalaga National Park are named in the roundup.', 'Six counties are listed: Vice-Dale, Ambrosia, Kelly, Leonard, Mariana and Lummox.'],
    reported: ['Wildlife, underwater exploration, enterable interiors and landmark counts are described in the roundup, but should not be read as a complete official map specification.', 'Map-size estimates and shop-count claims remain unconfirmed in this archive.'],
  },
  characters: {
    source: 'GTA Base feature roundup · secondary source',
    confirmed: ['Jason Duval and Lucia Caminos are the two named playable leads in the supplied material.', 'Cal Hampton, Brian Heder, Boobie Ike, Dre’Quan Priest, Raul Bautista and Real Dimez are listed as supporting characters.'],
    reported: ['The selection-wheel modes, special abilities, chapters and individual activity lists are reported features; they are not marked official here.'],
  },
  combat: {
    source: 'GTA Base feature roundup · trailers, screenshots and leaks combined',
    confirmed: ['The roundup identifies weapons, equipment and a revised inventory interface across the supplied material.'],
    reported: ['Carry limits, healing items, stealth options, police recognition and drive-by variants are reported details. They require direct official confirmation before being promoted to confirmed status.'],
  },
  mechanics: {
    source: 'GTA Base feature roundup · trailers, screenshots and leaks combined',
    confirmed: ['The roundup points to richer character rendering, dense city scenes, social-media imagery and vehicle interaction in released material.'],
    reported: ['Ray tracing modes, hair growth, fitness effects, dialogue prompts, reputation systems and cinematic tools remain reported or inferred here.'],
  },
  vehicles: {
    source: 'GTA Base feature roundup · trailers, screenshots and leaks combined',
    confirmed: ['Cars, motorcycles, aircraft and boats are represented in the supplied media summary.'],
    reported: ['Fuel, repair, storage, dealership, transit and detailed interior systems are treated as reported features, not confirmed gameplay specifications.'],
  },
  online: {
    source: 'GTA Base feature roundup · speculation',
    confirmed: [],
    reported: ['A new GTA Online experience, progression transfer, roleplay tools and loyalty rewards are speculative. The archive does not describe any of them as announced.'],
  },
}

// Direct Rockstar catalog names, researched from the official editions and
// support pages on September 1, 2026. This deliberately stays smaller than
// community vehicle/weapon lists: Rockstar has not published a full base-game
// catalogue for either class.
export const officialCatalog = {
  sourceName: 'Rockstar Games · GTA VI Editions',
  sourceUrl: 'https://www.rockstargames.com/VI/editions',
  weapons: ['Girardi ES9', 'Klose K17', 'Hawk & Little Morgan Revolver', 'Personalized Weapon Variants', 'Vintage Vice City Pack: Exclusive Weapon Pattern'],
  vehicles: ['’55 Vapid Stanier Sedan and Garage', '’95 Grotti Cheetah', 'Dinka Enduro', 'Crest Kayak', 'Vapid Ganado', 'Ganado Retro Build', 'Shitzu Squalo', '’67 Vapid Dominator Buggy and Paradise Garage', 'Classic Car Collection'],
  mechanics: ['Ultimate Edition items are described as unlocking across chapters of Jason and Lucia’s story.', 'Standard Edition owners can buy the Ultimate Edition Upgrade after redeeming their digital code.', 'Pre-load begins at local midnight on November 12, 2026 for eligible redeemed codes and digital pre-orders.'],
  note: 'These are the named official edition and pre-order items, not a complete base-game roster. Rockstar has not published a full vehicle, weapon or gameplay-mechanics catalogue.',
}

// ---------------- EDITIONS ----------------
// Tudo aqui vem da Rockstar: página de edições, apoio ao cliente e fichas de
// produto da PlayStation e da Xbox. Nada de retalhistas, fugas ou fóruns. Os
// preços são os anunciados pela Take-Two em dólares — as tabelas por país
// mudam com o câmbio e com o imposto, e não é isso que um arquivo documenta.
// O que a Rockstar NÃO disse está na lista `notAnnounced`, e está lá de
// propósito: numa página de edições, o que não vem na caixa engana tanto
// como o que vem.
export const editions = {
  sourceName: 'Rockstar Games · GTA VI editions & support',
  sourceUrl: 'https://www.rockstargames.com/VI/editions',
  supportUrl: 'https://support.rockstargames.com/VI',
  updatedAt: '2026-09-01',

  releaseDate: 'November 19, 2026',
  preOrdersOpened: 'June 25, 2026',
  preloadDate: 'November 12, 2026',
  bonusDeadline: 'November 20, 2026',
  platforms: ['PlayStation 5', 'PlayStation 5 Pro — enhanced', 'Xbox Series X', 'Xbox Series S'],
  unsupported: ['PlayStation 4', 'Xbox One'],
  players: 'Single player. Both storefronts list GTA VI as a one-player game with offline play.',

  tiers: [
    {
      id: 'standard',
      name: 'STANDARD EDITION',
      price: '$79.99',
      formats: 'Digital, or physical code-in-box',
      summary: 'The complete game. Rockstar has not said that any part of the campaign is held back from it — what Ultimate adds is extra content, not missing chapters.',
      includes: [
        ['Grand Theft Auto VI', true],
        ['Vintage Vice City Pack — qualifying purchase', true],
        ['One month of GTA+ — qualifying digital purchase', true],
        ['Physical code-in-box release', true],
        ['Game disc in the box', false],
        ['Ultimate Edition content', false],
      ],
    },
    {
      id: 'ultimate',
      name: 'ULTIMATE EDITION',
      price: '$99.99',
      formats: 'Digital only',
      summary: 'The same base game plus the Ultimate Edition Upgrade. Rockstar says its items are uncovered behind each chapter rather than handed over at once.',
      includes: [
        ['Grand Theft Auto VI', true],
        ['Ultimate Edition Upgrade — 16 items below', true],
        ['Vintage Vice City Pack — qualifying purchase', true],
        ['One month of GTA+ — qualifying digital purchase', true],
        ['Physical release of any kind', false],
        ['Early access to the game', false],
      ],
    },
  ],

  upgrade: {
    name: 'ULTIMATE EDITION UPGRADE',
    note: 'Standard owners are not locked out. The Upgrade is sold separately on the PlayStation and Microsoft stores, and requires the base game — it cannot be played on its own. Buyers of the physical Standard Edition can purchase it after redeeming their download code.',
  },

  vintagePack: {
    name: 'VINTAGE VICE CITY PACK',
    who: 'Standard and Ultimate alike, on any pre-order or purchase made before November 20, 2026 — release day included.',
    items: [
      ['’55 Vapid Stanier Sedan and garage', 'edVapidStanier55'],
      ['Vintage outfits', null],
      ['Vintage hairstyles', null],
      ['Exclusive weapon pattern', 'edVintageWeaponPattern'],
    ],
  },

  gtaPlus: {
    name: 'ONE MONTH OF GTA+',
    who: 'Qualifying digital purchases of either edition before November 20, 2026. Rockstar’s breakdown of the physical version does not include it.',
    notes: [
      'Redeemable straight away — there is no need to wait for November.',
      'One redemption per platform account. Refunding and re-buying does not earn a second month.',
      'It is a subscription promotion: after the free month it renews monthly at the usual price until cancelled.',
    ],
  },

  // Os 16 itens que a Rockstar lista para a Ultimate. Onde há imagem, é a
  // captura oficial da própria galeria — não uma aproximação nossa.
  ultimateItems: [
    ['’95 GROTTI CHEETAH', 'Vehicle', 'A 1990s Grotti sports car in a minimalist retro-futuristic livery, presented as a tribute to Shore Drive. Rockstar indicates it becomes relevant later in the game rather than arriving at the start.', 'edGrottiCheetah'],
    ['HAWK & LITTLE MORGAN REVOLVERS', 'Weapons', 'A matched pair of powerful revolvers in classic Vice City styling, tied to the Vercetti Estate — palm-tree engraving on the grip, ornamental detailing and a top sight.', 'edMorganRevolvers'],
    ['PERSONALIZED WEAPON VARIANTS', 'Weapons', 'Engraved variants of the protagonists’ own sidearms: Jason’s Girardi ES9 and Lucia’s Klose K17. The official image is where both names can be read on the weapons themselves.', 'edWeaponVariants'],
    ['JASON’S SAFEHOUSE VEHICLES', 'Vehicles', 'Exclusive vehicles at Jason’s safehouse. Two are named: a military-styled Dinka Enduro motorcycle and a Crest Kayak — which puts a paddled boat in the advertised roster.', 'edSafehouseVehicles'],
    ['GANADO RETRO BUILD', 'Vehicle build', 'A retro build for Jason’s well-used Vapid Ganado low-riding pickup, adding muscle and classic styling.', 'edGanadoRetroBuild'],
    ['SHITZU SQUALO', 'Boat', 'A pink-and-blue gradient Squalo docked at Washington Beach, put forward for fishing in Gambit Bay — and carrying an explosives-loaded weapons crate.', 'edShitzuSqualo'],
    ['’67 VAPID DOMINATOR BUGGY', 'Vehicle and garage', 'A cut-down ’67 muscle car for the backcountry, hills and forests around Mount Kalaga, associated with the Mud Club. It arrives with the Paradise Garage in Watson Bay.', 'edDominatorBuggy'],
    ['PARADISE GARAGE', 'Property', 'Part of the Dominator Buggy bonus, and the most mechanical thing in the list: a weapon locker, and a secure place to deposit stolen goods so they can later be fenced.', null],
    ['RIDEOUT CUSTOMS', 'Destination', 'A mod shop that transforms ordinary vehicles with detailed interiors, premium rims and donk styling.', 'edRideoutCustoms'],
    ['ONE-EYED WILLIE’S', 'Destination', 'A mod shop at Lake Leonida specialising in off-road modifications and hand-painted automotive artwork — a different trade from Rideout Customs.', 'edOneEyedWillies'],
    ['ELECTRIC FANG TATTOO', 'Destination', 'A tattoo parlour in Stockyard offering more than 50 signature tattoos for Jason and Lucia, designed by the real-world artist collective FAILE.', 'edElectricFangTattoo'],
    ['SARA’S UNISEX SALON', 'Destination', 'Appearance work for both protagonists — facial-hair styles for Jason, makeup and nails for Lucia, and signature salon looks.', null],
    ['STOCK 305', 'Destination', 'Elevated streetwear in Stockyard, with looks exclusive to the edition.', 'edStock305'],
    ['GOODTIME GEAR', 'Apparel', 'A capsule collection built around Macca the Alligator, a character from the in-universe Goodtime State television show.', 'edGoodtimeGear'],
    ['PTT YOUNGIN$ COMPOUND', 'Activity', 'The compound of one of Southside Vice City’s loudest gangs, which can be raided. Escaping successfully awards special items and distinct contraband.', null],
    ['CLASSIC CAR COLLECTION', 'Activity', 'Tracking down abandoned classics and unfinished project cars and restoring them, for Wyman — an eccentric collector and local fixer.', 'edClassicCarCollection'],
  ],

  physical: [
    'The box holds a download code, not a disc. Rockstar calls it a code-in-box release, and there is no Blu-ray inside.',
    'Physical copies are expected to ship and reach retailer pickup on November 12, 2026 — a week before launch. Codes can be redeemed as soon as they arrive.',
    'Only the Standard Edition exists physically. Physical buyers who want the Ultimate content redeem their code first, then buy the Upgrade.',
  ],

  preload: 'Pre-loading opens at local midnight on November 12, 2026, seven days before release. It is a download window, not early play.',

  // Estas são as que mais valem a pena dizer: são as suposições habituais
  // sobre edições premium, e nenhuma foi anunciada.
  notAnnounced: [
    'Early access of any length — both editions launch on November 19.',
    'A Collector’s, Deluxe, Premium or Steelbook edition.',
    'A physical Ultimate Edition, or a disc inside any box.',
    'A PC version, PC release date or PC pre-orders.',
    'In-game cash, XP boosts, faster progression or Shark Cards with Ultimate.',
    'Exclusive story chapters, endings, season passes or paid DLC in Ultimate.',
    'Cross-play, cross-save or cross-platform entitlement between PlayStation and Xbox.',
    'A GTA Online component tied to these editions — both storefronts list the game as single player.',
  ],
}

// SITE_COUNTERS é definido no fim do ficheiro, depois dos dados que conta.

// ---------------- ARTICLES ----------------
export const articles = [
  {
    slug: 'november-19-2026-the-date-that-stuck',
    title: 'NOVEMBER 19, 2026: THE DATE THAT STUCK',
    category: 'official', status: 'confirmed',
    sourceName: 'Rockstar Newswire', sourceUrl: 'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5,
    image: IMG.keyArtPier, featured: true, views: 0,
    excerpt: 'Three dates were announced before this one. Here is the sequence, and what each move actually told us.',
    body: [
      'The launch has been moved twice in public. The first trailer, in December 2023, pointed at 2025 without naming a day. In May 2025 that became 26 May 2026. In November 2025 it moved again, to Thursday 19 November 2026, which is where it stands.',
      'Rockstar gave the same reason both times: more time to finish the game to the standard it expects. That is a short statement, but the shape of the slips is informative — each one moved the date by roughly six months rather than a fortnight, which is the profile of scope work rather than of last-minute polish.',
      'A second date matters for anyone buying a box. Physical copies are dated a week earlier than the digital launch, on 12 November 2026, and what is in the box is a download code rather than a disc.',
    ],
  },
  {
    slug: 'vice-city-by-neighbourhood',
    title: 'VICE CITY, BY NEIGHBOURHOOD',
    category: 'official', status: 'confirmed',
    sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5,
    image: IMG.viceCity, featured: false, views: 0,
    excerpt: 'Four districts named officially, and what each one is actually for.',
    body: [
      'Rockstar has named four parts of Vice City directly, and they are deliberately unalike. Ocean Beach is the postcard: art deco frontage in pastel, white sand, the version of the city that sells itself. Little Cuba is the working counterweight, a neighbourhood whose bakeries are the landmark.',
      'The Tisha-Wocka flea market is where the city admits what it is — stalls of brands that are nearly the real thing, sold to people who know. It is the most honest place on the list precisely because nothing in it is genuine.',
      'VC Port anchors the other end: promoted as the cruise capital of the world, which makes it simultaneously the city’s shop window and its loading bay. Every district on this list is a different answer to the same question about where the money comes from.',
      'The framing matters for an archive. These four are confirmed by name; the rest of the map, here and elsewhere, is reconstruction — and it is labelled as such.',
    ],
  },
  {
    slug: 'what-you-actually-get-in-each-edition',
    title: 'WHAT YOU ACTUALLY GET IN EACH EDITION',
    category: 'analysis', status: 'analysis',
    sourceName: 'User-supplied summary · GTA Wiki', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6,
    image: IMG.stanierSide, featured: false, views: 0,
    excerpt: 'The supplied summary lists two editions and a pre-order bonus. Here is the distinction without adding unverified extras.',
    body: [
      'The supplied GTA Wiki reference lists a Standard Edition at US$80 / £70 / €80 and an Ultimate Edition at US$100 / £90 / €100. It describes the latter as adding digital content, including clothing, stores and side missions. These are source-attributed retail details, not prices verified by this archive.',
      'It also names the Vintage Vice City Pack as a pre-order bonus, alongside one month of GTA+. Earlier supplied material describes the pack with clothing, weapon customisation and a ’55 Stanier stored at Shore Court Garage.',
      'The reference sets the pre-order window through November 20, 2026 and distinguishes a code-in-box Standard Edition from digital sales. Regional availability, final contents and prices should always be checked against the relevant official store before purchase.',
    ],
  },
  {
    slug: 'thirty-frames-and-a-map-three-times-over',
    title: 'THIRTY FRAMES, AND A MAP THREE TIMES OVER',
    category: 'official', status: 'confirmed',
    sourceName: 'Platform specifications', sourceUrl: 'https://www.playstation.com/en-us/games/grand-theft-auto-vi/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 4,
    image: IMG.swampSkyline, featured: false, views: 0,
    excerpt: 'The two numbers that describe the technical shape of Leonida — and why they belong together.',
    body: [
      'The game runs at 30 frames per second at launch, confirmed in August 2026. It arrives on PlayStation 5 and Xbox Series X|S only; there is no PlayStation 4 version, and the PS5 Pro gets an enhanced mode.',
      'The other number is the map. Leonida’s playable area is around three times the size of Red Dead Redemption 2’s, on the same engine lineage — RAGE — that has carried Rockstar’s open worlds since the last generation.',
      'Read together, the two numbers are one decision rather than two. A world at that scale, with that density of simulation, is what thirty frames buys on this hardware.',
    ],
  },
  {
    slug: 'two-trailers-and-the-numbers-behind-them',
    title: 'TWO TRAILERS, AND THE NUMBERS BEHIND THEM',
    category: 'analysis', status: 'analysis',
    sourceName: 'User-supplied summary · GTA Wiki', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5,
    image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'One trailer was forced out early. The other broke the records. Both are worth reading as events, not just footage.',
    body: [
      'The supplied chronology places Trailer 1 on December 4, 2023, after an early leak brought its release forward. It records the trailer as the first confirmation of the final title.',
      'It places Trailer 2 on May 6, 2025, shortly after the first delay announcement. It also records a high first-day viewing figure across platforms, but this archive does not independently verify audience metrics.',
      'The same chronology includes an Extended Look presentation in August 2026. Dates and media milestones are shown here as sourced context, not as a substitute for Rockstar’s own release record.',
    ],
  },
  {
    slug: 'extended-look-everything-revealed',
    title: 'EXTENDED LOOK: WHAT THE SUMMARY ADDS',
    category: 'analysis', status: 'analysis',
    sourceName: 'User-supplied summary · GTA Wiki', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-08-27', updatedAt: '2026-08-27', readTime: 12,
    image: IMG.ambrosiaParty, featured: true, views: 48210,
    excerpt: 'An organised read of the supplied summary: Leonida, the protagonists, the timeline and what still needs confirmation.',
    body: [
      'The summary places GTA VI in Leonida, within the HD Universe, with Lucia Caminos and Jason Duval at the centre of its story. It starts with a failed score that pulls them into a conspiracy larger than Vice City itself.',
      'It divides the state into counties and regions: Vice-Dale County includes Vice City; Kelly County is tied to Port Gellhorn; Mariana County groups Grassrivers and Leonida Keys; and Ambrosia County is associated with Ambrosia. Waning Sands is linked to Leonard County, without a confirmed position in this archive.',
      'It lists November 19, 2026 for PlayStation 5 and Xbox Series X|S, and names RAGE as the engine. It also dates the cover-art reveal to June 18 and the editions update to June 24. These are presented as facts from the supplied reference, not as a replacement for a direct Rockstar confirmation.',
      'The summary also combines announcements, promotional material and leak claims. This archive therefore uses only names and territorial context; gameplay details, map-size claims, edition content and leaked material remain unconfirmed until backed by an official source.',
    ],
  },
  {
    slug: 'gta-wiki-development-and-release-ledger',
    title: 'GTA VI: DEVELOPMENT & RELEASE LEDGER',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.coverArt, featured: false, views: 0,
    excerpt: 'A clear, source-attributed route from the 2022 development confirmation to the current release date.',
    body: [
      'The extracted GTA Wiki page traces the public record from Rockstar’s February 2022 development confirmation through the title reveal in Trailer 1 on December 4, 2023. It identifies Rockstar Studios as developer, Rockstar Games as publisher, and Leonida as the setting.',
      'Its chronology records the public target moving from 2025 to May 26, 2026 in May 2025, then to November 19, 2026 in November 2025. It also records a cover-art reveal on June 18, 2026 and an editions update on June 24.',
      'The page lists PlayStation 5 and Xbox Series X|S. It places the story in the HD Universe and names Lucia Caminos and Jason Duval as the two protagonists. These statements are retained as source-attributed reference data, with direct Rockstar sources taking priority whenever available.',
    ],
  },
  {
    slug: 'gta-wiki-media-gallery-and-reception',
    title: 'THE GTA WIKI MEDIA INDEX, SORTED',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5, image: IMG.keyArtMotel, featured: false, views: 0,
    excerpt: 'The supplied page’s screenshot, artwork, trailer and awards index—separated from rumour and reconstruction.',
    body: [
      'The extracted page groups promotional images around eight named characters: Jason, Lucia, Cal Hampton, Boobie Ike, Dre’Quan Priest, Real Dimez, Raul Bautista and Brian Heder. Its location gallery names Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers and Mount Kalaga.',
      'It also links Trailer 1 and Trailer 2, alongside official-style artwork and logo variants. This archive uses locally held promotional assets and labels them by subject; it does not hotlink or reproduce the Wiki’s gallery.',
      'For reception, the page records Most Anticipated Game wins at The Game Awards in 2024 and 2025. It also aggregates audience figures and music discussion around the trailers, which are preserved as attributed media context rather than archive-verified metrics.',
    ],
  },
  {
    slug: 'gta-wiki-claims-leaks-and-source-boundaries',
    title: 'WHY THE ARCHIVE LABELS LEAK CLAIMS',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5, image: IMG.oceanView, featured: false, views: 0,
    excerpt: 'The extracted page includes development leaks and music claims. Here is how they are kept visible without being mistaken for announcements.',
    body: [
      'The GTA Wiki page records a September 2022 development-footage leak and later alleged leaks in December 2023, January 2025 and November 2025. It also warns that fabricated footage has circulated. None of that material is used to populate confirmed mechanics, maps or databases here.',
      'Its music section includes a debunked trailer-song rumour and a reported licensing dispute. Those stories belong to the game’s public conversation, but they are not a soundtrack announcement and are therefore not presented as one.',
      'This is the archive rule: a source may be useful context without being direct confirmation. Every source badge and status label is designed to make that distinction visible at the point of reading.',
    ],
  },
  {
    slug: 'four-creators-rockstar-north-preview',
    title: 'THE FOUR CREATORS REPORTED AT ROCKSTAR NORTH',
    category: 'analysis', status: 'analysis',
    sourceName: 'Creator reports · secondary sources', sourceUrl: 'https://goranked.gg/en/news/creators-hands-off-gta-6-preview-edinburgh/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 4, image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'Davy Jones was one of four creators reported to have attended a pre–Extended Look session at Rockstar North.',
    body: [
      'Yes: Brazilian creator Davy Jones was reported as one of four guests at a Grand Theft Auto VI preview session at Rockstar North in Edinburgh before the Extended Look presentation. The other names consistently reported alongside him are TGG (The Gaming Gorilla) from Australia, El Rubius from Spain and Mike ShowSha from Italy.',
      'The reports describe a hands-off presentation rather than public access to an unfinished build. That distinction matters: attendance by creators can explain later commentary, but it does not turn every claim made in videos, posts or recaps into a Rockstar announcement.',
      'Rockstar’s public Extended Look material does not publish an attendee roster in the source record used by this archive. For that reason, this page files the four names as corroborated secondary reporting—not as an official Rockstar guest list.',
      'The archive will keep the names visible with that boundary attached. Direct Rockstar pages remain the source for release, edition, character and gameplay claims; creator visits are useful context for how preview coverage reached the public.',
    ],
  },
  {
    slug: 'creator-preview-record-how-to-read-it',
    title: 'CREATOR PREVIEW RECORD: HOW TO READ IT',
    category: 'analysis', status: 'analysis',
    sourceName: 'Creator preview recaps · secondary reporting', sourceUrl: 'https://www.gtavice.net/news/gta-6-youtuber-previews-reveal-even-more-gameplay-details',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.keyArtBeach, featured: false, views: 0,
    excerpt: 'A navigable index of the four reported Rockstar North creator sessions, with a strict boundary between a witnessed preview and an official product specification.',
    body: [
      'Davy Jones, TGG, El Rubius and MikeShowSha each described a separate Rockstar North demonstration, with Rob Nelson reportedly operating the game and adapting the route to their questions. Their accounts overlap in places but are not identical, which is why the archive keeps a page per creator rather than flattening them into a single claim list.',
      'These are authorised preview recollections, not leaked footage. They are still secondary reporting: a creator may recall a detail imperfectly, an interface may change before release, and a demonstration does not constitute a complete feature list. The public Extended Look and Rockstar support pages retain priority for direct confirmation.',
      'The shared picture in these reports is a world built around linked systems: vehicle condition and fuel, police information, robbery preparation, the two protagonists, world interactions and optional exploration. The individual dossiers record the specifics without promoting estimates—especially map scale, frame rate and unrevealed systems—to final specifications.',
      'Use the dossiers as a source ledger. Every entry tells readers who reported it, whether it was seen in a controlled demonstration or repeated by a recap, and what remains unknown. No unshown vehicle roster, weapon roster, mission list or map boundary is invented from these visits.',
    ],
  },
  {
    slug: 'creator-preview-systems-index',
    title: 'CREATOR PREVIEW SYSTEMS INDEX',
    category: 'analysis', status: 'analysis',
    sourceName: 'Creator preview recaps · secondary reporting', sourceUrl: 'https://www.gtavice.net/news/gta-6-youtuber-previews-reveal-even-more-gameplay-details',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 14, image: IMG.keyArtPier, featured: false, views: 0,
    excerpt: 'A cross-referenced, source-labelled index of systems reported by Davy Jones, TGG, El Rubius and MikeShowSha.',
    body: [
      'This index is not a “confirmed features” list. It groups observations made in four reported creator demonstrations at Rockstar North. A point is included only where a creator account or a named preview recap attributes it to the session; the individual creator records remain the primary archive entries for nuance and caveats.',
      'WORLD & ACCESS — Davy Jones described a world that opens widely after introductory missions, with ordinary enterable businesses, mission locations remaining usable, lobbies and routes to some rooftops. Rubius described a route through an apartment, plazas, beach, hotel and jewellery store. TGG added a zoo and a military base in his account. These observations do not prove universal building access or a final map layout.',
      'EXPLORATION & ACTIVITIES — Jones reported shipwreck diving, underwater treasure, collectibles, a scanner and gang compounds that can be approached openly or stealthily. TGG reported fishing, hunting, gyms, pool and wrestling. His fishing account describes catch-and-release and his gym account describes membership, consumables and optional progression. Exact activity availability, rewards and locations are unannounced.',
      'JASON & LUCIA — TGG described menu-based Criminal Profile and relationship states, messaging, dates and cooperation. MikeShowSha described the off-screen lead continuing their own activity and accepting context-sensitive instructions. Davy Jones described switching in vehicle combat; MikeShowSha reported a getaway where one drove while the other fired. These reports point to linked protagonists, not to unrestricted co-op or dual-player control.',
      'CRIMINAL PROFILE — TGG described it as a background-facing character-menu state instead of a permanent morality gauge, with professional crime and needless violence treated differently. He reported an extreme shattered state. MikeShowSha described tyre shots improving the profile in one pursuit. The archive does not claim to know every trigger, its final iconography or all narrative consequences.',
      'POLICE & EVIDENCE — Jones, TGG and Rubius all described law enforcement working from reported information: witnesses, cameras, a vehicle, clothing, face, weapons or both suspects. Jones described changing clothes and vehicles or splitting up as possible escape tactics; TGG described incomplete-information wanted stars. These are reported preview systems, not a published wanted-level rulebook.',
      'VEHICLES — Jones reported fuel, charging, weightier handling, damage consequences, scanners, theft tools, trackers and buyers. TGG described interaction menus, refuelling animation and police impound risk. MikeShowSha separately reported old versus modern theft methods, charging, and a role-switching escape. Their overlap supports the existence of a deeper vehicle loop, but not every timing, price, slot count or property claim seen in a demonstration build.',
      'ROBBERIES & LOOT — Jones described robberies whose employee reaction can change access to further cash. TGG reported bags with capacity affecting stolen-goods carrying and sales through fences. Rubius described pawn shops, social feeds that can lead to live NPCs, planned robberies and physical object persistence. MikeShowSha described dynamic jewellery-store events, masks, safes and CCTV. The range of targets and the behaviour of every store remain unconfirmed.',
      'COMBAT & EQUIPMENT — Jones reported a distinction between injuring, incapacitating and killing, limits on carried weapons and extra items in a vehicle. TGG described hit feedback, shoulder switching, Focus-based weak-point discovery, lootable defeated NPCs and police-car equipment. Rubius reported more graphic violence in the build he saw, but warned it could change. Weapon names, complete inventory rules and final gore settings are not established here.',
      'UI, PHONE & MEDIA — TGG reported a configurable HUD, fog-of-war map, quick waypoints, podcasts and a copyright-safe music option. Jones described story-evolving phones and an in-world vehicle-delivery service. Rubius described social livestreams connected to physical NPCs. These accounts identify directions for the interface but do not lock down every app, setting or final presentation.',
      'TECHNICAL LIMITS — Davy Jones, Rubius and MikeShowSha each described a base-PS5 demonstration at 30 FPS. Jones said a 60 FPS option was not confirmed in the conversation he reported; Rubius described the build as impressive but pre-release, with bugs and no complete first-person camera. The archive presents this as a snapshot of a preview session, not an immutable console specification.',
      'The useful conclusion is not that every reported feature is final. It is that the four accounts repeatedly point toward connected systems: a crime can generate evidence; evidence changes escape choices; a car’s condition, fuel and tracker change the getaway; and the outcome feeds back into money, inventory, relationship or profile state. That is the reported design direction—held at the appropriate source boundary.',
    ],
  },
  {
    slug: 'creator-preview-session-format-and-boundaries',
    title: 'HOW THE FOUR CREATOR SESSIONS WORKED',
    category: 'analysis', status: 'analysis',
    sourceName: 'Flow Games & creator preview reporting', sourceUrl: 'https://flowgames.gg/exclusivo-vimos-gta-6-de-perto-salto-maior-ja-visto/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'What the reporting establishes about the Rockstar North visits: separate sessions, creator-led questions, developer-operated gameplay and the boundary of a pre-release preview.',
    body: [
      'The four reported creator sessions were not a public playtest. Coverage from Davy Jones’s Flow Games visit describes him watching more than two hours of live gameplay and speaking with Rob Nelson, Rockstar North’s Head of Development and co-studio head. Reports covering the other three creators describe the same core setup: Nelson controlled the game while the guest directed questions and topics.',
      'This format explains the unusual shape of the information. A creator could ask to inspect a hotel, a vehicle, a robbery, a beach, a menu or a police pursuit, so individual accounts surface different details. They were not each given a complete tour, a final design document or independent unrestricted access to the build.',
      'The demonstrations also appear to have been staged separately. TGG’s record emphasises menus, activities, HUD and Criminal Profile; Rubius’s route focuses on an apartment, public spaces, beach, hotel and jewellery-store interactions; MikeShowSha’s record focuses on switching, random events and getaway systems; Davy Jones’s interview concentrates on the linked world systems and their design rationale.',
      'A developer-operated preview has strengths and limits. It can include direct answers from development leadership and show a system working in context, but it can also avoid unfinished areas, omit controls, skip failure states and leave the visitor dependent on memory. That is why the archive identifies these pages as creator preview reporting even when a recap says a developer answered a question.',
      'The correct reading order is therefore: Rockstar’s direct public material for official statements; the four creator dossiers for attributed observations and reported answers; and the systems index for cross-references. A detail appearing in one creator’s route should never be silently promoted into a complete game-wide promise.',
    ],
  },
  {
    slug: 'davy-jones-rockstar-north-preview-record',
    title: 'DAVY JONES: THE FLOW GAMES PREVIEW RECORD',
    category: 'analysis', status: 'analysis',
    sourceName: 'Davy Jones / Flow Games preview report', sourceUrl: 'https://flowgames.gg/exclusivo-vimos-gta-6-de-perto-salto-maior-ja-visto/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 15, image: IMG.davyJones, imageCredit: 'Davy Jones public X profile image', imageCreditUrl: 'https://x.com/DavyJonesRJ', featured: false, views: 0,
    excerpt: 'What the Brazilian creator said he was shown: scale, interiors, vehicles, police, progression, water exploration and the limits he reported.',
    body: [
      'Davy Jones reported watching more than two hours of a live demonstration at Rockstar North, with Rob Nelson answering questions. His account is the broadest creator record in this archive. It should be read as a reported preview of a pre-release build, rather than as a direct Rockstar technical sheet.',
      'On scale and access, the account says Vice City was described as roughly twice the size of GTA V’s Los Santos, with substantially more developed space outside the main city. It also says most of Leonida becomes accessible soon after the opening missions. These are comparative statements, not a published map measurement or a final boundary.',
      'For interiors, Jones reported ordinary businesses, mission venues that can remain visitable afterwards, building lobbies and routes to some rooftops. He also described a detailed second-hand store. This supports “more accessible interiors” as a preview observation; it does not establish that every building is enterable.',
      'His vehicle report includes fuel for combustion vehicles, charging for electric vehicles, heavier handling, consequential crash damage and a system for inspecting a car’s security before theft. He described tools such as entry tools and key cloning for different vehicle types, trackers that can alert police, specialist buyers and lower-value Pay ’n’ Spray sales. Exact prices, timers and availability can change before launch.',
      'On money and crime, Jones said carried cash and banked money were separate, with arrests risking the former. He described open-world robberies, vehicle theft, gang compounds and other activities as ways to earn money at points where the story may require funds. The archive records this as a claimed progression model—not as a confirmed mission economy.',
      'His police account describes crimes needing a witness, camera or other detection; police information that can include appearance, clothing, vehicle, weapons and a second suspect; and escape tactics based on changing appearance, abandoning an identified vehicle or separating the protagonists. It also describes search areas and less radar-led policing. The final wanted system’s exact rules remain unpublished.',
      'For combat and carrying, the report says players can distinguish injury, incapacitation and death; carry two handguns and two long guns; and use a vehicle trunk for additional clothing, equipment and weapons. It also says the Criminal Profile responds to how professionally or needlessly violently crime is committed, with possible story effects. Neither its full UI nor its story consequences have been publicly specified by Rockstar.',
      'Jones additionally reported optional fitness and body changes within each lead’s natural build, no automatic hair growth, diminishing returns from repeated painkiller use, underwater shipwrecks and treasure, a scanner, collectibles, dynamic population density, dynamic store robberies, evolving phones and a physical personal-vehicle delivery service. These are retained as creator-reported observations, not guarantees of final launch content.',
      'Finally, he said the preview did not show a complete first-person mode and that the build ran at 30 FPS on a base PlayStation 5. His report says a 60 FPS option was not confirmed. The archive deliberately does not convert that conversation into a permanent platform-performance promise.',
      'Jones also described cars and motorcycles running out of fuel, a low-fuel indicator that appears when needed rather than living permanently on the HUD, and charging points for electric vehicles. He reported hundreds of vehicles across cars, motorcycles and boats, with kayaks and electric scooters among the examples. None of this establishes a complete vehicle roster.',
      'His account further says vehicle condition affects more than appearance: engine damage can change handling, a rolled vehicle cannot simply be flipped upright as in GTA V, and damage can reduce a stolen vehicle’s resale value. He described scanning a target vehicle for its alarm, key requirement and tracker before attempting a theft—details that belong to the preview build rather than a final economy guide.',
      'On world systems, the report describes a dedicated team for pedestrian dialogue, population changing by time and location, and store robberies with different outcomes depending on how an employee reacts. It also says the campaign’s scale was compared to Red Dead Redemption 2 and that its pacing includes slower story moments. Both are reported developer statements, not a promise of a fixed campaign length or every store’s behaviour.',
      'The Flow Games account also says the weapon loadout is paired with a separate tools-and-items inventory, while a personal vehicle can temporarily hold conspicuous firearms and clothing. It describes NPCs reacting more strongly to a weapon held in the hands than one visibly carried, and physical changes tracked through calories, muscle, body fat and strength. Those menus and balancing values can change during the final months of development.',
      'For activities that were not present, the report says skateboarding and surfing were considered but were not planned as launch minigames in the build discussed. It also says the sport selection is more selective than GTA V’s. This is valuable negative information, but the archive does not extrapolate it into a complete catalogue of launch activities.',
      'The original Flow Games coverage lists the money-making examples discussed in the interview as banks, stores, fuel stations, financial businesses, opportunistic crimes, vehicle sales and valuables found in the world. It says carried cash can be lost on arrest whereas deposited money is shared by Jason and Lucia. Those examples show the reported intent to make money matter to progression; they are not a final mission or economy list.',
      'Its police example is equally specific: if both leads are wanted and split up, Nelson reportedly said attention can follow the other character and reduce the controlled character’s wanted level by one star. The same source stresses that a respray alone is not a universal solution if a rider’s appearance is already known. These are tactical examples from a preview explanation, not exhaustive evasion rules.',
    ],
  },
  {
    slug: 'tgg-rockstar-north-preview-record',
    title: 'TGG: THE THREE-HOUR PREVIEW RECORD',
    category: 'analysis', status: 'analysis',
    sourceName: 'TGG recap · secondary reporting', sourceUrl: 'https://www.gtavice.net/news/gta-6-youtuber-previews-reveal-even-more-gameplay-details',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 14, image: IMG.tgg, imageCredit: 'TGG public X video thumbnail', imageCreditUrl: 'https://x.com/TGGonYT', featured: false, views: 0,
    excerpt: 'The Gaming Gorilla’s reported free-roam demonstration: Criminal Profile, relationship systems, travel, HUD, robberies, activities and the map interface.',
    body: [
      'TGG said he spent around three hours at Rockstar North, including roughly two and a half hours watching a free-roam demonstration. His account supplies the densest set of smaller systems. It is a recollection of a curated session, and every point below remains creator-reported unless Rockstar has separately documented it.',
      'The centrepiece was a reported Criminal Profile for each protagonist. TGG said it is viewed in a character-menu area instead of a permanent on-screen morality bar; clean, controlled crimes could improve it while excessive violence could damage it. He further said the profile symbol can reach a shattered, irreversible state. The final effects on story, NPCs or content were not explained.',
      'He also described a relationship status for Jason and Lucia that is checked through the menu and shaped by interaction: messaging, saying goodnight, dates, walking together and working out. His report says that time together can affect coordination during robberies. The archive does not infer a dating simulator or a complete relationship score from those examples.',
      'TGG’s activity observations include catch-and-release fishing, hunting as a potential income stream, paid gym membership, gym changing rooms and consumables, optional workouts, and the three attributes Health, Stamina and Focus. He reported trains alongside other travel options and on-demand podcasts inside the radio interface.',
      'For interfaces, he described a phone visually integrated into the character’s hands, safehouse haircuts, weapon transfers between Jason and Lucia, shoulder switching, colour-coded hit outcomes, optional kill/crash cameras and Focus that can highlight vehicle weak points or valuables during a robbery. Those are interface observations from the preview build, not final accessibility commitments.',
      'TGG reported a wanted interface communicating what police know, including an identified car, camera evidence, clothing, appearance, weapons or two suspects. He described incomplete-information wanted stars, crimes with no detected witness potentially avoiding a wanted level, tyre-targeting police, and recovering a personal vehicle before impound. Exact thresholds and UI treatment can still change.',
      'His report also covers physical refuelling, cinematic driving, drive-throughs, grocery shopping, pool, wrestling, shop robberies and gang compounds. He described prepared robberies scaling from a quick hold-up to jobs with equipment, security, both protagonists and larger rewards. It does not prove every mapped shop will work identically.',
      'Finally, he described a customisable HUD, a 3D-style mini-map, satellite-style pause map, fog-of-war exploration, quick waypoints and vehicle interaction menus. He also cited a large military base near the Leonida Keys. This archive does not place that base on an invented map or turn the preview’s map-scale comparison into an official measurement.',
      'TGG additionally reported a visitable zoo and the ability to study zoo animals, wild animals and pets. His account says fishing is catch-and-release while hunting can generate money, although it did not establish a full wildlife, crafting or trading loop. These activities are listed as observed or described systems, not a final activity checklist.',
      'He said the radio includes on-demand podcasts and a copyright-safe music setting for streamers, and that houses are unlocked by story progression while garages can be bought. The report also describes the phone camera moving toward the physical handset, appearance changes at safehouses, and weapon hand-offs between the leads. Exact app lists, garage capacity and accessibility options remain unknown.',
      'His combat notes add faster pistols, aim assist rather than strong snap-to-target aiming, distinct hit colours, lootable defeated NPCs and the possibility of finding armour and a rifle in a police-car trunk. He also described bags of different capacities for stolen goods, with loot able to be stored in vehicles and sold to a fence. These are reported interactions, not a complete inventory specification.',
      'TGG’s report also places player choice inside small everyday interactions. It describes disposing of rubbish in bins, an unusual option involving NPC dog-waste bags, and Focus highlighting valuables during a jewellery-store job. These examples are deliberately kept as odd demonstration details: they illustrate interaction density but do not imply that every ambient object has the same functionality.',
      'For the map and travel layer, TGG described direct map access from the DualSense touchpad, nearby-point shortcuts without opening the full pause menu, detailed discovered-location information and several travel alternatives. His account does not provide routes, station lists, region boundaries or a final map image; the archive therefore keeps the official map-free approach rather than drawing unsupported geography.',
    ],
  },
  {
    slug: 'el-rubius-rockstar-north-preview-record',
    title: 'EL RUBIUS: THE PERSONALISED PREVIEW RECORD',
    category: 'analysis', status: 'analysis',
    sourceName: 'El Rubius recap · secondary reporting', sourceUrl: 'https://insertfuture.com/en/article/rubius-rockstar-north-gta-6-gameplay-details',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 12, image: IMG.elRubius, imageCredit: 'El Rubius author portrait · Planeta de Libros', imageCreditUrl: 'https://www.planetadelibros.com.co/autor/rubius/000040361', featured: false, views: 0,
    excerpt: 'A creator-directed route through an apartment, Vice City, a hotel and a jewellery store—with interaction, violence, social feeds and partner coordination among the reported details.',
    body: [
      'El Rubius said his two-hour-plus visit was a personalised hands-off route: Rob Nelson held the controller and asked what he wanted to inspect. He reported starting in a Jason-and-Lucia apartment, moving through plazas and beaches, entering a hotel and visiting a jewellery store. The route is useful context for his observations, not a promise that every session or building plays the same way.',
      'He described controllable flips and dive poses when jumping into water, purchasable cigarettes that restore some Focus, and a broad NPC interaction system with more substantial conversation than simple greetings. He also said players can ask an owner before petting a dog, with different reactions depending on the NPC and animal.',
      'Rubius said the beach crowds shown publicly were comparable in the base-PS5 demonstration. He also reported no child NPCs in the slice he saw. Both are preview observations: density can vary by place, time and final optimisation, while one observed population slice is not a formal NPC policy.',
      'His most graphic report was dismemberment: he said the demonstration showed a shotgun decapitation and limb damage, but he expressly cautioned that pre-release gore may change. He also described carrying NPC bodies, placing them in car trunks and letting one protagonist hide in a trunk while the other drives. The archive preserves the caution alongside the claim.',
      'For crime and equipment, he reported pawn shops as outlets for stolen goods, limits on carried large weapons with vehicle storage and Ammu-Nation lockers, dropped weapons persisting in the world, high-end stolen-car trackers needing removal, planned jewellery and convenience-store robberies, and social-media livestreams that can lead to real NPCs in the world.',
      'Rubius also reported natural movement through an enterable hotel to reach a rooftop helicopter, relationship-based robbery coordination, police remembering whether the pair acted together, and a preview build without a complete first-person camera. Rockstar reportedly did not promise whether that camera could arrive later; this is not treated as a final-mode announcement.',
      'His account adds that large weapons can be left in vehicle storage or Ammu-Nation lockers while dropped weapons stay physically in the environment. He also described vehicle trackers on expensive stolen cars, a social feed whose livestreams can be followed to the NPC broadcasting them, and robbery preparation shaped by tools, security, police response and bystanders.',
      'The archive records Rubius’s direct warning too: the build showed small animation bugs and a busy interface at points, and he was not offered a final technical specification. That is why the page treats every feature above as a preview observation rather than a launch guarantee.',
      'Rubius also repeated a reported scale comparison that placed the wider map around three times the size of Red Dead Redemption 2. The archive retains the exact context—an alleged statement during a creator demo—but rejects it as a measurable final-map fact. Neither a final playable boundary nor a standard for comparing maps has been published in the primary material used here.',
      'His route was designed around creator questions rather than a fixed press script, which explains why his page concentrates on physical interaction, animation, beach density, interiors, police context and graphic combat. It should not be used to conclude that systems he did not mention are absent; it was one tailored slice of a larger game.',
    ],
  },
  {
    slug: 'mikeshowsha-rockstar-north-preview-record',
    title: 'MIKESHOWSHA: THE SYSTEMS & GETAWAY RECORD',
    category: 'analysis', status: 'analysis',
    sourceName: 'MikeShowSha recap · secondary reporting', sourceUrl: 'https://www.gtavice.net/news/gta-6-youtuber-previews-reveal-even-more-gameplay-details',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 12, image: IMG.mikeShowSha, imageCredit: 'MikeShowSha public YouTube channel image', imageCreditUrl: 'https://www.youtube.com/@MikeShowSha', featured: false, views: 0,
    excerpt: 'The Italian creator’s reported look at protagonist autonomy, instructions, gym progression, dynamic robberies, car theft and a role-switching getaway.',
    body: [
      'MikeShowSha reported another roughly two-hour Rockstar North demonstration with Rob Nelson responding to requested topics. He described the game looking particularly strong in person on a base PlayStation 5, at what he characterised as a stable 30 FPS. That is a preview impression, not a universal launch-performance certification.',
      'He said the unselected protagonist remains active in the world instead of vanishing, and that contextual instructions can be issued when both are together. In a pursuit example, the passenger could tell the driver to accelerate or escape. This describes a specific demonstrated interaction rather than unrestricted simultaneous control.',
      'His smaller world observations include eating food picked up at home or bought from a shop, Lucia training in kickboxing and MMA while Jason uses a rougher style, and some NPCs attempting to disarm an armed player. He also reported three initial registered-vehicle slots in the shown build and a Scooter Brothers-style personal-vehicle delivery service.',
      'MikeShowSha described random events with consequences: crashed robbers leaving marked money that needs laundering, and jewellery-store robbers becoming trapped inside so Jason and Lucia can help—or exploit the moment and take over the robbery. He said CCTV can record a protagonist, after which splitting up can divide police attention.',
      'He reported the world opening substantially after introductory missions, while one apartment shown belonged to a later chapter. He also said repeated gym training can raise a strength point and visibly affect the character, but that maintenance is needed. These progression details are especially vulnerable to late balancing changes.',
      'For robberies and cars, he described open-world shop jobs that can begin with a mask and concealed weapon, choices between a quick register grab and spending time on a safe, and theft methods that differ between older and newer vehicles. He reported fuel and battery charge, with stolen cars not necessarily starting full.',
      'His getaway example started on a scooter and moved into a car, with rapid switching allowing one lead to drive while the other shot. He said targeting police-car tyres could yield positive Criminal Profile feedback because it avoids direct lethal force. He also teased an unspecified surprise feature; because he did not name it, this archive intentionally records no speculation about it.',
      'MikeShowSha also described Lucia being caught by CCTV during the jewellery-store event, personal vehicles being delivered by an NPC rather than spawning beside the player, and a developer flagging that the leads had failed to acknowledge that delivery driver. These are small, specific observations from the demonstration; they should not be stretched into a promise about every NPC interaction.',
      'His report says store robberies can be initiated in free roam, with choices between taking register cash and risking more time on a safe while the response builds. It also describes masks, concealed weapons, crowbars or key-cloning tools depending on the target vehicle, and a preview vehicle-storage limit that may change through progression. The archive keeps the proposed limit as a build observation, not a final cap.',
      'On physical progression, his account describes a three-consecutive-day training example that raised strength and visibly changed a protagonist’s build, followed by a need to keep training to maintain that condition. This is a reported example from a demonstration, not a promise of exact day counts, stat increments or body-change speed in the released game.',
      'MikeShowSha’s account is especially useful for showing how several systems meet in one situation: an emergent robbery can create CCTV evidence, force a choice to split the pair, lead to a vehicle escape with different roles, and reward a less lethal tactical response. It is an account of a curated example, not evidence that every random event has that degree of branching.',
    ],
  },
  {
    slug: 'leonida-the-state-before-the-map', title: 'LEONIDA: THE STATE BEFORE THE MAP',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.viceCity, featured: false, views: 0,
    excerpt: 'What the extracted reference identifies about Leonida—and what it deliberately leaves off the map.',
    body: [
      'Leonida is the frame around every currently named location. The extracted GTA Wiki page identifies Vice-Dale County as the home of Vice City, then names Kelly, Leonard, Mariana and Ambrosia counties alongside it. That gives the archive a vocabulary for the state without pretending that it has a complete atlas.',
      'Vice City is the clearest anchor in that vocabulary: the familiar neon city is explicitly linked to Vice-Dale. Elsewhere, the broader supplied material connects Port Gellhorn with Kelly, Grassrivers and Leonida Keys with Mariana, and Ambrosia with Ambrosia County. Those are useful associations, not pins placed by this site.',
      'The important absence is just as useful. The Wiki says the full playable extent of Leonida has not been officially shown. A named county does not prove its boundaries, scale, accessibility or relationship to every other place on the final map.',
      'That is why this archive uses region dossiers rather than a fabricated landmass. Each card can show named context, promotional imagery and an explicit source label, while withholding coordinates and routes that no released source has established.',
    ],
  },
  {
    slug: 'jason-and-lucia-the-story-premise', title: 'JASON & LUCIA: THE STORY PREMISE',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'The public premise, the two named leads and the line between story setup and unannounced detail.',
    body: [
      'The extracted page identifies Lucia Caminos and Jason Duval as the story’s criminal duo. Its plot summary begins after a straightforward score collapses, forcing both characters into a conspiracy that reaches across Leonida.',
      'That premise matters because it makes the state more than a backdrop. The public setup links the pair’s survival to movement through a wider territory, with their relationship carrying as much narrative weight as the failed job that starts the trouble.',
      'The page also places the game in Grand Theft Auto’s HD Universe. That is a continuity label, not a promise that every older location, character or reference will return. The archive treats it as setting context only.',
      'Names, premise and setting are enough to give the character pages a credible foundation. Mission order, playable systems, character abilities and later plot turns are not filled in from leaks or community extrapolation.',
    ],
  },
  {
    slug: 'two-editions-one-source-checklist', title: 'TWO EDITIONS: A SOURCE CHECKLIST',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.stanierSide, featured: false, views: 0,
    excerpt: 'Standard, Ultimate, pre-order context and the questions to check before buying.',
    body: [
      'The extracted GTA Wiki page lists Standard and Ultimate editions. It records US$80 / £70 / €80 for Standard and US$100 / £90 / €100 for Ultimate, while describing the latter as extra digital content around clothing, stores and side missions.',
      'It dates the editions announcement to June 24, 2026 and says pre-orders opened the following day. The same reference ties a month of GTA+ and the Vintage Vice City Pack to orders or purchases made before November 20, 2026.',
      'It also makes a format distinction: Standard is described as a code-in-box product, while both editions are digitally sold. That is a practical purchasing detail, but it may differ by retailer, region and final distribution plan.',
      'For that reason this archive presents the numbers in an analysis article, never as a checkout promise. Before spending money, readers should verify platform, territory, bonus eligibility, delivery format and current price through an official storefront.',
    ],
  },
  {
    slug: 'from-2022-to-the-title-reveal', title: 'FROM 2022 TO THE TITLE REVEAL',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 9, image: IMG.keyArtPier, featured: false, views: 0,
    excerpt: 'How the public development story moved from a confirmation to a named game.',
    body: [
      'The Wiki’s development section starts with Rockstar confirming active work on the next Grand Theft Auto in February 2022. A later 2022 update is presented as evidence that more staff and resources were being moved toward the project.',
      'The following year added investor-facing context and, in November, a promise of a first trailer in early December. This sequence is useful because it separates a project’s existence from the moment its public identity becomes visible.',
      'Trailer 1 arrived on December 4, 2023 and, according to the extracted page, confirmed the Grand Theft Auto VI name. The page also records trademark activity around the logo, but the archive does not make legal or production inferences from it.',
      'The result is a narrow but reliable narrative arc: development confirmation, a growing public signal, then a trailer that names the game. It is cleaner than stitching together rumours into a fictional behind-the-scenes history.',
    ],
  },
  {
    slug: 'the-release-date-moved-twice', title: 'THE RELEASE DATE MOVED TWICE',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtMotel, featured: false, views: 0,
    excerpt: 'A plain chronology of the public windows, fixed dates and the current schedule.',
    body: [
      'The extracted timeline begins with a broad 2025 expectation. In May 2024, the page says that window was narrowed to fall 2025 through Take-Two reporting, before a fixed date changed the picture in 2025.',
      'On May 2, 2025, the page records Rockstar moving the scheduled launch to May 26, 2026. Trailer 2 followed on May 6, placing a new burst of public material next to the delay rather than before it.',
      'A second delay was announced on November 6, 2025, moving the schedule to November 19, 2026. That is the date displayed throughout this archive, with the word scheduled rather than an implication that release cannot change again.',
      'A timeline is most useful when it does not explain more than the evidence can carry. The archive reports the published dates and the stated need for additional time; it does not diagnose internal scope, budgets or production problems.',
    ],
  },
  {
    slug: 'trailer-one-and-trailer-two-in-context', title: 'TRAILER ONE & TWO, IN CONTEXT',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtBeach, featured: false, views: 0,
    excerpt: 'The release moments behind both trailers, without treating view counts as game specifications.',
    body: [
      'The extracted page says Trailer 1 was scheduled for a December 5, 2023 premiere but released on December 4 after an early leak. In the archive, that date is more important than speculation about the leak itself: it marks the moment the final title became public.',
      'Trailer 2 is dated May 6, 2025, four days after the first dated delay. The pairing gives readers a clear media sequence: a revised schedule, then a refreshed public presentation.',
      'The Wiki also compiles large early viewing figures for both trailers and a streaming spike for a featured song. Those figures describe attention around the marketing, not gameplay capability, map scale or sales performance.',
      'The gallery keeps the two trailers easy to find while the articles focus on provenance. Footage can show names, places and public tone; it cannot settle every mechanic the community sees in a frame.',
    ],
  },
  {
    slug: 'cover-art-preorders-and-the-june-update', title: 'COVER ART, PRE-ORDERS & THE JUNE UPDATE',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.coverArt, featured: false, views: 0,
    excerpt: 'The June 2026 marketing milestones as recorded by the extracted community reference.',
    body: [
      'The GTA Wiki page dates a cover-art reveal to June 18, 2026 and says pre-orders were announced for June 25. A June 24 update then becomes the page’s marker for edition information and the Vintage Vice City Pack.',
      'These milestones are distinct: artwork is a public identity asset, pre-orders are a commercial event, and editions define a purchasing choice. Keeping them apart avoids turning every June announcement into one vague “launch update.”',
      'The page also records a claim about downloading ahead of release. Because delivery timing is platform and region dependent, this archive keeps that point as source context rather than a universal instruction to players.',
      'The archive’s edition article carries the practical details; this record is about chronology. It shows when the public information became available, not a guarantee that every retailer currently presents the same offer.',
    ],
  },
  {
    slug: 'the-official-media-index-by-subject', title: 'THE MEDIA INDEX, BY SUBJECT',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.ambrosiaNight, featured: false, views: 0,
    excerpt: 'A reading guide for character, location, artwork, logo and trailer material listed by the extracted page.',
    body: [
      'The extracted gallery divides imagery into useful families. Its character material names Jason, Lucia, Cal Hampton, Boobie Ike, Dre’Quan Priest, Real Dimez, Raul Bautista and Brian Heder; its locations include Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers and Mount Kalaga.',
      'That organisation is more valuable than an unlabelled image dump. A viewer can distinguish a character reference from a location reference and avoid reading an attractive promotional still as a documented gameplay system.',
      'The page also indexes artwork, the main logo and a monochrome logo variant, then links the two trailers. Our archive uses its own locally stored promotional-media set and descriptive alt text instead of embedding the Wiki’s files.',
      'A gallery can establish that a named subject appears in released promotion. It cannot establish exact geography, mission access, population behaviour or mechanical rules. Those require their own, stronger evidence.',
    ],
  },
  {
    slug: 'awards-trivia-and-the-public-conversation', title: 'AWARDS, TRIVIA & THE PUBLIC CONVERSATION',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.ultimatePalms, featured: false, views: 0,
    excerpt: 'What belongs in a cultural record of GTA VI, and what does not belong in a confirmation database.',
    body: [
      'The reception table on the extracted page records Most Anticipated Game wins at The Game Awards in 2024 and 2025. Awards measure anticipation and public attention; they do not verify features that have not been announced.',
      'Its trivia section collects observations about series history, logo styling and continuity. Some entries are clearly framed as appearances or implications, which is exactly why the archive keeps trivia separate from direct factual records.',
      'The page also notes how the first trailer announcement became a wider social-media moment, with other game studios echoing its visual language. That is a revealing piece of culture around the reveal, not part of GTA VI’s fiction or specification sheet.',
      'This archive preserves that distinction. A game’s public conversation includes awards, references, rumours and fan reading; an accurate database still needs to show what is sourced, what is inferred and what remains unknown.',
    ],
  },
  {
    slug: 'leonida-map-source-ledger', title: 'LEONIDA: MAP CLAIMS, SORTED',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.viceCity, featured: false, views: 0,
    excerpt: 'Counties, named regions and the map claims that remain only reported.',
    body: [
      'The supplied roundup names Leonida, Vice City, Grassrivers, Leonida Keys, Port Gellhorn, Ambrosia and Mount Kalaga National Park. It also lists Vice-Dale, Ambrosia, Kelly, Leonard, Mariana and Lummox counties.',
      'It contains larger claims about the number of interiors, wildlife, underwater exploration and the size of the world. Those claims are useful leads for an archive, but they are not used as an official map specification here.',
      'Open the map dossiers for the named regions, galleries and county references. No coordinates are inferred from the roundup.',
    ],
  },
  {
    slug: 'jason-lucia-story-context', title: 'JASON & LUCIA: STORY CONTEXT',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'The two leads, their central premise and the reported systems around them.',
    body: [
      'The supplied material frames Jason Duval and Lucia Caminos as a criminal couple whose failed score pulls them into a statewide conspiracy. Cal Hampton, Brian Heder, Boobie Ike, Dre’Quan Priest, Raul Bautista and Real Dimez are named around that story.',
      'Character switching, special abilities, chapter structure and activity lists appear in the roundup as reported features. They stay in the archive’s analysis layer until they are supported by direct official material.',
      'The character database keeps sourced profiles separate from feature claims so that story context does not turn into unsupported gameplay detail.',
    ],
  },
  {
    slug: 'combat-and-police-claims-ledger', title: 'COMBAT & POLICE: CLAIMS LEDGER',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.weaponPattern, featured: false, views: 0,
    excerpt: 'Weapons and equipment are documented; detailed combat systems remain source-sensitive.',
    body: [
      'The roundup points to firearms, melee tools, equipment and a redesigned inventory interface. It also reports limited weapon carrying, medical items, stealth actions and a six-star response scale.',
      'Because that page combines trailers, screenshots and leaks, details such as recognition systems, surrender options, hostage actions and precise carry limits are recorded as reported rather than confirmed.',
      'The Arsenal and Mechanics sections expose the status of every entry rather than treating the entire roundup as a single source of truth.',
    ],
  },
  {
    slug: 'systems-visuals-and-world-interactions', title: 'SYSTEMS & VISUALS: WHAT IS REPORTED',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.swampSkyline, featured: false, views: 0,
    excerpt: 'Rendering, character appearance and social systems are separated from speculation.',
    body: [
      'Dense streets, detailed character models, reactive environments and social-media imagery are all part of the supplied media overview. These describe the direction visible in promotional material, not final technical guarantees.',
      'Ray tracing, hair growth, body changes, dialogue prompts, reputation values and cinematic tools are feature claims in the roundup. They remain analysis until Rockstar publishes specifications or direct demonstrations.',
      'The archive keeps this distinction visible in the Mechanics database and does not convert inferred interfaces into confirmed systems.',
    ],
  },
  {
    slug: 'vehicles-and-online-separate-the-known', title: 'VEHICLES & ONLINE: SEPARATE THE KNOWN',
    category: 'analysis', status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.stanierNight, featured: false, views: 0,
    excerpt: 'Transport is visible in the media; Online claims remain speculative.',
    body: [
      'Cars, motorcycles, aircraft and boats are represented in the supplied media summary. The same source reports vehicle storage, fuel, repairs, dealerships, transit and more detailed interiors, none of which is promoted to confirmed gameplay here.',
      'The Online section of the roundup is explicitly forward-looking. Transfer rules, a fresh economy, roleplay tools and loyalty rewards have no confirmed status in this archive.',
      'The vehicle database therefore focuses on documented models and source labels, while Online remains a clearly marked speculation topic.',
    ],
  },
  {
    slug: 'the-new-inventory-system',
    title: 'THE NEW INVENTORY SYSTEM',
    category: 'analysis', status: 'analysis',
    sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/inventory-analysis',
    publishedAt: '2026-08-26', updatedAt: '2026-08-26', readTime: 8,
    image: IMG.portGellhorn, featured: false, views: 31980,
    excerpt: 'Dynamic slots, quick access and unseen combinations.',
    body: [
      'The inventory glimpsed in the Extended Look abandons the classic weapon wheel in favour of a hybrid grid: dynamic slots that reorganise by context.',
      'Items appear to have physical weight. Lucia visibly slows when carrying the duffel bag, suggesting a per-character encumbrance system.',
      'Analysis of the HUD suggests each protagonist maintains a personal inventory that persists when switching characters.',
    ],
  },
  {
    slug: 'six-star-wanted-level-returns',
    title: 'THE SIX-STAR WANTED LEVEL RETURNS',
    category: 'official', status: 'confirmed',
    sourceName: 'Rockstar Newswire', sourceUrl: 'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026',
    publishedAt: '2026-08-25', updatedAt: '2026-08-25', readTime: 6,
    image: IMG.swampChase, featured: false, views: 29870,
    excerpt: 'Authorities confirm the wanted system and new responses to the player.',
    body: [
      'Official material confirms the return of the six-star wanted scale, absent since the classic era.',
      'Escalation now includes dedicated marine units around the Leonida Keys and airborne response over Vice City.',
      'Evasion mechanics reward disguises and vehicle changes — both documented in our mechanics database.',
    ],
  },
  {
    slug: 'trailer-2-full-analysis',
    title: 'TRAILER 2: FULL ANALYSIS',
    category: 'analysis', status: 'analysis',
    sourceName: 'The Archivist', sourceUrl: 'https://example.com/trailer-2-analysis',
    publishedAt: '2024-05-24', updatedAt: '2026-08-20', readTime: 14,
    image: IMG.keysStreet, featured: true, views: 51230,
    excerpt: 'We detail every scene, location and hidden clue from the new trailer.',
    body: [
      'Trailer 2 opens on the causeway at dawn — a deliberate mirror of the series’ most iconic establishing shots.',
      'Every scene has been geolocated against our fictional Leonida map. Twelve match previously mapped districts; three are entirely new.',
      'The final frame hides a panther silhouette in the mural behind Jason. We believe this connects to the Panther Mural easter egg chain.',
    ],
  },
  {
    slug: 'new-vice-city-images-surface-online',
    title: 'NEW VICE CITY IMAGES SURFACE ONLINE',
    category: 'community', status: 'verified',
    sourceName: 'Community Report', sourceUrl: 'https://example.com/community-images',
    publishedAt: '2026-08-27', updatedAt: '2026-08-27', readTime: 4,
    image: IMG.viceCity, featured: false, views: 18450,
    excerpt: 'Alleged captures show unseen districts and more traffic.',
    body: [
      'A set of images circulating online appears to show unreleased districts of Vice City with visibly denser traffic.',
      'Metadata checks by three independent community analysts are consistent with capture hardware used by playtesters. We classify the set as VERIFIED, not CONFIRMED.',
    ],
  },
  {
    slug: 'vehicle-database-updated',
    title: 'VEHICLE DATABASE UPDATED',
    category: 'official', status: 'verified',
    sourceName: 'Leonida Archive', sourceUrl: 'https://example.com/archive-update',
    publishedAt: '2026-08-26', updatedAt: '2026-08-26', readTime: 3,
    image: IMG.stanierTail, featured: false, views: 12760,
    excerpt: '12 new vehicles added with detailed information.',
    body: [
      'The garage grows: 12 new vehicles have been added to the database with full specification sheets.',
      'Every entry lists a verification status and the exact source footage it was documented from.',
    ],
  },
  {
    slug: 'three-theories-second-protagonist',
    title: 'THREE THEORIES ABOUT THE SECOND PROTAGONIST',
    category: 'community', status: 'rumour',
    sourceName: 'Community Forum Digest', sourceUrl: 'https://example.com/forum-digest',
    publishedAt: '2026-08-23', updatedAt: '2026-08-23', readTime: 7,
    image: IMG.ambrosiaNight, featured: false, views: 22140,
    excerpt: 'The community debates who really drives the story of Leonida.',
    body: [
      'Three competing theories dominate community discussion. None are confirmed; all are catalogued here as RUMOUR.',
      'Theory one places Jason as a former coast guard. Theory two ties him to the Port Gellhorn salvage scene. Theory three is, frankly, about an alligator.',
    ],
  },
  {
    slug: 'vice-city-every-confirmed-location',
    title: 'VICE CITY: EVERY CONFIRMED LOCATION SO FAR',
    category: 'analysis', status: 'verified',
    sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/locations-index',
    publishedAt: '2026-08-22', updatedAt: '2026-08-25', readTime: 9,
    image: IMG.swampSkyline, featured: false, views: 20390,
    excerpt: 'From Ocean Drive to Little Haiti, the full index of documented districts.',
    body: [
      'This index is rebuilt after every official drop. It currently tracks 326 mapped locations across four regions.',
      'Use the interactive map to filter by district, activity or secret.',
    ],
  },
]

export const liveUpdates = [
  { time: '14:32', text: 'R* confirms second trailer for September.', status: 'official' },
  { time: '13:47', text: 'New Vice City images surface online.', status: 'verified' },
  { time: '12:21', text: 'Possible full map circulates in the community.', status: 'rumour' },
  { time: '11:09', text: 'Rockstar registers new Leonida-related trademark.', status: 'official' },
  { time: '10:02', text: 'Voice actor hints at a classic character return.', status: 'rumour' },
]

export const sources = [
  { abbr: 'R*', name: 'Rockstar Newswire', rating: 5, kind: 'Official publisher channel' },
  { abbr: 'VCI', name: 'Vice City Insider', rating: 4, kind: 'Specialist outlet' },
  { abbr: 'WZL', name: 'Weazel News Watch', rating: 3, kind: 'Aggregator' },
  { abbr: 'LCPD', name: 'LCPD Files', rating: 3, kind: 'Community datamine' },
  { abbr: 'LSGC', name: 'LS Gaming Council', rating: 2, kind: 'Community forum' },
  { abbr: 'FD', name: 'Field Docs', rating: 4, kind: 'Frame analysis group' },
]

export const mostRead = [
  { rank: '01', slug: 'extended-look-everything-revealed', title: 'Extended Look: everything revealed', date: 'AUG 27, 2026' },
  { rank: '02', slug: 'three-theories-second-protagonist', title: 'Three theories about the second protagonist', date: 'AUG 23, 2026' },
  { rank: '03', slug: 'vice-city-every-confirmed-location', title: 'Vice City: every confirmed location so far', date: 'AUG 22, 2026' },
]

// ---------------- WEAPONS ----------------
// `src` dá à entrada a sua fonte real, e `unpublished` marca as que aparecem
// em material oficial mas cujas estatísticas ninguém publicou — a interface
// diz isso em vez de mostrar barras que seriam inventadas.
const W = (slug, name, type, ammo, mag, stats, status, image, desc, locs, src, unpublished, association = null) => ({
  slug, name, type, ammo, mag,
  stats, // [damage, fireRate, accuracy, range, capacity, weightKg]
  unpublished: unpublished || false,
  status,
  evidenceStatus: status === 'confirmed' ? 'OFFICIAL — NAMED' : status === 'verified' ? 'OFFICIAL — DEPICTED' : status === 'category' ? 'OFFICIAL — CATEGORY CONFIRMED' : status === 'analysis' ? 'UNVERIFIED IDENTIFICATION' : 'SPECULATIVE',
  sourceName: src ? src[0] : status === 'confirmed' ? 'Extended Look' : status === 'verified' ? 'Trailer 2 frame analysis' : status === 'analysis' ? 'Archive analysis' : 'Community report',
  // Sem `src` não há fonte. O fallback apontava para example.com, e o arquivo
  // mostrava-o como hiperligação por baixo de «SOURCE:» — citava um domínio de
  // exemplo com ar de proveniência. Agora fica nulo, e a interface omite.
  sourceUrl: src ? src[1] : null,
  publishedAt: '2026-08-20', updatedAt: '2026-08-27',
  // `locations` alimentava o «APPEARS IN», que saiu: o default carimbava
  // Little Haiti e Vice Point em toda a arma sem lista própria. Fica vazio
  // até haver fonte; o argumento mantém-se para não desalinhar as chamadas.
  image, desc, locations: [],
  association,
})

export const weaponTypes = [
  { id: 'handgun', label: 'HANDGUN' },
  { id: 'shotgun', label: 'SHOTGUN' },
  { id: 'smg', label: 'SUBMACHINE GUN' },
  { id: 'rifle', label: 'RIFLE' },
  { id: 'heavy', label: 'HEAVY' },
  { id: 'explosives', label: 'EXPLOSIVES' },
  { id: 'custom', label: 'COSMETICS' },
]

// Fontes reais usadas nas entradas abaixo. A Rockstar não publicou o arsenal
// nem estatísticas de arma nenhuma: o que existe é o que se vê nas imagens
// oficiais, mais o levantamento feito pela imprensa. As entradas marcadas
// `unpublished` mostram isso em vez de barras de números.
const SRC_RS = ['Rockstar Games · GTA VI official gallery', 'https://www.rockstargames.com/VI/media']
const SRC_ED = ['Rockstar Games · GTA VI Editions', 'https://www.rockstargames.com/VI/editions']
const SRC_PS = ['PlayStation · GTA VI Ultimate Edition', 'https://store.playstation.com/en-us/concept/10000730/']

export const weapons = [
  // ---- Anunciado pela Rockstar como conteúdo de edição, e mostrado com o
  // nome na galeria oficial. É a única arma do arsenal cujo nome vem da
  // Rockstar e não de um levantamento. ----
  W('morgan-revolvers', 'HAWK & LITTLE MORGAN REVOLVERS', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.morganRevolvers,
    'An Ultimate Edition revolver family with his-and-hers variants. Rockstar describes palm-tree-etched grips, engraved detailing and a high-performance scope, sourced from the Vercetti Estate. No separate mechanical models or performance figures have been published.',
    null, SRC_PS, true, 'ULTIMATE EDITION · JASON & LUCIA VARIANTS'),

  W('girardi-es9', 'GIRARDI ES9', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponVariants,
    'Jason Duval’s named pistol. Rockstar’s Ultimate Edition description confirms the Girardi ES9 and a personalised engraved version; no calibre, capacity or performance figures have been published.',
    null, SRC_PS, true, 'JASON DUVAL · ULTIMATE PERSONALIZED VARIANT'),

  W('klose-k17', 'KLOSE K17', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponVariants,
    'Lucia Caminos’s named sidearm. Rockstar’s Ultimate Edition description confirms the Klose K17 and a personalised engraved version; no calibre, capacity or performance figures have been published.',
    null, SRC_PS, true, 'LUCIA CAMINOS · ULTIMATE PERSONALIZED VARIANT'),

  // ---- Documentado em material oficial (tipo visível, nome não anunciado) ----
  W('unnamed-rifle', 'UNNAMED RIFLE', 'rifle', 0, 0, [0, 0, 0, 0, 0, 0], 'verified', IMG.weaponPattern,
    'A rifle is visibly present in official Rockstar material. Rockstar has not published a fictional model name, manufacturer, attachments or performance data, so this record deliberately identifies only what is shown.',
    null, SRC_RS, true, 'OFFICIAL MEDIA · MODEL UNNAMED'),
  W('unnamed-shotgun', 'UNNAMED SHOTGUN', 'shotgun', 0, 0, [0, 0, 0, 0, 0, 0], 'verified', IMG.pistolPalms,
    'A shotgun is visibly present in official Rockstar material. Its model name, mechanism, ammunition and statistics have not been officially announced.',
    null, SRC_RS, true, 'OFFICIAL MEDIA · MODEL UNNAMED'),
  // Estava marcada `rumour` porque o nome vinha de fugas. A galeria oficial
  // resolve a questão: na imagem das variantes personalizadas, a pistola de
  // Lucia traz KLOSE gravado no punho e KL17G1 na corrediça. O nome deixa de
  // ser boato — passa a leitura de material oficial, que é o que `verified` diz.
  W('vintage-vice-city-weapon-pattern', 'VINTAGE VICE CITY WEAPON PATTERN', 'custom', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponPatternVintage,
    'A pre-order finish rather than a weapon of its own: a pale palm-frond print that Rockstar shows applied to a pistol and a compact carbine, photographed across the back seat of a car with the night skyline behind. Which weapons accept it has not been stated.',
    null, SRC_ED, true, 'VINTAGE VICE CITY PACK'),

]

// Contados a partir da própria lista. Estavam escritos à mão e desalinhavam
// com o conteúdo à primeira alteração.
export const weaponCounters = [
  [String(weapons.length).padStart(2, '0'), 'WEAPONS'],
  [String(new Set(weapons.map((w) => w.type)).size).padStart(2, '0'), 'TYPES'],
  [String(weapons.filter((w) => w.status === 'confirmed').length).padStart(2, '0'), 'CONFIRMED'],
]

// ---------------- VEHICLES ----------------
const V = (slug, name, cls, stats, specs, status, image, num, find, findLabel, src, unpublished) => ({
  slug, name, cls,
  stats, // [speed, acceleration, braking, handling]
  specs, // [doors, seats, drive, engine]
  unpublished: unpublished || false,
  status,
  evidenceStatus: status === 'confirmed' ? 'OFFICIAL — NAMED' : status === 'verified' ? 'OFFICIAL — DEPICTED' : status === 'category' ? 'OFFICIAL — CATEGORY CONFIRMED' : status === 'analysis' ? 'UNVERIFIED IDENTIFICATION' : 'SPECULATIVE',
  sourceName: src ? src[0] : status === 'confirmed' ? 'Extended Look' : status === 'verified' ? 'Trailer 2 frame analysis' : 'Community report',
  // Sem `src` não há fonte. O fallback apontava para example.com, e o arquivo
  // mostrava-o como hiperligação por baixo de «SOURCE:» — citava um domínio de
  // exemplo com ar de proveniência. Agora fica nulo, e a interface omite.
  sourceUrl: src ? src[1] : null,
  publishedAt: '2026-08-18', updatedAt: '2026-08-26',
  image, num,
  // `find` e `findLabel` alimentavam o «WHERE TO FIND», que saiu: ninguém pode
  // dizer onde nasce um carro num jogo que ainda não saiu, e os defaults
  // («OCEAN BEACH · 0.8 MI», um parque coberto em Ocean Drive) eram invenção
  // servida a toda a garagem. Ficam por passar até haver fonte que os sustente;
  // os argumentos mantêm-se na assinatura só para não desalinhar as chamadas.
  findLabel: null,
  find: null,
})

// `count` é preenchido a partir da lista de veículos, mais abaixo: estava
// escrito à mão (214 no ALL, 61 em motos) e não correspondia a nada.
export const vehicleClasses = [
  { id: 'all', label: 'ALL', count: 0 },
  { id: 'muscle', label: 'MUSCLE', count: 0 },
  { id: 'sports', label: 'SPORTS', count: 0 },
  { id: 'classics', label: 'CLASSICS', count: 0 },
  { id: 'motorcycles', label: 'MOTORCYCLES', count: 0 },
  { id: 'boats', label: 'BOATS', count: 0 },
  { id: 'aircraft', label: 'AIRCRAFT', count: 0 },
  { id: 'offroad', label: 'OFF-ROAD', count: 0 },
]

export const vehicles = [
  // ---- Anunciados pela Rockstar como conteúdo das edições, e mostrados na
  // galeria oficial com o nome na legenda. Nome e imagem vêm ambos da fonte
  // primária; as estatísticas continuam por publicar, como em tudo o resto. ----
  V('grotti-cheetah-95', '’95 GROTTI CHEETAH', 'sports', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.grottiCheetah, '000',
    'Grotti’s signature mid-’90s sports car, included with the Ultimate Edition. Rockstar describes an ode to Shore Drive with a minimalist retro-futuristic livery; an exact unlock point and performance figures are not published.',
    'ULTIMATE EDITION · SHORE DRIVE', SRC_ED, true),
  V('dinka-enduro', 'DINKA ENDURO', 'motorcycles', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.safehouseVehicles, '000',
    'Rockstar names the Dinka Enduro motorcycle as one of Jason’s Safehouse Vehicles. The Ultimate Edition description notes its army-fatigue-tinged appearance; no performance figures have been published.',
    'ULTIMATE EDITION · JASON’S SAFEHOUSE', SRC_ED, true),
  V('crest-kayak', 'CREST KAYAK', 'boats', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.safehouseVehicles, '000',
    'Rockstar names the Crest Kayak as a watercraft included among Jason’s Safehouse Vehicles. Whether Crest is a manufacturer or product brand is not further specified.',
    'ULTIMATE EDITION · JASON’S SAFEHOUSE', SRC_ED, true),
  V('vapid-ganado', 'VAPID GANADO', 'muscle', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.vapidGanado, '000',
    'Jason’s well-worn Vapid Ganado low-riding pickup. The Ultimate Edition adds the Ganado Retro Build, an exclusive modification package with additional muscle and classic styling.',
    'BASE VEHICLE · ULTIMATE RETRO BUILD', SRC_ED, true),
  V('shitzu-squalo', 'SHITZU SQUALO', 'boats', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.shitzuSqualo, '000',
    'An Ultimate Edition Squalo prepared for open-ocean use, described by Rockstar with a pink-and-blue gradient, an explosives-laden weapons crate and fishing around Gambit Bay. It is docked at Washington Beach.',
    'ULTIMATE EDITION · WASHINGTON BEACH', SRC_ED, true),
  V('vapid-stanier-55', '’55 VAPID STANIER SEDAN', 'classics', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.vapidStanier55, '000',
    'A 1955 Vapid sedan included with its own garage in the Vintage Vice City Pack. Rockstar has not published the garage address, capacity or vehicle-storage rules.',
    'VINTAGE VICE CITY PACK · GARAGE INCLUDED', SRC_ED, true),
  V('vapid-dominator-buggy-67', '’67 VAPID DOMINATOR BUGGY', 'offroad', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.dominatorBuggy, '000',
    'An Ultimate Edition Mud Club off-road buggy associated with Mount Kalaga. It is stored at Paradise Garage in Watson Bay, which Rockstar says includes a weapon locker and a secure place to deposit stolen goods for fencing.',
    'ULTIMATE EDITION · PARADISE GARAGE', SRC_ED, true),
  V('unnamed-aircraft', 'UNNAMED AIRCRAFT', 'aircraft', [0, 0, 0, 0], ['—', '—', '—', '—'], 'category', null, '—',
    'Rockstar’s official GTA VI material establishes aircraft in Leonida, including a helicopter on the cover-art description and a plane in general imagery. Rockstar has not named a specific aircraft model or confirmed player controllability.',
    'OFFICIAL CATEGORY · MODEL UNNAMED', SRC_RS, true),

]

// Preenche os contadores por classe agora que `vehicles` existe.
vehicleClasses.forEach((c) => {
  c.count = c.id === 'all' ? vehicles.length : vehicles.filter((v) => v.cls === c.id).length
})

// Dizia 214 veículos e 18 classes quando a base tem uma fracção disso.
export const vehicleCounters = [
  [String(vehicles.length).padStart(2, '0'), 'VEHICLES'],
  [String(vehicleClasses.length).padStart(2, '0'), 'CLASSES'],
  [String(vehicles.filter((v) => v.status === 'confirmed').length).padStart(2, '0'), 'CONFIRMED'],
]

// ---------------- CHARACTERS ----------------
export const characterFilters = [
  { id: 'all', label: 'ALL' },
  { id: 'protagonists', label: 'PROTAGONISTS' },
  { id: 'allies', label: 'ALLIES' },
  { id: 'rivals', label: 'RIVALS' },
  { id: 'factions', label: 'FACTIONS' },
]

export const characters = [
  {
    slug: 'lucia-caminos', name: 'LUCIA CAMINOS', role: 'PROTAGONIST', group: 'protagonists',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2025-12-01', updatedAt: '2026-08-27',
    image: IMG.luciaCaminos,
    bio: 'Taught to fight before she could walk. It has been coming at her ever since.',
    long: 'Her father put her hands up early, and life kept giving her reasons to keep them there. What put her inside Leonida Penitentiary was not greed — it was fighting for her family. What got her out was luck, and she knows the difference. She is also the first woman the series has made a protagonist outright rather than an option, which is why the story is built around two people who need each other rather than a lead with a passenger.',
  },
  {
    slug: 'jason-duval', name: 'JASON DUVAL', role: 'PROTAGONIST', group: 'protagonists',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2025-12-01', updatedAt: '2026-08-27',
    image: IMG.jasonDuval,
    bio: 'Wants an easy life. Keeps getting the other kind.',
    long: 'Jason was raised among grifters and small-time crooks, and joined the Army partly to get clear of a difficult adolescence. It did not take: he came out of it and into the Keys, running errands for the local drug trade because that was the work on offer. He is not chasing a bigger score — he is looking for a way out, which is a different kind of dangerous.',
  },
  {
    slug: 'cal-hampton', name: 'CAL HAMPTON', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-05-06', updatedAt: '2026-08-27',
    image: IMG.calHampton,
    bio: 'Safest at home, with the Coast Guard on the scanner and the tabs open.',
    long: 'Cal is Jason’s friend and, like him, works around Brian. His preferred vantage point is his own sofa: a few beers, the Coast Guard channels, and whatever the internet is insisting on that week. He is comfortable at the bottom of the map and has no plans to move — which is precisely where he and Jason part company.',
  },
  {
    slug: 'boobie-ike', name: 'BOOBIE IKE', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-05-06', updatedAt: '2026-08-27',
    image: IMG.boobieIke,
    bio: 'Turned time on the street into real estate, a club and a studio.',
    long: 'Boobie is one of the few who converted a street reputation into holdings you can put a name on: property, the Jack of Hearts, and a recording studio. He is genial until the conversation turns to money. The part of the empire he actually cares about is the label — Only Raw Records, run with Dre’Quan — which still needs the one thing money has not bought it: a hit.',
  },
  {
    slug: 'dre-quan-priest', name: "DRE'QUAN PRIEST", role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI/only-in-leonida',
    publishedAt: '2026-05-06', updatedAt: '2026-08-20',
    image: IMG.drequanPriest,
    bio: 'Always more hustler than gangster. Music was the point all along.',
    long: 'Dre’Quan dealt on the street to pay for the thing he actually wanted, which was a way into music. He ran Only Raw Records with Boobie from the bottom up, booking acts into the Jack of Hearts to keep the lights on. Signing the Real Dimez is his attempt to stop being the man who books the room and start being the man who fills it.',
  },
  {
    slug: 'raul-bautista', name: 'RAUL BAUTISTA', role: 'RIVAL', group: 'rivals',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://www.rockstargames.com/VI/only-in-leonida',
    publishedAt: '2026-06-14', updatedAt: '2026-06-14',
    image: IMG.raulBautista,
    bio: 'Charm, confidence and a standing offer to anyone who can take the risk.',
    long: 'Raul is a career bank robber who works by recruitment: he finds people willing to go further than they meant to, and makes it sound reasonable. The problem is not his competence, it is his appetite. Each score raises the stakes on the last, which eventually leaves a crew with only two options — commit harder, or walk away from the table.',
  },
  {
    slug: 'brian-heder', name: 'BRIAN HEDER', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: 'Official character artwork', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: IMG.brianHeder,
    bio: 'A smuggler from the golden age of the Keys, still working his boat yard.',
    long: 'Brian belongs to an older generation of Keys runners and has lasted long enough to stop doing the dangerous parts himself. Product still moves through his boat yard, which he works alongside Lori, his third wife. He dresses like a beach bum and negotiates like something with more teeth. Jason lives rent-free in one of his properties, which is not generosity: the rent is paid in local shakedowns, and in turning up for Lori’s sangria.',
  },
  {
    slug: 'real-dimez', name: 'REAL DIMEZ', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: 'Official character artwork', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: IMG.realDimez,
    bio: 'Bae-Luxe and Roxy. Friends since school, and nobody’s discovery.',
    long: 'They funded themselves by shaking down local dealers and turned it into rap tracks and a social feed they never stop working. An early single with the rapper DWNPLY took them further than anyone expected; the five years since brought more trouble than follow-up. Signing to Only Raw Records is the second attempt at the same lightning — which makes Dre’Quan’s problem their problem too.',
  },
]

// relationships: values 0-100 for trust / tension / risk
export const relationships = [
  { a: 'lucia-caminos', b: 'jason-duval', primary: true, trust: 84, tension: 62, risk: 48 },
  { a: 'lucia-caminos', b: 'cal-hampton', primary: false, trust: 58, tension: 66, risk: 44 },
  { a: 'lucia-caminos', b: 'boobie-ike', primary: false, trust: 64, tension: 50, risk: 40 },
  { a: 'jason-duval', b: 'cal-hampton', primary: true, trust: 78, tension: 38, risk: 36 },
  { a: 'jason-duval', b: 'boobie-ike', primary: false, trust: 52, tension: 58, risk: 52 },
  { a: 'boobie-ike', b: 'dre-quan-priest', primary: false, trust: 70, tension: 44, risk: 58 },
]

// ---------------- MECHANICS ----------------
export const mechanics = [
  { slug: 'character-switching', name: 'CHARACTER SWITCHING', glyph: 'R1', icon: 'switch',
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    desc: 'Switch protagonists without abandoning the current world state.',
    long: 'The Extended Look shows a seamless hand-off between Lucia and Jason mid-mission. World state — traffic, wanted level, weather — persists across the switch.' },
  { slug: 'dynamic-relationship', name: 'DYNAMIC RELATIONSHIP', glyph: '△', icon: 'relation',
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/relationship',
    publishedAt: '2026-08-18', updatedAt: '2026-08-25',
    desc: 'Relationships evolve based on choices, actions and consequences.',
    long: 'Dialogue variations across captures suggest trust and tension meters that respond to player behaviour.' },
  { slug: 'disguises', name: 'DISGUISES', glyph: '□', icon: 'disguise',
    status: 'verified', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-16', updatedAt: '2026-08-24',
    desc: 'Use disguises to access restricted areas and mislead enemies.',
    long: 'Uniform pickups appear as interactable props in two scenes, including the marina security office.' },
  { slug: 'personal-inventory', name: 'PERSONAL INVENTORY', glyph: 'L2', icon: 'inventory',
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/inventory',
    publishedAt: '2026-08-14', updatedAt: '2026-08-26',
    desc: 'Each character carries their own items and distinct limitations.',
    long: 'HUD comparison across protagonists shows non-shared item grids and different carry weights.' },
  { slug: 'six-star-wanted', name: 'SIX-STAR WANTED', glyph: 'R2', icon: 'wanted',
    status: 'confirmed', sourceName: 'Rockstar Newswire', sourceUrl: 'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026',
    publishedAt: '2026-08-25', updatedAt: '2026-08-25',
    desc: 'The six-star escalation scale returns with marine and air response.',
    long: 'Officially confirmed. Escalation includes dedicated Keys marine units and Vice City air support.' },
  { slug: 'dynamic-events', name: 'DYNAMIC EVENTS', glyph: 'L1', icon: 'events',
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/events',
    publishedAt: '2026-08-10', updatedAt: '2026-08-22',
    desc: 'Ambient crimes, chases and weather events trigger without scripting.',
    long: 'Three background sequences appear unscripted across separate captures of the same district.' },
  { slug: 'vehicle-cargo', name: 'VEHICLE CARGO', glyph: '○', icon: 'cargo',
    status: 'rumour', sourceName: 'Community report', sourceUrl: 'https://example.com/cargo',
    publishedAt: '2026-07-30', updatedAt: '2026-07-30',
    desc: 'Trunk space may function as mobile storage for heists.',
    long: 'Community datamine only. Not verified by the editorial team.' },
  { slug: 'safehouse-economy', name: 'SAFEHOUSE ECONOMY', glyph: '✕', icon: 'safehouse',
    status: 'rumour', sourceName: 'Community report', sourceUrl: 'https://example.com/safehouse',
    publishedAt: '2026-07-22', updatedAt: '2026-07-22',
    desc: 'Property upkeep and stash management between missions.',
    long: 'Unverified. Catalogued for completeness.' },
  { slug: 'criminal-profile', name: 'CRIMINAL PROFILE', glyph: '△', icon: 'relation',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'A reputation record that follows what you actually did.',
    long: 'Leonida keeps a file on you. Rather than a score that resets between jobs, the profile accumulates — which turns a series of individual crimes into a record that the world can respond to.' },
  { slug: 'snapmatic', name: 'SNAPMATIC', glyph: '□', icon: 'switch',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'The in-world social network, and its feed.',
    long: 'A parody of the short-video platforms, built into the phone. Its function in a Rockstar game is satire with a camera attached: the feed is how Leonida talks about itself, and how the player joins in.' },
  { slug: 'physical-conditioning', name: 'PHYSICAL CONDITIONING', glyph: '○', icon: 'safehouse',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Weight and appearance shift over the course of the story.',
    long: 'Both protagonists change physically with how they are played. It is a slow mechanic by design — the kind that is only legible across a long game, and that makes a save file look like a history rather than a state.' },
  { slug: 'free-roam-pursuits', name: 'FREE ROAM PURSUITS', glyph: '✕', icon: 'dynamic',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Skydiving, wrestling, basketball and scuba diving, outside the story.',
    long: 'The confirmed activity list reaches from the air to the seabed, which is less a list of minigames than a statement about the map: Leonida is built to be worth crossing when nobody is asking you to.' },
]

// ---------------- MAP: REGIONS, LOCATIONS ----------------
// As seis regiões que a Rockstar identifica como exploráveis. As coordenadas
// são a disposição deste mapa estilizado, não geografia oficial — não há
// mapa publicado de onde as tirar.
// As seis regiões que a Rockstar identifica como exploráveis. As coordenadas
// são a disposição deste mapa estilizado, não geografia oficial — não há
// mapa publicado de onde as tirar.
//
// `blurb`: Vice City e Leonida Keys têm descrição oficial, reescrita aqui.
// As outras quatro ainda não têm, e o texto limita-se ao que a imagem
// oficial mostra — nada é preenchido por suposição.
export const regions = [
  { id: 'vice-city', label: 'VICE CITY', cx: 720, cy: 260, k: 1.7,
    image: IMG.viceCity, sourced: true, gallery: [IMG.viceCity, IMG.tattooNeon, IMG.tattooBack],
    county: 'Vice-Dale County', knownPlaces: ['La Perle', 'Stockyard', 'Tequesta', 'Vice Beach'],
    blurb: 'The money and the noise. Art deco frontage on Ocean Beach, bakeries in Little Cuba, near-genuine labels at the Tisha-Wocka market, and a port that sells itself as the cruise capital of the world.' },
  { id: 'leonida-keys', label: 'LEONIDA KEYS', cx: 740, cy: 540, k: 1.8,
    image: IMG.leonidaKeys, sourced: true, gallery: [IMG.leonidaKeys, IMG.keysStreet, IMG.keysBar],
    county: 'Mariana County', knownPlaces: ['Leonida Keys'],
    blurb: 'An archipelago that runs on deck chairs and open bars. Nothing here is flashy and nothing is in a hurry — which is easy to mistake for safe, given what the surrounding water is used for.' },
  { id: 'port-gellhorn', label: 'PORT GELLHORN', cx: 230, cy: 140, k: 1.8,
    image: IMG.portGellhorn, sourced: true, gallery: [IMG.portGellhorn, IMG.swampAirboat, IMG.swampChase],
    county: 'Kelly County', knownPlaces: ['Port Gellhorn'],
    blurb: 'The coast Leonida stopped advertising. The motels are cheap, the attractions are shuttered and the strip malls are empty — but something replaced the tourist trade, and it runs on malt liquor, painkillers and truck-stop caffeine. Dirt bikes, and keep a hand on your wallet.' },
  { id: 'grassrivers', label: 'GRASSRIVERS', cx: 240, cy: 420, k: 1.6,
    image: IMG.grassrivers, sourced: true, gallery: [IMG.grassrivers, IMG.swampStilts, IMG.swampGator, IMG.swampSkyline],
    county: 'Mariana County', knownPlaces: ['Grassrivers'],
    blurb: 'Wetland that predates everything around it and refuses to be managed. The alligators are the draw, but they are not the top of the food chain here — and what the mangroves hide is stranger than what they eat.' },
  // Ambrosia é descrita como o coração do estado e Mount Kalaga como
  // encostada à fronteira norte — as duas únicas pistas geográficas que a
  // Rockstar dá, e são elas que fixam estas posições.
  { id: 'ambrosia', label: 'AMBROSIA', cx: 430, cy: 290, k: 1.7,
    image: IMG.ambrosia, sourced: true, gallery: [IMG.ambrosia, IMG.ambrosiaBikers, IMG.ambrosiaNight, IMG.ambrosiaSunset],
    county: 'Ambrosia County', knownPlaces: ['Ambrosia'],
    blurb: 'Inland Leonida, where American industry and old-fashioned values are defended at whatever price they cost. The Allied Crystal sugar refinery supplies the work; the local biker club supplies more or less everything else.' },
  { id: 'mount-kalaga', label: 'MOUNT KALAGA', cx: 430, cy: 120, k: 1.7,
    image: IMG.mountKalaga, sourced: true, gallery: [IMG.mountKalaga, IMG.ambrosiaDrive, IMG.swampStilts],
    county: 'County not specified', knownPlaces: ['Mount Kalaga National Park'],
    blurb: 'A national landmark pressed against the state’s northern border, given over to hunting, fishing and off-road trails. The backwoods around it are settled by mystics and radicals who chose the distance from government deliberately.' },
]

export const mapFilters = [
  { id: 'locations', label: 'LOCATIONS', color: '#F5F4F0' },
  { id: 'secrets', label: 'SECRETS', color: '#F1A3C3' },
  { id: 'activities', label: 'ACTIVITIES', color: '#65DCCB' },
  { id: 'vehicles', label: 'VEHICLES', color: '#9B83F4' },
]

export const locations = [
  { slug: 'panther-mural', name: 'PANTHER MURAL', category: 'secrets', region: 'vice-city', x: 700, y: 232,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    desc: 'Reference found in the Extended Look.', clues: [2,3], easterEgg: true },
  { slug: 'ocean-drive-strip', name: 'OCEAN DRIVE STRIP', category: 'locations', region: 'vice-city', x: 745, y: 300,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    desc: 'Neon hotel frontage documented across every official drop.' },
  { slug: 'vice-plaza', name: 'VICE PLAZA', category: 'locations', region: 'vice-city', x: 690, y: 300,
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/plaza',
    publishedAt: '2026-08-18', updatedAt: '2026-08-24',
    desc: 'Downtown commercial block matched by frame analysis.' },
  { slug: 'little-haiti-market', name: 'LITTLE HAITI MARKET', category: 'locations', region: 'vice-city', x: 665, y: 205,
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/haiti',
    publishedAt: '2026-08-18', updatedAt: '2026-08-24',
    desc: 'Street market with the mural-lined alley from Trailer 2.' },
  { slug: 'neon-pier', name: 'NEON PIER', category: 'activities', region: 'vice-city', x: 760, y: 372,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-26',
    desc: 'Ferris wheel boardwalk. Minigames strongly implied.' },
  { slug: 'gauntlet-spawn', name: 'GAUNTLET SPAWN', category: 'vehicles', region: 'vice-city', x: 726, y: 330,
    status: 'verified', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/gauntlet-spawn',
    publishedAt: '2026-08-19', updatedAt: '2026-08-26',
    desc: 'Covered parking structure. Bravado Gauntlet sighting.', vehicle: 'bravado-gauntlet' },
  { slug: 'keys-causeway', name: 'KEYS CAUSEWAY', category: 'locations', region: 'leonida-keys', x: 700, y: 505,
    status: 'confirmed', sourceName: 'Trailer 2', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-15', updatedAt: '2026-08-22',
    desc: 'The dawn causeway shot that opens Trailer 2.' },
  { slug: 'sunken-wreck', name: 'SUNKEN WRECK', category: 'secrets', region: 'leonida-keys', x: 815, y: 560,
    status: 'verified', sourceName: 'Frame analysis', sourceUrl: 'https://example.com/wreck',
    publishedAt: '2026-08-12', updatedAt: '2026-08-21',
    desc: 'Hull visible at low tide east of the sandbar.', clues: [1,3], easterEgg: true },
  { slug: 'sandbar-party', name: 'SANDBAR PARTY', category: 'activities', region: 'leonida-keys', x: 770, y: 585,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-25',
    desc: 'Boat meet with music, jet skis and questionable decisions.' },
  { slug: 'port-cranes', name: 'PORT CRANES', category: 'locations', region: 'port-gellhorn', x: 205, y: 120,
    status: 'verified', sourceName: 'Frame analysis', sourceUrl: 'https://example.com/cranes',
    publishedAt: '2026-08-10', updatedAt: '2026-08-20',
    desc: 'Industrial gantry line along the northern basin.' },
  { slug: 'dry-dock-garage', name: 'DRY DOCK GARAGE', category: 'vehicles', region: 'port-gellhorn', x: 265, y: 170,
    status: 'verified', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/drydock',
    publishedAt: '2026-08-09', updatedAt: '2026-08-19',
    desc: 'Verified Sabre Turbo spawn between the slipways.', vehicle: 'declasse-sabre-turbo' },
  { slug: 'ghost-signal-mast', name: 'GHOST SIGNAL MAST', category: 'secrets', region: 'port-gellhorn', x: 160, y: 200,
    status: 'rumour', sourceName: 'Community report', sourceUrl: 'https://example.com/ghost',
    publishedAt: '2026-07-28', updatedAt: '2026-07-28',
    desc: 'A numbers-station loop reported by two independent users.', clues: [0,3], easterEgg: true },
  { slug: 'airboat-races', name: 'AIRBOAT RACES', category: 'activities', region: 'grassrivers', x: 240, y: 430,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-24',
    desc: 'Swamp circuit races through the mangrove channels.' },
  { slug: 'gator-shack', name: 'GATOR SHACK', category: 'secrets', region: 'grassrivers', x: 300, y: 470,
    status: 'verified', sourceName: 'Frame analysis', sourceUrl: 'https://example.com/gator',
    publishedAt: '2026-08-08', updatedAt: '2026-08-18',
    desc: 'The bait shop with the alligator mural — and something in the freezer.', clues: [2,4], easterEgg: true },
  { slug: 'swamp-loop-road', name: 'SWAMP LOOP ROAD', category: 'locations', region: 'grassrivers', x: 180, y: 380,
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/swamploop',
    publishedAt: '2026-08-05', updatedAt: '2026-08-15',
    desc: 'Probable state route connecting the wetlands to Port Gellhorn.' },

  // Bairros nomeados por Rockstar na página oficial de Vice City. Ao
  // contrário das entradas acima, estes existem por confirmação e não por
  // análise; as coordenadas continuam a ser a disposição deste mapa.
  { slug: 'ocean-beach', name: 'OCEAN BEACH', category: 'locations', region: 'vice-city', x: 762, y: 318,
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Art deco hotels in pastel, and the white sand that made the postcard.' },
  { slug: 'little-cuba', name: 'LITTLE CUBA', category: 'locations', region: 'vice-city', x: 668, y: 238,
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'The neighbourhood that runs on its bakeries — panaderías on every block.' },
  { slug: 'tisha-wocka-flea-market', name: 'TISHA-WOCKA FLEA MARKET', category: 'locations', region: 'vice-city', x: 640, y: 282,
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Where the labels are almost right and nobody is checking.' },
  { slug: 'vc-port', name: 'VC PORT', category: 'locations', region: 'vice-city', x: 706, y: 176,
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Billed as the cruise capital of the world — the city’s front door and its loading bay at once.' },
  { slug: 'allied-crystal-refinery', name: 'ALLIED CRYSTAL REFINERY', category: 'locations', region: 'ambrosia', x: 412, y: 305,
    status: 'confirmed', sourceName: 'Official Ambrosia page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'The sugar refinery that employs Ambrosia — and the reason the region has anything to fight over.' },
]

// ---------------- EASTER EGGS ----------------
export const easterEggs = [
  {
    slug: 'panther-mural', name: 'PANTHER MURAL', status: 'confirmed',
    sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    image: IMG.ambrosiaNight, location: 'panther-mural', region: 'VICE CITY',
    summary: 'Reference found in the Extended Look.',
    clues: [
      { text: 'Mural visible behind Jason at 01:41 in the Extended Look.', found: true },
      { text: 'Same panther silhouette stencilled at the Little Haiti market.', found: true },
      { text: 'Third instance rumoured near the Gellhorn rail yard.', found: false },
    ],
  },
  {
    slug: 'sunken-wreck', name: 'SUNKEN WRECK', status: 'verified',
    sourceName: 'Frame analysis', sourceUrl: 'https://example.com/wreck',
    publishedAt: '2026-08-12', updatedAt: '2026-08-21',
    image: IMG.leonidaKeys, location: 'sunken-wreck', region: 'LEONIDA KEYS',
    summary: 'A hull breaks the surface at low tide east of the sandbar.',
    clues: [
      { text: 'Hull outline visible in the causeway flyover shot.', found: true },
      { text: 'Name plate legible under enhancement.', found: false },
      { text: 'Cargo manifest reference in a loading screen.', found: false },
    ],
  },
  {
    slug: 'ghost-signal-mast', name: 'GHOST SIGNAL MAST', status: 'rumour',
    sourceName: 'Community report', sourceUrl: 'https://example.com/ghost',
    publishedAt: '2026-07-28', updatedAt: '2026-07-28',
    image: IMG.swampAirboat, location: 'ghost-signal-mast', region: 'PORT GELLHORN',
    summary: 'A numbers-station loop reported on an unused radio frequency.',
    clues: [
      { text: 'Two independent reports of the same 40-second loop.', found: false },
      { text: 'Mast structure visible in one background plate.', found: false },
      { text: 'Decoded message — unverified.', found: false },
    ],
  },
  {
    slug: 'gator-shack', name: 'GATOR SHACK', status: 'verified',
    sourceName: 'Frame analysis', sourceUrl: 'https://example.com/gator',
    publishedAt: '2026-08-08', updatedAt: '2026-08-18',
    image: IMG.portGellhorn, location: 'gator-shack', region: 'GRASSRIVERS',
    summary: 'The bait shop with the alligator mural — and something in the freezer.',
    clues: [
      { text: 'Mural matched across two captures.', found: true },
      { text: 'Freezer door interactable prompt visible.', found: true },
      { text: 'Interior contents unknown.', found: false },
      { text: 'Possible link to the Panther chain.', found: false },
    ],
  },
]

// ---------------- GUIDES ----------------
export const guides = [
  {
    slug: 'trailer-2-frame-by-frame', title: 'TRAILER 2, FRAME BY FRAME', readTime: 15,
    status: 'analysis', sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/guide-t2',
    publishedAt: '2026-08-21', updatedAt: '2026-08-26', image: IMG.keysStreet,
    summary: 'A complete scene-by-scene breakdown with timestamps and map references.',
    steps: [
      'Scrub to 00:07 — the causeway at dawn. Cross-reference with KEYS CAUSEWAY on the map.',
      'At 00:31, the mural district passes on the left. Three panther stencils are visible.',
      'The 01:12 interior-to-exterior cut is seamless. Watch the reflections for the second protagonist.',
      'Final frame: pause on the mural behind Jason. Start the Panther Mural easter egg chain from here.',
    ],
  },
  {
    slug: 'vice-city-districts-primer', title: 'VICE CITY DISTRICTS PRIMER', readTime: 10,
    status: 'verified', sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/guide-districts',
    publishedAt: '2026-08-17', updatedAt: '2026-08-24', image: IMG.viceCity,
    summary: 'Every documented district, its confirmed landmarks and what to expect.',
    steps: [
      'Start at Ocean Drive — the most documented strip in all official material.',
      'Little Haiti: market streets, body shops and the mural alley.',
      'Vice Plaza: the downtown commercial core, verified by frame analysis.',
      'Use the region filter on the map to isolate each district’s markers.',
    ],
  },
  {
    slug: 'weapon-wheel-basics', title: 'ARSENAL BASICS: READING THE WHEEL', readTime: 6,
    status: 'analysis', sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/guide-weapons',
    publishedAt: '2026-08-12', updatedAt: '2026-08-20', image: IMG.weaponPattern,
    summary: 'How the circular inventory works and how we document each slot.',
    steps: [
      'Each type occupies one wheel. Slots fill as weapons are confirmed.',
      'Ammunition reads as LOADED / RESERVE — the same format used across the database.',
      'CONFIRMED entries always cite the exact footage they were documented from.',
      'Empty slots are catalogued the moment a silhouette is verified.',
    ],
  },
  {
    slug: 'finding-the-panther-mural', title: 'FINDING THE PANTHER MURAL', readTime: 5,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-22', updatedAt: '2026-08-27', image: IMG.ambrosiaNight,
    summary: 'The two confirmed sightings and where the third clue probably hides.',
    steps: [
      'Open the map and select VICE CITY, then the SECRETS filter.',
      'The mural marker sits two blocks west of the Little Haiti market.',
      'Compare the stencil with the market alley instance — the tail curl differs.',
      'The third instance is rumoured near the Gellhorn rail yard. Treat as RUMOUR.',
    ],
  },
  {
    slug: 'feature-roundup-source-guide', title: 'HOW TO READ THE FEATURE ROUNDUP', readTime: 8,
    status: 'analysis', sourceName: 'GTA Base feature roundup', sourceUrl: 'https://www.gtabase.com/gta-6/guides/gta-6-features',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: IMG.keyArtPier,
    summary: 'A source guide for separating named facts, visible media, reported details and Online speculation.',
    steps: [
      'Start with direct Rockstar announcements, trailers and screenshots; those are the archive’s strongest sources.',
      'Treat named places, characters and release details in a secondary roundup as useful context, then retain its source label.',
      'Keep claims derived from leaks or interface interpretation in the reported layer, even when they sound plausible.',
      'Treat GTA Online forecasts separately: no progression, transfer or roleplay claim becomes confirmed without an official announcement.',
    ],
  },
]

// Wikipedia-style taxonomy for browsing the archive. The categories organise
// editorial entries; they do not imply that every linked claim is official.
export const encyclopediaCategories = [
  { slug: 'setting-and-locations', title: 'SETTING & LOCATIONS', description: 'Leonida, Vice City, counties, named regions and the limits of the published map.', color: 'pink', cover: IMG.viceCity, articles: ['leonida-the-state-before-the-map', 'leonida-map-source-ledger', 'vice-city-by-neighbourhood', 'extended-look-everything-revealed'] },
  { slug: 'characters-and-story', title: 'CHARACTERS & STORY', description: 'Lucia, Jason, supporting names and the published story premise.', color: 'mint', cover: IMG.luciaCaminos, articles: ['jason-and-lucia-the-story-premise', 'jason-lucia-story-context', 'extended-look-everything-revealed'] },
  { slug: 'release-and-editions', title: 'RELEASE & EDITIONS', description: 'Platforms, release chronology, editions, pre-orders and purchase context.', color: 'violet', cover: IMG.coverArt, articles: ['two-editions-one-source-checklist', 'the-release-date-moved-twice', 'cover-art-preorders-and-the-june-update', 'what-you-actually-get-in-each-edition', 'gta-wiki-development-and-release-ledger'] },
  { slug: 'development-and-trailers', title: 'DEVELOPMENT & TRAILERS', description: 'The public development record, trailer releases and the media timeline.', color: 'pink', cover: IMG.keyArtPier, articles: ['from-2022-to-the-title-reveal', 'trailer-one-and-trailer-two-in-context', 'two-trailers-and-the-numbers-behind-them', 'gta-wiki-development-and-release-ledger'] },
  { slug: 'media-and-reception', title: 'MEDIA & RECEPTION', description: 'Promotional art, screenshots, trailer indexes, awards and cultural context.', color: 'mint', cover: IMG.keyArtBeach, articles: ['the-official-media-index-by-subject', 'gta-wiki-media-gallery-and-reception', 'four-creators-rockstar-north-preview', 'awards-trivia-and-the-public-conversation'] },
  { slug: 'creator-preview-records', title: 'CREATOR PREVIEW RECORDS', description: 'Four separate accounts from the reported Rockstar North demonstrations, clearly marked as secondary preview reporting.', color: 'violet', cover: IMG.keyArtMotel, articles: ['creator-preview-record-how-to-read-it', 'creator-preview-session-format-and-boundaries', 'creator-preview-systems-index', 'davy-jones-rockstar-north-preview-record', 'tgg-rockstar-north-preview-record', 'el-rubius-rockstar-north-preview-record', 'mikeshowsha-rockstar-north-preview-record'] },
  { slug: 'source-notes-and-claims', title: 'SOURCE NOTES & CLAIMS', description: 'How the archive distinguishes announcements, secondary reporting, leaks and inference.', color: 'violet', cover: IMG.oceanView, articles: ['gta-wiki-claims-leaks-and-source-boundaries', 'combat-and-police-claims-ledger', 'systems-visuals-and-world-interactions', 'vehicles-and-online-separate-the-known'] },
]

const ARTICLE_VISUAL_SETS = {
  setting: [IMG.viceCity, IMG.grassrivers, IMG.leonidaKeys],
  characters: [IMG.luciaCaminos, IMG.jasonDuval, IMG.keyArtRobbery],
  release: [IMG.coverArt, IMG.ultimatePalms, IMG.stanierNight],
  development: [IMG.keyArtPier, IMG.keyArtMotel, IMG.keyArtBeach],
  media: [IMG.keyArtBeach, IMG.ambrosiaParty, IMG.mountKalaga],
  sources: [IMG.oceanView, IMG.docksCrew, IMG.weaponPattern],
}

export function articleVisuals(article) {
  const slug = article.slug
  let set = ARTICLE_VISUAL_SETS.sources
  if (/leonida|map|vice-city|location|state/.test(slug)) set = ARTICLE_VISUAL_SETS.setting
  else if (/jason|lucia|character|story/.test(slug)) set = ARTICLE_VISUAL_SETS.characters
  else if (/edition|release-date|preorder|cover-art/.test(slug)) set = ARTICLE_VISUAL_SETS.release
  else if (/development|title-reveal|trailer/.test(slug)) set = ARTICLE_VISUAL_SETS.development
  else if (/media|award|reception|index/.test(slug)) set = ARTICLE_VISUAL_SETS.media
  return [article.image, ...set.filter((image) => image !== article.image)].slice(0, 3)
}

export const categoriesForArticle = (slug) => encyclopediaCategories.filter((category) => category.articles.includes(slug))
export const relatedArticlesFor = (slug, limit = 3) => {
  const categorySlugs = new Set(categoriesForArticle(slug).map((category) => category.slug))
  return articles.filter((article) => article.slug !== slug && categoriesForArticle(article.slug).some((category) => categorySlugs.has(category.slug))).slice(0, limit)
}

// ---------------- LOOKUP HELPERS ----------------
// Contadores do cabeçalho, contados a partir do que está mesmo na base.
// Estavam escritos à mão — diziam 186 artigos e 12 personagens quando havia
// 8 e 6 — e um arquivo que se apresenta como documentado não pode abrir com
// números que não batem certo com o seu próprio conteúdo.
const pad = (n) => String(n).padStart(2, '0')
const contar = (arr, teste) => arr.filter(teste).length

export const SITE_COUNTERS = {
  home: [
    [pad(articles.length), 'ARTICLES'],
    [pad(easterEggs.length), 'SECRETS'],
    [pad(guides.length), 'GUIDES'],
  ],
  news: [
    [pad(articles.length), 'ARTICLES'],
    [pad(contar(articles, (a) => a.category === 'official')), 'OFFICIAL'],
    [pad(contar(articles, (a) => a.status === 'confirmed')), 'CONFIRMED'],
  ],
  map: [
    [pad(locations.length), 'LOCATIONS'],
    [pad(easterEggs.length), 'SECRETS'],
    [pad(regions.length), 'REGIONS'],
  ],
  characters: [
    [pad(characters.length), 'CHARACTERS'],
    [pad(relationships.length), 'RELATIONSHIPS'],
    [pad(contar(characters, (c) => c.status === 'confirmed')), 'CONFIRMED'],
  ],
}

export const bySlug = (arr, slug) => arr.find((x) => x.slug === slug)
export const characterBySlug = (slug) => characters.find((c) => c.slug === slug)
export const relationshipsFor = (slug) => relationships.filter((r) => r.a === slug || r.b === slug)
