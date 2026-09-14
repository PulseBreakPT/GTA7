// Light input fuzzing: the values that break search boxes and forms more
// often than anyone expects. Read-only in effect — the Macaco only submits
// search-like forms (see fuzzers/forms.mjs).
export const FUZZ_VALUES = [
  { label: 'empty', value: '' },
  { label: 'spaces only', value: '     ' },
  { label: 'very long', value: 'lucia '.repeat(900) },
  { label: 'unicode', value: 'Ação São João ñ 日本語 العربية Ελληνικά' },
  { label: 'emoji', value: '🐒🔥🚗💥🌴' },
  { label: 'special characters', value: `'"<>&%;\\/{}[]|^~\`` },
  { label: 'html', value: '<b>macaco</b><img src=x>' },
  { label: 'zero-width and RTL', value: 'jas​on ‮ecul' },
  { label: 'newline', value: 'vice\ncity' },
  { label: 'number zero', value: '0' },
  { label: 'negative', value: '-1' },
  { label: 'huge number', value: '99999999999999999999' },
  { label: 'float edge', value: '1e308' },
  { label: 'NaN', value: 'NaN' },
  { label: 'padded', value: '   vehicles   ' },
  { label: 'quote injection', value: "' OR '1'='1" },
  { label: 'path traversal', value: '../../etc/passwd' },
  { label: 'percent encoding', value: '%00%2e%2e%2f' },
  { label: 'realistic', value: 'lucia' },
  { label: 'realistic', value: 'vice city' },
  { label: 'realistic', value: 'grotti' },
  { label: 'realistic', value: 'jason duval' },
]

export const REALISTIC = FUZZ_VALUES.filter((v) => v.label === 'realistic')
export const pickFuzz = (rng, { realistic = false } = {}) => rng.pick(realistic ? REALISTIC : FUZZ_VALUES)
