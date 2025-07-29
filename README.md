# .dev

## nickpoole.dev (Rebuild)

The official rebuild of my personal portfolio site.

## Overview

This project is a complete redesign and rebuild of [nickpoole.dev](https://nickpoole.dev), focused on accessibility (WCAG 2.1 AA), clean semantics, and showcasing my work in web design, development, and creative strategy.

Built with:

- HTML
- Sass (SCSS)
- JavaScript
- Cypress for testing
- [Optional] Node.js for dev tooling

Deployed via Netlify.

## Philosophy

“Make it resonate. Then refine.”

## Features (Planned or In Progress)

- [x] Clean semantic HTML
- [x] Light/Dark mode toggle
- [x] Accessibility audit and fixes
- [x] Lighthouse optimization
- [x] Adjust color palette
- [x] Curate icons/images
- [x] Deploy on Netlify
- [x] Import an update resume link to flowCV
- [x] Image compression
- [x] Portfolio/project grid
- [x] Contact form with spam protection
- [x] Dedicated `/thank-you.html` page after form submission
- [x] Copy Curation
- [x] Configure redirects
- [x] Add sitemap
- [x] Deploy to domain URL
- [ ] Integrate Cypress Testing
- [ ] Easter egg: `/everyone-starts-somewhere.html`

## Commit Log

[7/29/25]

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
