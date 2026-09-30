export const designTokens = {
  colors: {
    background: '#FAFAF8',
    foreground: '#1A1A1A',
    mutedSurface: '#F5F3F0',
    mutedForeground: '#6B6B6B',
    accent: '#B8860B',
    secondaryAccent: '#D4A84B',
    border: '#E8E4DF',
    card: '#FFFFFF',
    ring: '#B8860B',
  },
  typography: {
    display: 'var(--font-display)',
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  radii: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.125rem',
  },
  shadows: {
    soft: '0 1px 0 rgba(26, 26, 26, 0.08), 0 12px 28px rgba(26, 26, 26, 0.04)',
  },
  motion: {
    duration: '150ms',
    timing: 'cubic-bezier(0.2, 0, 0.2, 1)',
  },
  containers: {
    page: 'max-w-container mx-auto w-full px-4 sm:px-6 lg:px-8',
  },
} as const;
