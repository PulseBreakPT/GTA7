import os
os.chdir('/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/macaco')

def edit(p, old, new):
    s = open(p).read()
    assert s.count(old) == 1, f'{p}: {old[:70]!r}'
    open(p, 'w').write(s.replace(old, new))

# navigator: visibility via checkVisibility
edit('engine/navigator.mjs', """  const visible = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return false
    const s = getComputedStyle(el)""", """  // checkVisibility respeita <details> fechados e content-visibility: o
  // Chrome dá caixa aos filhos de um <details> fechado, e o Macaco tomava-os
  // por visíveis.
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return false
    if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true })) return false
    const s = getComputedStyle(el)""")

edit('inspectors/visual.mjs', """  const visible = (el, r = el.getBoundingClientRect()) => {
    if (r.width < 1 || r.height < 1) return false
    const s = getComputedStyle(el)""", """  const visible = (el, r = el.getBoundingClientRect()) => {
    if (r.width < 1 || r.height < 1) return false
    if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false
    const s = getComputedStyle(el)""")

edit('inspectors/visual.mjs', """  for (const el of document.querySelectorAll('h1, h2, h3, h4, button, a, label, p, span, strong, td, th, li')) {
    if (el.children.length > 2) continue""", """  for (const el of document.querySelectorAll('h1, h2, h3, h4, button, a, label, p, span, strong, td, th, li')) {
    if (el.children.length > 2) continue
    // Só texto próprio: um contentor de imagem com overflow hidden não é
    // «texto cortado».
    if (el.querySelector('img, picture, video, canvas, svg')) continue
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)) continue""")

edit('engine/state.mjs', "  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);",
     "  const visible = (el) => { const r = el.getBoundingClientRect(); if (el.checkVisibility && !el.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) return false; const s = getComputedStyle(el);")

# Ignored checks (product decisions in macaco.config.json)
edit('engine/session.mjs', "  const register = async (finding, { path, extra = {} } = {}) => {\n",
     "  const register = async (finding, { path, extra = {} } = {}) => {\n    // Verificações desligadas no macaco.config.json (decisões de produto).\n    if (options.ignore?.has(finding.check)) return null\n")
edit('bin/macaco.mjs', "  mkdirSync(outDir, { recursive: true })\n  const number",
     "  mkdirSync(outDir, { recursive: true })\n  options.ignore = loadIgnore()\n  const number")
edit('bin/macaco.mjs', "      for (const f of findings) {\n        const { incident, isNew } = dedup.add(",
     "      for (const f of findings) {\n        if (options.ignore.has(f.check)) continue\n        const { incident, isNew } = dedup.add(")
edit('bin/macaco.mjs', "function nextRunNumber(outDir) {", """// Verificações desligadas por decisão de produto (macaco.config.json).
function loadIgnore() {
  const file = join(ROOT, 'macaco.config.json')
  if (!existsSync(file)) return new Set()
  const config = JSON.parse(readFileSync(file, 'utf8'))
  return new Set((config.ignore || []).map((rule) => rule.check || rule))
}

function nextRunNumber(outDir) {""")
print('ok')
