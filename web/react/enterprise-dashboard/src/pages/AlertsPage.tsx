import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import { alerts } from '../data/mock';
import './pages.scss';

export function AlertsPage() {
  const critical = alerts.filter((a) => a.severity === 'critical');

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Active incidents and facility notifications across the fleet.
        </p>
        <Button variant="primary" size="sm" icon="check">
          Acknowledge all
        </Button>
      </div>

      {critical.length > 0 ? (
        <Alert
          variant="danger"
          title={`${critical.length} critical alert${critical.length > 1 ? 's' : ''}`}
          message="Immediate attention required on cooling or power systems."
        />
      ) : null}

      <section className="alert-grid stagger">
        {alerts.map((item) => (
          <Card key={item.id} elevated padded>
            <div className="alert-card">
              <div className="alert-card__meta">
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
                <Badge label={item.time} variant="neutral" soft size="sm" />
              </div>
              <h2>{item.title}</h2>
              <p className="muted">{item.facility}</p>
              <div className="alert-card__actions">
                <Button variant="secondary" size="sm">
                  Investigate
                </Button>
                <Button variant="tertiary" size="sm" icon="check">
                  Ack
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {alerts.length === 0 ? (
        <EmptyState
          heading="No open alerts"
          description="All facilities are within expected thresholds."
        />
      ) : null}
    </div>
  );
}
