'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ChevronRight, FolderTree } from 'lucide-react'
import { StatusBadge } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'
import { categoryBySlug, KIND_META } from '@/lib/wiki-graph'

// A página de categoria: tudo o que pertence a um assunto, venha do ramo
// que vier. É o que separa uma wiki de um catálogo — um Grotti e uma
// personagem podem partilhar categoria, e aqui aparecem lado a lado.
export default function CategoryPage() {
  const { slug } = useParams()
  const category = categoryBySlug(slug)

  if (!category) {
    return (
      <div className="px-4 sm:px-6 py-20 sm:py-24 text-center">
        <p className="font-cond font-bold uppercase text-[40px] text-paper">CATEGORY NOT FOUND</p>
        <Link href="/wiki/categories" className="text-pink font-cond uppercase tracking-[0.14em] text-sm mt-4 inline-block">← ALL CATEGORIES</Link>
      </div>
    )
  }

  // Agrupado por ramo, para se perceber de onde vem cada membro.
  const byKind = Object.keys(KIND_META)
    .map((kind) => ({ kind, label: KIND_META[kind].plural, items: category.members.filter((m) => m.kind === kind) }))
    .filter((g) => g.items.length > 0)
  const hero = category.members.find((member) => member.image)?.image

  return (
    <div className="ambient-bloom px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] w-full mx-auto">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Categories', href: '/wiki/categories' }, { label: category.label }]} />

      <div className="mt-4">
        <CategoryHeader
          eyebrow="Category"
          title={category.label}
          description={`Every entry in this archive filed under ${category.label}, whichever branch it belongs to.`}
          count={category.members.length}
          countLabel="members"
          image={hero}
          imageAlt={hero ? `Published GTA VI media associated with the ${category.label} category` : undefined}
        />
      </div>

      {category.parents.length > 0 && (
        <nav className="mt-4 flex flex-wrap items-center gap-2" aria-label="Parent categories">
          <span className="font-cond uppercase tracking-[0.14em] text-[9px] text-dim">Filed under</span>
          {category.parents.map((parent) => (
            <Link key={parent.slug} href={`/wiki/category/${parent.slug}`} className="inline-flex items-center gap-1 font-cond font-semibold uppercase tracking-[0.08em] text-[11px] text-mint hover:text-paper transition-colors">
              {parent.label}<ChevronRight size={10} aria-hidden="true" />
            </Link>
          ))}
          <span className="font-cond font-semibold uppercase tracking-[0.08em] text-[11px] text-paper" aria-current="page">{category.label}</span>
        </nav>
      )}

      <div className="mt-6 space-y-8">
        {category.children.length > 0 && (
          <section aria-labelledby="subcategories-heading">
            <div className="flex items-center gap-4">
              <h2 id="subcategories-heading" className="font-cond font-bold uppercase tracking-[0.14em] text-[15px] text-mint leading-none shrink-0">Subcategories</h2>
              <span className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
              <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{category.children.length}</span>
            </div>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-px">
              {category.children.map((child) => (
                <li key={child.slug}>
                  <Link href={`/wiki/category/${child.slug}`} className="flex items-center gap-2.5 py-2 border-b border-black/[0.06] group">
                    <FolderTree size={12} className="text-dim group-hover:text-mint shrink-0" aria-hidden="true" />
                    <span className="flex-1 min-w-0 font-cond font-semibold uppercase text-[13px] text-paper truncate group-hover:text-mint transition-colors">{child.label}</span>
                    <span className="font-mono text-[10px] text-dim tabular-nums">{child.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {byKind.map((group) => (
          <section key={group.kind}>
            <div className="flex items-center gap-4">
              <h2 className="font-cond font-bold uppercase tracking-[0.14em] text-[15px] text-mint leading-none shrink-0">{group.label}</h2>
              <span className="flex-1 h-px bg-gradient-to-r from-black/20 to-transparent" aria-hidden="true" />
              <span className="font-mono text-[11px] text-dim tabular-nums shrink-0">{group.items.length}</span>
            </div>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-px">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center gap-2.5 py-2 border-b border-black/[0.06] hover:border-black/25 group transition-colors">
                    <FolderTree size={12} className="text-dim group-hover:text-mint shrink-0 transition-colors" aria-hidden="true" />
                    <span className="flex-1 min-w-0 font-cond font-semibold uppercase text-[13px] text-paper truncate group-hover:text-mint transition-colors">{item.name}</span>
                    {item.stub && <span className="font-cond uppercase tracking-[0.14em] text-[8px] text-warn shrink-0">Stub</span>}
                    <StatusBadge status={item.status} className="shrink-0 scale-[0.85] origin-right" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
