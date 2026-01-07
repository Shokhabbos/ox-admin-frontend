import React, { useState, useEffect, ReactNode } from 'react'
import { storage } from '../lib/storage'
import en from '../locales/en.json'
import ru from '../locales/ru.json'
import uz from '../locales/uz.json'
import { LanguageContext, type Language } from './languageContextDef'

const translations: Record<Language, Record<string, string>> = {
  en,
  ru,
  uz,
}

const getDefaultLanguage = (): Language => {
  const saved = storage.getLanguage()
  if (saved && (saved === 'en' || saved === 'ru' || saved === 'uz')) {
    return saved as Language
  }
  // Try to detect from browser
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('ru')) return 'ru'
  if (browserLang.startsWith('uz')) return 'uz'
  return 'en'
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(getDefaultLanguage)

  useEffect(() => {
    const saved = storage.getLanguage()
    if (saved && (saved === 'en' || saved === 'ru' || saved === 'uz')) {
      setLanguageState(saved as Language)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    storage.setLanguage(lang)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value))
      })
    }
    return translation
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
