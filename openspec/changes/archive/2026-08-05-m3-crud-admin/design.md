## Context

Brownfield: Next.js 16 App Router, Auth.js v5 con JWT + `Role` en sesión, Prisma 7, rutas `(shell)` protegidas por `proxy.ts`. M1/M2 dejaron modelos Artist/Event/Logistics y itinerary read-only. M3 añade escritura **solo ADMIN**.

Una rama ClickUp por sub-tarea (ver `tasks.md`).

## Goals / Non-Goals

**Goals:** RBAC server-side, Server Actions tipadas, Zod por tipo de logística, formularios móviles ADMIN, lista de logística por evento.

**Non-Goals:** Scoped RBAC por artista/gira (M4), UI Artist, delete en cascada elaborado, Vitest suite completa (M7).

## Decisions

### RBAC server-side

- **`lib/rbac.ts`**: `assertCan(session, action, resource?)` y `requireAdmin(session)` — lanzan error tipado o retornan `never` para uso en Server Actions.
- **M3 scope:** acciones `create|update` en `artist`, `event`, `logistics` → rol `ADMIN` únicamente.
- **Proxy no sustituye RBAC:** `proxy.ts` sigue validando sesión; cada Server Action llama `auth()` + `assertCan` antes de Prisma.
- Roles no-ADMIN que invoquen actions reciben error controlado (mensaje UI en español).

### Server Actions

- Ubicación: `app/actions/` (o `lib/actions/` si preferimos colocation) — **decisión:** `app/actions/{artist,event,logistics}.ts` con `"use server"`.
- Patrón: validar con Zod → `assertCan` → Prisma → `revalidatePath("/itinerary")` (y rutas de evento si aplica).
- Retorno: `{ ok: true, data } | { ok: false, error: string }` para forms client.

### Zod schemas — Logistics `details`

- **`lib/schemas/logistics/`**: `flight.ts`, `hotel.ts`, `transfer.ts` + discriminated union por `LogisticsType`.
- Campos alineados al seed demo (aerolínea, hotel, origen/destino, etc.).
- Schema de create/update comparte base: `type`, `status`, `startTime`, `eventId`, `details`.

### UI móvil (Tactical Elegance)

- Formularios Client con React Hook Form + Zod resolver **o** validación Zod manual (mantener consistencia con login-form).
- Touch targets ≥44px, tokens semánticos, sin bordes 1px (No-Line Rule).
- Rutas sugeridas:
  - `/events` — listado + link a crear/editar evento
  - `/events/[id]` — detalle + lista logística + acciones add vuelo/hotel/traslado
  - `/artists/new`, `/artists/[id]/edit` (o modal/drawer si prefieren menos rutas en M3)
- Solo renderizar controles CRUD si `session.user.role === ADMIN` (defensa UI; server sigue siendo fuente de verdad).

### Itinerary refresh

- Tras mutación exitosa: `revalidatePath("/itinerary")` para que el timeline muestre datos nuevos en siguiente request.
- Itinerary page ya es `force-dynamic` + `auth()`.

### Testing (M3 mínimo)

- Manual + E2E login existente; tests unitarios RBAC/Zod pueden ir en M7 (`86ba56hbh`).
- Opcional smoke: admin crea traslado y aparece en itinerary.

## Risks / Trade-offs

| Riesgo                        | Mitigación                                               |
| ----------------------------- | -------------------------------------------------------- |
| Server Action sin RBAC        | Checklist en tasks; assertCan obligatorio en code review |
| JSON `details` inválido en DB | Zod en action + tipos Prisma `Json`                      |
| Muchas rutas nuevas           | Empezar por `/events/[id]` como hub de logística         |
| Forms duplicados              | Extraer `FormField` patterns de shadcn existentes        |

## File map (orientativo)

```
lib/rbac.ts
lib/schemas/logistics/{flight,hotel,transfer,index}.ts
app/actions/artist.ts
app/actions/event.ts
app/actions/logistics.ts
app/(shell)/events/...
components/admin/... (forms)
```

## Open questions

- ¿Delete de event/logistics en M3 o solo create/update? → **create/update primero**; delete si cabe en misma tarea UI.
- ¿Artists en ruta dedicada o solo selector en Event form? → **CRUD Artist mínimo** + selector en Event.
