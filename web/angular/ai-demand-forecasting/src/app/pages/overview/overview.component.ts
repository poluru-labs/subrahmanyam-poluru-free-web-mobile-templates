import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'app-overview', templateUrl: './overview.component.html', styleUrl: './overview.component.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class OverviewComponent {
  protected readonly stats = [
    { label: 'Forecast accuracy', value: '91.2%', trend: '+2.1%', up: true },
    { label: 'SKUs tracked', value: '1,842', trend: '+24', up: true },
    { label: 'Override requests', value: '19', trend: '+3', up: false },
    { label: 'Stockout risk', value: '12', trend: '−4', up: true },
  ];
}
