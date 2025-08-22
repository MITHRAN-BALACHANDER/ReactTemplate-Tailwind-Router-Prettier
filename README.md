# Create React Tailwind App Router

A co### 🏗️ **Archit### 🔧 **Configuration Files**
- 📋 **ESLint Configuration** - React-specific rules with Prettier integration
- 🎨 **Prettier Configuration** - Consistent formatting across the project
- 🏗️ **Vite Configuration** - Optimized for development and production
- 🎯 **Tailwind Configuration** - Content purging, dark mode support, and custom theme setup
- 📦 **PostCSS Configuration** - Plugin setup for Tailwind and Autoprefixer
- 🚫 **Ignore Files** - Git, Prettier, and ESLint ignore configurations
- 💼 **VS Code Settings** - Recommended extensions and workspace configuration Organization**
- 🧩 **Component Architecture** - Organized layout and UI component structure with theme support
- 🪝 **Custom Hooks** - Reusable logic with localStorage, debounce, and window size hooks
- 🌐 **Context API** - Global state management with theme handling and reducer pattern
- 🔗 **Service Layer** - API integration with error handling and authentication patterns
- 🛠️ **Utility Functions** - Helper functions for common operations and theme management
- 📝 **Constants Management** - Centralized configuration and theme constants
- 🏷️ **Type Definitions** - JSDoc annotations ready for TypeScript migrationive CLI tool and npm package that creates a modern, production-ready React application with Vite, React Router, Tailwind CSS, Prettier, ESLint, **dark/light mode theming**, and comprehensive educational documentation pre-configured and ready to use.

## ✨ Features

### 🏗️ **Core Technologies**
- ⚡ **Vite 7.1+** - Lightning fast build tool with instant HMR and optimized production builds
- ⚛️ **React 19** - Latest React with modern hooks, concurrent features, and automatic batching
- 🧭 **React Router 6.27+** - Declarative client-side routing with nested routes support
- 🎨 **Tailwind CSS 4.1+** - Utility-first CSS framework with dark mode support and Vite plugin integration
- ✨ **Prettier 3.3+** - Automatic code formatting with opinionated defaults
- 📦 **ESLint 9.33+** - Advanced code linting with React-specific rules and Prettier integration
- 🔧 **SWC Compiler** - Super-fast JavaScript/TypeScript compiler for faster builds
- 🎯 **Lucide React 0.263+** - Beautiful, customizable icons with TypeScript support

### 🌓 **Theme System & UI**
- 🌙 **Dark/Light Mode Toggle** - Complete theme switching with localStorage persistence
- 🎨 **Theme-Aware Components** - All components automatically adapt to current theme
- 🌈 **Dynamic Styling** - Real-time color scheme updates across entire application
- 🎯 **Accessible Theme Controls** - Keyboard navigation and screen reader support
- 💫 **Smooth Transitions** - Elegant animations between theme changes
- 📱 **Responsive Design** - Beautiful layouts that work on all devices in both themes

### 🛡️ **Development Experience**
- 🚀 **Fast Development Server** - Instant startup and hot module replacement
- 🎯 **Type Safety Ready** - Pre-configured for easy TypeScript adoption
- 📱 **Mobile-First Design** - Responsive layouts out of the box
- 🔍 **Code Quality Tools** - ESLint + Prettier integration for consistent code style
- 🏗️ **Production Optimized** - Tree-shaking, code splitting, and asset optimization
- 📦 **Modern Build Setup** - ES modules, dynamic imports, and optimized bundles
- 📚 **Educational Documentation** - Comprehensive JSDoc comments and learning examples

### 🎨 **UI Components & Styling**
- 🧭 **Smart Navigation System** - Responsive navbar with theme toggle and active state management
- 📄 **Pre-built Pages** - Home, About, and Contact pages with modern design and theme awareness
- 🎯 **Tailwind Integration** - Configured with dark mode support and JIT compilation
- 📱 **Responsive Design** - Mobile-first approach with breakpoint utilities
- 🎨 **Design System Ready** - Easily customizable color palette with theme variables
- ✨ **Interactive Elements** - Hover states, focus management, and smooth transitions
- 🔧 **Reusable Components** - Theme-aware UI component library with accessibility features

