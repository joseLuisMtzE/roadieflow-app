# RoadieFlow

App móvil para roadies — shell desplegable del milestone M0 (Meta de crecimiento).

## Inicio rápido

```bash
corepack enable
yarn install
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Documentación

Toda la documentación del proyecto está en **[docs/](./docs/README.md)**:

- [AGENTS.md](./AGENTS.md) — guía para agentes de IA
- [DESIGN.md](./DESIGN.md) — principios de diseño y tokens
- [OpenSpec](./docs/openspec.md) — spec-driven development
- [Setup local](./docs/setup.md)
- [Arquitectura](./docs/architecture.md)
- [Design system](./docs/design-system.md)
- [Navegación móvil](./docs/navigation.md)
- [Deploy (Vercel)](./docs/deploy.md)
- [Calidad de código](./docs/code-quality.md)
- [M0 · Shell — roadmap](./docs/m0-shell.md)

## Scripts

| Comando             | Descripción            |
| ------------------- | ---------------------- |
| `yarn dev`          | Servidor de desarrollo |
| `yarn build`        | Build de producción    |
| `yarn lint`         | ESLint                 |
| `yarn format`       | Prettier (formatear)   |
| `yarn format:check` | Prettier (verificar)   |
