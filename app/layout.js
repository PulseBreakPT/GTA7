import './globals.css'
import { Barlow_Condensed, Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/site/header'
import Sidebar from '@/components/site/sidebar'
import Footer from '@/components/site/footer'

const cond = Barlow_Condensed({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-cond', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-mono', display: 'swap' })

export const metadata = {
  title: 'LEONIDA ARCHIVE — Independent GTA VI Fan Database',
  description: 'News, characters, vehicles, weapons and secrets in one archive. Independent fan project.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className={`${cond.variable} ${inter.variable} ${mono.variable} font-sans bg-ink text-paper grain min-h-screen flex`}>
        <Providers>
          <Sidebar />
          <div className="flex-1 min-w-0 flex flex-col">
            <Header />
            <main className="archive-grid flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
