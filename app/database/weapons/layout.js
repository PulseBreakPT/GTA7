// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Weapons', template: '%s | GTA LORE WIKI' },
  description: 'Armament shown or named in official Grand Theft Auto VI material.',
  alternates: { canonical: '/database/weapons' },
  openGraph: { title: 'Weapons', description: 'Armament shown or named in official Grand Theft Auto VI material.', url: '/database/weapons' },
}

export default function Layout({ children }) {
  return children
}
