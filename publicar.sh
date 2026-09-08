#!/usr/bin/env bash
# Builds GTA LORE and deploys an immutable production bundle to /opt/leonida.
#
# Compila a partir da pasta onde este script está, e instala num destino
# fixo: assim o serviço nunca depende de um checkout ou de um worktree,
# e publicar do ramo errado deixa de poder reverter o site em silêncio.
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINO=/opt/leonida

cd "$RAIZ"

./scripts/security-check.sh

# Never publish a bundle built with stale node_modules. In particular, this
# prevents a patched package.json/lockfile from accidentally shipping the
# previously installed vulnerable framework version.
yarn check --integrity

NODE_OPTIONS=--max-old-space-size=3072 yarn build

# O modo standalone não copia os estáticos nem o public: é preciso fazê-lo
# à mão, senão o site sobe sem CSS nem imagens.
cp -r .next/static .next/standalone/.next/static
[ -d public ] && cp -r public .next/standalone/public

id gtalore >/dev/null 2>&1 || {
    echo "ERRO: instala primeiro a infraestrutura com sudo ./ops/install-security.sh" >&2
    exit 1
}

sudo install -d -o root -g gtalore -m 0750 "$DESTINO"

# Development .env files are never promoted to production. A deliberately
# separate .env.production may replace the root-owned destination file.
if [ -f .env.production ]; then
    sudo rsync -a --delete --exclude=.env .next/standalone/ "$DESTINO/"
    sudo install -o root -g gtalore -m 0640 .env.production "$DESTINO/.env"
    echo "publicado com configuração de produção separada"
elif sudo test -f "$DESTINO/.env"; then
    sudo rsync -a --delete --exclude=.env .next/standalone/ "$DESTINO/"
    echo "preservada a configuração protegida de $DESTINO"
else
    echo "ERRO: não há .env.production nem $DESTINO/.env" >&2
    exit 1
fi

# The application can read its bundle and secrets but cannot alter either.
sudo install -d -o root -g gtalore -m 0750 "$DESTINO/ops"
sudo install -o root -g gtalore -m 0550 scripts/migrate-sensitive-data.mjs "$DESTINO/ops/migrate-sensitive-data.mjs"
sudo chown -R root:gtalore "$DESTINO"
sudo find "$DESTINO" -type d -exec chmod 0750 {} +
sudo find "$DESTINO" -type f ! -name .env -exec chmod 0640 {} +
sudo chmod 0640 "$DESTINO/.env"

# Idempotent migration: plaintext legacy fields are encrypted before the new
# process starts. It prints counts only and never prints data or credentials.
sudo -u gtalore /usr/bin/node --env-file="$DESTINO/.env" "$DESTINO/ops/migrate-sensitive-data.mjs"

sudo systemctl restart leonida.service
sleep 3
systemctl is-active --quiet leonida.service && echo "publicado a partir de $RAIZ" || {
    echo "ERRO: o serviço não subiu" >&2
    journalctl -u leonida.service -n 15 --no-pager >&2
    exit 1
}
