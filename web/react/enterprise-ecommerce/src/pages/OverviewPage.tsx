import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  CircularProgress,
  Meter,
  ProgressBar,
  SegmentedControl,
  Stat,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useCommerce } from '../context/CommerceContext';
import {
  categorySales,
  channelMix,
  channelMixSummary,
  customers,
  dailyGoals,
  formatCurrency,
  overviewStatsByPeriod,
  products,
  type OrderStatus,
} from '../data/mock';
import './pages.scss';

const statusTag = {
  pending: 'warning',
  paid: 'info',
  fulfilled: 'success',
  shipped: 'brand',
  cancelled: 'danger',
} as const;

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'paid',
  paid: 'fulfilled',
  fulfilled: 'shipped',
};

type Period = 'today' | '7d' | '30d';

export function OverviewPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { orders, openAlerts, updateOrderStatus } = useCommerce();
  const [period, setPeriod] = useState<Period>('7d');
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date());
  const [refreshing, setRefreshing] = useState(false);

  const stats = overviewStatsByPeriod[period];
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 30).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const actionable = orders.filter(
    (o) => o.status === 'pending' || o.status === 'paid' || o.status === 'fulfilled',
  );
  const topCustomers = [...customers]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 3);
  const hasCritical = openAlerts.some((a) => a.severity === 'critical');

  const refresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setLastRefreshed(new Date());
      setRefreshing(false);
      show({ title: 'Overview refreshed', variant: 'success' });
    }, 550);
  };

  const advanceOrder = (id: string, status: OrderStatus) => {
    const next = nextStatus[status];
    if (!next) return;
    updateOrderStatus(id, next);
    show({
      title: `Order marked ${next}`,
      description: id,
      variant: 'success',
    });
  };

  return (
    <div className="page">
      <div className="page-toolbar overview-toolbar">
        <SegmentedControl
          value={period}
          onChange={(value) => setPeriod(value as Period)}
          options={[
            { label: 'Today', value: 'today' },
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
          ]}
        />
        <div className="page-toolbar__actions">
          <span className="muted refresh-stamp">
            Updated {lastRefreshed.toLocaleTimeString()}
          </span>
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            disabled={refreshing}
            onClick={refresh}
          >
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon="download"
            onClick={() =>
              show({
                title: 'Report queued',
                description: `Exporting ${period} overview CSV`,
                variant: 'info',
              })
            }
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="plus"
            onClick={() => navigate('/orders')}
          >
            New order
          </Button>
        </div>
      </div>

      <Alert
        variant={hasCritical ? 'warning' : 'info'}
        title={hasCritical ? 'Stock attention needed' : 'Storefront healthy'}
        message={
          outOfStock > 0
            ? `${outOfStock} SKU out of stock · ${lowStock} below reorder point · ${actionable.length} orders need action.`
            : `Orders and inventory look good · ${actionable.length} orders in the fulfillment queue.`
        }
        dismissible
      />

      <section className="stat-grid stagger" aria-label="Key metrics">
        {stats.map((stat) => (
          <Card key={`${period}-${stat.label}`} elevated padded>
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

      <section className="goals-grid stagger" aria-label="Daily goals">
        {dailyGoals.map((goal) => (
          <Card key={goal.label} elevated padded>
            <div className="goal-card">
              <CircularProgress value={goal.value} showValue size={64} strokeWidth={6} />
              <div>
                <strong>{goal.label}</strong>
                <span className="muted">Target {goal.target}</span>
                <Badge
                  label={goal.value >= 90 ? 'On track' : goal.value >= 70 ? 'Watch' : 'Behind'}
                  variant={
                    goal.value >= 90 ? 'success' : goal.value >= 70 ? 'warning' : 'danger'
                  }
                  soft
                  size="sm"
                />
              </div>
            </div>
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

      <div className="split-grid overview-secondary">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Fulfill now</h2>
              <Badge
                label={`${actionable.length} open`}
                variant={actionable.length > 0 ? 'warning' : 'success'}
                soft
              />
            </div>
          }
        >
          {actionable.length > 0 ? (
            <ul className="feed-list stagger">
              {actionable.slice(0, 3).map((order) => (
                <li key={order.id}>
                  <div className="feed-list__top">
                    <div>
                      <strong className="mono">{order.id}</strong>
                      <span className="muted">
                        {order.customer} · {formatCurrency(order.total)}
                      </span>
                    </div>
                    <Tag label={order.status} variant={statusTag[order.status]} />
                  </div>
                  <div className="feed-list__actions">
                    <Button
                      variant="primary"
                      size="sm"
                      icon="check"
                      onClick={() => advanceOrder(order.id, order.status)}
                    >
                      Mark {nextStatus[order.status]}
                    </Button>
                    <Button
                      variant="tertiary"
                      size="sm"
                      onClick={() => navigate('/orders')}
                    >
                      Open
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted empty-note">Queue is clear — nice work.</p>
          )}
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Top customers</h2>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => navigate('/customers')}
              >
                View all
              </Button>
            </div>
          }
        >
          <ul className="feed-list stagger">
            {topCustomers.map((customer, index) => (
              <li key={customer.id}>
                <div className="feed-list__top">
                  <div>
                    <strong>
                      #{index + 1} {customer.name}
                    </strong>
                    <span className="muted">{customer.email}</span>
                  </div>
                  <Tag
                    label={customer.segment}
                    variant={
                      customer.segment === 'VIP'
                        ? 'success'
                        : customer.segment === 'Returning'
                          ? 'brand'
                          : 'info'
                    }
                  />
                </div>
                <div className="feed-list__meta">
                  <span>{formatCurrency(customer.spend)} lifetime</span>
                  <span>{customer.orders} orders</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="split-grid overview-secondary">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Channel mix</h2>
              <Badge label={period} variant="neutral" soft size="sm" />
            </div>
          }
        >
          <div className="channel-summary stagger">
            <div>
              <span className="muted">Revenue</span>
              <strong className="mono">
                {formatCurrency(channelMixSummary.totalRevenue)}
              </strong>
            </div>
            <div>
              <span className="muted">Orders</span>
              <strong className="mono">{channelMixSummary.totalOrders}</strong>
            </div>
            <div>
              <span className="muted">Blended AOV</span>
              <strong className="mono">
                {formatCurrency(channelMixSummary.blendedAov)}
              </strong>
            </div>
            <div>
              <span className="muted">Leader</span>
              <strong>{channelMixSummary.topChannel}</strong>
            </div>
          </div>

          <ul className="feed-list channel-list stagger">
            {channelMix.map((row) => (
              <li key={row.channel}>
                <div className="feed-list__top">
                  <div>
                    <strong>{row.channel}</strong>
                    <span className="muted">
                      {row.topRegion} · {row.sessions.toLocaleString()} sessions
                    </span>
                  </div>
                  <div className="channel-list__badges">
                    <Badge
                      label={row.trendValue}
                      variant={
                        row.trend === 'up'
                          ? 'success'
                          : row.trend === 'down'
                            ? 'danger'
                            : 'neutral'
                      }
                      soft
                      size="sm"
                    />
                    <Badge
                      label={`${row.share}%`}
                      variant="brand"
                      soft
                      size="sm"
                    />
                  </div>
                </div>
                <ProgressBar label="Revenue share" value={row.share} showValue />
                <dl className="channel-kv">
                  <div>
                    <dt>Revenue</dt>
                    <dd className="mono">{formatCurrency(row.revenue)}</dd>
                  </div>
                  <div>
                    <dt>Orders</dt>
                    <dd className="mono">{row.orders}</dd>
                  </div>
                  <div>
                    <dt>AOV</dt>
                    <dd className="mono">{formatCurrency(row.aov)}</dd>
                  </div>
                  <div>
                    <dt>Conv.</dt>
                    <dd className="mono">{row.conversion}%</dd>
                  </div>
                  <div>
                    <dt>Refunds</dt>
                    <dd className="mono">{row.refundRate}%</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Sales by category</h2>
              <Button
                variant="tertiary"
                size="sm"
                onClick={() => navigate('/products')}
              >
                Catalog
              </Button>
            </div>
          }
        >
          <ul className="feed-list stagger">
            {categorySales.map((row) => (
              <li key={row.category}>
                <div className="feed-list__top">
                  <div>
                    <strong>{row.category}</strong>
                    <span className="muted">{row.units} units sold</span>
                  </div>
                  <Badge label={`${row.share}%`} variant="brand" soft size="sm" />
                </div>
                <Meter
                  label="Category share"
                  value={row.share}
                  high={40}
                  low={15}
                  optimum={30}
                  showValue
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