### 🏗️ **Architecture & Organization**
- 🧩 **Component Architecture** - Organized layout and UI component structure
- 🪝 **Custom Hooks** - Reusable logic with localStorage, debounce, and window size hooks
- 🌐 **Context API** - Global state management with reducer pattern
- � **Service Layer** - API integration with error handling and authentication patterns
- 🛠️ **Utility Functions** - Helper functions for common operations
- 📝 **Constants Management** - Centralized configuration and constants
- 🏷️ **Type Definitions** - JSDoc annotations ready for TypeScript migration

### �🔧 **Configuration Files**
- 📋 **ESLint Configuration** - React-specific rules with Prettier integration
- 🎨 **Prettier Configuration** - Consistent formatting across the project
- 🏗️ **Vite Configuration** - Optimized for development and production
- 🎯 **Tailwind Configuration** - Content purging and custom theme setup
- 📦 **PostCSS Configuration** - Plugin setup for Tailwind and Autoprefixer
- 🚫 **Ignore Files** - Git, Prettier, and ESLint ignore configurations
- 💼 **VS Code Settings** - Recommended extensions and workspace configuration

## Installation & Usage

### Quick Start (Recommended)

Create a new React app using npx - no installation required:

```bash
npx create-react-tailwind-app-router my-react-app
```

### Navigate to your project and start developing

```bash
cd my-react-app
npm install
npm run dev
```

That's it! Your React app with Vite, React Router, Tailwind CSS, and comprehensive documentation is ready to go.

## 📁 Complete Project Structure

The generated project includes a comprehensive, well-organized structure:

```
my-react-app/
├── 📁 public/                          # Static assets and favicon
├── 📁 src/
│   ├── 📄 App.jsx                      # Main app component with routing setup
│   ├── 📄 main.jsx                     # Application entry point with React 19
│   ├── 📄 index.css                    # Global styles with Tailwind imports
│   │
│   ├── 📁 components/                  # Reusable React components
│   │   ├── 📄 index.js                # Component barrel exports
│   │   ├── 📁 layout/                 # Layout-related components
│   │   │   ├── 📄 index.jsx           # Layout components (Header, Footer, etc.)
│   │   │   └── 📄 Navbar.jsx          # Responsive navigation with theme toggle and Router integration
│   │   └── 📁 ui/                     # Reusable UI components
│   │       ├── 📄 index.jsx           # UI library (Button, Input, Modal, etc.)
│   │       └── 📄 ThemeToggle.jsx     # Dark/Light mode toggle component with icons
│   │
│   ├── 📁 pages/                      # Page components for routing
│   │   ├── 📄 Home.jsx                # Landing page with feature showcase and theme support
│   │   ├── 📄 About.jsx               # About page with tech stack, architecture, and theme integration
│   │   └── 📄 Contact.jsx             # Contact form with state management and theme awareness
│   │
│   ├── 📁 hooks/                      # Custom React hooks
│   │   └── 📄 index.js                # Custom hooks (localStorage, debounce, etc.)
│   │
│   ├── 📁 context/                    # React Context for state management
│   │   └── 📄 AppContext.jsx          # Global app context with theme management and reducer pattern
│   │
│   ├── 📁 services/                   # API and external service integration
│   │   └── 📄 api.js                  # HTTP client with error handling
│   │
│   ├── 📁 utils/                      # Utility functions and helpers
│   │   └── 📄 index.js                # Common utility functions
│   │
│   ├── 📁 constants/                  # Application constants and configuration
│   │   └── 📄 index.js                # App constants and API endpoints
│   │
│   ├── 📁 types/                      # Type definitions and interfaces
│   │   └── 📄 index.js                # JSDoc type definitions
│   │
│   └── 📁 assets/                     # Static assets organized by type
│       ├── 📁 images/                 # Image assets and graphics
│       ├── 📁 icons/                  # Custom icons and SVGs
│       └── 📄 README.md               # Asset organization guide
│
├── 📁 .vscode/                        # VS Code workspace configuration
│   └── 📄 settings.json               # Recommended editor settings
│
├── 📄 .env.example                    # Environment variables template
├── 📄 .eslintrc.cjs                   # ESLint configuration with React rules
├── 📄 .gitignore                      # Git ignore patterns
├── 📄 .prettierignore                 # Prettier ignore patterns
├── 📄 .prettierrc                     # Prettier formatting configuration
├── 📄 index.html                      # HTML template with meta tags
├── 📄 package.json                    # Dependencies, scripts, and metadata
├── 📄 postcss.config.js               # PostCSS configuration for Tailwind
├── 📄 tailwind.config.js              # Tailwind CSS configuration with dark mode support
├── 📄 vite.config.js                  # Vite build and dev server configuration
└── 📄 README.md                       # Comprehensive project documentation
```

