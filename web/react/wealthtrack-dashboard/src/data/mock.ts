export type Holding = {
  id: string;
  symbol: string;
  name: string;
  assetClass: 'Equity' | 'ETF' | 'Bond' | 'Cash' | 'Crypto';
  shares: number;
  price: number;
  costBasis: number;
  dayChangePct: number;
  accountId: string;
};

export type Account = {
  id: string;
  name: string;
  institution: string;
  type: 'Brokerage' | 'Checking' | 'Savings' | 'Retirement' | 'Credit';
  balance: number;
  currency: string;
  lastSynced: string;
  status: 'healthy' | 'attention' | 'error';
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  category: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense' | 'transfer' | 'investment';
};

export type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  deadline: string;
  category: string;
};

export type BudgetCategory = {
  id: string;
  name: string;
  planned: number;
  spent: number;
};

export type WatchItem = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  notes: string;
};

export type NetWorthPoint = {
  month: string;
  value: number;
};

export type AllocationSlice = {
  label: string;
  value: number;
  color: string;
};

export const profile = {
  name: 'Arjun Poluru',
  email: 'mail.polurus@gmail.com',
  currency: 'USD',
};

export const overviewStats = [
  {
    id: 'nw',
    label: 'Net worth',
    value: 428650,
    changePct: 2.4,
    hint: 'Vs last month',
  },
  {
    id: 'invested',
    label: 'Invested',
    value: 312480,
    changePct: 1.8,
    hint: 'Brokerage + retirement',
  },
  {
    id: 'cash',
    label: 'Cash',
    value: 64200,
    changePct: -0.4,
    hint: 'Checking + savings',
  },
  {
    id: 'debt',
    label: 'Liabilities',
    value: 18430,
    changePct: -3.1,
    hint: 'Credit balance',
  },
];

export const netWorthSeries: NetWorthPoint[] = [
  { month: 'Mar', value: 392000 },
  { month: 'Apr', value: 401200 },
  { month: 'May', value: 408750 },
  { month: 'Jun', value: 415100 },
  { month: 'Jul', value: 421900 },
  { month: 'Aug', value: 428650 },
];

export const allocation: AllocationSlice[] = [
  { label: 'Equities', value: 48, color: '#1D4ED8' },
  { label: 'ETFs', value: 22, color: '#3B82F6' },
  { label: 'Bonds', value: 12, color: '#0EA5E9' },
  { label: 'Cash', value: 15, color: '#38BDF8' },
  { label: 'Crypto', value: 3, color: '#1E3A8A' },
];

export const accounts: Account[] = [
  {
    id: 'acc-broker',
    name: 'Growth Brokerage',
    institution: 'Fidelity',
    type: 'Brokerage',
    balance: 186420,
    currency: 'USD',
    lastSynced: '2026-08-21T14:20:00',
    status: 'healthy',
  },
  {
    id: 'acc-401k',
    name: 'Workplace 401(k)',
    institution: 'Vanguard',
    type: 'Retirement',
    balance: 126060,
    currency: 'USD',
    lastSynced: '2026-08-21T09:05:00',
    status: 'healthy',
  },
  {
    id: 'acc-check',
    name: 'Everyday Checking',
    institution: 'Chase',
    type: 'Checking',
    balance: 18450,
    currency: 'USD',
    lastSynced: '2026-08-21T16:40:00',
    status: 'healthy',
  },
  {
    id: 'acc-save',
    name: 'Emergency Savings',
    institution: 'Ally',
    type: 'Savings',
    balance: 45750,
    currency: 'USD',
    lastSynced: '2026-08-20T22:10:00',
    status: 'healthy',
  },
  {
    id: 'acc-card',
    name: 'Rewards Card',
    institution: 'Amex',
    type: 'Credit',
    balance: -18430,
    currency: 'USD',
    lastSynced: '2026-08-21T12:00:00',
    status: 'attention',
  },
];

export const holdings: Holding[] = [
  {
    id: 'h1',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market',
    assetClass: 'ETF',
    shares: 220,
    price: 268.4,
    costBasis: 214.1,
    dayChangePct: 0.62,
    accountId: 'acc-broker',
  },
  {
    id: 'h2',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetClass: 'Equity',
    shares: 85,
    price: 224.15,
    costBasis: 168.4,
    dayChangePct: 1.12,
    accountId: 'acc-broker',
  },
  {
    id: 'h3',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    assetClass: 'Equity',
    shares: 40,
    price: 428.9,
    costBasis: 310.2,
    dayChangePct: 0.48,
    accountId: 'acc-broker',
  },
  {
    id: 'h4',
    symbol: 'BND',
    name: 'Vanguard Total Bond Market',
    assetClass: 'Bond',
    shares: 310,
    price: 73.2,
    costBasis: 76.8,
    dayChangePct: -0.15,
    accountId: 'acc-401k',
  },
  {
    id: 'h5',
    symbol: 'VXUS',
    name: 'Vanguard Total Intl Stock',
    assetClass: 'ETF',
    shares: 180,
    price: 64.5,
    costBasis: 58.1,
    dayChangePct: 0.33,
    accountId: 'acc-401k',
  },
  {
    id: 'h6',
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'Crypto',
    shares: 0.42,
    price: 64200,
    costBasis: 48000,
    dayChangePct: 2.1,
    accountId: 'acc-broker',
  },
  {
    id: 'h7',
    symbol: 'CASH',
    name: 'USD Sweep',
    assetClass: 'Cash',
    shares: 12400,
    price: 1,
    costBasis: 1,
    dayChangePct: 0,
    accountId: 'acc-broker',
  },
];

