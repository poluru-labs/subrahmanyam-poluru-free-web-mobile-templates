import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { profile } from '../data/mock';
import { useToast } from '../context/ToastContext';
import { BrandLogo } from '../components/BrandLogo';
import { ToastHost } from '../components/ToastHost';
import './DashboardLayout.scss';

const navItems: Array<{
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}> = [
  { to: '/', label: 'Overview', icon: 'bi-speedometer2', end: true },
  { to: '/portfolio', label: 'Portfolio', icon: 'bi-pie-chart' },
  { to: '/accounts', label: 'Accounts', icon: 'bi-bank' },
  { to: '/transactions', label: 'Transactions', icon: 'bi-arrow-left-right' },
  { to: '/goals', label: 'Goals', icon: 'bi-bullseye' },
  { to: '/budgets', label: 'Budgets', icon: 'bi-wallet2' },
  { to: '/watchlist', label: 'Watchlist', icon: 'bi-eye' },
  { to: '/reports', label: 'Reports', icon: 'bi-bar-chart-line' },
  { to: '/settings', label: 'Settings', icon: 'bi-gear' },
];

const searchCatalog = [
  { label: 'Portfolio holdings', path: '/portfolio' },
  { label: 'Linked accounts', path: '/accounts' },
  { label: 'Transactions', path: '/transactions' },
  { label: 'Savings goals', path: '/goals' },
  { label: 'Monthly budgets', path: '/budgets' },
  { label: 'Watchlist', path: '/watchlist' },
  { label: 'Reports & exports', path: '/reports' },
  { label: 'Settings', path: '/settings' },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { show } = useToast();
  const [navOpen, setNavOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [now, setNow] = useState(() => new Date());

  const current =
    navItems.find((item) =>
      item.end ? location.pathname === '/' : location.pathname.startsWith(item.to),
    )?.label ?? 'Overview';

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchCatalog.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (event.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        event.preventDefault();
        document.getElementById('wt-global-search')?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className={`wt-shell${navOpen ? ' wt-shell--nav-open' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <aside className="wt-sidebar" id="wt-sidebar">
        <NavLink to="/" className="wt-brand" end>
          <span className="wt-brand-mark" aria-hidden="true">
            <BrandLogo />
          </span>
          <span className="wt-brand-text">
            <strong>WealthTrack</strong>
            <span>Personal finance</span>
          </span>
        </NavLink>

        <nav className="wt-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `wt-nav__link${isActive ? ' is-active' : ''}`
              }
            >
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="wt-sidebar-foot">
          <p className="wt-muted mb-1">Signed in</p>
          <strong>{profile.name}</strong>
        </div>
      </aside>

      {navOpen ? (
        <button
          type="button"
          className="wt-nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <div className="wt-main">
        <header className="wt-header">
          <div className="wt-header-left">
            <button
              type="button"
              className="btn btn-wt-ghost btn-sm wt-menu-btn"
              aria-label="Open navigation"
              onClick={() => setNavOpen((v) => !v)}
            >
              <i className="bi bi-list fs-5" />
            </button>
            <div>
              <p className="wt-crumb">WealthTrack / {current}</p>
              <h1 className="wt-header-title">{current}</h1>
              <p className="wt-clock wt-muted">
                {now.toLocaleString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          <div className="wt-header-actions">
            <div className="wt-search">
              <i className="bi bi-search" aria-hidden="true" />
              <input
                id="wt-global-search"
                type="search"
                className="form-control"
                placeholder="Search pages… (/)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && suggestions[0]) {
                    navigate(suggestions[0].path);
                    setQuery('');
                    show({ title: `Opened ${suggestions[0].label}`, variant: 'info' });
                  }
                }}
              />
              {suggestions.length > 0 ? (
                <ul className="wt-search-menu">
                  {suggestions.map((item) => (
                    <li key={item.path}>
                      <button
                        type="button"
                        onClick={() => {
                          navigate(item.path);
                          setQuery('');
                          show({ title: `Opened ${item.label}`, variant: 'info' });
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <button
              type="button"
              className="btn btn-wt-ghost btn-sm"
              onClick={() =>
                show({
                  title: 'All accounts synced',
                  message: 'Mock refresh complete',
                  variant: 'success',
                })
              }
            >
              <i className="bi bi-arrow-repeat me-1" />
              Sync
            </button>
            <div className="wt-avatar" aria-hidden="true">
              AP
            </div>
          </div>
        </header>

        <main className="wt-content" id="main-content">
          <Outlet />
        </main>
      </div>

      <ToastHost />
    </div>
  );
}
