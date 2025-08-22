import { useTheme } from '../context/ThemeContext'

/**
 * Custom hook for theme management
 * 
 * This hook provides access to:
 * - Current theme state (light/dark)
 * - Theme toggle function
 * - Type-safe theme operations
 * 
 * @returns {object} Theme context with current theme and toggle function
 * 
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useThemeContext()
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     Current theme: {theme}
 *   </button>
 * )
 * ```
 */
export const useThemeContext = () => {
  return useTheme()
}

/**
 * Hook to check if the current theme is dark
 * 
 * @returns {boolean} True if the current theme is dark
 * 
 * @example
 * ```tsx
 * const isDark = useIsDark()
 * const iconColor = isDark ? 'text-white' : 'text-black'
 * ```
 */
export const useIsDark = (): boolean => {
  const { theme } = useTheme()
  return theme === 'dark'
}

/**
 * Hook to get theme-aware class names
 * 
 * @param lightClasses - Classes to apply in light mode
 * @param darkClasses - Classes to apply in dark mode
 * @returns {string} The appropriate classes for the current theme
 * 
 * @example
 * ```tsx
 * const bgClasses = useThemeClasses('bg-white', 'bg-gray-900')
 * return <div className={bgClasses}>Content</div>
 * ```
 */
export const useThemeClasses = (lightClasses: string, darkClasses: string): string => {
  const { theme } = useTheme()
  return theme === 'dark' ? darkClasses : lightClasses
}
