# /optimize — Performance & SEO Optimization

Systematically improve Lighthouse scores, Core Web Vitals, SEO, and bundle size for this Gatsby portfolio.

## Usage

```
/optimize [--focus images|bundle|animations|seo|fonts|all] [--target lcp|cls|fid|all] [--dry-run]
```

**Examples:**
- `/optimize` — full optimization pass across all domains
- `/optimize --focus images` — image optimization only
- `/optimize --focus seo` — SEO meta tags and structured data
- `/optimize --focus animations --target cls` — fix CLS from animations
- `/optimize --focus bundle --dry-run` — show what would change without modifying
- `/optimize --focus fonts` — font loading performance

## Optimization Domains

### 1. Images (LCP impact: HIGH)
**Audit:**
- Find any raw `<img>` tags in `src/` — these should be `<GatsbyImage>` or `<StaticImage>`.
- Check `gatsby-plugin-sharp` and `gatsby-plugin-image` are in `gatsby-config.js`.
- Verify featured project `cover` images exist and are reasonably sized.

**Fixes:**
- Replace `<img src="...">` with `<StaticImage>` (for static paths) or `<GatsbyImage>` (for dynamic GraphQL data).
- Add `loading="lazy"` attribute for below-fold images.
- Set `placeholder="blurred"` or `placeholder="dominantColor"` on GatsbyImage for better LCP.
- Add `width` and `height` to images to prevent CLS.
- Use `quality={90}` on hero/featured images; `quality={75}` for thumbnails.

**OG image:**
- Verify `og:image` in `src/components/head.js` references an existing static asset.

### 2. Animations & CLS (CLS impact: HIGH)
**Audit:**
- Read all section components in `src/components/sections/`.
- Check `gatsby-browser.js` for ScrollReveal initialization.
- Identify elements that shift layout during reveal (margin/padding changes animate CLS).

**Fixes:**
- ScrollReveal `opacity: 0` → `opacity: 1` transitions should NOT change dimensions.
- Use `transform: translateY()` instead of `margin-top` animations to avoid layout shifts.
- Add `will-change: transform, opacity` to animated elements (remove after animation ends).
- Ensure loader (`src/components/loader.js`) fades out without causing a reflow.
- Verify `--transition` CSS var is used consistently for hover effects.

### 3. Bundle Size (FID / TTI impact: MEDIUM)
**Audit:**
- Check `package.json` for full lodash import vs specific methods.
- Verify no duplicate animation libraries (anime.js vs gsap etc.).
- Check `gatsby-browser.js` — avoid heavy synchronous imports there.

**Fixes:**
- Replace `import _ from 'lodash'` with `import throttle from 'lodash/throttle'` etc.
- Ensure `gatsby-plugin-offline` is listed AFTER `gatsby-plugin-manifest` in `gatsby-config.js`.
- Remove unused dependencies (`npm ls` cross-reference).
- Verify Prism.js only loads necessary language modules in `gatsby-config.js`:
  ```js
  {
    resolve: 'gatsby-remark-prismjs',
    options: { languages: ['js', 'jsx', 'bash', 'json', 'css'] }
  }
  ```

### 4. Fonts (LCP / CLS impact: MEDIUM)
**Audit:** Read `src/styles/fonts.js` and the font files in `src/fonts/`.

**Fixes:**
- Ensure `font-display: swap` is set in all `@font-face` declarations.
- Preload the primary font variant (Calibre Regular) in `gatsby-ssr.js` or `head.js`:
  ```html
  <link rel="preload" href="/fonts/Calibre-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  ```
- Ensure WOFF2 format is listed before WOFF in `src/styles/fonts.js`.
- Verify fallback fonts in `var(--font-sans)` and `var(--font-mono)` are web-safe.

### 5. SEO (Search ranking impact: HIGH)
**Audit:** Read `src/components/head.js`, `gatsby-config.js`, `src/pages/index.js`.

**Checks and fixes:**
- `<title>`: Should be `"Mahmoud Nasredeen | Software Engineer"` (60 chars max).
- `<meta name="description">`: 120-160 chars, keyword-rich summary.
- Open Graph: `og:title`, `og:description`, `og:image` (1200×630), `og:url`, `og:type: website`.
- Twitter Card: `twitter:card: summary_large_image`, `twitter:site`, `twitter:title`, `twitter:image`.
- Canonical URL: `<link rel="canonical" href="https://mndportfolio.netlify.app/" />`.
- Structured data (JSON-LD) — add `Person` schema to `head.js`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mahmoud Nasredeen",
    "url": "https://mndportfolio.netlify.app",
    "sameAs": ["https://github.com/Mahmoud9-dev", "https://linkedin.com/in/mahmoud-nasredeen/"]
  }
  ```
- Verify `gatsby-plugin-sitemap` generates `/sitemap/sitemap-index.xml`.
- Verify `gatsby-plugin-manifest` has `name`, `short_name`, `start_url`, `background_color`, `theme_color: #64ffda`, `display: minimal-ui`.

### 6. Vercel Deployment Headers (Security + Performance)
**Audit:** Read `vercel.json`.

**Recommended headers to add:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Behavioral Flow

1. **Audit first** — read all target files, produce a prioritized findings list.
2. **Show impact** — for each finding, state: domain, estimated Lighthouse impact, effort.
3. **Implement** — apply fixes in priority order: Critical → High → Medium → Low.
4. **Verify** — confirm changes are syntactically correct, no SSR breakage.
5. **Report** — summarize changes made and estimated score improvements.

## Impact Matrix

| Fix | Lighthouse Domain | CWV Target | Effort |
|-----|------------------|------------|--------|
| GatsbyImage for hero | Performance | LCP | Low |
| font-display: swap | Performance | LCP | Low |
| Preload primary font | Performance | LCP | Low |
| JSON-LD structured data | SEO | — | Low |
| OG meta tags complete | SEO | — | Low |
| will-change on animations | Performance | CLS | Medium |
| Security headers in vercel.json | Best Practices | — | Low |
| Lodash tree-shaking | Performance | TTI | Medium |

## Safety Boundaries
- `--dry-run` mode reports changes without writing files.
- Never modifies files in `public/`, `.cache/`, `node_modules/`.
- Image format conversions are delegated to Gatsby Sharp — never manual.
- Does not run `gatsby build` (use `/build` for that).
- Reports expected impact but does not guarantee specific Lighthouse scores.
