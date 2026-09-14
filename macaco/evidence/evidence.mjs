// Evidence locker: screenshots, Playwright traces, videos and logs for each
// run. Traces and videos are expensive, so a session keeps them only when it
// produced an incident — then there is a literal recording of the break.
import { mkdirSync, writeFileSync, appendFileSync, rmSync, existsSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

export class Evidence {
  constructor(runDir) {
    this.runDir = runDir
    for (const sub of ['screenshots', 'traces', 'videos', 'logs', 'incidents']) mkdirSync(join(runDir, sub), { recursive: true })
    this.logFile = join(runDir, 'logs', 'run.log')
  }

  path(sub, name) { return join(this.runDir, sub, name) }
  rel(sub, name) { return `${sub}/${name}` }

  async screenshot(page, name) {
    const file = `${name}.png`
    try {
      await page.screenshot({ path: this.path('screenshots', file), fullPage: false, timeout: 8000 })
      return this.rel('screenshots', file)
    } catch {
      return null
    }
  }

  log(line) {
    appendFileSync(this.logFile, `${new Date().toISOString()} ${line}\n`)
  }

  writeJson(sub, name, data) {
    const file = this.path(sub, name)
    writeFileSync(file, JSON.stringify(data, (key, value) => (value instanceof Set ? [...value] : value), 2))
    return file
  }

  // Tracing runs for the whole session; kept only if the session found bugs.
  async startTrace(context) {
    try { await context.tracing.start({ screenshots: true, snapshots: true, sources: false }) } catch {}
  }

  async stopTrace(context, name, keep) {
    try {
      if (keep) {
        await context.tracing.stop({ path: this.path('traces', `${name}.zip`) })
        return this.rel('traces', `${name}.zip`)
      }
      await context.tracing.stop()
    } catch {}
    return null
  }

  // Videos are written when the context closes; discard those without bugs.
  keepVideo(tempPath, name, keep) {
    if (!tempPath || !existsSync(tempPath)) return null
    if (!keep) { rmSync(tempPath, { force: true }); return null }
    const target = this.path('videos', `${name}.webm`)
    copyFileSync(tempPath, target)
    rmSync(tempPath, { force: true })
    return this.rel('videos', `${name}.webm`)
  }
}
