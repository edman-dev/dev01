# Product Requirements Document: Organizational Structure Management

## Introduction/Overview

The Organizational Structure Management module enables churches to model their real-world organizational hierarchy within the platform. This system supports complex multi-campus churches, diverse ministries, and various service types while maintaining clear boundaries and permissions. The hierarchical structure (Account Owner → Churches → Ministries → Services → Events) provides flexibility for both single-location churches and large church networks.

## Goals

1. **Model Real-World Structure:** Accurately represent how churches organize their ministries and services in a digital format.

2. **Support Scalability:** Enable growth from single churches to multi-campus networks with up to 100 churches per account.

3. **Visual Organization:** Provide clear visual hierarchy with custom colors and icons for easy navigation.

4. **Maintain Data Boundaries:** Ensure proper data isolation between churches while allowing cross-church visibility for account owners.

5. **Flexible Service Planning:** Support various worship service patterns from weekly services to special events.

## User Stories

**As an Account Owner:**
- I want to add multiple churches to my account so that I can manage our entire church network.
- I want to view all churches in my network at a glance so that I can monitor activities across campuses.
- I want to assign church-level administrators so that each campus can manage their own operations.

**As a Church Administrator:**
- I want to create ministries within my church so that different departments can organize their worship services.
- I want to assign custom colors and icons to ministries so that they're easily identifiable.
- I want to set up recurring service patterns so that we don't have to manually create weekly events.

**As a Ministry Leader:**
- I want to define different service types for my ministry so that we can organize various worship gatherings.
- I want to see all services under my ministry so that I can plan resources effectively.
- I want to customize service details so that each gathering reflects its unique purpose.

**As a Worship Leader:**
- I want to create events for specific service dates so that I can plan worship programs.
- I want to see the organizational hierarchy so that I understand where my programs belong.
- I want to filter views by my assigned ministries so that I focus on relevant services.

## Functional Requirements

### 1. Account Owner Level

1.1. The system must allow account owners to create and manage multiple churches (up to tier limits).

1.2. The system must display all churches in a grid or list view with key metrics.

1.3. The system must track the following for each church:
   - Church name
   - Physical address
   - Contact information
   - Time zone
   - Primary language
   - Church logo/image
   - Active status

1.4. The system must allow account owners to deactivate churches without deleting historical data.

1.5. The system must provide church-level analytics and reporting.

### 2. Church Management

2.1. The system must enforce church limits based on subscription tier:
   - Tier 1: 1 church maximum
   - Tier 2: 1 church maximum
   - Tier 3: 100 churches maximum

2.2. The system must allow church administrators to manage church-level settings:
   - Church profile information
   - Default worship program templates
   - Church-wide announcements
   - Integration settings

2.3. The system must support church-specific branding elements.

2.4. The system must maintain church-level user directories.

### 3. Ministry Management

3.1. The system must allow creation of unlimited ministries within each church.

3.2. The system must track the following for each ministry:
   - Ministry name
   - Description/purpose
   - Custom color (hex code)
   - Custom icon (from predefined set)
   - Ministry leader assignment
   - Active status

3.3. The system must enforce ministry limits based on subscription tier:
   - Tier 1: 5 ministries maximum per church
   - Tier 2: 25 ministries maximum per church
   - Tier 3: Unlimited ministries

3.4. The system must display ministries with their custom colors and icons throughout the platform.

3.5. The system must allow ministry reordering for custom display preferences.

### 4. Service Type Management

4.1. The system must allow each ministry to define multiple service types.

4.2. The system must support common service types:
   - Sunday Morning Service
   - Sunday Evening Service
   - Wednesday Prayer Meeting
   - Youth Service
   - Special Events
   - Custom service types

4.3. The system must track service type properties:
   - Service name
   - Default day of week
   - Default time
   - Typical duration
   - Service description
   - Default team assignments

4.4. The system must allow service types to be templates for creating events.

### 5. Event Creation and Management

5.1. The system must allow creation of individual events linked to service types.

5.2. The system must support three event categories:
   - **One-time events**: Single occurrence with specific date/time
   - **Series events**: Related events with common theme but irregular schedule
   - **Recurring events**: Regular pattern-based occurrences

5.3. The system must track event properties:
   - Event date and time
   - Duration
   - Location (if different from church default)
   - Special notes
   - Team assignments
   - Associated worship program

5.4. The system must support bulk event creation for recurring patterns.

### 6. Organizational Navigation

6.1. The system must provide breadcrumb navigation showing current position in hierarchy.

6.2. The system must offer quick navigation between organizational levels.

6.3. The system must remember user's last accessed church/ministry for convenience.

6.4. The system must provide search functionality across all organizational levels.

### 7. Permissions and Access

7.1. The system must enforce hierarchical permissions:
   - Account owners see all churches
   - Church admins see only their church
   - Ministry leaders see only their ministries
   - Service coordinators see only their assigned services

7.2. The system must allow permission delegation down the hierarchy.

7.3. The system must track who created and last modified each organizational element.

## Non-Goals (Out of Scope)

1. **Financial Budgeting:** Ministry or church-level budget management is not included.

2. **Facility Management:** Room booking or facility scheduling is not part of this module.

3. **Member Management:** Congregation member directories are not included.

4. **Ministry-Specific Features:** Specialized features for specific ministry types (e.g., children's check-in).

5. **Organizational Charts:** Visual org charts or reporting structures are not included.

## Design Considerations

1. **Visual Hierarchy:** Use indentation, colors, and icons to clearly show organizational relationships.

2. **Drag-and-Drop:** Enable reordering of ministries and services through drag-and-drop interface.

3. **Color Picker:** Provide accessible color picker for ministry customization with contrast checking.

4. **Icon Library:** Curate appropriate icons for various ministry types (music, youth, prayer, etc.).

5. **Mobile Responsiveness:** Ensure organizational navigation works well on mobile devices.

## Technical Considerations

1. **Database Design:** Implement efficient hierarchical data structure with proper indexing.

2. **Cascading Operations:** Handle deletion/deactivation cascading appropriately through hierarchy.

3. **Permission Caching:** Cache organizational permissions to reduce query overhead.

4. **Soft Deletes:** Implement soft delete pattern to preserve historical data.

5. **Data Migration:** Provide tools for bulk import of organizational structure.

6. **API Design:** RESTful endpoints for each hierarchical level with proper nesting.

## Success Metrics

1. **Setup Completion:** 90% of new accounts complete basic organizational setup within first session.

2. **Ministry Utilization:** Average of 3+ active ministries per church.

3. **Service Regularity:** 80% of churches use recurring event patterns.

4. **Navigation Efficiency:** Users can navigate to any service within 3 clicks.

5. **Data Accuracy:** Less than 5% of support tickets related to organizational structure issues.

## Open Questions

1. **Church Mergers:** How do we handle merging two churches within the same account?

2. **Ministry Templates:** Should we provide pre-built ministry templates for common types?

3. **Cross-Church Ministries:** Should we support ministries that span multiple churches?

4. **Seasonal Services:** How do we handle services that only run during specific seasons?

5. **Time Zone Handling:** How do we manage events for churches with campuses in different time zones?

6. **Archive vs Delete:** What's the retention policy for deactivated organizational elements?
