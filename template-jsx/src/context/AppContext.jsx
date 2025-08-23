/**
 * React Context API Implementation - Application Context
 * 
 * This file demonstrates the React Context API, which provides a way to share
 * state and functionality across your component tree without prop drilling.
 * 
 * Key Concepts:
 * - Context Provider: Supplies data to its component tree
 * - Context Consumer: Components that use the context data
 * - useContext Hook: Modern way to consume context data
 * 
 * When to Use Context:
 * ✅ Global application state (user auth, theme, language)
 * ✅ Configuration that many components need
 * ✅ Avoiding prop drilling through many component layers
 * ❌ Replacing all local state (prefer local state when possible)
 * ❌ Performance-critical frequent updates (consider state management libraries)
 * 
 * Learning Points:
 * - How to create and structure context providers
 * - Best practices for context organization
 * - Performance considerations with context
 * - How to combine multiple contexts effectively
 * - Error handling and default values in context
 */

import { createContext, useContext, useReducer, useEffect } from 'react'

/**
 * Initial State
 * 
 * Define the initial state for the application. This serves as the
 * default state when the app first loads and helps document the
 * expected shape of your application state.
 * 
 * State Structure:
 * - user: Current authenticated user information
 * - theme: Application theme (light/dark)
 * - loading: Global loading state for async operations
 * - error: Global error state for error handling
 */
const initialState = {
  user: null, // Will be populated after authentication
  theme: 'light', // Default theme, can be overridden by user preference
  loading: false, // Global loading state for async operations
  error: null, // Global error state for displaying errors
}

/**
 * Action Types
 * 
 * Defining action types as constants helps prevent typos and makes
 * the codebase more maintainable. It also enables better IDE support
 * with autocomplete and refactoring.
 * 
 * Naming Convention:
 * - Use SCREAMING_SNAKE_CASE for action types
 * - Include the entity and action (e.g., SET_USER, SET_THEME)
 * - Group related actions together
 * - Be descriptive but concise
 */
export const ActionTypes = {
  SET_USER: 'SET_USER',           // Set user data after login/authentication
  SET_THEME: 'SET_THEME',         // Change application theme
  SET_LOADING: 'SET_LOADING',     // Set global loading state
  SET_ERROR: 'SET_ERROR',         // Set error message
  CLEAR_ERROR: 'CLEAR_ERROR',     // Clear error state
}

/**
 * App Reducer
 * 
 * The reducer function that handles all state updates. This is the heart
 * of your state management - it receives the current state and an action,
 * then returns the new state.
 * 
 * Reducer Rules:
 * 1. Must be pure functions (no side effects)
 * 2. Must not mutate the existing state (return new state objects)
 * 3. Should handle all possible action types
 * 4. Should return current state for unknown actions
 * 
 * Why use a reducer instead of useState?
 * - Better for complex state logic
 * - Predictable state updates with actions
 * - Easier testing and debugging
 * - More scalable as app grows
 * 
 * @param {object} state - Current application state
 * @param {object} action - Action object with type and payload
 * @returns {object} New application state
 */
const appReducer = (state, action) => {
  // Log actions in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('🔄 Action dispatched:', action.type, action.payload)
  }

  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state, // Spread existing state to avoid mutation
        user: action.payload, // Set user data from action payload
        error: null, // Clear any existing errors on successful user set
      }

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload, // Update theme (typically 'light' or 'dark')
      }

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload, // Boolean value for loading state
      }

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload, // Error message or error object
        loading: false, // Stop loading when error occurs
      }

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null, // Clear the error state
      }

    // Default case for unknown actions
    default:
      // Log unknown actions in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Unknown action type:', action.type)
      }
      return state // Return current state unchanged
  }
}

/**
 * Create the App Context
 * 
 * Creates a React context with a default value. The default value is used
 * when a component tries to consume context outside of a Provider.
 * This is useful for:
 * - Testing components in isolation
 * - Development debugging
 * - TypeScript type inference
 * - Documentation of expected context shape
 */
