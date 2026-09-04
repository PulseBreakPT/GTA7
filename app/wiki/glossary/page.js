import Link from 'next/link'
import { STATS, SOURCES, KIND_META, ENTRIES } from '@/lib/wiki-graph'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

export const metadata = {
  title: 'Glossary',
  description: 'Every label this archive uses, and exactly what it claims. The words are not decoration: each one is a promise about where a fact came from.',
}

// O glossário de uma wiki não é um extra: metade das discussões numa wiki
// são sobre o que uma palavra quer dizer. Aqui as palavras que carregam
// peso são os rótulos de fonte, e cada um é uma promessa diferente.
const LABELS = [
  ['confirmed', 'Rockstar named or described it in official material — a trailer, a screenshot caption, the official site, the Newswire.', 'The strongest claim the archive makes.'],
  ['verified', 'Visible in official footage or imagery and identified frame by frame. Rockstar has not named it.', 'What you can see, not what you were told.'],
  ['category', 'Rockstar has confirmed the class of thing, but not this particular one.', 'Used where a category exists and its members do not.'],
  ['analysis', 'The archive’s own reading of official material, marked as the archive’s reading.', 'Never presented as a Rockstar statement.'],
  ['rumour', 'Circulating without official backing — leaks, reports, community claims.', 'Recorded so it can be checked, never stated as fact.'],
]

const EVIDENCE = [
  ['OFFICIAL — NAMED', 'Rockstar published the name of this thing.'],
  ['OFFICIAL — DEPICTED', 'It appears in official material without being named.'],
  ['OFFICIAL — CATEGORY CONFIRMED', 'The class is official; this member is not.'],
  ['UNVERIFIED IDENTIFICATION', 'Someone identified it; the identification is not confirmed.'],
  ['SPECULATIVE', 'An informed guess, and labelled as one.'],
]

const TERMS = [
  ['Entry', `One record with its own page — a vehicle, a person, a place, a station. The archive holds ${STATS.total}.`],
  ['Branch', `A collection of entries of one kind: ${Object.values(KIND_META).map((k) => k.plural.toLowerCase()).join(', ')}.`],
  ['Stub', `An entry that holds only what the source states and nothing more. There are ${STATS.stubs}; they are marked rather than padded out.`],
  ['Source link', `A public page where the claim can be checked. ${STATS.withSource} of ${STATS.total} entries carry one.`],
  ['Not officially specified', 'A field Rockstar has not published. It is printed rather than hidden, because an empty field reads as missing data and this is not missing — it does not exist yet.'],
  ['Not published', 'The same statement about a measurement: no figure has been released, so none is shown.'],
  ['Archive map', 'The site’s own drawing of Leonida. It is an index of named places, not a survey: positions are approximate and no official map has been published.'],
  ['Archive illustration', 'A drawing made here, for entries with no usable image. It always says so on the image itself.'],
  ['Wanted page', 'A name an entry cites in a field with no page of its own. On a wiki these are the red links.'],
  ['Lonely page', 'An entry nothing else links to.'],
]

export default function GlossaryPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[
        { label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' },
        { label: 'Special pages', href: '/wiki/special' }, { label: 'Glossary' },
      ]} />

      <div className="data-rail mt-2">GLOSSARY · WHAT EACH LABEL CLAIMS</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Reference"
          title="Glossary"
          description="Every label this archive uses, and exactly what it claims. Half of what a wiki argues about is what a word means, so the words that carry weight are defined here rather than left to the reader."
          count={LABELS.length + EVIDENCE.length + TERMS.length}
          countLabel="terms"
        />
      </div>

      <section className="mt-8" aria-labelledby="labels-heading">
        <h2 id="labels-heading" className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper mb-4">Source labels</h2>
        <dl className="border border-line divide-y divide-black/[0.08]">
          {LABELS.map(([status, meaning, note]) => (
            <div key={status} className="px-4 py-4 grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-x-5 gap-y-2">
              <dt><StatusBadge status={status} /></dt>
              <dd>
                <p className="text-[13.5px] leading-relaxed text-paper">{meaning}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-dim">{note}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[12.5px] leading-relaxed text-dim max-w-[72ch]">
          Counted across the archive: {STATS.byStatus.map((s) => `${s.count} ${s.status}`).join(' · ')}.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="evidence-heading">
        <h2 id="evidence-heading" className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper mb-4">Evidence lines</h2>
        <p className="text-[13px] leading-relaxed text-dim max-w-[72ch] mb-4">
          The line in small type under a title. Where the source label says how strong the evidence is, this says what
          kind of evidence it is.
        </p>
        <dl className="border border-line divide-y divide-black/[0.08]">
          {EVIDENCE.map(([term, meaning]) => (
            <div key={term} className="px-4 py-3 grid grid-cols-1 sm:grid-cols-[280px_1fr] gap-x-5 gap-y-1">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mint">{term}</dt>
              <dd className="text-[13px] leading-relaxed text-dim">{meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="terms-heading">
        <h2 id="terms-heading" className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper mb-4">Words used in a particular way</h2>
        <dl className="border border-line divide-y divide-black/[0.08]">
          {TERMS.map(([term, meaning]) => (
            <div key={term} className="px-4 py-3 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-x-5 gap-y-1">
              <dt className="font-cond font-bold uppercase tracking-[0.06em] text-[14px] text-paper">{term}</dt>
              <dd className="text-[13px] leading-relaxed text-dim">{meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="deco-rule font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper mb-4">The sources behind the labels</h2>
        <p className="text-[13px] leading-relaxed text-dim max-w-[72ch]">
          {SOURCES.length} sources carry the {ENTRIES.length} entries. The largest of them is{' '}
          <Link href="/sources" className="text-pink hover:text-paper transition-colors">{SOURCES[0]?.name}</Link>, with{' '}
          {SOURCES[0]?.entries.length} entries resting on it — which is worth knowing before trusting any one of them.
        </p>
      </section>
    </div>
  )
}
