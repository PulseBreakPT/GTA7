import { guides } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = guides.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.title
  const description = item.summary

  return {
    title: `${name} — GTA VI guide`,
    description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI guide`,
      description,
      url: `/guides/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = guides.find((x) => x.slug === slug)
  if (!item) return children

  const path = `/guides/${slug}`
  const dados = articleJsonLd({
    title: item.title,
    description: item.summary || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Guides', path: '/guides' }, { name: item.title }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
