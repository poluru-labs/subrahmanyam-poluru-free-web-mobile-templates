import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import RepositoriesPage from './pages/RepositoriesPage';
import ContributionsPage from './pages/ContributionsPage';
import EvidencePage from './pages/EvidencePage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/repositories" element={<RepositoriesPage />} />
        <Route path="/contributions" element={<ContributionsPage />} />
        <Route path="/evidence" element={<EvidencePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
