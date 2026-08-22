import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { accountName, transactions } from '../data/mock';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/csv';
import { formatCurrency, formatDate } from '../utils/format';
import './pages.scss';

export function TransactionsPage() {
  const { show } = useToast();
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchType = type === 'all' || t.type === type;
      const matchQ =
        !q ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        accountName(t.accountId).toLowerCase().includes(q);
      return matchType && matchQ;
    });
  }, [query, type]);

  const exportCsv = () => {
    downloadCsv('wealthtrack-transactions.csv', [
      ['Date', 'Description', 'Category', 'Account', 'Type', 'Amount'],
      ...rows.map((t) => [
        t.date,
        t.description,
        t.category,
        accountName(t.accountId),
        t.type,
        String(t.amount),
      ]),
    ]);
    show({ title: 'Transactions CSV exported', variant: 'success' });
  };

  return (
    <div className="page">
      <PageHeader
        title="Transactions"
        lead="Search income, expenses, transfers, and investment activity."
        actions={
          <button type="button" className="btn btn-wt-primary btn-sm" onClick={exportCsv}>
            <i className="bi bi-download me-1" />
            Export CSV
          </button>
        }
      />

      <div className="toolbar">
        <input
          type="search"
          className="form-control"
          placeholder="Search description, category, account…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search transactions"
        />
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Transaction type"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="transfer">Transfer</option>
          <option value="investment">Investment</option>
        </select>
      </div>

      <article className="wt-card">
        <div className="table-wrap">
          <table className="table wt-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Account</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td>{formatDate(t.date)}</td>
                  <td>{t.description}</td>
                  <td>
                    <span className="badge-soft">{t.category}</span>
                  </td>
                  <td>{accountName(t.accountId)}</td>
                  <td className="text-capitalize">{t.type}</td>
                  <td className={`mono ${t.amount >= 0 ? 'wt-positive' : 'wt-negative'}`}>
                    {formatCurrency(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="empty-note">No transactions match.</p> : null}
      </article>
    </div>
  );
}
