import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Import all schemas
export * from './schemas/users'
export * from './schemas/organizations'
export * from './schemas/programs'
export * from './schemas/hymns'
export * from './schemas/notifications'

// Database connection
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/adoraplan_dev'

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client)

// Connection test function
export async function testConnection() {
  try {
    await client`SELECT 1`
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// Graceful shutdown
export async function closeConnection() {
  await client.end()
}