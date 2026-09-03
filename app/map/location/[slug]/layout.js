import { locations } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = locations.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc

  return {
    title: `${name} — Leonida location`,
    description,
    alternates: { canonical: `/map/location/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — Leonida location`,
      description,
      url: `/map/location/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = locations.find((x) => x.slug === slug)
  if (!item) return children

  const path = `/map/location/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.desc || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Place',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/map' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
