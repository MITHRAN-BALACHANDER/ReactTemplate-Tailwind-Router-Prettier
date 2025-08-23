# React TypeScript Template

A modern, production-ready React template built with **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router**. This template provides a solid foundation for building type-safe React applications with modern tooling and best practices.

## ✨ Features

- ⚡ **Lightning Fast**: Powered by Vite for instant HMR and optimized builds
- 🔷 **TypeScript**: Full TypeScript support with strict type checking
- 🎨 **Tailwind CSS**: Utility-first CSS framework with dark mode support
- 🧭 **React Router**: Client-side routing with active state management
- 🌙 **Dark Mode**: Built-in theme system with persistent user preferences
- 📱 **Responsive**: Mobile-first design with modern UI components
- 🔧 **Modern Tooling**: ESLint, Prettier, and TypeScript configured
- 🚀 **Production Ready**: Optimized build configuration

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.0+ | UI library with modern hooks |
| [TypeScript](https://www.typescriptlang.org/) | 5.6+ | Type-safe JavaScript |
| [Vite](https://vitejs.dev/) | 7.1+ | Build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1+ | Utility-first CSS framework |
| [React Router](https://reactrouter.com/) | 6.27+ | Client-side routing |
| [Lucide React](https://lucide.dev/) | 0.263+ | Beautiful icon library |

## 🚀 Quick Start

### Using the CLI

```bash
# Create a new TypeScript project
npx create-react-tailwind-app-router my-app --template typescript

# Navigate to your project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Manual Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-typescript-template.git my-app

# Navigate to the project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view your application.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production with TypeScript compilation |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/             # UI components (Button, Card)
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── About.tsx       # About page
│   └── Contact.tsx     # Contact page
├── context/            # React context providers
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   └── useTheme.ts     # Theme-related hooks
├── services/           # API and external services
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types and interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Styling

This template uses **Tailwind CSS** for styling with the following features:

- **Dark Mode**: Class-based dark mode with user preference persistence
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Custom Components**: Pre-built component classes in `index.css`
- **Type-Safe Styling**: TypeScript integration for className props

### Theme System

The template includes a complete theme management system:

```typescript
import { useTheme } from './hooks/useTheme'

function MyComponent() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## 🔧 TypeScript Configuration

The template includes a comprehensive TypeScript setup:

- **Strict Mode**: Enabled for maximum type safety
- **Path Mapping**: Configured for clean imports
- **React JSX**: Optimized for React 19
- **Modern Target**: ES2020 with latest features

### Type Definitions

All components include proper TypeScript interfaces:

```typescript
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', disabled }) => {
  // Component implementation
}
```

## 🧭 Routing

React Router v6 is configured with:

- **File-based Organization**: Pages in `src/pages/`
- **Active States**: Automatic active link styling
- **Type Safety**: TypeScript-integrated navigation
- **Nested Routing**: Support for complex route structures

## 🌙 Dark Mode

Built-in dark mode support with:

- **System Preference Detection**: Automatically detects user's system theme
- **Persistent Storage**: Remembers user's theme choice
- **Smooth Transitions**: Animated theme switching
- **Component Integration**: Theme-aware styling throughout

## 📦 Build & Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build outputs to `dist/` directory with:
- Optimized and minified code
- TypeScript compilation
- CSS purging and optimization
- Asset optimization

### Deployment

The template works with any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use GitHub Actions workflow
- **AWS S3**: Upload `dist/` contents

## 🔍 Code Quality

### ESLint Configuration

- TypeScript-specific rules
- React hooks rules
- Accessibility checks
- Performance optimizations

### Prettier Configuration

- Consistent code formatting
- TypeScript support
- Tailwind CSS class sorting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for the amazing library
- [Vite Team](https://vitejs.dev/) for the blazing fast build tool
- [Tailwind Labs](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**Happy coding!** 🚀

Built with ❤️ and TypeScript
