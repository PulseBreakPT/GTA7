const { chromium } = require('/home/ubuntu/gta7/macaco/node_modules/playwright')
;(async () => {
  const browser = await chromium.launch()
  for (const [name, w, h] of [['desktop', 1440, 900], ['tablet', 820, 1180]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.goto('https://lusorae.pt/database/world/vice-city-police-department', { waitUntil: 'networkidle' })
    const toolbox = page.locator('details.archive-page-toolbox').first()
    await toolbox.evaluate((d) => { d.open = true })
    await page.waitForTimeout(300)
    const info = await page.evaluate(() => [...document.querySelectorAll('nav.wiki-page-tools > *')].map((el) => { const r = el.getBoundingClientRect(); return `${el.tagName} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" x${Math.round(r.x)} y${Math.round(r.y)} w${Math.round(r.width)} h${Math.round(r.height)}` }))
    console.log(name, '\n  ' + info.join('\n  '))
    await toolbox.screenshot({ path: `/home/ubuntu/.claude/jobs/aa302669/tmp/tools-${name}.png` })
    await page.close()
  }
  await browser.close()
})()
