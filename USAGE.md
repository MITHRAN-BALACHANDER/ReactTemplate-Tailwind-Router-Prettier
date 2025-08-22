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

A complete React application with:
- **React 19** - Latest React with modern features
- **Vite 7.1+** - Lightning fast development server and build tool
- **React Router 6.27+** - Client-side routing with nested routes
- **Tailwind CSS 4.1+** - Utility-first CSS framework with Vite plugin
- **Prettier 3.3+** - Automatic code formatting
- **ESLint 9.33+** - Advanced code linting with React rules
- Pre-built responsive pages and components
- Complete development toolchain

### Next Steps After Creation

```bash
cd my-react-app
npm install
npm run dev
```

The app will open at `http://localhost:5173` (Vite's default port)

## Customization

### Adding Features to the Template

1. Modify files in `template/` directory
2. Update `template/package.json` with new dependencies
3. Test with a new project creation
4. Update version and republish

### CLI Options

**Current CLI Commands:**
```bash
# Create a new React app
npx create-react-tailwind-app-router my-app

# Interactive mode (prompts for project name)
npx create-react-tailwind-app-router

# View help and available options
npx create-react-tailwind-app-router --help

# Check version
npx create-react-tailwind-app-router --version
```

**Supported Features:**
- ✅ Interactive project name prompt
- ✅ Automatic template copying and setup
- ✅ Package.json customization with project name
- 🔄 Future: TypeScript support (`--typescript` flag)
- 🔄 Future: Custom template options

## Troubleshooting

### Common Issues

1. **Permission errors**: Make sure you have proper npm permissions for publishing
2. **Path issues**: Use absolute paths when possible during development
3. **Node version**: Requires Node.js 16+ (LTS recommended)
4. **Package name conflicts**: Ensure unique package names when forking
5. **Template errors**: Check that all template files are included in the `files` array in package.json

### Testing Your Package

```bash
# Test package creation locally
node bin/create-react-tailwind-app-router.js test-project

# Test the generated project
cd test-project
npm install
npm run dev
npm run lint
npm run format
```

### Getting Help

- Check the [GitHub Repository](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier)
- Open an issue for bugs or feature requests
- Review the README.md for detailed documentation
- Test with a minimal example to isolate issues

## Version History

### Current Version (1.1.2+)
- ✅ **React 19** - Latest React with concurrent features
- ✅ **Vite 7.1+** - Lightning fast build tool with optimized performance  
- ✅ **Tailwind CSS 4.1+** - Latest utility-first CSS framework with Vite plugin
- ✅ **ESLint 9.33+** - Modern linting with React-specific rules
- ✅ **Prettier 3.3+** - Advanced code formatting
- ✅ **Interactive CLI** - Prompts for project name if not provided
- ✅ **Modern Dependencies** - All packages updated to latest stable versions
- ✅ **Improved Template** - Responsive design with sample pages and components
