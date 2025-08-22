// Type definitions using JSDoc for JavaScript (can be converted to TypeScript later)

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} name - User name
 * @property {string} email - User email
 * @property {string} [avatar] - User avatar URL
 * @property {string} createdAt - Creation date
 * @property {string} updatedAt - Last update date
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {any} data - Response data
 * @property {string} [message] - Success message
 * @property {string} [error] - Error message
 */

/**
 * @typedef {Object} FormError
 * @property {string} field - Field name with error
 * @property {string} message - Error message
 */

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {'primary' | 'secondary' | 'outline' | 'danger'} ButtonVariant
 */

/**
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 */

/**
 * @typedef {Object} NavItem
 * @property {string} path - Navigation path
 * @property {string} label - Navigation label
 * @property {string} [icon] - Navigation icon
 */

/**
 * @typedef {Object} ContactFormData
 * @property {string} name - Contact name
 * @property {string} email - Contact email
 * @property {string} message - Contact message
 */

// Export empty object since we're using JSDoc for types
export {}
