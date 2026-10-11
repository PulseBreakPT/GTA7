# GTA LORE — The GTA VI Encyclopedia

[![Visit GTA LORE](https://img.shields.io/badge/Live%20website-lusorae.pt-c72d49?style=for-the-badge)](https://pulsebreakpt.github.io/GTA7/)
[![GitHub Pages](https://github.com/PulseBreakPT/GTA7/actions/workflows/pages.yml/badge.svg)](https://github.com/PulseBreakPT/GTA7/actions/workflows/pages.yml)
[![Security checks](https://github.com/PulseBreakPT/GTA7/actions/workflows/security.yml/badge.svg)](https://github.com/PulseBreakPT/GTA7/actions/workflows/security.yml)

**Live website:** https://pulsebreakpt.github.io/GTA7/  
**GitHub Pages entry (redirects to the full application):** https://pulsebreakpt.github.io/GTA7/  
**Repository:** https://github.com/PulseBreakPT/GTA7

GTA LORE is an independent, English-language reference archive covering **Grand Theft Auto VI**. It brings together characters, vehicles, weapons, places, world details, mechanics, factions, radio, news and guides. Records distinguish official material from observations, analysis and community reporting, with references and evidence labels so readers can trace claims to their sources.

> **Independent fan project.** Not affiliated with, sponsored by or endorsed by Rockstar Games, Take-Two Interactive or their subsidiaries. Third-party trademarks and media belong to their respective owners.

## Explore the archive

| Collection | Live link | What it contains |
| --- | --- | --- |
| Wiki | [Browse the wiki](https://pulsebreakpt.github.io/GTA7/wiki) | Linked records, categories, sources and evidence |
| Characters | [Character database](https://pulsebreakpt.github.io/GTA7/database/characters) | Protagonists, supporting cast and documented relationships |
| Vehicles | [Vehicle database](https://pulsebreakpt.github.io/GTA7/database/vehicles) | Known and observed vehicles |
| Weapons | [Weapon database](https://pulsebreakpt.github.io/GTA7/database/weapons) | Equipment and source status |
| World & mechanics | [World](https://pulsebreakpt.github.io/GTA7/database/world) · [Mechanics](https://pulsebreakpt.github.io/GTA7/database/mechanics) | Locations, culture and game systems |
| Map | [Leonida atlas](https://pulsebreakpt.github.io/GTA7/map) | Places and regions of the game world |
| News | [News and dispatches](https://pulsebreakpt.github.io/GTA7/news) | Dated reports, analysis and updates |
| Guides | [Guides](https://pulsebreakpt.github.io/GTA7/guides) | Editorial explainers and reference pages |
| Sources | [Source policy](https://pulsebreakpt.github.io/GTA7/sources) | Where the archive's evidence comes from |

### Evidence labels

The archive distinguishes **Confirmed** (directly named by Rockstar), **Verified** (visible in official material), **Category** (official category but individual identification uncertain), **Analysis** (archive interpretation), and **Rumour** (community or secondary reporting). These labels describe the underlying evidence; they are not guarantees about future gameplay.

## Technology

- **Frontend:** Next.js 15 (App Router), React 18, Tailwind CSS 3, Radix UI and Lucide.
- **Data and authentication:** server-side Next.js routes, MongoDB and project-specific session handling.
- **Content:** curated local JavaScript datasets in `lib/`, with media assets under `public/`.
- **Hosting:** production Next.js **standalone** runtime, behind the deployment infrastructure under `ops/`.
- **CI:** automated security/build checks and a separate GitHub Pages publishing workflow.

## Run locally

Requires **Node.js 22**, **Yarn 1.x** and an accessible MongoDB instance for features that use the database.

1. Clone the repository and enter its directory.
2. Run `yarn install --frozen-lockfile`.
3. Copy `.env.example` to `.env.local` and set local-only values, including `MONGO_URL`, `DB_NAME` and `DATA_ENCRYPTION_KEY`. Never commit secrets.
4. Start with `yarn dev` and visit http://localhost:3000.

For project checks use `yarn validar`, `yarn security:local` and `yarn build`. See [AUTHENTICATION.md](AUTHENTICATION.md), [DESIGN.md](DESIGN.md) and [SECURITY.md](SECURITY.md) for architecture and project rules.

## GitHub Pages is the primary website

The live GTA LORE website is **https://pulsebreakpt.github.io/GTA7/**. GitHub Actions exports the original Next.js visual experience, with static wiki records and local media, directly into GitHub Pages. It no longer redirects to the retired lusorae.pt domain.

GitHub Pages cannot host Next.js server APIs, MongoDB or account sessions. The Pages build excludes those server-only features. The original Next.js production server scripts remain in this repository for use with a compatible host, but are not needed to read the public archive.

## Publishing

### Optional server-hosted build

The primary production website is **https://pulsebreakpt.github.io/GTA7/**. It runs the complete Next.js application, including the server functionality required for accounts, APIs and MongoDB. The deployment script `publicar.sh` targets the production server at `/opt/leonida`; `./publicar.sh --verificar` builds and verifies without publishing. Follow `ops/` and the production environment example for infrastructure requirements.

### GitHub Pages (primary public website)

The [Pages workflow](.github/workflows/pages.yml) automatically publishes the small gateway in `docs/` on pushes to `main` and can also be run manually. Opening `https://pulsebreakpt.github.io/GTA7/` automatically redirects to `https://pulsebreakpt.github.io/GTA7/`, preserving the original complete Next.js design. GitHub Pages is static hosting and cannot run this project's server, authentication or MongoDB. Deep links under `/GTA7/` also redirect to their equivalent route on the full application.

**Deployment is configured:** [Publish GitHub Pages](https://github.com/PulseBreakPT/GTA7/actions/workflows/pages.yml) deploys the redirect gateway to https://pulsebreakpt.github.io/GTA7/. GitHub Pages uses **GitHub Actions** as its source in [repository settings](https://github.com/PulseBreakPT/GTA7/settings/pages). If Pages is ever disabled, re-enable GitHub Actions as the publishing source.

GitHub Pages only serves static files. The production site and its original design remain hosted at `lusorae.pt`; the GitHub Pages URL forwards readers there rather than displaying a disconnected alternative layout. GitHub's Pages publish status and URL are visible in the workflow run.

## Project structure

- `app/` — Next.js pages, layouts, metadata and API routes
- `components/` — UI components and archive navigation
- `lib/` — encyclopedic data, domain logic and integrations
- `public/` — project images, media and assets
- `scripts/` — content validation, maintenance and security
- `ops/` — production host setup and operational scripts
- `docs/` — lightweight GitHub Pages redirect gateway
- `.github/workflows/` — CI and Pages publishing

## Editorial and legal notes

Articles should identify their evidence status and link to sources where possible. Keep confirmed Rockstar information clearly separated from speculation, leaks and analysis. Review the [copyright policy](https://pulsebreakpt.github.io/GTA7/legal/copyright), [terms](https://pulsebreakpt.github.io/GTA7/legal/terms) and [sources](https://pulsebreakpt.github.io/GTA7/sources) before reusing archive text or third-party images. The GitHub repository does not grant additional rights to Rockstar-owned material.
