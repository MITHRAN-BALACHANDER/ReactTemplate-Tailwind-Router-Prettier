# Theme Customization Guide

Advanced guide to customizing colors, styles, and creating unique theme variations.

## 🎨 Customization Overview

The template's theme system is designed to be highly customizable, allowing you to create unique visual identities while maintaining consistency and accessibility.

## 🌈 Color Customization

### 1. Tailwind CSS Theme Extension
```js
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Primary brand color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Custom accent colors
        accent: {
          light: '#f59e0b',
          DEFAULT: '#d97706',
          dark: '#92400e',
        },
        
        // Custom semantic colors
        success: {
          light: '#10b981',
          DEFAULT: '#059669',
          dark: '#047857',
        },
        warning: {
          light: '#f59e0b',
          DEFAULT: '#d97706',
          dark: '#92400e',
        },
        error: {
          light: '#ef4444',
          DEFAULT: '#dc2626',
          dark: '#991b1b',
        },
        
        // Custom neutral palette
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Dark theme specific colors
        dark: {
          surface: {
            100: '#1e293b',
            200: '#334155',
            300: '#475569',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            muted: '#94a3b8',
          }
        }
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Custom fonts
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      
      // Custom shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Custom border radius
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    }
  },
  plugins: []
}
```

### 2. CSS Custom Properties Approach
```css
/* src/styles/themes.css */
:root {
  /* Brand Colors */
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #6366f1;
  --color-brand-accent: #f59e0b;
  
  /* Light Theme */
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-surface-elevated: #ffffff;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  --color-border: #e5e7eb;
  --color-border-light: #f3f4f6;
  
  /* Interactive Elements */
  --color-link: var(--color-brand-primary);
  --color-link-hover: var(--color-brand-secondary);
  --color-button-primary: var(--color-brand-primary);
  --color-button-primary-hover: var(--color-brand-secondary);
  
  /* Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

.dark {
  /* Dark Theme Overrides */
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-surface-elevated: #334155;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --color-border-light: #475569;
  
  /* Adjusted brand colors for dark mode */
  --color-brand-primary: #60a5fa;
  --color-brand-secondary: #818cf8;
  
  /* Dark mode shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);
}

/* Theme-specific utility classes */
.bg-surface {
  background-color: var(--color-surface);
}

.bg-surface-elevated {
  background-color: var(--color-surface-elevated);
}

.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.border-default {
  border-color: var(--color-border);
}

.shadow-theme-sm {
  box-shadow: var(--shadow-sm);
}

.shadow-theme-md {
  box-shadow: var(--shadow-md);
}

.shadow-theme-lg {
  box-shadow: var(--shadow-lg);
}
```

## 🎭 Multiple Theme Variants

### 1. Theme Configuration System
```jsx
// src/config/themes.js
export const themeVariants = {
  default: {
    name: 'Default',
    light: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#f8fafc',
      text: {
        primary: '#1f2937',
        secondary: '#6b7280'
      }
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#818cf8',
      accent: '#fbbf24',
      background: '#0f172a',
      surface: '#1e293b',
      text: {
        primary: '#f1f5f9',
        secondary: '#cbd5e1'
      }
    }
  },
  
  ocean: {
    name: 'Ocean',
    light: {
      primary: '#0891b2',
      secondary: '#0284c7',
      accent: '#0ea5e9',
      background: '#f0f9ff',
      surface: '#e0f2fe',
      text: {
        primary: '#164e63',
        secondary: '#0369a1'
      }
    },
    dark: {
      primary: '#67e8f9',
      secondary: '#38bdf8',
      accent: '#0ea5e9',
      background: '#164e63',
      surface: '#0e7490',
      text: {
        primary: '#f0f9ff',
        secondary: '#bae6fd'
      }
    }
  },
  
  forest: {
    name: 'Forest',
    light: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#65a30d',
      background: '#f0fdf4',
      surface: '#dcfce7',
      text: {
        primary: '#14532d',
        secondary: '#166534'
      }
    },
    dark: {
      primary: '#34d399',
      secondary: '#10b981',
      accent: '#84cc16',
      background: '#14532d',
      surface: '#166534',
      text: {
        primary: '#f0fdf4',
        secondary: '#bbf7d0'
      }
    }
  },
  
  sunset: {
    name: 'Sunset',
    light: {
      primary: '#ea580c',
      secondary: '#dc2626',
      accent: '#f59e0b',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: {
        primary: '#7c2d12',
        secondary: '#ea580c'
      }
    },
    dark: {
      primary: '#fb923c',
      secondary: '#f87171',
      accent: '#fbbf24',
      background: '#7c2d12',
      surface: '#9a3412',
      text: {
        primary: '#fffbeb',
        secondary: '#fed7aa'
      }
    }
  }
}

export const getThemeColors = (variant, mode) => {
  return themeVariants[variant]?.[mode] || themeVariants.default[mode]
}
```

