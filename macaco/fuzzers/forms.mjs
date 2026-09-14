// Form policy. Search forms and search boxes may be filled and submitted
// (GET, read-only). Any other form is only typed into — never submitted —
// and auth or account forms are not touched at all.
import { isAuthForm } from '../guards/auth.mjs'

export function formPolicy(candidate, path) {
  if (candidate.form && isAuthForm(candidate.form)) return 'skip'
  if (/^\/(login|register|account|admin|reset-password|verify-email)/.test(path)) return 'skip'
  if (candidate.kind === 'search') return 'fill-and-submit'
  if (candidate.form && (candidate.form.role === 'search' || /search/.test(candidate.form.action || ''))) return 'fill-and-submit'
  if (candidate.formMethod && candidate.formMethod !== 'get') return 'fill-only'
  return 'fill-only'
}
