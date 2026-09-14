// Run summary and machine-readable report.
import { SEVERITIES } from './severity.mjs'

export function summarise(run, incidents) {
  const bySeverity = Object.fromEntries(SEVERITIES.map((s) => [s, incidents.filter((i) => i.severity === s).length]))
  const bucket = (name) => incidents.filter((i) => i.bucket === name).length
  return {
    run: run.number,
    id: run.id,
    target: run.origin,
    mode: run.mode,
    seed: run.seed,
    started: run.started,
    finished: run.finished,
    durationSeconds: Math.round((new Date(run.finished) - new Date(run.started)) / 1000),
    viewports: run.viewports.map((v) => v.label),
    pagesDiscovered: run.crawler.discovered,
    pagesVisited: run.crawler.visited,
    routePatterns: run.crawler.patterns,
    actionsExecuted: run.actions,
    skippedByGuards: run.skipped,
    severity: bySeverity,
    counts: {
      jsErrors: bucket('js'),
      http5xx: bucket('http5xx'),
      brokenImages: bucket('images'),
      network: bucket('network'),
      visual: bucket('visual'),
      ux: bucket('ux'),
      accessibility: bucket('accessibility'),
      security: bucket('security'),
    },
    occurrences: incidents.reduce((n, i) => n + i.occurrences, 0),
  }
}

export function textSummary(s) {
  const n = (v) => Number(v).toLocaleString('en-US')
  return [
    `MACACO RUN #${s.run}`,
    '',
    `Target: ${s.target} · mode ${s.mode.toUpperCase()} · seed ${s.seed} · ${s.viewports.join(', ')} · ${Math.round(s.durationSeconds / 60)} min`,
    '',
    `Pages discovered: ${n(s.pagesDiscovered)}`,
    `Pages visited: ${n(s.pagesVisited)}`,
    `Route patterns: ${n(s.routePatterns)}`,
    `Actions executed: ${n(s.actionsExecuted)}`,
    '',
    `Critical: ${s.severity.CRITICAL}`,
    `High: ${s.severity.HIGH}`,
    `Medium: ${s.severity.MEDIUM}`,
    `Low: ${s.severity.LOW}`,
    '',
    `JS errors: ${s.counts.jsErrors}`,
    `HTTP 500: ${s.counts.http5xx}`,
    `Broken images: ${s.counts.brokenImages}`,
    `Network issues: ${s.counts.network}`,
    `Visual issues: ${s.counts.visual}`,
    `UX issues: ${s.counts.ux}`,
    `Accessibility issues: ${s.counts.accessibility}`,
    `Possible security issues: ${s.counts.security}`,
  ].join('\n')
}

// One incident in the plain-text format used in logs and terminals.
export function incidentText(i) {
  const lines = [
    i.id, '',
    `Severity: ${i.severity}`,
    `Page: ${i.page}`,
    `Viewport: ${i.viewport}`,
    `Occurrences: ${i.occurrences}${i.pages.length > 1 ? ` on ${i.pages.length}+ pages` : ''}`,
    '', 'Problem:', i.title,
  ]
  if (i.steps?.length) lines.push('', 'Steps:', ...i.steps.map((s, n) => `${n + 1}. ${s}`))
  lines.push('', 'Result:', i.result)
  if (i.console?.length) lines.push('', 'Console:', ...i.console.slice(0, 5))
  if (i.network?.length) lines.push('', 'Network:', ...i.network.slice(0, 5))
  if (i.elements?.length > 1) lines.push('', `Elements (${i.elements.length}):`, ...i.elements.map((e) => `- ${e}`))
  if (i.detail) lines.push('', 'Detail:', i.detail)
  if (i.screenshot) lines.push('', 'Screenshot:', i.screenshot)
  if (i.trace) lines.push('', 'Trace:', `${i.trace} (npx playwright show-trace)`)
  if (i.video) lines.push('', 'Video:', i.video)
  lines.push('', 'Seed:', String(i.seed), '', 'Replay:', i.replay || '')
  return lines.join('\n')
}
