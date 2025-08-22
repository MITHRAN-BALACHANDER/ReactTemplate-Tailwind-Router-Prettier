# Services & API Integration

Complete guide to API integration, service layer architecture, and data management patterns.

## 🌐 Service Architecture

The template includes a well-structured service layer for API communication and external integrations.

```
src/
└── services/
    ├── index.js           # Service exports
    ├── api.js             # Base API client
    ├── authService.js     # Authentication service
    ├── userService.js     # User management
    ├── dataService.js     # Generic data operations
    └── storageService.js  # Storage utilities
```

## 🔧 Base API Client

### Core API Configuration
```jsx
// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

/**
 * HTTP client configuration with interceptors
 */
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    }
  }

  /**
   * Get authorization header from localStorage
   * @returns {Object} Authorization header object
   */
  getAuthHeaders() {
    const token = localStorage.getItem('authToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  /**
   * Make HTTP request with error handling
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @returns {Promise} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...this.getAuthHeaders(),
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)
      
      // Handle different response types
      if (!response.ok) {
        await this.handleErrorResponse(response)
      }

      // Check if response has content
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }
      
      return await response.text()
    } catch (error) {
      console.error('API Request failed:', error)
      throw this.normalizeError(error)
    }
  }

  /**
   * Handle HTTP error responses
   * @param {Response} response - Fetch response object
   */
  async handleErrorResponse(response) {
    let errorData
    
    try {
      errorData = await response.json()
    } catch {
      errorData = { message: 'An unexpected error occurred' }
    }

    const error = new Error(errorData.message || `HTTP ${response.status}`)
    error.status = response.status
    error.data = errorData
    
    // Handle specific status codes
    switch (response.status) {
      case 401:
        this.handleUnauthorized()
        break
      case 403:
        error.message = 'Access forbidden'
        break
      case 404:
        error.message = 'Resource not found'
        break
      case 500:
        error.message = 'Server error. Please try again later.'
        break
      default:
        break
    }
    
    throw error
  }

  /**
   * Handle unauthorized access
   */
  handleUnauthorized() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    // Redirect to login page
    window.location.href = '/login'
  }

  /**
   * Normalize error objects
   * @param {Error} error - Error object
   * @returns {Object} Normalized error
   */
  normalizeError(error) {
    return {
      message: error.message || 'Network error',
      status: error.status || 0,
      data: error.data || null
    }
  }

  // HTTP method helpers
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    return this.request(url, { method: 'GET' })
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  /**
   * Upload file with progress tracking
   * @param {string} endpoint - Upload endpoint
   * @param {File} file - File to upload
   * @param {Function} onProgress - Progress callback
   * @returns {Promise} Upload response
   */
  async uploadFile(endpoint, file, onProgress = () => {}) {
    const formData = new FormData()
    formData.append('file', file)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100
          onProgress(percentComplete)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText))
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed'))
      })

      xhr.open('POST', `${this.baseURL}${endpoint}`)
      
      // Add auth headers
      const authHeaders = this.getAuthHeaders()
      Object.entries(authHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      xhr.send(formData)
    })
  }
}

// Create and export API client instance
export const apiClient = new ApiClient()
export default apiClient
```

## 🔐 Authentication Service

### User Authentication Management
```jsx
// src/services/authService.js
import apiClient from './api'

/**
 * Authentication service for user management
 */
export const authService = {
  /**
   * User login
   * @param {Object} credentials - User credentials
   * @returns {Promise} User data and token
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      
      // Store authentication data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  /**
   * User registration
   * @param {Object} userData - User registration data
   * @returns {Promise} User data and token
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData)
      
      // Store authentication data
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      return response
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  },

  /**
   * User logout
   */
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    }
  },

  /**
   * Refresh authentication token
   * @returns {Promise} New token data
   */
  async refreshToken() {
    try {
      const response = await apiClient.post('/auth/refresh')
      localStorage.setItem('authToken', response.token)
      return response
    } catch (error) {
      // Token refresh failed, logout user
      this.logout()
      throw error
    }
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} Current user data
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch (error) {
      console.error('Error parsing user data:', error)
      return null
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken')
    const user = this.getCurrentUser()
    return !!(token && user)
  },

  /**
   * Get authentication token
   * @returns {string|null} Authentication token
   */
  getToken() {
    return localStorage.getItem('authToken')
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} Reset response
   */
  async requestPasswordReset(email) {
    return apiClient.post('/auth/forgot-password', { email })
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @returns {Promise} Reset response
   */
  async resetPassword(token, password) {
    return apiClient.post('/auth/reset-password', { token, password })
  },

  /**
   * Verify email address
   * @param {string} token - Verification token
   * @returns {Promise} Verification response
   */
  async verifyEmail(token) {
    return apiClient.post('/auth/verify-email', { token })
  }
}

export default authService
```

