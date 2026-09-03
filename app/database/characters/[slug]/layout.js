import { characters } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = characters.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.bio || `${item.name}, ${item.role}. Source-labelled entry in the LEONIDA ARCHIVE.`

  return {
    title: `${name} — GTA VI character`,
    description,
    alternates: { canonical: `/database/characters/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI character`,
      description,
      url: `/database/characters/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = characters.find((x) => x.slug === slug)
  if (!item) return children

  const path = `/database/characters/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.bio || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Person',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Characters', path: '/database/characters' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
