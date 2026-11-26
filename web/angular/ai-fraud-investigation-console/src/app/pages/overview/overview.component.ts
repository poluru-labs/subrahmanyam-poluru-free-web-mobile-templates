import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Open cases', value: '42', trend: '+3', up: false },
    { label: 'High-risk alerts', value: '18', trend: '+2', up: false },
    { label: 'Closed this week', value: '31', trend: '+6', up: true },
    { label: 'False positive rate', value: '8.4%', trend: '−0.6%', up: true },
  ];
}