## 👤 User Service

### User Data Management
```jsx
// src/services/userService.js
import apiClient from './api'

/**
 * User service for profile and user data management
 */
export const userService = {
  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise} User profile data
   */
  async getProfile(userId = 'me') {
    return apiClient.get(`/users/${userId}`)
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise} Updated profile
   */
  async updateProfile(profileData) {
    const response = await apiClient.put('/users/me', profileData)
    
    // Update stored user data
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
    const updatedUser = { ...currentUser, ...response }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    return response
  },

  /**
   * Upload user avatar
   * @param {File} file - Avatar image file
   * @param {Function} onProgress - Upload progress callback
   * @returns {Promise} Upload response
   */
  async uploadAvatar(file, onProgress) {
    return apiClient.uploadFile('/users/me/avatar', file, onProgress)
  },

  /**
   * Change user password
   * @param {Object} passwordData - Password change data
   * @returns {Promise} Change response
   */
  async changePassword(passwordData) {
    return apiClient.put('/users/me/password', passwordData)
  },

  /**
   * Get user preferences
   * @returns {Promise} User preferences
   */
  async getPreferences() {
    return apiClient.get('/users/me/preferences')
  },

  /**
   * Update user preferences
   * @param {Object} preferences - Preference updates
   * @returns {Promise} Updated preferences
   */
  async updatePreferences(preferences) {
    return apiClient.put('/users/me/preferences', preferences)
  },

  /**
   * Delete user account
   * @param {Object} confirmationData - Account deletion confirmation
   * @returns {Promise} Deletion response
   */
  async deleteAccount(confirmationData) {
    return apiClient.delete('/users/me', confirmationData)
  },

  /**
   * Get user activity log
   * @param {Object} params - Query parameters
   * @returns {Promise} Activity log
   */
  async getActivityLog(params = {}) {
    return apiClient.get('/users/me/activity', params)
  }
}

export default userService
```

## 📊 Generic Data Service

### CRUD Operations Template
```jsx
// src/services/dataService.js
import apiClient from './api'

/**
 * Generic data service for CRUD operations
 * @param {string} resource - API resource name
 */
export const createDataService = (resource) => ({
  /**
   * Get all items with optional filtering
   * @param {Object} params - Query parameters
   * @returns {Promise} List of items
   */
  async getAll(params = {}) {
    return apiClient.get(`/${resource}`, params)
  },

  /**
   * Get single item by ID
   * @param {string} id - Item ID
   * @returns {Promise} Item data
   */
  async getById(id) {
    return apiClient.get(`/${resource}/${id}`)
  },

  /**
   * Create new item
   * @param {Object} data - Item data
   * @returns {Promise} Created item
   */
  async create(data) {
    return apiClient.post(`/${resource}`, data)
  },

  /**
   * Update existing item
   * @param {string} id - Item ID
   * @param {Object} data - Update data
   * @returns {Promise} Updated item
   */
  async update(id, data) {
    return apiClient.put(`/${resource}/${id}`, data)
  },

  /**
   * Partially update item
   * @param {string} id - Item ID
   * @param {Object} data - Partial update data
   * @returns {Promise} Updated item
   */
  async patch(id, data) {
    return apiClient.patch(`/${resource}/${id}`, data)
  },

  /**
   * Delete item
   * @param {string} id - Item ID
   * @returns {Promise} Deletion response
   */
  async delete(id) {
    return apiClient.delete(`/${resource}/${id}`)
  },

  /**
   * Bulk operations
   * @param {Array} ids - Array of item IDs
   * @param {string} operation - Bulk operation type
   * @returns {Promise} Bulk operation response
   */
  async bulk(ids, operation) {
    return apiClient.post(`/${resource}/bulk`, { ids, operation })
  }
})

// Pre-configured services for common resources
export const postsService = createDataService('posts')
export const commentsService = createDataService('comments')
export const categoriesService = createDataService('categories')

// Extended service with custom methods
export const articlesService = {
  ...createDataService('articles'),
  
  /**
   * Get published articles
   * @param {Object} params - Query parameters
   * @returns {Promise} Published articles
   */
  async getPublished(params = {}) {
    return apiClient.get('/articles/published', params)
  },

  /**
   * Get featured articles
   * @param {number} limit - Number of articles
   * @returns {Promise} Featured articles
   */
  async getFeatured(limit = 5) {
    return apiClient.get('/articles/featured', { limit })
  },

  /**
   * Search articles
   * @param {string} query - Search query
   * @param {Object} filters - Search filters
   * @returns {Promise} Search results
   */
  async search(query, filters = {}) {
    return apiClient.get('/articles/search', { query, ...filters })
  }
}
```

