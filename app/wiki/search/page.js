import { Suspense } from 'react'
import SearchClient from './search-client'

export const metadata = {
  title: 'Search the archive',
  description: 'Search titles, page text, categories and sources across every GTA Lore Wiki archive branch.',
  robots: { index: false, follow: true },
}

export default function SearchPage() {
  return <Suspense fallback={null}><SearchClient /></Suspense>
}
