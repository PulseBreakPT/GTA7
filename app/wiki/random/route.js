import { NextResponse } from 'next/server'
import { ENTRIES, KIND_META } from '@/lib/wiki-graph'

// O Special:Random é um redirect, e por isso é um route handler e não uma
// página. Como página, o `redirect()` corria já depois de a casca do
// documento ter começado a ser transmitida, e o Next tinha de se desenrascar
// com um `<meta http-equiv="refresh">` dentro de 84 KB de HTML: funciona,
// mas não é um redirect HTTP e os rastreadores tratam-no como outra coisa.
// Aqui a escolha é feita antes de existir renderização, e a resposta é 307.
//
// `force-dynamic` impede que a escolha seja guardada em cache — era esse o
// receio que antes empurrava o sorteio para o cliente.
export const dynamic = 'force-dynamic'

// `?kind=` restringe o sorteio a um ramo: é o «random in this category» que
// uma wiki tem no rodapé de cada artigo, e não um segundo botão.
export function GET(request) {
  const kind = request.nextUrl.searchParams.get('kind')
  const pool = kind && KIND_META[kind] ? ENTRIES.filter((e) => e.kind === kind) : ENTRIES
  const list = pool.length > 0 ? pool : ENTRIES
  const destino = list.length > 0 ? list[Math.floor(Math.random() * list.length)].href : '/wiki/all'
  return NextResponse.redirect(new URL(destino, request.url), 307)
}
