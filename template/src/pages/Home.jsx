/**
 * Home Page Component
 * 
 * The main landing page that showcases the application features.
 * Demonstrates theme-aware design and responsive layout patterns.
 * 
 * Features:
 * - Dynamic theme-based styling
 * - Responsive grid layout
 * - Feature cards with icons
 * - Call-to-action button
 * - Accessibility considerations
 * 
 * Educational Value:
 * - Context API integration for theme management
 * - Conditional styling patterns
 * - Responsive design with Tailwind CSS
 * - Component composition and layout techniques
 * 
 * @returns {JSX.Element} The home page layout
 */

import { useAppContext } from '../context/AppContext'

function Home() {
  // Access theme state from global context
  const { state } = useAppContext()
  const { theme } = state

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='text-center'>
        <h1 className={`text-4xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to React Vite Template
        </h1>
        <p className={`text-xl mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A modern React application with Vite, React Router, and Tailwind CSS
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
              fast builds.
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
              Pre-configured with Tailwind CSS for rapid UI development.
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
              Ready to Use
            </h3>
            <p className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Includes React Router for navigation and a complete project
              structure.
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
