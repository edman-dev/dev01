import { pgTable, uuid, varchar, timestamp, boolean, text, integer, pgEnum } from 'drizzle-orm/pg-core'
import { churches, ministries } from './organizations'
import { users } from './users'

// Hymn categories
export const hymnCategoryEnum = pgEnum('hymn_category', [
  'worship',
  'praise',
  'prayer',
  'communion',
  'christmas',
  'easter',
  'gospel',
  'contemporary',
  'traditional',
  'children',
  'special_occasions',
  'other'
])

// Copyright status
export const copyrightStatusEnum = pgEnum('copyright_status', [
  'public_domain',
  'licensed',
  'church_owned',
  'permission_required'
])

// Hymns/Songs library
export const hymns = pgTable('hymns', {
  id: uuid('id').primaryKey().defaultRandom(),
  churchId: uuid('church_id').references(() => churches.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  author: varchar('author', { length: 255 }),
  composer: varchar('composer', { length: 255 }),
  arranger: varchar('arranger', { length: 255 }),
  publisher: varchar('publisher', { length: 255 }),
  copyrightYear: integer('copyright_year'),
  copyrightStatus: copyrightStatusEnum('copyright_status').default('public_domain').notNull(),
  ccliNumber: varchar('ccli_number', { length: 50 }),
  category: hymnCategoryEnum('category').default('worship').notNull(),
  tempo: varchar('tempo', { length: 50 }),
  key: varchar('key', { length: 10 }),
  timeSignature: varchar('time_signature', { length: 10 }),
  lyrics: text('lyrics'),
  chords: text('chords'),
  sheetMusicUrl: text('sheet_music_url'),
  audioUrl: text('audio_url'),
  videoUrl: text('video_url'),
  tags: text('tags'), // JSON array of tags
  notes: text('notes'),
  addedBy: uuid('added_by').references(() => users.id, { onDelete: 'set null' }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Hymn collections/playlists
export const hymnCollections = pgTable('hymn_collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  churchId: uuid('church_id').references(() => churches.id, { onDelete: 'cascade' }).notNull(),
  ministryId: uuid('ministry_id').references(() => ministries.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  isPublic: boolean('is_public').default(false).notNull(),
  isTemplate: boolean('is_template').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Hymns in collections (many-to-many)
export const hymnCollectionItems = pgTable('hymn_collection_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id').references(() => hymnCollections.id, { onDelete: 'cascade' }).notNull(),
  hymnId: uuid('hymn_id').references(() => hymns.id, { onDelete: 'cascade' }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  addedBy: uuid('added_by').references(() => users.id, { onDelete: 'set null' }),
  addedAt: timestamp('added_at', { withTimezone: true }).defaultNow().notNull(),
})

// Hymn usage tracking
export const hymnUsage = pgTable('hymn_usage', {
  id: uuid('id').primaryKey().defaultRandom(),
  hymnId: uuid('hymn_id').references(() => hymns.id, { onDelete: 'cascade' }).notNull(),
  churchId: uuid('church_id').references(() => churches.id, { onDelete: 'cascade' }).notNull(),
  usedDate: timestamp('used_date', { withTimezone: true }).notNull(),
  context: varchar('context', { length: 100 }), // service, practice, etc.
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})