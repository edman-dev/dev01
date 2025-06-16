# Product Requirements Document: Worship Program Management

## Introduction/Overview

The Worship Program Management module is the core feature that brings together all elements of worship service planning. It enables worship leaders to create structured worship programs by selecting hymns, assigning team roles, setting timing, and generating shareable documents. The system supports collaborative workflows with draft and published states, version control for program documents, and flexible editing capabilities to accommodate last-minute changes.

## Goals

1. **Streamline Program Creation:** Provide an intuitive interface for building worship programs with all necessary elements in one place.

2. **Enable Collaborative Planning:** Support multiple team members working together on program development with clear workflows.

3. **Generate Professional Documents:** Automatically create well-formatted worship programs for distribution to all stakeholders.

4. **Maintain Flexibility:** Allow controlled manual editing of generated programs while tracking all changes.

5. **Ensure Accountability:** Provide complete audit trails and version history for all program modifications.

## User Stories

**As a Worship Leader:**
- I want to create worship programs by selecting hymns and arranging them in order so that I can plan cohesive services.
- I want to assign team members to specific roles so that everyone knows their responsibilities.
- I want to set timing for each program element so that services run smoothly.
- I want to save draft programs so that I can work on them over multiple sessions.
- I want to generate formatted programs so that I can share them with the team and congregation.

**As a Pastor:**
- I want to review worship programs before they're finalized so that I can provide input.
- I want to see version history so that I can understand what changes were made.
- I want to add sermon information to programs so that everything is documented in one place.

**As a Team Member:**
- I want to see programs I'm assigned to so that I can prepare for my roles.
- I want to view hymn details within programs so that I can practice effectively.
- I want to access programs on my mobile device so that I can review them anywhere.

**As an AV Technician:**
- I want to see technical requirements in programs so that I can prepare equipment.
- I want to view timing information so that I can coordinate transitions.
- I want to access media files referenced in programs so that I have everything needed.

## Functional Requirements

### 1. Program Data Model

1.1. The system must store comprehensive program information:
   - Program title
   - Church/Ministry/Service association
   - Event date and time
   - Program theme or series
   - Sermon title and speaker
   - Special notes or announcements
   - Technical requirements

1.2. The system must maintain program metadata:
   - Created by/date
   - Last modified by/date
   - Current status (draft/published/archived)
   - Version number
   - Approval status

1.3. The system must support program templates for recurring service types.

### 2. Hymn Selection and Ordering

2.1. The system must allow selection of up to 25 hymns per program.

2.2. The system must provide hymn search/browse functionality within program editor.

2.3. The system must support drag-and-drop reordering of hymns.

2.4. The system must display key hymn information in the program:
   - Title
   - Duration
   - Key signature
   - Selected audio version
   - Language version

2.5. The system must calculate total music duration automatically.

2.6. The system must allow custom labels for hymn sections (e.g., "Opening," "Offering," "Closing").

### 3. Role Assignment

3.1. The system must support predefined roles:
   - Worship Leader
   - Pianist/Keyboardist
   - Guitarist
   - Bassist
   - Drummer
   - Vocalists (Soprano, Alto, Tenor, Bass)
   - Sound Engineer
   - Media/Projection Operator
   - Custom roles as needed

3.2. The system must allow multiple people per role.

3.3. The system must validate that assigned users have appropriate permissions.

3.4. The system must notify users when they're assigned to roles.

3.5. The system must track role confirmation/acknowledgment.

### 4. Program Workflow

4.1. The system must support the following workflow states:
   - **Draft**: In progress, editable by creators
   - **Review**: Submitted for pastoral review
   - **Approved**: Approved by authorized reviewers
   - **Published**: Finalized and distributed
   - **Archived**: Past programs for reference

4.2. The system must enforce state transition rules:
   - Only worship leaders can submit for review
   - Only pastors/admins can approve programs
   - Published programs require special permission to edit

