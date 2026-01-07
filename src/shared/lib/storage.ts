const TOKEN_KEY = 'token'
const SUBDOMAIN_KEY = 'subdomain'

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

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(SUBDOMAIN_KEY)
  },
}
