# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Robert Himam
**Updated:** 2026-05-23
**Category:** Portfolio/Personal/Blog

---

## Global Rules

### Color Palette (Stone Palette)

| Role | Hex | Tailwind Class |
|------|-----|----------------|
| Background | `#fafaf9` | `bg-stone-50` |
| Foreground | `#1c1917` | `text-stone-900` |
| Muted | `#78716c` | `text-stone-500` |
| Border | `#e7e5e4` | `border-stone-200` |
| Accent (Dot) | `#a8a29e` | `text-stone-400` |
| Selection | `#1c1917` | `selection:bg-stone-900` |

**Color Notes:** Sophisticated monochrome palette using the "Stone" scale. High contrast for readability with soft warm grays for secondary elements.

### Typography

- **Heading/Logo Font:** Playfair Display (Serif)
- **Body Font:** DM Sans (Sans)
- **Monospace Font:** DM Mono (Mono)
- **Mood:** Professional, Minimalist, Academic, Elegant, Backend-focused
- **Google Fonts:** [Playfair Display + DM Sans + DM Mono](https://fonts.google.com/share?selection.family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500|DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000|Playfair+Display:ital,wght@0,400..900;1,400..900)

**CSS Import:**
```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap");
```

### Branding & Logo

- **Logo Text:** `RH.` (Monogram)
- **Styling:** Playfair Display, font-semibold, text-stone-900.
- **The Dot:** The terminal period `.` should be colored `stone-400`.
- **Favicon:** 32x32 SVG featuring the `RH.` monogram on a `stone-950` rounded square background.

---

## Component Styles (Tailwind)

### Navbar
- **Height:** `h-14` (56px)
- **Effect:** Glassmorphism on scroll (`bg-stone-50/90 backdrop-blur-md`).
- **Links:** `font-mono text-[11px] uppercase tracking-widest`.

### Cards (Experience/Project)
- **Background:** White or transparent with subtle borders.
- **Hover:** Subtle elevation or opacity changes.
- **Spacing:** Generous use of white space to maintain the minimalist aesthetic.

### Typography Hierarchy
- **Section Headers:** Large serif headings, often with a muted numeric prefix or uppercase mono label.
- **Body Text:** Clean sans-serif with optimized line height (`1.6`).

---

## Animation Guidelines (Framer Motion)

- **Entry:** Subtle y-offset (20px) with fade-in.
- **Ease:** Custom cubic bezier `[0.22, 1, 0.36, 1]` for smooth, natural motion.
- **Duration:** 0.5s to 0.8s for section entries.

---

## Anti-Patterns (Do NOT Use)

- ❌ **Bright Saturated Colors** — Stick to the Stone palette.
- ❌ **Rounded Corners > 12px** — Keep it sharp and professional.
- ❌ **Heavy Box Shadows** — Use borders or very subtle shadows (`0 1px 2px`).
- ❌ **Generic Icons** — Use `Lucide React` for consistency.

---

## Pre-Delivery Checklist

- [ ] Favicon correctly set to `RH.` SVG.
- [ ] Metadata updated with correct SEO descriptions.
- [ ] Responsive design verified down to 320px.
- [ ] Font imports match the Tailwind config.
- [ ] Contrast ratios meet WCAG AA standards (Stone-900 on Stone-50 is ~15:1).
