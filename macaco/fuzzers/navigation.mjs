// Navigation fuzzing: URLs a real visitor could type or paste — missing
// records, odd query strings, trailing slashes, capitals. The site should
// answer each with a proper page (a 404 is fine; a 500 or blank page is not).
export function mutateUrl(rng, url) {
  const u = new URL(url)
  const parts = u.pathname.split('/').filter(Boolean)
  const mutations = [
    () => { if (parts.length) parts[parts.length - 1] = `macaco-missing-${rng.int(9999)}`; else parts.push('macaco-missing') },
    () => { u.search = '?page=-1&sort=%00&q=' + encodeURIComponent('<macaco>') },
    () => { u.search = '?' + 'x='.concat('a'.repeat(3000)) },
    () => { parts.push('') },
    () => { u.pathname = u.pathname.toUpperCase(); return true },
    () => { u.pathname = `/${parts.join('//')}`; return true },
    () => { u.search = '?filter[]=1&filter[]=2&view=%F0%9F%90%92' },
    () => { u.hash = '#' + 'deep-link-' + rng.int(999) },
  ]
  const mutation = rng.pick(mutations)
  const replaced = mutation()
  if (!replaced) u.pathname = `/${parts.join('/')}`
  return u.toString()
}
