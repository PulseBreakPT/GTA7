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

# O guiao com a palavra-passe vive num ficheiro temporario so do dono e
# desaparece mesmo que isto falhe a meio.
GUIAO="$(mktemp)"
chmod 0600 "$GUIAO"
trap 'rm -f -- "$GUIAO"' EXIT

# A palavra-passe nunca passa pelo ambiente nem pela linha de comando: uma
# variavel exportada fica legivel em /proc para todo o processo que herde
# este, e os argumentos aparecem no `ps` de qualquer utilizador da maquina.
# Vai por stdin, que so o processo destinatario le.
#
# Quanto ao valor: vem percent-codificado dentro do endereco, porque o
# gerador usa base64 e traz +, / e =. O cliente descodifica-o antes de
# autenticar, por isso e a forma descodificada que tem de ficar no servidor.
# Alinhar pela forma codificada foi o que fez a primeira tentativa desta
# correccao continuar a falhar.
MONGO_URL="$MONGO_URL" DB_NAME="$DB_NAME" python3 <<'PY' > "$GUIAO"
import json, os, urllib.parse
partes = urllib.parse.urlsplit(os.environ['MONGO_URL'])
utilizador = urllib.parse.unquote(partes.username or '')
palavra = urllib.parse.unquote(partes.password or '')
if not utilizador or not palavra:
    raise SystemExit('O MONGO_URL nao traz utilizador e palavra-passe.')
print(f'''
const alvo = db.getSiblingDB({json.dumps(os.environ['DB_NAME'])})
const utilizador = {json.dumps(utilizador)}
const papeis = [{{ role: "readWrite", db: {json.dumps(os.environ['DB_NAME'])} }}]
if (alvo.getUser(utilizador)) {{
  alvo.updateUser(utilizador, {{ pwd: {json.dumps(palavra)}, roles: papeis }})
  print("utilizador " + utilizador + ": palavra-passe alinhada com o ambiente")
}} else {{
  alvo.createUser({{ user: utilizador, pwd: {json.dumps(palavra)}, roles: papeis }})
  print("utilizador " + utilizador + ": criado")
}}
''')
PY

# Sem credenciais: a autenticacao esta desligada no servidor, e e por isso
# que ainda se consegue corrigir isto.
mongosh --quiet < "$GUIAO"

echo -n 'verificacao: '
if mongosh --quiet "$MONGO_URL" --eval 'db.runCommand({ ping: 1 })' >/dev/null 2>&1; then
  echo 'a aplicacao ja se autentica'
else
  echo 'AINDA FALHA' >&2
  exit 1
fi
