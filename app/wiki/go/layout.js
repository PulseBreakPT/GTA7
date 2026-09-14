// Como em /wiki/all: sem metadata própria esta rota apresentava-se como
// «Wiki Main Page».
export const metadata = {
  title: 'Go to an entry',
  description: 'Open a GTA LORE archive record directly by name, or see the nearest indexed matches.',
  alternates: { canonical: '/wiki/go' },
  robots: { index: false, follow: true },
  openGraph: { title: 'Go to an entry', description: 'Open a GTA LORE archive record directly by name.', url: '/wiki/go' },
}

export default function Layout({ children }) {
  return children
}
