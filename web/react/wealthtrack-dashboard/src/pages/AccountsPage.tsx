import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { accounts } from '../data/mock';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatDateTime } from '../utils/format';
import './pages.scss';

export function AccountsPage() {
  const { show } = useToast();
  const [type, setType] = useState('all');
  const [syncing, setSyncing] = useState(false);

  const filtered = useMemo(
    () => accounts.filter((a) => type === 'all' || a.type === type),
    [type],
  );

  const total = filtered.reduce((sum, a) => sum + a.balance, 0);

  const syncAll = () => {
    setSyncing(true);
    window.setTimeout(() => {
      setSyncing(false);
      show({ title: 'Accounts synced', message: 'Mock balances refreshed', variant: 'success' });
    }, 700);
  };

  return (
    <div className="page">
      <PageHeader
        title="Accounts"
        lead="Linked brokerage, bank, retirement, and credit accounts."
        actions={
          <button
            type="button"
            className="btn btn-wt-primary btn-sm"
            disabled={syncing}
            onClick={syncAll}
          >
            <i className="bi bi-arrow-repeat me-1" />
            {syncing ? 'Syncing…' : 'Sync all'}
          </button>
        }
      />

      <div className="toolbar">
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Account type"
        >
          <option value="all">All types</option>
          <option value="Brokerage">Brokerage</option>
          <option value="Retirement">Retirement</option>
          <option value="Checking">Checking</option>
          <option value="Savings">Savings</option>
          <option value="Credit">Credit</option>
        </select>
        <span className="badge-soft">Total {formatCurrency(total)}</span>
      </div>

      <div className="account-grid">
        {filtered.map((account) => (
          <article key={account.id} className="wt-card">
            <div className="d-flex justify-content-between gap-2 align-items-start">
              <div>
                <h2 className="card-title mb-1">{account.name}</h2>
                <p className="wt-muted mb-0">
                  {account.institution} · {account.type}
                </p>
              </div>
              <span
                className={
                  account.status === 'healthy'
                    ? 'badge-ok'
                    : account.status === 'attention'
                      ? 'badge-warn'
                      : 'badge-soft'
                }
              >
                {account.status}
              </span>
            </div>
            <p className={`stat-value mono mt-3 ${account.balance < 0 ? 'wt-negative' : ''}`}>
              {formatCurrency(account.balance)}
            </p>
            <p className="stat-hint mb-0">
              Last synced {formatDateTime(account.lastSynced)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
