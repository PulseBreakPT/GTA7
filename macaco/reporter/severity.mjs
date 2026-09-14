// Severity: one table, so the same kind of problem is always rated the same.
export const SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']

const TABLE = {
  // crashes and dead ends
  'page-crash': 'CRITICAL', 'blank-page': 'CRITICAL', 'fatal-error': 'CRITICAL', 'document-5xx': 'CRITICAL', 'page-unresponsive': 'HIGH',
  // runtime
  'js-exception': 'HIGH', 'promise-rejection': 'HIGH', 'console-error': 'MEDIUM', 'console-warning': 'LOW',
  // network
  'http-5xx': 'HIGH', 'http-4xx': 'MEDIUM', 'broken-link': 'HIGH', 'broken-image': 'MEDIUM', 'request-failed': 'MEDIUM', 'request-blocked': 'MEDIUM', 'slow-request': 'LOW',
  // navigation
  'invalid-url': 'HIGH', 'left-site': 'MEDIUM', 'stuck': 'LOW', 'fuzzed-url-5xx': 'HIGH',
  // visual
  'horizontal-scroll': 'MEDIUM', 'outside-viewport': 'MEDIUM', 'overlap': 'MEDIUM', 'clipped-text': 'LOW', 'invisible-control': 'LOW',
  'dialog-too-big': 'HIGH', 'distorted-image': 'LOW', 'collapsed-container': 'MEDIUM', 'missing-main': 'HIGH', 'missing-header': 'MEDIUM',
  'header-off-screen': 'HIGH', 'main-off-screen': 'HIGH',
  // ux
  'dead-click': 'LOW', 'double-click-needed': 'MEDIUM', 'menu-stays-open': 'MEDIUM', 'back-loses-state': 'MEDIUM',
  'filter-no-effect': 'MEDIUM', 'form-no-feedback': 'LOW', 'infinite-loading': 'HIGH', 'duplicate-control': 'LOW',
}

export function severityOf(finding) {
  if (finding.severity) return finding.severity
  if (TABLE[finding.check]) return TABLE[finding.check]
  if (finding.check?.startsWith('a11y:')) return 'LOW'
  if (finding.check?.startsWith('security:')) return 'MEDIUM'
  return 'LOW'
}

// Report buckets for the run summary.
export function bucketOf(check = '') {
  if (check.startsWith('a11y:')) return 'accessibility'
  if (check.startsWith('security:')) return 'security'
  if (['js-exception', 'promise-rejection', 'console-error', 'page-crash', 'fatal-error'].includes(check)) return 'js'
  if (['http-5xx', 'document-5xx', 'fuzzed-url-5xx'].includes(check)) return 'http5xx'
  if (check === 'broken-image') return 'images'
  if (['http-4xx', 'broken-link', 'request-failed', 'request-blocked', 'slow-request'].includes(check)) return 'network'
  if (['dead-click', 'double-click-needed', 'menu-stays-open', 'back-loses-state', 'filter-no-effect', 'form-no-feedback', 'infinite-loading', 'duplicate-control', 'stuck'].includes(check)) return 'ux'
  return 'visual'
}
