import { PageHeader } from '../components/PageHeader';
import { goals } from '../data/mock';
import { formatCurrency, formatDate } from '../utils/format';
import './pages.scss';

export function GoalsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Goals"
        lead="Track progress toward emergency savings, housing, travel, and tax buffers."
      />

      <div className="goal-grid">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
          return (
            <article key={goal.id} className="wt-card">
              <div className="d-flex justify-content-between gap-2">
                <h2 className="card-title mb-1">{goal.title}</h2>
                <span className="badge-soft">{goal.category}</span>
              </div>
              <p className="stat-value mono">
                {formatCurrency(goal.saved)}
                <span className="wt-muted" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                  {' '}
                  / {formatCurrency(goal.target)}
                </span>
              </p>
              <div className="progress progress-wt mt-2 mb-2">
                <div
                  className="progress-bar"
                  style={{ width: `${pct}%` }}
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
              <p className="stat-hint mb-0">
                {pct}% funded · Due {formatDate(goal.deadline)}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
