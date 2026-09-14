const { chromium } = require('/home/ubuntu/gta7/macaco/node_modules/playwright')
;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('https://lusorae.pt/database/world/vice-city-police-department', { waitUntil: 'networkidle' })
  const info = await page.evaluate(() => {
    const d = document.querySelector('details.archive-page-toolbox')
    const out = { open: d.open, detailsBox: JSON.stringify(d.getBoundingClientRect()) }
    out.items = [...document.querySelectorAll('nav.wiki-page-tools > *')].map((el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return `${(el.innerText || '').trim().slice(0, 20)} y${Math.round(r.y)} h${Math.round(r.height)} vis:${s.visibility} op:${s.opacity} disp:${s.display}` })
    const nav = document.querySelector('nav.wiki-page-tools')
    const ns = getComputedStyle(nav)
    out.nav = `display:${ns.display} position:${ns.position} height:${Math.round(nav.getBoundingClientRect().height)} overflow:${ns.overflow} opacity:${ns.opacity} visibility:${ns.visibility}`
    const sign = [...document.querySelectorAll('a, button')].find((el) => /Sign in for personal tools/.test(el.innerText))
    if (sign) { const r = sign.getBoundingClientRect(); out.sign = `y${Math.round(r.y)} h${Math.round(r.height)} x${Math.round(r.x)} w${Math.round(r.width)}` }
    return out
  })
  console.log(JSON.stringify(info, null, 1))
  await browser.close()
})()
