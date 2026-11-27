# Hull Cases — storefront design (Claude Design export)

Design for the hullcases.com rebuild on the Astro Medusa Storefront theme.
Live canvas: https://claude.ai/artifact/6XR53eVVMASDg1uc9Nc56G

## What's in this zip

- `screenshots/desktop/` — every desktop page at 1440 px wide (full-page PNG).
- `screenshots/mobile/` — every mobile page at 390 px wide.
- `screenshots/components/` — header, mega menu, footer, product cards, mobile menu, cart drawer, filter drawer, design system and the developer handoff board.
- `project/` — the Claude Design source files (`*.dc.html`), the shared stylesheet `hull.css` (all design tokens and components) and `canvas.json` (board layout). These files open in Claude Design; in a plain browser they won't render on their own.
- `images/` — every image used in the design, with readable names. `image-map.json` maps the `/_blob/...` paths in the source files to these files.

## For the developer (Codex)

1. Start with `screenshots/components/Handoff.png`: URLs, H1s, SEO titles and meta descriptions for each page, build notes, open items and the full component list.
2. Take colours, type, spacing and component styles from `project/hull.css`.
3. Fonts: Barlow Condensed (600/700/800) for headings, IBM Plex Sans (400–700) for body text.
4. Product data (21 models, sizes, prices, image per model) is in the `DATA` array in `project/Product.dc.html`.
5. Product photos are supplier catalog photos (Yuyao Ding Yang / DY Cases) used as stand-ins. Replace them with Hull Cases' own photos when available.
6. Footer credit: "© 2026 by Digital Services Master", where "Digital Services Master" links to https://digitalservicesmaster.com/.
7. Social icons have no links until Hull Cases sets up its accounts.
