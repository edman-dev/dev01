import { pgTable, uuid, varchar, timestamp, boolean, text, integer, pgEnum } from 'drizzle-orm/pg-core'
import { serviceEvents } from './organizations'
import { users } from './users'

// Worship program status
export const programStatusEnum = pgEnum('program_status', [
  'draft',
  'planning', 
  'ready',
  'in_progress',
  'completed',
  'archived'
])

// Worship programs table
export const worshipPrograms = pgTable('worship_programs', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceEventId: uuid('service_event_id').references(() => serviceEvents.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  theme: varchar('theme', { length: 255 }),
  description: text('description'),
  status: programStatusEnum('status').default('draft').notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  lastModifiedBy: uuid('last_modified_by').references(() => users.id, { onDelete: 'set null' }),
  approvedBy: uuid('approved_by').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  isTemplate: boolean('is_template').default(false).notNull(),
  templateName: varchar('template_name', { length: 255 }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Program item types
export const programItemTypeEnum = pgEnum('program_item_type', [
  'welcome',
  'prayer',
  'song',
  'hymn',
  'scripture',
  'sermon',
  'offering',
  'communion',
  'benediction',
  'announcement',
  'special_music',
  'testimony',
  'baptism',
  'dedication',
  'other'
])

// Program items table
export const programItems = pgTable('program_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  programId: uuid('program_id').references(() => worshipPrograms.id, { onDelete: 'cascade' }).notNull(),
  type: programItemTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  content: text('content'), // Lyrics, scripture text, sermon notes, etc.
  duration: integer('duration'), // Estimated duration in minutes
  sortOrder: integer('sort_order').default(0).notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Team assignments for services
export const teamAssignments = pgTable('team_assignments', {
  id: uuid('id').primaryKey().defaultRandom(),
  serviceEventId: uuid('service_event_id').references(() => serviceEvents.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 100 }).notNull(), // worship_leader, pianist, sound_tech, etc.
  notes: text('notes'),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})