'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
type ThemeContextType = [Theme, () => void]

const ThemeContext = createContext<ThemeContextType>(['light', () => {}])

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Sync the DOM `data-theme` attribute to the resolved initial theme on
    // mount. Without this, the inline default-dark script and React state
    // can disagree: e.g., user on a light-mode OS sees the page rendered
    // dark (from the inline script) but React state is "light", so the
    // toggle icon shows Moon and the first click only flips state+icon to
    // "dark" — same dark page, no visible change. Forcing the attribute
    // to match state ensures icon and rendered theme are aligned.
    const initial = getInitialTheme()
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {mounted ? children : children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext)
}
