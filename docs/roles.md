# Roles y capacidades

**Fuente de verdad** para permisos de usuario en RoadieFlow.  
Implementación server-side: `lib/rbac.ts` · UI defensiva: ocultar controles CRUD si `session.user.role !== ADMIN`.

> Para patrones de código en Server Actions, ver [RBAC (implementación)](./rbac.md).  
> Para cómo usar los formularios admin, ver [Guía CRUD Admin](./admin-crud.md).

## Roles del sistema

| Rol            | Descripción                                             | Usuario demo (local)  |
| -------------- | ------------------------------------------------------- | --------------------- |
| `ADMIN`        | Configura la gira: artistas, eventos y logística        | `admin@roadie.local`  |
| `TOUR_MANAGER` | Reservado M4 — gestión scoped por artista/gira          | —                     |
| `ROAD_STAFF`   | Campo: consulta itinerario y eventos; sin mutaciones M3 | `roadie@roadie.local` |
| `ARTIST`       | Reservado — vista limitada del artista                  | —                     |

Credenciales demo: ver [Setup local](./setup.md) (`SEED_ADMIN_*`, `SEED_ROAD_STAFF_*`).

---

## Matriz de capacidades (M3 · CRUD Admin)

Leyenda: ✅ permitido · 👁 solo lectura · ❌ denegado · 🔜 milestone futuro

### Sesión y rutas

| Capacidad               | ADMIN | TOUR_MANAGER | ROAD_STAFF | ARTIST |
| ----------------------- | :---: | :----------: | :--------: | :----: |
| Iniciar sesión          |  ✅   |      ✅      |     ✅     |   🔜   |
| Ver `/itinerary`        |  ✅   |      👁      |     👁     |   🔜   |
| Ver `/events` y detalle |  ✅   |      👁      |     👁     |   🔜   |
| Ver `/artists`          |  ✅   |      👁      |     👁     |   🔜   |
| Ver `/profile`          |  ✅   |      ✅      |     ✅     |   🔜   |

Todas las rutas `(shell)` requieren sesión activa (`proxy.ts`). Sin login → redirect a `/login`.

### Mutaciones (Server Actions)

| Recurso       | create | update | delete |
| ------------- | :----: | :----: | :----: |
| **Artist**    | ADMIN  | ADMIN  | ❌ M3  |
| **Event**     | ADMIN  | ADMIN  | ❌ M3  |
| **Logistics** | ADMIN  | ADMIN  | ❌ M3  |

| Rol            | create/update tour entities         |
| -------------- | ----------------------------------- |
| `ADMIN`        | ✅                                  |
| `TOUR_MANAGER` | ❌ (M4: scoped por gira)            |
| `ROAD_STAFF`   | ❌ (M5: solo `Status` en logística) |
| `ARTIST`       | ❌                                  |

### UI admin (controles visibles)

| Control                           | ADMIN | Otros roles autenticados |
| --------------------------------- | :---: | :----------------------: |
| Nuevo / Editar artista            |  ✅   |            ❌            |
| Nuevo / Editar evento             |  ✅   |            ❌            |
| Añadir vuelo / hotel / traslado   |  ✅   |            ❌            |
| Editar logística existente        |  ✅   |            ❌            |
| Listados y detalle (solo lectura) |  ✅   |            ✅            |

Rutas admin directas (`/artists/new`, `/events/new`, …) redirigen a listados si el rol no es `ADMIN`.

---

## Comportamiento ante intentos no autorizados

| Situación               | Server (Server Action)                                                               | UI                                     |
| ----------------------- | ------------------------------------------------------------------------------------ | -------------------------------------- |
| Sin sesión              | `UnauthenticatedError` — «Debes iniciar sesión»                                      | Redirect a `/login`                    |
| Rol ≠ ADMIN en mutación | `AuthorizationError` — «Solo administradores pueden crear o editar datos de la gira» | Botones ocultos; rutas admin redirigen |
| Payload inválido (Zod)  | `{ ok: false, error: "<mensaje en español>" }`                                       | Mensaje bajo el formulario             |

La **fuente de verdad** es siempre el server (`auth()` + `assertCan`). Ocultar botones es defensa UX, no seguridad.

---

## Roadmap de permisos

| Milestone       | Cambio previsto                                              |
| --------------- | ------------------------------------------------------------ |
| **M3** (actual) | Solo `ADMIN` puede create/update en artist, event, logistics |
| **M4**          | `TOUR_MANAGER` scoped por artista/gira                       |
| **M5**          | `ROAD_STAFF` puede actualizar solo `Status` en logística     |
| **M7**          | Tests unitarios RBAC/Zod                                     |

Al implementar un milestone nuevo, **actualizar este archivo primero** y luego `lib/rbac.ts` + specs OpenSpec.
