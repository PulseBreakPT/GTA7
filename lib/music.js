const ROCKSTAR_TRAILER_1 = 'https://www.rockstargames.com/newswire/article/8978kok9385a82/grand-theft-auto-vi-watch-trailer-1-now'
const ROCKSTAR_TRAILER_2 = 'https://www.rockstargames.com/newswire/article/3928aaa9471o3a/grand-theft-auto-vi-watch-trailer-2-now'
const ROCKSTAR_EXTENDED_LOOK = 'https://www.rockstargames.com/newswire/article/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing'

const OFFICIAL_SOURCE_VISUALS = Object.freeze({
  'Trailer 1': {
    image: '/media/places/vice-city.webp',
    imageAlt: 'Official Rockstar artwork showing Vice City at sunset',
    imageNote: 'Official GTA VI artwork · Trailer 1 context · Not album art',
  },
  'Trailer 2': {
    image: '/media/key-art/jason-lucia-car.webp',
    imageAlt: 'Official Rockstar artwork of Jason and Lucia beside a car in Vice City',
    imageNote: 'Official GTA VI artwork · Trailer 2 context · Not album art',
  },
  'An Extended Look': {
    image: '/media/key-art/cover.webp',
    imageAlt: 'Official Rockstar Grand Theft Auto VI cover artwork',
    imageNote: 'Official GTA VI artwork · Extended Look context · Not album art',
  },
})

