// Monkey Engine: decides the next action. Random, but seeded and ruled:
// guards run first, then SMART weighs by novelty and realistic journeys,
// while CHAOS spreads its choices across everything, including the strange.
import { isDestructive } from '../guards/destructive-actions.mjs'
import { isAuthPage } from '../guards/auth.mjs'
import { pickFuzz } from '../fuzzers/inputs.mjs'
import { formPolicy } from '../fuzzers/forms.mjs'
import { mutateUrl } from '../fuzzers/navigation.mjs'

const NON_HTML = /\.(pdf|xml|zip|json|txt|csv|rss|ico|png|jpe?g|webp|gif|svg|mp4|webm)(\?|$)/i

// Realistic visitor journeys for SMART: a queue of wished-for action kinds.
const JOURNEYS = [
  ['search', 'card|link', 'link', 'back', 'select|tab|checkbox'],
  ['link', 'card', 'link', 'back', 'scroll', 'card'],
  ['menu', 'menuitem|link', 'back', 'scroll'],
  ['tab', 'tab', 'scroll', 'card|link'],
  ['pagination', 'card', 'back', 'pagination'],
  ['select|checkbox', 'card', 'back', 'select|checkbox'],
]

const KIND_WEIGHT = {
  smart: { link: 3, card: 3, pagination: 2, tab: 2.5, menu: 2, menuitem: 2, button: 1.5, toggle: 1.5, select: 2, checkbox: 1.5, search: 2.5, input: 1, close: 0.5 },
  chaos: { link: 1, card: 1, pagination: 1, tab: 1, menu: 1, menuitem: 1, button: 1, toggle: 1, select: 1, checkbox: 1, search: 1, input: 1, close: 1 },
}

export class MonkeyEngine {
  constructor({ rng, mode, crawler, origin }) {
    this.rng = rng
    this.mode = mode
    this.crawler = crawler
    this.origin = origin
    this.plan = []
    this.skipped = new Map()   // reason → count
  }

  allowed(candidates, state) {
    return candidates.filter((c) => {
      const reason = isDestructive(c)
        || (c.external ? 'external link' : null)
        || (c.href && NON_HTML.test(c.href) ? 'non-HTML resource' : null)
        || (c.href && c.href.split('#')[0] === state.url.split('#')[0] && c.kind !== 'tab' ? 'same page link' : null)
        || (['search', 'input'].includes(c.kind) && formPolicy(c, state.path) === 'skip' ? 'auth form' : null)
        || (isAuthPage(state.path) && ['button', 'input', 'checkbox', 'select'].includes(c.kind) && c.form ? 'auth page form' : null)
      if (reason) this.skipped.set(reason, (this.skipped.get(reason) || 0) + 1)
      return !reason
    })
  }

  // One action for the current page.
  choose(candidates, state) {
    const pool = this.allowed(candidates, state)
    // With a dialog open, a visitor deals with the dialog first.
    if (state.dialogs > 0) {
      const inside = pool.filter((c) => c.inDialog)
      if (inside.length && this.rng.chance(this.mode === 'chaos' ? 0.5 : 0.75)) {
        const close = inside.find((c) => c.kind === 'close' || /close|fechar|×|✕/i.test(c.name))
        if (close && this.rng.chance(0.4)) return this.act(close, state, 'close the open dialog')
        return this.act(this.rng.pick(inside), state, 'use the open dialog')
      }
      if (this.rng.chance(0.3)) return { type: 'key', value: 'Escape', why: 'dismiss dialog' }
    }
    return this.mode === 'chaos' ? this.chooseChaos(pool, state) : this.chooseSmart(pool, state)
  }

