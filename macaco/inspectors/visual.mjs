// Visual inspector: layout problems measured in the rendered page. Each
// finding names an element (a short CSS path) so duplicates collapse.

function inspectInPage() {
  const vw = document.documentElement.clientWidth
  const vh = innerHeight
  const issues = []
  const cssPath = (el) => {
    const parts = []
    for (let n = el, depth = 0; n && n.nodeType === 1 && depth < 4; n = n.parentElement, depth++) {
      let part = n.tagName.toLowerCase()
      if (n.id) { part += `#${n.id}`; parts.unshift(part); break }
      const cls = [...n.classList].filter((c) => !/^(hover|focus|group|md:|lg:|sm:|xl:)/.test(c) && c.length < 30).slice(0, 2)
      if (cls.length) part += `.${cls.join('.')}`
      parts.unshift(part)
    }
    return parts.join(' > ')
  }
  const visible = (el, r = el.getBoundingClientRect()) => {
    if (r.width < 1 || r.height < 1) return false
    if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false
    const s = getComputedStyle(el)
    return s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05
  }
  const inFixedOrScroller = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const s = getComputedStyle(n)
      if (/(auto|scroll|hidden|clip)/.test(s.overflowX) || s.position === 'fixed') return true
    }
    return false
  }

  // 1. Unexpected horizontal scroll.
  const sw = document.documentElement.scrollWidth
  if (sw > vw + 2) {
    const culprits = []
    for (const el of document.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect()
      if (r.right > vw + 2 && r.width > 0 && visible(el, r) && !inFixedOrScroller(el)) culprits.push(el)
      if (culprits.length > 40) break
    }
    const outermost = culprits.filter((el) => !culprits.some((o) => o !== el && o.contains(el)))
    issues.push({ check: 'horizontal-scroll', message: `Page scrolls horizontally: ${sw}px content in a ${vw}px viewport`, selector: outermost[0] ? cssPath(outermost[0]) : 'html', detail: outermost.slice(0, 3).map(cssPath).join(' | ') })
  }

  const interactive = [...document.querySelectorAll('a[href], button, [role="button"], input:not([type=hidden]), select, textarea, [role="tab"]')]
  const boxes = []
  for (const el of interactive) {
    const r = el.getBoundingClientRect()
    const s = getComputedStyle(el)
    // 2. Invisible but focusable controls (not screen-reader-only patterns).
    const srOnly = r.width <= 1 && r.height <= 1
    if (!srOnly && !el.closest('[aria-hidden="true"], [inert], [hidden], details:not([open])') && s.display !== 'none' && s.visibility !== 'hidden' && (Number(s.opacity) < 0.05) && el.tabIndex >= 0 && r.width > 4) {
      // Hover-reveal controls (heading anchors) are fine if keyboard focus
      // reveals them too; only report the ones that stay invisible on focus.
      const previous = document.activeElement
      // Sem transição durante a medição: com transition-opacity, a leitura
      // logo a seguir ao foco ainda devolvia o valor inicial (0).
      const transition = el.style.transition
      el.style.transition = 'none'
      el.focus({ preventScroll: true })
      const focusedOpacity = Number(getComputedStyle(el).opacity)
      el.blur()
      el.style.transition = transition
      if (previous && previous !== document.body && previous.focus) previous.focus({ preventScroll: true })
      if (focusedOpacity < 0.05) issues.push({ check: 'invisible-control', message: 'Focusable control stays invisible even when it has keyboard focus', selector: cssPath(el), detail: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 60) })
    }
    if (!visible(el, r)) continue
    // 3. Controls pushed outside the viewport horizontally.
    if ((r.right > vw + 4 || r.left < -4) && !inFixedOrScroller(el)) {
      issues.push({ check: 'outside-viewport', message: `Control sits outside the viewport (x ${Math.round(r.left)}–${Math.round(r.right)} of ${vw})`, selector: cssPath(el), detail: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 60) })
    }
    if (r.bottom > 0 && r.top < vh) boxes.push({ el, r })
  }

  // 4. Interactive elements overlapping each other in view. Fixed and sticky
  // bars (the mobile tab bar, a sticky header) float over content by design.
  const floating = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const p = getComputedStyle(n).position
      if (p === 'fixed' || p === 'sticky') return true
    }
    return false
  }
  for (let i = boxes.length - 1; i >= 0; i--) if (floating(boxes[i].el)) boxes.splice(i, 1)
  for (let i = 0; i < boxes.length && i < 250; i++) {
    for (let j = i + 1; j < boxes.length && j < 250; j++) {
      const a = boxes[i], b = boxes[j]
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left)
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top)
      if (w <= 0 || h <= 0) continue
      const overlap = (w * h) / Math.min(a.r.width * a.r.height, b.r.width * b.r.height)
      if (overlap > 0.35) {
        const topEl = document.elementFromPoint(Math.max(a.r.left, b.r.left) + w / 2, Math.max(a.r.top, b.r.top) + h / 2)
        const covered = topEl && (a.el.contains(topEl) ? b.el : b.el.contains(topEl) ? a.el : null)
        if (covered) issues.push({ check: 'overlap', message: `Controls overlap (${Math.round(overlap * 100)}%): one is covered by the other`, selector: cssPath(covered), detail: `${(a.el.innerText || a.el.getAttribute('aria-label') || '').slice(0, 30)} ↔ ${(b.el.innerText || b.el.getAttribute('aria-label') || '').slice(0, 30)}` })
      }
    }
  }

  // 5. Text clipped without an ellipsis.
  for (const el of document.querySelectorAll('h1, h2, h3, h4, button, a, label, p, span, strong, td, th, li')) {
    if (el.children.length > 2) continue
    // Só texto próprio: um contentor de imagem com overflow hidden não é
    // «texto cortado».
    if (el.querySelector('img, picture, video, canvas, svg')) continue
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue
    const s = getComputedStyle(el)
    if (!/(hidden|clip)/.test(s.overflowX + s.overflowY) || s.textOverflow === 'ellipsis' || /line-clamp|clamp/.test(el.className)) continue
    if (s.webkitLineClamp && s.webkitLineClamp !== 'none') continue
    // Visually-hidden text for screen readers (skip links, sr-only) is
    // clipped on purpose.
    if ((s.position === 'absolute' && (s.clip !== 'auto' || s.clipPath !== 'none')) || /sr-only|visually-hidden|skip/i.test(el.className) || /^skip to/i.test((el.innerText || '').trim())) continue
    const r = el.getBoundingClientRect()
    if (!visible(el, r) || r.bottom < 0 || r.top > vh) continue
    if (el.scrollWidth > el.clientWidth + 3 || el.scrollHeight > el.clientHeight + 4) {
      issues.push({ check: 'clipped-text', message: 'Text is cut off without an ellipsis', selector: cssPath(el), detail: (el.innerText || '').slice(0, 60) })
    }
  }

  // 6. Dialogs bigger than the screen, with no way to scroll inside.
  for (const d of document.querySelectorAll('[role="dialog"], dialog[open], [aria-modal="true"]')) {
    const r = d.getBoundingClientRect()
    if (!visible(d, r)) continue
    const s = getComputedStyle(d)
    const scrolls = /(auto|scroll)/.test(s.overflowY) || d.querySelector('*') && [...d.querySelectorAll('*')].some((c) => /(auto|scroll)/.test(getComputedStyle(c).overflowY) && c.scrollHeight > c.clientHeight)
    if ((r.height > vh + 2 || r.width > vw + 2) && !scrolls) issues.push({ check: 'dialog-too-big', message: `Dialog (${Math.round(r.width)}×${Math.round(r.height)}) is larger than the screen and cannot scroll`, selector: cssPath(d), detail: '' })
  }

  // 7. Broken and distorted images.
  for (const img of document.querySelectorAll('img')) {
    const r = img.getBoundingClientRect()
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src') && !img.getAttribute('src').startsWith('data:') && r.width > 0) {
      issues.push({ check: 'broken-image', message: 'Image failed to load', selector: cssPath(img), detail: img.currentSrc || img.src })
      continue
    }
    if (!img.naturalWidth || r.width < 24 || r.height < 24 || !visible(img, r)) continue
    const fit = getComputedStyle(img).objectFit
    if (fit === 'cover' || fit === 'contain' || fit === 'scale-down') continue
    const ratio = (r.width / r.height) / (img.naturalWidth / img.naturalHeight)
    if (ratio > 1.2 || ratio < 0.83) issues.push({ check: 'distorted-image', message: `Image is stretched (${Math.round(ratio * 100)}% of its aspect ratio)`, selector: cssPath(img), detail: img.currentSrc || img.src })
  }

  // 8. Collapsed containers: content inside, but no width or no height.
  for (const el of document.querySelectorAll('main *')) {
    if (el.children.length === 0 || /^(svg|path|g|br|wbr|script|style|template|option)$/i.test(el.tagName)) continue
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.position === 'absolute' || s.position === 'fixed' || s.visibility === 'hidden') continue
    const r = el.getBoundingClientRect()
    if ((r.width === 0) !== (r.height === 0) && (r.width === 0 ? r.height > 20 : r.width > 20)) {
      const hasMedia = el.querySelector('img, video, canvas, picture')
      const hasText = (el.innerText || '').trim().length > 3
      if (hasMedia || hasText) issues.push({ check: 'collapsed-container', message: `Element holds ${hasMedia ? 'an image' : 'text'} but is ${r.width === 0 ? '0px wide' : '0px tall'}`, selector: cssPath(el), detail: (el.innerText || '').slice(0, 50) })
    }
  }

  // 9. Main landmarks disappeared or empty.
  const main = document.querySelector('main')
  const header = document.querySelector('header')
  if (!main || main.getBoundingClientRect().height < 40) issues.push({ check: 'missing-main', message: 'Main content area is missing or empty', selector: 'main', detail: '' })
  if (!header) issues.push({ check: 'missing-header', message: 'Site header is missing', selector: 'header', detail: '' })

  return issues
}

export async function inspectVisual(page) {
  try {
    const issues = await page.evaluate(inspectInPage)
    // One finding per check+selector per page.
    const seen = new Set()
    return issues.filter((i) => { const k = `${i.check}|${i.selector}`; if (seen.has(k)) return false; seen.add(k); return true }).slice(0, 40)
  } catch {
    return []
  }
}
