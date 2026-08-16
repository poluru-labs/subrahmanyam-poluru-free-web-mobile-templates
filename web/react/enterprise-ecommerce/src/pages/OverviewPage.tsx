import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  ProgressBar,
  Stat,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { useCommerce } from '../context/CommerceContext';
import {
  formatCurrency,
  overviewStats,
  products,
} from '../data/mock';
import './pages.scss';

const statusTag = {
  pending: 'warning',
  paid: 'info',
  fulfilled: 'success',
  shipped: 'brand',
  cancelled: 'danger',
} as const;

export function OverviewPage() {
  const navigate = useNavigate();
  const { orders, openAlerts } = useCommerce();
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 30).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="page">
      <Alert
        variant={openAlerts.some((a) => a.severity === 'critical') ? 'warning' : 'info'}
        title={
          openAlerts.some((a) => a.severity === 'critical')
            ? 'Stock attention needed'
            : 'Storefront healthy'
        }
        message={
          outOfStock > 0
            ? `${outOfStock} SKU out of stock · ${lowStock} below reorder point.`
            : 'Orders and inventory are within expected ranges.'
        }
        dismissible
      />

      <section className="stat-grid stagger" aria-label="Key metrics">
        {overviewStats.map((stat) => (
          <Card key={stat.label} elevated padded>
            <Stat
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              trendValue={stat.trendValue}
              hint={stat.hint}
            />
          </Card>
        ))}
      </section>

      <div className="split-grid">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Recent orders</h2>
              <Button variant="tertiary" size="sm" onClick={() => navigate('/orders')}>
                View all
              </Button>
            </div>
          }
        >
          <ul className="feed-list stagger">
            {orders.slice(0, 4).map((order) => (
              <li key={order.id}>
                <div className="feed-list__top">
                  <div>
                    <strong className="mono">{order.id}</strong>
                    <span className="muted">
                      {order.customer} · {order.placedAt}
                    </span>
                  </div>
                  <Tag label={order.status} variant={statusTag[order.status]} />
                </div>
                <div className="feed-list__meta">
                  <span>{formatCurrency(order.total)}</span>
                  <Badge label={order.channel} variant="neutral" soft size="sm" />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Inventory pulse</h2>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => navigate('/inventory')}
              >
                Manage
              </Button>
            </div>
          }
        >
          <ul className="feed-list stagger">
            {products.slice(0, 4).map((product) => {
              const pct = Math.min(100, Math.round((product.stock / 420) * 100));
              return (
                <li key={product.id}>
                  <div className="feed-list__top">
                    <div>
                      <strong>{product.name}</strong>
                      <span className="muted mono">{product.sku}</span>
                    </div>
                    <Badge
                      label={
                        product.stock === 0
                          ? 'Out'
                          : product.stock < 30
                            ? 'Low'
                            : 'OK'
                      }
                      variant={
                        product.stock === 0
                          ? 'danger'
                          : product.stock < 30
                            ? 'warning'
                            : 'success'
                      }
                      soft
                    />
                  </div>
                  <ProgressBar label="Stock level" value={pct} showValue={false} />
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
