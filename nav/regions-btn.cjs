const { chromium } = require('/home/ubuntu/gta7/macaco/node_modules/playwright')
;(async () => {
  const browser = await chromium.launch()
  for (const [w, h] of [[1440, 900], [820, 1180]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } })
    await page.goto('https://lusorae.pt/database/world', { waitUntil: 'networkidle' })
    const info = await page.evaluate(() => {
      const el = [...document.querySelectorAll('button, a')].find((x) => /Regions/.test(x.innerText || x.getAttribute("aria-label") || ""))
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { html: el.outerHTML.slice(0, 400), parent: el.parentElement.outerHTML.slice(0, 300), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] }
    })
    console.log(w, JSON.stringify(info, null, 1))
    await page.close()
  }
  await browser.close()
})()
