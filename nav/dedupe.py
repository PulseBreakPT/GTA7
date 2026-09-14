import re, shutil, os

SRC = '/home/ubuntu/gta7'
OUT = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav/dedupe'
FILES = {
    'wiki': 'components/site/wiki.jsx',
    'vehicle': 'app/database/vehicles/[slug]/page.js',
    'weapon': 'app/database/weapons/[slug]/page.js',
    'location': 'app/map/location/[slug]/page.js',
    'region': 'app/map/[slug]/page.js',
    'faction': 'app/gangs-factions/[slug]/page.js',
    'mechanic': 'app/database/mechanics/[slug]/page.js',
    'world': 'app/database/world/[slug]/page.js',
}
os.makedirs(OUT, exist_ok=True)
text = {k: open(os.path.join(SRC, p)).read() for k, p in FILES.items()}

def rep(key, old, new, count=1):
    n = text[key].count(old)
    assert n == count, f'{key}: expected {count}, found {n}: {old[:70]!r}'
    text[key] = text[key].replace(old, new)

def cut_banner(key, prefix):
    pat = re.compile(r'\n\s*<section className="' + prefix + r'-bible-banner[^>]*>.*?</section>\n', re.S)
    new, n = pat.subn('\n', text[key], count=1)
    assert n == 1, f'{key}: banner not found'
    text[key] = new

DEDUPE_HELPER = '''
// Campos seguidos com o mesmo valor mostram-se uma só vez, com os rótulos
// juntos — «Not published for this model» três vezes seguidas é ruído.
const mergeSameValues = (rows) => rows.reduce((list, [label, value]) => {
  const same = list.find((row) => row[1] === value)
  if (same) same[0] = `${same[0]} · ${label}`
  else list.push([label, value])
  return list
}, [])
'''

# ---- componentes partilhados -------------------------------------------------
# Page information: o estado já está no cabeçalho da ficha e a fonte nas
# referências e na caixa de dados; aqui fica o que só este bloco diz.
rep('wiki', '''        <StatusBadge status={entry.status} />
      </header>''', '''      </header>''')
rep('wiki', '''          <div><dt>Evidence class</dt><dd>{entry.status}</dd></div>
''', '')
rep('wiki', '''        <div className="wiki-knowledge-source">
          <span><small>Recorded source</small><strong>{source.name}</strong></span>
          {source.url ? <a href={source.url} target="_blank" rel="noreferrer">Inspect official record <ChevronRight size={12} /></a> : <span>No public source link</span>}
        </div>
''', '')
rep('wiki', '''    ['Page name', entry.name],
''', '')
rep('wiki', '''    ['Source label', entry.status],
    ['Categories', String(entry.categories.length)],
    ['Links in', String(incoming)],
    ['Links out', String(outgoing)],
''', '')
rep('wiki', '''    ['Last checked', entry.updatedAt || 'not recorded'],
    ['Source', entry.sourceName || 'none named'],
''', '')
rep('wiki', '  const source = publicSource(entry.sourceName, entry.sourceUrl)\n', '')
# Miniaturas em lista: o aviso de imagem regional diz-se uma vez por lista.
rep('wiki', 'export function LocationThumb({ image, fallbackImage, name, label, className, priority = false }) {',
    'export function LocationThumb({ image, fallbackImage, name, label, className, priority = false, showLabel = true }) {')
rep('wiki', '''      <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/85 to-black/10 font-mono text-[8px] uppercase tracking-[0.13em] text-white">
        {label || (contextual ? 'OFFICIAL REGION CONTEXT · NOT THIS EXACT PLACE' : 'PUBLISHED GTA VI IMAGE')}
      </span>''', '''      {showLabel && <span className="absolute inset-x-0 bottom-0 px-2 py-1.5 bg-gradient-to-t from-black/85 to-black/10 font-mono text-[8px] uppercase tracking-[0.13em] text-white">
        {label || (contextual ? 'OFFICIAL REGION CONTEXT · NOT THIS EXACT PLACE' : 'PUBLISHED GTA VI IMAGE')}
      </span>}''')

# ---- veículos -----------------------------------------------------------------
cut_banner('vehicle', 'vehicle')
rep('vehicle', '''            <span className="vehicle-evidence-chip font-mono text-[9px] uppercase tracking-[0.1em]">{bible.evidenceLevel}</span>
''', '')
rep('vehicle', '''                <Attribution label="Association / content" value={v.association} accent="border-mint/70" exclude={`/database/vehicles/${v.slug}`} />
                <Attribution label="Manufacturer / brand" value={v.manufacturer} accent="border-violet/70" exclude={`/database/vehicles/${v.slug}`} />
                <Attribution label="Character" value={v.character} accent="border-pink/70" exclude={`/database/vehicles/${v.slug}`} />
''', '')
rep('vehicle', '''    { label: 'Vehicle class', value: classLabel },
    { label: 'Manufacturer', value: v.manufacturer },
    { label: 'Unit', value: v.num },
    { label: 'Association', value: v.association },
    v.character ? { label: 'Character', value: v.character } : null,
    { label: 'Status', children: <StatusBadge status={v.status} /> },
    { label: 'Evidence', children: <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{v.evidenceStatus}</span> },
''', '')
rep('vehicle', '''                <InfoRow label="Status">
                  <StatusBadge status={v.status} />
                </InfoRow>
                <InfoRow label="Evidence">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{v.evidenceStatus}</span>
                </InfoRow>
''', '')
rep('vehicle', '''                <SourceChip name={v.sourceName} url={v.sourceUrl} />
                <p className="font-mono text-[9px] text-dim mt-2">Updated {v.updatedAt}</p>''', '''                <p className="font-mono text-[9px] text-dim">Updated {v.updatedAt}</p>''')
