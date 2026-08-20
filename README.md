# nickpoole.dev

The personal site of **Nick Poole — SEO Specialist** (Baltimore, MD), with a
web development and IT foundation. It doubles as supplemental material for a
job search: the link sits on the resume, and every page answers one of three
questions — what does he know, what can he do, and why is he in a separate
category from other candidates.

## Overview

A hand-built, multi-page static site focused on accessibility (WCAG 2.1 AA),
clean semantics, and a design system carried consistently across every page.
Its signature is a **visible-schema motif**: each content page pairs real
JSON-LD in the `<head>` with an on-page styled excerpt of that same data, so
the structured data is legible to both people and machines.

Built with:

- HTML (static pages in `public/`)
- Sass / SCSS (compiled to `public/css/styles.css`)
- Vanilla JavaScript (theme toggle, mobile nav)
- Deployed on Netlify (redirects in `public/_redirects`, headers in
  `public/_headers`); the contact form posts to FormSubmit

## Information architecture

| Route              | Page                                                         |
| ------------------ | ------------------------------------------------------------ |
| `/`                | Home — hub hero, routing cards, statement, schema, contact   |
| `/expertise/seo/`  | SEO expertise — diagnosis, the build, governance, method     |
| `/portfolio/`      | Portfolio — shipped work, the ownership stack                |
| `/credentials/`    | Credentials — degrees & certs, what each one trained         |
| `/resume/`         | On-domain resume (print-friendly)                            |
| `/colophon/`       | Colophon — stack, tokens, entity graph, the files for machines |
| `/accessibility/`  | Accessibility statement — conformance, scope, how to report  |
| `/thank-you.html`  | Post-contact-form confirmation (excluded from indexing)      |

Nav: Home · SEO · Portfolio · Credentials · Resume · Contact. Colophon and the
accessibility statement are reachable from the footer on every page; the main
nav deliberately stays at five destinations.

## Design system

- Tokens in `src/scss/config/_variables.scss`; light/dark themes in
  `src/scss/theme/_theme.scss` (`body.dark-theme`), persisted via localStorage.
- Accent split: `--first-color` for decorative borders/blocks, `--accent-text`
  for accessible accent **text**. Section titles carry the offset accent block.
- Signature patterns: offset-border cards, the schema panel, chapter rows, and
  the letter/icon tiles — all built on the same tokens.
- Each color token has a matching `--*-label` string token declared beside it.
  The colophon swatches render those, so the documented value follows the theme
  and cannot drift from the declaration.
- `--accent-text` and `--text-color-light` are tuned for AA against
  `--body-color`. On the darker `--container-color` surface they drop below
  4.5:1, so new components put text on `--body-color` with a `--black-color`
  border, which is the existing card treatment.

## Build & run

```bash
npm install
npm run sass   # watch src/scss/styles.scss -> public/css/styles.css
```

Serve `public/` with any static server for local preview.

## Philosophy

“Make it resonate. Then refine.”

## Status

- [x] Multi-page rebuild around the SEO-specialist identity
- [x] Light/Dark mode with persistence
- [x] Accessibility pass (WCAG 2.1 AA, 44px tap targets, heading order)
- [x] Visible-schema motif + validated JSON-LD on every content page
- [x] On-domain resume (print stylesheet) replacing the external PDF link
- [x] Contact form with honeypot + `/thank-you.html`
- [x] Sitemap, canonicals, robots.txt, per-page OG cards
- [x] Single-source entity graph: one Person `@id`, referenced by every page
- [x] Colophon and accessibility statement, plus `llms.txt`
- [ ] Consulting flip (parked): hero swap + CTA change when ready

## Commit Log

[8/20/26]

