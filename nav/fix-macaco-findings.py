import os, re

SRC = '/home/ubuntu/gta7'
OUT = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav/fix5'
os.makedirs(OUT, exist_ok=True)
files = {}
def get(p):
    if p not in files: files[p] = open(os.path.join(SRC, p)).read()
    return files[p]
def rep(p, old, new, count=1):
    s = get(p)
    n = s.count(old)
    assert n == count, f'{p}: expected {count} found {n}: {old[:80]!r}'
    files[p] = s.replace(old, new)

def retag(p, opening, old_tag, new_tag):
    """Swap the tag of the element opened by `opening` and of its matching close."""
    s = get(p)
    start = s.find(opening)
    assert start >= 0, f'{p}: {opening[:60]!r} not found'
    i = start + len(opening)
    depth = 1
    pat = re.compile(rf'<{old_tag}[\s>]|</{old_tag}>')
    while depth:
        m = pat.search(s, i)
        assert m, f'{p}: no matching close for {opening[:40]!r}'
        depth += -1 if m.group(0).startswith('</') else 1
        i = m.end()
    close_start = i - len(f'</{old_tag}>')
    new_open = opening.replace(f'<{old_tag}', f'<{new_tag}', 1)
    files[p] = s[:start] + new_open + s[start + len(opening):close_start] + f'</{new_tag}>' + s[i:]

# 1. Categories: an entry never belongs to the same category twice (the
#    branch label and a data category could both be «Locations»).
rep('lib/wiki-graph.js', "    categories: [KIND_META[kind].plural, ...categories].filter(Boolean),",
    "    // Sem repetidos pelo slug: o ramo («Locations») e a categoria dos dados\n    // («locations») punham a mesma ficha duas vezes na mesma categoria.\n    categories: [...new Map([KIND_META[kind].plural, ...categories].filter(Boolean).map((label) => [slugify(label), label])).values()],")

# 2. Vehicle grid: a listbox may only hold options; this grid holds buttons.
rep('app/database/vehicles/page.js', 'role="listbox" aria-label="Vehicle grid"', 'role="group" aria-label="Vehicle grid"')

# 3. <dt>/<dd> need a <dl> parent.
retag('app/map/location/[slug]/page.js', '<div className="map-bible-fact-grid">', 'div', 'dl')
retag('app/map/[slug]/page.js', '<div className="map-bible-fact-grid">', 'div', 'dl')
retag('app/database/vehicles/[slug]/page.js', '<div className="vehicle-bible-data-grid">', 'div', 'dl')
retag('app/database/vehicles/[slug]/page.js', '<div className="vehicle-bible-data-grid vehicle-bible-data-grid-wide">', 'div', 'dl')
retag('app/database/weapons/[slug]/page.js', '<div className="weapon-bible-data-grid">', 'div', 'dl')
retag('app/database/weapons/[slug]/page.js', '<div className="weapon-bible-data-grid weapon-bible-data-grid-wide">', 'div', 'dl')
retag('app/gangs-factions/[slug]/page.js', '<div className="faction-bible-data-grid">', 'div', 'dl')

# 4. One <main> per page: the layout already provides it.
for p in ['app/categories/[slug]/page.js', 'app/categories/page.js', 'app/database/world/page.js', 'app/database/world/[slug]/page.js', 'app/wiki/grand-theft-auto-vi/page.js']:
    s = get(p)
    s = re.sub(r'<main(\s|>)', r'<div\1', s)
    s = s.replace('</main>', '</div>')
    files[p] = s

# 5. Scrollable image rail reachable by keyboard.
rep('components/site/media-carousel.jsx', 'className="film-rail flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth" aria-label={label}>',
    'className="film-rail flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth" role="region" tabIndex={0} aria-label={label}>')

# 6. Selected place image collapsed to 0px inside the header layout.
rep('app/map/page.js', '<PublishedVisual location={selected} region={selectedRegion} className="min-h-[220px] rounded-sm" priority />',
    '<PublishedVisual location={selected} region={selectedRegion} className="min-h-[220px] w-full self-stretch rounded-sm" priority />')

# 7. Filter panels close with Escape; radio filters survive Back.
rep('components/site/collapsible-filters.jsx', "    <section className={cx('wiki-filter-panel', open && 'is-open', className)} data-open={open ? 'true' : 'false'}>",
    "    <section\n      className={cx('wiki-filter-panel', open && 'is-open', className)}\n      data-open={open ? 'true' : 'false'}\n      // Escape fecha o painel e devolve o foco ao botão, como num menu.\n      onKeyDown={(event) => { if (event.key === 'Escape' && open) { event.stopPropagation(); toggle(); event.currentTarget.querySelector('.wiki-filter-panel-toggle')?.focus() } }}\n    >")
rep('app/database/radio/page.js', "import { useMemo, useState } from 'react'", "import { useMemo } from 'react'\nimport { useSessionState } from '@/components/site/use-session-state'")
rep('app/database/radio/page.js', """  const [filter, setFilter] = useState('all')
  const [selectedSlug, setSelectedSlug] = useState('v-rock')
  const [musicFilter, setMusicFilter] = useState('all')
  const [musicQuery, setMusicQuery] = useState('')""", """  // Guardados na sessão: ao voltar de uma estação com Back, os filtros e a
  // pesquisa continuam como estavam.
  const [filter, setFilter] = useSessionState('radio:filter', 'all')
  const [selectedSlug, setSelectedSlug] = useSessionState('radio:selected', 'v-rock')
  const [musicFilter, setMusicFilter] = useSessionState('radio:music-filter', 'all')
  const [musicQuery, setMusicQuery] = useSessionState('radio:music-query', '')""")
files['components/site/use-session-state.js'] = """'use client'

import { useEffect, useState } from 'react'

// useState que sobrevive a Back/Forward dentro da mesma sessão do browser.
// Começa sempre no valor por omissão (o HTML do servidor é o mesmo para
// todos) e só depois lê a sessão, para não haver diferenças de hidratação.
export function useSessionState(key, initial) {
  const storageKey = `gta-lore:${key}`
  const [value, setValue] = useState(initial)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (saved !== null) setValue(JSON.parse(saved))
    } catch { /* private browsing can disable storage */ }
  }, [storageKey])
  const update = (next) => setValue((current) => {
    const resolved = typeof next === 'function' ? next(current) : next
    try { sessionStorage.setItem(storageKey, JSON.stringify(resolved)) } catch { /* still works in memory */ }
    return resolved
  })
  return [value, update]
}
"""

for p, s in files.items():
    dest = os.path.join(OUT, p.replace('/', '__'))
    open(dest, 'w').write(s)
print('ok', len(files), 'files')
