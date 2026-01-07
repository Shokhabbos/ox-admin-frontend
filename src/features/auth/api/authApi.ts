import axios, { AxiosError } from 'axios'
import { AuthRequest, AuthResponse, AuthErrorResponse } from '@shared/types/api'
import { env } from '@shared/config/env'

export const authApi = {
  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const formData = new URLSearchParams()
    formData.append('_username', credentials.username)
    formData.append('_password', credentials.password)
    formData.append('_subdomain', credentials.subdomain)

    try {
      const response = await axios.post<AuthResponse>(
        `https://${credentials.subdomain}.${env.apiDomain}/security/auth_check`,
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AuthErrorResponse>
        if (axiosError.response?.data) {
          throw new Error(axiosError.response.data.message || 'Authentication failed')
        }
      }
      throw error
    }
  },
}
