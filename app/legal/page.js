import Link from 'next/link'
import { ArrowRight, BookOpenCheck, Cookie, Copyright, FileWarning, Scale, ShieldCheck, UsersRound } from 'lucide-react'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { LEGAL_CONTACTS, LEGAL_DOCUMENTS, LEGAL_EFFECTIVE, LEGAL_VERSION } from '@/lib/legal'

const ICONS = {
  terms: Scale,
  privacy: ShieldCheck,
  cookies: Cookie,
  copyright: Copyright,
  community: UsersRound,
  disclaimer: FileWarning,
}

const ROUTES = [
  ['Creating or using an account', 'Terms of Use', '/legal/terms'],
  ['Understanding or controlling personal data', 'Privacy Notice', '/legal/privacy'],
  ['Checking cookies and browser storage', 'Cookies & Local Storage', '/legal/cookies'],
  ['Reusing text or reporting protected material', 'Copyright & IP Policy', '/legal/copyright'],
  ['Contributing, reporting conduct or appealing', 'Community Guidelines', '/legal/community'],
  ['Checking the limits of archive information', 'General Disclaimer', '/legal/disclaimer'],
]

export default function LegalCentrePage() {
  return (
    <div className="legal-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1240px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Legal centre' }]} />

      <div className="mt-4">
        <CategoryHeader
          title="Legal centre"
          description="One transparent policy system for readers, account holders, contributors and rights owners. Choose the situation below; each page states the rule, the control and the contact route."
          count={LEGAL_DOCUMENTS.length}
          countLabel="policies"
          updatedAt={LEGAL_VERSION}
        />
      </div>

      <section className="legal-assurance-strip mt-5" aria-label="Policy status">
        <span><BookOpenCheck size={15} /> Effective {LEGAL_EFFECTIVE}</span>
        <span><ShieldCheck size={15} /> No advertising or tracking cookies</span>
        <span><Scale size={15} /> Independent fan reference</span>
      </section>

      <div className="legal-card-grid mt-6">
        {LEGAL_DOCUMENTS.map((document, index) => {
          const Icon = ICONS[document.slug]
          return (
            <Link key={document.slug} href={`/legal/${document.slug}`} className="legal-policy-card panel group">
              <span className="legal-policy-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="legal-policy-icon"><Icon size={20} aria-hidden="true" /></span>
              <span className="min-w-0">
                <strong>{document.title}</strong>
                <small>{document.description}</small>
              </span>
              <span className="legal-policy-open">{document.readTime}<ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)] gap-5">
        <section className="panel rounded-sm p-5 sm:p-6" aria-labelledby="choose-policy">
          <h2 id="choose-policy" className="font-cond font-bold uppercase tracking-[.08em] text-[21px] text-paper">Start with what you need to do</h2>
          <dl className="legal-route-list mt-4">
            {ROUTES.map(([need, policy, href]) => (
              <div key={need}>
                <dt>{need}</dt>
                <dd><Link href={href}>{policy}<ArrowRight size={12} /></Link></dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="legal-contact-card panel rounded-sm p-5 sm:p-6" aria-labelledby="legal-contact">
          <h2 id="legal-contact" className="font-cond font-bold uppercase tracking-[.08em] text-[21px] text-paper">Legal desk</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-dim">Use the address matching the request. Include the relevant page URL and no more personal data than necessary.</p>
          <ul className="mt-4 space-y-2">
            <li><span>General</span><a href={`mailto:${LEGAL_CONTACTS.general}`}>{LEGAL_CONTACTS.general}</a></li>
            <li><span>Privacy</span><a href={`mailto:${LEGAL_CONTACTS.privacy}`}>{LEGAL_CONTACTS.privacy}</a></li>
            <li><span>Copyright</span><a href={`mailto:${LEGAL_CONTACTS.copyright}`}>{LEGAL_CONTACTS.copyright}</a></li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