const track = (title, artist, evidence, appearance, sourceUrl = null) => {
  const visual = evidence === 'community-rumour' ? null : OFFICIAL_SOURCE_VISUALS[appearance]
  return {
    slug: `${title}-${artist}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, ''),
    title,
    artist,
    evidence,
    appearance,
    sourceUrl,
    image: visual?.image || null,
    imageAlt: visual?.imageAlt || null,
    imageNote: visual?.imageNote || 'No official image published for this report',
  }
}

// A Rockstar credit names the song and artist in its verified video description.
// "Published media" means the recording is audible in Rockstar-published footage,
// while the title/artist identification remains an editorial identification. It is
// not a promise that the track ships on an in-game radio station.
export const publishedMusic = [
  track('Love Is a Long Road', 'Tom Petty', 'rockstar-credit', 'Trailer 1', ROCKSTAR_TRAILER_1),
  track('Hot Together', 'The Pointer Sisters', 'rockstar-credit', 'Trailer 2', ROCKSTAR_TRAILER_2),
  track('Child Support', 'Zenglen', 'published-media', 'Trailer 2', ROCKSTAR_TRAILER_2),
  track('Everybody Have Fun Tonight', 'Wang Chung', 'published-media', 'Trailer 2', ROCKSTAR_TRAILER_2),
  track("Talkin' to Myself Again", 'Tammy Wynette', 'published-media', 'Trailer 2', ROCKSTAR_TRAILER_2),
  track('Pop Bottles', 'Birdman & Lil Wayne', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Skrilla', 'Kodak Black', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Pound Town', 'Sexyy Red & Tay Keith', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Let Your Love Flow', 'The Bellamy Brothers', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Love Bites', 'Def Leppard', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('People Are People', 'Depeche Mode', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track("But I Think It's a Dream", 'Captain & Tennille', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Cars and Girls', 'Prefab Sprout', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Off the Grid', '!!! & Mesh Pace', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Devil Woman', 'Cliff Richard', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Se Me Nota (Agárrame)', 'Chimbala & Omega', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Against All Odds (Take a Look at Me Now)', 'Phil Collins', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track("Mine O' Mine", 'Aluna & Jayda G', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
  track('Inner Light', 'Elderbrook & Bob Moses', 'published-media', 'An Extended Look', ROCKSTAR_EXTENDED_LOOK),
]

// Community reports are recorded as text only. We deliberately do not host or
// link to leaked footage/audio. Tracks already heard in published media are kept
// in the stronger evidence group above instead of being duplicated here.
export const rumouredMusic = [
  track('Bills Paid', 'DJ Khaled', 'community-rumour', 'Community report'),
  track('Carry On Wayward Son', 'Kansas', 'community-rumour', 'Community report'),
  track("For What It's Worth", 'Stevie Nicks', 'community-rumour', 'Community report'),
  track('Forever More', 'Moloko', 'community-rumour', 'Community report'),
  track("Get It Poppin'", 'Fat Joe feat. Nelly', 'community-rumour', 'Community report'),
  track('Girl', 'Myke Towers', 'community-rumour', 'Community report'),
  track('Go Insane', 'Lindsey Buckingham', 'community-rumour', 'Community report'),
  track('Herz aus Glas', 'Marianne Rosenberg', 'community-rumour', 'Community report'),
  track("I Love Rock 'n' Roll", 'Joan Jett and the Blackhearts', 'community-rumour', 'Community report'),
  track('La Cartera', 'Orquesta Harlow', 'community-rumour', 'Community report'),
  track('Million Dollar Baby', 'Tommy Richman', 'community-rumour', 'Community report'),
  track('Overpowered', 'Róisín Murphy', 'community-rumour', 'Community report'),
  track('Players', 'Coi Leray', 'community-rumour', 'Community report'),
  track('Rhinestone Cowboy', 'Glen Campbell', 'community-rumour', 'Community report'),
  track("Rock 'n' Roll Fantasy", 'Bad Company', 'community-rumour', 'Community report'),
  track('Roller', 'April Wine', 'community-rumour', 'Community report'),
  track('Symphony No. 5 — III. Allegro molto', 'Jean Sibelius', 'community-rumour', 'Community report'),
  track('Skylarking', 'Horace Andy', 'community-rumour', 'Community report'),
  track('Smile', 'Jamiroquai', 'community-rumour', 'Community report'),
  track('Sports Car', 'Tate McRae', 'community-rumour', 'Community report'),
  track('Symphony No. 6 — Allegro energico', 'Gustav Mahler', 'community-rumour', 'Community report'),
  track('The Fireman', 'George Strait', 'community-rumour', 'Community report'),
  track('Thunder Island', 'Jay Ferguson', 'community-rumour', 'Community report'),
  track('Unforgettable', 'French Montana', 'community-rumour', 'Community report'),
  track("Waymore's Blues", 'Waylon Jennings', 'community-rumour', 'Community report'),
  // Added from a community soundtrack summary (September 2026); no station
  // assignment and no official credit, so they stay community rumours.
  track('Smoke on the Water', 'Deep Purple', 'community-rumour', 'Community report'),
  track('Impact', 'SG Lewis, Robyn & Channel Tres', 'community-rumour', 'Community report'),
  track('Just Like Paradise', 'David Lee Roth', 'community-rumour', 'Community report'),
  track('Shooting Shark', 'Blue Öyster Cult', 'community-rumour', 'Community report'),
  track('Trouble', 'Lindsey Buckingham', 'community-rumour', 'Community report'),
  track('Wanderlust', 'The Weeknd', 'community-rumour', 'Community report'),
  track('HEAT', 'Tove Lo & SG Lewis', 'community-rumour', 'Community report'),
  track("Big Pimpin'", 'JAY-Z feat. UGK', 'community-rumour', 'Community report'),
  track('25/8', 'Bad Bunny', 'community-rumour', 'Community report'),
  track('Change', 'Searching', 'community-rumour', 'Community report'),
  track('Caballo Viejo', 'Roberto Torres', 'community-rumour', 'Community report'),
  track('Runaway', 'Bon Jovi', 'community-rumour', 'Community report'),
  track("Don't Send Me Away", 'Garfield Fleming', 'community-rumour', 'Community report'),
]

export const gtaViMusic = [...publishedMusic, ...rumouredMusic]

export const musicEvidence = Object.freeze({
  'rockstar-credit': {
    label: 'Rockstar credit',
    shortLabel: 'Credited',
    className: 'border-mint/45 bg-mint/10 text-mint',
  },
  'published-media': {
    label: 'Official-media appearance',
    shortLabel: 'Published media',
    className: 'border-violet/45 bg-violet/10 text-violet',
  },
  'community-rumour': {
    label: 'Community rumour',
    shortLabel: 'Rumour',
    className: 'border-pink/35 bg-pink/10 text-pink',
  },
})
