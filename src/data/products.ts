// Product catalog: 21 models. Specs from the supplier sheet, prices from the live store
// (source: DATA array in design/source/Product.dc.html). Replace prices with real retail before launch.
import catalog from './catalog.json';

export type CategoryKey = 'small' | 'medium' | 'large';

export interface Product {
  m: string;
  cat: CategoryKey;
  price: string;
  wheels: boolean;
  img: string;
  inside: string;
  insidemm: string;
  overall: string;
  overallmm: string;
  depth: string;
  depthmm: string;
  lid: string;
  base: string;
  lb: string;
  kg: string;
  carry: boolean;
  vol: number;
}

export const PRODUCTS = catalog as Product[];

export const BY_MODEL: Record<string, Product> = Object.fromEntries(PRODUCTS.map((p) => [p.m, p]));

/** Price in cents, parsed from the display price ("$11.22" -> 1122). */
export const cents = (p: Product): number => Math.round(parseFloat(p.price.replace(/[^0-9.]/g, '')) * 100);

/** Inside length in inches (first number of the internal size). */
export const insideLength = (p: Product): number => parseFloat(p.inside);

export const money = (c: number): string => '$' + (c / 100).toFixed(2);

export const productTitle = (m: string): string => `${m} Waterproof Hard Case`;

export const productUrl = (m: string): string => `/product/${m.toLowerCase()}/`;

export const BEST_SELLER = 'D2812';

export interface CardProduct {
  m: string;
  title: string;
  price: string;
  img: string;
  href: string;
  badge?: string;
  badgeKind?: 'new' | 'sale';
  was?: string;
  stock?: 'low';
}

export function card(m: string, extra: Partial<CardProduct> = {}): CardProduct {
  const p = BY_MODEL[m];
  if (!p) throw new Error(`Unknown model ${m}`);
  return {
    m,
    title: productTitle(m),
    price: p.price,
    img: p.img,
    href: productUrl(m),
    ...(m === BEST_SELLER ? { badge: 'Best seller', badgeKind: 'new' as const } : {}),
    ...extra,
  };
}
