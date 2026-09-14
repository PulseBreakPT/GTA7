const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('https://lusorae.pt/database/vehicles', { waitUntil: 'networkidle2' })
  for (let i = 0; i < 4; i++) { await page.evaluate(() => window.scrollBy(0, 700)); await new Promise((r) => setTimeout(r, 700)) }
  const r = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('a[href^="/database/vehicles/"]')].slice(0, 24)
    return cards.map((a) => {
      const img = a.querySelector('img')
      return { slug: a.getAttribute('href').split('/').pop(), img: img ? (img.complete && img.naturalWidth > 0 ? 'loaded' : 'not-loaded') : 'none', text: a.textContent.includes('AWAITING') }
    })
  })
  const summary = r.reduce((m, x) => ((m[x.img] = (m[x.img] || 0) + 1), m), {})
  console.log(JSON.stringify(summary), r.slice(0, 8).map((x) => `${x.slug}:${x.img}${x.text ? '(awaiting)' : ''}`).join(' '))
  await page.screenshot({ path: '/home/ubuntu/.claude/jobs/aa302669/tmp/list-after.png' })
  await browser.close()
})()
