/**
 * Theme Toggle Component
 * 
 * A sophisticated toggle switch for switching between light and dark themes.
 * Provides smooth animations, accessibility features, and visual feedback.
 * 
 * Features:
 * - Smooth transitions between light/dark modes
 * - Accessible button with proper ARIA labels
 * - Visual icons (Sun for light, Moon for dark)
 * - Responsive design that works on all screen sizes
 * - Integration with global Context API for theme management
 * 
 * Educational Value:
 * - Demonstrates React hooks usage (useAppContext)
 * - Shows how to implement accessibility features
 * - Example of conditional rendering and styling
 * - Integration pattern with global state management
 * 
 * @returns {JSX.Element} Themed toggle button component
 */

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

/**
 * ThemeToggle - Interactive component for switching between light and dark themes
 * 
 * This component provides users with an intuitive way to toggle between
 * light and dark modes. It uses the global Context API to manage theme state
 * and applies smooth transitions for a polished user experience.
 * 
 * Implementation Notes:
 * - Uses Lucide React icons for visual feedback
 * - Integrates with AppContext for state management
 * - Includes accessibility features (ARIA labels, focus states)
 * - Responsive design with hover and focus effects
 * 
 * @component
 * @example
 * // Basic usage in a navigation bar
 * <ThemeToggle />
 * 
 * // The component automatically handles:
 * // - Reading current theme from context
 * // - Toggling theme on click
 * // - Visual state updates
 * // - Accessibility features
 */
function ThemeToggle() {
  // Access global state and actions from Context API
  const { state, actions } = useAppContext()
  const { theme } = state

  /**
   * Handle theme toggle action
   * 
   * Switches between 'light' and 'dark' themes using the global
   * state management system. The new theme is automatically
   * persisted to localStorage via the Context API.
   */
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    actions.setTheme(newTheme)
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={`
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 focus:ring-yellow-400'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-blue-500'
        }
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Icon container with smooth rotation animation */}
      <div className="transform transition-transform duration-500 ease-in-out hover:scale-110">
        {theme === 'light' ? (
          <Sun 
            size={20} 
            className="animate-pulse" 
            aria-hidden="true"
          />
        ) : (
          <Moon 
            size={20} 
            className="animate-pulse" 
            aria-hidden="true"
          />
        )}
      </div>

      {/* Screen reader only text for enhanced accessibility */}
      <span className="sr-only">
        Currently in {theme} mode. Click to switch to {theme === 'light' ? 'dark' : 'light'} mode.
      </span>
    </button>
  )
}

export default ThemeToggle
