import re
pages = {
    'vehicles': '/home/ubuntu/gta7/app/database/vehicles/[slug]/page.js',
    'weapons': '/home/ubuntu/gta7/app/database/weapons/[slug]/page.js',
    'location': '/home/ubuntu/gta7/app/map/location/[slug]/page.js',
    'region': '/home/ubuntu/gta7/app/map/[slug]/page.js',
    'faction': '/home/ubuntu/gta7/app/gangs-factions/[slug]/page.js',
}
# Para cada faixa, lista as expressões {…} que ela mostra e diz se cada uma
# aparece também fora da faixa (noutra secção da mesma página).
for name, path in pages.items():
    src = open(path).read()
    m = re.search(r'<section className="[a-z]+-bible-banner[^>]*>.*?</section>', src, re.S)
    if not m:
        print(name, 'no banner'); continue
    banner = m.group(0)
    rest = src[:m.start()] + src[m.end():]
    exprs = sorted(set(re.findall(r'\{([a-zA-Z_.\[\]0-9?]+)\}', banner)))
    print(f'\n{name}:')
    for e in exprs:
        print(f'   {e:40} elsewhere: {"yes" if "{" + e + "}" in rest or e in rest else "NO"}')
