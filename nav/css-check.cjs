const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  for (const url of ['https://lusorae.pt/database/world/bobcats', 'https://lusorae.pt/database/vehicles/stanier', 'https://lusorae.pt/']) {
    const page = await browser.newPage()
    const css = []
    page.on('response', (r) => { if (r.request().resourceType() === 'stylesheet') css.push(`${r.status()} ${r.url().split('/').pop()}`) })
    await page.setViewport({ width: 412, height: 915, isMobile: true, hasTouch: true })
    await page.goto(url, { waitUntil: 'networkidle2' })
    const probe = await page.evaluate(() => ({
      bodyFont: getComputedStyle(document.body).fontFamily.slice(0, 40),
      sheets: [...document.styleSheets].map((s) => (s.href || 'inline').split('/').pop()),
      flexProbe: (() => { const d = document.createElement('div'); d.className = 'flex'; document.body.appendChild(d); const v = getComputedStyle(d).display; d.remove(); return v })(),
    }))
    console.log(url.replace('https://lusorae.pt', '') || '/', JSON.stringify({ css, ...probe }))
    await page.close()
  }
  await browser.close()
})()
