import Link from 'next/link'
import { FileText, ListChecks, Link2, BookMarked, FolderTree, Quote, Info, Keyboard } from 'lucide-react'
import { STATS } from '@/lib/wiki-graph'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

export const metadata = {
  title: 'How to read this archive',
  description: 'How an entry is put together, what each part of it is for, and the keyboard shortcuts.',
}

// A página de ajuda de uma wiki: o que é cada parte de um verbete e como
// se anda por ele. Sem isto, metade das peças que o arquivo tem — as
// notas de desambiguação, o «o que liga para aqui», a caixa de citação —
// só se descobrem por acidente.
const ANATOMY = [
  [FileText, 'Title, labels and short description',
    'Every entry opens with its name, the source label that says how strong the evidence is, and the evidence line that says what kind of evidence it is. If two entries share a name, a note above the title points at the other one.'],
  [ListChecks, 'The data grid',
    'The identification fields in pairs — class, manufacturer, association, status, evidence — followed by the technical fields. A field with no published value says so by name rather than disappearing.'],
  [Info, 'The infobox',
    'The same fields as a column on the right, with the images and the source. It is the part meant to be read first and copied out.'],
  [Link2, 'What links here',
    'Every other entry that points at this one, and why. It is the archive read backwards, and the fastest way to find the neighbourhood of a record.'],
  [Link2, 'Page tools',
    'Every entry has actions tied to that page: incoming links, related verification changes, page information, citation, print and a canonical permanent link.'],
  [FolderTree, 'Categories',
    'The last line of the entry, as on any wiki. Categories form a browsable parent-and-subcategory tree; filing a rumour under a class does not make it confirmed.'],
  [BookMarked, 'References',
    'The numbered source list, with the date it was last checked. Where the source has no public page, the entry says so instead of linking nowhere.'],
  [Quote, 'Cite this page',
    'A ready-made citation with the permanent link and today’s date, for quoting the archive elsewhere. Cite the archive’s source when you can; cite the archive when the arrangement is what you are quoting.'],
  [Keyboard, 'Two search modes',
    'Quick search jumps between likely records from anywhere. Full search indexes titles, page text, categories, source labels and address names, and can be narrowed to one branch.'],
]

const SHORTCUTS = [
  ['/', 'Open search from anywhere'],
  ['Ctrl or ⌘ + K', 'The same, for the muscle memory'],
  ['↑ ↓', 'Move through the search results'],
  ['Enter', 'Open the selected result'],
  ['Esc', 'Close search'],
]

export default function HelpPage() {
  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1180px] w-full mx-auto flex-1">
      <Breadcrumb trail={[
        { label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' },
        { label: 'Special pages', href: '/wiki/special' }, { label: 'Help' },
      ]} />

      <div className="data-rail mt-2">HELP · HOW AN ENTRY IS PUT TOGETHER</div>

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Reading the archive"
          title="How to read this archive"
          description="Every entry is built the same way, so that once you can read one you can read all of them. This is what each part is for."
          count={STATS.total}
          countLabel="entries"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ANATOMY.map(([Icon, title, body]) => (
          <section key={title} className="panel rounded-sm p-5">
            <h2 className="flex items-center gap-2.5 font-cond font-bold uppercase tracking-[0.06em] text-[16px] text-paper">
              <Icon size={16} className="text-mint shrink-0" aria-hidden="true" />
              {title}
            </h2>
            <p className="mt-2.5 text-[13px] leading-relaxed text-dim">{body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8" aria-labelledby="shortcuts-heading">
        <h2 id="shortcuts-heading" className="deco-rule flex items-center gap-2 font-cond font-bold uppercase tracking-[0.16em] text-[15px] text-paper mb-4">
          <Keyboard size={15} className="text-mint" aria-hidden="true" /> Keyboard
        </h2>
        <dl className="border border-line divide-y divide-black/[0.08]">
          {SHORTCUTS.map(([key, what]) => (
            <div key={key} className="px-4 py-3 flex items-center gap-4">
              <dt className="shrink-0">
                <kbd className="inline-flex items-center justify-center min-w-[34px] h-8 px-2 border border-line rounded-[4px] font-mono text-[12px] text-paper bg-surface2/60">{key}</kbd>
              </dt>
              <dd className="text-[13px] text-dim">{what}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 panel rounded-sm p-5">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[15px] text-paper">If an entry is wrong</h2>
        <p className="mt-2.5 text-[13px] leading-relaxed text-dim max-w-[80ch]">
          Check it against the source named on the entry. If the source says otherwise, the entry is wrong and gets
          fixed; if the source itself was wrong, the label was too generous and that gets fixed as well. Nothing here is
          settled by how often a claim is repeated. The lists on{' '}
          <Link href="/wiki/special" className="text-pink hover:text-paper transition-colors">the special pages</Link>{' '}
          are the archive pointing at its own gaps first.
        </p>
      </section>
    </div>
  )
}
