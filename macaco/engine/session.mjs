// One exploration session: one browser context, one viewport, one seed.
// Before each action the state is recorded; after it, the page is compared,
// asserted, inspected, and anything wrong becomes an incident with evidence.
import { join } from 'node:path'
import { mkdtempSync, rmSync } from 'node:fs'
import { createRng, deriveSeed } from '../replay/seed.mjs'
import { MonkeyEngine } from './monkey.mjs'
import { StateManager, snapshot, changed } from './state.mjs'
import { discover, perform, waitStable, descriptorOf, pathOf } from './navigator.mjs'
import { assertPage } from './assertions.mjs'
import { attachConsole } from '../inspectors/console.mjs'
import { attachNetwork } from '../inspectors/network.mjs'
import { inspectVisual } from '../inspectors/visual.mjs'
import { inspectUx, inspectDuplicates } from '../inspectors/ux.mjs'
import { inspectAccessibility } from '../inspectors/accessibility.mjs'
import { leaksInternals } from '../inspectors/security.mjs'
import { incidentText } from '../reporter/json-report.mjs'

const EVENT_TO_CHECK = {
  'js-exception': 'js-exception', 'promise-rejection': 'promise-rejection', 'console-error': 'console-error',
  'page-crash': 'page-crash', 'http-5xx': 'http-5xx', 'http-4xx': 'http-4xx', 'broken-image': 'broken-image',
  'request-failed': 'request-failed', 'request-blocked': 'request-blocked', 'slow-request': 'slow-request',
}

function createBus() {
  const events = []
  let seq = 0
  return {
    events,
    emit(event) { events.push({ ...event, seq: ++seq, at: Date.now() }); if (events.length > 5000) events.splice(0, 1000) },
    get seq() { return seq },
    since(n) { return events.filter((e) => e.seq > n) },
  }
}

