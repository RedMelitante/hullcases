// Shop page behaviour: ?length= / ?use= / ?q= filters on /shop/, price range, sort, mobile filter drawer.
import { SHOP_FILTERS, ROUTES, type ShopFilterKey } from '../data/site';
import { closeOverlay, openOverlay } from './drawers';

const root = document.querySelector<HTMLElement>('[data-shop]');
if (root) init(root);

function init(root: HTMLElement) {
  const base = root.dataset.shop as ShopFilterKey;
  const grid = root.querySelector<HTMLElement>('[data-shop-grid]')!;
  const cards = [...grid.querySelectorAll<HTMLElement>('.pc')];
  const empty = root.querySelector<HTMLElement>('[data-shop-empty]')!;
  const countEl = root.querySelector<HTMLElement>('[data-shop-count]')!;
  const sort = root.querySelector<HTMLSelectElement>('[data-sort]')!;
  const pmin = root.querySelector<HTMLInputElement>('[data-price-min]')!;
  const pmax = root.querySelector<HTMLInputElement>('[data-price-max]')!;
  const params = new URLSearchParams(location.search);

  // Query filters only apply to the "All cases" page (/shop/?length=12-16, /shop/?use=travel, /shop/?q=…)
  let queryKey: ShopFilterKey | null = null;
  const q = base === 'all' ? (params.get('q') ?? '').trim().toLowerCase() : '';
  if (base === 'all') {
    const len = params.get('length');
    const use = params.get('use');
    const found = (Object.keys(SHOP_FILTERS) as ShopFilterKey[]).find((k) => {
      const qq = SHOP_FILTERS[k].query;
      return qq && ((qq.key === 'length' && qq.value === len) || (qq.key === 'use' && qq.value === use));
    });
    if (found) queryKey = found;
  }

  const queryTest = (c: HTMLElement): boolean => {
    const d = c.dataset;
    const len = parseFloat(d.len!);
    switch (queryKey) {
      case 'under-12': return len < 12;
      case '12-16': return len >= 12 && len < 16;
      case '16-20': return len >= 16 && len < 20;
      case 'over-20': return len >= 20;
      case 'travel': return d.carry === 'true';
      default: return true;
    }
  };
  const words = q.split(/\s+/).filter(Boolean);
  const searchTest = (c: HTMLElement) => words.every((w) => c.dataset.q!.includes(w.replace(/x/g, '×')) || c.dataset.q!.includes(w));

  // Title, lead, breadcrumb and chip for query views
  if (queryKey || q) {
    const name = queryKey ? SHOP_FILTERS[queryKey].name : `Search: “${params.get('q')!.trim()}”`;
    const lead = queryKey
      ? SHOP_FILTERS[queryKey].lead
      : 'Cases matching your search. Compare the full internal size on each product page, or call (833) 236-0699 and we’ll tell you what fits.';
    root.querySelectorAll('[data-shop-title]').forEach((el) => (el.textContent = name));
    root.querySelector('[data-shop-lead]')!.textContent = lead;
    root.querySelector<HTMLElement>('[data-crumb-shop]')!.hidden = false;
    const chip = root.querySelector<HTMLElement>('[data-shop-chip]')!;
    chip.hidden = false;
    chip.setAttribute('aria-label', `Remove filter ${name}`);
    chip.querySelector('[data-shop-chip-label]')!.textContent = name;
    document.title = `${name} | Hull Cases`;
    for (const input of document.querySelectorAll<HTMLInputElement>('input[name="q"]')) if (q) input.value = params.get('q')!;
    if (queryKey) {
      const a = root.querySelector<HTMLAnchorElement>(`[data-fopt="${queryKey}"]`);
      if (a) {
        a.href = ROUTES.shop;
        a.setAttribute('aria-checked', 'true');
        a.querySelector('.fbox')?.classList.add('is-on');
      }
    }
  }

  const priceVal = (el: HTMLInputElement) => {
    const v = parseFloat(el.value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(v) ? Math.round(v * 100) : null;
  };

  function apply() {
    const min = priceVal(pmin);
    const max = priceVal(pmax);
    const visible = cards.filter((c) => {
      const price = parseInt(c.dataset.price!, 10);
      const ok = queryTest(c) && searchTest(c) && (min === null || price >= min) && (max === null || price <= max);
      c.hidden = !ok;
      return ok;
    });
    const order = sort.value;
    const sorted = [...cards].sort((a, b) => {
      if (order === 'price-asc') return +a.dataset.price! - +b.dataset.price! || +a.dataset.order! - +b.dataset.order!;
      if (order === 'price-desc') return +b.dataset.price! - +a.dataset.price! || +a.dataset.order! - +b.dataset.order!;
      return +a.dataset.order! - +b.dataset.order!;
    });
    sorted.forEach((c) => grid.appendChild(c));
    const n = visible.length;
    countEl.textContent = `${n} ${n === 1 ? 'case' : 'cases'}`;
    empty.hidden = n > 0;
    grid.hidden = n === 0;
  }

  let t: number | undefined;
  const debounced = () => {
    clearTimeout(t);
    t = window.setTimeout(apply, 200);
  };
  sort.addEventListener('change', apply);
  pmin.addEventListener('input', debounced);
  pmax.addEventListener('input', debounced);
  apply();

  // Mobile filter drawer
  const filters = root.querySelector<HTMLElement>('[data-filters]')!;
  const openBtn = root.querySelector<HTMLElement>('[data-open-filters]')!;
  const show = () => {
    filters.classList.add('is-open');
    filters.setAttribute('role', 'dialog');
    filters.setAttribute('aria-modal', 'true');
    openBtn.setAttribute('aria-expanded', 'true');
  };
  const hide = () => {
    filters.classList.remove('is-open');
    filters.removeAttribute('role');
    filters.removeAttribute('aria-modal');
    openBtn.setAttribute('aria-expanded', 'false');
  };
  openBtn.addEventListener('click', () => openOverlay(filters, { show, hide }));
  root.querySelectorAll('[data-close-filters]').forEach((b) => b.addEventListener('click', () => closeOverlay(filters)));
}
