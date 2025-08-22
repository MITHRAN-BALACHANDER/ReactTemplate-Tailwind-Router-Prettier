# React Vite Te### 🛡️ **Development### 🔧 **Configuration Files**
- 📋 **ESLint Configuration** - React-specific rules with Prettier integration
- 🎨 **Prettier Configuration** - Consistent formatting across the project
- 🏗️ **Vite Configuration** - Optimized for development and production
- 🎯 **Tailwind Configuration** - Content purging and custom theme setup
- 📦 **PostCSS Configuration** - Plugin setup for Tailwind and Autoprefixer
- 🚫 **Ignore Files** - Git, Prettier, and ESLint ignore configurationsence**
- 🚀 **Fast Development Server** - Instant startup and hot module replacement
- 📱 **Mobile-First Design** - Responsive layouts out of the box
- 🔍 **Code Quality Tools** - ESLint + Prettier integration for consistent code style
- 🏗️ **Production Optimized** - Tree-shaking, code splitting, and asset optimization
- 📦 **Modern Build Setup** - ES modules, dynamic imports, and optimized bundlesPackage

A comprehensive CLI tool and npm package that creates a modern, production-ready React application with Vite, React Router, Tailwind CSS, Prettier, and ESLint pre-configured and ready to use.

## ✨ Features

### 🏗️ **Core Technologies**
- ⚡ **Vite 7.1+** - Lightning fast build tool with instant HMR and optimized production builds
- ⚛️ **React 19** - Latest React with modern hooks, concurrent features, and automatic batching
- 🧭 **React Router 6.27+** - Declarative client-side routing with nested routes support
- 🎨 **Tailwind CSS 4.1+** - Utility-first CSS framework with new Vite plugin integration
- ✨ **Prettier 3.3+** - Automatic code formatting with opinionated defaults
- 📦 **ESLint 9.33+** - Advanced code linting with React-specific rules and Prettier integration
- 🔧 **SWC Compiler** - Super-fast JavaScript/TypeScript compiler for faster builds

### 🛡️ **Development Experience**
- � **Fast Development Server** - Instant startup and hot module replacement
- 🎯 **Type Safety Ready** - Pre-configured for easy TypeScript adoption
- �📱 **Mobile-First Design** - Responsive layouts out of the box
- 🔍 **Code Quality Tools** - ESLint + Prettier integration for consistent code style
- 🏗️ **Production Optimized** - Tree-shaking, code splitting, and asset optimization
- 📦 **Modern Build Setup** - ES modules, dynamic imports, and optimized bundles

### 🎨 **UI Components & Styling**
- 🧭 **Navigation System** - Responsive navbar with active state management
- 📄 **Pre-built Pages** - Home, About, and Contact pages with modern design
- 🎯 **Tailwind Integration** - Configured with purging and JIT mode
- 📱 **Responsive Design** - Mobile-first approach with breakpoint utilities
- 🎨 **Design System Ready** - Easily customizable color palette and spacing
- ✨ **Interactive Elements** - Hover states, transitions, and form handling

### 🔧 **Configuration Files**
- � **ESLint Configuration** - React-specific rules with Prettier integration
- 🎨 **Prettier Configuration** - Consistent formatting across the project
- 🏗️ **Vite Configuration** - Optimized for development and production
- 🎯 **Tailwind Configuration** - Content purging and custom theme setup
- 📦 **PostCSS Configuration** - Plugin setup for Tailwind and Autoprefixer
- 🚫 **Ignore Files** - Git, Prettier, and ESLint ignore configurations

## Installation

### Global Installation (Recommended)

```bash
npm install -g react-vite-template-package
```

### Using npx (No installation required)

```bash
npx react-vite-template-package my-react-app
```

## Usage

### Create a new React app

```bash
# Using global installation
create-react-vite-app my-react-app

# Using npx
npx react-vite-template-package my-react-app
```

### Navigate to your project and start developing

```bash
cd my-react-app
npm install
npm run dev
```

## What's Included

The generated project includes a complete, production-ready setup:

