import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  DataTable,
  Input,
  Tab,
  Tabs,
  useToast,
} from '@poluru-labs/enterprise-design-system-react';
import { servers } from '../data/mock';
import { downloadCsv } from '../utils/csv';
import './pages.scss';

const tabFilters = ['compute', 'storage', 'network', 'all'] as const;

export function InfrastructurePage() {
  const { show } = useToast();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(() => new Date());
  const [query, setQuery] = useState('');
  const activeFilter = tabFilters[selectedIndex] ?? 'all';

  const handleRefresh = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setLastRefreshed(new Date());
      setRefreshing(false);
      show({ title: 'Host telemetry refreshed', variant: 'success' });
    }, 650);
  };

  const columns = [
    { key: 'hostname', label: 'Hostname' },
    { key: 'facility', label: 'Facility' },
    { key: 'role', label: 'Role' },
    { key: 'cpu', label: 'CPU %' },
    { key: 'memory', label: 'Memory %' },
    { key: 'status', label: 'Status' },
  ];

  const visible = useMemo(() => {
    let list = servers;
    if (activeFilter === 'compute') {
      list = servers.filter((s) => s.role === 'Compute' || s.role === 'GPU');
    } else if (activeFilter === 'storage') {
      list = servers.filter((s) => s.role === 'Storage');
    } else if (activeFilter === 'network') {
      list = servers.filter((s) => s.role === 'Network' || s.role === 'Edge');
    }

    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(
      (s) =>
        s.hostname.toLowerCase().includes(q) ||
        s.facility.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q),
    );
  }, [activeFilter, query]);

  const toRows = (filter: (typeof tabFilters)[number]) => {
    let list = servers;
    if (filter === 'compute') {
      list = servers.filter((s) => s.role === 'Compute' || s.role === 'GPU');
    } else if (filter === 'storage') {
      list = servers.filter((s) => s.role === 'Storage');
    } else if (filter === 'network') {
      list = servers.filter((s) => s.role === 'Network' || s.role === 'Edge');
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.hostname.toLowerCase().includes(q) ||
          s.facility.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.status.toLowerCase().includes(q),
      );
    }

    return list.map((s) => ({
      hostname: s.hostname,
      facility: s.facility,
      role: s.role,
      cpu: s.cpu,
      memory: s.memory,
      status: s.status,
    }));
  };

  const exportCsv = () => {
    downloadCsv('poluru-dc-hosts.csv', [
      ['Hostname', 'Facility', 'Role', 'CPU %', 'Memory %', 'Status'],
      ...visible.map((s) => [
        s.hostname,
        s.facility,
        s.role,
        String(s.cpu),
        String(s.memory),
        s.status,
      ]),
    ]);
    show({ title: 'Host inventory exported', variant: 'success' });
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <p className="page-lead">
          Hosts, racks, and network nodes across the data center fleet.
        </p>
        <div className="page-toolbar__actions">
          <Badge
            label={`${visible.length} hosts`}
            variant="brand"
            soft
          />
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

      <div className="filter-bar filter-bar--single">
        <Input
          className="filter-bar__search"
          label="Filter hosts"
          placeholder="Hostname, facility, role, or status…"
          icon="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
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
