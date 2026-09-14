import { regions } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = regions.find((x) => x.id === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.label
  const description = item.blurb

  return {
    title: `${name} — Leonida region`,
    description,
    alternates: { canonical: `/map/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — Leonida region`,
      description,
      url: `/map/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = regions.find((x) => x.id === slug)
  if (!item) notFound()

  const path = `/map/${slug}`
  const dados = entryJsonLd({
    name: item.label,
    description: item.blurb || null,
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
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Locations', path: '/map' }, { name: item.label }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
