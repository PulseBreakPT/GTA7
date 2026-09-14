import re, os

SRC = '/home/ubuntu/gta7'
OUT = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav/badges'
os.makedirs(OUT, exist_ok=True)
def read(p): return open(os.path.join(SRC, p)).read()
def save(p, s):
    dest = os.path.join(OUT, p.replace('/', '__'))
    open(dest, 'w').write(s)

# ---- ui.jsx: rótulos em sentence case, TypeChip, displayLabel ----------------
ui = read('components/site/ui.jsx')
labels = {
    "confirmed: { label: 'CONFIRMED'": "confirmed: { label: 'Confirmed'",
    "verified: { label: 'VERIFIED'": "verified: { label: 'Verified'",
    "category: { label: 'CATEGORY CONFIRMED'": "category: { label: 'Category confirmed'",
    "analysis: { label: 'ANALYSIS'": "analysis: { label: 'Analysis'",
    "rumour: { label: 'RUMOUR'": "rumour: { label: 'Rumour'",
    "official: { label: 'OFFICIAL'": "official: { label: 'Official'",
    "community: { label: 'COMMUNITY'": "community: { label: 'Community'",
    "featured: { label: 'FEATURED'": "featured: { label: 'Featured'",
    "update: { label: 'UPDATE'": "update: { label: 'Update'",
    "news: { label: 'NEWS'": "news: { label: 'News'",
}
for a, b in labels.items():
    assert ui.count(a) == 1, a
    ui = ui.replace(a, b)

HELPER = '''
// Rótulos em sentence case, como no resto do arquivo. Os dados trazem muitos
// em maiúsculas («SPORTS CLASSIC», «SUVS»); passam a «Sports classic» e
// «SUVs», sem estragar siglas. Texto que já tem minúsculas fica como está.
const LABEL_ACRONYMS = { SUVS: 'SUVs', SUV: 'SUV', GTA: 'GTA', VI: 'VI', ATV: 'ATV', UTV: 'UTV', SMG: 'SMG', LMG: 'LMG', RPG: 'RPG', MC: 'MC', PTT: 'PTT', DJ: 'DJ', TV: 'TV', FM: 'FM', VC: 'VC', HQ: 'HQ', PS5: 'PS5', NPC: 'NPC', EMS: 'EMS', VCPD: 'VCPD', UK: 'UK', US: 'US', II: 'II', III: 'III', IV: 'IV', '4X4': '4x4', '6X6': '6x6', GT: 'GT', GTX: 'GTX', SS: 'SS', RS: 'RS', LX: 'LX' }
export const displayLabel = (value) => {
  const text = String(value ?? '')
  if (!text || /[a-z]/.test(text)) return text
  const words = text.toLowerCase().split(/(\\s+)/).map((word) => LABEL_ACRONYMS[word.toUpperCase()] || word)
  const joined = words.join('')
  return joined.charAt(0).toUpperCase() + joined.slice(1)
}

// Etiqueta de classificação (classe, tipo, género, papel): neutra, não é
// evidência. O estado da evidência fica só com StatusBadge e GhostBadge.
export function TypeChip({ children, className }) {
  return <span className={cx('type-chip', className)}>{typeof children === 'string' ? displayLabel(children) : children}</span>
}
'''
anchor = 'export const STATUS_META = {'
assert ui.count(anchor) == 1
ui = ui.replace(anchor, HELPER.lstrip('\n') + '\n' + anchor, 1)
# O texto das etiquetas de estado passa pelo mesmo tratamento.
assert ui.count('  const text = label || m.label\n') == 2
ui = ui.replace('  const text = label || m.label\n', '  const text = displayLabel(label || m.label)\n')
save('components/site/ui.jsx', ui)

# ---- páginas: entity-label e GhostBadge de tipo → TypeChip --------------------
PAGES = [
    'app/database/weapons/page.js', 'app/database/characters/[slug]/page.js', 'app/database/vehicles/[slug]/page.js',
    'app/database/vehicles/page.js', 'app/database/characters/page.js', 'app/map/location/[slug]/page.js',
    'app/gangs-factions/[slug]/page.js', 'app/database/weapons/[slug]/page.js', 'app/database/radio/[slug]/page.js',
    'app/database/world/[slug]/page.js',
]
for p in PAGES:
    s = read(p)
    n0 = s
    # <span className="entity-label …">{X}</span>
    s, k1 = re.subn(r'<span className="entity-label[^"]*">(\{.*?\})</span>', lambda m: f'<TypeChip>{m.group(1)}</TypeChip>', s)
    # <GhostBadge status="confirmed" label={X} />  (tipo, não evidência)
    s, k2 = re.subn(r'<GhostBadge status="confirmed" label=\{([^}]+)\} />', r'<TypeChip>{\1}</TypeChip>', s)
    # etiqueta do tipo nas fichas do World
    s, k3 = re.subn(r'<span className="wiki-type-chip">(\{item\.type\} · \{branchMeta\?\.label \|\| item\.branch\})</span>', r'<TypeChip>\1</TypeChip>', s)
    total = k1 + k2 + k3
    assert total >= 1, f'{p}: nothing replaced'
    # import do TypeChip a partir de ui
    m = re.search(r"import \{([^}]*)\} from '@/components/site/ui'", s)
    if m:
        names = [x.strip() for x in m.group(1).split(',') if x.strip()]
        if 'TypeChip' not in names:
            names.append('TypeChip')
        s = s[:m.start()] + "import { " + ', '.join(names) + " } from '@/components/site/ui'" + s[m.end():]
    else:
        last = list(re.finditer(r'^import .*$', s, re.M))[-1]
        s = s[:last.end()] + "\nimport { TypeChip } from '@/components/site/ui'" + s[last.end():]
    save(p, s)
    print(f'{p}: {k1} entity-label · {k2} type badge · {k3} world chip')
print('ok')
