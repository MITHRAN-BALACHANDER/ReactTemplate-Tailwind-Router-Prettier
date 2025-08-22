/**
 * API Service Layer
 * 
 * This file contains all API-related functions for your React application.
 * It serves as a centralized location for HTTP requests and API interactions,
 * following the service layer pattern for better organization and maintainability.
 * 
 * Key Benefits of Service Layer:
 * - Centralized API logic
 * - Reusable functions across components
 * - Easier testing and mocking
 * - Consistent error handling
 * - Better separation of concerns
 * - Single source of truth for API endpoints
 * 
 * Learning Points:
 * - Modern fetch API usage with async/await
 * - Error handling strategies for HTTP requests
 * - Request and response data transformation
 * - API endpoint organization and configuration
 * - Authentication token management
 * - Request interceptors and middleware patterns
 */

/**
 * API Configuration
 * 
 * Centralized configuration for API settings. This makes it easy to
 * switch between development, staging, and production environments.
 * 
 * Environment Variables:
 * - VITE_API_BASE_URL: Base URL for the API
 * - Uses localhost:3001/api as default for development
 * 
 * Best Practices:
 * - Keep API URLs in environment variables
 * - Use different URLs for different environments
 * - Include API version in the URL when needed
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

/**
 * Generic API Request Function
 * 
 * This is the core function that handles all HTTP requests.
 * It provides consistent error handling and request/response transformation.
 * 
 * Features:
 * - Automatic JSON header setting
 * - Error handling with descriptive messages
 * - Automatic JSON response parsing
 * - Flexible configuration options
 * - Development logging support
 * 
 * @param {string} endpoint - API endpoint (will be appended to base URL)
 * @param {object} options - Fetch API options (method, headers, body, etc.)
 * @returns {Promise<any>} Parsed JSON response from the API
 * @throws {Error} If the request fails or returns non-ok status
 * 
 * @example
 * // Simple GET request
 * const data = await apiRequest('/users')
 * 
 * // POST request with data
 * const newUser = await apiRequest('/users', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'John', email: 'john@example.com' })
 * })
 */
