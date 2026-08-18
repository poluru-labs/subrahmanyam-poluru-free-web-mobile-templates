import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  EmptyState,
  Input,
  Modal,
  SegmentedControl,
  Status,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { facilities, type Facility } from '../data/mock';
import { downloadCsv } from '../utils/csv';
import './pages.scss';

const statusVariant = {
  operational: 'success',
  degraded: 'warning',
  maintenance: 'info',
} as const;

type StatusFilter = 'all' | Facility['status'];

export function FacilitiesPage() {
  const { show } = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selected, setSelected] = useState<Facility | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter((facility) => {
      const matchesStatus =
        statusFilter === 'all' || facility.status === statusFilter;
      const matchesQuery =
        !q ||
        facility.name.toLowerCase().includes(q) ||
        facility.region.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, statusFilter]);

  const columns = [
    { key: 'name', label: 'Facility' },
    { key: 'region', label: 'Region' },
    { key: 'status', label: 'Status' },
    { key: 'racks', label: 'Racks' },
    { key: 'utilization', label: 'Utilization' },
    { key: 'powerKw', label: 'Power (kW)' },
    { key: 'pue', label: 'PUE' },
  ];

  const rows = filtered.map((f) => ({
    name: f.name,
    region: f.region,
    status: f.status,
    racks: f.racks,
    utilization: `${f.utilization}%`,
    powerKw: f.powerKw,
    pue: f.pue.toFixed(2),
  }));

  const exportCsv = () => {
    downloadCsv('poluru-dc-facilities.csv', [
      ['Facility', 'Region', 'Status', 'Racks', 'Utilization %', 'Power kW', 'PUE'],
      ...filtered.map((f) => [
        f.name,
        f.region,
        f.status,
        String(f.racks),
        String(f.utilization),
        String(f.powerKw),
        f.pue.toFixed(2),
      ]),
    ]);
    show({ title: 'Facilities CSV exported', variant: 'success' });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Campus inventory across regions — capacity, power, and operational state.
        </p>
        <div className="page-toolbar__actions">
          <Button variant="secondary" size="sm" icon="download" onClick={exportCsv}>
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="plus"
            onClick={() =>
              show({
                title: 'Demo only',
                description: 'Add facility is a template action.',
                variant: 'info',
              })
            }
          >
            Add facility
          </Button>
        </div>
      </div>

      <div className="filter-bar">
        <Input
          className="filter-bar__search"
          label="Search facilities"
          placeholder="Name or region…"
          icon="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <SegmentedControl
          className="filter-bar__segments"
          value={statusFilter}
          onChange={(value) => setStatusFilter(value as StatusFilter)}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Operational', value: 'operational' },
            { label: 'Degraded', value: 'degraded' },
            { label: 'Maintenance', value: 'maintenance' },
          ]}
        />
      </div>

      {filtered.length > 0 ? (
        <section className="facility-cards stagger" aria-label="Facility cards">
          {filtered.map((facility) => (
            <Card key={facility.id} elevated padded>
              <button
                type="button"
                className="facility-card facility-card--button"
                onClick={() => setSelected(facility)}
              >
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
              </button>
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState
          heading="No facilities match"
          description="Try another status filter or clear the search."
        />
      )}

      <Card
        elevated
        padded
        header={
          <div className="card-heading">
            <h2>Facility table</h2>
            <Badge label={`${filtered.length} shown`} variant="brand" soft />
          </div>
        }
      >
        {filtered.length > 0 ? (
          <DataTable columns={columns} rows={rows} striped sortable />
        ) : (
          <p className="muted">No rows to display.</p>
        )}
      </Card>

      <Modal
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        heading={selected?.name ?? 'Facility'}
        footer={
          <Button variant="primary" size="sm" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected ? (
          <div className="detail-modal">
            <Status
              label={selected.status}
              variant={statusVariant[selected.status]}
            />
            <p className="muted">{selected.region}</p>
            <dl className="kv">
              <div>
                <dt>Racks</dt>
                <dd className="mono">{selected.racks}</dd>
              </div>
              <div>
                <dt>Utilization</dt>
                <dd className="mono">{selected.utilization}%</dd>
              </div>
              <div>
                <dt>Power</dt>
                <dd className="mono">{selected.powerKw} kW</dd>
              </div>
              <div>
                <dt>PUE</dt>
                <dd className="mono">{selected.pue.toFixed(2)}</dd>
              </div>
            </dl>
            <p>
              Headroom estimate:{' '}
              <strong className="mono">
                {Math.max(0, 100 - Math.round(selected.utilization * 0.85))}%
              </strong>
            </p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
