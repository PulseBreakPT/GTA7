import { encyclopediaCategories } from '@/lib/content'

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

export default function Layout({ children }) {
  return children
}
