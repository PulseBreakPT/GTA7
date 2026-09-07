'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, ChevronRight, FolderTree } from 'lucide-react'
import { articles, encyclopediaCategories } from '@/lib/content'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

const tone = { pink: 'border-pink/35 bg-pink/5 text-pink', mint: 'border-mint/35 bg-mint/5 text-mint', violet: 'border-violet/35 bg-violet/5 text-violet' }

export default function CategoriesPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-7 lg:py-10 max-w-[1280px] mx-auto w-full">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wiki', href: '/wiki' }, { label: 'Categories' }]} />
      <div className="mt-4"><CategoryHeader eyebrow="Leonida Archive · Browse" title="Categories" image="/media/key-art/cover.webp" imageAlt="Official Grand Theft Auto VI cover artwork" description="Browse the archive as a reference work. Each category groups articles by subject, while source badges remain attached to the individual record." count={encyclopediaCategories.length} countLabel="top-level categories"><span className="mt-4 inline-flex items-center gap-2 panel2 px-3 py-2 font-cond uppercase tracking-[0.14em] text-[12px] text-paper"><FolderTree size={15} className="text-pink" /> Subject-led navigation</span></CategoryHeader></div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {encyclopediaCategories.map((category, index) => {
          const count = category.articles.filter((slug) => articles.some((article) => article.slug === slug)).length
          return <Link key={category.slug} href={`/categories/${category.slug}`} className={`spotlight-card tech-mask panel overflow-hidden group border ${tone[category.color]}`}>
            <div className="relative aspect-[16/7] overflow-hidden film-frame corner-brackets"><Image src={category.cover} alt={`${category.title} category cover`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.06] transition-transform duration-700" /><span className="absolute right-4 top-4 z-[4] font-mono text-[10px] tracking-[0.14em] text-paper/80">FILE {String(index + 1).padStart(2, '0')}</span></div>
            <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <BookOpen size={20} />
              <span className="font-mono text-[11px] text-dim">{String(count).padStart(2, '0')} ARTICLES</span>
            </div>
            <h2 className="mt-7 font-cond font-bold uppercase tracking-tight leading-[0.95] text-[30px] text-paper">{category.title}</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-dim">{category.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-cond font-bold uppercase tracking-[0.14em] text-[12px] text-paper">Open category <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
            </div>
          </Link>
        })}
      </div>
      <section className="mt-10 border-t hairline pt-5">
        <h2 className="font-cond font-bold uppercase tracking-[0.1em] text-[24px] text-paper">All articles</h2>
        <p className="mt-1 text-[13px] text-dim">A complete alphabetical-style index is available from the articles directory.</p>
        <Link href="/news" className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-line px-4 font-cond font-bold uppercase tracking-[0.14em] text-[13px] text-paper hover:border-pink">Open article index <ChevronRight size={15} /></Link>
      </section>
    </main>
  )
}
