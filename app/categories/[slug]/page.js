'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { ChevronRight, FileText } from 'lucide-react'
import MediaCarousel from '@/components/site/media-carousel'
import { articles, encyclopediaCategories } from '@/lib/content'
import { GhostBadge, StatusBadge, fmtDate } from '@/components/site/ui'
import { Breadcrumb, CategoryHeader } from '@/components/site/wiki'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = encyclopediaCategories.find((item) => item.slug === slug)
  if (!category) return <main className="px-4 sm:px-6 py-20 text-center"><p className="font-cond font-bold uppercase text-[40px] text-paper">CATEGORY NOT FOUND</p><Link href="/categories" className="mt-4 inline-block font-cond uppercase tracking-[0.14em] text-pink">← All categories</Link></main>
  const records = category.articles.map((articleSlug) => articles.find((article) => article.slug === articleSlug)).filter(Boolean)
  return <main className="ambient-bloom px-4 sm:px-6 lg:px-8 py-7 lg:py-10 max-w-[1160px] mx-auto w-full">
    <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Categories', href: '/categories' }, { label: category.title }]} />
    <div className="mt-4"><CategoryHeader title={category.title} image={category.cover} imageAlt={`${category.title} category cover`} description={category.description} count={records.length} countLabel="records"><p className="mt-4 font-mono uppercase tracking-[0.14em] text-[10px] text-dim">Articles retain their individual evidence and source labels</p></CategoryHeader></div>
    <section className="mt-5"><MediaCarousel compact label={`${category.title} · visual index`} items={records.map((article) => ({ src: article.image, label: article.title, alt: article.title }))} /></section>
    <div className="focus-grid mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      {records.map((article, index) => <Link key={article.slug} href={`/news/${article.slug}`} className={`focus-card spotlight-card tech-mask panel overflow-hidden group hover:border-black/35 ${index % 2 ? 'md:mt-10' : ''}`}>
        <div className="corner-brackets film-frame relative aspect-[16/7]"><Image src={article.image} alt={article.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.06] transition-transform duration-700" /><span className="absolute right-4 top-4 z-[4] font-mono text-[10px] tracking-[0.15em] text-paper/80">REC {String(index + 1).padStart(2, '0')}</span></div>
        <div className="p-5">
        <div className="flex items-start justify-between gap-4"><span className="w-9 h-9 rounded-sm border border-line flex items-center justify-center text-pink"><FileText size={16} /></span><span className="flex gap-2"><StatusBadge status={article.category === 'official' ? 'official' : 'analysis'} /><GhostBadge status={article.status} /></span></div>
        <h2 className="mt-6 font-cond font-bold uppercase tracking-tight leading-[0.98] text-[27px] text-paper">{article.title}</h2>
        <p className="mt-3 text-[13px] leading-relaxed text-dim">{article.excerpt}</p>
        <div className="mt-5 pt-3 border-t hairline flex items-center justify-between gap-3"><span className="font-cond uppercase tracking-[0.13em] text-[11px] text-dim">{fmtDate(article.publishedAt)} · {article.readTime} min</span><ChevronRight size={16} className="text-paper group-hover:translate-x-1 transition-transform" /></div>
        </div>
      </Link>)}
    </div>
  </main>
}
