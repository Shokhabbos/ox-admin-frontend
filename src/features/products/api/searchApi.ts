import { apiClient } from '@shared/lib/axios'
import { Product, ProductsResponse } from '@shared/types/api'

export const searchApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const allProducts: Product[] = []
    let page = 1
    const pageSize = 100
    let hasMore = true

    while (hasMore) {
      const response = await apiClient.get<ProductsResponse>('/variations', {
        params: { page, pageSize },
      })

      if (response.data.items && response.data.items.length > 0) {
        allProducts.push(...response.data.items)
        hasMore = response.data.items.length === pageSize
        page++
      } else {
        hasMore = false
      }
    }

    return allProducts
  },
}
