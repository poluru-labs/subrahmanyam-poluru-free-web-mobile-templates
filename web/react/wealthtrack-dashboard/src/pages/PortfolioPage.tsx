import { useMemo, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { accountName, holdings } from '../data/mock';
import { useToast } from '../context/ToastContext';
import { downloadCsv } from '../utils/csv';
import { formatCurrency, formatPct } from '../utils/format';
import './pages.scss';

export function PortfolioPage() {
  const { show } = useToast();
  const [query, setQuery] = useState('');
  const [assetClass, setAssetClass] = useState('all');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return holdings.filter((h) => {
      const matchClass = assetClass === 'all' || h.assetClass === assetClass;
      const matchQ =
        !q ||
        h.symbol.toLowerCase().includes(q) ||
        h.name.toLowerCase().includes(q);
      return matchClass && matchQ;
    });
  }, [query, assetClass]);

  const totals = useMemo(() => {
    const market = rows.reduce((sum, h) => sum + h.shares * h.price, 0);
    const cost = rows.reduce((sum, h) => sum + h.shares * h.costBasis, 0);
    return { market, gain: market - cost, gainPct: cost ? ((market - cost) / cost) * 100 : 0 };
  }, [rows]);

  const exportCsv = () => {
    downloadCsv('wealthtrack-portfolio.csv', [
      ['Symbol', 'Name', 'Class', 'Shares', 'Price', 'Market value', 'Day %', 'Account'],
      ...rows.map((h) => [
        h.symbol,
        h.name,
        h.assetClass,
        String(h.shares),
        String(h.price),
        String(h.shares * h.price),
        String(h.dayChangePct),
        accountName(h.accountId),
      ]),
    ]);
    show({ title: 'Portfolio CSV exported', variant: 'success' });
  };

  return (
    <div className="page">
      <PageHeader
        title="Portfolio"
        lead="Holdings across brokerage and retirement accounts with filters and CSV export."
        actions={
          <button type="button" className="btn btn-wt-primary btn-sm" onClick={exportCsv}>
            <i className="bi bi-download me-1" />
            Export CSV
          </button>
        }
      />

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <article className="wt-card">
          <p className="stat-label">Market value</p>
          <p className="stat-value mono">{formatCurrency(totals.market)}</p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Unrealized gain</p>
          <p className={`stat-value mono ${totals.gain >= 0 ? 'wt-positive' : 'wt-negative'}`}>
            {formatCurrency(totals.gain)}
          </p>
        </article>
        <article className="wt-card">
          <p className="stat-label">Return vs cost</p>
          <p className={`stat-value mono ${totals.gainPct >= 0 ? 'wt-positive' : 'wt-negative'}`}>
            {formatPct(totals.gainPct)}
          </p>
        </article>
      </div>

      <div className="toolbar">
        <input
          type="search"
          className="form-control"
          placeholder="Search symbol or name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search holdings"
        />
        <select
          className="form-select"
          value={assetClass}
          onChange={(e) => setAssetClass(e.target.value)}
          aria-label="Asset class"
        >
          <option value="all">All classes</option>
          <option value="Equity">Equity</option>
          <option value="ETF">ETF</option>
          <option value="Bond">Bond</option>
          <option value="Cash">Cash</option>
          <option value="Crypto">Crypto</option>
        </select>
      </div>

      <article className="wt-card">
        <div className="table-wrap">
          <table className="table wt-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th>Class</th>
                <th>Shares</th>
                <th>Price</th>
                <th>Value</th>
                <th>Day</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((h) => (
                <tr key={h.id}>
                  <td>
                    <strong>{h.symbol}</strong>
                  </td>
                  <td>{h.name}</td>
                  <td>
                    <span className="badge-soft">{h.assetClass}</span>
                  </td>
                  <td className="mono">{h.shares}</td>
                  <td className="mono">{formatCurrency(h.price)}</td>
                  <td className="mono">{formatCurrency(h.shares * h.price)}</td>
                  <td className={`mono ${h.dayChangePct >= 0 ? 'wt-positive' : 'wt-negative'}`}>
                    {formatPct(h.dayChangePct)}
                  </td>
                  <td>{accountName(h.accountId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 ? <p className="empty-note">No holdings match.</p> : null}
      </article>
    </div>
  );
}
