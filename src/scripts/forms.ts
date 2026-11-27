// Contact, custom-quote and newsletter forms.
// With PUBLIC_FORMS_ENDPOINT set, forms POST multipart/form-data there (Formspree, Basin, your API…).
// Without it, the visitor's email app opens a message to info@hullcases.com with the form filled in,
// so no enquiry is ever silently dropped.
const ENDPOINT: string = import.meta.env.PUBLIC_FORMS_ENDPOINT ?? '';
const TO = 'info@hullcases.com';

function labelFor(form: HTMLFormElement, el: Element): string {
  const id = el.getAttribute('id');
  const lab = id ? form.querySelector(`label[for="${id}"]`) : el.closest('label');
  const txt = (lab?.childNodes[0]?.textContent || lab?.textContent || el.getAttribute('name') || '').trim();
  return txt.replace(/\s+/g, ' ');
}

function asText(form: HTMLFormElement): string {
  const rows: string[] = [];
  const seen = new Set<string>();
  for (const el of Array.from(form.elements) as HTMLInputElement[]) {
    if (!el.name || el.type === 'submit' || el.type === 'file' || el.disabled) continue;
    if (el.type === 'checkbox') {
      if (el.checked) rows.push(`- ${labelFor(form, el)}`);
      continue;
    }
    if (seen.has(el.name) || !el.value.trim()) continue;
    seen.add(el.name);
    rows.push(`${labelFor(form, el)}: ${el.value.trim()}`);
  }
  return rows.join('\n');
}

export function initForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    const ok = form.querySelector<HTMLElement>('[data-form-success]');
    const err = form.querySelector<HTMLElement>('[data-form-error]');
    const fields = form.querySelector<HTMLElement>('[data-form-fields]');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const name = form.dataset.formName || 'Website form';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (err) err.hidden = true;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const done = () => {
        if (ok) ok.hidden = false;
        if (form.dataset.form === 'newsletter' && fields) fields.hidden = true;
        else form.reset();
      };

      if (!ENDPOINT) {
        const subject = `${name} – hullcases.com`;
        const body = form.dataset.form === 'newsletter' ? `Please add me to the restock and new-case emails.\n\n${asText(form)}` : asText(form);
        const hasFile = !!form.querySelector<HTMLInputElement>('input[type="file"]')?.files?.length;
        location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + (hasFile ? '\n\n(I’ll attach my files to this email.)' : ''))}`;
        done();
        return;
      }

      const data = new FormData(form);
      data.append('_form', name);
      data.append('_page', location.href);
      if (submit) submit.disabled = true;
      try {
        const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        done();
      } catch {
        if (err) {
          err.textContent = `Sorry, that didn’t send. Please try again, call (833) 236-0699 or email ${TO}.`;
          err.hidden = false;
        }
      } finally {
        if (submit) submit.disabled = false;
      }
    });
  });
}
