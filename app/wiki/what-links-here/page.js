import { Suspense } from 'react'
import WhatLinksHereClient from './links-client'

export const metadata = {
  title: 'What links here',
  description: 'Inspect incoming and outgoing links for a GTA Lore Wiki archive entry.',
  robots: { index: false, follow: true },
}

export default function WhatLinksHerePage() {
  return <Suspense fallback={null}><WhatLinksHereClient /></Suspense>
}