### 🛠️ Pre-configured Tools & Dependencies

**Build Tools:**
- **Vite 7.1+** - Ultra-fast build tool with instant HMR and optimized production builds
- **PostCSS** - CSS processing with plugin ecosystem
- **Autoprefixer** - Automatic vendor prefix addition
- **SWC Compiler** - Super-fast JavaScript compilation

**React Ecosystem:**
- **React 19** - Latest React with concurrent features and modern hooks
- **React DOM 19** - Enhanced rendering with automatic batching
- **React Router DOM 6.27+** - Complete routing solution with nested routes

**Styling & Design:**
- **Tailwind CSS 4.1+** - Utility-first CSS framework with dark mode support and JIT compilation
- **Lucide React** - Beautiful, customizable icon library with TypeScript support
- **Dark/Light Mode System** - Complete theme switching with localStorage persistence
- **Responsive Design System** - Mobile-first breakpoints and utilities
- **Custom Components** - Pre-styled navigation, cards, forms, and UI elements with theme support

**Code Quality & Formatting:**
- **ESLint 9.33+** - Comprehensive linting with React-specific rules
- **Prettier 3.3+** - Opinionated code formatting for consistency
- **ESLint-Prettier Integration** - Seamless formatting and linting workflow
- **Tailwind CSS** - Utility-first CSS framework with JIT compilation
- **Responsive Design System** - Mobile-first breakpoints and utilities
- **Custom Components** - Pre-styled navigation, cards, and forms

**Code Quality & Formatting:**
- **ESLint** - Comprehensive linting with React-specific rules
- **Prettier** - Opinionated code formatting for consistency
- **ESLint-Prettier Integration** - Seamless formatting and linting workflow

### 📱 Example Components & Features

**Navigation System:**
- **Responsive Navbar** - Mobile-friendly navigation with theme toggle using Lucide React icons
- **Active State Management** - Visual indicators for current page with React Router
- **Theme Toggle Integration** - Seamless dark/light mode switching with smooth transitions
- **Smooth Transitions** - Hover effects and state changes with Tailwind animations
- **Accessibility Support** - ARIA labels, keyboard navigation, and screen reader support

**Page Templates:**
- **Home Page** - Hero section, feature showcase, and technology highlights with theme-aware interactive cards
- **About Page** - Comprehensive template overview with architecture details, theme integration, and learning resources
- **Contact Page** - Working contact form with controlled inputs, validation, state management, and theme support

**UI Component Library:**
- **Theme-Aware Components** - Button, Input, Modal, Card, Alert, and Loading components that adapt to dark/light mode
- **Layout Components** - Header, Footer, Container, Section, and navigation components with theme support
- **Interactive Elements** - Hover effects, focus states, and smooth theme transitions
- **Theme Toggle Component** - Beautiful Sun/Moon icon toggle with accessibility features
- **Form Components** - Styled inputs, textareas, buttons with validation and theme support
- **Typography System** - Consistent heading hierarchy and text styles for both themes

**Custom Hooks:**
- **useLocalStorage** - Persistent state management with automatic serialization
- **useDebounce** - Performance optimization for search inputs and API calls
- **usePrevious** - State comparison and change tracking for animations
- **useWindowSize** - Responsive behavior and window dimension tracking

**Context API Implementation:**
- **Global State Management** - Centralized state with useReducer pattern and theme management
- **Theme Management** - Complete dark/light mode system with localStorage persistence and DOM class updates
- **Error Handling** - Global error state with automatic clearing and theme-aware error displays
- **Action Creators** - Type-safe action dispatching with consistent patterns including theme actions

**Service Layer:**
- **API Integration** - HTTP client with error handling and authentication
- **Request Interceptors** - Automatic token management and header injection
- **Error Standardization** - Custom error classes with detailed information
- **Mock Data Support** - JSONPlaceholder integration for testing and development

### 🎓 **Educational Value**

