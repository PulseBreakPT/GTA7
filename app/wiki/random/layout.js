// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Random entry',
  description: 'Opens one record of the LEONIDA ARCHIVE at random.',
  alternates: { canonical: '/wiki/random' },
  openGraph: { title: 'Random entry', description: 'Opens one record of the LEONIDA ARCHIVE at random.', url: '/wiki/random' },
}

export default function Layout({ children }) {
  return children
}
