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

NODE_OPTIONS=--max-old-space-size=3072 yarn build

# O modo standalone não copia os estáticos nem o public: é preciso fazê-lo
# à mão, senão o site sobe sem CSS nem imagens.
cp -r .next/static .next/standalone/.next/static
[ -d public ] && cp -r public .next/standalone/public

sudo mkdir -p "$DESTINO"

# O .env tem a ligação à base de dados e só existe no destino. Exigir uma
# cópia local obrigava a andar com credenciais em cada checkout, e era o
# que impedia este script de correr a partir de um worktree. Agora há dois
# caminhos: com .env local, publica-se o local; sem ele, preserva-se o que
# já está em produção. Nunca se apaga o do destino sem ter outro para pôr.
if [ -f .env ]; then
    sudo rsync -a --delete .next/standalone/ "$DESTINO/"
    # `install -m 600` cria já com as permissões certas. Com `cp` seguido
    # de `chmod` o ficheiro ficaria legível por qualquer utilizador local
    # durante a janela entre os dois comandos.
    sudo install -o ubuntu -g ubuntu -m 600 .env "$DESTINO/.env"
    echo "publicado com o .env de $RAIZ"
elif sudo test -f "$DESTINO/.env"; then
    sudo rsync -a --delete --exclude=.env .next/standalone/ "$DESTINO/"
    echo "sem .env local: preservado o de $DESTINO"
else
    echo "ERRO: não há .env nem em $RAIZ nem em $DESTINO (MONGO_URL, DB_NAME)" >&2
    exit 1
fi

# O serviço corre como ubuntu e declara ReadWritePaths=/opt/leonida: com
# os ficheiros a pertencerem a root, o que precisasse de escrever falhava.
sudo chown -R ubuntu:ubuntu "$DESTINO"

sudo systemctl restart leonida.service
sleep 3
systemctl is-active --quiet leonida.service && echo "publicado a partir de $RAIZ" || {
    echo "ERRO: o serviço não subiu" >&2
    journalctl -u leonida.service -n 15 --no-pager >&2
    exit 1
}