## 💾 Storage Service

### Client-Side Storage Management
```jsx
// src/services/storageService.js

/**
 * Storage service for client-side data persistence
 */
export const storageService = {
  /**
   * localStorage operations
   */
  local: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('LocalStorage set error:', error)
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error('LocalStorage get error:', error)
        return defaultValue
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('LocalStorage remove error:', error)
      }
    },

    clear() {
      try {
        localStorage.clear()
      } catch (error) {
        console.error('LocalStorage clear error:', error)
      }
    }
  },

  /**
   * sessionStorage operations
   */
  session: {
    set(key, value) {
      try {
        sessionStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('SessionStorage set error:', error)
      }
    },

    get(key, defaultValue = null) {
      try {
        const item = sessionStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error('SessionStorage get error:', error)
        return defaultValue
      }
    },

    remove(key) {
      try {
        sessionStorage.removeItem(key)
      } catch (error) {
        console.error('SessionStorage remove error:', error)
      }
    },

    clear() {
      try {
        sessionStorage.clear()
      } catch (error) {
        console.error('SessionStorage clear error:', error)
      }
    }
  },

  /**
   * Cache management with expiration
   */
  cache: {
    set(key, value, expirationMinutes = 60) {
      const expirationTime = Date.now() + (expirationMinutes * 60 * 1000)
      const cacheItem = {
        value,
        expiration: expirationTime
      }
      storageService.local.set(`cache_${key}`, cacheItem)
    },

    get(key) {
      const cacheItem = storageService.local.get(`cache_${key}`)
      
      if (!cacheItem) return null
      
      if (Date.now() > cacheItem.expiration) {
        storageService.local.remove(`cache_${key}`)
        return null
      }
      
      return cacheItem.value
    },

    remove(key) {
      storageService.local.remove(`cache_${key}`)
    },

    clear() {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key)
        }
      })
    }
  }
}

export default storageService
```

## 🔄 Service Integration Examples

### React Component Integration
```jsx
// Example: User Profile Component
import React, { useState, useEffect } from 'react'
import { userService } from '../services'
import { useNotifications } from '../hooks'

const UserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const { showSuccess, showError } = useNotifications()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const profileData = await userService.getProfile()
      setProfile(profileData)
    } catch (error) {
      showError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      setUpdating(true)
      const updatedProfile = await userService.updateProfile(updates)
      setProfile(updatedProfile)
      showSuccess('Profile updated successfully')
    } catch (error) {
      showError('Failed to update profile')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return <div>Loading profile...</div>

  return (
    <div className="profile">
      <h1>User Profile</h1>
      {/* Profile form and display */}
    </div>
  )
}
```

### Custom Hook for API Operations
```jsx
// Custom hook for data fetching with services
import { useState, useEffect } from 'react'

export const useServiceData = (service, method, params = [], dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await service[method](...params)
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    setLoading(true)
    try {
      const result = await service[method](...params)
      setData(result)
      setError(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Usage
const ArticlesList = () => {
  const { data: articles, loading, error, refetch } = useServiceData(
    articlesService,
    'getPublished',
    [{ page: 1, limit: 10 }],
    []
  )

  // Component rendering...
}
```

## 📦 Service Exports

### Main Index File
```jsx
// src/services/index.js
export { default as apiClient } from './api'
export { authService } from './authService'
export { userService } from './userService'
export { createDataService, postsService, commentsService, articlesService } from './dataService'
export { storageService } from './storageService'

// Environment configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
}
```

## 🧪 Service Testing

### Mock Services for Testing
```jsx
// tests/mocks/services.js
export const mockAuthService = {
  login: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
  isAuthenticated: jest.fn()
}

export const mockUserService = {
  getProfile: jest.fn(),
  updateProfile: jest.fn(),
  uploadAvatar: jest.fn()
}

// Test example
test('user profile loads correctly', async () => {
  mockUserService.getProfile.mockResolvedValue({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  })

  render(<UserProfile />)
  
  expect(screen.getByText('Loading profile...')).toBeInTheDocument()
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

## 📚 Related Documentation

- **[Context API](./context-state.md)** - Global state management
- **[Custom Hooks](./hooks.md)** - Reusable API logic
- **[Environment Configuration](./environment.md)** - API configuration

---

**Build robust API integrations with structured service layers!** 🌐
