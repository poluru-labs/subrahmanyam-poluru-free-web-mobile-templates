export type Product = {
  id: string;
  name: string;
  sku: string;
  category: 'Apparel' | 'Electronics' | 'Home' | 'Accessories';
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
};

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'fulfilled'
  | 'shipped'
  | 'cancelled';

export type Order = {
  id: string;
  customer: string;
  total: number;
  items: number;
  status: OrderStatus;
  placedAt: string;
  channel: 'Web' | 'Mobile' | 'Marketplace';
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spend: number;
  segment: 'New' | 'Returning' | 'VIP';
};

export type InventoryAlert = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  sku: string;
  time: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Aero Soft Tee',
    sku: 'APR-TEE-001',
    category: 'Apparel',
    price: 32,
    stock: 420,
    status: 'active',
  },
  {
    id: 'p2',
    name: 'Pulse Wireless Buds',
    sku: 'ELC-BUD-014',
    category: 'Electronics',
    price: 129,
    stock: 86,
    status: 'active',
  },
  {
    id: 'p3',
    name: 'Lumen Desk Lamp',
    sku: 'HOM-LMP-008',
    category: 'Home',
    price: 78,
    stock: 12,
    status: 'active',
  },
  {
    id: 'p4',
    name: 'Trail Daypack 22L',
    sku: 'ACC-BAG-022',
    category: 'Accessories',
    price: 94,
    stock: 0,
    status: 'active',
  },
  {
    id: 'p5',
    name: 'Nova Running Shorts',
    sku: 'APR-SHT-019',
    category: 'Apparel',
    price: 48,
    stock: 210,
    status: 'active',
  },
  {
    id: 'p6',
    name: 'Orbit Smart Watch',
    sku: 'ELC-WCH-003',
    category: 'Electronics',
    price: 249,
    stock: 54,
    status: 'draft',
  },
];

export const seedOrders: Order[] = [
  {
    id: 'ORD-10482',
    customer: 'Subrahmanyam Poluru',
    total: 214.5,
    items: 3,
    status: 'pending',
    placedAt: '12 min ago',
    channel: 'Web',
  },
  {
    id: 'ORD-10481',
    customer: 'Sravani Poluru',
    total: 129,
    items: 1,
    status: 'paid',
    placedAt: '28 min ago',
    channel: 'Mobile',
  },
  {
    id: 'ORD-10480',
    customer: 'Venkata Poluru',
    total: 86.4,
    items: 2,
    status: 'fulfilled',
    placedAt: '1 hr ago',
    channel: 'Web',
  },
  {
    id: 'ORD-10479',
    customer: 'Lakshmi Poluru',
    total: 312.2,
    items: 4,
    status: 'shipped',
    placedAt: '3 hr ago',
    channel: 'Marketplace',
  },
  {
    id: 'ORD-10478',
    customer: 'Ramesh Poluru',
    total: 48,
    items: 1,
    status: 'cancelled',
    placedAt: '5 hr ago',
    channel: 'Mobile',
  },
];

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Subrahmanyam Poluru',
    email: 'subrahmanyam.poluru@polurus.com',
    orders: 14,
    spend: 1840,
    segment: 'VIP',
  },
  {
    id: 'c2',
    name: 'Sravani Poluru',
    email: 'sravani.poluru@polurus.com',
    orders: 6,
    spend: 642,
    segment: 'Returning',
  },
  {
    id: 'c3',
    name: 'Venkata Poluru',
    email: 'venkata.poluru@polurus.com',
    orders: 2,
    spend: 176,
    segment: 'New',
  },
  {
    id: 'c4',
    name: 'Lakshmi Poluru',
    email: 'lakshmi.poluru@polurus.com',
    orders: 21,
    spend: 4120,
    segment: 'VIP',
  },
  {
    id: 'c5',
    name: 'Ramesh Poluru',
    email: 'ramesh.poluru@polurus.com',
    orders: 4,
    spend: 298,
    segment: 'Returning',
  },
];

export const inventoryAlerts: InventoryAlert[] = [
  {
    id: 'ia1',
    severity: 'critical',
    title: 'Trail Daypack 22L is out of stock',
    sku: 'ACC-BAG-022',
    time: '8 min ago',
  },
  {
    id: 'ia2',
    severity: 'warning',
    title: 'Lumen Desk Lamp below reorder point',
    sku: 'HOM-LMP-008',
    time: '34 min ago',
  },
  {
    id: 'ia3',
    severity: 'info',
    title: 'Pulse Wireless Buds restock arrived',
    sku: 'ELC-BUD-014',
    time: '2 hr ago',
  },
];

export const overviewStats = [
  {
    label: 'Gross sales',
    value: '$128.4k',
    trend: 'up' as const,
    trendValue: '+8.2%',
    hint: 'Last 7 days',
  },
  {
    label: 'Orders',
    value: '1,482',
    trend: 'up' as const,
    trendValue: '+5.1%',
    hint: 'Last 7 days',
  },
  {
    label: 'Avg. order value',
    value: '$86.60',
    trend: 'flat' as const,
    trendValue: '0.4%',
    hint: 'Trailing 30 days',
  },
  {
    label: 'Conversion',
    value: '3.4%',
    trend: 'down' as const,
    trendValue: '-0.2%',
    hint: 'Storefront sessions',
  },
];

