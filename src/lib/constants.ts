export const APP_NAME = 'Next.js Production Starter'
export const APP_DESCRIPTION = 'A production-ready Next.js application with TypeScript, Tailwind CSS, and shadcn/ui'

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/yourusername',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
} as const

export const SITE_CONFIG = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: 'https://your-domain.com',
  ogImage: 'https://your-domain.com/og.jpg',
  links: SOCIAL_LINKS,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const