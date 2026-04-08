# /content — Portfolio Content Management

Add, edit, or audit portfolio content (featured projects, jobs, other projects) following the established Markdown + frontmatter schema.

## Usage

```
/content <action> [--type featured|job|project] [options]
```

**Examples:**
- `/content add --type featured` — guided wizard to add a new featured project
- `/content add --type job` — guided wizard to add a new work experience entry
- `/content add --type project` — add a project to the archive grid
- `/content edit <ProjectName> --type featured` — edit an existing featured project
- `/content list` — list all content with metadata summary
- `/content audit` — check all content for schema compliance, broken links, missing images
- `/content reorder --type featured` — reorder featured projects by date
- `/content remove <name> --type featured` — safely remove a featured project

## Frontmatter Schemas

### Featured Project (`content/featured/<ProjectName>/index.md`)
```yaml
---
date: '2025-01-15'           # ISO date — controls display order (newest first)
title: 'Project Name'        # Display title
cover: './cover.png'         # Local image (place in same folder)
github: 'https://github.com/Mahmoud9-dev/...'   # Required unless private
external: 'https://...'      # Live URL (optional, leave empty string if none)
tech:
  - React                    # List technologies — short names preferred
  - TypeScript
  - Node.js
showInProjects: false        # Set true to ALSO show in /archive grid
---

Project description paragraph. 2-3 sentences. Focus on impact and what makes it interesting.
Second paragraph if needed.
```

### Job (`content/jobs/<Company>/index.md`)
```yaml
---
date: '2025-01-01'           # Start date — controls tab order (newest first)
title: 'Software Engineer'   # Job title
company: 'Company Name'      # Company display name
location: 'Cairo, Egypt'     # City, Country (or "Remote")
range: 'Jan 2024 – Present'  # Human-readable date range
url: 'https://company.com'   # Company website
---

- Achievement or responsibility in bullet format.
- Use strong action verbs: Built, Designed, Led, Reduced, Increased, Shipped.
- Include measurable impact where possible: "Reduced load time by 40%".
- Keep to 3-5 bullets per role.
```

### Other Project (`content/projects/<slug>.md`)
```yaml
---
date: '2025-01-01'           # Controls display order
title: 'Project Name'
tech:
  - JavaScript
  - CSS
github: 'https://github.com/...'
external: ''                  # Leave empty if no live URL
company: ''                   # Leave empty if personal project
---
One-sentence description of the project and its purpose.
```

## Behavioral Flow

### `add` action — Guided Wizard
1. Ask for all required fields interactively (don't assume values).
2. Validate: title is non-empty, date is valid ISO format, tech list has at least 1 entry.
3. Create the directory (for featured/jobs) or file (for projects).
4. Write the file with properly formatted frontmatter + placeholder body.
5. Report the file path created and next steps (e.g., "add a cover.png image to the folder").

### `edit` action
1. Read the existing file first.
2. Show current content.
3. Apply only the requested changes — preserve everything else.
4. Confirm changes before writing.

### `audit` action
1. Glob-scan all content directories.
2. For each file, parse frontmatter and check:
   - Required fields present (title, date, tech for projects).
   - `date` is valid ISO format (`YYYY-MM-DD`).
   - `github` URL is well-formed (starts with `https://`).
   - `external` URL is well-formed if non-empty.
   - For featured: `cover` field references an existing image file.
   - Body content is non-empty.
3. Report issues with file paths.

### `list` action
Scan all content and output a formatted table:
```
Featured Projects (N total):
  [date] [title] — tech: A, B, C  →  github: yes, live: yes/no

Jobs (N total):
  [date] [title] @ [company]  →  range: ...

Other Projects (N total):
  [date] [title] — tech: A, B  →  github: yes/no
```

### `reorder` action
1. List all items with current dates.
2. Ask which item to prioritize (move date forward or back).
3. Update only the `date` field — preserve all other content.

### `remove` action
1. Show the content of the item to be removed.
2. Require explicit confirmation: "Type the project name to confirm deletion."
3. Remove the file/directory only after confirmation.

## Content Best Practices

**Featured projects** (shown on homepage, max ~5 is ideal):
- Include a cover image in the project folder (1200×630px recommended).
- Description should answer: What problem does it solve? What's technically interesting?
- List 3-6 technologies — the most distinctive/relevant ones.

**Job entries:**
- Emphasize outcomes over duties.
- Use `range` for the human display; use `date` for programmatic ordering.

**Tech tags:**
- Be consistent: use "React" not "ReactJS", "Node.js" not "NodeJS", "TypeScript" not "TS".

## Safety Boundaries
- Never deletes files without explicit user confirmation with name typed back.
- Never modifies `gatsby-node.js` or `gatsby-config.js`.
- Dates are set by user input — never auto-assigned without confirmation.
- Does not resize or optimize images (use `/optimize` for that).
