# Deploy y preview (Vercel)

CI/CD básico para M0: cada PR genera un preview deploy en Vercel.

## Conectar el repo

1. Entra a [vercel.com/new](https://vercel.com/new)
2. Importa el repositorio `roadie-flow-app`
3. Framework preset: **Next.js** (detectado automáticamente)
4. Build command: `yarn build` (default)
5. Install command: `corepack enable && yarn install --immutable`

## Preview por PR

Vercel crea una URL de preview automática en cada pull request cuando el repo está conectado. No requiere configuración extra en M0.

El workflow `.github/workflows/ci.yml` corre lint, format check y build en GitHub Actions de forma independiente.

## Sincronización ClickUp ↔ GitHub

El workflow `.github/workflows/clickup-sync.yml` actualiza el estado de la tarea según eventos de Git:

| Evento                                  | Estado ClickUp |
| --------------------------------------- | -------------- |
| `push` a rama `[id]-*` (sin PR abierto) | in progress    |
| PR abierto o actualizado                | review         |
| PR mergeado a `main`                    | Closed         |
| PR cerrado sin merge                    | in progress    |

**Requisitos:**

- Rama con prefijo del ID de tarea ClickUp (ej. `86ba56gcx-docker-compose`).
- Secret `CLICKUP_API_TOKEN` en **Settings → Secrets and variables → Actions** (repository secret).
- **Settings → General → Pull Requests → Automatically delete head branches** para borrar ramas tras merge.

## Variables de entorno

Ver [`.env.example`](../.env.example) en la raíz del repo.

En Vercel: **Project → Settings → Environment Variables**

| Variable              | Preview         | Production        |
| --------------------- | --------------- | ----------------- |
| `NEXT_PUBLIC_APP_URL` | URL del preview | URL de producción |

## Verificación

- [ ] Repo conectado a Vercel
- [ ] PR de prueba abre URL de preview
- [ ] Build pasa en GitHub Actions y en Vercel

## Documentación relacionada

- [Setup local](./setup.md)
- [Calidad de código](./code-quality.md) — CI en PR
