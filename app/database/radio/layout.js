// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'Radio stations', template: '%s | GTA LORE' },
  description: 'Radio-station evidence, Rockstar-published music appearances and clearly labelled community rumours.',
  alternates: { canonical: '/database/radio' },
  openGraph: { title: 'Radio stations and music', description: 'Radio evidence and music sightings for Grand Theft Auto VI.', url: '/database/radio' },
}

export default function Layout({ children }) {
  return children
}
