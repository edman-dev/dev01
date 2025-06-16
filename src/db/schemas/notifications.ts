import { pgTable, uuid, varchar, timestamp, boolean, text, pgEnum } from 'drizzle-orm/pg-core'
import { users } from './users'
import { accounts } from './organizations'

// Notification types
export const notificationTypeEnum = pgEnum('notification_type', [
  'service_reminder',
  'program_update',
  'team_assignment',
  'approval_request',
  'system_announcement',
  'ministry_update',
  'event_change',
  'feedback_request',
  'subscription_update'
])

// Notification priorities
export const notificationPriorityEnum = pgEnum('notification_priority', [
  'low',
  'normal', 
  'high',
  'urgent'
])

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => accounts.id, { onDelete: 'cascade' }).notNull(),
  recipientId: uuid('recipient_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'set null' }),
  type: notificationTypeEnum('type').notNull(),
  priority: notificationPriorityEnum('priority').default('normal').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  actionUrl: text('action_url'),
  actionText: varchar('action_text', { length: 100 }),
  metadata: text('metadata'), // JSON data for context
  isRead: boolean('is_read').default(false).notNull(),
  readAt: timestamp('read_at', { withTimezone: true }),
  emailSent: boolean('email_sent').default(false).notNull(),
  emailSentAt: timestamp('email_sent_at', { withTimezone: true }),
  scheduledFor: timestamp('scheduled_for', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// User notification preferences
export const notificationPreferences = pgTable('notification_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  notificationType: notificationTypeEnum('notification_type').notNull(),
  emailEnabled: boolean('email_enabled').default(true).notNull(),
  inAppEnabled: boolean('in_app_enabled').default(true).notNull(),
  smsEnabled: boolean('sms_enabled').default(false).notNull(),
  frequency: varchar('frequency', { length: 20 }).default('immediate').notNull(), // immediate, daily, weekly
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Collaboration/Comments  
export const comments: any = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  entityType: varchar('entity_type', { length: 50 }).notNull(), // program, event, hymn, etc.
  entityId: uuid('entity_id').notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  parentId: uuid('parent_id'), // Self-reference will be added after table creation
  content: text('content').notNull(),
  isResolved: boolean('is_resolved').default(false).notNull(),
  resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Activity/Audit log
export const activityLog = pgTable('activity_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id').references(() => accounts.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 100 }).notNull(), // created, updated, deleted, etc.
  entityType: varchar('entity_type', { length: 50 }).notNull(),
  entityId: uuid('entity_id').notNull(),
  entityName: varchar('entity_name', { length: 255 }),
  oldValues: text('old_values'), // JSON of previous values
  newValues: text('new_values'), // JSON of new values
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})