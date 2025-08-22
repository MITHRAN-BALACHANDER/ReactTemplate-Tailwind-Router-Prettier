# Troubleshooting Guide

Solutions to common issues and problems you might encounter.

## 🚨 Installation Issues

### Node.js Version Problems
**Problem:** Error messages about Node.js version compatibility
```
Error: The engine "node" is incompatible with this module
```

**Solutions:**
1. **Check Node version:**
   ```bash
   node --version
   ```
2. **Update Node.js:** Download latest LTS from [nodejs.org](https://nodejs.org)
3. **Use nvm (Node Version Manager):**
   ```bash
   # Install nvm
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Install and use Node 18+
   nvm install 18
   nvm use 18
   ```

### Package Installation Failures
**Problem:** npm install fails with permission errors

**Solutions:**
1. **Fix npm permissions (Linux/Mac):**
   ```bash
   sudo chown -R $(whoami) ~/.npm
   ```
2. **Use npx instead of global install:**
   ```bash
   npx create-react-tailwind-app-router my-app
   ```
3. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```
4. **Delete and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Git Clone Issues
**Problem:** Cannot clone repository

**Solutions:**
1. **Check Git installation:**
   ```bash
   git --version
   ```
2. **Use HTTPS instead of SSH:**
   ```bash
   git clone https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier.git
   ```
3. **Manual download:** Download ZIP from GitHub

## 🔧 Development Server Issues

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5173`

**Solutions:**
1. **Find and kill process:**
   ```bash
   # Find process using port 5173
   lsof -ti:5173
   
   # Kill the process
   kill -9 $(lsof -ti:5173)
   ```
2. **Use different port:**
   ```bash
   npm run dev -- --port 3000
   ```
3. **Update package.json:**
   ```json
   {
     "scripts": {
       "dev": "vite --port 3000"
     }
   }
   ```

### Server Won't Start
**Problem:** Development server fails to start

**Solutions:**
1. **Check for syntax errors:**
   ```bash
   npm run lint
   ```
2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   ```
3. **Restart with verbose logging:**
   ```bash
   npm run dev -- --debug
   ```
4. **Check for conflicting processes:**
   ```bash
   ps aux | grep node
   ```

### Hot Module Replacement Not Working
**Problem:** Changes don't reflect automatically

**Solutions:**
1. **Hard refresh browser:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Check file paths:** Ensure files are in `src/` directory
3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C) then restart
   npm run dev
   ```
4. **Check browser console** for error messages
5. **Disable browser cache** in DevTools

## 🎨 Styling Issues

### Tailwind CSS Not Working
**Problem:** Tailwind classes have no effect

**Solutions:**
1. **Check CSS import** in `src/index.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
2. **Verify Tailwind config** in `tailwind.config.js`:
   ```js
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     // ...
   }
   ```
3. **Rebuild the project:**
   ```bash
   npm run build
   npm run dev
   ```
4. **Check for typos** in class names
5. **Verify PostCSS config:**
   ```js
   // postcss.config.js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

### Dark Mode Not Working
**Problem:** Theme toggle doesn't change appearance

**Solutions:**
1. **Check Tailwind dark mode config:**
   ```js
   // tailwind.config.js
   export default {
     darkMode: 'class', // Must be 'class' not 'media'
     // ...
   }
   ```
2. **Verify theme context** is wrapped around app:
   ```jsx
   // src/main.jsx
   <ThemeProvider>
     <App />
   </ThemeProvider>
   ```
3. **Check browser DevTools** for `dark` class on `<html>` element
4. **Clear localStorage:**
   ```js
   localStorage.removeItem('theme')
   ```
5. **Check console errors** for JavaScript issues

### Styles Not Loading
**Problem:** Components appear unstyled

**Solutions:**
1. **Check import order** in `src/main.jsx`:
   ```jsx
   import './index.css' // CSS first
   import App from './App'
   ```
2. **Verify CSS file paths** are correct
3. **Check browser Network tab** for failed CSS requests
4. **Clear browser cache:**
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Option+E

## 🌓 Theme System Issues

### Theme Not Persisting
**Problem:** Theme resets on page refresh

**Solutions:**
1. **Check localStorage access:**
   ```js
   // Test in browser console
   localStorage.setItem('test', 'value')
   localStorage.getItem('test')
   ```
2. **Verify theme context** includes persistence logic
3. **Check for localStorage clearing:**
   ```js
   // Remove any localStorage.clear() calls
   ```
4. **Private browsing mode** disables localStorage

### Theme Colors Not Updating
**Problem:** Custom colors don't apply

**Solutions:**
1. **Check CSS custom properties:**
   ```css
   :root {
     --color-primary: #3b82f6;
   }
   
   .dark {
     --color-primary: #60a5fa;
   }
   ```
2. **Verify theme configuration:**
   ```js
   // src/config/themes.js
   export const themeVariants = {
     default: {
       light: { primary: '#3b82f6' },
       dark: { primary: '#60a5fa' }
     }
   }
   ```
3. **Check component usage:**
   ```jsx
   // Use theme hook correctly
   const { colors } = useTheme()
   ```

## 🧭 Routing Issues

### Routes Not Working
**Problem:** Navigation doesn't change pages

**Solutions:**
1. **Check router setup** in `src/App.jsx`:
   ```jsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom'
   
   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
           {/* other routes */}
         </Routes>
       </BrowserRouter>
     )
   }
   ```
2. **Use correct navigation components:**
   ```jsx
   import { Link, NavLink } from 'react-router-dom'
   
   // Use Link instead of <a>
   <Link to="/about">About</Link>
   ```
3. **Check for JavaScript errors** in console