### 2. Enhanced Theme Context
```jsx
// src/context/ThemeContext.jsx - Enhanced version
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { themeVariants, getThemeColors } from '../config/themes'

const ThemeContext = createContext()

const initialState = {
  mode: 'light', // 'light' | 'dark'
  variant: 'default', // theme variant key
  systemMode: 'light'
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload }
    case 'SET_VARIANT':
      return { ...state, variant: action.payload }
    case 'TOGGLE_MODE':
      return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' }
    case 'SET_SYSTEM_MODE':
      return { ...state, systemMode: action.payload }
    default:
      return state
  }
}

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // Apply theme to document
  useEffect(() => {
    const colors = getThemeColors(state.variant, state.mode)
    const root = document.documentElement

    // Update CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue)
        })
      } else {
        root.style.setProperty(`--color-${key}`, value)
      }
    })

    // Update dark mode class
    if (state.mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Save preferences
    localStorage.setItem('themeMode', state.mode)
    localStorage.setItem('themeVariant', state.variant)
  }, [state.mode, state.variant])

  const value = {
    ...state,
    colors: getThemeColors(state.variant, state.mode),
    variants: themeVariants,
    setMode: (mode) => dispatch({ type: 'SET_MODE', payload: mode }),
    setVariant: (variant) => dispatch({ type: 'SET_VARIANT', payload: variant }),
    toggleMode: () => dispatch({ type: 'TOGGLE_MODE' }),
    isDark: state.mode === 'dark',
    isLight: state.mode === 'light'
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

### 3. Theme Selector Component
```jsx
// src/components/ui/ThemeSelector.jsx
import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { Palette, Check } from 'lucide-react'

