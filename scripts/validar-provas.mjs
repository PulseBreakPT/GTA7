#!/usr/bin/env node
// Verifica a regra que o glossário do arquivo promete: «confirmed» quer
// dizer que a Rockstar nomeou ou descreveu a coisa em material oficial. Um
// registo que faça a alegação mais forte do arquivo tem de trazer uma fonte
// oficial onde essa alegação se possa conferir.
//
// Corre fora do Next, directamente sobre os dados:
//
//     node scripts/validar-provas.mjs            relatório e código de saída
//     node scripts/validar-provas.mjs --lista    todas as violações, uma a uma
//
// Sai com 1 quando encontra violações, para poder travar uma publicação
// assim que o arquivo estiver limpo. Enquanto não estiver, serve de lista
// de trabalho: é um relatório honesto do que o arquivo afirma a mais.

import * as content from '../lib/content.js'
import { isRockstarUrl } from '../lib/official-links.js'

const listarTudo = process.argv.includes('--lista')

const violacoes = []
let comEstado = 0
let confirmados = 0

for (const [lista, valor] of Object.entries(content)) {
  if (!Array.isArray(valor)) continue
  for (const registo of valor) {
    if (!registo || typeof registo !== 'object' || !registo.status) continue
    comEstado += 1
    if (registo.status !== 'confirmed') continue
    confirmados += 1
    if (isRockstarUrl(registo.sourceUrl)) continue
    violacoes.push({
      lista,
      slug: registo.slug || registo.id || registo.name || '(sem slug)',
      fonte: registo.sourceName || '(sem nome)',
      url: registo.sourceUrl === null || registo.sourceUrl === undefined ? 'nenhum' : String(registo.sourceUrl),
    })
  }
}

console.log('provas do arquivo')
console.log(`  registos com estado declarado: ${comEstado}`)
console.log(`  registos «confirmed»:          ${confirmados}`)
console.log(`  sem fonte oficial:             ${violacoes.length}`)

if (violacoes.length > 0) {
  const porLista = new Map()
  for (const v of violacoes) porLista.set(v.lista, (porLista.get(v.lista) || 0) + 1)
  console.log('\npor lista:')
  for (const [lista, n] of [...porLista.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${lista}`)
  }

  const mostrar = listarTudo ? violacoes : violacoes.slice(0, 15)
  console.log(`\n${listarTudo ? 'todas as violações' : `as primeiras ${mostrar.length}`}:`)
  for (const v of mostrar) console.log(`  [${v.lista}] ${v.slug} — ${v.fonte} -> ${v.url}`)
  if (!listarTudo && violacoes.length > mostrar.length) {
    console.log(`  … e mais ${violacoes.length - mostrar.length}. Usa --lista para as ver todas.`)
  }

  console.log('\nCada um destes diz «CONFIRMED» sem uma página oficial onde isso')
  console.log('se confirme. Ou ganha a fonte, ou desce para verified/analysis/rumour.')
  process.exit(1)
}

console.log('\nTodos os registos «confirmed» trazem fonte oficial.')
