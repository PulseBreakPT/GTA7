import re, os, json

SRC = '/home/ubuntu/gta7'
OUT = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav/dedupe2'
os.makedirs(OUT, exist_ok=True)

def read(p): return open(os.path.join(SRC, p)).read()
def write(name, s): open(os.path.join(OUT, name), 'w').write(s)

# ---- dados: locais repetidos e listas de texto -------------------------------
c = read('lib/content.js')
vcia = re.search(r"\n  \{ slug: 'vcia', name: 'VICE CITY INTERNATIONAL AIRPORT'.*?\},\n", c, re.S)
assert vcia and vcia.group(0).count('{ slug:') == 1
c = c[:vcia.start()] + '\n' + c[vcia.end():]
raceways = [m for m in re.finditer(r"\n  \{ slug: 'gellhorn-international-raceway'.*?\},\n", c, re.S)]
assert len(raceways) == 2 and all(m.group(0).count('{ slug:') == 1 for m in raceways)
second = raceways[1]
assert "status: 'rumour'" in second.group(0)
c = c[:second.start()] + '\n' + c[second.end():]
DEDUPE = '''
// Uma lista de texto nunca mostra a mesma frase duas vezes: vários registos
// importados traziam o mesmo «Leak account» repetido. As especificações
// ficam de fora — os «—» são lugares vazios, não frases.
const dedupeTextLists = (records) => records.forEach((record) => {
  for (const [key, value] of Object.entries(record)) {
    if (key !== 'specs' && Array.isArray(value) && value.length > 1 && value.every((item) => typeof item === 'string')) record[key] = [...new Set(value)]
  }
})
;[vehicles, weapons, characters, mechanics, locations, factions, radioStations, easterEggs, guides, articles].forEach(dedupeTextLists)
'''
c = c.rstrip('\n') + '\n' + DEDUPE
write('content.js', c)

w = read('lib/world-content.js')
w = w.rstrip('\n') + '''

// Uma lista de texto nunca mostra a mesma frase duas vezes.
for (const entry of worldEntries) {
  for (const [key, value] of Object.entries(entry)) {
    if (Array.isArray(value) && value.length > 1 && value.every((item) => typeof item === 'string')) entry[key] = [...new Set(value)]
  }
}
'''
write('world-content.js', w)

# ---- redirecionamento do slug antigo do aeroporto ---------------------------
n = read('next.config.js')
old = '''  async redirects() {
    if (!production) return []
    return [{'''
assert n.count(old) == 1
n = n.replace(old, '''  async redirects() {
    // Registos fundidos: o endereço antigo leva ao registo que ficou.
    const merged = [
      { source: '/map/location/vcia', destination: '/map/location/vice-city-international-airport', permanent: true },
    ]
    if (!production) return merged
    return [...merged, {''')
write('next.config.js', n)

# ---- infoboxes: o estado já está no cabeçalho --------------------------------
PAGES = {
    'faction': 'app/gangs-factions/[slug]/page.js',
    'radio': 'app/database/radio/[slug]/page.js',
    'world': 'app/database/world/[slug]/page.js',
    'character': 'app/database/characters/[slug]/page.js',
    'mechanic': 'app/database/mechanics/[slug]/page.js',
    'location': 'app/map/location/[slug]/page.js',
}
for name, path in PAGES.items():
    s = read(path)
    pat = re.compile(r'\n[ \t]*<InfoRow label="Status">\s*<StatusBadge status=\{[a-zA-Z.]+\}[^/]*/>\s*</InfoRow>')
    new, k = pat.subn('', s, count=1)
    assert k == 1, f'{name}: status row not matched'
    left = new.count('<StatusBadge status={')
    print(f'{name}: status row removed · StatusBadge still shown {left}×')
    write(name + '.js', new)

print('ok')
