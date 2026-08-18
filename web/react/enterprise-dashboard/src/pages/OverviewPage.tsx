import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  Meter,
  ProgressBar,
  Stat,
  Status,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { useAlerts } from '../context/AlertsContext';
import { facilities, maintenanceWindows, overviewStats } from '../data/mock';
import { downloadCsv } from '../utils/csv';
import './pages.scss';

const statusVariant = {
  operational: 'success',
  degraded: 'warning',
  maintenance: 'info',
} as const;

const impactVariant = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
} as const;

function formatWindow(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function OverviewPage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { openAlerts, criticalCount } = useAlerts();

  const stats = overviewStats.map((stat) =>
    stat.label === 'Open alerts'
      ? {
          ...stat,
          value: String(openAlerts.length),
          hint:
            criticalCount > 0
              ? `${criticalCount} critical`
              : 'None critical',
        }
      : stat,
  );

  const exportFleetSummary = () => {
    downloadCsv('poluru-dc-fleet-summary.csv', [
      ['Metric', 'Value', 'Hint'],
      ...stats.map((s) => [s.label, s.value, s.hint]),
      [],
      ['Facility', 'Region', 'Status', 'Utilization %', 'Power kW', 'PUE'],
      ...facilities.map((f) => [
        f.name,
        f.region,
        f.status,
        String(f.utilization),
        String(f.powerKw),
        f.pue.toFixed(2),
      ]),
      [],
      ['Alert', 'Severity', 'Facility', 'Time'],
      ...openAlerts.map((a) => [a.title, a.severity, a.facility, a.time]),
    ]);
    show({ title: 'Fleet summary exported', variant: 'success' });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Fleet health across facilities, power, and open incidents.
        </p>
        <div className="page-toolbar__actions">
          <Button variant="secondary" size="sm" icon="download" onClick={exportFleetSummary}>
            Export summary
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="bell"
            onClick={() => navigate('/alerts')}
          >
            Open alerts
          </Button>
        </div>
      </div>

      <Alert
        variant={criticalCount > 0 ? 'warning' : 'info'}
        title={criticalCount > 0 ? 'Attention needed' : 'Fleet healthy'}
        message={
          criticalCount > 0
            ? `${criticalCount} critical alert${criticalCount > 1 ? 's' : ''} open. Dallas DFW-1 has elevated cooling load.`
            : '11 of 12 facilities reporting normal telemetry.'
        }
        dismissible
      />

      <section className="stat-grid stagger" aria-label="Key metrics">
        {stats.map((stat) => (
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
              <h2>Facility capacity</h2>
              <Badge label="Live" variant="brand" soft pill />
            </div>
          }
        >
          <ul className="facility-list stagger">
            {facilities.map((facility) => (
              <li key={facility.id}>
                <button
                  type="button"
                  className="facility-list__button"
                  onClick={() => navigate('/facilities')}
                >
                  <div className="facility-list__top">
                    <div>
                      <strong>{facility.name}</strong>
                      <span className="muted">{facility.region}</span>
                    </div>
                    <Status
                      label={facility.status}
                      variant={statusVariant[facility.status]}
                      pulse={facility.status === 'degraded'}
                    />
                  </div>
                  <ProgressBar
                    label="Rack utilization"
                    value={facility.utilization}
                    showValue
                  />
                  <Meter
                    label="Power headroom"
                    value={100 - Math.round(facility.utilization * 0.85)}
                    high={70}
                    low={30}
                    optimum={80}
                    showValue
                  />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="stack-col">
          <Card
            elevated
            padded
            header={
              <div className="card-heading">
                <h2>Recent alerts</h2>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => navigate('/alerts')}
                >
                  View all
                </Button>
              </div>
            }
          >
            <ul className="alert-feed stagger">
              {openAlerts.slice(0, 4).map((item) => (
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
                  <div>
                    <strong>{item.title}</strong>
                    <span className="muted">
                      {item.facility} · {item.time}
                    </span>
                  </div>
                </li>
              ))}
              {openAlerts.length === 0 ? (
                <li className="alert-feed__empty muted">
                  No open alerts right now.
                </li>
              ) : null}
            </ul>
          </Card>

          <Card
            elevated
            padded
            header={
              <div className="card-heading">
                <h2>Upcoming maintenance</h2>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={() => navigate('/power')}
                >
                  Power view
                </Button>
              </div>
            }
          >
            <ul className="maintenance-feed stagger">
              {maintenanceWindows.slice(0, 3).map((window) => (
                <li key={window.id}>
                  <div className="maintenance-feed__top">
                    <strong>{window.title}</strong>
                    <Tag
                      label={window.impact}
                      variant={impactVariant[window.impact]}
                    />
                  </div>
                  <span className="muted">
                    {window.facility} · {formatWindow(window.startsAt)} –{' '}
                    {formatWindow(window.endsAt)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