const apiRequest = async (endpoint, options = {}) => {
  // Construct full URL by combining base URL and endpoint
  const url = `${API_BASE_URL}${endpoint}`
  
  // Set up default configuration with proper headers
  const config = {
    headers: {
      'Content-Type': 'application/json', // Tell server we're sending JSON
      'Accept': 'application/json',        // Tell server we expect JSON back
      ...options.headers, // Allow custom headers to override defaults
    },
    ...options, // Merge any additional fetch options
  }

  // Log request details in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('🌐 API Request:', {
      method: config.method || 'GET',
      url,
      headers: config.headers,
      body: config.body,
    })
  }

  try {
    // Make the HTTP request using the Fetch API
    const response = await fetch(url, config)
    
    // Log response details in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      })
    }
    
    // Check if the request was successful
    if (!response.ok) {
      // Create descriptive error message
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`
      throw new Error(errorMessage)
    }
    
    // Parse and return JSON response
    const data = await response.json()
    return data
    
  } catch (error) {
    // Log error details for debugging
    console.error('❌ API request failed:', {
      url,
      error: error.message,
      stack: error.stack,
    })
    
    // Re-throw error so calling code can handle it
    throw error
  }
}

/**
 * HTTP Method Helper Functions
 * 
 * These functions provide a clean, semantic interface for different HTTP methods.
 * They wrap the generic apiRequest function with method-specific defaults.
 * 
 * Benefits:
 * - Clean, readable code in components
 * - Consistent parameter patterns
 * - Built-in best practices for each HTTP method
 * - Easy to mock for testing
 */

/**
 * GET Request Helper
 * 
 * Used for retrieving data from the server. GET requests should not have
 * side effects and should be safe to retry multiple times.
 * 
 * Use Cases:
 * - Fetching user profiles, lists, details
 * - Loading configuration data
 * - Retrieving search results
 * - Getting current state/status
 * 
 * @param {string} endpoint - API endpoint to request
 * @param {object} headers - Additional headers to include
 * @returns {Promise<any>} Data from the server
 * 
 * @example
 * // Get all users
 * const users = await get('/users')
 * 
 * // Get a specific user
 * const user = await get('/users/123')
 * 
 * // Get with custom headers (e.g., authentication)
 * const protectedData = await get('/admin/users', {
 *   'Authorization': 'Bearer ' + token
 * })
 */
export const get = (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'GET',
    headers,
  })
}

/**
 * POST Request Helper
 * 
 * Used for creating new resources on the server. POST requests typically
 * have side effects and should not be repeated without user confirmation.
 * 
 * Use Cases:
 * - Creating new users, posts, orders
 * - Submitting forms
 * - User authentication/login
 * - Triggering server actions
 * 
 * @param {string} endpoint - API endpoint to post to
 * @param {object} data - Data to send in the request body
 * @param {object} headers - Additional headers to include
 * @returns {Promise<any>} Response data from the server
 * 
 * @example
 * // Create a new user
 * const newUser = await post('/users', {
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   role: 'user'
 * })
 * 
 * // Login with credentials
 * const authResponse = await post('/auth/login', {
 *   username: 'john@example.com',
 *   password: 'securePassword123'
 * })
 */
export const post = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data), // Convert JavaScript object to JSON string
  })
}

/**
 * PUT Request Helper
 * 
 * Used for updating/replacing entire resources on the server. PUT requests
 * are idempotent - running them multiple times has the same effect.
 * 
 * Use Cases:
 * - Updating user profiles
 * - Replacing entire documents
 * - Setting configuration values
 * - Full resource updates
 * 
 * PUT vs PATCH:
 * - PUT: Replace the entire resource
 * - PATCH: Update only specific fields
 * 
 * @param {string} endpoint - API endpoint to update
 * @param {object} data - Complete data to replace the resource
 * @param {object} headers - Additional headers to include
 * @returns {Promise<any>} Updated resource data
 * 
 * @example
 * // Update entire user profile
 * const updatedUser = await put('/users/123', {
 *   id: 123,
 *   name: 'John Smith',
 *   email: 'john.smith@example.com',
 *   role: 'admin',
 *   active: true
 * })
 */
export const put = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
}

/**
 * PATCH Request Helper
 * 
 * Used for partial updates to resources on the server. Only the fields
 * provided in the data object will be updated.
 * 
 * Use Cases:
 * - Updating specific user fields
 * - Toggling status flags
 * - Incremental updates
 * - Partial form submissions
 * 
 * @param {string} endpoint - API endpoint to update
 * @param {object} data - Partial data to update
 * @param {object} headers - Additional headers to include
 * @returns {Promise<any>} Updated resource data
 * 
 * @example
 * // Update only user's email
 * const updatedUser = await patch('/users/123', {
 *   email: 'newemail@example.com'
 * })
 * 
 * // Toggle user active status
 * await patch('/users/123', { active: false })
 */
export const patch = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  })
}

/**
 * DELETE Request Helper
 * 
 * Used for removing resources from the server. DELETE requests are
 * typically idempotent - deleting the same resource twice has the same effect.
 * 
 * Use Cases:
 * - Removing user accounts
 * - Deleting posts or comments
 * - Canceling orders
 * - Clearing cache entries
 * 
 * @param {string} endpoint - API endpoint of resource to delete
 * @param {object} headers - Additional headers to include
 * @returns {Promise<any>} Deletion confirmation or empty response
 * 
 * @example
 * // Delete a user
 * await del('/users/123')
 * 
 * // Delete with confirmation
 * const result = await del('/users/123')
 * console.log('Deleted:', result.success)
 */
export const del = (endpoint, headers = {}) => {
  return apiRequest(endpoint, {
    method: 'DELETE',
    headers,
  })
}

/**
 * User Service Functions
 * 
 * This object contains all user-related API operations organized in one place.
 * This pattern makes it easy to find and use user-related functions.
 * 
 * Benefits:
 * - Organized by domain/resource type
 * - Easy to import specific functions
 * - Consistent naming patterns
 * - Self-documenting API interface
 * 
 * Naming Convention:
 * - Use descriptive action words (get, create, update, delete)
 * - Include resource type in function name
 * - Use consistent parameter patterns
 */
export const userService = {
  /**
   * Get all users from the API
   * 
   * @returns {Promise<Array>} Array of user objects
   * @throws {Error} If request fails
   * 
   * @example
   * try {
   *   const users = await userService.getUsers()
   *   console.log(`Found ${users.length} users`)
   * } catch (error) {
   *   console.error('Failed to load users:', error.message)
   * }
   */
  getUsers: () => get('/users'),

  /**
   * Get a specific user by ID
   * 
   * @param {number|string} id - User ID to retrieve
   * @returns {Promise<object>} User object
   * @throws {Error} If user not found or request fails
   * 
   * @example
   * const user = await userService.getUser(123)
   * console.log('User name:', user.name)
   */
  getUser: (id) => get(`/users/${id}`),

  /**
   * Create a new user
   * 
   * @param {object} userData - User data to create
   * @param {string} userData.name - User's full name
   * @param {string} userData.email - User's email address
   * @param {string} [userData.role] - User's role (optional)
   * @returns {Promise<object>} Created user object with assigned ID
   * @throws {Error} If creation fails or validation errors
   * 
   * @example
   * const newUser = await userService.createUser({
   *   name: 'Jane Doe',
   *   email: 'jane@example.com',
   *   role: 'editor'
   * })
   * console.log('Created user with ID:', newUser.id)
   */
  createUser: (userData) => post('/users', userData),

  /**
   * Update an existing user
   * 
   * @param {number|string} id - User ID to update
   * @param {object} userData - Updated user data
   * @returns {Promise<object>} Updated user object
   * @throws {Error} If user not found or update fails
   * 
   * @example
   * const updatedUser = await userService.updateUser(123, {
   *   name: 'Jane Smith',
   *   email: 'jane.smith@example.com'
   * })
   */
  updateUser: (id, userData) => put(`/users/${id}`, userData),

  /**
   * Partially update a user (only specified fields)
   * 
   * @param {number|string} id - User ID to update
   * @param {object} partialData - Fields to update
   * @returns {Promise<object>} Updated user object
   * 
   * @example
   * // Only update email
   * await userService.patchUser(123, { email: 'new@example.com' })
   */
  patchUser: (id, partialData) => patch(`/users/${id}`, partialData),

  /**
   * Delete a user
   * 
   * @param {number|string} id - User ID to delete
   * @returns {Promise<any>} Deletion confirmation
   * @throws {Error} If user not found or deletion fails
   * 
   * @example
   * await userService.deleteUser(123)
   * console.log('User deleted successfully')
   */
  deleteUser: (id) => del(`/users/${id}`),
}

/**
 * Advanced Usage Examples and Best Practices:
 * 
 * 1. Using with React hooks:
 * ```jsx
 * import { useState, useEffect } from 'react'
 * import { userService } from '../services/api'
 * 
 * function UsersList() {
 *   const [users, setUsers] = useState([])
 *   const [loading, setLoading] = useState(true)
 *   const [error, setError] = useState(null)
 * 
 *   useEffect(() => {
 *     const loadUsers = async () => {
 *       try {
 *         const usersData = await userService.getUsers()
 *         setUsers(usersData)
 *       } catch (err) {
 *         setError(err.message)
 *       } finally {
 *         setLoading(false)
 *       }
 *     }
 * 
 *     loadUsers()
 *   }, [])
 * 
 *   // Component JSX here...
 * }
 * ```
 * 
 * 2. Error handling with user feedback:
 * ```jsx
 * const handleCreateUser = async (userData) => {
 *   try {
 *     const newUser = await userService.createUser(userData)
 *     setUsers(prev => [...prev, newUser])
 *     showSuccessMessage('User created successfully!')
 *   } catch (error) {
 *     if (error.message.includes('400')) {
 *       showErrorMessage('Invalid user data. Please check your inputs.')
 *     } else if (error.message.includes('409')) {
 *       showErrorMessage('User with this email already exists.')
 *     } else {
 *       showErrorMessage('Failed to create user. Please try again.')
 *     }
 *   }
 * }
 * ```
 * 
 * 3. Adding authentication headers:
 * ```jsx
 * // Store token in context/state management
 * const token = useAuthToken()
 * 
 * // Add auth header to requests
 * const getProtectedData = () => {
 *   return get('/protected-endpoint', {
 *     'Authorization': `Bearer ${token}`
 *   })
 * }
 * ```
 * 
 * 4. Request interceptors pattern:
 * ```jsx
 * // Enhanced API service with automatic auth
 * const authenticatedApiRequest = async (endpoint, options = {}) => {
 *   const token = getAuthToken() // Your auth logic
 *   
 *   return apiRequest(endpoint, {
 *     ...options,
 *     headers: {
 *       'Authorization': `Bearer ${token}`,
 *       ...options.headers,
 *     },
 *   })
 * }
 * ```
 * 
 * Testing Tips:
 * - Mock the entire api module in tests
 * - Test error scenarios and edge cases
 * - Use tools like MSW for integration testing
 * - Test with different network conditions
 * 
 * Performance Tips:
 * - Use React Query or SWR for caching
 * - Implement request debouncing for search
 * - Add loading states and error boundaries
 * - Consider pagination for large datasets
 * 
 * Security Considerations:
 * - Always validate data on the server
 * - Use HTTPS in production
 * - Implement proper CORS policies
 * - Don't expose sensitive data in client-side code
 * - Use proper authentication and authorization
 */

export const contactService = {
  sendMessage: (messageData) => post('/contact', messageData),
}
