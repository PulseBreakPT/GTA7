import { isRockstarUrl } from './official-links'
import { vehicleBible } from './vehicle-bible'
import { weaponBible } from './weapon-bible'

// GTA LORE — local structured data.
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
  calHamptonPortrait: '/media/characters/cal-hampton-portrait.webp', calHamptonPhone: '/media/characters/cal-hampton-phone.webp',
  boobieIkePortrait: '/media/characters/boobie-ike-portrait.webp', boobieIkePhone: '/media/characters/boobie-ike-phone.webp',
  drequanPriestPortrait: '/media/characters/drequan-priest-portrait.webp', drequanPriestPhone: '/media/characters/drequan-priest-phone.webp',
  raulBautistaPortrait: '/media/characters/raul-bautista-portrait.webp', raulBautistaPhone: '/media/characters/raul-bautista-phone.webp',
  brianHederPortrait: '/media/characters/brian-heder-portrait.webp', brianHederPhone: '/media/characters/brian-heder-phone.webp',
  realDimezPortrait: '/media/characters/real-dimez-portrait.webp', realDimezPhone: '/media/characters/real-dimez-phone.webp',

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

  // Ilustrações do arquivo. Não são material da Rockstar nem da Sony: são
  // desenhos nossos para entradas que não têm imagem que se possa usar, e
  // trazem o aviso dentro da própria imagem para que ele viaje com o
  // ficheiro para onde a imagem for parar.
  dualsenseGtaVi: '/media/news/dualsense-gta-vi.webp',

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
  { name: 'Vice-Dale County', detail: 'County seat Vice City. Also names Vice Beach and Hamlet as cities, and Bluegrass, Buckskin and Peregrine Bay as towns. Bordered by Kelly County to the west and Leonard County to the north.', source: 'GTA Wiki · Vice-Dale County' },
  { name: 'Kelly County', detail: 'West of Vice-Dale County. Names Port Gellhorn as its primary city, with Emerald Springs and Draper Island also named. No county seat published.', source: 'GTA Wiki · Kelly County' },
  { name: 'Mariana County', detail: 'Encompasses the Grassrivers and Leonida Keys regions. Names Capri as a city, and Goose Key, Key Lento, Sunrise RV Park and Watson Bay as towns. No county seat published.', source: 'GTA Wiki · Mariana County' },
  { name: 'Ambrosia County', detail: 'Names Ambrosia as its primary city, on the southwest shore of Lake Leonida. No county seat, borders or full government structure published.', source: 'GTA Wiki · Ambrosia County' },
  { name: 'Leonard County', detail: 'Borders Vice-Dale County to the south. Names Waning Sands as its only confirmed city; described as mostly suburban. No county seat published.', source: 'GTA Wiki · Leonard County' },
  { name: 'Lummox County', detail: 'Named as sitting above Kelly, Ambrosia and Leonard counties, containing Mount Kalaga National Park and the town of Yorktown. Its name and boundaries come from the leaked August 2026 gameplay map, not an official Rockstar source — this archive keeps it as reported, not confirmed.', source: 'GTA Wiki · Lummox County' },
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
      // A arte de capa é a imagem da Standard por definição: é a que está na
      // caixa do code-in-box. A da Ultimate é a que a Rockstar publicou na
      // própria secção da edição. Nenhuma das duas é ilustração escolhida por
      // nós — cada cartão mostra a arte da sua edição, e diz de onde vem.
      image: 'coverArt',
      imageNote: 'OFFICIAL COVER ART',
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
      image: 'ultimatePalms',
      imageNote: 'ROCKSTAR · ULTIMATE EDITION ART',
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

  // A tabela de comparação. Cada linha sai do que as duas listas `includes`
  // já diziam — nenhuma célula é dedução nossa: onde uma edição não fala do
  // assunto, a resposta está na `notAnnounced` e é a mesma para as duas.
  // Existe porque duas listas de vistos lado a lado obrigam o leitor a
  // compará-las de cabeça, e a pergunta que traz à página é exactamente essa.
  matrix: [
    { label: 'Grand Theft Auto VI — the full game', standard: true, ultimate: true },
    { label: 'Ultimate Edition Upgrade — 16 items', standard: false, ultimate: true, note: 'Sold separately to Standard owners.' },
    { label: 'Vintage Vice City Pack', standard: true, ultimate: true, note: 'Any qualifying purchase before November 20, 2026.' },
    { label: 'One month of GTA+', standard: true, ultimate: true, note: 'Qualifying digital purchases only — not in the physical breakdown.' },
    { label: 'Physical code-in-box release', standard: true, ultimate: false },
    { label: 'Game disc in the box', standard: false, ultimate: false, note: 'Neither edition ships a disc.' },
    { label: 'Early access to the game', standard: false, ultimate: false, note: 'Both launch on November 19, 2026.' },
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
// O tempo de leitura de cada entrada, contado do próprio texto a 200
// palavras por minuto, que é a medida corrente. Os números que estavam
// escritos à mão diziam catorze minutos para um artigo de sessenta
// palavras e quinze para um guia de sessenta e oito: um número inventado
// sobre o que se vai ler é do mesmo tipo de todos os outros que este
// arquivo recusa. Passam a ser contados, e a mover-se com o texto.
const READ_WPM = 200
const readMinutes = (...parts) => {
  const words = parts
    .flat()
    .filter((x) => typeof x === 'string')
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / READ_WPM))
}

export const articles = [
  {
    slug: 'playstation-gta-vi-dualsense-controllers',
    title: 'PLAYSTATION ANNOUNCES TWO GTA VI DUALSENSE CONTROLLERS',
    category: 'official', status: 'confirmed',
    sourceName: 'PlayStation.Blog', sourceUrl: 'https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/',
    publishedAt: '2026-09-04', updatedAt: '2026-09-04', readTime: 0,
    image: IMG.dualsenseGtaVi, featured: false,
    excerpt: 'Sony has named two limited-edition pads, priced them and dated them for launch day. The announcement is Sony\u2019s, not Rockstar\u2019s — and that distinction is the whole entry.',
    body: [
      'Sony Interactive Entertainment announced two limited-edition controllers on 3 September 2026: the DualSense Wireless Controller \u2014 Grand Theft Auto VI White Limited Edition and its black counterpart. Both carry official Grand Theft Auto VI branding, a colour-shifting finish and palm-tree detailing moulded into the grips rather than printed on them.',
      'Sony describes the white pad as Vice City at daybreak \u2014 white sand, pastel sky \u2014 and the black one as the same city after dark, catching what it calls the energy of Vice City\u2019s nightlife. The two are the same hardware in two liveries, not two different controllers.',
      'The price is US$84.99, \u20AC84.99, \u00A374.99 or \u00A512,480, and both are dated 19 November 2026 \u2014 the same day as the game. Pre-orders open on 10 September, at 7:00 PT in the United States and at 10:00 local time in the United Kingdom, France, Germany, Austria, Spain, Italy, the Netherlands, Belgium and Luxembourg, through direct.playstation.com in those markets and participating retailers elsewhere.',
      'This entry sits under a different label from most of the archive. The source is the platform holder, not Rockstar: it is official material about a PlayStation accessory, and it says nothing about the game itself \u2014 no bundle, no console cover, no date change, no content. Where an announcement comes from matters as much as what it says, and this one comes from Sony.',
      'What Sony did not announce is worth recording too: no matching PS5 console covers, no console bundle, and nothing for any other platform. If those follow, this entry gets longer.',
    ],
  },
  {
    slug: 'november-19-2026-the-date-that-stuck',
    title: 'NOVEMBER 19, 2026: THE DATE THAT STUCK',
    category: 'official', status: 'confirmed',
    sourceName: 'Rockstar Newswire', sourceUrl: 'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5,
    image: IMG.keyArtPier, featured: true,
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
    image: IMG.viceCity, featured: false,
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
    image: IMG.ultimatePalms, featured: false,
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
    image: IMG.swampSkyline, featured: false,
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
    image: IMG.keyArtRobbery, featured: false,
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
    image: IMG.ambrosiaParty, featured: true,
    excerpt: 'An organised read of the supplied summary: Leonida, the protagonists, the timeline and what still needs confirmation.',
    body: [
      'The summary places GTA VI in Leonida, within the HD Universe, with Lucia Caminos and Jason Duval at the centre of its story. It starts with a failed score that pulls them into a conspiracy larger than Vice City itself.',
      'It divides the state into counties and regions: Vice-Dale County includes Vice City; Kelly County is tied to Port Gellhorn; Mariana County groups Grassrivers and Leonida Keys; and Ambrosia County is associated with Ambrosia. Waning Sands is linked to Leonard County, without a confirmed position in this archive.',
      'It lists November 19, 2026 for PlayStation 5 and Xbox Series X|S, and names RAGE as the engine. It also dates the cover-art reveal to June 18 and the editions update to June 24. These are presented as facts from the supplied reference, not as a replacement for a direct Rockstar confirmation.',
      'The summary also combines announcements, promotional material and leak claims. This archive therefore uses only names and territorial context; gameplay details, map-size claims, edition content and leaked material remain unconfirmed until backed by an official source.',
    ],
  },
  {
    slug: 'official-development-and-release-ledger',
    title: 'GTA VI: DEVELOPMENT & RELEASE LEDGER',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.coverArt, featured: false,
    excerpt: 'A clear, source-attributed route from the 2022 development confirmation to the current release date.',
    body: [
      'The extracted GTA Wiki page traces the public record from Rockstar’s February 2022 development confirmation through the title reveal in Trailer 1 on December 4, 2023. It identifies Rockstar Studios as developer, Rockstar Games as publisher, and Leonida as the setting.',
      'Its chronology records the public target moving from 2025 to May 26, 2026 in May 2025, then to November 19, 2026 in November 2025. It also records a cover-art reveal on June 18, 2026 and an editions update on June 24.',
      'The page lists PlayStation 5 and Xbox Series X|S. It places the story in the HD Universe and names Lucia Caminos and Jason Duval as the two protagonists. These statements are retained as source-attributed reference data, with direct Rockstar sources taking priority whenever available.',
    ],
  },
  {
    slug: 'official-media-gallery-and-reception',
    title: 'THE GTA WIKI MEDIA INDEX, SORTED',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5, image: IMG.keyArtMotel, featured: false,
    excerpt: 'The supplied page’s screenshot, artwork, trailer and awards index—separated from rumour and reconstruction.',
    body: [
      'The extracted page groups promotional images around eight named characters: Jason, Lucia, Cal Hampton, Boobie Ike, Dre’Quan Priest, Real Dimez, Raul Bautista and Brian Heder. Its location gallery names Vice City, Leonida Keys, Port Gellhorn, Ambrosia, Grassrivers and Mount Kalaga.',
      'It also links Trailer 1 and Trailer 2, alongside official-style artwork and logo variants. This archive uses locally held promotional assets and labels them by subject; it does not hotlink the Wiki’s gallery. The vehicle database is the one exception: it stores its own local, credited copies of official screenshots identified through the Wiki’s vehicle index, downloaded and re-hosted rather than linked, and always attributed to that source page.',
      'For reception, the page records Most Anticipated Game wins at The Game Awards in 2024 and 2025. It also aggregates audience figures and music discussion around the trailers, which are preserved as attributed media context rather than archive-verified metrics.',
    ],
  },
  {
    slug: 'claims-leaks-and-source-boundaries',
    title: 'WHY THE ARCHIVE LABELS LEAK CLAIMS',
    category: 'analysis', status: 'analysis',
    sourceName: 'GTA Wiki · community reference', sourceUrl: 'https://gta.fandom.com/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5, image: IMG.oceanView, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 4, image: IMG.keyArtRobbery, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.keyArtBeach, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 14, image: IMG.keyArtPier, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtRobbery, featured: false,
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
    title: 'DAVY JONES VISITS ROCKSTAR NORTH FOR GTA VI PRESENTATION',
    category: 'analysis', status: 'analysis',
    sourceName: 'Davy Jones / Flow Games preview report', sourceUrl: 'https://flowgames.gg/exclusivo-vimos-gta-6-de-perto-salto-maior-ja-visto/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 15, image: IMG.davyJones, imageCredit: 'Davy Jones public X profile image', imageCreditUrl: 'https://x.com/DavyJonesRJ', featured: false,
    excerpt: 'Davy Jones travelled to Rockstar North and watched an extended GTA VI presentation led by Rob Nelson, reporting on the connected systems behind Leonida’s open world.',
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 14, image: IMG.tgg, imageCredit: 'TGG public X video thumbnail', imageCreditUrl: 'https://x.com/TGGonYT', featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 12, image: IMG.elRubius, imageCredit: 'El Rubius author portrait · Planeta de Libros', imageCreditUrl: 'https://www.planetadelibros.com.co/autor/rubius/000040361', featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 12, image: IMG.mikeShowSha, imageCredit: 'MikeShowSha public YouTube channel image', imageCreditUrl: 'https://www.youtube.com/@MikeShowSha', featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.viceCity, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtRobbery, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.ultimatePalms, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 9, image: IMG.keyArtPier, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtMotel, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.keyArtBeach, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.coverArt, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.ambrosiaNight, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 8, image: IMG.ultimatePalms, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.viceCity, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.keyArtRobbery, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.weaponPattern, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 7, image: IMG.swampSkyline, featured: false,
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
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6, image: IMG.stanierNight, featured: false,
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
    sourceName: 'Leonida Archive Editorial', sourceUrl: null,
    publishedAt: '2026-08-26', updatedAt: '2026-08-26', readTime: 8,
    image: IMG.weaponPattern, featured: false,
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
    image: IMG.swampChase, featured: false,
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
    sourceName: 'The Archivist', sourceUrl: null,
    publishedAt: '2024-05-24', updatedAt: '2026-08-20', readTime: 14,
    image: IMG.keysStreet, featured: true,
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
    sourceName: 'Community Report', sourceUrl: null,
    publishedAt: '2026-08-27', updatedAt: '2026-08-27', readTime: 4,
    image: IMG.viceCity, featured: false,
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
    sourceName: 'Leonida Archive', sourceUrl: null,
    publishedAt: '2026-08-26', updatedAt: '2026-08-26', readTime: 3,
    image: IMG.stanierTail, featured: false,
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
    sourceName: 'Community Forum Digest', sourceUrl: null,
    publishedAt: '2026-08-23', updatedAt: '2026-08-23', readTime: 7,
    image: IMG.keyArtRobbery, featured: false,
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
    sourceName: 'Leonida Archive Editorial', sourceUrl: null,
    publishedAt: '2026-08-22', updatedAt: '2026-08-25', readTime: 9,
    image: IMG.viceCity, featured: false,
    excerpt: 'From Ocean Drive to Little Haiti, the full index of documented districts.',
    body: [
      'This index is rebuilt after every official drop. It tracks the named locations in this archive across six confirmed regions.',
      'Use the visual places atlas to filter the source-labelled location directory.',
    ],
  },
]

articles.forEach((a) => { a.readTime = readMinutes(a.title, a.excerpt, a.body) })

export const liveUpdates = [
  { time: '14:32', text: 'R* confirms second trailer for September.', status: 'official' },
  { time: '13:47', text: 'New Vice City images surface online.', status: 'verified' },
  { time: '12:21', text: 'Possible full map circulates in the community.', status: 'rumour' },
  { time: '11:09', text: 'Rockstar registers new Leonida-related trademark.', status: 'official' },
  { time: '10:02', text: 'Voice actor hints at a classic character return.', status: 'rumour' },
]

export const sources = [
  { abbr: 'R*', name: 'Rockstar Games', rating: 5, kind: 'Official publisher source' },
]


// ---------------- WEAPONS ----------------
// `src` dá à entrada a sua fonte real, e `unpublished` marca as que aparecem
// em material oficial mas cujas estatísticas ninguém publicou — a interface
// diz isso em vez de mostrar barras que seriam inventadas.
const W = (slug, name, type, ammo, mag, stats, status, image, desc, locs, src, unpublished, association = null, confirmedDetails = [], notPublished = [], manufacturer = 'NOT OFFICIALLY SPECIFIED', character = null, content = null) => ({
  ...(() => {
    const base = {
      slug, name, type, ammo, mag,
      stats, // [damage, fireRate, accuracy, range, capacity, weightKg]
      unpublished: unpublished || false,
      status,
      evidenceStatus: status === 'confirmed' ? 'OFFICIAL — NAMED' : status === 'verified' ? 'OFFICIAL — DEPICTED' : status === 'category' ? 'OFFICIAL — CATEGORY CONFIRMED' : status === 'analysis' ? 'UNVERIFIED IDENTIFICATION' : 'SPECULATIVE',
    }
    const bible = weaponBible({ ...base, sourceName: src?.[0], association })
    return { ...base, evidenceLevel: bible.evidenceLevel, evidenceStatus: bible.evidenceLevel }
  })(),
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
  confirmedDetails,
  notPublished,
  manufacturer,
  character,
  content,
})

export const weaponTypes = [
  { id: 'handgun', label: 'HANDGUN' },
  { id: 'shotgun', label: 'SHOTGUN' },
  { id: 'smg', label: 'SUBMACHINE GUN' },
  { id: 'rifle', label: 'RIFLE' },
  { id: 'heavy', label: 'HEAVY' },
  { id: 'explosives', label: 'EXPLOSIVES' },
  { id: 'melee', label: 'MELEE' },
  { id: 'custom', label: 'COSMETICS' },
]

// Fontes reais usadas nas entradas abaixo. A Rockstar não publicou o arsenal
// nem estatísticas de arma nenhuma: o que existe é o que se vê nas imagens
// oficiais, mais o levantamento feito pela imprensa. As entradas marcadas
// `unpublished` mostram isso em vez de barras de números.
const SRC_RS = ['Rockstar Games · GTA VI official gallery', 'https://www.rockstargames.com/VI/media']
const SRC_ED = ['Rockstar Games · GTA VI Editions', 'https://www.rockstargames.com/VI/editions']
// Índice alargado, importado do levantamento comunitário da GTA Wiki. Estes
// registos não vêm da Rockstar — vêm da forma como a wiki cataloga trailers,
// capturas e fugas. Por isso ficam sempre `unpublished`, com fonte própria,
// e os que a wiki marca como fuga (*) entram como 'rumour', não 'confirmed'.
const SRC_WIKI = ['GTA Wiki · Vehicles in GTA VI', 'https://gta.wiki/w/Vehicles_in_GTA_VI']
const SRC_WIKI_WEAPONS = ['GTA Wiki · Weapons in GTA VI', 'https://gta.wiki/w/Weapons_in_GTA_VI']
// A página de personagens da wiki é diferente das de veículos e armas: não
// tem sistema de fugas (*), documenta só quem a Rockstar já revelou. O único
// marcador é para quem aparece sem nome — por isso essas entradas ficam
// `verified` (mostrado), nunca `rumour`.
const SRC_WIKI_CHARACTERS = ['GTA Wiki · Characters in GTA VI', 'https://gta.wiki/w/Characters_in_GTA_VI']
const SRC_PS = ['PlayStation · GTA VI Ultimate Edition', 'https://store.playstation.com/en-us/concept/10000730/']

