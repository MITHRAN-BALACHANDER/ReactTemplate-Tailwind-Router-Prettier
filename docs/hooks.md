# Custom Hooks Documentation

Comprehensive guide to custom React hooks for reusable logic and utilities.

## 🪝 Hook Architecture

The template includes several custom hooks for common functionality:

```
src/
└── hooks/
    ├── index.js              # Hook exports
    ├── useLocalStorage.js    # localStorage management
    ├── useDebounce.js        # Debounced values
    ├── useWindowSize.js      # Window dimensions
    ├── useToggle.js          # Boolean state toggle
    ├── useFetch.js           # API data fetching
    └── useForm.js            # Form state management
```

## 💾 useLocalStorage Hook

### Implementation
```jsx
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'

/**
 * Custom hook for localStorage state management
 * @param {string} key - localStorage key
 * @param {any} initialValue - default value if key doesn't exist
 * @returns {Array} [storedValue, setValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
```

### Usage Examples
```jsx
// Theme persistence
const [theme, setTheme] = useLocalStorage('theme', 'light')

// User preferences
const [preferences, setPreferences] = useLocalStorage('userPrefs', {
  language: 'en',
  notifications: true,
  darkMode: false
})

// Recent searches
const [recentSearches, setRecentSearches] = useLocalStorage('searches', [])

// Add new search
const addSearch = (query) => {
  setRecentSearches(prev => [query, ...prev.slice(0, 4)]) // Keep last 5
}
```

## ⏱️ useDebounce Hook

### Implementation
```jsx
// src/hooks/useDebounce.js
import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing values
 * @param {any} value - value to debounce
 * @param {number} delay - delay in milliseconds
 * @returns {any} debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Set debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup timeout on value change or unmount
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

### Usage Examples
```jsx
// Search input debouncing
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search API call
      searchAPI(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm])

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}

// API request debouncing
const AutoSave = ({ data }) => {
  const debouncedData = useDebounce(data, 1000)

  useEffect(() => {
    // Auto-save after 1 second of no changes
    saveToAPI(debouncedData)
  }, [debouncedData])

  return <div>Auto-saving...</div>
}
```

## 📐 useWindowSize Hook

### Implementation
```jsx
// src/hooks/useWindowSize.js
import { useState, useEffect } from 'react'

/**
 * Custom hook to track window dimensions
 * @returns {Object} { width, height, isMobile, isTablet, isDesktop }
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Tailwind CSS breakpoints
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile: windowSize.width < breakpoints.md,
    isTablet: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
    // Breakpoint checks
    isSm: windowSize.width >= breakpoints.sm,
    isMd: windowSize.width >= breakpoints.md,
    isLg: windowSize.width >= breakpoints.lg,
    isXl: windowSize.width >= breakpoints.xl,
    is2Xl: windowSize.width >= breakpoints['2xl']
  }
}
```

### Usage Examples
```jsx
// Responsive component rendering
const ResponsiveComponent = () => {
  const { isMobile, isTablet, isDesktop } = useWindowSize()

  if (isMobile) {
    return <MobileView />
  }
  
  if (isTablet) {
    return <TabletView />
  }
  
  return <DesktopView />
}

// Conditional navigation
const Navigation = () => {
  const { isMobile, width } = useWindowSize()

  return (
    <nav>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
      {width < 500 && <CompactLogo />}
    </nav>
  )
}
```

## 🔄 useToggle Hook

### Implementation
```jsx
// src/hooks/useToggle.js
import { useState, useCallback } from 'react'

/**
 * Custom hook for boolean state toggle
 * @param {boolean} initialValue - initial boolean value
 * @returns {Array} [value, toggle, setValue] tuple
 */
export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue(prev => !prev)
  }, [])

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setValue, setTrue, setFalse]
}
```

### Usage Examples
```jsx
// Modal visibility
const Modal = () => {
  const [isOpen, toggleModal, setIsOpen, openModal, closeModal] = useToggle(false)

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={closeModal}>Close</button>
          <div>Modal content</div>
        </div>
      )}
    </>
  )
}

