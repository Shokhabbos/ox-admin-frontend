import { ReactNode, useState, useEffect } from 'react'
import { Layout, Menu, Button, Space, Avatar, Typography } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '@features/auth/model/authStore'
import { useLanguage } from '@shared/contexts/useLanguage'
import { useTheme } from '@shared/contexts/useTheme'
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher'
import { ThemeToggle } from '@shared/components/ThemeToggle'

const { Header, Sider, Content } = Layout
const { Title } = Typography

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const subdomain = useAuthStore((state) => state.subdomain)
  const { t } = useLanguage()
  const { actualTheme } = useTheme()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    {
      key: '/products',
      icon: <ShoppingOutlined />,
      label: t('menu.products'),
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: t('menu.search'),
    },
  ]

  const selectedKey = location.pathname

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
    if (isMobile) {
      setCollapsed(true)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh', height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={isMobile ? 0 : 80}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setIsMobile(broken)
          setCollapsed(broken)
        }}
        style={{
          background: '#0B2338',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          position: isMobile ? 'fixed' : 'relative',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 1000,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <img
            src="/favicon.svg"
            alt="OX Logo"
            style={{
              width: collapsed && !isMobile ? 32 : 40,
              height: collapsed && !isMobile ? 32 : 40,
              objectFit: 'contain',
            }}
          />
        </div>
        <div
          style={{
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              background: '#0B2338',
              borderRight: 'none',
              marginTop: 16,
            }}
          />
        </div>
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header
          style={{
            background: actualTheme === 'dark' ? '#141414' : '#fff',
            padding: isMobile ? '0 16px' : '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow:
              actualTheme === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
            borderBottom: actualTheme === 'dark' ? '1px solid #303030' : '1px solid #f0f0f0',
            position: 'sticky',
            top: 0,
            zIndex: 999,
            width: '100%',
          }}
        >
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 16,
                width: 40,
                height: 40,
              }}
            />
            <Title level={4} style={{ margin: 0, fontWeight: 500, fontSize: isMobile ? 16 : 18 }}>
              {location.pathname === '/products' ? t('header.products') : t('header.search')}
            </Title>
          </Space>
          <Space>
            <LanguageSwitcher isMobile={isMobile} />
            <ThemeToggle />
            <Avatar
              style={{
                background: '#165DF5',
              }}
            >
              {subdomain?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              style={{
                transition: 'all 0.15s ease',
              }}
            >
              {!isMobile && t('header.logout')}
            </Button>
          </Space>
        </Header>
        {isMobile && !collapsed && (
          <div
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.45)',
              zIndex: 999,
            }}
            onClick={() => setCollapsed(true)}
          />
        )}
        <Content
          className="app-content"
          style={{
            margin: isMobile ? '16px' : '24px',
            padding: 0,
            minHeight: 280,
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
