import { Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useLanguage } from '@shared/contexts/useLanguage'
import type { Language } from '@shared/contexts/languageContextDef'

const languageLabels: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
  uz: "O'zbek",
}

export const LanguageSwitcher = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { language, setLanguage } = useLanguage()

  const items: MenuProps['items'] = [
    {
      key: 'en',
      label: languageLabels.en,
      onClick: () => setLanguage('en'),
    },
    {
      key: 'ru',
      label: languageLabels.ru,
      onClick: () => setLanguage('ru'),
    },
    {
      key: 'uz',
      label: languageLabels.uz,
      onClick: () => setLanguage('uz'),
    },
  ]

  return (
    <Dropdown menu={{ items, selectedKeys: [language] }} placement="bottomRight">
      <Button
        type="text"
        icon={<GlobalOutlined />}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          transition: 'all 0.15s ease',
        }}
      >
        {!isMobile && <span style={{ fontSize: 13 }}>{language.toUpperCase()}</span>}
      </Button>
    </Dropdown>
  )
}
