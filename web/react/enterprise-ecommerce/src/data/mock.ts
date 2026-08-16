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
