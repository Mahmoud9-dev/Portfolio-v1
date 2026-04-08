# CLAUDE.md — Mahmoud Nasredeen Portfolio v1

## Project Identity

**Gatsby 3.4.1** portfolio site for Mahmoud Nasredeen, a software engineer.
Deployed on **Vercel** at `https://mndportfolio.netlify.app/`.
Repo: `https://github.com/Mahmoud9-dev/Portfolio-v1`

---

## Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Gatsby 3.4.1 (SSG/JAMstack)       |
| UI          | React 17.0.2                      |
| Styling     | Styled Components 5.3.0           |
| Animations  | Anime.js 3.1.0, ScrollReveal 4.0.5 |
| Content     | Markdown (gatsby-transformer-remark) |
| Deployment  | Vercel (vercel.json configured)   |
| Linting     | ESLint (@upstatement config)      |
| Formatting  | Prettier                          |
| Git Hooks   | Husky + lint-staged               |

---

## Directory Structure

```
Portfolio-v1/
├── content/
│   ├── featured/        # Featured projects (one folder per project, index.md)
│   ├── jobs/            # Work experience (one folder per job, index.md)
│   └── projects/        # Other projects (individual .md files)
├── src/
│   ├── components/
│   │   ├── sections/    # Page sections: hero.js, about.js, jobs.js, featured.js, projects.js, contact.js
│   │   ├── icons/       # SVG icon components
│   │   ├── nav.js, footer.js, layout.js, loader.js, menu.js, head.js, side.js, social.js, email.js
│   ├── styles/
│   │   ├── variables.js  # CSS custom properties (colors, fonts, sizes, transitions)
│   │   ├── theme.js      # Breakpoints + mixins
│   │   ├── mixins.js     # Styled-components mixins
│   │   ├── GlobalStyle.js
│   │   └── index.js
│   ├── config.js        # Email, social links, nav links, colors, srConfig
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # index.js, 404.js, archive.js
│   └── utils/           # Utility functions
├── static/
│   └── resume.pdf
├── gatsby-config.js     # Gatsby plugins + site metadata
├── gatsby-node.js       # Node API (page creation)
├── vercel.json          # Vercel deployment config
└── package.json
```

---

## Design System

**Color Palette (CSS vars in `src/styles/variables.js`):**
- `--dark-navy: #020c1b` — page background
- `--navy: #0a192f` — primary background
- `--light-navy: #112240` — cards, elevated surfaces
- `--lightest-navy: #233554` — borders, dividers
- `--slate: #8892b0` — body text
- `--light-slate: #a8b2d1` — secondary text
- `--lightest-slate: #ccd6f6` — headings
- `--white: #e6f1ff` — emphasis text
- `--green: #64ffda` — accent color (CTAs, highlights)
- `--green-tint: rgba(100, 255, 218, 0.1)` — hover backgrounds

**Typography:**
- Sans: `Calibre, Inter, SF Pro Text, system-ui`
- Mono: `SF Mono, Fira Code, Fira Mono, Roboto Mono`
- Scale: `--fz-xxs(12px)` → `--fz-heading(32px)`

**Breakpoints (theme.js):**
- mobileS: 330px, mobileM: 400px, mobileL: 480px
- tabletS: 600px, tabletL: 768px
- desktopXS: 900px, desktopS: 1080px, desktopM: 1200px, desktopL: 1400px

**Transitions:** `--transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)`

---

## Content Schema

### Featured Projects (`content/featured/<ProjectName>/index.md`)
```yaml
---
date: '2024-01-01'
title: 'Project Title'
cover: './cover.png'
github: 'https://github.com/...'
external: 'https://live-url.com'
tech:
  - React
  - Node.js
showInProjects: false
---
Description paragraph(s).
```

### Jobs (`content/jobs/<Company>/index.md`)
```yaml
---
date: '2024-01-01'
title: 'Job Title'
company: 'Company Name'
location: 'City, Country'
range: 'Jan 2023 - Present'
url: 'https://company.com'
---
- Bullet point achievement
- Another achievement
```

### Other Projects (`content/projects/<name>.md`)
```yaml
---
date: '2024-01-01'
title: 'Project Name'
tech:
  - JavaScript
  - React
github: 'https://github.com/...'
external: ''
company: ''
---
Short description.
```

---

## Development Workflow

```bash
npm run develop     # Start dev server at localhost:8000
npm run build       # Production build → public/
npm run serve       # Serve production build locally
npm run clean       # Clear Gatsby cache (.cache/ + public/)
npm run format      # Prettier format all files
npm run lint-staged # Lint staged files (auto-run by Husky pre-commit)
```

**Pre-commit hook** (`.husky/pre-commit`): runs `npm run lint-staged`
→ Prettier on `*.{js,css,json,md}`, ESLint --fix on `*.js`

---

## Coding Conventions

1. **Styled Components** — All component styles use `styled-components`. Reference CSS vars from `variables.js` via `var(--token-name)`. Use mixins from `src/styles/mixins.js`.
2. **ScrollReveal** — Use `srConfig()` from `src/config.js` for scroll animations.
3. **Anime.js** — Used for the loader animation in `src/components/loader.js`.
4. **PropTypes** — All components declare `propTypes`.
5. **ESLint** — `@upstatement/eslint-config` + jsx-a11y. Never disable rules without a comment.
6. **Imports** — No default export from `src/styles/index.js`; use named imports.

---

## Performance Targets

- Lighthouse Performance: ≥ 90
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 95
- Lighthouse SEO: ≥ 90
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## Custom Slash Commands

Available in `.claude/commands/`:

| Command        | Purpose                                         |
|----------------|-------------------------------------------------|
| `/implement`   | Feature implementation with Gatsby/React personas |
| `/optimize`    | Performance, SEO, and image optimization       |
| `/content`     | Add/edit portfolio content (projects, jobs)    |
| `/deploy`      | Vercel deployment with pre-flight checks       |
| `/analyze`     | Full code, accessibility, and SEO analysis     |
| `/style`       | Styled-components and design system work       |
| `/build`       | Build with intelligent error diagnostics       |
| `/review`      | Pre-commit code review and quality gate        |

---

## SuperClaude Integration Principles

- **Confidence-first**: Assess confidence ≥ 90% before implementing. Flag ambiguity early.
- **Evidence-based**: Verify patterns against existing code before writing new code.
- **Parallel execution**: Run independent analysis tasks simultaneously.
- **Token efficiency**: Prefer targeted file reads over broad scans.
- **Preserve conventions**: Match existing code style exactly — no unsolicited refactors.
- **Safety gates**: Always run `npm run lint-staged` before commit. Never force-push.
