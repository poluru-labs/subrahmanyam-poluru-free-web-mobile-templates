import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  SegmentedControl,
  Status,
} from '@poluru-labs/enterprise-design-system-react';
import { formatCurrency, products } from '../data/mock';
import './pages.scss';

const filters = ['all', 'Apparel', 'Electronics', 'Home', 'Accessories'] as const;

const statusVariant = {
  active: 'success',
  draft: 'info',
  archived: 'neutral',
} as const;

export function ProductsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');

  const filtered =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'sku', label: 'SKU' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
  ];

  const rows = filtered.map((p) => ({
    name: p.name,
    sku: p.sku,
    category: p.category,
    price: formatCurrency(p.price),
    stock: p.stock,
    status: p.status,
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Catalog SKUs across apparel, electronics, home, and accessories.
        </p>
        <div className="page-toolbar__actions">
          <Badge label={`${filtered.length} products`} variant="brand" soft />
          <Button variant="primary" size="sm" icon="plus">
            Add product
          </Button>
        </div>
      </div>

      <SegmentedControl
        className="filter-bar"
        value={filter}
        onChange={(value) => setFilter(value as (typeof filters)[number])}
        options={filters.map((value) => ({
          label: value === 'all' ? 'All' : value,
          value,
        }))}
      />

      <section className="product-cards stagger" aria-label="Product cards">
        {filtered.map((product) => (
          <Card key={product.id} elevated padded>
            <div className="product-card">
              <div className="product-card__head">
                <h2>{product.name}</h2>
                <Status
                  label={product.status}
                  variant={statusVariant[product.status]}
                />
              </div>
              <Badge label={product.category} variant="neutral" soft />
              <dl className="kv">
                <div>
                  <dt>SKU</dt>
                  <dd className="mono">{product.sku}</dd>
                </div>
                <div>
                  <dt>Price</dt>
                  <dd className="mono">{formatCurrency(product.price)}</dd>
                </div>
                <div>
                  <dt>Stock</dt>
                  <dd className="mono">{product.stock}</dd>
                </div>
                <div>
                  <dt>Channel</dt>
                  <dd>All</dd>
                </div>
              </dl>
            </div>
          </Card>
        ))}
      </section>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Product table</h2>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} striped sortable />
      </Card>
    </div>
  );
}
