# Usage Guide

## For Package Developers

### 1. Publishing to npm

Before publishing, make sure to:

1. Update the version in `package.json`
2. Update author information
3. Update repository URLs
4. Test the package locally

```bash
# Test locally first
npm pack
npm install -g create-react-tailwind-app-router-1.x.x.tgz

# Publish to npm
npm login
npm publish --access public
```

### 2. Local Development

To test changes locally:

```bash
# Test the CLI directly
node bin/create-react-tailwind-app-router.js my-test-app

# Or test with npx locally
npx . my-test-app
```

### 3. Updating the Template

Template files are in the `template/` directory. Any changes here will be copied to new projects.

## For End Users

### Quick Start (Recommended)

**Using npx (No installation required):**

```bash
npx create-react-tailwind-app-router my-react-app
```

### What You Get

**jsx-basic Template:**

- **React 19** - Latest React with modern features
- **Vite 7.1+** - Lightning fast development server and build tool
- **React Router 6.27+** - Client-side routing setup
- **Tailwind CSS 4.1+** - Utility-first CSS framework
- **ESLint & Prettier** - Code quality and formatting
- Essential project structure ready for customization

**javascript Template:**

Everything from jsx-basic plus:

- **Complete UI Library** - Pre-built responsive pages and components
- **Theme System** - Dark/light mode with LocalStorage persistence
- **Custom Hooks** - localStorage, debounce, window size utilities
- **Context API** - Global state management
- **Lucide React Icons** - Beautiful icon library
- **Form Handling** - Contact form with validation examples
- **Educational Documentation** - Comprehensive guides and examples

**typescript Template:**

Everything from javascript plus:

- **TypeScript 5.6+** - Full type safety and IntelliSense
- **Strict Type Configuration** - Comprehensive tsconfig.json
- **Typed Components** - All components with proper interfaces
- **Type-Safe Routing** - React Router with TypeScript integration
- **Enhanced Development** - Better error catching and code completion

### Next Steps After Creation

```bash
cd my-react-app
npm install
npm run dev
```

The app will open at `http://localhost:5173` (Vite's default port)

## Customization

### Adding Features to the Template

1. Modify files in the appropriate template directory:
   - `templates/template-jsx-basic/` - Minimal template
   - `templates/template-jsx/` - JavaScript template
   - `templates/template-tsx/` - TypeScript template
2. Update the respective `package.json` with new dependencies
3. Test with a new project creation using the modified template
4. Update version and republish

**Template Structure:**

```text
templates/
├── template-jsx-basic/    # Minimal React setup
├── template-jsx/          # Comprehensive JavaScript features  
└── template-tsx/          # Full TypeScript support
```

### CLI Options

**Current CLI Commands:**

```bash
# Interactive template selection (recommended)
npx create-react-tailwind-app-router my-app

# Minimal template
npx create-react-tailwind-app-router my-app --basic

# JavaScript template with full features (default)
npx create-react-tailwind-app-router my-app --js

# TypeScript template with full features
npx create-react-tailwind-app-router my-app --typescript

# Explicit template selection
npx create-react-tailwind-app-router my-app -t jsx-basic
npx create-react-tailwind-app-router my-app -t javascript  
npx create-react-tailwind-app-router my-app -t typescript

# Interactive mode (prompts for project name and template)
npx create-react-tailwind-app-router

# View help and available options
npx create-react-tailwind-app-router --help

# Check version
npx create-react-tailwind-app-router --version
```

**Template Options:**

| Template | Description | Features | Command |
|----------|-------------|----------|---------|
| **jsx-basic** | Minimal React setup | Essential features only | `--basic` or `-t jsx-basic` |
| **javascript** | Comprehensive JavaScript | Full UI library, themes, docs | `--js` or `-t javascript` |
| **typescript** | Full TypeScript support | Type safety + all JS features | `--typescript` or `-t typescript` |

**Supported Features:**

- ✅ Interactive project name and template selection
- ✅ Three template options (jsx-basic, javascript, typescript)
- ✅ Automatic template copying and setup
- ✅ Package.json customization with project name
- ✅ TypeScript support with full type safety
- ✅ Command shortcuts and explicit template selection

## Troubleshooting

### Common Issues

1. **Permission errors**: Make sure you have proper npm permissions for publishing
2. **Path issues**: Use absolute paths when possible during development
3. **Node version**: Requires Node.js 16+ (LTS recommended)
4. **Package name conflicts**: Ensure unique package names when forking
5. **Template errors**: Check that all template files are included in the `files` array in package.json

### Testing Your Package

```bash
# Test package creation locally with different templates
node bin/create-react-tailwind-app-router.js test-basic --basic
node bin/create-react-tailwind-app-router.js test-js --js
node bin/create-react-tailwind-app-router.js test-ts --typescript

# Test the generated projects
cd test-basic && npm install && npm run dev
cd test-js && npm install && npm run dev  
cd test-ts && npm install && npm run dev

# Run linting and formatting tests
npm run lint
npm run format
```

### Getting Help

- Check the [GitHub Repository](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier)
- Open an issue for bugs or feature requests
- Review the README.md for detailed documentation
- Test with a minimal example to isolate issues

## Version History

### Current Version (1.2.0+)

- ✅ **Three Template Options** - jsx-basic, javascript, typescript
- ✅ **React 19** - Latest React with concurrent features
- ✅ **Vite 7.1+** - Lightning fast build tool with optimized performance  
- ✅ **Tailwind CSS 4.1+** - Latest utility-first CSS framework
- ✅ **TypeScript 5.6+** - Full type safety with comprehensive configuration
- ✅ **ESLint 9.33+** - Modern linting with React-specific rules
- ✅ **Prettier 3.3+** - Advanced code formatting
- ✅ **Interactive CLI** - Template selection and project name prompts
- ✅ **Command Shortcuts** - `--basic`, `--js`, `--typescript` flags
- ✅ **Modern Dependencies** - All packages updated to latest stable versions
- ✅ **Comprehensive Features** - Theme system, custom hooks, educational docs
