// Título e descrição próprios desta rota. Sem isto a página herdava o
// «Wiki Main Page» do layout da wiki, e o índice completo servia-se ao
// leitor e aos motores de busca com o nome da página de entrada.
export const metadata = {
  title: 'All pages',
  description: 'Every entry the GTA LORE archive holds, indexed by first letter and filterable by branch.',
  alternates: { canonical: '/wiki/all' },
  openGraph: { title: 'All pages', description: 'The complete index of the GTA LORE archive, one drawer at a time.', url: '/wiki/all' },
}

export default function Layout({ children }) {
  return children
}
