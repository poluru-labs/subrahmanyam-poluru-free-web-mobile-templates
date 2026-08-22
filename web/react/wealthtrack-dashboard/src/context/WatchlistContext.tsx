import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { watchlistSeed, type WatchItem } from '../data/mock';

const KEY = 'wealthtrack-watchlist-v1';

type WatchlistContextValue = {
  items: WatchItem[];
  addSymbol: (item: Omit<WatchItem, 'id'>) => void;
  removeSymbol: (id: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

function load(): WatchItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return watchlistSeed;
    const parsed = JSON.parse(raw) as WatchItem[];
    return Array.isArray(parsed) && parsed.length ? parsed : watchlistSeed;
  } catch {
    return watchlistSeed;
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WatchItem[]>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<WatchlistContextValue>(
    () => ({
      items,
      addSymbol: (item) => {
        setItems((prev) => [
          { ...item, id: crypto.randomUUID() },
          ...prev.filter((p) => p.symbol !== item.symbol),
        ]);
      },
      removeSymbol: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
    }),
    [items],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
