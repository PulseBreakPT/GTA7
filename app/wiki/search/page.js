import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { SEARCH_INDEX } from '@/lib/search-index'
import SearchClient from './search-client'

export const metadata = {
  title: 'Search the archive',
  description: 'Search titles, page text, categories and sources across every GTA Lore archive branch.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/wiki/search' },
}

// A pesquisa interactiva precisa do cliente, mas a ferramenta não tem de
// esperar por ele para existir. O fallback deixou de ser `null`: o servidor
// entrega o cabeçalho e um formulário GET que funciona sem JavaScript nenhum
// — submeter recarrega /wiki/search?q=… e a versão interactiva assume o
// lugar assim que hidratar.
function SearchShell() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Special pages', href: '/wiki/special' }, { label: 'Search' }]} />
      <div className="data-rail mt-2">SPECIAL PAGE · FULL-TEXT INDEX</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Search"
          title="Search the archive"
          description="Searches canonical titles, article text, categories, source labels and address names across every archive branch."
          count={SEARCH_INDEX.length}
          countLabel="indexed pages"
        >
          <form className="mt-4 flex flex-col sm:flex-row gap-2" action="/wiki/search" method="get" role="search">
            <label className="glass-panel tech-mask-sm flex items-center gap-2 h-11 px-3 flex-1">
              <Search size={15} className="text-dim shrink-0" aria-hidden="true" />
              <input name="q" placeholder="Search titles and page text…" aria-label="Search titles and page text" className="flex-1 bg-transparent outline-none text-[13px] text-paper placeholder:text-dim min-w-0" />
            </label>
            <button type="submit" className="h-11 px-5 border border-line rounded-sm font-cond font-bold uppercase tracking-[0.14em] text-[11px] text-paper hover:border-mint transition-colors">Search</button>
          </form>
        </CategoryHeader>
      </div>

      <p className="mt-6 panel rounded-sm p-6 text-[14px] leading-relaxed text-dim">
        Enter a title, place, person, vehicle, quoted phrase or source label.
      </p>
    </div>
  )
}

export default function SearchPage() {
  return <Suspense fallback={<SearchShell />}><SearchClient /></Suspense>
}
