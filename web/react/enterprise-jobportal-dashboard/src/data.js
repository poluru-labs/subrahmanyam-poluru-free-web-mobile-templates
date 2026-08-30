export const productName = 'Jobs Raja';

export const currentUser = {
  name: 'Kavya Poluru',
  email: 'kavya.poluru@polurulabs.example',
  role: 'Talent lead',
};

export const navItems = [
  { id: 'overview', label: 'Overview', href: '#/overview', icon: 'home' },
  { id: 'jobs', label: 'Jobs', href: '#/jobs', icon: 'folder' },
  { id: 'candidates', label: 'Candidates', href: '#/candidates', icon: 'user' },
  { id: 'pipeline', label: 'Pipeline', href: '#/pipeline', icon: 'check-circle' },
  { id: 'employers', label: 'Employers', href: '#/employers', icon: 'star' },
  { id: 'settings', label: 'Settings', href: '#/settings', icon: 'settings' },
];

export const kpis = [
  { label: 'Open roles', value: '257', hint: 'Across 7 employers', trend: 'up', trendValue: '+14' },
  { label: 'New applicants', value: '1,864', hint: 'This week on Jobs Raja', trend: 'up', trendValue: '+8.4%' },
  { label: 'Time to hire', value: '18d', hint: 'Median for engineering', trend: 'down', trendValue: '-2d' },
  { label: 'Offer accept', value: '41%', hint: 'Lakshmi Poluru’s UX seat', trend: 'up', trendValue: '+3 pts' },
];

export const applySeries = [112, 128, 141, 136, 158, 172, 164, 181, 190, 186, 204, 198];

export function sparkPoints(values, width = 220, height = 56) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');
}

export const jobs = [
  { id: 'j_front', title: 'Staff Frontend Engineer', company: 'Poluru Labs', dept: 'Engineering', location: 'Remote', owner: 'Kavya Poluru', status: 'Published', applicants: 86, featured: true, salary: '$180–210k' },
  { id: 'j_pm', title: 'Senior Product Manager', company: 'Northwind Systems', dept: 'Product', location: 'Austin, TX', owner: 'Venkata Poluru', status: 'Review', applicants: 42, featured: false, salary: '$165–190k' },
  { id: 'j_ux', title: 'Principal UX Designer', company: 'Lumen Cloud', dept: 'Design', location: 'San Francisco, CA', owner: 'Lakshmi Poluru', status: 'Published', applicants: 57, featured: true, salary: '$170–200k' },
  { id: 'j_data', title: 'Data Scientist, Growth', company: 'Orbit Retail', dept: 'Data', location: 'Chicago, IL', owner: 'Ramesh Poluru', status: 'Draft', applicants: 0, featured: false, salary: '$150–175k' },
  { id: 'j_plat', title: 'Platform Engineer', company: 'Beacon Finance', dept: 'Engineering', location: 'New York, NY', owner: 'Ananya Poluru', status: 'Published', applicants: 71, featured: false, salary: '$160–185k' },
  { id: 'j_ds', title: 'Design Systems Lead', company: 'Atlas Health', dept: 'Design', location: 'Remote', owner: 'Sravani Poluru', status: 'Closed', applicants: 120, featured: false, salary: '$155–180k' },
  { id: 'j_sre', title: 'Staff SRE', company: 'Poluru Labs', dept: 'Engineering', location: 'Remote', owner: 'Kavya Poluru', status: 'Published', applicants: 39, featured: false, salary: '$175–200k' },
  { id: 'j_legal', title: 'Counsel, Marketplace', company: 'Harbor Logistics', dept: 'Legal', location: 'New York, NY', owner: 'Priya Poluru', status: 'Review', applicants: 11, featured: false, salary: '$190–220k' },
];

export const jobColumns = [
  { key: 'title', label: 'Role' },
  { key: 'company', label: 'Employer' },
  { key: 'owner', label: 'Owner' },
  { key: 'location', label: 'Location' },
  { key: 'applicants', label: 'Applicants' },
  { key: 'status', label: 'Status' },
];

