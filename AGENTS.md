# AGENTS.md — RoadieFlow

Guía para agentes de IA que trabajan en **roadie-flow-app**.

> `CLAUDE.md` apunta aquí. Mantén este archivo como fuente de verdad.

## Proyecto

- **Producto:** RoadieFlow — app móvil para roadies (Meta de crecimiento / Reservamos).
- **Milestone actual:** M0 · Shell — navegación móvil desplegable.
- **Idioma UI:** español (`lang="es"`).
- **Design system:** Tactical Elegance — ver [`DESIGN.md`](./DESIGN.md).
- **Docs humanas:** [`docs/`](./docs/README.md)

## Stack

| Capa      | Tecnología                        |
| --------- | --------------------------------- |
| Framework | Next.js 16 App Router             |
| UI        | React 19, shadcn/ui (`base-nova`) |
| Estilos   | Tailwind CSS 4                    |
| Lenguaje  | TypeScript `strict`               |
| Paquetes  | Yarn 4.9.2 (Corepack)             |

## Next.js — reglas críticas

<!-- BEGIN:nextjs-agent-rules -->

**This is NOT the Next.js you know.** APIs, convenciones y estructura pueden diferir de tu training data. Lee la guía relevante en `node_modules/next/dist/docs/` antes de escribir código. Respeta avisos de deprecación.

<!-- END:nextjs-agent-rules -->

## Estructura del repo

```
app/
  layout.tsx          # Root: metadata, viewport, fuentes
  globals.css         # Tokens Tactical Elegance + Tailwind
  (shell)/            # Rutas core con bottom nav
components/
  bottom-nav.tsx      # Client — navegación glass
  page-header.tsx     # Títulos con offset editorial
  ui/                 # shadcn/ui (Button, Card, Input…)
lib/utils.ts
docs/
```

- Código en **raíz** (`app/`), no en `src/` (decisión M0).
- Alias de imports: `@/*` → raíz del repo.

## Comandos

```bash
corepack enable
yarn install
yarn dev
yarn build
yarn lint && yarn format:check
```

Añadir componente shadcn: `yarn dlx shadcn@latest add <nombre> -y`

## Patrones y convenciones

### Diseño (Tactical Elegance)

- Tema **dark editorial** por defecto (`#131313` background).
- **No-Line Rule:** no bordes 1px sólidos — usar ghost borders, tonal shifts, glass.
- Tipografía: **Space Grotesk** (headlines), **Inter** (body), **Share Tech Mono** (labels).
- Utilidades: `.text-headline-mobile`, `.editorial-offset`, `.glass-nav`, `.btn-primary-gradient`.
- Ver checklist completo en `DESIGN.md` sección 7.

### App Router

- Server Components por defecto; `"use client"` solo para hooks/eventos.
- Rutas core bajo `app/(shell)/` para heredar bottom nav.

### Componentes UI

- shadcn en `components/ui/` — extender variantes, no reinventar.
- Tokens semánticos: `bg-primary`, `text-muted-foreground`, etc.
- Iconos: **Lucide React**.

### Estilos

- Mobile-first; `max-w-md` (~375px).
- Touch targets ≥ **44×44px** (`min-h-11 min-w-11`).
- Safe area: `env(safe-area-inset-bottom)`.

### Git y ramas

**Una rama por tarea** de ClickUp. No trabajar directo en `main`.

**Nomenclatura:** `[id]-titulo-de-tarea-corto`

- `[id]` — ID de la tarea en ClickUp (ej. `86ba56gap`)
- `titulo-de-tarea-corto` — slug breve del título: minúsculas, kebab-case, sin acentos ni caracteres especiales

Ejemplos:

| Tarea ClickUp                         | Rama                        |
| ------------------------------------- | --------------------------- |
| Vercel preview + variables de entorno | `86ba56gap-vercel-preview`  |
| Layout móvil + bottom navigation      | `86ba56gat-bottom-nav`      |
| ESLint + Prettier + lint en PR        | `86ba56gar-eslint-prettier` |

**Flujo (por tarea ClickUp):**

1. `git checkout main && git pull`
2. `git checkout -b [id]-titulo-de-tarea-corto`
3. Marcar tarea **in progress** en ClickUp (o primer `push` a la rama) → implementar → **esperar aprobación del usuario**
4. **Commit** solo tras aprobación explícita
5. **PR** solo cuando el usuario lo pida (`git push` + PR hacia `main`) — el workflow `clickup-sync.yml` pasa la tarea a **review**
6. Merge tras aprobación en GitHub — `clickup-sync.yml` pasa la tarea a **Closed**; activar **Automatically delete head branches** en GitHub para borrar la rama remota

> Regla Cursor: `.cursor/rules/clickup-task-workflow.mdc` (`alwaysApply: true`).

## Restricciones

- **No** cambiar gestor de paquetes (Yarn 4).
- **No** migrar a `src/` sin acuerdo.
- **No** hardcodear colores — usar tokens CSS (ver `DESIGN.md` / `globals.css`).
- **No** commits, push ni PR sin aprobación/petición explícita del usuario (ver flujo ClickUp arriba).
- **No** marcar tareas ClickUp como review/Closed manualmente (automatizado por `clickup-sync.yml`).
- Cambios mínimos y enfocados.

## Referencias

| Recurso       | Ubicación                                          |
| ------------- | -------------------------------------------------- |
| Diseño        | [`DESIGN.md`](./DESIGN.md)                         |
| Design system | [`docs/design-system.md`](./docs/design-system.md) |
| Navegación    | [`docs/navigation.md`](./docs/navigation.md)       |
| Tokens CSS    | [`app/globals.css`](./app/globals.css)             |
| shadcn config | [`components.json`](./components.json)             |
