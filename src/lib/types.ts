export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  error?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export type Theme = 'light' | 'dark' | 'system'

export type Status = 'loading' | 'success' | 'error' | 'idle'