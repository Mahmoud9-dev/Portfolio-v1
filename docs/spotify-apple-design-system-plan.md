# Spotify × Apple Design System Plan

## Design Philosophy

Spotify (deep black `#000000`, bold green `#1DB954`, immersive dark cards) fused with Apple (frosted-glass nav, generous whitespace, spring easing, pill CTAs, optical typography). The portfolio stays fully dark — surfaces layer from `#000000` → `#121212` → `#1a1a1a`. The single chromatic accent is Spotify Green `#1DB954`, used only for interactive/functional elements.

---

## Token Mapping (old → new)

| Old token          | New token                         | Value                                |
| ------------------ | --------------------------------- | ------------------------------------ |
| `--dark-navy`      | `--bg`                            | `#000000`                            |
| `--navy`           | `--bg` / `--surface`              | `#000000` / `#121212`                |
| `--light-navy`     | `--surface`                       | `#121212`                            |
| `--lightest-navy`  | `--surface-elevated` / `--border` | `#1a1a1a` / `rgba(255,255,255,0.08)` |
| `--navy-shadow`    | `--navy-shadow` (keep)            | `rgba(0,0,0,0.6)`                    |
| `--green`          | `--accent`                        | `#1DB954`                            |
| `--green-tint`     | `--accent-tint`                   | `rgba(29,185,84,0.12)`               |
| `--white`          | `--text-primary`                  | `#ffffff`                            |
| `--lightest-slate` | `--text-primary`                  | `#ffffff`                            |
| `--light-slate`    | `--text-secondary`                | `#b3b3b3`                            |
| `--slate`          | `--text-secondary`                | `#b3b3b3`                            |
| `--dark-slate`     | `--text-tertiary`                 | `#535353`                            |
| `--pink`           | remove                            | —                                    |
| `--blue`           | remove                            | —                                    |

**New tokens:**

```css
--bg: #000000;
--surface: #121212;
--surface-elevated: #1a1a1a;
--surface-glass: rgba(255, 255, 255, 0.05);
--accent: #1db954;
--accent-hover: #1ed760;
--accent-tint: rgba(29, 185, 84, 0.12);
--text-primary: #ffffff;
--text-secondary: #b3b3b3;
--text-tertiary: #535353;
--border: rgba(255, 255, 255, 0.08);
--border-radius-card: 12px;
```

**Unchanged:** all `--fz-*`, `--font-*`, `--nav-height`, `--nav-scroll-height`, `--tab-*`, `--hamburger-width`, `--ham-*`

**Updated:** `--border-radius: 4px` → `6px` | easing `0.645,0.045,0.355,1` → `0.25,0.46,0.45,0.94` | transition `0.25s` → `0.3s`

---

## Component Patterns

### Buttons (`mixins.js`)

Spotify-style filled pill:

```css
background-color: var(--accent);
color: var(--bg);
border: none;
border-radius: 500px;
font-weight: 700;
letter-spacing: 0.05em;
text-transform: uppercase;

&:hover,
&:focus-visible {
  background-color: var(--accent-hover);
  transform: scale(1.04);
  box-shadow: none;
}
```

### Nav Glass (`nav.js`)

```css
background: rgba(0, 0, 0, 0.85);
backdrop-filter: blur(20px) saturate(180%);
border-bottom: 1px solid var(--border);
```

### Project Cards (`projects.js`)

```css
.project-inner {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--border-radius-card);
}
.project-inner:hover {
  border-color: rgba(255, 255, 255, 0.16);
}
```

### Featured Cards (`featured.js`)

- `.project-description`: add `border: 1px solid var(--border)`, `border-radius: var(--border-radius-card)`
- Image overlay `&:before`: `background-color: var(--accent-tint)`
- Image wrapper: `border-radius: var(--border-radius-card)`

### Jobs Tabs (`jobs.js`)

- Tab border: `var(--border)`
- Active tab: `var(--accent)`
- Hover bg: `var(--surface)`

### Mobile Menu (`menu.js`)

- Sidebar bg: `var(--surface)`
- Hamburger lines: `var(--accent)`

---

## Files to Edit (in order)

1. `src/styles/variables.js`
2. `src/styles/mixins.js`
3. `src/styles/GlobalStyle.js`
4. `src/styles/PrismStyles.js`
5. `src/components/nav.js`
6. `src/components/menu.js`
7. `src/components/footer.js`
8. `src/components/social.js`
9. `src/components/email.js`
10. `src/components/sections/hero.js`
11. `src/components/sections/about.js`
12. `src/components/sections/jobs.js`
13. `src/components/sections/featured.js`
14. `src/components/sections/projects.js`
15. `src/components/sections/contact.js`
16. `src/pages/archive.js`
17. `src/pages/404.js`

---

## Accessibility

- `#1DB954` on `#000000` = 7.2:1 (WCAG AA ✓)
- Button text (black on green) = 9.3:1 (AAA ✓)
- Pill buttons keep `outline: 2px solid var(--accent)` on focus

---

## Verification

1. `gatsby develop` — visually inspect all sections
2. Grep for all removed tokens — confirm zero remaining references
3. Nav glass on scroll (backdrop-filter + border-bottom)
4. Pill buttons at mobile (≤480px) — no overflow
5. Jobs tab highlight uses new accent green
6. `gatsby build` — production build succeeds
