## Relevant Files

- `src/middleware.ts` - Main middleware file for route protection and role verification
- `src/features/auth/components/RoleGuard.tsx` - Component for role-based UI access control
- `src/features/auth/components/RoleGuard.test.tsx` - Unit tests for RoleGuard component
- `src/features/users/components/UserProfile.tsx` - User profile management component
- `src/features/users/components/UserProfile.test.tsx` - Unit tests for UserProfile component
- `src/features/users/components/UserInvitation.tsx` - User invitation form component
- `src/features/users/components/UserInvitation.test.tsx` - Unit tests for UserInvitation component
- `src/features/organizations/components/OrganizationSwitcher.tsx` - Organization switching component
- `src/features/organizations/components/OrganizationSwitcher.test.tsx` - Unit tests for OrganizationSwitcher
- `src/models/Schema.ts` - Database schema extensions for user roles and memberships
- `src/utils/permissions.ts` - Permission checking utilities
- `src/utils/permissions.test.ts` - Unit tests for permission utilities
- `src/app/api/users/invite/route.ts` - API endpoint for user invitations
- `src/app/api/users/invite/route.test.ts` - Unit tests for invitation API
- `src/app/api/users/profile/route.ts` - API endpoint for profile updates
- `src/app/api/users/profile/route.test.ts` - Unit tests for profile API

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Extend Database Schema for User Management
  - [ ] 1.1 Add user_roles table to store role assignments per organization
  - [ ] 1.2 Add organization_members table for user-organization relationships
  - [ ] 1.3 Create user_profiles extension table for additional profile fields
  - [ ] 1.4 Add indexes for efficient permission queries
  - [ ] 1.5 Create database migration scripts using Drizzle ORM
  - [ ] 1.6 Add seed data for testing different role scenarios

- [ ] 2.0 Implement Role-Based Access Control System
  - [ ] 2.1 Define permission matrix for Admin, Worship Leader, Pastor, and Collaborator roles
  - [ ] 2.2 Create permission checking utilities with caching mechanism
  - [ ] 2.3 Implement RoleGuard component for UI-level protection
  - [ ] 2.4 Extend Next.js middleware to enforce role-based route protection
  - [ ] 2.5 Add role verification to all API endpoints
  - [ ] 2.6 Create role indicators UI components with visual badges
  - [ ] 2.7 Write comprehensive tests for permission scenarios

- [ ] 3.0 Create User Profile Management Features
  - [ ] 3.1 Build UserProfile component with form validation
  - [ ] 3.2 Implement profile photo upload with size restrictions
  - [ ] 3.3 Add timezone and language preference selectors
  - [ ] 3.4 Create API endpoint for profile updates with data validation
  - [ ] 3.5 Implement notification preference management interface
  - [ ] 3.6 Add profile completion tracking and prompts
  - [ ] 3.7 Create profile preview component for team visibility

- [ ] 4.0 Build Organization Membership and Switching
  - [ ] 4.1 Create OrganizationSwitcher component with dropdown UI
  - [ ] 4.2 Implement session management for current organization context
  - [ ] 4.3 Add organization membership API endpoints
  - [ ] 4.4 Create organization-scoped data filtering utilities
  - [ ] 4.5 Build organization member list view for admins
  - [ ] 4.6 Implement user removal functionality with cascading updates
  - [ ] 4.7 Add organization switching analytics tracking

- [ ] 5.0 Develop User Invitation System
  - [ ] 5.1 Create invitation generation API with secure token creation
  - [ ] 5.2 Build UserInvitation form component with role selection
  - [ ] 5.3 Implement invitation email templates with organization branding
  - [ ] 5.4 Create invitation acceptance flow and auto-join logic
  - [ ] 5.5 Add invitation link expiration handling (7 days)
  - [ ] 5.6 Build invitation management dashboard for tracking status
  - [ ] 5.7 Implement bulk invitation functionality for multiple users
  - [ ] 5.8 Add invitation resend and cancellation features
