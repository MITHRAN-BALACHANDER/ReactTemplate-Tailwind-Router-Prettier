/**
 * Home Page Component
 * 
 * The main landing page that showcases the application features.
 * Demonstrates theme-aware design and responsive layout patterns with TypeScript.
 * 
 * Features:
 * - Dynamic theme-based styling with TypeScript type safety
 * - Responsive grid layout
 * - Feature cards with icons
 * - Call-to-action button
 * - Accessibility considerations
 * 
 * Educational Value:
 * - Context API integration for theme management with TypeScript
 * - Conditional styling patterns
 * - Responsive design with Tailwind CSS
 * - Component composition and layout techniques
 * - TypeScript component patterns
 * 
 * @returns {JSX.Element} The home page layout
 */

import { useThemeContext } from '../hooks/useTheme'

function Home() {
  // Access theme state from global context
  const { theme } = useThemeContext()

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center'>
        <h1 className={`text-4xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to React TypeScript Template
        </h1>
        <p className={`text-xl mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A modern React TypeScript application with Vite, React Router, and Tailwind CSS
        </p>

        <div className='grid md:grid-cols-3 gap-6 mt-12'>
          <div className={`p-6 rounded-lg shadow-md transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <div className='text-blue-500 text-3xl mb-4'>⚡</div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Lightning Fast
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Powered by Vite for instant hot module replacement and blazing
              fast builds with TypeScript support.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <div className='text-green-500 text-3xl mb-4'>🎨</div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Beautiful UI
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Pre-configured with Tailwind CSS for rapid UI development with full TypeScript support.
            </p>
          </div>

          <div className={`p-6 rounded-lg shadow-md transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            <div className='text-purple-500 text-3xl mb-4'>🛠️</div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Type Safe
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Includes TypeScript, React Router for navigation, and a complete 
              type-safe project structure.
            </p>
          </div>
        </div>

        <div className='mt-12'>
          <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
