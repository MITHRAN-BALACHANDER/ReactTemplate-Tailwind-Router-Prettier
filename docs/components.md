# Component Architecture

A comprehensive guide to the component structure, patterns, and organization in the React Tailwind Template.

## 🏗️ Component Organization

### 📂 Folder Structure

```
src/components/
├── index.js                # Barrel exports for clean imports
├── layout/                 # Layout-specific components
│   ├── index.jsx          # Layout component exports
│   └── Navbar.jsx         # Main navigation component
└── ui/                    # Reusable UI component library
    ├── index.jsx          # UI component exports
    └── ThemeToggle.jsx    # Theme switching component
```

### 🎯 Component Categories

**Layout Components** (`src/components/layout/`)
- **Purpose**: Structure and layout of the application
- **Examples**: Navbar, Header, Footer, Sidebar, Container
- **Characteristics**: Handle app-wide layout concerns, navigation, and structure

**UI Components** (`src/components/ui/`)
- **Purpose**: Reusable, generic UI elements
- **Examples**: Button, Input, Modal, Card, Alert, ThemeToggle
- **Characteristics**: Highly reusable, theme-aware, accessible

## 🧩 Component Patterns

### 1. Theme-Aware Components

All components in the template follow a theme-aware pattern:

```jsx
import { useAppContext } from '../../context/AppContext'

function Component() {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`base-styles ${
      theme === 'dark' ? 'dark-styles' : 'light-styles'
    }`}>
      Content
    </div>
  )
}
```

### 2. Barrel Exports Pattern

Each component folder uses barrel exports for clean imports:

```jsx
// components/index.js
export { default as Navbar } from './layout/Navbar'
export { default as ThemeToggle } from './ui/ThemeToggle'

// Usage
import { Navbar, ThemeToggle } from '../components'
```

### 3. Compound Component Pattern

For complex components with multiple parts:

```jsx
// Modal compound component
function Modal({ children, isOpen, onClose }) {
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  ) : null
}

Modal.Header = function ModalHeader({ children }) {
  return <div className="modal-header">{children}</div>
}

Modal.Body = function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>
}

Modal.Footer = function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>
}

// Usage
<Modal isOpen={true} onClose={handleClose}>
  <Modal.Header>Title</Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>Actions</Modal.Footer>
</Modal>
```

## 📄 Detailed Component Documentation

### Layout Components

#### Navbar Component

**Location**: `src/components/layout/Navbar.jsx`

**Purpose**: Main navigation bar with routing, theme toggle, and responsive design.

**Features**:
- React Router integration with active link highlighting
- Theme toggle integration
- Responsive design with mobile-friendly layout
- Accessibility features (ARIA labels, keyboard navigation)

**Implementation**:
```jsx
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import ThemeToggle from '../ui/ThemeToggle'

function Navbar() {
  const location = useLocation()
  const { state } = useAppContext()
  const { theme } = state

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`shadow-lg transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors ${
              theme === 'dark' 
                ? 'text-white hover:text-blue-400' 
                : 'text-gray-800 hover:text-blue-600'
            }`}
          >
            React Tailwind App
          </Link>

          {/* Navigation Links and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-4">
              {/* Navigation Links */}
              {['/', '/about', '/contact'].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(path)
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
```

**Props**: None (self-contained with global state)

**Dependencies**:
- React Router (`useLocation`, `Link`)
- App Context (`useAppContext`)
- ThemeToggle component

**Accessibility Features**:
- ARIA labels for screen readers
- Keyboard navigation support
- Semantic HTML structure
- Focus indicators

---

### UI Components

#### ThemeToggle Component

**Location**: `src/components/ui/ThemeToggle.jsx`

**Purpose**: Interactive button for switching between light and dark themes.

**Features**:
- Sun/Moon icon animation
- Smooth transitions between states
- Accessibility support
- Hover and focus effects

