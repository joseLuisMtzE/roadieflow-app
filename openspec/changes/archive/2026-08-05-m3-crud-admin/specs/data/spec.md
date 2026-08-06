# Delta for Data

## ADDED Requirements

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
