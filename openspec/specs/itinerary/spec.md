## Purpose

Read-only chronological itinerary timeline for tour events and logistics (M1).

## Requirements

### Requirement: Itinerary page

The system SHALL provide a route `/itinerary` that displays a chronological timeline of tour events and logistics **only to authenticated users**, reflecting the latest data after admin CRUD operations.

#### Scenario: View timeline with seed data

- **GIVEN** demo tour data exists in the database
- **AND** the user has a valid session
- **WHEN** the user opens `/itinerary`
- **THEN** events and logistics are shown grouped by day
- **AND** cards distinguish logistics types (flight, hotel, transfer)

#### Scenario: Unauthenticated redirect

- **GIVEN** no active session
- **WHEN** the user opens `/itinerary`
- **THEN** the user is redirected to `/login`

#### Scenario: Reflect new logistics after admin create

- **GIVEN** role ADMIN created new logistics for an event
- **WHEN** any authenticated user opens `/itinerary` after revalidation
- **THEN** the new logistics item appears in the timeline

#### Scenario: Loading state

- **GIVEN** the itinerary data is being fetched
- **WHEN** the page renders
- **THEN** a skeleton loading state is shown via Suspense

#### Scenario: Mobile usability

- **GIVEN** a viewport of 375px width
- **WHEN** the user scrolls the itinerary
- **THEN** all content is readable without horizontal scroll

### Requirement: Data source

The system SHALL load itinerary data from PostgreSQL via Prisma in a Server Component.

#### Scenario: Dynamic rendering

- **GIVEN** the itinerary page
- **WHEN** the page is requested
- **THEN** data is fetched at request time (not statically cached at build)
