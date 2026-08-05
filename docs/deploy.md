# Deploy y preview (Vercel)

CI/CD: cada PR genera preview en Vercel con Postgres gestionado (Neon).

## 1. Postgres en Vercel (una sola vez)

Recomendado: **Neon Postgres** desde el marketplace de Vercel. Crea la DB, inyecta `DATABASE_URL` y factura en la misma cuenta.

1. Abre [vercel.com/marketplace/neon](https://vercel.com/marketplace/neon) → **Install**.
2. Elige **Create New Neon Account**, región cercana (ej. `iad1`) y plan Free.
3. En **Storage → tu DB → Connect Project**, conecta `roadieflow-app`.
4. Marca entornos: **Preview** y **Production** (Development opcional).
5. En **Advanced Options → Deployments Configuration**, activa **Preview** (rama DB por preview) y **Resource must be active before deployment**.

Neon inyecta automáticamente:

| Variable                | Uso                                   |
| ----------------------- | ------------------------------------- |
| `DATABASE_URL`          | Pool (runtime de la app)              |
| `DATABASE_URL_UNPOOLED` | Conexión directa (migraciones Prisma) |

## 2. Variables manuales en Vercel

**Project → Settings → Environment Variables** (Preview + Production):

| Variable              | Valor                     | Notas                    |
| --------------------- | ------------------------- | ------------------------ |
| `AUTH_SECRET`         | `openssl rand -base64 32` | Obligatorio para Auth.js |
| `SEED_ADMIN_EMAIL`    | `admin@roadie.local`      | Login en preview         |
| `SEED_ADMIN_PASSWORD` | contraseña demo           | Login en preview         |

No copies `DATABASE_URL` de `.env.local` (apunta a Docker local). Neon la gestiona.

## 3. Qué hace el repo en cada deploy

El script `vercel-build` (detectado automáticamente por Vercel):

```bash
prisma migrate deploy && tsx prisma/bootstrap-preview.ts && next build
```

1. **migrate deploy** — aplica migraciones al branch de Neon del deploy.
2. **bootstrap-preview** — en preview (no production): crea tour demo + admin si faltan.
3. **next build** — compila la app.

Tras conectar Neon y añadir las 3 vars manuales, los deploys de PR deberían pasar sin pasos extra.

## 4. Conectar el repo (referencia M0)

1. [vercel.com/new](https://vercel.com/new) → importa `roadieflow-app`
2. Framework: **Next.js**
3. Install: `corepack enable && yarn install --immutable`
4. Build: dejar default — `vercel.json` fuerza `yarn vercel-build` (migrate + bootstrap + build)

## Preview por PR

Vercel crea URL de preview en cada PR. Con Neon Preview Branching, cada preview tiene su propia DB aislada con schema + datos demo listos.

Login en preview: credenciales de `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.

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
- Secret `CLICKUP_API_TOKEN` en **Settings → Secrets and variables → Actions**.
- **Settings → General → Pull Requests → Automatically delete head branches**.

## Verificación

- [ ] Neon conectado al proyecto Vercel
- [ ] `AUTH_SECRET` + credenciales admin en Preview
- [ ] PR abre preview con build verde
- [ ] Login en preview → `/itinerary` con datos demo
- [ ] GitHub Actions: lint + e2e pasan

## Documentación relacionada

- [Setup local](./setup.md)
- [Calidad de código](./code-quality.md)
