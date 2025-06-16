## Relevant Files

- `src/features/programs/components/ProgramBuilder.tsx` - Main interface for creating and editing worship programs
- `src/features/programs/components/ProgramBuilder.test.tsx` - Unit tests for ProgramBuilder component
- `src/features/programs/components/HymnSelector.tsx` - Component for searching and selecting hymns
- `src/features/programs/components/HymnSelector.test.tsx` - Unit tests for HymnSelector component
- `src/features/programs/components/RoleAssignment.tsx` - Component for assigning team members to roles
- `src/features/programs/components/RoleAssignment.test.tsx` - Unit tests for RoleAssignment component
- `src/features/programs/components/ProgramTimeline.tsx` - Visual timeline view of service flow
- `src/features/programs/components/ProgramTimeline.test.tsx` - Unit tests for ProgramTimeline component
- `src/features/programs/components/ProgramPreview.tsx` - Preview component for generated programs
- `src/features/programs/components/ProgramPreview.test.tsx` - Unit tests for ProgramPreview component
- `src/features/programs/components/MarkdownEditor.tsx` - TipTap-based editor for manual edits
- `src/features/programs/components/MarkdownEditor.test.tsx` - Unit tests for MarkdownEditor component
- `src/features/programs/components/VersionHistory.tsx` - Component for viewing program versions
- `src/features/programs/components/VersionHistory.test.tsx` - Unit tests for VersionHistory component
- `src/models/Schema.ts` - Database schema extensions for programs and related tables
- `src/utils/programGenerator.ts` - Utility functions for generating markdown from program data
- `src/utils/programGenerator.test.ts` - Unit tests for program generation utilities
- `src/utils/diffViewer.ts` - Utilities for comparing program versions
- `src/utils/diffViewer.test.ts` - Unit tests for diff utilities
- `src/app/api/programs/route.ts` - API endpoints for program CRUD operations
- `src/app/api/programs/route.test.ts` - Unit tests for program API
- `src/app/api/programs/export/route.ts` - API endpoint for PDF export
- `src/app/api/programs/export/route.test.ts` - Unit tests for export API

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set Up Database Schema and Core Models
  - [ ] 1.1 Create programs table with all metadata fields
  - [ ] 1.2 Add program_hymns junction table with ordering support
  - [ ] 1.3 Create program_roles table for team assignments
  - [ ] 1.4 Add program_versions table for version history
  - [ ] 1.5 Create program_templates table for recurring services
  - [ ] 1.6 Add program_edits table to track manual changes
  - [ ] 1.7 Create indexes for efficient program queries
  - [ ] 1.8 Add migration scripts and seed data

- [ ] 2.0 Build Program Creation and Editing Interface
  - [ ] 2.1 Create ProgramBuilder component with split-view layout
  - [ ] 2.2 Build HymnSelector with search and filter capabilities
  - [ ] 2.3 Implement drag-and-drop hymn reordering
  - [ ] 2.4 Add hymn section labels (Opening, Offering, etc.)
  - [ ] 2.5 Create duration calculator for total service time
  - [ ] 2.6 Build program metadata form (title, theme, sermon info)
  - [ ] 2.7 Implement auto-save functionality for drafts
  - [ ] 2.8 Add program template selection and creation

- [ ] 3.0 Implement Team Role Assignment System
  - [ ] 3.1 Create RoleAssignment component with role categories
  - [ ] 3.2 Build searchable user picker with permission validation
  - [ ] 3.3 Implement multiple assignments per role
  - [ ] 3.4 Add role confirmation tracking system
  - [ ] 3.5 Create notification triggers for new assignments
  - [ ] 3.6 Build custom role creation interface
  - [ ] 3.7 Implement role assignment templates
  - [ ] 3.8 Add role availability checking

- [ ] 4.0 Create Program Workflow and State Management
  - [ ] 4.1 Implement state machine for program workflow
  - [ ] 4.2 Build state transition UI with permission checks
  - [ ] 4.3 Create review submission interface
  - [ ] 4.4 Add approval/rejection functionality
  - [ ] 4.5 Implement program publishing mechanism
  - [ ] 4.6 Build program archival system
  - [ ] 4.7 Create workflow notification system
  - [ ] 4.8 Add program duplication with state reset

- [ ] 5.0 Develop Document Generation and Export Features
  - [ ] 5.1 Create markdown generation engine from program data
  - [ ] 5.2 Build customizable document templates
  - [ ] 5.3 Implement ministry-specific formatting rules
  - [ ] 5.4 Add PDF export functionality with print styles
  - [ ] 5.5 Create shareable link generation system
  - [ ] 5.6 Implement access control for shared links
  - [ ] 5.7 Build view tracking and analytics
  - [ ] 5.8 Add batch export for multiple programs

- [ ] 6.0 Build Version Control and Manual Editing System
  - [ ] 6.1 Integrate TipTap editor for markdown editing
  - [ ] 6.2 Implement version creation on saves and state changes
  - [ ] 6.3 Build diff viewer for version comparisons
  - [ ] 6.4 Create version history browser interface
  - [ ] 6.5 Add version revert functionality with permissions
  - [ ] 6.6 Implement edit tracking with user attribution
  - [ ] 6.7 Build edit reason/notes capture system
  - [ ] 6.8 Create original vs edited version toggle