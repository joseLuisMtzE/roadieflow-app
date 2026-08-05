# Delta for Data

## ADDED Requirements

### Requirement: User entity

The system SHALL persist users with unique email, hashed password, and role enum.

#### Scenario: Unique email

- GIVEN two user creation attempts with the same email
- WHEN the second user is saved
- THEN the operation fails due to unique constraint

#### Scenario: Password storage

- GIVEN a user is created
- WHEN the password is stored
- THEN only a bcrypt hash is persisted (never plaintext)

### Requirement: Auth.js session tables

The system SHALL include Prisma models required by Auth.js for session management (Account, Session, VerificationToken as needed by the adapter).

#### Scenario: Session persistence

- GIVEN a user logs in successfully
- WHEN the session is created
- THEN a Session record is persisted linked to the User

## MODIFIED Requirements

### Requirement: Demo seed

The system SHALL seed demo tour data and at least one admin user when `SEED_DEMO_DATA=true`.

#### Scenario: Seed admin

- GIVEN `SEED_DEMO_DATA=true` in local env
- WHEN `yarn db:seed` runs
- THEN demo artist, events, logistics, and admin user are created
- AND the seed refuses to run in production
