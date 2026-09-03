// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Sources',
  description: 'Every source the archive cites, and exactly which entries rest on it.',
  alternates: { canonical: '/sources' },
  openGraph: { title: 'Sources', description: 'Every source the archive cites, and exactly which entries rest on it.', url: '/sources' },
}

export default function Layout({ children }) {
  return children
}
