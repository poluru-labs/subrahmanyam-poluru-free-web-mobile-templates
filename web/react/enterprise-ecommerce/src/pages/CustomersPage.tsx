import {
  Badge,
  Button,
  Card,
  DataTable,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { customers, formatCurrency } from '../data/mock';
import './pages.scss';

const segmentVariant = {
  New: 'info',
  Returning: 'brand',
  VIP: 'success',
} as const;

export function CustomersPage() {
  const columns = [
    { key: 'name', label: 'Customer' },
    { key: 'email', label: 'Email' },
    { key: 'orders', label: 'Orders' },
    { key: 'spend', label: 'Lifetime spend' },
    { key: 'segment', label: 'Segment' },
  ];

  const rows = customers.map((c) => ({
    name: c.name,
    email: c.email,
    orders: c.orders,
    spend: formatCurrency(c.spend),
    segment: c.segment,
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Customer segments, lifetime value, and order history snapshot.
        </p>
        <Button variant="secondary" size="sm" icon="download">
          Export
        </Button>
      </div>

      <section className="customer-cards stagger" aria-label="Customer cards">
        {customers.map((customer) => (
          <Card key={customer.id} elevated padded>
            <div className="customer-card">
              <div className="customer-card__head">
                <h2>{customer.name}</h2>
                <Tag
                  label={customer.segment}
                  variant={segmentVariant[customer.segment]}
                />
              </div>
              <p className="muted">{customer.email}</p>
              <dl className="kv">
                <div>
                  <dt>Orders</dt>
                  <dd className="mono">{customer.orders}</dd>
                </div>
                <div>
                  <dt>Spend</dt>
                  <dd className="mono">{formatCurrency(customer.spend)}</dd>
                </div>
              </dl>
              <Badge
                label={
                  customer.segment === 'VIP' ? 'Priority support' : 'Standard'
                }
                variant="neutral"
                soft
                size="sm"
              />
            </div>
          </Card>
        ))}
      </section>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Customer table</h2>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} striped sortable />
      </Card>
    </div>
  );
}
