// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Editions',
  description: 'What Rockstar has confirmed in each Grand Theft Auto VI edition.',
  alternates: { canonical: '/editions' },
  openGraph: { title: 'Editions', description: 'What Rockstar has confirmed in each Grand Theft Auto VI edition.', url: '/editions' },
}

export default function Layout({ children }) {
  return children
}
