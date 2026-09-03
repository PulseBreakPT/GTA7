// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Statistics',
  description: 'What the archive holds, counted from the entries: branches, source labels, stubs and names cited but not yet written.',
  alternates: { canonical: '/wiki/statistics' },
  openGraph: { title: 'Statistics', description: 'What the archive holds, counted from the entries: branches, source labels, stubs and names cited but not yet written.', url: '/wiki/statistics' },
}

export default function Layout({ children }) {
  return children
}
