export const ROCKSTAR_GTA_VI_URL = 'https://www.rockstargames.com/VI'

export function isRockstarUrl(value) {
  if (!value) return false
  try {
    const { protocol, hostname } = new URL(String(value))
    return protocol === 'https:' && (hostname === 'rockstargames.com' || hostname.endsWith('.rockstargames.com'))
  } catch {
    return false
  }
}

// Public citations deliberately have a single trust boundary: Rockstar.
// Internal/editorial records can still be labelled, but never masquerade as
// outbound sources and never send a reader to a third-party wiki or outlet.
export function publicSource(name, url) {
  if (isRockstarUrl(url)) {
    return { name: name || 'Rockstar Games · Official site', url: String(url) }
  }
  return { name: 'GTA LORE · EDITORIAL RECORD', url: null }
}
