import { useState, type FormEvent } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useToast } from '../context/ToastContext';
import { useWatchlist } from '../context/WatchlistContext';
import { formatCurrency, formatPct } from '../utils/format';
import './pages.scss';

export function WatchlistPage() {
  const { items, addSymbol, removeSymbol } = useWatchlist();
  const { show } = useToast();
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const onAdd = (event: FormEvent) => {
    event.preventDefault();
    const sym = symbol.trim().toUpperCase();
    if (!sym || !name.trim()) {
      show({ title: 'Symbol and name required', variant: 'warning' });
      return;
    }
    addSymbol({
      symbol: sym,
      name: name.trim(),
      price: 100 + Math.random() * 200,
      changePct: Number(((Math.random() * 4) - 1.5).toFixed(1)),
      notes: notes.trim() || 'Added from dashboard',
    });
    setSymbol('');
    setName('');
    setNotes('');
    show({ title: `${sym} added to watchlist`, variant: 'success' });
  };

  return (
    <div className="page">
      <PageHeader
        title="Watchlist"
        lead="Track tickers you are researching. Persists in this browser."
      />

      <div className="split-2">
        <article className="wt-card">
          <h2 className="card-title">Add symbol</h2>
          <form className="form-stack" onSubmit={onAdd}>
            <div>
              <label className="form-label fw-semibold" htmlFor="wl-symbol">
                Symbol
              </label>
              <input
                id="wl-symbol"
                className="form-control"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. AMZN"
              />
            </div>
            <div>
              <label className="form-label fw-semibold" htmlFor="wl-name">
                Name
              </label>
              <input
                id="wl-name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Company or fund name"
              />
            </div>
            <div>
              <label className="form-label fw-semibold" htmlFor="wl-notes">
                Notes
              </label>
              <input
                id="wl-notes"
                className="form-control"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional thesis"
              />
            </div>
            <button type="submit" className="btn btn-wt-primary">
              Add to watchlist
            </button>
          </form>
        </article>

        <div className="watch-grid" style={{ gridTemplateColumns: '1fr' }}>
          {items.map((item) => (
            <article key={item.id} className="wt-card">
              <div className="d-flex justify-content-between gap-2">
                <div>
                  <h2 className="card-title mb-0">{item.symbol}</h2>
                  <p className="wt-muted mb-0">{item.name}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-wt-ghost btn-sm"
                  aria-label={`Remove ${item.symbol}`}
                  onClick={() => {
                    removeSymbol(item.id);
                    show({ title: `${item.symbol} removed`, variant: 'info' });
                  }}
                >
                  <i className="bi bi-trash" />
                </button>
              </div>
              <p className="stat-value mono mt-2 mb-1">{formatCurrency(item.price)}</p>
              <p className={`stat-hint ${item.changePct >= 0 ? 'wt-positive' : 'wt-negative'}`}>
                {formatPct(item.changePct)} today
              </p>
              <p className="mb-0 wt-muted" style={{ fontSize: '0.88rem' }}>
                {item.notes}
              </p>
            </article>
          ))}
          {items.length === 0 ? <p className="empty-note">Watchlist is empty.</p> : null}
        </div>
      </div>
    </div>
  );
}
