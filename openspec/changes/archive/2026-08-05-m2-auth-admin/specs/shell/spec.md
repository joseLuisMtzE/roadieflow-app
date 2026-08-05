# Delta for Shell

## MODIFIED Requirements

### Requirement: Core routes

The system SHALL expose core routes `/`, `/itinerary`, `/events`, and `/profile` with bottom nav labels Inicio, Itinerario, Eventos, and Perfil **only when the user has a valid session**.

#### Scenario: Authenticated navigation

- GIVEN a valid session
- WHEN the user navigates to each core route
- THEN the corresponding page renders with bottom navigation visible

#### Scenario: Unauthenticated redirect

- GIVEN no active session
- WHEN the user navigates to `/`, `/itinerary`, `/events`, or `/profile`
- THEN the user is redirected to `/login`
- AND bottom navigation is NOT shown
