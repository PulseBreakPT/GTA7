# LEONIDA ARCHIVE — PRD

## Purpose
Independent GTA VI fan database ("LEONIDA ARCHIVE") faithfully recreating 5 user-provided reference screens (Homepage, News, Weapons/Arsenal, Vehicles/Garage, Characters) plus a Map & Easter Eggs screen derived from the same design system (reference image 3 was missing; user approved derivation). Entire interface in English.

## Tech
- Next.js 15 App Router (JS), Tailwind with custom tokens, lucide-react icons, next/image
- Fonts: Barlow Condensed (headings), Inter (body), JetBrains Mono (stats/dates)
- Local structured data: /app/lib/content.js (articles, sources, weapons ×29, vehicles ×12, characters ×6, relationships, mechanics ×8, locations ×15, easter eggs ×4, guides ×4 — each with status/sourceName/sourceUrl/publishedAt/updatedAt)
- localStorage: favourites (la:favs), vehicle comparison (la:compare)
- Backend: template Mongo status API only (untouched), tested 6/6

## Design tokens
ink #07090E, raised #0C1017, surface2 #111720, paper #F5F4F0, dim #969BA5, line rgba(255,255,255,.16), pink #F1A3C3, mint #65DCCB, violet #9B83F4, warn #E6D658, danger #C92A35. Active cards: white 1px outline + pink top glow (.card-active). Film grain overlay + scanlines/vignette utilities.

## Routes (all working, prod build passes)
/, /news, /news/[slug], /map, /database (→weapons), /database/weapons(+/[slug]), /database/vehicles(+/[slug]), /database/characters(+/[slug]), /database/mechanics, /easter-eggs/[slug], /guides(+/[slug])

## Key interactions
- Global search modal ("/" and Ctrl/Cmd+K) across 8 content types with statuses + empty/no-result states
- Map: pan/zoom/region fly-to/category filters/search, keyboard-accessible markers, route toggle, reset, legend, mobile bottom sheets, ?loc= deep links
- Weapons: circular 8-slot selector + carousel updating inspector live; SELECT cycles, BACK navigates
- Vehicles: class filters, favourites, sort cycle, image zoom, compare-2 side-by-side panel
- Characters: selection updates profile + TRUST/TENSION/RISK relationship bars; mechanics strip
- Header counters per route; footer disclaimer (exact required wording) + PS glyphs

## Images
Stock (Unsplash) via vision expert — hero skyline, ferris, neon, police, cars ×7, portraits ×4, weapons ×4. Entries without visuals show intentional "CLASSIFIED / AWAITING VISUAL" placeholders.

## Status
MVP complete; backend smoke-tested (6/6). Frontend automated testing pending user permission.
