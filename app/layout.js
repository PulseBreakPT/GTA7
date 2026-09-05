import './globals.css'
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import SearchFab from '@/components/site/searchfab'
import TabBar from '@/components/site/tabbar'
import Footer from '@/components/site/footer'
import BootSequence from '@/components/site/boot-sequence'
import WikiChrome from '@/components/site/wiki-chrome'
import GlobalEffects from '@/components/site/global-effects'

const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-cond', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-mono', display: 'swap' })

const SITE = 'https://lusorae.pt'

// O título é um modelo: cada página põe o seu nome à frente e o do
// arquivo fica atrás. Sem isto, as 524 fichas partilhavam um título só —
// indistinguíveis num separador do browser, num favorito ou num
// resultado de pesquisa, que para uma wiki é o pior defeito possível.
export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'LUSORAE — The GTA VI Encyclopedia',
    template: '%s | LUSORAE',
  },
  description: 'An independent, source-labelled archive for Grand Theft Auto VI: characters, vehicles, weapons, locations, radio and mechanics — every entry carrying the source it came from.',
  applicationName: 'LUSORAE',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'LUSORAE',
    locale: 'en_GB',
    url: SITE,
    title: 'LUSORAE — The GTA VI Encyclopedia',
    description: 'Every entry carries the source it came from. An independent fan archive for Grand Theft Auto VI.',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className={`${cond.variable} ${inter.variable} ${mono.variable} lusorae-fx-root font-sans bg-ink text-paper grain min-h-screen flex flex-col`}>
        <div className="site-atmosphere" aria-hidden="true">
          <span className="site-aurora site-aurora-a" />
          <span className="site-aurora site-aurora-b" />
          <span className="site-orbit" />
        </div>
        <Providers>
          <GlobalEffects />
          <BootSequence />
          <WikiChrome />
          {/* Atalho para saltar direito ao conteúdo. Fica fora de vista
              até receber foco pelo teclado. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-paper focus:text-ink focus:font-cond focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-[13px] focus:rounded-sm"
          >
            Skip to content
          </a>
          <div className="site-frame flex-1 min-w-0 flex flex-col">
            <main id="main" tabIndex={-1} className="archive-grid flex-1 flex flex-col">{children}</main>
            {/* O espaço que a barra flutuante ocupa. Sem ele, a barra
                tapava o fim do rodapé em todas as páginas. */}
            <Footer />
            <div className="mobile-tabbar-spacer" aria-hidden="true" style={{ height: 'calc(76px + max(0.75rem, env(safe-area-inset-bottom)))' }} />
          </div>
          <SearchFab />
          <TabBar />
        </Providers>
      </body>
    </html>
  )
}
