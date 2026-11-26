import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({ selector: 'app-monitoring', templateUrl: './monitoring.component.html', styleUrl: './monitoring.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class MonitoringComponent { protected readonly rows = [
    { alert: 'Queue backlog', workflow: 'Refund handling', severity: 'Medium', since: '2h' },
    { alert: 'SLA breach', workflow: 'Vendor onboarding', severity: 'High', since: '45m' },
  ]; }
