import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Avatar,
  Badge,
  Button,
  Drawer,
  SideNav,
  Tag,
  useToast,
  type SideNavItem,
} from '@poluru-labs/enterprise-design-system-react';
import { useAlerts } from '../context/AlertsContext';
import { searchCatalog } from '../data/mock';
import './DashboardLayout.scss';

const navItems: Array<SideNavItem & { path: string }> = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Facilities', path: '/facilities', icon: 'folder' },
  { label: 'Infrastructure', path: '/infrastructure', icon: 'link' },
  { label: 'Power & Cooling', path: '/power', icon: 'star' },
  { label: 'Alerts', path: '/alerts', icon: 'bell' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = useToast();
  const { openAlerts, criticalCount, acknowledge } = useAlerts();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const items: SideNavItem[] = navItems.map((item) => ({
    label: item.label,
    icon: item.icon,
    active: item.path === location.pathname,
  }));

  const current =
    navItems.find((item) => item.path === location.pathname)?.label ??
    'Overview';

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  const updateSuggestions = (query: string) => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      searchCatalog
        .filter((item) => item.label.toLowerCase().includes(q))
        .slice(0, 8)
        .map((item) => `${item.category}: ${item.label}`),
    );
  };

  const handleSelect = (value: string) => {
    const label = value.replace(/^(Facility|Host|Alert):\s*/, '');
    const match = searchCatalog.find((item) => item.label === label);
    if (match) {
      navigate(match.path);
      show({
        title: `Opened ${match.category.toLowerCase()}`,
        description: match.label,
        variant: 'info',
      });
    }
    setSearchValue('');
    setSuggestions([]);
  };

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
            <div className="dashboard__search">
              <Autocomplete
                placeholder="Search racks, hosts, alerts…"
                value={searchValue}
                suggestions={suggestions}
                minChars={1}
                onInput={(value) => {
                  setSearchValue(value);
                  updateSuggestions(value);
                }}
                onChange={(value) => {
                  setSearchValue(value);
                  updateSuggestions(value);
                }}
                onSelect={handleSelect}
              />
            </div>
            <div className="dashboard__notify">
              <Button
                variant="secondary"
                size="sm"
                icon="bell"
                iconOnly
                accessibleLabel="Notifications"
                onClick={() => setDrawerOpen(true)}
              />
              {openAlerts.length > 0 ? (
                <span className="dashboard__notify-dot" aria-hidden="true">
                  {criticalCount > 0 ? criticalCount : openAlerts.length}
                </span>
              ) : null}
            </div>
            <Avatar name="Alex Rivera" size="sm" />
          </div>
        </header>

        <main className="dashboard__content">{children}</main>
      </div>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        heading="Notifications"
        side="right"
        size="md"
        footer={
          <div className="notify-drawer__footer">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setDrawerOpen(false);
                navigate('/alerts');
              }}
            >
              Open alerts
            </Button>
          </div>
        }
      >
        {openAlerts.length === 0 ? (
          <p className="notify-drawer__empty">
            No open notifications. Fleet is quiet.
          </p>
        ) : (
          <ul className="notify-drawer__list">
            {openAlerts.map((item) => (
              <li key={item.id}>
                <div className="notify-drawer__item-top">
                  <Tag
                    label={item.severity}
                    variant={
                      item.severity === 'critical'
                        ? 'danger'
                        : item.severity === 'warning'
                          ? 'warning'
                          : 'info'
                    }
                  />
                  <span className="muted">{item.time}</span>
                </div>
                <strong>{item.title}</strong>
                <span className="muted">{item.facility}</span>
                <Button
                  variant="tertiary"
                  size="sm"
                  icon="check"
                  onClick={() => {
                    acknowledge(item.id);
                    show({
                      title: 'Alert acknowledged',
                      variant: 'success',
                    });
                  }}
                >
                  Acknowledge
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </div>
  );
}
