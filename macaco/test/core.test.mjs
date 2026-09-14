import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRng, deriveSeed } from '../replay/seed.mjs'
import { isDestructive } from '../guards/destructive-actions.mjs'
import { isAuthForm } from '../guards/auth.mjs'
import { Deduplicator } from '../reporter/deduplication.mjs'
import { Crawler } from '../engine/crawler.mjs'

test('the same seed gives the same sequence', () => {
  const a = createRng(482913), b = createRng(482913)
  const seqA = Array.from({ length: 50 }, () => a.int(1000))
  const seqB = Array.from({ length: 50 }, () => b.int(1000))
  assert.deepEqual(seqA, seqB)
  assert.notDeepEqual(seqA, Array.from({ length: 50 }, () => createRng(482914).int(1000)))
})

test('session seeds are stable per run, mode, viewport and index', () => {
  assert.equal(deriveSeed(843921, 'smart', 'mobile', 0), deriveSeed(843921, 'smart', 'mobile', 0))
  assert.notEqual(deriveSeed(843921, 'smart', 'mobile', 0), deriveSeed(843921, 'smart', 'desktop', 0))
})

test('guards stop destructive actions', () => {
  for (const text of ['Delete', 'Remove from collection', 'Sign out securely', 'Log out', 'Purchase', 'Buy now', 'Checkout', 'Publish', 'Ban user', 'Reset password']) {
    assert.ok(isDestructive({ text }), `${text} should be blocked`)
  }
  assert.ok(isDestructive({ text: 'Open', href: 'https://lusorae.pt/admin' }))
  assert.ok(isDestructive({ text: 'Mail', href: 'mailto:x@y.z' }))
  for (const text of ['Vehicles', 'Next', 'Search', 'Reset filters', 'Open profile', 'Show six']) {
    assert.equal(isDestructive({ text }), null, `${text} should be allowed`)
  }
})

test('auth forms are recognised', () => {
  assert.ok(isAuthForm({ hasPassword: true }))
  assert.ok(isAuthForm({ action: '/api/auth/login' }))
  assert.ok(!isAuthForm({ action: '/wiki/search', role: 'search' }))
})

test('the deduplicator turns 300 identical errors into one incident', () => {
  const d = new Deduplicator()
  for (let i = 0; i < 300; i++) d.add({ check: 'js-exception', message: `TypeError: cannot read x of undefined at line ${i}` }, { pattern: `/p/${i}`, path: `/p/${i}`, viewport: 'mobile', viewportLabel: '390x844' })
  const list = d.list()
  assert.equal(list.length, 1)
  assert.equal(list[0].occurrences, 300)
  assert.equal(list[0].severity, 'HIGH')
})

test('the same component failing on many page types is one incident', () => {
  const d = new Deduplicator()
  for (const pattern of ['/database/vehicles/:slug', '/database/weapons/:slug', '/map/:slug']) {
    d.add({ check: 'overlap', message: 'Controls overlap (53%)', selector: 'nav.wiki-page-tools > a.in' }, { pattern, path: pattern, viewport: 'desktop', viewportLabel: '1440x900' })
  }
  d.add({ check: 'overlap', message: 'Controls overlap', selector: 'div.other > a' }, { pattern: '/news', path: '/news', viewport: 'desktop', viewportLabel: '1440x900' })
  const list = d.list()
  assert.equal(list.length, 2)
  assert.equal(list.find((i) => i.selector.includes('page-tools')).occurrences, 3)
})

test('the crawler learns route patterns', () => {
  const c = new Crawler('https://lusorae.pt')
  for (let i = 0; i < 25; i++) c.visit(`https://lusorae.pt/database/vehicles/car${String.fromCharCode(97 + i)}`)
  for (const page of ['all', 'search', 'help', 'glossary', 'portals']) c.visit(`https://lusorae.pt/wiki/${page}`)
  assert.equal(c.pattern('https://lusorae.pt/database/vehicles/stanier'), '/database/vehicles/:slug')
  assert.equal(c.pattern('https://lusorae.pt/database/vehicles/bati-801'), '/database/vehicles/:slug')
  assert.equal(c.pattern('https://lusorae.pt/database/vehicles'), '/database/vehicles')
  assert.equal(c.pattern('https://lusorae.pt/wiki/search'), '/wiki/search')
})
