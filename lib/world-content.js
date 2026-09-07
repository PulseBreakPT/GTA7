// World index: subjects that belong to Leonida but are not characters,
// vehicles, weapons or mechanics.  Names discovered through community
// catalogues are never exposed as third-party citations: a record links to
// Rockstar only when the subject is visible or named in released material.

const RS = 'https://www.rockstargames.com/VI'
const RS_MEDIA = 'https://www.rockstargames.com/VI/media'

const contextImages = {
  'Vice City': '/media/places/vice-city.webp',
  'Port Gellhorn': '/media/places/port-gellhorn.webp',
  'Leonida Keys': '/media/places/leonida-keys.webp',
  Grassrivers: '/media/places/grassrivers.webp',
  Ambrosia: '/media/places/ambrosia.webp',
  'Mount Kalaga': '/media/places/mount-kalaga.webp',
  Marine: '/media/scenes/swamp-airboat.webp',
  Wildlife: '/media/scenes/swamp-gator.webp',
  Police: '/media/vehicles/stanier-crew.webp',
  Media: '/media/characters/real-dimez.webp',
  Weapons: '/media/gear/weapon-variants.webp',
  Vehicles: '/media/vehicles/rideout-customs.webp',
  Fashion: '/media/editions/stock-305.webp',
  Hospitality: '/media/scenes/keys-bar.webp',
  Industry: '/media/locations/wiki/port-vice-city.webp',
  Default: '/media/key-art/jason-lucia-car.webp',
}

const slugify = (value) => String(value).toLowerCase().normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const record = ({ name, branch, type, region = 'Leonida', summary, details = [], image, imageContext, status = 'verified', source = RS_MEDIA, sourceName = 'Rockstar Games · GTA VI media' }) => ({
  slug: slugify(name), name: name.toUpperCase(), branch, type, region, summary,
  details, image: image || contextImages[imageContext || region] || contextImages.Default,
  imageCaption: imageContext
    ? `Official Rockstar ${imageContext.toLowerCase()} context; used as regional evidence, not as an isolated identification.`
    : `Official Rockstar imagery associated with ${region}.`,
  status, sourceName, sourceUrl: source, publishedAt: '2026-09-06', updatedAt: '2026-09-06',
})

const animal = (name, type, region, note, imageContext = 'Wildlife') => record({
  name, branch: 'wildlife', type, region, imageContext,
  summary: `${name} are documented as part of Grand Theft Auto VI's wildlife record. ${note}`,
  details: [
    `Classification: ${type}.`,
    `Recorded habitat or sighting context: ${region}.`,
    'The archive distinguishes a visible species from any unannounced hunting, taming or transformation mechanic.',
  ],
})

