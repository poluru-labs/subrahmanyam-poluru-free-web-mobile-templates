const jobs = [
  {
    id: 'j1',
    title: 'Staff Frontend Engineer',
    company: 'Poluru Labs',
    dept: 'Engineering',
    location: 'Remote',
    status: 'published',
    applicants: 86,
    featured: true,
  },
  {
    id: 'j2',
    title: 'Senior Product Manager',
    company: 'Northwind Systems',
    dept: 'Product',
    location: 'Austin, TX',
    status: 'pending',
    applicants: 42,
    featured: false,
  },
  {
    id: 'j3',
    title: 'Principal UX Designer',
    company: 'Lumen Cloud',
    dept: 'Design',
    location: 'San Francisco, CA',
    status: 'published',
    applicants: 57,
    featured: true,
  },
  {
    id: 'j4',
    title: 'Data Scientist, Growth',
    company: 'Orbit Retail',
    dept: 'Data',
    location: 'Chicago, IL',
    status: 'draft',
    applicants: 0,
    featured: false,
  },
  {
    id: 'j5',
    title: 'Platform Engineer',
    company: 'Beacon Finance',
    dept: 'Engineering',
    location: 'New York, NY',
    status: 'published',
    applicants: 71,
    featured: false,
  },
  {
    id: 'j6',
    title: 'Design Systems Lead',
    company: 'Atlas Health',
    dept: 'Design',
    location: 'Remote',
    status: 'closed',
    applicants: 120,
    featured: false,
  },
];

const applicants = [
  {
    id: 'a1',
    name: 'Sravani Poluru',
    skills: 'React · TypeScript',
    experience: '9 yrs',
    location: 'Austin, TX',
    stage: 'Interview',
  },
  {
    id: 'a2',
    name: 'Venkata Poluru',
    skills: 'Product · Discovery',
    experience: '11 yrs',
    location: 'Chicago, IL',
    stage: 'Screening',
  },
  {
    id: 'a3',
    name: 'Lakshmi Poluru',
    skills: 'UX · Research',
    experience: '8 yrs',
    location: 'Remote',
    stage: 'Offer',
  },
  {
    id: 'a4',
    name: 'Ramesh Poluru',
    skills: 'Python · ML',
    experience: '7 yrs',
    location: 'New York, NY',
    stage: 'Applied',
  },
  {
    id: 'a5',
    name: 'Ananya Poluru',
    skills: 'Kubernetes · SRE',
    experience: '10 yrs',
    location: 'San Francisco, CA',
    stage: 'Interview',
  },
];

const employers = [
  { id: 'e1', name: 'Northwind Systems', roles: 24, verified: true, plan: 'Enterprise' },
  { id: 'e2', name: 'Atlas Health', roles: 18, verified: true, plan: 'Growth' },
  { id: 'e3', name: 'Beacon Finance', roles: 31, verified: false, plan: 'Enterprise' },
  { id: 'e4', name: 'Orbit Retail', roles: 12, verified: true, plan: 'Starter' },
  { id: 'e5', name: 'Lumen Cloud', roles: 21, verified: true, plan: 'Growth' },
  { id: 'e6', name: 'Harbor Logistics', roles: 9, verified: false, plan: 'Starter' },
];

const recruiters = [
  { id: 'r1', name: 'Subrahmanyam Poluru', load: 18, specialty: 'Engineering', openReqs: 7 },
  { id: 'r2', name: 'Sravani Poluru', load: 14, specialty: 'Product', openReqs: 5 },
  { id: 'r3', name: 'Lakshmi Poluru', load: 11, specialty: 'Design', openReqs: 4 },
  { id: 'r4', name: 'Venkata Poluru', load: 16, specialty: 'Data', openReqs: 6 },
];

const pipeline = {
  Applied: [
    { name: 'Ramesh Poluru', role: 'Data Scientist' },
    { name: 'Meera Poluru', role: 'PM Ops' },
  ],
  Screening: [
    { name: 'Venkata Poluru', role: 'Senior PM' },
    { name: 'Arjun Poluru', role: 'Platform Eng' },
  ],
  Interview: [
    { name: 'Sravani Poluru', role: 'Staff Frontend' },
    { name: 'Ananya Poluru', role: 'SRE Lead' },
  ],
  Offer: [{ name: 'Lakshmi Poluru', role: 'Principal UX' }],
};

