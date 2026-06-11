import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { tr } from './tr'
import { en } from './en'

const DICTS = { tr, en }
const LangContext = createContext(null)

function resolve(dict, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), dict)
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('lang')
      if (saved === 'tr' || saved === 'en') return saved
    }
    return 'tr'
  })

  const change = useCallback((next) => {
    setLang(next)
    try {
      localStorage.setItem('lang', next)
      document.documentElement.lang = next
    } catch {
      // ignore storage errors
    }
  }, [])

  const toggle = useCallback(() => change(lang === 'tr' ? 'en' : 'tr'), [lang, change])

  const t = useCallback(
    (path) => {
      const value = resolve(DICTS[lang], path)
      if (value == null) return resolve(DICTS.tr, path) ?? path
      return value
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang: change, toggle, t }), [lang, change, toggle, t])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

// Convenience hook: const t = useT()
export function useT() {
  return useLang().t
}
