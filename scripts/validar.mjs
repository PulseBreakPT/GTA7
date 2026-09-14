#!/usr/bin/env node
// A validação do arquivo, num comando só.
//
//     node scripts/validar.mjs            erros e avisos
//     node scripts/validar.mjs --lista    todas as ocorrências, sem cortar
//
// A regra que governa isto: o sítio nunca publica um estado que os próprios
// dados não consigam provar. O que aqui se mede é sempre uma contradição
// verificável — um ficheiro que não existe, uma referência que não resolve,
// um rótulo que promete um documento e aponta para outro — e nunca uma
// questão de gosto.
//
// Há duas severidades, e a diferença importa:
//
//   ERRO   quebra alguma coisa ou afirma o que é falso. Trava a publicação.
//   AVISO  dívida conhecida, registada para não se esquecer. Não trava.
//
// Os 373 registos de nível forte sem fonte oficial são aviso e não erro de
// propósito: são decisão editorial por tomar, e travar a publicação por
// causa deles impediria qualquer trabalho até alguém os limpar todos.

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import * as c from '../lib/content.js'
import * as w from '../lib/world-content.js'
import { isRockstarUrl } from '../lib/official-links.js'
import { CATEGORIES, ENTRIES, KIND_META } from '../lib/wiki-graph.js'

const listarTudo = process.argv.includes('--lista')
const PUBLIC = new URL('../public', import.meta.url).pathname
const HOJE = new Date().toISOString().slice(0, 10)

const erros = []
const avisos = []
const erro = (regra, detalhe) => erros.push({ regra, detalhe })
const aviso = (regra, detalhe) => avisos.push({ regra, detalhe })

const listas = Object.entries(c).filter(([, v]) => Array.isArray(v))
const todosOsItens = listas.flatMap(([nome, lista]) =>
  lista.filter((x) => x && typeof x === 'object').map((item) => ({ nome, item, id: item.slug || item.id || item.name || '?' })))

// --- Imagens partidas -----------------------------------------------------
const imagemOk = (valor) => typeof valor !== 'string' || !valor.startsWith('/') || existsSync(PUBLIC + valor)
for (const { nome, item, id } of todosOsItens) {
  for (const campo of ['image', 'cover', 'contextImage']) {
    if (!imagemOk(item[campo])) erro('imagem-inexistente', `${nome}/${id}.${campo} -> ${item[campo]}`)
  }
  for (const [i, g] of (Array.isArray(item.gallery) ? item.gallery : []).entries()) {
    if (!imagemOk(g)) erro('imagem-inexistente', `${nome}/${id}.gallery[${i}] -> ${g}`)
  }
}
for (const [chave, valor] of Object.entries(c.IMG || {})) {
  if (!imagemOk(valor)) erro('imagem-inexistente', `IMG.${chave} -> ${valor}`)
}
for (const item of w.worldEntries || []) {
  if (!imagemOk(item.image)) erro('imagem-inexistente', `world/${item.slug}.image -> ${item.image}`)
}

// --- Slugs duplicados -----------------------------------------------------
for (const [nome, lista] of listas) {
  const contagem = new Map()
  for (const item of lista) {
    if (!item || typeof item !== 'object') continue
    const s = item.slug || item.id
    if (s) contagem.set(s, (contagem.get(s) || 0) + 1)
  }
  for (const [s, n] of contagem) if (n > 1) erro('slug-duplicado', `${nome}: "${s}" ${n}x`)
}

// --- Referências que não resolvem ----------------------------------------
const idsRegioes = new Set((c.regions || []).map((x) => x.id))
const rotulosRegioes = new Set((c.regions || []).map((x) => String(x.label).toUpperCase().trim()))
const nomesPersonagens = new Set((c.characters || []).map((x) => String(x.name).toUpperCase().trim()))
const slugsPersonagens = new Set((c.characters || []).map((x) => x.slug))
const slugsLocais = new Set((c.locations || []).map((x) => x.slug))
const slugsArtigos = new Set((c.articles || []).map((x) => x.slug))

