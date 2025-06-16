## Relevant Files

- `src/features/organizations/components/ChurchForm.tsx` - Form component for creating/editing churches
- `src/features/organizations/components/ChurchForm.test.tsx` - Unit tests for ChurchForm component
- `src/features/organizations/components/ChurchList.tsx` - Grid/list view for displaying churches
- `src/features/organizations/components/ChurchList.test.tsx` - Unit tests for ChurchList component
- `src/features/organizations/components/MinistryForm.tsx` - Form for creating/editing ministries with color/icon selection
- `src/features/organizations/components/MinistryForm.test.tsx` - Unit tests for MinistryForm component
- `src/features/organizations/components/MinistryList.tsx` - List view with drag-and-drop reordering
- `src/features/organizations/components/MinistryList.test.tsx` - Unit tests for MinistryList component
- `src/features/organizations/components/ServiceTypeForm.tsx` - Form for defining service types
- `src/features/organizations/components/ServiceTypeForm.test.tsx` - Unit tests for ServiceTypeForm component
- `src/features/organizations/components/EventForm.tsx` - Form for creating events with recurring patterns
- `src/features/organizations/components/EventForm.test.tsx` - Unit tests for EventForm component
- `src/features/organizations/components/OrgBreadcrumb.tsx` - Breadcrumb navigation component
- `src/features/organizations/components/OrgBreadcrumb.test.tsx` - Unit tests for OrgBreadcrumb component
- `src/models/Schema.ts` - Database schema extensions for organizational hierarchy
- `src/utils/organizationLimits.ts` - Utility functions for enforcing tier-based limits
- `src/utils/organizationLimits.test.ts` - Unit tests for limit enforcement utilities
- `src/app/api/churches/route.ts` - API endpoints for church CRUD operations
- `src/app/api/churches/route.test.ts` - Unit tests for church API
- `src/app/api/ministries/route.ts` - API endpoints for ministry management
- `src/app/api/ministries/route.test.ts` - Unit tests for ministry API
- `src/app/api/services/route.ts` - API endpoints for service type management
- `src/app/api/services/route.test.ts` - Unit tests for service API

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Create Database Schema for Organizational Hierarchy
  - [ ] 1.1 Create churches table with all required fields (name, address, timezone, etc.)
  - [ ] 1.2 Add ministries table with color/icon support and church foreign key
  - [ ] 1.3 Create service_types table linked to ministries
  - [ ] 1.4 Add events table with support for one-time, series, and recurring types
  - [ ] 1.5 Create church_administrators junction table for role assignments
  - [ ] 1.6 Implement soft delete columns for all organizational entities
  - [ ] 1.7 Add indexes for hierarchical queries and permission checks
  - [ ] 1.8 Create migration scripts and seed data for testing

- [ ] 2.0 Build Church Management Features
  - [ ] 2.1 Create ChurchForm component with address and timezone inputs
  - [ ] 2.2 Implement church logo upload functionality
  - [ ] 2.3 Build ChurchList component with grid/list view toggle
  - [ ] 2.4 Add church metrics display (ministry count, user count, etc.)
  - [ ] 2.5 Create church activation/deactivation functionality
  - [ ] 2.6 Implement tier-based church limit enforcement
  - [ ] 2.7 Build church settings page for administrators
  - [ ] 2.8 Add church-level analytics dashboard

- [ ] 3.0 Implement Ministry Management System
  - [ ] 3.1 Create MinistryForm with color picker and icon selector
  - [ ] 3.2 Build icon library component with ministry-appropriate icons
  - [ ] 3.3 Implement accessible color picker with contrast validation
  - [ ] 3.4 Create MinistryList with drag-and-drop reordering
  - [ ] 3.5 Add ministry leader assignment functionality
  - [ ] 3.6 Implement tier-based ministry limit enforcement
  - [ ] 3.7 Build ministry activation/deactivation features
  - [ ] 3.8 Create ministry filtering and search capabilities

- [ ] 4.0 Develop Service Type Management
  - [ ] 4.1 Build ServiceTypeForm with day/time defaults
  - [ ] 4.2 Implement common service type templates
  - [ ] 4.3 Create duration picker component
  - [ ] 4.4 Add default team assignment configuration
  - [ ] 4.5 Build service type list view grouped by ministry
  - [ ] 4.6 Implement service type duplication functionality
  - [ ] 4.7 Create service type usage analytics

- [ ] 5.0 Create Event Management Features
  - [ ] 5.1 Build EventForm with date/time selection
  - [ ] 5.2 Implement recurring event pattern creator
  - [ ] 5.3 Create event series management interface
  - [ ] 5.4 Add bulk event creation for recurring patterns
  - [ ] 5.5 Build event exception handling (skip dates, modifications)
  - [ ] 5.6 Implement event location override functionality
  - [ ] 5.7 Create event team assignment interface
  - [ ] 5.8 Add event duplication and template features

- [ ] 6.0 Build Navigation and Permission System
  - [ ] 6.1 Create OrgBreadcrumb component with clickable levels
  - [ ] 6.2 Implement organization-level search functionality
  - [ ] 6.3 Build quick navigation dropdown for switching contexts
  - [ ] 6.4 Create permission checking utilities for each level
  - [ ] 6.5 Implement last-accessed memory for user convenience
  - [ ] 6.6 Add hierarchical permission inheritance system
  - [ ] 6.7 Build audit trail for organizational changes
  - [ ] 6.8 Create bulk import tools for organizational data