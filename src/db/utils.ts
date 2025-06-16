import { eq, and, desc, asc, sql } from 'drizzle-orm'
import { db } from './index'
import { 
  users, 
  accounts, 
  churches, 
  ministries, 
  serviceTypes, 
  serviceEvents,
  userPermissions 
} from './index'
import type { 
  Church, 
  Ministry, 
  ServiceType, 
  ServiceEvent, 
  UserPermission,
  PermissionLevel 
} from '@/lib/types'

// User utilities
export async function findUserByClerkId(clerkId: string) {
  const result = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1)
  return result[0] || null
}

export async function createUser(userData: {
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  profileImageUrl?: string
}) {
  const [user] = await db.insert(users).values(userData).returning()
  return user
}

// Account utilities
export async function findAccountByOwnerId(ownerId: string) {
  const result = await db.select().from(accounts).where(eq(accounts.ownerId, ownerId)).limit(1)
  return result[0] || null
}

export async function getUserPermissions(userId: string) {
  return await db.select().from(userPermissions)
    .where(and(
      eq(userPermissions.userId, userId),
      eq(userPermissions.isActive, true)
    ))
}

export async function hasPermission(
  userId: string, 
  level: PermissionLevel, 
  churchId?: string, 
  ministryId?: string
): Promise<boolean> {
  const permissions = await getUserPermissions(userId)
  
  return permissions.some(permission => {
    // Check role level
    if (permission.role !== level && permission.role !== 'account_owner') {
      return false
    }
    
    // Account owners have access to everything
    if (permission.role === 'account_owner') {
      return true
    }
    
    // Check church-level permissions
    if (churchId && permission.churchId !== churchId) {
      return false
    }
    
    // Check ministry-level permissions
    if (ministryId && permission.ministryId !== ministryId) {
      return false
    }
    
    return true
  })
}

// Church utilities
export async function getChurchesByAccountId(accountId: string) {
  return await db.select().from(churches)
    .where(and(
      eq(churches.accountId, accountId),
      eq(churches.isActive, true)
    ))
    .orderBy(asc(churches.name))
}

export async function getChurchById(churchId: string) {
  const result = await db.select().from(churches).where(eq(churches.id, churchId)).limit(1)
  return result[0] || null
}

export async function getChurchWithStats(churchId: string) {
  const church = await getChurchById(churchId)
  if (!church) return null

  // Get ministry count
  const ministryCount = await db.select({ count: sql`count(*)` })
    .from(ministries)
    .where(and(
      eq(ministries.churchId, churchId),
      eq(ministries.isActive, true)
    ))

  // Get upcoming events count
  const eventsCount = await db.select({ count: sql`count(*)` })
    .from(serviceEvents)
    .innerJoin(serviceTypes, eq(serviceEvents.serviceTypeId, serviceTypes.id))
    .innerJoin(ministries, eq(serviceTypes.ministryId, ministries.id))
    .where(and(
      eq(ministries.churchId, churchId),
      eq(serviceEvents.isActive, true),
      sql`${serviceEvents.eventDate} >= CURRENT_DATE`
    ))

  return {
    ...church,
    ministryCount: Number(ministryCount[0]?.count || 0),
    upcomingEventsCount: Number(eventsCount[0]?.count || 0)
  }
}

// Ministry utilities
export async function getMinistriesByChurchId(churchId: string) {
  return await db.select().from(ministries)
    .where(and(
      eq(ministries.churchId, churchId),
      eq(ministries.isActive, true)
    ))
    .orderBy(asc(ministries.displayOrder), asc(ministries.name))
}

export async function getMinistryById(ministryId: string) {
  const result = await db.select().from(ministries).where(eq(ministries.id, ministryId)).limit(1)
  return result[0] || null
}

export async function getMinistryWithStats(ministryId: string) {
  const ministry = await getMinistryById(ministryId)
  if (!ministry) return null

  // Get service types count
  const serviceTypesCount = await db.select({ count: sql`count(*)` })
    .from(serviceTypes)
    .where(and(
      eq(serviceTypes.ministryId, ministryId),
      eq(serviceTypes.isActive, true)
    ))

  // Get recent events count
  const recentEventsCount = await db.select({ count: sql`count(*)` })
    .from(serviceEvents)
    .innerJoin(serviceTypes, eq(serviceEvents.serviceTypeId, serviceTypes.id))
    .where(and(
      eq(serviceTypes.ministryId, ministryId),
      eq(serviceEvents.isActive, true),
      sql`${serviceEvents.eventDate} >= CURRENT_DATE - INTERVAL '30 days'`
    ))

  return {
    ...ministry,
    serviceTypesCount: Number(serviceTypesCount[0]?.count || 0),
    recentEventsCount: Number(recentEventsCount[0]?.count || 0)
  }
}

