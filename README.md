# mkabiaPortfolio Website — Interview Edition

**Date prepared:** 2025-10-08

This mini‑portfolio demonstrates solid front‑end fundamentals with an emphasis on **accessibility**, **performance**, **responsive design**, and **clean code**.

---

### 1) HTML semantics & accessibility
- Landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- **Skip link** for keyboard users
- Accessible navigation with a **mobile toggle** (`aria-expanded`) and focusable links
- **Dialog** elements for case studies with fallbacks handled in JS
- **Form** uses labels/validation and progressive enhancement, keeps the page usable without JS
- Color contrast ≥ 4.5:1; visible focus indicators; respects `prefers-reduced-motion`
- Uses **ARIA** attributes sparingly and correctly (only when needed)

### 2) CSS architecture
- Uses **design tokens** (CSS custom properties) for color, spacing, radius
- **Fluid type** via `clamp()`; modern layout using **Grid** and **Flexbox**
- **Responsive** at sensible breakpoints
- Theme awareness with `prefers-color-scheme` and a **theme toggle** (persisted in `localStorage`)

### 3) Performance & SEO
- Critical meta tags, tight `<title>`/`description`
- Image optimization hygiene: explicit width/height, **lazy loading**, and `decoding="async"`
- Minimal JS; progressive enhancement; no blocking CSS/JS
- Accessible, meaningful content structure that search engines can index

### 4) UX & micro‑interactions
- Clear hierarchy, readable type, consistent spacing scale
- CTAs grouped and discoverable; “Back to top” affordance
- Empty‑state/error patterns described in case studies

### 5) Extensibility
- You can scale this into a component library or migrate to a framework (Next.js, Astro) without rewriting basics.
- Swap the mock projects with your real ones; replace SVGs in `/assets` with optimized images.

---

## Suggested talking points

- Walk through **My Process** section and connect each item to a story: discovery, design, develop, deliver, iterate.
- Show how the **modal case studies** structure content & accessibility.
- Explain the **theme system** and design tokens.
- Mention performance: *“I aim for sub‑1s LCP on 3G for marketing pages; I budget JS carefully and use native elements first.”*
- Accessibility routine: keyboard pass, screen reader spot checks, automated audits.

---

## Next steps (optional add‑ons)
- Hook the contact form to a service (e.g. serverless function or Formspree).
- Add a real **projects.json** and client‑side rendering with robust error states.
- Lighthouse budget and CI checks (GitHub Actions) for performance/a11y regressions.


