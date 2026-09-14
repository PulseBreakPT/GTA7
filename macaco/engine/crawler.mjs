// Crawler: remembers what the Macaco already knows about the site — pages
// discovered and visited, route patterns, actions already tried — so each
// step prefers the unknown instead of pacing between / and /vehicles.

export class Crawler {
  constructor(origin) {
    this.origin = origin
    this.discovered = new Set()   // every same-origin URL seen in a link
    this.visited = new Map()      // url → visits
    this.patterns = new Map()     // route pattern → visits
    this.children = new Map()     // parent path → Set(child segment)
    this.tested = new Map()       // pattern|action key → times
    this.external = new Set()
  }

  normalise(url) {
    try {
      const u = new URL(url, this.origin)
      u.hash = ''
      // tracking-style params add no coverage
      for (const key of [...u.searchParams.keys()]) if (/^utm_|^fbclid$|^gclid$/.test(key)) u.searchParams.delete(key)
      return u.origin === this.origin ? u.pathname.replace(/\/+$/, '') + (u.search || '') || '/' : null
    } catch {
      return null
    }
  }

  // /database/vehicles/tulip → /database/vehicles/:slug once the parent is
  // known to hold several different children.
  pattern(url) {
    const path = (this.normalise(url) || '/').split('?')[0]
    const parts = path.split('/').filter(Boolean)
    const out = []
    let parent = ''
    for (const part of parts) {
      const kids = this.children.get(parent)
      if (/^\d+$/.test(part)) out.push(':n')
      // Colecções: um pai com 20+ filhos (/database/vehicles tem 380), ou um
      // segmento com cara de slug (hífen, algarismos) sob um pai com vários.
      // /wiki tem 16 subpáginas próprias e não pode fundir-se num só padrão.
      else if (kids && (kids.size >= 20 || (kids.size >= 3 && /[-\d]/.test(part)))) out.push(':slug')
      else out.push(part)
      parent = `${parent}/${part}`
    }
    return `/${out.join('/')}`
  }

  learn(url) {
    const path = (this.normalise(url) || '').split('?')[0]
    if (!path) return
    const parts = path.split('/').filter(Boolean)
    let parent = ''
    for (const part of parts) {
      if (!this.children.has(parent)) this.children.set(parent, new Set())
      this.children.get(parent).add(part)
      parent = `${parent}/${part}`
    }
  }

  addLinks(candidates) {
    for (const c of candidates) {
      if (!c.href) continue
      if (c.external) { this.external.add(c.href); continue }
      const n = this.normalise(c.href)
      if (n) { this.discovered.add(n); this.learn(c.href) }
    }
  }

  visit(url) {
    const n = this.normalise(url)
    if (!n) return
    this.discovered.add(n)
    this.learn(url)
    this.visited.set(n, (this.visited.get(n) || 0) + 1)
    const p = this.pattern(url)
    this.patterns.set(p, (this.patterns.get(p) || 0) + 1)
  }

  actionKey(url, candidate) {
    return `${this.pattern(url)}|${candidate.kind}|${(candidate.name || candidate.href || '').slice(0, 40)}`
  }

  markTested(url, candidate) {
    const key = this.actionKey(url, candidate)
    this.tested.set(key, (this.tested.get(key) || 0) + 1)
  }

  // Higher is more interesting: unvisited URLs, unseen route patterns and
  // actions never tried on this kind of page.
  novelty(url, candidate) {
    let score = 1
    if (candidate.href && !candidate.external) {
      const n = this.normalise(candidate.href)
      if (n && !this.visited.has(n)) score += 3
      const p = this.pattern(candidate.href)
      if (!this.patterns.has(p)) score += 5
      else score += 2 / (1 + this.patterns.get(p))
    }
    const tried = this.tested.get(this.actionKey(url, candidate)) || 0
    score += tried === 0 ? 2 : 1 / (1 + tried)
    return score
  }

  unvisited(limit = 50) {
    return [...this.discovered].filter((u) => !this.visited.has(u)).slice(0, limit)
  }

  stats() {
    return { discovered: this.discovered.size, visited: this.visited.size, patterns: this.patterns.size, external: this.external.size }
  }
}