export const transactions: Transaction[] = [
  {
    id: 't1',
    date: '2026-08-20',
    description: 'Payroll · Poluru Labs',
    category: 'Income',
    accountId: 'acc-check',
    amount: 5200,
    type: 'income',
  },
  {
    id: 't2',
    date: '2026-08-19',
    description: 'VTI buy · 10 shares',
    category: 'Investing',
    accountId: 'acc-broker',
    amount: -2684,
    type: 'investment',
  },
  {
    id: 't3',
    date: '2026-08-18',
    description: 'Rent · August',
    category: 'Housing',
    accountId: 'acc-check',
    amount: -2100,
    type: 'expense',
  },
  {
    id: 't4',
    date: '2026-08-17',
    description: 'Transfer to Ally savings',
    category: 'Transfer',
    accountId: 'acc-check',
    amount: -800,
    type: 'transfer',
  },
  {
    id: 't5',
    date: '2026-08-16',
    description: 'Grocery · FreshMart',
    category: 'Food',
    accountId: 'acc-card',
    amount: -142.55,
    type: 'expense',
  },
  {
    id: 't6',
    date: '2026-08-15',
    description: 'Dividend · AAPL',
    category: 'Dividends',
    accountId: 'acc-broker',
    amount: 68.4,
    type: 'income',
  },
  {
    id: 't7',
    date: '2026-08-14',
    description: 'Utilities · Electric',
    category: 'Utilities',
    accountId: 'acc-check',
    amount: -126.2,
    type: 'expense',
  },
  {
    id: 't8',
    date: '2026-08-12',
    description: '401(k) contribution',
    category: 'Investing',
    accountId: 'acc-401k',
    amount: 950,
    type: 'investment',
  },
  {
    id: 't9',
    date: '2026-08-10',
    description: 'Transit pass',
    category: 'Transport',
    accountId: 'acc-card',
    amount: -96,
    type: 'expense',
  },
  {
    id: 't10',
    date: '2026-08-08',
    description: 'Interest · Ally HYSA',
    category: 'Interest',
    accountId: 'acc-save',
    amount: 142.18,
    type: 'income',
  },
];

export const goals: Goal[] = [
  {
    id: 'g1',
    title: 'Emergency fund (6 mo)',
    target: 60000,
    saved: 45750,
    deadline: '2026-12-31',
    category: 'Safety',
  },
  {
    id: 'g2',
    title: 'Home down payment',
    target: 120000,
    saved: 38400,
    deadline: '2028-06-01',
    category: 'Housing',
  },
  {
    id: 'g3',
    title: 'India trip fund',
    target: 8000,
    saved: 5200,
    deadline: '2027-01-15',
    category: 'Travel',
  },
  {
    id: 'g4',
    title: 'Roth conversion buffer',
    target: 25000,
    saved: 9100,
    deadline: '2027-04-15',
    category: 'Tax',
  },
];

export const budgets: BudgetCategory[] = [
  { id: 'b1', name: 'Housing', planned: 2200, spent: 2100 },
  { id: 'b2', name: 'Food', planned: 650, spent: 482 },
  { id: 'b3', name: 'Transport', planned: 220, spent: 196 },
  { id: 'b4', name: 'Utilities', planned: 180, spent: 126 },
  { id: 'b5', name: 'Entertainment', planned: 200, spent: 240 },
  { id: 'b6', name: 'Subscriptions', planned: 90, spent: 78 },
];

export const watchlistSeed: WatchItem[] = [
  {
    id: 'w1',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 118.4,
    changePct: 1.8,
    notes: 'AI exposure watch',
  },
  {
    id: 'w2',
    symbol: 'SCHD',
    name: 'Schwab US Dividend Equity',
    price: 28.1,
    changePct: 0.2,
    notes: 'Dividend candidate',
  },
  {
    id: 'w3',
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    price: 224.6,
    changePct: -0.4,
    notes: 'Hedge sleeve',
  },
];

export const recentActivity = [
  { id: 'a1', text: 'Synced Fidelity brokerage', time: '12 min ago' },
  { id: 'a2', text: 'Goal progress: Emergency fund +$400', time: '2 hr ago' },
  { id: 'a3', text: 'Budget alert: Entertainment over plan', time: 'Yesterday' },
  { id: 'a4', text: 'Dividend posted · AAPL $68.40', time: '3 days ago' },
];

export function accountName(id: string) {
  return accounts.find((a) => a.id === id)?.name ?? id;
}
