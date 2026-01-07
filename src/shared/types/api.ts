export interface AuthRequest {
  username: string
  password: string
  subdomain: string
}

export interface AuthResponse {
  token: string
  lifetime: number
}

export interface AuthErrorResponse {
  code: number
  message: string
}

export interface Product {
  id: number
  name: string
  description?: string
  price?: number
  sku?: string
  [key: string]: unknown
}

export interface ProductsResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
}

export interface ProductsRequest {
  page: number
  pageSize: number
}