for (const l of c.locations || []) {
  if (l.region && !idsRegioes.has(l.region)) erro('referencia-orfa', `locations/${l.slug}.region -> "${l.region}"`)
}
for (const f of c.factions || []) {
  if (f.region && !rotulosRegioes.has(String(f.region).toUpperCase().trim())) {
    erro('referencia-orfa', `factions/${f.slug}.region -> "${f.region}"`)
  }
}
for (const e of c.easterEggs || []) {
  if (e.location && !slugsLocais.has(e.location)) erro('referencia-orfa', `easterEggs/${e.slug}.location -> "${e.location}"`)
}
for (const r of c.relationships || []) {
  for (const lado of ['a', 'b']) {
    if (!slugsPersonagens.has(r[lado])) erro('referencia-orfa', `relationships.${lado} -> "${r[lado]}"`)
  }
}
const verPersonagem = (valor, onde) => {
  for (const parte of String(valor || '').split('·').map((x) => x.trim()).filter(Boolean)) {
    if (!nomesPersonagens.has(parte.toUpperCase())) erro('referencia-orfa', `${onde} -> "${parte}"`)
  }
}
for (const v of c.vehicles || []) if (v.character) verPersonagem(v.character, `vehicles/${v.slug}.character`)
for (const a of c.weapons || []) if (a.character) verPersonagem(a.character, `weapons/${a.slug}.character`)
for (const cat of c.encyclopediaCategories || []) {
  for (const s of cat.articles || []) if (!slugsArtigos.has(s)) erro('referencia-orfa', `categoria ${cat.slug} -> artigo "${s}"`)
}

// --- Conteúdo órfão e categorias vazias -----------------------------------
const artigosEmCategoria = new Set((c.encyclopediaCategories || []).flatMap((x) => x.articles || []))
for (const a of c.articles || []) {
  if (!artigosEmCategoria.has(a.slug)) erro('artigo-orfao', `articles/${a.slug} não está em nenhuma categoria navegável`)
}
for (const cat of c.encyclopediaCategories || []) {
  if (!(cat.articles || []).length) erro('categoria-vazia', `categoria ${cat.slug} não tem artigos`)
}
for (const categoria of CATEGORIES) {
  if (categoria.members.length === 0) erro('categoria-vazia', `categoria do grafo "${categoria.slug}" sem membros`)
}

// --- Estados de evidência impossíveis -------------------------------------
const ESPERADO = {
  confirmed: 'OFFICIAL — NAMED',
  verified: 'OFFICIAL — DEPICTED',
  category: 'OFFICIAL — CATEGORY CONFIRMED',
  analysis: 'UNVERIFIED IDENTIFICATION',
  rumour: 'SPECULATIVE',
}
for (const { nome, item, id } of todosOsItens) {
  // Veículos e armas derivam o rótulo do «bible», que é mais fino do que o
  // estado: é exceção declarada e não contradição.
  if (nome === 'vehicles' || nome === 'weapons') continue
  if (!item.status || !item.evidenceStatus) continue
  const esperado = ESPERADO[item.status]
  if (esperado && item.evidenceStatus !== esperado) {
    erro('evidencia-contradiz-estado', `${nome}/${id}: status=${item.status} mas evidenceStatus="${item.evidenceStatus}"`)
  }
}

// --- O rótulo da fonte tem de descrever o documento ligado ----------------
const DOCUMENTOS = [
  [/extended look/i, '/VI/an-extended-look'],
  [/editions/i, '/VI/editions'],
  [/newswire/i, '/newswire/'],
]
for (const { nome, item, id } of todosOsItens) {
  if (!item.sourceName || !item.sourceUrl) continue
  for (const [padrao, fragmento] of DOCUMENTOS) {
    if (padrao.test(item.sourceName) && !item.sourceUrl.includes(fragmento)) {
      erro('fonte-nao-bate-com-rotulo', `${nome}/${id}: "${item.sourceName}" -> ${item.sourceUrl}`)
    }
  }
}

// --- Datas impossíveis ----------------------------------------------------
const dataOk = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d)
for (const { nome, item, id } of todosOsItens) {
  for (const campo of ['publishedAt', 'updatedAt']) {
    const d = item[campo]
    if (d == null) continue
    if (!dataOk(d)) { erro('data-malformada', `${nome}/${id}.${campo} = "${d}"`); continue }
    if (d > HOJE) erro('data-no-futuro', `${nome}/${id}.${campo} = ${d} (hoje é ${HOJE})`)
  }
  if (dataOk(item.publishedAt) && dataOk(item.updatedAt) && item.updatedAt < item.publishedAt) {
    erro('revisao-antes-da-publicacao', `${nome}/${id}: updated ${item.updatedAt} < published ${item.publishedAt}`)
  }
}

