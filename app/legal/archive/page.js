import Link from 'next/link'
import { ArrowRight, Archive, FileCheck2 } from 'lucide-react'
import { Breadcrumb } from '@/components/site/wiki'
import { LEGAL_ARCHIVE, LEGAL_EFFECTIVE, LEGAL_VERSION } from '@/lib/legal'

export const metadata = {
  title: 'Policy version archive',
  description: 'Exact previous GTA LORE legal policy versions retained for account holders and contributors.',
  alternates: { canonical: '/legal/archive' },
}

export default function LegalArchivePage() {
  return (
    <div className="legal-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1240px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Legal centre', href: '/legal' }, { label: 'Policy archive' }]} />

      <header className="legal-policy-hero mt-4" data-policy="privacy">
        <div>
          <p className="legal-hq-signal"><i aria-hidden="true" />Legal desk <span>/</span> Version control</p>
          <h1>Policy version archive</h1>
          <p>Exact retired policy text remains available so an account holder can inspect the version recorded at acceptance.</p>
        </div>
        <dl>
          <div><dt>Archived versions</dt><dd>{LEGAL_ARCHIVE.length}</dd></div>
          <div><dt>Current version</dt><dd>{LEGAL_VERSION}</dd></div>
          <div><dt>Current since</dt><dd>{LEGAL_EFFECTIVE}</dd></div>
        </dl>
      </header>

      <section className="legal-hq-section mt-6" aria-labelledby="retired-versions">
        <header className="legal-section-head">
          <span><Archive size={17} aria-hidden="true" /></span>
          <div><p>Acceptance record</p><h2 id="retired-versions">Retired versions</h2></div>
        </header>
        <div className="legal-card-grid">
          {LEGAL_ARCHIVE.flatMap((record) => record.documents.map((document) => (
            <Link key={`${record.version}-${document.slug}`} href={`/legal/archive/${record.version}/${document.slug}`} className="legal-policy-card panel group">
              <span className="legal-policy-number"><FileCheck2 size={17} aria-hidden="true" /></span>
              <span className="legal-policy-icon"><Archive size={18} aria-hidden="true" /></span>
              <span className="min-w-0">
                <strong>{document.title}</strong>
                <small>Version {record.version} · effective {record.effective}</small>
              </span>
              <span className="legal-policy-open">Exact text<ArrowRight size={14} aria-hidden="true" /></span>
            </Link>
          )))}
        </div>
      </section>
    </div>
  )
}
