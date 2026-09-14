const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.goto('https://lusorae.pt/news/vice-city-sign-kaseya-center-miami', { waitUntil: 'networkidle2' })
  console.log('related:', await page.evaluate(() => [...document.querySelectorAll('a[href^="/news/"] h3')].map((h) => h.textContent.trim().slice(0, 50)).join(' | ')))
  await page.goto('https://lusorae.pt/database/world', { waitUntil: 'networkidle2' })
  const business = '/database/world/ammu-nation'
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
  await page.goto(`https://lusorae.pt${business}`, { waitUntil: 'networkidle2' })
  const nav = await page.$('nav[aria-label="Adjacent records"]')
  const boxes = await page.$$eval('nav[aria-label="Adjacent records"] a', (as) => as.map((a) => { const r = a.getBoundingClientRect(); return `${a.textContent.trim().slice(0, 40)} @top=${Math.round(r.top)}` }))
  console.log(business, boxes.join(' | '))
  if (nav) { await nav.scrollIntoView(); await nav.screenshot({ path: '/home/ubuntu/.claude/jobs/aa302669/tmp/prevnext.png' }) }
  await browser.close()
})()