This template serves as a comprehensive learning resource with:

**Extensive Documentation:**
- **JSDoc Comments** - Every function and component thoroughly documented
- **Inline Explanations** - Code comments explaining React patterns and best practices
- **Usage Examples** - Real-world implementation examples throughout the codebase
- **Learning Notes** - Tips and explanations for modern React development

**Best Practices Demonstrated:**
- **Component Architecture** - Proper component organization and composition patterns
- **State Management** - When to use local state vs global state
- **Performance Optimization** - React.memo, useCallback, and custom hooks
- **Accessibility** - ARIA labels, semantic HTML, and keyboard navigation
- **Error Boundaries** - Comprehensive error handling strategies
- **Testing Patterns** - Structure ready for unit and integration testing

**Modern React Patterns:**
- **Functional Components** - Modern React with hooks instead of class components
- **Custom Hooks** - Extracting and reusing stateful logic
- **Context API** - Avoiding prop drilling with proper state management
- **Service Layer** - Separation of concerns with API abstraction
- **Utility Functions** - Reusable helper functions and constants

## 🌓 **Dark/Light Mode Theme System**

The template includes a complete theme system that automatically handles dark and light modes across your entire application.

### 🎨 **Theme Features**
- **Automatic Persistence** - Theme preference saved to localStorage
- **System Preference Detection** - Respects user's OS theme preference
- **Real-time Updates** - Instant theme switching across all components
- **Tailwind Integration** - Uses Tailwind's built-in dark mode classes
- **Accessibility** - Screen reader support and keyboard navigation

### 🚀 **Using the Theme System**

**Theme Toggle Component:**
```jsx
import { useAppContext } from '../context/AppContext'
import { Sun, Moon } from 'lucide-react'

function MyComponent() {
  const { state, actions } = useAppContext()
  const { theme } = state

  return (
    <button 
      onClick={() => actions.setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`p-2 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
```

**Theme-Aware Component Styling:**
```jsx
import { useAppContext } from '../context/AppContext'

function Card({ children }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-800 border border-gray-700 text-white' 
        : 'bg-white border border-gray-200 text-gray-900'
    }`}>
      {children}
    </div>
  )
}
```

**Tailwind Dark Mode Classes:**
```jsx
// Using Tailwind's dark: prefix for automatic theme handling
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 className="text-gray-900 dark:text-white">Theme-aware heading</h1>
  <p className="text-gray-600 dark:text-gray-300">Theme-aware text</p>
</div>
```

**Theme Configuration (Tailwind):**
```js
// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [],
}
```

## Available Scripts

In the generated project, you can run these comprehensive scripts:

### 🚀 **Development Scripts**
- **`npm run dev`** - Starts the Vite development server at `http://localhost:5173` with:
  - Hot module replacement for instant updates
  - Fast refresh for React components
  - Automatic dependency pre-bundling
  - Development-optimized build

- **`npm run preview`** - Preview the production build locally to test:
  - Production optimizations and tree-shaking
  - Asset compression and minification
  - Route-based code splitting
  - Performance characteristics

### 🏗️ **Build Scripts**
- **`npm run build`** - Creates an optimized production build in the `dist/` folder with:
  - Tree-shaking for minimal bundle size
  - Asset optimization and compression
  - CSS purging and minification
  - Source maps for debugging
  - Modern JavaScript output with legacy fallbacks

### 🔍 **Code Quality Scripts**
- **`npm run lint`** - Run comprehensive ESLint checks for:
  - React-specific rules and best practices
  - JavaScript/JSX syntax validation
  - Import/export statement verification
  - Accessibility (a11y) recommendations
  - React Hooks rules compliance

- **`npm run lint:fix`** - Automatically fix ESLint issues where possible:
  - Code formatting and style issues
  - Import statement organization
  - React component optimization suggestions
  - Accessibility improvements

### ✨ **Formatting Scripts**
- **`npm run format`** - Format all source files using Prettier:
  - JavaScript/JSX files with consistent styling
  - CSS files with proper indentation
  - JSON files with standardized formatting
  - Markdown files with consistent structure

- **`npm run format:check`** - Check if all files are properly formatted:
  - Verify code consistency without making changes
  - Perfect for CI/CD pipeline integration
  - Pre-commit hook compatibility

