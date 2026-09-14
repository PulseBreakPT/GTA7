import { mechanics } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = mechanics.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc

  return {
    title: `${name} — GTA VI mechanic`,
    description,
    alternates: { canonical: `/database/mechanics/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI mechanic`,
      description,
      url: `/database/mechanics/${slug}`,
      
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = mechanics.find((x) => x.slug === slug)
  if (!item) notFound()

  const path = `/database/mechanics/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.desc || null,
    path,
    image: null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'Mechanic',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Mechanics', path: '/database/mechanics' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
