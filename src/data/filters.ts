import type { Product } from './products';
import { insideLength } from './products';
import type { ShopFilterKey } from './site';

/** Same rules as the Shop template in the design (design/source/Shop.dc.html). */
export function matchesFilter(key: ShopFilterKey, p: Product): boolean {
  const len = insideLength(p);
  switch (key) {
    case 'all':
      return true;
    case 'small':
    case 'medium':
    case 'large':
      return p.cat === key;
    case 'wheeled':
      return p.wheels;
    case 'under-12':
      return len < 12;
    case '12-16':
      return len >= 12 && len < 16;
    case '16-20':
      return len >= 16 && len < 20;
    case 'over-20':
      return len >= 20;
    case 'travel':
      return p.carry;
  }
}