### 🔧 **Workflow Integration**
All scripts are optimized for:
- **CI/CD pipelines** - Proper exit codes and error reporting
- **Git hooks** - Pre-commit formatting and linting with Husky integration
- **Editor integration** - VS Code and other editor support with extensions
- **Team development** - Consistent code quality across team members

## Customization & Extension

### 🎨 **Styling Customization**

**Tailwind CSS Configuration:**
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a'
        },
        secondary: {
          50: '#f8fafc',
          500: '#64748b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      }
    }
  },
  plugins: []
}
```

**Component Styling with Lucide Icons:**
```jsx
import { Search, User, Settings } from 'lucide-react'

function IconButton({ icon: Icon, children, ...props }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" {...props}>
      <Icon className="w-4 h-4" />
      {children}
    </button>
  )
}

// Usage
<IconButton icon={Search}>Search</IconButton>
<IconButton icon={User}>Profile</IconButton>
<IconButton icon={Settings}>Settings</IconButton>
```

**Prettier Configuration:**
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 🧭 **Adding New Routes & Pages**

**1. Create a new page component:**
```jsx
// src/pages/Services.jsx
import { Wrench, Zap, Shield } from 'lucide-react'

function Services() {
  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Performance Optimization",
      description: "Speed up your applications with advanced optimization techniques"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Security Audits",
      description: "Comprehensive security analysis and vulnerability assessment"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">{service.title}</h3>
            <p className="text-gray-600 text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
```

**2. Add the route in App.jsx:**
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Services from './pages/Services'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
```

**3. Update navigation in Navbar.jsx:**
```jsx
import { Menu, X, Home, Info, Mail, Wrench } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: Info },
  { to: '/services', label: 'Services', icon: Wrench },
  { to: '/contact', label: 'Contact', icon: Mail }
]

// In your navigation mapping
{navItems.map((item) => (
  <Link
    key={item.to}
    to={item.to}
    className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
  >
    <item.icon className="w-4 h-4" />
    {item.label}
  </Link>
))}
```

### 🔧 **Using Custom Hooks**

**Example: Search with Debounce**
```jsx
import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks'
import { Search } from 'lucide-react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setResults([
          `Result 1 for "${debouncedSearchTerm}"`,
          `Result 2 for "${debouncedSearchTerm}"`,
          `Result 3 for "${debouncedSearchTerm}"`
        ])
        setLoading(false)
      }, 500)
    } else {
      setResults([])
    }
  }, [debouncedSearchTerm])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      {loading && <p className="mt-2 text-gray-500">Searching...</p>}
      
      {results.length > 0 && (
        <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          {results.map((result, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**Example: Theme Management with Context**
```jsx
import { useAppContext, actionCreators } from '../context/AppContext'
import { Sun, Moon } from 'lucide-react'

function ThemeToggle() {
  const { state, dispatch } = useAppContext()

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light'
    dispatch(actionCreators.setTheme(newTheme))
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      aria-label={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {state.theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">
        {state.theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  )
}
```

### �️ **Development Workflow Enhancements**

**VS Code Integration (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "tailwindCSS.experimental.classRegex": [
    "class(?:Name)?=(['\"`])([^'\"`;]*)\\1"
  ]
}
```

**Recommended VS Code Extensions:**
```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

**Git Hooks Setup with Husky:**
```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

**Package.json configuration:**
```json
{
  "lint-staged": {
    "*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md,json}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "prepare": "husky install"
  }
}
```

### 🎯 **Real-World Usage Examples**

**Adding a new feature page:**
```jsx
// src/pages/Products.jsx
function Products() {
  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold text-gray-900 mb-8'>Our Products</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Product cards */}
      </div>
    </div>
  )
}
export default Products
```

**Customizing the theme:**
```javascript
// tailwind.config.js - Add your brand colors
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#1a365d',
        secondary: '#2d3748'
      }
    }
  }
}
```

## Requirements & Compatibility

### 📋 **System Requirements**
- **Node.js**: Version 18.0.0 or higher (LTS recommended)
- **npm**: Version 8.0.0 or higher (or yarn 1.22.0+ / pnpm 7.0.0+)
- **Operating System**: Windows 10+, macOS 11+, Linux (Ubuntu 20.04+)
- **Memory**: Minimum 4GB RAM (8GB recommended for optimal performance)
- **Storage**: At least 500MB available space for node_modules

### 🌐 **Browser Support**
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Android Chrome 90+
- **ES6+ Features**: Full support for modern JavaScript features
- **CSS Grid & Flexbox**: Modern layout support required
- **WebAssembly**: Support for advanced optimization features

### 📦 **Package Dependencies**

**Production Dependencies:**
- `react` ^19.1.1 - Core React library with latest features
- `react-dom` ^19.1.1 - React DOM rendering with concurrent features
- `react-router-dom` ^6.27.0 - Declarative client-side routing
- `tailwindcss` ^4.1.12 - Utility-first CSS framework
- `@tailwindcss/vite` ^4.1.12 - Tailwind CSS Vite plugin integration
- `lucide-react` ^0.263.1 - Beautiful, customizable icon library

**Development Dependencies:**
- `vite` ^7.1.2 - Next-generation build tool with instant HMR
- `@vitejs/plugin-react-swc` ^4.0.0 - React plugin with SWC compiler
- `prettier` ^3.3.3 - Opinionated code formatting
- `eslint` ^9.33.0 - Advanced JavaScript linting
- `eslint-config-prettier` ^9.1.0 - ESLint + Prettier integration
- `eslint-plugin-prettier` ^5.2.0 - Prettier as ESLint rule
- `eslint-plugin-react` ^7.37.2 - React-specific ESLint rules
- `eslint-plugin-react-hooks` ^5.2.0 - React Hooks ESLint rules
- `eslint-plugin-react-refresh` ^0.4.20 - React Refresh ESLint plugin

## 🚀 Advanced Features

### 🎯 **Performance Optimizations**
- **Code Splitting**: Automatic route-based code splitting with React.lazy
- **Tree Shaking**: Dead code elimination in production builds
- **Asset Optimization**: Image compression and lazy loading ready
- **Bundle Analysis**: Built-in tools for bundle size monitoring with Vite
- **Preloading**: Critical resource preloading strategies
- **Caching**: Optimal caching strategies for static assets

### 🔒 **Security & Best Practices**
- **XSS Protection**: Content Security Policy headers and input sanitization
- **CSRF Protection**: Cross-site request forgery prevention patterns
- **Secure Headers**: Security-focused HTTP headers configuration
- **Environment Variables**: Secure handling of sensitive configuration
- **Dependency Scanning**: Regular security updates and vulnerability checks
- **Content Validation**: Input validation and sanitization patterns

### 📱 **Accessibility (a11y) Features**
- **ARIA Labels**: Comprehensive ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard accessibility support
- **Color Contrast**: WCAG 2.1 AA compliant color schemes
- **Focus Management**: Proper focus handling and visual indicators
- **Screen Reader Support**: Semantic HTML and descriptive content
- **Reduced Motion**: Respect for prefers-reduced-motion settings

### 🧪 **Testing Ready**
- **Component Testing**: Structure ready for React Testing Library
- **Unit Testing**: Organized for Jest or Vitest integration
- **E2E Testing**: Compatible with Playwright, Cypress, or Selenium
- **Mock Service Workers**: API mocking with MSW integration
- **Accessibility Testing**: Ready for axe-core and accessibility audits

### 🛠️ **Extension Ready**
- **State Management**: Easy integration with Redux Toolkit, Zustand, or Jotai
- **UI Libraries**: Compatible with Material-UI, Chakra UI, Ant Design, or Mantine
- **Styling Solutions**: Ready for Styled Components, Emotion, or CSS Modules
- **Build Tools**: Compatible with additional Vite plugins and Rollup plugins
- **Deployment**: Optimized for Vercel, Netlify, GitHub Pages, or AWS

### 🔧 **Development Tools Integration**
- **Storybook**: Component documentation and development
- **React DevTools**: Enhanced debugging and profiling
- **Vite DevTools**: Build analysis and optimization insights
- **Browser Extensions**: React and Redux DevTools support
- **Hot Reload**: Fast refresh with state preservation

### 🌐 **SEO & Meta Management**
- **Meta Tags**: Comprehensive meta tag configuration
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Schema.org markup ready
- **Sitemap Generation**: Automatic sitemap creation capability
- **Analytics Ready**: Google Analytics and tracking integration

## CLI Options & Features

### 🚀 **CLI Usage**
```bash
# Create a new React app with default settings
npx create-react-tailwind-app-router my-react-app