// --- Texto que denuncia geração cega --------------------------------------
const CAMPOS_ID = new Set(['region', 'location', 'category', 'group', 'branch', 'cls', 'type', 'icon', 'color', 'id', 'slug', 'image', 'contextImage', 'sourceUrl'])
const percorrerTexto = (valor, caminho, visitar) => {
  if (typeof valor === 'string') return visitar(valor, caminho)
  if (Array.isArray(valor)) return valor.forEach((v, i) => percorrerTexto(v, `${caminho}[${i}]`, visitar))
  if (valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) percorrerTexto(v, `${caminho}.${k}`, visitar)
  }
}
for (const { nome, item, id } of todosOsItens) {
  percorrerTexto(item, `${nome}/${id}`, (texto, caminho) => {
    const campo = caminho.split('.').pop().replace(/\[\d+\]$/, '')
    if (CAMPOS_ID.has(campo) || texto.length < 3 || texto.startsWith('/') || texto.startsWith('http')) return
    if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(texto)) erro('texto-tecnico-na-ui', `${caminho}: ${texto.slice(0, 60)}`)
    if (/\S\s+[.,;:!?](?![0-9])/.test(texto)) erro('espaco-antes-de-pontuacao', `${caminho}`)
    const repetida = texto.match(/\b(\w{3,}) \1\b/i)
    if (repetida) erro('palavra-repetida', `${caminho}: …${repetida[0]}…`)
    if (/\b(a|an) (industry|services|infrastructure)\b/i.test(texto)) erro('artigo-mal-concordado', `${caminho}`)
  })
}

// --- Duplicados semânticos ------------------------------------------------
// «Ocean View Hotel» e «Oceanview Hotel» são a mesma coisa escrita de duas
// maneiras, e a segunda cria uma entidade paralela com backlinks próprios.
// Normaliza-se o nome — sem acentos, apóstrofos, hífens, cifrões nem
// espaços — e duas entradas da mesma lista que caiam no mesmo nome
// normalizado são, quase de certeza, uma entidade a duplicar-se. O Allied
// Crystal Refinery e o Allied Crystal Sugar Refinery foram encontrados à
// mão; uma regra apanha-os antes de existirem.
const normalizarNome = (valor) => String(valor || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/[^a-z0-9]/g, '')

for (const [nome, lista] of listas) {
  const porNome = new Map()
  for (const item of lista) {
    if (!item || typeof item !== 'object' || !item.name) continue
    const chave = normalizarNome(item.name)
    if (!chave) continue
    if (!porNome.has(chave)) porNome.set(chave, [])
    porNome.get(chave).push(item.slug || item.id || item.name)
  }
  for (const [chave, slugs] of porNome) {
    if (slugs.length > 1) erro('duplicado-semantico', `${nome}: ${slugs.join(' / ')} — mesmo nome normalizado «${chave}»`)
  }
}

// --- Campos que se contradizem dentro do mesmo registo --------------------
// `unpublished: true` afirma que a Rockstar não publicou números. Trazer
// valores diferentes de zero ao lado disso é o registo a desmentir-se, e é
// exactamente o tipo de contradição que nunca deve chegar ao leitor.
for (const { nome, item, id } of todosOsItens) {
  if (!item.unpublished || !Array.isArray(item.stats)) continue
  if (item.stats.some((n) => typeof n === 'number' && n > 0)) {
    erro('campos-contraditorios', `${nome}/${id}: unpublished=true mas stats trazem valores (${item.stats.join(', ')})`)
  }
}

// --- Galerias com o mesmo ficheiro duas vezes -----------------------------
for (const { nome, item, id } of todosOsItens) {
  const vistos = new Set()
  for (const src of Array.isArray(item.gallery) ? item.gallery : []) {
    if (vistos.has(src)) erro('galeria-duplicada', `${nome}/${id}: ${src} repetido`)
    vistos.add(src)
  }
}

// --- O mesmo slug em listas diferentes ------------------------------------
// Não é erro por si: um segredo e um local podem partilhar nome. Mas é o
// sinal de que duas rotas podem estar a descrever a mesma coisa de maneiras
// diferentes, e vale a pena olhar.
const slugsPorLista = new Map()
for (const { nome, item } of todosOsItens) {
  const s = item.slug || item.id
  if (!s) continue
  if (!slugsPorLista.has(s)) slugsPorLista.set(s, new Set())
  slugsPorLista.get(s).add(nome)
}
for (const [s, onde] of slugsPorLista) {
  if (onde.size > 1) aviso('slug-em-varias-listas', `"${s}" existe em ${[...onde].join(', ')}`)
}

// --- Fronteiras de Suspense que apagam o estado 404 -----------------------
//
// Um `loading.js` cria uma fronteira de Suspense sobre tudo o que está abaixo
// dele no mapa de rotas. O Next transmite o shell mal a fronteira existe, o
// estado HTTP 200 sai com esse primeiro pedaço, e um `notFound()` lançado
// depois já só consegue trocar o corpo — o estado fica 200 para sempre.
//
// Isto esteve a acontecer no sítio inteiro por causa de um `app/loading.js`
// na raiz: cada ficha inexistente respondia 200 com o texto do 404, e os
// rastreadores indexavam gralhas de endereço como se fossem registos. Pior,
// qualquer verificação de ligações partidas ficava cega — nenhum endereço
// errado se distinguia de um bom.
//
// A regra mede a estrutura, não o gosto: um `loading.js` não pode ter, abaixo
// de si, nenhuma rota que chame `notFound()`.
const APP = new URL('../app', import.meta.url).pathname

