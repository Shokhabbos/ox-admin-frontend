const TOKEN_KEY = 'token'
const SUBDOMAIN_KEY = 'subdomain'
const LANGUAGE_KEY = 'language'
const THEME_KEY = 'theme'

export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY)
  },

  getSubdomain: (): string | null => {
    return localStorage.getItem(SUBDOMAIN_KEY)
  },

  setSubdomain: (subdomain: string): void => {
    localStorage.setItem(SUBDOMAIN_KEY, subdomain)
  },

  removeSubdomain: (): void => {
    localStorage.removeItem(SUBDOMAIN_KEY)
  },

  getLanguage: (): string | null => {
    return localStorage.getItem(LANGUAGE_KEY)
  },

  setLanguage: (language: string): void => {
    localStorage.setItem(LANGUAGE_KEY, language)
  },

  getTheme: (): string | null => {
    return localStorage.getItem(THEME_KEY)
  },

  setTheme: (theme: string): void => {
    localStorage.setItem(THEME_KEY, theme)
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(SUBDOMAIN_KEY)
  },
}
