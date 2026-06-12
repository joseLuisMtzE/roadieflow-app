# Design system

> **Fuente de verdad:** [`DESIGN.md`](../DESIGN.md) — sistema **Tactical Elegance**  
> Tokens en código: [`app/globals.css`](../app/globals.css)  
> Config shadcn: [`components.json`](../components.json)

RoadieFlow usa **shadcn/ui** (`base-nova`) sobre **Tailwind CSS 4** con tokens **Tactical Elegance** (dark editorial por defecto).

## shadcn/ui

- **Preset:** `base-nova` (Base UI + estilo Nova)
- **Config:** `components.json`
- **Estilo:** CSS variables (`cssVariables: true`)
- **Iconos:** Lucide React

### Añadir componentes

```bash
yarn dlx shadcn@latest add <componente> -y
```

### Componentes instalados (M0)

| Componente | Ruta                       | Notas Tactical Elegance        |
| ---------- | -------------------------- | ------------------------------ |
| Button     | `components/ui/button.tsx` | Pill, gradient primary, glass  |
| Card       | `components/ui/card.tsx`   | `rounded-3xl`, sin ring/border |
| Input      | `components/ui/input.tsx`  | Recessed well, ghost border    |

## Tokens Tactical Elegance

Definidos en `app/globals.css` (ver YAML en `DESIGN.md`).

### Superficies

| Token CSS                    | Hex       | Uso                |
| ---------------------------- | --------- | ------------------ |
| `--surface` / `--background` | `#131313` | Base de la app     |
| `--surface-container-lowest` | `#0e0e0e` | Inputs recessed    |
| `--surface-container-low`    | `#1c1b1b` | Secciones, muted   |
| `--surface-container`        | `#201f1f` | Áreas de contenido |
| `--surface-container-high`   | `#2a2a2a` | Cards (`--card`)   |
| `--surface-bright`           | `#3a3939` | Glass overlays     |

### Marca y texto

| Token CSS                                     | Hex       | Uso shadcn             |
| --------------------------------------------- | --------- | ---------------------- |
| `--primary`                                   | `#e3e3db` | CTA, nav activo        |
| `--primary-foreground`                        | `#2f312b` | Texto sobre primary    |
| `--on-surface` / `--foreground`               | `#e5e2e1` | Texto principal        |
| `--on-surface-variant` / `--muted-foreground` | `#c7c7bf` | Texto secundario       |
| `--outline-variant`                           | `#464741` | Ghost borders (15–40%) |

### Ghost borders

No usar bordes sólidos 1px. Usar:

```css
box-shadow: inset 0 0 0 1px var(--ghost-border); /* 15% */
box-shadow: inset 0 0 0 1px var(--ghost-border-focus); /* 40% focus */
```

## Tipografía

| Capa      | Fuente          | Variable                 | Clase utilidad                                 |
| --------- | --------------- | ------------------------ | ---------------------------------------------- |
| Editorial | Space Grotesk   | `--font-space-grotesk`   | `font-heading`, `.text-headline-mobile`        |
| Funcional | Inter           | `--font-inter`           | `font-sans`, `.text-body-md`, `.text-title-lg` |
| Técnica   | Share Tech Mono | `--font-share-tech-mono` | `font-mono`, `.text-label-md`                  |

Cargadas en `app/layout.tsx` vía `next/font/google`.

## Utilidades CSS

| Clase                   | Propósito                          |
| ----------------------- | ---------------------------------- |
| `.editorial-offset`     | Margen izquierdo 2rem en headlines |
| `.glass-nav`            | Bottom nav con blur                |
| `.glass-surface`        | Botón secondary glass              |
| `.ambient-shadow`       | Sombra difusa flotante             |
| `.btn-primary-gradient` | Gradiente CTA primary              |

## Ejemplo de uso

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";

<PageHeader title="Itinerario" description="Próximamente." />

<Card className="editorial-offset mr-6 border-t-2 border-[var(--primary)] ambient-shadow">
  <CardHeader>
    <CardTitle>Próximo set</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <Input placeholder="Buscar…" />
    <Button className="w-full" size="lg">Continuar</Button>
  </CardContent>
</Card>
```
