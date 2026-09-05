// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Categories', template: '%s | GTA LORE' },
  description: 'Browse the archive by subject.',
  alternates: { canonical: '/categories' },
  openGraph: { title: 'Categories', description: 'Browse the archive by subject.', url: '/categories' },
}

export default function Layout({ children }) {
  return children
}
