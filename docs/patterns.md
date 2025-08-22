# Common Patterns Guide

Essential React patterns and best practices used throughout the template.

## 🎯 React Patterns Overview

This guide covers the most important React patterns implemented in the template, helping you understand the codebase and build upon it effectively.

## 🏗️ Component Composition Patterns

### 1. Compound Components
```jsx
// src/components/ui/Tabs.jsx
import React, { createContext, useContext, useState } from 'react'

const TabsContext = createContext()

const Tabs = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`tabs ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

const TabsList = ({ children, className = '' }) => (
  <div className={`flex border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({ value, children, className = '' }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext)
  const isActive = activeTab === value

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`
        px-4 py-2 text-sm font-medium transition-colors
        ${isActive 
          ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }
        ${className}
      `}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value, children, className = '' }) => {
  const { activeTab } = useContext(TabsContext)
  
  if (activeTab !== value) return null

  return (
    <div className={`pt-4 ${className}`}>
      {children}
    </div>
  )
}

// Export compound component
Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

// Usage
const ExampleTabs = () => (
  <Tabs defaultValue="tab1">
    <Tabs.List>
      <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="tab1">Content 1</Tabs.Content>
    <Tabs.Content value="tab2">Content 2</Tabs.Content>
  </Tabs>
)
```

### 2. Render Props Pattern
```jsx
// src/components/DataFetcher.jsx
import React, { useState, useEffect } from 'react'

const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return children({ data, loading, error })
}

// Usage
const UserProfile = ({ userId }) => (
  <DataFetcher url={`/api/users/${userId}`}>
    {({ data: user, loading, error }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error: {error}</div>
      return <div>Welcome, {user.name}!</div>
    }}
  </DataFetcher>
)
```

### 3. Higher-Order Components (HOCs)
```jsx
// src/hocs/withTheme.jsx
import React from 'react'
import { useTheme } from '../context/ThemeContext'

const withTheme = (WrappedComponent) => {
  const ThemedComponent = (props) => {
    const theme = useTheme()
    return <WrappedComponent {...props} theme={theme} />
  }

  ThemedComponent.displayName = `withTheme(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return ThemedComponent
}

// Usage
const MyComponent = ({ theme, ...props }) => (
  <div className={theme.isDark ? 'text-white' : 'text-black'}>
    {/* Component content */}
  </div>
)

export default withTheme(MyComponent)
```

## 🎣 Custom Hook Patterns

### 1. State Management Hook
```jsx
// src/hooks/useCounter.js
import { useState, useCallback } from 'react'

export const useCounter = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(prev => prev + step)
  }, [step])

  const decrement = useCallback(() => {
    setCount(prev => prev - step)
  }, [step])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  const setValue = useCallback((value) => {
    setCount(typeof value === 'function' ? value(count) : value)
  }, [count])

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
    // Computed values
    isZero: count === 0,
    isPositive: count > 0,
    isNegative: count < 0
  }
}

// Usage
const Counter = () => {
  const { count, increment, decrement, reset, isZero } = useCounter(0, 2)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+2</button>
      <button onClick={decrement}>-2</button>
      <button onClick={reset} disabled={isZero}>Reset</button>
    </div>
  )
}
```

### 2. Effect Hook with Cleanup
```jsx
// src/hooks/useEventListener.js
import { useEffect, useRef } from 'react'

export const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current(event)
    element.addEventListener(eventName, eventListener)

    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}

// Usage
const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(true)
  }

  const upHandler = ({ key }) => {
    if (key === targetKey) setKeyPressed(false)
  }

  useEventListener('keydown', downHandler)
  useEventListener('keyup', upHandler)

  return keyPressed
}
```

### 3. Async Hook Pattern
```jsx
// src/hooks/useAsync.js
import { useState, useEffect, useCallback } from 'react'

