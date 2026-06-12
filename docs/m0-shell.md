# M0 · Shell

Mini-MVP del shell desplegable de RoadieFlow. Objetivo: demo con navegación móvil en Vercel preview.

**Lista ClickUp:** [M0 · Shell](https://app.clickup.com/90141292540/v/li/901416802076)

## Fases de implementación

| Fase | Tarea ClickUp                                                                | Estado       |
| ---- | ---------------------------------------------------------------------------- | ------------ |
| 1    | [Bootstrap Next.js + TypeScript strict](https://app.clickup.com/t/86ba56gau) | ✅ Hecho     |
| 2    | [Tailwind CSS + shadcn/ui](https://app.clickup.com/t/86ba56gaq)              | ✅ Hecho     |
| 3    | [ESLint + Prettier + lint en PR](https://app.clickup.com/t/86ba56gar)        | ✅ Hecho     |
| 4    | [Layout móvil + bottom navigation](https://app.clickup.com/t/86ba56gat)      | ⏳ Pendiente |
| 5    | [Vercel preview + variables de entorno](https://app.clickup.com/t/86ba56gap) | ⏳ Pendiente |

## Fase 1 — Bootstrap ✅

- Next.js 16 App Router + React 19
- TypeScript `strict`
- Yarn 4 via Corepack
- README y metadata RoadieFlow

## Fase 2 — Design system ✅

- shadcn/ui (`base-nova`)
- Componentes: Button, Card, Input
- Tokens CSS RoadieFlow
- Layout mobile-first (viewport, themeColor)

## Fase 3 — Calidad de código ✅

- ESLint flat config + `eslint-config-prettier`
- Husky pre-commit con ESLint + Prettier
- GitHub Action (`.github/workflows/ci.yml`) en PR
- Documentación en `docs/code-quality.md`

## Fase 4 — Bottom navigation ⏳

Rutas placeholder:

| Ruta         | Propósito  |
| ------------ | ---------- |
| `/`          | Home       |
| `/itinerary` | Itinerario |
| `/events`    | Eventos    |
| `/profile`   | Perfil     |

Criterios: bottom nav persistente, touch targets ≥ 44px, sin scroll horizontal en 375px.

## Fase 5 — Deploy ⏳

- Conectar repo a Vercel
- Preview automático por PR
- `.env.example` documentado

## Dependencias entre fases

```
Fase 1 ──► Fase 2 ──► Fase 4 ──► Fase 5
   │
   └──► Fase 3 ────────────────► Fase 5
```
