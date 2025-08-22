# Installation Guide

Complete installation instructions for the React Tailwind Template.

## 🚀 Quick Installation (Recommended)

### NPX (No Installation Required)
```bash
npx create-react-tailwind-app-router my-app
cd my-app
npm install
npm run dev
```

This is the fastest way to get started - no global packages needed!

## 🌐 Global Installation

### Install Globally
```bash
npm install -g create-react-tailwind-app-router
```

### Create New Projects
```bash
create-react-tailwind-app-router my-app
cd my-app
npm install
npm run dev
```

## 📦 Manual Installation

### Clone Repository
```bash
git clone https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier.git my-app
cd my-app
```

### Install Dependencies
```bash
npm install
```

### Start Development
```bash
npm run dev
```

## ⚙️ System Requirements

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (or yarn/pnpm)
- **Git** (for cloning)

### Check Your Versions
```bash
node --version
npm --version
git --version
```

## 🔧 Development Setup

### 1. Install Dependencies
The template includes all necessary dependencies:

```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.27.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react-swc": "^4.0.1",
    "vite": "^7.1.0",
    "tailwindcss": "^4.1.0",
    "eslint": "^9.33.0",
    "prettier": "^3.3.0"
  }
}
```

### 2. VS Code Extensions (Recommended)
Install these extensions for the best development experience:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

### 3. Configure Git (Optional)
```bash
git init
git add .
git commit -m "Initial commit"
```

## 🚀 First Run

After installation, your development server will be available at:
- **Local**: http://localhost:5173
- **Network**: http://[your-ip]:5173

### What You'll See
1. **Home Page** - Welcome screen with feature overview
2. **Theme Toggle** - Sun/Moon icon in navigation
3. **Responsive Design** - Mobile-friendly layout
4. **Sample Pages** - About and Contact pages

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix auto-fixable ESLint issues |
| `npm run format` | Format code with Prettier |

## 🔍 Verification

### Check Installation Success
1. **Development Server**: `npm run dev` should start without errors
2. **Theme Toggle**: Click Sun/Moon icon in navbar
3. **Navigation**: Click between Home, About, Contact
4. **Responsive**: Resize browser window
5. **Console**: No errors in browser developer tools

### Common Success Indicators
- ✅ Server starts on http://localhost:5173
- ✅ Hot Module Replacement (HMR) working
- ✅ Theme toggle switches dark/light mode
- ✅ Navigation highlights active page
- ✅ Responsive design adapts to screen size

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Vite will automatically try another port
# Or specify a different port:
npm run dev -- --port 3000
```

**Node Version Issues**
```bash
# Update Node.js to 18+ or use nvm
nvm install 18
nvm use 18
```

**Permission Errors (Windows)**
```bash
# Run as Administrator or use:
npm install --no-optional
```

**Clear Cache Issues**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Next Steps

1. **Explore Features**: Check [Quick Start Guide](./quick-start.md)
2. **Understand Structure**: Read [Project Structure](./project-structure.md)
3. **Learn Theming**: Explore [Theme System](./theme-system.md)
4. **Build Components**: Follow [Component Architecture](./components.md)

## 📞 Support

- **Documentation**: [Full Docs](./README.md)
- **Issues**: [GitHub Issues](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier/issues)
- **FAQ**: [Frequently Asked Questions](./faq.md)

---

**Ready to build? Start with `npm run dev` and explore the features!** 🚀
