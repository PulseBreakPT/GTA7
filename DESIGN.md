# GTA LORE interface contract

## Product intent

Readers arrive to find a GTA VI fact, understand its confidence level and move to a related record. Search is the primary global action; reading and internal navigation are secondary; account and destructive actions are tertiary.

## System rules

- Use the shared semantic tokens in `app/globals.css`; do not introduce isolated colour, spacing, radius or motion values without extending the scale.
- Every screen must cover applicable loading, empty, partial, error, success and offline states.
- Primary actions are never hover-only. Touch targets are at least 44px; hover enhancements use pointer-capability media queries.
- Keyboard focus uses a visible 2px ring and 2px offset. Modals trap focus, close with Escape and restore focus to their trigger.
- Interaction feedback begins within 100ms. Entrances use 200–300ms ease-out; exits are shorter. Reduced-motion preferences remove non-essential movement.
- Cards may lift and deepen their shadow, but their outer geometry never scales or reflows the grid. Images may scale inside clipped media frames.
- Destructive actions require explicit confirmation; server truth wins after mutations and failures always present a recovery path.
- Mobile uses the bottom navigation for destinations and bottom sheets for contextual overlays; desktop uses the persistent rail and anchored popovers.