export const weapons = [
  // ---- Anunciado pela Rockstar como conteúdo de edição, e mostrado com o
  // nome na galeria oficial. É a única arma do arsenal cujo nome vem da
  // Rockstar e não de um levantamento. ----
  W('morgan-revolvers', 'HAWK & LITTLE MORGAN REVOLVERS', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.morganRevolvers,
    'An Ultimate Edition revolver family with his-and-hers variants. Rockstar describes palm-tree-etched grips, engraved detailing and a high-performance scope, sourced from the Vercetti Estate. No separate mechanical models or performance figures have been published.',
    null, SRC_PS, true, 'ULTIMATE EDITION · JASON & LUCIA VARIANTS',
    ['Ultimate Edition reward with his-and-hers variants.', 'Palm-tree-etched grips, engraved detailing and a high-performance scope are described by Rockstar.', 'Rockstar describes the revolver family as sourced from the Vercetti Estate.', 'The GTA Wiki reports an official screenshot showing the revolver with a scope attachment, and confirms both Jason and Lucia receive a personalized Morgan under the Ultimate Edition.'],
    ['Separate formal model names or distinct performance figures for the two variants.'], 'HAWK & LITTLE', 'JASON DUVAL · LUCIA CAMINOS', 'ULTIMATE EDITION'),

  W('girardi-es9', 'GIRARDI ES9 / BERETTA 92FS-INSPIRED PISTOL', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponVariants,
    'Jason Duval’s named pistol. Rockstar’s Ultimate Edition description confirms the Girardi ES9 and a personalised engraved version; no calibre, capacity or performance figures have been published.',
    null, SRC_PS, true, 'JASON DUVAL · ULTIMATE PERSONALIZED VARIANT',
    ['Jason is associated with the Girardi ES9 pistol.', 'A detailed engraved personalized version is an Ultimate Edition benefit.', 'The GTA Wiki reports Jason firing it from the passenger seat of a Gauntlet Hellfire in the second trailer (1:50), and holding it while seated on an Alvino V1 motorcycle in an official screenshot.'],
    ['Caliber, capacity, ammunition, damage, fire rate, reload speed, range, price, availability and unlock conditions.'], 'GIRARDI', 'JASON DUVAL', 'BASE WEAPON · ULTIMATE PERSONALIZED VARIANT'),

  W('klose-k17', 'KLOSE K17 / POLYMER PISTOL', 'handgun', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponVariants,
    'Lucia Caminos’s named sidearm. Rockstar’s Ultimate Edition description confirms the Klose K17 and a personalised engraved version; no calibre, capacity or performance figures have been published.',
    null, SRC_PS, true, 'LUCIA CAMINOS · ULTIMATE PERSONALIZED VARIANT',
    ['Lucia is associated with the Klose K17 pistol.', 'A detailed engraved personalized version is an Ultimate Edition benefit.', 'Rockstar’s official gallery includes Personalized Weapon Variants.', 'The GTA Wiki reports it depicted repeatedly in the September 2022 leaks as the default handgun for both Lucia and Jason, and for numerous pedestrians including VCPD and VBPD officers and gang members such as San4San.'],
    ['Caliber, capacity, ammunition, attachments, suppressor compatibility, performance figures, price, availability and unlock conditions.'], 'KLOSE', 'LUCIA CAMINOS', 'BASE WEAPON · ULTIMATE PERSONALIZED VARIANT'),

  // ---- Documentado em material oficial (tipo visível, nome não anunciado) ----
  W('unnamed-rifle', 'UNNAMED RIFLE', 'rifle', 0, 0, [0, 0, 0, 0, 0, 0], 'verified', IMG.weaponPattern,
    'A rifle is visibly present in official Rockstar material. Rockstar has not published a fictional model name, manufacturer, attachments or performance data, so this record deliberately identifies only what is shown.',
    null, SRC_RS, true, 'OFFICIAL MEDIA · MODEL UNNAMED',
    ['A rifle is visually documented in official Rockstar material.', 'The GTA Wiki reports a poacher seen with an assault sniper rifle resting on his leg aboard an airboat in an official screenshot, with a Duke Army Company engraving visible above the magazine.'],
    ['Fictional model name, manufacturer, attachments and performance data.']),
  W('unnamed-shotgun', 'UNNAMED SHOTGUN', 'shotgun', 0, 0, [0, 0, 0, 0, 0, 0], 'verified', IMG.pistolPalms,
    'A shotgun is visibly present in official Rockstar material. Its model name, mechanism, ammunition and statistics have not been officially announced.',
    null, SRC_RS, true, 'OFFICIAL MEDIA · MODEL UNNAMED',
    ['A shotgun is visually documented in official Rockstar material.'],
    ['Fictional model name, mechanism, ammunition and performance data.']),
  // Estava marcada `rumour` porque o nome vinha de fugas. A galeria oficial
  // resolve a questão: na imagem das variantes personalizadas, a pistola de
  // Lucia traz KLOSE gravado no punho e KL17G1 na corrediça. O nome deixa de
  // ser boato — passa a leitura de material oficial, que é o que `verified` diz.
  W('vintage-vice-city-weapon-pattern', 'VINTAGE VICE CITY WEAPON PATTERN', 'custom', 0, 0, [0, 0, 0, 0, 0, 0], 'confirmed', IMG.weaponPatternVintage,
    'A pre-order finish rather than a weapon of its own: a pale palm-frond print that Rockstar shows applied to a pistol and a compact carbine, photographed across the back seat of a car with the night skyline behind. Which weapons accept it has not been stated.',
    null, SRC_ED, true, 'VINTAGE VICE CITY PACK',
    ['An exclusive weapon cosmetic/pattern included with the Vintage Vice City Pack.', 'Rockstar’s gallery includes a dedicated Vintage Vice City Weapon Pattern image.'],
    ['The underlying weapon, compatible weapons and a universal customization system.'], 'NOT OFFICIALLY SPECIFIED', null, 'VINTAGE VICE CITY PACK'),

  // ---- Índice alargado, importado do levantamento da GTA Wiki (48 entradas).
  // Ver SRC_WIKI_WEAPONS. ----
  W("mustang-357", "MUSTANG .357", "handgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/mustang-357.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The revolver can be seen held by a biker woman across her partner's chest in an official screenshot . The Duke Arms Company logo can be seen behind the cylinder, while \"Mustang .357\" can be seen engraved along the barrel."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("nipper-38", "NIPPER .38 / BERSA THUNDER .380-INSPIRED PISTOL", "handgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/nipper-38.webp', "A compact pistol visible in official Rockstar artwork. The slide carries the Nipper marking; the community catalogue classifies its real-world design inspiration as the Bersa Thunder .380.", null, SRC_WIKI_WEAPONS, true, "COVER ART · GTA WIKI INDEX", ["The pistol was first seen in Lucia's hand as Jason closes the trunk of their Tulip in a video on the game's promotional website. Lucia also holds it in official Starlet Motel artwork."], ["Final retail naming, manufacturer, calibre, capacity and performance figures."]),
  W("pistol", "PISTOL", "handgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/pistol.webp', "Visible in Trailer 1 footage.", null, SRC_WIKI_WEAPONS, true, "TRAILER 1 · GTA WIKI INDEX", ["The Pistol appears in every game in the HD Universe , usually provided at the start of the game as the first weapon the player obtains. It is a reliable backup weapon, but not one that should be used as a primary, as it is outclassed by many other weapons in damage, fire rate, and overall effectiveness."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("shocker", "SHOCKER", "handgun", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Shocker appears in the August 2026 GTA VI leaks , being wielded by Jason Duval after stealing the weapon from a security guard at the Allied Crystal Sugar Refinery .", "Leak account: The Shocker appears in the August 2026 GTA VI leaks , being wielded by Jason Duval after stealing the weapon from a security guard at the Allied Crystal Sugar Refinery .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("capo-pistol", "CAPO PISTOL", "handgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/capo-pistol.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Jason can be seen holding the pistol in a liquor store robbery with Lucia at the end of the game's first trailer (1:16). The pistol can also be seen in Raul Bautista 's hand in an official screenshot , where he is seen inside a Schafter V12 with a bag of cash on the passenger seat."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("850", "850", "shotgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/850.webp', "Shown in an official Rockstar video.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL VIDEO · GTA WIKI INDEX", ["The 850 is a popular model of shotgun used for self-defense as well as law enforcement applications, with seemingly multiple modifications available to make it suitable for tactical situations. The 850 was first seen in An Extended Look , with multiple characters wielding the stock version."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("stoeger-longfowler-inspired-shotgun", "STOEGER LONGFOWLER-INSPIRED SHOTGUN", "shotgun", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/stoeger-longfowler-inspired-shotgun.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A poacher can be seen aiming the shotgun at an alligator off the side of his airboat in an official screenshot . It assumes the design of a double-barreled shotgun, as seen from the aerial shot."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("compact-submachine-gun", "COMPACT SUBMACHINE GUN", "smg", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("dw9", "DW9", "smg", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/dw9.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The submachine gun was first seen in a official screenshot advertising the Vintage Vice City Pack , with it bearing a Tommy Vercetti -inspired weapon pattern."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("micro-submachine-gun", "MICRO SUBMACHINE GUN", "smg", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("br-gger-thomet-mp9-inspired-submachine-gun", "BRÜGGER & THOMET MP9-INSPIRED SUBMACHINE GUN", "smg", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/br-gger-thomet-mp9-inspired-submachine-gun.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The weapon was first seen in the game's second trailer , mounted on the wall behind Phil in a television commercial for Phil's Ammu-Nation ."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("heckler-koch-mp5-40-inspired-submachine-gun", "HECKLER & KOCH MP5/40-INSPIRED SUBMACHINE GUN", "smg", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/heckler-koch-mp5-40-inspired-submachine-gun.webp', "Visible in Trailer 1 footage.", null, SRC_WIKI_WEAPONS, true, "TRAILER 1 · GTA WIKI INDEX", ["Lucia and Jason are both seen bearing the submachine gun in the game's second trailer (1:15), during a hostage situation at Sinfrontera National Bank ."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("mac-11-inspired-submachine-gun", "MAC-11-INSPIRED SUBMACHINE GUN", "smg", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/mac-11-inspired-submachine-gun.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Jason is seen holding the submachine gun in two official screenshots for the Vintage Vice City Pack . The variant depicted in the screenshots features a Tommy Vercetti -inspired palm tree pattern also present on several other weapons in the same pack."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("assault-rifle", "ASSAULT RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("556", "556 / DUKE CARBINE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/556.webp', "A Duke Arms carbine visible in official Rockstar imagery; the archive keeps the 556 and Duke Carbine catalogue labels together until Rockstar publishes a final retail name.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Jason can be seen holding the carbine in an official screenshot. A Duke Army Company engraving is visible above the magazine. The weapon is also featured on the cover art, wielded by Raul Bautista in front of Sinfrontera National Bank."], ["Final retail name, calibre, capacity and performance figures."]),
  W("duke-special-ops-carbine", "DUKE SPECIAL OPS CARBINE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/duke-special-ops-carbine.webp', "Shown in an official Rockstar video.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL VIDEO · GTA WIKI INDEX", ["Raul Bautista can be seen using the carbine to hold off VCPD officers in a video on the promotional website . The weapon is similar in design to the 556 but features a shorter barrel and a different stock."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("bolt-action-sniper", "BOLT ACTION SNIPER", "rifle", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Bolt Action Sniper is mentioned numerous times in the September 2022 GTA VI leaks in a single clip. The name appears on the Weapon Wheel but, based on the weapon icon displayed alongside its name, appears to be incorrectly assigned to the regular Sniper Rifle which Jason has slung over his back.", "Leak account: The Bolt Action Sniper is mentioned numerous times in the September 2022 GTA VI leaks in a single clip. The name appears on the Weapon Wheel but, based on the weapon icon displayed alongside its name, appears to be incorrectly assigned to the regular Sniper Rifle which Jason has slung over his back.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("hunter-sniper", "HUNTER SNIPER", "rifle", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("sniper-rifle", "SNIPER RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Sniper Rifle is depicted numerous times in the September 2022 GTA VI leaks in a single clip. The weapon appears slung over Jason 's back. It appears to be incorrectly assigned the Bolt Action Sniper 's name and weapon icon.", "Leak account: The Sniper Rifle is depicted numerous times in the September 2022 GTA VI leaks in a single clip. The weapon appears slung over Jason 's back. It appears to be incorrectly assigned the Bolt Action Sniper 's name and weapon icon.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("duke-assault-sniper-rifle", "DUKE ASSAULT SNIPER RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/duke-assault-sniper-rifle.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A poacher is seen with an assault sniper rifle resting on his leg while on his airboat in an official screenshot . A Duke Army Company engraving can be seen above the magazine."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("remington-700-bdl-inspired-rifle", "REMINGTON 700 BDL-INSPIRED RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/remington-700-bdl-inspired-rifle.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A hunter can be seen holding the rifle in Mount Kalaga National Park in an official screenshot ."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("ruger-10-22-inspired-rifle", "RUGER 10/22-INSPIRED RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/ruger-10-22-inspired-rifle.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A hunter can be seen holding the rifle in Mount Kalaga National Park in an official screenshot ."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("springfield-armory-m1a-inspired-rifle", "SPRINGFIELD ARMORY M1A-INSPIRED RIFLE", "rifle", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/springfield-armory-m1a-inspired-rifle.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A poacher can be seen holding the rifle on an airboat in the Grassrivers in an official screenshot . The weapon bears a dark camo livery and a scope."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("grenade-launcher", "GRENADE LAUNCHER", "heavy", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/grenade-launcher.webp', "Visible in Trailer 1 footage.", null, SRC_WIKI_WEAPONS, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("rocket-launcher", "ROCKET LAUNCHER", "heavy", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("speargun", "SPEARGUN", "heavy", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks .", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("heavy-machine-gun", "HEAVY MACHINE GUN", "heavy", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("flashbangs", "FLASHBANGS", "explosives", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("golf-balls", "GOLF BALLS", "explosives", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("grenades", "GRENADES", "explosives", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("molotovs", "MOLOTOVS", "explosives", 0, 0, [0,0,0,0,0,0], "confirmed", null, "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("smoke-grenades", "SMOKE GRENADES", "explosives", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("fire-bottle", "FIRE BOTTLE", "explosives", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  // No record existed. Known only from the September 2022 development footage
  // through a community summary, so it is filed as rumour with no Rockstar link.
  W("pump-action-shotgun", "PUMP ACTION SHOTGUN", "shotgun", 0, 8, [0,0,0,0,0,0], "rumour", null, "Reported from the September 2022 development footage; Rockstar has not shown or named it.", null, ['Community summary', null], true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: a Shrewsbury pump-action shotgun modelled on the Mossberg 590, holding eight shells and built for close range.", "Leak account: it accepts attachments and cosmetic tints."], "SHREWSBURY"),
  W("baseball-bat", "BASEBALL BAT", "melee", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/baseball-bat.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Baseball Bat is one of the first melee weapons featured in the series. It is, by far, the easiest weapon to obtain, with one always at the safehouse in the games taking place in Grand Theft Auto III and Grand Theft Auto: Liberty City Stories and a common sight throughout the other games."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("crowbar", "CROWBAR", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("fist", "FIST", "melee", 0, 0, [0,0,0,0,0,0], "confirmed", null, "Shown in an official Rockstar video.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL VIDEO · GTA WIKI INDEX", ["Shown in an official Rockstar video."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("flashlight", "FLASHLIGHT", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("golf-driver", "GOLF DRIVER", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("golf-iron", "GOLF IRON", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("golf-putter", "GOLF PUTTER", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("golf-wedge", "GOLF WEDGE", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Leak account: The weapon is mentioned in a single clip from the September 2022 GTA VI leaks , where Jason is exploring a container at PortViceCity . The weapon's name appears on the developer's HUD when a cheat is activated.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("hammer", "HAMMER", "melee", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/hammer.webp', "Visible in Trailer 1 footage.", null, SRC_WIKI_WEAPONS, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("hunting-knife", "HUNTING KNIFE", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon was depicted in the August 2026 GTA VI leaks , where it seen used by Jason in the \"Junkies\" clip to attack a motor Officer on a police Sovereign 107 , and later, some hobos. In the video, Jason opens up the Weapon Wheel and selects the Hunting Knife in the \"Melee\" category.", "Leak account: The weapon was depicted in the August 2026 GTA VI leaks , where it seen used by Jason in the \"Junkies\" clip to attack a motor Officer on a police Sovereign 107 , and later, some hobos. In the video, Jason opens up the Weapon Wheel and selects the Hunting Knife in the \"Melee\" category.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("knife", "KNIFE", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("pool-cue", "POOL CUE", "melee", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/pool-cue.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, calibre, capacity and performance figures."]),
  W("switchblade", "SWITCHBLADE", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("torch-flashlight", "TORCH FLASHLIGHT", "melee", 0, 0, [0,0,0,0,0,0], "rumour", null, "Named in the GTA Wiki weapons index; Rockstar has not published performance data for it.", null, SRC_WIKI_WEAPONS, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The weapon is mentioned in a clip from the September 2022 GTA VI leaks .", "Leak account: The weapon is mentioned in a clip from the September 2022 GTA VI leaks .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."]),
  W("mini-golf-club", "MINI GOLF CLUB", "melee", 0, 0, [0,0,0,0,0,0], "confirmed", '/media/weapons/wiki/mini-golf-club.webp', "Shown in an official Rockstar screenshot.", null, SRC_WIKI_WEAPONS, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Cal Hampton can be seen holding the mini golf club in an official screenshot . It is a metal putter with a blue plastic grip."], ["Manufacturer name, calibre, capacity and performance figures."]),

].map((w) => ({ ...w, gallery: ({
  'morgan-revolvers': [IMG.morganRevolvers, IMG.edMorganRevolvers],
  'klose-k17': [IMG.weaponVariants, IMG.edWeaponVariants],
  'girardi-es9': [IMG.weaponVariants, IMG.edWeaponVariants],
  'vintage-vice-city-weapon-pattern': [IMG.weaponPatternVintage, IMG.edVintageWeaponPattern],
}[w.slug] || [w.image]).filter(Boolean) }))

// Contados a partir da própria lista. Estavam escritos à mão e desalinhavam
// com o conteúdo à primeira alteração.
export const weaponCounters = [
  [String(weapons.length).padStart(2, '0'), 'WEAPONS'],
  [String(new Set(weapons.map((w) => w.type)).size).padStart(2, '0'), 'TYPES'],
  [String(weapons.filter((w) => w.status === 'confirmed').length).padStart(2, '0'), 'CONFIRMED'],
]

// ---------------- VEHICLES ----------------
const V = (slug, name, cls, stats, specs, status, image, num, find, findLabel, src, unpublished, association = null, confirmedDetails = [], notPublished = [], manufacturer = 'NOT OFFICIALLY SPECIFIED', character = null, content = null) => ({
  ...(() => {
    const base = {
      slug, name, cls,
      stats, // [speed, acceleration, braking, handling]
      specs, // [doors, seats, drive, engine]
      unpublished: unpublished || false,
      status,
      evidenceStatus: status === 'confirmed' ? 'OFFICIAL — NAMED' : status === 'verified' ? 'OFFICIAL — DEPICTED' : status === 'category' ? 'OFFICIAL — CATEGORY CONFIRMED' : status === 'analysis' ? 'UNVERIFIED IDENTIFICATION' : 'SPECULATIVE',
    }
    const bible = vehicleBible({ ...base, sourceName: src?.[0], association })
    return { ...base, evidenceLevel: bible.evidenceLevel, evidenceStatus: bible.evidenceLevel }
  })(),
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
  association,
  confirmedDetails,
  notPublished,
  manufacturer,
  character,
  content,
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
  { id: 'sedans', label: 'SEDANS & COUPES', count: 0 },
  { id: 'compacts', label: 'COMPACTS', count: 0 },
  { id: 'suvs', label: 'SUVS', count: 0 },
  { id: 'vans', label: 'VANS & RVS', count: 0 },
  { id: 'trucks', label: 'TRUCKS & COMMERCIAL', count: 0 },
  { id: 'trains', label: 'TRAINS', count: 0 },
  { id: 'cycles', label: 'BICYCLES', count: 0 },
  { id: 'emergency', label: 'EMERGENCY & GOV', count: 0 },
  { id: 'industrial', label: 'INDUSTRIAL', count: 0 },
  { id: 'service', label: 'SERVICE', count: 0 },
]

export const vehicles = [
  // ---- Anunciados pela Rockstar como conteúdo das edições, e mostrados na
  // galeria oficial com o nome na legenda. Nome e imagem vêm ambos da fonte
  // primária; as estatísticas continuam por publicar, como em tudo o resto. ----
  V('grotti-cheetah-95', '’95 GROTTI CHEETAH', 'sports', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.grottiCheetah, '000',
    'Grotti’s signature mid-’90s sports car, included with the Ultimate Edition. Rockstar describes an ode to Shore Drive with a minimalist retro-futuristic livery; an exact unlock point and performance figures are not published.',
    'ULTIMATE EDITION · SHORE DRIVE', SRC_ED, true, 'SHORE DRIVE · ULTIMATE EDITION',
    ['Rockstar identifies it as Grotti’s signature mid-’90s sports car.', 'It has a minimalist retro-futuristic livery.', 'The GTA Wiki also reports the rear of a white 1995 Cheetah parked on Shore Drive in Vice Beach in the first trailer (0:33), with a green Leonida “CH33TAH” license plate.'],
    ['Exact chapter or unlock point, technical specifications and performance figures.'], 'GROTTI', null, 'ULTIMATE EDITION'),

  // ---- Índice alargado, importado do levantamento da GTA Wiki (334 entradas).
  // Não são nomes oficiais da Rockstar: vêm do catálogo comunitário, com
  // trailers/capturas identificados numa coluna e fugas noutra. Ver SRC_WIKI. ----
  V("mamba-gt", "MAMBA GT", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/mamba-gt.webp', "001", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Mamba GT was first mentioned in the September 2022 GTA VI leaks , in a debug menu listing world events during the developer's game session. The vehicle was listed as part of what was later revealed to be Wyman 's Classic Car Collection side mission."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sentinel-classic-cabriolet", "SENTINEL CLASSIC CABRIOLET", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sentinel-classic-cabriolet.webp', "002", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle can be seen parked in red along Shore Drive in Vice Beach at night, in a scroll-driven video of Jason and Lucia from the game's promotional website . The car also makes an appearance in An Extended Look where it appears to be a personal vehicle of both Jason and Lucia (8:05)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("pegassi-sports-car", "PEGASSI SPORTS CAR", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/pegassi-sports-car.webp', "003", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The sports car can be seen driving alongside Shore Drive within Vice Beach , past the Boardwalk Hotel , in the first trailer (0:33). It appears again in the second trailer on the same road, but further along, parked near the Dominion Hotel (2:06)."], ["Manufacturer name, performance figures and full specifications."], "PEGASSI"),
  V("buick-reatta-inspired-convertible", "BUICK REATTA-INSPIRED CONVERTIBLE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buick-reatta-inspired-convertible.webp', "004", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The convertible can be seen driven by Lucia during a high-speed chase through Port Gellhorn in the second trailer (2:28)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("kellison-j4-coupe-experimental-inspired-car", "KELLISON J4 COUPE EXPERIMENTAL-INSPIRED CAR", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/kellison-j4-coupe-experimental-inspired-car.webp', "005", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The sports car is depicted in green in official media for the game's Ultimate Edition . Jason and Lucia are perched on the car in Vice Beach in the scroll-driven landing video for the Ultimate Edition section on the game's promotional website , while an official screenshot shows them leaning against the car in Tequesta…"], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("mercedes-benz-cle-inspired-convertible", "MERCEDES-BENZ CLE-INSPIRED CONVERTIBLE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/mercedes-benz-cle-inspired-convertible.webp', "006", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The convertible is briefly visible behind Bae-Luxe in the second trailer (1:52), with its roof down and a tan interior."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("benefactor-coupe", "BENEFACTOR COUPE", "sedans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "007", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The car appears as a coupe variant of the Schafter first seen in the game's second trailer .", "Leak account: The car appears as a coupe variant of the Schafter first seen in the game's second trailer .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "BENEFACTOR"),
  V("pmp-700", "PMP 700", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/pmp-700.webp', "008", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The car can be seen parked up at the side of the road amongst other customized cars in the first trailer (0:28). It is implied to be customized for a lowrider meet (with a pinstripe livery, custom wheels and stickers on the windshield)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("stanier-1955", "STANIER (1955)", "classics", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/stanier-1955.webp', "009", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Stanier was first seen in the first trailer for Grand Theft Auto VI , in yellow and white, parked outside the Boardwalk Hotel along Shore Drive in Vice Beach (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("declasse-sedan", "DECLASSE SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/declasse-sedan.webp', "010", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle appeared in the September 2022 GTA VI leaks . In the leaked footage, a Declasse badge can clearly be seen on the grille, C-pillar, and rear end, indicating the vehicle's manufacturer."], ["Manufacturer name, performance figures and full specifications."], "DECLASSE"),
  V("dinka-sedan", "DINKA SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dinka-sedan.webp', "011", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle appeared in the September 2022 GTA VI leaks . One clip features Lucia standing across the street from the Cipher Mall in Rockridge , Vice City , where the sedan passes by her three times—first in light gray, then twice in dark blue."], ["Manufacturer name, performance figures and full specifications."], "DINKA"),
  V("obey-saloon", "OBEY SALOON", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/obey-saloon.webp', "012", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Two variations of the car, in grey and black, can be seen along the main road running through the Stockyard neighborhood of Vice City in the first trailer (0:27). The car is seen parked along Shore Drive in the second trailer (2:05)."], ["Manufacturer name, performance figures and full specifications."], "OBEY"),
  V("vapid-sedan", "VAPID SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-sedan.webp', "013", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The vehicle is a traditional full-size American sedan. It provides the basis for several fleet and custom variants, similar to the Stanier from the previous HD Universe installments."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("vapid-taxi", "VAPID TAXI", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-taxi.webp', "014", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The taxi is shown parked distantly on a road in Vice Beach in the first trailer (0:14). It is later seen close up in An Extended Look . The vehicle assumes a standard four-door sedan design comparable to that of the recurring Taxis , appearing to be a blend of the first and second generation models."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("willard-compact-sedan", "WILLARD COMPACT SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/willard-compact-sedan.webp', "015", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle first appeared in the September 2022 GTA VI leaks , most notably in a clip of it driving past Lucia in white during a police shootout in the Rockridge neighborhood of Vice City , where clear views of its front, side, and rear are visible."], ["Manufacturer name, performance figures and full specifications."], "WILLARD"),
  V("willard-sedan", "WILLARD SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/willard-sedan.webp', "016", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The sedan can be seen driving through on the Rivo Bridge in the Rialto Islands in the final shot of the second trailer (2:33). The rear of the sedan can be also seen driving along Vice-Dale County Road 561 in La Perle in an official screenshot of Vice City. A badge resembling that of Willard appears on the trunk."], ["Manufacturer name, performance figures and full specifications."], "WILLARD"),
  V("chrysler-sebring-inspired-sedan", "CHRYSLER SEBRING-INSPIRED SEDAN", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/chrysler-sebring-inspired-sedan.webp', "017", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle first appeared in the September 2022 GTA VI leaks in a single clip, where it is seen parked in red in the parking lot of Hank's Waffles in Port Gellhorn , as well as in beige across the street of the restaurant at a Schlott Construction warehouse."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("1959-cadillac-inspired-car", "1959 CADILLAC-INSPIRED CAR", "classics", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/1959-cadillac-inspired-car.webp', "018", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The vehicle appeared briefly in the September 2022 GTA VI leaks , featuring in a clip driving southbound past the Gas Stop branch in Port Gellhorn along Route 2 , several car lengths ahead of a barely visible Feroci ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("lincoln-mark-viii-inspired-coupe", "LINCOLN MARK VIII-INSPIRED COUPE", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/lincoln-mark-viii-inspired-coupe.webp', "019", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The rear half of the coupe is seen in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator-1967", "DOMINATOR (1967)", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator-1967.webp', "020", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The car can be seen, albeit briefly, behind a donked Vapid sedan in the Stockyard neighborhood in Vice City , in the first trailer (0:27). An apparent double checkered flag emblem on the front fender, a design frequently seen on most Dominator models."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator-buggy", "DOMINATOR BUGGY", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator-buggy.webp', "021", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The car appears as a variant of the 1967 Dominator , also due to appear in Grand Theft Auto VI . It features lifted suspension, large profile tires and off-roading accessories."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ganado", "GANADO", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/ganado.webp', "022", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Ganado notably appears in official artwork released alongside the game's first trailer , showing Lucia and Jason seated on its hood, with bullet holes on its side, a Leonida license plate, and the Vapid logo visible on its grille."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sirius", "SIRIUS", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sirius.webp', "023", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The car can be seen parked at an apartment complex behind a hammer-wielding woman in Hamlet in the first trailer (0:58). A customized turquoise example is featured in an official screenshot of the game's Ultimate Edition as part of the Wyman Car Collection side mission, where the Sirius name was first revealed."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("classic-muscle-car", "CLASSIC MUSCLE CAR", "muscle", [0,0,0,0], ['—','—','—','—'], "rumour", null, "024", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("declasse-compact-car", "DECLASSE COMPACT CAR", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/declasse-compact-car.webp', "025", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The car can be seen on numerous occasions within the first trailer : It first appears in black, albeit briefly, on the opposite side of the road along Shore Drive , passing a lineup of sports cars (0:32)."], ["Manufacturer name, performance figures and full specifications."], "DECLASSE"),
  V("montagne", "MONTAGNE", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/montagne.webp', "026", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Montagne can be seen in a parking lot, off a busy main road running between mainland Vice City and the Vice Beach area, in the first trailer (0:31). A glimpse of the rear of the car is visible in the second trailer (2:05), where it is seen driving along Shore Drive in Vice Beach ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("riata-classic", "RIATA CLASSIC", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/riata-classic.webp', "027", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Riata Classic was first mentioned in the September 2022 GTA VI leaks , in a debug menu listing world events during the developer's game session. The vehicle was listed as part of what was later revealed to be Wyman 's Classic Car Collection side mission."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bravado-suv", "BRAVADO SUV", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bravado-suv.webp', "028", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The SUV can be partially seen driving along Interstate 97 in Vice City in the second trailer (0:35). The SUV later appears in An Extended Look , where three of them can be spotted through the trailer (14:10, 16:32, 18:00)."], ["Manufacturer name, performance figures and full specifications."], "BRAVADO"),
  V("karin-suv", "KARIN SUV", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/karin-suv.webp', "029", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The SUV makes an appearance in an official screenshot of Vice City , where the rear of a blue version is seen in the distance. A couple of examples were seen in An Extended Look . The vehicle has appeared multiple times in GTA VI leaks."], ["Manufacturer name, performance figures and full specifications."], "KARIN"),
  V("schyster-station-wagon", "SCHYSTER STATION WAGON", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/schyster-station-wagon.webp', "030", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle appeared briefly in the September 2022 GTA VI leaks , shown in a single clip featuring its LOD model in white with wooden paneling. It was seen driving on a highway next to the Starlet Motel , passing by Jason and Wyman , who were beside a pool during a world event debug test."], ["Manufacturer name, performance figures and full specifications."], "SCHYSTER"),
  V("vapid-suv-first-generation", "VAPID SUV (FIRST GENERATION)", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-suv-first-generation.webp', "031", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle first appeared in the September 2022 GTA VI leaks . In the leaked footage, it is depicted with a red interior. The SUV can be seen overturned on a busy Leonida highway in the first trailer (1:03)."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("audi-q7-inspired-suv", "AUDI Q7-INSPIRED SUV", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/audi-q7-inspired-suv.webp', "032", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The SUV is seen twice in the first trailer : On the freeway in the first scene of the trailer (0:03) Outside the Pawn & Gun Store (1:10)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("willard-station-wagon", "WILLARD STATION WAGON", "suvs", [0,0,0,0], ['—','—','—','—'], "rumour", null, "033", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The vehicle appeared in the September 2022 GTA VI leaks . One clip sees Lucia walking around and shooting at the vehicle with an M16 in a test bed environment. The vehicle features placeholder San Andreas license plates.", "Leak account: The vehicle appeared in the September 2022 GTA VI leaks . One clip sees Lucia walking around and shooting at the vehicle with an M16 in a test bed environment. The vehicle features placeholder San Andreas license plates.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "WILLARD"),
  V("bison-900", "BISON 900", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-900.webp', "034", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Bison 900 can be seen in five scenes throughout the first trailer (0:25, 0:52, 1:07, 1:08 and 1:16) and in a scene of the second trailer (1:54). It also appears in the postcard video for Port Gellhorn on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bison-1800", "BISON 1800", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-1800.webp', "035", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["A silver Bison 1800 can be seen pulling a jet ski trailer in traffic along Interstate 97 , in the game's second trailer (0:35). Later on, a red one can briefly be seen passing Lucia as she does her community service (1:27). The Bison 1800 can be seen multiple times throughout the August 2026 leaks ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("reclaimer", "RECLAIMER", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/reclaimer.webp', "036", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Reclaimer first appears in white, parked up in front of an orange Caracara 4x4 in the first trailer , in the background at Thrillbilly Mud Club (0:55). A black one can be seen near Key Lento in the game's second trailer (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bison-dually-pickup", "BISON DUALLY PICKUP", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-dually-pickup.webp', "037", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The pickup truck can be seen in red, parked up at an Arrow gas station in Leonard County , in the first trailer (0:50). The rear of the pickup truck can later be seen dragging a safe in the second trailer ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bison-dually-tow-truck", "BISON DUALLY TOW TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-dually-tow-truck.webp', "038", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The tow truck can be seen in white, parked up at the Vice Beach Coast Guard Station , as seen on the background of the game's promotional website . The truck takes the cab of the Bison dually pickup truck but with a tow arm and utility bed."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bison-900-monster-truck", "BISON 900 MONSTER TRUCK", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-900-monster-truck.webp', "039", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The truck is first seen in the background at Thrillbilly Mud Club in the game's first trailer (0:55). It can later be seen outside Delights in Port Gellhorn in an official screenshot . It assumes the design of a 1995 Bison 900 but with a higher ride height and large tires."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sandking-dually-pickup", "SANDKING DUALLY PICKUP", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sandking-dually-pickup.webp', "040", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck is seen on a causeway in An Extended Look . The truck appears as a successor to the older generation Sandking XL . No standard axle version has been seen in official media. It assumes the design of a dually truck with \"Sandking\" embossed on the tailgate."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sandking-dually-monster-truck", "SANDKING DUALLY MONSTER TRUCK", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sandking-dually-monster-truck.webp', "041", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["The monster truck can be seen driving at the Thrillbilly Mud Club in first trailer (0:56). The truck can also be seen in official artwork of Ambrosia ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("canis-pickup-truck", "CANIS PICKUP TRUCK", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/canis-pickup-truck.webp', "042", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The pickup truck can be seen driving into the Starlet Motel in an official screenshot of Port Gellhorn . The tailgate features embossed lettering for Canis , confirming its manufacturer. The vehicle previously appeared in two brief, separate instances in the September 2022 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "CANIS"),
  V("vapid-flatbed-truck", "VAPID FLATBED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-flatbed-truck.webp', "043", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The truck is seen twice in the first trailer : It can be seen in the distance on the freeway bridge (0:03). It is later seen close up, parked up outside Port Gellhorn Pawn & Gun , alongside a Hellion and another SUV (1:10)."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("vapid-mid-size-pickup", "VAPID MID-SIZE PICKUP", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-mid-size-pickup.webp', "044", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The pickup truck appeared during An Extended Look . It assumes a crew cab design with a pickup bed. A Vapid badge is clearly visible on the tailgate."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("vapid-tow-truck", "VAPID TOW TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-tow-truck.webp', "045", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The tow truck appears at Wyman's World Auto Salvage Co. , in the background of an official screenshot of the Wyman Car Collection side mission as part of the game's Ultimate Edition . It is implied that Wyman owns the truck as part of his salvage company ."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("dodge-dakota-inspired-pickup", "DODGE DAKOTA-INSPIRED PICKUP", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dodge-dakota-inspired-pickup.webp', "046", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The truck can be partially seen, in green, stopped at an intersection in Vice City in the first trailer (1:07). It appears to have a black roof, possibly indicating a vinyl convertible roof mechanism."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ford-f-series-inspired-pickup", "FORD F-SERIES-INSPIRED PICKUP", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/ford-f-series-inspired-pickup.webp', "047", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The pickup truck can be distantly seen in an official screenshot of the Grassrivers , where it is parked in front of a building in Watson Bay ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("swamp-buggy", "SWAMP BUGGY", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/swamp-buggy.webp', "048", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Two of the off-roading buggies can be seen in the background at the Thrillbilly Mud Club in the first trailer (0:55)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("polaris-ranger-inspired-utv", "POLARIS RANGER-INSPIRED UTV", "offroad", [0,0,0,0], ['—','—','—','—'], "rumour", null, "049", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("alvino-v1", "ALVINO V1", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/alvino-v1.webp', "050", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The motorcycle first appeared in an official screenshot of Jason Duval , where he is seen on a green Alvino V1 with a worn-out \"#76\" livery, holding an ES9 ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("carbon-rs-stock", "CARBON RS (STOCK)", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/carbon-rs-stock.webp', "051", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The bike can be seen parked up behind an Enus Jubilee , outside the car meet/yard within the Stockyard neighborhood of Vice City , in the first trailer (0:27). The bike features a custom white/grey camouflage livery, a red chassis frame and red rims with custom tires. The Nagasaki emblem can be seen on the gearbox."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("suzuki-gsx-r1000-inspired-bike", "SUZUKI GSX-R1000-INSPIRED BIKE", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/suzuki-gsx-r1000-inspired-bike.webp', "052", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Lucia Caminos can be seen sat on the bike in an official screenshot of her. The bike features a fairing, mirrors and a rear plate holder. It bears a Gloriana license plate ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("lombike", "LOMBIKE", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/lombike.webp', "053", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The vehicle first appeared in the September 2022 GTA VI leaks in a single clip, where two of the bikes can be seen docked at a bike docking station in Vice Beach , next to a bike share kiosk labeled with LomBike branding, indicating that the bikes are part of a bike-sharing program available in the area sponsored by th…"], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("electric-scooter", "ELECTRIC SCOOTER", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/electric-scooter.webp', "054", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The scooter was first depicted in the August 2026 GTA VI leaks , where it is seen parked in several places around Vice City in two videos. Jason and Lucia are shown riding electric scooters through Bayside , Vice City , in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("pomazoom", "POMAZOOM", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/pomazoom.webp', "055", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A woman can be seen riding a blue Pomazoom down a road in the Leonida Keys in an official screenshot of Grand Theft Auto VI . It appears with small plastic wheels, an adjustable seat, front basket, and a headlight. Three Pomazooms can be seen during An Extended Look , where the badge can be seen on its side."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("electric-bike", "ELECTRIC BIKE", "cycles", [0,0,0,0], ['—','—','—','—'], "rumour", null, "056", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The bicycle was first depicted in the August 2026 GTA VI leaks , where Jason is seen cycling north along Vice Beach in the video titled \"Beach\".", "Leak account: The bicycle was first depicted in the August 2026 GTA VI leaks , where Jason is seen cycling north along Vice Beach in the video titled \"Beach\".", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("moocher", "MOOCHER", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/moocher.webp', "057", null, null, SRC_WIKI, true, "OFFICIAL POSTCARD · GTA WIKI INDEX", ["What appears to be a Moocher can be seen in a postcard video of the Leonida Keys on the game's promotional website . Another can be seen on a highway in a official screenshot of Vice City . It assumes the design of a large Class A motorhome."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("class-a-motorhome", "CLASS A MOTORHOME", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/class-a-motorhome.webp', "058", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The motorhome can be seen on a highway in an official screenshot of Raul Bautista . Its side profile was seen in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("6x6-conversion-van", "6X6 CONVERSION VAN", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "059", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The vehicle briefly appeared in the September 2022 GTA VI leaks , seen in a single clip driving northbound past the Gas Stop branch in Port Gellhorn along Route 2 .", "Leak account: The vehicle briefly appeared in the September 2022 GTA VI leaks , seen in a single clip driving northbound past the Gas Stop branch in Port Gellhorn along Route 2 .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("bison-1800-police", "BISON 1800 (POLICE)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison-1800-police.webp', "060", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The police Bison 1800 can be seen in the middle of a street in Vice City in an official screenshot . It is depicted in what appears to be a Vice-Dale Police Department livery, made apparent by the presence of a gold emblem on the hood and doors, and faint green stripes along the sides of the vehicle."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buzzard-police", "BUZZARD (POLICE)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buzzard-police.webp', "061", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The helicopter can be seen flying above Jason and Lucia in a Squalo in the waters surrounding Vice City in an official screenshot , alongside a VCPD L35P . It bears a VCPD livery."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("l35p-police", "L35P (POLICE)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/l35p-police.webp', "062", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The police L35P can be seen shining its searchlight on Jason and Lucia on their Squalo in an official screenshot . It appears as a variant of the civilian L35P with a blue and white VCPD livery and police equipment."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("landstalker-xl-police", "LANDSTALKER XL (POLICE)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/landstalker-xl-police.webp', "063", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The police Landstalker XL can be seen pulling out in front of Jason , Lucia and Raul in their Schafter V12 during An Extended Look . Another one is seen further down the street, stuck in traffic. The vehicle assumes an all-black design with window and roof-mounted emergency lighting."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("montagne-police", "MONTAGNE (POLICE)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/montagne-police.webp', "064", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The police Montagne can be seen responding shortly behind another police car , along a road in Leonard County , in the first trailer (1:00). It is depicted with a green and white Leonard County Sheriff livery and is equipped with a blue/red LED lightbar."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("verus-lifeguard-atv", "VERUS LIFEGUARD ATV", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/verus-lifeguard-atv.webp', "065", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The quad bike can be seen outside a lifeguard hatch on a beach in Vice Beach . It assumes the design of a Verus with a red paintjob and \"OCEAN RESCUE\" and \"LIFEGUARD\" decals, as well as a logo on the fairing."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vapid-police-car", "VAPID POLICE CAR", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-police-car.webp', "066", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle is a variant of the Vapid sedan with a police package, comparable to the Stanier and the recurring Police Cruisers from the previous HD Universe installments. In the first trailer (1:00), the car can be seen driving down a road in front of a police Montagne , responding to an incident in Leonard County ."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("contender-39st-inspired-police-boat", "CONTENDER 39ST-INSPIRED POLICE BOAT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/contender-39st-inspired-police-boat.webp', "067", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["The boat can be seen responding in waters in official artwork of Jason and Lucia . It appears to be a police variant of the Contender 39ST-inspired boat , utilized by Vice Beach Police Department and sporting blue and red roof lights."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("defender-class-inspired-boat", "DEFENDER CLASS-INSPIRED BOAT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/defender-class-inspired-boat.webp', "068", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen moving through waters in an official screenshot of the Leonida Keys . It is also seen in front of a large offshore vessel on the background of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("eurocopter-ec135-inspired-police-helicopter", "EUROCOPTER EC135-INSPIRED POLICE HELICOPTER", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/eurocopter-ec135-inspired-police-helicopter.webp', "069", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["The helicopter can be seen responding in the air in official artwork of Jason and Lucia . It features police markings along the tail boom and on the nose of the helicopter."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vapid-lifeguard-truck", "VAPID LIFEGUARD TRUCK", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-lifeguard-truck.webp', "070", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Vapid lifeguard truck can be seen twice in the first trailer : It is first seen driving north along the beach in the establishing shot (0:14). It is later seen parked up behind beach-goers on Vice Beach (0:20). It appears to be coupled up to a towable boat trailer which is half steeped into the water."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("panther-inspired-poach-airboat", "PANTHER-INSPIRED POACH AIRBOAT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/panther-inspired-poach-airboat.webp', "071", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen in an official screenshot , seen in shallow waters pursuing poachers in a Bison , alongside two POACH Montagnes and a POACH Maverick . The boat appears as a variant of a civilian use airboat , but features a lightbar mounted above the rear fan cage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("rb-s-ii-inspired-coast-guard-boat", "RB-S II-INSPIRED COAST GUARD BOAT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/rb-s-ii-inspired-coast-guard-boat.webp', "072", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The boat can be seen docked at a coast guard station in the Leonida Keys in the distance, from an aerial perspective, where a Dodo seaplane swoops into view, in the first trailer (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("maverick-air-ambulance", "MAVERICK AIR AMBULANCE", "emergency", [0,0,0,0], ['—','—','—','—'], "rumour", null, "073", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The helicopter appeared in the August 2026 GTA VI leaks , where it can be seen parked on a helipad nearby to Hamilton Private Health Clinic in Key Lento , Leonida Keys . The vehicle assumes the design of a Maverick with a Fast Pass EMS livery.", "Leak account: The helicopter appeared in the August 2026 GTA VI leaks , where it can be seen parked on a helipad nearby to Hamilton Private Health Clinic in Key Lento , Leonida Keys . The vehicle assumes the design of a Maverick with a Fast Pass EMS livery.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("pierce-arrow-xt-inspired-fire-truck", "PIERCE ARROW XT-INSPIRED FIRE TRUCK", "emergency", [0,0,0,0], ['—','—','—','—'], "rumour", null, "074", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: Two of the trucks appeared briefly in the August 2026 GTA VI leaks , seen parked up outside a firehouse in Key Lento . The truck bears a white and red Key Lento fire department livery.", "Leak account: Two of the trucks appeared briefly in the August 2026 GTA VI leaks , seen parked up outside a firehouse in Key Lento . The truck bears a white and red Key Lento fire department livery.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("jack-sheepe-excavator", "JACK SHEEPE EXCAVATOR", "industrial", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/jack-sheepe-excavator.webp', "075", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The excavator is seen parked outside Schlott Construction in An Extended Look . It features a yellow and black paintjob. A Jack Sheepe logo is seen on the body, while \"Sheepe\" is written on the boom. The excavator appeared in the September 2022 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "JACK SHEEPE"),
  V("burrito-shuttle-bus", "BURRITO SHUTTLE BUS", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/burrito-shuttle-bus.webp', "076", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The minibus can be be seen in white, driving along a busy freeway in the opening scene of the first trailer (0:03). Another one can be seen much further down the freeway in the distance. The bus reappears in the game's second trailer , where it is seen driving ahead of a red and white Rancher on Interstate 97 (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("guardian-chassis-cab-truck", "GUARDIAN CHASSIS CAB TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/guardian-chassis-cab-truck.webp', "077", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck appears parked up at the side of the road in An Extended Look . It assumes a stake truck configuration, with a cab based on the Guardian , industrial rims and and side steps in place of the fuel tanks. The truck also appeared in the August 2026 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("benefactor-van", "BENEFACTOR VAN", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/benefactor-van.webp', "078", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The rear of the van can be partially seen in a screenshot from the Leonida Keys section of the game's promotional website . The front of the van later appears in An Extended Look , where it also sports a Banner Hotel & Spa livery."], ["Manufacturer name, performance figures and full specifications."], "BENEFACTOR"),
  V("bravado-minivan", "BRAVADO MINIVAN", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bravado-minivan.webp', "079", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The minivan can be seen turning out of an intersection, whilst a group of outlaw dirt bikers flee from police , in the first trailer (1:07)."], ["Manufacturer name, performance figures and full specifications."], "BRAVADO"),
  V("bravado-minivan-taxi", "BRAVADO MINIVAN TAXI", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bravado-minivan-taxi.webp', "080", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The taxicab can be seen driving down Shore Drive in Vice Beach at night, in scroll-driven animations of Jason and Lucia from the game's promotional website . The rear of the vehicle can be seen driving away in an official screenshot of Vice Beach labeled under Vice City . A Bravado badge can be seen on its grille."], ["Manufacturer name, performance figures and full specifications."], "BRAVADO"),
  V("maibatsu-truck", "MAIBATSU TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/maibatsu-truck.webp', "081", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck can be seen twice in the game's first trailer , in both flatbed and box truck configuration."], ["Manufacturer name, performance figures and full specifications."], "MAIBATSU"),
  V("vapid-cargo-van", "VAPID CARGO VAN", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-cargo-van.webp', "082", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The van can be seen driving along a road as Lucia and Jason drive off into the sunset in their Tulip in the game's second trailer (2:33). In the trailer, what appears to be Vapid 's oval red badge can be made out on the grille, implying its manufacturer."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("vapid-cargo-van-second-generation", "VAPID CARGO VAN (SECOND GENERATION)", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-cargo-van-second-generation.webp', "083", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The van can be seen on two separate occasions within the first trailer . It is first seen on the busy Leonida freeway in the opening scene (0:03). It is later seen in a parking lot on the islands between Vice City and Vice Beach (0:30)."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("vapid-passenger-van", "VAPID PASSENGER VAN", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vapid-passenger-van.webp', "084", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The passenger van appears driving through Vice Beach in an official screenshot of Vice City on the game's promotional website , where it is shown packed with passengers. In the screenshot, what appears to be Vapid 's oval red badge can be made out on the grille, implying its manufacturer."], ["Manufacturer name, performance figures and full specifications."], "VAPID"),
  V("gmc-topkick-inspired-truck", "GMC TOPKICK-INSPIRED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/gmc-topkick-inspired-truck.webp', "085", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck can be seen in the background on the official artwork for Grand Theft Auto VI: An Extended Look . The truck is seen more closely in An Extended Look . One version features a box body with an eCola livery."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("international-4700-inspired-truck", "INTERNATIONAL 4700-INSPIRED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/international-4700-inspired-truck.webp', "086", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck was first seen on a highway in the background of an official screenshot for the Ultimate Edition of the game."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("isuzu-elf-inspired-truck", "ISUZU ELF-INSPIRED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/isuzu-elf-inspired-truck.webp', "087", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck can be seen twice in the game's first trailer (0:50 and 1:03), both with a flatbed configuration, the latter of which appears with tyres on the back."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("new-flyer-xcelsior-inspired-bus", "NEW FLYER XCELSIOR-INSPIRED BUS", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/new-flyer-xcelsior-inspired-bus.webp', "088", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The bus can be be seen driving along a busy freeway in the opening scene of the first trailer (0:03). Another one can be seen in the distance, further down the freeway."], ["Manufacturer name, performance figures and full specifications."], "NEW FLYER"),
  V("tractor-unit", "TRACTOR UNIT", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tractor-unit.webp', "089", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The truck can be seen towing a flatbed trailer with construction pipes through Mount Kalaga National Park in an official screenshot . The truck appears to be similar in design to the Packer but with a day cab configuration as opposed to a sleeper cab design. It features three axles."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vivanite-taxi", "VIVANITE TAXI", "sedans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "090", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The car appears as a taxi variant of the Vivanite , also due to appear in the game. The taxi variant was first depicted in the August 2026 GTA VI leaks , seen in a clip titled \"Hypercar Part 1\", where it is seen in highway traffic.", "Leak account: The car appears as a taxi variant of the Vivanite , also due to appear in the game. The taxi variant was first depicted in the August 2026 GTA VI leaks , seen in a clip titled \"Hypercar Part 1\", where it is seen in highway traffic.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("sera-minivan", "SERA MINIVAN", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "091", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The vehicle is mentioned in the September 2022 GTA VI leaks , where it is referenced in a series of world events associated to the space research agency SERA .", "Leak account: The vehicle is mentioned in the September 2022 GTA VI leaks , where it is referenced in a series of world events associated to the space research agency SERA .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("chevrolet-silverado-6500hd-inspired-truck", "CHEVROLET SILVERADO 6500HD-INSPIRED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "092", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The truck was first seen in the August 2026 GTA VI leaks . In the video titled \"Hypercar Part 2\", the truck is seen near the end of the video with a flatbed configuration. In another clip, titled \"Game Store\", a box truck variant in red is seen outside the store.", "Leak account: The truck was first seen in the August 2026 GTA VI leaks . In the video titled \"Hypercar Part 2\", the truck is seen near the end of the video with a flatbed configuration. In another clip, titled \"Game Store\", a box truck variant in red is seen outside the store.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("dodge-ram-inspired-van", "DODGE RAM-INSPIRED VAN", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "093", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The vehicle briefly appeared in the September 2022 GTA VI leaks , seen in a single clip driving northbound past the Gas Stop branch in Port Gellhorn along Route 2 .", "Leak account: The vehicle briefly appeared in the September 2022 GTA VI leaks , seen in a single clip driving northbound past the Gas Stop branch in Port Gellhorn along Route 2 .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("freightliner-m2-inspired-truck", "FREIGHTLINER M2-INSPIRED TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "094", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The truck was first seen in the August 2026 GTA VI leaks . In one clip, it is briefly seen parked up outside a 24/7 store in Key Lento . In another clip, several are seen parked around the Allied Crystal Sugar Refinery with Allied Crystal liveries.", "Leak account: The truck was first seen in the August 2026 GTA VI leaks . In one clip, it is briefly seen parked up outside a 24/7 store in Key Lento . In another clip, several are seen parked around the Allied Crystal Sugar Refinery with Allied Crystal liveries.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("boat-trailer", "BOAT TRAILER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/boat-trailer.webp', "095", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Boat Trailer's presence in Grand Theft Auto VI was first spotted in the game's first trailer , where a Bobcat XL can be seen in the opening shot towing a Boat Trailer with an unnamed bow rider motorboat mounted on it (0:02)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("flatbed-trailer", "FLATBED TRAILER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/flatbed-trailer.webp', "096", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["A flatbed trailer can be seen carrying a container with a Tempesta inside in the game's second trailer . In comparison to its GTA V design, the rear of the trailer features a much more detailed rear bumper and tail light array, as well as detailed axle and suspension components."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("jet-ski-trailer", "JET SKI TRAILER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/jet-ski-trailer.webp', "097", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The trailer can be seen coupled up to a Bison 1800 , with a jet ski mounted on it, in the game's second trailer (0:35). In comparison to the standard Boat Trailer appearing in Grand Theft Auto V , it is shorter in length and width."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("utility-trailer", "UTILITY TRAILER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/utility-trailer.webp', "098", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The trailer can be seen hauling hunted alligators, towed by a Bison , in an official screenshot of Grand Theft Auto VI . the trailer assumes the design of a compact utility trailer, similar to that of the small utility trailer in GTA V , but assuming a wood and metal design."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vcmm-train", "VCMM TRAIN", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vcmm-train.webp', "099", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The train appeared in the September 2022 GTA VI leaks . In one clip, the train is seen stationed at Vice City International Airport in front of another train ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ge-genesis-inspired-locomotive", "GE GENESIS-INSPIRED LOCOMOTIVE", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/ge-genesis-inspired-locomotive.webp', "100", null, null, SRC_WIKI, true, "OFFICIAL POSTCARD · GTA WIKI INDEX", ["The locomotive can be seen hauling three Viewliner-inspired railroad cars through Port Gellhorn in a postcard on the game's promotional website . It assumes a silver body design with blue stripes along the sides. Three exhaust vents can be seen on the roof of the locomotive."], ["Manufacturer name, performance figures and full specifications."], "GE"),
  V("hitachi-rail-inspired-train", "HITACHI RAIL-INSPIRED TRAIN", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/hitachi-rail-inspired-train.webp', "101", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The train can be seen running along a metro rail line in the game's second trailer (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("viewliner-inspired-railroad-car", "VIEWLINER-INSPIRED RAILROAD CAR", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/viewliner-inspired-railroad-car.webp', "102", null, null, SRC_WIKI, true, "OFFICIAL POSTCARD · GTA WIKI INDEX", ["Three of the cars can be seen hauled by a GE Genesis-inspired locomotive through Port Gellhorn in a postcard on the game's promotional website . The car assumes a single-level design with a silver body and blue stripes along the sides."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vcia-train", "VCIA TRAIN", "trains", [0,0,0,0], ['—','—','—','—'], "rumour", null, "103", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The train appeared in the September 2022 GTA VI leaks . In one clip, the train is seen stationed at Vice City International Airport behind another train . The vehicle assumes a blue and grey color scheme with cyan VCIA markings on the front and sides.", "Leak account: The train appeared in the September 2022 GTA VI leaks . In one clip, the train is seen stationed at Vice City International Airport behind another train . The vehicle assumes a blue and grey color scheme with cyan VCIA markings on the front and sides.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("airboat-09", "AIRBOAT 09", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/airboat-09.webp', "104", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen in two official screenshots of the Grassrivers , where they are being used for alligator hunting and fishing activities in the region. The same boat is also seen pursued by a Buzzard Attack Chopper in the second trailer (2:18)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("clarion", "CLARION", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/clarion.webp', "105", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The boat can be seen racing down the bay alongside two other boats in the first trailer (0:24). It is depicted in yellow, red and black with the word \"Clarion\" on the sides. Another of the boats is seen with a red and white livery in the Leonida Keys , among a plethora of other boats, in an official screenshot ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("delmar", "BTN DELMAR", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/delmar.webp', "106", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The ship is seen in the first trailer, docked at PortViceCity while several speedboats race by (0:23). Bilgeco, Jetsam and Boxtrax containers are visible aboard it. The current catalogue label is BTN Delmar."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dingus", "DINGUS", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dingus.webp', "107", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Dingus can be seen cruising in the waters at Watson Bay in an official screenshot of the Grassrivers . It is depicted as a navy blue boat with inflatables attached to the sides of the hull."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("kayak", "KAYAK", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/kayak.webp', "108", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat appears in an official screenshot of Mount Kalaga National Park , showing a man paddling an orange Kayak along a waterway in the park. It is also visible in the Mount Kalaga National Park postcard video on the game's promotional website , where two Kayaks can be seen beside a river."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("l35p", "L35P", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/l35p.webp', "109", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Two L35Ps can be seen side-by-side in the Leonida Keys in an official screenshot . Several are also seen in postcards of the Leonida Keys and Vice City . Several L35Ps are depicted in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("s23", "S23", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/s23.webp', "110", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen docked at a jetty where Jason and Lucia are sat, in the second trailer (1:21). The boat is later seen cruising down a canal in Vice City towards the end of the trailer (2:33)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("seashark-second-generation", "SEASHARK (SECOND GENERATION)", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/seashark-second-generation.webp', "111", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["Jason and Lucia can be seen speeding past party-goers on the Seashark in the game's second trailer (2:20). Two can also be seen being ridden on in the Leonida Keys in an official screenshot . In comparison to the first generation model, the second generation Seashark assumes a more angular design."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("azimut-atlantis-45-inspired-yacht", "AZIMUT ATLANTIS 45-INSPIRED YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/azimut-atlantis-45-inspired-yacht.webp', "112", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["Party-goers can be seen standing on the yacht as Jason and Lucia speed past on a Seashark in the game's second trailer (2:20). A close-up of the bow of the yacht can be seen in an official screenshot , where it is anchored in the Leonida Keys ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("azimut-85-inspired-yacht", "AZIMUT 85-INSPIRED YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/azimut-85-inspired-yacht.webp', "113", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The yacht can be seen among the Rialto Islands in the distance in the game's first trailer (0:31). Party-goers can be seen standing on the yacht in the second trailer (1:23). It also appears again among the aforementioned artificial islands in the postcard video of Vice City on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sea-ray-350-sundancer-inspired-boat", "SEA RAY 350 SUNDANCER-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sea-ray-350-sundancer-inspired-boat.webp', "114", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The cabin cruiser can be seen in the first trailer (0:30), in the waters among the Rialto Islands in Catalan Bay . Party-goers can be seen standing on the boat as Jason and Lucia speed past on a Seashark in the second trailer (2:21). The boat is also seen in official screenshots of Jason Duval and the Leonida Keys ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("contender-39st-inspired-boat", "LURE PREDATOR / CONTENDER 39ST-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/contender-39st-inspired-boat.webp', "115", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Two examples can be seen in official screenshots: one at a Grassrivers marina and another alongside bay boats in the Leonida Keys. Two more appear in a Leonida Keys postcard. The catalogue associates the craft with the Lure Predator name."], ["Final model/manufacturer relationship, performance figures and full specifications."], "LURE PREDATOR"),
  V("crownline-275-ss-inspired-boat", "CROWNLINE 275 SS-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/crownline-275-ss-inspired-boat.webp', "116", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The bow rider can be seen on a Boat Trailer pulled by a Bobcat XL in the first trailer (0:03). Its design is similar to that of the Suntrap , with a split windscreen providing access to the seats in front of the helm."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("frauscher-1017-gt-inspired-boat", "FRAUSCHER 1017 GT-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/frauscher-1017-gt-inspired-boat.webp', "117", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The speedboat can be seen along the Vice Beach coastline in the first trailer (0:13). It can again be seen racing down the bay alongside two other boats (0:24). It also appears in artwork moored behind Jason and Lucia . Its design is similar to that of a Speeder but lacks additional railings across the bow."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("horizon-pc60-inspired-yacht", "HORIZON PC60-INSPIRED YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/horizon-pc60-inspired-yacht.webp', "118", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The catamaran can be seen several times in the first trailer : It is first seen along the Vice Beach coastline in the trailer's establishing shot (0:11). Another one can be seen in the distance, from an aerial perspective, where a Dodo seaplane swoops into view (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("l-rssen-73m-coral-ocean-inspired-yacht", "LÜRSSEN 73M CORAL OCEAN-INSPIRED YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/l-rssen-73m-coral-ocean-inspired-yacht.webp', "119", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The superyacht can be seen in the first trailer (0:30), in the waters among the Rialto Islands in Catalan Bay in Vice City . It is seen again shortly afterward, to the right of a rail bridge in the Leonida Keys (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("panther-inspired-airboat", "PANTHER-INSPIRED AIRBOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/panther-inspired-airboat.webp', "120", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The boat first appeared in the September 2022 GTA VI leaks , where test footage showed the fanboat parked on dry land in Vice City International Airport , showcasing its fan and turning fins animations. The boat could later be seen be seen traversing through the Grassrivers in the game's first trailer ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("riva-86-domino-inspired-yacht", "RIVA 86 DOMINO-INSPIRED YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/riva-86-domino-inspired-yacht.webp', "121", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The yacht can be seen in the first trailer , in the waters among the Leonida Keys (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sea-doo-rxt-x-300-inspired-boat", "SEA-DOO RXT-X 300-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sea-doo-rxt-x-300-inspired-boat.webp', "122", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The jet ski can be seen docked alongside a red Seashark in the first trailer (0:22). It is seen again, this time on the back of a trailer pulled by a Bison 1800 , in the game's second trailer (0:35)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("shipyard-de-hoop-brion-inspired-barge", "SHIPYARD DE HOOP BRION-INSPIRED BARGE", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/shipyard-de-hoop-brion-inspired-barge.webp', "123", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The barge can be seen travelling towards a road bridge in the first trailer (0:35). It takes the design of a roll-on, roll-off barge and can be seen carrying several rows of containers . The example depicted in the trailer consists of several Bilgeco and Jetsam containers."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("skater-388-inspired-boat", "SKATER 388-INSPIRED BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/skater-388-inspired-boat.webp', "124", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen cruising down a river near the Leonida Penitentiary in the first trailer (0:03). It is later seen racing down the bay alongside two other boats (0:24). A variant with a Whirlwind Insurance livery is also seen in the Leonida Keys among a plethora of other boats in an official screenshot ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("cruise-ship", "CRUISE SHIP", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/cruise-ship.webp', "125", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The cruise ship can be seen constantly docked at PortViceCity , most prominently in an official screenshot of Vice City at night."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dive-boat", "DIVE BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "126", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The vehicle appears in the September 2022 GTA VI leaks . In one clip, the player is seen playing as Jason while shooting a Duke 556 at surfaces inside the boat, showcasing the boat's interior and parts of the exterior (including the deck, bow and stern) and some of its accessories, of which include oxygen tanks, seats…"], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("fishing-boat", "FISHING BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/fishing-boat.webp', "127", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat can be seen docked at Watson Bay in an official screenshot of the Grassrivers . It is depicted as a white boat with a blue hull. The boat features an enclosed cabin area with roof equipment and a split windscreen."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("self-propelled-barge", "SELF-PROPELLED BARGE", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/self-propelled-barge.webp', "128", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The barge can be seen travelling south-west through the Leonida Keys in the first trailer (0:35). It is also seen in one of the first scenes of the second trailer (0:12), and two of the barges are seen in an official screenshot of the Leonida Keys."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("shrimp-boat", "SHRIMP BOAT", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/shrimp-boat.webp', "129", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The boat can be seen travelling alongside a road bridge in the first trailer (0:35). It also appears in the distance in a postcard of the Leonida Keys , where several seagulls are seen flocking it. The boat is decked out with numerous tall masts with hoists for trawling the waters for shrimp."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sailing-yacht", "SAILING YACHT", "boats", [0,0,0,0], ['—','—','—','—'], "rumour", null, "130", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The sailing yacht appeared in the September 2022 GTA VI leaks . In one clip, two of the yachts are seen passing by the amphitheater in Vice City .", "Leak account: The sailing yacht appeared in the September 2022 GTA VI leaks . In one clip, two of the yachts are seen passing by the amphitheater in Vice City .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("tethered-aerostat-radar-system-inspired-aircraft", "TETHERED AEROSTAT RADAR SYSTEM-INSPIRED AIRCRAFT", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tethered-aerostat-radar-system-inspired-aircraft.webp', "131", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The aircraft can be seen in the distance within the Leonida Keys in the first trailer (0:35) and the opening shot of the second trailer ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("twinjet", "TWINJET", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/twinjet.webp', "132", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The plane can be seen landing over Vice City , on the background of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("weazel-news-helicopter", "WEAZEL NEWS HELICOPTER", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/weazel-news-helicopter.webp', "133", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The helicopter can be seen occupied by a film crew flying high above Mount Kalaga National Park in an official screenshot of Grand Theft Auto VI . It bears a red, white and black Weazel News livery. The vehicle assumes the design of a Police Maverick ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("arcturus", "ARCTURUS", "offroad", [0,0,0,0], ['—','—','—','—'], "rumour", null, "134", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Arcturus was mentioned in the December 2023 GTA V source code leaks within lines of code linked to Grand Theft Auto VI , alongside the Rebla GTS .", "Leak account: The Arcturus was mentioned in the December 2023 GTA V source code leaks within lines of code linked to, alongside the Rebla GTS .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("transgressor", "TRANSGRESSOR", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "135", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The vehicle was first mentioned in the September 2022 GTA VI leaks , in a debug menu listing world events during the developer's game session. The vehicle is listed as part of a yet-unnamed vehicle theft side-mission given by Wyman .", "Leak account: The vehicle was first mentioned in the September 2022 GTA VI leaks , in a debug menu listing world events during the developer's game session. The vehicle is listed as part of a yet-unnamed vehicle theft side-mission given by Wyman .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("bombora", "BOMBORA", "boats", [0,0,0,0], ['—','—','—','—'], "rumour", null, "136", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("feroci", "FEROCI", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/feroci.webp', "137", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Feroci makes an official appearance in An Extended Look , where a couple of examples are seen driving through the streets of Bayside (7:59, 8:44, 8:51, 8:53). A rear view of a brown example (8:51) reveals the car has been retconned to be manufactured by Karin, indicated by the 'KARIN' badge on the rear decklid."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("8f-drafter", "8F DRAFTER", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/8f-drafter.webp', "138", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The rear of a black 8F Drafter can be distantly seen driving down a main thoroughfare in an official screenshot of Ambrosia ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("banshee", "BANSHEE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/banshee.webp', "139", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["Visible in Trailer 2 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("blista-compact", "BLISTA COMPACT", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/blista-compact.webp', "140", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["A wrecked prop variant of the Blista Compact, with the notable addition of a keyhole on the driver's side door handle, appeared in a clip from the September 2022 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buffalo", "BUFFALO", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buffalo.webp', "141", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A gray Buffalo can be seen during a street takeover in Crosstown in the game's first trailer (0:45). The Buffalo would later appear in two official screenshots of Vice CIty , particularly in Downtown and La Perle , with the latter featuring a revised rear end."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("carbonizzare", "CARBONIZZARE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/carbonizzare.webp', "142", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Carbonizzare's presence in Grand Theft Auto VI was first spotted in the game's first trailer , where a red Carbonizarre can be seen parked along Shore Drive in Vice Beach (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("comet-retro-custom", "COMET RETRO CUSTOM", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/comet-retro-custom.webp', "143", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Comet Retro Custom appears stopped in the middle of an intersection in the first trailer (1:07). In comparison to its appearance in GTA Online , the car features an engine bay grille, a new stock duck-tail spoiler, longer rear quarter glass, and a different set of stock rims."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("comet-s2-cabrio", "COMET S2 CABRIO", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/comet-s2-cabrio.webp', "144", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The car can be seen in neon blue, parked up behind a Cheetah Classic along Shore Drive in Vice Beach , in the first trailer (0:31). A white Comet S2 Cabrio can then be seen driving through Vice Beach in a screenshot from the Vice City section of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("coquette", "COQUETTE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/coquette.webp', "145", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("coquette-d10", "COQUETTE D10", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/coquette-d10.webp', "146", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A blue Coquette D10 can be seen parked up behind a Landstalker XL along Shore Drive in Vice Beach , in the first trailer (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("cypher", "CYPHER", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/cypher.webp', "147", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Cypher's presence in Grand Theft Auto VI was first spotted in first the game's first trailer , parked alongside other tuned vehicles during a street takeover in an intersection in the Crosstown neighborhood of Vice City (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("elegy-retro-custom", "ELEGY RETRO CUSTOM", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/elegy-retro-custom.webp', "148", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A green and a white Elegy Retro Custom can be seen parked at an intersection in the Crosstown neighborhood of Vice City , near a white Dominator ASP and a silver Penumbra , in the first trailer (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("futo", "FUTO", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/futo.webp', "149", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Futo appeared in the September 2022 GTA VI leaks , across two clips. It can most prominently be seen in one clip, driving past Lucia in red at an intersection near Cipher Mall in Rockridge , Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("growler", "GROWLER", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/growler.webp', "150", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["Visible in Trailer 2 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("itali-gto", "ITALI GTO", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/itali-gto.webp', "151", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Itali GTO's presence in Grand Theft Auto VI was first spotted in the game's first trailer , where a green GTO can be seen parked in the distance during the opening establishing shot of Vice Beach (0:11)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("jugular", "JUGULAR", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/jugular.webp', "152", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Jugular can be seen parked on the opposite side of the road along Shore Drive in Vice Beach , facing oncoming traffic, in the first trailer (0:32)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("neon", "NEON", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/neon.webp', "153", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["A customized turquoise Neon can be seen driving through Ambrosia in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("paragon-r", "PARAGON R", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/paragon-r.webp', "154", null, null, SRC_WIKI, true, "WEBSITE ANIMATION · GTA WIKI INDEX", ["A black Paragon R can be seen driving at night along Shore Drive in Vice Beach , in a scroll-driven animation of Jason and Lucia from the game's promotional website . It features a license plate that appears to be inspired by the current designs of the U.S. states of either Arizona or North Dakota ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("penumbra", "PENUMBRA", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/penumbra.webp', "155", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A silver Penumbra can be seen in the first trailer , parked sideways near an intersection in the Crosstown neighborhood of Vice City , in front of a purple Gauntlet Hellfire (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("raiden", "RAIDEN", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/raiden.webp', "156", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A Raiden can be distantly seen parked on a main road in Vice Beach in an official screenshot labeled under Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("schafter", "SCHAFTER", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/schafter.webp', "157", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The car can be seen driving along Shore Drive in Vice Beach , in the game's second trailer (2:06). It is depicted as a slab car with a candy red paintjob and Swangas rims. A Benefactor badge can be seen on the grille."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("schafter-v12", "SCHAFTER V12", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/schafter-v12.webp', "158", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The car can be seen driving along Shore Drive in Vice Beach , in the first trailer (0:31). In the second trailer , it can briefly be seen in white driving past Jason and Dre'Quan (1:58), and turning right at an intersection in the trailer's final shot (2:34)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sugoi", "SUGOI", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sugoi.webp', "159", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A blue Sugoi can be seen parked in Watson Bay in an official screenshot of the Grassrivers , while the side of a gray one appears in Vice Beach in an official screenshot labeled under Vice City . In the August 2026 GTA VI leaks , a silver Sugoi can be seen merging onto Cicada Avenue from Calderone Avenue ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sultan", "SULTAN", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sultan.webp', "160", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A green Sultan can be seen parked with its passenger-side door open, alongside other sporty vehicles, during a street takeover in an intersection in the Crosstown neighborhood of Vice City in the first trailer (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vectre", "VECTRE", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vectre.webp', "161", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["A Vectre can briefly be seen along Shore Drive in the second trailer ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("v-str", "V-STR", "sports", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/v-str.webp', "162", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Several instances of the V-STR appear on the Ambrosia postcard featured on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("alpha", "ALPHA", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "163", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Alpha appeared in the September 2022 GTA VI leaks numerous times. It is most prominently seen in one clip, driving past Lucia in blue at an intersection near Cipher Mall in Rockridge , Vice City .", "Leak account: The Alpha appeared in the September 2022 GTA VI leaks numerous times. It is most prominently seen in one clip, driving past Lucia in blue at an intersection near Cipher Mall in Rockridge , Vice City .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("comet-s2", "COMET S2", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "164", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("itali-rsx", "ITALI RSX", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "165", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("locust", "LOCUST", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "166", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Locust briefly appeared in the September 2022 GTA VI leaks in a single clip, where it was seen driving past Lucia in green and yellow, visible in the top left corner of the screen behind the debug interface.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Locust briefly appeared in the September 2022 GTA VI leaks in a single clip, where it was seen driving past Lucia in green and yellow, visible in the top left corner of the screen behind the debug interface.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("schafter-lwb", "SCHAFTER LWB", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "167", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Schafter LWB appeared in the September 2022 GTA VI leaks , in a single clip. The vehicle's model appears to have been upgraded in overall quality, featuring increased polygon count, 3D-modeled panel gaps, enhanced pillar details, remodeled door handles, and a brand new interior with a visible Benefactor badge on th…", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Schafter LWB appeared in the September 2022 GTA VI leaks , in a single clip.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("penumbra-ff", "PENUMBRA FF", "sports", [0,0,0,0], ['—','—','—','—'], "verified", null, "168", null, null, SRC_RS, true, "AN EXTENDED LOOK · VISUAL IDENTIFICATION", ["A Penumbra FF-shaped sports coupe is visible in Rockstar's published Extended Look footage."], ["Rockstar has not separately named the vehicle in the public gallery or published specifications."], "MAIBATSU"),
  V("sentinel-classic", "SENTINEL CLASSIC", "sports", [0,0,0,0], ['—','—','—','—'], "rumour", null, "169", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("buccaneer", "BUCCANEER", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buccaneer.webp', "170", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A white Buccaneer with a black vinyl roof and its driver-side door open can be seen parked on the double yellow centerlines of a road near an intersection in the Crosstown neighborhood of Vice City , behind a white Cypher and Dominator ASP , in the first trailer (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buccaneer-custom", "BUCCANEER CUSTOM", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buccaneer-custom.webp', "171", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Buccaneer Custom can be seen parked behind a PMP 700 outside a car meet in the Stockyard neighborhood of Vice City , in the first trailer (0:27)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buffalo-stx", "BUFFALO STX", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buffalo-stx.webp', "172", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Buffalo STX was first seen in the September 2022 GTA VI leaks , in a single clip, where two instances of the car, in black, can be seen driving past the Cipher Mall in Rockridge , Vice City . The top of the car is visible in the first trailer during a street takeover in Crosstown (0:46)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("chino", "CHINO", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/chino.webp', "173", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Chino's presence in Grand Theft Auto VI first appeared in the September 2022 GTA VI leaks , in a single clip."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("chino-custom", "CHINO CUSTOM", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/chino-custom.webp', "174", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("deviant", "DEVIANT", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/deviant.webp', "175", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Deviant appears with a US flag livery at Wyman's World Auto Salvage Co. in an official screenshot of the game's Ultimate Edition as part of the Wyman Car Collection side mission. The Deviant also appears in the August 2026 GTA VI leaks , where a worn-out beater one is shown driven by Jason ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator", "DOMINATOR", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator.webp', "176", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["A red and black Dominator can be seen in the opening shot of the game's first trailer , traveling along U.S. Route 82 in Hamlet near the Leonida Penitentiary . A black Dominator with a Patriot Beer livery can be seen racing at Gellhorn International Raceway in An Extended Look (17:42)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator-asp", "DOMINATOR ASP", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator-asp.webp', "177", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Dominator ASP's presence in Grand Theft Auto VI was first spotted in the game's first trailer , parked alongside other tuned vehicles during a street takeover in an intersection in the Crosstown neighborhood of Vice City (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator-gt", "DOMINATOR GT", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator-gt.webp', "178", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["A fully redesigned interior for the Dominator GT, identifiable by its A-pillar design, side mirror placement, soft-top roof, and the inclusion of the word \"Dominator\" on the speedometer, can be seen in an official screenshot of Ambrosia , where a man resembling Wyman is shown driving the car through a car wash ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dominator-gtx", "DOMINATOR GTX", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dominator-gtx.webp', "179", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The car can be seen in white, driving along Shore Drive in Vice Beach , in the first trailer (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("faction-custom-donk", "FACTION CUSTOM DONK", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/faction-custom-donk.webp', "180", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A purple Faction Custom Donk is partially visible on Lucia 's \"Vice City\" shirt in an official screenshot showcasing the \"Goodtime Gear\" bonus clothing included with the game's Ultimate Edition ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("gauntlet-classic-custom", "GAUNTLET CLASSIC CUSTOM", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/gauntlet-classic-custom.webp', "181", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A red Gauntlet Classic Custom can be seen parked near an intersection in Crosstown in the first trailer (0:45). The Gauntlet Classic Custom also briefly appeared in the September 2022 GTA VI leaks , across two clips, driving past Jason in traffic."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("gauntlet-hellfire", "GAUNTLET HELLFIRE", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/gauntlet-hellfire.webp', "182", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The rear of an orange Gauntlet Hellfire can be seen driving along Shore Drive in Vice Beach , in the first trailer (0:31). Later in the same trailer, a purple Gauntlet Hellfire with its passenger-side door open is shown parked near an intersection in the Crosstown neighborhood of Vice City (0:45)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("hermes", "HERMES", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/hermes.webp', "183", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Hermes can be distantly seen on a framed poster in the background of an official screenshot showcasing the One-Eyed Willie's mod shop from the game's Ultimate Edition , alongside the Hustler , the 1955 Stanier , and another two-door coupe ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("hustler", "HUSTLER", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/hustler.webp', "184", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Hustler can be distantly seen on a framed poster in the background of an official screenshot showcasing the One-Eyed Willie's mod shop from the game's Ultimate Edition , alongside the Hermes , the 1955 Stanier , and another two-door coupe ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("impaler-1980", "IMPALER (1980)", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/impaler-1980.webp', "185", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["This section contains insufficient information and is considered as a Stub . You can help by expanding it as much as you can. The car returns as the 1980 Impaler."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("impaler-lx-donk", "IMPALER LX DONK", "muscle", [0,0,0,0], ['—','—','—','—'], "verified", '/media/vehicles/wiki/faction-custom-donk.webp', "185A", "A high-riser Impaler LX variant appears in the GTA VI vehicle record with raised suspension, oversized wheels and low-profile tyres. The image is official donk-style context and is not presented as an isolated model identification.", null, SRC_RS, true, "OFFICIAL MEDIA · DONK CONTEXT", ["A donked-out Impaler LX body style is catalogued for GTA VI.", "The defining visible treatment is a higher ride height with oversized wheels."], ["Final in-game name, exact pictured frame, performance figures and customization options."], "DECLASSE"),
  V("impaler-sz", "IMPALER SZ", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/impaler-sz.webp', "186", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Impaler SZ can be seen in official screenshots of Vice City , the Leonida Keys , and the Grassrivers , where it displays design changes from its GTA Online rendition, including black plastic lower trim instead of chrome and new stock wheels."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("phoenix", "PHOENIX", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/phoenix.webp', "187", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The rear of a white Phoenix briefly appears in the first trailer , driving past a flipped-over SUV on a Vice City highway (1:03). The Phoenix also made a brief appearance in the September 2022 GTA VI leaks , driving in white and red on a highway passing a Vice City Metro Mule station."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("picador", "PICADOR", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "188", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ruiner", "RUINER", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/ruiner.webp', "189", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sabre-turbo", "SABRE TURBO", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "190", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("slamvan", "SLAMVAN", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/slamvan.webp', "191", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The roof of a black Slamvan can momentarily be seen in the first trailer , parked next to a donked Vapid sedan and a 1967 Dominator at a car meet in the Stockyard neighborhood of Vice City (0:28)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("tulip", "TULIP", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tulip.webp', "192", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The car makes a noteworthy appearance in the game's first trailer , particularly towards the end, where it is seen involved in a getaway (1:00) and fleeing from Port Gellhorn Pawn & Gun (1:10), both involving Lucia and Jason ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("tulip-m-100", "TULIP M-100", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tulip-m-100.webp', "193", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The rear of a black Tulip M-100 can be seen on a major thoroughfare, ahead of a pack of Final Chapter MC motorcyclists, in an official screenshot of Ambrosia . The vehicle also appeared with large low-profile tires in the first trailer ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("vigero-zx-convertible", "VIGERO ZX CONVERTIBLE", "muscle", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/vigero-zx-convertible.webp', "194", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A gray Vigero ZX Convertible can be seen driving along Vice-Dale County Road 561 in La Perle in an official screenshot of Vice City . It appears to have a revised front bumper in comparison to its prior rendition in Grand Theft Auto Online ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("cheetah-1995", "CHEETAH (1995)", "classics", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/cheetah-1995.webp', "195", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The rear of a white 1995 Cheetah appears parked on Shore Drive in Vice Beach in the game's first trailer (0:33), featuring a green Leonida \"CH33TAH\" license plate ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("infernus-classic", "INFERNUS CLASSIC", "classics", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/infernus-classic.webp', "196", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A small portion of the rear of the car can be seen in front of a parked Landstalker XL , and behind a Granger 3600LX , along Shore Drive in Vice Beach , during the first trailer (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("manana", "MANANA", "classics", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/manana.webp', "197", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A yellow Manana is seen in several official screenshot of the game's Ultimate Edition . It can be seen being worked on by Rideout Customs , as well as a customized version with large low-profile wheels, a metallic flake paint-job and a highly customized interior."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("asterope-gz", "ASTEROPE GZ", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/asterope-gz.webp', "198", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A white Asterope GZ can be distantly seen parked in Watson Bay in an official screenshot of the Grassrivers . A purple Asterope GZ can be seen on a car lift in the background inside Rideout Customs in an official screenshot of the game's Ultimate Edition ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("emperor", "EMPEROR", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/emperor.webp', "199", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Emperor appeared in the September 2022 GTA VI leaks , across two clips. In one, two instances of the vehicle can be seen in traffic near Hank's Waffles in Port Gellhorn . In another, a red one is briefly visible driving northbound past the Gas Stop location in Port Gellhorn."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("intruder", "INTRUDER", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/intruder.webp', "200", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Intruder briefly appeared in the September 2022 GTA VI leaks , across two clips. In one, its rear is vaguely visible parked at Cipher Mall in Rockridge , Vice City , between a Feroci and a Novak ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("primo", "PRIMO", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/primo.webp', "201", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The rear of a Primo can be partially seen driving along Shore Drive in Vice Beach , in the first trailer (0:31). Its front end is then partially visible in an official screenshot of Ambrosia , where it is parked near a Xero gas station. A Primo is seen closer up in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("primo-custom", "PRIMO CUSTOM", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/primo-custom.webp', "202", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Primo Custom can be seen in blue, driving along the opposite side of the road near a car meet in the Stockyard neighborhood of Vice City , in the first trailer (0:27)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("stanier", "STANIER", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/stanier.webp', "203", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Stanier appeared in the September 2022 GTA VI leaks , across two clips. In one clip, a red Stanier is parked along Shore Drive in Vice Beach , near Lucia . In another clip, it is faintly visible in blue driving northbound past the Gas Stop branch in Port Gellhorn along Route 2 ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("stratum", "STRATUM", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/stratum.webp', "204", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The rear of a Stratum can be distantly seen in the opening shot of the game's first trailer , traveling along a busy freeway in Hamlet near the Leonida Penitentiary ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("tailgater", "TAILGATER", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tailgater.webp', "205", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("tailgater-s", "TAILGATER S", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tailgater-s.webp', "206", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  // No record existed; from a community coupes summary (September 2026).
  V('cadillac-eldorado-1959-inspired-coupe', 'CADILLAC ELDORADO (1959)-INSPIRED COUPE', 'sedans', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'TRAILER 2 · COMMUNITY IDENTIFICATION', [], ['Reported as a classic luxury coupe modelled on the 1959 Cadillac Eldorado — huge tailfins, heavy chrome, a long low body — and new to the series.', 'In-game name, manufacturer and statistics.'], 'NOT OFFICIALLY SPECIFIED'),
  V("fr36", "FR36", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/fr36.webp', "207", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["An FR36 can be seen racing at the Gellhorn International Raceway in An Extended Look (17:43)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sentinel", "SENTINEL", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "208", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("windsor-drop", "WINDSOR DROP", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/windsor-drop.webp', "209", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Windsor Drop is briefly seen parked next to a parking meter along Shore Drive in Vice Beach in the second trailer (2:05). The car is later seen in a scroll-driven animation featuring Jason and Lucia on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("zion", "ZION", "sedans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/zion.webp', "210", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["The rear of a Zion can be distantly seen driving across a Vice City bridge in official artwork of Jason and Lucia ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ingot", "INGOT", "sedans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "211", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Ingot appeared in the September 2022 GTA VI leaks , where it can be seen in a clip stopped at an intersection near Hank's Waffles and Easy Inn in Port Gellhorn , in front of a Youga Classic .", "Leak account: The Ingot appeared in the September 2022 GTA VI leaks , where it can be seen in a clip stopped at an intersection near Hank's Waffles and Easy Inn in Port Gellhorn , in front of a Youga Classic .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("regina", "REGINA", "sedans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "212", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Regina appeared in the September 2022 GTA VI leaks in a single clip, where two instances of the vehicle, one red and one beige, can be seen at an intersection in Vice City .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Regina appeared in the September 2022 GTA VI leaks in a single clip, where two instances of the vehicle, one red and one beige, can be seen at an intersection in Vice City .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("zion-cabrio", "ZION CABRIO", "sedans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "213", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Zion Cabrio was first depicted in the August 2026 GTA VI leaks , where several are seen in the sixth video: A black one travelling north towards VCIA . A pink one travelling east along Interstate 97 . A white one travelling south towards Peacock Bay .", "Leak account: The Zion Cabrio was first depicted in the August 2026 GTA VI leaks , where several are seen in the sixth video: A black one travelling north towards VCIA . A pink one travelling east along Interstate 97 . A white one travelling south towards Peacock Bay .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("aleutian", "ALEUTIAN", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/aleutian.webp', "214", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["A black Aleutian can briefly be seen at the parking lot of Gellhorn Roadhouse in Port Gellhorn in the second trailer (2:28). Multiple instances of the Aleutian can also be seen parked at the Allied Crystal Sugar Refinery parking lot in the Ambrosia postcard featured on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("astron", "ASTRON", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/astron.webp', "215", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The rear of a black Astron can be seen storming through Port Gellhorn during a high-speed chase in the second trailer (2:29). An Astron can also be seen driving along Catalan Boulevard in an official screenshot of Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("baller-second-generation", "BALLER (SECOND GENERATION)", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/baller-second-generation.webp', "216", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The vehicle makes three notable appearances in the game's first trailer : A blue one is seen in the opening shot, driving on a highway near the Leonida Penitentiary in Vice-Dale County (0:03). Driving southbound on Interstate 97 ahead of a Towtruck (0:51)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("baller-st-d", "BALLER ST-D", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/baller-st-d.webp', "217", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Baller ST-D can be seen in traffic during the Schafter V12 pursuit sequence of An Extended Look . The Baller ST-D also appeared in two different clips of the August 2026 GTA VI leaks : In the \"Random Video 1\", two of the SUVs can be seen parked at the Hamilton Private Health Clinic 's parking lot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("cavalcade-xl", "CAVALCADE XL", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "218", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["The Cavalcade XL appears in multiple videos of the August 2026 GTA VI leaks : In the \"Random Video 1\", a red Cavalcade XL is seen parked at the Hamilton Private Health Clinic 's parking lot on the left side of the building, with a white Baller ST-D next to it."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("contender", "CONTENDER", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/contender.webp', "219", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dorado", "DORADO", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dorado.webp', "220", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["A silver Dorado can be seen parked in Watson Bay in an official screenshot of the Grassrivers . It can also be seen in white driving past the Allied Crystal Sugar Refinery in the postcard video of Ambrosia on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dubsta", "DUBSTA", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dubsta.webp', "221", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Dubsta appears in the Port Gellhorn Pawn & Gun parking lot towards the end of the first trailer (1:10)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("granger", "GRANGER", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/granger.webp', "222", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["Visible in Trailer 2 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("granger-3600lx", "GRANGER 3600LX", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/granger-3600lx.webp', "223", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("jubilee", "JUBILEE", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/jubilee.webp', "224", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Jubilee's presence in Grand Theft Auto VI was first seen in the game's first trailer , where it can be seen with its rear hatch open, parked on the curb of a street in the Stockyard neighborhood in Vice City (0:27)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("landstalker-xl", "LANDSTALKER XL", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/landstalker-xl.webp', "225", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The rear of a Landstalker XL can be seen parked in front of a Coquette D10 along Shore Drive in Vice Beach in the first trailer (0:32). Compared to its previous iteration in Grand Theft Auto Online , the SUV is now seemingly equipped with a rear windshield wiper and an updated interior."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("mesa", "MESA", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/mesa.webp', "226", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A red Mesa can be seen driving along the Keys Causeway in an official screenshot of the Leonida Keys ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("rebla-gts", "REBLA GTS", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "227", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["The Rebla GTS was first mentioned in the December 2023 GTA V source code leaks within lines of code linked to Grand Theft Auto VI , alongside the Arcturus . The vehicle would later officially appear in An Extended Look , confirming its appearance in the game."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("toros", "TOROS", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/toros.webp', "228", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Toros was first seen in the September 2022 GTA VI leaks , where functionality within the car's interior is depicted in several clips. It is later depicted in an official screenshot of the game, where it can be seen in green driving on Interstate 404 through Downtown Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("xls", "XLS", "suvs", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "229", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["The XLS briefly appeared in the September 2022 GTA VI leaks in a single clip, with its LOD model distantly visible in white, parked in the parking lot of an amphitheater in Downtown Vice City . The XLS would officially appear in An Extended Look ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("novak", "NOVAK", "suvs", [0,0,0,0], ['—','—','—','—'], "rumour", null, "230", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("avarus", "AVARUS", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/avarus.webp', "231", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A red Avarus can be seen ridden by Jason in the second trailer (2:22), later being bailed off by Lucia as she jumps onto an open container on a freight trailer in Downtown Vice City , where it is shown to have a custom livery (2:24)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("carbon-rs", "CARBON RS", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/carbon-rs.webp', "232", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Carbon RS appears on Shore Drive in Vice Beach in the game's first trailer , parked next to a red Double T (0:33). A stock variant of the bike with a white and grey livery also appears earlier in the first trailer."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("double-t", "DOUBLE T", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "233", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A red Double-T can be partially seen parked next to a Carbon RS on Shore Drive in Vice Beach during the game's first trailer (0:33). The available crop isolates the neighbouring Carbon RS, so it is not reused here as if it showed the Double-T."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("enduro", "ENDURO", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/enduro.webp', "234", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["An army fatigue-tinged Enduro, available at Jason's Safehouse for players who own the Ultimate Edition , is showcased in two official screenshots , where it can be seen featuring an updated model with various design changes."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("faggio", "FAGGIO", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/faggio.webp', "235", null, null, SRC_WIKI, true, "OFFICIAL VIDEO · GTA WIKI INDEX", ["The rear of a white Faggio briefly appears in a scroll-driven animation of Jason and Lucia from the Grand Theft Auto VI ' s promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("fcr-1000", "FCR 1000", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "236", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["The FCR 1000 was first seen in the game's second trailer , where it seen seen driving along the Sunbelt Highway towards Jason in his Ganado . It was later depicted in the August 2026 GTA VI leaks , where a black one is seen turning off SW 7th Avenue onto SW 4th Street , heading towards VCIA ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("manchez", "MANCHEZ", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/manchez.webp', "237", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A pair of Manchez bikes can be seen driving through muddy terrain in an screenshot of Mount Kalaga National Park ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("nightblade", "NIGHTBLADE", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/nightblade.webp', "238", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Nightblade can be seen behind a biker in an official screenshot of Electric Fang Tattoo for the Ultimate Edition ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sanchez", "SANCHEZ", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sanchez.webp', "239", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Sanchez's presence in Grand Theft Auto VI was first seen in the game's first trailer , where a group of Sanchezes and Blazers can be seen riding through La Perle . (1:06)"], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sanchez-livery", "SANCHEZ (LIVERY)", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "240", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sovereign-107", "SOVEREIGN 107", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sovereign-107.webp', "241", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A girl can be seen leaning on a red Sovereign, parked up at the car meet/yard within the Stockyard neighborhood of Vice City , in the first trailer (0:27). The name \"Sovereign 107\" is mentioned in the August 2026 GTA VI leaks , in a video titled \"Junkies\", where Jason steals its police variant ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("zombie-chopper", "ZOMBIE CHOPPER", "motorcycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/zombie-chopper.webp', "242", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Zombie Chopper can be seen in the background in the game's second trailer . Another can be seen behind a biker in an official screenshot of Electric Fang Tattoo for the Ultimate Edition ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("lectro", "LECTRO", "motorcycles", [0,0,0,0], ['—','—','—','—'], "verified", null, "243", null, null, SRC_RS, true, "AN EXTENDED LOOK · VISUAL IDENTIFICATION", ["A motorcycle matching the established Lectro design is visible in Rockstar's published Extended Look footage."], ["Rockstar has not separately named this appearance or published specifications."], "PRINCIPE"),
  V("blazer", "BLAZER", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/blazer.webp', "244", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Blazer's presence in Grand Theft Auto VI was first spotted in the game's first trailer , where it can be seen in a group of bikers driving through La Perle in Vice City (1:06)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("caracara-4x4", "CARACARA 4X4", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/caracara-4x4.webp', "245", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Caracara 4x4's presence in Grand Theft Auto VI was first spotted in the game's first trailer , where an orange model can be seen mud-crawling in the background at Thrillbilly Mud Club (0:55)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("hellion", "HELLION", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/hellion.webp', "246", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The truck can be seen in traffic on a busy Vice City freeway in the first trailer (1:03). It can then be seen in the parking lot outside Port Gellhorn Pawn & Gun , where Lucia and Jason flee in a Tulip (1:10). The truck can also be seen driving through Vice Beach in An Extended Look (18:06)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("kamacho", "KAMACHO", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/kamacho.webp', "247", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The rear of a Kamacho can be distantly seen driving across a Vice City bridge in official artwork of Jason and Lucia . The Kamacho was later fully showcased in promotional screenshots for the game's Ultimate Edition , where a green one is shown being worked on by One-Eyed Willie's , receiving a livery makeover."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("outlaw", "OUTLAW", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/outlaw.webp', "248", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Outlaw can be seen in green at the Thrillbilly Mud Club during the first trailer (0:56). A heavily customized Outlaw is also visible driving along Vice-Dale County Road 561 in La Perle in an official screenshot of Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("rebel", "REBEL", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/rebel.webp', "249", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Rebel appeared in the September 2022 GTA VI leaks , across three clips. In one clip, it is seen twice, driving past Lucia at an intersection near Cipher Mall in Rockridge , Vice City , in red and blue."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sandking-xl", "SANDKING XL", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sandking-xl.webp', "250", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A Sandking XL is seen in the first trailer on two separate occassions: A lifted white one is seen driving past an Arrow gas station on cellphone video. A lifted red and white one is seen in the background at Thrillbilly Mud Club ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("terminus", "TERMINUS", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "251", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("verus", "VERUS", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/verus.webp', "252", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("walton-l35-stock", "WALTON L35 STOCK", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/walton-l35-stock.webp', "253", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A Walton L35 Stock can be seen parked in the Leonida Keys and Port Gellhorn , near the Wonder Whale and Delights strip club, respectively, in official screenshots ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("yosemite-1500", "YOSEMITE 1500", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/yosemite-1500.webp', "254", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Yosemite 1500 appears parked in a screenshot in the Leonida Keys , as well as in the Port Gellhorn and Ambrosia postcards, on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("rancher", "RANCHER", "offroad", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/rancher.webp', "255", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The two-door Rancher appeared in the September 2022 GTA VI leaks , across three clips. In one, a blue version is seen in front of the Bite! store at the Cipher Mall in Rockridge , Vice City , parked between two Burrito vans. In a second clip, the vehicle is briefly seen parked in a parking lot in Hamlet ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("riata", "RIATA", "offroad", [0,0,0,0], ['—','—','—','—'], "rumour", null, "256", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("street-blazer", "STREET BLAZER", "offroad", [0,0,0,0], ['—','—','—','—'], "rumour", null, "257", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Street Blazer briefly appeared in the September 2022 GTA VI leaks in a single clip, where it was parked next to a gas pump at the Gas Stop in Port Gellhorn . Its base variant was later shown in the first trailer .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Street Blazer briefly appeared in the September 2022 GTA VI leaks in a single clip, where it was parked next to a gas pump at the Gas Stop in Port Gellhorn . Its base variant was later shown in the first trailer .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("bmx", "BMX", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bmx.webp', "258", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["A missing poster for a grey BMX can be briefly seen on a bulletin board in the lobby of a Vice City apartment complex in the game's second trailer (1:43)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("cruiser", "CRUISER", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/cruiser.webp', "259", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("scorcher", "SCORCHER", "cycles", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/scorcher.webp', "260", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Scorcher first appeared in the September 2022 GTA VI leaks in a single clip, parked at a bayside park in Vice City . A Scorcher can then be seen stood on tactile paving at a Vice City intersection in the first trailer (1:07)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  // No record existed; from a community cycles summary (September 2026).
  V('endurex-race-bike', 'ENDUREX RACE BIKE', 'cycles', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'AN EXTENDED LOOK · COMMUNITY IDENTIFICATION', [], ['Reported as the returning road-racing bicycle from GTA V, based on the Pinarello Dogma (model ID tribike2): one seat, about 110 kg, built for paved roads.', 'Rockstar confirmation of the name and statistics.'], 'NOT OFFICIALLY SPECIFIED'),
  V("bison", "BISON", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bison.webp', "261", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Bison's presence in Grand Theft Auto VI was first confirmed in the game's first trailer , where a black Bison can be seen parked in the distance during a shot of Vice City 's Rialto Islands (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("bobcat-xl", "BOBCAT XL", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/bobcat-xl.webp', "262", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Bobcat XL made its first official appearance in the opening shot of the game's first trailer , where it can be seen towing a Boat Trailer carrying a bow rider motorboat (0:02). It can later be seen in a parking lot on Vice City 's Rialto Islands (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("boxville", "BOXVILLE", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/boxville.webp', "263", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Boxville briefly appeared in the September 2022 GTA VI leaks across two clips, seen driving northbound past the Gas Stop branch in Port Gellhorn , and past an auto repair shop in La Perle , Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("burrito", "BURRITO", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/burrito.webp', "264", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Burrito lineup serves as the basis for a wide array of vans, including cargo, passenger and cutaway designs. The vehicle also has a distinctive second generation model with a face lift design."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("journey-ii", "JOURNEY II", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/journey-ii.webp', "265", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A beige Journey II can be partially seen parked in Watson Bay in a screenshot from the Grassrivers section of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("speedo", "SPEEDO", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/speedo.webp', "266", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Speedo was first depicted in the game's first trailer , travelling along a freeway in Vice-Dale County in the opening scene. The Speedo later appeared in the August 2026 GTA VI leaks , where its design has been significantly revamped."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("youga-classic", "YOUGA CLASSIC", "vans", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/youga-classic.webp', "267", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Youga Classic appears in a parking lot near the toll booths as seen in the first trailer (0:31)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("camper", "CAMPER", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "268", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("minivan", "MINIVAN", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "269", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Minivan appeared in the September 2022 GTA VI leaks in a single clip, where it was parked in black behind a red Stanier , next to Lucia . Compared to its previous HD Universe iterations, the Minivan appears to have undergone several design changes, improving its overall model quality.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Minivan appeared in the September 2022 GTA VI leaks in a single clip, where it was parked in black behind a red Stanier , next to Lucia .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("moonbeam", "MOONBEAM", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "270", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Moonbeam briefly appeared in the September 2022 GTA VI leaks , seen in two separate clips; first seen driving along U.S. Route 2 and passing the Gas Stop gas station, and later seen from the rear parked in a parking lot.", "Leak account: The Moonbeam briefly appeared in the September 2022 GTA VI leaks , seen in two separate clips; first seen driving along U.S. Route 2 and passing the Gas Stop gas station, and later seen from the rear parked in a parking lot.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("rumpo-custom", "RUMPO CUSTOM", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "271", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Rumpo Custom appeared in the September 2022 GTA VI leaks in a single clip, where two red ones can be seen parked at the Schlott Construction warehouse in Port Gellhorn , across the street from Hank's Waffles .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Rumpo Custom appeared in the September 2022 GTA VI leaks in a single clip, where two red ones can be seen parked at the Schlott Construction warehouse in Port Gellhorn , across the street from Hank's Waffles .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("youga", "YOUGA", "vans", [0,0,0,0], ['—','—','—','—'], "rumour", null, "272", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Youga appeared in the September 2022 GTA VI leaks in a single clip, where it can faintly be seen three times in traffic near Hank's Waffles in Port Gellhorn .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Youga appeared in the September 2022 GTA VI leaks in a single clip, where it can faintly be seen three times in traffic near Hank's Waffles in Port Gellhorn .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("boat-trailer-utility-class", "BOAT TRAILER (UTILITY CLASS)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/boat-trailer-utility-class.webp', "273", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dock-trailer", "DOCK TRAILER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dock-trailer.webp', "274", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["Several empty Dock Trailers can be seen connected to Haulers and Packers around PortViceCity on the background of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("forklift", "FORKLIFT", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/forklift.webp', "275", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["Two Forklifts can be seen parked at the Vice Beach Coast Guard Station and PortViceCity in the background video on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("tow-truck-yankee-based", "TOW TRUCK (YANKEE-BASED)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/tow-truck-yankee-based.webp', "276", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("trailer-box", "TRAILER (BOX)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/trailer-box.webp', "277", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The trailer can be seen with a Patriot Beer livery, being towed by a Phantom Custom , in the first scene of the first trailer (0:03). Numerous box trailers were seen in a clip from the August 2026 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("trailer-container", "TRAILER (CONTAINER)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/trailer-container.webp', "278", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A Phantom can be seen towing a container trailer with a red Navitrak container on the back in an official screenshot of Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("trailer-flatbed", "TRAILER (FLATBED)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/trailer-flatbed.webp', "279", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["A flatbed trailer can be seen carrying a container with a Tempesta inside in the game's second trailer . In comparison to its GTA V design, the rear of the trailer features a much more detailed rear bumper and tail light array, as well as detailed axle and suspension components."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("trailer-tanker", "TRAILER (TANKER)", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "280", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("flatbed", "FLATBED", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/flatbed.webp', "281", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("rubble", "RUBBLE", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/rubble.webp', "282", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("hauler", "HAULER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/hauler.webp', "283", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["Numerous white Haulers can be seen connected to flatbed trailers around PortViceCity on the background for the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("packer", "PACKER", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/packer.webp', "284", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["The Packer can be seen in the distance, along a main road in Leonard County , where Lucia and Jason are fleeing in a Tulip , in the first trailer (1:00). Two Packers can be seen driving down Port Gellhorn in the second trailer (2:28)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("phantom", "PHANTOM", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/phantom.webp', "285", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("phantom-custom", "PHANTOM CUSTOM", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", null, "286", null, null, SRC_WIKI, true, "REFERENCE LISTING · GTA WIKI INDEX", ["Named in the GTA Wiki index without a clear appearance yet."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("stockade", "STOCKADE", "trucks", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/stockade.webp', "287", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("airtug", "AIRTUG", "industrial", [0,0,0,0], ['—','—','—','—'], "verified", null, "288", null, null, SRC_RS, true, "AN EXTENDED LOOK · VISUAL IDENTIFICATION", ["An airport tug matching the Airtug is visible in Rockstar's published Extended Look footage."], ["Rockstar has not separately named this appearance or confirmed whether it is driveable."], "HVY"),
  V("caddy", "CADDY", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "289", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("caddy-k102", "CADDY (K102)", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "290", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("ripley", "RIPLEY", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "291", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("sadler", "SADLER", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "292", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Sadler briefly appeared in the September 2022 GTA VI leaks in a single clip, where it is seen in gray, towing a trailer while driving southbound along Route 2 past the Gas Stop branch in Port Gellhorn , behind a Utility Truck .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Sadler briefly appeared in the September 2022 GTA VI leaks in a single clip, where it is seen in gray, towing a trailer while driving southbound along Route 2 past the Gas Stop branch in Port Gellhorn , behind a Utility Truc…", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("utility-truck", "UTILITY TRUCK", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "293", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Utility Truck briefly appeared in the September 2022 GTA VI leaks in a single clip, driving southbound along Route 2 past the Gas Stop branch in Port Gellhorn , in front of a Sadler .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Utility Truck briefly appeared in the September 2022 GTA VI leaks in a single clip, driving southbound along Route 2 past the Gas Stop branch in Port Gellhorn , in front of a Sadler .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("dozer", "DOZER", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "294", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("mixer-4-axle", "MIXER (4-AXLE)", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "295", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Mixer briefly appeared in the September 2022 GTA VI leaks in a single clip, seen driving northbound in red past the Gas Stop branch in Port Gellhorn . The truck's base variant also appeared in leaked footage.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Mixer briefly appeared in the September 2022 GTA VI leaks in a single clip, seen driving northbound in red past the Gas Stop branch in Port Gellhorn . The truck's base variant also appeared in leaked footage.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("tipper", "TIPPER", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "296", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("benson", "BENSON", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "297", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Benson briefly appeared in the September 2022 GTA VI leaks in a single clip, driving past Lucia in dark blue at the intersection near the Cipher Mall in Rockridge , Vice City .", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Benson briefly appeared in the September 2022 GTA VI leaks in a single clip, driving past Lucia in dark blue at the intersection near the Cipher Mall in Rockridge , Vice City .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("biff", "BIFF", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "298", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Biff briefly appeared in the September 2022 GTA VI leaks in a single clip, stopped at an intersection in Vice City in red. The truck's Mixer variant also appeared in leaked footage.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Biff briefly appeared in the September 2022 GTA VI leaks in a single clip, stopped at an intersection in Vice City in red. The truck's Mixer variant also appeared in leaked footage.", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("mule", "MULE", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "299", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Mule briefly appeared in the September 2022 GTA VI leaks in several clips. In one clip, it is seen driving past Jason outside a store in Vice Beach . In another clip, an all-black variant is seen driving past Lucia in an industrial area. The design of the truck is unchanged, albeit with a new set of steel wheels.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Mule briefly appeared in the September 2022 GTA VI leaks in several clips. In one clip, it is seen driving past Jason outside a store in Vice Beach .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("yankee", "YANKEE", "trucks", [0,0,0,0], ['—','—','—','—'], "rumour", null, "300", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("airport-bus", "AIRPORT BUS", "service", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/airport-bus.webp', "301", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dashound", "DASHOUND", "service", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dashound.webp', "302", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Seen in Extended Look footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("ambulance", "AMBULANCE", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/ambulance.webp', "303", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Ambulance is seen at the start of An Extended Look , seen turning a corner as Lucia and Jason are heading towards the Venture Apartments . The Ambulance was also seen in several clips from the August 2026 GTA VI leaks ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buffalo-stx-pursuit", "BUFFALO STX PURSUIT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buffalo-stx-pursuit.webp', "304", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["The Buffalo STX Pursuit can be seen in the middle of an intersection in Vice City , along with two \"interceptor\" Police Cruisers ; one VCPD and one VDPD , in the first trailer (1:07). It is depicted with a green and white Vice-Dale Police Department livery and is equipped with a blue/red LED lightbar."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("gauntlet-interceptor", "GAUNTLET INTERCEPTOR", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/gauntlet-interceptor.webp', "305", null, null, SRC_WIKI, true, "EXTENDED LOOK · GTA WIKI INDEX", ["Two instances of the Gauntlet Interceptor can be seen attending the scene of an overturned Vapid SUV on a busy Leonida highway in the first trailer (1:04). The vehicle is operated by Leonida Highway Patrol , with a black and tan two-tone livery seemingly based on that of the Florida Highway Patrol ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("police-cruiser-interceptor", "POLICE CRUISER (INTERCEPTOR)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/police-cruiser-interceptor.webp', "306", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Police Cruiser is due to appear in Grand Theft Auto VI , now operated by a variety of police departments, including the Vice City Police Department and Vice-Dale Police Department , as seen during the game's first and second trailers , as well as the Port Gellhorn Police Department and Key Lento Police Department ,…"], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("police-cruiser-buffalo", "POLICE CRUISER (BUFFALO)", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/police-cruiser-buffalo.webp', "307", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("police-riot", "POLICE RIOT", "emergency", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/police-riot.webp', "308", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Police Riot appears in the second trailer for Grand Theft Auto VI , seen pursuing Jason and Lucia alongside two VDPD cars, shortly before Lucia fires a grenade launcher at them."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sheriff-suv", "SHERIFF SUV", "emergency", [0,0,0,0], ['—','—','—','—'], "rumour", null, "309", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The Sheriff SUV appeared in the September 2022 GTA VI leaks in a single clip, where two of them are seen chasing Lucia , who is riding on the back of a red Bison 900 through a main street in Hamlet during what appears to be a mission sequence.", "Leak account: This article pertains to content due to return in the upcoming 19 November 2026 release of. The Sheriff SUV appeared in the September 2022 GTA VI leaks in a single clip, where two of them are seen chasing Lucia , who is riding on the back of a red Bison 900 through a main street in Hamlet during what appears to be a mi…", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("sovereign-107-police-bike", "SOVEREIGN 107 (POLICE BIKE)", "emergency", [0,0,0,0], ['—','—','—','—'], "rumour", null, "310", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The bike returns named \"Sovereign 107\" and was first seen in a video in the August 2026 GTA VI leaks . In the video, Jason is seen pulling a VCPD Motor Officer off the bike and driving away with it, activating its sirens, before driving it into the Fuzzard Drain Canal in Southside , Vice City .", "Leak account: The bike returns named \"Sovereign 107\" and was first seen in a video in the August 2026 GTA VI leaks . In the video, Jason is seen pulling a VCPD Motor Officer off the bike and driving away with it, activating its sirens, before driving it into the Fuzzard Drain Canal in Southside , Vice City .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("dinghy", "DINGHY", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dinghy.webp', "311", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["Visible in Trailer 1 footage."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("marquis", "MARQUIS", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/marquis.webp', "312", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["The Marquis can be seen in the waters of Leonida in the game's first trailer (0:31, 0:36) and in the Vice City and Leonida Keys postcards on the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("seashark", "SEASHARK", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/seashark.webp', "313", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["A red Seashark can be seen stationary by the shore of a crowded Vice Beach in the first trailer , positioned next to a yellow jet ski (0:22)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("squalo", "SQUALO", "boats", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/squalo.webp', "314", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The boat is seen numerous times in the game's second trailer and in official screenshots : Two of the boats are seen outside Brian's Boat Works & Marina mounted on boat trailers in the game's second trailer. A Squalo is seen in the Leonida Keys in an official screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("buzzard-attack-chopper", "BUZZARD ATTACK CHOPPER", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/buzzard-attack-chopper.webp', "315", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["A Buzzard Attack Chopper, piloted by Jason Duval , can be seen chasing an Airboat 09 through the Grassrivers in the second trailer (2:18)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("maverick", "MAVERICK", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/maverick.webp', "316", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["Visible in background art on the official GTA VI website."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("police-maverick", "POLICE MAVERICK", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/police-maverick.webp', "317", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("sea-sparrow", "SEA SPARROW", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/sea-sparrow.webp', "318", null, null, SRC_WIKI, true, "COVER ART · GTA WIKI INDEX", ["The Sea Sparrow can briefly be seen flying in the skies above Vice Beach in the first trailer (0:22). It can also briefly be seen flying above Vice Beach in the second trailer (0:38). An armed configuration of the helicopter appears on the cover art for the game."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("supervolito", "SUPERVOLITO", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/supervolito.webp', "319", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The SuperVolito can briefly be seen flying in the skies above Vice Beach , Vice-Dale County , in the first trailer (0:22). Another SuperVolito can be seen on a helipad on a rooftop near PortViceCity on the background of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("swift", "SWIFT", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/swift.webp', "320", null, null, SRC_WIKI, true, "WEBSITE BACKGROUND · GTA WIKI INDEX", ["A Swift can be seen flying over the skies of Vice Beach in an official screenshot labeled under Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("dodo", "DODO", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/dodo.webp', "321", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The Dodo can be seen twice in the first trailer . It is first seen in the trailer's establishing shot (0:13), where it is seen towing a NINE1NINE banner. It is later seen swooping into view above the Leonida Keys in another aerial shot (0:34)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("duster", "DUSTER", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/duster.webp', "322", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["Shown in an official Rockstar screenshot."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("jet", "JET", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/jet.webp', "323", null, null, SRC_WIKI, true, "TRAILER 2 · GTA WIKI INDEX", ["The Jet is the first controllable wide-body aircraft in the series and the second controllable airliner, after the AT-400 in Grand Theft Auto: San Andreas . Similar 747-based jets were also prominent in Grand Theft Auto IV , but they were only present as scenic props and cannot be interacted with in any way."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("mammatus", "MAMMATUS", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/mammatus.webp', "324", null, null, SRC_WIKI, true, "OFFICIAL ARTWORK · GTA WIKI INDEX", ["A Mammatus can be seen in the artwork featured on the Leonida Keys section of the game's promotional website ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("nimbus", "NIMBUS", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/nimbus.webp', "325", null, null, SRC_WIKI, true, "TRAILER 1 · GTA WIKI INDEX", ["The Nimbus' presence in Grand Theft Auto VI was first spotted in the game's first trailer , where it can be seen flying in the distance over Vice Beach (0:21)."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("shamal", "SHAMAL", "aircraft", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/shamal.webp', "326", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A Shamal can be seen flying over the Vice City Sign at Vice City International Airport in a official screenshot of Vice City ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("valkyrie", "VALKYRIE", "aircraft", [0,0,0,0], ['—','—','—','—'], "verified", null, "327", null, null, SRC_RS, true, "AN EXTENDED LOOK · VISUAL IDENTIFICATION", ["A helicopter matching the Buckingham Valkyrie is visible in Rockstar's published Extended Look footage."], ["Rockstar has not separately named this appearance, its armament or player access."], "BUCKINGHAM"),
  V("volatus", "VOLATUS", "aircraft", [0,0,0,0], ['—','—','—','—'], "rumour", null, "328", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("luxor", "LUXOR", "aircraft", [0,0,0,0], ['—','—','—','—'], "rumour", null, "329", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("mallard", "MALLARD", "aircraft", [0,0,0,0], ['—','—','—','—'], "rumour", null, "330", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("p-996-lazer", "P-996 LAZER", "aircraft", [0,0,0,0], ['—','—','—','—'], "rumour", null, "331", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V("freight-train", "FREIGHT TRAIN", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/freight-train.webp', "332", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["A blue and yellow Freight Train can be seen crossing a railroad bridge in an official screenshot of Mount Kalaga National Park . The train appears to sport a Boxtrax livery, with \"Trax\" visible on the engine compartment."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("freight-train-tanker", "FREIGHT TRAIN (TANKER)", "trains", [0,0,0,0], ['—','—','—','—'], "confirmed", '/media/vehicles/wiki/freight-train-tanker.webp', "333", null, null, SRC_WIKI, true, "OFFICIAL SCREENSHOT · GTA WIKI INDEX", ["The tanker car is seen being hauled by a Freight Train across a railroad bridge in the Mount Kalaga National Park region, in an official screenshot ."], ["Manufacturer name, performance figures and full specifications."], "NOT OFFICIALLY SPECIFIED"),
  V("df8-90", "DF8-90", "trains", [0,0,0,0], ['—','—','—','—'], "rumour", null, "334", null, null, SRC_WIKI, true, "LEAKED MATERIAL · UNCONFIRMED", [], ["Leak account: The DF8-90 appeared twice in the September 2022 GTA VI leaks . In one clip, the car is seen parked up in a yard in Vice City . In the other clip, the rear of the car can briefly be seen during testing of the game's Weapon Wheel .", "Leak account: The DF8-90 appeared twice in the September 2022 GTA VI leaks . In one clip, the car is seen parked up in a yard in Vice City . In the other clip, the rear of the car can briefly be seen during testing of the game's Weapon Wheel .", "Any Rockstar confirmation — this entry is sourced only from material the developer has not published or endorsed."], "NOT OFFICIALLY SPECIFIED"),
  V('dinka-enduro', 'DINKA ENDURO', 'motorcycles', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.safehouseVehicles, '000',
    'Rockstar names the Dinka Enduro motorcycle as one of Jason’s Safehouse Vehicles. The Ultimate Edition description notes its army-fatigue-tinged appearance; no performance figures have been published.',
    'ULTIMATE EDITION · JASON’S SAFEHOUSE', SRC_ED, true, 'JASON’S SAFEHOUSE · ULTIMATE EDITION',
    ['Rockstar names the Dinka Enduro motorcycle as one of Jason’s Safehouse Vehicles.', 'The advertised version has an army-fatigue-tinged appearance.', 'The GTA Wiki reports two official screenshots showing an updated model with various design changes from the standard Enduro.'],
    ['Performance figures, acquisition rules and the safehouse’s storage capacity.'], 'DINKA', 'JASON DUVAL', 'ULTIMATE EDITION'),
  V('crest-kayak', 'CREST KAYAK', 'boats', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.safehouseVehicles, '000',
    'Rockstar names the Crest Kayak as a watercraft included among Jason’s Safehouse Vehicles. Whether Crest is a manufacturer or product brand is not further specified.',
    'ULTIMATE EDITION · JASON’S SAFEHOUSE', SRC_ED, true, 'JASON’S SAFEHOUSE · ULTIMATE EDITION',
    ['Rockstar names the Crest Kayak as a safehouse watercraft reward.', 'The GTA Wiki reports an official Mount Kalaga National Park screenshot showing a man paddling an orange Kayak, and two more visible in the park’s promotional postcard video.'],
    ['Whether Crest is a manufacturer, product brand or model family; performance and storage rules.'], 'NOT SEPARATELY CLARIFIED', 'JASON DUVAL', 'ULTIMATE EDITION'),
  V('vapid-ganado', 'VAPID GANADO', 'muscle', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.vapidGanado, '000',
    'Jason’s well-worn Vapid Ganado low-riding pickup. The Ultimate Edition adds the Ganado Retro Build, an exclusive modification package with additional muscle and classic styling.',
    'BASE VEHICLE · ULTIMATE RETRO BUILD', SRC_ED, true, 'JASON DUVAL · ULTIMATE RETRO BUILD',
    ['Rockstar calls it Jason’s well-worn low-riding pickup.', 'The Ultimate Retro Build adds exclusive muscle and classic styling.', 'The GTA Wiki reports official first-trailer artwork showing Lucia and Jason seated on its hood, with bullet holes on the side, a Leonida plate and the Vapid logo visible on the grille.'],
    ['Performance figures and the full range of vehicle modification options.'], 'VAPID', 'JASON DUVAL', 'BASE VEHICLE · ULTIMATE RETRO BUILD'),
  V('shitzu-squalo', 'SHITZU SQUALO', 'boats', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.shitzuSqualo, '000',
    'An Ultimate Edition Squalo prepared for open-ocean use, described by Rockstar with a pink-and-blue gradient, an explosives-laden weapons crate and fishing around Gambit Bay. It is docked at Washington Beach.',
    'ULTIMATE EDITION · WASHINGTON BEACH', SRC_ED, true, 'WASHINGTON BEACH · GAMBIT BAY · ULTIMATE EDITION',
    ['Rockstar describes a pink-and-blue gradient Squalo, prepared for open-ocean use.', 'It is associated with fishing in Gambit Bay and an explosives-laden weapons crate.'],
    ['How the weapons crate works, named explosives, fishing mechanics and performance figures.'], 'SHITZU', null, 'ULTIMATE EDITION'),
  V('vapid-stanier-55', '’55 VAPID STANIER SEDAN', 'classics', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.vapidStanier55, '000',
    'A 1955 Vapid sedan included with its own garage in the Vintage Vice City Pack. Rockstar has not published the garage address, capacity or vehicle-storage rules.',
    'VINTAGE VICE CITY PACK · GARAGE INCLUDED', SRC_ED, true, 'VINTAGE VICE CITY PACK · GARAGE INCLUDED',
    ['Rockstar identifies this 1955 Vapid vehicle as a sedan.', 'The reward explicitly includes the ’55 Vapid Stanier Sedan and Garage.', 'The GTA Wiki reports the same yellow-and-white car first seen parked outside the Boardwalk Hotel on Shore Drive in the first trailer (0:31), later confirmed by name in the Vintage Vice City Pack’s own promotional material, shown being driven by Jason and Lucia.'],
    ['Garage address, capacity, customization facilities and universal storage rules.'], 'VAPID', null, 'VINTAGE VICE CITY PACK · GARAGE INCLUDED'),
  V('vapid-dominator-buggy-67', '’67 VAPID DOMINATOR BUGGY', 'offroad', [0, 0, 0, 0], ['—', '—', '—', '—'], 'confirmed', IMG.dominatorBuggy, '000',
    'An Ultimate Edition Mud Club off-road buggy associated with Mount Kalaga. It is stored at Paradise Garage in Watson Bay, which Rockstar says includes a weapon locker and a secure place to deposit stolen goods for fencing.',
    'ULTIMATE EDITION · PARADISE GARAGE', SRC_ED, true, 'MOUNT KALAGA · PARADISE GARAGE, WATSON BAY · ULTIMATE EDITION',
    ['Rockstar identifies this 1967 Vapid as an off-road buggy and a Mud Club monster.', 'Paradise Garage includes a weapon locker and a secure place to deposit stolen goods for fencing.', 'The GTA Wiki reports the base 1967 Dominator glimpsed behind a donked Vapid sedan in Stockyard in the first trailer (0:27) and driving past Jason and Lucia in “An Extended Look”, with the buggy variant itself separately confirmed as an Ultimate Edition unlock.'],
    ['Whether Mud Club is a formal group, exact handling values and vehicle-fencing mechanics.'], 'VAPID', null, 'ULTIMATE EDITION'),
  Object.assign(V('rexhall-rose-air', 'REXHALL ROSE AIR', 'vans', [0, 0, 0, 0], ['—', '—', '—', '—'], 'verified', null, '335',
    null, null, SRC_RS, true, 'AN EXTENDED LOOK · VISUAL IDENTIFICATION',
    ['A motorhome identified as a Rexhall Rose Air is visible in Rockstar-published Extended Look footage.'],
    ['Rockstar has not published an in-game manufacturer, final model name, interior access or specifications.'], 'NOT OFFICIALLY SPECIFIED'), { publishedAt: '2026-09-09', updatedAt: '2026-09-09' }),
  Object.assign(V('declasse-granger-taxi', 'DECLASSE GRANGER TAXI', 'service', [0, 0, 0, 0], ['—', '—', '—', '—'], 'verified', null, '336',
    null, null, SRC_RS, true, 'AN EXTENDED LOOK · VISUAL IDENTIFICATION',
    ['A Granger-based taxi carrying commercial livery is visible in Rockstar-published Extended Look footage.'],
    ['Rockstar has not separately named the variant or explained taxi-service gameplay.'], 'DECLASSE'), { publishedAt: '2026-09-09', updatedAt: '2026-09-09' }),
  Object.assign(V('progen-emerus', 'PROGEN EMERUS', 'sports', [0, 0, 0, 0], ['—', '—', '—', '—'], 'verified', null, '337',
    null, null, SRC_RS, true, 'AN EXTENDED LOOK · VISUAL IDENTIFICATION',
    ['A supercar matching the established Progen Emerus design is visible in Rockstar-published Extended Look footage.'],
    ['Rockstar has not separately named this appearance or published performance and availability data.'], 'PROGEN'), { publishedAt: '2026-09-09', updatedAt: '2026-09-09' }),
  Object.assign(V('water-taxi', 'WATER TAXI', 'boats', [0, 0, 0, 0], ['—', '—', '—', '—'], 'verified', null, '338',
    null, null, SRC_RS, true, 'AN EXTENDED LOOK · VISUAL IDENTIFICATION',
    ['A passenger boat operating as a water taxi is visible in Rockstar-published Extended Look footage.'],
    ['Rockstar has not published a model name, operator, route network or confirmed player access.']), { publishedAt: '2026-09-09', updatedAt: '2026-09-09' }),
  // Boats named in a community vehicle summary (September 2026) with no record
  // here yet. Sightings are claimed from official media, but the model
  // identifications are the community's, so they are filed as analysis.
  V('bavaria-sr33-inspired-boat', 'BAVARIA SR33-INSPIRED BOAT', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'TRAILER 1 · COMMUNITY IDENTIFICATION', [], ['Reported as a compact recreational cruiser modelled on the Bavaria SR33.', 'In-game name, manufacturer and statistics.'], 'NOT OFFICIALLY SPECIFIED'),
  V('ferry', 'FERRY', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'AN EXTENDED LOOK · COMMUNITY IDENTIFICATION', [], ['Reported as a passenger and vehicle ferry modelled on the Elliott Bay Design Group ferries serving Miami’s Fisher Island.', 'Whether it can be driven, and its route.'], 'NOT OFFICIALLY SPECIFIED'),
  V('highfield-sport-900-inspired-boat', 'HIGHFIELD SPORT 900-INSPIRED BOAT', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'OFFICIAL SCREENSHOT · COMMUNITY IDENTIFICATION', [], ['Reported as a large rigid inflatable modelled on the Highfield Sport 900.', 'In-game name, manufacturer and statistics.'], 'NOT OFFICIALLY SPECIFIED'),
  V('rb-s-inspired-response-boat', 'RB-S-INSPIRED RESPONSE BOAT', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'OFFICIAL SCREENSHOT · COMMUNITY IDENTIFICATION', [], ['Reported as a fast response boat modelled on the first-generation Response Boat-Small used by maritime agencies; the second generation has its own record.', 'In-game name and operator.'], 'NOT OFFICIALLY SPECIFIED'),
  V('speeder', 'SPEEDER', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'TRAILER 1 · COMMUNITY IDENTIFICATION', [], ['Reported as the returning Pegassi Speeder from GTA V and GTA Online, drawing on the Coeur 290 Nighthawk and Cherubini Classic 20.', 'Rockstar confirmation of the name.'], 'PEGASSI'),
  V('tropic', 'TROPIC', 'boats', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'TRAILER 1 · COMMUNITY IDENTIFICATION', [], ['Reported as the returning Shitzu Tropic, a cabin cruiser modelled on the Sea Ray 300 Sundancer.', 'Rockstar confirmation of the name.'], 'SHITZU'),
  // The only compact identified so far, from the same community summary.
  V('chevrolet-sonic-inspired-compact', 'CHEVROLET SONIC-INSPIRED COMPACT', 'compacts', [0,0,0,0], ['—','—','—','—'], 'analysis', null, '000', null, null, ['Community summary', null], true, 'TRAILER 1 · COMMUNITY IDENTIFICATION', [], ['Reported as an everyday compact hatchback modelled on the Chevrolet Sonic, one of the first civilian cars identified in Trailer 1.', 'In-game name, manufacturer, statistics, customisation, price and where it spawns.'], 'NOT OFFICIALLY SPECIFIED'),
  V('unnamed-aircraft', 'UNNAMED AIRCRAFT', 'aircraft', [0, 0, 0, 0], ['—', '—', '—', '—'], 'category', null, '—',
    'Rockstar’s official GTA VI material establishes aircraft in Leonida, including a helicopter on the cover-art description and a plane in general imagery. Rockstar has not named a specific aircraft model or confirmed player controllability.',
    'OFFICIAL CATEGORY · MODEL UNNAMED', SRC_RS, true, 'LEONIDA · OFFICIAL MEDIA',
    ['Official GTA VI material depicts both a helicopter and a plane in Leonida.'],
    ['A specific model name, manufacturer and player controllability.']),

].map((v) => ({ ...v, gallery: ({
  'grotti-cheetah-95': [IMG.grottiCheetah, IMG.grottiCheetahRear],
  'vapid-stanier-55': [IMG.vapidStanier55, IMG.vapidStanier55Detail],
  'shitzu-squalo': [IMG.shitzuSqualo, IMG.shitzuSqualoBay],
  'vapid-dominator-buggy-67': [IMG.dominatorBuggy, IMG.dominatorBuggyInterior],
}[v.slug] || [v.image]).filter(Boolean) }))

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

// ---------------- GANGS & FACTIONS ----------------
// Public-facing entries stay inside Rockstar-published material. A group
// visible only in a trailer, a community identification or a leak is not
// promoted to a named faction record.
export const factions = [
  { slug: 'ptt-youngins', name: 'PTT YOUNGIN$', kind: 'GROUP / COMPOUND', status: 'confirmed', evidenceStatus: 'OFFICIAL — NAMED', region: 'SOUTHSIDE VICE CITY', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', desc: 'Rockstar names the PTT Youngin$ Compound as Ultimate Edition content in Southside Vice City, where players can raid for special items and distinct contraband.', confirmed: ['The PTT Youngin$ name and compound are official.', 'The compound is associated with Southside Vice City.', 'Rockstar describes a raid for special items and contraband.'], unknown: ['Leadership, membership, rivals, territory boundaries and wider criminal structure.'] },
  { slug: 'final-chapter-mc', name: 'FINAL CHAPTER MC', kind: 'OUTLAW MOTORCYCLE CLUB', status: 'confirmed', evidenceStatus: 'OFFICIAL — NAMED', region: 'AMBROSIA', image: '/media/factions/ambrosia-motorcycle-club.jpeg', sourceName: 'GTA Wiki · Final Chapter MC', sourceUrl: 'https://gta.wiki/w/Final_Chapter_MC',
    desc: 'The Ambrosia biker club’s formal name, resolving what this archive previously carried as unpublished — the GTA Wiki traces it directly to the official Rockstar Games website, not a leak. It is Leonida-based, with a patch reading 1982 as a founding date, and is associated with the Avarus and Sovereign 107 motorcycles and the Mustang .357 revolver, all already documented on this archive. The GTA Wiki reads its look as drawn from the real-world Bandidos and Warlocks motorcycle clubs.',
    confirmed: ['Rockstar’s own official website names the club Final Chapter MC.', 'Based in Ambrosia County, alongside the Allied Crystal sugar refinery, already documented on this archive.', 'A 1982 founding date appears on the club’s patches.', 'Tied to the Avarus, Sovereign 107 and Mustang .357, all already on this archive.'],
    unknown: ['Members, internal hierarchy and specific criminal activities beyond “outlaw motorcycle club.”'] },
  { slug: 'san4san', name: 'SAN4SAN', kind: 'STREET GANG', status: 'confirmed', evidenceStatus: 'OFFICIAL — NAMED', region: 'VICE CITY', image: '/media/factions/vice-city-group.jpeg', sourceName: 'GTA Wiki · San4San', sourceUrl: 'https://gta.wiki/w/San4San',
    desc: 'A Vice City gang the GTA Wiki names San4San, resolving what this archive previously carried as an unnamed group depicted in official Rockstar media. It runs a drug lab out of the Venture Apartments in Rockridge — the site of the Méndez raid already documented on this archive — with Raymond and Ernesto, both already imported here, named as members. The GTA Wiki reads it as based on Zoe Pound, a real Miami-based Haitian gang.',
    confirmed: ['Shown in official Rockstar media, including the first and second trailers and “An Extended Look.”', 'Raymond and Ernesto are named members, both tied to the same Rockridge drug-lab scene documented in Méndez’s profile on this archive.', 'The GTA Wiki also reports a connection to the Sound4Sound record label.'],
    unknown: ['Full membership, leadership and territorial boundaries beyond Rockridge.'] },
]

// ---------------- CHARACTERS ----------------
export const characterFilters = [
  { id: 'all', label: 'ALL' },
  { id: 'protagonists', label: 'PROTAGONISTS' },
  { id: 'allies', label: 'ALLIES' },
  { id: 'rivals', label: 'RIVALS' },
  { id: 'factions', label: 'FACTIONS' },
  { id: 'supporting', label: 'SUPPORTING' },
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

  // ---- Índice alargado, importado do levantamento da GTA Wiki (13 entradas).
  // Todos os nomes abaixo já são oficiais — a própria wiki só documenta
  // revelações confirmadas nesta página. As duas sem nome ficam `verified`
  // (mostradas, não nomeadas), nunca `rumour`. Ver SRC_WIKI_CHARACTERS. ----
  {
    slug: 'bae-luxe', name: 'BAE-LUXE', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/bae-luxe.webp',
    bio: 'One half of Real Dimez, and the one who kept the shakedown habit going the longest.',
    long: 'Bae-Luxe forms one half of the Vice City rap duo Real Dimez, alongside Roxy, a friendship that goes back to school. The two started out running shakedowns on local dealers before turning a growing social-media presence into a music career — a path that eventually led to a deal at Only Raw Records, brokered by Dre’Quan Priest.',
  },
  {
    slug: 'roxy', name: 'ROXY', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/roxy.webp',
    bio: 'The other half of Real Dimez, chasing a second hit after one good year with DWNPLY.',
    long: 'Roxy is the other half of the Vice City duo Real Dimez, alongside Bae-Luxe, a friendship dating back to school. A collaboration with the local rapper DWNPLY gave the duo their biggest moment yet, and unspecified trouble since has pushed them toward a deal with Only Raw Records, again brokered by Dre’Quan Priest.',
  },
  {
    slug: 'lori-heder', name: 'LORI HEDER', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/lori-heder.webp',
    bio: 'Brian Heder’s third and current wife — official material names little else about her yet.',
    long: 'Lori Heder is the third and current wife of Leonida Keys drug smuggler Brian Heder. Rockstar’s material stops there for now; what little context exists about her comes filtered through Brian’s own record.',
  },
  {
    slug: 'wyman', name: 'WYMAN', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/wyman.webp',
    bio: 'A mechanic and collector at Wyman’s World Auto Salvage Co. — the same Wyman behind the Ultimate Edition’s Classic Car Collection.',
    long: 'Wyman runs Wyman’s World Auto Salvage Co. in Leonida, and appears to double as a mission-giver: reported material describes him assigning tasks to acquire specific vehicles (among them the Mamba GT, Riata Classic and Transgressor), and Rockstar’s own Ultimate Edition material separately names him as the collector behind the Classic Car Collection side job, tracking down abandoned classics and unfinished project cars. He first surfaced in leaked September 2022 debug footage — a freeroam scene at the Starlet Motel pool where he rants to Jason Duval about conspiracy theories — and later appeared to be confirmed as the same character in an official Ambrosia screenshot, shown driving a Dominator GT through a car wash with a matching model, tattoos and a wristwatch added.',
  },
  {
    slug: 'andres-de-leon', name: 'ANDRÉS DE LEÓN', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/andres-de-leon.webp',
    bio: 'A Megamundo acquaintance whose corporate party goes wrong — and who Jason ends up saving.',
    long: 'Andrés de León is an acquaintance of Valentina and of Megamundo’s staff. He is hired for the celebration marking the opening of Megamundo’s first United States headquarters, escorted from Vice City International Airport to the Megamundo Building by hired security in the form of Jason Duval and Lucia Caminos. When the party is raided by an unidentified armed crew, Andrés is taken hostage — until Jason gets him out.',
  },
  {
    slug: 'stefanie', name: 'STEFANIE', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/stefanie.webp',
    bio: 'Lucia’s correctional social worker — the state’s presence in her early scenes.',
    long: 'Stefanie appears to work for the Leonida Department of Corrections as a social worker. In the first trailer she is seen in her office meeting with Lucia Caminos, incarcerated at the time at Leonida Penitentiary in Vice-Dale County.',
  },
  {
    slug: 'rudi', name: 'RUDI', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/rudi.webp',
    bio: 'A self-described “Leonida Man” who may not have survived his own trailer cameo.',
    long: 'Rudi calls himself a “Leonida Man” — the wiki reads this as GTA VI’s in-fiction parody of the real “Florida Man” meme, viral news stories about local chaos, complete with an in-universe account that reposts them and Weazel News segments built around it. Stickers on the back of his green Bison 900 place Rudi in Vice City’s Crosstown neighbourhood. The first trailer shows him only secondhand, in an in-universe social-media clip of him driving that Bison 900 at high speed while climbing out of the driver’s seat — posted by a user called YoMammazJammer with the caption “RIP Rudi – C U in heaven, cuz.”, which is the only hint at what happens to him.',
  },
  {
    slug: 'petra-navarro', name: 'PETRA NAVARRO', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/petra-navarro.webp',
    bio: 'Megamundo’s COO — the clearest hint yet of a corporate hand in Leonida.',
    long: 'Petra Navarro is the Chief Operating Officer at Megamundo. She meets Jason Duval and Lucia Caminos through Valentina at the opening of Megamundo’s Building, at the point the duo is hired as private security for Andrés de León — the same event that is later raided by an armed crew.',
  },
  {
    slug: 'phil', name: 'PHIL', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/phil.webp',
    bio: 'Owner of Phil’s Ammu-Nation — loud, eccentric, and a callback to a much older GTA face.',
    long: 'Phil sells weapons and owns Phil’s Ammu-Nation in Leonida, played as loud and eccentric in how he markets firearms. The wiki reads him as a revival of Phil Cassidy, the 3D Universe gun dealer, specifically the 1980s version of that character from before he lost an arm.',
  },
  {
    slug: 'dwnply', name: 'DWNPLY', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: null,
    bio: 'A local rapper whose one hit with Real Dimez still echoes five years later — and whose name is itself a joke.',
    long: 'DWNPLY is credited with the collaboration that first made Real Dimez’s name, five years before the story’s events. The wiki reads their own name as a play on Gunplay, the real Miami rapper and Triple C’s member — one of several places this archive is documenting real-world references baked into GTA VI’s fictional music scene.',
  },
  {
    slug: 'mendez', name: 'MÉNDEZ', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/mendez.webp',
    bio: 'A Vice City Police Department officer whose idea of a raid leaves no one standing.',
    long: 'First shown in the second trailer, Méndez’s police badge ties him to the Vice City Police Department, leading a team through raids and search warrants. In “An Extended Look” he leads a raid on a drug pickup at Venture Apartments in Rockridge — the same deal Jason and Lucia arrive at on Boobie Ike’s behalf, meeting Raymond of the San4San gang. A tip-off from Ernesto about “the task force” arrives moments before Méndez’s team does; the raid that follows is shown as merciless, with Méndez shooting one dealer even after being told the man’s gun wasn’t loaded.',
  },
  {
    slug: 'leonida-impertinent', name: 'LEONIDA IMPERTINENT', role: 'SUPPORTING', group: 'supporting',
    status: 'verified', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/leonida-impertinent.webp',
    bio: 'A heavily tattooed criminal whose own forehead tattoo — misspelled — gave police the case.',
    long: '“Leonida impertinent” is the GTA Wiki’s own reference label, not a Rockstar name: he is a heavily tattooed criminal with the word “impertinent” tattooed on his forehead, misspelled as “impentinent”. He is arrested in the mid-2020s by the Vice-Dale Police Department, and a Mega Noticias report treats one of his own tattoos as self-incriminating evidence. Rockstar’s design is read by the wiki as drawing on a real 2017 viral case — a Florida man whose face-tattooed mugshot earned him the nickname “Florida Joker” (also “Miami Joker”). That real person publicly demanded $2 million from Rockstar Games after the first trailer, later raising the figure to $3 million in a follow-up TikTok video dressed to match the character, framing it as marketing the game had gotten for free. This is reported here as a public claim covered by the wiki, not as a settled or admitted fact.',
  },
  {
    slug: 'hamlet-woman', name: 'HAMLET WOMAN', role: 'SUPPORTING', group: 'supporting',
    status: 'verified', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', image: '/media/characters/wiki/hamlet-woman.webp',
    bio: 'A dual-hammer-wielding neighbour, modelled on a real viral confrontation.',
    long: '“Hamlet woman” is again the wiki’s own reference label, not a Rockstar name: she lives in an apartment complex in Hamlet, Vice-Dale County, played as a stereotypical confrontational neighbour. The first trailer shows her filmed by a neighbour’s livestream, dual-wielding two hammers in front of a parked Sirius while declaring “Well, look who’s back!”; in “An Extended Look”, Jason and Lucia find her hammering their own Tulip parked outside her building. The wiki traces the design to a real, widely circulated video of a Los Angeles resident known online as the “Dual Hammer Karen”.',
  },

  // ---- Segunda ronda: a categoria "Characters in GTA VI" da wiki lista 48
  // nomes, o dobro dos já aqui. Destes, só cinco têm papel real na história
  // — e ligam-se directamente ao elenco já importado — em vez de uma menção
  // de uma frase; os restantes ficam de fora para não diluir a barra de
  // qualidade que as entradas acima já estabeleceram. ----
  {
    slug: 'aunt-tee', name: 'AUNT TEE', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', image: '/media/characters/wiki/aunt-tee.webp',
    bio: 'Her flat becomes the fire escape the day Méndez’s raid goes wrong.',
    long: 'Aunt Tee lives at the Venture Apartments in Rockridge, the same building where Méndez’s raid — already documented on this archive — corners Jason, Lucia, Raymond and Ernesto mid-deal. In “An Extended Look”, the group’s way out runs straight through her apartment, reportedly starting with Lucia kicking her own air-conditioning unit out of the window to clear a path.',
  },
  {
    slug: 'camilo', name: 'CAMILO', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', image: '/media/characters/wiki/camilo.webp',
    bio: 'Gets carjacked mid-livestream, and turns the chase that follows into more content.',
    long: 'Camilo is a Vice City livestreamer who happens to be filming from the trunk of a friend’s Buffalo, as part of an internet stunt, at the exact moment Lucia carjacks it in “An Extended Look”. Rather than stop filming, he keeps the stream running through the police chase down Shore Drive that follows. The GTA Wiki reads his look and manner as a parody of the real-world streamer N3on.',
  },
  {
    slug: 'ernesto', name: 'ERNESTO', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', image: null,
    bio: 'Runs the Venture Apartments lab with Raymond — and takes the call that gives the raid away seconds too late.',
    long: 'Ernesto works the Rockridge drug lab with Raymond, on the deal Jason and Lucia handle on Boobie Ike’s behalf in “An Extended Look”. He takes a call warning that “the task force” is on its way moments before Méndez’s raid actually hits — already documented on this archive — which is what turns the pickup into the scramble through Aunt Tee’s apartment.',
  },
  {
    slug: 'raymond', name: 'RAYMOND', role: 'FACTION', group: 'factions',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', image: '/media/characters/wiki/raymond.webp',
    bio: 'Runs the Venture Apartments lab with Ernesto, and is the man Jason and Lucia are actually there to meet.',
    long: 'Raymond is the Rockridge contact for the drug pickup Jason and Lucia handle on Boobie Ike’s behalf in “An Extended Look”, running the lab there with Ernesto. When Méndez’s raid — already documented on this archive — hits moments later, Raymond escapes alongside Jason and Lucia through Aunt Tee’s apartment.',
  },
  {
    slug: 'valentina', name: 'VALENTINA', role: 'SUPPORTING', group: 'supporting',
    status: 'confirmed', sourceName: SRC_WIKI_CHARACTERS[0], sourceUrl: SRC_WIKI_CHARACTERS[1],
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', image: '/media/characters/wiki/valentina.webp',
    bio: 'Hires Jason and Lucia as security, then spends the party managing the man they’re guarding.',
    long: 'Valentina works alongside Petra Navarro and Andrés de León at Megamundo — both already documented on this archive — and is the one who brings Jason and Lucia on as private security for de León at the opening of Megamundo’s first US headquarters, reportedly telling them to protect him while keeping him in line. She escorts the group from Vice City International Airport to the Megamundo Building, the same event later hit by an armed crew.',
  },
  {
    slug: 'crotch-grab-guy', name: 'CROTCH GRAB GUY', role: 'MEDIA FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: IMG.viceCity,
    imageCaption: 'Official Vice City artwork · contextual image, not an identified portrait',
    bio: 'An unnamed social-video subject identified by a descriptive archive label.',
    long: 'This is a descriptive community label rather than a Rockstar-published name. The figure is retained because he is visible in released GTA VI media; no story role, occupation or relationship to the main cast has been announced.',
  },
  {
    slug: 'dad-bod-guy', name: 'DAD BOD GUY', role: 'MEDIA FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/locations/wiki/ocean-beach.webp',
    imageCaption: 'Published Ocean Beach visual · contextual image, not an identified portrait',
    bio: 'An unnamed beachgoer catalogued from Rockstar-published footage.',
    long: 'The label is descriptive and unofficial. The archive records only the person’s appearance in released media and does not infer a mission, narrative role or final-game importance.',
  },
  {
    slug: 'gold-chain-guy', name: 'GOLD CHAIN GUY', role: 'MEDIA FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: IMG.keysStreet,
    imageCaption: 'Official Leonida street scene · contextual image, not an identified portrait',
    bio: 'An unnamed Leonida figure tracked under a visual-description label.',
    long: 'This catalogue name originates from visual identification, not Rockstar dialogue or credits. His presence is verified; identity, occupation and relevance are not.',
  },
  {
    slug: 'high-rollerz-mag-guy', name: 'HIGH ROLLERZ MAG GUY', role: 'MEDIA FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: IMG.viceCity,
    imageCaption: 'Official Vice City artwork · contextual image, not an identified portrait',
    bio: 'An unnamed figure associated with High Rollerz imagery in released media.',
    long: 'The archive uses a community description to make the visible figure searchable. It is not an official character name, and no narrative role has been established.',
  },
  {
    slug: 'nightclub-dj', name: 'NIGHTCLUB DJ', role: 'PERFORMER', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/characters/real-dimez.webp',
    imageCaption: 'Official Vice City music-scene image · contextual image, not an identified portrait',
    bio: 'An unnamed DJ visible in Vice City nightlife material.',
    long: 'A performer is visible behind the decks in Rockstar-published nightlife footage. The archive keeps the functional label while leaving name, venue residency and story involvement unpublished.',
  },
  {
    slug: 'selfie-guy', name: 'SELFIE GUY', role: 'MEDIA FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/characters/real-dimez-phone.webp',
    imageCaption: 'Official in-world social-media image · contextual image, not an identified portrait',
    bio: 'An unnamed social-video figure visible in released GTA VI footage.',
    long: 'The community shorthand describes the shot in which he appears; it is not an official name. The record makes the media appearance searchable without inventing a biography.',
  },
  {
    slug: 'thrillbilly-mud-girl', name: 'THRILLBILLY MUD GIRL', role: 'OFF-ROAD FIGURE', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/locations/wiki/thrillbilly-mud-club.webp',
    imageCaption: 'Published Thrillbilly Mud Club visual · contextual image, not an identified portrait',
    bio: 'An unnamed participant in Leonida’s mud-riding and off-road culture.',
    long: 'The descriptive label connects a visible person to the Thrillbilly Mud Club setting. Rockstar has shown the figure and culture, but has not published her name or narrative role.',
  },
  {
    slug: 'erin-henshaw', name: 'ERIN HENSHAW', role: 'REPORTED FIGURE', group: 'supporting',
    status: 'rumour', sourceName: 'GTA LORE · GTA Intel cross-check', sourceUrl: null,
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: IMG.viceCity,
    imageCaption: 'Official Vice City artwork · contextual image for an unconfirmed identity',
    bio: 'A reported mayoral candidate whose presence has not been confirmed by Rockstar.',
    long: 'Secondary GTA VI catalogues associate Erin Henshaw with a mayoral campaign. The name and role remain in the rumour layer because Rockstar has not published a character profile or final-game confirmation.',
  },
  {
    slug: 'kenny-brewster', name: 'KENNY BREWSTER', role: 'REPORTED MUSICIAN', group: 'supporting',
    status: 'rumour', sourceName: 'GTA LORE · GTA Intel cross-check', sourceUrl: null,
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/characters/real-dimez.webp',
    imageCaption: 'Official Vice City music-scene image · contextual image for an unconfirmed identity',
    bio: 'A musician name carried by secondary catalogues, not confirmed by Rockstar.',
    long: 'Kenny Brewster is indexed for completeness because the name recurs in community character catalogues. No official profile, performance credit or story role has been published.',
  },
  {
    slug: 'shanese', name: 'SHANESE', role: 'REPORTED FIGURE', group: 'supporting',
    status: 'rumour', sourceName: 'GTA LORE · GTA Base cross-check', sourceUrl: null,
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: IMG.keysStreet,
    imageCaption: 'Official Leonida street scene · contextual image for an unconfirmed identity',
    bio: 'A reported identity attached to a visible figure, still unconfirmed.',
    long: 'The name Shanese appears in secondary GTA VI catalogues, but Rockstar has not publicly connected it to a character profile. The archive therefore separates the reported name from the verified visual record.',
  },
  {
    slug: 'jack-howitzer', name: 'JACK HOWITZER', role: 'REPORTED MEDIA FIGURE', group: 'supporting',
    status: 'rumour', sourceName: 'GTA LORE · GTA Intel cross-check', sourceUrl: null,
    publishedAt: '2026-09-08', updatedAt: '2026-09-08', image: null, contextImage: '/media/characters/real-dimez-phone.webp',
    imageCaption: 'Official in-world media image · contextual image for an unconfirmed returning character',
    bio: 'A reported returning media personality, not yet confirmed for GTA VI.',
    long: 'Some secondary catalogues include the long-running Grand Theft Auto media personality Jack Howitzer. Until Rockstar publishes a GTA VI appearance, the entry remains a cross-reference in the rumour layer rather than a confirmed returning character.',
  },
  {
    slug: 'corrections-officer', name: 'CORRECTIONS OFFICER', role: 'UNNAMED OFFICER', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09', image: null, contextImage: '/media/locations/wiki/leonida-penitentiary.webp',
    imageCaption: 'Official Leonida Penitentiary image · contextual location, not an identified portrait',
    bio: 'An unnamed corrections officer visible in Lucia’s custodial sequence.',
    long: 'The role is visually documented in Rockstar-published material, but the officer has no published character name, biography or confirmed importance beyond the prison sequence.',
  },
  {
    slug: 'vcpd-officer', name: 'VCPD OFFICER', role: 'UNNAMED POLICE OFFICER', group: 'supporting',
    status: 'verified', sourceName: 'Rockstar Games · GTA VI media', sourceUrl: 'https://www.rockstargames.com/VI/media',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09', image: null, contextImage: IMG.viceCity,
    imageCaption: 'Official Vice City image · contextual location, not an identified portrait',
    bio: 'An unnamed Vice City Police Department officer visible in released footage.',
    long: 'The archive treats the uniformed role as verified but does not invent a personal identity, rank, mission involvement or relationship to the protagonists.',
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
    image: IMG.keyArt, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CONTEXT IMAGE', imageAlt: 'Jason and Lucia together in official GTA VI artwork', imageCaption: 'Official artwork showing both playable protagonists; used as context for character switching.',
    desc: 'Switch protagonists without abandoning the current world state.',
    long: 'The Extended Look shows a seamless hand-off between Lucia and Jason mid-mission. World state — traffic, wanted level, weather — persists across the switch.' },
  { slug: 'dynamic-relationship', name: 'DYNAMIC RELATIONSHIP', glyph: '△', icon: 'relation',
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: null,
    publishedAt: '2026-08-18', updatedAt: '2026-08-25',
    image: IMG.keyArtMotel, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CONTEXT IMAGE', imageAlt: 'Jason and Lucia in official GTA VI motel artwork', imageCaption: 'Official relationship artwork; used as context rather than interface proof.',
    desc: 'Relationships evolve based on choices, actions and consequences.',
    long: 'Dialogue variations across captures suggest trust and tension meters that respond to player behaviour.' },
  { slug: 'disguises', name: 'DISGUISES', glyph: '□', icon: 'disguise',
    status: 'verified', sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-16', updatedAt: '2026-08-24',
    image: IMG.keyArtRobbery, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'PUBLISHED ART', imageAlt: 'Jason and Lucia masked during a robbery in official GTA VI artwork', imageCaption: 'Official robbery artwork showing both protagonists wearing face coverings.',
    desc: 'Use disguises to access restricted areas and mislead enemies.',
    long: 'Uniform pickups appear as interactable props in two scenes, including the marina security office.' },
  { slug: 'personal-inventory', name: 'PERSONAL INVENTORY', glyph: 'L2', icon: 'inventory',
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: null,
    publishedAt: '2026-08-14', updatedAt: '2026-08-26',
    image: IMG.weaponPattern, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'GEAR CONTEXT', imageAlt: 'Official GTA VI weapons pattern artwork', imageCaption: 'Official Rockstar gear artwork; the inventory interface is not shown in this image.',
    desc: 'Each character carries their own items and distinct limitations.',
    long: 'HUD comparison across protagonists shows non-shared item grids and different carry weights.' },
  { slug: 'six-star-wanted', name: 'SIX-STAR WANTED', glyph: 'R2', icon: 'wanted',
    status: 'confirmed', sourceName: 'Rockstar Newswire', sourceUrl: 'https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026',
    publishedAt: '2026-08-25', updatedAt: '2026-08-25',
    image: IMG.swampChase, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'PURSUIT CONTEXT', imageAlt: 'Police pursuit through the Grassrivers in official GTA VI media', imageCaption: 'Official Rockstar pursuit image; the wanted interface is not visible in this still.',
    desc: 'The six-star escalation scale returns with marine and air response.',
    long: 'Officially confirmed. Escalation includes dedicated Keys marine units and Vice City air support.' },
  { slug: 'dynamic-events', name: 'DYNAMIC EVENTS', glyph: 'L1', icon: 'events',
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: null,
    publishedAt: '2026-08-10', updatedAt: '2026-08-22',
    image: IMG.ambrosiaNight, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'WORLD CONTEXT', imageAlt: 'Ambrosia at night in official GTA VI media', imageCaption: 'Official Rockstar world image used as context for ambient events.',
    desc: 'Ambient crimes, chases and weather events trigger without scripting.',
    long: 'Three background sequences appear unscripted across separate captures of the same district.' },
  { slug: 'vehicle-cargo', name: 'VEHICLE CARGO', glyph: '○', icon: 'cargo',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-07-30', updatedAt: '2026-09-09',
    image: IMG.safehouseVehicles, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'VEHICLE CONTEXT', imageAlt: 'Official GTA VI safehouse vehicle collection', imageCaption: 'Official Rockstar vehicle image; the cargo interface itself appears in the Extended Look.',
    desc: 'Vehicle loadout and storage readouts indicate capacity beyond passenger seats.',
    long: 'The Extended Look displays vehicle information with distinct loadout and storage capacity. The footage supports a cargo system, but Rockstar has not yet explained transfer rules, compatible items or whether every vehicle can use it.' },
  // ---- Systems described only by community summaries supplied in September
  // 2026. Filed as rumour, like the safehouse economy below, until released
  // material shows them. ----
  { slug: 'vehicle-theft', name: 'VEHICLE THEFT', glyph: '✕', icon: 'wanted',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.grottiCheetah, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'VEHICLE CONTEXT', imageAlt: 'Official GTA VI artwork of the ’95 Grotti Cheetah', imageCaption: 'Official Rockstar vehicle artwork; the theft methods described on this page are not shown in it.',
    desc: 'Getting into a car depends on how old it is and how it is secured.',
    long: 'Unverified. A community summary describes older cars opened by breaking a window or picking the lock, and modern or luxury models needing electronic tools or key-cloning devices. High-end vehicles may take extra work before they can be kept or sold.' },
  { slug: 'vehicle-damage', name: 'VEHICLE DAMAGE', glyph: '✕', icon: 'cargo',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.ambrosiaDrive, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'DRIVING CONTEXT', imageAlt: 'Official GTA VI screenshot of a drive through Ambrosia', imageCaption: 'Official Rockstar imagery used as driving context; it does not document the damage model.',
    desc: 'Deformation that scales with the force of the crash.',
    long: 'Unverified. The summary describes more detailed deformation, panels reacting to impacts independently and high-speed crashes far more severe than minor knocks. It adds working doors, trunk and hood, detailed dashboards and mirrors that reflect the world in real time.' },
  { slug: 'fuel-and-charging', name: 'FUEL AND CHARGING', glyph: '✕', icon: 'cargo',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.ambrosiaNight, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'ROADSIDE CONTEXT', imageAlt: 'Official GTA VI screenshot of Ambrosia at night', imageCaption: 'Official Rockstar imagery used as roadside context; no refuelling system is shown in it.',
    desc: 'Gas stations and chargers, with ranges long enough not to nag.',
    long: 'Unverified. Conventional vehicles are said to refuel at gas stations and electric ones to use charging stations, with ranges long enough that refuelling is never a constant chore.' },
  { slug: 'cash-and-banking', name: 'CASH AND BANKING', glyph: '✕', icon: 'safehouse',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.docksCrew, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CRIME CONTEXT', imageAlt: 'Official GTA VI screenshot of a crew at the docks', imageCaption: 'Official Rockstar imagery used as context; it does not show how money is held.',
    desc: 'Money in the pocket is kept apart from money in the bank.',
    long: 'Unverified. The summary describes carried cash and banked funds as separate pools: some activities involve physical cash, while banked money stays protected.' },
  { slug: 'weapon-customization', name: 'WEAPON CUSTOMIZATION', glyph: '✕', icon: 'inventory',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.morganRevolvers, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'WEAPON CONTEXT', imageAlt: 'Official GTA VI artwork of the Hawk & Little Morgan revolvers', imageCaption: 'Official Rockstar edition artwork; the attachment system described here is not shown in it.',
    desc: 'Gun stores return, with attachments that change looks and handling.',
    long: 'Unverified. Gun stores are said to sell and modify weapons with components and attachments that affect both appearance and performance, while active weapons are shuffled between the character and vehicle storage.' },
  { slug: 'combat-options', name: 'COMBAT OPTIONS', glyph: '✕', icon: 'wanted',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.docksCrew, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CRIME CONTEXT', imageAlt: 'Official GTA VI screenshot of a crew at the docks', imageCaption: 'Official Rockstar imagery used as context; the combat actions listed here are not shown in it.',
    desc: 'Disarms, warning shots, restraints and human shields.',
    long: 'Unverified. The summary describes crouching and environmental cover, heavier weapon handling, and reactions that change with the weapon or ammunition. Reported actions include disarming enemies, shooting a gun out of a hand, warning shots, suppressing fire, intimidation, carrying and looting bodies, restraining people and taking hostages as human shields.' },
  { slug: 'robberies', name: 'ROBBERIES', glyph: '✕', icon: 'wanted',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.keyArt, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CONTEXT IMAGE', imageAlt: 'Jason and Lucia together in official GTA VI artwork', imageCaption: 'Official artwork of both protagonists; used as context for the reported robbery system.',
    desc: 'Stores, businesses, vehicles and bigger jobs, each with its own preparation.',
    long: 'Unverified. The summary describes robberies of stores, businesses, vehicles and larger targets, with tools to break locks, bypass security, carry goods, restrain people and open containers. Some jobs are said to give Jason and Lucia different roles.' },
  { slug: 'looting', name: 'LOOTING', glyph: '✕', icon: 'inventory',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.viceCity, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'REGIONAL CONTEXT', imageAlt: 'Official Rockstar postcard of Vice City', imageCaption: 'Official Rockstar regional artwork; used as context only.',
    desc: 'Bodies, vehicles, containers and buildings can be searched.',
    long: 'Unverified. The summary describes searching bodies, vehicles, containers, buildings and criminal sites, with shipping containers holding money, weapons or even vehicles.' },
  { slug: 'wildlife-checklist', name: 'WILDLIFE CHECKLIST', glyph: '✕', icon: 'events',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.swampGator, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'WILDLIFE CONTEXT', imageAlt: 'Official GTA VI screenshot of an alligator in the swamp', imageCaption: 'Official Rockstar wildlife imagery; the checklist itself is not shown in it.',
    desc: 'Species can be studied and logged as they are found.',
    long: 'Unverified. The summary describes studying animals and adding each discovered species to a checklist, in the spirit of Red Dead Redemption 2’s compendium. It also expects an explorable zoo; the archive holds no zoo record.' },
  { slug: 'photo-mode', name: 'PHOTO MODE', glyph: '✕', icon: 'events',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.viceCity, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'REGIONAL CONTEXT', imageAlt: 'Official Rockstar postcard of Vice City', imageCaption: 'Official Rockstar regional artwork; used as context only.',
    desc: 'A dedicated mode for photographing Leonida.',
    long: 'Unverified. The summary describes a dedicated photo mode for capturing characters, vehicles, scenery, wildlife and events. It is distinct from the in-world social feed recorded under Snapmatic.' },
  { slug: 'accessibility-options', name: 'ACCESSIBILITY OPTIONS', glyph: '✕', icon: 'relation',
    status: 'rumour', sourceName: 'Community summary', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10',
    image: IMG.keyArt, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CONTEXT IMAGE', imageAlt: 'Jason and Lucia together in official GTA VI artwork', imageCaption: 'Official artwork of both protagonists; used as context only.',
    desc: 'Expanded settings for visual, hearing and motor needs.',
    long: 'Unverified. The summary describes expanded accessibility options for visual, hearing, motor and gameplay requirements. No specific settings have been published.' },
  { slug: 'safehouse-economy', name: 'SAFEHOUSE ECONOMY', glyph: '✕', icon: 'safehouse',
    status: 'rumour', sourceName: 'Community report', sourceUrl: null,
    publishedAt: '2026-07-22', updatedAt: '2026-07-22',
    image: IMG.ultimatePalms, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'PROPERTY CONTEXT', imageAlt: 'Official GTA VI Ultimate Edition property artwork', imageCaption: 'Official Rockstar property artwork; upkeep systems remain unverified.',
    desc: 'Property upkeep and stash management between missions.',
    long: 'Unverified. Catalogued for completeness.' },
  { slug: 'criminal-profile', name: 'CRIMINAL PROFILE', glyph: '△', icon: 'relation',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: IMG.stanierCrew, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CRIMINAL CONTEXT', imageAlt: 'A crew beside a vehicle in official GTA VI media', imageCaption: 'Official Rockstar criminal-world image; no profile interface is shown here.',
    desc: 'A reputation record that follows what you actually did.',
    long: 'Leonida keeps a file on you. Rather than a score that resets between jobs, the profile accumulates — which turns a series of individual crimes into a record that the world can respond to.' },
  { slug: 'snapmatic', name: 'SNAPMATIC', glyph: '□', icon: 'switch',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: '/media/characters/real-dimez-phone.webp', imageSeries: 'TRAILER 1', frameTime: 'SOCIAL FEED', imagePosition: 'center 28%', imageAlt: 'Real Dimez appearing in a vertical in-world social media post', imageCaption: 'The in-world short-video feed shown in official GTA VI footage.',
    desc: 'The in-world social network, and its feed.',
    long: 'A parody of the short-video platforms, built into the phone. Its function in a Rockstar game is satire with a camera attached: the feed is how Leonida talks about itself, and how the player joins in.' },
  { slug: 'physical-conditioning', name: 'PHYSICAL CONDITIONING', glyph: '○', icon: 'safehouse',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: IMG.keysStreet, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'WORLD CONTEXT', imageAlt: 'A street scene in the Leonida Keys from official GTA VI media', imageCaption: 'Official Rockstar world image; physical conditioning is not visible in this still.',
    desc: 'Weight and appearance shift over the course of the story.',
    long: 'Both protagonists change physically with how they are played. It is a slow mechanic by design — the kind that is only legible across a long game, and that makes a save file look like a history rather than a state.' },
  { slug: 'free-roam-pursuits', name: 'FREE ROAM PURSUITS', glyph: '✕', icon: 'dynamic',
    status: 'confirmed', sourceName: 'Official feature list', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    image: IMG.swampAirboat, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'FREE-ROAM CONTEXT', imageAlt: 'Airboat exploration in official GTA VI media', imageCaption: 'Official Rockstar image showing a free-roam pursuit in Leonida.',
    desc: 'Skydiving, wrestling, basketball and scuba diving, outside the story.',
    long: 'The confirmed activity list reaches from the air to the seabed, which is less a list of minigames than a statement about the map: Leonida is built to be worth crossing when nobody is asking you to.' },
  { slug: 'focus-ability', name: 'FOCUS ABILITY', glyph: '◎', icon: 'wanted',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.keyArtRobbery, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'COMBAT CONTEXT', imageAlt: 'Jason and Lucia during a robbery in official GTA VI artwork', imageCaption: 'Official robbery artwork used as context; the purple Focus interface appears in the Extended Look.',
    desc: 'A rechargeable Focus state changes combat tempo and highlights useful targets.',
    long: 'Published footage shows a purple Focus meter and a slowed, high-contrast targeting state that calls attention to enemies and useful details. Its recharge rules, upgrades and protagonist-specific differences remain unpublished.' },
  { slug: 'contextual-interactions', name: 'CONTEXTUAL INTERACTIONS', glyph: '◇', icon: 'relation',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.keysBar, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'SOCIAL CONTEXT', imageAlt: 'People socialising inside a Leonida Keys bar in official GTA VI media', imageCaption: 'Official social scene used as context for the interaction prompts shown in the Extended Look.',
    desc: 'Context-sensitive prompts let the player greet, threaten, defuse or rob people.',
    long: 'The Extended Look presents short interaction choices that change with the person and situation. The visible vocabulary supports a broader social-response system, but not a universal dialogue tree for every non-player character.' },
  { slug: 'outfit-quick-select', name: 'OUTFIT QUICK SELECT', glyph: '◫', icon: 'disguise',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.luciaCaminos, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CHARACTER CONTEXT', imageAlt: 'Lucia Caminos in official GTA VI character artwork', imageCaption: 'Official Lucia artwork used as context; the outfit selector is documented in published gameplay footage.',
    desc: 'A radial selector provides quick access to saved clothing combinations.',
    long: 'Published gameplay includes an outfit wheel separate from the weapon interface. The footage verifies quick selection, while wardrobe capacity, saving rules and any gameplay effects remain unknown.' },
  { slug: 'passenger-mode', name: 'PASSENGER MODE', glyph: '↗', icon: 'switch',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.keyArt, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'TRAVEL CONTEXT', imageAlt: 'Jason and Lucia beside their car in official GTA VI artwork', imageCaption: 'Official duo-and-vehicle artwork used as context for companion-driven travel.',
    desc: 'The player can remain active as a passenger while a companion drives.',
    long: 'The Extended Look shows travel from the passenger seat with access to character actions and the phone. Route control, driver commands and availability outside paired story sequences have not been fully explained.' },
  { slug: 'reactive-weapon-presence', name: 'REACTIVE WEAPON PRESENCE', glyph: '!', icon: 'events',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.weaponPattern, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'WEAPON CONTEXT', imageAlt: 'Official GTA VI weapon-pattern artwork', imageCaption: 'Official weapon artwork used as context; civilian reactions are visible in published gameplay footage.',
    desc: 'People react to a visibly carried long gun before the player fires it.',
    long: 'Published footage shows nearby people noticing and responding to an exposed assault rifle. This supports threat awareness based on visible equipment, although range, escalation and law-enforcement consequences remain unpublished.' },
  { slug: 'reputation-indicator', name: 'REPUTATION INDICATOR', glyph: '±', icon: 'relation',
    status: 'analysis', sourceName: 'GTA LORE · Extended Look analysis', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.ambrosiaCouple, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'SOCIAL CONTEXT', imageAlt: 'A couple in Ambrosia in official GTA VI media', imageCaption: 'Official social-world image used as context; Rockstar has not named the observed icon.',
    desc: 'A recurring angel-like HUD icon appears to register positive and negative changes.',
    long: 'Community analysis often calls this a karma or reputation system. The icon and directional changes can be observed in published footage, but Rockstar has not named the mechanic or described what it changes, so this entry remains analysis.' },
  { slug: 'vehicle-fencing', name: 'VEHICLE FENCING', glyph: '$', icon: 'cargo',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: IMG.rideoutCustoms, imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'CUSTOMS CONTEXT', imageAlt: 'Rideout Customs in official GTA VI Ultimate Edition media', imageCaption: 'Official customization artwork; Rockstar separately confirms a secure place for stolen goods to be fenced at Paradise Garage.',
    desc: 'Paradise Garage includes a secure hand-off point for stolen goods intended for fencing.',
    long: 'Rockstar explicitly describes this facility as part of Paradise Garage in Watson Bay. The wider economy, eligible vehicles or goods, prices and whether equivalent fences exist elsewhere remain unpublished.' },
  { slug: 'public-transit', name: 'PUBLIC TRANSIT', glyph: '▰', icon: 'dynamic',
    status: 'verified', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look',
    publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    image: '/media/vehicles/wiki/hitachi-rail-inspired-train.webp', imageSeries: 'ROCKSTAR OFFICIAL MEDIA', frameTime: 'TRANSIT CONTEXT', imageAlt: 'A passenger train visible in official GTA VI footage', imageCaption: 'Passenger rail appears in official material; the complete network and usable routes remain unpublished.',
    desc: 'Passenger rail and street-level transit appear as part of Leonida’s transport network.',
    long: 'Published material shows rail vehicles and a usable transit context. It does not establish a complete route map, timetable, fare system or guarantee that every depicted line can be ridden.' },
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
    county: 'Official boundary not published', knownPlaces: ['Ocean Beach', 'Little Cuba', 'Tisha-Wocka Flea Market', 'VC Port', 'Washington Beach', 'Southside Vice City', 'Stockyard'],
    blurb: 'The money and the noise. Art deco frontage on Ocean Beach, bakeries in Little Cuba, near-genuine labels at the Tisha-Wocka market, and a port that sells itself as the cruise capital of the world.', officialType: 'MAJOR URBAN CITY', environment: 'Metropolitan / coastal', theme: 'EVERYTHING IN EXCESS', activities: ['Tourism', 'Nightlife', 'Music and entertainment'], notPublished: ['Exact boundaries, streets, coordinates and complete district map.'] },
  { id: 'leonida-keys', label: 'LEONIDA KEYS', cx: 740, cy: 540, k: 1.8,
    image: IMG.leonidaKeys, sourced: true, gallery: [IMG.leonidaKeys, IMG.keysStreet, IMG.keysBar],
    county: 'Official boundary not published', knownPlaces: ['Leonida Keys', 'Gambit Bay', 'Lake Leonida'],
    blurb: 'An archipelago that runs on deck chairs and open bars. Nothing here is flashy and nothing is in a hurry — which is easy to mistake for safe, given what the surrounding water is used for.', officialType: 'TROPICAL ARCHIPELAGO', environment: 'Tropical / coastal / islands', theme: 'GATEWAY TO PARADISE', activities: ['Boats and marinas', 'Drug running', 'Coastal criminal activity'], notPublished: ['Complete island map, boundaries and universal activity list.'] },
  { id: 'port-gellhorn', label: 'PORT GELLHORN', cx: 230, cy: 140, k: 1.8,
    image: IMG.portGellhorn, sourced: true, gallery: [IMG.portGellhorn, IMG.swampAirboat, IMG.swampChase],
    county: 'Official boundary not published', knownPlaces: ['Port Gellhorn'],
    blurb: 'The coast Leonida stopped advertising. The motels are cheap, the attractions are shuttered and the strip malls are empty — but something replaced the tourist trade, and it runs on malt liquor, painkillers and truck-stop caffeine. Dirt bikes, and keep a hand on your wallet.', officialType: 'COASTAL SETTLEMENT', environment: 'Declining tourist coast', theme: 'LIVE HARD', activities: ['Dirt bikes', 'Roadside commerce'], notPublished: ['Exact borders and the full replacement economy.'] },
  { id: 'grassrivers', label: 'GRASSRIVERS', cx: 240, cy: 420, k: 1.6,
    image: IMG.grassrivers, sourced: true, gallery: [IMG.grassrivers, IMG.swampStilts, IMG.swampGator, IMG.swampSkyline],
    county: 'Official boundary not published', knownPlaces: ['Grassrivers'],
    blurb: 'Wetland that predates everything around it and refuses to be managed. The alligators are the draw, but they are not the top of the food chain here — and what the mangroves hide is stranger than what they eat.', officialType: 'NATURAL REGION / WETLANDS', environment: 'Wetlands / mangroves', theme: 'WELCOME TO THE WETLANDS', activities: ['Wildlife', 'Wetland exploration'], notPublished: ['Complete species list and exact wetland boundaries.'] },
  // Ambrosia é descrita como o coração do estado e Mount Kalaga como
  // encostada à fronteira norte — as duas únicas pistas geográficas que a
  // Rockstar dá, e são elas que fixam estas posições.
  { id: 'ambrosia', label: 'AMBROSIA', cx: 430, cy: 290, k: 1.7,
    image: IMG.ambrosia, sourced: true, gallery: [IMG.ambrosia, IMG.ambrosiaBikers, IMG.ambrosiaNight, IMG.ambrosiaSunset],
    county: 'Official boundary not published', knownPlaces: ['Ambrosia'],
    blurb: 'Inland Leonida, where American industry and old-fashioned values are defended at whatever price they cost. The Allied Crystal sugar refinery supplies the work; the local biker club supplies more or less everything else.', officialType: 'SETTLEMENT / INDUSTRIAL AREA', environment: 'Rural / industrial', theme: 'KEEPING LEONIDA SWEET', activities: ['Industry', 'Agriculture', 'Biker culture'], notPublished: ['Formal biker-gang name, hierarchy and exact boundaries.'] },
  { id: 'mount-kalaga', label: 'MOUNT KALAGA', cx: 430, cy: 120, k: 1.7,
    image: IMG.mountKalaga, sourced: true, gallery: [IMG.mountKalaga, IMG.ambrosiaDrive, IMG.swampStilts],
    county: 'Official boundary not published', knownPlaces: ['Mount Kalaga National Park'],
    blurb: 'A national landmark pressed against the state’s northern border, given over to hunting, fishing and off-road trails. The backwoods around it are settled by mystics and radicals who chose the distance from government deliberately.', officialType: 'NATIONAL PARK / WILDERNESS', environment: 'Forest / backcountry', theme: 'WILD, WILD COUNTRY', activities: ['Hunting', 'Fishing', 'Off-road trails'], notPublished: ['Exact northern boundary, trails, coordinates and complete wildlife list.'] },
]

export const mapFilters = [
  { id: 'locations', label: 'LOCATIONS', color: '#F5F4F0' },
  { id: 'secrets', label: 'SECRETS', color: '#F1A3C3' },
  { id: 'activities', label: 'ACTIVITIES', color: '#65DCCB' },
  { id: 'vehicles', label: 'VEHICLES', color: '#9B83F4' },
]

export const locations = [
  // Bairros nomeados por Rockstar na página oficial de Vice City. Ao
  // contrário das entradas acima, estes existem por confirmação e não por
  // análise; as coordenadas continuam a ser a disposição deste mapa.
  { slug: 'ocean-beach', name: 'OCEAN BEACH', category: 'locations', region: 'vice-city', x: 762, y: 318, image: '/media/locations/wiki/ocean-beach.webp',
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
  { slug: 'vc-port', name: 'VC PORT', category: 'locations', region: 'vice-city', x: 706, y: 176, image: '/media/locations/wiki/vc-port.webp',
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'Billed as the cruise capital of the world — the city’s front door and its loading bay at once.' },
  { slug: 'washington-beach', name: 'WASHINGTON BEACH', category: 'locations', region: 'vice-city', x: 748, y: 344, image: '/media/locations/wiki/washington-beach.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Rockstar identifies Washington Beach as the docking location for the Ultimate Edition Shitzu Squalo.' },
  { slug: 'southside-vice-city', name: 'SOUTHSIDE VICE CITY', category: 'locations', region: 'vice-city', x: 684, y: 340,
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named Vice City area in Rockstar’s official material.' },
  { slug: 'stockyard', name: 'STOCKYARD', category: 'locations', region: 'vice-city', x: 665, y: 182, image: '/media/locations/wiki/stockyard.webp',
    status: 'confirmed', sourceName: 'Official Vice City page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named Vice City area in Rockstar’s official material.' },
  { slug: 'shore-drive', name: 'SHORE DRIVE', category: 'locations', region: 'vice-city', x: 772, y: 282, image: '/media/locations/wiki/shore-drive.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Rockstar associates the ’95 Grotti Cheetah with Shore Drive.' },
  { slug: 'vercetti-estate', name: 'VERCETTI ESTATE', category: 'locations', region: 'vice-city', x: 730, y: 220,
    status: 'confirmed', sourceName: 'PlayStation · GTA VI Ultimate Edition', sourceUrl: 'https://store.playstation.com/en-us/concept/10000730/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Rockstar’s Ultimate Edition description names the Vercetti Estate as the source of the Hawk & Little Morgan Revolvers.' },
  { slug: 'allied-crystal-refinery', name: 'ALLIED CRYSTAL REFINERY', category: 'locations', region: 'ambrosia', x: 412, y: 305, image: '/media/locations/wiki/allied-crystal-refinery.webp',
    status: 'confirmed', sourceName: 'Official Ambrosia page', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01',
    desc: 'The sugar refinery that employs Ambrosia — and the reason the region has anything to fight over.' },
  { slug: 'gambit-bay', name: 'GAMBIT BAY', category: 'locations', region: 'leonida-keys', x: 786, y: 554,
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Rockstar associates Gambit Bay with fishing from the Shitzu Squalo.' },
  { slug: 'lake-leonida', name: 'LAKE LEONIDA', category: 'locations', region: 'leonida-keys', x: 710, y: 570,
    status: 'confirmed', sourceName: 'GTA Wiki · Lake Leonida', sourceUrl: 'https://gta.wiki/w/Lake_Leonida',
    publishedAt: '2026-09-02', updatedAt: '2026-09-02', desc: 'Rockstar places One-Eyed Willie’s on Lake Leonida. The GTA Wiki traces the name back to a highway sign glimpsed in the leaked September 2022 debug footage, later confirmed in an official screenshot; the lake itself sits on the southwest shore of Ambrosia County and is read as a stand-in for the real Lake Okeechobee.' },
  { slug: 'paradise-garage', name: 'PARADISE GARAGE', category: 'locations', region: 'grassrivers', x: 265, y: 445,
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'The ’67 Vapid Dominator Buggy is stored at Paradise Garage in Watson Bay; Rockstar confirms a weapon locker and fenced-goods storage there.' },
  { slug: 'watson-bay', name: 'WATSON BAY', category: 'locations', region: 'grassrivers', x: 270, y: 450,
    status: 'confirmed', sourceName: 'GTA Wiki · Watson Bay', sourceUrl: 'https://gta.wiki/w/Watson_Bay',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A Mariana County town in the Grassrivers region, and the location of Paradise Garage — Rockstar’s own confirmed storage for the Ultimate Edition Dominator Buggy. The GTA Wiki additionally names a water tower and a business called Bite House there.' },
  { slug: 'leonida-penitentiary', name: 'LEONIDA PENITENTIARY', category: 'locations', region: 'ambrosia', x: 385, y: 270, image: '/media/locations/wiki/leonida-penitentiary.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Official Site', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named story location in Rockstar’s official material.' },
  { slug: 'rideout-customs', name: 'RIDEOUT CUSTOMS', category: 'locations', region: 'vice-city', x: 700, y: 360,
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'An official vehicle-customization business for detailed interiors, high-end rims and donk styling.' },
  { slug: 'one-eyed-willies', name: 'ONE-EYED WILLIE’S', category: 'locations', region: 'leonida-keys', x: 690, y: 590, image: '/media/locations/wiki/one-eyed-willies.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A Lake Leonida mod shop specializing in off-road upgrades and hand-painted automotive artwork.' },
  { slug: 'stock-305', name: 'STOCK 305', category: 'locations', region: 'vice-city', x: 650, y: 190, image: '/media/locations/wiki/stock-305.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'An official Stockyard clothing store focused on elevated streetwear.' },
  { slug: 'electric-fang-tattoo', name: 'ELECTRIC FANG TATTOO', category: 'locations', region: 'vice-city', x: 675, y: 195, image: '/media/locations/wiki/electric-fang-tattoo.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'An official Stockyard tattoo location with special tattoos created in collaboration with FAILE.' },
  { slug: 'ptt-youngins-compound', name: 'PTT YOUNGIN$ COMPOUND', category: 'locations', region: 'vice-city', x: 680, y: 350, image: '/media/locations/wiki/ptt-youngins-compound.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'An Ultimate Edition location in Southside Vice City, raidable for special items and distinct contraband.' },
  { slug: 'saras-unisex-salon', name: 'SARA’S UNISEX SALON', category: 'locations', region: 'vice-city', x: 720, y: 330, image: '/media/locations/wiki/saras-unisex-salon.webp',
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI Editions', sourceUrl: 'https://www.rockstargames.com/VI/editions', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'An official business providing special character-appearance customization.' },

  // ---- Bairros de Vice City e Vice Beach nomeados pela GTA Wiki, para além
  // dos já confirmados na página oficial. Vice City é a sede do condado de
  // Vice-Dale; Vice Beach é uma cidade costeira à parte, no mesmo condado. ----
  { slug: 'bayside', name: 'BAYSIDE', category: 'locations', region: 'vice-city', x: 700, y: 200,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'belville', name: 'BELVILLE', category: 'locations', region: 'vice-city', x: 690, y: 250,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'crosstown', name: 'CROSSTOWN', category: 'locations', region: 'vice-city', x: 655, y: 260,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City. The self-styled “Leonida Man” of the first trailer places himself here.' },
  { slug: 'downtown-vice-city', name: 'DOWNTOWN VICE CITY', category: 'locations', region: 'vice-city', x: 715, y: 245,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'The city’s downtown district, home to the Sahara Arena and the Vice City Arts Center.' },
  { slug: 'ekanfinaka', name: 'EKANFINAKA', category: 'locations', region: 'vice-city', x: 645, y: 225,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'la-perle', name: 'LA PERLE', category: 'locations', region: 'vice-city', x: 660, y: 210,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'peacock-bay', name: 'PEACOCK BAY', category: 'locations', region: 'vice-city', x: 745, y: 230,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'rockridge', name: 'ROCKRIDGE', category: 'locations', region: 'vice-city', x: 630, y: 245,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A Vice City neighbourhood; the Venture Apartments raid in “An Extended Look” is set here.' },
  { slug: 'salton', name: 'SALTON', category: 'locations', region: 'vice-city', x: 705, y: 205,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'vice-city-design-district', name: 'VICE CITY DESIGN DISTRICT', category: 'locations', region: 'vice-city', x: 690, y: 195,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of sixteen named mainland neighbourhoods of Vice City.' },
  { slug: 'vcia', name: 'VICE CITY INTERNATIONAL AIRPORT', category: 'locations', region: 'vice-city', x: 640, y: 300,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice City', sourceUrl: 'https://gta.wiki/w/Vice_City', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'The city’s international airport, and the arrival point named in Andrés de León’s Megamundo-party account.' },
  { slug: 'starfish-island', name: 'STARFISH ISLAND', category: 'locations', region: 'vice-city', x: 758, y: 300,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice Beach', sourceUrl: 'https://gta.wiki/w/Vice_Beach_(HD_Universe)', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of four named neighbourhoods of Vice Beach, a coastal resort city in Vice-Dale County distinct from Vice City itself.' },
  { slug: 'leaf-links', name: 'LEAF LINKS', category: 'locations', region: 'vice-city', x: 770, y: 335,
    status: 'confirmed', sourceName: 'GTA Wiki · Vice Beach', sourceUrl: 'https://gta.wiki/w/Vice_Beach_(HD_Universe)', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'One of four named neighbourhoods of Vice Beach.' },

  // ---- Kelly County (Port Gellhorn) e Ambrosia County: pontos nomeados
  // pela GTA Wiki para além do que já estava confirmado. ----
  { slug: 'draper-island', name: 'DRAPER ISLAND', category: 'locations', region: 'port-gellhorn', x: 205, y: 165,
    status: 'confirmed', sourceName: 'GTA Wiki · Port Gellhorn', sourceUrl: 'https://gta.wiki/w/Port_Gellhorn', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named community within Kelly County, near Port Gellhorn.' },
  { slug: 'gellhorn-international-raceway', name: 'GELLHORN INTERNATIONAL RACEWAY', category: 'locations', region: 'port-gellhorn', x: 250, y: 165,
    status: 'confirmed', sourceName: 'GTA Wiki · Port Gellhorn', sourceUrl: 'https://gta.wiki/w/Port_Gellhorn', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named racing venue in Kelly County; the FR36 is reported racing here in “An Extended Look”.' },
  { slug: 'emerald-springs', name: 'EMERALD SPRINGS', category: 'locations', region: 'port-gellhorn', x: 260, y: 115,
    status: 'confirmed', sourceName: 'GTA Wiki · Kelly County', sourceUrl: 'https://gta.wiki/w/Kelly_County', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A named community within Kelly County.' },
  { slug: 'allied-crystal-sugar-refinery', name: 'ALLIED CRYSTAL SUGAR REFINERY', category: 'locations', region: 'ambrosia', x: 405, y: 305,
    status: 'confirmed', sourceName: 'GTA Wiki · Ambrosia', sourceUrl: 'https://gta.wiki/w/Ambrosia', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Ambrosia’s primary employer, and the source of the county’s sugar-industry identity. The GTA Wiki reports mayoral candidate Erin Henshaw is backed by the refinery.' },

  // ---- Mariana County: Capri e Key Lento juntam-se a Watson Bay, já
  // reposicionado acima. Capri fica solto entre Grassrivers e as Leonida
  // Keys — a wiki não o liga a nenhum dos dois com precisão. ----
  { slug: 'capri', name: 'CAPRI', category: 'locations', region: 'leonida-keys', x: 640, y: 500, image: '/media/locations/wiki/capri.webp',
    status: 'rumour', sourceName: 'GTA Wiki · Capri', sourceUrl: 'https://gta.wiki/w/Capri', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'Mariana County’s named city. The GTA Wiki marks its detail — a stadium, a lake and a central roundabout — as sourced from the August 2026 gameplay leak rather than official material, even though the city itself appears in official trailers.' },
  { slug: 'key-lento', name: 'KEY LENTO', category: 'locations', region: 'leonida-keys', x: 700, y: 560, image: '/media/locations/wiki/key-lento.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Key Lento', sourceUrl: 'https://gta.wiki/w/Key_Lento', publishedAt: '2026-09-01', updatedAt: '2026-09-01', desc: 'A Mariana County town in the Leonida Keys. The GTA Wiki names Jason Duval as a resident, living in a stilt house belonging to Brian Heder.' },

  // ---- Terceira ronda: subcategorias "Locations in GTA VI in <zona>" da
  // wiki, com páginas individuais de ilhas, negócios e pontos de interesse
  // que os artigos de condado não nomeavam. As entradas mais finas — uma
  // frase de origem sem facto de jogo — ficam de fora, mesma lógica já
  // aplicada aos veículos e personagens menores. ----
  { slug: 'catalan-key', name: 'CATALAN KEY', category: 'locations', region: 'vice-city', x: 735, y: 300,
    status: 'rumour', sourceName: 'GTA Wiki · Catalan Key', sourceUrl: 'https://gta.wiki/w/Catalan_Key', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A barrier island in Catalan Bay with a tennis stadium and an aquarium-style park, known only from the September 2022 and August 2026 leaks rather than any official trailer or screenshot.' },
  { slug: 'port-vice-city', name: 'PORTVICECITY', category: 'locations', region: 'vice-city', x: 700, y: 165, image: '/media/locations/wiki/port-vice-city.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · PortViceCity', sourceUrl: 'https://gta.wiki/w/PortViceCity', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'Vice City’s main seaport, visible in the first trailer (0:23) and in an official night-time screenshot showing the Delmar cruise ship docked there. The GTA Wiki reads it as a version of PortMiami.' },
  { slug: 'rialto-islands', name: 'RIALTO ISLANDS', category: 'locations', region: 'vice-city', x: 745, y: 260, image: '/media/locations/wiki/rialto-islands.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Rialto Islands', sourceUrl: 'https://gta.wiki/w/Rialto_Islands', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A cluster of three artificial luxury-residential islands in Catalan Bay, shown in the first trailer (0:31), official screenshots and a promotional postcard video. The GTA Wiki reads it as a version of Miami’s Venetian Islands.' },
  { slug: 'vice-beach-coast-guard-station', name: 'VICE BEACH COAST GUARD STATION', category: 'locations', region: 'vice-city', x: 775, y: 315, image: '/media/locations/wiki/vice-beach-coast-guard-station.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Vice Beach Coast Guard Station', sourceUrl: 'https://gta.wiki/w/Vice_Beach_Coast_Guard_Station', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A Coast Guard station on Catalan Bay, visible in background art on the official promotional website. The GTA Wiki reads it as a version of the real Coast Guard station in Miami Beach.' },
  { slug: 'teds-pediatric-dentistry', name: 'TED’S PEDIATRIC DENTISTRY', category: 'locations', region: 'ambrosia', x: 400, y: 300, image: '/media/locations/wiki/teds-pediatric-dentistry.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Ted’s Pediatric Dentistry', sourceUrl: 'https://gta.wiki/w/Ted%27s_Pediatric_Dentistry', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A dental clinic in Ambrosia, next to W. Blanco’s Cuban Foods and facing the county sheriff’s station.' },
  { slug: 'tuckers-citrus-farms', name: 'TUCKER’S CITRUS FARMS', category: 'locations', region: 'ambrosia', x: 390, y: 280, image: '/media/locations/wiki/tuckers-citrus-farms.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Tucker’s Citrus Farms', sourceUrl: 'https://gta.wiki/w/Tucker%27s_Citrus_Farms', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A citrus farm in Ambrosia, marked by its own “Tucker’s Tower,” visible in “An Extended Look.”' },
  { slug: 'w-blancos-cuban-foods', name: 'W. BLANCO’S CUBAN FOODS', category: 'locations', region: 'ambrosia', x: 410, y: 310, image: '/media/locations/wiki/w-blancos-cuban-foods.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · W. Blanco’s Cuban Foods', sourceUrl: 'https://gta.wiki/w/W._Blanco%27s_Cuban_Foods', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'An Ambrosia grocery store with a two-eagle mural, one of them carrying an automatic weapon. The GTA Wiki notes the name may nod to Walter White of Breaking Bad.' },
  { slug: 'daiquiri-republic', name: 'DAIQUIRI REPUBLIC', category: 'locations', region: 'leonida-keys', x: 720, y: 520, image: '/media/locations/wiki/daiquiri-republic.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Daiquiri Republic', sourceUrl: 'https://gta.wiki/w/Daiquiri_Republic', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A fictional micronation claiming sovereignty over the Leonida Keys, dated by the GTA Wiki to the 1860s in-fiction and visible on stickers and flags in the trailers — a parody of the real Conch Republic centred on Key West.' },
  { slug: 'goose-key', name: 'GOOSE KEY', category: 'locations', region: 'leonida-keys', x: 670, y: 570, image: '/media/locations/wiki/goose-key.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Goose Key', sourceUrl: 'https://gta.wiki/w/Goose_Key', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A Leonida Keys island with an airfield and the Leonida Keys Coast Guard Station; a Dodo seaplane is visible there in the first trailer. The GTA Wiki reads it as a version of Boca Chica Key.' },
  { slug: 'sunrise-rv-park', name: 'SUNRISE RV PARK', category: 'locations', region: 'grassrivers', x: 250, y: 430,
    status: 'confirmed', sourceName: 'GTA Wiki · Sunrise RV Park', sourceUrl: 'https://gta.wiki/w/Sunrise_RV_Park', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A riverside RV park in Grassrivers. A Dodo seaplane branded for Brian’s Boat Works & Marina — Brian Heder’s business, already documented on this archive — is visible there.' },
  { slug: 'thrillbilly-mud-club', name: 'THRILLBILLY MUD CLUB', category: 'locations', region: 'mount-kalaga', x: 445, y: 125, image: '/media/locations/wiki/thrillbilly-mud-club.webp',
    status: 'confirmed', sourceName: 'GTA Wiki · Thrillbilly Mud Club', sourceUrl: 'https://gta.wiki/w/Thrillbilly_Mud_Club', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'An off-road park for ATVs, swamp buggies and monster trucks near Mount Kalaga, likely the source of the motorcycle race shown in “An Extended Look.” This is the park’s own name, not confirmation of a formal “Mud Club” group — the ’67 Vapid Dominator Buggy’s Ultimate Edition description still leaves that association unresolved.' },
  { slug: 'unnamed-kelly-prison-complex', name: 'UNNAMED PRISON COMPLEX', category: 'locations', region: 'port-gellhorn', x: 270, y: 155,
    status: 'verified', sourceName: 'GTA Wiki · Kelly County', sourceUrl: 'https://gta.wiki/w/Kelly_County', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A second, unnamed prison complex in Kelly County, roughly a mile east of the Gellhorn International Raceway. The GTA Wiki lists it separately from Leonida Penitentiary, already documented on this archive in Vice-Dale County — the two are not the same site.' },
  { slug: 'unnamed-phosphate-mine', name: 'UNNAMED ABANDONED PHOSPHATE MINE', category: 'locations', region: 'mount-kalaga', x: 440, y: 140,
    status: 'verified', sourceName: 'GTA Wiki · Mount Kalaga National Park', sourceUrl: 'https://gta.wiki/w/Mount_Kalaga_National_Park', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'An abandoned phosphate mine inside Mount Kalaga National Park, used as an off-road course. The GTA Wiki reads it as a version of the real Noralyn Mine near Bartow, Florida.' },
  { slug: 'unnamed-gatorland-theme-park', name: 'UNNAMED GATORLAND-INSPIRED THEME PARK', category: 'locations', region: 'leonida-keys', x: 705, y: 555,
    status: 'verified', sourceName: 'GTA Wiki · Rusty Anchor', sourceUrl: 'https://gta.wiki/w/Rusty_Anchor', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'An alligator-themed park visible on a television inside the Rusty Anchor in Key Lento, already documented on this archive. The GTA Wiki reads it as a version of the real Gatorland in Orlando. (An earlier pass on this archive placed the Rusty Anchor in Port Gellhorn; a direct check of its own page corrects that to Key Lento, and this entry’s region moves with it.)' },

  // ---- Quarta ronda: negócios nomeados individualmente pela wiki, cruzados
  // com factos já reunidos em rondas anteriores mas nunca convertidos em
  // entradas próprias. ----
  { slug: 'starlet-motel', name: 'STARLET MOTEL', category: 'locations', region: 'port-gellhorn', x: 215, y: 145,
    status: 'confirmed', sourceName: 'GTA Wiki · Port Gellhorn', sourceUrl: 'https://gta.wiki/w/Port_Gellhorn', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A Port Gellhorn motel complex used as a safehouse by Jason Duval and Lucia Caminos. Official trailers show their room, the motel exterior and Jason fighting a man in the parking lot; earlier development footage also showed its pool during a world-event test involving Jason, Wyman and another character. Accessibility is documented, while ownership and storage rules remain unpublished.' },
  { slug: 'delights', name: 'DELIGHTS', category: 'locations', region: 'port-gellhorn', x: 240, y: 150,
    status: 'confirmed', sourceName: 'GTA Wiki · Port Gellhorn', sourceUrl: 'https://gta.wiki/w/Port_Gellhorn', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A Port Gellhorn strip club, shown in official screenshots and a postcard on the game’s promotional website.' },
  { slug: 'bocamar-bridge', name: 'BOCAMAR BRIDGE', category: 'locations', region: 'port-gellhorn', x: 235, y: 175,
    status: 'confirmed', sourceName: 'GTA Wiki · Port Gellhorn', sourceUrl: 'https://gta.wiki/w/Port_Gellhorn', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A bridge connecting to Port Gellhorn’s seaport area, shown in the second trailer during a high-speed chase involving Jason and Lucia. The GTA Wiki reads it as a version of Florida’s Sunshine Skyway Bridge.' },
  { slug: 'rusty-anchor', name: 'RUSTY ANCHOR', category: 'locations', region: 'leonida-keys', x: 695, y: 565,
    status: 'confirmed', sourceName: 'GTA Wiki · Rusty Anchor', sourceUrl: 'https://gta.wiki/w/Rusty_Anchor', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'A bar and music venue in Key Lento, shown in the second trailer (1:19, 1:29) and in official character screenshots, with a fishing-boat pier on site. The GTA Wiki reads it as a version of the real Caribbean Club in Key Largo, Florida, down to its rooftop windmill.' },
  { slug: 'jack-of-hearts', name: 'JACK OF HEARTS', category: 'locations', region: 'vice-city', x: 660, y: 270,
    status: 'confirmed', sourceName: 'GTA Wiki · Jack of Hearts', sourceUrl: 'https://gta.wiki/w/Jack_of_Hearts', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'Boobie Ike’s strip club in Crosstown, Vice City — already documented on this archive as the business that funds Only Raw Records, the label he runs with Dre’Quan Priest. Shown in the first trailer, with fuller coverage in the second trailer and official screenshots and artwork.' },
  { slug: 'megamundo-building', name: 'MEGAMUNDO BUILDING', category: 'locations', region: 'vice-city', x: 715, y: 245,
    status: 'confirmed', sourceName: 'GTA Wiki · Megamundo', sourceUrl: 'https://gta.wiki/w/Megamundo', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'Downtown Vice City headquarters of Megamundo, a Spanish-language media network — already documented on this archive through Petra Navarro (its COO), Valentina and Andrés de León, whose story on this site centres on the building’s opening party. Its Mega Noticias news division, also already referenced on this archive, is one of the network’s divisions. Shown in the first trailer and in “An Extended Look.”' },
  { slug: 'only-raw-records', name: 'ONLY RAW RECORDS', category: 'locations', region: 'vice-city', x: 665, y: 275,
    status: 'confirmed', sourceName: 'GTA Wiki · Only Raw Records', sourceUrl: 'https://gta.wiki/w/Only_Raw_Records', publishedAt: '2026-09-02', updatedAt: '2026-09-02',
    desc: 'The Vice City hip-hop label already named across four profiles on this archive: Dre’Quan Priest runs it, Boobie Ike bankrolls it out of the Jack of Hearts, and Real Dimez and DWNPLY are its signed acts. Shown in official promotional screenshots and trailers.' },

  // Named in released Rockstar material or the Extended Look. Coordinates
  // below are archive layout positions only; Rockstar has not published a
  // complete Leonida map or exact addresses for these interiors.
  { slug: 'venture-apartments', name: 'VENTURE APARTMENTS', category: 'locations', region: 'vice-city', x: 635, y: 252,
    status: 'confirmed', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look', publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A Rockridge apartment building where Jason and Lucia enter Raymond’s drug operation before Méndez’s task-force raid.' },
  { slug: 'effluvia', name: 'EFFLUVIA', category: 'locations', region: 'vice-city', x: 730, y: 235,
    status: 'confirmed', sourceName: 'Rockstar Games · An Extended Look', sourceUrl: 'https://www.rockstargames.com/VI/an-extended-look', publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A rooftop nightlife venue overlooking the Vice City skyline, where Jason and Lucia meet Brian and Lori Heder.' },
  { slug: 'vice-city-international-airport', name: 'VICE CITY INTERNATIONAL AIRPORT', category: 'locations', region: 'vice-city', x: 742, y: 185,
    status: 'verified', sourceName: 'Rockstar Games · GTA VI official media', sourceUrl: 'https://www.rockstargames.com/VI/media', publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'Vice City’s international airport, established through released aircraft, airport infrastructure and readable signage. Its final footprint is not published.' },
  { slug: 'gellhorn-international-raceway', name: 'GELLHORN INTERNATIONAL RACEWAY', category: 'locations', region: 'port-gellhorn', x: 275, y: 180,
    status: 'rumour', sourceName: 'Development material record', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A large raceway known from development material. Its final-game presence and public Rockstar status remain unknown.' },

  // GTA Base and GTA Intel catalogue cross-check, 2026-09-08. These records
  // fill genuine gaps in the local atlas, but remain analysis until Rockstar
  // publishes exact boundaries or a named map. Coordinates are atlas layout,
  // never a claim about final in-game position or scale.
  { slug: 'vice-beach', name: 'VICE BEACH', category: 'locations', region: 'vice-city', x: 775, y: 326, contextImage: '/media/locations/wiki/ocean-beach.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A coastal Vice City area distinguished from the wider Ocean Beach record in community location catalogues. Exact borders and district status remain unpublished.' },
  { slug: 'hamlet', name: 'HAMLET', category: 'locations', region: 'vice-dale-county', x: 620, y: 335, contextImage: '/media/characters/wiki/hamlet-woman.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A Vice-Dale County locality associated with the apartment complex seen in released material. Its full extent has not been officially mapped.' },
  { slug: 'dalton-island', name: 'DALTON ISLAND', category: 'locations', region: 'vice-city', x: 724, y: 232, contextImage: '/media/places/vice-city.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A named island in the wider Vice City catalogue. Access, landmarks and exact placement remain unpublished.' },
  { slug: 'gloriana-key', name: 'GLORIANA KEY', category: 'locations', region: 'leonida-keys', x: 760, y: 590, contextImage: '/media/places/leonida-keys.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A key recorded in community location catalogues. It should not be confused with the unsupported claim that Leonida contains a separate State of Gloriana.' },
  { slug: 'little-haiti', name: 'LITTLE HAITI', category: 'locations', region: 'vice-city', x: 642, y: 254, contextImage: '/media/scenes/tattoo-neon.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A community-catalogued Vice City neighbourhood label kept separate from Rockstar’s confirmed Little Cuba. The archive does not merge the two names.' },
  { slug: 'south-beach', name: 'SOUTH BEACH', category: 'locations', region: 'vice-city', x: 786, y: 356, contextImage: '/media/locations/wiki/ocean-beach.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A coastal sub-area indexed by secondary location catalogues. Its relationship to Ocean Beach and Vice Beach remains unconfirmed.' },
  { slug: 'tequesta-retreat', name: 'TEQUESTA RETREAT', category: 'locations', region: 'vice-city', x: 706, y: 210, contextImage: '/media/places/vice-city.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A named development associated with Tequesta in the broader Vice City record. Services and player access are unknown.' },
  { slug: 'venetian-islands', name: 'VENETIAN ISLANDS', category: 'locations', region: 'vice-city', x: 744, y: 272, contextImage: '/media/locations/wiki/rialto-islands.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'An island-group label used by secondary catalogues for part of Vice City’s artificial-island network. Exact composition is not officially published.' },
  { slug: 'waning-sands', name: 'WANING SANDS', category: 'locations', region: 'leonard-county', x: 310, y: 330, contextImage: '/media/places/port-gellhorn.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A Leonard County locality found in secondary map catalogues. Its boundaries and gameplay role remain unpublished.' },
  { slug: 'yorktown', name: 'YORKTOWN', category: 'locations', region: 'lummox-county', x: 365, y: 245, contextImage: '/media/places/mount-kalaga.webp',
    status: 'analysis', sourceName: 'GTA LORE · catalogue cross-check', sourceUrl: null, publishedAt: '2026-09-08', updatedAt: '2026-09-08',
    desc: 'A Lummox County locality recorded by secondary map catalogues. Exact placement and final-game prominence remain unconfirmed.' },
  { slug: 'ocean-view-hotel', name: 'OCEAN VIEW HOTEL', category: 'locations', region: 'vice-city', x: 770, y: 322, image: IMG.oceanView,
    status: 'confirmed', sourceName: 'Rockstar Games · GTA VI official media', sourceUrl: 'https://www.rockstargames.com/VI/media', publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A five-storey Art Deco hotel on Vice Beach’s Ocean Drive-inspired strip. It appears in official trailers, screenshots and artwork, including a clearly named exterior behind Jason and Lucia.' },
  { slug: 'neptune-hotel', name: 'NEPTUNE HOTEL', category: 'locations', region: 'vice-city', x: 765, y: 314, contextImage: IMG.viceCity,
    status: 'verified', sourceName: 'Rockstar Games · GTA VI Trailer 1', sourceUrl: 'https://www.rockstargames.com/VI', publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A three-storey Mediterranean Revival hotel partially visible beside the Boardwalk Hotel on the Vice Beach waterfront. Its public-facing sign can be read in published footage; interiors and player access remain unknown.' },
  // Names below are preserved as a clearly separated rumour layer. They are
  // catalogued by GTA Intel/GTA Wiki from development footage, not from a
  // Rockstar-published final map, so their coordinates are only atlas slots.
  { slug: 'bohemia', name: 'BOHEMIA', category: 'locations', region: 'vice-city', x: 610, y: 245, contextImage: IMG.viceCity,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A place name indexed from development-era material. Rockstar has not carried the name into a published map or regional description.' },
  { slug: 'domed-hills', name: 'DOMED HILLS', category: 'locations', region: 'mount-kalaga', x: 405, y: 145, contextImage: IMG.mountKalaga,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A reported hill-range name associated with the northern route toward Mount Kalaga. The label comes from development footage and is not present on a Rockstar-published map.' },
  { slug: 'east-key', name: 'EAST KEY', category: 'locations', region: 'leonida-keys', x: 790, y: 570, contextImage: IMG.leonidaKeys,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A reported Leonida Keys place name retained for search and cross-reference. Its position, borders and survival into the final game remain unconfirmed.' },
  { slug: 'north-beaches', name: 'NORTH BEACHES', category: 'locations', region: 'vice-city', x: 748, y: 218, contextImage: IMG.viceCity,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A destination name read from development-era road signage northbound on Route 97. It has not been included in Rockstar’s published region directory.' },
  { slug: 'redhill', name: 'REDHILL', category: 'locations', region: 'mount-kalaga', x: 370, y: 180, contextImage: IMG.mountKalaga,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A reported northern locality also associated with a Red Hill Forest label in community records. Neither spelling, boundaries nor final-game status has been officially published.' },
  { slug: 'sundown', name: 'SUNDOWN', category: 'locations', region: 'port-gellhorn', x: 300, y: 205, contextImage: IMG.portGellhorn,
    status: 'rumour', sourceName: 'GTA LORE · development-footage cross-check', sourceUrl: null, publishedAt: '2026-09-09', updatedAt: '2026-09-09',
    desc: 'A reported settlement name from development-era indexing. Its provisional atlas placement is not a claim about the final map.' },
]

// An image is used as evidence for an exact location only when the record
// points to published Rockstar/PlayStation material or explicitly identifies
// the place in a trailer, the Extended Look, an official screenshot or the
// official promotional site. Images tied only to leaks or community mapping
// never pass this gate; those entries receive a clearly labelled region image.
// Frames matched to a place by the GTA Wiki's own page for it, fetched in
// September 2026 and kept only where the wiki's file name says the frame came
// from released Rockstar material. Road signs, merchandise and logos were
// rejected: they name a place without showing it. The value is the frame's
// origin, shown with the image.
export const LOCATION_FRAMES = {
  'lake-leonida': 'Official screenshot',
  'watson-bay': 'Official screenshot',
  crosstown: 'Trailer 1',
  'downtown-vice-city': 'Official screenshot',
  'la-perle': 'Official screenshot',
  'peacock-bay': 'Trailer 2',
  vcia: 'Trailer 1',
  'key-lento': 'Trailer 2',
  'w-blancos-cuban-foods': 'Trailer 1',
  'unnamed-gatorland-theme-park': 'Official screenshot',
  'starlet-motel': 'Official screenshot',
  delights: 'Official screenshot',
  'bocamar-bridge': 'Trailer 2',
  'rusty-anchor': 'Official screenshot',
  'jack-of-hearts': 'Official artwork',
  'megamundo-building': 'Trailer 2',
  'only-raw-records': 'Official screenshot',
  'venture-apartments': 'Trailer 2',
  'vice-city-international-airport': 'Official screenshot',
  'tequesta-retreat': 'Trailer 1',
  'waning-sands': 'Trailer 1',
}

export const locationFrameOrigin = (location) => LOCATION_FRAMES[location?.slug] || null

export const confirmedLocationImage = (location) => {
  if (location && LOCATION_FRAMES[location.slug]) return `/media/locations/wiki/${location.slug}.webp`
  if (!location?.image || location.status !== 'confirmed') return null
  const evidence = `${location.sourceName || ''} ${location.desc || ''}`
  return /(Rockstar Games|Official |PlayStation|trailer|Extended Look|official screenshot|official promotional|promotional website)/i.test(evidence)
    ? location.image
    : null
}

// ---------------- EASTER EGGS ----------------
export const easterEggs = [
  {
    slug: 'panther-mural', name: 'PANTHER MURAL', status: 'confirmed',
    sourceName: 'Extended Look', sourceUrl: 'https://www.rockstargames.com/VI',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    image: null, location: 'panther-mural', region: 'VICE CITY',
    summary: 'Reference found in the Extended Look.',
    clues: [
      { text: 'Mural visible behind Jason at 01:41 in the Extended Look.', found: true },
      { text: 'Same panther silhouette stencilled at the Little Haiti market.', found: true },
      { text: 'Third instance rumoured near the Gellhorn rail yard.', found: false },
    ],
  },
  {
    slug: 'sunken-wreck', name: 'SUNKEN WRECK', status: 'verified',
    sourceName: 'Frame analysis', sourceUrl: null,
    publishedAt: '2026-08-12', updatedAt: '2026-08-21',
    image: null, location: 'sunken-wreck', region: 'LEONIDA KEYS',
    summary: 'A hull breaks the surface at low tide east of the sandbar.',
    clues: [
      { text: 'Hull outline visible in the causeway flyover shot.', found: true },
      { text: 'Name plate legible under enhancement.', found: false },
      { text: 'Cargo manifest reference in a loading screen.', found: false },
    ],
  },
  {
    slug: 'ghost-signal-mast', name: 'GHOST SIGNAL MAST', status: 'rumour',
    sourceName: 'Community report', sourceUrl: null,
    publishedAt: '2026-07-28', updatedAt: '2026-07-28',
    image: null, location: 'ghost-signal-mast', region: 'PORT GELLHORN',
    summary: 'A numbers-station loop reported on an unused radio frequency.',
    clues: [
      { text: 'Two independent reports of the same 40-second loop.', found: false },
      { text: 'Mast structure visible in one background plate.', found: false },
      { text: 'Decoded message — unverified.', found: false },
    ],
  },
  {
    slug: 'gator-shack', name: 'GATOR SHACK', status: 'verified',
    sourceName: 'Frame analysis', sourceUrl: null,
    publishedAt: '2026-08-08', updatedAt: '2026-08-18',
    image: null, location: 'gator-shack', region: 'GRASSRIVERS',
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
  // From a community completion guide supplied in September 2026. Rockstar has
  // not published the checklist, so the guide sorts every line by how much is
  // actually known rather than presenting a list of requirements.
  {
    slug: 'gta-6-100-percent-completion', title: 'GTA 6 100% COMPLETION: WHAT IS KNOWN', readTime: 7,
    status: 'analysis', sourceName: 'Community summary · GTA LORE editorial', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10', image: null,
    summary: 'The official 100% checklist is unpublished. What exists, what is reported as required, and what is only expected.',
    steps: [
      'Rockstar has not published the 100% checklist. This guide separates three things: content known to exist, objectives reported as required, and objectives only expected from earlier games.',
      'Story — the main campaign is expected to anchor completion. The only mission named so far is the Prologue, reportedly played as both Jason and Lucia.',
      'Side missions — Wyman’s Classic Car Collection, an Ultimate Edition mission to recover and rebuild abandoned classics, is reported as required.',
      'Activities reported as counting toward 100%: basketball, boxing, fishing, gym, hunting, kayaking, mini golf, off-road races, parachuting, pool, scuba diving, sea races, the shooting range (at least bronze in each required challenge) and street races. Each has its own record in the World index.',
      'Wrestling has been shown, but whether it is a repeatable activity or a single mission scene is unclear.',
      'Expected, not confirmed: random events, collectibles such as hidden packages or stashes, stunt jumps, property and business milestones, and the full wildlife checklist.',
      'Achievements and trophies are separate from the in-game percentage. Some will overlap, but unlocking all of them is not the same as reaching 100%.',
      'Playtime estimates in circulation: about 60 hours for the story, 80 with side content and 120–150+ for 100%. These are pre-release estimates, not Rockstar figures.',
      'This archive will only mark an objective as mandatory once its contribution to the in-game percentage has been verified.',
    ],
  },
  // From a community achievements guide supplied in September 2026. No list
  // has been published, so the guide states what is known and flags the rest.
  {
    slug: 'gta-6-achievements-and-trophies', title: 'GTA 6 ACHIEVEMENTS & TROPHIES: WHAT IS KNOWN', readTime: 6,
    status: 'analysis', sourceName: 'Community summary · GTA LORE editorial', sourceUrl: null,
    publishedAt: '2026-09-10', updatedAt: '2026-09-10', image: null,
    summary: 'The official list is unpublished. What can be said now, and why any “full list” online should be treated as unofficial.',
    steps: [
      'Neither the achievement list nor the trophy list has been published. Totals, names, Gamerscore values and unlock conditions are all unknown.',
      'The game launches on PlayStation 5 and Xbox Series X|S: trophies on PlayStation, achievements with Gamerscore on Xbox, expected to share requirements.',
      'Expected but unconfirmed: a Platinum trophy, hidden trophies for story moments, and a trophy for 100% completion. Rockstar’s recent major releases have included all three.',
      'Likely categories, none confirmed: story progress, side missions, activities, racing, the shooting range, parachuting, wildlife, exploration, collectibles, vehicles (including Wyman’s Classic Car Collection), crime and six-star wanted levels, and properties.',
      'Trophies and 100% completion are separate. Earning every trophy may need objectives outside the completion checklist, and some trophies could be missable — neither is known yet.',
      'For scale only: Red Dead Redemption 2 has 51 achievements and 52 trophies with Platinum; GTA V and GTA IV each have 50 base-game achievements and 51 trophies. These do not predict GTA 6’s total.',
      'Lists usually appear shortly before or at launch. Until Rockstar or the platform holders publish one, treat any complete GTA 6 list circulating online as unofficial.',
      'See also the 100% completion guide, which sorts the known activities by how much is confirmed.',
    ],
  },
  {
    slug: 'trailer-2-frame-by-frame', title: 'TRAILER 2, FRAME BY FRAME', readTime: 15,
    status: 'analysis', sourceName: 'Leonida Archive Editorial', sourceUrl: null,
    publishedAt: '2026-08-21', updatedAt: '2026-08-26', image: IMG.keysStreet,
    summary: 'A complete scene-by-scene breakdown with timestamps and visual references.',
    steps: [
      'Scrub to 00:07 — the causeway at dawn. Cross-reference it with the published visual record for the Keys.',
      'At 00:31, the mural district passes on the left. Three panther stencils are visible.',
      'The 01:12 interior-to-exterior cut is seamless. Watch the reflections for the second protagonist.',
      'Final frame: pause on the mural behind Jason. Start the Panther Mural easter egg chain from here.',
    ],
  },
  {
    slug: 'vice-city-districts-primer', title: 'VICE CITY DISTRICTS PRIMER', readTime: 10,
    status: 'verified', sourceName: 'Leonida Archive Editorial', sourceUrl: null,
    publishedAt: '2026-08-17', updatedAt: '2026-08-24', image: IMG.viceCity,
    summary: 'Every documented district, its confirmed landmarks and what to expect.',
    steps: [
      'Start at Ocean Drive — the most documented strip in all official material.',
      'Little Haiti: market streets, body shops and the mural alley.',
      'Vice Plaza: the downtown commercial core, verified by frame analysis.',
      'Use the region filter in the visual places atlas to isolate each district’s records.',
    ],
  },
  {
    slug: 'weapon-wheel-basics', title: 'ARSENAL BASICS: READING THE WHEEL', readTime: 6,
    status: 'analysis', sourceName: 'Leonida Archive Editorial', sourceUrl: null,
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
    publishedAt: '2026-08-22', updatedAt: '2026-08-27', image: null,
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

guides.forEach((g) => { g.readTime = readMinutes(g.title, g.summary, g.steps) })

// Wikipedia-style taxonomy for browsing the archive. The categories organise
// editorial entries; they do not imply that every linked claim is official.
export const encyclopediaCategories = [
  { slug: 'setting-and-locations', title: 'SETTING & LOCATIONS', description: 'Leonida, Vice City, counties, named regions and the limits of the published map.', color: 'pink', cover: IMG.viceCity, articles: ['leonida-the-state-before-the-map', 'leonida-map-source-ledger', 'vice-city-by-neighbourhood', 'extended-look-everything-revealed'] },
  { slug: 'characters-and-story', title: 'CHARACTERS & STORY', description: 'Lucia, Jason, supporting names and the published story premise.', color: 'mint', cover: IMG.luciaCaminos, articles: ['jason-and-lucia-the-story-premise', 'jason-lucia-story-context', 'extended-look-everything-revealed'] },
  { slug: 'release-and-editions', title: 'RELEASE & EDITIONS', description: 'Platforms, release chronology, editions, pre-orders and purchase context.', color: 'violet', cover: IMG.coverArt, articles: ['two-editions-one-source-checklist', 'the-release-date-moved-twice', 'cover-art-preorders-and-the-june-update', 'what-you-actually-get-in-each-edition', 'official-development-and-release-ledger'] },
  { slug: 'development-and-trailers', title: 'DEVELOPMENT & TRAILERS', description: 'The public development record, trailer releases and the media timeline.', color: 'pink', cover: IMG.keyArtPier, articles: ['from-2022-to-the-title-reveal', 'trailer-one-and-trailer-two-in-context', 'two-trailers-and-the-numbers-behind-them', 'official-development-and-release-ledger'] },
  { slug: 'media-and-reception', title: 'MEDIA & RECEPTION', description: 'Promotional art, screenshots, trailer indexes, awards and cultural context.', color: 'mint', cover: IMG.keyArtBeach, articles: ['the-official-media-index-by-subject', 'official-media-gallery-and-reception', 'four-creators-rockstar-north-preview', 'awards-trivia-and-the-public-conversation'] },
  { slug: 'creator-preview-records', title: 'CREATOR PREVIEW RECORDS', description: 'Four separate accounts from the reported Rockstar North demonstrations, clearly marked as secondary preview reporting.', color: 'violet', cover: IMG.keyArtMotel, articles: ['creator-preview-record-how-to-read-it', 'creator-preview-session-format-and-boundaries', 'creator-preview-systems-index', 'davy-jones-rockstar-north-preview-record', 'tgg-rockstar-north-preview-record', 'el-rubius-rockstar-north-preview-record', 'mikeshowsha-rockstar-north-preview-record'] },
  { slug: 'source-notes-and-claims', title: 'SOURCE NOTES & CLAIMS', description: 'How the archive distinguishes announcements, secondary reporting, leaks and inference.', color: 'violet', cover: IMG.oceanView, articles: ['claims-leaks-and-source-boundaries', 'combat-and-police-claims-ledger', 'systems-visuals-and-world-interactions', 'vehicles-and-online-separate-the-known'] },
]

const ARTICLE_VISUAL_SETS = {
  setting: [IMG.viceCity, IMG.grassrivers, IMG.leonidaKeys],
  characters: [IMG.luciaCaminos, IMG.jasonDuval, IMG.keyArtRobbery],
  release: [IMG.coverArt, IMG.ultimatePalms, IMG.stanierNight],
  development: [IMG.keyArtPier, IMG.keyArtMotel, IMG.keyArtBeach],
  media: [IMG.keyArtBeach, IMG.ambrosiaParty, IMG.mountKalaga],
  sources: [IMG.oceanView, IMG.docksCrew, IMG.weaponPattern],
}

// Entries whose subject is visible in a specific frame must not inherit a
// generic editorial gallery. These sets keep every supporting image on the
// same subject as the headline.
const ARTICLE_VISUAL_OVERRIDES = {
  'what-you-actually-get-in-each-edition': [IMG.ultimatePalms, IMG.coverArt, IMG.stanierSide],
  'two-editions-one-source-checklist': [IMG.ultimatePalms, IMG.coverArt, IMG.stanierSide],
  'the-new-inventory-system': [
    IMG.weaponPattern,
    IMG.weaponVariants,
    IMG.morganRevolvers,
  ],
  'six-star-wanted-level-returns': [
    IMG.swampChase,
    IMG.stanierCrew,
    IMG.stanierNight,
  ],
  'three-theories-second-protagonist': [IMG.keyArtRobbery, IMG.luciaCaminos, IMG.jasonDuval],
  'vice-city-every-confirmed-location': [IMG.viceCity, IMG.tattooNeon, IMG.tattooBack],
}

export function articleVisuals(article) {
  const slug = article.slug
  if (ARTICLE_VISUAL_OVERRIDES[slug]) return ARTICLE_VISUAL_OVERRIDES[slug]
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

// Quantos ficheiros de imagem o arquivo guarda, tirando os retratos dos
// criadores — esses são pessoas reais, não material do jogo. Conta-se a
// partir do catálogo para o número nunca poder divergir do que existe.
const mediaFiles = new Set(
  Object.values(IMG).filter((src) => {
    const grupo = src.split('/')[2]
    return grupo && grupo !== 'creators'
  })
).size

export const SITE_COUNTERS = {
  home: [
    [pad(articles.length), 'ARTICLES'],
    [pad(easterEggs.length), 'SECRETS'],
    [pad(guides.length), 'GUIDES'],
    [String(mediaFiles), 'MEDIA FILES'],
  ],
  news: [
    [pad(articles.length), 'ARTICLES'],
    [pad(contar(articles, (a) => a.category === 'official')), 'OFFICIAL'],
    [pad(contar(articles, (a) => a.status === 'confirmed')), 'CONFIRMED'],
    [String(mediaFiles), 'MEDIA FILES'],
  ],
  map: [
    [pad(locations.length), 'LOCATIONS'],
    [pad(easterEggs.length), 'SECRETS'],
    [pad(regions.length), 'REGIONS'],
    [pad(guides.length), 'GUIDES'],
  ],
  characters: [
    [pad(characters.length), 'CHARACTERS'],
    [pad(relationships.length), 'RELATIONSHIPS'],
    [pad(contar(characters, (c) => c.status === 'confirmed')), 'CONFIRMED'],
    [pad(contar(characters, (c) => c.image)), 'PORTRAITS'],
  ],
}

export const bySlug = (arr, slug) => arr.find((x) => x.slug === slug)
export const characterBySlug = (slug) => characters.find((c) => c.slug === slug)
export const relationshipsFor = (slug) => relationships.filter((r) => r.a === slug || r.b === slug)

// ---------------- RADIO STATIONS ----------------
// A partir de https://gta.wiki/w/Radio_Stations_in_GTA_VI. Diferente das
// outras páginas importadas: aqui a maioria do que se sabe vem de uma fuga
// de jogabilidade de agosto de 2026 (a roda de rádio visível em vídeo), não
// de material que a Rockstar tenha publicado. Só duas estações têm confirmação
// directa da Rockstar — o resto fica `rumour`, por mais que os nomes pareçam
// definitivos.
const ROCKSTAR_VI_MEDIA = 'https://www.rockstargames.com/VI/media/videos'
const RADIO_VISUALS = Object.freeze({
  'v-rock': {
    image: '/media/characters/jason-duval.webp',
    imageAlt: 'Official Rockstar portrait of Jason Duval',
    imageNote: 'Official Jason portrait · Context only · The station mark is shown in a separate Rockstar clip',
  },
  'vice-city-fm': {
    image: '/media/places/vice-city.webp',
    imageAlt: 'Official Rockstar artwork of Vice City',
    imageNote: 'Official Vice City artwork · Context only · The station name appears in An Extended Look',
  },
})

const R = (slug, name, genre, status, association, desc, tracks = []) => {
  const visual = RADIO_VISUALS[slug]
  return {
    slug, name, genre,
    status,
    evidenceStatus: status === 'confirmed' ? 'OFFICIAL — NAMED' : status === 'verified' ? 'OFFICIAL — DEPICTED' : 'SPECULATIVE',
    sourceName: status === 'confirmed' || status === 'verified' ? 'Rockstar Games · GTA VI media' : 'GTA LORE · COMMUNITY REPORT LOG',
    sourceUrl: status === 'confirmed' || status === 'verified' ? ROCKSTAR_VI_MEDIA : null,
    updatedAt: '2026-09-07',
    association, desc, tracks,
    image: visual?.image || null,
    imageAlt: visual?.imageAlt || null,
    imageNote: visual?.imageNote || 'No official station image has been published',
  }
}

// Enriquecido a partir das páginas individuais de cada estação (não só o
// índice). Duas fugas distintas de agosto de 2026 andam por trás de quase
// tudo aqui: um voo de Duster sobre Vice City de dia, e um voo de Mallard
// sobre Vice City à noite — cada um com Jason a percorrer a roda de rádio.
// Isso deixou-se visível nas notas de proveniência de cada estação. Uma
// contaminação real da própria wiki (a secção "Grand Theft Auto VI" da
// página do WorldWide FM descreve, por engano, a Symphony FM a tocar) foi
// detectada e excluída — não é repetida aqui.
export const radioStations = [
  R('v-rock', 'V-ROCK', 'Rock', 'confirmed',
    'OFFICIAL VIDEO · LOGO ON SHIRT + AUGUST 2026 LEAK',
    'Returning from earlier games with a redesigned logo, visible worn on Jason Duval’s T-shirt in an official teaser clip on the promotional website — Rockstar’s own material, not a leak. The same August 2026 gameplay leak that surfaced most of this list separately shows Jason selecting V-Rock while flying a Duster over Vice City by day.',
    [['For What It’s Worth', 'Stevie Nicks']]),
  R('vice-city-fm', 'VICE CITY FM', 'Not specified', 'confirmed',
    'TRAILER · BUS STOP ADVERTISEMENT',
    'Named on a bus stop advertisement visible in the “An Extended Look” trailer. That makes the station name official, even though no genre, DJ or playlist has been shown or announced for it.',
    []),
  R('back-country-radio', 'BACK COUNTRY RADIO', 'Country', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Seen in the leaked clip of Jason flying a Duster over Vice City by day, cycling through the radio wheel. He briefly selects it while “Rhinestone Cowboy” plays — one of two country tracks the same leak puts on this station.',
    [['Rhinestone Cowboy', 'Glen Campbell'], ['The Fireman', 'George Strait']]),
  R('circoloco-records-radio', 'CIRCOLOCO RECORDS RADIO', 'Electronic/Dance', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Seen in the same daytime Duster clip — Jason selects it, but the leak shows it muted, so no track from the station has actually been heard. Its name points to CircoLoco Records, a real dance label the wiki describes as a joint venture between Rockstar and Circoloco, which would make this one of the few stations with a confirmable real-world partner behind it.',
    []),
  R('cocoteo-fm', 'COCOTEO FM', 'Latin/Reggaeton', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'Seen in a second leaked clip — Jason flying a Mallard over Vice City at night — where he selects it while “Girl” by Myke Towers plays. The name reads as a play on the Spanish “coqueteo” (flirtation).',
    [['Girl', 'Myke Towers']]),
  R('dirty-south-classics', 'DIRTY SOUTH CLASSICS', 'Hip-hop/Southern rap', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Only glimpsed on the radio wheel during the daytime Duster clip — passed over, not selected, so no track has surfaced for it.',
    []),
  R('emotion-98-3', 'EMOTION 98.3', 'Pop/80s', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Glimpsed on the wheel in the daytime Duster clip, passed over without a track playing. The name and logo revive Vice City’s Emotion 98.3 from the 3D Universe era, already referenced indirectly through a DJ’s dialogue in a prior game — but that history is not a GTA VI confirmation on its own.',
    []),
  R('honey-fm', 'HONEY FM', 'Not specified', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Only glimpsed on the wheel in the daytime Duster clip, passed over without playing. No genre or tracklist detail has surfaced beyond the name.',
    []),
  R('kaleidoscope-fm', 'KALEIDOSCOPE FM', 'International/World', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'Seen in the nighttime Mallard clip — Jason selects it while “Herz aus Glas” plays.',
    [['Herz aus Glas', 'Marianne Rosenberg']]),
  R('la-ola', 'LA OLA', 'Latin/Salsa', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'Glimpsed on the wheel in the nighttime Mallard clip, passed over without playing. Its name is Spanish for “the wave,” which the wiki links to the stylistic roots of Nueva Ola-era Latin American pop.',
    []),
  R('radio-on-u', 'RADIO ON-U', 'Reggae/Dub', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Seen in the daytime Duster clip. Its name points to On-U Sound, a real English dub and reggae label, which the wiki treats as the station’s likely musical source.',
    [['Skylarking', 'Horace Andy']]),
  R('stockyard-fm', 'STOCKYARD FM', 'Contemporary/Pop', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Named after Stockyard, a Vice City district already named in official material — but the station itself is only known from the daytime Duster clip, where Jason scrolls past it on the wheel.',
    [['Overpowered', 'Róisín Murphy'], ['Million Dollar Baby', 'Tommy Richman']]),
  R('symphony-fm', 'SYMPHONY FM', 'Classical', 'rumour',
    'DUSTER CLIP (DAY) · AUGUST 2026 LEAK',
    'Seen in the daytime Duster clip — Jason briefly selects it while a Sibelius symphony movement plays.',
    [['Symphony No. 5, III. Allegro molto', 'Jean Sibelius'], ['Symphony No. 6, Allegro energico', 'Gustav Mahler']]),
  R('the-wipe', 'THE WIPE', 'Not specified', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'Only glimpsed on the wheel in the nighttime Mallard clip, with nothing audibly playing. No genre or tracklist detail has surfaced beyond the name.',
    []),
  R('the-chamber-106-6', 'THE CHAMBER 106.6', 'Not specified', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'Only glimpsed on the wheel in the nighttime Mallard clip, passed over without playing. No genre or tracklist detail has surfaced beyond the name.',
    []),
  R('worldwide-fm', 'WORLDWIDE FM', 'Funk/Soul/Reggae', 'rumour',
    'MALLARD CLIP (NIGHT) · AUGUST 2026 LEAK',
    'A station that already existed in GTA V and Online, seen again in the nighttime Mallard clip from the same August 2026 leak. Its own page misattributes a specific playing track to it — actually text about Symphony FM, copied onto the wrong station by the wiki itself — so no track is credited to it here.',
    []),
]

export const radioCounters = [
  [String(radioStations.length).padStart(2, '0'), 'STATIONS'],
  [String(radioStations.filter((r) => r.status === 'confirmed').length).padStart(2, '0'), 'CONFIRMED'],
  [String(new Set(radioStations.map((r) => r.genre)).size).padStart(2, '0'), 'GENRES'],
]

const cleanReferenceText = (value) => String(value)
  .replace(/GTA\s*Wiki['’]s/gi, "the archive research record's")
  .replace(/GTA\s*Wiki/gi, 'archive research')
  .replace(/\bthe\s+Wiki['’]s\b/gi, "the research notes'")
  .replace(/\bthe\s+Wiki\b/gi, 'the research notes')
  .replace(/GTA\s*Base/gi, 'secondary feature record')
  .replace(/PlayStation\.Blog/gi, 'PlayStation announcement')
  .replace(/Flow Games/gi, 'creator preview report')
  .replace(/GTAVice(?:\.net)?/gi, 'creator preview report')
  .replace(/GoRanked/gi, 'creator preview report')
  .replace(/Insert Future/gi, 'creator preview report')
  .replace(/Planeta de Libros/gi, 'public creator portrait')
  .replace(/direct\.playstation\.com/gi, 'the official platform store')
  .replace(/\bFandom\b/gi, 'community archive')

function keepOnlyRockstarReferences(value) {
  if (!value || typeof value !== 'object') return value
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (typeof item === 'string') value[index] = cleanReferenceText(item)
      else keepOnlyRockstarReferences(item)
    })
    return value
  }

  if ('sourceUrl' in value && !isRockstarUrl(value.sourceUrl)) {
    value.sourceUrl = null
    if ('sourceName' in value) value.sourceName = 'GTA LORE · EDITORIAL RECORD'
  }
  if ('imageCreditUrl' in value && !isRockstarUrl(value.imageCreditUrl)) {
    value.imageCreditUrl = null
    value.imageCredit = null
  }

  Object.keys(value).forEach((key) => {
    const item = value[key]
    if (typeof item === 'string') {
      if (/^https?:\/\//i.test(item) && !isRockstarUrl(item)) value[key] = null
      else value[key] = cleanReferenceText(item)
    } else {
      keepOnlyRockstarReferences(item)
    }
  })
  return value
}

// Sanitize the complete public content graph before any page imports it.
// Editorial research remains internal; published outbound destinations are
// restricted to official Rockstar domains.
[
  extendedLookBrief, gtaWikiPageLedger, settingReferences, featureBriefs,
  officialCatalog, editions, articles, liveUpdates, sources, weaponTypes,
  weapons, weaponCounters, vehicleClasses, vehicles, vehicleCounters, factions,
  characterFilters, characters, relationships, mechanics, regions, mapFilters,
  locations, easterEggs, guides, encyclopediaCategories, radioStations,
  radioCounters,
].forEach(keepOnlyRockstarReferences)
