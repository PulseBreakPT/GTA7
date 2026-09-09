import { encyclopediaCategories } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = encyclopediaCategories.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.title
  const description = item.description

  return {
    title: `${name} — Category`,
    description,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — Category`,
      description,
      url: `/categories/${slug}`,
      
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  if (!encyclopediaCategories.some((item) => item.slug === slug)) notFound()
  return children
}
