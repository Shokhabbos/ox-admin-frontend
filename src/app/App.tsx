import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, theme, App as AntApp } from 'antd'
import ruRU from 'antd/locale/ru_RU'
import enUS from 'antd/locale/en_US'
import { useAuthStore } from '@features/auth/model/authStore'
import { LanguageProvider } from '@shared/contexts/LanguageContext'
import { useLanguage } from '@shared/contexts/useLanguage'
import { ThemeProvider } from '@shared/contexts/ThemeContext'
import { useTheme } from '@shared/contexts/useTheme'
import { AuthGuard } from './providers/AuthGuard'
import { AppLayout } from './providers/AppLayout'
import { Login } from '@pages/Login/Login'
import { Products } from '@pages/Products/Products'
import { Search } from '@pages/Search/Search'

const AppContent = () => {
  const init = useAuthStore((state) => state.init)
  const { actualTheme } = useTheme()
  const { language } = useLanguage()

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    // Set data-theme attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', actualTheme)
  }, [actualTheme])

  // Get Ant Design locale based on language
  const getAntdLocale = () => {
    if (language === 'ru') return ruRU
    if (language === 'uz') {
      // Custom locale for Uzbek (uzbek doesn't have official locale, using Russian as base)
      return {
        ...ruRU,
        Pagination: {
          ...ruRU.Pagination,
          items_per_page: ' / sahifa',
        },
      }
    }
    return enUS
  }

  return (
    <ConfigProvider
      locale={getAntdLocale()}
      theme={{
        token: {
          colorPrimary: '#165DF5',
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        algorithm: actualTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
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

export const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