// Sidebar toggle
const Layout = () => {
  const [sidebarOpen, toggleSidebar] = useToggle(false)

  return (
    <div className="flex">
      <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        Sidebar content
      </aside>
      <main className="flex-1">
        <button onClick={toggleSidebar} className="md:hidden">
          Toggle Sidebar
        </button>
      </main>
    </div>
  )
}
```

## 🌐 useFetch Hook

### Implementation
```jsx
// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for API data fetching
 * @param {string} url - API endpoint URL
 * @param {Object} options - fetch options
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    if (!url) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}
```

### Usage Examples
```jsx
// Basic data fetching
const UserProfile = ({ userId }) => {
  const { data: user, loading, error, refetch } = useFetch(`/api/users/${userId}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}

// POST request with useFetch
const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const { data, loading, error } = useFetch(
    shouldSubmit ? '/api/posts' : null,
    {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' }
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    setShouldSubmit(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
      />
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
      {error && <div>Error: {error}</div>}
      {data && <div>Post created successfully!</div>}
    </form>
  )
}
```

## 📝 useForm Hook

### Implementation
```jsx
// src/hooks/useForm.js
import { useState, useCallback } from 'react'

/**
 * Custom hook for form state management
 * @param {Object} initialValues - initial form values
 * @param {Function} validate - validation function
 * @returns {Object} form state and handlers
 */
export const useForm = (initialValues = {}, validate = () => ({})) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }, [errors])

  // Handle field blur (mark as touched)
  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    // Validate field on blur
    const fieldErrors = validate(values)
    if (fieldErrors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name]
      }))
    }
  }, [values, validate])

  // Handle form submission
  const handleSubmit = useCallback((onSubmit) => {
    return async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Validate all fields
      const formErrors = validate(values)
      setErrors(formErrors)

      // Mark all fields as touched
      const touchedFields = Object.keys(values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
      setTouched(touchedFields)

      // Submit if no errors
      if (Object.keys(formErrors).length === 0) {
        try {
          await onSubmit(values)
        } catch (error) {
          console.error('Form submission error:', error)
        }
      }

      setIsSubmitting(false)
    }
  }, [values, validate])

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  // Set field value programmatically
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  // Set multiple values
  const setValues_ = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }))
  }, [])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setValues: setValues_,
    // Utility functions
    isValid: Object.keys(errors).length === 0,
    isDirty: Object.keys(touched).length > 0
  }
}
```

### Usage Examples
```jsx
// Contact form with validation
const ContactForm = () => {
  const validate = (values) => {
    const errors = {}
    
    if (!values.name) {
      errors.name = 'Name is required'
    }
    
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!values.message) {
      errors.message = 'Message is required'
    }
    
    return errors
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm({
    name: '',
    email: '',
    message: ''
  }, validate)

  const onSubmit = async (formData) => {
    // Submit form data
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
        />
        {touched.name && errors.name && (
          <span className="error">{errors.name}</span>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your email"
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your message"
        />
        {touched.message && errors.message && (
          <span className="error">{errors.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

## 📦 Hook Exports

### Main Index File
```jsx
// src/hooks/index.js
export { useLocalStorage } from './useLocalStorage'
export { useDebounce } from './useDebounce'
export { useWindowSize } from './useWindowSize'
export { useToggle } from './useToggle'
export { useFetch } from './useFetch'
export { useForm } from './useForm'

// Re-export commonly used hooks
export { useState, useEffect, useContext, useReducer } from 'react'
```

### Usage in Components
```jsx
// Import multiple hooks
import { useLocalStorage, useDebounce, useWindowSize } from '../hooks'

// Or import specific hooks
import { useForm } from '../hooks/useForm'
```

## 🧪 Testing Custom Hooks

### Hook Testing Utilities
```jsx
// tests/hook-utils.js
import { renderHook, act } from '@testing-library/react'

// Test useToggle hook
test('useToggle toggles value', () => {
  const { result } = renderHook(() => useToggle(false))
  
  expect(result.current[0]).toBe(false)
  
  act(() => {
    result.current[1]() // Call toggle function
  })
  
  expect(result.current[0]).toBe(true)
})

// Test useLocalStorage hook
test('useLocalStorage persists value', () => {
  const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
  
  expect(result.current[0]).toBe('initial')
  
  act(() => {
    result.current[1]('updated') // Set new value
  })
  
  expect(result.current[0]).toBe('updated')
  expect(localStorage.getItem('test-key')).toBe('"updated"')
})
```

## 🚀 Advanced Hook Patterns

### Composition Hook
```jsx
// Combine multiple hooks for complex logic
const useUserPreferences = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')
  const [notifications, setNotifications] = useLocalStorage('notifications', true)

  const preferences = { theme, language, notifications }
  
  const updatePreferences = (updates) => {
    if (updates.theme) setTheme(updates.theme)
    if (updates.language) setLanguage(updates.language)
    if (updates.notifications !== undefined) setNotifications(updates.notifications)
  }

  return {
    preferences,
    updatePreferences,
    setTheme,
    setLanguage,
    setNotifications
  }
}
```

## 📚 Related Documentation

- **[Context API](./context-state.md)** - Global state management
- **[Component Architecture](./components.md)** - Component patterns
- **[Examples](./examples.md)** - Practical implementations

---

**Build reusable logic with powerful custom hooks!** 🪝
