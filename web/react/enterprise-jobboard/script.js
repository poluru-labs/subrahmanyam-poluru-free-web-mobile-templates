const jobs = [
  {
    id: 1,
    title: 'Staff Frontend Engineer',
    company: 'Poluru Labs',
    initials: 'PL',
    location: 'Remote',
    department: 'Engineering',
    type: 'Full-time',
    salary: '$180k–$210k',
    tags: ['React', 'Design Systems', 'TypeScript'],
  },
  {
    id: 2,
    title: 'Senior Product Manager',
    company: 'Northwind Systems',
    initials: 'NW',
    location: 'Austin, TX',
    department: 'Product',
    type: 'Hybrid',
    salary: '$165k–$190k',
    tags: ['B2B SaaS', 'Roadmaps', 'Discovery'],
  },
  {
    id: 3,
    title: 'Principal UX Designer',
    company: 'Lumen Cloud',
    initials: 'LC',
    location: 'San Francisco, CA',
    department: 'Design',
    type: 'Hybrid',
    salary: '$170k–$200k',
    tags: ['Enterprise UX', 'Research', 'Figma'],
  },
  {
    id: 4,
    title: 'Data Scientist, Growth',
    company: 'Orbit Retail',
    initials: 'OR',
    location: 'Chicago, IL',
    department: 'Data',
    type: 'On-site',
    salary: '$145k–$170k',
    tags: ['Experimentation', 'SQL', 'Python'],
  },
  {
    id: 5,
    title: 'Platform Engineer',
    company: 'Beacon Finance',
    initials: 'BF',
    location: 'New York, NY',
    department: 'Engineering',
    type: 'Hybrid',
    salary: '$175k–$205k',
    tags: ['Kubernetes', 'CI/CD', 'Security'],
  },
  {
    id: 6,
    title: 'People Ops Partner',
    company: 'Atlas Health',
    initials: 'AH',
    location: 'Remote',
    department: 'People Ops',
    type: 'Remote',
    salary: '$120k–$140k',
    tags: ['HRIS', 'Onboarding', 'ER'],
  },
];

const jobGrid = document.getElementById('jobGrid');
const searchForm = document.getElementById('jobSearchForm');
const searchFeedback = document.getElementById('searchFeedback');
const keywordInput = document.getElementById('keyword');
const locationSelect = document.getElementById('location');
const departmentSelect = document.getElementById('department');

let activeFilter = 'all';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderJobs(list) {
  if (!jobGrid) return;

  if (!list.length) {
    jobGrid.innerHTML = `
      <div class="col-12">
        <div class="card-surface p-4 text-center">
          <h3 class="h5 mb-2">No roles match those filters</h3>
          <p class="mb-0 text-secondary">Try another keyword, location, or department.</p>
        </div>
      </div>
    `;
    return;
  }

  jobGrid.innerHTML = list
    .map(
      (job) => `
      <div class="col-md-6 col-xl-4">
        <article class="job-card" data-department="${escapeHtml(job.department)}">
          <div class="job-card__top">
            <div class="job-card__company">
              <div class="job-logo" aria-hidden="true">${escapeHtml(job.initials)}</div>
              <div>
                <strong>${escapeHtml(job.company)}</strong>
                <div class="job-meta mt-1">
                  <span class="badge-soft badge-soft--muted">${escapeHtml(job.location)}</span>
                  <span class="badge-soft">${escapeHtml(job.department)}</span>
                </div>
              </div>
            </div>
          </div>
          <h3>${escapeHtml(job.title)}</h3>
          <p>${escapeHtml(job.tags.join(' · '))} · ${escapeHtml(job.type)}</p>
          <div class="job-card__foot">
            <strong>${escapeHtml(job.salary)}</strong>
            <button class="btn btn-brand btn-sm apply-btn" type="button" data-job="${escapeHtml(job.title)}">
              Apply
            </button>
          </div>
        </article>
      </div>
    `,
    )
    .join('');
}

function getFilteredJobs() {
  const keyword = (keywordInput?.value || '').trim().toLowerCase();
  const location = locationSelect?.value || '';
  const department = departmentSelect?.value || '';

  return jobs.filter((job) => {
    const haystack = `${job.title} ${job.company} ${job.tags.join(' ')} ${job.department}`.toLowerCase();
    const matchesKeyword = !keyword || haystack.includes(keyword);
    const matchesLocation = !location || job.location === location;
    const matchesDepartment =
      (!department || job.department === department) &&
      (activeFilter === 'all' || job.department === activeFilter);
    return matchesKeyword && matchesLocation && matchesDepartment;
  });
}

function refreshJobs(message) {
  const list = getFilteredJobs();
  renderJobs(list);
  if (searchFeedback) {
    if (message) {
      searchFeedback.hidden = false;
      searchFeedback.textContent = message;
    } else {
      searchFeedback.hidden = true;
      searchFeedback.textContent = '';
    }
  }
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

function setupCounterObserver() {
  const section = document.getElementById('insights');
  if (!section) return;

  let played = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !played) {
          played = true;
          animateCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.35 },
  );

  observer.observe(section);
}

function setupTabs() {
  const tabs = document.querySelectorAll('.audience-tab');
  const panels = {
    candidates: document.getElementById('panel-candidates'),
    employers: document.getElementById('panel-employers'),
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.tab;
      tabs.forEach((t) => {
        const selected = t === tab;
        t.classList.toggle('is-active', selected);
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
      });
      Object.entries(panels).forEach(([name, panel]) => {
        if (!panel) return;
        const show = name === key;
        panel.classList.toggle('is-active', show);
        panel.hidden = !show;
      });
    });
  });
}

function setupNavScroll() {
  const nav = document.getElementById('siteNav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter || 'all';
      refreshJobs(`Showing ${activeFilter === 'all' ? 'all' : activeFilter} roles.`);
    });
  });
}

function setupSearch() {
  searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const list = getFilteredJobs();
    refreshJobs(
      list.length
        ? `Found ${list.length} role${list.length === 1 ? '' : 's'} matching your search.`
        : 'No roles matched. Adjust filters and try again.',
    );
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      if (keywordInput) keywordInput.value = chip.dataset.keyword || '';
      refreshJobs(`Filtered for “${chip.dataset.keyword}”.`);
      document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  jobGrid?.addEventListener('click', (event) => {
    const button = event.target.closest('.apply-btn');
    if (!button) return;
    button.textContent = 'Applied';
    button.disabled = true;
    if (searchFeedback) {
      searchFeedback.hidden = false;
      searchFeedback.textContent = `Application started for ${button.dataset.job}. A recruiter will follow up shortly.`;
    }
  });
}

function setupLeadForm() {
  const form = document.getElementById('leadForm');
  const note = document.getElementById('leadNote');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || 'there');
    if (note) {
      note.textContent = `Thanks, ${name}. We’ll send a talent brief within one business day.`;
    }
    form.reset();
  });
}

document.getElementById('year').textContent = String(new Date().getFullYear());

renderJobs(jobs);
setupNavScroll();
setupTabs();
setupFilters();
setupSearch();
setupCounterObserver();
setupLeadForm();
