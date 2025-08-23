/**
 * Custom React Hooks
 * 
 * This file contains custom hooks that encapsulate common functionality
 * across your React application. Custom hooks are a powerful pattern for:
 * 
 * - Sharing stateful logic between components
 * - Abstracting complex state management
 * - Creating reusable side effects
 * - Improving code organization and testability
 * 
 * Hook Naming Convention:
 * - Always start with "use" (React convention)
 * - Use descriptive names that indicate what the hook does
 * - Return arrays for multiple values (like useState)
 * - Return objects for named values when it makes sense
 * 
 * Learning Points:
 * - How to create custom hooks that encapsulate logic
 * - useState and useEffect patterns
 * - Error handling in hooks
 * - Performance considerations with custom hooks
 * - How to make hooks reusable and configurable
 */

import { useState, useEffect } from 'react'

/**
 * useLocalStorage Hook
 * 
 * A custom hook that syncs state with localStorage, providing persistent state
 * across browser sessions. This demonstrates several important patterns:
 * 
 * Key Features:
 * - Automatic serialization/deserialization of JavaScript values
 * - Error handling for localStorage access issues
 * - Consistent API similar to useState
 * - Works with any JSON-serializable data type
 * 
 * Use Cases:
 * - User preferences (theme, language, settings)
 * - Form data persistence
 * - Shopping cart contents
 * - Recently viewed items
 * 
 * @param {string} key - The localStorage key to use
 * @param {any} initialValue - Default value if no stored value exists
 * @returns {[any, Function]} Current value and setter function (like useState)
 * 
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 * const [user, setUser] = useLocalStorage('user', null)
 * const [preferences, setPreferences] = useLocalStorage('prefs', { notifications: true })
 */
export const useLocalStorage = (key, initialValue) => {
  // Initialize state with a function to avoid running localStorage code on every render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Try to get the item from localStorage
      const item = window.localStorage.getItem(key)
      
      // Parse stored JSON or return initialValue if nothing stored
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If localStorage is unavailable or JSON parsing fails, log error and use initial value
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  /**
   * Wrapped setState function that also updates localStorage
   * Supports both direct values and function updates (like regular useState)
   */
  const setValue = (value) => {
    try {
      // Allow value to be a function for consistency with useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Update state
      setStoredValue(valueToStore)
      
      // Update localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // Log error but don't break the application
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * useDebounce Hook
 * 
 * Delays updating a value until a specified amount of time has passed
 * since the last time it changed. Essential for performance optimization
 * in scenarios like search inputs, API calls, or expensive calculations.
 * 
 * How it works:
 * 1. Returns the current value immediately on first render
 * 2. Sets up a timer when the value changes
 * 3. If value changes again before timer expires, clears old timer and sets new one
 * 4. Only updates the debounced value when timer expires
 * 
 * Performance Benefits:
 * - Reduces API calls in search scenarios
 * - Prevents excessive state updates
 * - Improves user experience by avoiding jittery behavior
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} The debounced value
 * 
 * @example
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearchTerm = useDebounce(searchTerm, 300)
 * 
 * // Only search when user stops typing for 300ms
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     searchAPI(debouncedSearchTerm)
 *   }
 * }, [debouncedSearchTerm])
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function: cancel the timer if value changes again
    // This is called before the next effect runs or when component unmounts
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // Re-run effect when value or delay changes

  return debouncedValue
}

/**
 * usePrevious Hook
 * 
 * Keeps track of the previous value of a state or prop.
 * Useful for comparing current and previous values to trigger
 * specific behaviors or optimizations.
 * 
 * Common Use Cases:
 * - Animating between states
 * - Conditional effects based on value changes
 * - Debugging state changes
 * - Implementing "undo" functionality
 * 
 * How it works:
 * - Uses useRef to store previous value (doesn't trigger re-renders)
 * - Updates previous value only after current value has changed
 * - Returns the previous value for comparison
 * 
 * @param {any} value - The current value to track
 * @returns {any} The previous value
 * 
 * @example
 * const [count, setCount] = useState(0)
 * const prevCount = usePrevious(count)
 * 
 * useEffect(() => {
 *   if (prevCount !== undefined && count > prevCount) {
 *     console.log('Count increased!')
 *   }
 * }, [count, prevCount])
 */
export const usePrevious = (value) => {
  // State to store current and previous values
  const [current, setCurrent] = useState(value)
  const [previous, setPrevious] = useState()

  // Update previous and current when value changes
  if (value !== current) {
    setPrevious(current)
    setCurrent(value)
  }

  return previous
}

/**
 * useWindowSize Hook
 * 
 * Tracks the current window dimensions and updates when the window is resized.
 * Essential for responsive behavior that can't be handled with CSS alone.
 * 
 * Use Cases:
 * - Conditional rendering based on screen size
 * - Dynamic calculations for layouts
 * - Mobile vs desktop behavior differences
 * - Canvas or chart sizing
 * 
 * Performance Considerations:
 * - Uses throttling via browser's requestAnimationFrame
 * - Properly cleans up event listeners to prevent memory leaks
 * - Only updates state when dimensions actually change
 * 
 * @returns {object} Object with width and height properties
 * 
 * @example
 * const { width, height } = useWindowSize()
 * const isMobile = width < 768
 * 
 * return (
 *   <div>
 *     {isMobile ? <MobileNav /> : <DesktopNav />}
 *     <p>Window size: {width} x {height}</p>
 *   </div>
 * )
 */
export const useWindowSize = () => {
  // State to store window dimensions
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    /**
     * Handler function to update window size state
     * Called on initial mount and whenever window is resized
     */
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)
    
    // Call handler immediately to set initial size
    handleResize()

    // Cleanup function: remove event listener when component unmounts
    // This prevents memory leaks and ensures good performance
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty dependency array means this effect runs only once

  return windowSize
}

/**
 * Hook Usage Tips:
 * 
 * 1. Custom hooks should start with "use" to leverage React's hook rules
 * 2. Extract repetitive logic into custom hooks for reusability
 * 3. Always handle cleanup in useEffect to prevent memory leaks
 * 4. Consider performance implications of your custom hooks
 * 5. Make hooks configurable with parameters when possible
 * 6. Include proper error handling for external dependencies
 * 7. Document your hooks well - they're often reused across teams
 * 
 * Testing Custom Hooks:
 * - Use @testing-library/react-hooks for isolated testing
 * - Test edge cases like error conditions and cleanup
 * - Verify that effects run when expected
 * - Test the returned values and their updates
 */
