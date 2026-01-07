import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, theme, App as AntApp } from 'antd'
import { useAuthStore } from '@features/auth/model/authStore'
import { AuthGuard } from './providers/AuthGuard'
import { AppLayout } from './providers/AppLayout'
import { Login } from '@pages/Login/Login'
import { Products } from '@pages/Products/Products'
import { Search } from '@pages/Search/Search'

export const App = () => {
  const init = useAuthStore((state) => state.init)

  useEffect(() => {
    init()
  }, [init])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#165DF5',
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AntApp>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/products"
              element={
                <AuthGuard>
                  <AppLayout>
                    <Products />
                  </AppLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/search"
              element={
                <AuthGuard>
                  <AppLayout>
                    <Search />
                  </AppLayout>
                </AuthGuard>
              }
            />
            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  )
}
