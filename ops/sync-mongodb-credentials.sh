#!/usr/bin/env bash
# Repoe a coerencia entre o ambiente de producao e o MongoDB.
#
# A sequencia de endurecimento falhou a meio duas vezes: criou o utilizador
# gtalore_app com uma palavra-passe e, na tentativa seguinte, escreveu outra
# no .env sem a actualizar no servidor. Ficaram credenciais que nunca foram
# as do servidor — e com elas a aplicacao nao se autentica, nem o backup
# consegue correr.
#
# Isto alinha o servidor com o ficheiro que ja esta em producao. Nao gera
# palavras-passe novas nem imprime a que existe.
set -Eeuo pipefail
umask 077

test "$(id -u)" -eq 0 || { echo 'Corre com sudo.' >&2; exit 1; }

set -a
. /opt/leonida/.env
set +a

export ALVO_DB="$DB_NAME"
# A palavra-passe vem percent-codificada dentro do endereco — o gerador usa
# base64, que traz +, / e =. O cliente descodifica-a antes de autenticar,
# por isso e a forma descodificada que tem de ficar no servidor. Alinhar
# pela forma codificada foi o que fez a primeira tentativa desta correcao
# continuar a falhar.
export ALVO_PWD="$(python3 -c "
import os, urllib.parse
print(urllib.parse.unquote(urllib.parse.urlsplit(os.environ['MONGO_URL']).password or ''))
")"
export ALVO_USER="$(python3 -c "
import os, urllib.parse
print(urllib.parse.unquote(urllib.parse.urlsplit(os.environ['MONGO_URL']).username or ''))
")"

test -n "$ALVO_USER" && test -n "$ALVO_PWD" || {
  echo 'O MONGO_URL nao traz utilizador e palavra-passe.' >&2
  exit 1
}

# Sem credenciais: a autenticacao esta desligada no servidor, e e por isso
# que ainda se consegue corrigir isto.
mongosh --quiet --eval '
const alvo = db.getSiblingDB(process.env.ALVO_DB)
const papeis = [{ role: "readWrite", db: process.env.ALVO_DB }]
if (alvo.getUser(process.env.ALVO_USER)) {
  alvo.updateUser(process.env.ALVO_USER, { pwd: process.env.ALVO_PWD, roles: papeis })
  print("utilizador " + process.env.ALVO_USER + ": palavra-passe alinhada com o ambiente")
} else {
  alvo.createUser({ user: process.env.ALVO_USER, pwd: process.env.ALVO_PWD, roles: papeis })
  print("utilizador " + process.env.ALVO_USER + ": criado")
}
'

echo -n 'verificacao: '
if mongosh --quiet "$MONGO_URL" --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
  echo 'a aplicacao ja se autentica'
else
  echo 'AINDA FALHA' >&2
  exit 1
fi
