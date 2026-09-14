// UX inspector: behaviour that works technically but fails the visitor —
// dead clicks, menus that will not close, Back that loses state, filters
// that change nothing, endless loading, duplicated controls, clicks that
// only work the second time.
import { snapshot, changed } from '../engine/state.mjs'
import { waitStable } from '../engine/navigator.mjs'

const CLICKY = new Set(['click', 'check'])

// Called after each action with the snapshots around it and the events it
// produced. Returns findings; may run small follow-up probes.
export async function inspectUx(page, { action, before, after, events, history }) {
  const findings = []
  const el = action.element
  const requests = events.filter((e) => e.category === 'request').length

  // Dead click: nothing changed, no request, no focus move. Links and
  // controls meant to do something should visibly do it.
  if (CLICKY.has(action.type) && el && !changed(before, after) && before.focus === after.focus && requests === 0 && before.scrollY === after.scrollY) {
    if (['button', 'tab', 'menu', 'toggle', 'pagination', 'menuitem', 'link', 'card'].includes(el.kind)) {
      // Second click: if that works, the first one was swallowed.
      try {
        await page.locator(`[data-macaco-id="${el.mid}"]`).first().click({ timeout: 2500 })
        await waitStable(page, { timeout: 3000 })
        const again = await snapshot(page)
        if (changed(after, again)) {
          findings.push({ check: 'double-click-needed', message: `${el.kind} "${el.name}" only reacts on the second click`, selector: el.name })
        } else {
          findings.push({ check: 'dead-click', message: `${el.kind} "${el.name}" does nothing when clicked`, selector: el.name })
        }
      } catch {}
    }
  }

  // Menu opened: Escape should close it.
  if (CLICKY.has(action.type) && el?.kind === 'menu' && after.expanded > before.expanded) {
    try {
      await page.keyboard.press('Escape')
      await waitStable(page, { timeout: 2000 })
      const closed = await snapshot(page)
      if (closed.expanded >= after.expanded) findings.push({ check: 'menu-stays-open', message: `Menu "${el.name}" does not close with Escape`, selector: el.name })
    } catch {}
  }

  // Back should restore the previous page with its state (filters, inputs).
  if (action.type === 'back' && history.length >= 2) {
    const target = history[history.length - 2]
    if (target && target.path === after.path && target.inputs && target.inputs !== after.inputs && target.inputs.replace(/[^|:]/g, '') === after.inputs.replace(/[^|:]/g, '')) {
      findings.push({ check: 'back-loses-state', message: 'Back returns to the page but loses what was selected or typed', selector: after.path })
    }
  }

  // Filter-like controls: the control changed but the result list did not.
  if (['select', 'check'].includes(action.type) || (action.type === 'click' && ['tab', 'checkbox'].includes(el?.kind) && el?.inNav === false)) {
    if (before.inputs !== after.inputs && before.items === after.items && before.hash === after.hash && before.url === after.url) {
      findings.push({ check: 'filter-no-effect', message: `Changing "${el?.name}" does not change the results`, selector: el?.name })
    }
  }

  // Search / form submit with no visible feedback.
  if (action.type === 'fill' && action.submit && !changed(before, after) && requests === 0) {
    findings.push({ check: 'form-no-feedback', message: `Submitting "${el?.name}" gives no visible feedback`, selector: el?.name })
  }

  // Loading that never ends.
  if (after.busy > 0 || /\bloading\b/i.test(after.title)) {
    await waitStable(page, { timeout: 8000 })
    const later = await snapshot(page)
    if (later.busy > 0) findings.push({ check: 'infinite-loading', message: 'Content stays in a loading state for more than 8 seconds', selector: after.path })
  }

  return findings
}

// Static checks, once per page pattern: controls duplicated side by side.
export async function inspectDuplicates(page) {
  try {
    return await page.evaluate(() => {
      const out = []
      const groups = new Map()
      for (const el of document.querySelectorAll('main a[href], main button')) {
        const r = el.getBoundingClientRect()
        if (r.width < 2 || r.height < 2) continue
        const name = (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim()
        if (!name || name.length < 3) continue
        const key = `${el.parentElement ? [...el.parentElement.classList].join('.') : ''}|${name}|${el.getAttribute('href') || ''}`
        groups.set(key, [...(groups.get(key) || []), el])
      }
      for (const [key, els] of groups) {
        if (els.length < 2 || els.length > 3) continue
        const [a, b] = els
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect()
        if (Math.abs(ra.top - rb.top) < 120 && Math.abs(ra.left - rb.left) < 600) out.push({ check: 'duplicate-control', message: `The same control appears twice side by side: "${key.split('|')[1].slice(0, 50)}"`, selector: key.split('|')[1].slice(0, 50) })
      }
      return out.slice(0, 5)
    })
  } catch {
    return []
  }
}
