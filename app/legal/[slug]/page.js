import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink, FileCheck2, Mail, ShieldCheck } from 'lucide-react'
import { Breadcrumb, CategoryHeader, WikiSection } from '@/components/site/wiki'
import { LEGAL_BY_SLUG, LEGAL_CONTACTS, LEGAL_DOCUMENTS, LEGAL_EFFECTIVE, LEGAL_VERSION } from '@/lib/legal'
import { isRockstarUrl } from '@/lib/official-links'

export const dynamicParams = false

export function generateStaticParams() {
  return LEGAL_DOCUMENTS.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const document = LEGAL_BY_SLUG[slug]
  if (!document) return {}
  return {
    title: document.title,
    description: document.description,
    alternates: { canonical: `/legal/${slug}` },
  }
}

function PolicySection({ section }) {
  return (
    <WikiSection id={section.id} title={section.title}>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.bullets && (
        <ul className="legal-bullet-list">
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      )}
      {section.items && (
        <div className="legal-data-table" role="region" aria-label={`${section.title} inventory`} tabIndex={0}>
          <table>
            <thead><tr><th>Item</th><th>Purpose</th><th>Duration</th><th>Class</th></tr></thead>
            <tbody>
              {section.items.map((item) => (
                <tr key={item.name}>
                  <th scope="row"><code>{item.name}</code></th>
                  <td>{item.purpose}</td>
                  <td>{item.duration}</td>
                  <td><span>{item.category}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.note && <p className="legal-note"><ShieldCheck size={15} aria-hidden="true" />{section.note}</p>}
    </WikiSection>
  )
}

export default async function LegalDocumentPage({ params }) {
  const { slug } = await params
  const document = LEGAL_BY_SLUG[slug]
  if (!document) notFound()
  const index = LEGAL_DOCUMENTS.findIndex((item) => item.slug === slug)
  const previous = LEGAL_DOCUMENTS[index - 1]
  const next = LEGAL_DOCUMENTS[index + 1]
  const references = document.references.filter(([, url]) => isRockstarUrl(url))

  return (
    <div className="legal-shell ambient-bloom px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1240px] w-full mx-auto flex-1">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Legal centre', href: '/legal' }, { label: document.title }]} />

      <div className="mt-4">
        <CategoryHeader
          title={document.title}
          description={document.description}
          count={document.sections.length}
          countLabel="sections"
          updatedAt={LEGAL_VERSION}
        />
      </div>

      <div className="legal-document-layout mt-6">
        <article className="legal-document wiki-article-body">
          <div className="legal-effective">
            <span><FileCheck2 size={16} /> Current policy</span>
            <dl><div><dt>Effective</dt><dd><time dateTime={LEGAL_VERSION}>{LEGAL_EFFECTIVE}</time></dd></div><div><dt>Reading time</dt><dd>{document.readTime}</dd></div></dl>
          </div>

          {document.sections.map((section) => <PolicySection key={section.id} section={section} />)}

          {references.length > 0 && (
            <section className="wiki-references mt-8" aria-labelledby="policy-references">
              <h2 id="policy-references" className="deco-rule font-cond font-bold uppercase tracking-[.1em] text-[20px] text-paper">Official Rockstar reference</h2>
              <ul className="mt-4 space-y-2">
                {references.map(([label, url]) => (
                  <li key={url}><a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-violet hover:text-pink">{label}<ExternalLink size={12} /></a></li>
                ))}
              </ul>
            </section>
          )}

          <nav className="legal-prev-next" aria-label="Legal document navigation">
            {previous ? <Link href={`/legal/${previous.slug}`}><ArrowLeft size={14} /><span><small>Previous</small>{previous.shortTitle}</span></Link> : <span />}
            {next ? <Link href={`/legal/${next.slug}`}><span><small>Next</small>{next.shortTitle}</span><ArrowRight size={14} /></Link> : <span />}
          </nav>
        </article>

        <aside className="legal-document-nav">
          <nav className="wiki-toc-panel" aria-label="On this policy">
            <p>On this policy</p>
            <ol>
              {document.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}
            </ol>
          </nav>
          <div className="legal-help-card panel">
            <Mail size={18} aria-hidden="true" />
            <strong>Need a legal contact?</strong>
            <p>Use the legal desk and include the exact page or account concerned.</p>
            <a href={`mailto:${slug === 'privacy' || slug === 'cookies' ? LEGAL_CONTACTS.privacy : slug === 'copyright' ? LEGAL_CONTACTS.copyright : LEGAL_CONTACTS.general}`}>Contact by email</a>
          </div>
          <Link href="/legal" className="legal-back-link"><ArrowLeft size={13} />All legal policies</Link>
        </aside>
      </div>
    </div>
  )
}
