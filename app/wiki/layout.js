import WikiLocalNav from '@/components/site/wiki-local-nav'

export const metadata = {
  title: { default: 'Wiki Main Page', template: '%s | GTA LORE' },
  description: 'The GTA LORE encyclopedia: browse GTA VI topics, categories, recent changes, sources and every indexed page.',
  alternates: { canonical: '/wiki' },
  openGraph: { title: 'GTA LORE Wiki', description: 'Browse the GTA VI encyclopedia by topic, category, source and recent change.', url: '/wiki' },
}

export default function Layout({ children }) {
  return <><WikiLocalNav />{children}</>
}
