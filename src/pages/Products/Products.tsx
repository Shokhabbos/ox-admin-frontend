import { useState, useEffect, useCallback } from 'react'
import { Table, Card, Skeleton } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { productsApi } from '@features/products/api/productsApi'
import type { Product } from '@shared/types/api'

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const fetchProducts = useCallback(
    async (page: number, size?: number) => {
      try {
        setLoading(true)
        const response = await productsApi.getProducts({
          page,
          pageSize: size || pageSize,
        })
        setProducts(response.items)
        setTotal(response.total)
        setCurrentPage(page)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    },
    [pageSize],
  )

  useEffect(() => {
    void fetchProducts(1)
  }, [fetchProducts])

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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Price',
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
      {loading && products.length === 0 ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <Table
            columns={columns}
            dataSource={products}
            loading={loading}
            rowKey="id"
            scroll={{ x: 'max-content', y: undefined }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              onChange: (page) => fetchProducts(page),
              onShowSizeChange: (_current, size) => {
                setPageSize(size)
                setCurrentPage(1)
                fetchProducts(1, size)
              },
              showTotal: (total) => `Total ${total} items`,
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
