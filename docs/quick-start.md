# Quick Start Guide

Get your React Tailwind application up and running in just a few minutes!

## 🚀 One-Command Setup

```bash
npx create-react-tailwind-app-router my-app
cd my-app
npm install
npm run dev
```

That's it! Your application will be running at `http://localhost:5173` with:
- ⚡ Hot module replacement
- 🌓 Dark/light mode toggle
- 🧭 React Router navigation
- 🎨 Tailwind CSS styling

## 🎯 What You Get Immediately

### ✨ Live Features
- **Theme Toggle** - Click the Sun/Moon icon in the navbar to switch themes
- **Navigation** - Click Home, About, Contact to see routing in action
- **Responsive Design** - Resize your browser to see mobile-friendly layouts
- **Interactive Forms** - Try the contact form with validation

### 🏗️ Development Ready
- **ESLint** - Code quality checking
- **Prettier** - Automatic code formatting
- **Vite** - Lightning-fast development server
- **Modern React** - React 19 with latest features

## 📂 What's Inside

```
my-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route components (Home, About, Contact)
│   ├── context/        # Global state with theme management
│   ├── hooks/          # Custom React hooks
│   └── services/       # API integration layer
├── docs/               # This documentation
└── package.json        # Dependencies and scripts
```

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run format` | Format code with Prettier |

## 🌓 Testing the Theme System

1. **Open your app** at `http://localhost:5173`
2. **Click the theme toggle** (Sun/Moon icon) in the top navigation
3. **Watch the magic** - entire app switches between light and dark mode
4. **Refresh the page** - your theme preference is remembered!

## 📱 Testing Responsive Design

1. **Open browser dev tools** (F12)
2. **Toggle device toolbar** (Ctrl+Shift+M / Cmd+Shift+M)
3. **Try different screen sizes** - mobile, tablet, desktop
4. **See the navigation** adapt to smaller screens

## 🎨 Customizing Your App

### Change App Title
```jsx
// src/components/layout/Navbar.jsx
<Link to='/'>
  Your App Name Here  {/* Change this */}
</Link>
```

### Add Your Colors
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e'
      }
    }
  }
}
```

### Create a New Page
```jsx
// src/pages/Services.jsx
export default function Services() {
  return (
    <div>
      <h1>Our Services</h1>
      <p>Welcome to our services page!</p>
    </div>
  )
}
```

## 🚦 Next Steps

Once you're comfortable with the basics:

1. **📖 Read the [Project Structure](./project-structure.md)** - Understand how everything is organized
2. **🌓 Learn [Theme System](./theme-system.md)** - Master the dark/light mode features
3. **🧩 Explore [Components](./components.md)** - Build reusable UI components
4. **🔗 Check [Examples](./examples.md)** - See practical implementation patterns

## ❓ Need Help?

- **Documentation Issues?** Check our [FAQ](./faq.md)
- **Build Problems?** See [Troubleshooting](./troubleshooting.md)
- **Want to Contribute?** Read our [Contributing Guide](./contributing.md)

---

**Happy coding! 🎉** You now have a modern React application with theming, routing, and professional tooling ready to build upon.
