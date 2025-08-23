import { 
  Rocket, 
  Zap, 
  Code, 
  Palette, 
  Search, 
  Settings, 
  CheckCircle, 
  Terminal,
  Play,
  Building,
  Sparkles,
  Heart,
  Github,
  Star,
  Download
} from 'lucide-react'
import { useAppContext } from '../context/AppContext'

function About() {
  // Access theme state from global context
  const { state } = useAppContext()
  const { theme } = state
  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "React 19",
      description: "Latest React with concurrent features and improved performance",
      color: "text-blue-500 bg-blue-50"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Vite 7.1+",
      description: "Lightning fast development server and optimized builds",
      color: "text-yellow-500 bg-yellow-50"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "React Router 6.27+",
      description: "Modern declarative routing with nested routes support",
      color: "text-green-500 bg-green-50"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Tailwind CSS 4.1+",
      description: "Utility-first CSS framework with new Vite plugin integration",
      color: "text-cyan-500 bg-cyan-50"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "ESLint 9.33+",
      description: "Advanced code linting with modern JavaScript rules",
      color: "text-purple-500 bg-purple-50"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Prettier 3.3+",
      description: "Automatic code formatting for consistent style",
      color: "text-pink-500 bg-pink-50"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "SWC Compiler",
      description: "Super-fast JavaScript/TypeScript compilation",
      color: "text-orange-500 bg-orange-50"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Lucide React",
      description: "Beautiful, customizable icons with TypeScript support",
      color: "text-red-500 bg-red-50"
    }
  ]

  const tools = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Hot Module Replacement",
      description: "Instant updates during development without losing state",
      bgColor: "bg-blue-50"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-500" />,
      title: "Code Quality",
      description: "ESLint + Prettier integration with pre-commit hooks",
      bgColor: "bg-green-50"
    },
    {
      icon: <Building className="w-8 h-8 text-purple-500" />,
      title: "Production Ready",
      description: "Optimized builds with tree-shaking and code splitting",
      bgColor: "bg-purple-50"
    }
  ]

  const commands = [
    { comment: "# Install dependencies", command: "npm install" },
    { comment: "# Start development server", command: "npm run dev" },
    { comment: "# Format code", command: "npm run format" },
    { comment: "# Lint code", command: "npm run lint" },
    { comment: "# Build for production", command: "npm run build" }
  ]

  return (
    <div className='max-w-6xl mx-auto space-y-8'>
      {/* Hero Section */}
      <div className={`text-center py-12 rounded-2xl ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6'>
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-5xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          React Template
        </h1>
        <p className={`text-xl mb-6 max-w-2xl mx-auto ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          A modern, production-ready React template with the latest tools, best practices, 
          and comprehensive educational documentation.
        </p>
        <div className='flex flex-wrap justify-center gap-4'>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
            theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white'
          }`}>
            <Star className="w-4 h-4 text-yellow-500" />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Production Ready</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
            theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white'
          }`}>
            <Download className="w-4 h-4 text-green-500" />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Easy Setup</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${
            theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white'
          }`}>
            <Github className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`} />
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>Open Source</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className={`rounded-2xl shadow-lg p-8 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className='text-center mb-8'>
          <h2 className={`text-3xl font-bold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            ⚡ What&apos;s Included
          </h2>
          <p className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to build modern React applications
          </p>
        </div>
        
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div key={index} className='group p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200'>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>{feature.title}</h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Development Tools */}
      <div className='bg-white rounded-2xl shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-3'>
            🛠️ Development Experience
          </h2>
          <p className='text-gray-600'>
            Optimized for developer productivity and code quality
          </p>
        </div>
        
        <div className='grid md:grid-cols-3 gap-6'>
          {tools.map((tool, index) => (
            <div key={index} className={`text-center p-8 ${tool.bgColor} rounded-xl hover:shadow-md transition-shadow duration-200`}>
              <div className='flex justify-center mb-4'>
                {tool.icon}
              </div>
              <h3 className='font-semibold text-gray-800 mb-3'>{tool.title}</h3>
              <p className='text-sm text-gray-600 leading-relaxed'>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className='bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-6 text-center'>
          🏗️ Architecture Highlights
        </h2>
        
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Project Structure</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Organized component architecture</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Custom hooks for reusable logic</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Context API for state management</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Service layer for API calls</span>
              </div>
            </div>
          </div>
          
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Best Practices</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Comprehensive JSDoc documentation</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Accessibility-first design</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Responsive mobile-first approach</span>
              </div>
              <div className='flex items-center gap-3'>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className='text-gray-700'>Error boundaries and handling</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className='bg-white rounded-2xl shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-3'>
            🚀 Getting Started
          </h2>
          <p className='text-gray-600'>
            Get up and running in minutes with these simple commands
          </p>
        </div>
        
        <div className='bg-gray-900 rounded-xl p-6 mb-6 overflow-x-auto'>
          <div className='flex items-center gap-3 mb-4'>
            <Terminal className="w-5 h-5 text-green-400" />
            <span className='text-green-400 font-medium'>Terminal</span>
          </div>
          <div className='space-y-3 font-mono text-sm'>
            {commands.map((cmd, index) => (
              <div key={index}>
                <p className='text-gray-400 mb-1'>{cmd.comment}</p>
                <p className='text-white mb-3 flex items-center gap-2'>
                  <span className='text-green-400'>$</span>
                  {cmd.command}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='bg-blue-50 border border-blue-200 rounded-xl p-6'>
            <div className='flex items-center gap-3 mb-3'>
              <Play className="w-5 h-5 text-blue-600" />
              <span className='font-semibold text-blue-800'>Development Server</span>
            </div>
            <p className='text-blue-700 text-sm'>
              Your development server will start at{' '}
              <code className='bg-blue-100 px-2 py-1 rounded text-xs'>http://localhost:5173</code>
            </p>
          </div>
          
          <div className='bg-green-50 border border-green-200 rounded-xl p-6'>
            <div className='flex items-center gap-3 mb-3'>
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className='font-semibold text-green-800'>Hot Reload</span>
            </div>
            <p className='text-green-700 text-sm'>
              Changes are reflected instantly without losing component state
            </p>
          </div>
        </div>
      </div>

      {/* Educational Value */}
      <div className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-3'>
            📚 Educational Template
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            This template is designed as a comprehensive learning resource with extensive 
            documentation and real-world examples to help you master React development.
          </p>
        </div>
        
        <div className='bg-white rounded-xl p-6 shadow-sm'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>What You&apos;ll Learn</h3>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Modern React patterns and hooks</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Component composition strategies</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>State management with Context API</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>API integration and error handling</span>
              </div>
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Accessibility best practices</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Performance optimization techniques</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Testing strategies and patterns</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className='text-sm text-gray-700'>Production deployment practices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
