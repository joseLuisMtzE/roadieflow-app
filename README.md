# RoadieFlow

App móvil para roadies — shell desplegable del milestone M0 (Meta de crecimiento).

## Requisitos

- Node.js 20+
- [Corepack](https://nodejs.org/api/corepack.html) habilitado (incluido en Node 16.10+)

## Setup local

```bash
# Habilitar Corepack (solo la primera vez en tu máquina)
corepack enable

# Instalar dependencias
yarn install

# Servidor de desarrollo
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando       | Descripción                          |
|---------------|--------------------------------------|
| `yarn dev`    | Servidor de desarrollo (Next.js)     |
| `yarn build`  | Build de producción                  |
| `yarn start`  | Servidor de producción               |
| `yarn lint`   | ESLint sobre todo el proyecto        |
| `yarn lint:fix` | ESLint con auto-fix                |

## Stack

- **Next.js 16** — App Router
- **React 19** — UI
- **TypeScript** — modo `strict`
- **Tailwind CSS 4** — estilos
- **shadcn/ui** — componentes (Button, Card, Input)
- **Yarn 4** — gestor de paquetes (vía `packageManager` en `package.json`)

## Estructura

```
app/              # App Router (páginas y layouts)
components/ui/    # Componentes shadcn/ui
lib/              # Utilidades compartidas
public/           # Assets estáticos
```

> El código vive en la raíz del repo (`app/`), no en `src/`, para mantener el bootstrap simple en M0.

## Calidad de código

- ESLint con flat config (`eslint.config.mjs`)
- Husky + lint-staged ejecutan lint en cada pre-commit
