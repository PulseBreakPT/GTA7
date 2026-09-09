import { vehicles } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = vehicles.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = [item.name, item.manufacturer && item.manufacturer !== 'NOT OFFICIALLY SPECIFIED' ? `by ${item.manufacturer}` : null, item.association].filter(Boolean).join(' · ') + '. Source-labelled entry in the GTA LORE.'

  return {
    title: `${name} — GTA VI vehicle`,
    description,
    alternates: { canonical: `/database/vehicles/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI vehicle`,
      description,
      url: `/database/vehicles/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = vehicles.find((x) => x.slug === slug)
  if (!item) notFound()

  const path = `/database/vehicles/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.association || item.content || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Vehicle',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Vehicles', path: '/database/vehicles' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
