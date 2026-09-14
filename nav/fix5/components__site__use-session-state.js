'use client'

import { useEffect, useState } from 'react'

// useState que sobrevive a Back/Forward dentro da mesma sessão do browser.
// Começa sempre no valor por omissão (o HTML do servidor é o mesmo para
// todos) e só depois lê a sessão, para não haver diferenças de hidratação.
export function useSessionState(key, initial) {
  const storageKey = `gta-lore:${key}`
  const [value, setValue] = useState(initial)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey)
      if (saved !== null) setValue(JSON.parse(saved))
    } catch { /* private browsing can disable storage */ }
  }, [storageKey])
  const update = (next) => setValue((current) => {
    const resolved = typeof next === 'function' ? next(current) : next
    try { sessionStorage.setItem(storageKey, JSON.stringify(resolved)) } catch { /* still works in memory */ }
    return resolved
  })
  return [value, update]
}
