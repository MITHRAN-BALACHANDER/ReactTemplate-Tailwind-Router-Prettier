function About() {
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        About This Template
      </h1>

      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>What&apos;s Included</h2>
        <ul className='space-y-2 text-gray-700'>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            React 18 with modern hooks and features
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            Vite for fast development and building
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            React Router for client-side routing
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            Tailwind CSS for utility-first styling
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            ESLint for code quality
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            Prettier for code formatting
          </li>
          <li className='flex items-center'>
            <span className='text-green-500 mr-2'>✓</span>
            PostCSS and Autoprefixer
          </li>
        </ul>
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Getting Started</h2>
        <div className='bg-gray-100 p-4 rounded-lg font-mono text-sm'>
          <p>npm install</p>
          <p>npm run dev</p>
        </div>
        <p className='mt-4 text-gray-700'>
          This will start the development server and open your application in
          the browser.
        </p>
      </div>
    </div>
  )
}

export default About
