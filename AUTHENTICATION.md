# LUSORAE authentication

The account system is implemented in-house on the MongoDB already used by the
site. It does not depend on a hosted identity provider.

## Production configuration

Required:

```env
MONGO_URL=mongodb://...
DB_NAME=leonida_archive
AUTH_BASE_URL=https://lusorae.pt
AUTH_TRUSTED_ORIGINS=https://lusorae.pt
```

Optional email delivery through Resend:

```env
RESEND_API_KEY=re_...
AUTH_EMAIL_FROM="LUSORAE <account@lusorae.pt>"
```

Without the two email variables, registration, login, profiles, password
changes, sessions and account deletion work normally. Email verification and
forgot-password delivery stay visibly unavailable; reset tokens are never
exposed to the browser or logs.

## Security model

- Passwords: Unicode-friendly 15–128 character policy and Node `scrypt`
  (`N=65536`, `r=8`, `p=1`) with a random 128-bit salt.
- Sessions: random 256-bit opaque tokens. Only SHA-256 token hashes are stored.
- Cookies: `__Host-` prefix in production, `HttpOnly`, `Secure`, `SameSite=Strict`,
  path `/`, explicit expiry and high priority.
- CSRF: server-issued double-submit token, JSON-only mutations, origin and
  `Sec-Fetch-Site` verification.
- Abuse resistance: per-IP and per-identity rate buckets, constant-cost unknown
  user checks, generic login errors and progressive account lockouts.
- Recovery: hashed, single-use, one-hour reset tokens. Password reset revokes
  every session.
- Verification: hashed, single-use, 24-hour email tokens.
- Sensitive changes: current-password reauthentication; password changes close
  all other sessions.
- Audit: privacy-reduced security events, hashed IP address, 180-day TTL.
- Authorization: users carry `reader`, `editor` or `admin`; server code can use
  `requireRole()` from `lib/server/auth.js`. Client role checks are never trusted.

MongoDB indexes and TTL cleanup indexes are created idempotently on first use.

## Routes

Public UI:

- `/login`
- `/reset-password?token=...`
- `/verify-email?token=...`

Authenticated UI:

- `/account` — identity, watchlist, private reading history, contribution
  suggestions, custom collections, private article notes, achievements,
  notifications, preferences, data export, password, sessions and security log

Public wiki identity:

- `/users/:username` — opt-out public profile and accepted contributions

API:

- `GET /api/auth/session`
- `POST /api/auth/register`, `/login`, `/logout`, `/logout-all`
- `POST /api/auth/forgot-password`, `/reset-password`
- `POST /api/auth/verify-email`, `/resend-verification`
- `PATCH /api/auth/profile`
- `POST /api/auth/change-password`, `/delete-account`
- `GET /api/auth/sessions`, `/audit`
- `GET /api/auth/wiki-state`, `/wiki-dashboard`
- `POST /api/auth/watch`, `/page-view`, `/suggestion`, `/notifications-read`
- `POST /api/auth/watch-pin`, `/history-clear`, `/note`
- `POST /api/auth/collection-create`, `/collection-delete`, `/collection-item`
- `POST /api/auth/suggestion-review` — `editor`, `moderator` or `admin` only
- `PATCH /api/auth/preferences`
- `GET /api/auth/export` — downloadable personal-data archive
- `DELETE /api/auth/sessions/:id`

All authentication API responses are non-cacheable and same-origin only.
Watchlists, history, suggestions, collections and notes are stored in separate per-user collections;
disabling history deletes that user's stored reading trail immediately. Account
deletion also removes every personal wiki record and collection item.
