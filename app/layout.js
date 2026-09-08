import './globals.css'
import localFont from 'next/font/local'
import { Providers } from './providers'
import TabBar from '@/components/site/tabbar'
import Footer from '@/components/site/footer'
import BootSequence from '@/components/site/boot-sequence'
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cond.variable} ${inter.variable} ${mono.variable} gta-lore-fx-root font-sans bg-ink text-paper grain min-h-screen flex flex-col`}>
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
          <BootSequence />
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
