// Navigator: finds what can be acted on in the current page, describes it in
// a way that survives a reload (for replay), performs actions and waits for
// the page to settle.
import { sleep } from '../guards/rate-limit.mjs'

// Runs in the browser. Marks every candidate with data-macaco-id and returns
// a plain description of each one.
function collectCandidates() {
  // checkVisibility respeita <details> fechados e content-visibility: o
  // Chrome dá caixa aos filhos de um <details> fechado, e o Macaco tomava-os
  // por visíveis.
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return false
    if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true })) return false
    const s = getComputedStyle(el)
    return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05
  }
  const nameOf = (el) => (el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.value || el.getAttribute('placeholder') || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 80)
  const kindOf = (el) => {
    const tag = el.tagName.toLowerCase()
    const role = el.getAttribute('role') || ''
    const type = (el.getAttribute('type') || '').toLowerCase()
    if (tag === 'select') return 'select'
    if (tag === 'summary') return 'toggle'
    if (tag === 'textarea') return 'input'
    if (tag === 'input') {
      if (['checkbox', 'radio'].includes(type)) return 'checkbox'
      if (['submit', 'button', 'reset', 'image'].includes(type)) return 'button'
      if (type === 'search' || /search|query|^q$/i.test(el.name || '') || /search/i.test(el.getAttribute('placeholder') || '')) return 'search'
      if (['hidden', 'file', 'password'].includes(type)) return null
      return 'input'
    }
    if (role === 'tab') return 'tab'
    if (role === 'menuitem' || role === 'option') return 'menuitem'
    if (el.hasAttribute('aria-expanded') || el.getAttribute('aria-haspopup')) return 'menu'
    if (/close|dismiss|fechar/i.test(el.getAttribute('aria-label') || '') ) return 'close'
    if (tag === 'a') {
      const text = (el.innerText || '').trim()
      if (/^(next|previous|prev|\d+|›|‹|»|«)$/i.test(text) || el.closest('[aria-label*="agination" i], nav[aria-label*="page" i]')) return 'pagination'
      if (el.querySelector('img, picture') || (el.innerText || '').length > 60) return 'card'
      return 'link'
    }
    return 'button'
  }
  const origin = location.origin
  // Posição de cada elemento entre os da mesma etiqueta e o mesmo nome, em
  // ordem do documento — é o que o replay usa para o voltar a encontrar.
  // Índice construído uma vez por etiqueta (numa lista de 380 cartões, a
  // procura elemento a elemento era quadrática).
  const nthIndex = new Map()
  const nthOf = (el) => {
    const tag = el.tagName
    if (!nthIndex.has(tag)) {
      const byName = new Map()
      const positions = new Map()
      for (const x of document.querySelectorAll(tag)) {
        const key = nameOf(x)
        const n = byName.get(key) || 0
        positions.set(x, n)
        byName.set(key, n + 1)
      }
      nthIndex.set(tag, positions)
    }
    return nthIndex.get(tag).get(el) || 0
  }
  const nodes = document.querySelectorAll('a[href], button, [role="button"], [role="tab"], [role="menuitem"], [role="option"], summary, select, input, textarea, [aria-expanded], [onclick]')
  const out = []
  let id = 0
  for (const el of nodes) {
    if (el.closest('[aria-hidden="true"], [inert]') || el.disabled || el.getAttribute('aria-disabled') === 'true') continue
    if (!visible(el)) continue
    const kind = kindOf(el)
    if (!kind) continue
    const mid = `m${id++}`
    el.setAttribute('data-macaco-id', mid)
    const r = el.getBoundingClientRect()
    const href = el.tagName === 'A' ? el.href : null
    const form = el.form || el.closest('form')
    const dialog = el.closest('[role="dialog"], dialog[open], [aria-modal="true"]')
    out.push({
      mid, kind,
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute('role') || null,
      name: nameOf(el),
      text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80),
      ariaLabel: el.getAttribute('aria-label'),
      title: el.getAttribute('title'),
      value: el.tagName === 'INPUT' ? el.value : null,
      inputType: (el.getAttribute('type') || '').toLowerCase() || null,
      href,
      external: href ? new URL(href, origin).origin !== origin : false,
      download: el.hasAttribute('download'),
      expanded: el.getAttribute('aria-expanded'),
      selected: el.getAttribute('aria-selected'),
      inDialog: Boolean(dialog),
      inNav: Boolean(el.closest('nav, header')),
      inViewport: r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth,
      rect: { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
      formMethod: form ? (form.getAttribute('method') || 'get').toLowerCase() : null,
      form: form ? {
        action: form.getAttribute('action') || '',
        id: form.id, name: form.getAttribute('name'),
        label: form.getAttribute('aria-label') || '',
        role: form.getAttribute('role') || '',
        hasPassword: Boolean(form.querySelector('input[type="password"]')),
      } : null,
      options: el.tagName === 'SELECT' ? [...el.options].map((o) => o.value).slice(0, 30) : null,
      nth: nthOf(el),
    })
  }
  return out
}

