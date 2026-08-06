# Delta for Auth

## ADDED Requirements

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
