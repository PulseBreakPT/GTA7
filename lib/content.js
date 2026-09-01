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

  // Armamento e equipamento
  weaponPattern: '/media/gear/weapon-pattern.webp',
  pistolPalms: '/media/gear/pistol-palms.webp',
  oceanView: '/media/gear/ocean-view.webp',
  docksCrew: '/media/gear/docks-crew.webp',
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
    category: 'official', status: 'confirmed',
    sourceName: 'PlayStation Store listing', sourceUrl: 'https://www.playstation.com/en-us/games/grand-theft-auto-vi/',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 6,
    image: IMG.stanierSide, featured: false, views: 0,
    excerpt: 'Two editions, one pre-order pack, and no microtransactions at launch. The differences, without the storefront language.',
    body: [
      'The Standard Edition is listed at $79.99 and the Ultimate Edition at $99.99. The twenty dollars buys the Ultimate Edition Upgrade: extra clothing, hairstyles, tattoos, vehicles, weapons, locations and missions inside the single-player game.',
      'The Vintage Vice City Pack comes with a pre-order on either edition. It is a cosmetic set built out of the 2002 Vice City — the artwork for it leans on Tommy Vercetti’s era rather than on anything from the new story. Both editions also carry one month of GTA+.',
      'The detail worth keeping is the one that is easy to miss: neither edition ships with microtransactions at launch. That is a statement about the shape of the game on day one, not a promise about the years after it.',
      'Pre-orders opened on 25 June 2026. Of the orders placed, the overwhelming majority — reported at 89% — were for the Ultimate Edition, which says more about how the upgrade was priced than about what it contains.',
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
    category: 'official', status: 'confirmed',
    sourceName: 'Reception records', sourceUrl: 'https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI',
    publishedAt: '2026-09-01', updatedAt: '2026-09-01', readTime: 5,
    image: IMG.keyArtRobbery, featured: false, views: 0,
    excerpt: 'One trailer was forced out early. The other broke the records. Both are worth reading as events, not just footage.',
    body: [
      'The first trailer was not released on Rockstar’s schedule. It leaked, and Rockstar published it the same day — 4 December 2023 — rather than let a copy circulate. It took 93 million views on the first day and had passed 268 million by November 2025.',
      'The second, on 6 May 2025, was released on Rockstar’s own terms and did roughly 475 million views across platforms inside a day. It went on to take Best Game Trailer at the 2025 Golden Joystick Awards.',
      'The contrast is the story. A studio that has released two pieces of footage in three years has made scarcity part of how the game is presented — and the leak of the first one is the exception that shows the rule.',
    ],
  },
  {
    slug: 'extended-look-everything-revealed',
    title: 'EXTENDED LOOK: EVERYTHING REVEALED',
    category: 'analysis', status: 'analysis',
    sourceName: 'Leonida Archive Editorial', sourceUrl: 'https://example.com/extended-look',
    publishedAt: '2026-08-27', updatedAt: '2026-08-27', readTime: 12,
    image: IMG.ambrosiaParty, featured: true, views: 48210,
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
  W('compact-pistol', 'COMPACT PISTOL', 'handgun', 15, 85, [46, 62, 58, 42, 15, 0.8], 'confirmed', IMG.pistolPalms, 'Seen during the getaway in Vice City.', ['Vice City – Little Haiti', 'Vice City – Vice Point']),
  W('tactical-pistol', 'TACTICAL PISTOL', 'handgun', 17, 102, [52, 58, 66, 48, 17, 1.0], 'confirmed', IMG.oceanView, 'Standard issue sidearm carried by private security crews.'),
  W('.38-revolver', '.38 REVOLVER', 'handgun', 6, 72, [71, 30, 62, 40, 6, 1.1], 'confirmed', IMG.tattooNeon, 'A classic wheel gun spotted in the pawn shop scene.'),
  W('heavy-pistol', 'HEAVY PISTOL', 'handgun', 12, 72, [64, 44, 60, 46, 12, 1.2], 'confirmed', IMG.weaponPattern, 'High-calibre sidearm documented in the marina shootout.'),
  W('combat-pistol', 'COMBAT PISTOL', 'handgun', 15, 90, [55, 60, 64, 47, 15, 0.9], 'verified', IMG.pistolPalms, 'Frame analysis places it in the second convenience store scene.'),
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
  V('bravado-gauntlet', 'BRAVADO GAUNTLET', 'muscle', [88, 76, 62, 70], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.stanierTail, '001', 'May spawn in the covered parking structure near Ocean Drive.', 'OCEAN BEACH · 0.8 MI'),
  V('declasse-tampa', 'DECLASSE TAMPA', 'muscle', [82, 80, 58, 66], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.stanierSide, '002', 'Regularly parked outside the Little Haiti body shop.', 'LITTLE HAITI · 1.2 MI'),
  V('vapid-dominator', 'VAPID DOMINATOR', 'muscle', [86, 78, 64, 72], ['2 DOORS','2 SEATS','RWD','V8'], 'confirmed', IMG.stanierCrew, '003', 'Seen circling the Vice Point strip after dark.', 'VICE POINT · 2.1 MI'),
  V('imponte-phoenix', 'IMPONTE PHOENIX', 'muscle', [80, 74, 60, 64], ['2 DOORS','2 SEATS','RWD','V8'], 'verified', IMG.greenCoupe, '004', 'Frame analysis places it near the Grassrivers gas station.', 'GRASSRIVERS · 6.4 MI'),
  V('declasse-sabre-turbo', 'DECLASSE SABRE TURBO', 'muscle', [84, 82, 56, 62], ['2 DOORS','2 SEATS','RWD','V8'], 'verified', IMG.docksCrew, '005', 'Verified spawn at the Port Gellhorn dry dock lot.', 'PORT GELLHORN · 9.8 MI'),
  V('albany-buccaneer', 'ALBANY BUCCANEER', 'muscle', [76, 68, 54, 58], ['2 DOORS','4 SEATS','RWD','V8'], 'confirmed', IMG.deviantFlag, '006', 'Classic lines, spotted along the Ocean Drive strip.', 'OCEAN DRIVE · 0.4 MI'),
  V('ocelot-jackal-gt', 'OCELOT JACKAL GT', 'sports', [92, 88, 74, 84], ['2 DOORS','2 SEATS','AWD','V10'], 'verified', IMG.stanierNight, '007', 'Rumoured dealership showcase in downtown Vice City.', 'DOWNTOWN · 1.6 MI'),
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
    status: 'verified', sourceName: 'Trailer 2 frame analysis', sourceUrl: 'https://example.com/drequan',
    publishedAt: '2026-05-06', updatedAt: '2026-08-20',
    image: IMG.drequanPriest,
    bio: 'Always more hustler than gangster. Music was the point all along.',
    long: 'Dre’Quan dealt on the street to pay for the thing he actually wanted, which was a way into music. He ran Only Raw Records with Boobie from the bottom up, booking acts into the Jack of Hearts to keep the lights on. Signing the Real Dimez is his attempt to stop being the man who books the room and start being the man who fills it.',
  },
  {
    slug: 'raul-bautista', name: 'RAUL BAUTISTA', role: 'RIVAL', group: 'rivals',
    status: 'rumour', sourceName: 'Community report', sourceUrl: 'https://example.com/raul',
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
    image: IMG.viceCity, sourced: true,
    blurb: 'The money and the noise. Art deco frontage on Ocean Beach, bakeries in Little Cuba, near-genuine labels at the Tisha-Wocka market, and a port that sells itself as the cruise capital of the world.' },
  { id: 'leonida-keys', label: 'LEONIDA KEYS', cx: 740, cy: 540, k: 1.8,
    image: IMG.leonidaKeys, sourced: true,
    blurb: 'An archipelago that runs on deck chairs and open bars. Nothing here is flashy and nothing is in a hurry — which is easy to mistake for safe, given what the surrounding water is used for.' },
  { id: 'port-gellhorn', label: 'PORT GELLHORN', cx: 230, cy: 140, k: 1.8,
    image: IMG.portGellhorn, sourced: true,
    blurb: 'The coast Leonida stopped advertising. The motels are cheap, the attractions are shuttered and the strip malls are empty — but something replaced the tourist trade, and it runs on malt liquor, painkillers and truck-stop caffeine. Dirt bikes, and keep a hand on your wallet.' },
  { id: 'grassrivers', label: 'GRASSRIVERS', cx: 240, cy: 420, k: 1.6,
    image: IMG.grassrivers, sourced: true,
    blurb: 'Wetland that predates everything around it and refuses to be managed. The alligators are the draw, but they are not the top of the food chain here — and what the mangroves hide is stranger than what they eat.' },
  // Ambrosia é descrita como o coração do estado e Mount Kalaga como
  // encostada à fronteira norte — as duas únicas pistas geográficas que a
  // Rockstar dá, e são elas que fixam estas posições.
  { id: 'ambrosia', label: 'AMBROSIA', cx: 430, cy: 290, k: 1.7,
    image: IMG.ambrosia, sourced: true,
    blurb: 'Inland Leonida, where American industry and old-fashioned values are defended at whatever price they cost. The Allied Crystal sugar refinery supplies the work; the local biker club supplies more or less everything else.' },
  { id: 'mount-kalaga', label: 'MOUNT KALAGA', cx: 430, cy: 120, k: 1.7,
    image: IMG.mountKalaga, sourced: true,
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
]

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
    [pad(articles.length), 'NEWS'],
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
