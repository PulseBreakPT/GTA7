#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

test "$(id -u)" -eq 0 || { echo 'Run as root.' >&2; exit 1; }

# `systemctl restart` devolve o controlo quando o processo arranca, não
# quando ele aceita ligações. Testar logo a seguir dava ECONNREFUSED e a
# configuração era revertida por uma falha que era só pressa: espera-se
# pelo socket, até meio minuto, antes de dar o arranque por falhado.
# Um servidor que recusa credenciais está vivo: o que se espera aqui é que
# ele atenda, não que nos deixe entrar. Só a recusa de ligação conta como
# «ainda não subiu».
esperar_mongod() {
  local tentativa saida
  for tentativa in $(seq 1 30); do
    saida="$(mongosh --quiet --eval 'db.runCommand({ ping: 1 })' 2>&1 || true)"
    case "$saida" in
      *ECONNREFUSED*|*'connect ETIMEDOUT'*|*'Connection refused'*) ;;
      *) return 0 ;;
    esac
    sleep 1
  done
  return 1
}
ENV_FILE="${GTALORE_ENV_FILE:-/opt/leonida/.env}"
MONGO_CONFIG="${GTALORE_MONGO_CONFIG:-/etc/mongod.conf}"
test -r "$ENV_FILE" && test -f "$MONGO_CONFIG" || { echo 'MongoDB configuration is unavailable.' >&2; exit 1; }

if grep -Eq '^[[:space:]]*authorization:[[:space:]]*enabled[[:space:]]*$' "$MONGO_CONFIG"; then
  echo 'MongoDB authorization is already enabled.'
  exit 0
fi

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a
test -n "${MONGO_URL:-}" && test -n "${DB_NAME:-}" || { echo 'Database environment is incomplete.' >&2; exit 1; }

# Take an encrypted recovery point before changing authentication.
/opt/gtalore-ops/backup.sh

export GTALORE_APP_PASSWORD="$(openssl rand -base64 36 | tr -d '\n')"
export GTALORE_ADMIN_PASSWORD="$(openssl rand -base64 42 | tr -d '\n')"
export GTALORE_DB_NAME="$DB_NAME"

# Criar quando não existe, actualizar a palavra-passe quando existe. Como
# estava, uma segunda passagem deixava o utilizador com a palavra-passe da
# primeira e escrevia a nova no ambiente: a autenticação passava a falhar
# com credenciais que nunca tinham chegado a ser as do servidor. É o que
# acontece sempre que a primeira passagem não chega ao fim.
mongosh --quiet "$MONGO_URL" <<'JS' >/dev/null
const target = db.getSiblingDB(process.env.GTALORE_DB_NAME)
const appRoles = [{ role: 'readWrite', db: process.env.GTALORE_DB_NAME }]
if (target.getUser('gtalore_app')) {
  target.updateUser('gtalore_app', { pwd: process.env.GTALORE_APP_PASSWORD, roles: appRoles })
} else {
  target.createUser({ user: 'gtalore_app', pwd: process.env.GTALORE_APP_PASSWORD, roles: appRoles })
}
const admin = db.getSiblingDB('admin')
const adminRoles = [{ role: 'userAdminAnyDatabase', db: 'admin' }, { role: 'backup', db: 'admin' }, { role: 'restore', db: 'admin' }]
if (admin.getUser('gtalore_admin')) {
  admin.updateUser('gtalore_admin', { pwd: process.env.GTALORE_ADMIN_PASSWORD, roles: adminRoles })
} else {
  admin.createUser({ user: 'gtalore_admin', pwd: process.env.GTALORE_ADMIN_PASSWORD, roles: adminRoles })
}
JS

ENV_FILE="$ENV_FILE" node - <<'NODE'
const fs = require('fs')
const path = process.env.ENV_FILE
const input = fs.readFileSync(path, 'utf8')
const lines = input.split(/\r?\n/).filter(Boolean)
const values = new Map(lines.filter((line) => !line.trimStart().startsWith('#') && line.includes('=')).map((line) => {
  const at = line.indexOf('='); return [line.slice(0, at), line.slice(at + 1)]
}))
const url = new URL(values.get('MONGO_URL'))
url.username = 'gtalore_app'
url.password = process.env.GTALORE_APP_PASSWORD
url.pathname = `/${process.env.GTALORE_DB_NAME}`
url.searchParams.set('authSource', process.env.GTALORE_DB_NAME)
values.set('MONGO_URL', url.toString())
fs.writeFileSync(path, [...values].map(([key, value]) => `${key}=${value}`).join('\n') + '\n', { mode: 0o640 })
NODE

install -d -o root -g root -m 0700 /root/.config/gtalore
printf 'MONGO_ADMIN_USER=gtalore_admin\nMONGO_ADMIN_PASSWORD=%s\n' "$GTALORE_ADMIN_PASSWORD" > /root/.config/gtalore/mongodb-admin.env
chmod 0600 /root/.config/gtalore/mongodb-admin.env
chown root:gtalore "$ENV_FILE"
chmod 0640 "$ENV_FILE"

cp --preserve=mode,ownership,timestamps "$MONGO_CONFIG" "$MONGO_CONFIG.before-gtalore-auth"
if grep -Eq '^#?security:[[:space:]]*$' "$MONGO_CONFIG"; then
  sed -i -E '0,/^#?security:[[:space:]]*$/{s//security:\n  authorization: enabled/}' "$MONGO_CONFIG"
else
  printf '\nsecurity:\n  authorization: enabled\n' >> "$MONGO_CONFIG"
fi
systemctl restart mongod.service
esperar_mongod || {
  cp "$MONGO_CONFIG.before-gtalore-auth" "$MONGO_CONFIG"
  systemctl restart mongod.service
  echo 'MongoDB did not accept connections after the restart; configuration was rolled back.' >&2
  exit 1
}

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a
if ! mongosh --quiet "$MONGO_URL" --eval 'db.runCommand({ ping: 1 })' >/dev/null; then
  cp "$MONGO_CONFIG.before-gtalore-auth" "$MONGO_CONFIG"
  systemctl restart mongod.service
  esperar_mongod || true
  echo 'MongoDB authentication test failed; configuration was rolled back.' >&2
  exit 1
fi

unset GTALORE_APP_PASSWORD GTALORE_ADMIN_PASSWORD
echo 'MongoDB authentication enabled with a least-privilege application user.'
