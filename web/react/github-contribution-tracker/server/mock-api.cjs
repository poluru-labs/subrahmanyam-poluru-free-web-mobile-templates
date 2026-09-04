const http = require('node:http');
const { URL } = require('node:url');

const profile = { login: 'Poluru', name: 'Subbu Poluru', bio: 'Open source contributor focused on accessible developer tools.', avatar: 'SP', followers: 248, following: 86, publicRepos: 34, streak: 18 };
const repos = [
  { owner: 'radix-ui', name: 'primitives', description: 'Unstyled, accessible UI components for React.', language: 'TypeScript', health: 92, openIssues: 48, stars: '18.4k', watched: true, color: '#3178c6' },
  { owner: 'vercel', name: 'next.js', description: 'The React framework for the web.', language: 'JavaScript', health: 84, openIssues: 216, stars: '132k', watched: true, color: '#1f2937' },
  { owner: 'facebook', name: 'react', description: 'The library for web and native user interfaces.', language: 'JavaScript', health: 96, openIssues: 184, stars: '242k', watched: true, color: '#61dafb' },
];
const issues = [
  { id: 'i-1', title: 'Add reduced motion guidance to animation docs', repo: 'motiondivision/motion', labels: ['documentation', 'good first issue'], effort: 'Small', comments: 3, updated: '2h ago' },
  { id: 'i-2', title: 'Improve screen reader announcement for async updates', repo: 'radix-ui/primitives', labels: ['a11y', 'help wanted'], effort: 'Medium', comments: 8, updated: '5h ago' },
  { id: 'i-3', title: 'Add examples for custom error boundaries', repo: 'facebook/react', labels: ['documentation'], effort: 'Small', comments: 12, updated: 'Yesterday' },
];
const contributions = [
  { id: 'pr-104', kind: 'Pull request', title: 'Improve keyboard navigation in command palette', repo: 'radix-ui/primitives', number: 104, state: 'Merged', date: 'Sep 02, 2026', impact: 'High', additions: 86, deletions: 21 },
  { id: 'issue-88', kind: 'Issue', title: 'Document the new cache invalidation flow', repo: 'vercel/next.js', number: 88, state: 'Open', date: 'Aug 30, 2026', impact: 'Medium', additions: 0, deletions: 0 },
  { id: 'review-61', kind: 'Review', title: 'Review: streaming server actions API', repo: 'facebook/react', number: 61, state: 'Approved', date: 'Aug 27, 2026', impact: 'High', additions: 14, deletions: 6 },
  { id: 'commit-42', kind: 'Commit', title: 'Add empty state to repository picker', repo: 'Poluru/design-system', number: 42, state: 'Pushed', date: 'Aug 24, 2026', impact: 'Low', additions: 42, deletions: 8 },
];
let evidence = [
  { id: 'ev-1', title: 'Keyboard navigation contribution', source: 'radix-ui/primitives#104', type: 'Pull request', tags: ['accessibility', 'react'], notes: 'Merged after two rounds of review.', date: 'Sep 02, 2026' },
  { id: 'ev-2', title: 'Cache invalidation investigation', source: 'vercel/next.js#88', type: 'Issue', tags: ['performance'], notes: 'Reproduction and suggested fix attached.', date: 'Aug 30, 2026' },
];
const json = (response, status, payload) => { response.writeHead(status, { 'content-type': 'application/json', 'access-control-allow-origin': '*' }); response.end(JSON.stringify(payload)); };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost');
  if (request.method === 'OPTIONS') return json(response, 204, {});
  if (request.method === 'GET' && url.pathname === '/api/github/me') return json(response, 200, profile);
  if (request.method === 'GET' && url.pathname === '/api/discover/issues') { const query = (url.searchParams.get('q') || '').toLowerCase(); return json(response, 200, query ? issues.filter((issue) => `${issue.title} ${issue.repo} ${issue.labels.join(' ')}`.toLowerCase().includes(query)) : issues); }
  if (request.method === 'GET' && url.pathname === '/api/repos') return json(response, 200, repos);
  if (request.method === 'GET' && url.pathname === '/api/contributions') return json(response, 200, contributions);
  if (request.method === 'GET' && url.pathname.startsWith('/api/contributions/')) return json(response, 200, { ...contributions.find((item) => item.id === url.pathname.split('/').pop()) || contributions[0], evidence: ['Problem statement', 'Review discussion', 'Merged implementation'] });
  if (request.method === 'GET' && url.pathname === '/api/evidence') return json(response, 200, evidence);
  if (request.method === 'GET' && url.pathname === '/api/evidence/export') return json(response, 200, { format: url.searchParams.get('format') || 'json', generatedAt: new Date().toISOString(), items: evidence });
  if (request.method === 'POST' && url.pathname === '/api/sync') return json(response, 200, { ok: true, syncedAt: new Date().toISOString() });
  if (request.method === 'POST' && url.pathname === '/api/watchlist') return json(response, 201, { ok: true, message: 'Repository added to watchlist' });
  if (request.method === 'DELETE' && url.pathname.startsWith('/api/watchlist/')) return json(response, 200, { ok: true, message: 'Repository removed from watchlist' });
  if (request.method === 'POST' && url.pathname === '/api/evidence') { evidence = [{ id: `ev-${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), ...evidence[0] }, ...evidence]; return json(response, 201, evidence[0]); }
  return json(response, 404, { error: 'Not found' });
});
server.listen(8787, () => console.log('Mock GitHub API listening on http://localhost:8787'));
