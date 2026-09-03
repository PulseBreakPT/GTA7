import { radioStations } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = radioStations.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc

  return {
    title: `${name} — GTA VI radio station`,
    description,
    alternates: { canonical: `/database/radio/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI radio station`,
      description,
      url: `/database/radio/${slug}`,
      
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = radioStations.find((x) => x.slug === slug)
  if (!item) return children

  const path = `/database/radio/${slug}`
  const dados = entryJsonLd({
    name: item.name,
    description: item.desc || null,
    path,
    image: null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
    kind: 'RadioStation',
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'Radio', path: '/database/radio' }, { name: item.name }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