export const wildlife = [
  animal('Alligators', 'Reptile · land and water', 'Grassrivers', 'They are repeatedly visible in Rockstar footage and imagery.', 'Wildlife'),
  animal('Cats', 'Mammal · domestic', 'Vice City', 'Domestic cats appear in released urban material.', 'Vice City'),
  animal('Cougars', 'Mammal · predator', 'Mount Kalaga', 'The mountain wilderness provides the documented setting context.', 'Mount Kalaga'),
  animal('Dogs', 'Mammal · domestic', 'Leonida', 'Dogs are visible around populated areas in released material.', 'Vice City'),
  animal('Dolphins', 'Mammal · aquatic', 'Leonida coast', 'They belong to the marine-life record visible around Leonida.', 'Marine'),
  animal('Double-crested cormorants', 'Bird · coastal', 'Leonida coast', 'The species is catalogued from coastal imagery.', 'Marine'),
  animal('Ducks', 'Bird · aquatic', 'Leonida wetlands', 'Two ducks are visible in the first official trailer.', 'Wildlife'),
  animal('Eels', 'Fish · aquatic', 'Leonida waters', 'The record is limited to species presence; player interaction is not published.', 'Marine'),
  animal('Fish', 'Aquatic wildlife', 'Leonida waters', 'Fish are visible across coastal and wetland material.', 'Marine'),
  animal('Flamingos', 'Bird · wading', 'Grassrivers', 'Flamingos are prominently visible in the first official trailer.', 'Wildlife'),
  animal('Foxes', 'Mammal · land', 'Mount Kalaga', 'They are associated with the northern wilderness record.', 'Mount Kalaga'),
  animal('Iguanas', 'Reptile · land', 'Leonida Keys', 'They are associated with the tropical Keys environment.', 'Leonida Keys'),
  animal('Killer whales', 'Mammal · aquatic', 'Atlantic coast', 'An orca is visible at the opening of the first official trailer.', 'Marine'),
  animal('Raccoons', 'Mammal · land', 'Leonida', 'They form part of the state wildlife catalogue.', 'Grassrivers'),
  animal('Sea turtles', 'Reptile · aquatic', 'Leonida coast', 'They are catalogued in the coastal wildlife record.', 'Marine'),
  animal('Seagulls', 'Bird · coastal', 'Vice City coast', 'They appear around the urban coastline.', 'Vice City'),
  animal('Sharks', 'Fish · predator', 'Atlantic coast', 'Sharks are part of the released marine-life imagery.', 'Marine'),
  animal('Snakes', 'Reptile · land', 'Leonida', 'A snake can be seen in a cage in released material.', 'Wildlife'),
  animal('Squirrels', 'Mammal · land', 'Mount Kalaga', 'They are catalogued with the northern wilderness fauna.', 'Mount Kalaga'),
]

const organisation = (name, type, region, summary, imageContext = 'Police', status = 'verified') => record({
  name, branch: 'organizations', type, region, imageContext, status,
  summary,
  details: [
    `${name} is indexed separately from gangs so civic, sporting and enforcement bodies remain easy to distinguish.`,
    'Jurisdiction, leadership and gameplay authority are left unpublished unless Rockstar has shown or named them.',
  ],
})

export const organizations = [
  organisation('Ambrosia County Sheriff', 'County law enforcement', 'Ambrosia', 'The sheriff service associated with Ambrosia County.'),
  organisation('American Football Federation', 'Sports governing body', 'Leonida', 'An American-football organization identified in the GTA VI world record.', 'Vice City'),
  organisation('Leonard County Sheriff', 'County law enforcement', 'Leonard County', 'The sheriff service associated with Leonard County.'),
  organisation('Leonida Department of Corrections', 'Corrections agency', 'Leonida', 'The state corrections body connected to Leonida Penitentiary.', 'Police'),
  organisation('Port Gellhorn Police Department', 'Municipal police', 'Port Gellhorn', 'The police department serving Port Gellhorn.', 'Police'),
  organisation('Protection of Animals & Controlled Hunting', 'Wildlife authority', 'Leonida', 'A wildlife and controlled-hunting body identified in released world material.', 'Wildlife'),
  organisation('SERA', 'Public agency', 'Leonida', 'A Leonida organization whose expanded remit has not been published.', 'Vice City', 'analysis'),
  organisation('Unnamed Leonida Highway Patrol', 'Highway patrol', 'Leonida', 'An unnamed road-policing agency visible in the wider enforcement record.', 'Police', 'verified'),
  organisation('Vice Beach Police Department', 'Municipal police', 'Vice Beach', 'The police department serving Vice Beach.', 'Police'),
  organisation('Vice City Mambas', 'Sports team', 'Vice City', 'A Vice City sports organization in the HD Universe.', 'Vice City'),
  organisation('Vice City Manatees', 'Sports team', 'Vice City', 'A Vice City sports organization identified in GTA VI world material.', 'Vice City'),
  organisation('Vice City Narcos', 'Criminal organization', 'Vice City', 'A named criminal organization associated with Vice City.', 'Vice City'),
  organisation('Vice City Police Department', 'Municipal police', 'Vice City', 'The principal police department operating in Vice City.', 'Police'),
  organisation('Vice-Dale Police Department', 'County police', 'Vice-Dale County', 'The police department operating across Vice-Dale County.', 'Police'),
]

