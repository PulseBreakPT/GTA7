const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 412, height: 915, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  await page.goto('https://lusorae.pt/database/world/bobcats', { waitUntil: 'networkidle2' })
  await page.screenshot({ path: '/home/ubuntu/.claude/jobs/aa302669/tmp/bobcats-1.png' })
  await page.evaluate(() => window.scrollBy(0, 800))
  await new Promise((r) => setTimeout(r, 400))
  await page.screenshot({ path: '/home/ubuntu/.claude/jobs/aa302669/tmp/bobcats-2.png' })
  const info = await page.evaluate(() => {
    const bc = document.querySelector('nav[aria-label="Breadcrumb"], .wiki-breadcrumb, nav ol')
    return {
      breadcrumb: bc ? { tag: bc.tagName, cls: bc.className, display: getComputedStyle(bc).display, list: bc.querySelector('ol') ? getComputedStyle(bc.querySelector('ol')).display : null } : null,
      version: document.querySelector('.footer-v3-release strong')?.textContent,
    }
  })
  console.log(JSON.stringify(info))
  await browser.close()
})()
