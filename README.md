# OX Admin Panel

## Tech Stack

- React 18
- Vite
- TypeScript
- Ant Design
- React Router v6
- Axios
- Zustand
- Husky (Git hooks)

## Architecture

Feature-Sliced Design (simplified):
- `app/` - Application setup, providers, routing
- `pages/` - Page components
- `features/` - Feature modules (auth, products)
- `shared/` - Shared utilities, types, libs

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_DOMAIN=ox-sys.com

# App Configuration
VITE_APP_TITLE=OX Admin Panel
```

**Note:** `.env.local` is gitignored. Use `.env.example` as a template.

## Features

1. **Authentication**
   - Login with username, password, and subdomain
   - Token stored in localStorage
   - Zustand for state management
   - Axios interceptors for automatic token injection

2. **Products Page**
   - Server-side pagination
   - Ant Design Table
   - Protected route

3. **Search Page**
   - Client-side search
   - Smart sorting (starts with → contains → alphabetical)
   - No API calls during search

## Git Hooks (Husky)

This project uses Husky for Git hooks:

- **pre-commit**: Runs ESLint before committing
- **pre-push**: Runs TypeScript type check before pushing

Hooks are automatically set up when you run `npm install`.

## Deployment

Ready to deploy on Vercel:

```bash
npm run build
```

The `dist` folder contains the production build.