const place = (name, type, region, summary, image, status = 'verified') => record({
  name, branch: type === 'Safehouse' ? 'safehouses' : type === 'Geography' ? 'geography' : 'establishments',
  type, region, summary, status, image,
  imageContext: image ? null : region,
  details: [
    `${name} is catalogued as a ${type.toLowerCase()} in ${region}.`,
    'Exact accessibility, services and player interactions remain unpublished unless stated in the overview.',
  ],
})

export const establishments = [
  place('Key Lento Safehouse', 'Safehouse', 'Leonida Keys', 'A two-floor stilt-house owned by Brian Heder. Jason lives there rent-free in exchange for helping with local shakedowns; Lucia later appears there with him.', '/media/characters/brian-heder.webp', 'confirmed'),
  place('Archez', 'Building', 'Vice City', 'A named Vice City building identified in released world material.'),
  place('Archipelago', 'Building', 'Vice City', 'A named Vice City complex identified in released world material.'),
  place('Cipher Mall', 'Shopping centre', 'Vice City', 'A shopping centre in Rockridge, visible in GTA VI material.'),
  place('Crescent', 'Building', 'Vice City', 'A named Vice City building identified in the city record.'),
  place('Fleeca Field', 'Stadium', 'Vice City', 'A large sporting venue carrying Fleeca branding.'),
  place('Haitian-American Cultural Center', 'Cultural centre', 'Vice City', 'A cultural institution in Vice City.'),
  place('Hoodwinks Bar', 'Bar', 'Vice City', 'A named bar in Vice City.', '/media/scenes/keys-bar.webp'),
  place("Jeudy's Food Depot", 'Food market', 'Vice City', 'A food depot serving Vice City.'),
  place('La Perle Caribbean Market', 'Market', 'Vice City', 'A Caribbean market in the La Perle district.'),
  place('Lombank Building', 'Office tower', 'Vice City', 'A Vice City office tower carrying Lombank branding.'),
  place("Lou's", 'Business premises', 'Vice City', 'A named Vice City establishment.'),
  place('Marco Wholesale Footwear', 'Wholesale store', 'Vice City', 'A footwear wholesaler in Vice City.'),
  place('Navaro Shipping Terminal', 'Shipping terminal', 'Vice City', 'A port-side freight and shipping facility.', '/media/locations/wiki/port-vice-city.webp'),
  place('NINE1NINE', 'Building', 'Vice City', 'A named high-rise building in Vice City.'),
  place('Rockridge Community Resource Center', 'Community centre', 'Vice City', 'A public-facing community facility in Rockridge.'),
  place('Shorefront Building', 'Office tower', 'Vice City', 'A prominent building on the Vice City waterfront.'),
  place("Simon's Tires", 'Automotive business', 'Vice City', 'A tyre business operating in Vice City.', '/media/vehicles/rideout-customs.webp'),
  place('The Sumerian', 'Building', 'Vice City', 'A prominent named Vice City building.'),
  place('Unnamed Vice City Amphitheater', 'Amphitheatre', 'Vice City', 'An unnamed open-air performance venue visible in Vice City.'),
  place('Unnamed Brickell-inspired Complex', 'Residential complex', 'Vice City', 'An unnamed waterfront complex inspired by Brickell architecture.'),
  place('Unnamed La Perle Auto Shop', 'Automotive business', 'Vice City', 'An unnamed auto shop in La Perle.', '/media/vehicles/rideout-customs.webp'),
  place('Unnamed La Perle Derelict Warehouse', 'Warehouse', 'Vice City', 'A derelict industrial building in La Perle.'),
  place('Unnamed Perez Art Museum-inspired Building', 'Museum', 'Vice City', 'An unnamed arts building on the Vice City waterfront.'),
  place('Unnamed Vice City Parking Garage', 'Parking structure', 'Vice City', 'A multi-storey parking structure in Vice City.'),
  place('Vice City Pawn', 'Pawn shop', 'Vice City', 'A pawn shop operating in Vice City.'),
  place("Warren Thacker Manor", 'Residence', 'Vice City', 'A named private manor in Vice City.'),
  place("What's Cooking", 'Restaurant', 'Vice City', 'A named food establishment in Vice City.', '/media/scenes/keys-bar.webp'),
  place('Burnout Scooters', 'Vehicle shop', 'Port Gellhorn', 'A scooter business in Port Gellhorn.', '/media/vehicles/rideout-customs.webp'),
  place('Port Gellhorn Car Wash', 'Car wash', 'Port Gellhorn', 'A roadside car wash in Port Gellhorn.'),
  place('Crossroad Park Minimall', 'Shopping centre', 'Port Gellhorn', 'A small commercial centre in Port Gellhorn.'),
  place('Easy Inn', 'Motel', 'Port Gellhorn', 'A low-rise roadside motel in Port Gellhorn.'),
  place('Gellhorn Roadhouse', 'Roadhouse', 'Port Gellhorn', 'A roadside hospitality venue in Port Gellhorn.', '/media/places/port-gellhorn.webp'),
  place("Hank's Waffles", 'Restaurant', 'Port Gellhorn', 'A waffle restaurant visible in the Port Gellhorn record.', '/media/places/port-gellhorn.webp'),
  place('Happy Nails', 'Nail salon', 'Port Gellhorn', 'A nail salon in Port Gellhorn.'),
  place("Mason's Shrimp Shack", 'Restaurant', 'Port Gellhorn', 'A seafood business in Port Gellhorn.', '/media/places/port-gellhorn.webp'),
  place('Port Gellhorn Pawn & Gun', 'Pawn and gun shop', 'Port Gellhorn', 'A combined pawn and firearms shop in Port Gellhorn.', '/media/gear/weapon-pattern.webp'),
  place('Unnamed Port Gellhorn Abandoned Motel', 'Motel', 'Port Gellhorn', 'An abandoned motel complex in Port Gellhorn.'),
  place('Unnamed Port Gellhorn Church', 'Church', 'Port Gellhorn', 'An unnamed church in Port Gellhorn.'),
  place('Watkins Auto Parts', 'Automotive business', 'Port Gellhorn', 'An automotive-parts retailer in Port Gellhorn.', '/media/vehicles/rideout-customs.webp'),
  place('Animal Hospital of Key Lento', 'Animal hospital', 'Leonida Keys', 'A veterinary facility in Key Lento.', '/media/locations/wiki/key-lento.webp'),
  place("Brian's Boat Works & Marina", 'Marina', 'Leonida Keys', "Brian Heder's boat yard and marina, tied to his smuggling history.", '/media/characters/brian-heder.webp', 'confirmed'),
  place("Chip's Body Shop", 'Automotive business', 'Leonida Keys', 'A vehicle body shop in the Leonida Keys.', '/media/locations/wiki/key-lento.webp'),
  place('Atlantic Ocean', 'Geography', 'Leonida coast', 'The ocean bordering Leonida and its eastern coastline.', '/media/scenes/swamp-airboat.webp', 'confirmed'),
  place('Gulf of Mexico', 'Geography', 'Leonida coast', 'The gulf bordering Leonida and the western side of the state.', '/media/places/leonida-keys.webp', 'confirmed'),
  place('Tequesta', 'Geography', 'Vice City', 'A named part of the wider Vice City urban area.'),
  place('Vice Memorial Park', 'Geography', 'Vice City', 'A named public park in Vice City.'),
  place('Vice City Artificial Islands', 'Geography', 'Vice City', 'Artificial islands visible within the Vice City coastal layout.'),
]

