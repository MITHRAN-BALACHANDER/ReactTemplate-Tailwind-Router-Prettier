/**
 * Contact Page Component
 * 
 * A comprehensive contact form demonstrating form handling, state management,
 * and theme-aware design patterns in React.
 * 
 * Features:
 * - Controlled form components with useState
 * - Theme-aware styling with Context API
 * - Form validation and submission handling
 * - Accessible form design with proper labels
 * - Responsive layout with Tailwind CSS
 * 
 * Educational Value:
 * - React form handling patterns
 * - State management with hooks
 * - Event handling and form validation
 * - Context API integration for theming
 * - Accessibility best practices
 * 
 * @returns {JSX.Element} The contact form page
 */

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

function Contact() {
  // Access theme state from global context
  const { state } = useAppContext()
  const { theme } = state

  // Form state management using useState hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  /**
   * Handle input changes for all form fields
   * 
   * This pattern uses computed property names to update the correct
   * field in the state object based on the input's name attribute.
   * 
   * @param {Event} e - The input change event
   */
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /**
   * Handle form submission
   * 
   * Prevents default form submission behavior and processes the data.
   * In a real application, this would send data to a server.
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmit = e => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
    alert('Message sent! (This is just a demo)')
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className={`text-3xl font-bold mb-6 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Contact Us
      </h1>

      <div className={`rounded-lg shadow-md p-6 transition-colors ${
        theme === 'dark' 
          ? 'bg-gray-800 border border-gray-700' 
          : 'bg-white border border-gray-200'
      }`}>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label
              htmlFor='name'
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor='email'
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor='message'
              className={`block text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Message
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className={`w-full px-3 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Tell us what's on your mind..."
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
