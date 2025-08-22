# Theme Implementation Guide

Step-by-step guide to implementing and customizing the dark/light theme system.

## 🎨 Theme Implementation Overview

The theme system uses a combination of React Context, localStorage persistence, and Tailwind CSS dark mode classes.

## 🏗️ Core Theme Architecture

### 1. Context-Based Theme Management
```jsx
// src/context/AppContext.jsx - Theme state structure
const initialState = {
  theme: 'light', // 'light' | 'dark'
  // Other app state...
}

// Theme actions
const TOGGLE_THEME = 'TOGGLE_THEME'
const SET_THEME = 'SET_THEME'
```

### 2. DOM Class Management
```jsx
// Update document class for Tailwind dark mode
useEffect(() => {
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [state.theme])
```

### 3. localStorage Persistence
```jsx
// Save theme preference
useEffect(() => {
  localStorage.setItem('theme', state.theme)
}, [state.theme])

// Load saved theme on mount
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    dispatch({ type: 'SET_THEME', payload: savedTheme })
  }
}, [])
```

## 🔧 Step-by-Step Implementation

### Step 1: Configure Tailwind CSS
```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom theme colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    }
  },
  plugins: []
}
```

### Step 2: Create Theme Context
```jsx
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const ThemeContext = createContext()

const initialState = {
  theme: 'light',
  systemTheme: 'light'
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'SET_SYSTEM_THEME':
      return { ...state, systemTheme: action.payload }
    default:
      return state
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      dispatch({
        type: 'SET_SYSTEM_THEME',
        payload: mediaQuery.matches ? 'dark' : 'light'
      })
    }

    handleChange() // Set initial value
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Load saved theme or use system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    } else {
      dispatch({ type: 'SET_THEME', payload: state.systemTheme })
    }
  }, [state.systemTheme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    
    if (state.theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

  const value = {
    ...state,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

### Step 3: Create Theme Toggle Component
```jsx
// src/components/ui/ThemeToggle.jsx
import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Theme toggle button component
 * Switches between light and dark themes with smooth transitions
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-200 ease-in-out
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isDark 
          ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400 focus:ring-yellow-400' 
          : 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-blue-500'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun icon for light mode */}
        <Sun
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDark 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Moon icon for dark mode */}
        <Moon
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out
            ${isDark 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
```

### Step 4: Create Theme-Aware Components
```jsx
// src/components/ui/Card.jsx
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  ...props 
}) => {
  const { isDark } = useTheme()

  const baseClasses = 'rounded-lg shadow-md transition-all duration-200'
  
  const variantClasses = {
    default: isDark 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-200 text-gray-900',
    elevated: isDark 
      ? 'bg-gray-800 border-gray-600 shadow-lg' 
      : 'bg-white border-gray-300 shadow-lg',
    interactive: isDark 
      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600' 
      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
  }

  return (
    <div
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
```

### Step 5: Theme-Aware Button Component
```jsx
// src/components/ui/Button.jsx
import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const { isDark } = useTheme()

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantClasses = {
    primary: isDark
      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
      : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: isDark
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 focus:ring-gray-500'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: isDark
      ? 'border border-gray-600 hover:bg-gray-700 text-gray-200 focus:ring-gray-500'
      : 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    ghost: isDark
      ? 'hover:bg-gray-700 text-gray-300 focus:ring-gray-500'
      : 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500'
  }

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
```

## 🎨 Advanced Theme Patterns

### 1. Dynamic Color Utilities
```jsx
// src/utils/themeUtils.js
export const getThemeClasses = (lightClasses, darkClasses) => {
  return `${lightClasses} dark:${darkClasses}`
}

export const getConditionalClasses = (isDark, lightClasses, darkClasses) => {
  return isDark ? darkClasses : lightClasses
}

// Usage
const MyComponent = () => {
  const { isDark } = useTheme()
  
  return (
    <div className={getThemeClasses(
      'bg-white text-gray-900',
      'bg-gray-800 text-white'
    )}>
      <div className={getConditionalClasses(
        isDark,
        'border-gray-200',
        'border-gray-700'
      )}>
        Content
      </div>
    </div>
  )
}
```

### 2. Theme-Aware CSS Variables
```css
/* src/index.css */
:root {
  /* Light theme colors */
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1f2937;
  --color-text-secondary: #6b7280;
  --color-border: #e5e7eb;
}

.dark {
  /* Dark theme colors */
  --color-primary: #60a5fa;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-border: #334155;
}

/* Usage in CSS */
.themed-component {
  background-color: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}
```

### 3. Theme Configuration Object
```jsx
// src/config/theme.js
export const themeConfig = {
  light: {
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#3b82f6'
      },
      border: '#e5e7eb'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
    }
  },
  dark: {
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      background: '#0f172a',
      surface: '#1e293b',
      text: {
        primary: '#f1f5f9',
        secondary: '#94a3b8',
        accent: '#60a5fa'
      },
      border: '#334155'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.4)'
    }
  }
}

