---
name: Tactical Elegance
colors:
  surface: "#131313"
  surface-dim: "#131313"
  surface-bright: "#3a3939"
  surface-container-lowest: "#0e0e0e"
  surface-container-low: "#1c1b1b"
  surface-container: "#201f1f"
  surface-container-high: "#2a2a2a"
  surface-container-highest: "#353534"
  on-surface: "#e5e2e1"
  on-surface-variant: "#c7c7bf"
  inverse-surface: "#e5e2e1"
  inverse-on-surface: "#313030"
  outline: "#91918a"
  outline-variant: "#464741"
  surface-tint: "#c7c7bf"
  primary: "#e3e3db"
  on-primary: "#2f312b"
  primary-container: "#c7c7bf"
  on-primary-container: "#52534d"
  inverse-primary: "#5e5f58"
  secondary: "#c8c6c5"
  on-secondary: "#313030"
  secondary-container: "#4a4949"
  on-secondary-container: "#bab8b7"
  tertiary: "#ffdbd3"
  on-tertiary: "#5f1504"
  tertiary-container: "#ffb5a3"
  on-tertiary-container: "#8e3722"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#e3e3da"
  primary-fixed-dim: "#c7c7bf"
  on-primary-fixed: "#1b1c17"
  on-primary-fixed-variant: "#464741"
  secondary-fixed: "#e5e2e1"
  secondary-fixed-dim: "#c8c6c5"
  on-secondary-fixed: "#1c1b1b"
  on-secondary-fixed-variant: "#474646"
  tertiary-fixed: "#ffdad2"
  tertiary-fixed-dim: "#ffb4a3"
  on-tertiary-fixed: "#3d0700"
  on-tertiary-fixed-variant: "#7e2b17"
  background: "#131313"
  on-background: "#e5e2e1"
  surface-variant: "#353534"
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: "500"
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-lg:
    fontFamily: Share Tech Mono
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 20px
  label-md:
    fontFamily: Share Tech Mono
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: "600"
    lineHeight: 36px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 64px
  gutter: 12px
  margin-mobile: 24px
  editorial-offset: 2rem
---

# Design System Strategy: Tactical Elegance

> **RoadieFlow** · Fuente de verdad de diseño para `roadie-flow-app`  
> Implementación técnica: [`app/globals.css`](./app/globals.css) · shadcn: [`components.json`](./components.json) · Detalle: [`docs/design-system.md`](./docs/design-system.md)

## 1. Overview & Creative North Star

**Creative North Star: "The Precision Ghost"**

In the high-pressure world of tour management and event logistics, the interface should never compete with the environment. It must exist as a sophisticated, semi-transparent overlay—a "digital stagehand" that provides mission-critical data with absolute clarity and zero friction.

This design system rejects the "standard app" aesthetic in favor of a **High-End Editorial** approach. We break the rigid grid through intentional asymmetry, using "The Precision Ghost" philosophy to layer information like sheets of frosted glass. By combining the technical precision of monospace accents with the breathing room of an editorial layout, we create a tool that feels both authoritative and effortless.

## 2. Colors & Surface Philosophy

The palette is rooted in deep obsidian tones and parchment-like neutrals, creating a high-contrast environment that preserves night vision on-site while ensuring legibility under stage lights.

### The "No-Line" Rule

Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through:

