// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Mechanics', template: '%s | GTA LORE WIKI' },
  description: 'Systems Rockstar has described or shown for Grand Theft Auto VI.',
  alternates: { canonical: '/database/mechanics' },
  openGraph: { title: 'Mechanics', description: 'Systems Rockstar has described or shown for Grand Theft Auto VI.', url: '/database/mechanics' },
}

export default function Layout({ children }) {
  return children
}