export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setStatus('pending')
    setValue(null)
    setError(null)

    try {
      const response = await asyncFunction(...args)
      setValue(response)
      setStatus('success')
      return response
    } catch (error) {
      setError(error)
      setStatus('error')
      throw error
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    execute,
    status,
    value,
    error,
    isPending: status === 'pending',
    isIdle: status === 'idle',
    isSuccess: status === 'success',
    isError: status === 'error'
  }
}

// Usage
const UserProfile = ({ userId }) => {
  const {
    value: user,
    error,
    isPending,
    execute: fetchUser
  } = useAsync(
    () => fetch(`/api/users/${userId}`).then(res => res.json()),
    false
  )

  useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId, fetchUser])

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>No user found</div>

  return <div>Welcome, {user.name}!</div>
}
```

## 🎨 Component Design Patterns

### 1. Polymorphic Components
```jsx
// src/components/ui/Box.jsx
import React from 'react'

const Box = ({ 
  as: Component = 'div', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseClasses = 'transition-all duration-200'
  
  return (
    <Component 
      className={`${baseClasses} ${className}`} 
      {...props}
    >
      {children}
    </Component>
  )
}

// Usage - Same component, different HTML elements
const Examples = () => (
  <>
    <Box>Default div</Box>
    <Box as="section" className="p-4">Section element</Box>
    <Box as="button" onClick={() => alert('Clicked')}>Button element</Box>
    <Box as="a" href="/link">Link element</Box>
  </>
)
```

### 2. Controlled vs Uncontrolled Pattern
```jsx
// src/components/ui/Input.jsx
import React, { useState, useRef } from 'react'

const Input = ({
  value: controlledValue,
  defaultValue,
  onChange,
  className = '',
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const inputRef = useRef()

  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleChange = (e) => {
    const newValue = e.target.value
    
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    onChange?.(e)
  }

  // Imperative methods for uncontrolled usage
  const focus = () => inputRef.current?.focus()
  const blur = () => inputRef.current?.blur()
  const getValue = () => inputRef.current?.value

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={handleChange}
      className={`
        px-3 py-2 border border-gray-300 rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        dark:border-gray-600 dark:bg-gray-700 dark:text-white
        ${className}
      `}
      {...props}
    />
  )
}

// Usage examples
const ControlledExample = () => {
  const [value, setValue] = useState('')
  
  return (
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  )
}

const UncontrolledExample = () => (
  <Input 
    defaultValue="Initial value"
    placeholder="Uncontrolled input"
  />
)
```

### 3. ForwardRef Pattern
```jsx
// src/components/ui/Button.jsx
import React, { forwardRef } from 'react'

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

// Usage with ref
const Example = () => {
  const buttonRef = useRef()
  
  const focusButton = () => {
    buttonRef.current?.focus()
  }
  
  return (
    <>
      <Button ref={buttonRef}>Focusable Button</Button>
      <button onClick={focusButton}>Focus the button</button>
    </>
  )
}
```

## 📊 State Management Patterns

### 1. Reducer Pattern for Complex State
```jsx
// src/hooks/useFormReducer.js
import { useReducer } from 'react'

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: undefined // Clear error when field changes
        }
      }
    
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      }
    
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.isSubmitting
      }
    
    case 'RESET_FORM':
      return {
        values: action.initialValues || {},
        errors: {},
        isSubmitting: false
      }
    
    default:
      return state
  }
}

