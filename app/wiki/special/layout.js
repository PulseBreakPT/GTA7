// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Special pages',
  description: 'Indexes, counts and provenance for the GTA LORE WIKI — the views that are not entries.',
  alternates: { canonical: '/wiki/special' },
  openGraph: { title: 'Special pages', description: 'Indexes, counts and provenance for the GTA LORE WIKI — the views that are not entries.', url: '/wiki/special' },
}

export default function Layout({ children }) {
  return children
}
