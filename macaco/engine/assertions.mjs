// Assertions after every action: the minimum a page must still be.
export async function assertPage(page, { origin, response }) {
  const failures = []
  const url = page.url()
  let parsed = null
  try { parsed = new URL(url) } catch {}
  if (!parsed || !/^https?:$/.test(parsed.protocol)) failures.push({ check: 'invalid-url', message: `The browser ended on an invalid URL: ${url}` })
  else if (parsed.origin !== origin && !url.startsWith('about:')) failures.push({ check: 'left-site', message: `An action took the visitor off-site to ${parsed.origin}` })
  if (response && response.status() >= 500) failures.push({ check: 'document-5xx', message: `The page answered ${response.status()}` })

  let facts
  try {
    facts = await page.evaluate(() => {
      const body = document.body
      const text = (body?.innerText || '').trim()
      const fatal = /Application error: a client-side exception|Unhandled Runtime Error|Internal Server Error|Something went wrong|This page could(n't| not) load|500 Internal/i.exec(text)
      const vw = document.documentElement.clientWidth
      const header = document.querySelector('header')
      const main = document.querySelector('main')
      const inScreen = (el) => { if (!el) return true; const r = el.getBoundingClientRect(); return r.left > -5 && r.right < vw + 5 }
      return {
        textLength: text.length,
        fatal: fatal ? fatal[0] : null,
        headerInScreen: inScreen(header),
        mainInScreen: inScreen(main),
        blank: text.length < 40 && !document.querySelector('img, video, canvas'),
      }
    })
  } catch (error) {
    failures.push({ check: 'page-unresponsive', message: `The page could not be inspected: ${error.message.slice(0, 120)}` })
    return failures
  }
  if (facts.blank) failures.push({ check: 'blank-page', message: 'The page is blank after the action' })
  if (facts.fatal) failures.push({ check: 'fatal-error', message: `The page shows a fatal error: "${facts.fatal}"` })
  if (!facts.headerInScreen) failures.push({ check: 'header-off-screen', message: 'The site header is pushed outside the screen' })
  if (!facts.mainInScreen) failures.push({ check: 'main-off-screen', message: 'The main content is pushed outside the screen' })
  return failures
}
