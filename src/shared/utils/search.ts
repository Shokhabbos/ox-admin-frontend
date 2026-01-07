import { Product } from '../types/api'

export interface SearchResult {
  product: Product
  matchType: 'starts-with' | 'contains'
}

export const searchProducts = (products: Product[], query: string): Product[] => {
  if (!query.trim()) {
    return products
  }

  const normalizedQuery = query.toLowerCase().trim()
  const results: SearchResult[] = []

  products.forEach((product) => {
    const name = product.name?.toLowerCase() || ''

    if (name.startsWith(normalizedQuery)) {
      results.push({ product, matchType: 'starts-with' })
    } else if (name.includes(normalizedQuery)) {
      results.push({ product, matchType: 'contains' })
    }
  })

  results.sort((a, b) => {
    if (a.matchType !== b.matchType) {
      return a.matchType === 'starts-with' ? -1 : 1
    }
    return a.product.name.localeCompare(b.product.name)
  })

  return results.map((result) => result.product)
}
