import { Navigate, Route, Routes } from 'react-router-dom';
import { Shell } from './components/Shell';
import AttendancePage from './pages/AttendancePage';
import CalendarPage from './pages/CalendarPage';
import ChildrenPage from './pages/ChildrenPage';
import DashboardPage from './pages/DashboardPage';
import DocumentsPage from './pages/DocumentsPage';
import FeesPage from './pages/FeesPage';
import GradesPage from './pages/GradesPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/children" element={<ChildrenPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/grades" element={<GradesPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
