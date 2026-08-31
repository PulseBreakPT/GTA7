// LEONIDA ARCHIVE — local structured data.
// Content is separated from components so a real API/CMS can replace it later.
// Allowed statuses: 'confirmed' | 'verified' | 'analysis' | 'rumour'

const u = (id) => `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`

export const IMG = {
  hero: u('photo-1589066724013-06f34f2cc17c'),
  heroAlt: u('photo-1670349218709-1c246063c319'),
  ferris: u('photo-1671830641093-a319ee9e8cac'),
  ferris2: u('photo-1689851865818-db816d2ee599'),
  neon: u('photo-1548317202-26d94742e8d8'),
  neon2: u('photo-1724690951194-2022018ca8b5'),
  police: u('photo-1738130399737-f39ef0637ddc'),
  police2: u('photo-1718592168437-8382e5b97736'),
  skyline: u('photo-1669815503102-7c417112b3eb'),
  skyline2: u('photo-1702581564420-ce2cfb789a05'),
  keys: u('photo-1740990556963-cd74982ef7e6'),
  carBlack: u('photo-1580014317999-e9f1936787a5'),
  carBlack2: u('photo-1637160967973-88751d581827'),
  carRed: u('photo-1584345604325-f5091269a0d1'),
  carBlue: u('photo-1484687742385-1249620c2687'),
  carGreen: u('photo-1609386464913-4cbfa39de540'),
  carOrange: u('photo-1511815364177-9e267595a13d'),
  carWhite: u('photo-1637160969200-d2da3f102d3b'),
  lucia: u('photo-1776790799226-021a8e00ce38'),
  jason: u('photo-1553425288-824fd1ccc1b5'),
  cal: u('photo-1610741141761-23b20808980e'),
  boobie: u('photo-1764012956655-80e7f913959a'),
  pistol: u('photo-1623947850497-dbc9730d1065'),
  pistol2: u('photo-1713648129191-fbdf9b1e3083'),
  pistol3: u('photo-1564993719576-7b00be6317cd'),
  revolver: u('photo-1595590426346-a9d0348d802f'),
}

export const SITE_COUNTERS = {
  home: [['186','ARTICLES'],['48','SECRETS'],['12','GUIDES']],
  news: [['238','NEWS'],['41','OFFICIAL'],['06','TODAY']],
  map: [['326','LOCATIONS'],['48','SECRETS'],['71%','MAPPED']],
  characters: [['12','CHARACTERS'],['28','RELATIONSHIPS'],['09','CONFIRMED']],
}

