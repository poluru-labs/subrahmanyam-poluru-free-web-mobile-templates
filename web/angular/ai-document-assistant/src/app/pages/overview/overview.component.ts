import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Documents in review', value: '34', trend: '+5', up: false },
    { label: 'Approved this week', value: '128', trend: '+18', up: true },
    { label: 'Avg. review time', value: '6.2h', trend: '−45m', up: true },
    { label: 'Pending signatures', value: '9', trend: '−2', up: true },
  ];
}
