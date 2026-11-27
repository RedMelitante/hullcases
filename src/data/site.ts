export const SITE = {
  name: 'Hull Cases',
  url: 'https://hullcases.com',
  phone: '(833) 236-0699',
  phoneHref: 'tel:+18332360699',
  email: 'info@hullcases.com',
  emailHref: 'mailto:info@hullcases.com',
  street: '3827 Wacker Dr.',
  city: 'Mira Loma',
  region: 'CA',
  postalCode: '91752',
  mapsHref: 'https://maps.google.com/?q=3827+Wacker+Dr,+Mira+Loma,+CA+91752',
};

/** Route map. Keeps every live hullcases.com URL (see design/source/Handoff.dc.html). */
export const ROUTES = {
  home: '/',
  shop: '/shop/',
  custom: '/custom-products/',
  about: '/waterproof-hard-cases-with-wheel/',
  contact: '/contact-us/',
  faq: '/faq/',
  blog: '/blogs/',
  returns: '/return-and-refund-policy/',
  terms: '/terms-and-conditions/',
  privacy: '/privacy-policy/',
  disclaimer: '/disclaimer/',
  cart: '/cart/',
  checkout: '/checkout/',
  orderConfirmed: '/order/confirmed/',
  account: '/account/',
  accountOrders: '/account/orders/',
};

export type ShopFilterKey =
  | 'all'
  | 'small'
  | 'medium'
  | 'large'
  | 'wheeled'
  | 'under-12'
  | '12-16'
  | '16-20'
  | 'over-20'
  | 'travel';

export interface ShopFilter {
  name: string;
  href: string;
  lead: string;
  /** query param applied on /shop/ (length / use filters) */
  query?: { key: 'length' | 'use'; value: string };
  seoTitle?: string;
  meta?: string;
}

export const SHOP_FILTERS: Record<ShopFilterKey, ShopFilter> = {
  all: {
    name: 'All cases',
    href: '/shop/',
    lead: 'Every Hull case in one place: IP67 waterproof, polypropylene alloy, lifetime warranty. Filter by category, inside length and price, and check the internal size on each product page before you order.',
  },
  small: {
    name: 'Small cases',
    href: '/product-category/small-box/',
    lead: 'Compact waterproof cases for cameras, drones, tools, electronics and documents. Check the internal size on each product page before you order.',
    seoTitle: 'Small Waterproof Hard Cases | Hull Cases',
    meta: 'Small waterproof hard cases from Hull Cases. Compare internal sizes and order online, shipped from Mira Loma, CA.',
  },
  medium: {
    name: 'Medium cases',
    href: '/product-category/medium-sized-box/',
    lead: 'Mid-size waterproof cases for camera kits, test equipment and tool sets. Check the internal size on each product page before you order.',
    seoTitle: 'Medium Waterproof Hard Cases | Hull Cases',
    meta: 'Medium waterproof hard cases from Hull Cases. Compare internal sizes and order online, shipped from Mira Loma, CA.',
  },
  large: {
    name: 'Large cases',
    href: '/product-category/a-large-box/',
    lead: 'Our biggest waterproof cases, each with a pull handle and wheels, for heavy or bulky kit.',
    seoTitle: 'Large Waterproof Hard Cases | Hull Cases',
    meta: 'Large waterproof hard cases from Hull Cases. Compare internal sizes and order online, shipped from Mira Loma, CA.',
  },
  wheeled: {
    name: 'Wheeled cases',
    href: '/product-category/pull-rod-box/',
    lead: 'Cases with a pull handle and wheels, so heavy kit rolls instead of being carried.',
    seoTitle: 'Wheeled Waterproof Hard Cases | Hull Cases',
    meta: 'Wheeled waterproof hard cases from Hull Cases. Compare internal sizes and order online, shipped from Mira Loma, CA.',
  },
  'under-12': {
    name: 'Under 12 in',
    href: '/shop/?length=under-12',
    query: { key: 'length', value: 'under-12' },
    lead: 'Cases with an inside length under 12 inches. Compare the full internal size on each product page.',
  },
  '12-16': {
    name: '12–16 in',
    href: '/shop/?length=12-16',
    query: { key: 'length', value: '12-16' },
    lead: 'Cases with an inside length from 12 to 16 inches. Compare the full internal size on each product page.',
  },
  '16-20': {
    name: '16–20 in',
    href: '/shop/?length=16-20',
    query: { key: 'length', value: '16-20' },
    lead: 'Cases with an inside length from 16 to 20 inches. Compare the full internal size on each product page.',
  },
  'over-20': {
    name: 'Over 20 in',
    href: '/shop/?length=over-20',
    query: { key: 'length', value: 'over-20' },
    lead: 'Cases with an inside length over 20 inches. Compare the full internal size on each product page.',
  },
  travel: {
    name: 'Travel cases',
    href: '/shop/?use=travel',
    query: { key: 'use', value: 'travel' },
    lead: 'Cases whose outside size fits within the common 22 × 14 × 9 in carry-on limit. Airline rules vary, so check yours before you fly.',
  },
};

export const CATEGORY_FILTERS: ShopFilterKey[] = ['small', 'medium', 'large', 'wheeled'];
export const LENGTH_FILTERS: ShopFilterKey[] = ['under-12', '12-16', '16-20', 'over-20'];
export const USE_FILTERS: ShopFilterKey[] = ['travel'];

/** Category of each product's breadcrumb / "More …" section. */
export const CATEGORY_NAME = { small: 'Small cases', medium: 'Medium cases', large: 'Large cases' } as const;
export const CATEGORY_HREF = {
  small: SHOP_FILTERS.small.href,
  medium: SHOP_FILTERS.medium.href,
  large: SHOP_FILTERS.large.href,
} as const;