// ---------------- ARTICLES ----------------
export const articles = [
  {
    slug: 'extended-look-everything-revealed',
    title: 'EXTENDED LOOK: EVERYTHING REVEALED',
    category: 'analysis', status: 'analysis',
    sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/extended-look',
    publishedAt: '2026-08-27', updatedAt: '2026-08-27', readTime: 12,
    image: IMG.ferris, featured: true, views: 48210,
    excerpt: 'We gathered every detail from the Extended Look: locations, characters, mechanics and the clues pointing to the biggest chapter of the series in Leonida.',
    body: [
      'The Extended Look is the densest piece of footage released so far. Frame by frame, it confirms districts, storefronts and a daytime cycle far more granular than anything in the series to date.',
      'Our editorial team catalogued 47 distinct locations, 12 vehicles and 9 weapons across the footage. Each entry has been cross-referenced against the official screenshots released earlier this year.',
      'The most significant finding is the seamless interior-to-exterior traversal shown at the 01:12 mark. No loading masks. No camera cuts. If this is representative of the final build, Leonida is a generational leap.',
      'Rumoured elements — including a returning radio host and a second playable region — remain unverified and are labelled accordingly in the database.',
    ],
  },
  {
    slug: 'the-new-inventory-system',
    title: 'THE NEW INVENTORY SYSTEM',
    category: 'analysis', status: 'analysis',
    sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/inventory-analysis',
    publishedAt: '2026-08-26', updatedAt: '2026-08-26', readTime: 8,
    image: IMG.neon2, featured: false, views: 31980,
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
    sourceName: 'Rockstar Newswire', sourceUrl: 'https://example.com/newswire-wanted',
    publishedAt: '2026-08-25', updatedAt: '2026-08-25', readTime: 6,
    image: IMG.police, featured: false, views: 29870,
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
    image: IMG.ferris2, featured: true, views: 51230,
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
    image: IMG.skyline, featured: false, views: 18450,
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
    image: IMG.carBlack2, featured: false, views: 12760,
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
    image: IMG.neon, featured: false, views: 22140,
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
    image: IMG.skyline2, featured: false, views: 20390,
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
const W = (slug, name, type, ammo, mag, stats, status, image, desc, locs) => ({
  slug, name, type, ammo, mag,
  stats, // [damage, fireRate, accuracy, range, capacity, weightKg]
  status,
  sourceName: status === 'confirmed' ? 'Extended Look' : status === 'verified' ? 'Trailer 2 frame analysis' : status === 'analysis' ? 'Archive analysis' : 'Community report',
  sourceUrl: 'https://example.com/source',
  publishedAt: '2026-08-20', updatedAt: '2026-08-27',
  image, desc, locations: locs || ['Vice City – Little Haiti', 'Vice City – Vice Point'],
})

export const weaponTypes = [
  { id: 'handgun', label: 'HANDGUN' },
  { id: 'shotgun', label: 'SHOTGUN' },
  { id: 'smg', label: 'SUBMACHINE GUN' },
  { id: 'rifle', label: 'RIFLE' },
  { id: 'explosives', label: 'EXPLOSIVES' },
]

export const weapons = [
  // HANDGUNS (8)
  W('compact-pistol', 'COMPACT PISTOL', 'handgun', 15, 85, [46, 62, 58, 42, 15, 0.8], 'confirmed', IMG.pistol2, 'Seen during the getaway in Vice City.', ['Vice City – Little Haiti', 'Vice City – Vice Point']),
  W('tactical-pistol', 'TACTICAL PISTOL', 'handgun', 17, 102, [52, 58, 66, 48, 17, 1.0], 'confirmed', IMG.pistol3, 'Standard issue sidearm carried by private security crews.'),
  W('.38-revolver', '.38 REVOLVER', 'handgun', 6, 72, [71, 30, 62, 40, 6, 1.1], 'confirmed', IMG.revolver, 'A classic wheel gun spotted in the pawn shop scene.'),
  W('heavy-pistol', 'HEAVY PISTOL', 'handgun', 12, 72, [64, 44, 60, 46, 12, 1.2], 'confirmed', IMG.pistol, 'High-calibre sidearm documented in the marina shootout.'),
  W('combat-pistol', 'COMBAT PISTOL', 'handgun', 15, 90, [55, 60, 64, 47, 15, 0.9], 'verified', IMG.pistol2, 'Frame analysis places it in the second convenience store scene.'),
  W('ceramic-pistol', 'CERAMIC PISTOL', 'handgun', 12, 60, [40, 66, 50, 34, 12, 0.6], 'analysis', null, 'Believed to bypass metal detectors. Visual pending.'),
  W('service-pistol', 'SERVICE PISTOL', 'handgun', 16, 96, [50, 56, 62, 45, 16, 0.9], 'analysis', null, 'Police-issue sidearm inferred from holster geometry.'),
  W('machine-pistol', 'MACHINE PISTOL', 'handgun', 20, 120, [38, 92, 36, 30, 20, 1.1], 'rumour', null, 'Community listing only. No verified footage.'),
  // SHOTGUNS (5)
  W('pump-shotgun', 'PUMP SHOTGUN', 'shotgun', 8, 48, [88, 22, 40, 24, 8, 3.4], 'confirmed', null, 'Pump action documented behind the counter of the bait shop.'),
  W('sawed-off-shotgun', 'SAWED-OFF SHOTGUN', 'shotgun', 2, 36, [92, 26, 28, 14, 2, 2.1], 'confirmed', null, 'Compact break action seen in the airboat chase.'),
  W('combat-shotgun', 'COMBAT SHOTGUN', 'shotgun', 10, 60, [82, 40, 44, 26, 10, 3.8], 'verified', null, 'Semi-automatic profile matched across two scenes.'),
  W('bullpup-shotgun', 'BULLPUP SHOTGUN', 'shotgun', 12, 60, [76, 46, 48, 28, 12, 3.2], 'analysis', null, 'Silhouette only. Classification provisional.'),
  W('heavy-shotgun', 'HEAVY SHOTGUN', 'shotgun', 6, 42, [95, 30, 42, 30, 6, 4.2], 'rumour', null, 'Referenced in a community datamine. Unverified.'),
  // SMG (6)
  W('micro-smg', 'MICRO SMG', 'smg', 16, 128, [42, 88, 38, 32, 16, 1.4], 'confirmed', null, 'Series staple confirmed in the drive-by sequence.'),
  W('compact-smg', 'COMPACT SMG', 'smg', 30, 180, [44, 84, 46, 38, 30, 2.2], 'confirmed', null, 'Folding stock variant carried in the nightclub scene.'),
  W('standard-smg', 'SMG', 'smg', 30, 210, [48, 80, 52, 44, 30, 2.6], 'confirmed', null, 'Documented across three separate scenes.'),
  W('assault-smg', 'ASSAULT SMG', 'smg', 40, 240, [50, 86, 50, 46, 40, 2.9], 'verified', null, 'Extended magazine profile matched by frame analysis.'),
  W('mini-smg', 'MINI SMG', 'smg', 20, 160, [40, 90, 34, 30, 20, 1.6], 'analysis', null, 'Possible reskin of the micro platform.'),
  W('tactical-smg', 'TACTICAL SMG', 'smg', 25, 175, [46, 82, 56, 42, 25, 2.4], 'rumour', null, 'Community listing only.'),
  // RIFLES (6)
  W('carbine-rifle', 'CARBINE RIFLE', 'rifle', 30, 210, [58, 70, 70, 68, 30, 3.1], 'confirmed', null, 'Confirmed in the compound raid footage.'),
  W('assault-rifle', 'ASSAULT RIFLE', 'rifle', 30, 240, [62, 66, 62, 64, 30, 3.6], 'confirmed', null, 'Classic pattern rifle seen in the swamp standoff.'),
  W('bullpup-rifle', 'BULLPUP RIFLE', 'rifle', 30, 210, [56, 74, 66, 62, 30, 3.0], 'verified', null, 'Distinct outline verified across two trailers.'),
  W('marksman-rifle', 'MARKSMAN RIFLE', 'rifle', 10, 80, [80, 34, 88, 90, 10, 4.4], 'verified', null, 'Scoped platform verified on the rooftop scene.'),
  W('sniper-rifle', 'SNIPER RIFLE', 'rifle', 5, 40, [96, 18, 94, 98, 5, 5.8], 'analysis', null, 'Long barrel silhouette. Classification provisional.'),
  W('heavy-rifle', 'HEAVY RIFLE', 'rifle', 20, 140, [70, 52, 58, 66, 20, 4.8], 'rumour', null, 'Datamined string only. Unverified.'),
  // EXPLOSIVES (4)
  W('grenade', 'GRENADE', 'explosives', 1, 6, [98, 10, 30, 36, 1, 0.5], 'confirmed', null, 'Fragmentation grenade confirmed in the dock ambush.'),
  W('sticky-bomb', 'STICKY BOMB', 'explosives', 1, 4, [99, 8, 40, 30, 1, 0.6], 'verified', null, 'Remote detonation verified in the salvage yard scene.'),
  W('molotov', 'MOLOTOV', 'explosives', 1, 8, [72, 12, 26, 24, 1, 0.9], 'analysis', null, 'Improvised incendiary inferred from fire propagation.'),
  W('pipe-bomb', 'PIPE BOMB', 'explosives', 1, 5, [90, 8, 22, 26, 1, 1.2], 'rumour', null, 'Community listing only.'),
]

export const weaponCounters = [['29','WEAPONS'],['07','TYPES'],['14','CONFIRMED']]

// ---------------- VEHICLES ----------------
const V = (slug, name, cls, stats, specs, status, image, num, find, findLabel) => ({
  slug, name, cls,
  stats, // [speed, acceleration, braking, handling]
  specs, // [doors, seats, drive, engine]
  status,
  sourceName: status === 'confirmed' ? 'Extended Look' : status === 'verified' ? 'Trailer 2 frame analysis' : 'Community report',
  sourceUrl: 'https://example.com/source',
  publishedAt: '2026-08-18', updatedAt: '2026-08-26',
  image, num,
  findLabel: findLabel || 'OCEAN BEACH · 0.8 MI',
  find: find || 'May spawn in the covered parking structure near Ocean Drive.',
})

export const vehicleClasses = [
  { id: 'all', label: 'ALL', count: 214 },
  { id: 'muscle', label: 'MUSCLE', count: 42 },
  { id: 'sports', label: 'SPORTS', count: 38 },
  { id: 'classics', label: 'CLASSICS', count: 47 },
  { id: 'motorcycles', label: 'MOTORCYCLES', count: 61 },
  { id: 'boats', label: 'BOATS', count: 26 },
]

export const vehicles = [
  V('bravado-gauntlet', 'BRAVADO GAUNTLET', 'muscle', [88, 76, 62, 70], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.carBlack2, '001', 'May spawn in the covered parking structure near Ocean Drive.', 'OCEAN BEACH · 0.8 MI'),
  V('declasse-tampa', 'DECLASSE TAMPA', 'muscle', [82, 80, 58, 66], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.carRed, '002', 'Regularly parked outside the Little Haiti body shop.', 'LITTLE HAITI · 1.2 MI'),
  V('vapid-dominator', 'VAPID DOMINATOR', 'muscle', [86, 78, 64, 72], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.carBlue, '003', 'Seen circling the Vice Point strip after dark.', 'VICE POINT · 2.1 MI'),
  V('imponte-phoenix', 'IMPONTE PHOENIX', 'muscle', [80, 74, 60, 64], ['2 DOORS','2 SEATS','RWD','V8'], 'verified', IMG.carGreen, '004', 'Frame analysis places it near the Grassrivers gas station.', 'GRASSRIVERS · 6.4 MI'),
  V('declasse-sabre-turbo', 'DECLASSE SABRE TURBO', 'muscle', [84, 82, 56, 62], ['2 DOORS','2 SEATS','RWD','V8'], 'verified', IMG.carOrange, '005', 'Verified spawn at the Port Gellhorn dry dock lot.', 'PORT GELLHORN · 9.8 MI'),
  V('albany-buccaneer', 'ALBANY BUCCANEER', 'muscle', [76, 68, 54, 58], ['2 DOORS','4 SEATS','RWD','V8'], 'confirmed', IMG.carWhite, '006', 'Classic lines, spotted along the Ocean Drive strip.', 'OCEAN DRIVE · 0.4 MI'),
  V('ocelot-jackal-gt', 'OCELOT JACKAL GT', 'sports', [92, 88, 74, 84], ['2 DOORS','2 SEATS','AWD','V10'], 'verified', IMG.carBlack, '007', 'Rumoured dealership showcase in downtown Vice City.', 'DOWNTOWN · 1.6 MI'),
  V('grotti-stinger-classic', 'GROTTI STINGER CLASSIC', 'classics', [78, 64, 52, 60], ['2 DOORS','2 SEATS','RWD','V12'], 'analysis', null, '008', 'Collector listing inferred from the marina paddock.', 'VICE MARINA · 1.1 MI'),
  V('western-wolfsbane', 'WESTERN WOLFSBANE', 'motorcycles', [74, 84, 48, 76], ['—','1 SEAT','RWD','V-TWIN'], 'verified', null, '009', 'Ridden through Little Haiti in the Extended Look.', 'LITTLE HAITI · 1.3 MI'),
  V('nagasaki-drift-cat', 'NAGASAKI DRIFT CAT', 'motorcycles', [88, 92, 52, 82], ['—','1 SEAT','RWD','L4'], 'rumour', null, '010', 'Community datamine string only.', 'UNKNOWN'),
  V('shitzu-speedster', 'SHITZU SPEEDSTER', 'boats', [70, 60, 30, 54], ['—','4 SEATS','JET','MARINE'], 'confirmed', null, '011', 'Beached at the Leonida Keys sandbar party.', 'LEONIDA KEYS · 12.0 MI'),
  V('kraken-mako', 'KRAKEN MAKO', 'boats', [64, 56, 28, 50], ['—','2 SEATS','PROP','MARINE'], 'analysis', null, '012', 'Hull profile analysis from the causeway flyover.', 'KEYS CAUSEWAY · 10.2 MI'),
]

export const vehicleCounters = [['214','VEHICLES'],['18','CLASSES'],['63','CONFIRMED']]

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
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://example.com/lucia',
    publishedAt: '2025-12-01', updatedAt: '2026-08-27',
    image: IMG.lucia,
    bio: 'Determined to change her life, even when the plan becomes complicated.',
    long: 'Fresh out of Leonida State Penitentiary, Lucia is done taking chances she did not choose. Every mile of Vice City is a calculated risk now — and she intends to collect.',
  },
  {
    slug: 'jason-duval', name: 'JASON DUVAL', role: 'PROTAGONIST', group: 'protagonists',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://example.com/jason',
    publishedAt: '2025-12-01', updatedAt: '2026-08-27',
    image: IMG.jason,
    bio: 'Wants an easy life, but things keep getting harder.',
    long: 'Jason grew up around grifters and pirates in the Keys. He knows every sandbar and every shortcut — and exactly how much trouble each one is worth.',
  },
  {
    slug: 'cal-hampton', name: 'CAL HAMPTON', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://example.com/cal',
    publishedAt: '2026-05-06', updatedAt: '2026-08-27',
    image: IMG.cal,
    bio: 'Convinced the world is out to get him. Mostly right.',
    long: 'Jason’s friend and a fellow associate of Brian’s, Cal prefers watching the world from behind a police scanner and a locked door.',
  },
  {
    slug: 'boobie-ike', name: 'BOOBIE IKE', role: 'ALLY', group: 'allies',
    status: 'confirmed', sourceName: 'Official character page', sourceUrl: 'https://example.com/boobie',
    publishedAt: '2026-05-06', updatedAt: '2026-08-27',
    image: IMG.boobie,
    bio: 'A local legend with his hands in every till in Vice City.',
    long: 'From the fish market to the recording studio, Boobie turned street capital into an empire — and he protects every brick of it.',
  },
  {
    slug: 'dre-quan-priest', name: "DRE'QUAN PRIEST", role: 'FACTION', group: 'factions',
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/drequan',
    publishedAt: '2026-05-06', updatedAt: '2026-08-20',
    image: null,
    bio: 'Runs Only Raw Records. Every hit has a price.',
    long: 'The label boss whose roster keeps ending up adjacent to very expensive problems.',
  },
  {
    slug: 'raul-bautista', name: 'RAUL BAUTISTA', role: 'RIVAL', group: 'rivals',
    status: 'rumour', sourceName: 'Community report', sourceUrl: 'https://example.com/raul',
    publishedAt: '2026-06-14', updatedAt: '2026-06-14',
    image: null,
    bio: 'An experienced bank robber looking for a crew.',
    long: 'Community-sourced only. Handle with appropriate scepticism.',
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
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/switching',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    desc: 'Switch protagonists without abandoning the current world state.',
    long: 'The Extended Look shows a seamless hand-off between Lucia and Jason mid-mission. World state — traffic, wanted level, weather — persists across the switch.' },
  { slug: 'dynamic-relationship', name: 'DYNAMIC RELATIONSHIP', glyph: '△', icon: 'relation',
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/relationship',
    publishedAt: '2026-08-18', updatedAt: '2026-08-25',
    desc: 'Relationships evolve based on choices, actions and consequences.',
    long: 'Dialogue variations across captures suggest trust and tension meters that respond to player behaviour.' },
  { slug: 'disguises', name: 'DISGUISES', glyph: '□', icon: 'disguise',
    status: 'verified', sourceName: 'Extended Look', sourceUrl: 'https://example.com/disguises',
    publishedAt: '2026-08-16', updatedAt: '2026-08-24',
    desc: 'Use disguises to access restricted areas and mislead enemies.',
    long: 'Uniform pickups appear as interactable props in two scenes, including the marina security office.' },
  { slug: 'personal-inventory', name: 'PERSONAL INVENTORY', glyph: 'L2', icon: 'inventory',
    status: 'analysis', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/inventory',
    publishedAt: '2026-08-14', updatedAt: '2026-08-26',
    desc: 'Each character carries their own items and distinct limitations.',
    long: 'HUD comparison across protagonists shows non-shared item grids and different carry weights.' },
  { slug: 'six-star-wanted', name: 'SIX-STAR WANTED', glyph: 'R2', icon: 'wanted',
    status: 'confirmed', sourceName: 'Rockstar Newswire', sourceUrl: 'https://example.com/wanted',
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
]

// ---------------- MAP: REGIONS, LOCATIONS ----------------
export const regions = [
  { id: 'vice-city', label: 'VICE CITY', cx: 720, cy: 260, k: 1.7 },
  { id: 'leonida-keys', label: 'LEONIDA KEYS', cx: 740, cy: 540, k: 1.8 },
  { id: 'port-gellhorn', label: 'PORT GELLHORN', cx: 230, cy: 140, k: 1.8 },
  { id: 'grassrivers', label: 'GRASSRIVERS', cx: 240, cy: 420, k: 1.6 },
]

export const mapFilters = [
  { id: 'locations', label: 'LOCATIONS', color: '#F5F4F0' },
  { id: 'secrets', label: 'SECRETS', color: '#F1A3C3' },
  { id: 'activities', label: 'ACTIVITIES', color: '#65DCCB' },
  { id: 'vehicles', label: 'VEHICLES', color: '#9B83F4' },
]

export const locations = [
  { slug: 'panther-mural', name: 'PANTHER MURAL', category: 'secrets', region: 'vice-city', x: 700, y: 232,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/panther',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    desc: 'Reference found in the Extended Look.', clues: [2,3], easterEgg: true },
  { slug: 'ocean-drive-strip', name: 'OCEAN DRIVE STRIP', category: 'locations', region: 'vice-city', x: 745, y: 300,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/oceandrive',
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
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/pier',
    publishedAt: '2026-08-20', updatedAt: '2026-08-26',
    desc: 'Ferris wheel boardwalk. Minigames strongly implied.' },
  { slug: 'gauntlet-spawn', name: 'GAUNTLET SPAWN', category: 'vehicles', region: 'vice-city', x: 726, y: 330,
    status: 'verified', sourceName: 'Archive analysis', sourceUrl: 'https://example.com/gauntlet-spawn',
    publishedAt: '2026-08-19', updatedAt: '2026-08-26',
    desc: 'Covered parking structure. Bravado Gauntlet sighting.', vehicle: 'bravado-gauntlet' },
  { slug: 'keys-causeway', name: 'KEYS CAUSEWAY', category: 'locations', region: 'leonida-keys', x: 700, y: 505,
    status: 'confirmed', sourceName: 'Trailer 2', sourceUrl: 'https://example.com/causeway',
    publishedAt: '2026-08-15', updatedAt: '2026-08-22',
    desc: 'The dawn causeway shot that opens Trailer 2.' },
  { slug: 'sunken-wreck', name: 'SUNKEN WRECK', category: 'secrets', region: 'leonida-keys', x: 815, y: 560,
    status: 'verified', sourceName: 'Frame analysis', sourceUrl: 'https://example.com/wreck',
    publishedAt: '2026-08-12', updatedAt: '2026-08-21',
    desc: 'Hull visible at low tide east of the sandbar.', clues: [1,3], easterEgg: true },
  { slug: 'sandbar-party', name: 'SANDBAR PARTY', category: 'activities', region: 'leonida-keys', x: 770, y: 585,
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/sandbar',
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
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/airboat',
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
]

// ---------------- EASTER EGGS ----------------
export const easterEggs = [
  {
    slug: 'panther-mural', name: 'PANTHER MURAL', status: 'confirmed',
    sourceName: 'Extended Look', sourceUrl: 'https://example.com/panther',
    publishedAt: '2026-08-20', updatedAt: '2026-08-27',
    image: IMG.neon, location: 'panther-mural', region: 'VICE CITY',
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
    image: IMG.keys, location: 'sunken-wreck', region: 'LEONIDA KEYS',
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
    image: IMG.police2, location: 'ghost-signal-mast', region: 'PORT GELLHORN',
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
    image: IMG.neon2, location: 'gator-shack', region: 'GRASSRIVERS',
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
    publishedAt: '2026-08-21', updatedAt: '2026-08-26', image: IMG.ferris2,
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
    publishedAt: '2026-08-17', updatedAt: '2026-08-24', image: IMG.skyline,
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
    publishedAt: '2026-08-12', updatedAt: '2026-08-20', image: IMG.pistol,
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
    status: 'confirmed', sourceName: 'Extended Look', sourceUrl: 'https://example.com/guide-panther',
    publishedAt: '2026-08-22', updatedAt: '2026-08-27', image: IMG.neon,
    summary: 'The two confirmed sightings and where the third clue probably hides.',
    steps: [
      'Open the map and select VICE CITY, then the SECRETS filter.',
      'The mural marker sits two blocks west of the Little Haiti market.',
      'Compare the stencil with the market alley instance — the tail curl differs.',
      'The third instance is rumoured near the Gellhorn rail yard. Treat as RUMOUR.',
    ],
  },
]

// ---------------- LOOKUP HELPERS ----------------
export const bySlug = (arr, slug) => arr.find((x) => x.slug === slug)
export const characterBySlug = (slug) => characters.find((c) => c.slug === slug)
export const relationshipsFor = (slug) => relationships.filter((r) => r.a === slug || r.b === slug)
