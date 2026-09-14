const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('https://lusorae.pt/database/vehicles', { waitUntil: 'networkidle2' })
  await page.evaluate(() => window.scrollBy(0, 1500))
  await new Promise((r) => setTimeout(r, 1500))
  const info = await page.evaluate(() => {
    const label = [...document.querySelectorAll('*')].find((el) => el.children.length === 0 && el.textContent.trim() === 'BISON 900')
    let card = label
    for (let i = 0; i < 6 && card && !/^(BUTTON|A)$/.test(card.tagName); i++) card = card.parentElement
    const img = card?.querySelector('img')
    const box = img?.getBoundingClientRect()
    const vis = img?.parentElement
    return {
      cardTag: card?.tagName, cardClass: card?.className?.slice(0, 160),
      img: img ? { src: img.currentSrc?.slice(0, 90), complete: img.complete, nw: img.naturalWidth, w: Math.round(box.width), h: Math.round(box.height), opacity: getComputedStyle(img).opacity, display: getComputedStyle(img).display, visibility: getComputedStyle(img).visibility, position: getComputedStyle(img).position } : null,
      wrapper: vis ? { cls: vis.className?.slice(0, 160), w: Math.round(vis.getBoundingClientRect().width), h: Math.round(vis.getBoundingClientRect().height), overflow: getComputedStyle(vis).overflow } : null,
      html: card?.innerHTML.slice(0, 700),
    }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
