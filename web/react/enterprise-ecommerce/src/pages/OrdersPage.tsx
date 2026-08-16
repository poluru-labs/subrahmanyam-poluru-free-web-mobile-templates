import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  SegmentedControl,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useCommerce } from '../context/CommerceContext';
import { formatCurrency, type OrderStatus } from '../data/mock';
import './pages.scss';

type StatusFilter = 'all' | OrderStatus;

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

export function OrdersPage() {
  const { orders, updateOrderStatus } = useCommerce();
  const { show } = useToast();
  const [filter, setFilter] = useState<StatusFilter>('all');

  const filtered =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  const advance = (id: string, status: OrderStatus) => {
    const next = nextStatus[status];
    if (!next) return;
    updateOrderStatus(id, next);
    show({
      title: `Order ${next}`,
      description: id,
      variant: 'success',
    });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Fulfillment queue across web, mobile, and marketplace channels.
        </p>
        <Badge label={`${filtered.length} orders`} variant="brand" soft />
      </div>

      <SegmentedControl
        className="filter-bar"
        value={filter}
        onChange={(value) => setFilter(value as StatusFilter)}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Pending', value: 'pending' },
          { label: 'Paid', value: 'paid' },
          { label: 'Fulfilled', value: 'fulfilled' },
          { label: 'Shipped', value: 'shipped' },
        ]}
      />

      {filtered.length > 0 ? (
        <section className="order-grid stagger">
          {filtered.map((order) => (
            <Card key={order.id} elevated padded>
              <div className="order-card">
                <div className="order-card__meta">
                  <Tag label={order.status} variant={statusTag[order.status]} />
                  <Badge label={order.placedAt} variant="neutral" soft size="sm" />
                </div>
                <h2 className="mono">{order.id}</h2>
                <p className="muted">
                  {order.customer} · {order.items} item
                  {order.items === 1 ? '' : 's'} · {order.channel}
                </p>
                <strong className="order-card__total">
                  {formatCurrency(order.total)}
                </strong>
                <div className="order-card__actions">
                  {nextStatus[order.status] ? (
                    <Button
                      variant="primary"
                      size="sm"
                      icon="check"
                      onClick={() => advance(order.id, order.status)}
                    >
                      Mark {nextStatus[order.status]}
                    </Button>
                  ) : (
                    <Button variant="tertiary" size="sm" disabled>
                      No action
                    </Button>
                  )}
                  <Button variant="secondary" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState
          heading="No orders in this filter"
          description="Try another status or clear the filter."
        />
      )}
    </div>
  );
}
