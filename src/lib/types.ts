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

// Organizational Structure Types

export interface Church {
  id: string
  name: string
  address?: string
  contactEmail?: string
  contactPhone?: string
  timeZone: string
  primaryLanguage: string
  logoUrl?: string
  isActive: boolean
  accountOwnerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Ministry {
  id: string
  name: string
  description?: string
  color: string // hex color code
  icon: string // icon identifier
  churchId: string
  leaderId?: string
  isActive: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface ServiceType {
  id: string
  name: string
  description?: string
  defaultDayOfWeek: number // 0-6 (Sunday-Saturday)
  defaultTime: string // HH:mm format
  typicalDuration: number // minutes
  ministryId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ServiceEvent {
  id: string
  name: string
  date: Date
  startTime: string
  duration: number // minutes
  location?: string
  notes?: string
  serviceTypeId: string
  eventType: 'one-time' | 'series' | 'recurring'
  seriesId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EventSeries {
  id: string
  name: string
  description?: string
  startDate: Date
  endDate?: Date
  serviceTypeId: string
  createdAt: Date
  updatedAt: Date
}

// Subscription tiers for organizational limits
export type SubscriptionTier = 'tier1' | 'tier2' | 'tier3'

export interface OrganizationalLimits {
  maxChurches: number
  maxMinistriesPerChurch: number
}

export const TIER_LIMITS: Record<SubscriptionTier, OrganizationalLimits> = {
  tier1: { maxChurches: 1, maxMinistriesPerChurch: 5 },
  tier2: { maxChurches: 1, maxMinistriesPerChurch: 25 },
  tier3: { maxChurches: 100, maxMinistriesPerChurch: -1 }, // -1 = unlimited
}

// Permission levels
export type PermissionLevel = 'account_owner' | 'church_admin' | 'ministry_leader' | 'service_coordinator'

export interface UserPermission {
  userId: string
  level: PermissionLevel
  churchId?: string
  ministryId?: string
  serviceTypeId?: string
}

// Ministry Icons - predefined set
export const MINISTRY_ICONS = [
  'music',
  'users',
  'heart',
  'baby',
  'graduation-cap',
  'mic',
  'cross',
  'book-open',
  'helping-hand',
  'globe',
  'coffee',
  'calendar',
  'star',
  'home',
  'church',
] as const

export type MinistryIcon = typeof MINISTRY_ICONS[number]

// Common service type templates
export const DEFAULT_SERVICE_TYPES = [
  {
    name: 'Sunday Morning Service',
    defaultDayOfWeek: 0, // Sunday
    defaultTime: '10:00',
    typicalDuration: 90,
  },
  {
    name: 'Sunday Evening Service',
    defaultDayOfWeek: 0,
    defaultTime: '18:00',
    typicalDuration: 75,
  },
  {
    name: 'Wednesday Prayer Meeting',
    defaultDayOfWeek: 3, // Wednesday
    defaultTime: '19:00',
    typicalDuration: 60,
  },
  {
    name: 'Youth Service',
    defaultDayOfWeek: 5, // Friday
    defaultTime: '19:30',
    typicalDuration: 90,
  },
] as const