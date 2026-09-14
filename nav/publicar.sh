#!/usr/bin/env bash
# Builds GTA LORE and deploys an immutable production bundle to /opt/leonida.
#
# Compila a partir da pasta onde este script está, e instala num destino
# fixo: assim o serviço nunca depende de um checkout ou de um worktree,
# e publicar do ramo errado deixa de poder reverter o site em silêncio.
#
# Uso:
#   ./publicar.sh              compila, verifica, publica e testa em produção
#   ./publicar.sh --verificar  compila e verifica, sem publicar
#
# Cada passo mostra quanto tempo levou. Se o site não responder, ou os
# testes depois da publicação falharem, repõe-se sozinho a versão anterior.
set -euo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINO=/opt/leonida
ANTERIOR=/opt/leonida.anterior
PORTA=3001
MODO=publicar
[ "${1:-}" = "--verificar" ] && MODO=verificar

cd "$RAIZ"
export NEXT_TELEMETRY_DISABLED=1

# Uma publicação de cada vez: duas em paralelo misturavam bundles e versões.
exec 9>"$RAIZ/.publicar.lock"
flock -n 9 || { echo "ERRO: já está a correr outra publicação" >&2; exit 1; }

INICIO=$(date +%s)
# Corre um passo e mostra o tempo. Devolve o código do passo: usado com «||»
# o set -e não se aplica, e um passo falhado não pode passar por bem feito.
passo() {
    local nome="$1"; shift
    local t0 rc=0
    t0=$(date +%s)
    "$@" || rc=$?
    if [ "$rc" -eq 0 ]; then
        printf '  ✓ %-34s %3ss\n' "$nome" "$(( $(date +%s) - t0 ))"
    else
        printf '  ✗ %-34s %3ss\n' "$nome" "$(( $(date +%s) - t0 ))" >&2
    fi
    return "$rc"
}

./scripts/security-check.sh >/dev/null && echo "  ✓ verificação de segurança"

# Never publish a bundle built with stale node_modules. In particular, this
# prevents a patched package.json/lockfile from accidentally shipping the
# previously installed vulnerable framework version.
yarn check --integrity >/dev/null 2>&1 || { yarn check --integrity; exit 1; }
echo "  ✓ dependências íntegras"

# Every successful publication advances the repository version. Failed builds
# restore the previous number, so versions describe deployed releases only.
VERSION_FILE="$RAIZ/site-version.json"
VERSION_BACKUP="$(mktemp)"
cp -- "$VERSION_FILE" "$VERSION_BACKUP"
RELEASE_COMMITTED=0

cleanup_release() {
    exit_code=$?
    if [ "$RELEASE_COMMITTED" -ne 1 ]; then
        cp -- "$VERSION_BACKUP" "$VERSION_FILE"
    fi
    rm -f -- "$VERSION_BACKUP"
    trap - EXIT
    exit "$exit_code"
}
trap cleanup_release EXIT

if [ "$MODO" = publicar ]; then
    RELEASE_VERSION="$(node "$RAIZ/scripts/bump-site-version.mjs" --next)"
    echo "a preparar a publicação v$RELEASE_VERSION"
else
    RELEASE_VERSION="$(node -p "require('./site-version.json').version")"
    echo "a verificar o build (sem publicar)"
fi

compilar() {
    NODE_OPTIONS=--max-old-space-size=3072 yarn build >"$RAIZ/.publicar-build.log" 2>&1 || {
        tail -40 "$RAIZ/.publicar-build.log" >&2
        echo "ERRO: o build falhou (registo completo em .publicar-build.log)" >&2
        return 1
    }
}

