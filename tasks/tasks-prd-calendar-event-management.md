## Relevant Files

- `src/features/calendar/` - Main directory for calendar components and logic
- `src/models/Schema.ts` - Database schema updates for events and calendar data
- `src/app/[locale]/(auth)/dashboard/calendar/page.tsx` - Main calendar page component
- `src/features/calendar/components/CalendarView.tsx` - Calendar display component with multiple view modes
- `src/features/calendar/components/EventDialog.tsx` - Event creation/editing dialog
- `src/features/calendar/components/EventCard.tsx` - Event display card component
- `src/features/calendar/hooks/useEvents.ts` - Custom hook for event data management
- `src/features/calendar/utils/recurrence.ts` - Recurrence pattern calculation utilities
- `src/features/calendar/utils/recurrence.test.ts` - Unit tests for recurrence logic
- `src/features/calendar/api/events.ts` - API calls for event management
- `src/app/api/events/route.ts` - API route handler for event CRUD operations
- `src/app/api/events/[id]/route.ts` - API route for individual event operations
- `src/features/calendar/types.ts` - TypeScript types for calendar and events

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set up Calendar Infrastructure and Data Models
  - [ ] 1.1 Define database schema for events table with fields for title, ministry_id, service_type_id, date, time, duration, location, description, and recurrence settings
  - [ ] 1.2 Create event_series table for grouping related events with fields for series_title, theme, and common_elements
  - [ ] 1.3 Add event_recurrence table to store recurrence patterns and exceptions
  - [ ] 1.4 Define TypeScript interfaces and types for Event, EventSeries, RecurrencePattern, and CalendarView
  - [ ] 1.5 Create database migration files and run migrations
  - [ ] 1.6 Set up API routes structure for /api/events with CRUD operations

- [ ] 2.0 Implement Calendar Display and Navigation
  - [ ] 2.1 Create CalendarView component with month view as default display
  - [ ] 2.2 Implement calendar grid layout with proper date cells and navigation controls
  - [ ] 2.3 Add view switcher for month, week, day, agenda, and year views
  - [ ] 2.4 Build mini calendar navigator component for quick date jumping
  - [ ] 2.5 Implement previous/next period navigation with keyboard support
  - [ ] 2.6 Add timezone handling based on user preferences
  - [ ] 2.7 Create responsive layouts for mobile and tablet views
  - [ ] 2.8 Implement virtual scrolling for year view performance

- [ ] 3.0 Build Event Creation and Management System
  - [ ] 3.1 Create EventDialog component for event creation and editing
  - [ ] 3.2 Implement click-to-create functionality on calendar cells
  - [ ] 3.3 Add drag-to-set-duration interaction for event creation
  - [ ] 3.4 Build form validation for required fields (title, ministry, service type, date/time)
  - [ ] 3.5 Create EventCard component to display events with ministry colors and icons
  - [ ] 3.6 Implement event status indicators (has program, needs program, cancelled)
  - [ ] 3.7 Add quick actions menu for duplicate, edit, cancel operations
  - [ ] 3.8 Build event detail popover showing full information on hover/click
  - [ ] 3.9 Implement event copy/paste functionality across dates

- [ ] 4.0 Develop Recurring Event Functionality
  - [ ] 4.1 Create recurrence pattern selector UI with standard options (daily, weekly, monthly, yearly)
  - [ ] 4.2 Build custom recurrence pattern builder for complex schedules
  - [ ] 4.3 Implement recurrence calculation engine in recurrence.ts utility
  - [ ] 4.4 Add recurrence end condition options (after N occurrences, until date, no end)
  - [ ] 4.5 Create exception handling for skipping or modifying specific occurrences
  - [ ] 4.6 Build UI for editing single occurrence vs entire series
  - [ ] 4.7 Implement series management interface for bulk operations
  - [ ] 4.8 Add visual indicators for recurring events and series relationships
  - [ ] 4.9 Write comprehensive unit tests for recurrence calculations

- [ ] 5.0 Create Calendar Filtering and Integration Features
  - [ ] 5.1 Build filter sidebar with options for church, ministry, service type, and status
  - [ ] 5.2 Implement filter persistence in user preferences
  - [ ] 5.3 Add filter combination logic with AND/OR operations
  - [ ] 5.4 Create permission-based automatic filtering for user access levels
  - [ ] 5.5 Implement iCal feed generation for calendar subscriptions
  - [ ] 5.6 Build calendar export functionality with privacy settings
  - [ ] 5.7 Add print styles for monthly calendar layouts
  - [ ] 5.8 Create calendar feed URLs with authentication tokens
  - [ ] 5.9 Implement real-time updates when events change