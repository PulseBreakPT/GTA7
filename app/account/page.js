import { redirect } from 'next/navigation'
import { currentAuth, publicUser, sessionView } from '@/lib/server/auth'
import { entryFor } from '@/lib/wiki-graph'
import AccountClient from './account-client'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Your account', robots: { index: false, follow: false } }

export default async function AccountPage({ searchParams }) {
  const auth = await currentAuth()
  if (!auth) redirect('/login?next=/account')
  const query = await searchParams
  const sections = new Set(['overview', 'watchlist', 'collections', 'notes', 'contributions', 'notifications', 'preferences', 'security', 'sessions', 'activity'])
  const target = entryFor(String(query?.kind || ''), String(query?.slug || ''))
  return <AccountClient
    initialUser={publicUser(auth.user)}
    initialSession={sessionView(auth.session, auth.session.id)}
    initialSection={sections.has(query?.section) ? query.section : 'overview'}
    initialTarget={target ? { kind: target.kind, slug: target.slug, title: target.name, href: target.href } : null}
  />
}
