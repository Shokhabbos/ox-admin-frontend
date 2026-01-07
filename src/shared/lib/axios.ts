import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { env } from '@shared/config/env'

const getBaseURL = (): string => {
  const subdomain = localStorage.getItem('subdomain')
  if (!subdomain) {
    throw new Error('Subdomain not found')
  }
  return `https://${subdomain}.${env.apiDomain}`
}

export const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    const subdomain = localStorage.getItem('subdomain')

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (subdomain) {
      config.baseURL = getBaseURL()
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('subdomain')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
