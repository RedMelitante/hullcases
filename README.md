# Hull Cases — hullcases.com storefront

Production build of the Hull Cases storefront from the Claude Design handoff bundle
(`design/`), built as a static [Astro](https://astro.build) site. Styles, layout and copy follow the design files;
`src/styles/hull.css` is the design's token + component stylesheet, copied unchanged.

## Commands

Requires Node 22.23.4+ (see `.nvmrc`).

| Command           | What it does                                              |
| ----------------- | --------------------------------------------------------- |
| `npm install`     | Install dependencies                                      |
| `npm run dev`     | Dev server at http://localhost:4321                       |
| `npm run build`   | Type-check (`astro check`) and build static site to `dist/` |
| `npm run preview` | Serve the built `dist/` locally                           |

Deploy `dist/` to any static host (Netlify, Cloudflare Pages, Vercel, S3/CloudFront, nginx).
`public/_redirects` gives real 301s on Netlify / Cloudflare Pages; other hosts get Astro's meta-refresh redirect pages.

### Environment

Copy `.env.example` to `.env` (or set it in your host's build settings):

- `PUBLIC_FORMS_ENDPOINT` (optional): URL that the contact, custom-quote, newsletter and checkout forms POST to as
  `multipart/form-data` (Formspree, Basin, or your own API). When unset, each form opens the visitor's email app with a
  pre-filled message to info@hullcases.com, so no enquiry is lost.

## Project structure

```
design/                 Claude Design handoff: source boards (*.dc.html), hull.css, canvas.json, Handoff.png
public/images/          All design images, readable names (map: design/source/image-map.json)
public/                 favicon, robots.txt, _redirects
src/styles/hull.css     Design tokens + components (verbatim from the design)
src/styles/site.css     Production-only additions (overlays, skip link, utilities)
src/data/               Product catalog (21 models), routes & shop filters, blog posts, policies, FAQ
src/components/         SiteHeader (+ mega menu, mobile drawer), SiteFooter, ProductCard, ShopView, CartDrawer, Acc, Icon
src/layouts/            BaseLayout: SEO meta, Open Graph, JSON-LD, fonts, header/footer/cart drawer
src/pages/              One file per route (below)
src/scripts/            Cart store, overlays, header/cart UI, forms, shop filtering
```

## Routes

Every live hullcases.com URL is kept (handoff build notes).

| Page | URL |
| --- | --- |
| Home | `/` |
| Shop (all cases) | `/shop/` — filter views `/shop/?length=under-12\|12-16\|16-20\|over-20`, `/shop/?use=travel`, search `/shop/?q=` (canonical `/shop/`) |
| Categories | `/product-category/small-box/`, `/medium-sized-box/`, `/a-large-box/`, `/pull-rod-box/` |
| Products (21) | `/product/d2812/` … `/product/d6530/` |
| Custom cases | `/custom-products/` |
| About | `/waterproof-hard-cases-with-wheel/` |
| Contact + FAQ | `/contact-us/` |
| FAQ | `/faq/` |
| Blog | `/blogs/`, `/blogs/hard-case-for-camera-equipment/`, `/blogs/tacical-equipment-cases/`, `/blogs/hard-utility-case-in-u-s/` |
| Policies | `/return-and-refund-policy/`, `/terms-and-conditions/`, `/privacy-policy/`, `/disclaimer/` |
| Cart / checkout / order / account (noindex) | `/cart/`, `/checkout/`, `/order/confirmed/`, `/account/`, `/account/orders/` |

Redirects: `/privacy`, `/terms`, the `-2` duplicate product URLs (`/product/d5524-2/` etc.) and the Medusa theme's
`/us/...` routes. SEO titles and meta descriptions come from the handoff table (section 01). A sitemap
(`/sitemap-index.xml`) and `robots.txt` exclude cart, checkout, order and account pages. Product pages carry
`Product` + `BreadcrumbList` JSON-LD, blog posts `BlogPosting`, home and contact `Store`.

## How commerce works today

- **Cart** is client-side (`src/scripts/cart.ts`, `localStorage`): Quick add, product page quantity, cart drawer,
  cart page and checkout summary all share it.
- **Checkout** validates the contact/address form and sends the order (items, totals, contact, address, delivery
  choice) to `PUBLIC_FORMS_ENDPOINT`, or by email if that's unset, then shows the confirmation page.
  **Card payment is not processed.** The card inputs have no `name` and are never stored or sent. Before taking
  real orders, replace the Payment fieldset in `src/pages/checkout/index.astro` with your payment provider's hosted
  fields (Medusa payment session or Stripe Payment Element).
- **Accounts** need customer auth from the commerce backend. Until then, sign in / create account lead to the order
  list for orders placed in this browser.
- To connect Medusa (as the handoff intends): swap the functions in `src/scripts/cart.ts` for Medusa Store API calls
  and point checkout/account at Medusa. Region: United States, USD, country code `us`.

## Changes from the design (deliberate)

- Designer annotations aren't shown to customers: the "Supplier photo · replace" badge on product images, the
  "URL: /…" line on policy pages, "Example order shown in the design" notes, and the Terms intro note about
  truncated sections (and its "…" markers).
- Cart badge, cart contents, order number and order history come from the real cart instead of the design's sample
  data (2 items, Order #1001).
- Checkout State list has all 50 states + DC (design showed 6). Custom-quote "Case model" lists all 21 models
  (design showed 6). Shop sort drops "Newest" (no release-date data).
- Home "See all FAQs" links to `/faq/` (the design predates the FAQ page and linked to Contact).
- Social icons stay unlinked until Hull Cases has accounts (handoff note).

## Open items from Hull Cases (from the handoff, section 03)

- Logo as SVG (PNG traced from the supplied image is used now).
- Hi-res Hull photos and written OK for supplier images; product thumbnails are low-res supplier catalog shots.
- **Real retail prices** (the live site shows the supplier's factory list; D6530 is $33.15 in one listing and
  $55.20 in another). Prices live in `src/data/catalog.json`.
- Full Terms of Service text (only each section's opening line is in the design), Terms governing-law state,
  support@ vs info@ address. Privacy Policy and Disclaimer text to be reviewed.
- Shipping details, warranty terms, business hours, social URLs, custom-service details, promos, real reviews,
  blog article bodies/authors.
