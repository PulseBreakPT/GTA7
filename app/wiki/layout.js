// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'The Wiki', template: '%s | GTA LORE' },
  description: 'Every entry in the GTA LORE, alphabetically: characters, vehicles, weapons, locations, factions, radio and mechanics.',
  alternates: { canonical: '/wiki' },
  openGraph: { title: 'The Wiki', description: 'Every entry in the GTA LORE, alphabetically: characters, vehicles, weapons, locations, factions, radio and mechanics.', url: '/wiki' },
}

export default function Layout({ children }) {
  return children
}
