# DESIGN.md — RoadieFlow

Principios de diseño, tokens y criterios visuales/UX para **roadie-flow-app**.

> Detalle técnico del design system: [`docs/design-system.md`](./docs/design-system.md)  
> Config shadcn: [`components.json`](./components.json)  
> Tokens en código: [`app/globals.css`](./app/globals.css)

## Principios

1. **Mobile-first** — diseñar para 375px; desktop es secundario en M0.
2. **Claridad en ruta** — el roadie necesita orientarse rápido entre itinerario, eventos y perfil.
3. **Touch-friendly** — targets ≥ 44px; sin gestos ocultos en M0.
4. **Consistencia** — shadcn/ui + tokens semánticos; no estilos ad hoc.
5. **Español** — copy, labels y estados en español.

## Paleta de marca

Tokens RoadieFlow (light mode):

| Token                         | Rol                 | Valor OKLCH              | Uso en Tailwind              |
| ----------------------------- | ------------------- | ------------------------ | ---------------------------- |
| `--roadie-primary`            | Marca / CTA         | `oklch(0.48 0.21 277)`   | `bg-primary`, `text-primary` |
| `--roadie-primary-foreground` | Texto sobre primary | `oklch(0.98 0.01 277)`   | `text-primary-foreground`    |
| `--roadie-accent`             | Acento secundario   | `oklch(0.72 0.17 162)`   | `--accent` → highlights      |
| `--roadie-surface`            | Fondo de app        | `oklch(0.985 0.005 277)` | `bg-background`              |

**Regla:** no usar colores literales (`#`, `rgb()`) en componentes — solo tokens o clases semánticas de shadcn.

### Semánticos shadcn (usar estos en UI)

| Clase                                    | Cuándo                        |
| ---------------------------------------- | ----------------------------- |
| `bg-background` / `text-foreground`      | Superficie base               |
| `bg-card` / `text-card-foreground`       | Tarjetas                      |
| `bg-primary` / `text-primary-foreground` | Acción principal              |
| `text-muted-foreground`                  | Texto secundario, hints       |
| `border-border`                          | Bordes                        |
| `bg-destructive`                         | Errores / acciones peligrosas |

## Tipografía

| Rol         | Fuente     | Variable            |
| ----------- | ---------- | ------------------- |
| Sans / body | Geist Sans | `--font-geist-sans` |
| Heading     | Geist Sans | `font-heading`      |
| Mono        | Geist Mono | `--font-geist-mono` |

Escala típica en M0:

- Título de página: `text-2xl font-semibold font-heading`
- Subtítulo / descripción: `text-sm text-muted-foreground`
- Cuerpo en cards: `text-sm` (default shadcn)

## Espaciado y radios

- **Radius base:** `--radius: 0.625rem` (10px)
- **Padding de página:** `p-4`
- **Gap entre bloques:** `gap-4` / `gap-6`
- **Ancho máximo shell:** `max-w-md` centrado

## Componentes UI (M0)

Instalados vía shadcn (`style: base-nova`):

| Componente | Cuándo usar                                                                            |
| ---------- | -------------------------------------------------------------------------------------- |
| **Button** | Acciones primarias/secundarias. Variants: `default`, `outline`, `ghost`, `destructive` |
| **Card**   | Agrupar contenido (listados, resúmenes, forms)                                         |
| **Input**  | Campos de texto, búsqueda                                                              |

Añadir nuevos:

```bash
yarn dlx shadcn@latest add <componente> -y
```

## Navegación (shell M0)

Bottom nav persistente en rutas core:

| Ruta         | Label      |
| ------------ | ---------- |
| `/`          | Inicio     |
| `/itinerary` | Itinerario |
| `/events`    | Eventos    |
| `/profile`   | Perfil     |

- Ítem activo: `text-primary` + `aria-current="page"`
- Ítem inactivo: `text-muted-foreground`
- Ver [`docs/navigation.md`](./docs/navigation.md)

## Criterios UX (checklist)

Antes de dar por buena una pantalla nueva:

- [ ] Se ve bien en viewport **375px** sin scroll horizontal
- [ ] Controles táctiles ≥ **44px**
- [ ] Contraste legible (texto principal vs fondo)
- [ ] Bottom nav visible si es ruta core
- [ ] Copy en español
- [ ] Usa componentes de `components/ui/` antes de crear custom
- [ ] Respeta safe area en dispositivos con notch

## Tema oscuro

Activar con clase `.dark` en `<html>`. Tokens dark ya definidos en `app/globals.css`. Preferir tokens semánticos para que el dark mode funcione sin overrides manuales.

## Anti-patterns

- Estilos inline de color
- Botones nativos `<button>` sin shadcn cuando hay variant disponible
- Layouts desktop-first con breakpoints innecesarios en M0
- Iconos de librerías distintas a Lucide
- Texto en inglés en la UI
