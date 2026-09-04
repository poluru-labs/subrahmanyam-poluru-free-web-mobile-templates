import { NavLink } from 'react-router-dom';
import { brand, navItems } from '../data';
import { useApp } from '../context';
import { Avatar, Icon } from './ui';

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col bg-ink text-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-5 pb-2 pt-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand font-display text-lg font-semibold">
            {brand.initials}
          </span>
          <div className="min-w-0">
            <p className="font-display text-[17px] font-semibold leading-tight">{brand.name}</p>
            <p className="text-xs text-white/65">Jewellery studio</p>
          </div>
        </div>

        <div className="mx-4 mt-5 flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3">
          <Avatar initials="MC" className="from-[#f6f2ec] to-white text-brand" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{brand.owner}</p>
            <p className="truncate text-xs text-white/65">Store owner</p>
          </div>
        </div>

        <nav className="mt-5 flex-1 overflow-y-auto px-3 pb-6" aria-label="Primary">
          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? 'bg-white text-brand shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon name={item.icon} className="text-base" />
                      <span className="flex-1">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className="px-5 pb-5 text-[11px] text-white/50">Aurelia / 2026</p>
      </aside>
    </>
  );
}
