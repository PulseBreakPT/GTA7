// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Interactive map', template: '%s | LEONIDA ARCHIVE' },
  description: 'The map of Leonida: named regions and locations, plotted and source-labelled.',
  alternates: { canonical: '/map' },
  openGraph: { title: 'Interactive map', description: 'The map of Leonida: named regions and locations, plotted and source-labelled.', url: '/map' },
}

export default function Layout({ children }) {
  return children
}
