import { pgTable, uuid, varchar, timestamp, boolean, text, pgEnum } from 'drizzle-orm/pg-core'

// Enum for user roles
export const userRoleEnum = pgEnum('user_role', [
  'account_owner',
  'church_admin', 
  'ministry_leader',
  'service_coordinator',
  'member'
])

// Users table - integrates with Clerk auth
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: varchar('clerk_id', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  profileImageUrl: text('profile_image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// User permissions for organizational access
export const userPermissions = pgTable('user_permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: userRoleEnum('role').notNull(),
  churchId: uuid('church_id'), // Will reference churches.id
  ministryId: uuid('ministry_id'), // Will reference ministries.id  
  serviceTypeId: uuid('service_type_id'), // Will reference service_types.id
  grantedBy: uuid('granted_by').references(() => users.id),
  grantedAt: timestamp('granted_at', { withTimezone: true }).defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})