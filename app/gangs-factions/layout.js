// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Gangs and factions', template: '%s | GTA LORE' },
  description: 'Organised groups named in official Grand Theft Auto VI material.',
  alternates: { canonical: '/gangs-factions' },
  openGraph: { title: 'Gangs and factions', description: 'Organised groups named in official Grand Theft Auto VI material.', url: '/gangs-factions' },
}

export default function Layout({ children }) {
  return children
}
