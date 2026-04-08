# /build — Build with Intelligent Diagnostics

Run the Gatsby build pipeline with pre-flight validation, real-time error analysis, and post-build reporting.

## Usage

```
/build [--type dev|prod|clean] [--verbose] [--fix-errors] [--perf]
```

**Examples:**
- `/build` — clean + production build with full diagnostics
- `/build --type dev` — start dev server (`gatsby develop`)
- `/build --type clean` — clear Gatsby cache only
- `/build --fix-errors` — analyze errors and attempt auto-fixes before rebuilding
- `/build --verbose` — show full Gatsby output
- `/build --perf` — production build + bundle size analysis

## Pre-Flight Checks (always run before build)

1. **Node version**: Verify `.nvmrc` matches active Node version.
2. **Dependencies**: Check `node_modules/` exists; if not, run `npm install` first.
3. **ESLint**: Run `npx eslint src/ --max-warnings 0` — block build on errors.
4. **Gatsby cache**: If last build failed, auto-run `gatsby clean` first.
5. **Environment**: Check for required env vars used in `gatsby-config.js`.
6. **Content**: Verify content files have valid frontmatter (quick schema check).
7. **Images**: Confirm all `cover` images referenced in frontmatter exist on disk.

## Build Execution

### Development (`--type dev`)
```bash
gatsby develop
```
- URL: `http://localhost:8000`
- GraphQL: `http://localhost:8000/___graphql`
- Watch for hot-reload errors in output.

### Production (`--type prod` or default)
```bash
gatsby clean && gatsby build
```
- Output: `public/` directory
- Analyze: bundle sizes, page count, time elapsed

### Clean only (`--type clean`)
```bash
gatsby clean
```
- Removes `.cache/` and `public/`
- Use when: stale cache errors, plugin config changes, GraphQL schema changes

## Error Diagnosis Playbook

When a build error occurs, diagnose using these patterns:

### GraphQL Errors
**Pattern**: `GraphQL Error`, `Cannot query field`, `Unknown argument`
- Read `gatsby-config.js` plugin configs.
- Read the component with the failing query.
- Common fix: field name mismatch in frontmatter vs. query, or missing gatsby-transformer-remark config.

### Module Not Found
**Pattern**: `Module not found: Error: Can't resolve`
- Check import path spelling and case sensitivity.
- Verify the file exists at the import path.
- Check `package.json` for missing dependency.

### Styled Components SSR Error
**Pattern**: `className` mismatch, hydration error
- Verify `gatsby-plugin-styled-components` is in `gatsby-config.js`.
- Check `babel-plugin-styled-components` is in `.babelrc`.
- Ensure `babel-plugin-styled-components` options: `{ "ssr": true }`.

### Window/Document Not Defined
**Pattern**: `window is not defined`, `document is not defined`
- Find the file with browser API access.
- Wrap in `typeof window !== 'undefined'` guard or move to `useEffect`.

### Image Processing Error
**Pattern**: `sharp`, `gatsby-plugin-image`, `JPEG`, `PNG` errors
- Run `gatsby clean` first (stale Sharp cache).
- Verify image files are not corrupted.
- Check `gatsby-plugin-sharp` version compatibility.

### Peer Dependency Warnings
**Pattern**: `WARN peer dep missing`
- Not always blocking — note but don't auto-fix without user confirmation.

### GraphQL Schema Build Timeout
- Usually caused by large numbers of content files or complex image processing.
- Try `gatsby clean` + rebuilding with `--verbose` to identify the slow node.

## Post-Build Analysis (`--perf` flag)

After successful `gatsby build`, report:
1. **Page count**: number of HTML files generated in `public/`.
2. **Bundle sizes**: JS/CSS chunks from Webpack stats.
3. **Build time**: elapsed time.
4. **Image count**: number of processed images.
5. **Render mode**: all pages should be SSG (static) — flag any SSR pages.

```
Build Summary
─────────────────────────────────────
Status:       ✓ Success
Build time:   XX seconds
Pages:        N HTML files
JS chunks:    N files (total: XX KB gzipped)
Images:       N processed
─────────────────────────────────────
Warnings:     N (list them)
```

## Behavioral Flow

1. Run pre-flight checks — report and pause if blocking issues found.
2. Execute the build command.
3. Stream/capture output.
4. On error: diagnose using the playbook above → suggest specific fix.
5. On success: report build summary.
6. With `--fix-errors`: apply fix and rebuild (max 2 auto-retry cycles).

## Safety Boundaries
- Never runs `gatsby build` without pre-flight ESLint check passing.
- Never deletes `public/` outside of `gatsby clean`.
- Never modifies `gatsby-config.js` or `gatsby-node.js` without explicit user request.
- Never installs packages automatically — asks first.
- `--fix-errors` auto-fixes only safe, mechanical errors (missing SSR guard, import typos). Architectural errors always require user input.
