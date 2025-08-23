/**
 * Layout Components
 * 
 * This file contains layout-related components that provide structure to your application.
 * Layout components help maintain consistent spacing, alignment, and visual hierarchy.
 * 
 * Key Concepts:
 * - Layout components should be focused on positioning and structure, not content
 * - Use semantic HTML elements for better accessibility
 * - Design for responsive layouts by default
 * - Keep layout logic separate from business logic
 * 
 * Usage Example:
 * import Layout, { Header, Footer, Container } from '@/components/layout'
 */

import { ReactNode, HTMLAttributes } from 'react'

interface LayoutProps {
  children: ReactNode
}

interface HeaderProps {
  title?: string
  subtitle?: string
  children?: ReactNode
}

interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
  className?: string
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

/**
 * Main Layout Component
 * 
 * A wrapper component that provides the basic page structure.
 * This is typically used as a page-level wrapper that ensures consistent
 * spacing and background across all pages.
 * 
 * Design Patterns:
 * - min-h-screen ensures the layout takes at least the full viewport height
 * - Container pattern provides consistent max-width and padding
 * - Flexible design allows for additional layout modifications
 * 
 * @param props - Component props
 * @param props.children - Page content
 * @returns Layout wrapper
 * 
 * @example
 * <Layout>
 *   <Header title="Dashboard" />
 *   <main>Your page content here</main>
 *   <Footer />
 * </Layout>
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 
        Container with responsive padding and max-width
        - mx-auto centers the content
        - px-4 provides consistent horizontal padding
        - py-8 provides vertical spacing
      */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

/**
 * Header Component
 * 
 * A flexible header component for page titles and actions.
 * Commonly used at the top of pages to provide context and navigation.
 * 
 * Features:
 * - Flexible title/subtitle layout
 * - Support for action buttons or controls
 * - Consistent spacing and typography
 * - Responsive design
 * 
 * @param props - Component props
 * @param props.title - Main header title
 * @param props.subtitle - Optional subtitle text
 * @param props.children - Optional action elements (buttons, links, etc.)
 * @returns Header component
 * 
 * @example
 * <Header title="User Management" subtitle="Manage user accounts and permissions">
 *   <Button variant="primary">Add User</Button>
 * </Header>
 */
export const Header: React.FC<HeaderProps> = ({ title, subtitle, children }) => {
  return (
    <header className="bg-white shadow-sm border-b mb-8">
      <div className="container mx-auto px-4 py-6">
        {/* Flexbox layout for title and actions */}
        <div className="flex justify-between items-center">
          <div>
            {/* Conditional rendering - only show elements if props are provided */}
            {title && (
              <h1 className="text-2xl font-bold text-gray-900">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-600 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {/* Action area - buttons, navigation, etc. */}
          {children && (
            <div className="flex items-center space-x-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

/**
 * Footer Component
 * 
 * A standard footer component with copyright and branding information.
 * Typically used at the bottom of pages or the main layout.
 * 
 * Features:
 * - Automatic copyright year calculation
 * - Consistent styling and spacing
 * - Dark theme for visual separation
 * - Responsive text sizing
 * 
 * @returns Footer component
 * 
 * @example
 * <Footer />
 * 
 * Note: This component is self-contained and doesn't require props.
 * Customize the content by modifying the component directly.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Dynamic copyright year - automatically updates */}
          <p>&copy; {new Date().getFullYear()} React Tailwind Template. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * Container Component
 * 
 * A flexible container component for consistent content width and spacing.
 * Provides responsive max-widths and consistent horizontal padding.
 * 
 * Container Sizes:
 * - sm: Small container (max-width: 672px) - good for forms, simple content
 * - default: Standard container (max-width: 896px) - most common use case
 * - lg: Large container (max-width: 1152px) - dashboards, wide content
 * - xl: Extra large (max-width: 1408px) - data tables, complex layouts
 * - full: No max-width constraint - spans full width
 * 
 * @param props - Component props
 * @param props.children - Container content
 * @param props.size - Container size variant
 * @param props.className - Additional CSS classes
 * @returns Container component
 * 
 * @example
 * <Container size="lg" className="bg-white rounded-lg">
 *   <h2>Dashboard Content</h2>
 *   <p>This content will be contained within a large container.</p>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = ({ 
  children, 
  size = 'default', 
  className = '' 
}) => {
  // Size mapping for different container widths
  const sizes: Record<ContainerProps['size'] & string, string> = {
    sm: 'max-w-2xl',       // ~672px
    default: 'max-w-4xl',  // ~896px  
    lg: 'max-w-6xl',       // ~1152px
    xl: 'max-w-7xl',       // ~1408px
    full: 'max-w-full',    // No constraint
  }

  return (
    <div className={`mx-auto px-4 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Section Component
 * 
 * A semantic section wrapper with consistent vertical spacing.
 * Use this to group related content and maintain consistent spacing between sections.
 * 
 * Benefits:
 * - Semantic HTML structure improves accessibility
 * - Consistent vertical rhythm across your application
 * - Easy to customize spacing for different sections
 * 
 * @param props - Component props
 * @param props.children - Section content
 * @param props.className - Additional CSS classes
 * @param props...rest - Additional HTML section attributes
 * @returns Section component
 * 
 * @example
 * <Section className="bg-gray-50">
 *   <h2>Features</h2>
 *   <p>Description of features...</p>
 * </Section>
 * 
 * <Section>
 *   <h2>Testimonials</h2>
 *   <div className="grid grid-cols-3 gap-4">
 *     {testimonials.map(testimonial => <TestimonialCard key={testimonial.id} />)}
 *   </div>
 * </Section>
 */
export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <section 
      className={`py-8 ${className}`} 
      {...props} // Spread additional attributes like id, aria-label, etc.
    >
      {children}
    </section>
  )
}

// Default export for the main Layout component
// Named exports for specific layout components
export default Layout
