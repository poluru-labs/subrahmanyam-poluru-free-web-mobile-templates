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
} from '@poluru-labs/enterprise-design-system-react';
import { alerts, facilities, overviewStats } from '../data/mock';
import './pages.scss';

const statusVariant = {
  operational: 'success',
  degraded: 'warning',
  maintenance: 'info',
} as const;

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <Alert
        variant="info"
        title="Fleet healthy"
        message="11 of 12 facilities reporting normal telemetry. Dallas DFW-1 has elevated cooling load."
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
              <h2>Facility capacity</h2>
              <Badge label="Live" variant="brand" soft pill />
            </div>
          }
        >
          <ul className="facility-list stagger">
            {facilities.map((facility) => (
              <li key={facility.id}>
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
              </li>
            ))}
          </ul>
        </Card>

        <Card
          elevated
          padded
          header={
            <div className="card-heading">
              <h2>Recent alerts</h2>
              <Button variant="tertiary" size="sm" onClick={() => navigate('/alerts')}>
                View all
              </Button>
            </div>
          }
        >
          <ul className="alert-feed stagger">
            {alerts.map((item) => (
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
          </ul>
        </Card>
      </div>
    </div>
  );
}
