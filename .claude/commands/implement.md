# /implement — Feature Implementation

Implement features for this Gatsby 3.4.1 + React 17 + Styled Components portfolio with specialist persona coordination and evidence-based development.

## Usage

```
/implement <feature-description> [--type component|section|hook|page|animation] [--scope ui|content|config|routing]
```

**Examples:**
- `/implement dark mode toggle --type component`
- `/implement skills section with animated progress bars --type section`
- `/implement custom cursor effect --type animation`
- `/implement blog page with MDX support --type page`
- `/implement useScrollPosition hook --type hook`

## Behavioral Flow

### Phase 1 — Context Analysis (always first)
1. Read `CLAUDE.md` to confirm design tokens, conventions, and project structure.
2. Read relevant existing files to understand patterns before writing anything new:
   - For sections: read `src/components/sections/` (e.g., `hero.js`, `about.js`)
   - For components: read the closest existing component
   - For hooks: read `src/hooks/`
   - For styles: read `src/styles/variables.js`, `src/styles/mixins.js`, `src/styles/theme.js`
3. Read `src/config.js` if the feature needs color, nav, or social data.
4. Confirm confidence ≥ 90% before writing code. If < 90%, list blockers and ask.

### Phase 2 — Plan (share before implementing)
- State which files will be created/modified.
- Identify which CSS variables, mixins, and breakpoints apply.
- Flag any Gatsby-specific concerns (SSR safety, gatsby-node.js, gatsby-config.js).
- Note ScrollReveal (`srConfig()`) or Anime.js usage if relevant.

### Phase 3 — Implementation
Follow these rules strictly:

**Styled Components:**
- Use `styled-components` for ALL component styles — no inline styles, no CSS modules.
- Reference design tokens via `var(--token)` (e.g., `var(--green)`, `var(--navy)`).
- Responsive: use `${({ theme }) => theme.bp.tabletL}` breakpoints from `theme.js`.
- Import mixins from `src/styles/mixins.js` when available.

**React patterns:**
- Functional components with hooks only.
- Declare `propTypes` for every component.
- Use `useEffect` cleanup functions for ScrollReveal and Anime.js instances.
- For Gatsby image: use `GatsbyImage` from `gatsby-plugin-image`.

**SSR safety:**
- Wrap browser APIs (`window`, `document`, `localStorage`) in `typeof window !== 'undefined'` checks.
- ScrollReveal must only initialize on client: use `useEffect` with empty deps.

**Animations:**
- ScrollReveal: use `sr.reveal(ref.current, srConfig(delay))` pattern from existing sections.
- Anime.js: follow the loader pattern in `src/components/loader.js`.
- CSS transitions: use `var(--transition)` or `var(--easing)`.

**Content-driven features:**
- New content types go in `content/` with proper frontmatter (see CLAUDE.md schema).
- Update `gatsby-node.js` if new GraphQL queries or page creation is needed.
- Update `gatsby-config.js` if new plugins or filesystem sources are needed.

### Phase 4 — Validation
- Confirm no `window`/`document` access outside `useEffect` or SSR guards.
- Confirm all styled-components use design tokens, not hardcoded hex values.
- Confirm PropTypes are declared.
- Confirm the implementation matches existing code style (check ESLint config: `@upstatement`).
- List any follow-up tasks (e.g., "add to nav", "add GraphQL query", "update config.js").

## Personas Activated
- **Frontend Engineer** — React 17 + Gatsby SSG patterns, Styled Components
- **Accessibility Specialist** — ARIA roles, keyboard navigation, color contrast
- **Performance Engineer** — SSR safety, lazy loading, animation performance (will-change, RAF)

## Safety Boundaries
- Never hardcode colors — always use CSS custom properties from `variables.js`.
- Never modify `node_modules/`, `.cache/`, or `public/`.
- Never install packages without user confirmation.
- Never touch `gatsby-config.js` for a component-only feature.
- SSR-breaking code (naked `window` access) blocks implementation until fixed.