# O CSS tem de trazer os utilitários do Tailwind. Uma cache de build criada
# a partir de outra pasta já publicou o site sem eles: sem `.flex`, sem
# grelhas, com o breadcrumb empilhado. Verifica-se sempre antes de publicar.
css_valido() {
    grep -qs '\.flex{display:flex}' .next/static/css/*.css
}

passo "build" compilar
if ! css_valido; then
    echo "  ! CSS sem utilitários do Tailwind — a limpar a cache e a compilar de novo"
    rm -rf .next/cache
    passo "build (sem cache)" compilar
    css_valido || { echo "ERRO: o CSS continua sem utilitários do Tailwind" >&2; exit 1; }
fi
echo "  ✓ CSS com utilitários do Tailwind"

# O modo standalone não copia os estáticos nem o public: é preciso fazê-lo
# à mão, senão o site sobe sem CSS nem imagens.
copiar_estaticos() {
    rsync -a --delete .next/static/ .next/standalone/.next/static/
    [ -d public ] && rsync -a --delete public/ .next/standalone/public/
}
passo "estáticos no bundle" copiar_estaticos

if [ "$MODO" = verificar ]; then
    echo "verificado em $(( $(date +%s) - INICIO ))s — nada foi publicado"
    exit 0
fi

id gtalore >/dev/null 2>&1 || {
    echo "ERRO: instala primeiro a infraestrutura com sudo ./ops/install-security.sh" >&2
    exit 1
}

sudo install -d -o root -g gtalore -m 0750 "$DESTINO"
if [ -f .env.production ]; then
    ENV_ORIGEM=producao
elif sudo test -f "$DESTINO/.env"; then
    ENV_ORIGEM=preservado
else
    echo "ERRO: não há .env.production nem $DESTINO/.env" >&2
    exit 1
fi

# Cópia instantânea da versão em serviço, em hardlinks: não duplica espaço e
# é o que permite repor o site em segundos se a nova versão não arrancar.
instantaneo() {
    sudo rm -rf "$ANTERIOR"
    sudo cp -al "$DESTINO" "$ANTERIOR"
}
passo "cópia da versão anterior" instantaneo

# O rsync já aplica dono e permissões ao copiar; antes, um chown -R e dois
# find percorriam depois todos os ficheiros do destino, mudados ou não.
# Development .env files are never promoted to production.
instalar() {
    sudo rsync -a --delete --exclude=/.env --exclude=/ops \
        --chown=root:gtalore --chmod=D0750,F0640 \
        .next/standalone/ "$DESTINO/"
    if [ "$ENV_ORIGEM" = producao ]; then
        sudo install -o root -g gtalore -m 0640 .env.production "$DESTINO/.env"
    fi
    sudo chmod 0640 "$DESTINO/.env"
    sudo install -o root -g gtalore -m 0640 "$VERSION_FILE" "$DESTINO/site-version.json"
    # The application can read its bundle and secrets but cannot alter either.
    sudo install -d -o root -g gtalore -m 0750 "$DESTINO/ops"
    sudo install -o root -g gtalore -m 0550 scripts/migrate-sensitive-data.mjs "$DESTINO/ops/migrate-sensitive-data.mjs"
}
passo "instalação em $DESTINO" instalar
[ "$ENV_ORIGEM" = producao ] && echo "  · configuração de produção separada" || echo "  · configuração protegida de $DESTINO preservada"

# Idempotent migration: plaintext legacy fields are encrypted before the new
# process starts. It prints counts only and never prints data or credentials.
migrar() {
    sudo -u gtalore /usr/bin/node --env-file="$DESTINO/.env" "$DESTINO/ops/migrate-sensitive-data.mjs" >/dev/null
}
passo "migração de dados" migrar

# Em vez de esperar um tempo fixo, pergunta-se ao servidor até responder.
responde() {
    local i
    for i in $(seq 1 60); do
        curl -fsS -o /dev/null --max-time 2 "http://127.0.0.1:$PORTA/" 2>/dev/null && return 0
        sleep 0.5
    done
    return 1
}

# Testes na versão acabada de subir: páginas principais, a versão servida e
# o CSS realmente entregue ao browser.
testar() {
    local caminho html css
    for caminho in / /wiki /news /database/vehicles /map /directory; do
        curl -fsS -o /dev/null --max-time 10 "http://127.0.0.1:$PORTA$caminho" || { echo "    falhou: $caminho" >&2; return 1; }
    done
    html="$(curl -fsS --max-time 10 "http://127.0.0.1:$PORTA/")"
    grep -qF "Site version $RELEASE_VERSION\"" <<<"$html" || { echo "    a versão servida não é v$RELEASE_VERSION" >&2; return 1; }
    css="$(grep -o '/_next/static/css/[a-z0-9]*\.css' <<<"$html" | head -n 20)"
    for f in $css; do
        # Guarda-se a resposta antes de procurar: com pipefail, um grep -q que
        # acaba cedo dava SIGPIPE ao curl e o teste falhava com o CSS certo.
        local corpo
        corpo="$(curl -fsS --max-time 10 "http://127.0.0.1:$PORTA$f")" || continue
        grep -qF '.flex{display:flex}' <<<"$corpo" && return 0
    done
    echo "    o CSS servido não traz os utilitários do Tailwind" >&2
    return 1
}

reverter() {
    echo "ERRO: $1 — a repor a versão anterior" >&2
    journalctl -u leonida.service -n 15 --no-pager >&2 || true
    sudo rsync -a --delete "$ANTERIOR/" "$DESTINO/"
    sudo systemctl restart leonida.service
    responde && echo "versão anterior reposta" >&2 || echo "ATENÇÃO: a versão anterior também não respondeu" >&2
    exit 1
}

reiniciar() { sudo systemctl restart leonida.service; }
passo "reinício do serviço" reiniciar
passo "site a responder" responde || reverter "o serviço não respondeu"
passo "testes em produção" testar || reverter "os testes depois da publicação falharam"

RELEASE_COMMITTED=1
echo "publicado v$RELEASE_VERSION a partir de $RAIZ em $(( $(date +%s) - INICIO ))s"
