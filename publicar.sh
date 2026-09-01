#!/usr/bin/env bash
# Compila o LEONIDA ARCHIVE e publica-o em /opt/leonida, de onde o
# serviço leonida.service corre.
#
# Compila a partir da pasta onde este script está, e instala num destino
# fixo: assim o serviço nunca depende de um checkout ou de um worktree,
# e publicar do ramo errado deixa de poder reverter o site em silêncio.
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINO=/opt/leonida

cd "$RAIZ"

[ -f .env ] || { echo "ERRO: falta $RAIZ/.env (MONGO_URL, DB_NAME)" >&2; exit 1; }

NODE_OPTIONS=--max-old-space-size=3072 yarn build

# O modo standalone não copia os estáticos nem o public: é preciso fazê-lo
# à mão, senão o site sobe sem CSS nem imagens.
cp -r .next/static .next/standalone/.next/static
[ -d public ] && cp -r public .next/standalone/public

sudo mkdir -p "$DESTINO"
sudo rsync -a --delete .next/standalone/ "$DESTINO/"
sudo cp .env "$DESTINO/.env"
sudo chown -R ubuntu:ubuntu "$DESTINO"
sudo chmod 600 "$DESTINO/.env"

sudo systemctl restart leonida.service
sleep 3
systemctl is-active --quiet leonida.service && echo "publicado a partir de $RAIZ" || {
    echo "ERRO: o serviço não subiu" >&2
    journalctl -u leonida.service -n 15 --no-pager >&2
    exit 1
}
