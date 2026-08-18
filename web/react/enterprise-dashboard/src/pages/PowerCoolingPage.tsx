import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CircularProgress,
  Meter,
  ProgressBar,
  SegmentedControl,
  Stat,
  Status,
  Tag,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import {
  coolingLoops as seedLoops,
  powerCircuits as seedCircuits,
  powerStats,
  type CoolingLoop,
  type PowerCircuit,
} from '../data/mock';
import { downloadCsv } from '../utils/csv';
import './pages.scss';

const coolingStatusVariant = {
  nominal: 'success',
  elevated: 'warning',
  fault: 'danger',
} as const;

const facilityOptions = [
  { label: 'All sites', value: 'all' },
  { label: 'Chicago', value: 'Chicago' },
  { label: 'Ashburn', value: 'Ashburn' },
  { label: 'Dallas', value: 'Dallas' },
  { label: 'San Jose', value: 'San Jose' },
] as const;

function jitter(value: number, amount: number) {
  const delta = (Math.random() * 2 - 1) * amount;
  return Math.max(0, Math.round(value + delta));
}

export function PowerCoolingPage() {
  const { show } = useToast();
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [circuits, setCircuits] = useState<PowerCircuit[]>(seedCircuits);
  const [loops, setLoops] = useState<CoolingLoop[]>(seedLoops);
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date());
  const [refreshing, setRefreshing] = useState(false);

  const filteredCircuits = useMemo(
    () =>
      circuits.filter(
        (c) => facilityFilter === 'all' || c.facility.includes(facilityFilter),
      ),
    [circuits, facilityFilter],
  );

  const filteredLoops = useMemo(
    () =>
      loops.filter(
        (l) => facilityFilter === 'all' || l.facility.includes(facilityFilter),
      ),
    [loops, facilityFilter],
  );

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setCircuits((prev) =>
        prev.map((c) => ({
          ...c,
          loadKw: Math.min(c.capacityKw, jitter(c.loadKw, 35)),
          upsBackupMin: Math.max(5, jitter(c.upsBackupMin, 1)),
        })),
      );
      setLoops((prev) =>
        prev.map((l) => ({
          ...l,
          tempC: Math.round((l.tempC + (Math.random() * 0.6 - 0.3)) * 10) / 10,
          capacity: Math.min(100, Math.max(20, jitter(l.capacity, 2))),
        })),
      );
      setLastRefreshed(new Date());
      setRefreshing(false);
      show({ title: 'Power & cooling telemetry refreshed', variant: 'success' });
    }, 700);
  };

  const exportCsv = () => {
    downloadCsv('poluru-dc-power-cooling.csv', [
      ['Type', 'Facility', 'Asset', 'Metric', 'Value'],
      ...filteredCircuits.map((c) => [
        'Circuit',
        c.facility,
        c.circuit,
        'Load kW',
        `${c.loadKw}/${c.capacityKw}`,
      ]),
      ...filteredLoops.map((l) => [
        'Cooling',
        l.facility,
        l.loop,
        'Capacity %',
        String(l.capacity),
      ]),
    ]);
    show({ title: 'Telemetry CSV exported', variant: 'success' });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Live electrical load, UPS autonomy, and chilled-water loop health across
          the fleet.
        </p>
        <div className="page-toolbar__actions">
          <span className="muted refresh-stamp">
            Updated {lastRefreshed.toLocaleTimeString()}
          </span>
          <Button variant="secondary" size="sm" icon="download" onClick={exportCsv}>
            Export
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            disabled={refreshing}
            onClick={handleRefresh}
          >
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </Button>
        </div>
      </div>

      <SegmentedControl
        className="filter-bar__segments"
        value={facilityFilter}
        onChange={setFacilityFilter}
        options={[...facilityOptions]}
      />

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
              <Badge
                label={`${filteredCircuits.length} circuits`}
                variant="brand"
                soft
                pill
              />
            </div>
          }
        >
          <ul className="power-circuit-list stagger">
            {filteredCircuits.map((circuit) => {
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
                  <ProgressBar label="Load" value={pct} showValue />
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
            {filteredLoops.map((loop) => (
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
