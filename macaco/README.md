# Macaco — autonomous QA bot for Lusorae

The Macaco opens the site in a real browser (Playwright/Chromium), discovers
links, buttons, menus, tabs, filters, dialogs and forms, and explores on its
own — recording the state before every action, comparing it after, and
turning anything that breaks into a replayable incident with evidence.

```sh
macaco lusorae.pt                       # SMART on desktop, tablet and mobile
macaco lusorae.pt --mode chaos          # combinations no sane visitor tries
macaco lusorae.pt --mode both           # SMART, then CHAOS
macaco lusorae.pt --seed 843921         # the same run again
macaco replay runs/<run>/incidents/MACACO-00012.json   # reproduce one bug
macaco report runs/<run>                # rebuild the HTML report
```

Options: `--actions N` per session (150) · `--sessions N` per viewport (1) ·
`--viewports desktop,tablet,mobile` · `--minutes N` budget (30) · `--start /path`
· `--no-a11y` · `--no-security` · `--no-video` · `--no-trace` · `--headed` ·
`--delay ms` / `--per-minute N` pacing · `--out DIR`.

Every run writes `runs/run-NNNN-<date>/` with `report.html`, `report.json`,
`report.txt`, `crawl.json`, one JSON per incident, screenshots, and — for
sessions that found something — the Playwright trace
(`npx playwright show-trace traces/<session>.zip`) and a video.

## How it works

| Layer | Module | Role |
|---|---|---|
| engine | `monkey` | Seeded choice of the next action. SMART weighs novelty and realistic journeys (search → open → related → back → filter); CHAOS spreads over everything, adding rapid clicks, Back/Forward spam, stray keys, resizes and mutated URLs. |
| | `crawler` | Pages discovered/visited, route patterns (`/database/vehicles/:slug`), actions already tried — so it keeps going somewhere new. |
| | `state` | Snapshot before/after each action, the URL → action → URL graph, and recovery from modals, ping-pong loops and dead ends. |
| | `navigator` | Finds actionable elements, describes them so they can be found again after a reload, performs actions, waits for the page to settle. |
| | `assertions` | After every action: page visible, no fatal error, valid same-origin URL, no 500, header and main inside the screen. |
| inspectors | `console` `network` | Always listening: console errors, JS exceptions, unhandled rejections, crashes, 4xx/5xx, blocked/failed requests, broken images, slow requests. |
| | `visual` | Horizontal scroll, controls outside the viewport, overlaps, clipped text, invisible controls, oversized dialogs, broken/stretched images, collapsed containers, missing landmarks. |
| | `ux` | Dead clicks, double-click-needed, menus that ignore Escape, Back that loses state, filters that change nothing, forms without feedback, endless loading, duplicated controls. |
| | `accessibility` | axe-core (WCAG 2.1 A/AA + best practice) once per page type, plus a keyboard focus-visibility pass. |
| | `security` | Defensive probe, read-only GETs: security headers, cookies, private pages answering anonymously, sensitive files, reflected parameters, leaked stack traces. |
| fuzzers | `inputs` `navigation` `forms` | Empty, very long, Unicode, emoji, special characters, numbers and edge values; missing records and odd URLs; search forms submitted, other forms only typed into. |
| guards | `destructive-actions` `auth` `rate-limit` | Never Delete/Logout/Purchase/Publish/admin; never types into or submits auth forms; paced for production. |
| reporter | `severity` `deduplication` `json-report` `html-report` | One severity table; the same bug seen 300 times is one incident ×300; prioritised reports. |
| replay | `seed` `steps` | Seeded RNG and exact step files, so any incident can be replayed. |

## Reproducing a bug

Each incident carries two replays:

- `macaco replay runs/<run>/incidents/<ID>.json` repeats the exact recorded
  steps (same viewport, same start page, elements found again by role, name
  and position) and says whether the same bug came back.
- `seedReplay` (in the incident JSON) re-runs the whole seeded session; it
  reproduces the same choices as long as the site has not changed.

## Safety

The Macaco is built to run against production: it follows same-origin links
only, never presses destructive or administrative controls, never submits
anything but search forms, and paces itself (250 ms between actions, at most
150 per minute by default). It identifies itself with `MacacoQA/1.0` in the
user agent. The security probe only sends a short, fixed list of GET requests.

## Tests

`npm test` — seed determinism, guards, deduplication and route patterns.