4.3. The system must track all state transitions with timestamp and user.

4.4. The system must support program duplication for similar services.

### 5. Document Generation

5.1. The system must generate markdown documents from program data.

5.2. The system must include the following in generated documents:
   - Header with church/ministry/service info
   - Date, time, and location
   - Program theme and sermon info
   - Ordered list of hymns with details
   - Team assignments organized by role
   - Special notes and announcements
   - Technical requirements section

5.3. The system must apply consistent formatting and styling.

5.4. The system must support custom document templates per ministry.

5.5. The system must generate printer-friendly versions.

### 6. Manual Editing Capability

6.1. The system must allow authorized users to manually edit generated markdown.

6.2. The system must use TipTap editor for rich text editing capabilities.

6.3. The system must track all manual edits with:
   - User who made the edit
   - Timestamp of edit
   - Before/after comparison
   - Edit reason/notes (optional)

6.4. The system must require elevated permissions for manual editing.

6.5. The system must maintain both original and edited versions.

### 7. Version Control

7.1. The system must maintain complete version history for all programs.

7.2. The system must support viewing any previous version.

7.3. The system must show differences between versions (diff view).

7.4. The system must allow reverting to previous versions with authorization.

7.5. The system must track why versions were created (auto-save, manual save, state change).

### 8. Program Distribution

8.1. The system must provide shareable links for programs.

8.2. The system must support access control for shared links:
   - Public (anyone with link)
   - Team members only
   - Specific user list

8.3. The system must track view statistics for programs.

8.4. The system must support PDF export for offline distribution.

8.5. The system must integrate with notification system for distribution.

## Non-Goals (Out of Scope)

1. **Presentation Software Integration:** Direct integration with ProPresenter, EasyWorship, etc.

2. **Service Recording:** Audio/video recording of actual services.

3. **Attendance Tracking:** Recording who attended services.

4. **Offering Management:** Financial tracking related to services.

5. **Sermon Management:** Full sermon preparation and storage system.

6. **Real-time Collaboration:** Simultaneous multi-user editing like Google Docs.

## Design Considerations

1. **Program Builder Interface:** Side-by-side view with hymn library and program structure.

2. **Timeline View:** Visual representation of service flow with timing.

3. **Role Assignment UI:** Searchable user picker with role badges.

4. **Mobile Optimization:** Responsive design for viewing programs on phones/tablets.

5. **Print Layouts:** Optimized CSS for clean printed programs.

6. **Quick Actions:** Shortcuts for common tasks like duplicating last week's program.

## Technical Considerations

1. **Data Relationships:** Efficient queries for programs with many related entities.

2. **Document Storage:** Store both structured data and generated markdown efficiently.

3. **Diff Algorithm:** Implement efficient text diffing for version comparisons.

4. **Export Performance:** Optimize PDF generation for quick exports.

5. **Access Control:** Implement granular permissions for different program operations.

6. **Audit Logging:** Comprehensive logging of all program modifications.

## Success Metrics

1. **Program Creation Time:** Average program created in under 15 minutes.

2. **Collaboration Rate:** 75% of programs involve multiple contributors.

3. **Edit Frequency:** Less than 10% of programs require manual markdown editing.

4. **Distribution Reach:** Programs viewed by 5x more people than editors.

5. **Template Usage:** 60% of programs created from templates.

6. **Mobile Access:** 50% of program views from mobile devices.

## Open Questions

1. **Change Notifications:** Should all team members be notified of program changes?

2. **Approval Workflow:** Should we support multi-level approval chains?

3. **External Access:** Should non-registered users be able to view public programs?

4. **Program Analytics:** What metrics should we track for program effectiveness?

5. **Integration Points:** Which third-party tools should we prioritize for integration?

6. **Offline Editing:** Should we support offline program creation with sync?

7. **AI Assistance:** Should we add AI suggestions for hymn selection based on themes?