export const candidates = [
  { id: 'a1', name: 'Sravani Poluru', role: 'Staff Frontend Engineer', skills: 'React · TypeScript', experience: '9 yrs', location: 'Austin, TX', stage: 'Interview', score: 94 },
  { id: 'a2', name: 'Venkata Poluru', role: 'Senior Product Manager', skills: 'Product · Discovery', experience: '11 yrs', location: 'Chicago, IL', stage: 'Screening', score: 88 },
  { id: 'a3', name: 'Lakshmi Poluru', role: 'Principal UX Designer', skills: 'UX · Research', experience: '8 yrs', location: 'Remote', stage: 'Offer', score: 96 },
  { id: 'a4', name: 'Ramesh Poluru', role: 'Data Scientist, Growth', skills: 'Python · ML', experience: '7 yrs', location: 'New York, NY', stage: 'Applied', score: 81 },
  { id: 'a5', name: 'Ananya Poluru', role: 'Platform Engineer', skills: 'Kubernetes · SRE', experience: '10 yrs', location: 'San Francisco, CA', stage: 'Interview', score: 91 },
  { id: 'a6', name: 'Meera Poluru', role: 'Senior Product Manager', skills: 'Ops · Roadmaps', experience: '6 yrs', location: 'Remote', stage: 'Applied', score: 79 },
  { id: 'a7', name: 'Arjun Poluru', role: 'Platform Engineer', skills: 'Go · Kafka', experience: '8 yrs', location: 'Austin, TX', stage: 'Screening', score: 86 },
  { id: 'a8', name: 'Priya Poluru', role: 'Counsel, Marketplace', skills: 'Contracts · Privacy', experience: '12 yrs', location: 'New York, NY', stage: 'Screening', score: 90 },
  { id: 'a9', name: 'Hana Poluru', role: 'Staff SRE', skills: 'On-call · Observability', experience: '9 yrs', location: 'Remote', stage: 'Interview', score: 93 },
  { id: 'a10', name: 'Nikhil Poluru', role: 'Staff Frontend Engineer', skills: 'Design systems · a11y', experience: '7 yrs', location: 'Chicago, IL', stage: 'Applied', score: 84 },
];

export const candidateColumns = [
  { key: 'name', label: 'Candidate' },
  { key: 'role', label: 'Role' },
  { key: 'experience', label: 'Experience' },
  { key: 'location', label: 'Location' },
  { key: 'stage', label: 'Stage' },
  { key: 'score', label: 'Score' },
];

export const employers = [
  { id: 'e1', name: 'Poluru Labs', roles: 28, verified: true, plan: 'Enterprise', owner: 'Kavya Poluru', fill: 92 },
  { id: 'e2', name: 'Northwind Systems', roles: 24, verified: true, plan: 'Enterprise', owner: 'Venkata Poluru', fill: 74 },
  { id: 'e3', name: 'Atlas Health', roles: 18, verified: true, plan: 'Growth', owner: 'Sravani Poluru', fill: 81 },
  { id: 'e4', name: 'Beacon Finance', roles: 31, verified: false, plan: 'Enterprise', owner: 'Ananya Poluru', fill: 58 },
  { id: 'e5', name: 'Orbit Retail', roles: 12, verified: true, plan: 'Starter', owner: 'Ramesh Poluru', fill: 66 },
  { id: 'e6', name: 'Lumen Cloud', roles: 21, verified: true, plan: 'Growth', owner: 'Lakshmi Poluru', fill: 88 },
  { id: 'e7', name: 'Harbor Logistics', roles: 9, verified: false, plan: 'Starter', owner: 'Priya Poluru', fill: 44 },
];

