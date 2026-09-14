import { easterEggs } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = easterEggs.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.name
  const description = item.desc || item.summary

  return {
    title: `${name} — GTA VI secret`,
    description,
    alternates: { canonical: `/easter-eggs/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA VI secret`,
      description,
      url: `/easter-eggs/${slug}`,
      
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  if (!easterEggs.some((item) => item.slug === slug)) notFound()
  return children
}
