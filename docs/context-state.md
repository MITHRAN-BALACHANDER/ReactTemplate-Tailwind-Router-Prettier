# Context API & State Management

Complete guide to global state management using React Context API with theme handling.

## 🌐 Context Architecture

The template uses React Context API for global state management, primarily for theme handling and application-wide state.

## 📁 Context Structure

```
src/
└── context/
    └── AppContext.jsx    # Main application context
```

## 🏗️ AppContext Implementation

### Context Provider Setup

```jsx
// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'

/**
 * Application Context for global state management
 * Handles theme switching, user preferences, and app-wide state
 */
const AppContext = createContext(undefined)

// Initial state with theme management
const initialState = {
  theme: 'light', // 'light' | 'dark'
  sidebarOpen: false,
  user: null,
  notifications: [],
  loading: false
}

/**
 * Reducer for handling state updates
 * @param {Object} state - Current state
 * @param {Object} action - Action with type and payload
 * @returns {Object} New state
 */
const appReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload
      }
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      }
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    
    default:
      return state
  }
}

/**
 * App Context Provider Component
 * Manages global application state and theme persistence
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      dispatch({ type: 'SET_THEME', payload: savedTheme })
    }
  }, [])

  // Update localStorage and DOM when theme changes
  useEffect(() => {
    localStorage.setItem('theme', state.theme)
    
    // Update document class for Tailwind dark mode
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.theme])

  // Context value with state and actions
  const value = {
    state,
    dispatch,
    // Action creators for common operations
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    addNotification: (notification) => dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { ...notification, id: Date.now() }
    }),
    removeNotification: (id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading })
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * Custom hook to use App Context
 * @returns {Object} Context value with state and actions
 */
export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
```

## 🎨 Theme Management

### Theme State Structure
```jsx
const themeState = {
  theme: 'light' | 'dark',
  // Theme is persisted in localStorage
  // Applied to document.documentElement.classList
}
```

### Theme Actions
```jsx
// Toggle between light and dark
const { toggleTheme } = useAppContext()
toggleTheme()

// Set specific theme
const { setTheme } = useAppContext()
setTheme('dark')

// Access current theme
const { state } = useAppContext()
const currentTheme = state.theme
```

## 🔧 Usage Examples

### Provider Setup in App
```jsx
// src/App.jsx
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <div className="App">
        {/* Your app components */}
      </div>
    </AppProvider>
  )
}
```

### Using Context in Components
```jsx
// src/components/ThemeToggle.jsx
import { useAppContext } from '../context/AppContext'

const ThemeToggle = () => {
  const { state, toggleTheme } = useAppContext()
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded ${
        state.theme === 'dark' 
          ? 'bg-gray-700 text-yellow-400' 
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      {state.theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

### Theme-Aware Component
```jsx
// src/components/Card.jsx
import { useAppContext } from '../context/AppContext'

const Card = ({ children, className = '' }) => {
  const { state } = useAppContext()
  
  const baseClasses = 'p-6 rounded-lg shadow-md transition-colors duration-200'
  const themeClasses = state.theme === 'dark'
    ? 'bg-gray-800 text-white border-gray-700'
    : 'bg-white text-gray-900 border-gray-200'
  
  return (
    <div className={`${baseClasses} ${themeClasses} ${className}`}>
      {children}
    </div>
  )
}
```

## 📱 User State Management

### User Authentication
```jsx
// Login user
const { setUser, setLoading } = useAppContext()

const handleLogin = async (credentials) => {
  setLoading(true)
  try {
    const user = await authService.login(credentials)
    setUser(user)
  } catch (error) {
    addNotification({
      type: 'error',
      message: 'Login failed'
    })
  } finally {
    setLoading(false)
  }
}

// Logout user
const handleLogout = () => {
  setUser(null)
  // Clear any user-specific data
}
```

### Notifications System
```jsx
// Add notification
const { addNotification } = useAppContext()

addNotification({
  type: 'success', // 'success' | 'error' | 'warning' | 'info'
  message: 'Profile updated successfully!',
  duration: 3000 // Auto-remove after 3 seconds
})

// Remove notification
const { removeNotification } = useAppContext()
removeNotification(notificationId)
```

## 🪝 Custom Context Hooks

### Specialized Hooks
```jsx
// Custom hook for theme-specific logic
export const useTheme = () => {
  const { state, toggleTheme, setTheme } = useAppContext()
  
  return {
    theme: state.theme,
    isDark: state.theme === 'dark',
    isLight: state.theme === 'light',
    toggleTheme,
    setTheme,
    // Utility functions
    getThemeClass: (lightClass, darkClass) => 
      state.theme === 'dark' ? darkClass : lightClass
  }
}

// Custom hook for notifications
export const useNotifications = () => {
  const { state, addNotification, removeNotification } = useAppContext()
  
  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    // Convenience methods
    showSuccess: (message) => addNotification({ type: 'success', message }),
    showError: (message) => addNotification({ type: 'error', message }),
    showWarning: (message) => addNotification({ type: 'warning', message }),
    showInfo: (message) => addNotification({ type: 'info', message })
  }
}
```

## 🔄 State Updates Best Practices

### Action Creators
```jsx
// Keep actions pure and predictable
const actions = {
  toggleTheme: () => ({ type: 'TOGGLE_THEME' }),
  setTheme: (theme) => ({ type: 'SET_THEME', payload: theme }),
  updateUser: (userData) => ({ type: 'UPDATE_USER', payload: userData })
}

// Use action creators in components
const { dispatch } = useAppContext()
dispatch(actions.setTheme('dark'))
```

### Async Operations
```jsx
// Handle async operations in components or custom hooks
const useAuth = () => {
  const { setUser, setLoading, addNotification } = useAppContext()
  
  const login = async (credentials) => {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      if (response.ok) {
        const user = await response.json()
        setUser(user)
        addNotification({ type: 'success', message: 'Welcome back!' })
      } else {
        throw new Error('Login failed')
      }
    } catch (error) {
      addNotification({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }
  
  return { login }
}
```

## 🧪 Testing Context

### Test Provider Wrapper
```jsx
// tests/test-utils.jsx
import { AppProvider } from '../src/context/AppContext'

export const TestWrapper = ({ children }) => (
  <AppProvider>
    {children}
  </AppProvider>
)

// Test component with context
import { render, screen } from '@testing-library/react'
import { TestWrapper } from './test-utils'

test('theme toggle works', () => {
  render(
    <TestWrapper>
      <ThemeToggle />
    </TestWrapper>
  )
  
  const toggleButton = screen.getByRole('button')
  // Test theme toggle functionality
})
```

## 🚀 Advanced Patterns

### Context Composition
```jsx
// Multiple contexts for separation of concerns
const ThemeProvider = ({ children }) => { /* Theme logic */ }
const AuthProvider = ({ children }) => { /* Auth logic */ }
const NotificationProvider = ({ children }) => { /* Notification logic */ }

// Compose providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          {/* App components */}
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
```

### Context Optimization
```jsx
// Memoize context value to prevent unnecessary re-renders
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  
  const value = useMemo(() => ({
    state,
    dispatch,
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    // ... other actions
  }), [state])
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
```

## 📚 Related Documentation

- **[Theme System](./theme-system.md)** - Detailed theme implementation
- **[Custom Hooks](./hooks.md)** - Reusable logic patterns
- **[Component Architecture](./components.md)** - Component organization

---

**Master global state management for scalable React applications!** 🌐
