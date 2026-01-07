import { createContext } from 'react'

export type Language = 'en' | 'ru' | 'uz'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
