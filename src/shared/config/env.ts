export const env = {
  apiDomain: import.meta.env.VITE_API_DOMAIN || 'ox-sys.com',
  appTitle: import.meta.env.VITE_APP_TITLE || 'OX Admin Panel',
} as const
