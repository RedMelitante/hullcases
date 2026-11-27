// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const NOINDEX = ['/cart/', '/checkout/', '/order/', '/account/'];

export default defineConfig({
  site: 'https://hullcases.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !NOINDEX.some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],
  // Live-site and Medusa-theme URLs kept working (see design/source/Handoff.dc.html, build notes).
  // Static hosts get meta-refresh pages; public/_redirects gives real 301s on Netlify / Cloudflare Pages.
  redirects: {
    '/privacy': '/privacy-policy/',
    '/terms': '/terms-and-conditions/',
    '/product/d5524-2': '/product/d5524/',
    '/product/d6125-2': '/product/d6125/',
    '/product/d6530-2': '/product/d6530/',
    '/us': '/',
    '/us/store': '/shop/',
    '/us/cart': '/cart/',
    '/us/checkout': '/checkout/',
    '/us/account': '/account/',
    '/us/account/orders': '/account/orders/',
  },
});
