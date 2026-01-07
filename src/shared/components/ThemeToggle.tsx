import { Button } from 'antd'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { useTheme } from '@shared/contexts/useTheme'

export const ThemeToggle = () => {
  const { actualTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (actualTheme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button
      type="text"
      icon={actualTheme === 'light' ? <MoonOutlined /> : <SunOutlined />}
      onClick={toggleTheme}
      style={{
        transition: 'all 0.15s ease',
      }}
      title={actualTheme === 'light' ? 'Dark mode' : 'Light mode'}
    />
  )
}