export const useFormReducer = (initialValues = {}) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    isSubmitting: false
  })

  const setField = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  const setErrors = (errors) => {
    dispatch({ type: 'SET_ERRORS', errors })
  }

  const setSubmitting = (isSubmitting) => {
    dispatch({ type: 'SET_SUBMITTING', isSubmitting })
  }

  const reset = (newInitialValues) => {
    dispatch({ type: 'RESET_FORM', initialValues: newInitialValues })
  }

  return {
    ...state,
    setField,
    setErrors,
    setSubmitting,
    reset
  }
}
```

### 2. Provider Pattern for Context
```jsx
// src/context/NotificationContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.notification, id: Date.now() }]
    
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.id)
    
    case 'CLEAR_ALL':
      return []
    
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, [])

  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', notification })
    
    // Auto-remove after delay
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(notification.id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', id })
  }

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
```

## 🔄 Error Handling Patterns

### 1. Error Boundary Pattern
```jsx
// src/components/ErrorBoundary.jsx
import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, onError } = this.props
      
      if (Fallback) {
        return (
          <Fallback 
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            resetError={() => this.setState({ hasError: false })}
          />
        )
      }

      return (
        <div className="error-boundary p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <details className="text-sm text-red-600">
            <summary>Error details</summary>
            <pre className="mt-2 overflow-auto">
              {this.state.error && this.state.error.toString()}
            </pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

// Usage
const App = () => (
  <ErrorBoundary fallback={CustomErrorFallback}>
    <MainApp />
  </ErrorBoundary>
)
```

### 2. Hook-Based Error Handling
```jsx
// src/hooks/useErrorHandler.js
import { useCallback } from 'react'
import { useNotifications } from '../context/NotificationContext'

export const useErrorHandler = () => {
  const { addNotification } = useNotifications()

  const handleError = useCallback((error, context = 'An error occurred') => {
    console.error(`Error in ${context}:`, error)
    
    addNotification({
      type: 'error',
      title: 'Error',
      message: error.message || context,
      duration: 5000
    })
  }, [addNotification])

  const withErrorHandling = useCallback((asyncFn, context) => {
    return async (...args) => {
      try {
        return await asyncFn(...args)
      } catch (error) {
        handleError(error, context)
        throw error
      }
    }
  }, [handleError])

  return { handleError, withErrorHandling }
}

// Usage
const UserProfile = () => {
  const { withErrorHandling } = useErrorHandler()
  
  const fetchUser = withErrorHandling(
    async (id) => {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return response.json()
    },
    'fetching user profile'
  )

  // Use fetchUser with automatic error handling
}
```

## 🎯 Performance Patterns

### 1. Memoization Patterns
```jsx
// src/components/ExpensiveComponent.jsx
import React, { memo, useMemo, useCallback } from 'react'

const ExpensiveComponent = memo(({ 
  items, 
  filter, 
  onItemClick,
  theme 
}) => {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
  }, [items, filter])

  const expensiveValue = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.value, 0)
  }, [filteredItems])

  // Memoize event handlers
  const handleItemClick = useCallback((item) => {
    onItemClick(item.id, item)
  }, [onItemClick])

  return (
    <div className={theme.isDark ? 'dark-theme' : 'light-theme'}>
      <div>Total: {expensiveValue}</div>
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.items.length === nextProps.items.length &&
    prevProps.filter === nextProps.filter &&
    prevProps.theme.isDark === nextProps.theme.isDark &&
    prevProps.onItemClick === nextProps.onItemClick
  )
})
```

### 2. Virtual Scrolling Pattern
```jsx
// src/components/VirtualList.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { useWindowSize } from '../hooks'

const VirtualList = ({ 
  items, 
  itemHeight = 50, 
  containerHeight = 400,
  renderItem 
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const bufferCount = 5
  
  const { startIndex, endIndex, totalHeight } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferCount)
    const end = Math.min(items.length - 1, start + visibleCount + bufferCount * 2)
    
    return {
      startIndex: start,
      endIndex: end,
      totalHeight: items.length * itemHeight
    }
  }, [scrollTop, itemHeight, items.length, visibleCount, bufferCount])

  const visibleItems = items.slice(startIndex, endIndex + 1)

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

## 📚 Related Documentation

- **[Component Architecture](./components.md)** - Component organization
- **[Custom Hooks](./hooks.md)** - Reusable logic patterns
- **[Context API](./context-state.md)** - State management
- **[Examples](./examples.md)** - Practical implementations

---

**Master these patterns to build scalable, maintainable React applications!** 🎯
