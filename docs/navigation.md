# Navegación móvil

Shell PWA-ready con bottom navigation persistente en todas las rutas core.

## Rutas

| Ruta         | Página     | Archivo                          |
| ------------ | ---------- | -------------------------------- |
| `/`          | Inicio     | `app/(shell)/page.tsx`           |
| `/itinerary` | Itinerario | `app/(shell)/itinerary/page.tsx` |
| `/events`    | Eventos    | `app/(shell)/events/page.tsx`    |
| `/profile`   | Perfil     | `app/(shell)/profile/page.tsx`   |

Rutas admin (M3, no en bottom nav — ver [Guía CRUD Admin](./admin-crud.md)):

| Ruta                                                                | Página                   |
| ------------------------------------------------------------------- | ------------------------ |
| `/artists`                                                          | Listado de artistas      |
| `/artists/new`, `/artists/[id]/edit`                                | CRUD artista (ADMIN)     |
| `/events/new`, `/events/[id]`, `/events/[id]/edit`                  | CRUD evento (ADMIN)      |
| `/events/[id]/logistics/{flight,hotel,transfer}/new`                | Añadir logística (ADMIN) |
| `/events/[id]/logistics/{flight,hotel,transfer}/[logisticsId]/edit` | Editar logística (ADMIN) |

Las rutas viven bajo el route group `(shell)`, que no afecta la URL.

## Componentes

### `BottomNav`

- **Archivo:** `components/bottom-nav.tsx`
- **Tipo:** Client Component (`usePathname` para estado activo)
- **Posición:** Fixed en la parte inferior
- **Safe area:** `pb-[env(safe-area-inset-bottom)]` para dispositivos con notch

### `(shell)/layout.tsx`

- Contenedor `max-w-md` centrado (viewport móvil ~375px)
- Padding inferior para no tapar contenido con la nav fija
- `overflow-x-hidden` para evitar scroll horizontal

## Touch targets

Cada ítem de navegación cumple el mínimo de **44×44px**:

```tsx
className = "flex min-h-11 min-w-11 ...";
```

## Accesibilidad

- `<nav aria-label="Navegación principal">`
- `aria-current="page"` en el ítem activo
- Iconos con `aria-hidden`; el texto del label es visible

## Añadir una ruta core

1. Crear `app/(shell)/<ruta>/page.tsx`
2. Añadir entrada en `navItems` de `components/bottom-nav.tsx`
3. Actualizar esta documentación
