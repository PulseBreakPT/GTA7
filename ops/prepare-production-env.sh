#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

test "$(id -u)" -eq 0 || { echo 'Run as root.' >&2; exit 1; }
ENV_FILE="${GTALORE_ENV_FILE:-/opt/leonida/.env}"
test -f "$ENV_FILE" || { echo 'Production environment file not found.' >&2; exit 1; }

DATA_KEY="$(openssl rand -base64 32 | tr -d '\n')"
BACKUP_KEY="$(openssl rand -base64 32 | tr -d '\n')"

ENV_FILE="$ENV_FILE" DATA_KEY="$DATA_KEY" BACKUP_KEY="$BACKUP_KEY" node - <<'NODE'
const fs = require('fs')
const path = process.env.ENV_FILE
const input = fs.readFileSync(path, 'utf8')
const lines = input.split(/\r?\n/).filter(Boolean)
const values = new Map(lines.filter((line) => !line.trimStart().startsWith('#') && line.includes('=')).map((line) => {
  const at = line.indexOf('='); return [line.slice(0, at), line.slice(at + 1)]
}))
values.set('APP_ENV', 'production')
values.set('AUTH_BASE_URL', 'https://lusorae.pt')
values.set('AUTH_TRUSTED_ORIGINS', 'https://lusorae.pt,https://www.lusorae.pt')
if (!values.get('DATA_ENCRYPTION_KEY')) values.set('DATA_ENCRYPTION_KEY', process.env.DATA_KEY)
if (!values.get('BACKUP_ENCRYPTION_KEY')) values.set('BACKUP_ENCRYPTION_KEY', process.env.BACKUP_KEY)
const output = [...values].map(([key, value]) => `${key}=${value}`).join('\n') + '\n'
fs.writeFileSync(path, output, { mode: 0o640 })
NODE

chown root:gtalore "$ENV_FILE"
chmod 0640 "$ENV_FILE"
unset DATA_KEY BACKUP_KEY
echo 'Production environment separated and cryptographic keys configured.'

