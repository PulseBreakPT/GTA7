// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'All categories',
  description: 'Every category the archive files entries under, with how many entries each one holds.',
  alternates: { canonical: '/wiki/categories' },
  openGraph: { title: 'All categories', description: 'Every category the archive files entries under, with how many entries each one holds.', url: '/wiki/categories' },
}

export default function Layout({ children }) {
  return children
}
