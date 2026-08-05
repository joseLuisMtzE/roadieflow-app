## Purpose

Prisma data model and local development database for tour management (M1).

## Requirements

### Requirement: Artist entity

The system SHALL persist artists with id, name, and optional genre.

#### Scenario: Create artist

- GIVEN valid artist data
- WHEN an artist is created
- THEN the record is retrievable by id with name and optional genre

### Requirement: Event entity

The system SHALL persist events linked to an artist with title, date, location name, and city.

#### Scenario: Event linked to artist

- GIVEN an existing artist
- WHEN an event is created for that artist
- THEN the event references the artist via foreign key

### Requirement: Logistics entity

The system SHALL persist logistics items linked to an event with type, status, details (JSON), and start time.

#### Scenario: Logistics types

- GIVEN a logistics record
- WHEN its type is set
- THEN the value MUST be one of: FLIGHT, HOTEL, TRANSFER

#### Scenario: Logistics status default

- GIVEN a logistics record
- WHEN created without explicit status
- THEN status defaults to PENDING

### Requirement: Local development database

The system SHALL support local PostgreSQL via Docker Compose with migrations and seed script.

#### Scenario: Demo seed

- GIVEN `SEED_DEMO_DATA=true` in local env
- WHEN `yarn db:seed` runs
- THEN demo artist, events, and logistics are created
- AND the seed refuses to run in production
