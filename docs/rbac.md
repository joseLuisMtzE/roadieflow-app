# RBAC (M3 · CRUD Admin)

Autorización server-side complementaria a `proxy.ts` (sesión en boundary de red).

## Matriz M3

| Recurso     | create | update | read (itinerary/UI)       |
| ----------- | ------ | ------ | ------------------------- |
| `artist`    | ADMIN  | ADMIN  | cualquier rol autenticado |
| `event`     | ADMIN  | ADMIN  | cualquier rol autenticado |
| `logistics` | ADMIN  | ADMIN  | cualquier rol autenticado |

Roles: `ADMIN`, `TOUR_MANAGER`, `ROAD_STAFF`, `ARTIST`.

M4 ampliará permisos scoped por artista/gira para `TOUR_MANAGER`. M5 permitirá a `ROAD_STAFF` actualizar solo `Status` en logística.

## Uso en Server Actions

```typescript
"use server";

import { requireAdminSession } from "@/lib/actions/require-admin-session";
import { toActionError, type ActionResult } from "@/lib/rbac";

export async function exampleAction(): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdminSession();
    // validar Zod → Prisma → revalidatePath
    return { ok: true, data: { id: "..." } };
  } catch (error) {
    return toActionError(error);
  }
}
```

Alternativa granular con recurso/acción:

```typescript
import { auth } from "@/lib/auth";
import { assertCan, toActionError } from "@/lib/rbac";

const session = await auth();
assertCan(session, "create", "event");
```

## Errores

| Clase                  | Cuándo           | Mensaje UI (es)       |
| ---------------------- | ---------------- | --------------------- |
| `UnauthenticatedError` | Sin sesión       | Debes iniciar sesión  |
| `AuthorizationError`   | Rol insuficiente | Solo administradores… |

Los forms client deben mostrar `result.error` cuando `ok: false`.
