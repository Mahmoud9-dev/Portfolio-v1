# /review — Pre-Commit Code Review & Quality Gate

Perform a thorough code review of staged or recent changes before committing. Catches bugs, style violations, accessibility issues, and ensures the change is safe to merge.

## Usage

```
/review [--scope staged|diff|file <path>|all] [--focus quality|security|a11y|perf|all] [--gate]
```

**Examples:**
- `/review` — review all staged changes
- `/review --scope diff` — review uncommitted changes (staged + unstaged)
- `/review --scope file src/components/sections/about.js`
- `/review --focus security` — security-only review
- `/review --focus a11y` — accessibility review
- `/review --gate` — strict mode: block commit if any critical issues found

## Review Checklist

### 1. Correctness
- [ ] No syntax errors (will be caught by ESLint, but do a read-based sanity check).
- [ ] GraphQL queries match the data shape returned by `gatsby-node.js`/plugins.
- [ ] Conditional rendering handles `null`/`undefined` gracefully.
- [ ] No infinite render loops (`useEffect` dependency arrays are correct).
- [ ] `useEffect` cleanup functions present for subscriptions, timers, ScrollReveal.
- [ ] Array `.map()` calls have `key` props.
- [ ] React `ref` objects are used correctly (not stale closures).

### 2. SSR Safety (Gatsby-specific — CRITICAL)
- [ ] No direct `window`, `document`, `navigator`, or `localStorage` access outside:
  - `useEffect(() => { ... }, [])` hooks
  - `typeof window !== 'undefined'` guards
  - `gatsby-browser.js` (runs only in browser)
- [ ] `ScrollReveal` only initialized inside `useEffect`.
- [ ] Anime.js only runs inside `useEffect`.
- [ ] No `Math.random()` or `Date.now()` calls at the module level (causes hydration mismatches).

### 3. Design System Compliance
- [ ] No hardcoded hex colors — all colors use `var(--token)`.
- [ ] No hardcoded pixel sizes for font sizes — use `var(--fz-*)`.
- [ ] Transitions use `var(--transition)` or `var(--easing)`.
- [ ] No inline styles (`style={{...}}`).
- [ ] New components use `styled-components`, not raw CSS files.
- [ ] Breakpoints follow the scale in `theme.js`.

### 4. Accessibility (WCAG 2.1 AA)
- [ ] Images have meaningful `alt` text (not empty, not "image").
- [ ] Interactive elements have visible focus styles (`outline: none` is only allowed if a custom focus style is applied).
- [ ] ARIA roles and labels are semantically correct.
- [ ] `<button>` used for actions, `<a>` for navigation — never reversed.
- [ ] Color contrast for new text elements ≥ 4.5:1 (check against design tokens).
- [ ] New modal/drawer/menu components trap focus when open.
- [ ] Keyboard-only navigation works for new interactive elements.

### 5. Performance
- [ ] No new `<img>` tags — use `GatsbyImage` or `StaticImage`.
- [ ] No heavy synchronous operations in render body.
- [ ] `useMemo` / `useCallback` only where genuinely needed (don't over-optimize).
- [ ] New animations use `transform`/`opacity` — not properties that trigger layout.
- [ ] `will-change` used sparingly and removed after animation completes.

### 6. Code Quality
- [ ] No `console.log`, `console.error`, `debugger` statements.
- [ ] No commented-out code blocks (delete, don't comment).
- [ ] `propTypes` declared for every new/modified component.
- [ ] Imports are clean — no unused imports.
- [ ] Function/variable names are descriptive and consistent with codebase conventions.
- [ ] No TODO comments without a tracking issue.

### 7. Security
- [ ] No secrets, API keys, tokens, or passwords in source files.
- [ ] `dangerouslySetInnerHTML` is NOT used (or if it is, the source is sanitized).
- [ ] External links use `rel="noopener noreferrer"`.
- [ ] User-facing URLs use HTTPS.
- [ ] No `eval()` or `new Function()`.

### 8. Content Changes
- [ ] Frontmatter schema matches the expected format (see CLAUDE.md).
- [ ] Dates are in ISO format (`YYYY-MM-DD`).
- [ ] Tech tags are consistent with existing casing conventions.
- [ ] Image files referenced in frontmatter exist in the filesystem.

## Severity Levels

**BLOCKER** — Must fix before commit:
- SSR-breaking code
- Security vulnerabilities
- Hardcoded secrets
- Broken GraphQL queries
- Accessibility: missing `alt` on images, missing labels on form inputs

**WARNING** — Should fix before commit:
- Hardcoded colors/sizes (design system violations)
- Missing `propTypes`
- `console.log` left in
- Missing `useEffect` cleanup

**SUGGESTION** — Nice to fix, not blocking:
- Code style improvements
- Performance micro-optimizations
- Refactoring opportunities

## Report Format

```
Code Review — [scope] — [timestamp]
═══════════════════════════════════════

BLOCKERS (N) — must fix before committing
  src/components/nav.js:45
  ✗ [SSR] window.addEventListener called at module level
  → Move inside useEffect(() => { ... }, [])

WARNINGS (N) — should fix before committing
  src/components/sections/hero.js:78
  ⚠ [Design] Hardcoded color #64ffda → use var(--green)

SUGGESTIONS (N) — consider fixing
  src/components/footer.js:23
  ℹ [Quality] Unused import: 'useRef'

───────────────────────────────────────
Overall: [PASS / FAIL / PASS WITH WARNINGS]
Verdict: [Safe to commit / Fix blockers first / Review warnings]
```

## `--gate` Mode

In gate mode:
- **BLOCKER** found → output `COMMIT BLOCKED` and stop.
- **WARNING only** → output `PROCEED WITH CAUTION` and list warnings.
- **Clean** → output `APPROVED — safe to commit`.

## Behavioral Flow

1. Determine scope (staged diff, full file, or entire `src/`).
2. Read all changed files.
3. Apply each checklist category systematically.
4. Generate severity-classified report.
5. In `--gate` mode: output final verdict.
6. Optionally: list `git add` / `git commit` command to run after fixes.

## After Review — Commit Flow

If review passes, suggest:
```bash
git add <files>
git commit -m "<type>(<scope>): <short description>"
# Types: feat, fix, style, refactor, content, chore, perf, a11y
# Example: feat(hero): add animated typing effect
# Example: content(featured): add Brainwave project
# Example: a11y(nav): add aria-label to hamburger button
```

## Safety Boundaries
- Review is always read-only — does not auto-fix (use `/style --fix` or `/implement` for fixes).
- Does not run the pre-commit hook directly — that's Husky's job on `git commit`.
- Does not modify `.eslintrc` or lint config.
- Severity ratings are based on the project conventions in CLAUDE.md — not generic best practices.
