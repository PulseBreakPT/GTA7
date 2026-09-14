# GTA LORE security operations

## Environments and secrets

- Development uses `.env.local` based on `.env.example`.
- Production uses `/opt/leonida/.env`, owned by `root:gtalore` with mode `0640`.
- `publicar.sh` never promotes `.env` or `.env.local` into production.
- Only browser-safe values may use the `NEXT_PUBLIC_` prefix.
- Rotate `RESEND_API_KEY` at the provider. Do not rotate `DATA_ENCRYPTION_KEY` without first re-encrypting stored fields.

## First secure installation

```bash
sudo ./ops/install-security.sh
sudo ./ops/prepare-production-env.sh
sudo ./ops/provision-mongodb-auth.sh
./publicar.sh
```

The application bundle is immutable and readable by the dedicated `gtalore`
service account. MongoDB listens on loopback and the application account has
`readWrite` only on the GTA LORE database.

## Backups

`gtalore-backup.timer` runs daily. Archives are AES-256-GCM encrypted, integrity
checked, stored in `/var/backups/gtalore`, and retained for 14 days. Copy this
root-only directory to a separately controlled host or object store; a backup
on the same machine is not a disaster-recovery copy.

Useful checks:

```bash
systemctl list-timers gtalore-backup.timer
sudo systemctl start gtalore-backup.service
sudo journalctl -u gtalore-backup.service --since today
```

## Upload policy

User uploads are disabled. Nginx caps authentication JSON at 32 KiB and all
other API requests at 1 KiB. The application accepts JSON only for mutations;
multipart forms and arbitrary files receive a rejection. If uploads are ever
added, they require a separate isolated store, MIME signature validation,
malware scanning, random server filenames and image re-encoding.

## Regular checks

GitHub Actions runs the production dependency audit and a clean build on every
pull request, push to `main`, and weekly schedule. Dependabot proposes weekly
updates. The release script also refuses to build when installed dependencies
do not match the lockfile. Locally run `yarn security:check` before release.

Report suspected vulnerabilities privately to the contact listed in the site’s
security policy. Never put credentials, reset links, session tokens or user
content in an issue or log.
