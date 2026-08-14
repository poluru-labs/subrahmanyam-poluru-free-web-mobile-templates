import {
  Badge,
  Button,
  Card,
  DataTable,
  Status,
} from '@poluru-labs/enterprise-design-system-react';
import { facilities } from '../data/mock';
import './pages.scss';

const statusVariant = {
  operational: 'success',
  degraded: 'warning',
  maintenance: 'info',
} as const;

export function FacilitiesPage() {
  const columns = [
    { key: 'name', label: 'Facility' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'racks', label: 'Racks' },
    { key: 'utilization', label: 'Utilization' },
    { key: 'powerKw', label: 'Power (kW)' },
    { key: 'pue', label: 'PUE' },
  ];

  const rows = facilities.map((f) => ({
    name: f.name,
    region: f.region,
    status: f.status,
    racks: f.racks,
    utilization: `${f.utilization}%`,
    powerKw: f.powerKw,
    pue: f.pue.toFixed(2),
  }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Campus inventory across regions — capacity, power, and operational state.
        </p>
        <Button variant="primary" size="sm" icon="plus">
          Add facility
        </Button>
      </div>

      <section className="facility-cards stagger" aria-label="Facility cards">
        {facilities.map((facility) => (
          <Card key={facility.id} elevated padded>
            <div className="facility-card">
              <div className="facility-card__head">
                <h2>{facility.name}</h2>
                <Status
                  label={facility.status}
                  variant={statusVariant[facility.status]}
                />
              </div>
              <Badge label={facility.region} variant="neutral" soft />
              <dl className="kv">
                <div>
                  <dt>Racks</dt>
                  <dd className="mono">{facility.racks}</dd>
                </div>
                <div>
                  <dt>Utilization</dt>
                  <dd className="mono">{facility.utilization}%</dd>
                </div>
                <div>
                  <dt>Power</dt>
                  <dd className="mono">{facility.powerKw} kW</dd>
                </div>
                <div>
                  <dt>PUE</dt>
                  <dd className="mono">{facility.pue.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </Card>
        ))}
      </section>

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Facility table</h2>
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} striped sortable />
      </Card>
    </div>
  );
}