export async function runSession({ browser, run, viewport, mode, index, crawler, dedup, evidence, limiter, options, replaySteps = null }) {
  const sessionSeed = deriveSeed(run.seed, mode, viewport.name, index)
  const rng = createRng(sessionSeed)
  const name = `${mode}-${viewport.name}-${index}`
  // Gravado dentro da pasta da execução: um rename entre sistemas de
  // ficheiros (/tmp → runs/) falhava em silêncio e o vídeo perdia-se.
  const videoDir = options.video ? mkdtempSync(join(evidence.runDir, 'videos', '.tmp-')) : null
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.scale || 1,
    isMobile: Boolean(viewport.mobile),
    hasTouch: Boolean(viewport.mobile),
    userAgent: `${viewport.userAgent || 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36'} MacacoQA/1.0`,
    recordVideo: videoDir ? { dir: videoDir, size: { width: Math.min(viewport.width, 1280), height: Math.min(viewport.height, 900) } } : undefined,
    ignoreHTTPSErrors: false,
  })
  if (options.trace) await evidence.startTrace(context)
  const page = await context.newPage()
  page.setDefaultTimeout(10000)
  const bus = createBus()
  attachConsole(page, bus)
  attachNetwork(page, bus, { origin: run.origin })
  let lastDocument = null
  page.on('response', (res) => { if (res.request().isNavigationRequest() && res.frame() === page.mainFrame()) lastDocument = res })

  const engine = new MonkeyEngine({ rng, mode, crawler, origin: run.origin })
  const state = new StateManager({ startUrl: run.startUrl })
  const steps = []
  const records = []
  const history = []
  const created = []
  const started = Date.now()
  const viewportLabel = `${viewport.width}x${viewport.height}`

  const register = async (finding, { path, extra = {} } = {}) => {
    // Verificações desligadas no macaco.config.json (decisões de produto).
    if (options.ignore?.has(finding.check)) return null
    const pattern = crawler.pattern(page.url())
    const recent = bus.events.filter((e) => !e.silent).slice(-40)
    const { incident, isNew } = dedup.add(finding, {
      pattern, path: path || pathOf(page.url()), viewport: viewport.name, viewportLabel, mode,
      steps: steps.length > 15 ? [`(${steps.length - 12} earlier steps — see the replay file)`, ...steps.slice(-12)] : [...steps],
      result: extra.result,
      console: recent.filter((e) => /console|exception|rejection|crash/.test(e.category)).slice(-5).map((e) => e.message),
      network: recent.filter((e) => /http|request|image/.test(e.category)).slice(-5).map((e) => e.message),
      seed: run.seed, sessionSeed,
    })
    if (!isNew) return incident
    incident.screenshot = await evidence.screenshot(page, incident.id.toLowerCase())
    incident.session = name
    incident.replaySteps = [...records]
    incident.replayFile = `incidents/${incident.id}.json`
    incident.replay = `macaco replay ${run.dirName}/${incident.replayFile}`
    incident.seedReplay = `macaco ${run.host} --mode ${mode} --seed ${run.seed} --viewports ${viewport.name} --actions ${records.length}`
    created.push(incident)
    evidence.log(`${incident.severity} ${incident.id} ${incident.title}`)
    if (options.verbose) console.log(`  ! ${incident.severity.padEnd(8)} ${incident.id} ${incident.title.slice(0, 110)}`)
    return incident
  }

  // Per-page inspections run once per route pattern and viewport.
  const inspectPage = async () => {
    const pattern = crawler.pattern(page.url())
    const key = `${viewport.name}|${pattern}`
    if (run.inspected.has(key)) return
    run.inspected.add(key)
    for (const f of await inspectVisual(page)) await register(f)
    for (const f of await inspectDuplicates(page)) await register(f)
    if (options.a11y && !run.a11yDone.has(pattern) && viewport.name === run.a11yViewport) {
      run.a11yDone.add(pattern)
      for (const f of await inspectAccessibility(page)) await register(f)
      await page.evaluate(() => document.activeElement?.blur()).catch(() => {})
    }
  }

  const handleEvents = async (events, action) => {
    for (const e of events) {
      if (e.silent) continue
      let check = EVENT_TO_CHECK[e.category]
      if (!check) continue
      // Third-party noise is logged but never rated above LOW.
      const thirdParty = e.url && !e.url.startsWith(run.origin) && ['http-4xx', 'request-failed', 'request-blocked', 'slow-request'].includes(check)
      if (check === 'http-4xx' && e.resourceType === 'document' && e.sameOrigin && action?.element?.href) check = 'broken-link'
      await register({ check, message: e.message, severity: thirdParty ? 'LOW' : undefined, detail: e.stack || e.url || '' }, { extra: { result: e.message } })
      if (check === 'http-5xx' && leaksInternals(e.body)) await register({ check: 'security:error-leak', severity: 'HIGH', message: `A server error page exposes internal details (${e.message})`, detail: e.body.slice(0, 300) })
    }
  }

  try {
    await page.goto(run.startUrl, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await waitStable(page)
    steps.push(`Open ${pathOf(run.startUrl)} (${viewportLabel})`)
    crawler.visit(page.url())
    history.push(await snapshot(page))
    await handleEvents(bus.since(0), null)
    await inspectPage()

    const total = replaySteps ? replaySteps.length : options.actions
    for (let i = 0; i < total; i++) {
      if (Date.now() - run.startedAt > options.maxMs) break
      if (page.isClosed()) break
      await limiter.wait()
      const before = await snapshot(page)
      const candidates = await discover(page)
      crawler.addLinks(candidates)

      let action
      if (replaySteps) {
        action = await materialise(page, replaySteps[i], candidates)
        if (!action) { steps.push(`(step ${i + 1} could not be found on the page: ${replaySteps[i].label})`); continue }
      } else {
        action = engine.choose(candidates, before)
      }
      const mark = bus.seq
      lastDocument = null
      let description
      let failed = null
      try {
        description = await perform(page, action)
      } catch (error) {
        failed = error
        description = `${action.type} ${action.element ? `"${action.element.name}"` : action.url || action.value || ''} (did not complete: ${error.message.split('\n')[0].slice(0, 80)})`
      }
      steps.push(description)
      records.push({ type: action.type, descriptor: action.element ? descriptorOf(action.element) : null, value: action.value ?? null, url: action.url || null, submit: action.submit || false, label: description, at: pathOf(before.url) })
      if (action.element) crawler.markTested(before.url, action.element)
      run.actions++

      await waitStable(page)
      if (page.isClosed()) { await register({ check: 'page-crash', message: 'The page closed or crashed after an action' }); break }
      const after = await snapshot(page)
      crawler.visit(page.url())
      const events = bus.since(mark)

      await handleEvents(events, action)
      if (failed && /crash|Target closed|has been closed/i.test(failed.message)) await register({ check: 'page-crash', message: `Browser tab crashed: ${failed.message.slice(0, 120)}` })
      for (const f of await assertPage(page, { origin: run.origin, response: lastDocument })) {
        // A deliberately mutated URL may legitimately land on an error page.
        if (action.why?.startsWith('chaos: mutated') && f.check === 'document-5xx') f.check = 'fuzzed-url-5xx'
        await register(f, { extra: { result: f.message } })
      }
      if (!failed) for (const f of await inspectUx(page, { action, before, after, events, history })) await register(f)
      if (changed(before, after) && (after.url !== before.url || after.dialogs > before.dialogs)) await inspectPage()
      if (after.dialogs > before.dialogs) for (const f of await inspectVisual(page)) if (f.check === 'dialog-too-big') await register(f)

      state.record(before, description, after)
      history.push(after)
      if (history.length > 30) history.shift()
      const stuck = state.stuckReason()
      if (stuck && !replaySteps) {
        await register({ check: 'stuck', message: `The Macaco got stuck (${stuck}) on ${pathOf(page.url())}`, selector: crawler.pattern(page.url()) })
        steps.push(...await state.recover(page))
      }
    }
  } catch (error) {
    await register({ check: 'page-unresponsive', message: `Session aborted: ${error.message.split('\n')[0].slice(0, 160)}` }).catch(() => {})
  }

  const keep = created.length > 0
  const trace = options.trace ? await evidence.stopTrace(context, name, keep) : null
  const video = page.video()
  await context.close().catch(() => {})
  let videoPath = null
  if (video) { try { videoPath = evidence.keepVideo(await video.path(), name, keep) } catch {} }
  if (videoDir) rmSync(videoDir, { recursive: true, force: true })
  for (const incident of created) {
    incident.trace = trace
    incident.video = videoPath
    evidence.writeJson('incidents', `${incident.id}.json`, { ...incident, text: incidentText({ ...incident, viewports: [...incident.viewports], pages: [...incident.pages] }), origin: run.origin, startUrl: run.startUrl, viewportSpec: viewport, mode })
  }
  return { name, seed: sessionSeed, actions: records.length, incidents: created.length, seconds: Math.round((Date.now() - started) / 1000), skipped: Object.fromEntries(engine.skipped), transitions: state.transitions.length }
}

// Replay: turn a recorded step back into an action on the current page.
async function materialise(page, step, candidates) {
  if (!step.descriptor) return { type: step.type, value: step.value, url: step.url, submit: step.submit, why: 'replay' }
  const d = step.descriptor
  const match = candidates.find((c) => c.tag === d.tag && c.name === d.name && (!d.href || c.href === d.href) && c.nth === d.nth)
    || candidates.find((c) => c.tag === d.tag && c.name === d.name && (!d.href || c.href === d.href))
  if (!match) return null
  return { type: step.type, element: match, value: step.value, url: step.url, submit: step.submit, why: 'replay' }
}
