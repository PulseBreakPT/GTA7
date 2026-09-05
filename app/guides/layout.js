// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Guides', template: '%s | GTA LORE WIKI' },
  description: 'Long-form breakdowns of official Grand Theft Auto VI material.',
  alternates: { canonical: '/guides' },
  openGraph: { title: 'Guides', description: 'Long-form breakdowns of official Grand Theft Auto VI material.', url: '/guides' },
}

export default function Layout({ children }) {
  return children
}
