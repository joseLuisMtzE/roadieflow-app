## Purpose

Prisma data model and local development database for tour management (M1).

## Requirements

### Requirement: Artist entity

The system SHALL persist artists with id, name, and optional genre.

#### Scenario: Create artist

- **GIVEN** valid artist data
- **WHEN** an artist is created
- **THEN** the record is retrievable by id with name and optional genre

### Requirement: Event entity

The system SHALL persist events linked to an artist with title, date, location name, and city.

#### Scenario: Event linked to artist

- **GIVEN** an existing artist
- **WHEN** an event is created for that artist
- **THEN** the event references the artist via foreign key

### Requirement: Logistics entity

The system SHALL persist logistics items linked to an event with type, status, details (JSON), and start time.

#### Scenario: Logistics types

- **GIVEN** a logistics record
- **WHEN** its type is set
- **THEN** the value MUST be one of: FLIGHT, HOTEL, TRANSFER

#### Scenario: Logistics status default

- **GIVEN** a logistics record
- **WHEN** created without explicit status
- **THEN** status defaults to PENDING

### Requirement: User entity

The system SHALL persist users with unique email, hashed password, and role enum.

#### Scenario: Unique email

- **GIVEN** two user creation attempts with the same email
- **WHEN** the second user is saved
- **THEN** the operation fails due to unique constraint

#### Scenario: Password storage

- **GIVEN** a user is created
- **WHEN** the password is stored
- **THEN** only a bcrypt hash is persisted (never plaintext)

### Requirement: Auth.js session tables

The system SHALL include Prisma models required by Auth.js for session management (Account, Session, VerificationToken as needed by the adapter).

#### Scenario: User account persistence

- **GIVEN** a user is created via seed or adapter
- **WHEN** the user record is saved
- **THEN** User (and Account if applicable) records exist in the database

### Requirement: Local development database

The system SHALL support local PostgreSQL via Docker Compose with migrations and seed script.

#### Scenario: Demo seed

- **GIVEN** `SEED_DEMO_DATA=true` in local env
- **AND** `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set
- **WHEN** `yarn db:seed` runs
- **THEN** demo artist, events, logistics, and admin user are created with those credentials
- **AND** the seed refuses to run in production

### Requirement: Logistics details validation

The system SHALL validate logistics `details` JSON with Zod schemas per `LogisticsType` before persisting.

#### Scenario: Valid flight details

- **GIVEN** logistics type FLIGHT
- **WHEN** details include required flight fields (e.g. airline, flight number, from, to)
- **THEN** validation passes and data is stored

#### Scenario: Invalid details rejected

- **GIVEN** logistics type HOTEL
- **WHEN** required hotel fields are missing
- **THEN** validation fails with a field-level error
- **AND** no record is created or updated

### Requirement: CRUD input validation

The system SHALL validate Artist, Event, and Logistics create/update payloads with Zod before Prisma writes.

#### Scenario: Invalid event date

- **GIVEN** an event create payload with invalid or missing date
- **WHEN** the Server Action runs
- **THEN** validation fails without database write
