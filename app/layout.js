import './globals.css'
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/site/header'
import Sidebar from '@/components/site/sidebar'
import Footer from '@/components/site/footer'

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
    default: 'LEONIDA ARCHIVE — Independent GTA VI Fan Database',
    template: '%s | LEONIDA ARCHIVE',
  },
  description: 'An independent, source-labelled archive for Grand Theft Auto VI: characters, vehicles, weapons, locations, radio and mechanics — every entry carrying the source it came from.',
  applicationName: 'LEONIDA ARCHIVE',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'LEONIDA ARCHIVE',
    locale: 'en_GB',
    url: SITE,
    title: 'LEONIDA ARCHIVE — Independent GTA VI Fan Database',
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
      <body className={`${cond.variable} ${inter.variable} ${mono.variable} font-sans bg-ink text-paper grain min-h-screen flex`}>
        <Providers>
          {/* Atalho para saltar a navegação. Fica fora de vista até
              receber foco pelo teclado: quem navega por tabulação não
              tem de percorrer a lateral inteira em cada página. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-paper focus:text-ink focus:font-cond focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-[13px] focus:rounded-sm"
          >
            Skip to content
          </a>
          <Sidebar />
          <div className="flex-1 min-w-0 flex flex-col">
            <Header />
            <main id="main" tabIndex={-1} className="archive-grid flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
