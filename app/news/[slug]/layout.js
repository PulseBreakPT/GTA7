import { articles } from '@/lib/content'
import { JsonLd, breadcrumbJsonLd, entryJsonLd, articleJsonLd } from '@/lib/jsonld'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = articles.find((x) => x.slug === slug)
  if (!item) return { title: 'Record not found' }

  const name = item.title
  const description = item.excerpt

  return {
    // O sufixo da marca é posto pelo template do layout das notícias
    // (`%s | GTA LORE`). Escrevê-lo também aqui dava «… — GTA LORE | GTA
    // LORE» em todas as fichas de notícia. As outras fichas do arquivo usam
    // um sufixo que diz o que a coisa é — «— GTA VI character», «— Leonida
    // region» — e é esse o padrão que faltava aqui.
    //
    // O `openGraph.title` em baixo mantém a marca de propósito: o Next não
    // lhe aplica o template, e num cartão partilhado o nome do sítio tem de
    // viajar com o título.
    title: `${name} — GTA VI news`,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: 'article',
      title: `${name} — GTA LORE`,
      description,
      url: `/news/${slug}`,
      images: item.image ? [item.image] : undefined,
    },
  }
}

export default async function Layout({ children, params }) {
  const { slug } = await params
  const item = articles.find((x) => x.slug === slug)
  if (!item) notFound()

  const path = `/news/${slug}`
  const dados = articleJsonLd({
    title: item.title,
    description: item.excerpt || null,
    path,
    image: item.image || null,
    updatedAt: item.updatedAt || null,
    publishedAt: item.publishedAt || null,
    sourceName: item.sourceName || null,
    sourceUrl: item.sourceUrl || null,
  })

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'News', path: '/news' }, { name: item.title }])} />
      <JsonLd data={dados} />
      {children}
    </>
  )
}
