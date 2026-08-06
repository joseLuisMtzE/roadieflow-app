## Why

M2 entregó login y rutas protegidas, pero el tour demo sigue siendo read-only salvo seed manual. M3 habilita a usuarios **ADMIN** crear y editar artistas, eventos y logística desde la app móvil — base para RBAC más fino (M4) y vistas de campo (M5).

## What Changes

- Helper RBAC `assertCan` / `requireRole` usado en Server Actions (solo **ADMIN** muta datos en M3)
- Server Actions create/update para Artist, Event y Logistics
- Schemas Zod por `LogisticsType` para validar `details` JSON (FLIGHT, HOTEL, TRANSFER)
- Formularios móviles ADMIN: Artist, Event, Vuelo, Hotel, Traslado
- Lista de logística en detalle de evento (o ruta equivalente bajo `(shell)`)
- Revalidación de datos de itinerary tras mutaciones

## Capabilities

### New Capabilities

- `admin-crud`: mutaciones ADMIN vía Server Actions y UI móvil para Artist, Event y Logistics

### Modified Capabilities

- `auth`: autorización por rol en server-side (assertCan); mutaciones restringidas a ADMIN
- `data`: validación Zod de payloads CRUD y `details` JSON por tipo de logística
- `itinerary`: timeline refleja cambios tras CRUD (revalidate / fetch dinámico)

## Impact

- **App**: `lib/rbac.ts`, `app/actions/*`, formularios bajo `app/(shell)/` o rutas admin dedicadas
- **Prisma**: sin cambios de schema esperados en M3 (modelos M1/M2 existentes)
- **Deps**: Zod (ya presente); posible `zod` schemas en `lib/schemas/`
- **Tests**: unit tests Vitest para RBAC + schemas (tarea M7 referencia; opcional en M3)
- **ClickUp**: 8 tareas M3 (`86ba56gnm`, `86ba56gpw`, `86ba56gqh`, `86ba56gqy`, `86ba56grk`, `86ba56gtd`, `86ba56gu4`, `86ba56guw`)

## Non-goals

- RBAC por rol distinto de ADMIN para escritura (TOUR_MANAGER scoped → M4)
- Vista Artist read-only (M6)
- Optimistic updates / timeline dinámico avanzado (M6)
- Registro de usuarios en UI
- Delete permanente con confirmación compleja (soft-delete fuera de alcance; delete simple opcional post-M3)
