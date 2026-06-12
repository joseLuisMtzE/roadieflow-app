# Design system

RoadieFlow usa **shadcn/ui** sobre **Tailwind CSS 4** con tokens de marca propios.

## shadcn/ui

- **Preset:** `base-nova` (Base UI + estilo Nova)
- **Config:** `components.json`
- **Estilo:** CSS variables (`cssVariables: true`)
- **Iconos:** Lucide React

### Añadir componentes

```bash
yarn dlx shadcn@latest add <componente> -y
```

Ejemplo:

```bash
yarn dlx shadcn@latest add badge dialog -y
```

### Componentes instalados (M0)

| Componente | Ruta                       |
| ---------- | -------------------------- |
| Button     | `components/ui/button.tsx` |
| Card       | `components/ui/card.tsx`   |
| Input      | `components/ui/input.tsx`  |

## Tokens RoadieFlow

Definidos en `app/globals.css`. Los tokens de marca se mapean a variables semánticas de shadcn:

| Token de marca                | Uso                         | Valor (light)                            |
| ----------------------------- | --------------------------- | ---------------------------------------- |
| `--roadie-primary`            | Acciones principales, links | `oklch(0.48 0.21 277)` — índigo/violeta  |
| `--roadie-primary-foreground` | Texto sobre primary         | `oklch(0.98 0.01 277)`                   |
| `--roadie-accent`             | Acentos secundarios         | `oklch(0.72 0.17 162)` — verde esmeralda |
| `--roadie-surface`            | Fondo de app                | `oklch(0.985 0.005 277)`                 |

### Mapeo a shadcn

```css
--primary: var(--roadie-primary);
--primary-foreground: var(--roadie-primary-foreground);
--background: var(--roadie-surface);
```

Usa clases semánticas de Tailwind en componentes:

```tsx
<button className="bg-primary text-primary-foreground">Acción</button>
<p className="text-muted-foreground">Texto secundario</p>
```

## Tipografía

- **Sans / heading:** Geist Sans (`--font-geist-sans`)
- **Mono:** Geist Mono (`--font-geist-mono`)
- Cargadas en `app/layout.tsx` vía `next/font/google`

## Tema oscuro

Soporte via clase `.dark` en `<html>`. Tokens dark definidos en `app/globals.css` bajo `.dark { ... }`.

## Radios y espaciado

- `--radius: 0.625rem` (10px base)
- Variantes derivadas: `--radius-sm`, `--radius-md`, `--radius-lg`, etc.

## Ejemplo de uso

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Input placeholder="Buscar…" />
    <Button className="w-full">Continuar</Button>
  </CardContent>
</Card>;
```
