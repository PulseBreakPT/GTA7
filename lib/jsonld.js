const SITE = 'https://lusorae.pt'

// Dados estruturados para as fichas. Servem para o resultado de pesquisa
// mostrar o caminho («Home › Wiki › Vehicles › …») e perceber que a
// página descreve uma coisa concreta e não texto solto.
//
// Só se declara o que a entrada tem mesmo: sem imagem não se inventa
// imagem, sem data não se inventa data. Dados estruturados a afirmar o
// que não existe são exactamente o tipo de coisa que este arquivo evita.

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      ...(step.path ? { item: `${SITE}${step.path}` } : {}),
    })),
  }
}

export function entryJsonLd({ name, description, path, image, updatedAt, publishedAt, sourceName, sourceUrl, kind }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    ...(description ? { description: String(description).replace(/\s+/g, ' ').trim().slice(0, 300) } : {}),
    url: `${SITE}${path}`,
    ...(image ? { primaryImageOfPage: `${SITE}${image}` } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'LEONIDA ARCHIVE', url: SITE },
    ...(sourceName ? { citation: sourceUrl ? { '@type': 'CreativeWork', name: sourceName, url: sourceUrl } : sourceName } : {}),
    ...(kind ? { mainEntity: { '@type': 'Thing', name, ...(description ? { description: String(description).replace(/\s+/g, ' ').trim().slice(0, 300) } : {}) } } : {}),
  }
}

export function articleJsonLd({ title, description, path, image, publishedAt, updatedAt, sourceName, sourceUrl }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    ...(description ? { description } : {}),
    url: `${SITE}${path}`,
    ...(image ? { image: `${SITE}${image}` } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    inLanguage: 'en',
    publisher: { '@type': 'Organization', name: 'LEONIDA ARCHIVE', url: SITE },
    ...(sourceName ? { citation: sourceUrl ? { '@type': 'CreativeWork', name: sourceName, url: sourceUrl } : sourceName } : {}),
  }
}

// O bloco vai para o HTML servido. `JSON.stringify` trata das aspas, mas
// não do caso que interessa: um `</script>` dentro de uma descrição
// fecharia o bloco a meio e o resto do texto passaria a ser lido como
// marcação. Escapar o `<` fecha essa porta — o conteúdo é do repositório
// e não de quem visita, mas isto custa uma linha.
const seguro = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: seguro(data) }}
    />
  )
}
