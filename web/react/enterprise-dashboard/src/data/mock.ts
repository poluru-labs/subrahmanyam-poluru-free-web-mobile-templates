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

export type CoolingLoop = {
  id: string;
  facility: string;
  loop: string;
  tempC: number;
  pressurePsi: number;
  capacity: number;
  status: 'nominal' | 'elevated' | 'fault';
};

export type PowerCircuit = {
  id: string;
  facility: string;
  circuit: string;
  loadKw: number;
  capacityKw: number;
  upsBackupMin: number;
};

export type MaintenanceWindow = {
  id: string;
  title: string;
  facility: string;
  startsAt: string;
  endsAt: string;
  impact: 'low' | 'medium' | 'high';
  owner: string;
};

export const powerStats = [
  {
    label: 'Fleet PUE',
    value: '1.27',
    trend: 'down' as const,
    trendValue: '-0.03',
    hint: 'Trailing 7 days',
  },
  {
    label: 'IT load',
    value: '14.2 MW',
    trend: 'up' as const,
    trendValue: '+1.1%',
    hint: 'Vs yesterday',
  },
  {
    label: 'Cooling headroom',
    value: '23%',
    trend: 'down' as const,
    trendValue: '-4%',
    hint: 'DFW-1 constrained',
  },
  {
    label: 'UPS autonomy',
    value: '12 min',
    trend: 'flat' as const,
    trendValue: '0%',
    hint: 'Fleet minimum',
  },
];

export const coolingLoops: CoolingLoop[] = [
  {
    id: 'cl-ord-a',
    facility: 'Chicago ORD-1',
    loop: 'Loop A',
    tempC: 18.4,
    pressurePsi: 42,
    capacity: 68,
    status: 'nominal',
  },
  {
    id: 'cl-iad-b',
    facility: 'Ashburn IAD-2',
    loop: 'Loop B',
    tempC: 19.1,
    pressurePsi: 40,
    capacity: 74,
    status: 'nominal',
  },
  {
    id: 'cl-dfw-b',
    facility: 'Dallas DFW-1',
    loop: 'Loop B',
    tempC: 24.8,
    pressurePsi: 28,
    capacity: 91,
    status: 'fault',
  },
  {
    id: 'cl-sjc-a',
    facility: 'San Jose SJC-3',
    loop: 'Loop A',
    tempC: 17.2,
    pressurePsi: 44,
    capacity: 55,
    status: 'elevated',
  },
];

export const powerCircuits: PowerCircuit[] = [
  {
    id: 'pc-ord',
    facility: 'Chicago ORD-1',
    circuit: 'PDU-A / Bus 1',
    loadKw: 1820,
    capacityKw: 2400,
    upsBackupMin: 14,
  },
  {
    id: 'pc-iad',
    facility: 'Ashburn IAD-2',
    circuit: 'PDU-C / Bus 2',
    loadKw: 2680,
    capacityKw: 3200,
    upsBackupMin: 11,
  },
  {
    id: 'pc-dfw',
    facility: 'Dallas DFW-1',
    circuit: 'PDU-B / Bus 1',
    loadKw: 2100,
    capacityKw: 2200,
    upsBackupMin: 9,
  },
  {
    id: 'pc-sjc',
    facility: 'San Jose SJC-3',
    circuit: 'PDU-A / Bus 1',
    loadKw: 980,
    capacityKw: 1600,
    upsBackupMin: 16,
  },
];

export const maintenanceWindows: MaintenanceWindow[] = [
  {
    id: 'mw-1',
    title: 'UPS battery string replacement',
    facility: 'San Jose SJC-3',
    startsAt: '2026-08-16T02:00:00',
    endsAt: '2026-08-16T06:00:00',
    impact: 'medium',
    owner: 'Facilities',
  },
  {
    id: 'mw-2',
    title: 'Cooling loop B valve calibration',
    facility: 'Dallas DFW-1',
    startsAt: '2026-08-15T22:00:00',
    endsAt: '2026-08-16T01:00:00',
    impact: 'high',
    owner: 'Mechanical',
  },
  {
    id: 'mw-3',
    title: 'Spine switch firmware roll',
    facility: 'Ashburn IAD-2',
    startsAt: '2026-08-18T03:00:00',
    endsAt: '2026-08-18T05:30:00',
    impact: 'low',
    owner: 'Network',
  },
  {
    id: 'mw-4',
    title: 'Generator load-bank test',
    facility: 'Chicago ORD-1',
    startsAt: '2026-08-20T01:00:00',
    endsAt: '2026-08-20T04:00:00',
    impact: 'medium',
    owner: 'Facilities',
  },
];

export type SearchResult = {
  id: string;
  label: string;
  category: 'Facility' | 'Host' | 'Alert';
  path: string;
};

export const searchCatalog: SearchResult[] = [
  ...facilities.map((f) => ({
    id: f.id,
    label: `${f.name} · ${f.region}`,
    category: 'Facility' as const,
    path: '/facilities',
  })),
  ...servers.map((s) => ({
    id: s.id,
    label: `${s.hostname} · ${s.role}`,
    category: 'Host' as const,
    path: '/infrastructure',
  })),
  ...alerts.map((a) => ({
    id: a.id,
    label: a.title,
    category: 'Alert' as const,
    path: '/alerts',
  })),
];
