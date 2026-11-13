import { NavLink, Outlet } from 'react-router'
import { env, NAV_ITEMS } from '@/core'
import { Footer, cn, useTheme } from '@/shared'
import styles from './AppLayout.module.scss'

export function AppLayout() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Primary">
        <div className={styles.brand}>
          <span className={styles.brandMark}>{env.appName}</span>
          <span className={styles.brandTag}>Extract invoice fields, validate totals, and route approvals.</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(styles.link, isActive && styles.active)
              }
            >
              <span className={styles.linkLabel}>{item.label}</span>
              <span className={styles.linkDesc}>{item.description}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <nav className={styles.mobileNav} aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(styles.mobileLink, isActive && styles.mobileActive)
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle color theme"
            >
              {theme === 'light' ? 'Dark' : 'Light'} mode
            </button>
            <span className={styles.envPill}>{env.appEnv}</span>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
