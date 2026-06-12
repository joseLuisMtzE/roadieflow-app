# Calidad de código

## ESLint

- **Config:** `eslint.config.mjs` (flat config)
- **Extends:** `eslint-config-next` (core-web-vitals + typescript)
- **Integración Prettier:** `eslint-config-prettier` (desactiva reglas conflictivas)

```bash
yarn lint        # Verificar
yarn lint:fix    # Corregir automáticamente
```

## Prettier

- **Config:** `prettier.config.mjs`
- **Ignore:** `.prettierignore`

```bash
yarn format        # Formatear todo
yarn format:check  # Solo verificar (usado en CI)
```

## Pre-commit (Husky + lint-staged)

Al hacer `git commit`, el hook `.husky/pre-commit` ejecuta:

1. **ESLint --fix** en archivos `*.{js,jsx,ts,tsx,mjs}` staged
2. **Prettier --write** en archivos staged (JS/TS, JSON, CSS, MD)

Configuración en `package.json` → `lint-staged`.

Para saltar hooks en casos excepcionales (no recomendado):

```bash
HUSKY=0 git commit -m "mensaje"
```

## CI en pull requests

Workflow: `.github/workflows/ci.yml`

Se ejecuta en cada **pull request** y push a `main`:

1. `yarn install --immutable`
2. `yarn lint`
3. `yarn format:check`

Si cualquier paso falla, el PR queda bloqueado hasta corregir.

## Flujo recomendado

```bash
# Antes de commit
yarn lint:fix
yarn format

# Verificar como lo haría CI
yarn lint && yarn format:check && yarn build
```
