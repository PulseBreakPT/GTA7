// State Manager: what the page looks like before and after every action,
// the transition graph (URL → action → URL), and recovery when the Macaco
// gets stuck in a modal, a redirect loop or a page with no way out.
import { waitStable } from './navigator.mjs'

function snapshotInPage() {
  const text = (document.body?.innerText || '').replace(/\s+/g, ' ').trim()
  let hash = 0
  const sample = text.slice(0, 20000)
  for (let i = 0; i < sample.length; i++) hash = (Math.imul(31, hash) + sample.charCodeAt(i)) | 0
  const visible = (el) => { const r = el.getBoundingClientRect(); if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false; const s = getComputedStyle(el); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' }
  const dialogs = [...document.querySelectorAll('[role="dialog"], dialog[open], [aria-modal="true"]')].filter(visible)
  const main = document.querySelector('main') || document.body
  const items = main ? main.querySelectorAll('article, li, [role="listitem"], [role="row"], a[href] img').length : 0
  const inputs = [...document.querySelectorAll('input:not([type=hidden]), select, textarea')].map((el) => `${el.name || el.id}:${el.type === 'checkbox' ? el.checked : el.value}`).join('|')
  return {
    url: location.href,
    path: location.pathname + location.search,
    title: document.title,
    hash,
    textLength: text.length,
    elements: document.getElementsByTagName('*').length,
    scrollY: Math.round(scrollY),
    docHeight: document.documentElement.scrollHeight,
    dialogs: dialogs.length,
    expanded: document.querySelectorAll('[aria-expanded="true"]').length,
    busy: document.querySelectorAll('[aria-busy="true"]').length,
    // Toggles (favourites, tabs, chips) change state without changing text.
    pressed: document.querySelectorAll('[aria-pressed="true"], [aria-selected="true"], [aria-checked="true"], [data-state="active"], [data-state="on"]').length,
    focus: document.activeElement ? `${document.activeElement.tagName}#${document.activeElement.id || ''}` : '',
    items,
    inputs,
  }
}

export async function snapshot(page) {
  try {
    return await page.evaluate(snapshotInPage)
  } catch {
    return { url: page.url(), path: '', title: '', hash: 0, textLength: 0, elements: 0, scrollY: 0, docHeight: 0, dialogs: 0, expanded: 0, busy: 0, pressed: 0, focus: '', items: 0, inputs: '' }
  }
}

export const changed = (a, b) => a.url !== b.url || a.hash !== b.hash || a.dialogs !== b.dialogs || a.expanded !== b.expanded || a.inputs !== b.inputs || a.elements !== b.elements || a.pressed !== b.pressed

export class StateManager {
  constructor({ startUrl }) {
    this.startUrl = startUrl
    this.transitions = []   // { from, action, to, changed, issues }
    this.recent = []        // last paths, for loop detection
    this.sameCount = 0
    this.dialogStreak = 0
  }

  record(before, description, after, issues = []) {
    this.transitions.push({ from: before.path, action: description, to: after.path, changed: changed(before, after), issues: issues.length })
    this.recent.push(after.path)
    if (this.recent.length > 12) this.recent.shift()
    this.sameCount = changed(before, after) ? 0 : this.sameCount + 1
    this.dialogStreak = after.dialogs > 0 ? this.dialogStreak + 1 : 0
  }

  // Stuck: nothing changes for a while, a dialog that will not go away, or
  // bouncing between the same two pages.
  stuckReason() {
    if (this.sameCount >= 8) return 'no change after 8 actions'
    if (this.dialogStreak >= 12) return 'modal open for 12 actions'
    const r = this.recent
    if (r.length >= 8) {
      const unique = new Set(r.slice(-8))
      if (unique.size <= 2 && r.slice(-8).every((p, i, arr) => i < 2 || p === arr[i - 2]) && r[r.length - 1] !== r[r.length - 2]) return 'ping-pong between two pages'
    }
    return null
  }

  // Escape, close buttons, Back, and finally the start page.
  async recover(page) {
    const steps = []
    try {
      await page.keyboard.press('Escape'); steps.push('Press Escape')
      await waitStable(page, { timeout: 2000 })
      const s1 = await snapshot(page)
      if (s1.dialogs > 0) {
        const close = page.locator('[role="dialog"] button[aria-label*="lose" i], [role="dialog"] [aria-label*="fechar" i], dialog[open] button').first()
        if (await close.count()) { await close.click({ timeout: 2000 }).catch(() => {}); steps.push('Click the dialog close button') }
      }
      await page.goto(this.startUrl, { waitUntil: 'domcontentloaded', timeout: 20000 }); steps.push(`Open ${new URL(this.startUrl).pathname}`)
      await waitStable(page)
    } catch {}
    this.sameCount = 0
    this.dialogStreak = 0
    this.recent = []
    return steps
  }
}
