export const navItems = [
  { to: '/', label: 'Overview', icon: 'grid-1x2', end: true },
  { to: '/discover', label: 'Discover issues', icon: 'compass' },
  { to: '/repositories', label: 'Repositories', icon: 'journal-code' },
  { to: '/contributions', label: 'Contributions', icon: 'git' },
  { to: '/evidence', label: 'Evidence vault', icon: 'collection' },
  { to: '/settings', label: 'Settings', icon: 'gear' },
];
export const breadcrumbs = { '/': ['Workspace', 'Overview'], '/discover': ['Workspace', 'Discover issues'], '/repositories': ['Workspace', 'Repositories'], '/contributions': ['Workspace', 'Contributions'], '/evidence': ['Workspace', 'Evidence vault'], '/settings': ['Workspace', 'Settings'] };
export const fallbackProfile = { login: 'Poluru', name: 'Subbu Poluru', bio: 'Open source contributor focused on accessible developer tools.', avatar: 'SP', followers: 248, following: 86, publicRepos: 34, streak: 18 };
export const fallbackContributions = [
  { id: 'pr-104', kind: 'Pull request', title: 'Improve keyboard navigation in command palette', repo: 'radix-ui/primitives', number: 104, state: 'Merged', date: 'Sep 02, 2026', impact: 'High', additions: 86, deletions: 21 },
  { id: 'issue-88', kind: 'Issue', title: 'Document the new cache invalidation flow', repo: 'vercel/next.js', number: 88, state: 'Open', date: 'Aug 30, 2026', impact: 'Medium', additions: 0, deletions: 0 },
  { id: 'review-61', kind: 'Review', title: 'Review: streaming server actions API', repo: 'facebook/react', number: 61, state: 'Approved', date: 'Aug 27, 2026', impact: 'High', additions: 14, deletions: 6 },
  { id: 'commit-42', kind: 'Commit', title: 'Add empty state to repository picker', repo: 'Poluru/design-system', number: 42, state: 'Pushed', date: 'Aug 24, 2026', impact: 'Low', additions: 42, deletions: 8 },
];
export const fallbackRepos = [
  { owner: 'radix-ui', name: 'primitives', description: 'Unstyled, accessible UI components for React.', language: 'TypeScript', health: 92, openIssues: 48, stars: '18.4k', watched: true, color: '#3178c6' },
  { owner: 'vercel', name: 'next.js', description: 'The React framework for the web.', language: 'JavaScript', health: 84, openIssues: 216, stars: '132k', watched: true, color: '#1f2937' },
  { owner: 'facebook', name: 'react', description: 'The library for web and native user interfaces.', language: 'JavaScript', health: 96, openIssues: 184, stars: '242k', watched: true, color: '#61dafb' },
];
export const fallbackIssues = [
  { id: 'i-1', title: 'Add reduced motion guidance to animation docs', repo: 'motiondivision/motion', labels: ['documentation', 'good first issue'], effort: 'Small', comments: 3, updated: '2h ago' },
  { id: 'i-2', title: 'Improve screen reader announcement for async updates', repo: 'radix-ui/primitives', labels: ['a11y', 'help wanted'], effort: 'Medium', comments: 8, updated: '5h ago' },
  { id: 'i-3', title: 'Add examples for custom error boundaries', repo: 'facebook/react', labels: ['documentation'], effort: 'Small', comments: 12, updated: 'Yesterday' },
];
export const fallbackEvidence = [
  { id: 'ev-1', title: 'Keyboard navigation contribution', source: 'radix-ui/primitives#104', type: 'Pull request', tags: ['accessibility', 'react'], notes: 'Merged after two rounds of review.', date: 'Sep 02, 2026' },
  { id: 'ev-2', title: 'Cache invalidation investigation', source: 'vercel/next.js#88', type: 'Issue', tags: ['performance'], notes: 'Reproduction and suggested fix attached.', date: 'Aug 30, 2026' },
];
