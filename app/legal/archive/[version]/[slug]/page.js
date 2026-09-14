import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { Breadcrumb, WikiSection } from '@/components/site/wiki'
import { LEGAL_ARCHIVE } from '@/lib/legal'

export const dynamicParams = false

export function generateStaticParams() {
  return LEGAL_ARCHIVE.flatMap((record) => record.documents.map((document) => ({ version: record.version, slug: document.slug })))
}

export async function generateMetadata({ params }) {
  const { version, slug } = await params
  const record = LEGAL_ARCHIVE.find((item) => item.version === version)
  const document = record?.documents.find((item) => item.slug === slug)
  if (!document) return {}
  return {
    title: `${document.title} — archived ${version}`,
    description: `Exact retired ${document.title} text effective ${record.effective}.`,
    robots: { index: false, follow: true },
  }
}

function ArchivedSection({ section }) {
  return (
    <WikiSection id={section.id} title={section.title}>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && <ul className="legal-bullet-list">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.items && (
        <div className="legal-data-table" role="region" aria-label={`${section.title} inventory`} tabIndex={0}>
          <table>
            <thead><tr><th>Item</th><th>Purpose</th><th>Duration</th><th>Class</th></tr></thead>
            <tbody>{section.items.map((item) => <tr key={item.name}><th scope="row" data-label="Item"><code>{item.name}</code></th><td data-label="Purpose">{item.purpose}</td><td data-label="Duration">{item.duration}</td><td data-label="Class"><span>{item.category}</span></td></tr>)}</tbody>
          </table>
        </div>
      )}
      {section.note && <p className="legal-note">{section.note}</p>}
    </WikiSection>
  )
}

export default async function ArchivedLegalDocument({ params }) {
  const { version, slug } = await params
  const record = LEGAL_ARCHIVE.find((item) => item.version === version)
  const document = record?.documents.find((item) => item.slug === slug)
  if (!document) notFound()

  return (
    <div className="legal-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[980px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Legal centre', href: '/legal' }, { label: 'Policy archive', href: '/legal/archive' }, { label: document.title }]} />
      <header className="legal-policy-hero mt-4" data-policy={slug}>
        <div>
          <p className="legal-hq-signal"><i aria-hidden="true" />Retired record <span>/</span> {version}</p>
          <h1>{document.title}</h1>
          <p>{record.note}</p>
        </div>
        <dl>
          <div><dt>Status</dt><dd>Archived</dd></div>
          <div><dt>Effective</dt><dd>{record.effective}</dd></div>
          <div><dt>Sections</dt><dd>{document.sections.length}</dd></div>
        </dl>
      </header>
      <article className="legal-document wiki-article-body mt-6">
        <p className="legal-note"><LockKeyhole size={15} aria-hidden="true" />This record is read-only and is not the current policy.</p>
        {document.sections.map((item) => <ArchivedSection key={item.id} section={item} />)}
        <Link href="/legal/archive" className="legal-back-link mt-6"><ArrowLeft size={13} />Policy version archive</Link>
      </article>
    </div>
  )
}
