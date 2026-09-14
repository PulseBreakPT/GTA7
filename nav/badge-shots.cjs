const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
const out = '/home/ubuntu/.claude/jobs/aa302669/tmp'
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 })
  const shots = [
    ['vehicle', '/database/vehicles/patriot-mil-spec', 'header.wiki-article-header'],
    ['weapon', '/database/weapons/pistol', 'header.wiki-article-header'],
    ['world', '/database/world/bobcats', 'header.wiki-article-header'],
    ['radio', '/database/radio/v-rock', 'header.wiki-article-header'],
  ]
  for (const [name, path, sel] of shots) {
    await page.goto(`https://lusorae.pt${path}`, { waitUntil: 'networkidle2' })
    const el = await page.$(sel)
    if (el) await el.screenshot({ path: `${out}/badge-${name}.png` })
  }
  await page.goto('https://lusorae.pt/database/vehicles', { waitUntil: 'networkidle2' })
  await page.evaluate(() => window.scrollBy(0, 900))
  await new Promise((r) => setTimeout(r, 500))
  await page.screenshot({ path: `${out}/badge-list.png` })
  await browser.close()
})()
