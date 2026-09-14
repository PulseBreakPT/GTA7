import Link from 'next/link'
import { ArrowRight, BookOpenCheck, Cookie, Copyright, FileWarning, Scale, ShieldCheck, UsersRound } from 'lucide-react'
import { Breadcrumb } from '@/components/site/wiki'
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
  ['Reviewing a policy previously accepted', 'Policy version archive', '/legal/archive'],
]

export default function LegalCentrePage() {
  return (
    <div className="legal-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1240px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Legal centre' }]} />

      <header className="legal-hq-hero mt-4">
        <div className="legal-hq-copy">
          <p className="legal-hq-signal"><i aria-hidden="true" />GTA LORE <span>/</span> Legal desk</p>
          <h1><span>Rules for</span><strong>the archive.</strong></h1>
          <p>Clear controls for readers, account holders, contributors and rights owners. Every policy states the rule, the reason and the contact route.</p>
          <dl className="legal-hq-meta">
            <div><dt>Documents</dt><dd>{LEGAL_DOCUMENTS.length}</dd></div>
            <div><dt>Policy version</dt><dd>{LEGAL_VERSION}</dd></div>
            <div><dt>Jurisdiction</dt><dd>Portugal · EU</dd></div>
          </dl>
        </div>
        <div className="legal-hq-register" aria-label="Legal archive status">
          <span><Scale size={22} aria-hidden="true" /></span>
          <p>Policy register</p>
          <strong>{String(LEGAL_DOCUMENTS.length).padStart(2, '0')}</strong>
          <small>Published records<br />One accountable system</small>
          <i>Current · {LEGAL_EFFECTIVE}</i>
        </div>
      </header>

      <section className="legal-assurance-strip mt-5" aria-label="Policy status">
        <span><BookOpenCheck size={15} /> Effective {LEGAL_EFFECTIVE}</span>
        <span><ShieldCheck size={15} /> No advertising or tracking cookies</span>
        <span><Scale size={15} /> Independent fan reference</span>
      </section>

      <section className="legal-hq-section mt-6" aria-labelledby="policy-library">
        <header className="legal-section-head">
          <span>01</span><div><p>Policy library</p><h2 id="policy-library">Choose the record you need.</h2></div>
        </header>
        <div className="legal-card-grid">
        {LEGAL_DOCUMENTS.map((document, index) => {
          const Icon = ICONS[document.slug]
          return (
            <Link key={document.slug} href={`/legal/${document.slug}`} data-policy={document.slug} className="legal-policy-card panel group">
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
      </section>

      <div className="legal-service-grid mt-8">
        <section className="legal-route-panel panel rounded-sm p-5 sm:p-6" aria-labelledby="choose-policy">
          <p className="legal-panel-kicker">02 · Find the right route</p>
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
          <p className="legal-panel-kicker">Direct contact</p>
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
