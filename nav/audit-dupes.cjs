const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
const { writeFileSync } = require('node:fs')
// Abre cada ficha como um browser e procura, dentro do conteúdo principal:
// blocos de texto repetidos e etiquetas de estado (ANALYSIS, RUMOUR, …)
// mostradas mais de uma vez.
const urls = process.argv.slice(2)
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 1000 })
  const report = []
  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
    const r = await page.evaluate(() => {
      const root = document.querySelector('main') || document.body
      const skip = (el) => el.closest('header.wiki-global-header, footer, nav[aria-label="Adjacent records"], .mobile-tabbar-shell')
      const blocks = [...root.querySelectorAll('p, li, dd, td, h2, h3, figcaption, span, strong, small')]
        .filter((el) => !skip(el) && el.children.length === 0)
        .map((el) => el.textContent.replace(/\s+/g, ' ').trim())
        .filter((t) => t.length >= 25)
      const counts = {}
      for (const b of blocks) counts[b] = (counts[b] || 0) + 1
      const badges = [...root.querySelectorAll('span, b, small')]
        .filter((el) => !skip(el) && el.children.length <= 1)
        .map((el) => el.textContent.trim().toUpperCase())
        .filter((t) => /^(ANALYSIS|RUMOUR|CONFIRMED|VERIFIED|OFFICIAL|COMMUNITY|LEAKED|UNVERIFIED)$/.test(t))
      const badgeCounts = {}
      for (const b of badges) badgeCounts[b] = (badgeCounts[b] || 0) + 1
      return { dupes: Object.entries(counts).filter(([, n]) => n > 1), badges: badgeCounts }
    })
    report.push({ url, ...r })
    const multi = Object.entries(r.badges).filter(([, n]) => n > 1).map(([b, n]) => `${b}×${n}`).join(' ')
    console.log(`\n== ${url.replace('https://lusorae.pt', '')}  dupes:${r.dupes.length}  badges:${JSON.stringify(r.badges)} ${multi ? '← repeated' : ''}`)
    for (const [t, n] of r.dupes.slice(0, 6)) console.log(`   ×${n} ${t.slice(0, 140)}`)
  }
  writeFileSync('/home/ubuntu/.claude/jobs/aa302669/tmp/audit-dupes.json', JSON.stringify(report, null, 1))
  await browser.close()
})()