**Implementation**:
```jsx
import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'

function ThemeToggle() {
  const { state, actions } = useAppContext()
  const { theme } = state

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    actions.setTheme(newTheme)
  }

  return (
    <button
      onClick={handleThemeToggle}
      className={`relative p-2 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 focus:ring-yellow-400'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-blue-500'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="transform transition-transform duration-500 ease-in-out hover:scale-110">
        {theme === 'light' ? (
          <Sun size={20} className="animate-pulse" />
        ) : (
          <Moon size={20} className="animate-pulse" />
        )}
      </div>

      <span className="sr-only">
        Currently in {theme} mode. Click to switch to {theme === 'light' ? 'dark' : 'light'} mode.
      </span>
    </button>
  )
}

export default ThemeToggle
```

**Props**: None (uses global theme state)

**Dependencies**:
- Lucide React icons (`Sun`, `Moon`)
- App Context (`useAppContext`)

**Accessibility Features**:
- ARIA labels and titles
- Screen reader text
- Focus indicators
- Keyboard navigation

---

## 🧪 Reusable UI Components

Here are examples of additional UI components you can add to the library:

### Button Component

```jsx
// src/components/ui/Button.jsx
import { useAppContext } from '../../context/AppContext'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  ...props 
}) {
  const { state } = useAppContext()
  const { theme } = state

  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: theme === 'dark' 
      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
      : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: theme === 'dark'
      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 focus:ring-gray-500'
      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500',
    outline: theme === 'dark'
      ? 'border border-gray-600 text-gray-300 hover:bg-gray-700 focus:ring-gray-500'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
```

### Input Component

```jsx
// src/components/ui/Input.jsx
import { useAppContext } from '../../context/AppContext'

function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className="space-y-1">
      {label && (
        <label className={`block text-sm font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
        </label>
      )}
      
      <input
        className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}

export default Input
```

### Card Component

```jsx
// src/components/ui/Card.jsx
import { useAppContext } from '../../context/AppContext'

function Card({ 
  children, 
  className = '',
  hover = false,
  ...props 
}) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div
      className={`rounded-lg shadow-md transition-colors ${
        hover ? 'hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200' : ''
      } ${
        theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className = '' }) {
  return (
    <div className={`p-6 pb-4 ${className}`}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '' }) {
  return (
    <div className={`p-6 pt-2 ${className}`}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className = '' }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`p-6 pt-4 border-t ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    } ${className}`}>
      {children}
    </div>
  )
}

export default Card
```

## 🔧 Adding New Components

### Step-by-Step Guide

1. **Create the component file**:
```bash
# For UI components
touch src/components/ui/NewComponent.jsx

# For layout components  
touch src/components/layout/NewComponent.jsx
```

2. **Implement with theme awareness**:
```jsx
import { useAppContext } from '../../context/AppContext'

function NewComponent({ prop1, prop2, ...props }) {
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className={`base-styles ${
      theme === 'dark' ? 'dark-styles' : 'light-styles'
    }`}>
      {/* Component content */}
    </div>
  )
}

export default NewComponent
```

3. **Add to barrel exports**:
```jsx
// src/components/index.js
export { default as NewComponent } from './ui/NewComponent'
// or
export { default as NewComponent } from './layout/NewComponent'
```

4. **Use in your app**:
```jsx
import { NewComponent } from '../components'

function SomePage() {
  return (
    <div>
      <NewComponent prop1="value" prop2="value" />
    </div>
  )
}
```

### Component Guidelines

**Theme Awareness**:
- Always consume theme from `useAppContext`
- Provide both light and dark styling
- Use smooth transitions between theme changes

**Accessibility**:
- Include proper ARIA labels
- Support keyboard navigation
- Provide focus indicators
- Use semantic HTML

**Props Design**:
- Use TypeScript-style prop comments for JSDoc
- Provide sensible defaults
- Support `className` prop for customization
- Forward remaining props with `...props`

**Styling Approach**:
- Use Tailwind CSS classes
- Prefer conditional classes over CSS-in-JS
- Include hover and focus states
- Add smooth transitions

---

This component architecture provides a solid foundation for building scalable, theme-aware, and accessible React applications.
