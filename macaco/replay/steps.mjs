// Replay: re-runs the exact recorded steps of an incident — same viewport,
// same start page, same actions found again by descriptor — and says
// whether the same bug (same fingerprint) came back.
import { readFileSync } from 'node:fs'

export function loadIncident(file) {
  const data = JSON.parse(readFileSync(file, 'utf8'))
  if (!data.replaySteps || !data.viewportSpec) throw new Error(`${file} is not a Macaco incident file`)
  return data
}
