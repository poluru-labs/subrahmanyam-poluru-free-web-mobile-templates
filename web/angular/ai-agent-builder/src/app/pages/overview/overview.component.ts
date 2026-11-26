import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Active agents', value: '18', trend: '+3', up: true },
    { label: 'Tool bindings', value: '42', trend: '+6', up: true },
    { label: 'Runs (24h)', value: '1,284', trend: '−4%', up: false },
    { label: 'Failed deploys', value: '2', trend: '−1', up: false },
  ];

  protected readonly pipeline = [
    { stage: 'Draft', count: 5, pct: 28 },
    { stage: 'Validated', count: 9, pct: 50 },
    { stage: 'Production', count: 4, pct: 22 },
  ];

  protected readonly runs = [
    { agent: 'invoice-router', duration: '2.1s', owner: 'Nila Poluru', status: 'Succeeded' },
    { agent: 'support-triage', duration: '4.8s', owner: 'Aarav Poluru', status: 'Succeeded' },
    { agent: 'crm-sync', duration: '—', owner: 'Meera Poluru', status: 'Queued' },
  ];

  protected readonly events = [
    { time: '14:22', title: 'Tool bound', detail: 'Kavita Poluru · Slack notifier v2' },
    { time: '13:58', title: 'Deploy promoted', detail: 'Rohan Poluru · invoice-router' },
    { time: '13:11', title: 'Schema validated', detail: 'Tara Poluru · crm-sync input map' },
  ];
}