# Adding New Features

Step-by-step guide for extending the React Tailwind Template with new functionality.

## 🚀 Quick Feature Addition

### Adding a New Page

**1. Create the page component:**
```bash
# Create the file
touch src/pages/Services.jsx
```

```jsx
// src/pages/Services.jsx
import { useAppContext } from '../context/AppContext'

function Services() {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-3xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Our Services
      </h1>
      <p className={`text-lg ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Welcome to our services page!
      </p>
    </div>
  )
}

export default Services
```

**2. Add the route:**
```jsx
// src/App.jsx
import Services from './pages/Services'

function App() {
  // ... existing code

  return (
    <div className={/* theme classes */}>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />  {/* New route */}
        </Routes>
      </main>
    </div>
  )
}
```

**3. Add navigation link:**
```jsx
// src/components/layout/Navbar.jsx
function Navbar() {
  // ... existing code

  return (
    <nav>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/services">Services</Link>  {/* New link */}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
```

### Adding a New Component

**1. Create the component:**
```jsx
// src/components/ui/Modal.jsx
import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

function Modal({ isOpen, onClose, title, children }) {
  const { state } = useAppContext()
  const { theme } = state

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative w-full max-w-md rounded-lg shadow-xl transition-all ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h3 className={`text-lg font-medium ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`rounded-lg p-1 transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
```

**2. Add to barrel exports:**
```jsx
// src/components/index.js
export { default as Modal } from './ui/Modal'
```

**3. Use the component:**
```jsx
// In any component
import { useState } from 'react'
import { Modal } from '../components'

function SomeComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>Modal content goes here!</p>
      </Modal>
    </div>
  )
}
```

## 🏗️ Advanced Feature Examples

### Adding Authentication

**1. Create auth context:**
```jsx
// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  useEffect(() => {
    // Check for existing session on app load
    const token = localStorage.getItem('auth_token')
    if (token) {
      // Verify token with API
      verifyToken(token)
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('auth_token', data.token)
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

**2. Create protected route component:**
```jsx
// src/components/ProtectedRoute.jsx
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
```

**3. Create login page:**
```jsx
// src/pages/Login.jsx
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '../components'

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(credentials.email, credentials.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="Email"
          value={credentials.email}
          onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
          required
        />
        <Input
          type="password"
          label="Password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  )
}

export default Login
```

### Adding State Management for Complex Data

**1. Create feature-specific context:**
```jsx
// src/context/TodoContext.jsx
import React, { createContext, useContext, useReducer } from 'react'

const TodoContext = createContext()

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false,
          createdAt: new Date()
        }]
      }
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    
    default:
      return state
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all' // 'all', 'active', 'completed'
  })

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed
      case 'completed':
        return todo.completed
      default:
        return true
    }
  })

  return (
    <TodoContext.Provider value={{
      todos: filteredTodos,
      filter: state.filter,
      addTodo,
      toggleTodo,
      deleteTodo,
      setFilter
    }}>
      {children}
    </TodoContext.Provider>
  )
}

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider')
  }
  return context
}
```

### Adding API Integration

**1. Create API service:**
```jsx
// src/services/todoApi.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

class TodoAPI {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('auth_token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    
    return response.json()
  }

  async getTodos() {
    return this.request('/todos')
  }

  async createTodo(todo) {
    return this.request('/todos', {
      method: 'POST',
      body: JSON.stringify(todo)
    })
  }

  async updateTodo(id, updates) {
    return this.request(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
  }

  async deleteTodo(id) {
    return this.request(`/todos/${id}`, {
      method: 'DELETE'
    })
  }
}

export const todoAPI = new TodoAPI()
```

**2. Create custom hook for API integration:**
```jsx
// src/hooks/useTodoAPI.js
import { useState, useEffect } from 'react'
import { todoAPI } from '../services/todoApi'

export function useTodoAPI() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await todoAPI.getTodos()
      setTodos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createTodo = async (todoData) => {
    try {
      const newTodo = await todoAPI.createTodo(todoData)
      setTodos(prev => [...prev, newTodo])
      return newTodo
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoAPI.updateTodo(id, updates)
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ))
      return updatedTodo
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id)
      setTodos(prev => prev.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    refetch: fetchTodos
  }
}
```

## 📦 Package Integration

### Adding External Libraries

**1. Install the package:**
```bash
npm install react-query axios date-fns
```

**2. Configure in your app:**
```jsx
// src/main.jsx
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

**3. Use in components:**
```jsx
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { format } from 'date-fns'

function TodoList() {
  const queryClient = useQueryClient()
  
  const { data: todos, isLoading } = useQuery('todos', todoAPI.getTodos)
  
  const createMutation = useMutation(todoAPI.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    }
  })

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        todos.map(todo => (
          <div key={todo.id}>
            <span>{todo.text}</span>
            <span>{format(new Date(todo.createdAt), 'MMM dd, yyyy')}</span>
          </div>
        ))
      )}
    </div>
  )
}
```

## 🎨 Styling New Features

### Custom Tailwind Components

**1. Add to global CSS:**
```css
/* src/index.css */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
  }
  
  .card {
    @apply p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700;
  }
}
```

**2. Use in components:**
```jsx
function MyComponent() {
  return (
    <div className="card">
      <h2>Title</h2>
      <p>Content</p>
      <button className="btn-primary">Action</button>
    </div>
  )
}
```

---

This guide provides patterns for extending the template with new pages, components, state management, API integration, and styling while maintaining the theme system and best practices.
