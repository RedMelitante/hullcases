// Client-side cart (localStorage). Swap these functions for Medusa cart calls when the backend is connected.
import { BY_MODEL, cents, money, productTitle, productUrl, type Product } from '../data/products';

const KEY = 'hc-cart-v1';
const ORDERS_KEY = 'hc-orders-v1';
const MAX_QTY = 99;

export interface Line {
  m: string;
  qty: number;
}

export interface DetailedLine extends Line {
  product: Product;
  title: string;
  href: string;
  img: string;
  variant: string;
  unit: number;
  line: number;
}

export interface Order {
  id: string;
  date: string;
  email: string;
  delivery: 'ship' | 'pickup';
  lines: { m: string; qty: number; unit: number }[];
  subtotal: number;
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: cart lives for this page view only */
  }
}

let memory: Line[] | null = null;

export function getCart(): Line[] {
  const raw = memory ?? read<Line[]>(KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((l) => l && typeof l.m === 'string' && BY_MODEL[l.m] && Number.isFinite(l.qty) && l.qty > 0)
    .map((l) => ({ m: l.m, qty: Math.min(MAX_QTY, Math.floor(l.qty)) }));
}

function save(lines: Line[]): void {
  memory = lines;
  write(KEY, lines);
  window.dispatchEvent(new CustomEvent('cart:change'));
}

export function addToCart(m: string, qty = 1): void {
  const lines = getCart();
  const found = lines.find((l) => l.m === m);
  if (found) found.qty = Math.min(MAX_QTY, found.qty + qty);
  else lines.push({ m, qty: Math.min(MAX_QTY, qty) });
  save(lines);
}

export function setQty(m: string, qty: number): void {
  const lines = getCart()
    .map((l) => (l.m === m ? { ...l, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : l));
  save(lines);
}

export function removeFromCart(m: string): void {
  save(getCart().filter((l) => l.m !== m));
}

export function clearCart(): void {
  save([]);
}

export function detailed(lines: Line[] = getCart()) {
  const items: DetailedLine[] = lines.map((l) => {
    const p = BY_MODEL[l.m];
    const unit = cents(p);
    return {
      ...l,
      product: p,
      title: productTitle(l.m),
      href: productUrl(l.m),
      img: p.img,
      variant: `Internal ${p.inside}`,
      unit,
      line: unit * l.qty,
    };
  });
  const count = items.reduce((n, it) => n + it.qty, 0);
  const subtotal = items.reduce((n, it) => n + it.line, 0);
  return { items, count, subtotal, subtotalText: money(subtotal) };
}

export function getOrders(): Order[] {
  const v = read<Order[]>(ORDERS_KEY, []);
  return Array.isArray(v) ? v : [];
}

export function nextOrderId(): string {
  return String(getOrders().reduce((n, o) => Math.max(n, parseInt(o.id, 10) || 1000), 1000) + 1);
}

export function saveOrder(order: Order): Order {
  write(ORDERS_KEY, [order, ...getOrders().filter((o) => o.id !== order.id)].slice(0, 50));
  return order;
}

window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    memory = null;
    window.dispatchEvent(new CustomEvent('cart:change'));
  }
});

export { money };