### 📁 Project Structure
```
my-react-app/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable React components
│   │   └── Navbar.jsx        # Responsive navigation with active states
│   ├── pages/                # Page components for routing
│   │   ├── Home.jsx          # Landing page with feature showcase
│   │   ├── About.jsx         # About page with tech stack info
│   │   └── Contact.jsx       # Contact form with state management
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind imports
├── .eslintrc.cjs             # ESLint configuration with React rules
├── .gitignore                # Git ignore patterns
├── .prettierignore           # Prettier ignore patterns
├── .prettierrc               # Prettier formatting configuration
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite build configuration
```

### 🛠️ Pre-configured Tools & Dependencies

**Build Tools:**
- **Vite** - Ultra-fast build tool with instant HMR, optimized production builds
- **PostCSS** - CSS processing with plugin ecosystem
- **Autoprefixer** - Automatic vendor prefix addition

**React Ecosystem:**
- **React 18** - Latest React with concurrent features and modern hooks
- **React DOM 18** - Enhanced rendering with automatic batching
- **React Router DOM** - Complete routing solution with nested routes

**Styling & Design:**
- **Tailwind CSS** - Utility-first CSS framework with JIT compilation
- **Responsive Design System** - Mobile-first breakpoints and utilities
- **Custom Components** - Pre-styled navigation, cards, and forms

**Code Quality & Formatting:**
- **ESLint** - Comprehensive linting with React-specific rules
- **Prettier** - Opinionated code formatting for consistency
- **ESLint-Prettier Integration** - Seamless formatting and linting workflow

### 📱 Example Components & Features

**Navigation System:**
- **Responsive Navbar** - Mobile-friendly navigation with hamburger menu support
- **Active State Management** - Visual indicators for current page
- **Smooth Transitions** - Hover effects and state changes

**Page Templates:**
- **Home Page** - Hero section, feature cards, and call-to-action buttons
- **About Page** - Technology stack showcase and project information
- **Contact Page** - Working contact form with controlled inputs and validation

**UI Elements:**
- **Interactive Cards** - Hover effects and responsive grid layouts
- **Form Components** - Styled inputs, textareas, and buttons
- **Button Variants** - Primary, secondary, and interactive states
- **Typography System** - Consistent heading hierarchy and text styles

## Available Scripts

In the generated project, you can run these comprehensive scripts:

### 🚀 **Development Scripts**
- **`npm run dev`** - Starts the Vite development server at `http://localhost:3000` with hot module replacement
- **`npm run preview`** - Preview the production build locally to test optimizations

### 🏗️ **Build Scripts**
- **`npm run build`** - Creates an optimized production build in the `dist/` folder with:
  - Tree-shaking for minimal bundle size
  - Asset optimization and compression
  - CSS purging and minification
  - Source maps for debugging

### 🔍 **Code Quality Scripts**
- **`npm run lint`** - Run comprehensive ESLint checks for:
  - React-specific rules and best practices
  - JavaScript/JSX syntax validation
  - Import/export statement verification
  - Accessibility (a11y) recommendations

- **`npm run lint:fix`** - Automatically fix ESLint issues where possible

### ✨ **Formatting Scripts**
- **`npm run format`** - Format all source files using Prettier:
  - JavaScript/JSX files
  - CSS files
  - JSON files
  - Markdown files

- **`npm run format:check`** - Check if all files are properly formatted without making changes

### 🔧 **Workflow Integration**
All scripts are optimized for:
- **CI/CD pipelines** - Exit codes and error reporting
- **Git hooks** - Pre-commit formatting and linting
- **Editor integration** - VS Code and other editor support

## Customization & Extension

### 🎨 **Styling Customization**

**Tailwind CSS Configuration:**
```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a'
        },
        secondary: '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      }
    }
  },
  plugins: []
}
```

