# RBAC — implementación técnica

Patrones de código para autorización server-side.  
**Matriz de roles y capacidades (canónica):** [docs/roles.md](./roles.md)

## Helpers (`lib/rbac.ts`)

| Export                                 | Uso                                              |
| -------------------------------------- | ------------------------------------------------ |
| `assertCan(session, action, resource)` | Comprueba sesión + permiso M3 por recurso/acción |
| `requireAdmin(session)`                | Atajo: sesión activa y rol `ADMIN`               |
| `requireAdminSession()`                | `auth()` + `requireAdmin` para Server Actions    |
| `toActionError(error)`                 | Normaliza errores a `{ ok: false, error }`       |

Recursos: `artist` · `event` · `logistics`  
Acciones: `create` · `update` · `read`

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

Alternativa granular:

```typescript
import { auth } from "@/lib/auth";
import { assertCan, toActionError } from "@/lib/rbac";

const session = await auth();
assertCan(session, "create", "event");
```

## Errores tipados

| Clase                  | Cuándo           | Mensaje UI (es)                                             |
| ---------------------- | ---------------- | ----------------------------------------------------------- |
| `UnauthenticatedError` | Sin sesión       | Debes iniciar sesión                                        |
| `AuthorizationError`   | Rol insuficiente | Solo administradores pueden crear o editar datos de la gira |

Los forms client deben mostrar `result.error` cuando `ok: false`.

## Capas de protección

1. **`proxy.ts`** — sesión obligatoria en rutas `(shell)`
2. **Server Actions** — `auth()` + `assertCan` antes de Prisma
3. **UI** — ocultar botones CRUD si no es `ADMIN` (defensa UX)