const notifications = [
  {
    title: 'Job pending approval',
    detail: 'Northwind Systems · Senior Product Manager',
    time: '8 min ago',
  },
  {
    title: 'Employer verification needed',
    detail: 'Beacon Finance submitted documents',
    time: '26 min ago',
  },
  {
    title: 'Offer accepted',
    detail: 'Lakshmi Poluru · Principal UX Designer',
    time: '1 hr ago',
  },
];

const funnel = [
  { label: 'Applied', value: 1864, pct: 100 },
  { label: 'Screened', value: 942, pct: 51 },
  { label: 'Interview', value: 418, pct: 22 },
  { label: 'Offer', value: 126, pct: 7 },
  { label: 'Hired', value: 84, pct: 5 },
];

const channels = [
  { label: 'Career site', value: 38 },
  { label: 'LinkedIn', value: 27 },
  { label: 'Referrals', value: 18 },
  { label: 'Agencies', value: 10 },
  { label: 'Campus', value: 7 },
];

const departments = [
  { label: 'Engineering', value: 42 },
  { label: 'Product', value: 21 },
  { label: 'Design', value: 14 },
  { label: 'Data', value: 16 },
  { label: 'People Ops', value: 7 },
];

const state = {
  jobs: [...jobs],
  page: 'overview',
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toast(title, detail = '') {
  const stack = document.getElementById('toastStack');
  if (!stack) return;
  const item = document.createElement('div');
  item.className = 'toast-item';
  item.innerHTML = `<strong>${escapeHtml(title)}</strong>${detail ? `<span>${escapeHtml(detail)}</span>` : ''}`;
  stack.appendChild(item);
  window.setTimeout(() => item.remove(), 2800);
}

function statusPill(status) {
  const map = {
    published: 'success',
    pending: 'warning',
    draft: 'neutral',
    closed: 'danger',
    Interview: 'warning',
    Screening: 'neutral',
    Offer: 'success',
    Applied: 'neutral',
  };
  return `<span class="pill ${map[status] || 'neutral'}">${escapeHtml(status)}</span>`;
}

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function animateCounters() {
  document.querySelectorAll('.counter').forEach((el) => {
    const target = Number(el.dataset.target || 0);
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

function renderOverview() {
  const funnelList = document.getElementById('funnelList');
  const attention = document.getElementById('attentionFeed');
  const recent = document.getElementById('recentAppsBody');
  const topEmployers = document.getElementById('topEmployers');

  if (funnelList) {
    funnelList.innerHTML = funnel
      .map(
        (row) => `
      <li>
        <div class="funnel__top">
          <strong>${escapeHtml(row.label)}</strong>
          <span class="muted">${row.value.toLocaleString()}</span>
        </div>
        <div class="funnel-bar"><span style="width:${row.pct}%"></span></div>
      </li>`,
      )
      .join('');
  }

  if (attention) {
    attention.innerHTML = [
      {
        title: '2 jobs awaiting moderation',
        detail: 'Approve or request edits before publish.',
      },
      {
        title: 'Beacon Finance verification pending',
        detail: 'Review business documents.',
      },
      {
        title: 'SLA risk on 4 interviews',
        detail: 'Feedback overdue > 48 hours.',
      },
    ]
      .map(
        (item) => `
      <li>
        <div class="feed__top">
          <strong>${escapeHtml(item.title)}</strong>
          <span class="badge-soft">Action</span>
        </div>
        <small>${escapeHtml(item.detail)}</small>
      </li>`,
      )
      .join('');
  }

  if (recent) {
    recent.innerHTML = applicants
      .slice(0, 4)
      .map(
        (a) => `
      <tr>
        <td><strong>${escapeHtml(a.name)}</strong></td>
        <td>${escapeHtml(a.skills.split(' · ')[0])}</td>
        <td>${statusPill(a.stage)}</td>
        <td class="muted">Today</td>
      </tr>`,
      )
      .join('');
  }

  if (topEmployers) {
    topEmployers.innerHTML = employers
      .slice(0, 4)
      .map(
        (e) => `
      <li>
        <div class="feed__top">
          <div class="d-flex align-items-center gap-2">
            <span class="logo">${escapeHtml(initials(e.name))}</span>
            <div>
              <strong>${escapeHtml(e.name)}</strong>
              <small class="d-block">${e.roles} open roles · ${escapeHtml(e.plan)}</small>
            </div>
          </div>
          ${e.verified ? '<span class="pill success">Verified</span>' : '<span class="pill warning">Review</span>'}
        </div>
      </li>`,
      )
      .join('');
  }
}

function renderJobs() {
  const grid = document.getElementById('jobsGrid');
  const status = document.getElementById('jobStatusFilter')?.value || 'all';
  const dept = document.getElementById('jobDeptFilter')?.value || 'all';
  const list = state.jobs.filter(
    (j) =>
      (status === 'all' || j.status === status) &&
      (dept === 'all' || j.dept === dept),
  );

  document.getElementById('navJobsCount').textContent = String(
    state.jobs.filter((j) => j.status === 'published' || j.status === 'pending').length,
  );

  if (!grid) return;
  grid.innerHTML = list
    .map(
      (job) => `
    <div class="col-md-6 col-xl-4">
      <article class="job-card card">
        <div class="job-card__top">
          <div class="d-flex align-items-center gap-2">
            <span class="logo">${escapeHtml(initials(job.company))}</span>
            <div>
              <strong>${escapeHtml(job.company)}</strong>
              <small class="d-block muted">${escapeHtml(job.location)}</small>
            </div>
          </div>
          ${statusPill(job.status)}
        </div>
        <h3>${escapeHtml(job.title)}</h3>
        <p>${escapeHtml(job.dept)} · ${job.applicants} applicants ${job.featured ? '· Featured' : ''}</p>
        <div class="job-card__actions">
          ${
            job.status === 'pending'
              ? `<button class="btn btn-brand btn-sm" data-job-action="approve" data-id="${job.id}">Approve</button>
                 <button class="btn btn-soft btn-sm" data-job-action="reject" data-id="${job.id}">Reject</button>`
              : ''
          }
          ${
            job.status === 'published'
              ? `<button class="btn btn-soft btn-sm" data-job-action="feature" data-id="${job.id}">${job.featured ? 'Unfeature' : 'Feature'}</button>
                 <button class="btn btn-soft btn-sm" data-job-action="close" data-id="${job.id}">Close</button>`
              : ''
          }
          ${
            job.status === 'draft'
              ? `<button class="btn btn-brand btn-sm" data-job-action="publish" data-id="${job.id}">Publish</button>`
              : ''
          }
        </div>
      </article>
    </div>`,
    )
    .join('');
}

function renderApplicants(filter = '') {
  const body = document.getElementById('applicantsBody');
  if (!body) return;
  const q = filter.trim().toLowerCase();
  const list = applicants.filter(
    (a) =>
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.skills.toLowerCase().includes(q),
  );
  body.innerHTML = list
    .map(
      (a) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2">
          <span class="avatar">${escapeHtml(initials(a.name))}</span>
          <strong>${escapeHtml(a.name)}</strong>
        </div>
      </td>
      <td>${escapeHtml(a.skills)}</td>
      <td>${escapeHtml(a.experience)}</td>
      <td>${escapeHtml(a.location)}</td>
      <td>${statusPill(a.stage)}</td>
      <td><button class="btn btn-soft btn-sm" data-shortlist="${escapeHtml(a.name)}">Shortlist</button></td>
    </tr>`,
    )
    .join('');
}

function renderEmployers() {
  const grid = document.getElementById('employersGrid');
  if (!grid) return;
  grid.innerHTML = employers
    .map(
      (e) => `
    <div class="col-md-6 col-xl-4">
      <article class="employer-card card">
        <div class="employer-card__top">
          <div class="d-flex align-items-center gap-2">
            <span class="logo">${escapeHtml(initials(e.name))}</span>
            <div>
              <h3 class="mb-0">${escapeHtml(e.name)}</h3>
              <p class="mb-0">${escapeHtml(e.plan)} plan</p>
            </div>
          </div>
          ${e.verified ? '<span class="pill success">Verified</span>' : '<span class="pill warning">Unverified</span>'}
        </div>
        <p>${e.roles} active roles on marketplace</p>
        <div class="employer-card__actions">
          ${
            e.verified
              ? `<button class="btn btn-soft btn-sm" data-employer-action="suspend" data-id="${e.id}">Suspend</button>`
              : `<button class="btn btn-brand btn-sm" data-employer-action="verify" data-id="${e.id}">Verify</button>`
          }
          <button class="btn btn-soft btn-sm" data-employer-action="view" data-id="${e.id}">View jobs</button>
        </div>
      </article>
    </div>`,
    )
    .join('');
}

function renderPipeline() {
  const board = document.getElementById('kanbanBoard');
  if (!board) return;
  board.innerHTML = Object.entries(pipeline)
    .map(
      ([stage, cards]) => `
    <div class="kanban-col">
      <h3>${escapeHtml(stage)} <span class="pill neutral">${cards.length}</span></h3>
      ${cards
        .map(
          (c) => `
        <article class="kanban-card">
          <strong>${escapeHtml(c.name)}</strong>
          <small>${escapeHtml(c.role)}</small>
          <div class="mt-2">
            <button class="btn btn-soft btn-sm" data-advance="${escapeHtml(stage)}" data-name="${escapeHtml(c.name)}">Advance</button>
          </div>
        </article>`,
        )
        .join('')}
    </div>`,
    )
    .join('');
}

function renderRecruiters() {
  const grid = document.getElementById('recruitersGrid');
  if (!grid) return;
  grid.innerHTML = recruiters
    .map(
      (r) => `
    <div class="col-md-6 col-xl-3">
      <article class="recruiter-card card">
        <div class="d-flex align-items-center gap-2">
          <span class="avatar">${escapeHtml(initials(r.name))}</span>
          <div>
            <h3 class="mb-0">${escapeHtml(r.name)}</h3>
            <p class="mb-0">${escapeHtml(r.specialty)}</p>
          </div>
        </div>
        <div class="meter-meta mt-2">
          <span>Load ${r.load}</span>
          <span>${r.openReqs} reqs</span>
        </div>
        <div class="meter-bar"><span style="width:${Math.min(100, r.load * 5)}%"></span></div>
      </article>
    </div>`,
    )
    .join('');
}

function renderReports() {
  const channel = document.getElementById('channelReport');
  const dept = document.getElementById('deptReport');
  const fill = (el, rows) => {
    if (!el) return;
    el.innerHTML = rows
      .map(
        (r) => `
      <li>
        <div class="meter-meta">
          <span>${escapeHtml(r.label)}</span>
          <span>${r.value}%</span>
        </div>
        <div class="meter-bar"><span style="width:${r.value}%"></span></div>
      </li>`,
      )
      .join('');
  };
  fill(channel, channels);
  fill(dept, departments);
}

function renderNotifications() {
  const list = document.getElementById('notifyList');
  if (!list) return;
  list.innerHTML = notifications
    .map(
      (n) => `
    <li>
      <div class="feed__top">
        <strong>${escapeHtml(n.title)}</strong>
        <span class="muted">${escapeHtml(n.time)}</span>
      </div>
      <small>${escapeHtml(n.detail)}</small>
    </li>`,
    )
    .join('');
}

function setPage(page) {
  state.page = page;
  document.querySelectorAll('.nav-link[data-page]').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach((section) => {
    const active = section.id === `page-${page}`;
    section.classList.toggle('is-active', active);
    section.hidden = !active;
    if (active) {
      document.getElementById('pageTitle').textContent = section.dataset.title || page;
      document.getElementById('pageCrumb').textContent = section.dataset.title || page;
      document.getElementById('pageSub').textContent = section.dataset.sub || '';
    }
  });
  document.getElementById('app')?.classList.remove('nav-open');
  document.getElementById('scrim').hidden = true;
  window.location.hash = page;
}

function findJob(id) {
  return state.jobs.find((j) => j.id === id);
}

function setupRouting() {
  document.querySelectorAll('[data-page]').forEach((el) => {
    el.addEventListener('click', () => setPage(el.dataset.page));
  });
  document.querySelectorAll('[data-page-jump]').forEach((el) => {
    el.addEventListener('click', () => setPage(el.dataset.pageJump));
  });

  const initial = (window.location.hash || '#overview').replace('#', '');
  setPage(
    [
      'overview',
      'jobs',
      'applicants',
      'employers',
      'applications',
      'recruiters',
      'reports',
      'settings',
    ].includes(initial)
      ? initial
      : 'overview',
  );
}

function setupMobileNav() {
  const app = document.getElementById('app');
  const scrim = document.getElementById('scrim');
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    app.classList.add('nav-open');
    scrim.hidden = false;
  });
  scrim?.addEventListener('click', () => {
    app.classList.remove('nav-open');
    closeDrawer();
    scrim.hidden = true;
  });
}

function openDrawer() {
  document.getElementById('notifyDrawer')?.classList.add('is-open');
  document.getElementById('notifyDrawer')?.setAttribute('aria-hidden', 'false');
  document.getElementById('scrim').hidden = false;
}

function closeDrawer() {
  document.getElementById('notifyDrawer')?.classList.remove('is-open');
  document.getElementById('notifyDrawer')?.setAttribute('aria-hidden', 'true');
  if (!document.getElementById('app')?.classList.contains('nav-open')) {
    document.getElementById('scrim').hidden = true;
  }
}

function setupDrawer() {
  document.getElementById('notifyBtn')?.addEventListener('click', openDrawer);
  document.getElementById('closeDrawer')?.addEventListener('click', closeDrawer);
}

function setupActions() {
  document.getElementById('refreshBtn')?.addEventListener('click', () => {
    document.getElementById('lastUpdated').textContent = `Updated ${new Date().toLocaleTimeString()}`;
    animateCounters();
    toast('Dashboard refreshed');
  });

  document.querySelectorAll('.seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-btn').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      toast('Period updated', btn.dataset.period);
      animateCounters();
    });
  });

  document.getElementById('jobStatusFilter')?.addEventListener('change', renderJobs);
  document.getElementById('jobDeptFilter')?.addEventListener('change', renderJobs);

  document.getElementById('addJobBtn')?.addEventListener('click', () => {
    const id = `j${Date.now()}`;
    state.jobs.unshift({
      id,
      title: 'New Enterprise Role',
      company: 'Poluru Labs',
      dept: 'Engineering',
      location: 'Remote',
      status: 'draft',
      applicants: 0,
      featured: false,
    });
    renderJobs();
    toast('Draft job created', 'Complete details before publishing.');
  });

  document.getElementById('jobsGrid')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-job-action]');
    if (!btn) return;
    const job = findJob(btn.dataset.id);
    if (!job) return;
    const action = btn.dataset.jobAction;
    if (action === 'approve' || action === 'publish') job.status = 'published';
    if (action === 'reject') job.status = 'draft';
    if (action === 'close') job.status = 'closed';
    if (action === 'feature') job.featured = !job.featured;
    renderJobs();
    toast(`Job ${action}d`, job.title);
  });

  document.getElementById('applicantSearch')?.addEventListener('input', (e) => {
    renderApplicants(e.target.value);
  });

  document.getElementById('applicantsBody')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-shortlist]');
    if (!btn) return;
    toast('Candidate shortlisted', btn.dataset.shortlist);
  });

  document.getElementById('exportApplicantsBtn')?.addEventListener('click', () => {
    toast('Export queued', 'Applicants CSV will download shortly.');
  });

  document.getElementById('employersGrid')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-employer-action]');
    if (!btn) return;
    const employer = employers.find((e) => e.id === btn.dataset.id);
    if (!employer) return;
    if (btn.dataset.employerAction === 'verify') {
      employer.verified = true;
      renderEmployers();
      toast('Employer verified', employer.name);
    } else if (btn.dataset.employerAction === 'suspend') {
      toast('Employer suspended', employer.name);
    } else {
      setPage('jobs');
      toast('Showing employer jobs', employer.name);
    }
  });

  document.getElementById('kanbanBoard')?.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-advance]');
    if (!btn) return;
    toast('Stage advanced', `${btn.dataset.name} moved forward`);
  });

  document.getElementById('settingsForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = document.getElementById('settingsNote');
    if (note) note.textContent = 'Settings saved for Jobs Raja marketplace.';
    toast('Settings saved');
  });

  document.getElementById('auditBtn')?.addEventListener('click', () => {
    toast('Audit log export started');
  });

  document.getElementById('globalSearch')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const q = event.target.value.trim();
    if (!q) return;
    setPage('jobs');
    toast('Search results', q);
  });
}

function setupTopbarScroll() {
  const topbar = document.querySelector('.topbar');
  const onScroll = () => topbar?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

renderOverview();
renderJobs();
renderApplicants();
renderEmployers();
renderPipeline();
renderRecruiters();
renderReports();
renderNotifications();
setupRouting();
setupMobileNav();
setupDrawer();
setupActions();
setupTopbarScroll();
animateCounters();
