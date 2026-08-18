import { useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  SegmentedControl,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useAlerts } from '../context/AlertsContext';
import type { AlertItem } from '../data/mock';
import { downloadCsv } from '../utils/csv';
import './pages.scss';

type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';

export function AlertsPage() {
  const {
    openAlerts,
    criticalCount,
    acknowledge,
    acknowledgeAll,
    resetAcknowledgements,
  } = useAlerts();
  const { show } = useToast();
  const [filter, setFilter] = useState<SeverityFilter>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AlertItem | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openAlerts.filter((a) => {
      const matchesSeverity = filter === 'all' || a.severity === filter;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.facility.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q);
      return matchesSeverity && matchesQuery;
    });
  }, [openAlerts, filter, query]);

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

  const exportCsv = () => {
    downloadCsv('poluru-dc-alerts.csv', [
      ['Severity', 'Title', 'Facility', 'Time', 'Description', 'Recommended action'],
      ...filtered.map((a) => [
        a.severity,
        a.title,
        a.facility,
        a.time,
        a.description,
        a.recommendedAction,
      ]),
    ]);
    show({ title: 'Alerts CSV exported', variant: 'success' });
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
            variant="secondary"
            size="sm"
            icon="download"
            disabled={filtered.length === 0}
            onClick={exportCsv}
          >
            Export
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => {
              resetAcknowledgements();
              show({ title: 'Acknowledgements reset', variant: 'info' });
            }}
          >
            Reset acks
          </Button>
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

      <div className="filter-bar">
        <Input
          className="filter-bar__search"
          label="Search alerts"
          placeholder="Title, facility, or details…"
          icon="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
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
      </div>

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
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelected(item)}
                  >
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
              : 'Try another severity or clear the search.'
          }
        />
      )}

      <Modal
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading="Investigate alert"
        footer={
          <div className="modal-actions">
            <Button variant="tertiary" size="sm" onClick={() => setSelected(null)}>
              Close
            </Button>
            {selected ? (
              <Button
                variant="primary"
                size="sm"
                icon="check"
                onClick={() => {
                  handleAck(selected.id, selected.title);
                  setSelected(null);
                }}
              >
                Acknowledge
              </Button>
            ) : null}
          </div>
        }
      >
        {selected ? (
          <div className="detail-modal">
            <div className="alert-card__meta">
              <Tag
                label={selected.severity}
                variant={
                  selected.severity === 'critical'
                    ? 'danger'
                    : selected.severity === 'warning'
                      ? 'warning'
                      : 'info'
                }
              />
              <Badge label={selected.time} variant="neutral" soft size="sm" />
            </div>
            <h3>{selected.title}</h3>
            <p className="muted">{selected.facility}</p>
            <p>{selected.description}</p>
            <div className="detail-modal__callout">
              <strong>Recommended action</strong>
              <p>{selected.recommendedAction}</p>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
