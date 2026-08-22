import { PageHeader } from '../components/PageHeader';
import { budgets } from '../data/mock';
import { formatCurrency } from '../utils/format';
import './pages.scss';

export function BudgetsPage() {
  const planned = budgets.reduce((s, b) => s + b.planned, 0);
  const spent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="page">
      <PageHeader
        title="Budgets"
        lead="Monthly category plans versus actual spend from mock transactions."
      />

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <article className="wt-card">
          <p className="stat-label">Planned</p>
          <p className="stat-value mono">{formatCurrency(planned)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Spent</p>
          <p className="stat-value mono">{formatCurrency(spent)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Remaining</p>
          <p className={`stat-value mono ${planned - spent >= 0 ? 'wt-positive' : 'wt-negative'}`}>
            {formatCurrency(planned - spent)}
          </p>
        </article>
      </div>

      <article className="wt-card">
        <div className="table-wrap">
          <table className="table wt-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Planned</th>
                <th>Spent</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b) => {
                const pct = Math.round((b.spent / b.planned) * 100);
                const over = pct > 100;
                return (
                  <tr key={b.id}>
                    <td>
                      <strong>{b.name}</strong>
                    </td>
                    <td className="mono">{formatCurrency(b.planned)}</td>
                    <td className={`mono ${over ? 'wt-negative' : ''}`}>
                      {formatCurrency(b.spent)}
                    </td>
                    <td style={{ minWidth: '10rem' }}>
                      <div className={`progress progress-wt ${over ? 'is-over' : ''}`}>
                        <div
                          className="progress-bar"
                          style={{ width: `${Math.min(100, pct)}%` }}
                        />
                      </div>
                      <span className="wt-muted" style={{ fontSize: '0.78rem' }}>
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
