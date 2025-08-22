# Theme System

A comprehensive guide to the dark/light mode theme system implementation.

## 🌓 Overview

The theme system provides seamless switching between light and dark modes with:
- **Automatic persistence** - User preference saved to localStorage
- **System preference detection** - Respects OS theme settings
- **Real-time updates** - Instant theme changes across all components
- **Accessibility** - Screen reader support and keyboard navigation

## 🏗️ Architecture

### Theme State Management

The theme system is built on React Context API with a reducer pattern:

```jsx
// Global state structure
{
  theme: 'light' | 'dark',
  // other app state...
}

// Theme actions
{
  type: 'SET_THEME',
  payload: 'light' | 'dark'
}
```

### Core Components

1. **`AppContext.jsx`** - Global theme state management
2. **`ThemeToggle.jsx`** - UI component for switching themes
3. **`App.jsx`** - Theme application and DOM class management
4. **`tailwind.config.js`** - CSS framework dark mode configuration

## 🚀 Implementation Details

### Context Provider Setup

**`src/context/AppContext.jsx`**
```jsx
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  // ... other state
}

const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      const newTheme = action.payload
      localStorage.setItem('theme', newTheme)
      return { ...state, theme: newTheme }
    default:
      return state
  }
}

// Action creators
const actionCreators = {
  setTheme: (theme) => ({
    type: ActionTypes.SET_THEME,
    payload: theme
  })
}
```

### Theme Toggle Component

**`src/components/ui/ThemeToggle.jsx`**
```jsx
import { Sun, Moon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

function ThemeToggle() {
  const { state, actions } = useAppContext()
  const { theme } = state

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    actions.setTheme(newTheme)
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={`relative p-2 rounded-lg transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Sun size={20} className="animate-pulse" />
      ) : (
        <Moon size={20} className="animate-pulse" />
      )}
    </button>
  )
}
```

### Application-Level Theme Management

**`src/App.jsx`**
```jsx
import { useEffect } from 'react'
import { useAppContext } from './context/AppContext'

function App() {
  const { state } = useAppContext()
  const { theme } = state

  // Update document class for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* App content */}
    </div>
  )
}
```

## 🎨 Styling Approaches

### Method 1: Conditional Classes (Recommended)

Use JavaScript conditionals for dynamic theming:

```jsx
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

**Benefits:**
- Full JavaScript control over theme logic
- Easy to understand and debug
- Works with complex conditional logic
- Perfect for component-specific theming

### Method 2: Tailwind Dark Mode Classes

Use Tailwind's built-in dark mode utilities:

```jsx
function Card({ children }) {
  return (
    <div className="p-6 rounded-lg shadow-md transition-colors bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
      {children}
    </div>
  )
}
```

**Benefits:**
- No JavaScript theme logic needed
- Automatic theme application
- Smaller bundle size for simple cases
- Works with Tailwind's optimization

### Method 3: CSS Custom Properties

For complex theme systems with many colors:

```css
/* index.css */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  --border-color: #e5e7eb;
}

:root.dark {
  --bg-primary: #1f2937;
  --text-primary: #ffffff;
  --border-color: #374151;
}

.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}
```

## 🔧 Tailwind Configuration

**`tailwind.config.js`**
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      // Custom theme extensions
      colors: {
        // Custom color palette for both themes
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          500: '#0ea5e9',
          900: '#0c4a6e'
        }
      },
      animation: {
        'theme-transition': 'themeTransition 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
```

## 🎯 Component Examples

### Form Components

```jsx
function Input({ placeholder, ...props }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <input
      className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        theme === 'dark'
          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
      }`}
      placeholder={placeholder}
      {...props}
    />
  )
}
```

### Navigation Components

```jsx
function NavLink({ to, children, isActive }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-blue-500 text-white' // Active state same for both themes
          : theme === 'dark'
            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  )
}
```

### Card Components

```jsx
function FeatureCard({ icon, title, description }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`p-6 rounded-lg shadow-md transition-colors ${
      theme === 'dark' 
        ? 'bg-gray-800 border border-gray-700' 
        : 'bg-white border border-gray-200'
    }`}>
      <div className="text-blue-500 text-3xl mb-4">{icon}</div>
      <h3 className={`text-lg font-semibold mb-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <p className={`${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  )
}
```

## 🔄 System Integration

### OS Theme Detection

```jsx
// Detect system preference on first visit
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dark' : 'light'
    actions.setTheme(systemTheme)
  }
}, [])

// Listen for system theme changes
useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleChange = (e) => {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) { // Only auto-update if user hasn't manually chosen
      actions.setTheme(e.matches ? 'dark' : 'light')
    }
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}, [])
```

### Theme Persistence

```jsx
// Save theme preference
const setTheme = (newTheme) => {
  localStorage.setItem('theme', newTheme)
  dispatch({ type: 'SET_THEME', payload: newTheme })
}

// Load theme on app initialization
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  
  return savedTheme || systemPreference
}
```

## ♿ Accessibility Features

### Screen Reader Support

```jsx
function ThemeToggle() {
  return (
    <button
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Icon */}
      
      {/* Screen reader text */}
      <span className="sr-only">
        Currently in {theme} mode. Click to switch to {theme === 'light' ? 'dark' : 'light'} mode.
      </span>
    </button>
  )
}
```

### Keyboard Navigation

```jsx
function ThemeToggle() {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleThemeToggle()
    }
  }

  return (
    <button
      onClick={handleThemeToggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {/* Theme toggle content */}
    </button>
  )
}
```

## 🎨 Customization Guide

### Adding Custom Colors

1. **Extend Tailwind Config:**
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        light: '#3b82f6',  // Light theme brand color
        dark: '#60a5fa',   // Dark theme brand color
      }
    }
  }
}
```

2. **Use in Components:**
```jsx
className={`text-brand-${theme === 'dark' ? 'dark' : 'light'}`}
```

### Creating Theme Variants

```jsx
const themeVariants = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-50'
  },
  dark: {
    bg: 'bg-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
    hover: 'hover:bg-gray-700'
  }
}

function ThemedComponent() {
  const { state } = useAppContext()
  const variant = themeVariants[state.theme]
  
  return (
    <div className={`${variant.bg} ${variant.text} ${variant.border} ${variant.hover}`}>
      Content
    </div>
  )
}
```

## 🔍 Debugging Theme Issues

### Common Problems

1. **Theme not persisting:**
   - Check localStorage permissions
   - Verify theme loading in useEffect

2. **Flashing on page load:**
   - Add theme class to HTML before React renders
   - Use CSS to hide content until theme is loaded

3. **Components not updating:**
   - Ensure components consume theme from context
   - Check if context provider wraps the component

### Debug Utilities

```jsx
// Theme debug component
function ThemeDebug() {
  const { state } = useAppContext()
  
  return (
    <div className="fixed bottom-4 right-4 p-2 bg-black text-white text-xs">
      Theme: {state.theme} | 
      Storage: {localStorage.getItem('theme')} |
      System: {window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
    </div>
  )
}
```

---

The theme system provides a robust foundation for creating applications that work beautifully in both light and dark modes, with excellent user experience and accessibility features.