**Prettier Configuration:**
```json
// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### 🧭 **Adding New Routes & Pages**
1. **Create a new page component** in `src/pages/`:
   ```jsx
   // src/pages/Services.jsx
   function Services() {
     return (
       <div className="max-w-4xl mx-auto">
         <h1 className="text-3xl font-bold">Our Services</h1>
         {/* Your content here */}
       </div>
     )
   }
   export default Services
   ```

2. **Add the route** in `src/App.jsx`:
   ```jsx
   import Services from './pages/Services'
   
   // In your Routes component
   <Route path="/services" element={<Services />} />
   ```

3. **Update navigation** in `src/components/Navbar.jsx`:
   ```jsx
   <Link to="/services" className="nav-link">
     Services
   </Link>
   ```

### 🔧 **Development Workflow Enhancements**

**VS Code Integration:**
- Install recommended extensions for optimal experience
- Automatic formatting on save
- ESLint error highlighting
- Tailwind CSS IntelliSense

**Git Hooks Setup (Optional):**
```bash
# Install husky for git hooks
npm install --save-dev husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
}
```

### 🎯 **Real-World Usage Examples**

**Adding a new feature page:**
```jsx
// src/pages/Products.jsx
function Products() {
  return (
    <div className='max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold text-gray-900 mb-8'>Our Products</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Product cards */}
      </div>
    </div>
  )
}
export default Products
```

**Customizing the theme:**
```javascript
// tailwind.config.js - Add your brand colors
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#1a365d',
        secondary: '#2d3748'
      }
    }
  }
}
```

## Requirements & Compatibility

### 📋 **System Requirements**
- **Node.js**: Version 16.0.0 or higher (LTS recommended)
- **npm**: Version 7.0.0 or higher (or yarn 1.22.0+)
- **Operating System**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)

### 🌐 **Browser Support**
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Android Chrome 90+
- **ES6+ Features**: Full support for modern JavaScript features

### 📦 **Package Dependencies**
**Production Dependencies:**
- `react` ^19.1.1 - Core React library (latest version)
- `react-dom` ^19.1.1 - React DOM rendering
- `react-router-dom` ^6.27.0 - Client-side routing
- `tailwindcss` ^4.1.12 - Utility-first CSS framework
- `@tailwindcss/vite` ^4.1.12 - Tailwind CSS Vite plugin

**Development Dependencies:**
- `vite` ^7.1.2 - Build tool and development server (latest)
- `@vitejs/plugin-react-swc` ^4.0.0 - React plugin with SWC compiler
- `prettier` ^3.3.3 - Code formatting
- `eslint` ^9.33.0 - Code linting (latest)
- `eslint-config-prettier` ^9.1.0 - ESLint + Prettier integration
- `eslint-plugin-prettier` ^5.2.0 - Prettier as ESLint rule
- `eslint-plugin-react` ^7.37.2 - React-specific ESLint rules
- `eslint-plugin-react-hooks` ^5.2.0 - React Hooks ESLint rules
- `eslint-plugin-react-refresh` ^0.4.20 - React Refresh ESLint plugin

## 🚀 Advanced Features

### 🎯 **Performance Optimizations**
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Dead code elimination in production builds
- **Asset Optimization**: Image compression and lazy loading ready
- **Bundle Analysis**: Built-in tools for bundle size monitoring

### 🔒 **Best Practices Included**
- **Security**: XSS protection and secure defaults
- **Accessibility**: ARIA labels and semantic HTML structure
- **SEO Ready**: Meta tags and structured markup
- **Performance**: Optimized rendering and minimal re-renders

### 🛠️ **Extension Ready**
- **Testing**: Ready for Jest, Vitest, or React Testing Library
- **State Management**: Compatible with Redux, Zustand, or Context API
- **UI Libraries**: Easy integration with Material-UI, Chakra UI, etc.
- **Build Tools**: Compatible with additional Vite plugins and tools

## Options & CLI Features

### � **Current CLI Options**
```bash
# Create a new React app
create-react-vite-app my-react-app

# View help and available options
create-react-vite-app --help

# Check version
create-react-vite-app --version
```

### 📋 **What You Get**
Every generated project includes:
- Complete React 18 setup with modern hooks
- Vite development server with HMR
- React Router for client-side routing
- Tailwind CSS with utility classes
- Prettier for code formatting
- ESLint for code quality
- Production-ready build configuration
- Responsive example components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Mithran B

## Support

If you have any questions or issues, please open an issue on [GitHub](https://github.com/MITHRAN-BALACHANDER/react-vite-template-package/issues).

---

**Happy coding! 🚀**
