import { useState, useEffect, useMemo } from 'react'
import { Input, Table, Card, Skeleton, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { searchApi } from '@features/products/api/searchApi'
import { useLanguage } from '@shared/contexts/useLanguage'
import { searchProducts } from '@shared/utils/search'
import type { Product } from '@shared/types/api'

const { Text } = Typography

export const Search = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const { t } = useLanguage()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true)
        const products = await searchApi.getAllProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return searchProducts(allProducts, searchQuery)
  }, [searchQuery, allProducts])

  const highlightText = (text: string, query: string) => {
    if (!query.trim() || !text) return text

    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#fffbe6', fontWeight: 500 }}>
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const columns: ColumnsType<Product> = [
    {
      title: '#',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_: unknown, __: Product, index: number) => {
        return (currentPage - 1) * pageSize + index + 1
      },
    },
    {
      title: t('search.table.id'),
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: t('search.table.name'),
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => highlightText(name, searchQuery),
    },
    {
      title: t('search.table.sku'),
      dataIndex: 'sku',
      key: 'sku',
      render: (sku: string) => (sku ? highlightText(sku, searchQuery) : '-'),
    },
    {
      title: t('search.table.price'),
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (price ? `$${price.toFixed(2)}` : '-'),
    },
  ]

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: 'none',
      }}
      styles={{
        body: {
          padding: isMobile ? 16 : 24,
        },
      }}
    >
      <div
        style={{
          marginBottom: 20,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#fff',
          paddingTop: isMobile ? 16 : 24,
          paddingBottom: 12,
          marginTop: isMobile ? -16 : -24,
          marginLeft: isMobile ? -16 : -24,
          marginRight: isMobile ? -16 : -24,
          paddingLeft: isMobile ? 16 : 24,
          paddingRight: isMobile ? 16 : 24,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Input.Search
          placeholder={t('search.placeholder')}
          allowClear
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            borderRadius: 8,
          }}
        />
        {searchQuery && (
          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
            {t('search.found', {
              count: filteredProducts.length,
              results: filteredProducts.length === 1 ? t('search.result') : t('search.results'),
            })}
          </Text>
        )}
      </div>
      {loading && allProducts.length === 0 ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <Table
            columns={columns}
            dataSource={filteredProducts}
            loading={loading && allProducts.length > 0}
            rowKey="id"
            scroll={{ x: 'max-content', y: undefined }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: (page) => {
                setCurrentPage(page)
              },
              onShowSizeChange: (_current, size) => {
                setPageSize(size)
                setCurrentPage(1)
              },
              showTotal: (total) => t('search.pagination.total', { count: total }),
              style: {
                marginTop: 16,
              },
              responsive: true,
            }}
            style={{
              borderRadius: 8,
            }}
          />
        </div>
      )}
    </Card>
  )
}