const television = (name, type, summary, status = 'rumour') => record({
  name, branch: 'television', type, region: 'Leonida', imageContext: 'Media', status,
  source: status === 'confirmed' ? RS_MEDIA : null,
  sourceName: status === 'confirmed' ? 'Rockstar Games · GTA VI media' : 'GTA LORE · editorial evidence record',
  summary,
  details: [
    'Television data is isolated from confirmed gameplay because much of the channel guide originates in unreleased development material.',
    'A channel number records what was observed; it does not guarantee the final launch lineup.',
  ],
})

export const televisionEntries = [
  television('Television in GTA VI', 'Media system', 'A cable-style channel guide suggests a broader television system than previous titles; final functionality is not officially published.'),
  television('Weazel News 107', 'Television channel', 'A Weazel News channel was observed at channel 107, with a local-update programme listed.'),
  television('Weazel Local Update', 'Television programme', 'A local-news programme observed in the television guide.'),
  television('CCC 108', 'Television channel', 'A probable CCC channel was observed at channel 108; the identification remains uncertain.'),
  television('CNT 109', 'Television channel', 'A probable CNT channel was observed at channel 109; the identification remains uncertain.'),
  television('MeTV 110', 'Television channel', 'A probable MeTV channel was observed at channel 110; the identification remains uncertain.'),
]

