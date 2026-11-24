// Huzaifa Sabah Uddin (Hexz) portfolio: order slip, stack check, section tabs, form submit.
// The page works without this file: tabs are anchors and the form posts to Formspree.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// === ORDER SLIP ===
// "Add to enquiry" buttons and the form's item checkboxes share one state, keyed by SKU.
const form = document.getElementById('order-form');
const countEl = document.getElementById('slip-count');
const addButtons = document.querySelectorAll('.btn-add[data-sku]');

function checkboxFor(sku) {
  return form ? form.querySelector(`input[name="services"][value^="${sku} "]`) : null;
}

function syncSlip(bump) {
  const selected = new Set();
  form?.querySelectorAll('input[name="services"]:checked').forEach(cb => selected.add(cb.value.split(' ')[0]));

  addButtons.forEach(btn => {
    const on = selected.has(btn.dataset.sku);
    btn.dataset.on = String(on);
    const label = btn.querySelector('.btn-label');
    if (!label) return;
    if (!label.dataset.off) label.dataset.off = label.textContent;
    label.textContent = on ? 'Remove from slip' : label.dataset.off;
  });

  if (countEl) {
    countEl.textContent = String(selected.size);
    const badge = countEl.closest('.tab-count');
    if (bump && badge && !reduceMotion.matches) {
      badge.classList.remove('bump');
      void badge.offsetWidth; // restart the animation
      badge.classList.add('bump');
    }
  }
}

addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const cb = checkboxFor(btn.dataset.sku);
    if (!cb) return;
    cb.checked = !cb.checked;
    syncSlip(true);
  });
});
form?.addEventListener('change', e => {
  if (e.target.name === 'services') syncSlip(true);
});
syncSlip(false);

// === STACK CHECK ===
// Visitor enters what each tool costs per month; totals update live and can be
// copied onto the order slip. Nothing leaves the page until the form is sent.
(function stackCheck() {
  const section = document.getElementById('stack-check');
  if (!section) return;
  section.hidden = false;

  const rows = [...section.querySelectorAll('tr[data-row]')];
  const out = {
    month: document.getElementById('calc-month'),
    year: document.getElementById('calc-year'),
    three: document.getElementById('calc-3y'),
  };
  const send = document.getElementById('calc-send');
  const hint = document.getElementById('calc-hint');
  const usd = n => '$' + Math.round(n).toLocaleString('en-US');
  const MARK = 'Stack check:';

  function selected() {
    return rows.map(row => {
      const cb = row.querySelector('input[type="checkbox"]');
      const amt = parseFloat(row.querySelector('.calc-amt').value);
      const other = row.querySelector('.calc-other');
      const name = row.dataset.tool || (other && other.value.trim()) || 'Other tool';
      return { on: cb.checked, name, amount: amt > 0 ? amt : 0 };
    }).filter(r => r.on);
  }

  function render() {
    const items = selected();
    const month = items.reduce((t, r) => t + r.amount, 0);
    out.month.textContent = usd(month);
    out.year.textContent = usd(month * 12);
    out.three.textContent = usd(month * 36);
    send.disabled = items.length === 0;
    hint.textContent = items.length === 0
      ? 'Tick at least one tool to continue.'
      : `${items.length} tool${items.length === 1 ? '' : 's'} selected.`;
  }

  rows.forEach(row => {
    const cb = row.querySelector('input[type="checkbox"]');
    const amt = row.querySelector('.calc-amt');
    const other = row.querySelector('.calc-other');
    // Typing a cost or a name ticks the row; clearing nothing un-ticks it.
    amt.addEventListener('input', () => { if (parseFloat(amt.value) > 0) cb.checked = true; render(); });
    other?.addEventListener('input', () => { if (other.value.trim()) cb.checked = true; render(); });
    cb.addEventListener('change', render);
  });

  send.addEventListener('click', () => {
    const items = selected();
    if (!items.length || !form) return;
    const month = items.reduce((t, r) => t + r.amount, 0);
    const list = items.map(r => r.amount ? `${r.name} ${usd(r.amount)}/mo` : r.name).join(', ');
    const line = `${MARK} ${list}. Total ${usd(month)}/mo (${usd(month * 12)}/yr).`;

    const msg = form.querySelector('textarea[name="message"]');
    const rest = msg.value.split('\n').filter(l => !l.startsWith(MARK)).join('\n').replace(/^\n+/, '');
    msg.value = rest ? `${line}\n\n${rest}` : `${line}\n\n`;

    const hx01 = checkboxFor('HX-01');
    if (hx01) hx01.checked = true;
    syncSlip(true);

    document.getElementById('enquire').scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    msg.focus({ preventScroll: true });
    msg.setSelectionRange(msg.value.length, msg.value.length);
  });

  render();
})();

// === ACTIVE TAB ===
const tabLinks = document.querySelectorAll('.tabs a');
const tabTargets = [...tabLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && tabTargets.length) {
  const tabObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      tabLinks.forEach(a => {
        const active = a.getAttribute('href') === '#' + entry.target.id;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  tabTargets.forEach(t => tabObserver.observe(t));
}

// === FORM SUBMIT (Formspree, without leaving the page) ===
form?.addEventListener('submit', async e => {
  e.preventDefault();
  const status = document.getElementById('f-status');
  const btn = document.getElementById('f-submit');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.textContent = '';
  status.className = 'form-status';
  try {
    const resp = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (resp.ok) {
      status.textContent = 'Order slip received. I\'ll reply within 24 hours.';
      status.classList.add('ok');
      form.reset();
      syncSlip(false);
    } else {
      let msg = 'That didn\'t send. Check the highlighted fields, or email huzaifasabah@gmail.com.';
      try {
        const data = await resp.json();
        if (data.errors?.length) msg = data.errors.map(x => x.message).join(' ');
      } catch { /* keep default */ }
      status.textContent = msg;
      status.classList.add('err');
    }
  } catch {
    status.textContent = 'No connection. Try again, or email huzaifasabah@gmail.com.';
    status.classList.add('err');
  }
  btn.disabled = false;
  btn.innerHTML = original;
});
