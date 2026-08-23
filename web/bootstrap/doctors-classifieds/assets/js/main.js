/**
 * DocBoard — Doctors Classifieds
 * Loads EDS web components + marketplace UX behaviors
 */
import '@poluru-labs/enterprise-design-system-wc/tokens.css';
import '@poluru-labs/enterprise-design-system-wc';
import { showToast } from '@poluru-labs/enterprise-design-system-wc';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Mobile nav close on link click */
const navCollapseEl = document.getElementById('dcNav');
const navCollapse =
  navCollapseEl && window.bootstrap
    ? bootstrap.Collapse.getOrCreateInstance(navCollapseEl, { toggle: false })
    : null;

document.querySelectorAll('#dcNav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 992 && navCollapse) navCollapse.hide();
  });
});

/* Sticky header elevation */
const header = document.getElementById('dcHeader');
function syncHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

/* Back to top */
const backTop = document.getElementById('dcBackTop');
function syncBackTop() {
  backTop?.classList.toggle('is-visible', window.scrollY > 480);
}
window.addEventListener('scroll', syncBackTop, { passive: true });
syncBackTop();
backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* Newsletter */
document.getElementById('dcNewsletter')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const email = form.querySelector('input[type="email"]');
  if (!email?.value) {
    showToast({ title: 'Enter your email', variant: 'warning' });
    return;
  }
  showToast({ title: 'Subscribed', description: 'Healthcare insights are on the way.', variant: 'success' });
  form.reset();
});

/* Save listing */
document.querySelectorAll('[data-save-listing]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const saved = btn.classList.toggle('is-saved');
    btn.setAttribute('aria-pressed', String(saved));
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = saved ? 'bi bi-bookmark-fill' : 'bi bi-bookmark';
    }
    showToast({
      title: saved ? 'Listing saved' : 'Removed from saved',
      variant: 'success',
    });
  });
});

/* Share listing */
document.querySelectorAll('[data-share-listing]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const url = btn.getAttribute('data-share-listing') || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      showToast({ title: 'Link copied', variant: 'info' });
    } catch {
      showToast({ title: 'Unable to copy link', variant: 'warning' });
    }
  });
});

/* Contact seller modal */
const contactModal = document.getElementById('dcContactModal');
document.querySelectorAll('[data-contact-seller]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (contactModal) contactModal.open = true;
  });
});
document.getElementById('dcContactSend')?.addEventListener('click', () => {
  if (contactModal) contactModal.open = false;
  showToast({ title: 'Message sent', description: 'The poster will reply by email.', variant: 'success' });
});
document.getElementById('dcContactCancel')?.addEventListener('click', () => {
  if (contactModal) contactModal.open = false;
});

/* Listing filters */
const listingGrid = document.getElementById('dcListingGrid');
if (listingGrid) {
  const search = document.getElementById('dcFilterSearch');
  const specialty = document.getElementById('dcFilterSpecialty');
  const location = document.getElementById('dcFilterLocation');
  const category = document.getElementById('dcFilterCategory');
  const type = document.getElementById('dcFilterType');
  const empty = document.getElementById('dcListingEmpty');
  const cards = Array.from(listingGrid.querySelectorAll('[data-listing-card]'));

  const apply = () => {
    const q = (search?.value || '').trim().toLowerCase();
    const spec = specialty?.value || 'all';
    const loc = location?.value || 'all';
    const cat = category?.value || 'all';
    const typ = type?.value || 'all';
    let visible = 0;
    cards.forEach((card) => {
      const text = card.textContent?.toLowerCase() || '';
      const matchQ = !q || text.includes(q);
      const matchSpec = spec === 'all' || card.getAttribute('data-specialty') === spec;
      const matchLoc = loc === 'all' || card.getAttribute('data-location') === loc;
      const matchCat = cat === 'all' || card.getAttribute('data-category') === cat;
      const matchType = typ === 'all' || card.getAttribute('data-type') === typ;
      const show = matchQ && matchSpec && matchLoc && matchCat && matchType;
      card.classList.toggle('d-none', !show);
      if (show) visible += 1;
    });
    empty?.classList.toggle('d-none', visible > 0);
  };

  [search, specialty, location, category, type].forEach((el) => {
    el?.addEventListener('input', apply);
    el?.addEventListener('change', apply);
  });
  document.getElementById('dcFilterReset')?.addEventListener('click', () => {
    if (search) search.value = '';
    [specialty, location, category, type].forEach((el) => {
      if (el) el.value = 'all';
    });
    apply();
  });
}

/* Populate EDS selects where present */
function setSelectOptions(id, options) {
  const el = document.getElementById(id);
  if (!el) return;
  el.options = options;
}

setSelectOptions('dcPostCategory', [
  { label: 'Select category', value: '' },
  { label: 'Jobs', value: 'jobs' },
  { label: 'Clinics & Practice', value: 'clinics' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'CME & Events', value: 'cme' },
  { label: 'Locum Tenens', value: 'locum' },
]);

setSelectOptions('dcPostSpecialty', [
  { label: 'Select specialty', value: '' },
  { label: 'Cardiology', value: 'cardiology' },
  { label: 'Family Medicine', value: 'family' },
  { label: 'Internal Medicine', value: 'internal' },
  { label: 'Pediatrics', value: 'pediatrics' },
  { label: 'Radiology', value: 'radiology' },
  { label: 'Surgery', value: 'surgery' },
]);

setSelectOptions('dcPostLocation', [
  { label: 'Select location', value: '' },
  { label: 'Chicago, IL', value: 'chicago' },
  { label: 'Austin, TX', value: 'austin' },
  { label: 'Remote / Telehealth', value: 'remote' },
  { label: 'New York, NY', value: 'nyc' },
  { label: 'Seattle, WA', value: 'seattle' },
]);

/* Auth + post + contact forms */
function wireForm(id, successTitle, successDesc) {
  document.getElementById(id)?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast({ title: successTitle, description: successDesc, variant: 'success' });
    event.currentTarget.reset?.();
  });
}

wireForm('dcLoginForm', 'Signed in', 'Welcome back to DocBoard.');
wireForm('dcRegisterForm', 'Account created', 'Verify your email to start posting.');
wireForm('dcPostForm', 'Listing submitted', 'Your classified is pending review.');
wireForm('dcContactForm', 'Message delivered', 'Our team will respond within one business day.');

/* Dashboard ad actions */
document.querySelectorAll('[data-dash-action]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-dash-action');
    showToast({
      title: action === 'pause' ? 'Listing paused' : action === 'boost' ? 'Boost requested' : 'Listing removed',
      variant: action === 'delete' ? 'warning' : 'success',
    });
  });
});

/* Hero search */
document.getElementById('dcHeroSearch')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const q = new FormData(event.currentTarget).get('q');
  const params = new URLSearchParams();
  if (q) params.set('q', String(q));
  window.location.href = `listings.html${params.toString() ? `?${params}` : ''}`;
});

/* Prefill listings search from query string */
const urlQ = new URLSearchParams(window.location.search).get('q');
if (urlQ && document.getElementById('dcFilterSearch')) {
  document.getElementById('dcFilterSearch').value = urlQ;
  document.getElementById('dcFilterSearch').dispatchEvent(new Event('input'));
}
