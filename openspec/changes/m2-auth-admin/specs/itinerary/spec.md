# Delta for Itinerary

## MODIFIED Requirements

### Requirement: Itinerary page

The system SHALL provide a route `/itinerary` that displays a chronological timeline of tour events and logistics **only to authenticated users**.

#### Scenario: View timeline with seed data

- GIVEN demo tour data exists in the database
- AND the user has a valid session
- WHEN the user opens `/itinerary`
- THEN events and logistics are shown grouped by day
- AND cards distinguish logistics types (flight, hotel, transfer)

#### Scenario: Unauthenticated redirect

- GIVEN no active session
- WHEN the user opens `/itinerary`
- THEN the user is redirected to `/login`

#### Scenario: Loading state

- GIVEN the itinerary data is being fetched
- WHEN the page renders
- THEN a skeleton loading state is shown via Suspense

#### Scenario: Mobile usability

- GIVEN a viewport of 375px width
- WHEN the user scrolls the itinerary
- THEN all content is readable without horizontal scroll
