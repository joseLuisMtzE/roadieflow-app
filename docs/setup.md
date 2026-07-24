# Setup local

## Requisitos

- **Node.js 20+**
- **Corepack** habilitado (incluido en Node 16.10+)
- **Git**

## Instalación

```bash
# Solo la primera vez en tu máquina
corepack enable

# Clonar e instalar
git clone <repo-url>
cd roadie-flow-app
yarn install
```

Yarn 4 se activa automáticamente gracias al campo `packageManager` en `package.json` (`yarn@4.9.2`).

## Desarrollo

```bash
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Comando             | Descripción                                           |
| ------------------- | ----------------------------------------------------- |
| `yarn dev`          | Servidor de desarrollo (Next.js + Turbopack)          |
| `yarn build`        | Build de producción                                   |
| `yarn start`        | Servidor de producción (requiere `yarn build` previo) |
| `yarn lint`         | ESLint sobre todo el proyecto                         |
| `yarn lint:fix`     | ESLint con auto-fix                                   |
| `yarn format`       | Prettier — formatea archivos                          |
| `yarn format:check` | Prettier — verifica formato sin modificar             |

## Base de datos (M1+)

Requiere Postgres local y `.env.local` (copia desde `.env.example`).

| Variable              | Requerida | Descripción                         |
| --------------------- | --------- | ----------------------------------- |
| `DATABASE_URL`        | Sí        | Conexión PostgreSQL para Prisma     |
| `SEED_DEMO_DATA`      | Para seed | Debe ser `true` para `yarn db:seed` |
| `NEXT_PUBLIC_APP_URL` | No        | URL pública (preview/prod)          |

```bash
cp .env.example .env.local
yarn db:up
yarn db:migrate
yarn db:seed
yarn db:ping
```

Tras cambios en `schema.prisma`: `yarn db:generate` y reinicia `yarn dev` (o borra `.next`).

Variables en Vercel: ver [deploy.md](./deploy.md).

## Problemas comunes

### Corepack no reconoce Yarn 4

```bash
corepack enable
corepack prepare yarn@4.9.2 --activate
```

### Dependencias desincronizadas

```bash
rm -rf node_modules .next
yarn install
```

### El pre-commit falla

Husky ejecuta ESLint y Prettier sobre archivos staged. Corrige con:

```bash
yarn lint:fix
yarn format
```
