# Usage Guide

## For Package Developers

### 1. Publishing to npm

Before publishing, make sure to:

1. Update the package name in `package.json` to something unique
2. Update author information
3. Update repository URLs
4. Test the package locally

```bash
# Test locally first
npm pack
npm install -g react-vite-template-package-1.0.0.tgz

# Publish to npm
npm login
npm publish
```

### 2. Local Development

To test changes locally:

```bash
# Link the package globally
npm link

# Test the CLI
create-react-vite-app my-test-app
```

### 3. Updating the Template

Template files are in the `template/` directory. Any changes here will be copied to new projects.

## For End Users

### Installation Options

**Global Installation:**
```bash
npm install -g react-vite-template-package
create-react-vite-app my-app
```

**Using npx (recommended):**
```bash
npx react-vite-template-package my-app
```

### What You Get

A complete React application with:
- Vite for fast development
- React Router for navigation
- Tailwind CSS for styling
- ESLint for code quality
- Sample pages and components

### Next Steps After Creation

```bash
cd my-app
npm install
npm run dev
```

The app will open at `http://localhost:3000`

## Customization

### Adding Features to the Template

1. Modify files in `template/` directory
2. Update `template/package.json` with new dependencies
3. Test with a new project creation
4. Update version and republish

### CLI Options

Currently supported:
- Basic React template
- Future: TypeScript support (`--typescript` flag)

## Troubleshooting

### Common Issues

1. **Permission errors**: Make sure you have proper npm permissions
2. **Path issues**: Use absolute paths when possible
3. **Node version**: Requires Node.js 16+

### Getting Help

- Check the GitHub issues
- Review the README.md
- Test with a minimal example
