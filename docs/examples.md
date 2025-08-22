# Examples & Code Patterns

Practical examples and common patterns for building features with the React Tailwind Template.

## 🚀 Quick Examples

### Basic Page Component

```jsx
// src/pages/Services.jsx
import { useAppContext } from '../context/AppContext'
import { Card } from '../components'

function Services() {
  const { state } = useAppContext()
  const { theme } = state

  const services = [
    { id: 1, name: 'Web Development', description: 'Modern web applications' },
    { id: 2, name: 'Mobile Apps', description: 'iOS and Android development' },
    { id: 3, name: 'Consulting', description: 'Technical consulting services' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Our Services
      </h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} hover>
            <Card.Header>
              <h3 className={`text-xl font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {service.name}
              </h3>
            </Card.Header>
            <Card.Body>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Services
```

### Form with Validation

```jsx
// src/components/ContactForm.jsx
import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { Button, Input } from '../components'

function ContactForm() {
  const { state } = useAppContext()
  const { theme } = state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reset form
      setFormData({ name: '', email: '', message: '' })
      alert('Message sent successfully!')
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`max-w-md mx-auto p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Contact Us
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your full name"
        />
        
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
        />
        
        <div className="space-y-1">
          <label className={`block text-sm font-medium ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}

export default ContactForm
```

### Custom Hook Example

```jsx
// src/hooks/useApi.js
import { useState, useEffect } from 'react'

export function useApi(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(url, options)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
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

  return { data, loading, error }
}

// Usage example
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## 🔧 Advanced Patterns

### Higher-Order Component for Theme

```jsx
// src/utils/withTheme.jsx
import { useAppContext } from '../context/AppContext'

function withTheme(WrappedComponent) {
  return function ThemedComponent(props) {
    const { state } = useAppContext()
    const { theme } = state

    return <WrappedComponent {...props} theme={theme} />
  }
}

// Usage
const ThemedButton = withTheme(({ theme, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded ${
      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
    }`}
    {...props}
  >
    {children}
  </button>
))
```

### Error Boundary Component

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react'
import { useAppContext } from '../context/AppContext'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

function ErrorFallback({ error }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } shadow-lg text-center`}>
        <h2 className={`text-xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Something went wrong
        </h2>
        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}

export default ErrorBoundary
```

### Context Provider Pattern

```jsx
// src/context/NotificationContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.payload, id: Date.now() }]
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload)
    default:
      return state
  }
}

export function NotificationProvider({ children }) {
  const [notifications, dispatch] = useReducer(notificationReducer, [])

  const addNotification = (message, type = 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message, type }
    })
  }

  const removeNotification = (id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    })
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification
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

## 📱 Responsive Design Patterns

### Mobile-First Component

```jsx
// src/components/ResponsiveCard.jsx
import { useAppContext } from '../context/AppContext'

function ResponsiveCard({ title, content, image }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg transition-colors ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Mobile: Image on top, tablet/desktop: side by side */}
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <h3 className={`text-xl font-bold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
```

### Responsive Navigation

```jsx
// src/components/MobileMenu.jsx
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useAppContext()
  const { theme } = state

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className={`md:hidden p-2 rounded-lg ${
          theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu} />
          
          <div className={`fixed top-0 right-0 w-64 h-full ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            <div className="p-4">
              <button
                onClick={toggleMenu}
                className={`float-right p-2 rounded-lg ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="p-4 space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
```

## 🔄 State Management Patterns

### Local Component State

```jsx
// Simple local state for form inputs, toggles, etc.
function SearchBox() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useDebounce(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${searchQuery}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    handleSearch(query)
  }, [query, handleSearch])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Searching...</div>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Context for Feature-Specific State

```jsx
// src/context/ShoppingCartContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'CLEAR_CART':
      return { ...state, items: [] }
    
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
```

---

These examples demonstrate common patterns and best practices for building features with the React Tailwind Template. Each example includes theme awareness, accessibility, and follows React best practices.