const ThemeSelector = () => {
  const { variant, variants, setVariant, mode, toggleMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm">{variants[variant].name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Theme Settings</h3>
          </div>
          
          {/* Mode Toggle */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <label className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
              <button
                onClick={toggleMode}
                className={`
                  relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out
                  ${mode === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out
                    ${mode === 'dark' ? 'translate-x-5' : 'translate-x-0'}
                  `}
                />
              </button>
            </label>
          </div>

          {/* Variant Selection */}
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color Scheme</h4>
            <div className="space-y-1">
              {Object.entries(variants).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    setVariant(key)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors
                    ${variant === key 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme[mode].primary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme[mode].secondary }}
                      />
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme[mode].accent }}
                      />
                    </div>
                    <span>{theme.name}</span>
                  </div>
                  {variant === key && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemeSelector
```

## 🎨 Component Theming Utilities

### 1. Theme-Aware Component Factory
```jsx
// src/utils/themeComponentFactory.js
import { useTheme } from '../context/ThemeContext'

export const createThemedComponent = (baseClasses, variants) => {
  return ({ variant = 'default', className = '', ...props }) => {
    const { colors, isDark } = useTheme()
    
    const variantClasses = variants[variant] || variants.default
    const themeClasses = isDark ? variantClasses.dark : variantClasses.light
    
    return {
      className: `${baseClasses} ${themeClasses} ${className}`,
      style: {
        '--theme-primary': colors.primary,
        '--theme-secondary': colors.secondary,
        '--theme-accent': colors.accent
      },
      ...props
    }
  }
}

// Usage example
const ThemedCard = createThemedComponent(
  'rounded-lg shadow-md p-6 transition-all duration-200',
  {
    default: {
      light: 'bg-white border border-gray-200 text-gray-900',
      dark: 'bg-gray-800 border border-gray-700 text-white'
    },
    elevated: {
      light: 'bg-white border border-gray-300 shadow-lg text-gray-900',
      dark: 'bg-gray-800 border border-gray-600 shadow-lg text-white'
    }
  }
)
```

### 2. Dynamic Style Hooks
```jsx
// src/hooks/useThemedStyles.js
import { useTheme } from '../context/ThemeContext'

export const useThemedStyles = () => {
  const { colors, isDark } = useTheme()

  return {
    colors,
    isDark,
    
    // Style generators
    getBackgroundStyle: (level = 'surface') => ({
      backgroundColor: level === 'surface' ? colors.surface : colors.background
    }),
    
    getTextStyle: (level = 'primary') => ({
      color: colors.text[level] || colors.text.primary
    }),
    
    getBorderStyle: (width = '1px') => ({
      border: `${width} solid ${colors.border}`
    }),
    
    getShadowStyle: (level = 'md') => ({
      boxShadow: isDark ? 
        '0 4px 6px -1px rgba(0, 0, 0, 0.4)' : 
        '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }),
    
    // Component-specific styles
    buttonStyles: {
      primary: {
        backgroundColor: colors.primary,
        color: '#ffffff',
        border: `1px solid ${colors.primary}`
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.primary,
        border: `1px solid ${colors.primary}`
      }
    },
    
    inputStyles: {
      backgroundColor: colors.surface,
      color: colors.text.primary,
      border: `1px solid ${colors.border}`,
      '&:focus': {
        borderColor: colors.primary,
        boxShadow: `0 0 0 3px ${colors.primary}20`
      }
    }
  }
}

// Usage in components
const CustomButton = ({ children, variant = 'primary', ...props }) => {
  const { buttonStyles } = useThemedStyles()
  
  return (
    <button
      style={buttonStyles[variant]}
      {...props}
    >
      {children}
    </button>
  )
}
```

## 🎯 Advanced Customization Patterns

### 1. Theme-Based Responsive Design
```jsx
// src/components/ResponsiveThemedComponent.jsx
import { useTheme } from '../context/ThemeContext'
import { useWindowSize } from '../hooks'

const ResponsiveThemedComponent = () => {
  const { colors, isDark } = useTheme()
  const { isMobile, isTablet, isDesktop } = useWindowSize()

  const getResponsiveStyles = () => {
    const baseStyles = {
      backgroundColor: colors.surface,
      color: colors.text.primary,
      transition: 'all 0.2s ease'
    }

    if (isMobile) {
      return {
        ...baseStyles,
        padding: '1rem',
        fontSize: '0.875rem'
      }
    }

    if (isTablet) {
      return {
        ...baseStyles,
        padding: '1.5rem',
        fontSize: '1rem'
      }
    }

    return {
      ...baseStyles,
      padding: '2rem',
      fontSize: '1.125rem'
    }
  }

  return (
    <div style={getResponsiveStyles()}>
      Responsive themed content
    </div>
  )
}
```

### 2. Theme Animation System
```css
/* src/styles/themeAnimations.css */
@keyframes themeShift {
  0% { 
    background-color: var(--color-background);
    color: var(--color-text-primary);
  }
  50% { 
    background-color: var(--color-surface);
    color: var(--color-text-secondary);
  }
  100% { 
    background-color: var(--color-background);
    color: var(--color-text-primary);
  }
}

.theme-pulse {
  animation: themeShift 2s ease-in-out infinite;
}

.theme-gradient {
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-secondary),
    var(--color-accent)
  );
}

.theme-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark .theme-glass {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 3. Theme Export/Import System
```jsx
// src/utils/themeExport.js
export const exportTheme = (themeConfig) => {
  const dataStr = JSON.stringify(themeConfig, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = 'custom-theme.json'
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

export const importTheme = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const themeConfig = JSON.parse(e.target.result)
        resolve(themeConfig)
      } catch (error) {
        reject(new Error('Invalid theme file format'))
      }
    }
    
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

// Theme manager component
const ThemeManager = () => {
  const { variant, setVariant, variants } = useTheme()
  
  const handleExport = () => {
    exportTheme(variants[variant])
  }
  
  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const customTheme = await importTheme(file)
        // Add custom theme to variants and set as active
        // This would require extending the theme system
        console.log('Imported theme:', customTheme)
      } catch (error) {
        console.error('Theme import failed:', error)
      }
    }
  }
  
  return (
    <div className="space-y-4">
      <button onClick={handleExport}>Export Current Theme</button>
      <input type="file" accept=".json" onChange={handleImport} />
    </div>
  )
}
```

## 📱 Mobile Theme Considerations

### Touch-Friendly Theme Controls
```jsx
// src/components/mobile/MobileThemeControls.jsx
import { useTheme } from '../../context/ThemeContext'
import { useWindowSize } from '../../hooks'

const MobileThemeControls = () => {
  const { mode, variant, toggleMode, variants, setVariant } = useTheme()
  const { isMobile } = useWindowSize()

  if (!isMobile) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center gap-2">
        {/* Quick mode toggle */}
        <button
          onClick={toggleMode}
          className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center touch-manipulation"
        >
          {mode === 'dark' ? '☀️' : '🌙'}
        </button>
        
        {/* Variant quick selector */}
        <div className="flex gap-1">
          {Object.entries(variants).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => setVariant(key)}
              className={`
                w-8 h-8 rounded-full border-2 touch-manipulation
                ${variant === key ? 'border-white' : 'border-transparent'}
              `}
              style={{ backgroundColor: theme[mode].primary }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

## 🧪 Theme Testing

### Theme Testing Utilities
```jsx
// tests/theme-test-utils.jsx
import { render } from '@testing-library/react'
import { ThemeProvider } from '../src/context/ThemeContext'

export const renderWithTheme = (ui, { variant = 'default', mode = 'light' } = {}) => {
  const TestThemeProvider = ({ children }) => (
    <ThemeProvider initialVariant={variant} initialMode={mode}>
      {children}
    </ThemeProvider>
  )
  
  return render(ui, { wrapper: TestThemeProvider })
}

// Test theme color accessibility
export const testColorContrast = (foreground, background) => {
  // Implementation for WCAG contrast ratio testing
  const getContrastRatio = (fg, bg) => {
    // Color contrast calculation logic
  }
  
  const ratio = getContrastRatio(foreground, background)
  return ratio >= 4.5 // WCAG AA standard
}
```

## 📚 Related Documentation

- **[Theme System Overview](./theme-system.md)** - Complete theme guide
- **[Theme Implementation](./theme-implementation.md)** - Implementation details
- **[Tailwind CSS Setup](./tailwind.md)** - CSS framework configuration

---

**Create stunning, accessible themes that reflect your brand identity!** 🎨
