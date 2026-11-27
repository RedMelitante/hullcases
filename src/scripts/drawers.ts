// Overlay helpers: mobile nav, cart drawer, shop filter drawer share one open/close behaviour
// (scroll lock, Escape to close, focus moved in and restored).
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

interface OpenOverlay {
  el: HTMLElement;
  close: () => void;
  restore: HTMLElement | null;
}
const stack: OpenOverlay[] = [];
const hideFns = new WeakMap<HTMLElement, () => void>();

function lock(on: boolean) {
  document.documentElement.classList.toggle('is-locked', on);
}

export function openOverlay(el: HTMLElement, opts: { show?: () => void; hide?: () => void; focus?: HTMLElement | null } = {}): void {
  if (stack.some((o) => o.el === el)) return;
  const restore = document.activeElement as HTMLElement | null;
  const close = () => closeOverlay(el);
  (opts.show ?? (() => (el.hidden = false)))();
  hideFns.set(el, opts.hide ?? (() => (el.hidden = true)));
  stack.push({ el, close, restore });
  lock(true);
  const target = opts.focus ?? el.querySelector<HTMLElement>('[data-autofocus]') ?? el.querySelector<HTMLElement>(FOCUSABLE);
  requestAnimationFrame(() => target?.focus());
}

export function closeOverlay(el: HTMLElement): void {
  const i = stack.findIndex((o) => o.el === el);
  if (i === -1) return;
  const [o] = stack.splice(i, 1);
  hideFns.get(el)?.();
  if (!stack.length) lock(false);
  o.restore?.focus?.();
}

export function isOpen(el: HTMLElement): boolean {
  return stack.some((o) => o.el === el);
}

document.addEventListener('keydown', (e) => {
  const top = stack[stack.length - 1];
  if (!top) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    top.close();
    return;
  }
  if (e.key === 'Tab') {
    const items = [...top.el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

export function openCart(): void {
  const el = document.querySelector<HTMLElement>('[data-cart-drawer]');
  if (el) openOverlay(el);
}
