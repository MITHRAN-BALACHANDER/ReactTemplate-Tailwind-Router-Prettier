import { ReactNode, ComponentType } from 'react';

/**
 * Theme-related type definitions
 */
export type Theme = 'light' | 'dark';

/**
 * Context value for theme management
 */
export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Component props that accept children
 */
export interface ComponentWithChildren {
  children: ReactNode;
}

/**
 * Navigation link structure
 */
export interface NavLink {
  to: string;
  label: string;
}

/**
 * Base component props with optional className
 */
export interface BaseComponentProps {
  className?: string;
}

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  children: ReactNode;
  title?: string;
}

/**
 * Feature item for the About page
 */
export interface FeatureItem {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/**
 * Technology item for the About page
 */
export interface TechItem {
  name: string;
  description: string;
  version: string;
}

/**
 * Vite environment variables type definitions
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
