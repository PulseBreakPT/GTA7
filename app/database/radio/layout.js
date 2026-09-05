// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Radio stations', template: '%s | GTA LORE WIKI' },
  description: 'Stations confirmed for the Grand Theft Auto VI dial.',
  alternates: { canonical: '/database/radio' },
  openGraph: { title: 'Radio stations', description: 'Stations confirmed for the Grand Theft Auto VI dial.', url: '/database/radio' },
}

export default function Layout({ children }) {
  return children
}
