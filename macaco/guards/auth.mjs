// Authentication guard. The Macaco explores as an anonymous visitor: it can
// look at sign-in and account pages (that is how it finds private pages that
// should not be public), but it never types into or submits auth forms.

const AUTH_PATHS = [/^\/login/i, /^\/register/i, /^\/signup/i, /^\/reset-password/i, /^\/verify-email/i, /^\/account/i, /^\/admin/i]

export const isAuthPage = (path) => AUTH_PATHS.some((rule) => rule.test(path || ''))

// A form is off-limits when it looks like authentication or account data.
export function isAuthForm(form) {
  if (!form) return false
  if (form.hasPassword) return true
  const hay = `${form.action || ''} ${form.id || ''} ${form.name || ''} ${form.label || ''}`.toLowerCase()
  return /login|log-in|sign.?in|sign.?up|register|password|account|admin|auth|otp|token/.test(hay)
}

// Pages that must not be reachable without a session. The security probe
// asks for each one anonymously and expects a redirect, 401/403 or 404.
export const PRIVATE_PATHS = ['/account', '/admin', '/api/auth/wiki-dashboard', '/api/admin', '/api/auth/me']