export async function discover(page) {
  try {
    return await page.evaluate(collectCandidates)
  } catch {
    return []
  }
}

// A replayable description of a candidate: enough to find it again after a
// reload, without depending on the per-page data-macaco-id.
export const descriptorOf = (c) => ({ tag: c.tag, role: c.role, name: c.name, href: c.href, kind: c.kind, nth: c.nth })

// Finds an element again from its descriptor (used in replay).
export async function locate(page, d) {
  const handle = await page.evaluateHandle((desc) => {
    const nameOf = (el) => (el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.value || el.getAttribute('placeholder') || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 80)
    // A mesma contagem da descoberta: pelo nome, em ordem do documento.
    const same = [...document.querySelectorAll(desc.tag)].filter((el) => nameOf(el) === desc.name)
    const exact = same[desc.nth]
    if (exact && (!desc.href || exact.href === desc.href)) return exact
    return same.find((el) => !desc.href || el.href === desc.href) || null
  }, d)
  const el = handle.asElement()
  if (!el) await handle.dispose()
  return el
}

// Waits for the page to settle: navigation, network and a quiet DOM.
export async function waitStable(page, { timeout = 6000 } = {}) {
  const start = Date.now()
  try { await page.waitForLoadState('domcontentloaded', { timeout }) } catch {}
  try { await page.waitForLoadState('networkidle', { timeout: Math.min(3000, timeout) }) } catch {}
  try {
    await page.evaluate((quietMs) => new Promise((resolve) => {
      let timer = setTimeout(done, quietMs)
      const observer = new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(done, quietMs) })
      function done() { observer.disconnect(); resolve() }
      observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, characterData: true })
      setTimeout(done, 2500)
    }), 300)
  } catch {}
  return Date.now() - start
}

// Performs one action. Returns a short human description for the steps list.
export async function perform(page, action, { timeout = 8000 } = {}) {
  const { type } = action
  const byId = (mid) => page.locator(`[data-macaco-id="${mid}"]`).first()
  const target = action.element ? (action.handle || byId(action.element.mid)) : null
  switch (type) {
    case 'click':
      await target.click({ timeout, noWaitAfter: false })
      return `Click ${labelOf(action.element)}`
    case 'double-click':
      await target.dblclick({ timeout })
      return `Double-click ${labelOf(action.element)}`
    case 'rapid-click':
      for (let i = 0; i < 4; i++) await target.click({ timeout: 2000, noWaitAfter: true }).catch(() => {})
      return `Rapid-click ${labelOf(action.element)} ×4`
    case 'hover':
      await target.hover({ timeout })
      return `Hover ${labelOf(action.element)}`
    case 'fill':
      await target.fill(action.value, { timeout })
      if (action.submit) await target.press('Enter', { timeout })
      return `Type ${JSON.stringify(shorten(action.value))} into ${labelOf(action.element)}${action.submit ? ' and press Enter' : ''}`
    case 'select':
      await target.selectOption(action.value, { timeout })
      return `Choose "${action.value}" in ${labelOf(action.element)}`
    case 'check':
      await target.click({ timeout })
      return `Toggle ${labelOf(action.element)}`
    case 'scroll':
      await page.mouse.wheel(0, action.value)
      await sleep(150)
      return `Scroll ${action.value > 0 ? 'down' : 'up'} ${Math.abs(action.value)}px`
    case 'scroll-end':
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      return 'Scroll to the bottom'
    case 'back':
      await page.goBack({ timeout, waitUntil: 'domcontentloaded' }).catch(() => {})
      return 'Press Back'
    case 'forward':
      await page.goForward({ timeout, waitUntil: 'domcontentloaded' }).catch(() => {})
      return 'Press Forward'
    case 'reload':
      await page.reload({ timeout, waitUntil: 'domcontentloaded' })
      return 'Reload'
    case 'goto':
      await page.goto(action.url, { timeout: timeout * 2, waitUntil: 'domcontentloaded' })
      return `Open ${pathOf(action.url)}`
    case 'key':
      await page.keyboard.press(action.value)
      return `Press ${action.value}`
    case 'resize':
      await page.setViewportSize(action.value)
      return `Resize to ${action.value.width}x${action.value.height}`
    default:
      throw new Error(`unknown action ${type}`)
  }
}

export const labelOf = (el) => (el ? `${el.kind} "${shorten(el.name || el.text || el.href || el.tag, 50)}"` : '')
const shorten = (value, max = 40) => {
  const s = String(value ?? '')
  return s.length > max ? `${s.slice(0, max)}…` : s
}
export const pathOf = (url) => {
  try { const u = new URL(url); return u.pathname + u.search } catch { return String(url) }
}
