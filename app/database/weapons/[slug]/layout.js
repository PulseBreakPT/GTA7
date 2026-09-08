import { weapons } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = weapons.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc || `${item.name}. Source-labelled entry in the GTA LORE.`

  return {
    title: `${name} — GTA VI weapon`,
    description,
    alternates: { canonical: `/database/weapons/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI weapon`,
      description,
      url: `/database/weapons/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = weapons.find((x) => x.slug === slug)
  if (!item) return children

  const path = `/database/weapons/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.desc || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Weapon',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Weapons', path: '/database/weapons' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