// Hook to use theme config
export const useThemeConfig = () => {
  const { theme } = useTheme()
  return themeConfig[theme]
}
```

## 🎭 Theme Transitions

### Smooth Theme Transitions
```css
/* src/index.css */
* {
  transition: 
    background-color 200ms ease-in-out,
    border-color 200ms ease-in-out,
    color 200ms ease-in-out,
    box-shadow 200ms ease-in-out;
}

/* Disable transitions on theme change to prevent flash */
.theme-transition-disable * {
  transition: none !important;
}
```

```jsx
// Disable transitions during theme change
const ThemeProvider = ({ children }) => {
  // ... existing code

  useEffect(() => {
    document.documentElement.classList.add('theme-transition-disable')
    
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition-disable')
    }, 100)

    return () => clearTimeout(timer)
  }, [state.theme])

  // ... rest of component
}
```

## 🧪 Testing Theme Implementation

### Theme Testing Utilities
```jsx
// tests/theme-utils.jsx
import { render } from '@testing-library/react'
import { ThemeProvider } from '../src/context/ThemeContext'

export const renderWithTheme = (ui, { theme = 'light' } = {}) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  )
}

// Test theme functionality
test('theme toggle works correctly', async () => {
  const { getByRole } = renderWithTheme(<ThemeToggle />)
  
  const toggleButton = getByRole('button')
  
  // Test initial state
  expect(document.documentElement).not.toHaveClass('dark')
  
  // Toggle to dark mode
  fireEvent.click(toggleButton)
  
  await waitFor(() => {
    expect(document.documentElement).toHaveClass('dark')
  })
})
```

## 📱 System Theme Detection

### Respect User's System Preference
```jsx
// Enhanced theme detection
const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState('light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    updateTheme() // Set initial value
    mediaQuery.addEventListener('change', updateTheme)
    
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [])

  return systemTheme
}

// Use in ThemeProvider
const ThemeProvider = ({ children }) => {
  const systemTheme = useSystemTheme()
  
  // Initialize with system theme if no saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) {
      dispatch({ type: 'SET_THEME', payload: systemTheme })
    }
  }, [systemTheme])
  
  // ... rest of component
}
```

## 🎨 Custom Theme Creation

### Create Custom Theme Variants
```jsx
// src/themes/custom.js
export const customThemes = {
  ocean: {
    light: {
      primary: '#0891b2',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: '#164e63'
    },
    dark: {
      primary: '#67e8f9',
      background: '#164e63',
      surface: '#0e7490',
      text: '#f0f9ff'
    }
  },
  forest: {
    light: {
      primary: '#059669',
      background: '#f0fdf4',
      surface: '#dcfce7',
      text: '#14532d'
    },
    dark: {
      primary: '#34d399',
      background: '#14532d',
      surface: '#166534',
      text: '#f0fdf4'
    }
  }
}

// Theme selector component
const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  
  return (
    <select 
      value={theme} 
      onChange={(e) => setTheme(e.target.value)}
      className="p-2 rounded border"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="ocean">Ocean</option>
      <option value="forest">Forest</option>
    </select>
  )
}
```

## 📚 Related Documentation

- **[Theme System Overview](./theme-system.md)** - Complete theme guide
- **[Theme Customization](./theme-customization.md)** - Advanced customization
- **[Tailwind CSS Setup](./tailwind.md)** - CSS framework configuration

---

**Implement beautiful, accessible theming in your React applications!** 🎨
