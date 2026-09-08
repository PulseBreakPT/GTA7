#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

ENV_FILE="${GTALORE_ENV_FILE:-/opt/leonida/.env}"
BACKUP_DIR="${GTALORE_BACKUP_DIR:-/var/backups/gtalore}"
RETENTION_DAYS="${GTALORE_BACKUP_RETENTION_DAYS:-14}"

test -r "$ENV_FILE" || { echo 'Production environment file is unavailable.' >&2; exit 1; }
set -a
# The file is root-owned and not writable by the application service.
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

test -n "${MONGO_URL:-}" && test -n "${DB_NAME:-}" && test -n "${BACKUP_ENCRYPTION_KEY:-}" || {
  echo 'Backup configuration is incomplete.' >&2
  exit 1
}

install -d -m 0700 "$BACKUP_DIR"
WORK_DIR="$(mktemp -d "$BACKUP_DIR/.working.XXXXXX")"
trap 'rm -rf -- "$WORK_DIR"' EXIT

CONFIG="$WORK_DIR/mongodump.yml"
ARCHIVE="$WORK_DIR/database.archive.gz"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUTPUT="$BACKUP_DIR/gtalore-$STAMP.archive.gz.enc"

MONGO_URI="$MONGO_URL" CONFIG_PATH="$CONFIG" node - <<'NODE'
const fs = require('fs')
const uri = JSON.stringify(process.env.MONGO_URI)
fs.writeFileSync(process.env.CONFIG_PATH, `uri: ${uri}\n`, { mode: 0o600 })
NODE

mongodump --config="$CONFIG" --db="$DB_NAME" --archive="$ARCHIVE" --gzip --quiet
node /opt/gtalore-ops/backup-crypto.mjs encrypt "$ARCHIVE" "$OUTPUT"
sha256sum "$OUTPUT" > "$OUTPUT.sha256"
chmod 0600 "$OUTPUT" "$OUTPUT.sha256"

# Verify both the checksum and authenticated file readability before retention.
sha256sum -c "$OUTPUT.sha256" >/dev/null
node /opt/gtalore-ops/backup-crypto.mjs verify "$OUTPUT"

find "$BACKUP_DIR" -maxdepth 1 -type f \( -name 'gtalore-*.archive.gz.enc' -o -name 'gtalore-*.archive.gz.enc.sha256' \) -mtime "+$RETENTION_DAYS" -delete
echo "Encrypted database backup completed at $STAMP."
