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
import { useCommerce } from '../context/CommerceContext';
import { searchCatalog } from '../data/mock';
import './StoreLayout.scss';

const navItems: Array<SideNavItem & { path: string }> = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Products', path: '/products', icon: 'folder' },
  { label: 'Orders', path: '/orders', icon: 'file' },
  { label: 'Customers', path: '/customers', icon: 'user' },
  { label: 'Inventory', path: '/inventory', icon: 'link' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

type StoreLayoutProps = {
  children: React.ReactNode;
};

export function StoreLayout({ children }: StoreLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = useToast();
  const { openAlerts, dismissAlert } = useCommerce();
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
    const label = value.replace(/^(Product|Order|Customer):\s*/, '');
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
    <div className="store">
      <aside className="store__sidebar">
        <div className="store__brand">
          <div className="store__brand-text">
            <strong>Poluru Commerce</strong>
            <span>Enterprise storefront ops</span>
          </div>
        </div>

        <SideNav
          className="store__sidenav"
          items={items}
          onNavigate={(label) => {
            const match = navItems.find((item) => item.label === label);
            if (match) navigate(match.path);
          }}
        />

        <div className="store__sidebar-foot">
          <Badge label="Live catalog" variant="brand" soft pill />
          <p>US · EU · APAC storefronts</p>
        </div>
      </aside>

      <div className="store__main">
        <header className="store__header">
          <div className="store__header-left">
            <nav className="store__crumbs" aria-label="Breadcrumb">
              <NavLink to="/">Commerce</NavLink>
              <span aria-hidden="true">/</span>
              <span>{current}</span>
            </nav>
            <h1 className="store__title">{current}</h1>
          </div>

          <div className="store__header-actions">
            <div className="store__search">
              <Autocomplete
                placeholder="Search products, orders…"
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
            <div className="store__notify">
              <Button
                variant="secondary"
                size="sm"
                icon="bell"
                iconOnly
                accessibleLabel="Notifications"
                onClick={() => setDrawerOpen(true)}
              />
              {openAlerts.length > 0 ? (
                <span className="store__notify-dot" aria-hidden="true">
                  {openAlerts.length}
                </span>
              ) : null}
            </div>
            <Avatar name="Alex Rivera" size="sm" />
          </div>
        </header>

        <main className="store__content">{children}</main>
      </div>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        heading="Inventory alerts"
        side="right"
        size="md"
        footer={
          <div className="notify-drawer__footer">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setDrawerOpen(false);
                navigate('/inventory');
              }}
            >
              Open inventory
            </Button>
          </div>
        }
      >
        {openAlerts.length === 0 ? (
          <p className="notify-drawer__empty">
            No open inventory alerts.
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
                <span className="muted mono">{item.sku}</span>
                <Button
                  variant="tertiary"
                  size="sm"
                  icon="check"
                  onClick={() => {
                    dismissAlert(item.id);
                    show({
                      title: 'Alert dismissed',
                      variant: 'success',
                    });
                  }}
                >
                  Dismiss
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </div>
  );
}
