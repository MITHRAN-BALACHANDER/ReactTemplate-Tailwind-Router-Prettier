# FAQ - Frequently Asked Questions

Answers to common questions about the React Tailwind Template.

## 🚀 Getting Started

### Q: How do I create a new project?
**A:** Use npx for the quickest setup:
```bash
npx create-react-tailwind-app-router my-app
cd my-app
npm install
npm run dev
```

### Q: What are the system requirements?
**A:** You need:
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or yarn/pnpm)
- Modern browser with ES6+ support

### Q: Can I use this template with TypeScript?
**A:** Yes! The template is designed to be easily converted to TypeScript:
1. Install TypeScript dependencies: `npm install -D typescript @types/react @types/react-dom`
2. Rename `.jsx` files to `.tsx`
3. Add type definitions
4. Update `vite.config.js` if needed

## 🌓 Theme System

### Q: How do I customize the colors?
**A:** There are several ways:

1. **Tailwind Config (Recommended):**
```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      }
    }
  }
}
```

2. **CSS Custom Properties:**
```css
:root {
  --color-primary: #your-color;
}
```

3. **Theme Context:**
```jsx
const customTheme = {
  light: { primary: '#your-color' },
  dark: { primary: '#your-dark-color' }
}
```

### Q: How do I add a new theme variant?
**A:** Add it to your theme configuration:
```jsx
// src/config/themes.js
export const themeVariants = {
  // existing themes...
  
  myTheme: {
    name: 'My Theme',
    light: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
      // ... other colors
    },
    dark: {
      primary: '#ff8787',
      secondary: '#6bcf7f',
      // ... other colors
    }
  }
}
```

### Q: Why isn't dark mode working?
**A:** Check these common issues:
1. **Tailwind config:** Ensure `darkMode: 'class'` is set
2. **CSS imports:** Make sure you're importing Tailwind CSS
3. **Context provider:** Verify `ThemeProvider` wraps your app
4. **Browser localStorage:** Check if localStorage is available

## 🎨 Styling & Components

### Q: How do I create theme-aware components?
**A:** Use the `useTheme` hook:
```jsx
import { useTheme } from '../context/ThemeContext'

const MyComponent = () => {
  const { isDark, colors } = useTheme()
  
  return (
    <div className={`p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Or use Tailwind dark mode classes */}
      <div className="bg-white dark:bg-gray-800">
        Content
      </div>
    </div>
  )
}
```

### Q: How do I override component styles?
**A:** Several approaches:
1. **Tailwind classes:** Pass `className` prop
2. **CSS modules:** Create component-specific styles
3. **Styled components:** Use CSS-in-JS library
4. **CSS custom properties:** Use theme variables

### Q: Can I use other CSS frameworks instead of Tailwind?
**A:** Yes, but you'll need to:
1. Remove Tailwind CSS dependencies
2. Update the build configuration
3. Replace Tailwind classes with your framework's classes
4. Adjust the theme system if needed

## 🧭 Routing & Navigation

### Q: How do I add a new page?
**A:** Follow these steps:
1. Create page component in `src/pages/`
2. Add route to `src/App.jsx`
3. Update navigation in `src/components/layout/Navbar.jsx`

Example:
```jsx
// src/pages/NewPage.jsx
const NewPage = () => <div>New Page</div>

// src/App.jsx
<Route path="/new-page" element={<NewPage />} />

// src/components/layout/Navbar.jsx
<NavLink to="/new-page">New Page</NavLink>
```

### Q: How do I handle protected routes?
**A:** Create a `ProtectedRoute` component:
```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

### Q: Can I use nested routes?
**A:** Yes! React Router v6 supports nested routing:
```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

## 🔧 Development & Build

### Q: How do I add environment variables?
**A:** Create `.env` files:
```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3001

# .env.production
VITE_API_BASE_URL=https://api.yoursite.com
```

Use in code:
```jsx
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

### Q: How do I configure the dev server port?
**A:** Several options:
1. **Package.json script:** `"dev": "vite --port 3000"`
2. **Vite config:** 
```js
export default {
  server: {
    port: 3000
  }
}
```
3. **Command line:** `npm run dev -- --port 3000`

### Q: Why are my changes not showing up?
**A:** Try these solutions:
1. **Hard refresh:** Ctrl+F5 or Cmd+Shift+R
2. **Clear cache:** Delete `node_modules/.vite`
3. **Restart dev server:** Stop and run `npm run dev` again
4. **Check file watching:** Ensure files aren't being ignored

### Q: How do I optimize for production?
**A:** The template includes optimizations:
- Automatic code splitting
- Tree shaking
- Asset optimization
- CSS purging

Additional optimizations:
1. **Lazy loading:** Use `React.lazy()` for route components
2. **Bundle analysis:** Run `npm run build --analyze`
3. **Image optimization:** Use appropriate formats and sizes