const vehicleBrands = new Set('Albany|Annis|Benefactor|Bravado|Brute|Buckingham|Canis|Classique|Declasse|Dinka|Dundreary|Emperor|Enus|Gallivanter|Grotti|HVY|Imponte|Invetero|Jobuilt|Karin|Lampadati|Maibatsu Corporation|Mammoth|MTL|Nagasaki|Obey|Ocelot|Pegassi|Pfister|Principe|Schyster|Shitzu|Speedophile|Vapid|Vulcar|Western Company|Western Motorcycle Company|Willard'.split('|'))
const mediaBrands = new Set('Conglomerated National Television|Dreyfuss Productions|Mega Noticias|Megamundo|MeTV|Only Raw Records|Richards Majestic Productions|Sound4Sound|Vice City FM|Visit Leonida|WhatUp!'.split('|'))
const fashionBrands = new Set('After Shaft|Alpha|Autograph|Backside Skateboards|Dignity|Eris|Facade|Ferruccio Tucci|Gainz|Gorge|Jacked|Lobon Sportswear|Old Gen|Perseus|Sessanta Nove|Stock 305|We Have Shoes'.split('|'))
const hospitalityBrands = new Set("Benedict Light Beer|Bite!|Blarneys Stout|Bocadillos|Cerveza Barracho|Cherenkov Vodka|ECola|FizzAzz|Flaming-Os|Flow Water|Horny's Burgers|Jester's|Lavazas|Logger Beer|Lucky Plucker|Patriot Beer|Phat Chips|Pindayho Cerveza|Pißwasser|Ragga Rum|Resaca Extra|Stronzo|Zesta".split('|'))

const classifyBusiness = (name) => {
  if (vehicleBrands.has(name)) return ['Vehicle manufacturer', 'Vehicles']
  if (mediaBrands.has(name)) return ['Media and communications', 'Media']
  if (fashionBrands.has(name)) return ['Fashion and retail', 'Fashion']
  if (hospitalityBrands.has(name)) return ['Food, drink and hospitality', 'Hospitality']
  if (/Oil|Gas|Shipping|Construction|Waste|Crystal|Bilgeco|Jetsam|Boxtrax|GoPostal|Lando|Lombank|Bank|Insurance|Ammu|Arms|Ammunition/i.test(name)) return ['Industry and services', 'Industry']
  return ['Brand or business', 'Vice City']
}

