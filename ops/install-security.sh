#!/usr/bin/env bash
set -Eeuo pipefail

test "$(id -u)" -eq 0 || { echo 'Run as root.' >&2; exit 1; }
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! id gtalore >/dev/null 2>&1; then
  useradd --system --home-dir /var/lib/gtalore --create-home --shell /usr/sbin/nologin gtalore
fi

install -d -o root -g gtalore -m 0750 /opt/leonida
install -d -o gtalore -g gtalore -m 0700 /var/lib/gtalore
install -d -o root -g root -m 0700 /var/backups/gtalore /opt/gtalore-ops
install -o root -g root -m 0700 "$ROOT/ops/backup.sh" /opt/gtalore-ops/backup.sh
install -o root -g root -m 0600 "$ROOT/ops/backup-crypto.mjs" /opt/gtalore-ops/backup-crypto.mjs
install -o root -g root -m 0644 "$ROOT/ops/systemd/leonida.service" /etc/systemd/system/leonida.service
install -o root -g root -m 0644 "$ROOT/ops/systemd/gtalore-backup.service" /etc/systemd/system/gtalore-backup.service
install -o root -g root -m 0644 "$ROOT/ops/systemd/gtalore-backup.timer" /etc/systemd/system/gtalore-backup.timer
install -o root -g root -m 0644 "$ROOT/ops/nginx/gtalore-security.conf" /etc/nginx/conf.d/gtalore-security.conf
install -o root -g root -m 0644 "$ROOT/ops/nginx/leonida.conf" /etc/nginx/sites-available/leonida
ln -sfn /etc/nginx/sites-available/leonida /etc/nginx/sites-enabled/leonida

nginx -t
systemctl daemon-reload
systemctl enable --now gtalore-backup.timer
systemctl reload nginx
echo 'Infrastructure hardening installed.'