# Create with specific template version
npx create-react-tailwind-app-router@latest my-react-app

# View help and available options
npx create-react-tailwind-app-router --help

# Check version information
npx create-react-tailwind-app-router --version

# Use with different package managers
yarn create react-tailwind-app-router my-react-app
pnpm create react-tailwind-app-router my-react-app
```

### 📋 **What You Get Out of the Box**
Every generated project includes:
- **Complete React 19 Setup** - Latest React with concurrent features and modern hooks
- **Vite Development Server** - Lightning-fast development with instant HMR
- **React Router Integration** - Full client-side routing with nested routes support
- **Tailwind CSS Configuration** - Utility-first CSS with JIT compilation and Vite plugin
- **Lucide React Icons** - Beautiful, customizable icon library with TypeScript support
- **Prettier & ESLint** - Code formatting and quality tools with optimal configuration
- **Production Build** - Optimized build configuration for deployment
- **Educational Documentation** - Comprehensive JSDoc comments and learning examples
- **Component Architecture** - Well-organized, scalable component structure
- **Custom Hooks** - Reusable logic patterns for common use cases
- **Context API Setup** - Global state management with best practices
- **Service Layer** - API integration patterns with error handling
- **Responsive Design** - Mobile-first approach with modern CSS Grid and Flexbox

### 🎨 **Template Features**
- **Modern UI Components** - Pre-built, accessible components with Tailwind styling
- **Interactive Examples** - Working forms, navigation, and user interactions
- **Responsive Layout** - Mobile-first design with fluid breakpoints
- **Accessibility Support** - WCAG 2.1 compliant components and patterns
- **Performance Optimization** - Code splitting, lazy loading, and optimization techniques
- **Developer Experience** - Hot reload, error boundaries, and debugging tools

## Real-World Usage Examples

### 🎯 **Building a Complete Feature**
```jsx
// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { userService } from '../services/api'
import { BarChart, Users, Activity, TrendingUp } from 'lucide-react'

