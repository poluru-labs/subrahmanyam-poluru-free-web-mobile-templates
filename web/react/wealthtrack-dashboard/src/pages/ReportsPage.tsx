import { PageHeader } from '../components/PageHeader';
import {
  allocation,
  budgets,
  goals,
  holdings,
  overviewStats,
  transactions,
} from '../data/mock';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/csv';
import { formatCurrency } from '../utils/format';
import './pages.scss';

export function ReportsPage() {
  const { show } = useToast();

  const invested = holdings.reduce((s, h) => s + h.shares * h.price, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const incomeTotal = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const exportSummary = () => {
    downloadCsv('wealthtrack-report-summary.csv', [
      ['Metric', 'Value'],
      ...overviewStats.map((s) => [s.label, String(s.value)]),
      ['Portfolio market value', String(invested)],
      ['Period income', String(incomeTotal)],
      ['Period expenses', String(expenseTotal)],
      [],
      ['Allocation', 'Percent'],
      ...allocation.map((a) => [a.label, String(a.value)]),
      [],
      ['Goal', 'Saved', 'Target'],
      ...goals.map((g) => [g.title, String(g.saved), String(g.target)]),
      [],
      ['Budget', 'Planned', 'Spent'],
      ...budgets.map((b) => [b.name, String(b.planned), String(b.spent)]),
    ]);
    show({ title: 'Report summary exported', variant: 'success' });
  };

  return (
    <div className="page">
      <PageHeader
        title="Reports"
        lead="Snapshot reports for net worth, cashflow, allocation, and goal funding."
        actions={
          <button type="button" className="btn btn-wt-primary btn-sm" onClick={exportSummary}>
            <i className="bi bi-download me-1" />
            Export summary
          </button>
        }
      />

      <div className="stat-grid">
        <article className="wt-card">
          <p className="stat-label">Invested value</p>
          <p className="stat-value mono">{formatCurrency(invested)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Period income</p>
          <p className="stat-value mono wt-positive">{formatCurrency(incomeTotal)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Period expenses</p>
          <p className="stat-value mono wt-negative">{formatCurrency(expenseTotal)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Cashflow</p>
          <p
            className={`stat-value mono ${incomeTotal - expenseTotal >= 0 ? 'wt-positive' : 'wt-negative'}`}
          >
            {formatCurrency(incomeTotal - expenseTotal)}
          </p>
        </article>
      </div>

      <div className="split-2">
        <article className="wt-card">
          <h2 className="card-title">Allocation mix</h2>
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
        <article className="wt-card">
          <h2 className="card-title">Goal funding</h2>
          <ul className="alloc-list">
            {goals.map((goal) => {
              const pct = Math.round((goal.saved / goal.target) * 100);
              return (
                <li key={goal.id} className="alloc-row">
                  <strong>{goal.title}</strong>
                  <span className="mono">{pct}%</span>
                  <div className="alloc-track">
                    <div
                      className="alloc-fill"
                      style={{
                        width: `${Math.min(100, pct)}%`,
                        background: '#1d4ed8',
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </div>
  );
}
