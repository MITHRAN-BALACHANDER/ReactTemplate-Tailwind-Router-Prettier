/**
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire React application.
 * It sets up routing, provides global context, and applies theme-based styling with TypeScript.
 * 
 * Key Features:
 * - Centralized routing with React Router
 * - Dynamic theme application (light/dark mode)
 * - Responsive layout structure
 * - Global state management integration with TypeScript
 * - HTML document class management for dark mode
 * 
 * Architecture Notes:
 * - Uses React Router for client-side navigation
 * - Integrates with AppContext for theme management
 * - Applies theme classes to the root container
 * - Updates document.documentElement.classList for Tailwind dark mode
 * - TypeScript provides compile-time type checking
 * 
 * @returns {JSX.Element} The main application layout with routing
 */

import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useThemeContext } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  // Extract theme state from global theme context
  const { theme } = useThemeContext()

  // Update document class for Tailwind dark mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
