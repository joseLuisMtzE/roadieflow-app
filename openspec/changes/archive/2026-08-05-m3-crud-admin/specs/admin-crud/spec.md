## Purpose

Admin-only create and update flows for tour entities (Artist, Event, Logistics) via Server Actions and mobile UI (M3).

## ADDED Requirements

### Requirement: Admin-only mutations

The system SHALL allow create and update of Artist, Event, and Logistics records only for users with role ADMIN.

#### Scenario: Admin creates event

- **GIVEN** a session with role ADMIN
- **WHEN** the admin submits a valid event form
- **THEN** the event is persisted in PostgreSQL
- **AND** the itinerary timeline can show the new event on next load

#### Scenario: Non-admin mutation rejected

- **GIVEN** a session with role ROAD_STAFF, TOUR_MANAGER, or ARTIST
- **WHEN** the user invokes a create or update Server Action
- **THEN** the action fails with an authorization error
- **AND** no database change occurs

### Requirement: Artist CRUD (admin)

The system SHALL provide Server Actions and mobile UI to create and update artists (name, optional genre).

#### Scenario: Create artist

- **GIVEN** role ADMIN
- **WHEN** valid artist data is submitted
- **THEN** a new Artist record is created

#### Scenario: Update artist

- **GIVEN** role ADMIN and an existing artist
- **WHEN** valid updated data is submitted
- **THEN** the artist record is updated

### Requirement: Event CRUD (admin)

The system SHALL provide Server Actions and mobile UI to create and update events linked to an artist.

#### Scenario: Create event

- **GIVEN** role ADMIN and an existing artist
- **WHEN** valid event data (title, date, location, city) is submitted
- **THEN** a new Event linked to the artist is created

### Requirement: Logistics CRUD (admin)

The system SHALL provide Server Actions and mobile UI to create and update logistics items for an event.

#### Scenario: Create flight logistics

- **GIVEN** role ADMIN and an existing event
- **WHEN** valid FLIGHT logistics data is submitted
- **THEN** a Logistics record with type FLIGHT and validated details JSON is created

#### Scenario: Logistics list on event detail

- **GIVEN** role ADMIN viewing an event with logistics
- **WHEN** the event detail page renders
- **THEN** logistics items for that event are listed with type and status

### Requirement: Mobile admin forms

The system SHALL render admin forms with touch targets ≥44px and Tactical Elegance styling.

#### Scenario: Form usability

- **GIVEN** a viewport of 375px width
- **WHEN** the admin fills a create form
- **THEN** inputs and submit controls are usable without horizontal scroll
- **AND** validation errors are visible in Spanish
