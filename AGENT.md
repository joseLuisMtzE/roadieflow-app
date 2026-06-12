# AGENT.md — RoadieFlow

Guía para agentes de IA que trabajan en **roadie-flow-app**.

> `AGENTS.md` y `CLAUDE.md` apuntan aquí. Mantén este archivo como fuente de verdad.

## Proyecto

- **Producto:** RoadieFlow — app móvil para roadies (Meta de crecimiento / Reservamos).
- **Milestone actual:** M0 · Shell — navegación móvil desplegable.
- **Idioma UI:** español (`lang="es"`).
- **Docs humanas:** [`docs/`](./docs/README.md) · **Diseño:** [`DESIGN.md`](./DESIGN.md)

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
  globals.css         # Tokens RoadieFlow + Tailwind
  (shell)/            # Rutas core con bottom nav
    layout.tsx
    page.tsx          # /
    itinerary/ events/ profile/
components/
  bottom-nav.tsx      # Client Component — navegación inferior
  ui/                 # shadcn/ui (Button, Card, Input…)
lib/utils.ts          # cn()
docs/                 # Documentación extendida
```

- Código en **raíz** (`app/`), no en `src/` (decisión M0).
- Alias de imports: `@/*` → raíz del repo.

## Comandos

```bash
corepack enable
yarn install
yarn dev              # http://localhost:3000
yarn build
yarn lint             # ESLint
yarn lint:fix
yarn format           # Prettier
yarn format:check     # Usado en CI
```

Añadir componente shadcn:

```bash
yarn dlx shadcn@latest add <nombre> -y
```

Config en [`components.json`](./components.json).

## Patrones y convenciones

### App Router

- Server Components por defecto; `"use client"` solo cuando haga falta (hooks, eventos, `usePathname`).
- Metadata y `viewport` en `app/layout.tsx`.
- Rutas core van bajo `app/(shell)/` para heredar bottom nav.

### Componentes UI

- Usar shadcn en `components/ui/` — no reinventar primitivos.
- Componer con tokens semánticos: `bg-primary`, `text-muted-foreground`, etc.
- Iconos: **Lucide React** (`lucide-react`).

### Estilos

- Mobile-first; contenedor típico `max-w-md` (~375px).
- Touch targets mínimo **44×44px** en controles interactivos (`min-h-11 min-w-11`).
- Safe area iOS: `env(safe-area-inset-bottom)`.
- Evitar scroll horizontal: `overflow-x-hidden` en shell.

### TypeScript

- Modo `strict` — no usar `any` sin justificación.
- Props tipadas; preferir tipos de React (`React.ComponentProps<"div">`).

### Calidad de código

- Pre-commit: Husky + lint-staged (ESLint + Prettier).
- CI: `.github/workflows/ci.yml` — lint, format check, build.
- Ejecuta `yarn lint && yarn format:check && yarn build` antes de dar por terminado un cambio grande.

## Restricciones

- **No** cambiar gestor de paquetes (mantener Yarn 4).
- **No** migrar a `src/` sin acuerdo explícito.
- **No** hardcodear colores hex/rgb — usar tokens CSS / clases semánticas (ver `DESIGN.md`).
- **No** commitear `.env.local` ni secrets.
- **No** crear commits ni push sin que el usuario lo pida.
- Cambios mínimos y enfocados — no refactorizar código no relacionado.

## Referencias

| Recurso                 | Ubicación                                          |
| ----------------------- | -------------------------------------------------- |
| Setup local             | [`docs/setup.md`](./docs/setup.md)                 |
| Arquitectura            | [`docs/architecture.md`](./docs/architecture.md)   |
| Design system (detalle) | [`docs/design-system.md`](./docs/design-system.md) |
| Navegación móvil        | [`docs/navigation.md`](./docs/navigation.md)       |
| Deploy / Vercel         | [`docs/deploy.md`](./docs/deploy.md)               |
| shadcn config           | [`components.json`](./components.json)             |
| Tokens CSS              | [`app/globals.css`](./app/globals.css)             |
