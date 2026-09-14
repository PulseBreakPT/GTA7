// The Macaco never presses anything that could delete, buy, publish, sign
// out or touch administration. Matching is deliberately broad: a false
// "skip" costs one untested button; a false "go" can cost real data.

const DESTRUCTIVE_WORDS = [
  // «Reset filters» e «Clear search» são seguros e úteis de testar; os resets
  // de conta, de palavra-passe ou de dados não.
  'delete', 'remove', 'erase', 'destroy', 'drop', 'purge', 'wipe', 'reset password', 'reset account', 'reset data', 'clear history', 'clear all data',
  'logout', 'log out', 'sign out', 'signout',
  'purchase', 'buy', 'checkout', 'check out', 'pay', 'order now', 'place order', 'subscribe', 'unsubscribe', 'donate',
  'publish', 'deploy', 'approve', 'reject', 'ban', 'suspend', 'revoke', 'promote', 'demote',
  'close account', 'deactivate', 'disable account', 'send', 'invite', 'report user', 'resolve', 'restore',
  'apagar', 'eliminar', 'remover', 'sair', 'terminar sessão', 'comprar', 'pagar', 'publicar', 'enviar',
]
const DESTRUCTIVE_HREF = [/\/admin(\/|$|\?)/i, /\/api\//i, /logout|signout|sign-out/i, /\/delete/i, /checkout|purchase|billing/i]
const UNSAFE_SCHEMES = /^(mailto:|tel:|sms:|javascript:|data:|blob:|file:)/i

const normalise = (value) => String(value || '').toLowerCase().replace(/\s+/g, ' ').trim()

export function isDestructive(candidate) {
  const words = normalise(`${candidate.text || ''} ${candidate.name || ''} ${candidate.ariaLabel || ''} ${candidate.title || ''} ${candidate.value || ''}`)
  if (DESTRUCTIVE_WORDS.some((word) => new RegExp(`(^|[^a-z])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`).test(words))) return 'destructive label'
  if (candidate.href && DESTRUCTIVE_HREF.some((rule) => rule.test(candidate.href))) return 'destructive link'
  if (candidate.href && UNSAFE_SCHEMES.test(candidate.href)) return 'non-web link'
  if (candidate.download) return 'download'
  if (candidate.formMethod && candidate.formMethod !== 'get' && candidate.inputType === 'submit') return 'non-GET form submit'
  return null
}

// Only the site under test: external links are recorded, never followed.
export function isSameOrigin(href, origin) {
  try {
    return new URL(href, origin).origin === origin
  } catch {
    return false
  }
}
