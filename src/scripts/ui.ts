// Global behaviour on every page: header mega-menu, mobile nav, cart drawer, Quick add, forms.
import { addToCart, detailed, removeFromCart, setQty, money, type DetailedLine } from './cart';
import { closeOverlay, openCart, openOverlay } from './drawers';
import { svg } from './icons';
import { initForms } from './forms';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/* ---------- Mega menu ---------- */
const megaBtn = $<HTMLButtonElement>('[data-mega-toggle]');
const mega = $('[data-mega]');
const header = $('[data-header]');
function setMega(open: boolean) {
  if (!megaBtn || !mega) return;
  mega.hidden = !open;
  megaBtn.setAttribute('aria-expanded', String(open));
  megaBtn.classList.toggle('is-active', open || megaBtn.dataset.wasActive === '1');
}
if (megaBtn) {
  megaBtn.dataset.wasActive = megaBtn.classList.contains('is-active') ? '1' : '0';
  megaBtn.addEventListener('click', () => setMega(mega?.hidden === true));
  document.addEventListener('click', (e) => {
    if (mega && !mega.hidden && header && !header.contains(e.target as Node)) setMega(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mega && !mega.hidden) {
      setMega(false);
      megaBtn.focus();
    }
  });
}

/* ---------- Mobile nav ---------- */
const mnav = $('[data-mobile-nav]');
if (mnav) {
  $$('[data-open-mobile-nav]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const focus = btn.hasAttribute('data-focus-search') ? $<HTMLInputElement>('#m-search') : null;
      openOverlay(mnav, { focus });
      $$('[data-open-mobile-nav]').forEach((b) => b.setAttribute('aria-expanded', 'true'));
    }),
  );
  $$('[data-close-mobile-nav]', mnav).forEach((b) =>
    b.addEventListener('click', () => {
      closeOverlay(mnav);
      $$('[data-open-mobile-nav]').forEach((x) => x.setAttribute('aria-expanded', 'false'));
    }),
  );
}

/* ---------- Cart drawer ---------- */
const drawer = $('[data-cart-drawer]');

function drawerLine(it: DetailedLine): string {
  const t = esc(it.title);
  return `<li class="row" style="gap: 16px; align-items: flex-start; padding: 20px 0; border-bottom: 1px solid #DDE0E4" data-line="${it.m}">
<img src="${it.img}" alt="" width="96" height="96" style="width: 96px; height: 96px; flex: none; border-radius: 4px; object-fit: contain; padding: 8px; box-sizing: border-box; background: #FFFFFF; border: 1px solid #DDE0E4">
<div class="stack" style="gap: 6px; flex: 1; min-width: 0">
<div class="row" style="justify-content: space-between; align-items: flex-start; gap: 12px">
<a href="${it.href}" style="font-weight: 600; text-decoration: none; line-height: 1.35">${t}</a>
<span class="num" style="font-weight: 600; white-space: nowrap">${money(it.line)}</span>
</div>
<span class="t-sm muted">${esc(it.variant)}</span>
<div class="row" style="justify-content: space-between; margin-top: 6px">
<div class="qty qty-sm" role="group" aria-label="Quantity, ${t}"><button type="button" aria-label="Decrease quantity" data-qty-dec="${it.m}">${svg('minus', 2.2)}</button><output aria-live="polite">${it.qty}</output><button type="button" aria-label="Increase quantity" data-qty-inc="${it.m}">${svg('plus', 2.2)}</button></div>
<button class="icon-btn" type="button" aria-label="Remove ${t}" data-remove="${it.m}">${svg('trash')}</button>
</div>
</div>
</li>`;
}

function renderCartUI() {
  const { items, count, subtotalText } = detailed();
  $$('[data-cart-count]').forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
  $$('[data-cart-open]').forEach((el) => el.setAttribute('aria-label', `Cart, ${count} ${count === 1 ? 'item' : 'items'}`));
  if (!drawer) return;
  const lines = $('[data-cart-lines]', drawer)!;
  const empty = $('[data-cart-empty]', drawer)!;
  const footer = $('[data-cart-footer]', drawer)!;
  $('[data-cart-drawer-count]', drawer)!.textContent = String(count);
  empty.hidden = items.length > 0;
  lines.hidden = footer.hidden = items.length === 0;
  lines.innerHTML = items.map(drawerLine).join('');
  $('[data-cart-subtotal]', drawer)!.textContent = subtotalText;
}

/** Quantity / remove buttons anywhere on the page (drawer, cart page). */
document.addEventListener('click', (e) => {
  const t = (e.target as Element).closest<HTMLElement>('[data-qty-inc],[data-qty-dec],[data-remove],[data-add-to-cart],[data-cart-open],[data-close-cart]');
  if (!t) return;
  const cur = (m: string) => detailed().items.find((i) => i.m === m)?.qty ?? 1;
  if (t.dataset.qtyInc) setQty(t.dataset.qtyInc, cur(t.dataset.qtyInc) + 1);
  else if (t.dataset.qtyDec) setQty(t.dataset.qtyDec, cur(t.dataset.qtyDec) - 1);
  else if (t.dataset.remove) {
    removeFromCart(t.dataset.remove);
    // keep keyboard focus inside the drawer after the line disappears
    if (drawer && drawer.contains(t)) $<HTMLElement>('[data-close-cart].icon-btn', drawer)?.focus();
  } else if (t.dataset.addToCart) {
    addToCart(t.dataset.addToCart, 1);
    openCart();
  } else if (t.hasAttribute('data-cart-open')) {
    if (!drawer || location.pathname === '/cart/') return; // on the cart page, just follow the link
    e.preventDefault();
    openCart();
  } else if (t.hasAttribute('data-close-cart') && drawer) {
    closeOverlay(drawer);
  }
});

window.addEventListener('cart:change', renderCartUI);
renderCartUI();

/* ---------- Forms (contact, quote, newsletter) ---------- */
initForms();
