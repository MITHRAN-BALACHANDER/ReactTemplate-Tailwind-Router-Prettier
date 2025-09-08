# Create React Tailwind App Router

A modern React 19 template collection with Vite, React Router, Tailwind CSS, and complete dark/light mode theming. **Choose from 3 optimized templates: Basic JSX, Advanced JavaScript, and TypeScript!**


[![npm version](https://img.shields.io/npm/v/create-react-tailwind-app-router?logo=npm&color=crimson&style=for-the-badge)](https://www.npmjs.com/package/create-react-tailwind-app-router)
[![Downloads](https://img.shields.io/npm/dt/create-react-tailwind-app-router?logo=npm&color=blue&style=for-the-badge)](https://www.npmjs.com/package/create-react-tailwind-app-router)
[![GitHub Stars](https://img.shields.io/github/stars/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier?logo=github&color=yellow&style=for-the-badge)](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier/stargazers)
[![License](https://img.shields.io/github/license/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier?color=green&style=for-the-badge)](https://github.com/MITHRAN-BALACHANDER/ReactTemplate-Tailwind-Router-Prettier/blob/main/LICENSE)

##  Features

- ⚛️ **React 19** - Latest version with concurrent features
- ⚡ **Vite 7.1+** - Lightning-fast development and builds  
- 🧭 **React Router 6.27+** - Client-side routing with active states
- 🎨 **Tailwind CSS 4.1+** - Utility-first CSS with dark mode support
- 🔷 **TypeScript Support** - Full TypeScript template with comprehensive type safety
- 🟨 **Multiple Templates** - Choose from Basic, Advanced JavaScript, or TypeScript
- 🌓 **Theme System** - Complete dark/light mode with localStorage persistence
- 🎯 **Lucide Icons** - Beautiful, customizable icon library
- 📱 **Responsive Design** - Mobile-first layouts with comprehensive UI components
- 🔧 **Developer Tools** - ESLint, Prettier, and VS Code configuration
- 📚 **Educational** - Comprehensive documentation and learning examples
- 🎨 **UI Component Library** - Pre-built, theme-aware components

## 🚀 Installation

### Quick Start (NPX)

```bash
# Interactive template selection (recommended)
npx create-react-tailwind-app-router 
# Explicit template selection
npx create-react-tailwind-app-router my-app -t javascript
npx create-react-tailwind-app-router my-app -t jsx-basic
npx create-react-tailwind-app-router my-app -t typescript
```

### Template Options

| Template | Description | Features | Command |
|----------|-------------|----------|---------|
| **jsx-basic** | Minimal React setup | Essential features only | `--basic` or `-t jsx-basic` |
| **javascript** | Comprehensive JavaScript | Full UI library, themes, docs | `--js` or `-t javascript` |
| **typescript** | Full TypeScript support | Type safety + all JS features | `--typescript` or `-t typescript` |

### Global Installation

```bash
npm install -g create-react-tailwind-app-router

# Then use any of the template options
#Interactive template selection (recommended)
create-react-tailwind-app-router my-app  


cd my-app
npm install
npm run dev
```

## 🏗️ What You Get

### jsx-basic Template (Minimal)

- **React 19** - Latest React with minimal configuration
- **Vite 7.1+** - Fast development server and optimized builds
- **Tailwind CSS 4.1+** - Essential utility-first styling
- **React Router 6.27+** - Basic routing setup
- **ESLint & Prettier** - Code quality and formatting

### javascript Template (Comprehensive)

Everything from jsx-basic plus:

- **Complete UI Library** - Navigation, buttons, cards, forms
- **Theme System** - Dark/light mode with LocalStorage persistence
- **Responsive Navbar** - Theme toggle and active route highlighting
- **Sample Pages** - Home, About, Contact with modern design
- **Custom Hooks** - localStorage, debounce, window size utilities
- **Context API** - Global state management with theme handling
- **Lucide React Icons** - Beautiful icon library integration
- **Form Handling** - Contact form with validation examples

### typescript Template (Type-Safe)

Everything from javascript plus:

- **TypeScript 5.6+** - Full type safety and IntelliSense
- **Strict Type Configuration** - Comprehensive tsconfig.json
- **Typed Components** - All components with proper interfaces
- **Type-Safe Routing** - React Router with TypeScript integration
- **Enhanced Development** - Better error catching and code completion

## 🎨 Theme System

**Toggle Themes:**

- Click Sun/Moon icon in navbar
- Automatic localStorage persistence
- Smooth transitions between modes

## 🛠️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## 📚 Documentation

- **[Quick Start](./docs/quick-start.md)** - 5-minute setup guide
- **[Theme System](./docs/theme-system.md)** - Dark/light mode implementation  
- **[Components](./docs/components.md)** - Component architecture
- **[Examples](./docs/examples.md)** - Code patterns and examples
- **[Adding Features](./docs/adding-features.md)** - Extend the template

## 🎯 Getting Started

### 1. Create Your Project

```bash
# Interactive template selection (recommended)
npx create-react-tailwind-app-router 

# Or choose a specific template:
npx create-react-tailwind-app-router my-app --basic      # jsx-basic
npx create-react-tailwind-app-router my-app --js         # javascript  
npx create-react-tailwind-app-router my-app --typescript # typescript
```

### 2. Start Development

```bash
cd app-name
npm install
npm run dev
```

### 3. Explore Your App

Open `http://localhost:5173` and explore based on your template:

**jsx-basic Template:**

- Clean React setup with routing
- Basic styling with Tailwind CSS
- Ready for your custom development

**javascript/typescript Templates:**

- Theme Toggle - Click Sun/Moon in navbar
- Responsive Navigation - Try resizing browser  
- Form Handling - Contact page with validation
- Route Highlighting - Active states in navigation
- Theme Persistence - Refresh browser, theme remembered

## 📊 Performance (Lighthouse)
| Metric         | Score |
|----------------|-------|
| Performance    | 100   |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 82    |


## 🚦 Next Steps

### jsx-basic Template

1. Start building your custom components
2. Add your styling and layouts
3. Explore Tailwind CSS documentation

### javascript/typescript Templates

1. Read [Theme System Guide](./docs/theme-system.md)
2. Check [Component Examples](./docs/components.md)
3. Explore the custom hooks in `src/hooks/`
4. Review the Context API setup in `src/context/`

## 📄 License

MIT © [Mithran B](https://github.com/MITHRAN-BALACHANDER)

---

**🚀 Start building modern React apps with beautiful theming!**
