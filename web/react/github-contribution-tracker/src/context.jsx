import { createContext, useContext, useState } from 'react';
import { fallbackEvidence, fallbackIssues, fallbackProfile, fallbackRepos, fallbackContributions } from './data';

const AppContext = createContext(null);
const get = async (path, fallback) => { try { const response = await fetch(path); if (!response.ok) throw new Error('Request failed'); return await response.json(); } catch { return fallback; } };
export function AppProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(fallbackProfile);
  const [repos, setRepos] = useState(fallbackRepos);
  const [contributions, setContributions] = useState(fallbackContributions);
  const [issues, setIssues] = useState(fallbackIssues);
  const [evidence, setEvidence] = useState(fallbackEvidence);
  const sync = async () => { const [nextProfile, nextRepos, nextContributions, nextEvidence] = await Promise.all([get('/api/github/me', fallbackProfile), get('/api/repos', fallbackRepos), get('/api/contributions', fallbackContributions), get('/api/evidence', fallbackEvidence)]); setProfile(nextProfile); setRepos(nextRepos); setContributions(nextContributions); setEvidence(nextEvidence); };
  const searchIssues = async (query = '') => setIssues(await get(`/api/discover/issues${query ? `?q=${encodeURIComponent(query)}` : ''}`, fallbackIssues));
  const value = { sidebarOpen, setSidebarOpen, profile, repos, contributions, issues, evidence, sync, searchIssues, setEvidence };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used within AppProvider'); return context; }
