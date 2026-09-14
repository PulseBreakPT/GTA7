import { factions } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = factions.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc

  return {
    title: `${name} — GTA VI faction`,
    description,
    alternates: { canonical: `/gangs-factions/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI faction`,
      description,
      url: `/gangs-factions/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = factions.find((x) => x.slug === slug)
  if (!item) notFound()

  const path = `/gangs-factions/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.desc || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Organization',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Factions', path: '/gangs-factions' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
