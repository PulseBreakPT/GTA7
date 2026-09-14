// Network inspector: every 4xx/5xx, failed or blocked request, broken image
// and slow request, as it happens.
export function attachNetwork(page, bus, { origin }) {
  const started = new Map()
  page.on('request', (req) => {
    started.set(req, Date.now())
    // Evento interno: diz ao UX inspector que um clique pediu algo à rede.
    bus.emit({ category: 'request', silent: true, url: req.url(), resourceType: req.resourceType() })
  })
  page.on('response', async (res) => {
    const req = res.request()
    const status = res.status()
    const url = res.url()
    const type = req.resourceType()
    const sameOrigin = url.startsWith(origin)
    const took = Date.now() - (started.get(req) || Date.now())
    if (took > 10000) bus.emit({ category: 'slow-request', message: `${req.method()} ${short(url)} took ${Math.round(took / 1000)}s`, url, status, resourceType: type })
    if (status < 400) return
    // A deliberately mutated URL answering 404 is correct behaviour.
    if (status === 404 && type === 'document' && /macaco-missing|%3Cmacaco|MACACO/i.test(url)) return
    let body = ''
    if (status >= 500 && type === 'document') { try { body = (await res.text()).slice(0, 4000) } catch {} }
    bus.emit({
      category: type === 'image' ? 'broken-image' : status >= 500 ? 'http-5xx' : 'http-4xx',
      message: `${req.method()} ${short(url)} → ${status}`,
      url, status, resourceType: type, sameOrigin, body,
    })
  })
  page.on('requestfailed', (req) => {
    const failure = req.failure()?.errorText || 'failed'
    // Navigations the Macaco itself interrupted are not site bugs.
    if (/ERR_ABORTED|NS_BINDING_ABORTED/.test(failure) && req.resourceType() !== 'image') return
    bus.emit({
      category: req.resourceType() === 'image' ? 'broken-image' : /BLOCKED|CSP|blocked/i.test(failure) ? 'request-blocked' : 'request-failed',
      message: `${req.method()} ${short(req.url())} → ${failure}`,
      url: req.url(), resourceType: req.resourceType(), sameOrigin: req.url().startsWith(origin),
    })
  })
}

const short = (url) => {
  try { const u = new URL(url); const s = u.pathname + u.search; return (u.origin + (s.length > 140 ? s.slice(0, 140) + '…' : s)) } catch { return url }
}
