import { create } from 'zustand'
import { storage } from '@shared/lib/storage'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  subdomain: string | null
  login: (token: string, subdomain: string) => void
  logout: () => void
  init: () => void
}

const initialToken = storage.getToken()
const initialSubdomain = storage.getSubdomain()

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(initialToken && initialSubdomain),
  token: initialToken,
  subdomain: initialSubdomain,

  login: (token: string, subdomain: string) => {
    storage.setToken(token)
    storage.setSubdomain(subdomain)
    set({
      isAuthenticated: true,
      token,
      subdomain,
    })
  },

  logout: () => {
    storage.clear()
    set({
      isAuthenticated: false,
      token: null,
      subdomain: null,
    })
  },

  init: () => {
    const token = storage.getToken()
    const subdomain = storage.getSubdomain()
    if (token && subdomain) {
      set({
        isAuthenticated: true,
        token,
        subdomain,
      })
    }
  },
}))
