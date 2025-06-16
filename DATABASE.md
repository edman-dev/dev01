# Adoraplan Database Schema Documentation

## Overview

This document describes the database schema for Adoraplan, a church management application. The schema is designed to support organizational hierarchy, worship program management, hymn libraries, and collaboration features.

## Database Technology

- **Database**: PostgreSQL 13+
- **ORM**: Drizzle ORM
- **Migration Tool**: Drizzle Kit
- **Connection Pool**: postgres.js

## Schema Organization

The database schema is organized into logical modules:

1. **Users & Authentication** - User accounts and permissions
2. **Organizations** - Churches, ministries, and services
3. **Programs** - Worship programs and team assignments
4. **Hymns** - Hymn library and collections
5. **Notifications** - Messaging and collaboration

## Organizational Hierarchy

```
Account (Organization)
├── Churches (1-100 based on tier)
    ├── Ministries (5-unlimited based on tier)
        ├── Service Types
            └── Service Events
                └── Worship Programs
```

## Core Tables

### Users & Authentication

#### `users`
Primary user account table integrated with Clerk authentication.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| clerk_id | VARCHAR(255) | Clerk authentication ID |
| email | VARCHAR(255) | User email address |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| profile_image_url | TEXT | Profile image URL |
| is_active | BOOLEAN | Account status |
| last_login_at | TIMESTAMP | Last login timestamp |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

**Indexes**: clerk_id (unique), email (unique)

#### `user_permissions`
Role-based access control for organizational entities.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Reference to users table |
| role | user_role | Permission level enum |
| church_id | UUID | Church scope (optional) |
| ministry_id | UUID | Ministry scope (optional) |
| service_type_id | UUID | Service type scope (optional) |
| granted_by | UUID | User who granted permission |
| granted_at | TIMESTAMP | When permission was granted |
| is_active | BOOLEAN | Permission status |

**Permission Levels**:
- `account_owner` - Full access to all churches
- `church_admin` - Admin access to specific church
- `ministry_leader` - Leader access to specific ministry
- `service_coordinator` - Coordinator access to specific services
- `member` - Basic member access

### Organizations

#### `accounts`
Top-level organization/account entity.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | VARCHAR(255) | Organization name |
| owner_id | UUID | Account owner user ID |
| subscription_tier | subscription_tier | Subscription level |
| stripe_customer_id | VARCHAR(255) | Stripe customer ID |
| stripe_subscription_id | VARCHAR(255) | Stripe subscription ID |
| subscription_status | VARCHAR(50) | Subscription status |
| subscription_ends_at | TIMESTAMP | Subscription end date |
| is_active | BOOLEAN | Account status |

**Subscription Tiers**:
- `tier1` - 1 church, 5 ministries per church
- `tier2` - 1 church, 25 ministries per church  
- `tier3` - 100 churches, unlimited ministries

#### `churches`
Individual church entities within an account.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| account_id | UUID | Parent account ID |
| name | VARCHAR(255) | Church name |
| address | TEXT | Physical address |
| city | VARCHAR(100) | City |
| state | VARCHAR(50) | State/Province |
| zip_code | VARCHAR(20) | Postal code |
| country | VARCHAR(100) | Country |
| contact_email | VARCHAR(255) | Contact email |
| contact_phone | VARCHAR(50) | Contact phone |
| website | VARCHAR(255) | Church website |
| time_zone | VARCHAR(100) | Time zone |
| primary_language | VARCHAR(10) | Primary language code |
| logo_url | TEXT | Church logo URL |
| description | TEXT | Church description |
| is_active | BOOLEAN | Church status |

#### `ministries`
Ministry departments within churches.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| church_id | UUID | Parent church ID |
| name | VARCHAR(255) | Ministry name |
| description | TEXT | Ministry description |
| color | VARCHAR(7) | Hex color code for UI |
| icon | ministry_icon | Icon identifier |
| leader_id | UUID | Ministry leader user ID |
| display_order | INTEGER | Sort order |
| is_active | BOOLEAN | Ministry status |