export const pipeline = [
  { stage: 'Applied', items: [{ name: 'Ramesh Poluru', role: 'Data Scientist' }, { name: 'Meera Poluru', role: 'Senior PM' }, { name: 'Nikhil Poluru', role: 'Staff Frontend' }] },
  { stage: 'Screening', items: [{ name: 'Venkata Poluru', role: 'Senior PM' }, { name: 'Arjun Poluru', role: 'Platform Eng' }, { name: 'Priya Poluru', role: 'Counsel' }] },
  { stage: 'Interview', items: [{ name: 'Sravani Poluru', role: 'Staff Frontend' }, { name: 'Ananya Poluru', role: 'Platform Eng' }, { name: 'Hana Poluru', role: 'Staff SRE' }] },
  { stage: 'Offer', items: [{ name: 'Lakshmi Poluru', role: 'Principal UX' }] },
];

export const funnel = [
  { label: 'Applied', value: 1864 },
  { label: 'Screening', value: 412 },
  { label: 'Interview', value: 186 },
  { label: 'Offer', value: 48 },
  { label: 'Hired', value: 19 },
];

export const departmentTree = [
  {
    id: 'eng',
    label: 'Engineering · Kavya Poluru',
    children: [
      { id: 'eng_front', label: 'Staff Frontend · 86 applicants' },
      { id: 'eng_plat', label: 'Platform · 71 applicants' },
    ],
  },
  { id: 'product', label: 'Product · Venkata Poluru' },
  { id: 'design', label: 'Design · Lakshmi Poluru' },
  { id: 'data', label: 'Data · Ramesh Poluru' },
];

export const timeline = [
  { title: 'Lakshmi Poluru moved to offer', description: 'Principal UX · Lumen Cloud', timestamp: '12m ago', status: 'complete' },
  { title: 'Northwind PM is in review', description: 'Venkata Poluru requested a hiring-manager pass.', timestamp: '41m ago', status: 'current' },
  { title: 'Beacon Finance still unverified', description: 'Ananya Poluru uploaded docs this morning.', timestamp: '2h ago', status: 'upcoming' },
  { title: 'Staff Frontend featured', description: 'Kavya Poluru pinned the Poluru Labs role.', timestamp: '1d ago', status: 'upcoming' },
];

export const alerts = [
  { heading: 'Senior PM is pending review', children: 'Northwind Systems posted overnight. Venkata Poluru should approve before it hits the marketplace.' },
  { heading: 'Beacon Finance is unverified', children: '31 open roles are hidden until Ananya Poluru clears legal.' },
  { heading: 'Design Systems Lead closed', children: 'Sravani Poluru filled the Atlas Health seat. Archive the req.' },
];

export const notifications = [
  { label: 'PM pending review', description: 'Northwind · Venkata Poluru · 8m', icon: 'alert-triangle' },
  { label: 'Offer out', description: 'Lakshmi Poluru · Principal UX', icon: 'check-circle' },
  { label: 'Verify Beacon', description: 'Ananya Poluru uploaded docs', icon: 'clock' },
];

export const commands = [
  { id: 'overview', label: 'Go to overview', href: '#/overview' },
  { id: 'jobs', label: 'Browse jobs', href: '#/jobs' },
  { id: 'front', label: 'Staff Frontend Engineer', href: '#/job/j_front' },
  { id: 'candidates', label: 'Candidate pool', href: '#/candidates' },
  { id: 'pipeline', label: 'Hiring pipeline', href: '#/pipeline' },
  { id: 'employers', label: 'Employers', href: '#/employers' },
  { id: 'settings', label: 'Workspace settings', href: '#/settings' },
];

export const ownerOptions = [
  { value: 'kavya', label: 'Kavya Poluru' },
  { value: 'venkata', label: 'Venkata Poluru' },
  { value: 'lakshmi', label: 'Lakshmi Poluru' },
  { value: 'sravani', label: 'Sravani Poluru' },
  { value: 'ramesh', label: 'Ramesh Poluru' },
  { value: 'ananya', label: 'Ananya Poluru' },
  { value: 'meera', label: 'Meera Poluru' },
  { value: 'arjun', label: 'Arjun Poluru' },
  { value: 'priya', label: 'Priya Poluru' },
  { value: 'hana', label: 'Hana Poluru' },
];

