const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })
  await page.goto('https://lusorae.pt/database/vehicles', { waitUntil: 'networkidle2' })
  const info = await page.evaluate(() => {
    const img = document.querySelector('button.w-full.text-left img')
    const wrap = img.parentElement
    const btn = wrap.closest('button')
    const rules = (el) => {
      const out = []
      for (const sheet of document.styleSheets) {
        let list
        try { list = sheet.cssRules } catch { continue }
        const walk = (rs) => { for (const r of rs) { if (r.cssRules) walk(r.cssRules); else if (r.selectorText && el.matches(r.selectorText) && /display|align|width|flex/.test(r.style.cssText)) out.push(`${r.selectorText.slice(0, 140)} { ${r.style.cssText.slice(0, 160)} }`) } }
        walk(list)
      }
      return out
    }
    const cs = (el) => { const s = getComputedStyle(el); return `display:${s.display} align-items:${s.alignItems} width:${el.getBoundingClientRect().width}` }
    return { btn: cs(btn), btnParent: cs(btn.parentElement), wrap: cs(wrap), btnRules: rules(btn), wrapRules: rules(wrap) }
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
