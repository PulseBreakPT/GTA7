// GTA LORE icon language. Every mark uses the same 24px field, rounded
// terminals and two optical weights, so navigation and evidence UI read as
// one product instead of a collection of unrelated library glyphs.
const GLYPHS = {
  archive: ['M4 7.5 12 3l8 4.5v11L12 22l-8-3.5v-11Z', 'M8 10h8M8 14h8M8 18h5'],
  search: ['M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z', 'm15.5 15.5 4.5 4.5'],
  command: ['M9 8H6.5a2.5 2.5 0 1 1 2.5-2.5V18.5A2.5 2.5 0 1 1 6.5 16H18.5A2.5 2.5 0 1 1 16 18.5V5.5A2.5 2.5 0 1 1 18.5 8H9Z'],
  character: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4.5 21c.8-4.3 3.3-6.5 7.5-6.5s6.7 2.2 7.5 6.5'],
  vehicle: ['m4 15 1.5-5h13l1.5 5', 'M3 15h18v4H3v-4Zm3 4v2m12-2v2M7 12h10'],
  weapon: ['M4 12h11l3-3 2 2-3 3v4h-4v-3H8l-2 3H3l2-5Z'],
  place: ['M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  radio: ['M5 9h14v11H5V9Z', 'm7 9 9-5M8 13h5M8 16h3', 'M17 14a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'],
  mechanic: ['M12 3v4m0 10v4M3 12h4m10 0h4', 'M8 8l8 8m0-8-8 8'],
  world: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18'],
  faction: ['M4 19v-8l4-4 4 4v8M12 19V8l4-4 4 4v11', 'M2 21h20'],
  news: ['M5 4h14v16H5V4Z', 'M8 8h8M8 12h8M8 16h5'],
  guide: ['M5 4.5c3-1 5-.5 7 1.5v14c-2-2-4-2.5-7-1.5v-14Z', 'M19 4.5c-3-1-5-.5-7 1.5v14c2-2 4-2.5 7-1.5v-14Z'],
  image: ['M4 5h16v14H4V5Z', 'm5 17 4.5-5 3 3 2.5-2.5 4 4.5', 'M16.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z'],
  evidence: ['M12 3 20 6v6c0 5-3.2 8-8 9-4.8-1-8-4-8-9V6l8-3Z', 'm8.5 12 2.2 2.2 4.8-5'],
  verified: ['M12 3 20 6v6c0 5-3.2 8-8 9-4.8-1-8-4-8-9V6l8-3Z', 'm8.5 12 2.2 2.2 4.8-5'],
  analysis: ['M4 19h16M6 16v-5m4 5V7m4 9v-3m4 3V5'],
  rumour: ['M9.5 9a2.7 2.7 0 1 1 4.2 2.2c-1.7 1-1.7 2-1.7 3.3', 'M12 18.5h.01', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z'],
  timeline: ['M5 5v14', 'M5 7h6l2 2h6M5 13h4l2 2h8M5 19h8'],
  relation: ['M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'm10 7 4 10'],
  quote: ['M5 7h6v6H7l-2 4V7Zm10 0h4v6h-2l-2 4V7Z'],
  camera: ['M4 8h4l2-3h4l2 3h4v11H4V8Z', 'M12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
  police: ['M12 3 20 7l-2 10-6 4-6-4L4 7l8-4Z', 'M9 10h6M12 7v6'],
  gang: ['M7 20v-6l-3-2 2-4 4 2 2-7 2 7 4-2 2 4-3 2v6'],
  animal: ['M7 11c-3-2-4-5-2-7 3 0 5 2 6 5m6 2c3-2 4-5 2-7-3 0-5 2-6 5', 'M6 16c1-4 3-6 6-6s5 2 6 6c0 3-2 5-6 5s-6-2-6-5Z'],
  business: ['M4 9h16v12H4V9Zm2-5h12l2 5H4l2-5Z', 'M9 13h6v8'],
  building: ['M6 21V4h12v17M3 21h18', 'M9 8h2m2 0h2m-6 4h2m2 0h2m-6 4h2m2 0h2'],
  music: ['M9 18V6l10-2v12', 'M9 18a3 2 0 1 1-3-2 3 2 0 0 1 3 2Zm10-2a3 2 0 1 1-3-2 3 2 0 0 1 3 2Z'],
  play: ['M7 4v16l13-8L7 4Z'],
  filter: ['M4 6h16M7 12h10m-7 6h4'],
  compare: ['M8 4 4 8l4 4M4 8h9M16 12l4 4-4 4m4-4h-9'],
  bookmark: ['M7 4h10v17l-5-3-5 3V4Z'],
  account: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M5 21c.7-4 3-6 7-6s6.3 2 7 6'],
  home: ['m3 11 9-8 9 8v10h-6v-6H9v6H3V11Z'],
  compass: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'm15.5 8.5-2 5-5 2 2-5 5-2Z'],
  changes: ['M4 7h12l-3-3m3 3-3 3M20 17H8l3 3m-3-3 3-3'],
  statistics: ['M5 20V9h4v11M10 20V4h4v16m1 0v-7h4v7'],
  chevron: ['m9 5 7 7-7 7'],
  arrow: ['M5 12h14m-5-5 5 5-5 5'],
  close: ['m5 5 14 14M19 5 5 19'],
}

export const LORE_ICON_NAMES = Object.freeze(Object.keys(GLYPHS))

export default function LoreIcon({ name, size = 20, className, strokeWidth = 1.8, label }) {
  const paths = GLYPHS[name] || GLYPHS.archive
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['lore-icon', className].filter(Boolean).join(' ')}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      {paths.map((d, index) => <path key={`${name}-${index}`} d={d} />)}
    </svg>
  )
}
