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
  // Redirects for old live-site and Medusa-theme URLs live in public/_redirects only (real 301s
  // on Cloudflare). Don't add an Astro `redirects` block as well: the same paths would be written
  // to dist/_redirects twice and Cloudflare rejects the deploy ("Duplicate rule for path").
});