## 📦 Dependencies & Packages

### Q: How do I add new dependencies?
**A:** Use npm or yarn:
```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

### Q: Can I use a different package manager?
**A:** Yes! The template works with:
- **npm** (default)
- **yarn:** Delete `package-lock.json`, run `yarn install`
- **pnpm:** Delete `package-lock.json`, run `pnpm install`

### Q: How do I update dependencies?
**A:** Check and update packages:
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
```

### Q: What if I get dependency conflicts?
**A:** Try these solutions:
1. **Clear cache:** `npm cache clean --force`
2. **Delete and reinstall:** 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
3. **Use exact versions:** Pin specific versions in `package.json`
4. **Check peer dependencies:** Ensure compatible versions

## 🔐 Authentication & Security

### Q: How do I implement authentication?
**A:** The template includes auth service examples:
```jsx
// src/services/authService.js
export const authService = {
  login: async (credentials) => { /* ... */ },
  logout: () => { /* ... */ },
  getCurrentUser: () => { /* ... */ }
}
```

### Q: How do I store authentication tokens?
**A:** Several options with trade-offs:
1. **localStorage:** Persistent but XSS vulnerable
2. **sessionStorage:** Tab-scoped, better security
3. **httpOnly cookies:** Most secure but requires backend setup
4. **Memory:** Most secure but lost on refresh

### Q: How do I handle API authentication?
**A:** Use the included API client:
```jsx
// Automatically includes auth headers
const response = await apiClient.get('/protected-endpoint')
```

## 🧪 Testing

### Q: How do I set up testing?
**A:** Install testing dependencies:
```bash
npm install -D @testing-library/react @testing-library/jest-dom vitest jsdom
```

### Q: How do I test theme-aware components?
**A:** Use test utilities:
```jsx
import { renderWithTheme } from '../tests/test-utils'

test('component renders with theme', () => {
  renderWithTheme(<MyComponent />, { theme: 'dark' })
  // assertions...
})
```

### Q: How do I mock API calls in tests?
**A:** Use MSW (Mock Service Worker):
```bash
npm install -D msw
```

## 🚀 Deployment

### Q: How do I deploy to Vercel?
**A:** Simple deployment:
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### Q: How do I deploy to Netlify?
**A:** Deploy options:
1. **Drag and drop:** Build locally, upload `dist` folder
2. **Git integration:** Connect repository for auto-deploys
3. **CLI:** Use Netlify CLI for deployment

### Q: What about environment variables in production?
**A:** Set environment variables in your hosting platform:
- **Vercel:** Project settings → Environment Variables
- **Netlify:** Site settings → Environment Variables
- **Custom server:** Use `.env.production` or server configuration

## 🐛 Troubleshooting

### Q: I'm getting "Module not found" errors
**A:** Check these solutions:
1. **File paths:** Ensure correct relative/absolute paths
2. **File extensions:** Include `.jsx` extension if needed
3. **Case sensitivity:** Match exact file naming
4. **Dependencies:** Install missing packages

### Q: Styles aren't loading correctly
**A:** Common fixes:
1. **Import order:** Import CSS before components
2. **Tailwind purging:** Check content paths in config
3. **CSS specificity:** Use more specific selectors
4. **PostCSS plugins:** Verify plugin configuration

### Q: The app is slow in development
**A:** Performance tips:
1. **Reduce re-renders:** Use `React.memo`, `useMemo`, `useCallback`
2. **Code splitting:** Lazy load routes and heavy components
3. **Dev tools:** Disable React DevTools in production
4. **Bundle size:** Analyze and optimize imports

### Q: Hot Module Replacement isn't working
**A:** Try these fixes:
1. **Restart dev server:** Stop and start again
2. **Check file paths:** Ensure files are in `src/`
3. **Browser cache:** Hard refresh the page
4. **Vite config:** Verify HMR settings

### Q: Build fails with memory issues
**A:** Increase Node.js memory:
```bash
# Temporary
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or in package.json
"build": "NODE_OPTIONS=\"--max-old-space-size=4096\" vite build"
```

## 📞 Getting Help

### Q: Where can I get more help?
**A:** Resources for support:
1. **Documentation:** Check the [docs folder](./README.md)
2. **GitHub Issues:** Report bugs and request features
3. **Community:** Join React and Vite communities
4. **Stack Overflow:** Search for specific error messages

### Q: How do I report a bug?
**A:** When reporting bugs, include:
1. **Steps to reproduce** the issue
2. **Expected vs actual behavior**
3. **Environment details** (Node version, OS, browser)
4. **Error messages** and stack traces
5. **Minimal reproduction** if possible

### Q: Can I contribute to the template?
**A:** Yes! Contributions are welcome:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Can't find your question? Check our [troubleshooting guide](./troubleshooting.md) or open an issue!** ❓
