import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  SegmentedControl,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useAlerts } from '../context/AlertsContext';
import './pages.scss';

type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';

export function AlertsPage() {
  const { openAlerts, criticalCount, acknowledge, acknowledgeAll } = useAlerts();
  const { show } = useToast();
  const [filter, setFilter] = useState<SeverityFilter>('all');

  const filtered =
    filter === 'all'
      ? openAlerts
      : openAlerts.filter((a) => a.severity === filter);

  const handleAck = (id: string, title: string) => {
    acknowledge(id);
    show({ title: 'Alert acknowledged', description: title, variant: 'success' });
  };

  const handleAckAll = () => {
    acknowledgeAll();
    show({
      title: 'All alerts acknowledged',
      variant: 'success',
    });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Active incidents and facility notifications across the fleet.
        </p>
        <div className="page-toolbar__actions">
          <Badge
            label={`${openAlerts.length} open`}
            variant={criticalCount > 0 ? 'danger' : 'brand'}
            soft
          />
          <Button
            variant="primary"
            size="sm"
            icon="check"
            disabled={openAlerts.length === 0}
            onClick={handleAckAll}
          >
            Acknowledge all
          </Button>
        </div>
      </div>

      <SegmentedControl
        className="alert-filter"
        value={filter}
        onChange={(value) => setFilter(value as SeverityFilter)}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Critical', value: 'critical' },
          { label: 'Warning', value: 'warning' },
          { label: 'Info', value: 'info' },
        ]}
      />

      {criticalCount > 0 && filter !== 'info' ? (
        <Alert
          variant="danger"
          title={`${criticalCount} critical alert${criticalCount > 1 ? 's' : ''}`}
          message="Immediate attention required on cooling or power systems."
        />
      ) : null}

      {filtered.length > 0 ? (
        <section className="alert-grid stagger">
          {filtered.map((item) => (
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
                  <Button
                    variant="tertiary"
                    size="sm"
                    icon="check"
                    onClick={() => handleAck(item.id, item.title)}
                  >
                    Ack
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState
          heading={
            openAlerts.length === 0
              ? 'No open alerts'
              : 'No alerts in this filter'
          }
          description={
            openAlerts.length === 0
              ? 'All facilities are within expected thresholds.'
              : 'Try another severity or clear the filter.'
          }
        />
      )}
    </div>
  );
}
