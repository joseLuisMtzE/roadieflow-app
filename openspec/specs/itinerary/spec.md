## Purpose

Read-only chronological itinerary timeline for tour events and logistics (M1).

## Requirements

### Requirement: Itinerary page

The system SHALL provide a route `/itinerary` that displays a chronological timeline of tour events and logistics.

#### Scenario: View timeline with seed data

- GIVEN demo tour data exists in the database
- WHEN the user opens `/itinerary`
- THEN events and logistics are shown grouped by day
- AND cards distinguish logistics types (flight, hotel, transfer)

#### Scenario: Loading state

- GIVEN the itinerary data is being fetched
- WHEN the page renders
- THEN a skeleton loading state is shown via Suspense

#### Scenario: Mobile usability

- GIVEN a viewport of 375px width
- WHEN the user scrolls the itinerary
- THEN all content is readable without horizontal scroll

### Requirement: Data source

The system SHALL load itinerary data from PostgreSQL via Prisma in a Server Component.

#### Scenario: Dynamic rendering

- GIVEN the itinerary page
- WHEN the page is requested
- THEN data is fetched at request time (not statically cached at build)
