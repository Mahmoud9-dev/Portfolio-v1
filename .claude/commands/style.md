# /style — Styled Components & Design System

Work with the portfolio's Styled Components design system: apply tokens, write consistent styles, audit design adherence, and maintain visual cohesion.

## Usage

```
/style <action> [target] [options]
```

**Examples:**
- `/style audit` — scan all components for design system violations
- `/style audit src/components/sections/hero.js` — audit a specific file
- `/style token <component>` — show which tokens a component should use
- `/style add-component <name>` — scaffold a new styled component following conventions
- `/style responsive <component>` — add/fix responsive breakpoints
- `/style theme` — show full design token reference
- `/style fix-hardcoded` — find and fix hardcoded color/size values

## Design Token Reference

### Colors (from `src/styles/variables.js`)
```
Backgrounds:
  --dark-navy: #020c1b       Page background
  --navy: #0a192f            Primary background, nav
  --light-navy: #112240      Cards, elevated surfaces, job panels
  --lightest-navy: #233554   Borders, dividers, inactive tabs

Text:
  --slate: #8892b0           Body text, descriptions
  --light-slate: #a8b2d1     Secondary text, dates, labels
  --lightest-slate: #ccd6f6  Subheadings, less-emphasis headings
  --white: #e6f1ff           Primary headings, emphasis

Accent:
  --green: #64ffda           CTAs, links, highlights, numbered items
  --green-tint: rgba(100,255,218,0.1)  Hover backgrounds, subtle highlights

Other:
  --pink: #f57dff            Used sparingly for variety
  --blue: #57cbff            Used sparingly for variety
  --navy-shadow: rgba(2,12,27,0.7)    Box shadows
  --dark-slate: #495670      Muted text, placeholders
```

### Typography
```
Fonts:
  --font-sans: 'Calibre', 'Inter', 'San Francisco', -apple-system, sans-serif
  --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace

Sizes:
  --fz-xxs: 12px    --fz-xs: 13px    --fz-sm: 14px
  --fz-md: 16px     --fz-lg: 18px    --fz-xl: 20px
  --fz-xxl: 22px    --fz-heading: 32px
```

### Spacing & Layout
```
--border-radius: 4px
--nav-height: 100px
--nav-scroll-height: 70px
--tab-height: 42px
--tab-width: 120px
--hamburger-width: 30px
```

### Transitions
```
--easing: cubic-bezier(0.645, 0.045, 0.355, 1)
--transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)
```

### Breakpoints (from `src/styles/theme.js`)
```
mobileS:  max-width: 330px
mobileM:  max-width: 400px
mobileL:  max-width: 480px
tabletS:  max-width: 600px
tabletL:  max-width: 768px
desktopXS: max-width: 900px
desktopS:  max-width: 1080px
desktopM:  max-width: 1200px
desktopL:  max-width: 1400px
```

## Styled Component Conventions

### Structure template
```jsx
import styled from 'styled-components';

const StyledWrapper = styled.section`
  /* Layout */
  display: flex;
  flex-direction: column;

  /* Typography */
  font-family: var(--font-sans);
  font-size: var(--fz-lg);
  color: var(--slate);

  /* Spacing */
  margin: 0 auto;
  padding: 0 150px;

  /* Transitions */
  transition: var(--transition);

  /* Breakpoints — from largest to smallest */
  @media (max-width: 1080px) {
    padding: 0 100px;
  }

  @media (max-width: 768px) {
    padding: 0 50px;
  }

  @media (max-width: 480px) {
    padding: 0 25px;
  }
`;
```

### Breakpoint usage in styled-components
```jsx
// Correct — use theme prop
@media (${({ theme }) => theme.bp.tabletL}) {
  ...
}

// Correct — direct CSS var media query
@media (max-width: 768px) {
  ...
}
```

### Hover patterns
```css
/* Button hover — standard */
&:hover,
&:focus {
  background-color: var(--green-tint);
  color: var(--green);
  outline: none;
}

/* Link hover */
&:hover {
  color: var(--green);
}
```

### Numbered heading (section counters)
```css
/* Used in About, Experience, Work, Contact sections */
&:before {
  content: '0N.';  /* Replace N with section number */
  color: var(--green);
  font-family: var(--font-mono);
  font-size: var(--fz-xl);
  margin-right: 10px;
}
```

## Audit Mode

### `audit` action
Scan target files for:

**Critical violations:**
- Hardcoded hex colors (regex: `#[0-9a-fA-F]{3,6}`) outside `variables.js`
- Hardcoded pixel values for font-sizes (use `var(--fz-*)` instead)
- Hardcoded transition values (use `var(--transition)`)

**Warnings:**
- Missing `transition: var(--transition)` on interactive elements
- Inconsistent hover patterns (color not using `var(--green)`)
- Border-radius not using `var(--border-radius)` where 4px is appropriate
- Media queries not following the breakpoint scale

**Suggestions:**
- `font-family` declarations not using CSS vars
- Color opacity achieved via opacity property instead of CSS var with rgba

**Report format:**
```
Design System Audit — [file or "all components"]
─────────────────────────────────────────────────
Critical (N):
  src/components/sections/hero.js:45 — Hardcoded color #64ffda → use var(--green)

Warnings (N):
  src/components/nav.js:89 — Missing transition on interactive element

Suggestions (N):
  src/components/footer.js:12 — Consider var(--font-mono) instead of hardcoded font-family
```

## New Component Scaffold (`add-component`)

When scaffolding a new styled component:
1. Read the closest existing component for style patterns.
2. Generate component with:
   - `styled-components` only (no inline styles)
   - All CSS values from design tokens
   - Responsive breakpoints for tabletL and mobileL at minimum
   - `propTypes` declaration
   - ScrollReveal ref if it's a section component
3. Name file: `src/components/<ComponentName>.js` (PascalCase)
4. Export as default.

## Safety Boundaries
- `audit` mode is read-only unless `--fix` flag is added.
- `--fix` only corrects mechanical replacements (hex → var) — never restructures CSS.
- Never modifies `variables.js` design tokens without explicit request.
- Never adds new CSS variables without updating `variables.js`.
- Does not change component logic, only styles.
