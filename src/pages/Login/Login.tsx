import { useState, useEffect } from 'react'
import { Layout, Form, Input, Button, Typography, App, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@features/auth/api/authApi'
import { useAuthStore } from '@features/auth/model/authStore'
import { useLanguage } from '@shared/contexts/useLanguage'
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher'
import { ThemeToggle } from '@shared/components/ThemeToggle'
import { env } from '@shared/config/env'
import type { AuthRequest } from '@shared/types/api'

const { Content } = Layout
const { Title, Text } = Typography

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { message } = App.useApp()
  const { t } = useLanguage()

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }
    checkResponsive()
    window.addEventListener('resize', checkResponsive)
    return () => window.removeEventListener('resize', checkResponsive)
  }, [])

  const onFinish = async (values: AuthRequest) => {
    try {
      setLoading(true)
      const response = await authApi.login(values)
      login(response.token, values.subdomain)
      message.success(t('login.success'))
      navigate('/products')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('login.error')
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header with language and theme controls */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? 16 : 24,
          right: isMobile ? 16 : 24,
          zIndex: 1000,
        }}
      >
        <Space>
          <LanguageSwitcher isMobile={isMobile} />
          <ThemeToggle />
        </Space>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: '100vh',
        }}
      >
        {/* Left Section - Branding */}
        {!isMobile && (
          <div
            style={{
              width: isTablet ? '40%' : '50%',
              background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f2ff 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: isTablet ? '40px' : '60px',
              position: 'relative',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                maxWidth: 400,
                width: '100%',
              }}
            >
              <img
                src="/favicon.svg"
                alt="OX Logo"
                style={{
                  width: isTablet ? 120 : 140,
                  height: isTablet ? 120 : 140,
                  objectFit: 'contain',
                  marginBottom: 24,
                }}
              />
              <Title
                level={1}
                style={{
                  margin: 0,
                  marginBottom: 16,
                  fontWeight: 600,
                  fontSize: isTablet ? 32 : 40,
                  color: '#0B2338',
                }}
              >
                {t('login.branding.title')}
              </Title>
              <Text
                style={{
                  fontSize: isTablet ? 15 : 16,
                  color: '#595959',
                  lineHeight: 1.6,
                }}
              >
                {t('login.branding.subtitle')}
              </Text>
            </div>
          </div>
        )}

        {/* Right Section - Form */}
        <Content
          style={{
            width: isMobile ? '100%' : isTablet ? '60%' : '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '32px 24px' : isTablet ? '48px' : '60px',
          }}
        >
          {isMobile && (
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <img
                src="/favicon.svg"
                alt="OX Logo"
                style={{
                  width: 72,
                  height: 72,
                  objectFit: 'contain',
                  marginBottom: 16,
                }}
              />
              <Title level={3} style={{ margin: 0, fontWeight: 600 }}>
                {env.appTitle}
              </Title>
            </div>
          )}

          <div
            style={{
              width: '100%',
              maxWidth: isMobile ? '100%' : isTablet ? 420 : 440,
            }}
          >
            <div style={{ marginBottom: 32 }}>
              <Title
                level={2}
                style={{
                  margin: 0,
                  marginBottom: 8,
                  fontWeight: 600,
                  fontSize: isMobile ? 24 : 28,
                }}
              >
                {t('login.welcome')}
              </Title>
              <Text
                style={{
                  color: '#8c8c8c',
                  fontSize: isMobile ? 14 : 16,
                }}
              >
                {t('login.subtitle')}
              </Text>
            </div>

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label={<span style={{ fontWeight: 500 }}>{t('login.subdomain')}</span>}
                name="subdomain"
                rules={[{ required: true, message: t('login.subdomain.required') }]}
                style={{ marginBottom: 20 }}
              >
                <Input placeholder={t('login.subdomain.placeholder')} />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>{t('login.username')}</span>}
                name="username"
                rules={[{ required: true, message: t('login.username.required') }]}
                style={{ marginBottom: 20 }}
              >
                <Input placeholder={t('login.username.placeholder')} />
              </Form.Item>

              <Form.Item
                label={<span style={{ fontWeight: 500 }}>{t('login.password')}</span>}
                name="password"
                rules={[{ required: true, message: t('login.password.required') }]}
                style={{ marginBottom: 20 }}
              >
                <Input.Password placeholder={t('login.password.placeholder')} />
              </Form.Item>

              <Form.Item style={{ marginTop: 8, marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  size="large"
                  style={{
                    height: 44,
                    borderRadius: 8,
                    fontWeight: 500,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {t('login.submit')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </div>
    </Layout>
  )
}
