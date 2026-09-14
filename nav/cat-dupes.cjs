const { chromium } = require('/home/ubuntu/gta7/macaco/node_modules/playwright')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('https://lusorae.pt/wiki/category/locations', { waitUntil: 'networkidle' })
  const info = await page.evaluate(() => {
    const links = [...document.querySelectorAll('main a[href]')].filter((a) => /OCEAN BEACH/.test(a.innerText))
    return links.map((a) => ({ href: a.getAttribute('href'), text: a.innerText.replace(/\s+/g, ' ').slice(0, 60), parent: a.parentElement.className.slice(0, 80), section: a.closest('section, [id]')?.id || a.closest('section')?.className?.slice(0, 60) }))
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
