// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Characters', template: '%s | GTA LORE WIKI' },
  description: 'The named cast of Grand Theft Auto VI, with roles and documented relationships.',
  alternates: { canonical: '/database/characters' },
  openGraph: { title: 'Characters', description: 'The named cast of Grand Theft Auto VI, with roles and documented relationships.', url: '/database/characters' },
}

export default function Layout({ children }) {
  return children
}
