# Tasks — M2 · Auth Admin

OpenSpec change: `openspec/changes/m2-auth-admin/`
Spec deltas: `auth`, `itinerary`, `data`

Implementar en orden. **Una rama ClickUp por sección.**

---

## 1. `86ba56ggv` — Auth.js + modelo User y roles

- [ ] 1.1 Añadir enum `Role` y modelos `User`, `Account`, `Session`, `VerificationToken` en `prisma/schema.prisma`
- [ ] 1.2 Ejecutar migración (`yarn db:migrate`)
- [ ] 1.3 Instalar deps: `next-auth@beta`, `@auth/prisma-adapter`, `bcryptjs`, `@types/bcryptjs`
- [ ] 1.4 Crear `lib/auth.ts` con config Auth.js (Credentials provider, callbacks de session/JWT con role)
- [ ] 1.5 Crear `app/api/auth/[...nextauth]/route.ts`
- [ ] 1.6 Añadir `AUTH_SECRET` a `.env.example` (y documentar generación)
- [ ] 1.7 Extender `prisma/seed.ts` con usuario admin demo (hash bcrypt)
- [ ] 1.8 Verificar: login vía API crea sesión; logout invalida sesión

**Rama:** `86ba56ggv-auth-user-roles`

---

## 2. `86ba56ghr` — UI Login móvil

- [ ] 2.1 Crear `app/login/page.tsx` (Server Component wrapper, sin shell layout)
- [ ] 2.2 Crear `app/login/login-form.tsx` (Client: form email/password)
- [ ] 2.3 Validación Zod en cliente (email válido, password requerido)
- [ ] 2.4 Estados loading y error de credenciales visibles
- [ ] 2.5 Touch targets ≥44px; estilo Tactical Elegance
- [ ] 2.6 Redirect post-login a `/itinerary`
- [ ] 2.7 Verificar en viewport 375px

**Rama:** `86ba56ghr-login-ui`
**Depende de:** 1.x

---

## 3. `86ba56gjm` — Layout protegido + redirect sin sesión

- [ ] 3.1 Crear `middleware.ts` con matcher para rutas `(shell)`
- [ ] 3.2 Excluir `/login` y `/api/auth/*` del matcher
- [ ] 3.3 Redirect a `/login?callbackUrl=...` si no hay sesión
- [ ] 3.4 Usuario autenticado accede a `/itinerary` sin redirect
- [ ] 3.5 Añadir botón logout en `app/(shell)/profile/page.tsx` (usa `signOut`)
- [ ] 3.6 Verificar: sin sesión → `/` redirige a login; con sesión → itinerary OK

**Rama:** `86ba56gjm-protected-layout`
**Depende de:** 1.x

---

## 4. `86ba56gkm` — Playwright E2E: flujo login

- [ ] 4.1 Instalar `@playwright/test` y crear `playwright.config.ts`
- [ ] 4.2 Crear `e2e/login.spec.ts`: protected route → login → itinerary
- [ ] 4.3 Añadir script `yarn test:e2e` en `package.json`
- [ ] 4.4 Integrar en CI (`.github/workflows/`)
- [ ] 4.5 Documentar en `docs/setup.md` o README cómo correr E2E localmente
- [ ] 4.6 Verificar test pasa en CI

**Rama:** `86ba56gkm-e2e-login`
**Depende de:** 2.x, 3.x

---

## Post-milestone

- [ ] `/opsx:archive m2-auth-admin` — merge deltas a `openspec/specs/` tras merge en main
