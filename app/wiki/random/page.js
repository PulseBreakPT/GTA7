import { redirect } from 'next/navigation'
import { ENTRIES, KIND_META } from '@/lib/wiki-graph'

// O Special:Random resolve-se no servidor e responde com um redirect, para
// que funcione sem JavaScript, nos leitores de ecrã, nos rastreadores e numa
// ligação partilhada. A escolha era feita no cliente por receio de a cache
// servir sempre a mesma entrada; `force-dynamic` resolve isso sem abdicar do
// redirect — a rota deixa de ser pré-renderizada e sorteia a cada pedido.
export const dynamic = 'force-dynamic'

// `?kind=` restringe o sorteio a um ramo: é o «random in this category» que
// uma wiki tem no rodapé de cada artigo, e não um segundo botão.
export default async function RandomEntryPage({ searchParams }) {
  const params = (await searchParams) || {}
  const kind = typeof params.kind === 'string' ? params.kind : null
  const pool = kind && KIND_META[kind] ? ENTRIES.filter((e) => e.kind === kind) : ENTRIES
  const list = pool.length > 0 ? pool : ENTRIES

  if (list.length === 0) redirect('/wiki/all')
  redirect(list[Math.floor(Math.random() * list.length)].href)
}
