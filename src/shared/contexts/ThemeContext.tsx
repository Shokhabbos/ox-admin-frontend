import React, { useState, useEffect, ReactNode } from 'react'
import { storage } from '../lib/storage'
import { ThemeContext, type Theme } from './themeContextDef'

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const getDefaultTheme = (): Theme => {
  const saved = storage.getTheme()
  if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
    return saved as Theme
  }
  return 'system'
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(getDefaultTheme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme)

  useEffect(() => {
    const saved = storage.getTheme()
    if (saved && (saved === 'light' || saved === 'dark' || saved === 'system')) {
      setThemeState(saved as Theme)
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    storage.setTheme(newTheme)
  }

  const actualTheme: 'light' | 'dark' = theme === 'system' ? systemTheme : theme

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