### 404 Errors on Refresh
**Problem:** Page refresh shows 404 error

**Solutions:**
1. **Configure development server** in `vite.config.js`:
   ```js
   export default {
     server: {
       historyApiFallback: true
     }
   }
   ```
2. **Production deployment configuration:**
   - **Netlify:** Add `_redirects` file with `/* /index.html 200`
   - **Vercel:** Add `vercel.json` with rewrite rules
   - **Apache:** Configure `.htaccess` for SPA routing

### Active States Not Working
**Problem:** Navigation doesn't show active page

**Solutions:**
1. **Use NavLink instead of Link:**
   ```jsx
   <NavLink 
     to="/about" 
     className={({ isActive }) => 
       isActive ? 'active-class' : 'inactive-class'
     }
   >
     About
   </NavLink>
   ```
2. **Check route paths** match exactly
3. **Verify CSS classes** for active states

## 📦 Build Issues

### Build Fails
**Problem:** `npm run build` command fails

**Solutions:**
1. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```
2. **Fix ESLint errors:**
   ```bash
   npm run lint
   npm run lint -- --fix
   ```
3. **Increase Node.js memory:**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   npm run build
   ```
4. **Clear build cache:**
   ```bash
   rm -rf dist node_modules/.vite
   npm install
   npm run build
   ```

### Import Errors
**Problem:** Module import failures

**Solutions:**
1. **Check file extensions:**
   ```jsx
   // Add .jsx extension if needed
   import Component from './Component.jsx'
   ```
2. **Verify file paths:**
   ```jsx
   // Use correct relative paths
   import Component from '../components/Component'
   ```
3. **Check case sensitivity:**
   ```jsx
   // Match exact file names
   import Component from './Component' // not './component'
   ```
4. **Absolute imports configuration:**
   ```js
   // vite.config.js
   export default {
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src')
       }
     }
   }
   ```

### Bundle Size Too Large
**Problem:** Build output is too large

**Solutions:**
1. **Analyze bundle:**
   ```bash
   npm run build -- --analyze
   ```
2. **Lazy load routes:**
   ```jsx
   const About = lazy(() => import('./pages/About'))
   ```
3. **Remove unused imports:**
   ```jsx
   // Instead of importing entire library
   import { Button } from '@mui/material'
   // Import specific components
   import Button from '@mui/material/Button'
   ```
4. **Check for duplicate dependencies:**
   ```bash
   npm ls
   ```

## 🔐 Security Issues

### CORS Errors
**Problem:** API requests blocked by CORS

**Solutions:**
1. **Development proxy** in `vite.config.js`:
   ```js
   export default {
     server: {
       proxy: {
         '/api': {
           target: 'http://localhost:3001',
           changeOrigin: true
         }
       }
     }
   }
   ```
2. **Backend CORS configuration:**
   ```js
   // Express.js example
   app.use(cors({
     origin: 'http://localhost:5173'
   }))
   ```
3. **API URL configuration:**
   ```js
   // Use relative URLs for same-origin requests
   fetch('/api/data') // instead of full URL
   ```

### Content Security Policy Issues
**Problem:** CSP blocks inline styles/scripts

**Solutions:**
1. **Configure CSP** to allow Vite in development:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="script-src 'self' 'unsafe-eval' 'unsafe-inline';">
   ```
2. **Production CSP** should be more restrictive
3. **Use nonce-based CSP** for better security

## 📱 Mobile Issues

### Touch Events Not Working
**Problem:** Touch interactions don't work properly

**Solutions:**
1. **Add touch-action CSS:**
   ```css
   .touchable {
     touch-action: manipulation;
   }
   ```
2. **Use proper event handlers:**
   ```jsx
   <button 
     onTouchStart={handleTouch}
     onClick={handleClick}
   >
     Button
   </button>
   ```
3. **Check viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

### Responsive Design Issues
**Problem:** Layout breaks on mobile devices

**Solutions:**
1. **Test with browser DevTools** mobile simulation
2. **Use Tailwind responsive classes:**
   ```jsx
   <div className="w-full md:w-1/2 lg:w-1/3">
     Responsive content
   </div>
   ```
3. **Check for fixed widths** that don't scale
4. **Test on actual devices** when possible

## 🔍 Debugging Tools

### Browser DevTools
1. **Console:** Check for JavaScript errors
2. **Network:** Monitor API requests and responses
3. **Elements:** Inspect HTML/CSS in real-time
4. **Application:** Check localStorage, sessionStorage
5. **Sources:** Debug with breakpoints

### React DevTools
1. **Install browser extension**
2. **Inspect component hierarchy**
3. **Monitor state changes**
4. **Profile performance**

### Vite DevTools
1. **Check terminal output** for build warnings
2. **Use `--debug` flag** for verbose logging
3. **Monitor file changes** in development

## 📞 Getting Additional Help

### Before Asking for Help
1. **Search existing issues** on GitHub
2. **Check the documentation** thoroughly
3. **Reproduce the issue** in isolation
4. **Gather relevant information:**
   - Operating system and version
   - Node.js and npm versions
   - Browser and version
   - Exact error messages
   - Steps to reproduce

### Creating Good Bug Reports
Include:
1. **Clear description** of the problem
2. **Expected vs actual behavior**
3. **Minimal reproduction code**
4. **Environment details**
5. **Error messages and stack traces**
6. **Screenshots if applicable**

### Community Resources
- **GitHub Issues:** Project-specific problems
- **Stack Overflow:** General React/Vite questions
- **Discord/Reddit:** Community support
- **Official Documentation:** React, Vite, Tailwind CSS

---

**Still having issues? Don't hesitate to [open an issue](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier/issues) with detailed information!** 🛠️
