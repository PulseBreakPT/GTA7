import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Award, Bookmark, CalendarDays, Eye, FolderPlus, PenLine, ShieldCheck, Sparkles, StickyNote, Trophy, UserRound } from 'lucide-react'
import { getDb } from '@/lib/server/mongo'
import { wikiPreferences } from '@/lib/server/auth'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

export const dynamic = 'force-dynamic'

async function profileFor(username) {
  const db = await getDb()
  const user = await db.collection('auth_users').findOne(
    { usernameNormalized: String(username || '').toLowerCase(), status: 'active' },
    { projection: { _id: 0, id: 1, username: 1, displayName: 1, bio: 1, role: 1, createdAt: 1, emailVerifiedAt: 1, wikiPreferences: 1 } },
  )
  if (!user || !wikiPreferences(user).publicProfile) return null
  const [accepted, watched, read, collections, notes, suggestions] = await Promise.all([
    db.collection('wiki_suggestions').find({ userId: user.id, status: 'accepted' }, { projection: { _id: 0, id: 1, title: 1, href: 1, summary: 1, updatedAt: 1 } }).sort({ updatedAt: -1 }).limit(20).toArray(),
    db.collection('wiki_watchlist').countDocuments({ userId: user.id }),
    db.collection('wiki_history').countDocuments({ userId: user.id }),
    db.collection('wiki_collections').countDocuments({ userId: user.id }),
    db.collection('wiki_notes').countDocuments({ userId: user.id }),
    db.collection('wiki_suggestions').countDocuments({ userId: user.id }),
  ])
  const badges = [
    ['Verified archivist', Boolean(user.emailVerifiedAt)], ['Leonida explorer', read >= 10],
    ['Archive curator', watched >= 10], ['Collection architect', collections >= 3],
    ['Field researcher', notes >= 5], ['Wiki contributor', suggestions >= 1],
    ['Trusted source', accepted.length >= 5],
  ].filter(([, unlocked]) => unlocked).map(([label]) => label)
  return { user, accepted, badges, stats: { watched, read, collections, notes } }
}

export async function generateMetadata({ params }) {
  const { username } = await params
  const profile = await profileFor(username)
  return profile
    ? { title: `${profile.user.displayName} (@${profile.user.username})`, description: profile.user.bio || `GTA LORE reader @${profile.user.username}.` }
    : { title: 'User not found', robots: { index: false, follow: false } }
}

export default async function UserPage({ params }) {
  const { username } = await params
  const profile = await profileFor(username)
  if (!profile) notFound()
  const { user, accepted, badges, stats } = profile
  const joined = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(user.createdAt))

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1040px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Users' }, { label: user.username }]} />
      <div className="mt-4">
        <CategoryHeader eyebrow={`Wiki user · ${user.role || 'reader'}`} title={user.displayName} description={`@${user.username}`} count={accepted.length} countLabel="accepted edits">
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 border border-violet/30 rounded-sm px-2.5 h-8 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-violet"><ShieldCheck size={12} />{user.role || 'reader'}</span>
            <span className="inline-flex items-center gap-1.5 border border-line rounded-sm px-2.5 h-8 font-cond font-semibold uppercase tracking-[0.1em] text-[10px] text-dim"><CalendarDays size={12} />Joined {joined}</span>
          </div>
        </CategoryHeader>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 items-start">
        <aside className="panel rounded-sm p-5 text-center">
          <span className="mx-auto w-16 h-16 rounded-full grid place-items-center bg-gradient-to-br from-violet to-pink text-white shadow-[0_16px_35px_-18px_rgba(118,87,255,.8)]"><UserRound size={26} /></span>
          <h2 className="mt-3 font-cond font-bold uppercase text-[19px] text-paper">{user.displayName}</h2>
          <p className="mt-1 font-mono text-[9px] text-dim">@{user.username}</p>
          <p className="mt-4 text-left text-[12px] leading-[1.7] text-dim">{user.bio || 'This user has not added a biography yet.'}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2">{[[Bookmark, stats.watched, 'Watched'], [Eye, stats.read, 'Read'], [FolderPlus, stats.collections, 'Collections'], [StickyNote, stats.notes, 'Notes']].map(([Icon, value, label]) => <div key={label} className="border border-line bg-surface2/50 p-2"><Icon size={11} className="mx-auto text-violet" /><dd className="mt-1 font-cond font-bold text-[17px] text-paper">{value}</dd><dt className="font-mono uppercase text-[7px] text-dim">{label}</dt></div>)}</dl>
        </aside>

        <div className="space-y-6"><section className="panel rounded-sm p-5 sm:p-6">
          <div className="flex items-center gap-2"><Award size={15} className="text-mint" /><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[17px] text-paper">Accepted contributions</h2></div>
          {accepted.length ? <ol className="mt-4 divide-y divide-black/[0.08]">{accepted.map((item) => <li key={item.id} className="py-3"><Link href={item.href} className="inline-flex items-center gap-2 font-cond font-bold uppercase text-[13px] text-paper hover:text-mint"><PenLine size={12} />{item.title}</Link><p className="mt-1 text-[11px] leading-relaxed text-dim">{item.summary}</p></li>)}</ol> : <div className="mt-5 border border-dashed border-line p-6 text-center"><PenLine size={17} className="mx-auto text-dim" /><p className="mt-2 text-[12px] text-dim">No accepted contributions yet.</p></div>}
        </section>{badges.length > 0 && <section className="panel rounded-sm p-5 sm:p-6"><div className="flex items-center gap-2"><Trophy size={15} className="text-pink" /><h2 className="font-cond font-bold uppercase tracking-[0.08em] text-[17px] text-paper">Earned badges</h2></div><div className="mt-4 flex flex-wrap gap-2">{badges.map((badge) => <span key={badge} className="inline-flex items-center gap-1.5 border border-violet/30 bg-violet/[0.05] rounded-full px-3 py-2 font-cond font-bold uppercase tracking-[0.08em] text-[10px] text-violet"><Sparkles size={11} />{badge}</span>)}</div></section>}</div>
      </div>
    </div>
  )
}