- **Tonal Shifts:** Transitioning from `surface` (#0E0E0E) to `surface_container_low` (#131313).
- **Negative Space:** Using the spacing scale to create "islands" of information.
- **Glass Depth:** Utilizing `surface_variant` with a 10% opacity and a 20px backdrop blur.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of materials.

- **Level 0 (Base):** `surface` (#0E0E0E) – The "Floor" of the app.
- **Level 1 (Sections):** `surface_container` (#191A1A) – Broad areas of content.
- **Level 2 (Cards):** `surface_container_high` (#1F2020) – Interactive components.
- **Floating Elements:** Use `surface_bright` with `backdrop-filter: blur(16px)` to create the signature glass effect for navigation bars and critical alerts.

### The "Glass & Gradient" Rule

To prevent the UI from feeling flat, use a subtle radial gradient on primary CTAs: `primary` (#C7C7BF) transitioning into `primary_dim` (#B9B9B2) at a 45-degree angle. This provides a tactile "glow" that feels premium rather than "pasted on."

### Token reference (YAML)

Los tokens canónicos están en el frontmatter de este archivo. Resumen de roles clave:

| Token                             | Hex                   | Rol                                   |
| --------------------------------- | --------------------- | ------------------------------------- |
| `background` / `surface`          | `#131313`             | Base de la app                        |
| `surface-container-lowest`        | `#0e0e0e`             | Pisos más profundos (inputs recessed) |
| `surface-container-high`          | `#2a2a2a`             | Cards interactivas                    |
| `primary`                         | `#e3e3db`             | CTA, acentos principales              |
| `on-primary`                      | `#2f312b`             | Texto sobre primary                   |
| `tertiary` / `tertiary-container` | `#ffdbd3` / `#ffb5a3` | Alertas cálidas, énfasis              |
| `on-surface`                      | `#e5e2e1`             | Texto principal                       |
| `on-surface-variant`              | `#c7c7bf`             | Texto secundario                      |
| `outline-variant`                 | `#464741`             | Ghost borders (15–40% opacity)        |

**Regla de implementación:** mapear estos tokens a variables CSS en `app/globals.css` y consumirlos vía clases semánticas shadcn (`bg-background`, `text-foreground`, etc.). No hardcodear hex en componentes.

## 3. Typography

The typography strategy creates a tension between editorial elegance and technical data.

- **Editorial Layer (Space Grotesk):** Use for `display` and `headline` scales. Its wide apertures and modern geometric forms provide the "premium" feel.
- **Functional Layer (Inter):** Use for `title` and `body` scales. Inter is the workhorse, ensuring that flight times and crew names are legible at a glance in low-light environments.
- **Technical Layer (Share Tech Mono):** Reserved for labels and data points (e.g., `label-sm`, timestamps, coordinates). This adds a "tactical" aesthetic that aligns with logistics and tech-heavy environments.

**Hierarchy Note:** Use `headline-lg` for screen titles but offset them with an asymmetric left-margin of 2rem to create an editorial, "off-grid" look.

### Escala mobile (M0)

| Token                | Familia         | Tamaño     | Uso                         |
| -------------------- | --------------- | ---------- | --------------------------- |
| `headline-lg-mobile` | Space Grotesk   | 28px / 600 | Título de pantalla en móvil |
| `title-lg`           | Inter           | 20px / 600 | Subtítulos de sección       |
| `body-md`            | Inter           | 14px / 400 | Cuerpo, descripciones       |
| `label-md`           | Share Tech Mono | 12px / 400 | Timestamps, metadata        |

## 4. Elevation & Depth

Depth is achieved through **Tonal Layering** rather than drop shadows.

- **The Layering Principle:** Place a `surface_container_lowest` (#000000) element inside a `surface_container_low` (#131313) area to create a "recessed" effect for input fields.
- **Ambient Shadows:** For floating glass cards, use an extra-diffused shadow: `offset-y: 20px`, `blur: 40px`, `color: rgba(0, 0, 0, 0.4)`.
- **The Ghost Border:** For accessibility on interactive elements, use `outline_variant` (#484848) at **15% opacity**. This provides just enough definition to pass WCAG without cluttering the minimalist aesthetic.
- **Roundedness:** Use `xl` (3rem) for main container corners to soften the "tech" look, and `md` (1.5rem) for internal components like buttons and inputs.

### Radios (YAML)

| Token     | Valor  |
| --------- | ------ |
| `sm`      | 0.5rem |
| `DEFAULT` | 1rem   |
| `md`      | 1.5rem |
| `lg`      | 2rem   |
| `xl`      | 3rem   |
| `full`    | 9999px |

## 5. Components

### Buttons

- **Primary:** Solid `primary` (#C7C7BF) with `on_primary` (#40413B) text. Use `xl` (3rem) rounding for a "pill" shape that feels modern.
- **Secondary (Glass):** `rgba(217, 211, 199, 0.1)` background with a 20px backdrop blur and a `Ghost Border`.

En código: extender variantes shadcn en [`components/ui/button.tsx`](./components/ui/button.tsx).

### Cards & Lists

- **The Divider Ban:** Never use lines to separate list items. Use a 12px vertical gap and a slight background shift (`surface_container_low` vs `surface_container`) to define rows.
- **Glass Cards:** For mission-critical info (e.g., "Next Set Time"), use a frosted glass treatment with a `primary_fixed` (#E4E3DB) top-border (2px) to signify high priority.

### Inputs

- **Style:** Minimalist. No bottom line. Use `surface_container_lowest` as a slightly recessed "well."
- **Focus State:** The `Ghost Border` increases to 40% opacity, and the label (in `Share Tech Mono`) shifts to the `primary` color.

### Logistical Specialized Components

- **The "Timeline Node":** A vertical line using `outline_variant` at 20% opacity, with technical timestamps in `label-md` (Share Tech Mono) positioned asymmetrically to the left.
- **Status Badges:** Use `error_container` (#7E2B17) for delays, but keep the text `on_error_container` (#FF9B82) for a sophisticated, low-vibrancy warning system.

## 6. Do's and Don'ts

### Do

- **Do** use extreme white space. If a section feels "full," double the padding.
- **Do** mix your font families intentionally. `Headline (Space Grotesk)` + `Data (Share Tech Mono)` is the signature pairing.
- **Do** use `backdrop-filter` on any element that sits above the background.

### Don'ts

- **Don't** use pure white (#FFFFFF). Use `primary_text` (#F2F1E9) to avoid harsh digital glare.
- **Don't** use standard shadows. If it looks like a "Material Design" shadow, it's too heavy.
- **Don't** use 100% opaque borders. They break the "Ghost" illusion and create visual noise in high-pressure environments.

---

## 7. RoadieFlow — criterios de producto (M0)

Además de Tactical Elegance, el shell M0 debe cumplir:

1. **Mobile-first** — diseñar para 375px; contenedor `max-w-md`.
2. **Touch-friendly** — targets ≥ 44px (`min-h-11 min-w-11`).
3. **Español** — copy, labels y estados en español.
4. **Bottom nav** — persistente en `/`, `/itinerary`, `/events`, `/profile` (ver [`docs/navigation.md`](./docs/navigation.md)).
5. **Safe area** — `env(safe-area-inset-bottom)` en navegación flotante.

### Checklist antes de merge

- [ ] Viewport 375px sin scroll horizontal
- [ ] Controles táctiles ≥ 44px
- [ ] Tokens del YAML — no hex sueltos en JSX
- [ ] Sin bordes sólidos 1px para seccionar (No-Line Rule)
- [ ] Tipografía: Space Grotesk (headlines) + Inter (body) + Share Tech Mono (labels)
- [ ] Bottom nav visible en rutas core
- [ ] Copy en español

### Spacing (YAML)

| Token              | Valor |
| ------------------ | ----- |
| `unit`             | 4px   |
| `xs`               | 4px   |
| `sm`               | 8px   |
| `md`               | 16px  |
| `lg`               | 24px  |
| `xl`               | 32px  |
| `xxl`              | 64px  |
| `gutter`           | 12px  |
| `margin-mobile`    | 24px  |
| `editorial-offset` | 2rem  |
