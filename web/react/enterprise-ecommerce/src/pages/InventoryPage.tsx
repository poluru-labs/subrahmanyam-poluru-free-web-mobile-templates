import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Meter,
  ProgressBar,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useCommerce } from '../context/CommerceContext';
import { products } from '../data/mock';
import './pages.scss';

export function InventoryPage() {
  const { openAlerts, dismissAlert, dismissAllAlerts } = useCommerce();
  const { show } = useToast();
  const critical = openAlerts.filter((a) => a.severity === 'critical');

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Warehouse stock levels, reorder points, and fulfillment readiness.
        </p>
        <div className="page-toolbar__actions">
          <Badge
            label={`${openAlerts.length} alerts`}
            variant={critical.length > 0 ? 'danger' : 'brand'}
            soft
          />
          <Button
            variant="primary"
            size="sm"
            icon="check"
            disabled={openAlerts.length === 0}
            onClick={() => {
              dismissAllAlerts();
              show({ title: 'All alerts dismissed', variant: 'success' });
            }}
          >
            Dismiss all
          </Button>
        </div>
      </div>

      {critical.length > 0 ? (
        <Alert
          variant="danger"
          title={`${critical.length} critical stock issue${critical.length > 1 ? 's' : ''}`}
          message="Out-of-stock SKUs may block checkout until replenished."
        />
      ) : null}

      <div className="split-grid">
        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Stock by SKU</h2>
            </div>
          }
        >
          <ul className="feed-list stagger">
            {products.map((product) => {
              const capacity = 500;
              const pct = Math.min(100, Math.round((product.stock / capacity) * 100));
              return (
                <li key={product.id}>
                  <div className="feed-list__top">
                    <div>
                      <strong>{product.name}</strong>
                      <span className="muted mono">{product.sku}</span>
                    </div>
                    <span className="mono">{product.stock} units</span>
                  </div>
                  <ProgressBar label="On hand" value={pct} showValue />
                  <Meter
                    label="Reorder headroom"
                    value={pct}
                    high={70}
                    low={20}
                    optimum={55}
                    showValue
                  />
                </li>
              );
            })}
          </ul>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Open alerts</h2>
            </div>
          }
        >
          {openAlerts.length > 0 ? (
            <ul className="alert-feed stagger">
              {openAlerts.map((item) => (
                <li key={item.id}>
                  <Tag
                    label={item.severity}
                    variant={
                      item.severity === 'critical'
                        ? 'danger'
                        : item.severity === 'warning'
                          ? 'warning'
                          : 'info'
                    }
                  />
                  <div className="alert-feed__body">
                    <strong>{item.title}</strong>
                    <span className="muted">
                      {item.sku} · {item.time}
                    </span>
                    <Button
                      variant="tertiary"
                      size="sm"
                      icon="check"
                      onClick={() => {
                        dismissAlert(item.id);
                        show({
                          title: 'Alert dismissed',
                          variant: 'success',
                        });
                      }}
                    >
                      Dismiss
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              heading="No open alerts"
              description="Inventory thresholds are healthy."
            />
          )}
        </Card>
      </div>
    </div>
  );
}
