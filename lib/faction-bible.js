// Faction pages use a stricter taxonomy than the legacy status badge. A
// criminal network, a record label and a social club can be important to the
// story without being a formal gang.

const CONTEXT = {
  'final-chapter-mc': {
    evidenceLevel: 'OFFICIALLY DEPICTED',
    nameState: 'Name visible in official media',
    category: 'Outlaw motorcycle club',
    area: 'Ambrosia County',
    headquarters: 'Ambrosia · exact clubhouse not published',
    founded: '1982 appears on club patches · apparent, not separately stated by Rockstar',
    identity: 'Black leather cuts, motorcycles, open-book/skeleton patch language and classic outlaw-MC iconography.',
    activities: 'Underground regional economy is strongly implied; specific businesses are not published.',
    members: 'No named members or ranks published.',
    leadership: 'Unknown — no president, road captain or sergeant-at-arms published.',
    vehicles: 'LCC Avarus and Sovereign-style motorcycles · community identification',
    weapons: 'Mustang .357 association · observed/community identification, not universal inventory',
    relationships: 'Ambrosia’s shadow economy sits alongside Allied Crystal’s legitimate employment base.',
    appearances: [['AMBROSIA MATERIAL', 'Biker members and club patches are visible in Rockstar media', 'OFFICIALLY DEPICTED'], ['PATCH DETAIL', '1982 and Final Chapter markings are readable in released imagery', 'OFFICIALLY DEPICTED']],
  },
  san4san: {
    evidenceLevel: 'OFFICIALLY DEPICTED',
    nameState: 'San4San / San 4 San / S4S variants',
    category: 'Vice City street gang',
    area: 'Vice City · Rockridge association',
    headquarters: 'Venture Apartments drug operation · exact territory not published',
    founded: 'Not published',
    identity: 'Haitian-coded street identity linked by released imagery and environmental branding to cars, music and drugs.',
    activities: 'Drug operation and street/car culture are documented; wider criminal portfolio remains unknown.',
    members: 'Raymond and Ernesto are associated with the Venture Apartments operation; ranks are unknown.',
    leadership: 'Unknown — Raymond should not be promoted to leader without a source.',
    vehicles: 'Customised-car scene and observed vehicles · community identification',
    weapons: 'No formal gang inventory published.',
    relationships: 'Possible link to Sound4Sound; record as a soft relationship, not a confirmed ownership link.',
    appearances: [['TRAILER / SOCIAL FEEDS', 'San4San branding and car culture are visible in released material', 'OFFICIALLY DEPICTED'], ['EXTENDED LOOK', 'Venture Apartments raid context is associated with Raymond and Ernesto', 'OFFICIALLY DEPICTED'], ['2022 DEVELOPMENT FOOTAGE', 'Early name corroboration; not used as the sole proof', 'DEVELOPMENT MATERIAL']],
  },
  'ptt-youngins': {
    evidenceLevel: 'OFFICIALLY NAMED',
    nameState: 'Rockstar explicitly publishes PTT Youngin$ in edition material',
    category: 'Street gang / criminal group',
    area: 'Southside Vice City',
    headquarters: 'PTT Youngin$ Compound',
    founded: 'Not published',
    identity: 'Young Southside crew identity built around a named compound and illicit-goods economy.',
    activities: 'Raidable compound, special items and contraband are explicitly associated with the edition material.',
    members: 'No named members or membership count published.',
    leadership: 'Unknown.',
    vehicles: 'No formal gang fleet published.',
    weapons: 'Customised firearms appear in promotional context; exact inventory is not published.',
    relationships: 'Connected to the wider illegal-goods economy; other alliances are unknown.',
    appearances: [['GTA VI EDITIONS', 'Rockstar names the PTT Youngin$ Compound', 'OFFICIALLY NAMED'], ['SOUTHSIDE VICE CITY', 'Compound location is stated in official/archival material', 'OFFICIALLY NAMED']],
  },
}

const NETWORKS = [
  ['Brian Heder’s smuggling network', 'CRIMINAL NETWORK', 'Keys boat-yard operation involving Brian, Lori, Jason and Cal; not a formal gang name.', 'REPORTED'],
  ['Boobie Ike’s criminal-business network', 'CRIMINAL NETWORK', 'Real estate, Jack of Hearts, music and drug-financed operations around Boobie Ike.', 'REPORTED'],
  ['Only Raw Records', 'MUSIC ORGANISATION', 'Dre’Quan Priest, Boobie Ike and Real Dimez; criminal associations do not make the label a gang.', 'REPORTED'],
  ['Raul Bautista’s robbery crew', 'PROFESSIONAL HEIST CREW', 'A crew exists around Raul’s escalating robberies; formal name and roster are unknown.', 'REPORTED'],
  ['Guardia Brothers', 'DEVELOPMENT MATERIAL', 'Name associated with early development material; final-game status is unknown.', 'DEVELOPMENT MATERIAL'],
  ['M7', 'DEVELOPMENT MATERIAL', 'Possible identifier in early development material; identity and final-game status are unknown.', 'DEVELOPMENT MATERIAL'],
  ['Far-right militia', 'DEVELOPMENT MATERIAL', 'Generic internal-style description; may refer to an event group rather than a permanent faction.', 'DEVELOPMENT MATERIAL'],
  ['The Lost MC', 'NOT CONFIRMED FOR GTA VI', 'Exists elsewhere in the HD Universe, but has no sufficient GTA VI confirmation.', 'SPECULATION'],
  ['High Rollerz Lifestyle', 'MEDIA ORGANISATION', 'Automotive magazine/social brand; not established as a gang.', 'OFFICIALLY DEPICTED'],
  ['Thrillbilly Mud Club', 'SOCIAL / MOTOR CLUB', 'Off-road and mud culture; criminal status not established.', 'OFFICIALLY DEPICTED'],
  ['Allied Crystal', 'CORPORATE POWER', 'Ambrosia employer and refinery; not a gang.', 'OFFICIALLY DEPICTED'],
  ['Megamundo', 'CORPORATE / MEDIA ORGANISATION', 'Large organisation in the Extended Look; criminal classification is not established.', 'OFFICIALLY DEPICTED'],
]

export function factionBible(faction) {
  const context = CONTEXT[faction?.slug] || {
    evidenceLevel: faction?.status === 'rumour' ? 'DEVELOPMENT MATERIAL' : 'SPECULATION',
    nameState: 'No Rockstar master-list entry',
    category: faction?.kind || 'Unclassified group',
    area: faction?.region || 'Not published',
    headquarters: 'Not published', founded: 'Not published', identity: 'Not published',
    activities: 'Not published', members: 'Not published', leadership: 'Not published',
    vehicles: 'Not published', weapons: 'Not published', relationships: 'Not published',
    appearances: [['ARCHIVE RECORD', 'No evidence strip attached yet.', 'SPECULATION']],
  }
  return { ...context, networks: NETWORKS }
}

