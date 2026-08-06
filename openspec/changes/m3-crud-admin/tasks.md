# Tasks — M3 · CRUD Admin

OpenSpec change: `openspec/changes/m3-crud-admin/`
Spec deltas: `admin-crud`, `auth`, `data`, `itinerary`

Implementar en orden. **Una rama ClickUp por sección.**

---

## 1. `86ba56gnm` — Helper RBAC assertCan + middleware

- [x] 1.1 Crear `lib/rbac.ts` con `assertCan`, `requireAdmin`, tipos de acción/recurso
- [x] 1.2 Integrar `auth()` + `assertCan` en patrón base para Server Actions
- [x] 1.3 Documentar matriz M3: solo ADMIN puede create/update en tour entities
- [x] 1.4 Verificar: ROAD_STAFF no puede mutar vía action (error controlado)

**Rama:** `86ba56gnm-rbac-assertcan`
**Depende de:** M2 auth mergeado

---

## 2. `86ba56gpw` — CRUD Artist (Server Actions + UI)

- [x] 2.1 Zod schema create/update Artist en `lib/schemas/artist.ts`
- [x] 2.2 Server Actions `createArtist`, `updateArtist` en `app/actions/artist.ts`
- [x] 2.3 UI móvil: formulario crear/editar artista (ADMIN only)
- [x] 2.4 `revalidatePath` tras mutación exitosa
- [ ] 2.5 Verificar: admin crea artista y persiste en DB

**Rama:** `86ba56gpw-crud-artist`
**Depende de:** 1.x

---

## 3. `86ba56gqh` — CRUD Event (Server Actions + UI)

- [x] 3.1 Zod schema create/update Event
- [x] 3.2 Server Actions create/update Event con `artistId`
- [x] 3.3 UI: formulario evento móvil + selector de artista
- [x] 3.4 Listado o acceso desde `/events` hacia detalle/edición
- [ ] 3.5 Verificar: evento nuevo visible en itinerary tras revalidate

**Rama:** `86ba56gqh-crud-event`
**Depende de:** 1.x, 2.x (artist selector)

---

## 4. `86ba56gqy` — Zod schemas por LogisticsType (details JSON)

- [x] 4.1 Schemas `flight`, `hotel`, `transfer` en `lib/schemas/logistics/`
- [x] 4.2 Discriminated union por `LogisticsType` para `details`
- [x] 4.3 Schema base logistics (type, status, startTime, eventId)
- [ ] 4.4 Tests manuales o unit smoke: payload inválido rechazado

**Rama:** `86ba56gqy-logistics-zod`
**Depende de:** 1.x

---

## 5. `86ba56grk` — Server Actions create/update Logistics

- [x] 5.1 Actions `createLogistics`, `updateLogistics` con validación Zod
- [x] 5.2 `assertCan` ADMIN en cada action
- [x] 5.3 `revalidatePath("/itinerary")` y ruta de evento
- [ ] 5.4 Verificar: logistics creado aparece en query de itinerary

**Rama:** `86ba56grk-logistics-actions`
**Depende de:** 4.x

---

## 6. `86ba56gtd` — UI formulario Vuelo (móvil)

- [x] 6.1 Form FLIGHT con campos del schema (aerolínea, número, from/to, note)
- [x] 6.2 Estados loading/error; submit vía Server Action
- [x] 6.3 Touch targets y Tactical Elegance
- [ ] 6.4 Verificar en viewport 375px

**Rama:** `86ba56gtd-ui-flight-form`
**Depende de:** 5.x

---

## 7. `86ba56gu4` — UI formulario Hotel (móvil)

- [x] 7.1 Form HOTEL (name, address, checkIn, checkOut)
- [x] 7.2 Mismo patrón loading/error que vuelo
- [ ] 7.3 Verificar persistencia y lista en evento

**Rama:** `86ba56gu4-ui-hotel-form`
**Depende de:** 5.x

---

## 8. `86ba56guw` — UI Traslado + lista en detalle evento

- [x] 8.1 Form TRANSFER (from, to, vehicle)
- [x] 8.2 Página detalle evento con lista de logistics por tipo/status
- [x] 8.3 Links/actions para añadir vuelo/hotel/traslado (ADMIN)
- [ ] 8.4 Verificar flujo completo: crear traslado → lista → itinerary

**Rama:** `86ba56guw-transfer-event-detail`
**Depende de:** 6.x, 7.x

---

## Post-milestone

- [ ] `/opsx:archive m3-crud-admin` — merge deltas a `openspec/specs/` tras merge en main
