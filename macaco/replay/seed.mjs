// Seeded randomness. Every choice the Macaco makes goes through one of these
// generators, so the same seed against the same site replays the same run.

// mulberry32: small, fast, good enough for test sequences.
export function createRng(seed) {
  let state = (Number(seed) >>> 0) || 1
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const rng = {
    seed: Number(seed) >>> 0,
    next,
    int: (max) => Math.floor(next() * max),
    between: (min, max) => min + Math.floor(next() * (max - min + 1)),
    chance: (p) => next() < p,
    pick: (list) => (list.length ? list[Math.floor(next() * list.length)] : undefined),
    // items: [{ weight, ... }] → one item, proportional to weight
    weighted: (items) => {
      const total = items.reduce((sum, item) => sum + Math.max(0, item.weight || 0), 0)
      if (total <= 0) return items[0]
      let roll = next() * total
      for (const item of items) {
        roll -= Math.max(0, item.weight || 0)
        if (roll <= 0) return item
      }
      return items[items.length - 1]
    },
    shuffle: (list) => {
      const copy = [...list]
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[copy[i], copy[j]] = [copy[j], copy[i]]
      }
      return copy
    },
  }
  return rng
}

// A fresh random seed for a run (6 digits, easy to read aloud and retype).
export const newSeed = () => 100000 + Math.floor(Math.random() * 900000)

// Derives a stable sub-seed per session: the run seed, the viewport and the
// session index always give the same sequence.
export function deriveSeed(runSeed, ...parts) {
  let h = 2166136261 ^ (Number(runSeed) >>> 0)
  for (const ch of parts.join('|')) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 1000000 || 1
}
