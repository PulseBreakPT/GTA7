const SITE = 'https://lusorae.pt'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // A entrada aleatória devolve uma página diferente a cada visita.
        // Deixá-la ser rastreada só produz conteúdo duplicado sem endereço
        // estável por trás.
        disallow: ['/wiki/random'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
