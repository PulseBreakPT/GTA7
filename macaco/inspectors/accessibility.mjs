// Accessibility inspector: axe-core (contrast, labels, names, headings,
// landmarks, ARIA) plus a keyboard check that focus is visible when tabbing.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const AXE_SOURCE = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

const IMPACT_TO_SEVERITY = { critical: 'HIGH', serious: 'MEDIUM', moderate: 'LOW', minor: 'LOW' }

export async function inspectAccessibility(page) {
  const findings = []
  try {
    const hasAxe = await page.evaluate(() => Boolean(window.axe))
    // Avaliado pelo protocolo do browser: a CSP do site bloquearia um
    // <script> injectado, e desligá-la esconderia pedidos que ela bloqueia.
    if (!hasAxe) await page.evaluate(AXE_SOURCE)
    const result = await page.evaluate(async () => {
      const r = await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
        resultTypes: ['violations'],
      })
      return r.violations.map((v) => ({
        id: v.id, impact: v.impact, help: v.help, helpUrl: v.helpUrl,
        nodes: v.nodes.length,
        targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
        summary: v.nodes[0]?.failureSummary?.split('\n').slice(0, 3).join(' ') || '',
      }))
    })
    for (const v of result) {
      findings.push({
        check: `a11y:${v.id}`,
        severity: IMPACT_TO_SEVERITY[v.impact] || 'LOW',
        message: `${v.help} (${v.nodes} element${v.nodes === 1 ? '' : 's'})`,
        selector: v.targets[0] || v.id,
        detail: `${v.summary} — ${v.targets.slice(0, 3).join(' | ')} — ${v.helpUrl}`,
      })
    }
  } catch (error) {
    findings.push({ check: 'a11y:axe-failed', severity: 'LOW', message: `axe could not run: ${error.message.slice(0, 120)}`, selector: 'axe' })
  }

  // Keyboard: tab through the first controls; each should show a focus ring.
  try {
    await page.evaluate(() => document.activeElement?.blur())
    let invisible = 0
    const names = []
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab')
      const info = await page.evaluate(() => {
        const el = document.activeElement
        if (!el || el === document.body) return null
        const s = getComputedStyle(el)
        const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || (s.boxShadow && s.boxShadow !== 'none')
        return { ring, name: (el.innerText || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 40) }
      })
      if (info && !info.ring) { invisible++; names.push(info.name) }
    }
    if (invisible >= 3) findings.push({ check: 'a11y:focus-not-visible', severity: 'MEDIUM', message: `${invisible} of 12 tabbed controls show no visible focus`, selector: names.slice(0, 3).join(' | '), detail: names.join(' | ') })
  } catch {}
  return findings
}
