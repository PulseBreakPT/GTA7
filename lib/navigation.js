import {
  BarChart3, BookMarked, BookOpen, Car, CircleHelp, Clock, Compass, Crosshair, CornerDownRight, Egg,
  FileText, FolderTree, Globe2, House, Images, Layers, Library, List, LogIn, Map, MapPin, Newspaper,
  Palmtree, Radio, Repeat2, Scale, Search, Shuffle, Sparkles, UserPlus, UserRound, Users, Waypoints,
} from 'lucide-react'

// O mapa de navegação do site inteiro, num sítio só. O cabeçalho, o
// rodapé, a barra do telemóvel e o directório lêem daqui: acrescentar uma
// rota aqui acrescenta-a em todo o lado, e nenhuma fica sem porta de
// entrada. As rotas de detalhe (/database/vehicles/[slug], …) entram
// pelos seus índices; as de fluxo de email (/verify-email,
// /reset-password) só fazem sentido abertas a partir do email.

export const NAV_SECTIONS = [
  {
    id: 'start',
    label: 'Start here',
    note: 'The front doors',
    tint: 'pink',
    icon: 'compass',
    links: [
      { label: 'Home', href: '/', icon: House, desc: 'Launch countdown, latest checks and featured records.' },
      { label: 'Wiki main page', href: '/wiki', icon: Library, desc: 'The encyclopedia front page with every branch.' },
      { label: 'GTA VI overview', href: '/wiki/grand-theft-auto-vi', icon: FileText, desc: 'The game itself: release, setting, protagonists.' },
      { label: 'Discover 100', href: '/wiki/discover', icon: Sparkles, desc: 'One hundred balanced routes into the archive.' },
      { label: 'Random entry', href: '/wiki/random', icon: Shuffle, desc: 'Opens one record at random.' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    note: 'Browse the records',
    tint: 'violet',
    icon: 'archive',
    links: [
      { label: 'Database overview', href: '/database', icon: Layers, desc: 'Every record branch and what it holds.' },
      { label: 'Characters', href: '/database/characters', icon: Users, desc: 'Protagonists, supporting cast and named figures.' },
      { label: 'Vehicles', href: '/database/vehicles', icon: Car, desc: 'Cars, bikes, boats and aircraft by class.' },
      { label: 'Weapons', href: '/database/weapons', icon: Crosshair, desc: 'Firearms, melee and throwables.' },
      { label: 'Radio', href: '/database/radio', icon: Radio, desc: 'Stations, hosts and songs heard.' },
      { label: 'Mechanics', href: '/database/mechanics', icon: Repeat2, desc: 'Systems, activities and gameplay features.' },
      { label: 'World', href: '/database/world', icon: Globe2, desc: 'Wildlife, brands, businesses and properties.' },
      { label: 'Gangs & factions', href: '/gangs-factions', icon: Waypoints, desc: 'Gangs, agencies and organisations.' },
      { label: 'Easter eggs', href: '/easter-eggs', icon: Egg, desc: 'Secrets, references and hidden details.' },
    ],
  },
  {
    id: 'leonida',
    label: 'Leonida',
    note: 'See the state',
    tint: 'mint',
    icon: 'place',
    links: [
      { label: 'Places atlas', href: '/map', icon: Map, desc: 'Regions and named places across Leonida.' },
      { label: 'Vice City hub', href: '/vice-city', icon: Palmtree, desc: 'Everything filed under Vice City.' },
    ],
  },
  {
    id: 'read',
    label: 'Read & watch',
    note: 'Articles and media',
    tint: 'warn',
    icon: 'news',
    links: [
      { label: 'Articles', href: '/news', icon: Newspaper, desc: 'News desk and long-form articles.' },
      { label: 'Article categories', href: '/categories', icon: FolderTree, desc: 'Articles grouped by subject.' },
      { label: 'Guides', href: '/guides', icon: BookOpen, desc: 'Reference guides and checklists.' },
      { label: 'Media gallery', href: '/media', icon: Images, desc: 'Artwork, screenshots and trailer stills.' },
      { label: 'Screenshots', href: '/screenshots', icon: Images, desc: 'Official Rockstar screenshot catalogue by group.' },
      { label: 'Editions', href: '/editions', icon: Layers, desc: 'Editions, pre-order bonuses and prices.' },
    ],
  },
  {
    id: 'indexes',
    label: 'Indexes & tools',
    note: 'Find anything',
    tint: 'violet',
    icon: 'search',
    links: [
      { label: 'Full search', href: '/wiki/search', icon: Search, desc: 'Search titles, text, categories and sources.' },
      { label: 'Go to page', href: '/wiki/go', icon: CornerDownRight, desc: 'Type a name and jump straight to its entry.' },
      { label: 'Topic portals', href: '/wiki/portals', icon: Compass, desc: 'A gateway for every branch of the archive.' },
      { label: 'Wiki categories', href: '/wiki/categories', icon: FolderTree, desc: 'Every category entries are filed under.' },
      { label: 'A–Z index', href: '/wiki/all', icon: List, desc: 'Every page by first letter.' },
      { label: 'Glossary', href: '/wiki/glossary', icon: BookMarked, desc: 'What each label and term means.' },
      { label: 'Special pages', href: '/wiki/special', icon: Sparkles, desc: 'Indexes, counts and maintenance lists.' },
    ],
  },
  {
    id: 'about',
    label: 'About the archive',
    note: 'Verify and follow',
    tint: 'mint',
    icon: 'evidence',
    links: [
      { label: 'Sources', href: '/sources', icon: BookMarked, desc: 'Every source cited and what rests on it.' },
      { label: 'Recent changes', href: '/wiki/changes', icon: Clock, desc: 'Entries by the date they were last checked.' },
      { label: 'Statistics', href: '/wiki/statistics', icon: BarChart3, desc: 'What the archive holds, counted.' },
      { label: 'Reading guide', href: '/wiki/help', icon: CircleHelp, desc: 'How an entry is built and keyboard shortcuts.' },
      { label: 'Legal centre', href: '/legal', icon: Scale, desc: 'Terms, privacy, cookies and copyright.' },
      { label: 'Site directory', href: '/directory', icon: MapPin, desc: 'Every section and page on one screen.' },
    ],
  },
]

export const ACCOUNT_LINKS = [
  { label: 'Account', href: '/account', icon: UserRound, desc: 'Watchlist, collections, notes and preferences.' },
  { label: 'Sign in', href: '/login', icon: LogIn, desc: 'Sign in to follow pages and keep notes.' },
  { label: 'Create account', href: '/login?mode=register', icon: UserPlus, desc: 'Register a free reader account.' },
]

export const sectionById = (id) => NAV_SECTIONS.find((section) => section.id === id)

// O rodapé e a folha do telemóvel mostram as mesmas secções em três
// colunas; juntam-se aqui para que não haja uma segunda lista a manter.
const merge = (label, note, tint, icon, ids) => ({
  label, note, tint, icon,
  links: ids.flatMap((id) => sectionById(id).links),
})

export const NAV_COLUMNS = [
  merge('Encyclopedia', 'Browse the records', 'violet', 'archive', ['database']),
  merge('Explore', 'See Leonida and read', 'pink', 'compass', ['start', 'leonida', 'read']),
  merge('Archive desk', 'Find, verify, navigate', 'mint', 'evidence', ['indexes', 'about']),
]

export const isActiveHref = (pathname, href) => {
  const path = href.split('?')[0]
  return path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)
}

// Numa rota como /database/vehicles acendem dois links por prefixo
// (/database e /database/vehicles); só o mais específico conta.
const ALL_HREFS = [...NAV_SECTIONS.flatMap((section) => section.links), ...ACCOUNT_LINKS].map((link) => link.href.split('?')[0])
export const closestHref = (pathname) => ALL_HREFS
  .filter((href) => isActiveHref(pathname, href))
  .sort((a, b) => b.length - a.length)[0]
