import './globals.css'
import './design-system.css'
import './archive-refresh.css'
import localFont from 'next/font/local'
import { Providers } from './providers'
import TabBar from '@/components/site/tabbar'
import Footer from '@/components/site/footer'
import WikiChrome from '@/components/site/wiki-chrome'
import GlobalEffects from '@/components/site/global-effects'

const cond = localFont({
  src: [
    { path: './fonts/barlow-condensed-400-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/barlow-condensed-500-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/barlow-condensed-600-latin.woff2', weight: '600', style: 'normal' },
    { path: './fonts/barlow-condensed-700-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cond', display: 'swap',
})
const inter = localFont({ src: './fonts/inter-latin.woff2', weight: '100 900', variable: '--font-inter', display: 'swap' })
const mono = localFont({ src: './fonts/jetbrains-mono-latin.woff2', weight: '400 700', variable: '--font-mono', display: 'swap' })

const SITE = 'https://lusorae.pt'

// The social card. Declared with an absolute URL rather than left to Next's
// file convention: convention images are resolved against the request origin,
// not `metadataBase`, which on this deployment produced a localhost URL — a
// preview no crawler can fetch. The alt text is the wordmark's own strapline.
const OG_IMAGE = {
  url: `${SITE}/brand/og-cover.png`,
  width: 1200,
  height: 630,
  alt: 'GTA LORE — the GTA VI encyclopedia',
  type: 'image/png',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // The colour the mobile browser paints its own chrome with. Matched to the
  // masthead so the bar above the logo is the same paper the logo sits on.
  themeColor: '#fffdf9',
}

// O título é um modelo: cada página põe o seu nome à frente e o do
// arquivo fica atrás. Sem isto, as 524 fichas partilhavam um título só —
// indistinguíveis num separador do browser, num favorito ou num
// resultado de pesquisa, que para uma wiki é o pior defeito possível.
export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'GTA LORE — The GTA VI Encyclopedia',
    template: '%s | GTA LORE',
  },
  description: 'An independent, source-labelled archive for Grand Theft Auto VI: characters, vehicles, weapons, locations, radio and mechanics — every entry carrying the source it came from.',
  applicationName: 'GTA LORE',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'GTA LORE',
    locale: 'en_GB',
    url: SITE,
    title: 'GTA LORE — The GTA VI Encyclopedia',
    description: 'Every entry carries the source it came from. An independent fan archive for Grand Theft Auto VI.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTA LORE — The GTA VI Encyclopedia',
    description: 'Every entry carries the source it came from. An independent fan archive for Grand Theft Auto VI.',
    images: [OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    // The font variables have to live on <html>, not only on <body>: globals.css
    // declares `--type-display` on :root as `var(--font-cond), …`, and a custom
    // property whose reference is undefined at its own element resolves to the
    // guaranteed-invalid value. Every `font:` shorthand built on it — 25 rules,
    // including the Vice City hub's headline — was being dropped whole, landing
    // at the 16px browser default.
    <html lang="en" className={`${cond.variable} ${inter.variable} ${mono.variable}`}>
      <body className={`${cond.variable} ${inter.variable} ${mono.variable} lore-design archive-refresh gta-lore-fx-root font-sans bg-ink text-paper grain min-h-screen flex flex-col`}>
        <Providers>
          {/* Atalho para saltar direito ao conteúdo. Fica fora de vista
              até receber foco pelo teclado. É o primeiro controlo da página,
              para não obrigar a atravessar toda a navegação. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-paper focus:text-ink focus:font-cond focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-[13px] focus:rounded-sm"
          >
            Skip to content
          </a>
          <GlobalEffects />
          <WikiChrome />
          <div className="site-frame flex-1 min-w-0 flex flex-col">
            <main id="main" tabIndex={-1} className="archive-grid flex-1 flex flex-col">{children}</main>
            {/* O espaço que a barra flutuante ocupa. Sem ele, a barra
                tapava o fim do rodapé em todas as páginas. */}
            <Footer />
            <div className="mobile-tabbar-spacer" aria-hidden="true" style={{ height: 'calc(76px + max(0.75rem, env(safe-area-inset-bottom)))' }} />
          </div>
          <TabBar />
        </Providers>
      </body>
    </html>
  )
}