**Ministry Icons**: music, users, heart, baby, graduation-cap, mic, cross, book-open, helping-hand, globe, coffee, calendar, star, home, church

#### `service_types`
Template definitions for recurring services.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| ministry_id | UUID | Parent ministry ID |
| name | VARCHAR(255) | Service type name |
| description | TEXT | Service description |
| default_day_of_week | INTEGER | Default day (0-6, Sun-Sat) |
| default_time | VARCHAR(8) | Default start time |
| typical_duration | INTEGER | Duration in minutes |
| location | VARCHAR(255) | Default location |
| is_active | BOOLEAN | Service type status |

#### `service_events`
Individual service event instances.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| service_type_id | UUID | Parent service type |
| series_id | UUID | Event series (optional) |
| name | VARCHAR(255) | Event name |
| event_type | VARCHAR(20) | one-time, series, recurring |
| event_date | TIMESTAMP | Event date/time |
| start_time | VARCHAR(8) | Start time |
| duration | INTEGER | Duration in minutes |
| location | VARCHAR(255) | Event location |
| notes | TEXT | Event notes |
| special_instructions | TEXT | Special instructions |
| is_active | BOOLEAN | Event status |

## Performance Considerations

### Indexes

Primary indexes for optimal query performance:

```sql
-- User lookups
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);

-- Organizational hierarchy
CREATE INDEX idx_churches_account_id ON churches(account_id);
CREATE INDEX idx_ministries_church_id ON ministries(church_id);
CREATE INDEX idx_service_types_ministry_id ON service_types(ministry_id);
CREATE INDEX idx_service_events_service_type_id ON service_events(service_type_id);

-- Date-based queries
CREATE INDEX idx_service_events_event_date ON service_events(event_date);

-- Permission queries
CREATE INDEX idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX idx_user_permissions_church_id ON user_permissions(church_id);
```

### Triggers

Automatic `updated_at` timestamp updates on all tables:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## Migration Strategy

### Development to Production

1. **Schema Export**: Use Drizzle Kit to generate production-ready SQL
2. **Data Migration**: Use seed scripts for initial data
3. **Backup Strategy**: Regular PostgreSQL dumps
4. **Rollback Plan**: Transaction-based migrations with rollback scripts

### Migration Commands

```bash
# Generate migrations
npm run db:generate

# Apply migrations
npm run db:migrate

# Seed database
npm run db:seed

# Database studio
npm run db:studio
```

## Environment Configuration

### Development
```env
DATABASE_URL=postgresql://localhost:5432/adoraplan_dev
```

### Production
```env
DATABASE_URL=postgresql://user:password@host:port/adoraplan_prod
```

## Security Considerations

1. **Connection Security**: Use SSL in production
2. **Access Control**: Role-based permissions at application level
3. **Data Encryption**: Sensitive data encrypted at rest
4. **Audit Trail**: Activity logging for all modifications
5. **Backup Encryption**: Encrypted database backups

## Monitoring & Maintenance

### Performance Monitoring
- Query performance analysis
- Index usage statistics
- Connection pool monitoring
- Slow query logging

### Maintenance Tasks
- Regular VACUUM and ANALYZE
- Index maintenance
- Statistics updates
- Backup verification

## Future Considerations

### Scalability
- Read replicas for reporting
- Connection pooling optimization
- Table partitioning for large datasets
- Caching layer implementation

### Additional Features
- Full-text search capabilities
- Geographic data for multi-location churches
- Advanced reporting and analytics
- Integration webhooks and APIs

## Support and Troubleshooting

### Common Issues
1. **Connection timeouts**: Increase pool size
2. **Slow queries**: Check index usage
3. **Migration failures**: Check constraint violations
4. **Permission errors**: Verify role assignments

### Useful Queries

```sql
-- Check table sizes
SELECT schemaname, tablename, 
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check active connections
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes 
ORDER BY idx_scan DESC;
```