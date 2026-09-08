#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

git diff --check

secret_matches="$(rg --files -0 --hidden \
  -g '!.git/**' -g '!node_modules/**' -g '!.next/**' -g '!public/**' -g '!*.example' \
  -g '*.{js,jsx,mjs,cjs,ts,tsx,json,yml,yaml,md,sh,conf}' \
  | xargs -0 -r rg -l '(mongodb(\+srv)?://[^[:space:]]+:[^[:space:]]+@|RESEND_API_KEY=[A-Za-z0-9_-]{8,}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|sk-[A-Za-z0-9_-]{16,})' || true)"
if test -n "$secret_matches"; then
  printf '%s\n' "$secret_matches" >&2
  echo 'Potential committed secret detected.' >&2
  exit 1
fi

if rg -n "request\.(json|formData)\(\)" app/api -g 'route.js' | rg -v 'bodyOf' >/dev/null; then
  echo 'Unbounded request-body parser detected in an API route.' >&2
  exit 1
fi

echo 'Local security checks passed.'
