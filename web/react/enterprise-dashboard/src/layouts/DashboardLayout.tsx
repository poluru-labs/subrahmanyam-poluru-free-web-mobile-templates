import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  Search,
  SideNav,
  type SideNavItem,
} from '@poluru-labs/enterprise-design-system-react';
import './DashboardLayout.scss';

const navItems: Array<SideNavItem & { path: string }> = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Facilities', path: '/facilities', icon: 'folder' },
  { label: 'Infrastructure', path: '/infrastructure', icon: 'link' },
  { label: 'Alerts', path: '/alerts', icon: 'bell' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const items: SideNavItem[] = navItems.map((item) => ({
    label: item.label,
    icon: item.icon,
    active: item.path === location.pathname,
  }));

  const current =
    navItems.find((item) => item.path === location.pathname)?.label ?? 'Overview';

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <div className="dashboard__brand">
         <div className="dashboard__brand-text">
            <strong>Poluru DC</strong>
            <span>Data Center Ops</span>
          </div>
        </div>

        <SideNav
          className="dashboard__sidenav"
          items={items}
          onNavigate={(label) => {
            const match = navItems.find((item) => item.label === label);
            if (match) navigate(match.path);
          }}
        />

        <div className="dashboard__sidebar-foot">
          <Badge label="Live fleet" variant="brand" soft pill />
          <p>Monitoring 12 facilities · US regions</p>
        </div>
      </aside>

      <div className="dashboard__main">
        <header className="dashboard__header">
          <div className="dashboard__header-left">
            <nav className="dashboard__crumbs" aria-label="Breadcrumb">
              <NavLink to="/">Operations</NavLink>
              <span aria-hidden="true">/</span>
              <span>{current}</span>
            </nav>
            <h1 className="dashboard__title">{current}</h1>
          </div>

          <div className="dashboard__header-actions">
            <Search placeholder="Search racks, hosts…" size="sm" aria-label="Search" />
            <Button variant="secondary" size="sm" icon="bell" iconOnly accessibleLabel="Notifications" />
            <Avatar name="Alex Rivera" size="sm" />
          </div>
        </header>

        <main className="dashboard__content">{children}</main>
      </div>
    </div>
  );
}
