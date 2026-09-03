// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Recent changes',
  description: 'Every entry by the date it was last checked against its source.',
  alternates: { canonical: '/wiki/changes' },
  openGraph: { title: 'Recent changes', description: 'Every entry by the date it was last checked against its source.', url: '/wiki/changes' },
}

export default function Layout({ children }) {
  return children
}
