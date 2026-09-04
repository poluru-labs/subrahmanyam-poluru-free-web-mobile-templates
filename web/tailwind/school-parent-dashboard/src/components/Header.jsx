import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { breadcrumbs, parent, searchIndex } from '../data';
import { useApp } from '../context';
import { Avatar, Icon } from './ui';

export function Header() {
  const { setSidebarOpen, unreadNotifications, notifications, markAllNotificationsRead } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = breadcrumbs[location.pathname] ?? ['Home'];

  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const notesRef = useRef(null);
  const profileRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchIndex.slice(0, 6);
    return searchIndex.filter((item) => item.label.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false);
      if (notesRef.current && !notesRef.current.contains(event.target)) setNotesOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setNotesOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="rounded-xl p-2 text-ink hover:bg-canvas lg:hidden"
          aria-label="Open navigation"
          aria-controls="app-sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <Icon name="list" className="text-xl" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden min-w-0 sm:block">
          <ol className="flex items-center gap-2 text-sm text-muted">
            {crumbs.map((crumb, index) => (
              <li key={crumb} className="flex items-center gap-2">
                {index > 0 && <Icon name="chevron-right" className="text-[10px]" />}
                <span className={index === crumbs.length - 1 ? 'font-semibold text-ink' : ''}>{crumb}</span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <div ref={searchRef} className="relative">
            <label className="sr-only" htmlFor="global-search">
              Search the parent portal
            </label>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id="global-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search children, pages, messages…"
              className="h-10 w-40 rounded-xl border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted/80 sm:w-56 lg:w-72"
            />
            {searchOpen && (
              <div className="absolute right-0 z-30 mt-2 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
                {results.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted">No matches for “{query}”.</p>
                ) : (
                  <ul>
                    {results.map((item) => (
                      <li key={`${item.type}-${item.label}`}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-canvas"
                          onClick={() => {
                            navigate(item.to);
                            setSearchOpen(false);
                            setQuery('');
                          }}
                        >
                          <span className="w-16 shrink-0 text-[11px] font-semibold uppercase tracking-wide text-muted">{item.type}</span>
                          <span className="truncate font-medium text-ink">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div ref={notesRef} className="relative">
            <button
              type="button"
              className="relative rounded-xl p-2 text-ink hover:bg-canvas"
              aria-label={`Notifications${unreadNotifications.length ? `, ${unreadNotifications.length} unread` : ''}`}
              aria-expanded={notesOpen}
              onClick={() => setNotesOpen((open) => !open)}
            >
              <Icon name="bell" className="text-lg" />
              {unreadNotifications.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-white" />
              )}
            </button>
            {notesOpen && (
              <div className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-2xl border border-line bg-white shadow-lg">
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <p className="text-sm font-semibold">Notifications</p>
                  <button type="button" className="text-xs font-semibold text-brand hover:underline" onClick={markAllNotificationsRead}>
                    Mark all read
                  </button>
                </div>
                <ul>
                  {notifications.map((item) => (
                    <li key={item.id} className={`flex gap-3 px-4 py-3 ${item.read ? '' : 'bg-brand-soft/50'}`}>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-canvas text-brand">
                        <Icon name={item.icon} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink">{item.title}</p>
                        <p className="text-xs text-muted">{item.body}</p>
                        <p className="mt-1 text-[11px] text-muted">{item.time}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-canvas"
              aria-label="Account menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((open) => !open)}
            >
              <Avatar initials={parent.initials} size="sm" />
              <span className="hidden text-left text-sm font-semibold leading-tight md:block">
                {parent.firstName}
              </span>
              <Icon name="chevron-down" className="hidden text-xs text-muted md:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white py-1 shadow-lg">
                <div className="border-b border-line px-4 py-3">
                  <p className="text-sm font-semibold">{parent.name}</p>
                  <p className="truncate text-xs text-muted">{parent.email}</p>
                </div>
                <Link to="/settings" className="block px-4 py-2.5 text-sm hover:bg-canvas" onClick={() => setProfileOpen(false)}>
                  Settings
                </Link>
                <button type="button" className="block w-full px-4 py-2.5 text-left text-sm text-muted hover:bg-canvas">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