- **feat: colophon, accessibility statement, and a single-source entity graph**
  - New `/colophon/`: the stack, live token swatches, the entity-graph diagram,
    the three files written for machines (peeled-corner `llms.txt` card), and
    audit links
  - New `/accessibility/`: WCAG 2.1 AA target, scope, measures, feedback, dates
  - Person declared once as `https://nickpoole.dev/#nick-poole`; every other
    page references it by `@id` instead of redeclaring it. Added a WebSite node
    at `#website` that pages join via `isPartOf`
  - Every schema panel rewritten to match its page's live JSON-LD
  - Portfolio: added the `nickpoole.dev` and DAP Global cards, renamed
    "Enterprise Healthcare" to "Enterprise", extended the ItemList to 14
  - Footer nav carries Colophon and Accessibility on all pages; main nav unchanged
  - Breadcrumb links underlined (color alone was the only cue distinguishing
    them from the surrounding label)
  - Outstanding content Nick owns is marked with visible `PENDING` blocks
    rather than filled in

[8/17/26]

- **feat: adds Enterprise Healthcare row (CareFirst) and links the therapist site**

- **fix: hides the nav close X on desktop; aligns the resume meta line**

- **chore: a11y, SEO, semantic HTML, and W3C validation pass**
  - axe-core clean (WCAG 2.1 A/AA + best-practice) across 6 pages × 2 themes × 2 viewports
  - W3C Nu HTML + Jigsaw CSS validators: 0 errors, 0 warnings
  - Nav controls rebuilt as real `<button>`s with `aria-expanded`, Escape-to-close, focus return
  - Closed mobile menu removed from the tab order; scrollable schema panels made keyboard reachable
  - Theme class moved to `<html>` and applied pre-paint (no light flash for dark-mode users)
  - Hero imagery re-encoded to WebP (12.4 MB → 594 KB); unused Google Fonts families dropped
  - Type scale raised; micro sizes tokenised as `--micro-font-size` / `--micro-font-size-lg`

[10/1/25]

- **refactor: Removes CFBCBS**

[9/22/25]

- **feat: adds pregnancy and next metro cards**

[7/29/25]

- **chore: adds meta description and head tags**

- **chore: adds robots.txt**

- **feat: polished home and about web copy content**

- **fix: refactors icons to meet minimum tap target standards**

- **fix: iOS icon and menu display issues**

[7/28/25]

- **fix: stabilize nav logo layout and update remixicon CDN config**

- **chore: adds redirects**

- **chore: adds sitemap**

- **feat: migrate contact form from Formspree to Netlify Forms**

- **feat: Sets up Formspree contact form with honeypot spam check, localStorage flag for post-submit message, and graceful form reset on return**

[7/22/25]

- **feat: finalizes nav icon toggle, polished buttons, links, and site copy**

[7/19/25]

- **feat: adds images and logo**

[5/5/25]

- **feat: adds certs section + polished copy to make it resonate**

- **chore: reconfigures boxicons to font injection via CDN**

[5/2/25]

- **chore: adds project card images, reshuffled layout, and dropped in fresh copy**

[4/24/25]

- **feat: adds icons to About section and curated Services content**

[4/20/25]

- **chore: updates project section text, refine fonts, and swap icons for cleaner look**

[4/19/25]

- **refactor: improves semantic HTML and WCAG 2.1 AA accessibility**
  - Added skip link and main landmark region for screen reader navigation
  - Refactored all headings to follow semantic hierarchy (h1 → h4)
  - Added aria-labels to icon-only links (GitHub, LinkedIn, social icons)
  - Marked decorative images and divs with aria-hidden="true"
  - Updated nav toggle and theme button to be keyboard accessible
  - Implemented rel="noopener noreferrer" for all target="_blank" links
  - Removed title attributes and avoided unnecessary tooltip clutter
  - Standardized aria-label tone to 3rd person ("Nick's profile") for clarity
  - Ensured all form inputs have proper labels and required attributes
  - Improved dark theme toggle state tracking with aria-pressed
  - Cleaned up redundant JS and began exploring performance optimizations

[4/18/25]

- Initial project setup with Sass, folder structure, and live compiler config

- INIT

## License

This project is licensed under the MIT License.
