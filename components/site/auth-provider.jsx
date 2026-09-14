'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [capabilities, setCapabilities] = useState({ emailDelivery: false })
  const csrfRef = useRef('')
  const botChallengeRef = useRef('')
  const loadPromise = useRef(null)

  const refresh = useCallback(async () => {
    if (!loadPromise.current) {
      loadPromise.current = fetch('/api/auth/session', { credentials: 'same-origin', cache: 'no-store' })
        .then(async (response) => {
          const data = await response.json()
          if (!response.ok) throw new Error(data.error || 'Could not load session.')
          csrfRef.current = data.csrfToken || ''
          botChallengeRef.current = data.botChallenge || ''
          setUser(data.user || null)
          setSession(data.session || null)
          setCapabilities(data.capabilities || { emailDelivery: false })
          return data
        })
        .finally(() => { loadPromise.current = null; setLoading(false) })
    }
    return loadPromise.current
  }, [])

  useEffect(() => { refresh().catch(() => setLoading(false)) }, [refresh])

  useEffect(() => {
    const compact = Boolean(user?.wikiPreferences?.compactMode)
    document.documentElement.classList.toggle('wiki-density-compact', compact)
    return () => document.documentElement.classList.remove('wiki-density-compact')
  }, [user?.wikiPreferences?.compactMode])

  useEffect(() => {
    const reducedMotion = Boolean(user?.wikiPreferences?.reducedMotion)
    document.documentElement.classList.toggle('wiki-reduced-motion', reducedMotion)
    return () => document.documentElement.classList.remove('wiki-reduced-motion')
  }, [user?.wikiPreferences?.reducedMotion])

  const request = useCallback(async (path, { method = 'POST', body = {}, retry = true } = {}) => {
    if (!csrfRef.current) await refresh()
    const challengeProtected = ['register', 'login', 'forgot-password'].includes(path)
    const requestBody = challengeProtected ? { ...body, _challenge: botChallengeRef.current } : body
    const response = await fetch(`/api/auth/${path}`, {
      method,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrfRef.current },
      body: JSON.stringify(requestBody),
    })
    const data = await response.json().catch(() => ({ ok: false, error: 'Invalid server response.' }))
    if (response.status === 403 && data.code === 'CSRF_REJECTED' && retry) {
      csrfRef.current = ''
      await refresh()
      return request(path, { method, body, retry: false })
    }
    if (response.status === 403 && data.code === 'BOT_CHALLENGE_REJECTED' && retry) {
      botChallengeRef.current = ''
      await refresh()
      // A freshly issued challenge must age briefly before use. This keeps
      // the lightweight bot check effective without making a real user retry.
      await new Promise((resolve) => window.setTimeout(resolve, 550))
      return request(path, { method, body, retry: false })
    }
    if (!response.ok) {
      const error = new Error(data.error || 'Request failed.')
      error.code = data.code
      error.status = response.status
      throw error
    }
    if (Object.prototype.hasOwnProperty.call(data, 'user')) setUser(data.user || null)
    if (Object.prototype.hasOwnProperty.call(data, 'session')) setSession(data.session || null)
    if (path === 'logout' || path === 'logout-all' || data.currentRevoked) { setUser(null); setSession(null) }
    return data
  }, [refresh])

  const value = useMemo(() => ({ user, session, loading, capabilities, refresh, request, setUser }), [user, session, loading, capabilities, refresh, request])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