const AppContext = createContext({
  // Default state shape - helps with TypeScript and documentation
  state: initialState,
  // Default dispatch function (won't actually work, but provides structure)
  dispatch: () => {
    console.warn('AppContext dispatch called outside of provider')
  },
  // Default actions object
  actions: {
    setUser: () => console.warn('AppContext actions called outside of provider'),
    setTheme: () => console.warn('AppContext actions called outside of provider'),
    setLoading: () => console.warn('AppContext actions called outside of provider'),
    setError: () => console.warn('AppContext actions called outside of provider'),
    clearError: () => console.warn('AppContext actions called outside of provider'),
  },
})

/**
 * App Context Provider Component
 * 
 * This component wraps your application and provides the global state
 * and dispatch function to all child components. It also handles
 * side effects like persistence and initialization.
 * 
 * Features:
 * - State management with useReducer
 * - Theme persistence to localStorage
 * - Automatic theme application to document
 * - Development debugging support
 * 
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * 
 * @example
 * function App() {
 *   return (
 *     <AppProvider>
 *       <Router>
 *         <Routes>
 *           <Route path="/" element={<Home />} />
 *         </Routes>
 *       </Router>
 *     </AppProvider>
 *   )
 * }
 */
export const AppProvider = ({ children }) => {
  // Initialize state with useReducer and lazy initialization
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    // Lazy initialization - runs only once on component mount
    try {
      // Try to load theme from localStorage
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        return {
          ...initial,
          theme: savedTheme,
        }
      }
    } catch (error) {
      console.error('Error loading theme from localStorage:', error)
    }
    return initial
  })

  /**
   * Persist theme changes to localStorage
   * 
   * This effect runs whenever the theme changes and saves it to localStorage
   * for persistence across browser sessions. We wrap it in a try-catch to
   * handle cases where localStorage might not be available.
   */
  useEffect(() => {
    try {
      localStorage.setItem('theme', state.theme)
      
      // Apply theme to document body for CSS usage
      document.body.className = `theme-${state.theme}`
      document.body.setAttribute('data-theme', state.theme)
      
      // Log theme changes in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🎨 Theme changed to:', state.theme)
      }
    } catch (error) {
      console.error('Error saving theme to localStorage:', error)
    }
  }, [state.theme])

  /**
   * Clear errors automatically after a timeout
   * 
   * This effect automatically clears errors after 5 seconds to improve
   * user experience. Users don't want to see old error messages forever.
   */
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: ActionTypes.CLEAR_ERROR })
      }, 5000) // Clear error after 5 seconds

      // Cleanup timer if component unmounts or error changes
      return () => clearTimeout(timer)
    }
  }, [state.error])

  // Create actions object with bound dispatch
  const actions = {
    setUser: (userData) => dispatch(actionCreators.setUser(userData)),
    setTheme: (theme) => dispatch(actionCreators.setTheme(theme)),
    setLoading: (isLoading) => dispatch(actionCreators.setLoading(isLoading)),
    setError: (error) => dispatch(actionCreators.setError(error)),
    clearError: () => dispatch(actionCreators.clearError()),
  }

  // Context value that will be provided to children
  // We memoize this to prevent unnecessary re-renders
  const contextValue = {
    state,
    dispatch,
    actions,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * Custom Hook for Using App Context
 * 
 * This custom hook provides a convenient way to access the app context
 * and includes error handling for components that try to use context
 * outside of a provider.
 * 
 * Benefits:
 * - Cleaner component code (no need to import useContext and AppContext)
 * - Built-in error handling with helpful error messages
 * - Better developer experience
 * - Easier to refactor context structure later
 * - Type safety (especially with TypeScript)
 * 
 * @returns {object} Context value with state and dispatch
 * @throws {Error} If used outside of AppProvider
 * 
 * @example
 * function MyComponent() {
 *   const { state, dispatch } = useAppContext()
 *   
 *   const handleLogin = (userData) => {
 *     dispatch({ type: ActionTypes.SET_USER, payload: userData })
 *   }
 *   
 *   return (
 *     <div>
 *       {state.user ? (
 *         <p>Welcome, {state.user.name}!</p>
 *       ) : (
 *         <button onClick={() => handleLogin({ name: 'John' })}>
 *           Login
 *         </button>
 *       )}
 *     </div>
 *   )
 * }
 */
export const useAppContext = () => {
  const context = useContext(AppContext)
  
  // Check if hook is being used within AppProvider
  if (!context) {
    throw new Error(
      'useAppContext must be used within an AppProvider. ' +
      'Make sure your component is wrapped with <AppProvider>. ' +
      'This usually happens when you try to use the context outside ' +
      'of the provider component tree.'
    )
  }
  
  return context
}

/**
 * Action Creators (Helper Functions)
 * 
 * These functions create action objects with the correct structure.
 * They help prevent typos in action types and provide a consistent
 * interface for dispatching actions.
 * 
 * Benefits:
 * - Type safety (especially with TypeScript)
 * - Consistent action structure
 * - Easier testing and debugging
 * - Better IDE support with autocomplete
 * - Centralized action creation logic
 */
export const actionCreators = {
  /**
   * Set user data in the global state
   * @param {object} userData - User object with user information
   * @returns {object} Action object for setting user
   */
  setUser: (userData) => ({
    type: ActionTypes.SET_USER,
    payload: userData,
  }),

  /**
   * Set application theme
   * @param {string} theme - Theme name ('light' or 'dark')
   * @returns {object} Action object for setting theme
   */
  setTheme: (theme) => ({
    type: ActionTypes.SET_THEME,
    payload: theme,
  }),

  /**
   * Set global loading state
   * @param {boolean} isLoading - Loading state
   * @returns {object} Action object for setting loading state
   */
  setLoading: (isLoading) => ({
    type: ActionTypes.SET_LOADING,
    payload: isLoading,
  }),

  /**
   * Set global error state
   * @param {string|object} error - Error message or error object
   * @returns {object} Action object for setting error
   */
  setError: (error) => ({
    type: ActionTypes.SET_ERROR,
    payload: error,
  }),

  /**
   * Clear global error state
   * @returns {object} Action object for clearing error
   */
  clearError: () => ({
    type: ActionTypes.CLEAR_ERROR,
  }),
}

/**
 * Advanced Usage Examples:
 * 
 * 1. Theme Toggler Component:
 * ```jsx
 * function ThemeToggler() {
 *   const { state, dispatch } = useAppContext()
 *   
 *   const toggleTheme = () => {
 *     const newTheme = state.theme === 'light' ? 'dark' : 'light'
 *     dispatch(actionCreators.setTheme(newTheme))
 *   }
 *   
 *   return (
 *     <button onClick={toggleTheme}>
 *       Switch to {state.theme === 'light' ? 'dark' : 'light'} mode
 *     </button>
 *   )
 * }
 * ```
 * 
 * 2. Error Handler Component:
 * ```jsx
 * function ErrorDisplay() {
 *   const { state, dispatch } = useAppContext()
 *   
 *   if (!state.error) return null
 *   
 *   return (
 *     <div className="error-banner">
 *       <p>{state.error}</p>
 *       <button onClick={() => dispatch(actionCreators.clearError())}>
 *         Dismiss
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 * 
 * 3. Loading Wrapper Component:
 * ```jsx
 * function LoadingWrapper({ children }) {
 *   const { state } = useAppContext()
 *   
 *   if (state.loading) {
 *     return <div className="spinner">Loading...</div>
 *   }
 *   
 *   return children
 * }
 * ```
 * 
 * Performance Tips:
 * - Use React.memo for components that don't need frequent updates
 * - Split large contexts into smaller, focused ones for better performance
 * - Consider using useCallback for stable dispatch functions if needed
 * - Avoid creating new objects in context value on every render
 * - Use the state selectors pattern for complex state shapes
 * 
 * Testing Tips:
 * - Create a test wrapper that provides context for testing
 * - Test action creators independently
 * - Mock the context for unit testing components
 * - Test the reducer function with various action types
 */
