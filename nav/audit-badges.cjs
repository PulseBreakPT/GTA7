const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
// Para cada texto repetido e cada etiqueta de estado, diz em que bloco da
// página aparece (id da secção, classe do contentor mais próximo).
const url = process.argv[2]
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000 })
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
  const out = await page.evaluate(() => {
    const where = (el) => {
      const sec = el.closest('section[id], [id]')
      const box = el.closest('aside, section, [class*="infobox"], [class*="evidence"], [class*="hero"], header, figure, table')
      const cls = box ? (box.getAttribute('class') || '').split(' ').filter((c) => /wiki|info|evid|hero|box|panel|status|record|summary|ladder|meta/.test(c)).slice(0, 2).join('.') : ''
      return `${sec ? '#' + sec.id : ''} <${box ? box.tagName.toLowerCase() : '?'} ${cls}>`
    }
    const root = document.querySelector('main') || document.body
    const els = [...root.querySelectorAll('p, li, dd, td, h2, h3, figcaption, span, strong, small, b')].filter((el) => el.children.length <= 1 && !el.closest('header.wiki-global-header, footer, nav[aria-label="Adjacent records"]'))
    const map = {}
    for (const el of els) {
      const t = el.textContent.replace(/\s+/g, ' ').trim()
      const isBadge = /^(ANALYSIS|RUMOUR|CONFIRMED|VERIFIED|OFFICIAL|COMMUNITY|LEAKED|UNVERIFIED)$/i.test(t)
      if (!isBadge) continue
      ;(map[t] ||= []).push(where(el))
    }
    return Object.entries(map).filter(([, w]) => w.length > 1)
  })
  for (const [t, w] of out) console.log(`×${w.length} ${t.slice(0, 90)}\n      ${w.join('\n      ')}`)
  await browser.close()
})()