// The business directory is deliberately compact: it records every name as
// a searchable entry while detailed buildings above carry location-specific
// facts.  This avoids pretending that a logo in the background is a fully
// documented shop players can enter.
const BUSINESS_NAMES = `24/7|420 Rolling Papers|After Shaft|Air Herler|Airaide|Airgator Airboats|Albany|Allied Crystal|Alpha Gasoline|Alpha Sports|Ammu-Nation|Annis|Arrow Gasoline|Artek|Atomic|Autograph|Backside Skateboards|Ballfin|Beast|Benedict Light Beer|Benefactor|Bilgeco|Bite!|Blarneys Stout|Blick|Bobby Hurricane's|Bocadillos|Boxtrax|Bravado|Brute|Buckingham|Callus|Canis|Capo|Cerveza Barracho|Chacey's|Chepalle|Cherenkov Vodka|Classique|Conglomerated National Television|Crest Kayaks|Crowex|Daewang|Declasse|Demonoil|Dignity|Dinka|Dreich|Dreyfuss Productions|Duke Arms Company|Dundreary|ECola|Emperor|Enus|Eris|Facade|Farshtunken International|Ferruccio Tucci|Fixup|FizzAzz|Flaming-Os|Flow Water|Fruit|Gainz|Gallivanter|Gas Stop|Globe Oil|GoPostal|Gorge|Grease Nation|Grotti|Güffy|Halt|Hawx|Hinterland|Horny's Burgers|Household Order Bin Operations|HVY|Imponte|Impure|Invetero|Jack of Hearts|Jacked|Jester's|Jetsam|Jobuilt|John Samuels|Karin|Kinetline|Kowalski|Lampadati|Lando-Corp|Lavazas|Leonida Lottery|Liberty City Cycles|Limit|Limited Gasoline|Lobon Sportswear|Logger Beer|Lombank|LPL|LU-83|Lucky Plucker|Lucré|Lure & Reel|Lure Predator|Maibatsu Corporation|Malibu Club|Mammoth|Manman|Marbles|Mega Noticias|Megamundo|MeTV|MID|Misfire Games|MTL|Nagasaki|Navitrak|Nitrous Enhanced Drive Systems|Obey|Ocelot|Oilio|Old Gen|Only Raw Records|ONO|Patriot Beer|Pegassi|Perseus|Pfister|Phat Chips|Phix|Pindayho Cerveza|Pißwasser|Principe|Pussycat|Pîlok|Quickshop|Ragga Rum|Rearwall|Redwood Cigarettes|Resaca Extra|Richards Majestic Productions|Ride Out Customs|Rimm Paint|Rollocks Outboards|Sahara|Sauerbrey's|Schlott Construction|Schyster|Sessanta Nove|Shark|Shitzu|Shorefront|Shrewsbury|Sinfrontera National Bank|Skala|Sol Sisters|Sound4Sound|Speedophile|Stronghold Ammunition|Stronzo|Sumo|T-East|Thaw|This/That|Tiny Frank|Uncle Jack's Liquor|Unnamed GTA VI Rail Service|Val-de-Grâce|Vapeamin|Vapid|Vice City Metro Mule|Vinylism|Visit Leonida|Vulcar|Vulcar Marine|Want|Waste Transfer Services|We Have Shoes|Western Company|Western Motorcycle Company|WhatUp!|Whirlwind Insurance|Whitewolf|Whiz|Willard|Xero|Yukon|Zesta`.split('|')

export const businesses = BUSINESS_NAMES.map((name) => {
  const [type, imageContext] = classifyBusiness(name)
  return record({
    name, branch: 'businesses', type, region: 'Leonida', imageContext, status: 'analysis',
    source: null, sourceName: 'GTA LORE · editorial brand index',
    summary: `${name} is indexed as a ${type.toLowerCase()} associated with the GTA VI world. A dedicated record prevents background brands from being confused with confirmed enterable businesses.`,
    details: [
      `Directory classification: ${type}.`,
      'Player access, purchasable products, ownership and mission relevance are not assumed without a direct Rockstar statement.',
      'The accompanying image shows coherent official world context; it is not presented as an isolated photograph of the brand.',
    ],
  })
})

const seen = new Set()
export const worldEntries = [...wildlife, ...organizations, ...establishments, ...televisionEntries, ...businesses]
  .filter((item) => {
    if (seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })

export const worldBranches = [
  ['all', 'All records'], ['wildlife', 'Wildlife'], ['organizations', 'Organizations'],
  ['establishments', 'Buildings'], ['safehouses', 'Safehouses'], ['geography', 'Geography'],
  ['businesses', 'Businesses'], ['television', 'Television'],
].map(([id, label]) => ({ id, label, count: id === 'all' ? worldEntries.length : worldEntries.filter((entry) => entry.branch === id).length }))

export const worldEntryBySlug = (slug) => worldEntries.find((entry) => entry.slug === slug)
