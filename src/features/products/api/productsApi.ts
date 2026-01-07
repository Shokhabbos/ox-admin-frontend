import { apiClient } from '@shared/lib/axios'
import { ProductsRequest, ProductsResponse } from '@shared/types/api'

export const productsApi = {
  getProducts: async (params: ProductsRequest): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/variations', {
      params,
    })
    return response.data
  },
}
