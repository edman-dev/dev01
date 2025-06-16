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
import { v4 as uuidv4 } from 'uuid'

export async function seedDatabase() {
  console.log('🌱 Starting database seed...')

  try {
    // Create sample user (account owner)
    const [user] = await db.insert(users).values({
      id: uuidv4(),
      clerkId: 'user_demo123',
      email: 'demo@adoraplan.com',
      firstName: 'Demo',
      lastName: 'User',
      isActive: true,
    }).returning()

    console.log('✅ Created demo user:', user.email)

    // Create account
    const [account] = await db.insert(accounts).values({
      id: uuidv4(),
      name: 'Demo Church Network',
      ownerId: user.id,
      subscriptionTier: 'tier3',
      subscriptionStatus: 'active',
      isActive: true,
    }).returning()

    console.log('✅ Created account:', account.name)

    // Create sample churches
    const churchData = [
      {
        id: uuidv4(),
        accountId: account.id,
        name: 'Grace Community Church',
        address: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62701',
        contactEmail: 'info@gracecommunitychurch.org',
        contactPhone: '(555) 123-4567',
        timeZone: 'America/Chicago',
        primaryLanguage: 'en',
        isActive: true,
      },
      {
        id: uuidv4(),
        accountId: account.id,
        name: 'Faith Baptist Church',
        address: '456 Oak Avenue',
        city: 'Springfield',
        state: 'IL',
        zipCode: '62702',
        contactEmail: 'contact@faithbaptist.org',
        contactPhone: '(555) 987-6543',
        timeZone: 'America/Chicago',
        primaryLanguage: 'en',
        isActive: true,
      }
    ]

    const createdChurches = await db.insert(churches).values(churchData).returning()
    console.log('✅ Created churches:', createdChurches.map(c => c.name))

    // Create sample ministries for first church
    const ministryData = [
      {
        id: uuidv4(),
        churchId: createdChurches[0].id,
        name: 'Worship Ministry',
        description: 'Leading the congregation in worship through music and song',
        color: '#3B82F6',
        icon: 'music' as const,
        leaderId: user.id,
        displayOrder: 1,
        isActive: true,
      },
      {
        id: uuidv4(),
        churchId: createdChurches[0].id,
        name: 'Youth Ministry',
        description: 'Ministering to teenagers and young adults',
        color: '#EF4444',
        icon: 'users' as const,
        leaderId: user.id,
        displayOrder: 2,
        isActive: true,
      },
      {
        id: uuidv4(),
        churchId: createdChurches[0].id,
        name: "Children's Ministry",
        description: 'Teaching and caring for children in age-appropriate ways',
        color: '#10B981',
        icon: 'baby' as const,
        leaderId: user.id,
        displayOrder: 3,
        isActive: true,
      },
      {
        id: uuidv4(),
        churchId: createdChurches[0].id,
        name: 'Prayer Ministry',
        description: 'Dedicated to prayer and spiritual intercession',
        color: '#8B5CF6',
        icon: 'heart' as const,
        leaderId: user.id,
        displayOrder: 4,
        isActive: true,
      }
    ]

    const createdMinistries = await db.insert(ministries).values(ministryData).returning()
    console.log('✅ Created ministries:', createdMinistries.map(m => m.name))

    // Create sample service types
    const serviceTypeData = [
      {
        id: uuidv4(),
        ministryId: createdMinistries[0].id, // Worship Ministry
        name: 'Sunday Morning Service',
        description: 'Our main weekly worship service',
        defaultDayOfWeek: 0, // Sunday
        defaultTime: '10:00:00',
        typicalDuration: 90,
        location: 'Main Sanctuary',
        isActive: true,
      },
      {
        id: uuidv4(),
        ministryId: createdMinistries[0].id, // Worship Ministry
        name: 'Sunday Evening Service',
        description: 'Evening worship and fellowship',
        defaultDayOfWeek: 0, // Sunday
        defaultTime: '18:00:00',
        typicalDuration: 75,
        location: 'Main Sanctuary',
        isActive: true,
      },
      {
        id: uuidv4(),
        ministryId: createdMinistries[1].id, // Youth Ministry
        name: 'Youth Group',
        description: 'Weekly youth gathering',
        defaultDayOfWeek: 5, // Friday
        defaultTime: '19:00:00',
        typicalDuration: 90,
        location: 'Youth Room',
        isActive: true,
      },
      {
        id: uuidv4(),
        ministryId: createdMinistries[3].id, // Prayer Ministry
        name: 'Wednesday Prayer Meeting',
        description: 'Midweek prayer and Bible study',
        defaultDayOfWeek: 3, // Wednesday
        defaultTime: '19:00:00',
        typicalDuration: 60,
        location: 'Fellowship Hall',
        isActive: true,
      }
    ]

    const createdServiceTypes = await db.insert(serviceTypes).values(serviceTypeData).returning()
    console.log('✅ Created service types:', createdServiceTypes.map(st => st.name))

    // Create sample upcoming service events
    const now = new Date()
    const nextSunday = new Date(now)
    nextSunday.setDate(now.getDate() + (7 - now.getDay()))

    const serviceEventData = [
      {
        id: uuidv4(),
        serviceTypeId: createdServiceTypes[0].id, // Sunday Morning Service
        name: 'Sunday Morning Worship',
        eventType: 'one-time' as const,
        eventDate: nextSunday,
        startTime: '10:00:00',
        duration: 90,
        location: 'Main Sanctuary',
        notes: 'Special guest speaker',
        isActive: true,
      }
    ]

    const createdEvents = await db.insert(serviceEvents).values(serviceEventData).returning()
    console.log('✅ Created service events:', createdEvents.map(e => e.name))

    // Create user permissions
    const permissionData = [
      {
        id: uuidv4(),
        userId: user.id,
        role: 'account_owner' as const,
        grantedBy: user.id,
        isActive: true,
      }
    ]

    await db.insert(userPermissions).values(permissionData)
    console.log('✅ Created user permissions')

    console.log('🎉 Database seed completed successfully!')
    
    return {
      user,
      account,
      churches: createdChurches,
      ministries: createdMinistries,
      serviceTypes: createdServiceTypes,
      events: createdEvents
    }

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seed completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seed failed:', error)
      process.exit(1)
    })
}