export const employerOptions = employers.map((item) => ({ value: item.id, label: item.name }));

export const deptOptions = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Data', label: 'Data' },
  { value: 'Legal', label: 'Legal' },
];

export const postSteps = [
  { label: 'Role', description: 'Name the seat' },
  { label: 'Employer', description: 'Pick the company' },
  { label: 'Review', description: 'Owner signs off' },
];

export const hireSteps = [
  { label: 'Applied' },
  { label: 'Screen' },
  { label: 'Interview' },
  { label: 'Offer' },
  { label: 'Hired' },
];

export const team = [
  { name: 'Kavya Poluru', role: 'Owner' },
  { name: 'Venkata Poluru', role: 'Editor' },
  { name: 'Lakshmi Poluru', role: 'Editor' },
  { name: 'Sravani Poluru', role: 'Viewer' },
  { name: 'Ananya Poluru', role: 'Editor' },
  { name: 'Priya Poluru', role: 'Viewer' },
];

export const webhookSnippet = `jobsraja post \\
  --role "Staff Frontend Engineer" \\
  --employer "Poluru Labs" \\
  --owner "Kavya Poluru"`;

export const recentApplications = [
  { id: 'app_12', name: 'Hana Poluru', role: 'Staff SRE', company: 'Poluru Labs', stage: 'Interview', when: '12m ago' },
  { id: 'app_11', name: 'Priya Poluru', role: 'Counsel, Marketplace', company: 'Harbor Logistics', stage: 'Screening', when: '41m ago' },
  { id: 'app_10', name: 'Nikhil Poluru', role: 'Staff Frontend Engineer', company: 'Poluru Labs', stage: 'Applied', when: '2h ago' },
  { id: 'app_09', name: 'Sravani Poluru', role: 'Staff Frontend Engineer', company: 'Poluru Labs', stage: 'Interview', when: '3h ago' },
  { id: 'app_08', name: 'Lakshmi Poluru', role: 'Principal UX Designer', company: 'Lumen Cloud', stage: 'Offer', when: '5h ago' },
];

export const channels = [
  { label: 'Jobs Raja board', share: 46 },
  { label: 'Employee referral', share: 28 },
  { label: 'Agency', share: 16 },
  { label: 'Campus', share: 10 },
];

export const interviews = [
  { name: 'Sravani Poluru', role: 'Staff Frontend', with: 'Kavya Poluru', when: 'Today · 10:00' },
  { name: 'Hana Poluru', role: 'Staff SRE', with: 'Ananya Poluru', when: 'Today · 14:30' },
  { name: 'Venkata Poluru', role: 'Senior PM', with: 'Meera Poluru', when: 'Tue · 09:15' },
  { name: 'Priya Poluru', role: 'Counsel', with: 'Lakshmi Poluru', when: 'Wed · 11:00' },
];

export const recruiters = [
  { name: 'Kavya Poluru', specialty: 'Engineering', load: 18, reqs: 7 },
  { name: 'Venkata Poluru', specialty: 'Product', load: 14, reqs: 5 },
  { name: 'Lakshmi Poluru', specialty: 'Design', load: 11, reqs: 4 },
  { name: 'Ananya Poluru', specialty: 'Platform', load: 16, reqs: 6 },
];

export const sla = [
  { label: 'Screen SLA', value: 94 },
  { label: 'Interview SLA', value: 81 },
  { label: 'Offer SLA', value: 72 },
];

export function findJob(id) {
  return jobs.find((item) => item.id === id) || jobs[0];
}

export function findCandidate(id) {
  return candidates.find((item) => item.id === id) || candidates[0];
}

export function statusTone(status) {
  if (status === 'Published' || status === 'Offer' || status === 'Hired' || status === 'Enterprise') return 'success';
  if (status === 'Interview' || status === 'Screening' || status === 'Growth') return 'info';
  if (status === 'Review' || status === 'Draft' || status === 'Applied') return 'warning';
  if (status === 'Closed') return 'neutral';
  return 'neutral';
}
