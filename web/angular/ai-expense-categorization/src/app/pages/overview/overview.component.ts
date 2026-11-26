import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Transactions today', value: '842', trend: '+68', up: true },
    { label: 'Auto-categorized %', value: '89.4%', trend: '+1.6%', up: true },
    { label: 'Policy flags', value: '23', trend: '−5', up: true },
    { label: 'Pending approval', value: '11', trend: '+2', up: false },
  ];
}
