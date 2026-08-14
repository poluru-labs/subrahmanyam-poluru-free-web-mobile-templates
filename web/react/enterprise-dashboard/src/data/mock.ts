export type Facility = {
  id: string;
  name: string;
  region: string;
  status: 'operational' | 'degraded' | 'maintenance';
  racks: number;
  utilization: number;
  powerKw: number;
  pue: number;
};

export type ServerRow = {
  id: string;
  hostname: string;
  facility: string;
  role: string;
  cpu: number;
  memory: number;
  status: string;
};

export type AlertItem = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  facility: string;
  time: string;
};

export const facilities: Facility[] = [
  {
    id: 'dc-ord1',
    name: 'Chicago ORD-1',
    region: 'US-Central',
    status: 'operational',
    racks: 420,
    utilization: 78,
    powerKw: 4820,
    pue: 1.28,
  },
  {
    id: 'dc-iad2',
    name: 'Ashburn IAD-2',
    region: 'US-East',
    status: 'operational',
    racks: 610,
    utilization: 84,
    powerKw: 7120,
    pue: 1.22,
  },
  {
    id: 'dc-dfw1',
    name: 'Dallas DFW-1',
    region: 'US-South',
    status: 'degraded',
    racks: 280,
    utilization: 91,
    powerKw: 3980,
    pue: 1.41,
  },
  {
    id: 'dc-sjc3',
    name: 'San Jose SJC-3',
    region: 'US-West',
    status: 'maintenance',
    racks: 195,
    utilization: 62,
    powerKw: 2140,
    pue: 1.19,
  },
];

export const servers: ServerRow[] = [
  {
    id: '1',
    hostname: 'ord1-compute-042',
    facility: 'Chicago ORD-1',
    role: 'Compute',
    cpu: 64,
    memory: 71,
    status: 'Healthy',
  },
  {
    id: '2',
    hostname: 'iad2-storage-018',
    facility: 'Ashburn IAD-2',
    role: 'Storage',
    cpu: 38,
    memory: 82,
    status: 'Healthy',
  },
  {
    id: '3',
    hostname: 'dfw1-gpu-007',
    facility: 'Dallas DFW-1',
    role: 'GPU',
    cpu: 94,
    memory: 88,
    status: 'Hot',
  },
  {
    id: '4',
    hostname: 'sjc3-net-003',
    facility: 'San Jose SJC-3',
    role: 'Network',
    cpu: 22,
    memory: 41,
    status: 'Maintenance',
  },
  {
    id: '5',
    hostname: 'ord1-edge-011',
    facility: 'Chicago ORD-1',
    role: 'Edge',
    cpu: 55,
    memory: 60,
    status: 'Healthy',
  },
];

export const alerts: AlertItem[] = [
  {
    id: 'a1',
    severity: 'critical',
    title: 'Cooling loop B pressure below threshold',
    facility: 'Dallas DFW-1',
    time: '4 min ago',
  },
  {
    id: 'a2',
    severity: 'warning',
    title: 'Rack A12 PDU load at 92%',
    facility: 'Ashburn IAD-2',
    time: '18 min ago',
  },
  {
    id: 'a3',
    severity: 'info',
    title: 'Scheduled UPS battery test completed',
    facility: 'Chicago ORD-1',
    time: '1 hr ago',
  },
  {
    id: 'a4',
    severity: 'warning',
    title: 'Fiber path redundancy reduced to single link',
    facility: 'San Jose SJC-3',
    time: '2 hr ago',
  },
];

export const overviewStats = [
  {
    label: 'Active facilities',
    value: '12',
    trend: 'up' as const,
    trendValue: '+1',
    hint: 'Across 4 regions',
  },
  {
    label: 'Rack utilization',
    value: '79%',
    trend: 'up' as const,
    trendValue: '+2.4%',
    hint: 'Fleet average',
  },
  {
    label: 'Power draw',
    value: '18.1 MW',
    trend: 'flat' as const,
    trendValue: '0%',
    hint: 'Last 24 hours',
  },
  {
    label: 'Open alerts',
    value: '7',
    trend: 'down' as const,
    trendValue: '-3',
    hint: '2 critical',
  },
];
