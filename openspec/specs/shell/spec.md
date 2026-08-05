## Purpose

Mobile shell and bottom navigation for core RoadieFlow routes (M0 · Shell).

## Requirements

### Requirement: Mobile viewport container

The system SHALL render core routes inside a mobile-first container with `max-w-md` width centered on larger viewports.

#### Scenario: Desktop browser

- GIVEN a viewport wider than 375px
- WHEN the user opens any core route
- THEN content is constrained to mobile width
- AND the background fills the remaining space

### Requirement: Bottom navigation

The system SHALL display a fixed bottom navigation on all routes under `(shell)`.

#### Scenario: Navigate between core routes

- GIVEN the user is on a core route
- WHEN the user taps a bottom nav item
- THEN the app navigates to the corresponding route
- AND the active item shows `aria-current="page"`

#### Scenario: Touch targets

- GIVEN the bottom navigation is visible
- WHEN the user interacts with nav items
- THEN each item has a minimum touch target of 44×44px

### Requirement: Safe area support

The system SHALL respect device safe areas for bottom navigation padding.

#### Scenario: Device with home indicator

- GIVEN a device with a bottom safe area inset
- WHEN the bottom nav renders
- THEN padding includes `env(safe-area-inset-bottom)`

### Requirement: Core routes

The system SHALL expose core routes `/`, `/itinerary`, `/events`, and `/profile` with bottom nav labels Inicio, Itinerario, Eventos, and Perfil.

#### Scenario: Route availability

- GIVEN the app is running
- WHEN the user navigates to each core route
- THEN the corresponding page renders with bottom navigation visible
