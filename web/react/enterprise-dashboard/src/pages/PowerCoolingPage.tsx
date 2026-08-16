import {
  Badge,
  Card,
  CircularProgress,
  Meter,
  ProgressBar,
  Stat,
  Status,
  Tag,
} from '@poluru-labs/enterprise-design-system-react';
import {
  coolingLoops,
  powerCircuits,
  powerStats,
} from '../data/mock';
import './pages.scss';

const coolingStatusVariant = {
  nominal: 'success',
  elevated: 'warning',
  fault: 'danger',
} as const;

export function PowerCoolingPage() {
  return (
    <div className="page">
      <p className="page-lead">
        Live electrical load, UPS autonomy, and chilled-water loop health across
        the fleet.
      </p>

      <section className="stat-grid stagger" aria-label="Power metrics">
        {powerStats.map((stat) => (
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
              <h2>Circuit load</h2>
              <Badge label="Telemetry" variant="brand" soft pill />
            </div>
          }
        >
          <ul className="power-circuit-list stagger">
            {powerCircuits.map((circuit) => {
              const pct = Math.round(
                (circuit.loadKw / circuit.capacityKw) * 100,
              );
              return (
                <li key={circuit.id} className="power-circuit">
                  <div className="power-circuit__main">
                    <div>
                      <strong>{circuit.facility}</strong>
                      <span className="muted">{circuit.circuit}</span>
                    </div>
                    <CircularProgress
                      value={pct}
                      showValue
                      size={56}
                      strokeWidth={5}
                    />
                  </div>
                  <ProgressBar
                    label="Load"
                    value={pct}
                    showValue
                  />
                  <div className="power-circuit__meta">
                    <span className="mono">
                      {circuit.loadKw} / {circuit.capacityKw} kW
                    </span>
                    <Tag
                      label={`UPS ${circuit.upsBackupMin} min`}
                      variant={
                        circuit.upsBackupMin < 10
                          ? 'danger'
                          : circuit.upsBackupMin < 12
                            ? 'warning'
                            : 'success'
                      }
                    />
                  </div>
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
              <h2>Cooling loops</h2>
              <Badge label="CHW" variant="info" soft pill />
            </div>
          }
        >
          <ul className="cooling-list stagger">
            {coolingLoops.map((loop) => (
              <li key={loop.id}>
                <div className="facility-list__top">
                  <div>
                    <strong>
                      {loop.facility} · {loop.loop}
                    </strong>
                    <span className="muted">
                      {loop.tempC.toFixed(1)}°C · {loop.pressurePsi} psi
                    </span>
                  </div>
                  <Status
                    label={loop.status}
                    variant={coolingStatusVariant[loop.status]}
                    pulse={loop.status === 'fault'}
                  />
                </div>
                <Meter
                  label="Loop capacity"
                  value={loop.capacity}
                  high={85}
                  low={40}
                  optimum={60}
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