function Dashboard() {
  const { state } = useAppContext()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    growth: 0,
    revenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const users = await userService.getUsers()
        setStats({
          totalUsers: users.length,
          activeUsers: users.filter(user => user.active).length,
          growth: 15.3,
          revenue: 24750
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Growth Rate',
      value: `${stats.growth}%`,
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: BarChart,
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {state.user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-600">Dashboard content and charts would go here...</p>
      </div>
    </div>
  )
}

export default Dashboard
```

## 🎨 **Live Theme Demo**

The template includes beautiful dark and light modes that transform your entire application:

### 🌞 **Light Mode Features**
- Clean, minimalist design with subtle shadows
- High contrast for excellent readability
- Warm color palette for comfortable viewing
- Professional look perfect for business applications

### 🌙 **Dark Mode Features**
- Modern dark design that reduces eye strain
- Elegant gray color scheme with blue accents
- Perfect for coding environments and night usage
- Automatic adaptation of all components and pages

### 🔄 **Theme Toggle Experience**
- **Instant Switching** - No page refresh required, real-time theme updates
- **Smooth Transitions** - Beautiful CSS transitions between themes
- **Icon Animation** - Sun/Moon icons with subtle animations
- **Memory Persistence** - Your theme choice is remembered across sessions
- **System Integration** - Respects your OS dark/light mode preference on first visit

### 🎯 **What Gets Themed**
- ✅ **Navigation Bar** - Colors, backgrounds, and hover states
- ✅ **All Pages** - Home, About, Contact with theme-aware content
- ✅ **Forms & Inputs** - Text fields, buttons, and interactive elements
- ✅ **Cards & Components** - Shadows, borders, and background colors
- ✅ **Typography** - Text colors optimized for each theme
- ✅ **Icons & Graphics** - Adaptive colors and hover effects

### 🛠️ **Developer Benefits**
- **Consistent Theming** - All components automatically support both themes
- **Easy Customization** - Simple theme object for brand colors
- **Accessibility Ready** - Proper contrast ratios in both modes
- **Production Ready** - Optimized for performance and bundle size

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Mithran B

## Support

If you have any questions or issues, please open an issue on [GitHub](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier/issues).

---

**Happy coding! 🚀**