  chooseSmart(pool, state) {
    if (!this.plan.length && this.rng.chance(0.35)) this.plan = [...this.rng.pick(JOURNEYS)]
    if (this.plan.length) {
      const wish = this.plan.shift()
      const kinds = wish.split('|')
      if (kinds.includes('back')) return { type: 'back', why: 'journey: go back' }
      if (kinds.includes('scroll')) return { type: 'scroll', value: this.rng.between(400, 1400), why: 'journey: scroll' }
      const matches = pool.filter((c) => kinds.includes(c.kind))
      if (matches.length) {
        const pick = this.rng.weighted(matches.map((c) => ({ c, weight: this.crawler.novelty(state.url, c) })))
        return this.act(pick.c, state, `journey: ${wish}`)
      }
    }
    const unvisited = this.crawler.unvisited(80)
    const meta = [
      { weight: 0.6, make: () => ({ type: 'scroll', value: this.rng.between(300, 1600), why: 'look further down' }) },
      { weight: 0.35, make: () => ({ type: 'back', why: 'go back' }) },
      { weight: unvisited.length ? 1.2 : 0, make: () => ({ type: 'goto', url: new URL(this.rng.pick(unvisited), this.origin).toString(), why: 'visit a discovered, unvisited page' }) },
    ]
    const options = [
      ...pool.map((c) => ({ weight: (KIND_WEIGHT.smart[c.kind] || 1) * this.crawler.novelty(state.url, c) * (c.inViewport ? 1.3 : 1), make: () => this.act(c, state, 'novelty') })),
      ...meta,
    ]
    return this.rng.weighted(options).make()
  }

  chooseChaos(pool, state) {
    const keys = ['Tab', 'Escape', 'Enter', 'ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'End', 'Home', 'Shift+Tab']
    const meta = [
      { weight: 1, make: () => ({ type: 'scroll', value: this.rng.between(-2000, 3000), why: 'chaos scroll' }) },
      { weight: 0.5, make: () => ({ type: 'scroll-end', why: 'chaos: jump to the bottom' }) },
      { weight: 0.8, make: () => ({ type: 'back', why: 'chaos back' }) },
      { weight: 0.4, make: () => ({ type: 'forward', why: 'chaos forward' }) },
      { weight: 0.35, make: () => ({ type: 'reload', why: 'chaos reload' }) },
      { weight: 0.8, make: () => ({ type: 'key', value: this.rng.pick(keys), why: 'chaos key' }) },
      { weight: 0.25, make: () => ({ type: 'resize', value: { width: this.rng.between(320, 1600), height: this.rng.between(480, 1100) }, why: 'chaos resize' }) },
      { weight: 0.6, make: () => ({ type: 'goto', url: mutateUrl(this.rng, state.url), why: 'chaos: mutated URL' }) },
    ]
    const options = [
      ...pool.map((c) => ({ weight: (KIND_WEIGHT.chaos[c.kind] || 1) * (1 + 0.3 * this.crawler.novelty(state.url, c)), make: () => this.act(c, state, 'chaos') })),
      ...meta,
    ]
    return this.rng.weighted(options).make()
  }

  // Turns a candidate into a concrete action.
  act(c, state, why) {
    if (c.kind === 'select' && c.options?.length) {
      return { type: 'select', element: c, value: this.rng.pick(c.options), why }
    }
    if (c.kind === 'search' || c.kind === 'input') {
      const policy = formPolicy(c, state.path)
      const fuzz = pickFuzz(this.rng, { realistic: this.mode === 'smart' && this.rng.chance(0.65) })
      return { type: 'fill', element: c, value: fuzz.value, fuzz: fuzz.label, submit: policy === 'fill-and-submit' && this.rng.chance(0.8), why }
    }
    if (this.mode === 'chaos') {
      const roll = this.rng.next()
      if (roll < 0.12) return { type: 'rapid-click', element: c, why }
      if (roll < 0.22) return { type: 'double-click', element: c, why }
      if (roll < 0.3) return { type: 'hover', element: c, why }
    }
    return { type: c.kind === 'checkbox' ? 'check' : 'click', element: c, why }
  }
}