rep('vehicle', '''                {[
                  ['Theft method', bible.theftMethod],''', '''                {mergeSameValues([
                  ['Theft method', bible.theftMethod],''')
rep('vehicle', '''                  ['Fuel / charging', bible.fuel],
                ].map(''', '''                  ['Fuel / charging', bible.fuel],
                ]).map(''')
text['vehicle'] = text['vehicle'].replace('\nexport default function', DEDUPE_HELPER + '\nexport default function', 1) if '\nexport default function' in text['vehicle'] else text['vehicle']

# ---- armas --------------------------------------------------------------------
cut_banner('weapon', 'weapon')
rep('weapon', '''            <span className="weapon-evidence-chip font-mono text-[9px] uppercase tracking-[0.1em]">{bible.evidenceLevel}</span>
''', '')
rep('weapon', '''                <Attribution label="Associated character / content" value={w.association} accent="border-mint/70" />
                <Attribution label="Manufacturer / brand" value={w.manufacturer} accent="border-violet/70" />
                <Attribution label="Character" value={w.character} accent="border-pink/70" />
''', '')
rep('weapon', '''                  <div><dt>Manufacturer</dt><dd>{w.manufacturer}</dd></div>
''', '')
rep('weapon', '''                <div><dt>Owner relationship</dt><dd>{bible.owner}</dd></div>
                <div><dt>Source channel</dt><dd>{w.sourceName}</dd></div>
''', '')
rep('weapon', '''    { label: 'Weapon type', value: typeLabel },
    { label: 'Manufacturer', value: w.manufacturer },
    { label: 'Association', value: w.association },
    w.character ? { label: 'Character', value: w.character } : null,
    { label: 'Status', children: <StatusBadge status={w.status} /> },
    { label: 'Evidence', children: <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mint">{w.evidenceStatus}</span> },
''', '')
rep('weapon', '''                {[
                  ['Concealability', bible.concealability],''', '''                {mergeSameValues([
                  ['Concealability', bible.concealability],''')
rep('weapon', '''                  ['Illegal availability', bible.illegalAvailability],
                ].map(''', '''                  ['Illegal availability', bible.illegalAvailability],
                ]).map(''')
text['weapon'] = text['weapon'].replace('\nexport default function', DEDUPE_HELPER + '\nexport default function', 1)

# ---- locais, regiões e fações -------------------------------------------------
cut_banner('location', 'map')
cut_banner('faction', 'faction')
NOTE = '<p className="mb-3 text-[12px] leading-relaxed text-dim">Places without a frame of their own show official imagery of the surrounding region, not the exact place.</p>'
rep('location', '''              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((item) => (''', '''              ''' + NOTE + '''
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {related.map((item) => (''')
rep('location', 'name={item.name} className="h-[84px] w-full rounded-[2px]" />', 'name={item.name} className="h-[84px] w-full rounded-[2px]" showLabel={false} />')
rep('region', '''              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {entries.map((entry) => (''', '''              ''' + NOTE + '''
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {entries.map((entry) => (''')
rep('region', 'name={entry.name} className="h-[84px] w-full rounded-[2px]" />', 'name={entry.name} className="h-[84px] w-full rounded-[2px]" showLabel={false} />')

# ---- mechanics e World: o resumo fica só no cabeçalho -------------------------
rep('mechanic', '''              <p className="text-dim text-[14px] leading-[1.8]"><WikiText exclude={`/database/mechanics/${m.slug}`}>{m.desc}</WikiText></p>
''', '')
rep('world', '''          <WikiSection id="overview" title="Overview"><p className="text-dim text-[15px] leading-[1.85]"><WikiText exclude={`/database/world/${item.slug}`}>{item.summary}</WikiText></p></WikiSection>
''', '')
rep('world', '''<small className="block mt-1 font-cond uppercase tracking-[0.12em] text-[9px] text-dim">{entry.type} · {entry.region}</small>''',
    '''{(entry.type !== item.type || entry.region !== item.region) && <small className="block mt-1 font-cond uppercase tracking-[0.12em] text-[9px] text-dim">{[entry.type !== item.type && entry.type, entry.region !== item.region && entry.region].filter(Boolean).join(' · ')}</small>}''')

for k, p in FILES.items():
    dest = os.path.join(OUT, k + os.path.splitext(p)[1])
    open(dest, 'w').write(text[k])
print('ok', len(FILES), 'files')
