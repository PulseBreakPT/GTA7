#!/usr/bin/env node
// MACACO — autonomous QA bot for Lusorae.
//
//   macaco lusorae.pt                      explore (SMART) on desktop, tablet and mobile
//   macaco lusorae.pt --mode chaos         try the combinations nobody sane would
//   macaco lusorae.pt --mode both          SMART first, then CHAOS
//   macaco lusorae.pt --seed 482913        reproduce a whole run
//   macaco replay runs/<run>/incidents/MACACO-00012.json
//   macaco report runs/<run>               rebuild the HTML report
//
// Options: --actions N (per session, default 150) · --sessions N (per viewport, default 1)
//          --viewports desktop,tablet,mobile · --minutes N (time budget, default 30)
//          --start /path · --no-a11y · --no-security · --no-video · --no-trace
//          --headed · --out DIR · --quiet
import { chromium, request as playwrightRequest } from 'playwright'
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { join, resolve, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { newSeed } from '../replay/seed.mjs'
import { Crawler } from '../engine/crawler.mjs'
import { runSession } from '../engine/session.mjs'
import { Deduplicator } from '../reporter/deduplication.mjs'
import { Evidence } from '../evidence/evidence.mjs'
import { RateLimiter } from '../guards/rate-limit.mjs'
import { probeSecurity } from '../inspectors/security.mjs'
import { summarise, textSummary, incidentText } from '../reporter/json-report.mjs'
import { htmlReport } from '../reporter/html-report.mjs'
import { loadIncident } from '../replay/steps.mjs'
import { fingerprint } from '../reporter/deduplication.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const VIEWPORTS = {
  desktop: { name: 'desktop', label: 'desktop 1440x900', width: 1440, height: 900 },
  tablet: { name: 'tablet', label: 'tablet 820x1180', width: 820, height: 1180, mobile: true, scale: 2, userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
  mobile: { name: 'mobile', label: 'mobile 390x844', width: 390, height: 844, mobile: true, scale: 3, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
}

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith('--')) { args._.push(a); continue }
    const key = a.slice(2)
    if (key.startsWith('no-')) { args[key.slice(3)] = false; continue }
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) args[key] = true
    else { args[key] = next; i++ }
  }
  return args
}

