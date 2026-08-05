## Context

Brownfield: Next.js 16 App Router, Prisma 7 con adapter pg, rutas en `app/(shell)/`. M1 dejó `/itinerary` público; M2 lo protege. Una rama ClickUp por sub-tarea.

## Goals / Non-Goals

**Goals:** Auth.js v5 + Credentials, User/Role en Prisma, login móvil, middleware, E2E login.

**Non-Goals:** OAuth, registro UI, RBAC por acción (M3+), protección por rol distinta de "autenticado".

## Decisions

### Auth.js v5 (next-auth@beta)

- **Por qué:** Estándar en Next.js App Router; integración con middleware y Server Components.
- **Provider:** Credentials (email/password) — suficiente para demo y E2E; OAuth pospone a futuro.

### Prisma adapter

- Usar `@auth/prisma-adapter` con modelos User, Account, Session, VerificationToken.
- Enum `Role` en schema Prisma; incluir `role` en JWT/session callbacks.

### Password hashing

- `bcryptjs` con cost factor 10 — compatible con Node sin native bindings.

### Route protection

- **`middleware.ts`** en raíz: matcher para `(shell)` routes (`/`, `/itinerary`, `/events`, `/profile`).
- `/login` y `/api/auth/*` excluidos del matcher.
- Redirect a `/login?callbackUrl=...` si no hay sesión.

### Login UI

- `app/login/page.tsx` — fuera de `(shell)` (sin bottom nav).
- Client form con Zod: email + password.
- `signIn("credentials", { redirect: false })` → redirect manual a `/itinerary` o error.
- Tactical Elegance: tokens existentes, `min-h-11` inputs, `.btn-primary-gradient`.

### Session shape

```typescript
interface Session {
  user: {
    id: string;
    email: string;
    role: "ADMIN" | "TOUR_MANAGER" | "ROAD_STAFF" | "ARTIST";
  };
}
```

### Seed credentials

Documentar en `.env.example` (no secretos reales):

```
SEED_ADMIN_EMAIL=admin@roadie.local
SEED_ADMIN_PASSWORD=roadie-demo
```

### E2E

- Playwright en `e2e/login.spec.ts`
- CI: levantar Postgres (service container o docker compose), migrate, seed, `yarn build && yarn start`, run tests.
- Usuario seed para tests = mismo admin demo.

## Risks / Trade-offs

| Riesgo                             | Mitigación                                           |
| ---------------------------------- | ---------------------------------------------------- |
| Breaking: itinerary ya no público  | Esperado por M2; preview Vercel necesita AUTH_SECRET |
| Credentials menos seguro que OAuth | Aceptable para M2 demo; OAuth en milestone futuro    |
| AUTH_SECRET en Vercel              | Documentar en deploy.md; añadir a checklist preview  |

## Migration Plan

1. Migración Prisma User + Auth tables
2. Seed admin user
3. Auth config + API route
4. Middleware (app redirige a login — breaking)
5. Login UI
6. Logout en `/profile`
7. Playwright + CI

Rollback: revert PR; migración down si necesario.

## Open Questions

- ¿Mostrar logout solo en `/profile` o también en nav? → **Profile** por ahora (M2 mínimo).

## File map (expected)

```
prisma/schema.prisma          # User, Role, Auth.js models
prisma/seed.ts                # admin user
lib/auth.ts                   # auth config + helpers
app/api/auth/[...nextauth]/route.ts
middleware.ts
app/login/page.tsx
app/login/login-form.tsx      # client component
e2e/login.spec.ts
playwright.config.ts
.env.example                  # AUTH_SECRET, SEED_ADMIN_*
```
