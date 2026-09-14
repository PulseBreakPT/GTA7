// Bug Deduplicator: the same TypeError seen 300 times is one bug that
// happened 300 times. The fingerprint ignores what changes between
// occurrences (numbers, hashes, slugs) and keeps what identifies the bug.
import { severityOf, bucketOf, SEVERITIES } from './severity.mjs'

const normaliseMessage = (message = '') => String(message)
  .replace(/https?:\/\/[^\s)]+/g, (url) => { try { const u = new URL(url); return u.pathname.replace(/[a-f0-9]{8,}/gi, '#').replace(/\d+/g, 'N') } catch { return 'URL' } })
  .replace(/\b[a-f0-9]{8,}\b/gi, '#')
  .replace(/\d+/g, 'N')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 200)

// Global runtime problems (the same JS error on every page) dedupe across
// pages; layout and UX problems are per route pattern.
const GLOBAL = new Set(['js-exception', 'promise-rejection', 'console-error', 'console-warning', 'broken-image', 'http-4xx', 'http-5xx', 'request-failed', 'request-blocked', 'slow-request'])

export function fingerprint(finding, pattern) {
  // Accessibility: one incident per rule across the whole site — the same
  // component fails the same rule on every page that uses it.
  if (finding.check?.startsWith('a11y:')) return `${finding.check}|*`
  // Security: one incident per check and path.
  if (finding.check?.startsWith('security:')) return `${finding.check}|${finding.selector || pattern}`
  if (GLOBAL.has(finding.check)) return `${finding.check}|*|${normaliseMessage(finding.message)}`
  // Visual and UX: one incident per check and page type; the elements
  // involved are collected inside it.
  return `${finding.check}|${pattern}`
}

export class Deduplicator {
  constructor() {
    this.incidents = new Map()
    this.components = new Map()   // check|@selector → incident key
    this.counter = 0
  }

  // Returns { incident, isNew }.
  add(finding, context) {
    let key = fingerprint(finding, context.pattern)
    // The same check on the same component (same element path) is one bug,
    // whichever page type shows it — the page toolbox overlapping on every
    // record page is a single incident, not twelve.
    const componentKey = finding.selector && !finding.check?.startsWith('a11y:') && !finding.check?.startsWith('security:') && !GLOBAL.has(finding.check)
      ? `${finding.check}|@${finding.selector}` : null
    if (componentKey && !this.incidents.has(key) && this.components.has(componentKey)) key = this.components.get(componentKey)
    if (componentKey && !this.components.has(componentKey)) this.components.set(componentKey, key)
    const existing = this.incidents.get(key)
    if (existing) {
      existing.occurrences++
      existing.lastSeen = new Date().toISOString()
      existing.viewports.add(context.viewport)
      if (existing.pages.size < 12) existing.pages.add(context.path)
      if (finding.selector && existing.elements.size < 15) existing.elements.add(finding.selector)
      // Keep the most severe rating if the same bug shows up worse.
      const s = severityOf(finding)
      if (SEVERITIES.indexOf(s) < SEVERITIES.indexOf(existing.severity)) existing.severity = s
      return { incident: existing, isNew: false }
    }
    this.counter++
    const incident = {
      id: `MACACO-${String(this.counter).padStart(5, '0')}`,
      fingerprint: key,
      check: finding.check,
      bucket: bucketOf(finding.check),
      severity: severityOf(finding),
      title: finding.message,
      detail: finding.detail || '',
      selector: finding.selector || '',
      page: context.path,
      pattern: context.pattern,
      viewport: context.viewportLabel,
      viewports: new Set([context.viewport]),
      pages: new Set([context.path]),
      elements: new Set(finding.selector ? [finding.selector] : []),
      mode: context.mode,
      steps: context.steps,
      result: context.result || finding.message,
      console: context.console || [],
      network: context.network || [],
      screenshot: null,
      trace: null,
      video: null,
      seed: context.seed,
      sessionSeed: context.sessionSeed,
      replay: null,
      occurrences: 1,
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
    }
    this.incidents.set(key, incident)
    return { incident, isNew: true }
  }

  list() {
    return [...this.incidents.values()]
      .map((i) => ({ ...i, viewports: [...i.viewports], pages: [...i.pages], elements: [...i.elements] }))
      .sort((a, b) => SEVERITIES.indexOf(a.severity) - SEVERITIES.indexOf(b.severity) || b.occurrences - a.occurrences)
  }
}