const originOf = (target) => {
  const url = new URL(/^https?:\/\//.test(target) ? target : `https://${target}`)
  return { origin: url.origin, host: url.host, start: url.pathname !== '/' ? url.pathname + url.search : null }
}

// Verificações desligadas por decisão de produto (macaco.config.json).
function loadIgnore() {
  const file = join(ROOT, 'macaco.config.json')
  if (!existsSync(file)) return new Set()
  const config = JSON.parse(readFileSync(file, 'utf8'))
  return new Set((config.ignore || []).map((rule) => rule.check || rule))
}

function nextRunNumber(outDir) {
  const counter = join(outDir, '.counter')
  const n = (existsSync(counter) ? Number(readFileSync(counter, 'utf8')) || 0 : 0) + 1
  writeFileSync(counter, String(n))
  return n
}

function writeReports(runDir, summary, incidents) {
  const plain = incidents.map((i) => ({ ...i, replaySteps: undefined }))
  writeFileSync(join(runDir, 'report.json'), JSON.stringify({ summary, incidents: plain }, null, 2))
  writeFileSync(join(runDir, 'report.html'), htmlReport(summary, plain))
  writeFileSync(join(runDir, 'report.txt'), `${textSummary(summary)}\n\n${'='.repeat(60)}\n\n${plain.map(incidentText).join(`\n\n${'-'.repeat(60)}\n\n`)}\n`)
}

async function explore(args) {
  const target = args._[0] || 'lusorae.pt'
  const { origin, host, start } = originOf(target)
  const modes = args.mode === 'both' ? ['smart', 'chaos'] : [args.mode === 'chaos' ? 'chaos' : 'smart']
  const viewports = String(args.viewports || 'desktop,tablet,mobile').split(',').map((v) => VIEWPORTS[v.trim()]).filter(Boolean)
  const options = {
    actions: Number(args.actions || 150),
    sessions: Number(args.sessions || 1),
    maxMs: Number(args.minutes || 30) * 60000,
    a11y: args.a11y !== false,
    security: args.security !== false,
    video: args.video !== false,
    trace: args.trace !== false,
    verbose: args.quiet !== true,
  }
  const outDir = resolve(args.out || join(ROOT, 'runs'))
  mkdirSync(outDir, { recursive: true })
  options.ignore = loadIgnore()
  const number = nextRunNumber(outDir)
  const seed = Number(args.seed || newSeed())
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const dirName = `run-${String(number).padStart(4, '0')}-${stamp}`
  const runDir = join(outDir, dirName)
  const evidence = new Evidence(runDir)
  const crawler = new Crawler(origin)
  const dedup = new Deduplicator()
  const limiter = new RateLimiter({ minDelayMs: Number(args.delay || 250), maxPerMinute: Number(args['per-minute'] || 150) })
  const run = {
    number, id: dirName, dirName: join(basename(outDir) === 'runs' ? 'runs' : outDir, dirName), origin, host, seed, mode: modes.join('+'),
    startUrl: new URL(args.start || start || '/', origin).toString(),
    started: new Date().toISOString(), startedAt: Date.now(),
    viewports, actions: 0, inspected: new Set(), a11yDone: new Set(), a11yViewport: viewports[0].name, skipped: {},
  }

  console.log(`🐒 MACACO run #${number} → ${origin}  mode ${run.mode.toUpperCase()} · seed ${seed} · ${viewports.map((v) => v.name).join(', ')} · ${options.actions} actions/session`)
  const browser = await chromium.launch({ headless: args.headed !== true })
  try {
    if (options.security) {
      const req = await playwrightRequest.newContext({ extraHTTPHeaders: { 'User-Agent': 'MacacoQA/1.0 (security probe)' } })
      const findings = await probeSecurity(req, { origin, paths: ['/database/vehicles', '/news', '/map'] })
      for (const f of findings) {
        if (options.ignore.has(f.check)) continue
        const { incident, isNew } = dedup.add(f, { pattern: f.selector || '/', path: f.selector || '/', viewport: 'http', viewportLabel: 'HTTP (no browser)', mode: 'security', steps: [`GET ${f.selector}`], seed, sessionSeed: seed })
        if (isNew) { incident.replay = `curl -sI ${origin}${f.selector?.startsWith('/') ? f.selector : '/'}`; incident.replaySteps = [] }
      }
      await req.dispose()
      console.log(`  security probe: ${findings.length} finding(s)`)
    }
    for (const mode of modes) {
      for (const viewport of viewports) {
        for (let index = 0; index < options.sessions; index++) {
          if (Date.now() - run.startedAt > options.maxMs) break
          const r = await runSession({ browser, run, viewport, mode, index, crawler, dedup, evidence, limiter, options })
          for (const [k, v] of Object.entries(r.skipped)) run.skipped[k] = (run.skipped[k] || 0) + v
          console.log(`  session ${r.name}: ${r.actions} actions, ${r.incidents} new incident(s), ${r.seconds}s (session seed ${r.seed})`)
        }
      }
    }
  } finally {
    await browser.close()
  }
  run.finished = new Date().toISOString()
  run.crawler = crawler.stats()
  const incidents = dedup.list()
  const summary = summarise(run, incidents)
  writeReports(runDir, summary, incidents)
  writeFileSync(join(runDir, 'crawl.json'), JSON.stringify({ discovered: [...crawler.discovered], visited: Object.fromEntries(crawler.visited), patterns: Object.fromEntries(crawler.patterns), external: [...crawler.external] }, null, 2))
  console.log(`\n${textSummary(summary)}\n\nReport: ${join(runDir, 'report.html')}`)
  const top = incidents.filter((i) => i.severity === 'CRITICAL' || i.severity === 'HIGH').slice(0, 5)
  if (top.length) console.log(`\nTop incidents:\n${top.map((i) => `  ${i.severity.padEnd(8)} ${i.id} ×${i.occurrences}  ${i.title.slice(0, 100)}`).join('\n')}`)
  return summary.severity.CRITICAL > 0 ? 2 : 0
}

async function replay(args) {
  const file = resolve(args._[1] || '')
  const incident = loadIncident(file)
  const origin = incident.origin
  const runDir = join(dirname(dirname(file)), `replay-${incident.id}-${Date.now()}`)
  const evidence = new Evidence(runDir)
  const dedup = new Deduplicator()
  const crawler = new Crawler(origin)
  const run = {
    number: 0, id: basename(runDir), dirName: runDir, origin, host: new URL(origin).host, seed: incident.seed, mode: `replay ${incident.id}`,
    startUrl: incident.startUrl, started: new Date().toISOString(), startedAt: Date.now(), viewports: [incident.viewportSpec],
    actions: 0, inspected: new Set(), a11yDone: new Set(), a11yViewport: 'none', skipped: {},
  }
  console.log(`🐒 replaying ${incident.id} (${incident.replaySteps.length} steps, ${incident.viewportSpec.name}) — looking for: ${incident.title}`)
  const browser = await chromium.launch({ headless: args.headed !== true })
  try {
    await runSession({ browser, run, viewport: incident.viewportSpec, mode: incident.mode, index: 0, crawler, dedup, evidence, limiter: new RateLimiter({ minDelayMs: 300 }), options: { actions: 0, maxMs: 20 * 60000, a11y: false, video: true, trace: true, verbose: true }, replaySteps: incident.replaySteps })
  } finally {
    await browser.close()
  }
  // O mesmo bug: a mesma impressão digital, ou a mesma verificação no mesmo tipo de página.
  const again = dedup.list().find((i) => i.fingerprint === incident.fingerprint || (i.check === incident.check && i.pattern === incident.pattern))
  console.log(again ? `\nREPRODUCED: ${incident.id} happened again (${again.occurrences}×). Evidence in ${runDir}` : `\nNOT reproduced: ${incident.id} did not happen in this replay. Evidence in ${runDir}`)
  return again ? 1 : 0
}

async function report(args) {
  const runDir = resolve(args._[1] || '')
  const data = JSON.parse(readFileSync(join(runDir, 'report.json'), 'utf8'))
  writeReports(runDir, data.summary, data.incidents)
  console.log(`Rebuilt ${join(runDir, 'report.html')}`)
  return 0
}

const args = parseArgs(process.argv.slice(2))
const command = args._[0] === 'replay' ? replay : args._[0] === 'report' ? report : explore
if (args.help || args.h) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 17).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'))
  process.exit(0)
}
command(args).then((code) => process.exit(code)).catch((error) => { console.error(error); process.exit(1) })
