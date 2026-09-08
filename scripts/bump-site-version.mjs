import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const versionFile = resolve(process.cwd(), 'site-version.json')
const argument = process.argv[2]?.trim() || null
const versionPattern = /^\d+\.\d+\.\d+$/

function parseVersion(value, label) {
  if (!versionPattern.test(value)) {
    throw new Error(`${label} must use semantic versioning (for example 2.0.0).`)
  }

  return value.split('.').map(Number)
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index]
  }

  return 0
}

const manifest = JSON.parse(await readFile(versionFile, 'utf8'))
const current = parseVersion(manifest.version, 'Current site version')
let next = current

if (argument === '--next') {
  next = [current[0], current[1], current[2] + 1]
} else if (argument) {
  const deployed = parseVersion(argument, 'Deployed site version')
  next = compareVersions(current, deployed) > 0
    ? current
    : [deployed[0], deployed[1], deployed[2] + 1]
}

const nextVersion = next.join('.')

if (nextVersion !== manifest.version) {
  await writeFile(
    versionFile,
    `${JSON.stringify({ ...manifest, version: nextVersion }, null, 2)}\n`,
    'utf8',
  )
}

process.stdout.write(nextVersion)
