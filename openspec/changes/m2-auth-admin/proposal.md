## Why

M1 entregó un itinerario read-only público como demo. Para avanzar hacia CRUD y RBAC (M3+), el sistema necesita autenticación con sesiones seguras y roles persistidos. M2 establece la base de Auth.js antes de proteger rutas y construir la UI de login.

## What Changes

- Modelo `User` en Prisma con enum `Role` (ADMIN, TOUR_MANAGER, ROAD_STAFF, ARTIST)
- Auth.js v5 con provider Credentials (email + password)
- Sesión con rol incluido; login y logout funcionales
- Ruta pública `/login` con formulario móvil (Zod)
- Proxy (`proxy.ts`) que protege rutas `(shell)` — **BREAKING**: `/itinerary` deja de ser público
- Usuario admin demo en seed
- Playwright E2E del flujo login en CI

## Capabilities

### New Capabilities

- `auth`: autenticación, sesiones, roles, login/logout, protección de rutas

### Modified Capabilities

- `itinerary`: acceso requiere sesión activa (antes público en M1)
- `shell`: bottom nav solo con sesión; sin sesión redirect a `/login`
- `data`: nuevo modelo User y tablas de sesión Auth.js

## Impact

- **Prisma**: migración User + tablas Auth.js; seed extendido
- **Deps**: `next-auth`, `bcryptjs`, `zod`; dev: `@playwright/test`
- **App**: `proxy.ts`, `app/login/`, `lib/auth.ts`, `app/api/auth/[...nextauth]/`
- **Env**: `AUTH_SECRET`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD` en `.env.example`
- **ClickUp**: 4 tareas M2 (`86ba56ggv`, `86ba56ghr`, `86ba56gjm`, `86ba56gkm`)

## Non-goals

- OAuth / SSO (solo Credentials en M2)
- RBAC granular por acción (M3/M4)
- Registro de usuarios en UI (admin seed manual)
