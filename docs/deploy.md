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
