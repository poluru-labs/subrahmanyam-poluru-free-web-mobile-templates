import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import {
  allocation,
  netWorthSeries,
  overviewStats,
  recentActivity,
} from '../data/mock';
import { formatCurrency, formatPct } from '../utils/format';
import './pages.scss';

export function OverviewPage() {
  const max = Math.max(...netWorthSeries.map((p) => p.value));

  return (
    <div className="page">
      <PageHeader
        title="Overview"
        lead="Net worth, allocation, and recent money movement across linked accounts."
        actions={
          <>
            <Link to="/reports" className="btn btn-wt-ghost btn-sm">
              Reports
            </Link>
            <Link to="/transactions" className="btn btn-wt-primary btn-sm">
              View transactions
            </Link>
          </>
        }
      />

      <section className="stat-grid" aria-label="Key metrics">
        {overviewStats.map((stat) => (
          <article key={stat.id} className="wt-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value mono">{formatCurrency(stat.value)}</p>
            <p className="stat-hint">
              <span className={stat.changePct >= 0 ? 'wt-positive' : 'wt-negative'}>
                {formatPct(stat.changePct)}
              </span>{' '}
              · {stat.hint}
            </p>
          </article>
        ))}
      </section>

      <div className="split-2">
        <article className="wt-card">
          <h2 className="card-title">Net worth trend</h2>
          <div className="sparkline" aria-hidden="true">
            {netWorthSeries.map((point) => (
              <div key={point.month} className="sparkline__bar">
                <div
                  className="sparkline__fill"
                  style={{ height: `${Math.max(12, (point.value / max) * 100)}%` }}
                />
                <span className="sparkline__label">{point.month}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="wt-card">
          <h2 className="card-title">Asset allocation</h2>
          <ul className="alloc-list">
            {allocation.map((slice) => (
              <li key={slice.label} className="alloc-row">
                <strong>{slice.label}</strong>
                <span className="mono">{slice.value}%</span>
                <div className="alloc-track">
                  <div
                    className="alloc-fill"
                    style={{ width: `${slice.value}%`, background: slice.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="wt-card">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="card-title mb-0">Recent activity</h2>
          <Link to="/accounts" className="btn btn-wt-ghost btn-sm">
            Accounts
          </Link>
        </div>
        <ul className="activity-list">
          {recentActivity.map((item) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <span className="wt-muted">{item.time}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
