# Guía CRUD Admin (M3)

Cómo crear y editar datos de la gira desde la app móvil.  
**Requisito:** sesión con rol `ADMIN` (ver [Roles y capacidades](./roles.md)).

## Flujo recomendado

```text
1. Artista     →  /artists/new
2. Evento      →  /events/new        (selector de artista)
3. Logística   →  /events/[id]       → Vuelo / Hotel / Traslado
4. Verificar   →  /itinerary         (timeline actualizado)
```

Orden lógico: un **evento** necesita un **artista**; la **logística** se asocia a un **evento** concreto.

---

## Artista

| Ruta                 | Acción                                       |
| -------------------- | -------------------------------------------- |
| `/artists`           | Listado (lectura: cualquier rol autenticado) |
| `/artists/new`       | Crear (solo ADMIN)                           |
| `/artists/[id]/edit` | Editar (solo ADMIN)                          |

También accesible desde **Eventos → Artistas**.

### Campos

| Campo      | Obligatorio | Reglas             | Ejemplo      |
| ---------- | :---------: | ------------------ | ------------ |
| **Nombre** |     Sí      | 1–120 caracteres   | `Los Velvet` |
| **Género** |     No      | Máx. 80 caracteres | `Indie rock` |

Tras guardar → redirect a `/artists` y `revalidatePath` en listados relacionados.

---

## Evento

| Ruta                | Acción                            |
| ------------------- | --------------------------------- |
| `/events`           | Listado; tap en tarjeta → detalle |
| `/events/new`       | Crear (solo ADMIN)                |
| `/events/[id]`      | Detalle + logística del evento    |
| `/events/[id]/edit` | Editar (solo ADMIN)               |

### Campos

| Campo            | Obligatorio | Reglas                                                           | Ejemplo             |
| ---------------- | :---------: | ---------------------------------------------------------------- | ------------------- |
| **Título**       |     Sí      | 1–200 caracteres                                                 | `Gira Norte — CDMX` |
| **Fecha y hora** |     Sí      | Selector `datetime-local`; zona horaria local del dispositivo    | Show 21:00          |
| **Venue**        |     Sí      | 1–200 caracteres                                                 | `Foro Sol`          |
| **Ciudad**       |     Sí      | 1–100 caracteres                                                 | `Ciudad de México`  |
| **Artista**      |     Sí      | Debe existir en BD; crear artista primero si la lista está vacía | `Los Velvet`        |

Tras guardar → redirect a `/events`. El evento aparece en `/itinerary` en la fecha indicada.

---

## Logística (por evento)

Desde **detalle del evento** (`/events/[id]`), botones ADMIN:

| Botón    | Ruta                                  | Tipo       |
| -------- | ------------------------------------- | ---------- |
| Vuelo    | `/events/[id]/logistics/flight/new`   | `FLIGHT`   |
| Hotel    | `/events/[id]/logistics/hotel/new`    | `HOTEL`    |
| Traslado | `/events/[id]/logistics/transfer/new` | `TRANSFER` |

Campos comunes a los tres tipos:

| Campo              | Obligatorio | Reglas                                                  |
| ------------------ | :---------: | ------------------------------------------------------- |
| **Hora de inicio** |     Sí      | `datetime-local` — cuándo ocurre o inicia el tramo      |
| **Estado**         |     Sí      | `Pendiente` · `Confirmado` · `Completado` · `Cancelado` |

### Vuelo (`FLIGHT`)

| Campo           | Obligatorio | Ejemplo seed                |
| --------------- | :---------: | --------------------------- |
| Aerolínea       |     Sí      | `Aeroméxico`                |
| Número de vuelo |     Sí      | `AM 0152`                   |
| Origen          |     Sí      | `MTY` (IATA o texto libre)  |
| Destino         |     Sí      | `MEX`                       |
| Nota            |     No      | `Llegada T2 — crew y banda` |

### Hotel (`HOTEL`)

| Campo     | Obligatorio | Ejemplo seed                |
| --------- | :---------: | --------------------------- |
| Hotel     |     Sí      | `Hotel Histórico Centro`    |
| Dirección |     Sí      | `Av. Juárez 14, Cuauhtémoc` |
| Check-in  |     Sí      | Fecha `YYYY-MM-DD`          |
| Check-out |     Sí      | Fecha `YYYY-MM-DD`          |

### Traslado (`TRANSFER`)

| Campo    | Obligatorio | Ejemplo seed             |
| -------- | :---------: | ------------------------ |
| Origen   |     Sí      | `AICM Terminal 2`        |
| Destino  |     Sí      | `Hotel Histórico Centro` |
| Vehículo |     Sí      | `Van 12 pax`             |

Tras guardar → redirect al detalle del evento (`/events/[id]`) y `revalidatePath` en `/itinerary`.

### Editar logística

En el detalle del evento, cada ítem tiene **Editar** (solo ADMIN):

| Tipo     | Ruta de edición                                      |
| -------- | ---------------------------------------------------- |
| Vuelo    | `/events/[id]/logistics/flight/[logisticsId]/edit`   |
| Hotel    | `/events/[id]/logistics/hotel/[logisticsId]/edit`    |
| Traslado | `/events/[id]/logistics/transfer/[logisticsId]/edit` |

Mismos campos que al crear; el formulario viene precargado. Guardar → `updateLogistics` → redirect al detalle del evento.

---

## Validación y errores

- Validación **client** (Zod) antes de enviar + **server** en la Server Action.
- Errores se muestran en español bajo el formulario (banner rojo).
- Campos obligatorios vacíos → mensaje específico (ej. «El nombre es obligatorio»).
- Sin permisos → «Solo administradores pueden crear o editar datos de la gira».

---

## Referencia técnica

| Área           | Ubicación                                           |
| -------------- | --------------------------------------------------- |
| Schemas Zod    | `lib/schemas/artist.ts`, `event.ts`, `logistics/`   |
| Server Actions | `app/actions/artist.ts`, `event.ts`, `logistics.ts` |
| Formularios UI | `components/admin/`                                 |
| Spec OpenSpec  | `openspec/specs/admin-crud/spec.md`                 |

Schemas y mensajes de error deben mantenerse alineados con esta guía.
