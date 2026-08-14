import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  Tab,
  Tabs,
} from '@poluru-labs/enterprise-design-system-react';
import { servers } from '../data/mock';
import './pages.scss';

const tabFilters = ['compute', 'storage', 'network', 'all'] as const;

export function InfrastructurePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeFilter = tabFilters[selectedIndex] ?? 'all';

  const columns = [
    { key: 'hostname', label: 'Hostname' },
    { key: 'facility', label: 'Facility' },
    { key: 'role', label: 'Role' },
    { key: 'cpu', label: 'CPU %' },
    { key: 'memory', label: 'Memory %' },
    { key: 'status', label: 'Status' },
  ];

  const filterServers = (filter: (typeof tabFilters)[number]) => {
    if (filter === 'all') return servers;
    if (filter === 'compute') {
      return servers.filter((s) => s.role === 'Compute' || s.role === 'GPU');
    }
    if (filter === 'storage') {
      return servers.filter((s) => s.role === 'Storage');
    }
    return servers.filter((s) => s.role === 'Network' || s.role === 'Edge');
  };

  const toRows = (filter: (typeof tabFilters)[number]) =>
    filterServers(filter).map((s) => ({
      hostname: s.hostname,
      facility: s.facility,
      role: s.role,
      cpu: s.cpu,
      memory: s.memory,
      status: s.status,
    }));

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Hosts, racks, and network nodes across the data center fleet.
        </p>
        <div className="page-toolbar__actions">
          <Badge label={`${filterServers(activeFilter).length} hosts`} variant="brand" soft />
          <Button variant="secondary" size="sm" icon="refresh">
            Refresh
          </Button>
        </div>
      </div>

      <Card elevated padded>
        <Tabs selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab label="Compute & GPU">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows('compute')} striped compact sortable />
            </div>
          </Tab>
          <Tab label="Storage">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows('storage')} striped compact sortable />
            </div>
          </Tab>
          <Tab label="Network & Edge">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows('network')} striped compact sortable />
            </div>
          </Tab>
          <Tab label="All hosts">
            <div className="table-wrap">
              <DataTable columns={columns} rows={toRows('all')} striped compact sortable />
            </div>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
}
