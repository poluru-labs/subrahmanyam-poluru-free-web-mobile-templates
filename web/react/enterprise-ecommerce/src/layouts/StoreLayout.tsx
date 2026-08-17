import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Avatar,
  Button,
  Drawer,
  EdsIcon,
  Tag,
  useToast,
  type EdsIconName,
} from '@poluru-labs/enterprise-design-system-react';
import { useCommerce } from '../context/CommerceContext';
import { searchCatalog } from '../data/mock';
import './StoreLayout.scss';

const navItems: Array<{ label: string; path: string; icon: EdsIconName }> = [
  { label: 'Overview', path: '/', icon: 'home' },
  { label: 'Products', path: '/products', icon: 'folder' },
  { label: 'Orders', path: '/orders', icon: 'file' },
  { label: 'Customers', path: '/customers', icon: 'user' },
  { label: 'Inventory', path: '/inventory', icon: 'link' },
  { label: 'Settings', path: '/settings', icon: 'settings' },
];

const pageCopy: Record<string, string> = {
  '/': 'Sales, fulfillment, and catalog health at a glance.',
  '/products': 'Manage SKUs, pricing, and catalog readiness.',
  '/orders': 'Move paid orders through fulfillment with clarity.',
  '/customers': 'Understand segments, spend, and loyalty.',
  '/inventory': 'Watch stock levels and resolve warehouse alerts.',
  '/settings': 'Tune storefront defaults and ops notifications.',
};

type StoreLayoutProps = {
  children: React.ReactNode;
};

export function StoreLayout({ children }: StoreLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = useToast();
  const { openAlerts, dismissAlert } = useCommerce();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const current =
    navItems.find((item) => item.path === location.pathname)?.label ??
    'Overview';
  const subtitle =
    pageCopy[location.pathname] ?? 'Enterprise storefront operations.';

  useEffect(() => {
    setDrawerOpen(false);
    setNavOpen(false);
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
    <div className={`store${navOpen ? ' store--nav-open' : ''}`}>
      <div
        className="store__scrim"
        aria-hidden={!navOpen}
        onClick={() => setNavOpen(false)}
      />

      <aside className="store__sidebar" aria-label="Primary">
        <div className="store__brand">
          <span className="store__mark" aria-hidden="true">
            PC
          </span>
          <div className="store__brand-text">
            <strong>Enterprise Commerce</strong>
            <span>Storefront ops</span>
          </div>
        </div>

        <nav className="store__nav">
          <p className="store__nav-label">Workspace</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `store__nav-link${isActive ? ' is-active' : ''}`
                  }
                >
                  <EdsIcon name={item.icon} size="sm" decorative />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="store__sidebar-foot">
          <div className="store__status-chip">
            <span className="store__status-dot" aria-hidden="true" />
            <div>
              <strong>Live catalog</strong>
              <p>US · EU · APAC</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="store__main">
        <header className="store__header">
          <div className="store__header-left">
            <Button
              className="store__menu-btn"
              variant="secondary"
              size="sm"
              icon="menu"
              iconOnly
              accessibleLabel="Open navigation"
              onClick={() => setNavOpen(true)}
            />
            <div>
              <nav className="store__crumbs" aria-label="Breadcrumb">
                <NavLink to="/">Commerce</NavLink>
                <span aria-hidden="true">/</span>
                <span>{current}</span>
              </nav>
              <h1 className="store__title">{current}</h1>
              <p className="store__subtitle">{subtitle}</p>
            </div>
          </div>

          <div className="store__header-actions">
            <div className="store__search">
              <Autocomplete
                placeholder="Search products, orders, customers…"
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
            <div className="store__user">
              <Avatar name="Subrahmanyam Poluru" size="sm" />
              <div className="store__user-meta">
                <strong>Subrahmanyam Poluru</strong>
                <span>Ops lead</span>
              </div>
            </div>
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
          <p className="notify-drawer__empty">No open inventory alerts.</p>
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
