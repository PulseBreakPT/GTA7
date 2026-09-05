// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Visual places atlas', template: '%s | GTA LORE WIKI' },
  description: 'A coordinate-free, source-labelled visual atlas of Leonida, its six named regions and every documented place.',
  alternates: { canonical: '/map' },
  openGraph: { title: 'Visual places atlas', description: 'Leonida regions and named locations illustrated only with published GTA VI imagery.', url: '/map' },
}

export default function Layout({ children }) {
  return children
}
