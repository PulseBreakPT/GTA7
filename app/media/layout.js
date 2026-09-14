// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: 'Media',
  description: 'Official artwork, Visit Leonida postcards, gameplay captures and edition stills held by the archive.',
  alternates: { canonical: '/media' },
  openGraph: { title: 'Media', description: 'Official artwork, Visit Leonida postcards, gameplay captures and edition stills held by the archive.', url: '/media' },
}

export default function Layout({ children }) {
  return children
}
