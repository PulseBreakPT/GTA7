const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true })
  await page.goto('https://lusorae.pt/database/world/ammu-nation', { waitUntil: 'networkidle2' })
  const info = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Adjacent records"]')
    const cs = getComputedStyle(nav)
    const rules = []
    for (const sheet of document.styleSheets) {
      let list
      try { list = sheet.cssRules } catch { continue }
      for (const rule of list) {
        const inner = rule.cssRules ? [...rule.cssRules] : [rule]
        for (const r of inner) if (r.selectorText && nav.matches(r.selectorText) && /grid|display/.test(r.style.cssText)) rules.push(`${r.selectorText} { ${r.style.cssText} }`)
      }
    }
    return { display: cs.display, cols: cs.gridTemplateColumns, className: nav.className, rules }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
