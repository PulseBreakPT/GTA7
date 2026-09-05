// Título e descrição próprios desta rota. O layout não desenha nada:
// devolve os filhos tal como vêm.
export const metadata = {
  title: { default: 'News', template: '%s | GTA LORE WIKI' },
  description: 'Source-labelled reporting on Grand Theft Auto VI, separated from the archive record.',
  alternates: { canonical: '/news' },
  openGraph: { title: 'News', description: 'Source-labelled reporting on Grand Theft Auto VI, separated from the archive record.', url: '/news' },
}

export default function Layout({ children }) {
  return children
}
