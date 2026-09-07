import { JsonLd, breadcrumbJsonLd, entryJsonLd } from '@/lib/jsonld'
import { worldEntries, worldEntryBySlug } from '@/lib/world-content'

export function generateStaticParams() {
  return worldEntries.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = worldEntryBySlug(slug)
  if (!item) return { title: 'Record not found' }
  return {
    title: `${item.name} — ${item.type}`,
    description: item.summary,
    alternates: { canonical: `/database/world/${slug}` },
    openGraph: { type: 'article', title: item.name, description: item.summary, url: `/database/world/${slug}`, images: [item.image] },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = worldEntryBySlug(slug)
  if (!item) return children
  const path = `/database/world/${slug}`
  return <>
    <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Wiki', path: '/wiki' }, { name: 'World', path: '/database/world' }, { name: item.name }])} />
    <JsonLd data={entryJsonLd({ name: item.name, description: item.summary, path, image: item.image, updatedAt: item.updatedAt, publishedAt: item.publishedAt, sourceName: item.sourceName, sourceUrl: item.sourceUrl, kind: item.type })} />
    {children}
  </>
}
