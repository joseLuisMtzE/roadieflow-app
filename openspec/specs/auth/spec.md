## Purpose

Authentication, session management, and route protection for RoadieFlow (M2 · Auth Admin).

## Requirements

### Requirement: User model with roles

The system SHALL persist users with email, password hash, and role.

#### Scenario: Role enum

- **GIVEN** a user record
- **WHEN** role is assigned
- **THEN** the value MUST be one of: ADMIN, TOUR_MANAGER, ROAD_STAFF, ARTIST

### Requirement: Credential login

The system SHALL authenticate users via email and password using Auth.js Credentials provider.

#### Scenario: Valid credentials

- **GIVEN** a user exists with matching email and password
- **WHEN** the user submits the login form
- **THEN** a valid JWT session is created (strategy `jwt`, required for Credentials)
- **AND** the session includes the user's role

### Requirement: JWT session strategy

The system SHALL use JWT session strategy when Credentials provider is configured.

#### Scenario: Session after login

- **GIVEN** successful Credentials authentication
- **WHEN** `auth()` is called in a Server Component
- **THEN** a valid session with user id, email, and role is returned

#### Scenario: Invalid credentials

- **GIVEN** incorrect email or password
- **WHEN** the user submits the login form
- **THEN** no session is created
- **AND** an error message is shown to the user

### Requirement: Logout

The system SHALL allow authenticated users to end their session.

#### Scenario: Sign out

- **GIVEN** an authenticated session
- **WHEN** the user signs out
- **THEN** the session is invalidated
- **AND** subsequent requests are treated as unauthenticated

### Requirement: Protected app routes

The system SHALL require authentication for all routes under `(shell)`.

#### Scenario: Unauthenticated access

- **GIVEN** no active session
- **WHEN** the user navigates to `/`, `/itinerary`, `/events`, `/artists`, or `/profile`
- **THEN** the user is redirected to `/login`

#### Scenario: Authenticated access

- **GIVEN** a valid session
- **WHEN** the user navigates to a protected route
- **THEN** the page renders normally

### Requirement: Public login route

The system SHALL expose `/login` without authentication and without bottom navigation.

#### Scenario: Login page layout

- **GIVEN** an unauthenticated user
- **WHEN** the user opens `/login`
- **THEN** a mobile-friendly login form is shown
- **AND** bottom navigation is NOT displayed

### Requirement: Post-login redirect

The system SHALL redirect to `/itinerary` after successful login.

#### Scenario: Successful login redirect

- **GIVEN** valid credentials on `/login`
- **WHEN** authentication succeeds
- **THEN** the user is redirected to `/itinerary`

### Requirement: Demo admin user

The system SHALL seed at least one admin user for local development and E2E tests.

#### Scenario: Seed admin

- **GIVEN** `SEED_DEMO_DATA=true`
- **AND** `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set in environment
- **WHEN** the seed script runs
- **THEN** an admin user is created with those credentials
- **AND** the values are documented in `.env.example`

### Requirement: E2E login test

The system SHALL include a Playwright test that verifies the login flow in CI.

#### Scenario: Login E2E

- **GIVEN** the app is running with seeded test user (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`)
- **WHEN** Playwright navigates to a protected route
- **THEN** it is redirected to login, submits credentials, and reaches `/itinerary`
- **AND** protected itinerary content is visible (session active)

### Requirement: Role-based authorization helper

The system SHALL provide server-side helpers to assert role permissions before mutating data.

#### Scenario: assertCan admin write

- **GIVEN** a session with role ADMIN
- **WHEN** `assertCan` is called for a create or update action on tour entities
- **THEN** the check passes without error

#### Scenario: assertCan rejects non-admin write

- **GIVEN** a session with role other than ADMIN
- **WHEN** `assertCan` is called for a create or update action
- **THEN** an authorization error is thrown
- **AND** no Prisma mutation runs

### Requirement: Server Actions require auth

The system SHALL call `auth()` and authorization helpers at the start of every mutating Server Action.

#### Scenario: Unauthenticated action

- **GIVEN** no active session
- **WHEN** a mutating Server Action is invoked
- **THEN** the action fails before any database write
