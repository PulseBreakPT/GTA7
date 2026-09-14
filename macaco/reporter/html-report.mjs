// Single-file HTML report: summary, filters and every incident with its
// evidence. Opens straight from disk; screenshots are relative links.
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export function htmlReport(summary, incidents) {
  const sev = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
  const buckets = [...new Set(incidents.map((i) => i.bucket))].sort()
  const card = (i) => `
  <article class="incident" data-severity="${i.severity}" data-bucket="${esc(i.bucket)}">
    <header>
      <span class="sev sev-${i.severity.toLowerCase()}">${i.severity}</span>
      <strong>${esc(i.id)}</strong>
      <span class="muted">${esc(i.bucket)} · ${esc(i.check)}</span>
      <span class="count">${i.occurrences}×</span>
    </header>
    <h3>${esc(i.title)}</h3>
    <dl>
      <div><dt>Page</dt><dd>${esc(i.page)}${i.pages.length > 1 ? ` <span class="muted">(+${i.pages.length - 1} more)</span>` : ''}</dd></div>
      <div><dt>Viewport</dt><dd>${esc(i.viewport)}${i.viewports.length > 1 ? ` <span class="muted">(${esc(i.viewports.join(', '))})</span>` : ''}</dd></div>
      <div><dt>Seed</dt><dd>${esc(i.seed)}</dd></div>
    </dl>
    ${i.steps?.length ? `<details open><summary>Steps (${i.steps.length})</summary><ol>${i.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></details>` : ''}
    <p class="result"><b>Result:</b> ${esc(i.result)}</p>
    ${i.detail ? `<p class="detail">${esc(i.detail)}</p>` : ''}
    ${i.console?.length ? `<details><summary>Console</summary><pre>${esc(i.console.join('\n'))}</pre></details>` : ''}
    ${i.network?.length ? `<details><summary>Network</summary><pre>${esc(i.network.join('\n'))}</pre></details>` : ''}
    <div class="evidence">
      ${i.screenshot ? `<a href="${esc(i.screenshot)}" target="_blank"><img src="${esc(i.screenshot)}" alt="Screenshot of ${esc(i.id)}" loading="lazy"></a>` : ''}
      <p>${i.trace ? `<a href="${esc(i.trace)}">Trace</a> · ` : ''}${i.video ? `<a href="${esc(i.video)}">Video</a> · ` : ''}<code>${esc(i.replay)}</code></p>
    </div>
  </article>`

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Macaco run #${esc(summary.run)}</title>
<style>
  :root { --bg:#faf8f4; --ink:#26232b; --muted:#625d69; --line:#dfdbe1; --accent:#b81761; }
  * { box-sizing: border-box } body { margin:0; padding: 24px 16px 64px; background: var(--bg); color: var(--ink); font: 14px/1.5 system-ui, sans-serif }
  main { max-width: 1100px; margin: 0 auto }
  h1 { font-size: 26px; margin: 0 0 4px } .muted { color: var(--muted) }
  .grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 10px; margin: 18px 0 }
  .stat { background:#fff; border:1px solid var(--line); border-radius: 12px; padding: 12px 14px } .stat b { display:block; font-size: 22px }
  .filters { display:flex; flex-wrap:wrap; gap:6px; margin: 18px 0 } .filters button { border:1px solid var(--line); background:#fff; border-radius: 999px; padding: 6px 12px; cursor:pointer; font: inherit }
  .filters button.on { border-color: var(--accent); color: var(--accent) }
  .incident { background:#fff; border:1px solid var(--line); border-radius: 14px; padding: 14px 16px; margin: 12px 0 }
  .incident header { display:flex; flex-wrap:wrap; gap:8px; align-items:center } .incident h3 { margin: 8px 0; font-size: 16px }
  .count { margin-left:auto; font-weight:600 } dl { display:flex; flex-wrap:wrap; gap: 4px 20px; margin: 4px 0 } dt { color: var(--muted); font-size: 12px } dd { margin:0 }
  .sev { border-radius: 999px; padding: 2px 9px; font-size: 12px; font-weight: 600; border:1px solid }
  .sev-critical { color:#8f0b2e; background:#fde8ee; border-color:#f3b3c4 } .sev-high { color:#a3124f; background:#fcedf3; border-color:#efbcd1 }
  .sev-medium { color:#7a4f00; background:#fcf4e3; border-color:#e9cf97 } .sev-low { color:#1b5496; background:#ebf2fb; border-color:#b3cdec }
  pre { white-space: pre-wrap; background:#f6f3f6; padding: 10px; border-radius: 8px; font-size: 12px } .detail { color: var(--muted); word-break: break-word }
  .evidence img { max-width: 100%; max-height: 260px; border:1px solid var(--line); border-radius: 8px; margin-top: 8px } code { font-size: 12px; background:#f6f3f6; padding: 2px 6px; border-radius: 6px }
</style></head><body><main>
<h1>Macaco run #${esc(summary.run)}</h1>
<p class="muted">${esc(summary.target)} · ${esc(summary.mode.toUpperCase())} · seed ${esc(summary.seed)} · ${esc(summary.viewports.join(', '))} · ${Math.round(summary.durationSeconds / 60)} min · ${esc(summary.started)}</p>
<section class="grid">
  <div class="stat"><span class="muted">Pages discovered</span><b>${summary.pagesDiscovered}</b></div>
  <div class="stat"><span class="muted">Pages visited</span><b>${summary.pagesVisited}</b></div>
  <div class="stat"><span class="muted">Actions</span><b>${summary.actionsExecuted}</b></div>
  ${sev.map((s) => `<div class="stat"><span class="sev sev-${s.toLowerCase()}">${s}</span><b>${summary.severity[s]}</b></div>`).join('')}
  <div class="stat"><span class="muted">JS errors</span><b>${summary.counts.jsErrors}</b></div>
  <div class="stat"><span class="muted">HTTP 500</span><b>${summary.counts.http5xx}</b></div>
  <div class="stat"><span class="muted">Broken images</span><b>${summary.counts.brokenImages}</b></div>
  <div class="stat"><span class="muted">Visual</span><b>${summary.counts.visual}</b></div>
  <div class="stat"><span class="muted">UX</span><b>${summary.counts.ux}</b></div>
  <div class="stat"><span class="muted">Accessibility</span><b>${summary.counts.accessibility}</b></div>
  <div class="stat"><span class="muted">Security</span><b>${summary.counts.security}</b></div>
</section>
<nav class="filters" aria-label="Filter incidents">
  <button class="on" data-filter="all">All (${incidents.length})</button>
  ${sev.map((s) => `<button data-filter="sev:${s}">${s} (${summary.severity[s]})</button>`).join('')}
  ${buckets.map((b) => `<button data-filter="bucket:${esc(b)}">${esc(b)} (${incidents.filter((i) => i.bucket === b).length})</button>`).join('')}
</nav>
<section id="incidents">${incidents.map(card).join('')}</section>
</main>
<script>
  document.querySelectorAll('.filters button').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach((x) => x.classList.toggle('on', x === b))
    const [kind, value] = b.dataset.filter.split(':')
    document.querySelectorAll('.incident').forEach((i) => {
      i.hidden = kind !== 'all' && (kind === 'sev' ? i.dataset.severity !== value : i.dataset.bucket !== value)
    })
  }))
</script></body></html>`
}