export const overviewStatsByPeriod: Record<
  'today' | '7d' | '30d',
  typeof overviewStats
> = {
  today: [
    {
      label: 'Gross sales',
      value: '$18.6k',
      trend: 'up',
      trendValue: '+12%',
      hint: 'Since midnight',
    },
    {
      label: 'Orders',
      value: '214',
      trend: 'up',
      trendValue: '+9%',
      hint: 'Since midnight',
    },
    {
      label: 'Avg. order value',
      value: '$87.10',
      trend: 'up',
      trendValue: '+1.2%',
      hint: 'Today',
    },
    {
      label: 'Conversion',
      value: '3.8%',
      trend: 'up',
      trendValue: '+0.3%',
      hint: 'Today',
    },
  ],
  '7d': overviewStats,
  '30d': [
    {
      label: 'Gross sales',
      value: '$512.9k',
      trend: 'up',
      trendValue: '+6.4%',
      hint: 'Last 30 days',
    },
    {
      label: 'Orders',
      value: '5,920',
      trend: 'up',
      trendValue: '+4.1%',
      hint: 'Last 30 days',
    },
    {
      label: 'Avg. order value',
      value: '$86.60',
      trend: 'flat',
      trendValue: '0.2%',
      hint: 'Last 30 days',
    },
    {
      label: 'Conversion',
      value: '3.2%',
      trend: 'down',
      trendValue: '-0.1%',
      hint: 'Last 30 days',
    },
  ],
};

export type ChannelMixRow = {
  channel: 'Web' | 'Mobile' | 'Marketplace' | 'Social' | 'Retail POS';
  share: number;
  revenue: number;
  orders: number;
  aov: number;
  conversion: number;
  sessions: number;
  trend: 'up' | 'down' | 'flat';
  trendValue: string;
  topRegion: string;
  refundRate: number;
};

export const channelMix: ChannelMixRow[] = [
  {
    channel: 'Web',
    share: 42,
    revenue: 61800,
    orders: 712,
    aov: 86.8,
    conversion: 3.9,
    sessions: 18240,
    trend: 'up',
    trendValue: '+6.2%',
    topRegion: 'US-West',
    refundRate: 2.1,
  },
  {
    channel: 'Mobile',
    share: 28,
    revenue: 43600,
    orders: 518,
    aov: 84.2,
    conversion: 4.4,
    sessions: 11780,
    trend: 'up',
    trendValue: '+9.1%',
    topRegion: 'US-East',
    refundRate: 1.8,
  },
  {
    channel: 'Marketplace',
    share: 16,
    revenue: 23000,
    orders: 296,
    aov: 77.7,
    conversion: 2.6,
    sessions: 11400,
    trend: 'flat',
    trendValue: '+0.4%',
    topRegion: 'US-Central',
    refundRate: 3.4,
  },
  {
    channel: 'Social',
    share: 9,
    revenue: 12840,
    orders: 164,
    aov: 78.3,
    conversion: 2.1,
    sessions: 7810,
    trend: 'up',
    trendValue: '+14%',
    topRegion: 'US-South',
    refundRate: 2.8,
  },
  {
    channel: 'Retail POS',
    share: 5,
    revenue: 7120,
    orders: 88,
    aov: 80.9,
    conversion: 100,
    sessions: 88,
    trend: 'down',
    trendValue: '-3.2%',
    topRegion: 'US-West',
    refundRate: 1.2,
  },
];

export const channelMixSummary = {
  totalRevenue: 148360,
  totalOrders: 1778,
  blendedAov: 83.4,
  topChannel: 'Web',
};

export const categorySales = [
  { category: 'Apparel', share: 36, units: 842 },
  { category: 'Electronics', share: 29, units: 318 },
  { category: 'Home', share: 21, units: 256 },
  { category: 'Accessories', share: 14, units: 190 },
];

export const dailyGoals = [
  { label: 'Sales target', value: 78, target: '$24k' },
  { label: 'Orders target', value: 64, target: '280' },
  { label: 'Fulfillment SLA', value: 91, target: '95%' },
];

export type SearchResult = {
  id: string;
  label: string;
  category: 'Product' | 'Order' | 'Customer';
  path: string;
};

export const searchCatalog: SearchResult[] = [
  ...products.map((p) => ({
    id: p.id,
    label: `${p.name} · ${p.sku}`,
    category: 'Product' as const,
    path: '/products',
  })),
  ...seedOrders.map((o) => ({
    id: o.id,
    label: `${o.id} · ${o.customer}`,
    category: 'Order' as const,
    path: '/orders',
  })),
  ...customers.map((c) => ({
    id: c.id,
    label: `${c.name} · ${c.email}`,
    category: 'Customer' as const,
    path: '/customers',
  })),
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
