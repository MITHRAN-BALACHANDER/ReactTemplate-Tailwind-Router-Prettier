# Assets Directory

This directory contains static assets for your React application.

## Structure

- `images/` - Static images (logos, photos, etc.)
- `icons/` - Icon files (SVG, PNG icons)

## Usage

Import assets in your components:

```jsx
import logo from '@/assets/images/logo.png'
import iconUser from '@/assets/icons/user.svg'

function MyComponent() {
  return (
    <div>
      <img src={logo} alt="Logo" />
      <img src={iconUser} alt="User" />
    </div>
  )
}
```

## Optimization Tips

1. Use SVG for icons when possible for better scalability
2. Optimize images before adding them to the project
3. Consider using WebP format for better compression
4. Use descriptive file names for better organization
