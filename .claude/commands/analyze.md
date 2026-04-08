# /analyze — Portfolio Analysis

Perform comprehensive multi-domain analysis of this Gatsby portfolio: code quality, performance, accessibility, SEO, and bundle health.

## Usage

```
/analyze [target] [--focus quality|performance|accessibility|seo|bundle|all] [--depth quick|deep] [--format summary|detailed|report]
```

**Examples:**
- `/analyze` — full analysis across all domains
- `/analyze src/components/sections/hero.js --focus quality`
- `/analyze --focus accessibility --depth deep`
- `/analyze --focus seo --format report`
- `/analyze --focus performance`
- `/analyze src/components/ --focus quality --depth deep`

## Analysis Domains

### 1. Code Quality
**Scan targets:** `src/components/`, `src/styles/`, `src/hooks/`, `src/pages/`

Check for:
- Hardcoded hex values instead of CSS custom properties (flag `#[0-9a-fA-F]{3,6}` outside `variables.js`)
- Missing `propTypes` declarations
- Inline styles (`style={{...}}` in JSX)
- `useEffect` without cleanup for ScrollReveal / Anime.js subscriptions
- Missing `key` props in lists
- Overly large components (> 200 lines — flag for potential split)
- Dead code (unused imports, variables, components)
- Console statements left in production code

### 2. Performance
**Key Gatsby performance checks:**
- Images: confirm `GatsbyImage` / `StaticImage` used instead of raw `<img>` tags
- Fonts: verify font loading strategy in `src/styles/fonts.js`
- Bundle: check for large dependencies in `package.json` (lodash full import vs tree-shaking)
- Animations: check `will-change` usage and RAF patterns in Anime.js code
- Lazy loading: verify sections use ScrollReveal correctly
- Code splitting: Gatsby auto-splits by page — confirm no unnecessary imports in `gatsby-browser.js`
- `gatsby-plugin-offline` presence for PWA caching

**Core Web Vitals targets:**
- LCP < 2.5s (check hero section image loading)
- CLS < 0.1 (check for layout shifts in animations/fonts)
- FID < 100ms (check event handler attachment timing)

### 3. Accessibility
**WCAG 2.1 AA checks:**
- Color contrast: `var(--green)` (#64ffda) on `var(--navy)` (#0a192f) — verify ratio ≥ 4.5:1 for text
- All `<img>` / `GatsbyImage` have meaningful `alt` text
- Interactive elements have `aria-label` where text is not self-describing
- Focus management: menu open/close cycles focus correctly (`src/components/menu.js`)
- Skip-to-content link present
- Heading hierarchy (h1 → h2 → h3, no skips)
- Form inputs (contact section) have associated `<label>` elements
- Keyboard navigation: all interactive elements reachable and operable by keyboard
- `eslint-plugin-jsx-a11y` violations (run conceptual check)

### 4. SEO
**Check `src/components/head.js` and `gatsby-config.js`:**
- `<title>` tag present and descriptive
- `<meta name="description">` present
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card meta tags
- Canonical URL
- `gatsby-plugin-sitemap` active in `gatsby-config.js`
- `robots.txt` or `gatsby-plugin-robots-txt`
- Structured data (JSON-LD) for personal portfolio
- `gatsby-plugin-manifest` PWA config complete (name, icons, theme_color)

### 5. Bundle Health
- Check `package.json` for outdated/redundant dependencies
- Identify any duplicated functionality (e.g., two animation libraries doing the same job)
- Flag any packages with known security advisories
- Verify `gatsby-plugin-offline` + `gatsby-plugin-manifest` order in `gatsby-config.js`
- Check `.gitignore` covers `.cache/`, `public/`, `node_modules/`

## Behavioral Flow

1. **Discover**: Glob-scan relevant source directories.
2. **Read**: Read flagged files for deep inspection.
3. **Assess**: Apply domain-specific heuristics listed above.
4. **Severity**: Rate each finding as `critical` / `warning` / `suggestion`.
5. **Report**: Structured output with findings grouped by domain.

## Report Format

```
## Analysis Report — [domain(s)] — [timestamp]

### Critical (must fix)
- [file:line] Issue description → Recommended fix

### Warnings (should fix)
- [file:line] Issue description → Recommended fix

### Suggestions (nice to have)
- [file:line] Issue description → Recommended fix

### Metrics Summary
- Files scanned: N
- Critical issues: N
- Warnings: N
- Estimated Lighthouse score range: N-N
```

## Safety Boundaries
- Read-only — never modifies files unless explicitly followed by `/improve` or `/review`.
- Reports findings; does not auto-fix without user confirmation.
- Does not execute `gatsby build` (use `/build` for that).
