import { pgTable, uuid, varchar, timestamp, boolean, text, integer, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './users'

// Subscription tier enum
export const subscriptionTierEnum = pgEnum('subscription_tier', ['tier1', 'tier2', 'tier3'])

// Account/Organization table
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  ownerId: uuid('owner_id').references(() => users.id, { onDelete: 'restrict' }).notNull(),
  subscriptionTier: subscriptionTierEnum('subscription_tier').default('tier1').notNull(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  subscriptionStatus: varchar('subscription_status', { length: 50 }).default('active'),
  subscriptionEndsAt: timestamp('subscription_ends_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Churches table
export const churches = pgTable('churches', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => accounts.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 50 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }).default('United States'),
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 50 }),
  website: varchar('website', { length: 255 }),
  timeZone: varchar('time_zone', { length: 100 }).default('America/New_York').notNull(),
  primaryLanguage: varchar('primary_language', { length: 10 }).default('en').notNull(),
  logoUrl: text('logo_url'),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Ministry icon enum
export const ministryIconEnum = pgEnum('ministry_icon', [
  'music', 'users', 'heart', 'baby', 'graduation-cap', 'mic', 
  'cross', 'book-open', 'helping-hand', 'globe', 'coffee', 
  'calendar', 'star', 'home', 'church'
])

// Ministries table
export const ministries = pgTable('ministries', {
  id: uuid('id').primaryKey().defaultRandom(),
  churchId: uuid('church_id').references(() => churches.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 7 }).notNull(), // Hex color code
  icon: ministryIconEnum('icon').default('church').notNull(),
  leaderId: uuid('leader_id').references(() => users.id, { onDelete: 'set null' }),
  displayOrder: integer('display_order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Service types table
export const serviceTypes = pgTable('service_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  ministryId: uuid('ministry_id').references(() => ministries.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  defaultDayOfWeek: integer('default_day_of_week'), // 0-6 (Sunday-Saturday)
  defaultTime: varchar('default_time', { length: 8 }), // HH:MM:SS format
  typicalDuration: integer('typical_duration'), // Duration in minutes
  location: varchar('location', { length: 255 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Event series for recurring/related events
export const eventSeries = pgTable('event_series', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceTypeId: uuid('service_type_id').references(() => serviceTypes.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }),
  recurrencePattern: varchar('recurrence_pattern', { length: 100 }), // daily, weekly, monthly, etc.
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Service events table
export const serviceEvents = pgTable('service_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceTypeId: uuid('service_type_id').references(() => serviceTypes.id, { onDelete: 'cascade' }).notNull(),
  seriesId: uuid('series_id').references(() => eventSeries.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  eventType: varchar('event_type', { length: 20 }).default('one-time').notNull(), // one-time, series, recurring
  eventDate: timestamp('event_date', { withTimezone: true }).notNull(),
  startTime: varchar('start_time', { length: 8 }).notNull(), // HH:MM:SS format
  duration: integer('duration').notNull(), // Duration in minutes
  location: varchar('location', { length: 255 }),
  notes: text('notes'),
  specialInstructions: text('special_instructions'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})