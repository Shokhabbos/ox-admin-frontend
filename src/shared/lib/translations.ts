export type Language = 'en' | 'ru' | 'uz'

export interface Translations {
  // Login Page
  login: {
    welcome: string
    subtitle: string
    subdomain: string
    username: string
    password: string
    loginButton: string
    subdomainRequired: string
    usernameRequired: string
    passwordRequired: string
    loginSuccess: string
    loginError: string
  }
  // Header
  header: {
    products: string
    search: string
    searchProducts: string
    logout: string
  }
  // Products Page
  products: {
    title: string
    id: string
    name: string
    sku: string
    price: string
    totalItems: string
  }
  // Search Page
  search: {
    title: string
    placeholder: string
    found: string
    result: string
    results: string
    totalItems: string
  }
  // Common
  common: {
    empty: string
    loading: string
  }
}

const translations: Record<Language, Translations> = {
  en: {
    login: {
      welcome: 'Welcome back',
      subtitle: 'Enter your credentials to sign in',
      subdomain: 'Subdomain',
      username: 'Username',
      password: 'Password',
      loginButton: 'Sign In',
      subdomainRequired: 'Please enter subdomain',
      usernameRequired: 'Please enter username',
      passwordRequired: 'Please enter password',
      loginSuccess: 'Successfully signed in',
      loginError: 'Username or password is incorrect',
    },
    header: {
      products: 'Products',
      search: 'Search',
      searchProducts: 'Search Products',
      logout: 'Logout',
    },
    products: {
      title: 'Products',
      id: 'ID',
      name: 'Name',
      sku: 'SKU',
      price: 'Price',
      totalItems: 'Total {total} items',
    },
    search: {
      title: 'Search Products',
      placeholder: 'Search products by name or SKU...',
      found: 'Found',
      result: 'result',
      results: 'results',
      totalItems: 'Total {total} items',
    },
    common: {
      empty: 'No data',
      loading: 'Loading...',
    },
  },
  ru: {
    login: {
      welcome: 'Добро пожаловать',
      subtitle: 'Введите свои данные для входа',
      subdomain: 'Поддомен',
      username: 'Имя пользователя',
      password: 'Пароль',
      loginButton: 'Войти',
      subdomainRequired: 'Пожалуйста, введите поддомен',
      usernameRequired: 'Пожалуйста, введите имя пользователя',
      passwordRequired: 'Пожалуйста, введите пароль',
      loginSuccess: 'Успешный вход',
      loginError: 'Неверное имя пользователя или пароль',
    },
    header: {
      products: 'Товары',
      search: 'Поиск',
      searchProducts: 'Поиск товаров',
      logout: 'Выйти',
    },
    products: {
      title: 'Товары',
      id: 'ID',
      name: 'Название',
      sku: 'SKU',
      price: 'Цена',
      totalItems: 'Всего {total} элементов',
    },
    search: {
      title: 'Поиск товаров',
      placeholder: 'Поиск товаров по названию или SKU...',
      found: 'Найдено',
      result: 'результат',
      results: 'результатов',
      totalItems: 'Всего {total} элементов',
    },
    common: {
      empty: 'Нет данных',
      loading: 'Загрузка...',
    },
  },
  uz: {
    login: {
      welcome: 'Xush kelibsiz',
      subtitle: "Tizimga kirish uchun ma'lumotlaringizni kiriting",
      subdomain: 'Subdomain',
      username: 'Username',
      password: 'Parol',
      loginButton: 'Kirish',
      subdomainRequired: 'Subdomain kiriting',
      usernameRequired: 'Username kiriting',
      passwordRequired: 'Parol kiriting',
      loginSuccess: 'Muvaffaqiyatli kirildi',
      loginError: "Login yoki parol noto'g'ri",
    },
    header: {
      products: 'Mahsulotlar',
      search: 'Qidiruv',
      searchProducts: 'Mahsulotlarni qidirish',
      logout: 'Chiqish',
    },
    products: {
      title: 'Mahsulotlar',
      id: 'ID',
      name: 'Nomi',
      sku: 'SKU',
      price: 'Narxi',
      totalItems: 'Jami {total} ta',
    },
    search: {
      title: 'Mahsulotlarni qidirish',
      placeholder: "Mahsulotlarni nomi yoki SKU bo'yicha qidiring...",
      found: 'Topildi',
      result: 'natija',
      results: 'natija',
      totalItems: 'Jami {total} ta',
    },
    common: {
      empty: "Ma'lumot yo'q",
      loading: 'Yuklanmoqda...',
    },
  },
}

export const getTranslations = (lang: Language): Translations => {
  return translations[lang]
}

export const formatTranslation = (
  text: string,
  params: Record<string, string | number>,
): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value))
  }, text)
}
