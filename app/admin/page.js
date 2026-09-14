import { redirect } from 'next/navigation'
import { currentAuth, publicUser } from '@/lib/server/auth'
import AdminClient from './admin-client'

// The operations desk.
//
// Gated here, on the server, before a single byte of the interface is rendered.
// The middleware already turned anonymous requests away, but it can only see
// that a session cookie exists — it cannot know what the session is worth. A
// reader who guesses this URL is sent to their own account desk, not shown an
// empty shell, and every endpoint the client calls checks the role again on its
// own: the interface is a convenience, never the boundary.

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Archive operations', robots: { index: false, follow: false } }

const STAFF = new Set(['moderator', 'admin'])

export default async function AdminPage() {
  const auth = await currentAuth()
  if (!auth) redirect('/login?next=/admin')
  if (!STAFF.has(auth.user.role)) redirect('/account')

  return <AdminClient operator={publicUser(auth.user)} />
}
