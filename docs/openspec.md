# OpenSpec — Spec-driven development

RoadieFlow usa [OpenSpec](https://openspec.dev/) para alinear specs, diseño e implementación antes de codear.

## Estructura

```
openspec/
├── config.yaml              # Contexto del proyecto + reglas para artifacts
├── specs/                   # Comportamiento actual (source of truth)
│   ├── shell/spec.md
│   ├── itinerary/spec.md
│   └── data/spec.md
└── changes/                 # Cambios propuestos (uno por milestone/feature)
    └── m2-auth-admin/
        ├── proposal.md
        ├── design.md
        ├── tasks.md         # Mapea 1:1 con tareas ClickUp
        └── specs/           # Delta specs (ADDED/MODIFIED/REMOVED)
```

## Comandos en Cursor

Tras reiniciar el IDE (o recargar), usa los slash commands generados:

| Comando         | Uso                                                |
| --------------- | -------------------------------------------------- |
| `/opsx-explore` | Explorar idea antes de planificar                  |
| `/opsx-propose` | Crear change con proposal + specs + design + tasks |
| `/opsx-apply`   | Implementar según `tasks.md`                       |
| `/opsx-sync`    | Sincronizar specs tras cambios manuales            |
| `/opsx-archive` | Archivar change completado (merge a `specs/`)      |

## CLI (local)

```bash
yarn openspec list              # changes activos
yarn openspec list --specs      # specs base
yarn openspec show m2-auth-admin
yarn openspec validate m2-auth-admin
yarn openspec status --change m2-auth-admin
```

## Flujo con ClickUp

1. **ClickUp** — milestone y tareas con criterios de aceptación
2. **OpenSpec** — change con specs formales (GIVEN/WHEN/THEN) y `tasks.md` desglosado
3. **Implementación** — una rama por tarea ClickUp; `/opsx-apply` o agente sigue `tasks.md`
4. **Archive** — al cerrar milestone, `/opsx-archive` actualiza `openspec/specs/`

Cada tarea ClickUp de M2 referencia la sección correspondiente en `openspec/changes/m2-auth-admin/tasks.md`.

## Change activo

**M2 · Auth Admin:** [`openspec/changes/m2-auth-admin/`](./changes/m2-auth-admin/)

- Proposal: por qué auth y qué cambia (itinerary deja de ser público)
- Spec deltas: `auth` (nuevo), `itinerary`, `data` (modificados)
- Tasks: 4 secciones → IDs ClickUp `86ba56ggv`, `86ba56ghr`, `86ba56gjm`, `86ba56gkm`
