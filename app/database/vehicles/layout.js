// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Vehicles', template: '%s | GTA LORE WIKI' },
  description: 'Every vehicle Rockstar has named for Grand Theft Auto VI, by class and manufacturer.',
  alternates: { canonical: '/database/vehicles' },
  openGraph: { title: 'Vehicles', description: 'Every vehicle Rockstar has named for Grand Theft Auto VI, by class and manufacturer.', url: '/database/vehicles' },
}

export default function Layout({ children }) {
  return children
}
