/**
 * UI Components Library
 * 
 * This file contains reusable UI components that follow consistent design patterns.
 * Each component is designed to be:
 * - Reusable across different parts of the application
 * - Customizable through props
 * - Accessible (ARIA compliant)
 * - Responsive by default
 * 
 * Usage Example:
 * import { Button, Input, Card } from '@/components/ui'
 * 
 * Best Practices:
 * - Keep components small and focused on a single responsibility
 * - Use prop destructuring with default values
 * - Include proper TypeScript/JSDoc annotations
 * - Follow consistent naming conventions for props (variant, size, className, etc.)
 */

/**
 * Loading Spinner Component
 * 
 * A customizable loading indicator that can be used throughout the app.
 * Uses CSS animations for smooth performance.
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Loading spinner component
 * 
 * @example
 * <LoadingSpinner size="lg" className="text-blue-500" />
 */
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  // Define size classes - using object for maintainability
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div 
      className={`
        inline-block animate-spin rounded-full border-2 border-solid 
        border-current border-r-transparent 
        motion-reduce:animate-[spin_1.5s_linear_infinite] 
        ${sizeClasses[size]} ${className}
      `} 
      role="status" // Accessibility: screen readers understand this is a loading indicator
      aria-label="Loading content"
    >
      {/* Screen reader only text for accessibility */}
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Button Component
 * 
 * A flexible button component with multiple variants and states.
 * Supports loading states, different sizes, and accessibility features.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Style variant: 'primary', 'secondary', 'outline', 'danger'
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Additional HTML button attributes
 * @returns {JSX.Element} Button component
 * 
 * @example
 * <Button variant="primary" size="lg" loading={isSubmitting} onClick={handleSubmit}>
 *   Save Changes
 * </Button>
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  className = '', 
  ...props // Spread operator to pass through additional props like onClick, type, etc.
}) => {
  // Base classes that apply to all buttons
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-md 
    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
    disabled:opacity-50 disabled:cursor-not-allowed
  `
  
  // Variant-specific styling - using object for easy maintenance and extension
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  
  // Size-specific styling
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading} // Disable button during loading
      aria-disabled={disabled || loading} // Accessibility
      {...props}
    >
      {/* Show loading spinner when loading prop is true */}
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

/**
 * Input Component
 * 
 * A form input component with label, error handling, and validation states.
 * Follows accessibility best practices with proper labeling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.error - Error message to display
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.required - Whether field is required
 * @param {Object} props...rest - Additional HTML input attributes
 * @returns {JSX.Element} Input component
 * 
 * @example
 * <Input 
 *   label="Email Address" 
 *   type="email" 
 *   required 
 *   error={errors.email}
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 */
export const Input = ({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props // Spread for input attributes like type, value, onChange, placeholder, etc.
}) => {
  return (
    <div className="space-y-1">
      {/* Conditional label rendering */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {/* Visual indicator for required fields */}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
      )}
      <input
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'} 
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'} // Accessibility for form validation
        aria-describedby={error ? `${props.id || 'input'}-error` : undefined}
        {...props}
      />
      {/* Error message display */}
      {error && (
        <p 
          className="text-sm text-red-600" 
          id={`${props.id || 'input'}-error`}
          role="alert" // Accessibility: announces errors to screen readers
        >
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Modal Component
 * 
 * A flexible modal dialog component with backdrop and focus management.
 * Implements accessibility best practices for dialogs.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to call when modal should close
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element|null} Modal component or null if closed
 * 
 * @example
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm Action">
 *   <p>Are you sure you want to delete this item?</p>
 *   <div className="flex gap-2 mt-4">
 *     <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *     <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
 *   </div>
 * </Modal>
 */
export const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  // Early return pattern - don't render anything if modal is closed
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop - clicking it closes the modal */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Modal content */}
        <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-full ${className}`}>
          {/* Optional title section */}
          {title && (
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900" id="modal-title">
                {title}
              </h3>
            </div>
          )}
          {/* Main content area */}
          <div className="px-6 py-4" role="document">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Card Component
 * 
 * A simple container component for grouping related content.
 * Provides consistent styling and spacing.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props...rest - Additional HTML div attributes
 * @returns {JSX.Element} Card component
 * 
 * @example
 * <Card className="p-6">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here.</p>
 * </Card>
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md border ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Alert Component
 * 
 * A notification component for displaying different types of messages.
 * Supports multiple alert types with appropriate styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Alert type: 'info', 'success', 'warning', 'error'
 * @param {React.ReactNode} props.children - Alert content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Alert component
 * 
 * @example
 * <Alert type="success">
 *   Your changes have been saved successfully!
 * </Alert>
 * 
 * <Alert type="error">
 *   There was an error processing your request. Please try again.
 * </Alert>
 */
export const Alert = ({ type = 'info', children, className = '' }) => {
  // Type-specific styling with semantic colors
  const types = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }

  return (
    <div 
      className={`border rounded-md p-4 ${types[type]} ${className}`}
      role="alert" // Accessibility: screen readers will announce this as an alert
    >
      {children}
    </div>
  )
}
