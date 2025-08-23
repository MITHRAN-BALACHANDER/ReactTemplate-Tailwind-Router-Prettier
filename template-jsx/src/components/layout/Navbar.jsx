/**
 * Navigation Bar Component
 * 
 * A responsive navigation component that provides site-wide navigation.
 * This component demonstrates several important React and accessibility patterns:
 * 
 * Key Features:
 * - Active link highlighting using React Router
 * - Theme-aware design with dark/light mode support
 * - Dark/Light mode toggle integration
 * - Responsive design with Tailwind CSS
 * - Accessibility-friendly navigation structure
 * - Hover states and smooth transitions
 * - Clean, reusable helper functions
 * 
 * React Patterns Demonstrated:
 * - useLocation hook for route-aware components
 * - Context API integration for theme management
 * - Conditional CSS classes with template literals
 * - Component composition with React Router Link
 * - Helper function extraction for cleaner code
 * 
 * Learning Points:
 * - How to create navigation that responds to route changes
 * - Theme integration with global state management
 * - Best practices for conditional styling in React
 * - Semantic HTML for accessibility (nav, role attributes)
 * - CSS transitions for better user experience
 */

import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import ThemeToggle from '../ui/ThemeToggle'

function Navbar() {
  // useLocation hook gives us access to the current route
  // This is a React Router hook that returns the current location object
  // We use this to determine which navigation link should be highlighted as "active"
  const location = useLocation()
  
  // Access theme state from global context
  const { state } = useAppContext()
  const { theme } = state

  /**
   * Helper function to determine if a navigation link is active
   * 
   * This pattern is common in navigation components - extract logic into
   * small, focused functions for better readability and reusability.
   * 
   * @param {string} path - The path to check against current location
   * @returns {boolean} True if the current path matches the given path
   */
  const isActive = path => {
    return location.pathname === path
  }

  return (
    <nav 
      className={`shadow-lg transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      role="navigation" // Accessibility: explicitly define this as navigation
      aria-label="Main navigation" // Screen reader description
    >
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo/Brand Section */}
          <Link 
            to='/' 
            className={`text-xl font-bold transition-colors ${
              theme === 'dark' 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-800 hover:text-blue-600'
            }`}
            aria-label="Go to homepage" // Accessibility: describe link purpose
          >
            React Tailwind App
          </Link>

          {/* Navigation Links and Theme Toggle Section */}
          <div className='flex items-center space-x-4'>
            {/* Navigation Links */}
            <div className='flex space-x-4'>
              {/* 
                Home Link
                
                Pattern Explanation:
                - Use template literals for dynamic class names
                - Conditional operator (ternary) for active vs inactive styles
                - Theme-aware styling for both active and inactive states
                - Consistent spacing and typography across all links
              */}
              <Link
                to='/'
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive('/')
                    ? 'bg-blue-500 text-white' // Active state styles (same for both themes)
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white' // Dark theme inactive
                      : 'text-gray-700 hover:bg-gray-100' // Light theme inactive
                  }
                `}
                aria-current={isActive('/') ? 'page' : undefined} // Accessibility: indicate current page
              >
                Home
              </Link>

              {/* About Link */}
              <Link
                to='/about'
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive('/about')
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                aria-current={isActive('/about') ? 'page' : undefined}
              >
                About
              </Link>

              {/* Contact Link */}
              <Link
                to='/contact'
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive('/contact')
                    ? 'bg-blue-500 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
                aria-current={isActive('/contact') ? 'page' : undefined}
              >
                Contact
              </Link>
            </div>

            {/* Theme Toggle Component */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

/**
 * CSS Classes Explained:
 * 
 * Navigation Container:
 * - bg-white: White background
 * - shadow-lg: Large shadow for depth
 * 
 * Layout:
 * - container mx-auto: Centered container with max-width
 * - px-4: Horizontal padding
 * - flex justify-between items-center: Space between logo and nav items
 * - py-4: Vertical padding
 * 
 * Links:
 * - px-3 py-2: Padding for click targets (accessibility)
 * - rounded-md: Medium border radius
 * - text-sm font-medium: Typography styling
 * - transition-colors: Smooth color transitions on hover/focus
 * 
 * Active States:
 * - bg-blue-500 text-white: Blue background with white text for active links
 * - text-gray-700 hover:bg-gray-100: Gray text with light hover background for inactive links
 * 
 * Accessibility Features:
 * - role="navigation": Explicit navigation landmark
 * - aria-label: Descriptive label for screen readers
 * - aria-current="page": Indicates the current page to assistive technology
 * - Proper semantic HTML structure with nav element
 * 
 * Performance Considerations:
 * - useLocation is called once per render, not per link
 * - Helper function prevents code duplication
 * - CSS transitions provide smooth UX without JavaScript
 */

export default Navbar
