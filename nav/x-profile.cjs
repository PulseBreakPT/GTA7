const puppeteer = require('/home/ubuntu/node_modules/puppeteer')
const { writeFileSync } = require('node:fs')
const out = '/home/ubuntu/.claude/jobs/aa302669/tmp'
;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36')
  await page.setViewport({ width: 1280, height: 1600 })
  await page.goto('https://x.com/gtasix_', { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => console.log('goto', e.message))
  await new Promise((r) => setTimeout(r, 4000))
  const seen = new Map()
  for (let round = 0; round < 12; round++) {
    const batch = await page.evaluate(() => [...document.querySelectorAll('article')].map((a) => ({
      text: a.innerText,
      time: a.querySelector('time')?.getAttribute('datetime') || '',
      link: [...a.querySelectorAll('a[href*="/status/"]')].map((l) => l.href).find((h) => /\/status\/\d+$/.test(h)) || '',
      images: [...a.querySelectorAll('img[src*="pbs.twimg.com/media"]')].map((i) => i.src.replace(/name=\w+/, 'name=large')),
    })))
    for (const t of batch) seen.set(t.link || t.text.slice(0, 80), t)
    await page.evaluate(() => window.scrollBy(0, 1400))
    await new Promise((r) => setTimeout(r, 1800))
  }
  const tweets = [...seen.values()]
  writeFileSync(`${out}/gtasix.json`, JSON.stringify(tweets, null, 1))
  console.log(tweets.length, 'posts')
  await browser.close()
})()