// Service utilities
export async function getServiceTypesByMinistryId(ministryId: string) {
  return await db.select().from(serviceTypes)
    .where(and(
      eq(serviceTypes.ministryId, ministryId),
      eq(serviceTypes.isActive, true)
    ))
    .orderBy(asc(serviceTypes.name))
}

export async function getUpcomingEvents(churchId?: string, ministryId?: string, limit = 10) {
  let whereConditions = [
    eq(serviceEvents.isActive, true),
    sql`${serviceEvents.eventDate} >= CURRENT_DATE`
  ]

  if (churchId) {
    whereConditions.push(eq(churches.id, churchId))
  }

  if (ministryId) {
    whereConditions.push(eq(ministries.id, ministryId))
  }

  return await db.select({
    event: serviceEvents,
    serviceType: serviceTypes,
    ministry: ministries,
    church: churches
  })
  .from(serviceEvents)
  .innerJoin(serviceTypes, eq(serviceEvents.serviceTypeId, serviceTypes.id))
  .innerJoin(ministries, eq(serviceTypes.ministryId, ministries.id))
  .innerJoin(churches, eq(ministries.churchId, churches.id))
  .where(and(...whereConditions))
  .orderBy(asc(serviceEvents.eventDate), asc(serviceEvents.startTime))
  .limit(limit)
}

// Organizational hierarchy utilities
export async function getOrganizationalContext(userId: string) {
  const permissions = await getUserPermissions(userId)
  
  const churchIds = permissions.map(p => p.churchId).filter(Boolean)
  const ministryIds = permissions.map(p => p.ministryId).filter(Boolean)
  
  // Get churches user has access to
  const accessibleChurches = churchIds.length > 0 
    ? await db.select()
        .from(churches)
        .where(and(
          eq(churches.isActive, true),
          sql`${churches.id} = ANY(${churchIds})`
        ))
    : []

  // Get ministries user has access to
  const accessibleMinistries = ministryIds.length > 0
    ? await db.select()
        .from(ministries)
        .where(and(
          eq(ministries.isActive, true),
          sql`${ministries.id} = ANY(${ministryIds})`
        ))
    : []

  return {
    permissions,
    churches: accessibleChurches,
    ministries: accessibleMinistries
  }
}

// Subscription tier utilities
export async function checkTierLimits(accountId: string) {
  const account = await db.select().from(accounts).where(eq(accounts.id, accountId)).limit(1)
  if (!account[0]) throw new Error('Account not found')

  const tier = account[0].subscriptionTier
  const churchCount = await db.select({ count: sql`count(*)` })
    .from(churches)
    .where(and(
      eq(churches.accountId, accountId),
      eq(churches.isActive, true)
    ))

  // Get ministry counts per church
  const ministryCounts = await db.select({
    churchId: churches.id,
    count: sql`count(${ministries.id})`
  })
  .from(churches)
  .leftJoin(ministries, and(
    eq(ministries.churchId, churches.id),
    eq(ministries.isActive, true)
  ))
  .where(and(
    eq(churches.accountId, accountId),
    eq(churches.isActive, true)
  ))
  .groupBy(churches.id)

  const limits = {
    tier1: { maxChurches: 1, maxMinistriesPerChurch: 5 },
    tier2: { maxChurches: 1, maxMinistriesPerChurch: 25 },
    tier3: { maxChurches: 100, maxMinistriesPerChurch: -1 } // unlimited
  }

  const currentLimits = limits[tier]
  const currentChurchCount = Number(churchCount[0]?.count || 0)

  return {
    tier,
    currentChurchCount,
    maxChurches: currentLimits.maxChurches,
    canAddChurch: currentChurchCount < currentLimits.maxChurches,
    ministryCounts: ministryCounts.map(mc => ({
      churchId: mc.churchId,
      count: Number(mc.count || 0),
      canAddMinistry: currentLimits.maxMinistriesPerChurch === -1 || 
                     Number(mc.count || 0) < currentLimits.maxMinistriesPerChurch
    }))
  }
}

// Activity logging
export async function logActivity(
  accountId: string,
  userId: string | null,
  action: string,
  entityType: string,
  entityId: string,
  entityName?: string,
  oldValues?: any,
  newValues?: any
) {
  // This would integrate with the activity_log table when we implement it
  console.log('Activity:', {
    accountId,
    userId,
    action,
    entityType,
    entityId,
    entityName,
    oldValues,
    newValues,
    timestamp: new Date()
  })
}