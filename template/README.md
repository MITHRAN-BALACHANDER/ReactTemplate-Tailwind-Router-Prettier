# React Tailwind Template

A modern, production-ready React application template with the latest tools and best practices.

## ✨ Features

- ⚡ **Vite 7.1+** - Lightning fast build tool with instant HMR
- ⚛️ **React 19** - Latest React with concurrent features and modern hooks
- 🧭 **React Router 6.27+** - Declarative client-side routing with nested routes
- 🎨 **Tailwind CSS 4.1+** - Utility-first CSS framework with Vite plugin
- ✨ **Prettier 3.3+** - Automatic code formatting with opinionated defaults
- 📦 **ESLint 9.33+** - Advanced code linting with React-specific rules
- 🔧 **SWC Compiler** - Super-fast JavaScript/TypeScript compiler for faster builds
- � **Well-organized structure** - Scalable folder structure following React best practices

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📁 Project Structure

```
src/
├── assets/              # Static assets
│   ├── images/         # Images (logos, photos, etc.)
│   ├── icons/          # Icon files (SVG, PNG)
│   └── README.md       # Assets documentation
├── components/         # Reusable React components
│   ├── layout/         # Layout components
│   │   ├── Navbar.jsx  # Navigation component
│   │   └── index.jsx   # Layout wrapper, Header, Footer, etc.
│   ├── ui/             # Basic UI components
│   │   └── index.jsx   # Button, Input, Modal, Card, etc.
│   └── index.js        # Component exports
├── constants/          # Application constants
│   └── index.js        # API URLs, routes, themes, etc.
├── context/            # React Context providers
│   └── AppContext.jsx  # Global app state management
├── hooks/              # Custom React hooks
│   └── index.js        # useLocalStorage, useDebounce, etc.
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   └── Contact.jsx     # Contact form page
├── services/           # API and external services
│   └── api.js          # HTTP client and API functions
├── types/              # Type definitions (JSDoc/TypeScript)
│   └── index.js        # Type definitions using JSDoc
├── utils/              # Utility functions
│   └── helpers.js      # Common helper functions
├── App.jsx             # Main app component with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🛠️ Usage Examples

### Using Components

```jsx
// Import components from the centralized index
import { Button, Card, LoadingSpinner } from '@/components/ui'
import { Container, Section } from '@/components/layout'

function MyPage() {
  return (
    <Container>
      <Section>
        <Card>
          <Button variant="primary" size="lg">
            Click me
          </Button>
          <LoadingSpinner size="md" />
        </Card>
      </Section>
    </Container>
  )
}
```

### Using Custom Hooks

```jsx
import { useLocalStorage, useDebounce } from '@/hooks'

function MyComponent() {
  const [user, setUser] = useLocalStorage('user', null)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  // Use the hooks in your component logic
}
```

### Using Constants and Utilities

```jsx
import { ROUTES, API_BASE_URL } from '@/constants'
import { formatDate, capitalize } from '@/utils/helpers'

// Use constants for consistent values
const navigation = [
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.ABOUT, label: 'About' },
]

// Use utilities for common operations
const formattedDate = formatDate(new Date())
const title = capitalize('hello world')
```

### Using Context

```jsx
import { useApp } from '@/context/AppContext'

function MyComponent() {
  const { state, actions } = useApp()
  
  return (
    <div>
      <p>User: {state.user?.name}</p>
      <button onClick={() => actions.setTheme('dark')}>
        Switch to Dark Theme
      </button>
    </div>
  )
}
```

### API Service Usage

```jsx
import { userService } from '@/services/api'

function UserList() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers()
        setUsers(data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    
    fetchUsers()
  }, [])
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

## 📚 Development Guidelines

### Adding New Components

1. **UI Components**: Add reusable components to `src/components/ui/`
2. **Layout Components**: Add layout-related components to `src/components/layout/`
3. **Page Components**: Add page components to `src/pages/`
4. **Export**: Always export from the appropriate index file

### Adding New Pages

1. Create the component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update navigation in `src/components/layout/Navbar.jsx`
4. Add route constant in `src/constants/index.js`

### Adding Custom Hooks

1. Create hook functions in `src/hooks/index.js`
2. Follow the naming convention: `use*`
3. Add JSDoc documentation for parameters and return values

### Environment Variables

1. Copy `.env.example` to `.env.local`
2. Update with your configuration values
3. Prefix all variables with `VITE_`

### Code Style

- Use functional components with hooks
- Prefer named exports over default exports for utilities
- Use JSDoc comments for better IDE support
- Follow the existing file naming conventions

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Code Formatting and Linting

Format your code with Prettier:

```bash
npm run format
```

Check code formatting:

```bash
npm run format:check
```

Lint your code:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

## Project Structure

```
src/
├── components/     # Reusable components
│   └── Navbar.jsx
├── pages/          # Page components
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Customization

### Code Style

This template uses Prettier for code formatting. You can customize the formatting rules by editing `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.jsx`
3. Update the navigation in `src/components/Navbar.jsx`

### Styling

This template uses Tailwind CSS. You can customize the design system by editing `tailwind.config.js`.

## License

MIT
