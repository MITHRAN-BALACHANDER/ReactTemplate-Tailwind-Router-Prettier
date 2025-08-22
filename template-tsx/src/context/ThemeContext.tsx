import { createContext, useContext, useState, useEffect } from 'react'
import { Theme, ThemeContextValue, ComponentWithChildren } from '../types'

/**
 * Theme Context for managing light/dark mode throughout the application
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * Custom hook to access the theme context
 * @throws {Error} When used outside of ThemeProvider
 * @returns {ThemeContextValue} The current theme context value
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * Theme Provider Component
 * 
 * Provides theme context to all child components and manages:
 * - Theme state (light/dark)
 * - Theme persistence in localStorage
 * - System preference detection
 * - DOM class updates for Tailwind CSS dark mode
 * 
 * @param {ComponentWithChildren} props - Component props with children
 */
export const ThemeProvider = ({ children }: ComponentWithChildren) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme) {
        return savedTheme
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Effect to apply theme changes to DOM and localStorage
  useEffect(() => {
    const root = window.document.documentElement
    
    // Update DOM classes for Tailwind CSS dark mode
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Persist theme in localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if no theme is saved in localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const contextValue: ThemeContextValue = {
    theme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
