// Application constants

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

// Application Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
}

// Theme Constants
export const THEME = {
  COLORS: {
    PRIMARY: 'blue',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
}

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s-()]+$/,
  MIN_PASSWORD_LENGTH: 8,
}

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  DATA_SAVED: 'Data saved successfully!',
  EMAIL_SENT: 'Email sent successfully!',
}
