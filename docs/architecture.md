# Arquitectura

## Stack

| Capa        | Tecnología                     | Versión |
| ----------- | ------------------------------ | ------- |
| Framework   | Next.js (App Router)           | 16      |
| UI          | React                          | 19      |
| Lenguaje    | TypeScript (`strict`)          | 5       |
| Estilos     | Tailwind CSS                   | 4       |
| Componentes | shadcn/ui (preset `base-nova`) | 4       |
| Paquetes    | Yarn + Corepack                | 4.9.2   |

## Estructura de carpetas

```
roadie-flow-app/
├── app/                 # App Router: layouts, páginas, estilos globales
│   ├── layout.tsx       # Root layout (metadata, viewport, fuentes)
│   ├── globals.css      # Tailwind + tokens RoadieFlow
│   └── (shell)/         # Rutas core con bottom nav
│       ├── layout.tsx
│       ├── page.tsx     # Home (/)
│       ├── itinerary/
│       ├── events/
│       └── profile/
├── components/
│   ├── bottom-nav.tsx   # Navegación inferior (client)
│   └── ui/              # Componentes shadcn/ui
├── lib/
│   └── utils.ts         # Utilidad `cn()` (clsx + tailwind-merge)
├── docs/                # Documentación del proyecto
├── public/              # Assets estáticos
├── .husky/              # Git hooks (pre-commit)
└── .github/workflows/   # CI (lint + format en PR)
```

## Convenciones

### App Router

- Rutas como carpetas en `app/(shell)/` (ej. `app/(shell)/itinerary/page.tsx` → `/itinerary`)
- Layouts compartidos en `app/layout.tsx` o layouts anidados por segmento
- Metadata y viewport exportados desde layouts (`Metadata`, `Viewport`)

### Imports

Alias `@/*` configurado en `tsconfig.json`:

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Layout del código

El código vive en la **raíz del repo** (`app/`, no `src/app/`) para mantener el bootstrap simple en M0. Si el proyecto crece, se puede evaluar migrar a `src/`.

### Mobile-first

- Viewport `device-width` en el root layout
- Contenedores con `max-w-md` para simular ancho móvil (~375px)
- Touch targets mínimo 44px (aplicado en Fase 4 — bottom nav)

## Configuración clave

| Archivo               | Propósito                           |
| --------------------- | ----------------------------------- |
| `next.config.ts`      | Configuración Next.js               |
| `tsconfig.json`       | TypeScript strict + paths           |
| `eslint.config.mjs`   | ESLint flat config                  |
| `prettier.config.mjs` | Formato de código                   |
| `components.json`     | Configuración shadcn/ui             |
| `.yarnrc.yml`         | Yarn 4 (`nodeLinker: node-modules`) |