const ficheirosDeRota = (dir) => {
  const achados = []
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    const caminho = join(dir, entrada.name)
    if (entrada.isDirectory()) achados.push(...ficheirosDeRota(caminho))
    else if (/^(page|layout|route)\.(js|jsx|ts|tsx)$/.test(entrada.name)) achados.push(caminho)
  }
  return achados
}

const chamaNotFound = (caminho) => /\bnotFound\s*\(/.test(readFileSync(caminho, 'utf8'))

const segmentosComLoading = (dir) => {
  const achados = []
  for (const entrada of readdirSync(dir, { withFileTypes: true })) {
    if (entrada.isDirectory()) achados.push(...segmentosComLoading(join(dir, entrada.name)))
    else if (/^loading\.(js|jsx|ts|tsx)$/.test(entrada.name)) achados.push(dir)
  }
  return achados
}

for (const segmento of segmentosComLoading(APP)) {
  const culpados = ficheirosDeRota(segmento)
    .filter(chamaNotFound)
    .map((f) => f.slice(APP.length))
  if (culpados.length) {
    erro(
      'loading-apaga-404',
      `app${segmento.slice(APP.length)}/loading.js transmite o shell antes de ` +
        `${culpados.join(', ')} poder devolver 404 — essas rotas passam a responder 200`,
    )
  }
}

// --- O índice de cada ramo tem de ser uma página que existe ---------------
//
// KIND_META guarda dois endereços por ramo, e são coisas diferentes: `base` é
// o prefixo das fichas (`base/slug`) e `index` é a página onde o ramo se
// percorre. Em nove ramos coincidem por acaso, e esse acaso escondeu um erro:
// as localizações têm fichas em `/map/location/<slug>` mas `/map/location`
// não é página nenhuma, e quem tratava o prefixo como índice mandava o leitor
// para um 404 — o único que o rastreio de ligações encontrou em 4252 páginas.
//
// Aqui mede-se a existência do ficheiro de rota, não o gosto.
const temPagina = (rota) =>
  ['page.js', 'page.jsx', 'page.ts', 'page.tsx'].some((f) => existsSync(join(APP, rota, f)))

for (const [ramo, meta] of Object.entries(KIND_META)) {
  if (!meta.index) {
    erro('ramo-sem-indice', `KIND_META.${ramo} não declara index`)
  } else if (!temPagina(meta.index)) {
    erro('indice-de-ramo-inexistente', `KIND_META.${ramo}.index -> "${meta.index}" não corresponde a nenhuma página`)
  }
}

// --- Dívida editorial conhecida (aviso, não erro) -------------------------
const FORTES = new Set(['confirmed', 'verified', 'category'])
let fortes = 0
for (const { nome, item, id } of todosOsItens) {
  if (!FORTES.has(item.status)) continue
  fortes += 1
  if (!isRockstarUrl(item.sourceUrl)) aviso('nivel-forte-sem-fonte-oficial', `${nome}/${id} (${item.status}) — ${item.sourceName || 'sem fonte'}`)
}

// --- Relatório ------------------------------------------------------------
const agrupar = (lista) => {
  const mapa = new Map()
  for (const x of lista) mapa.set(x.regra, (mapa.get(x.regra) || 0) + 1)
  return [...mapa.entries()].sort((a, b) => b[1] - a[1])
}

console.log('validação do arquivo')
console.log(`  entradas no grafo:        ${ENTRIES.length}`)
console.log(`  registos com estado:      ${todosOsItens.filter((x) => x.item.status).length}`)
console.log(`  níveis fortes:            ${fortes}`)
console.log(`  ERROS:                    ${erros.length}`)
console.log(`  avisos:                   ${avisos.length}`)

if (erros.length) {
  console.log('\nERROS (travam a publicação):')
  for (const [regra, n] of agrupar(erros)) console.log(`  ${String(n).padStart(4)}  ${regra}`)
  console.log('')
  const mostrar = listarTudo ? erros : erros.slice(0, 20)
  for (const e of mostrar) console.log(`  [${e.regra}] ${e.detalhe}`)
  if (!listarTudo && erros.length > mostrar.length) console.log(`  … e mais ${erros.length - mostrar.length}. Usa --lista.`)
}

if (avisos.length) {
  console.log('\navisos (dívida registada, não travam):')
  for (const [regra, n] of agrupar(avisos)) console.log(`  ${String(n).padStart(4)}  ${regra}`)
  if (listarTudo) for (const a of avisos) console.log(`  [${a.regra}] ${a.detalhe}`)
}

if (!erros.length) console.log('\nSem erros: os dados provam o que a interface afirma.')
process.exit(erros.length ? 1 : 0)
